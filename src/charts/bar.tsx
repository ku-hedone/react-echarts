import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
	Axis,
	EchartsProps,
	ExtensionsComponent,
	GeneratorOptions,
} from '../types/base';

export interface BarProps
	extends EchartsProps<GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis> {}

const Bar = forwardRef<CoreRef, BarProps>((props, ref) => {
	const BarExtensions = useMemo(() => [GridComponent, BarChart], []);
	return (
		<Adapter
			use={BarExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { Bar };