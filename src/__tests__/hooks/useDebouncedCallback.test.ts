import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedCallback } from '../../hook/useDebouncedCallback';

describe('useDebouncedCallback', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useDebouncedCallback(() => {}, 100));
    expect(typeof result.current).toBe('function');
  });

  it('should call callback immediately with leading option', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { leading: true, trailing: false }),
    );

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback immediately without leading option', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 100));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should pass arguments to callback with leading option', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 100, { leading: true, trailing: false }),
    );

    act(() => {
      result.current('arg1', 'arg2');
    });

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
