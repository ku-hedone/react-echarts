import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveAsImage } from '../../utils/image';
import type { EChartsType } from 'echarts/core';

describe('saveAsImage - extended tests', () => {
  let mockInstance: EChartsType;

  beforeEach(() => {
    mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'canvas'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/png;base64,mock'),
    } as unknown as EChartsType;

    // Mock MouseEvent properly for jsdom
    class MockMouseEvent extends Event {
      view: Window | null;
      constructor(type: string, options?: MouseEventInit) {
        super(type, options);
        this.view = options?.view || null;
      }
    }
    globalThis.MouseEvent = MockMouseEvent as unknown as typeof MouseEvent;
  });

  it('should throw error for svg export on canvas renderer', () => {
    expect(() => {
      saveAsImage(mockInstance, { type: 'svg', title: 'test' });
    }).toThrow('Svg image can only export when type of renderer is svg');
  });

  it('should export png image', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { type: 'png', title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalled();
    expect(mockLink.download).toBe('test.png');

    createElementSpy.mockRestore();
  });

  it('should use default options', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'png',
        pixelRatio: 1,
      }),
    );

    createElementSpy.mockRestore();
  });

  it('should use custom excludeComponents', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, {
      title: 'test',
      excludeComponents: ['tooltip', 'legend'],
    });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        excludeComponents: ['tooltip', 'legend'],
      }),
    );

    createElementSpy.mockRestore();
  });

  it('should handle SVG renderer for svg export', () => {
    mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'svg'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/svg+xml;base64,mock'),
    } as unknown as EChartsType;

    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { type: 'svg', title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalled();
    expect(mockLink.download).toBe('test.svg');

    createElementSpy.mockRestore();
  });

  it('should use custom pixelRatio', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { title: 'test', pixelRatio: 2 });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        pixelRatio: 2,
      }),
    );

    createElementSpy.mockRestore();
  });

  it('should use instance backgroundColor', () => {
    mockInstance.getOption = vi.fn(() => ({
      backgroundColor: '#000',
    }));

    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        backgroundColor: '#000',
      }),
    );

    createElementSpy.mockRestore();
  });

  it('should use default backgroundColor when not set', () => {
    mockInstance.getOption = vi.fn(() => ({}));

    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        backgroundColor: '#fff',
      }),
    );

    createElementSpy.mockRestore();
  });

  it('should use default excludeComponents', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const mockLink = {
      download: '',
      target: '',
      href: '',
      dispatchEvent: vi.fn(),
    };
    createElementSpy.mockReturnValue(mockLink as any);

    saveAsImage(mockInstance, { title: 'test' });

    expect(mockInstance.getConnectedDataURL).toHaveBeenCalledWith(
      expect.objectContaining({
        excludeComponents: ['toolbox'],
      }),
    );

    createElementSpy.mockRestore();
  });
});
