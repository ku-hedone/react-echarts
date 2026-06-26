import { SankeyChart } from 'echarts/charts';
import Adapter from '../adapter';
import { useMemo } from 'react';
import type { SankeySeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
import type { Ref } from 'react';

export interface SankeyProps extends EchartsProps<
  GeneratorOptions<SankeySeriesOption, ExtensionsComponent>
> {
  ref?: Ref<CoreRef>;
}

const Sankey = ({ ref, ...props }: SankeyProps) => {
  const SankeyExtensions = useMemo(() => [SankeyChart], []);
  return <Adapter use={SankeyExtensions} ref={ref} {...props} />;
};

export { Sankey };
