import { useRef } from 'react';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { LineSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<LineSeriesOption | ExtensionsComponent>;

export interface LineProps extends EchartsProps<EChartsOption> {}

const Line: FC<LineProps> = (props) => {
	const use = useRef(applyExtensions([GridComponent, LineChart]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { Line };
