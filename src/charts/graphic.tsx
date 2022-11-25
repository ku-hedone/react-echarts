import GraphicComponent from '../components/GraphicComponent';
import Core from '../core';
import type { EchartsProps } from '../types/base';
import type { FC } from 'react';
import type { EChartsOption } from 'echarts/types/dist/shared';

export interface GraphicProps extends EchartsProps<Pick<Required<EChartsOption>, 'graphic'>> {}

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
	return (
		<Core
			options={options}
			style={style}
			className={className}
			theme={theme}
			notMerge={notMerge}
			lazyUpdate={lazyUpdate}
			showLoading={showLoading}
			extensions={[GraphicComponent]}
			debounceDelay={debounceDelay}
			onFinish={onFinish}
			events={[]}
			finished={true}
		/>
	);
};

export { Graphic };
