import { PieChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { PieSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
import type { Ref } from 'react';

export interface PieProps extends EchartsProps<
  GeneratorOptions<PieSeriesOption, ExtensionsComponent>
> {
  ref?: Ref<CoreRef>;
}

const Pie = ({ ref, ...props }: PieProps) => {
  const PieExtensions = useMemo(() => [PieChart], []);
  return <Adapter use={PieExtensions} ref={ref} {...props} />;
};

export { Pie };
