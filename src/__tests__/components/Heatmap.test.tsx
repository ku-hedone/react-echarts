import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HeatMap } from '../../charts/heatmap';

// Mock ECharts
vi.mock('echarts/core', () => ({
  init: vi.fn(() => ({
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    getOption: vi.fn(() => ({})),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  })),
  dispose: vi.fn(),
  use: vi.fn(),
  getInstanceByDom: vi.fn(),
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

  it('should render without crashing', () => {
    const { container } = render(<HeatMap options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<HeatMap options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <HeatMap options={defaultOptions} className="heatmap-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('heatmap-chart');
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<HeatMap options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });
});
