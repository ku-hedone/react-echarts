import { SunburstChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { SunburstSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
  Axis,
  EchartsProps,
  ExtensionsComponent,
  GeneratorOptions,
} from '../types/base';
import type { Ref } from 'react';

export interface SunBurstProps extends EchartsProps<
  GeneratorOptions<SunburstSeriesOption, ExtensionsComponent> & Axis
> {
  ref?: Ref<CoreRef>;
}

const SunBurst = ({ ref, ...props }: SunBurstProps) => {
  const SunBurstExtensions = useMemo(() => [SunburstChart], []);
  return <Adapter use={SunBurstExtensions} ref={ref} {...props} />;
};

export { SunBurst };
