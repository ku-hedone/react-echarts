import { useRef } from 'react';
import { PieChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';

export interface PieProps extends EchartsProps<EChartsOption> {}

const Pie: FC<PieProps> = (props) => {
	
	const use = useRef(applyExtensions([PieChart]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { Pie };
