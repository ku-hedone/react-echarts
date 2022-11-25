import { PieChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

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
