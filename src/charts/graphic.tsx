import { useRef } from 'react';
import { applyExtensions } from '../utils/extensions';
import Adapter from '../adapter';
import type { EchartsProps } from '../types/base';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';

export interface GraphicProps extends EchartsProps<Pick<Required<EChartsOption>, 'graphic'>> {}

const Graphic: FC<GraphicProps> = (props) => {
	
	const use = useRef(applyExtensions([]));

	return (
		<Adapter
			use={use}
			{...props}
		/>
	);
};

export { Graphic };
