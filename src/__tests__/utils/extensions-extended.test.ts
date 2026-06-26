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

describe('applyExtensions - extended tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add ToolboxComponent when options.toolbox exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ toolbox: true });
    expect(result).toContain('ToolboxComponent');
  });

  it('should add VisualMapComponent when options.visualMap exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ visualMap: true });
    expect(result).toContain('VisualMapComponent');
  });

  it('should add TimelineComponent when options.timeline exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ timeline: true });
    expect(result).toContain('TimelineComponent');
  });

  it('should add DataSetComponent when options.dataset exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ dataset: true });
    expect(result).toContain('DataSetComponent');
  });

  it('should add GraphicComponent when options.graphic exists', async () => {
    const apply = applyExtensions([]);
    const result = await apply({ graphic: true });
    expect(result).toContain('GraphicComponent');
  });

  it('should handle all options at once', async () => {
    const apply = applyExtensions([]);
    const result = await apply({
      grid: true,
      tooltip: true,
      title: true,
      legend: true,
      toolbox: true,
      visualMap: true,
      timeline: true,
      dataset: true,
      graphic: true,
    });

    expect(result).toContain('GridComponent');
    expect(result).toContain('TooltipComponent');
    expect(result).toContain('TitleComponent');
    expect(result).toContain('LegendComponent');
    expect(result).toContain('ToolboxComponent');
    expect(result).toContain('VisualMapComponent');
    expect(result).toContain('TimelineComponent');
    expect(result).toContain('DataSetComponent');
    expect(result).toContain('GraphicComponent');
    expect(result.length).toBeGreaterThan(9);
  });

  it('should handle single extension as non-array', async () => {
    const apply = applyExtensions('SingleExtension' as any);
    const result = await apply({});
    expect(result).toContain('SingleExtension');
  });

  it('should not add components when options are empty', async () => {
    const apply = applyExtensions([]);
    const result = await apply({});

    expect(result).not.toContain('GridComponent');
    expect(result).not.toContain('TooltipComponent');
    expect(result).not.toContain('TitleComponent');
  });

  it('should handle falsy option values', async () => {
    const apply = applyExtensions([]);
    const options = {
      grid: false,
      tooltip: undefined,
      title: null,
    } as unknown as Parameters<ReturnType<typeof applyExtensions>>[0];
    const result = await apply(options);

    expect(result).not.toContain('GridComponent');
    expect(result).not.toContain('TooltipComponent');
    expect(result).not.toContain('TitleComponent');
  });
});
