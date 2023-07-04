import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { LineSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<LineSeriesOption | ExtensionsComponent>;

export interface LineProps extends EchartsProps<EChartsOption> {}

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
