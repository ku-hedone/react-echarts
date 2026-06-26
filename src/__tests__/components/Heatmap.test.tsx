import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HeatMap } from '../../charts/heatmap';

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
  HeatmapChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
  VisualMapComponent: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

describe('HeatMap Component', () => {
  const defaultOptions = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: {
      type: 'category' as const,
      data: ['Morning', 'Afternoon', 'Evening'],
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
    },
    series: [
      {
        type: 'heatmap' as const,
        data: [
          [0, 0, 5],
          [0, 1, 8],
          [0, 2, 3],
          [1, 0, 7],
          [1, 1, 2],
          [1, 2, 9],
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register HeatmapChart extension', async () => {
      const { use } = await import('echarts/core');

      render(<HeatMap options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<HeatMap options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<HeatMap options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<HeatMap options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });
});
