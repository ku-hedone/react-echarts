import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useEvent from '../../hook/useEvent';

describe('useEvent', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useEvent(() => {}));
    expect(typeof result.current).toBe('function');
  });

  it('should call the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useEvent(callback));

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useEvent(callback));

    act(() => {
      result.current('arg1', 'arg2');
    });

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should maintain stable reference', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(({ cb }) => useEvent(cb), {
      initialProps: { cb: callback1 },
    });

    const firstRef = result.current;

    rerender({ cb: callback2 });

    expect(result.current).toBe(firstRef);
  });

  it('should use the latest callback', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(({ cb }) => useEvent(cb), {
      initialProps: { cb: callback1 },
    });

    act(() => {
      result.current();
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    rerender({ cb: callback2 });

    act(() => {
      result.current();
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
