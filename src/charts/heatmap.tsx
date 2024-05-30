import { HeatmapChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { HeatmapSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
	Axis,
	EchartsProps,
	ExtensionsComponent,
	GeneratorOptions,
} from '../types/base';
export interface HeatMapProps
	extends EchartsProps<
		GeneratorOptions<HeatmapSeriesOption, ExtensionsComponent> & Axis
	> {}

const HeatMap = forwardRef<CoreRef, HeatMapProps>((props, ref) => {
	const HeatMapExtensions = useMemo(() => [HeatmapChart], []);
	return (
		<Adapter
			use={HeatMapExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { HeatMap };
