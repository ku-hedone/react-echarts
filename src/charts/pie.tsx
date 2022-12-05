import { PieChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { PieSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<PieSeriesOption | ExtensionsComponent>;

export interface PieProps extends EchartsProps<EChartsOption> {}

const Pie: FC<PieProps> = (props) => {
	
	return (
		<Adapter
			use={[PieChart]}
			{...props}
		/>
	);
};

export { Pie };
