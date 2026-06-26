import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Bar } from '../../charts/bar';

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
  BarChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
}));

describe('Bar Component', () => {
  const defaultOptions = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed'],
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'bar' as const,
      },
    ],
  };

  it('should render without crashing', () => {
    const { container } = render(<Bar options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Bar options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Bar options={defaultOptions} className="custom-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-chart');
  });

  it('should apply custom style', () => {
    const { container } = render(
      <Bar options={defaultOptions} style={{ width: '500px' }} />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: '500px' });
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Bar options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });
});
