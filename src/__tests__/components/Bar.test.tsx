import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Bar } from '../../charts/bar';

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

vi.mock('echarts/charts', () => ({
  BarChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register BarChart and GridComponent extensions', async () => {
      const { use } = await import('echarts/core');

      render(<Bar options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Bar options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should pass updated options on re-render', async () => {
      const { rerender } = render(<Bar options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.any(Object),
        );
      });

      const updatedOptions = {
        ...defaultOptions,
        series: [{ data: [100, 200, 300], type: 'bar' as const }],
      };

      rerender(<Bar options={updatedOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          updatedOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<Bar options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<Bar options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });

    it('should bind multiple events', async () => {
      const onClick = vi.fn();
      const onDblClick = vi.fn();

      render(<Bar options={defaultOptions} onClick={onClick} onDblClick={onDblClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
        expect(mockInstance.on).toHaveBeenCalledWith('dblclick', onDblClick);
      });
    });
  });

  describe('Props forwarding', () => {
    it('should forward style prop', () => {
      const { container } = render(
        <Bar options={defaultOptions} style={{ width: '500px' }} />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '500px' });
    });

    it('should forward className prop', () => {
      const { container } = render(
        <Bar options={defaultOptions} className="bar-chart" />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveClass('bar-chart');
    });

    it('should forward theme prop', async () => {
      const { init } = await import('echarts/core');

      render(<Bar options={defaultOptions} theme="dark" />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          'dark',
          expect.any(Object),
        );
      });
    });

    it('should forward showLoading prop', async () => {
      render(<Bar options={defaultOptions} showLoading={true} />);

      await waitFor(() => {
        expect(mockInstance.showLoading).toHaveBeenCalled();
      });
    });
  });

  describe('Chart configuration', () => {
    it('should handle options with grid', async () => {
      const optionsWithGrid = {
        ...defaultOptions,
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      };

      render(<Bar options={optionsWithGrid} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          optionsWithGrid,
          expect.any(Object),
        );
      });
    });
  });
});
