import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { SunBurst } from '../../charts/sunburst';

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
  SunburstChart: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('ECharts registration', () => {
    it('should register SunburstChart extension', async () => {
      const { use } = await import('echarts/core');

      render(<SunBurst options={defaultOptions} />);

      await waitFor(() => {
        expect(use).toHaveBeenCalled();
      });
    });
  });

  describe('Options passing', () => {
    it('should pass options to ECharts setOption', async () => {
      render(<SunBurst options={defaultOptions} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });
  });

  describe('Ref behavior', () => {
    it('should expose CoreRef with instance method', async () => {
      const ref = { current: null as any };

      render(<SunBurst options={defaultOptions} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Event handling', () => {
    it('should bind onClick event', async () => {
      const onClick = vi.fn();

      render(<SunBurst options={defaultOptions} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });
  });
});
