import { useRef } from 'react';
import { GaugeChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

export interface GaugeProps extends EchartsProps<EChartsOption> {}

export const Gauge: FC<GaugeProps> = (props) => {
	
	const use = useRef(applyExtensions([GaugeChart]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};
