import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { LineSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
  Axis,
  EchartsProps,
  ExtensionsComponent,
  GeneratorOptions,
} from '../types/base';
import type { Ref } from 'react';

export interface LineProps extends EchartsProps<
  GeneratorOptions<LineSeriesOption, ExtensionsComponent> & Axis
> {
  ref?: Ref<CoreRef>;
}

const Line = ({ ref, ...props }: LineProps) => {
  const LineExtensions = useMemo(() => [GridComponent, LineChart], []);
  return <Adapter use={LineExtensions} ref={ref} {...props} />;
};

export { Line };
