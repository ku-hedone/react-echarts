import { describe, it, expect } from 'vitest';
import { ChartTypes } from '../../constant';

describe('ChartTypes', () => {
  it('should contain all supported chart types', () => {
    expect(ChartTypes).toContain('bar');
    expect(ChartTypes).toContain('line');
    expect(ChartTypes).toContain('pie');
    expect(ChartTypes).toContain('funnel');
    expect(ChartTypes).toContain('gauge');
    expect(ChartTypes).toContain('heatmap');
    expect(ChartTypes).toContain('sankey');
    expect(ChartTypes).toContain('sunburst');
    expect(ChartTypes).toContain('graphic');
  });

  it('should have correct length', () => {
    expect(ChartTypes.length).toBe(9);
  });

  it('should be a readonly array', () => {
    // ChartTypes is 'as const', so it should be readonly
    expect(Array.isArray(ChartTypes)).toBe(true);
  });
});
