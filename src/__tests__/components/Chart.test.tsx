import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Chart } from '../../charts/chart';
import { ChartTypes } from '../../constant';
import type { ChartComponentProps } from '../../charts/chart';

const mocks = vi.hoisted(() => {
  const instance = {
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    getOption: vi.fn(() => ({})),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
  };

  return {
    instance,
    init: vi.fn(() => instance),
    dispose: vi.fn(),
    use: vi.fn(),
    getInstanceByDom: vi.fn(() => instance),
  };
});

// Mock ECharts
vi.mock('echarts/core', () => ({
  init: mocks.init,
  dispose: mocks.dispose,
  use: mocks.use,
  getInstanceByDom: mocks.getInstanceByDom,
}));

vi.mock('echarts/renderers', () => ({
  CanvasRenderer: vi.fn(),
}));

vi.mock('echarts/charts', () => ({
  BarChart: vi.fn(),
  FunnelChart: vi.fn(),
  GaugeChart: vi.fn(),
  HeatmapChart: vi.fn(),
  LineChart: vi.fn(),
  PieChart: vi.fn(),
  SankeyChart: vi.fn(),
  SunburstChart: vi.fn(),
}));

vi.mock('echarts/components', () => ({
  GridComponent: vi.fn(),
  VisualMapComponent: vi.fn(),
}));

vi.mock('../../components/GraphicComponent', () => ({
  default: 'GraphicComponent',
}));

const simpleSeriesOptions = (type: Exclude<(typeof ChartTypes)[number], 'graphic'>) => ({
  series: [
    {
      data: [{ value: 1, name: 'A' }],
      type,
    },
  ],
});

describe('Chart Component', () => {
  const axisOptions = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed'],
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: [120, 200, 150],
        type: 'bar' as const,
      },
    ],
  };

  it.each(
    ChartTypes.map(type => ({
      type,
      options:
        type === 'bar' || type === 'line' || type === 'heatmap'
          ? axisOptions
          : type === 'graphic'
            ? { graphic: { type: 'text', style: { text: 'Chart' } } }
            : simpleSeriesOptions(type),
    })),
  )('should render $type chart through its loader', async chartProps => {
    const { container } = render(<Chart {...(chartProps as ChartComponentProps)} />);
    await waitFor(() => {
      expect(container.firstElementChild).toBeInTheDocument();
    });
  });

  it('should handle invalid type gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Chart type={'invalid' as never} options={axisOptions} />);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should handle undefined type', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<Chart type={undefined as never} options={axisOptions} />);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
