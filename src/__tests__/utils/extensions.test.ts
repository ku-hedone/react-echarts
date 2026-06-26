import { describe, it, expect, vi, beforeEach } from 'vitest';
import applyExtensions from '../../utils/extensions';

// Mock ECharts modules
vi.mock('echarts/core', () => ({
  use: vi.fn(),
}));

vi.mock('echarts/features', () => ({
  LabelLayout: vi.fn(),
}));

vi.mock('../../components/GridComponent', () => ({
  default: 'GridComponent',
}));

vi.mock('../../components/TooltipComponent', () => ({
  default: 'TooltipComponent',
}));

vi.mock('../../components/TitleComponent', () => ({
  default: 'TitleComponent',
}));

vi.mock('../../components/LegendComponent', () => ({
  default: 'LegendComponent',
}));

vi.mock('../../components/ToolboxComponent', () => ({
  default: 'ToolboxComponent',
}));

vi.mock('../../components/VisualMapComponent', () => ({
  default: 'VisualMapComponent',
}));

vi.mock('../../components/TimelineComponent', () => ({
  default: 'TimelineComponent',
}));

vi.mock('../../components/DataSetComponent', () => ({
  default: 'DataSetComponent',
}));

vi.mock('../../components/GraphicComponent', () => ({
  default: 'GraphicComponent',
}));

describe('applyExtensions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a function', () => {
    const result = applyExtensions([]);
    expect(typeof result).toBe('function');
  });

  it('should return extensions with LabelLayout by default', async () => {
    const apply = applyExtensions([]);
    const result = await apply({});
    // LabelLayout is mocked as a function, check length
    expect(result.length).toBeGreaterThan(0);
  });

  it('should include initial extensions', async () => {
    const initialExt = ['CustomExtension'];
    const apply = applyExtensions(initialExt);
    const result = await apply({});
    expect(result).toContain('CustomExtension');
    expect(result.length).toBeGreaterThan(1);
  });

  it('should add GridComponent when options.grid exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ grid: true });
    expect(result).toContain('GridComponent');
  });

  it('should add TooltipComponent when options.tooltip exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ tooltip: true });
    expect(result).toContain('TooltipComponent');
  });

  it('should add TitleComponent when options.title exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ title: true });
    expect(result).toContain('TitleComponent');
  });

  it('should add LegendComponent when options.legend exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ legend: true });
    expect(result).toContain('LegendComponent');
  });

  it('should add multiple components', async () => {
    const apply = applyExtensions([]);
    const result = await apply({
      grid: true,
      tooltip: true,
      title: true,
    });
    expect(result).toContain('GridComponent');
    expect(result).toContain('TooltipComponent');
    expect(result).toContain('TitleComponent');
  });
});
