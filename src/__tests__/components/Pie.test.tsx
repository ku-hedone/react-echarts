import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Pie } from '../../charts/pie';

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
  PieChart: vi.fn(),
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

  it('should render without crashing', () => {
    const { container } = render(<Pie options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Pie options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Pie options={defaultOptions} className="pie-chart" />);
    const div = container.querySelector('div');
    expect(div).toHaveClass('pie-chart');
  });

  it('should apply custom style', () => {
    const { container } = render(
      <Pie options={defaultOptions} style={{ width: '500px', height: '500px' }} />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: '500px', height: '500px' });
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Pie options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });

  it('should handle rose type pie', () => {
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
    const { container } = render(<Pie options={roseTypeOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
