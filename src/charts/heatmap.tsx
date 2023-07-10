import { HeatmapChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { HeatmapSeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<HeatmapSeriesOption | ExtensionsComponent>;

export interface HeatMapProps extends EchartsProps<EChartsOption> {}

export const HeatMap = forwardRef<CoreRef, HeatMapProps>((props, ref) => {
	const HeatMapExtensions = useMemo(() => [HeatmapChart], []);
	return (
		<Adapter
			use={HeatMapExtensions}
			ref={ref}
			{...props}
		/>
	);
});