import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Pie } from '../../charts/pie';

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
  PieChart: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

describe('Pie Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'pie' as const,
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register PieChart extension', async () => {
      const { use } = await import('echarts/core');

      render(<Pie options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Pie options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should handle rose type pie', async () => {
      const roseTypeOptions = {
        series: [
          {
            type: 'pie' as const,
            roseType: 'area' as const,
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
            ],
          },
        ],
      };

      render(<Pie options={roseTypeOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          roseTypeOptions,
          expect.any(Object),
        );
      });
    });

    it('should handle nested pie', async () => {
      const nestedPieOptions = {
        series: [
          {
            type: 'pie' as const,
            radius: ['20%', '40%'],
            data: [{ value: 1048, name: 'Inner' }],
          },
          {
            type: 'pie' as const,
            radius: ['50%', '70%'],
            data: [{ value: 735, name: 'Outer' }],
          },
        ],
      };

      render(<Pie options={nestedPieOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          nestedPieOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<Pie options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<Pie options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });

  describe('Pie-specific options', () => {
    it('should handle label configuration', async () => {
      const labelOptions = {
        series: [
          {
            type: 'pie' as const,
            data: [{ value: 1048, name: 'Test' }],
            label: {
              show: true,
              formatter: '{b}: {d}%',
            },
          },
        ],
      };

      render(<Pie options={labelOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          labelOptions,
          expect.any(Object),
        );
      });
    });

    it('should handle center position', async () => {
      const centerOptions = {
        series: [
          {
            type: 'pie' as const,
            center: ['50%', '50%'],
            data: [{ value: 1048, name: 'Test' }],
          },
        ],
      };

      render(<Pie options={centerOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          centerOptions,
          expect.any(Object),
        );
      });
    });
  });
});
