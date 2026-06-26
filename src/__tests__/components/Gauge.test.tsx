import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Gauge } from '../../charts/gauge';

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
  GaugeChart: vi.fn(),
}));

describe('Gauge Component', () => {
  const defaultOptions = {
    series: [
      {
        type: 'gauge' as const,
        data: [
          {
            value: 50,
            name: 'SCORE',
          },
        ],
      },
    ],
  };

  it('should render without crashing', () => {
    const { container } = render(<Gauge options={defaultOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Gauge options={defaultOptions} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Gauge options={defaultOptions} className="gauge-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('gauge-chart');
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Gauge options={defaultOptions} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });

  it('should handle multiple gauge data', () => {
    const multiGaugeOptions = {
      series: [
        {
          type: 'gauge' as const,
          data: [
            { value: 20, name: 'Perfect' },
            { value: 40, name: 'Good' },
            { value: 60, name: 'Commonly' },
          ],
        },
      ],
    };
    const { container } = render(<Gauge options={multiGaugeOptions} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
