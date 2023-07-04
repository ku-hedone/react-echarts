import { GaugeChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { GaugeSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<GaugeSeriesOption | ExtensionsComponent>;

export interface GaugeProps extends EchartsProps<EChartsOption> {}

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
