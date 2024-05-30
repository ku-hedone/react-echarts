import { SankeyChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { SankeySeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';
export interface SankeyProps
	extends EchartsProps<GeneratorOptions<SankeySeriesOption, ExtensionsComponent>> {}

const Sankey = forwardRef<CoreRef, SankeyProps>((props, ref) => {
	const SankeyExtensions = useMemo(() => [SankeyChart], []);
	return (
		<Adapter
			use={SankeyExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { Sankey };