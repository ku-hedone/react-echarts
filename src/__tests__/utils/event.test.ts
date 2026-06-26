import { describe, it, expect } from 'vitest';
import { startWith } from '../../utils/event';

describe('startWith', () => {
  it('should return true when string starts with search', () => {
    expect(startWith('onClick', 'on')).toBe(true);
  });

  it('should return false when string does not start with search', () => {
    expect(startWith('click', 'on')).toBe(false);
  });

  it('should return true for empty search string', () => {
    expect(startWith('onClick', '')).toBe(true);
  });

  it('should handle start index', () => {
    expect(startWith('onClick', 'Click', 2)).toBe(true);
  });

  it('should return false when start index is out of bounds', () => {
    expect(startWith('on', 'Click', 5)).toBe(false);
  });

  it('should return true for exact match', () => {
    expect(startWith('click', 'click')).toBe(true);
  });

  it('should return false for partial match', () => {
    expect(startWith('click', 'clickExtra')).toBe(false);
  });
});
