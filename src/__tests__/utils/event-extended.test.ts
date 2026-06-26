import { describe, it, expect, vi } from 'vitest';
import { connect, startWith } from '../../utils/event';

describe('connect', () => {
  it('should return a function', () => {
    const bind = connect();
    expect(typeof bind).toBe('function');
  });

  it('should bind events to instance', () => {
    const bind = connect('on');
    const mockOn = vi.fn();
    const instance = { on: mockOn } as any;
    const events = [
      { eventName: 'click' as const, callback: vi.fn() },
      { eventName: 'dblclick' as const, callback: vi.fn() },
    ];

    bind(instance, events);

    expect(mockOn).toHaveBeenCalledTimes(2);
    expect(mockOn).toHaveBeenCalledWith('click', events[0].callback);
    expect(mockOn).toHaveBeenCalledWith('dblclick', events[1].callback);
  });

  it('should unbind events from instance', () => {
    const unbind = connect('off');
    const mockOff = vi.fn();
    const instance = { off: mockOff } as any;
    const events = [{ eventName: 'click' as const, callback: vi.fn() }];

    unbind(instance, events);

    expect(mockOff).toHaveBeenCalledTimes(1);
    expect(mockOff).toHaveBeenCalledWith('click', events[0].callback);
  });

  it('should handle empty events array', () => {
    const bind = connect('on');
    const mockOn = vi.fn();
    const instance = { on: mockOn } as any;

    bind(instance, []);

    expect(mockOn).not.toHaveBeenCalled();
  });

  it('should handle multiple events', () => {
    const bind = connect('on');
    const mockOn = vi.fn();
    const instance = { on: mockOn } as any;
    const events = [
      { eventName: 'click' as const, callback: vi.fn() },
      { eventName: 'mousedown' as const, callback: vi.fn() },
      { eventName: 'mouseup' as const, callback: vi.fn() },
      { eventName: 'mouseover' as const, callback: vi.fn() },
    ];

    bind(instance, events);

    expect(mockOn).toHaveBeenCalledTimes(4);
  });

  it('should use on by default', () => {
    const bind = connect();
    const mockOn = vi.fn();
    const instance = { on: mockOn } as any;
    const events = [{ eventName: 'click' as const, callback: vi.fn() }];

    bind(instance, events);

    expect(mockOn).toHaveBeenCalled();
  });
});

describe('startWith - edge cases', () => {
  it('should handle empty strings', () => {
    expect(startWith('', '')).toBe(true);
    expect(startWith('test', '')).toBe(true);
    expect(startWith('', 'test')).toBe(false);
  });

  it('should handle start index beyond string length', () => {
    expect(startWith('test', 'test', 10)).toBe(false);
  });

  it('should handle negative start index', () => {
    expect(startWith('test', 'test', -1)).toBe(true);
  });
});
