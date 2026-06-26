import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor, act } from '@testing-library/react';
import { Core } from '../../core';

// Create mock instance with all required methods
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

describe('Core Component', () => {
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

  describe('ECharts initialization', () => {
    it('should call echarts.use with extensions when provided', async () => {
      const { use } = await import('echarts/core');
      const extensions = [vi.fn(), vi.fn()];

      render(
        <Core
          options={defaultOptions}
          extensions={extensions}
          events={[]}
          finished={true}
        />,
      );

      await waitFor(() => {
        expect(use).toHaveBeenCalledWith(extensions);
      });
    });

    it('should call init with correct parameters', async () => {
      const { init } = await import('echarts/core');

      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          theme="dark"
        />,
      );

      await waitFor(() => {
        expect(init).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          'dark',
          expect.objectContaining({
            renderer: 'canvas',
          }),
        );
      });
    });

    it('should not init when finished is false', async () => {
      const { init } = await import('echarts/core');

      render(
        <Core options={defaultOptions} extensions={[]} events={[]} finished={false} />,
      );

      // Wait a bit and verify init was not called
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
      });

      expect(init).not.toHaveBeenCalled();
    });
  });

  describe('setOption behavior', () => {
    it('should call setOption with correct options', async () => {
      render(
        <Core options={defaultOptions} extensions={[]} events={[]} finished={true} />,
      );

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: false,
          }),
        );
      });
    });

    it('should pass lazyUpdate to setOption', async () => {
      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          lazyUpdate={true}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.objectContaining({
            lazyUpdate: true,
          }),
        );
      });
    });

    it('should use replaceMerge for specific options', async () => {
      const optionsWithLegend = {
        ...defaultOptions,
        legend: { data: ['Sales'] },
      };

      render(
        <Core options={optionsWithLegend} extensions={[]} events={[]} finished={true} />,
      );

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          optionsWithLegend,
          expect.objectContaining({
            replaceMerge: expect.arrayContaining(['legend']),
          }),
        );
      });
    });
  });

  describe('loading behavior', () => {
    it('should call showLoading when showLoading is true', async () => {
      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          showLoading={true}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.showLoading).toHaveBeenCalled();
      });
    });

    it('should call showLoading with type and opts', async () => {
      const loadingOpts = {
        type: 'default',
        opts: {
          text: 'Loading...',
          lineWidth: 5,
          fontWeight: 'normal' as const,
          fontStyle: 'normal' as const,
          fontFamily: 'sans-serif' as const,
        },
      };

      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          showLoading={loadingOpts}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.showLoading).toHaveBeenCalledWith(
          'default',
          loadingOpts.opts,
        );
      });
    });

    it('should call hideLoading when showLoading is false', async () => {
      const { rerender } = render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          showLoading={true}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.showLoading).toHaveBeenCalled();
      });

      rerender(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          showLoading={false}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.hideLoading).toHaveBeenCalled();
      });
    });
  });

  describe('event binding', () => {
    it('should bind events using instance.on', async () => {
      const onClick = vi.fn();
      const events = [{ eventName: 'click' as const, callback: onClick }];

      render(
        <Core options={defaultOptions} extensions={[]} events={events} finished={true} />,
      );

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });

    it('should bind multiple events', async () => {
      const onClick = vi.fn();
      const onDblClick = vi.fn();
      const events = [
        { eventName: 'click' as const, callback: onClick },
        { eventName: 'dblclick' as const, callback: onDblClick },
      ];

      render(
        <Core options={defaultOptions} extensions={[]} events={events} finished={true} />,
      );

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
        expect(mockInstance.on).toHaveBeenCalledWith('dblclick', onDblClick);
      });
    });
  });

  describe('ref behavior', () => {
    it('should expose instance via ref', async () => {
      const ref = { current: null as any };

      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          ref={ref}
        />,
      );

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('onFinish callback', () => {
    it('should call onFinish with instance when provided', async () => {
      const onFinish = vi.fn();

      render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          onFinish={onFinish}
        />,
      );

      await waitFor(() => {
        expect(onFinish).toHaveBeenCalledWith(mockInstance);
      });
    });
  });

  describe('style and className', () => {
    it('should apply default style', () => {
      const { container } = render(
        <Core options={defaultOptions} extensions={[]} events={[]} finished={true} />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveStyle({ height: '100%' });
    });

    it('should apply custom style', () => {
      const { container } = render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          style={{ width: '500px', height: '300px' }}
        />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '500px', height: '300px' });
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Core
          options={defaultOptions}
          extensions={[]}
          events={[]}
          finished={true}
          className="custom-chart"
        />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveClass('custom-chart');
    });
  });
});
