import { GaugeChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { GaugeSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
import type { CoreRef } from '../core';

export interface GaugeProps
	extends EchartsProps<GeneratorOptions<GaugeSeriesOption, ExtensionsComponent>> {}

export const Gauge = forwardRef<CoreRef, GaugeProps>((props, ref) => {
	const GaugeExtensions = useMemo(() => [GaugeChart], []);
	return (
		<Adapter
			use={GaugeExtensions}
			ref={ref}
			{...props}
		/>
	);
});
