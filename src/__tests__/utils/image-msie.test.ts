import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { EChartsType } from 'echarts/core';

describe('saveAsImage - msSaveOrOpenBlob', () => {
  const originalNavigator = window.navigator;
  const originalMouseEvent = globalThis.MouseEvent;

  beforeEach(() => {
    // Mock MouseEvent to not be a function to trigger else branch
    globalThis.MouseEvent = undefined as unknown as typeof MouseEvent;
  });

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    globalThis.MouseEvent = originalMouseEvent;
  });

  it('should use msSaveOrOpenBlob when available', async () => {
    const msSaveOrOpenBlob = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { msSaveOrOpenBlob },
      writable: true,
      configurable: true,
    });

    // Mock instance
    const mockInstance = {
      getZr: vi.fn(() => ({
        painter: {
          getType: vi.fn(() => 'canvas'),
        },
      })),
      getOption: vi.fn(() => ({
        backgroundColor: '#fff',
      })),
      getConnectedDataURL: vi.fn(() => 'data:image/png;base64,bW9jaw=='),
    } as unknown as EChartsType;

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test' });

    expect(msSaveOrOpenBlob).toHaveBeenCalled();
    expect(msSaveOrOpenBlob.mock.calls[0][1]).toBe('test.png');
  });

  it('should handle SVG export with msSaveOrOpenBlob', async () => {
    const msSaveOrOpenBlob = vi.fn();

    Object.defineProperty(window, 'navigator', {
      value: { msSaveOrOpenBlob },
      writable: true,
      configurable: true,
    });

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
    } as unknown as EChartsType;

    const { saveAsImage } = await import('../../utils/image');
    saveAsImage(mockInstance, { title: 'test', type: 'svg' });

    expect(msSaveOrOpenBlob).toHaveBeenCalled();
  });
});
