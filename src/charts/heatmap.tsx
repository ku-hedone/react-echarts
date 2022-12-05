import { HeatmapChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { HeatmapSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<HeatmapSeriesOption | ExtensionsComponent>;

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
