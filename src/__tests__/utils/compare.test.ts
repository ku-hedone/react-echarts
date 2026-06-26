import { describe, it, expect } from 'vitest';
import { isSameStyle, isSameTheme, isSameEvent } from '../../utils/compare';

describe('isSameStyle', () => {
  it('should return true for identical styles', () => {
    const style = { width: '100%', height: '400px' };
    expect(isSameStyle(style, style)).toBe(true);
  });

  it('should return true for equal styles', () => {
    const style1 = { width: '100%', height: '400px' };
    const style2 = { width: '100%', height: '400px' };
    expect(isSameStyle(style1, style2)).toBe(true);
  });

  it('should return false for different styles', () => {
    const style1 = { width: '100%', height: '400px' };
    const style2 = { width: '50%', height: '400px' };
    expect(isSameStyle(style1, style2)).toBe(false);
  });

  it('should return true for both undefined', () => {
    expect(isSameStyle(undefined, undefined)).toBe(true);
  });

  it('should return false for one undefined', () => {
    const style = { width: '100%' };
    expect(isSameStyle(style, undefined)).toBe(false);
    expect(isSameStyle(undefined, style)).toBe(false);
  });

  it('should return false for different number of keys', () => {
    const style1 = { width: '100%' };
    const style2 = { width: '100%', height: '400px' };
    expect(isSameStyle(style1, style2)).toBe(false);
  });
});

describe('isSameTheme', () => {
  it('should return true for identical string themes', () => {
    expect(isSameTheme('dark', 'dark')).toBe(true);
  });

  it('should return false for different string themes', () => {
    expect(isSameTheme('dark', 'light')).toBe(false);
  });

  it('should return true for identical object themes', () => {
    const theme = { color: '#fff' };
    expect(isSameTheme(theme, theme)).toBe(true);
  });

  it('should return true for equal object themes', () => {
    const theme1 = { color: '#fff', bg: '#000' };
    const theme2 = { color: '#fff', bg: '#000' };
    expect(isSameTheme(theme1, theme2)).toBe(true);
  });

  it('should return false for different object themes', () => {
    const theme1 = { color: '#fff' };
    const theme2 = { color: '#000' };
    expect(isSameTheme(theme1, theme2)).toBe(false);
  });

  it('should return true for both undefined', () => {
    expect(isSameTheme(undefined, undefined)).toBe(true);
  });

  it('should return false for different types', () => {
    expect(isSameTheme('dark', { color: '#fff' })).toBe(false);
  });
});

describe('isSameEvent', () => {
  const callback1 = () => {};
  const callback2 = () => {};

  it('should return true for identical events', () => {
    const events = [{ eventName: 'click' as const, callback: callback1 }];
    expect(isSameEvent(events, events)).toBe(true);
  });

  it('should return true for equal events', () => {
    const events1 = [{ eventName: 'click' as const, callback: callback1 }];
    const events2 = [{ eventName: 'click' as const, callback: callback1 }];
    expect(isSameEvent(events1, events2)).toBe(true);
  });

  it('should return false for different callbacks', () => {
    const events1 = [{ eventName: 'click' as const, callback: callback1 }];
    const events2 = [{ eventName: 'click' as const, callback: callback2 }];
    expect(isSameEvent(events1, events2)).toBe(false);
  });

  it('should return false for different lengths', () => {
    const events1 = [{ eventName: 'click' as const, callback: callback1 }];
    const events2 = [
      { eventName: 'click' as const, callback: callback1 },
      { eventName: 'dblclick' as const, callback: callback2 },
    ];
    expect(isSameEvent(events1, events2)).toBe(false);
  });

  it('should return true for empty arrays', () => {
    expect(isSameEvent([], [])).toBe(true);
  });
});
