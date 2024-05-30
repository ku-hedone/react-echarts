import { PieChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { PieSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';

export interface PieProps
	extends EchartsProps<GeneratorOptions<PieSeriesOption, ExtensionsComponent>> {}

const Pie = forwardRef<CoreRef, PieProps>((props, ref) => {
	const PieExtensions = useMemo(() => [PieChart], []);
	return (
		<Adapter
			use={PieExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { Pie };
