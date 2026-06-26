import { describe, it, expect } from 'vitest';
import { startWith } from '../../utils/event';

describe('startWith - comprehensive tests', () => {
  it('should return true for exact match', () => {
    expect(startWith('onClick', 'onClick')).toBe(true);
  });

  it('should return true for prefix match', () => {
    expect(startWith('onClickHandler', 'onClick')).toBe(true);
  });

  it('should return false for non-prefix', () => {
    expect(startWith('click', 'onClick')).toBe(false);
  });

  it('should handle empty target', () => {
    expect(startWith('', 'test')).toBe(false);
  });

  it('should handle empty search', () => {
    expect(startWith('test', '')).toBe(true);
  });

  it('should handle both empty', () => {
    expect(startWith('', '')).toBe(true);
  });

  it('should handle start index', () => {
    expect(startWith('onClick', 'Click', 2)).toBe(true);
  });

  it('should handle start index at 0', () => {
    expect(startWith('onClick', 'on', 0)).toBe(true);
  });

  it('should return false when start index is beyond string', () => {
    expect(startWith('on', 'Click', 5)).toBe(false);
  });

  it('should handle single character', () => {
    expect(startWith('a', 'a')).toBe(true);
    expect(startWith('a', 'b')).toBe(false);
  });

  it('should handle case sensitivity', () => {
    expect(startWith('OnClick', 'onClick')).toBe(false);
    expect(startWith('onClick', 'OnClick')).toBe(false);
  });

  it('should handle special characters', () => {
    expect(startWith('on-click', 'on-')).toBe(true);
    expect(startWith('on_click', 'on_')).toBe(true);
  });

  it('should handle numeric strings', () => {
    expect(startWith('12345', '123')).toBe(true);
    expect(startWith('12345', '456')).toBe(false);
  });

  it('should handle search longer than target', () => {
    expect(startWith('on', 'onClick')).toBe(false);
  });

  it('should handle search equal to target length', () => {
    expect(startWith('onClick', 'onClick')).toBe(true);
  });
});
