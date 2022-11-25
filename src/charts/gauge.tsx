import { GaugeChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

export interface GaugeProps extends EchartsProps<EChartsOption> {}

export const Gauge: FC<GaugeProps> = (props) => {
	
	return (
		<Adapter
			use={[GaugeChart]}
			{...props}
		/>
	);
};
