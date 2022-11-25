import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<BarSeriesOption | ExtensionsComponent>;

export interface BarProps extends EchartsProps<EChartsOption> {}

const BarExtensions = [GridComponent, BarChart];

const Bar: FC<BarProps> = (props) => {
	
	return (
		<Adapter
			use={BarExtensions}
			{...props}
		/>
	);
};

export { Bar };
