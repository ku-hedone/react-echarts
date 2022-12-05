import { GridComponent } from 'echarts/components';
import { FunnelChart } from 'echarts/charts';
import Adapter from '../adapter';
import type { FC } from 'react';
import type { FunnelSeriesOption } from 'echarts/charts';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent } from '../types/base';

type EChartsOption = ComposeOption<FunnelSeriesOption | ExtensionsComponent>;

export interface FunnelProps extends EchartsProps<EChartsOption> {}

const FunnelExtensions = [GridComponent, FunnelChart];

const Funnel: FC<FunnelProps> = (props) => {
	return (
		<Adapter
			use={FunnelExtensions}
			{...props}
		/>
	);
};

export { Funnel };
