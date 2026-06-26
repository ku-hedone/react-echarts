import { describe, it, expect } from 'vitest';
import { isSameStyle, isSameTheme, isSameEvent } from '../../utils/compare';

describe('isSameStyle - extended tests', () => {
  it('should handle complex CSSProperties', () => {
    const style1 = {
      width: '100%',
      height: '400px',
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
    };
    const style2 = {
      width: '100%',
      height: '400px',
      backgroundColor: 'red',
      display: 'flex',
      justifyContent: 'center',
    };
    expect(isSameStyle(style1, style2)).toBe(true);
  });

  it('should handle different property values', () => {
    const style1 = { width: '100%', height: '400px' };
    const style2 = { width: '100%', height: '500px' };
    expect(isSameStyle(style1, style2)).toBe(false);
  });

  it('should handle different number of properties', () => {
    const style1 = { width: '100%' };
    const style2 = { width: '100%', height: '400px' };
    expect(isSameStyle(style1, style2)).toBe(false);
  });

  it('should handle numeric values', () => {
    const style1 = { zIndex: 10, opacity: 0.5 };
    const style2 = { zIndex: 10, opacity: 0.5 };
    expect(isSameStyle(style1, style2)).toBe(true);
  });

  it('should handle different numeric values', () => {
    const style1 = { zIndex: 10 };
    const style2 = { zIndex: 20 };
    expect(isSameStyle(style1, style2)).toBe(false);
  });
});

describe('isSameTheme - extended tests', () => {
  it('should handle simple theme objects', () => {
    const theme1 = {
      color: '#c23531',
      backgroundColor: '#fefefe',
    };
    const theme2 = {
      color: '#c23531',
      backgroundColor: '#fefefe',
    };
    expect(isSameTheme(theme1, theme2)).toBe(true);
  });

  it('should handle themes with different number of keys', () => {
    const theme1 = { color: '#fff' };
    const theme2 = { color: '#fff', bg: '#000' };
    expect(isSameTheme(theme1, theme2)).toBe(false);
  });

  it('should handle null vs undefined', () => {
    expect(
      isSameTheme(null as unknown as Parameters<typeof isSameTheme>[0], undefined),
    ).toBe(false);
  });

  it('should handle object vs string', () => {
    expect(isSameTheme({ color: '#fff' }, 'dark')).toBe(false);
  });
});

describe('isSameEvent - extended tests', () => {
  it('should handle events in different order', () => {
    const callback1 = () => {};
    const callback2 = () => {};

    const events1 = [
      { eventName: 'click' as const, callback: callback1 },
      { eventName: 'dblclick' as const, callback: callback2 },
    ];
    const events2 = [
      { eventName: 'dblclick' as const, callback: callback2 },
      { eventName: 'click' as const, callback: callback1 },
    ];

    // Order matters for the current implementation
    expect(isSameEvent(events1, events2)).toBe(false);
  });

  it('should handle large number of events', () => {
    const events1 = Array.from({ length: 100 }, (_, i) => ({
      eventName: `event${i}` as any,
      callback: () => {},
    }));
    const events2 = [...events1];

    expect(isSameEvent(events1, events2)).toBe(true);
  });

  it('should handle one empty and one non-empty array', () => {
    const events1: any[] = [];
    const events2 = [{ eventName: 'click' as const, callback: () => {} }];

    expect(isSameEvent(events1, events2)).toBe(false);
  });
});
