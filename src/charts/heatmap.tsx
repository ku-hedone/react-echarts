import { HeatmapChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { HeatmapSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
  Axis,
  EchartsProps,
  ExtensionsComponent,
  GeneratorOptions,
} from '../types/base';
import type { Ref } from 'react';

export interface HeatMapProps extends EchartsProps<
  GeneratorOptions<HeatmapSeriesOption, ExtensionsComponent> & Axis
> {
  ref?: Ref<CoreRef>;
}

const HeatMap = ({ ref, ...props }: HeatMapProps) => {
  const HeatMapExtensions = useMemo(() => [HeatmapChart], []);
  return <Adapter use={HeatMapExtensions} ref={ref} {...props} />;
};

export { HeatMap };
