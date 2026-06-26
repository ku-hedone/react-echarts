import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Gauge } from '../../charts/gauge';

// Create mock instance
const createMockInstance = () => ({
  setOption: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  getOption: vi.fn(() => ({})),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
});

let mockInstance: ReturnType<typeof createMockInstance>;

vi.mock('echarts/core', () => ({
  init: vi.fn(() => mockInstance),
  getInstanceByDom: vi.fn(() => mockInstance),
  use: vi.fn(),
  dispose: vi.fn(),
}));

vi.mock('echarts/renderers', () => ({
  CanvasRenderer: vi.fn(),
}));

vi.mock('echarts/charts', () => ({
  GaugeChart: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

describe('Gauge Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'gauge' as const,
        data: [
          {
            value: 50,
            name: 'SCORE',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register GaugeChart extension', async () => {
      const { use } = await import('echarts/core');

      render(<Gauge options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Gauge options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should handle multiple gauge data', async () => {
      const multiGaugeOptions = {
        series: [
          {
            type: 'gauge' as const,
            data: [
              { value: 20, name: 'Perfect' },
              { value: 40, name: 'Good' },
              { value: 60, name: 'Commonly' },
            ],
          },
        ],
      };

      render(<Gauge options={multiGaugeOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          multiGaugeOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<Gauge options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<Gauge options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });

  describe('Gauge-specific options', () => {
    it('should handle axisLine configuration', async () => {
      const axisLineOptions = {
        series: [
          {
            type: 'gauge' as const,
            data: [{ value: 50, name: 'Test' }],
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'] as [number, string],
                  [0.7, '#37a2da'] as [number, string],
                  [1, '#fd666d'] as [number, string],
                ],
              },
            },
          },
        ],
      };

      render(<Gauge options={axisLineOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          axisLineOptions,
          expect.any(Object),
        );
      });
    });
  });
});
