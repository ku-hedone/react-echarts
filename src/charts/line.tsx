import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { LineSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
	Axis,
	EchartsProps,
	ExtensionsComponent,
	GeneratorOptions,
} from '../types/base';
export interface LineProps
	extends EchartsProps<GeneratorOptions<LineSeriesOption, ExtensionsComponent> & Axis> {}

const Line = forwardRef<CoreRef, LineProps>((props, ref) => {
	const LineExtensions = useMemo(() => [GridComponent, LineChart], []);
	return (
		<Adapter
			use={LineExtensions}
			ref={ref}
			{...props}
		/>
	);
});
export { Line };
