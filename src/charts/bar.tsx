import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<BarSeriesOption | ExtensionsComponent>;

export interface BarProps extends EchartsProps<EChartsOption> {}

export const Bar = forwardRef<CoreRef, BarProps>((props, ref) => {
	const BarExtensions = useMemo(() => [GridComponent, BarChart], []);
	return (
		<Adapter
			use={BarExtensions}
			ref={ref}
			{...props}
		/>
	);
});