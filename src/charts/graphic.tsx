import { useMemo } from 'react';
import GraphicComponent from '../components/GraphicComponent';
import Core from '../core';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts';
import type { EchartsProps } from '../types/base';
import type { RecordToArray } from '../types/event';

export interface GraphicProps
	extends EchartsProps<Pick<Required<EChartsOption>, 'graphic'>> {}

const events: RecordToArray = [];

const Graphic: FC<GraphicProps & { uuid: number }> = ({
	options,
	onFinish,
	style,
	className,
	theme,
	notMerge,
	lazyUpdate,
	showLoading,
	debounceDelay,
}) => {
	const GraphicExtensions = useMemo(() => [GraphicComponent], []);
	return (
		<Core
			options={options}
			style={style}
			className={className}
			theme={theme}
			notMerge={notMerge}
			lazyUpdate={lazyUpdate}
			showLoading={showLoading}
			extensions={GraphicExtensions}
			debounceDelay={debounceDelay}
			onFinish={onFinish}
			events={events}
			finished={true}
		/>
	);
};

export { Graphic };
