import { GaugeChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { GaugeSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
import type { CoreRef } from '../core';
import type { Ref } from 'react';

export interface GaugeProps extends EchartsProps<
  GeneratorOptions<GaugeSeriesOption, ExtensionsComponent>
> {
  ref?: Ref<CoreRef>;
}

export const Gauge = ({ ref, ...props }: GaugeProps) => {
  const GaugeExtensions = useMemo(() => [GaugeChart], []);
  return <Adapter use={GaugeExtensions} ref={ref} {...props} />;
};
