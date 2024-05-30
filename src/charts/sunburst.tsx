import { SunburstChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { SunburstSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type {
	Axis,
	EchartsProps,
	ExtensionsComponent,
	GeneratorOptions,
} from '../types/base';

export interface SunBurstProps
	extends EchartsProps<
		GeneratorOptions<SunburstSeriesOption, ExtensionsComponent> & Axis
	> {}

const SunBurst = forwardRef<CoreRef, SunBurstProps>((props, ref) => {
	const SunBurstExtensions = useMemo(() => [SunburstChart], []);
	return (
		<Adapter
			use={SunBurstExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { SunBurst };