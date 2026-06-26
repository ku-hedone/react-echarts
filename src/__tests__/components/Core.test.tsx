import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Core } from '../../core';

// Mock ECharts
const mockSetOption = vi.fn();
const mockResize = vi.fn();
const mockDispose = vi.fn();
const mockGetOption = vi.fn(() => ({}));
const mockShowLoading = vi.fn();
const mockHideLoading = vi.fn();
const mockOn = vi.fn();
const mockOff = vi.fn();

vi.mock('echarts/core', () => ({
  init: vi.fn(() => ({
    setOption: mockSetOption,
    resize: mockResize,
    dispose: mockDispose,
    getOption: mockGetOption,
    showLoading: mockShowLoading,
    hideLoading: mockHideLoading,
    on: mockOn,
    off: mockOff,
  })),
  dispose: vi.fn(),
  use: vi.fn(),
  getInstanceByDom: vi.fn(() => ({
    setOption: mockSetOption,
    resize: mockResize,
    dispose: mockDispose,
    getOption: mockGetOption,
    showLoading: mockShowLoading,
    hideLoading: mockHideLoading,
    on: mockOn,
    off: mockOff,
  })),
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
  const loadingOptions = {
    text: 'Loading...',
    lineWidth: 5,
    fontWeight: 'normal' as const,
    fontStyle: 'normal' as const,
    fontFamily: 'sans-serif' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render a div element', () => {
    const { container } = render(
      <Core options={defaultOptions} extensions={[]} events={[]} finished={true} />,
    );
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

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

  it('should accept ref', async () => {
    const ref = { current: null };
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
    });
  });

  it('should call onFinish when provided', async () => {
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
      expect(onFinish).toHaveBeenCalled();
    });
  });

  it('should handle showLoading boolean', async () => {
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
      expect(mockShowLoading).toHaveBeenCalled();
    });
  });

  it('should handle showLoading with options', async () => {
    render(
      <Core
        options={defaultOptions}
        extensions={[]}
        events={[]}
        finished={true}
        showLoading={{
          type: 'default',
          opts: loadingOptions,
        }}
      />,
    );
    await waitFor(() => {
      expect(mockShowLoading).toHaveBeenCalledWith('default', loadingOptions);
    });
  });

  it('should handle events array', async () => {
    const onClick = vi.fn();
    render(
      <Core
        options={defaultOptions}
        extensions={[]}
        events={[{ eventName: 'click', callback: onClick }]}
        finished={true}
      />,
    );
    await waitFor(() => {
      expect(mockOn).toHaveBeenCalledWith('click', onClick);
    });
  });

  it('should not init when finished is false', () => {
    render(
      <Core options={defaultOptions} extensions={[]} events={[]} finished={false} />,
    );
    expect(mockSetOption).not.toHaveBeenCalled();
  });
});
