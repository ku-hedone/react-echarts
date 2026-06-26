import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Line } from '../../charts/line';

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
  LineChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

describe('Line Component', () => {
  const defaultOptions = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: [150, 230, 224, 218, 135],
        type: 'line' as const,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register LineChart and GridComponent extensions', async () => {
      const { use } = await import('echarts/core');

      render(<Line options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Line options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should handle multiple series', async () => {
      const multiSeriesOptions = {
        ...defaultOptions,
        series: [
          { data: [150, 230, 224, 218, 135], type: 'line' as const, name: 'Series 1' },
          { data: [80, 100, 120, 140, 160], type: 'line' as const, name: 'Series 2' },
        ],
      };

      render(<Line options={multiSeriesOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          multiSeriesOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<Line options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<Line options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });

  describe('Line-specific options', () => {
    it('should handle smooth line option', async () => {
      const smoothOptions = {
        ...defaultOptions,
        series: [{ ...defaultOptions.series[0], smooth: true }],
      };

      render(<Line options={smoothOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          smoothOptions,
          expect.any(Object),
        );
      });
    });

    it('should handle area style option', async () => {
      const areaStyleOptions = {
        ...defaultOptions,
        series: [{ ...defaultOptions.series[0], areaStyle: {} }],
      };

      render(<Line options={areaStyleOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          areaStyleOptions,
          expect.any(Object),
        );
      });
    });
  });
});
