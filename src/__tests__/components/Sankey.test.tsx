import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Sankey } from '../../charts/sankey';

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
  SankeyChart: vi.fn(),
}));

describe('Sankey Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'sankey' as const,
        data: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
        links: [
          { source: 'a', target: 'b', value: 10 },
          { source: 'b', target: 'c', value: 20 },
        ],
      },
    ],
  };

  it('should render without crashing', () => {
    const { container } = render(<Sankey options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Sankey options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Sankey options={defaultOptions} className="sankey-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('sankey-chart');
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Sankey options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });
});
