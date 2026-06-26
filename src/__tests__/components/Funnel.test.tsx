import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Funnel } from '../../charts/funnel';

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
  FunnelChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register FunnelChart extension', async () => {
      const { use } = await import('echarts/core');

      render(<Funnel options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<Funnel options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should handle ascending sort', async () => {
      const ascendingOptions = {
        series: [
          {
            type: 'funnel' as const,
            sort: 'ascending' as const,
            data: defaultOptions.series[0].data,
          },
        ],
      };

      render(<Funnel options={ascendingOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          ascendingOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<Funnel options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<Funnel options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });
});
