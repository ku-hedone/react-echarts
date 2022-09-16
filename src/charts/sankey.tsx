import { useRef } from 'react';
import { SankeyChart } from 'echarts/charts';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { SankeySeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<SankeySeriesOption | ExtensionsComponent>;
export interface SankeyProps extends EchartsProps<EChartsOption> {}

const Sankey: FC<SankeyProps> = (props) => {

	const use = useRef(applyExtensions([SankeyChart]));
	
	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { Sankey };