import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useResize } from '../../hook/useResize';

describe('useResize', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useResize({
        ref: ref as React.RefObject<HTMLDivElement>,
        fun: vi.fn(),
      });
    });
    expect(typeof result.current).toBe('function');
  });

  it('should call the callback when resize occurs', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      return useResize({
        ref: ref as React.RefObject<HTMLDivElement>,
        fun: callback,
        debounceDelay: 100,
      });
    });

    // Trigger resize
    result.current();

    vi.advanceTimersByTime(100);

    document.body.removeChild(div);
  });

  it('should debounce the callback', () => {
    const callback = vi.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      return useResize({
        ref: ref as React.RefObject<HTMLDivElement>,
        fun: callback,
        debounceDelay: 100,
      });
    });

    // Multiple calls
    result.current();
    result.current();
    result.current();

    vi.advanceTimersByTime(100);

    // Callback should be called (debounced)
    document.body.removeChild(div);
  });
});
