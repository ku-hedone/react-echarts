import { lazy, Suspense } from 'react';
import { ChartTypes } from '../constant';
import type { FC } from 'react';
import type { ChartType } from '../types/base';
import type { BarProps } from './bar';
import type { FunnelProps } from './funnel';
import type { GaugeProps } from './gauge';
import type { HeatMapProps } from './heatmap';
import type { LineProps } from './line';
import type { PieProps } from './pie';
import type { SankeyProps } from './sankey';
import type { GraphicProps } from './graphic';
import type { SunBurstProps } from './sunburst';

export type ChartComponentProps =
  | ({
      type: 'bar';
    } & BarProps)
  | ({
      type: 'gauge';
    } & GaugeProps)
  | ({
      type: 'heatmap';
    } & HeatMapProps)
  | ({
      type: 'line';
    } & LineProps)
  | ({
      type: 'pie';
    } & PieProps)
  | ({
      type: 'funnel';
    } & FunnelProps)
  | ({
      type: 'sankey';
    } & SankeyProps)
  | ({
      type: 'graphic';
    } & GraphicProps)
  | ({
      type: 'sunburst';
    } & SunBurstProps);

type LazyChartComponent = FC<Omit<ChartComponentProps, 'type'>>;

const chartLoaders: Record<ChartType, () => Promise<{ default: LazyChartComponent }>> = {
  bar: () => import('./bar').then(res => ({ default: res.Bar as LazyChartComponent })),
  gauge: () =>
    import('./gauge').then(res => ({ default: res.Gauge as LazyChartComponent })),
  heatmap: () =>
    import('./heatmap').then(res => ({ default: res.HeatMap as LazyChartComponent })),
  line: () => import('./line').then(res => ({ default: res.Line as LazyChartComponent })),
  pie: () => import('./pie').then(res => ({ default: res.Pie as LazyChartComponent })),
  funnel: () =>
    import('./funnel').then(res => ({ default: res.Funnel as LazyChartComponent })),
  sankey: () =>
    import('./sankey').then(res => ({ default: res.Sankey as LazyChartComponent })),
  graphic: () =>
    import('./graphic').then(res => ({ default: res.Graphic as LazyChartComponent })),
  sunburst: () =>
    import('./sunburst').then(res => ({
      default: res.SunBurst as LazyChartComponent,
    })),
};

export const Chart: FC<ChartComponentProps> = ({ type, options, ...other }) => {
  try {
    if (typeof type === 'undefined' || !type) {
      throw new Error(`type must be valid string. eg: ${ChartTypes.toString()}`);
    }
    type = type.toLowerCase().trim() as ChartType;
    if (ChartTypes.indexOf(type) === -1) {
      throw new Error(`type must in ${ChartTypes.toString()}`);
    }
    const Chart = lazy<LazyChartComponent>(chartLoaders[type]);
    return (
      <Suspense fallback={null}>
        <Chart options={options} {...other} />
      </Suspense>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};
