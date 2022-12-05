import { GaugeChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { GaugeSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<GaugeSeriesOption | ExtensionsComponent>;

export interface GaugeProps extends EchartsProps<EChartsOption> {}

export const Gauge: FC<GaugeProps> = (props) => {
	
	return (
		<Adapter
			use={[GaugeChart]}
			{...props}
		/>
	);
};
