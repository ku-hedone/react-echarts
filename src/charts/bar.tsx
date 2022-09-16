import { useRef } from 'react';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<BarSeriesOption | ExtensionsComponent>;

export interface BarProps extends EchartsProps<EChartsOption> {}

const Bar: FC<BarProps> = (props) => {
	
	const use = useRef(applyExtensions([GridComponent, BarChart]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { Bar };
