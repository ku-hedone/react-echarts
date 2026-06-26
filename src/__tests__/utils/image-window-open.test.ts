import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('saveAsImage - window.open fallback', () => {
  const originalMouseEvent = global.MouseEvent;
  const originalNavigator = window.navigator;
  const originalOpen = window.open;

  beforeEach(() => {
    // Mock MouseEvent to not be a function to trigger else branch
    (global as any).MouseEvent = undefined;
  });

  afterEach(() => {
    global.MouseEvent = originalMouseEvent;
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    window.open = originalOpen;
  });

  it('should open new tab for PNG export when no msSaveOrOpenBlob', async () => {
    const mockTab = {
      document: {
        write: vi.fn(),
        title: '',
      },
    };

    window.open = vi.fn(() => mockTab as any);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'canvas'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/png;base64,mock'),
    };

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test-chart' });

    expect(window.open).toHaveBeenCalled();
    expect(mockTab.document.title).toBe('test-chart');
  });

  it('should handle window.open returning null', async () => {
    window.open = vi.fn(() => null);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'canvas'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/png;base64,mock'),
    };

    const { saveAsImage } = await import('../../utils/image');

    // Should not throw when window.open returns null
    expect(() => {
      saveAsImage(mockInstance, { title: 'test' });
    }).not.toThrow();
  });

  it('should use default backgroundColor when getOption returns empty', async () => {
    const mockTab = {
      document: {
        write: vi.fn(),
        title: '',
      },
    };

    window.open = vi.fn(() => mockTab as any);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'canvas'),
        },
      })),
      getOption: vi.fn(() => ({})),
      getConnectedDataURL: vi.fn(() => 'data:image/png;base64,mock'),
    };

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        backgroundColor: '#fff',
      }),
    );
  });
});
