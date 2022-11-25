import { HeatmapChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

export interface HeatMapProps extends EchartsProps<EChartsOption> {}

const HeatMap: FC<HeatMapProps> = (props) => {
	
	return (
		<Adapter
			use={[HeatmapChart]}
			{...props}
		/>
	);
};

export { HeatMap };
