import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Graphic } from '../../charts/graphic';

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

vi.mock('../../components/GraphicComponent', () => ({
  default: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register GraphicComponent extension', async () => {
      const { use } = await import('echarts/core');

      render(<Graphic options={defaultOptions} uuid={1} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Graphic options={defaultOptions} uuid={1} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should handle multiple graphic elements', async () => {
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

      render(<Graphic options={multiGraphicOptions} uuid={2} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          multiGraphicOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Props forwarding', () => {
    it('should forward style prop', () => {
      const { container } = render(
        <Graphic options={defaultOptions} uuid={1} style={{ width: '500px' }} />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '500px' });
    });

    it('should forward className prop', () => {
      const { container } = render(
        <Graphic options={defaultOptions} uuid={1} className="graphic-chart" />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveClass('graphic-chart');
    });
  });
});
