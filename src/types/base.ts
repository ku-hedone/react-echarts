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
	TimelineComponentOption,
} from 'echarts/components';
import type {
	ECharts,
	EChartsOption,
	XAXisComponentOption,
	YAXisComponentOption,
} from 'echarts';
import type { CSSProperties } from 'react';
import type { EchartsEventSource } from './event';

export interface Axis {
	xAxis?: XAXisComponentOption | XAXisComponentOption[];
	yAxis?: YAXisComponentOption | YAXisComponentOption[];
}

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
	/**
	 * enable auto resize feature
	 */
	autoResize?: boolean;
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
	| VisualMapComponentOption
	| GraphicComponentOption
	| TimelineComponentOption;

export type ExtensionsKey =
	| 'dataset'
	| 'title'
	| 'toolbox'
	| 'tooltip'
	| 'grid'
	| 'legend'
	| 'visualMap'
	| 'graphic'
	| 'timeline';

/**
 * attributes which need be use extension
 */
export type ExtensionsKeyValue = Partial<Record<ExtensionsKey, true>>;

export type ChartType = (typeof ChartTypes)[number];

interface ComponentOption {
	mainType?: string;
}

type ExtractComponentOption<OptionUnion, ExtractMainType> = OptionUnion extends {
	mainType?: ExtractMainType;
}
	? OptionUnion
	: never;

type GetMainType<OptionUnion extends ComponentOption> = Exclude<
	OptionUnion['mainType'],
	undefined
>;

type ComposeUnitOption<OptionUnion extends ComponentOption> = {
	[key in GetMainType<OptionUnion>]?: ExtractComponentOption<OptionUnion, key>;
};

type AnimationOptionKeys =
	| 'animation'
	| 'animationThreshold'
	| 'animationDuration'
	| 'animationEasing'
	| 'animationDelay'
	| 'animationDurationUpdate'
	| 'animationEasingUpdate'
	| 'animationDelayUpdate'
	| 'stateAnimation';

type AnimationOption = Pick<EChartsOption, AnimationOptionKeys>;

type ColorOptionKeys = 'color' | 'colorLayer';

type ColorOption = Pick<EChartsOption, ColorOptionKeys>;

type BaseOptionKeys =
	| 'timeline'
	| 'textStyle'
	| 'useUTC'
	| 'backgroundColor'
	| 'darkMode';

type BaseOption = Pick<EChartsOption, BaseOptionKeys>;

export type AdapterEChartsBaseOption = BaseOption & ColorOption & AnimationOption;

export type GeneratorOptions<T, E extends ComponentOption> = {
	series: T[];
} & ComposeUnitOption<E> &
	AdapterEChartsBaseOption;

export type AdapterEChartsOption = AdapterEChartsBaseOption &
	ComposeUnitOption<ExtensionsComponent>;
