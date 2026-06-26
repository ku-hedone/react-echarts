import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Adapter } from '../../adapter';

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

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

vi.mock('../../utils/extensions', () => ({
  default: vi.fn(() => async () => []),
}));

describe('Adapter Component', () => {
  const defaultOptions = {
    grid: {},
    tooltip: {},
  };

  const mockUse = [vi.fn(), vi.fn()];

  beforeEach(() => {
    vi.clearAllMocks();
    mockInstance = createMockInstance();
  });

  describe('Core integration', () => {
    it('should pass options to Core component', async () => {
      render(<Adapter options={defaultOptions} use={mockUse} />);

      await waitFor(() => {
        expect(mockInstance.setOption).toHaveBeenCalledWith(
          defaultOptions,
          expect.any(Object),
        );
      });
    });
  });

  describe('Event transformation', () => {
    it('should transform onClick prop to click event', async () => {
      const onClick = vi.fn();

      render(<Adapter options={defaultOptions} use={mockUse} onClick={onClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
      });
    });

    it('should transform onDblClick prop to dblclick event', async () => {
      const onDblClick = vi.fn();

      render(<Adapter options={defaultOptions} use={mockUse} onDblClick={onDblClick} />);

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('dblclick', onDblClick);
      });
    });

    it('should transform multiple event props', async () => {
      const onClick = vi.fn();
      const onMouseDown = vi.fn();

      render(
        <Adapter
          options={defaultOptions}
          use={mockUse}
          onClick={onClick}
          onMouseDown={onMouseDown}
        />,
      );

      await waitFor(() => {
        expect(mockInstance.on).toHaveBeenCalledWith('click', onClick);
        expect(mockInstance.on).toHaveBeenCalledWith('mousedown', onMouseDown);
      });
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to Core component', async () => {
      const ref = { current: null as any };

      render(<Adapter options={defaultOptions} use={mockUse} ref={ref} />);

      await waitFor(() => {
        expect(ref.current).toBeDefined();
        expect(ref.current.instance).toBeDefined();
        expect(ref.current.instance()).toBe(mockInstance);
      });
    });
  });

  describe('Props forwarding', () => {
    it('should forward style prop', () => {
      const { container } = render(
        <Adapter options={defaultOptions} use={mockUse} style={{ width: '500px' }} />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveStyle({ width: '500px' });
    });

    it('should forward className prop', () => {
      const { container } = render(
        <Adapter options={defaultOptions} use={mockUse} className="custom-adapter" />,
      );

      const div = container.querySelector('div');
      expect(div).toHaveClass('custom-adapter');
    });

    it('should forward theme prop', async () => {
      const { init } = await import('echarts/core');

      render(<Adapter options={defaultOptions} use={mockUse} theme="dark" />);

      await waitFor(() => {
        expect(init).toHaveBeenCalledWith(
          expect.any(HTMLDivElement),
          'dark',
          expect.any(Object),
        );
      });
    });

    it('should forward showLoading prop', async () => {
      render(<Adapter options={defaultOptions} use={mockUse} showLoading={true} />);

      await waitFor(() => {
        expect(mockInstance.showLoading).toHaveBeenCalled();
      });
    });
  });
});
