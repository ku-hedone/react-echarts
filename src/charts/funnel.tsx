import { GridComponent } from 'echarts/components';
import { FunnelChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { FunnelSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
import type { CoreRef } from '../core';
import type { Ref } from 'react';

export interface FunnelProps extends EchartsProps<
  GeneratorOptions<FunnelSeriesOption, ExtensionsComponent>
> {
  ref?: Ref<CoreRef>;
}

const Funnel = ({ ref, ...props }: FunnelProps) => {
  const FunnelExtensions = useMemo(() => [GridComponent, FunnelChart], []);
  return <Adapter use={FunnelExtensions} ref={ref} {...props} />;
};

export { Funnel };
