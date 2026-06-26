import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('saveAsImage - SVG iframe fallback', () => {
  const originalMouseEvent = global.MouseEvent;
  const originalNavigator = window.navigator;

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
  });

  it('should use iframe for SVG export when msSaveOrOpenBlob is not available', async () => {
    const mockFrame = {
      contentWindow: {
        document: {
          open: vi.fn(),
          write: vi.fn(),
          close: vi.fn(),
          execCommand: vi.fn(),
        },
        focus: vi.fn(),
      },
    };

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(mockFrame as any);
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => mockFrame as any);
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => mockFrame as any);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'svg'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(
        () => 'data:image/svg+xml;charset=utf-8,%3Csvg%3E%3C/svg%3E',
      ),
    };

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test', type: 'svg' });

    expect(createElementSpy).toHaveBeenCalledWith('iframe');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(mockFrame.contentWindow.document.open).toHaveBeenCalled();
    expect(mockFrame.contentWindow.document.write).toHaveBeenCalled();
    expect(mockFrame.contentWindow.document.close).toHaveBeenCalled();
    expect(mockFrame.contentWindow.focus).toHaveBeenCalled();
    expect(mockFrame.contentWindow.document.execCommand).toHaveBeenCalledWith(
      'SaveAs',
      true,
      'test.svg',
    );
    expect(removeChildSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('should handle iframe with null contentWindow', async () => {
    const mockFrame = {
      contentWindow: null,
    };

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(mockFrame as any);
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => mockFrame as any);
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => mockFrame as any);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'svg'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(
        () => 'data:image/svg+xml;charset=utf-8,%3Csvg%3E%3C/svg%3E',
      ),
    };

    const { saveAsImage } = await import('../../utils/image');

    // Should not throw when contentWindow is null
    expect(() => {
      saveAsImage(mockInstance, { title: 'test', type: 'svg' });
    }).not.toThrow();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });

  it('should handle base64 encoded SVG data', async () => {
    const mockFrame = {
      contentWindow: {
        document: {
          open: vi.fn(),
          write: vi.fn(),
          close: vi.fn(),
          execCommand: vi.fn(),
        },
        focus: vi.fn(),
      },
    };

    const createElementSpy = vi
      .spyOn(document, 'createElement')
      .mockReturnValue(mockFrame as any);
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => mockFrame as any);
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => mockFrame as any);

    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'svg'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4='),
    };

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test', type: 'svg' });

    expect(mockFrame.contentWindow.document.write).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
