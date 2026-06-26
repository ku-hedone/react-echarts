import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { SunBurst } from '../../charts/sunburst';

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
  SunburstChart: vi.fn(),
}));

describe('SunBurst Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'sunburst' as const,
        data: [
          {
            name: 'Grandpa',
            children: [
              {
                name: 'Uncle',
                children: [{ name: 'Cousin' }],
              },
            ],
          },
        ],
      },
    ],
  };

  it('should render without crashing', () => {
    const { container } = render(<SunBurst options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<SunBurst options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <SunBurst options={defaultOptions} className="sunburst-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('sunburst-chart');
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<SunBurst options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });
});
