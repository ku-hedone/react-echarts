import { useRef } from 'react';
import { HeatmapChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

export interface HeatMapProps extends EchartsProps<EChartsOption> {}

const HeatMap: FC<HeatMapProps> = (props) => {
	
	const use = useRef(applyExtensions([HeatmapChart]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { HeatMap };
