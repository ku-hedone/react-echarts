import { SankeyChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { ComposeOption } from 'echarts/core';
import type { SankeySeriesOption } from 'echarts/charts';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<SankeySeriesOption | ExtensionsComponent>;
export interface SankeyProps extends EchartsProps<EChartsOption> {}

export const Sankey = forwardRef<CoreRef, SankeyProps>((props, ref) => {
	const SankeyExtensions = useMemo(() => [SankeyChart], []);
	return (
		<Adapter
			use={SankeyExtensions}
			ref={ref}
			{...props}
		/>
	);
});