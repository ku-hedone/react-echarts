import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Graphic } from '../../charts/graphic';

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

vi.mock('../../components/GraphicComponent', () => ({
  default: 'GraphicComponent',
}));

describe('Graphic Component', () => {
  const defaultOptions = {
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: 'React EChart',
        fontSize: 30,
        fontWeight: 'bold',
      },
    },
  };

  it('should render without crashing', () => {
    const { container } = render(<Graphic options={defaultOptions} uuid={1} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });

  it('should render a container div', () => {
    const { container } = render(<Graphic options={defaultOptions} uuid={1} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Graphic options={defaultOptions} uuid={1} className="graphic-chart" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('graphic-chart');
  });

  it('should handle multiple graphic elements', () => {
    const multiGraphicOptions = {
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: { text: 'Title' },
        },
        {
          type: 'rect',
          left: 10,
          top: 10,
          shape: { width: 100, height: 50 },
        },
      ],
    };
    const { container } = render(<Graphic options={multiGraphicOptions} uuid={2} />);
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
