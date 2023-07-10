import { PieChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { PieSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<PieSeriesOption | ExtensionsComponent>;

export interface PieProps extends EchartsProps<EChartsOption> {}

export const Pie = forwardRef<CoreRef, PieProps>((props, ref) => {
	const PieExtensions = useMemo(() => [PieChart], []);
	return (
		<Adapter
			use={PieExtensions}
			ref={ref}
			{...props}
		/>
	);
});