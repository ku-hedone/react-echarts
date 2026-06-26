import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
  Axis,
  EchartsProps,
  ExtensionsComponent,
  GeneratorOptions,
} from '../types/base';
import type { Ref } from 'react';

export interface BarProps extends EchartsProps<
  GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis
> {
  ref?: Ref<CoreRef>;
}

const Bar = ({ ref, ...props }: BarProps) => {
  const BarExtensions = useMemo(() => [GridComponent, BarChart], []);
  return <Adapter use={BarExtensions} ref={ref} {...props} />;
};

export { Bar };
