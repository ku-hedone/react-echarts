import { ChartTypes } from '../constant';
import type {
	GridComponentOption,
	LegendComponentOption,
	TitleComponentOption,
	DatasetComponentOption,
	ToolboxComponentOption,
	TooltipComponentOption,
	VisualMapComponentOption,
	GraphicComponentOption,
} from 'echarts/components';
import type { ECharts } from 'echarts/core';
import type { EChartsOption, ComposeOption } from 'echarts/types/dist/shared';
import type { CSSProperties } from 'react';
import type { EchartsEventSource } from './event';

/**
 * echarts extensions' type
 */
interface LoadingOptions {
	/**
	 * default loading
	 */
	text?: string;
	/**
	 * default #c23531
	 */
	color?: string;
	/**
	 * default #000
	 */
	textColor?: string;
	/**
	 * default rgba(255, 255, 255, 0.8)
	 */
	maskColor?: string;
	/**
	 * default 0
	 */
	zlevel?: number;
	/**
	 * default 12
	 *
	 * support from v4.8.0
	 *
	 */
	fontSize?: number;
	/**
	 * 是否显示旋转动画
	 *
	 * default true
	 *
	 * support from v4.8.0
	 *
	 */
	showSpinner?: boolean;
	/**
	 * 旋转动画（spinner）的半径
	 *
	 * default 10
	 *
	 * support from v4.8.0
	 *
	 */
	spinnerRadius?: number;
	/**
	 * 旋转动画（spinner）的线宽
	 *
	 * default 5
	 *
	 * support from v4.8.0
	 *
	 */
	lineWidth: number;
	/**
	 * 字体粗细
	 *
	 * default normal
	 *
	 * support from v5.0.1
	 *
	 */
	fontWeight: 'normal';
	/**
	 * 字体风格
	 *
	 * default normal
	 *
	 * support from v5.0.1
	 *
	 */
	fontStyle: 'normal';
	/**
	 * 字体系列
	 *
	 * default sans-serif
	 *
	 * support from v5.0.1
	 *
	 */
	fontFamily: 'sans-serif';
}
export interface EchartsProps<T> extends Partial<EchartsEventSource> {
	readonly options: T;
	readonly theme?: Record<string, string> | string;
	/**
	 * resize event's debounced time
	 */
	debounceDelay?: number;
	/**
	 * params for echart instance setOption
	 */
	notMerge?: boolean;
	lazyUpdate?: boolean;
	/**
	 * params for echart instance's set loading status
	 */
	showLoading?: boolean | { type?: string; opts?: LoadingOptions };
	/**
	 * when echart get ready (paint or render finished)
	 */
	onFinish?: (instance: ECharts) => void;
	style?: CSSProperties;
	className?: string;
}
/**
 * normal extensions type
 */
export type ExtensionsComponent =
	| DatasetComponentOption
	| TitleComponentOption
	| ToolboxComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| LegendComponentOption
	| GridComponentOption
	| VisualMapComponentOption
	| GraphicComponentOption;

/**
 * attributes which need be use extension
 */
export type ExtensionsKeyValue = Pick<
	EChartsOption,
	| 'visualMap'
	| 'tooltip'
	| 'title'
	| 'legend'
	| 'toolbox'
	| 'timeline'
	| 'grid'
	| 'dataset'
	| 'graphic'
>;

export type ChartType = typeof ChartTypes[number];

export type AdapterEChartsOption = ComposeOption<ExtensionsComponent>;
