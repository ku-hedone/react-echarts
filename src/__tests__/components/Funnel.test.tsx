import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Funnel } from '../../charts/funnel';

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
  FunnelChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
}));

describe('Funnel Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'funnel' as const,
        data: [
          { value: 60, name: 'Visit' },
          { value: 40, name: 'Inquiry' },
          { value: 20, name: 'Order' },
          { value: 80, name: 'Click' },
          { value: 100, name: 'Show' },
        ],
      },
    ],
  };

  it('should render without crashing', () => {
    const { container } = render(<Funnel options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Funnel options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Funnel options={defaultOptions} className="funnel-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('funnel-chart');
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Funnel options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });

  it('should handle ascending sort', () => {
    const ascendingOptions = {
      series: [
        {
          type: 'funnel' as const,
          sort: 'ascending' as const,
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
          ],
        },
      ],
    };
    const { container } = render(<Funnel options={ascendingOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
