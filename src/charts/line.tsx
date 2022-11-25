import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { LineSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<LineSeriesOption | ExtensionsComponent>;

export interface LineProps extends EchartsProps<EChartsOption> {}

const Line: FC<LineProps> = (props) => {
	return (
		<Adapter
			use={[GridComponent, LineChart]}
			{...props}
		/>
	);
};

export { Line };
