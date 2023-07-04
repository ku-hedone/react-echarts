import { GridComponent } from 'echarts/components';
import { FunnelChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { FunnelSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';
import type { CoreRef } from '../core';

type EChartsOption = ComposeOption<FunnelSeriesOption | ExtensionsComponent>;

export interface FunnelProps extends EchartsProps<EChartsOption> {}

const Funnel = forwardRef<CoreRef, FunnelProps>((props, ref) => {
	const FunnelExtensions = useMemo(() => [GridComponent, FunnelChart], []);
	return (
		<Adapter
			use={FunnelExtensions}
			ref={ref}
			{...props}
		/>
	);
});

export { Funnel };
