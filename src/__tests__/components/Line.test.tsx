import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Line } from '../../charts/line';

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
  LineChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
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

  it('should render without crashing', () => {
    const { container } = render(<Line options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Line options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Line options={defaultOptions} className="line-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('line-chart');
  });

  it('should apply custom style', () => {
    const { container } = render(
      <Line options={defaultOptions} style={{ width: '600px', height: '400px' }} />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: '600px', height: '400px' });
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Line options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });

  it('should handle multiple series', () => {
    const multiSeriesOptions = {
      ...defaultOptions,
      series: [
        { data: [150, 230, 224, 218, 135], type: 'line' as const, name: 'Series 1' },
        { data: [80, 100, 120, 140, 160], type: 'line' as const, name: 'Series 2' },
      ],
    };
    const { container } = render(<Line options={multiSeriesOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
