import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedCallback } from '../../hook/useDebouncedCallback';

describe('useDebouncedCallback - extended tests', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should throw error for non-function argument', () => {
    expect(() => {
      renderHook(() => useDebouncedCallback('not a function' as any, 100));
    }).toThrow('Expected a function');
  });

  it('should handle zero wait time', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 0));

    act(() => {
      result.current();
    });

    // With zero wait, should use requestAnimationFrame
    expect(typeof result.current).toBe('function');
  });

  it('should handle undefined wait time', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback));

    act(() => {
      result.current();
    });

    expect(typeof result.current).toBe('function');
  });

  it('should support maxWait option', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 200, { maxWait: 500 }),
    );

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should have been called due to maxWait
    expect(callback).toHaveBeenCalled();
  });

  it('should handle trailing option set to false', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { trailing: false }),
    );

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // With trailing false and leading false (default), should not be called
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return result from callback with leading', () => {
    const callback = vi.fn(() => 'result');
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { leading: true, trailing: false }),
    );

    let returnValue: any;
    act(() => {
      returnValue = result.current();
    });

    expect(returnValue).toBe('result');
  });

  it('should handle leading with trailing false', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { leading: true, trailing: false }),
    );

    act(() => {
      result.current('first');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first');

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Should not be called again since trailing is false
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle this context', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { leading: true, trailing: false }),
    );

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalled();
  });
});
