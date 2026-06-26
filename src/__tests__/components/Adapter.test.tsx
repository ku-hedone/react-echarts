import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { use } from 'echarts/core';
import { Adapter } from '../../adapter';
import type { Extensions } from '../../utils/extensions';

const mocks = vi.hoisted(() => {
  const instance = {
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    getOption: vi.fn(() => ({})),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };

  return {
    instance,
    init: vi.fn(() => instance),
    dispose: vi.fn(),
    use: vi.fn(),
    getInstanceByDom: vi.fn(() => instance),
  };
});

// Mock ECharts
vi.mock('echarts/core', () => ({
  init: mocks.init,
  dispose: mocks.dispose,
  use: mocks.use,
  getInstanceByDom: mocks.getInstanceByDom,
}));

vi.mock('echarts/renderers', () => ({
  CanvasRenderer: vi.fn(),
}));

describe('Adapter Component', () => {
  const defaultOptions = {
    grid: {},
    tooltip: {},
  };

  const mockUse: Extensions = [];
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

  it('should initialize ECharts and apply options', async () => {
    const { container } = render(<Adapter options={defaultOptions} use={mockUse} />);
    expect(container.firstElementChild).toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.getInstanceByDom).toHaveBeenCalled();
      expect(mocks.instance.setOption).toHaveBeenCalledWith(
        defaultOptions,
        expect.objectContaining({
          lazyUpdate: false,
          replaceMerge: expect.arrayContaining(['tooltip']),
        }),
      );
    });
    expect(use).toHaveBeenCalled();
  });

  it('should render a container div', () => {
    const { container } = render(<Adapter options={defaultOptions} use={mockUse} />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Adapter options={defaultOptions} use={mockUse} className="custom-adapter" />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveClass('custom-adapter');
  });

  it('should apply custom style', () => {
    const { container } = render(
      <Adapter options={defaultOptions} use={mockUse} style={{ width: '500px' }} />,
    );
    const div = container.querySelector('div');
    expect(div).toHaveStyle({ width: '500px' });
  });

  it('should accept ref', async () => {
    const ref = { current: null };
    render(<Adapter options={defaultOptions} use={mockUse} ref={ref} />);
    await waitFor(() => {
      expect(ref.current).toBeDefined();
    });
  });

  it('should handle event props', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Adapter options={defaultOptions} use={mockUse} onClick={onClick} />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.instance.on).toHaveBeenCalledWith('click', onClick);
    });
  });

  it('should handle multiple event props', async () => {
    const onClick = vi.fn();
    const onDblClick = vi.fn();
    const { container } = render(
      <Adapter
        options={defaultOptions}
        use={mockUse}
        onClick={onClick}
        onDblClick={onDblClick}
      />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.instance.on).toHaveBeenCalledWith('click', onClick);
      expect(mocks.instance.on).toHaveBeenCalledWith('dblclick', onDblClick);
    });
  });

  it('should handle showLoading prop', async () => {
    const { container } = render(
      <Adapter options={defaultOptions} use={mockUse} showLoading={true} />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.instance.showLoading).toHaveBeenCalled();
    });
  });

  it('should handle showLoading with options', async () => {
    const { container } = render(
      <Adapter
        options={defaultOptions}
        use={mockUse}
        showLoading={{
          type: 'default',
          opts: loadingOptions,
        }}
      />,
    );
    expect(container.firstElementChild).toBeInTheDocument();
    await waitFor(() => {
      expect(mocks.instance.showLoading).toHaveBeenCalledWith('default', loadingOptions);
    });
  });
});
