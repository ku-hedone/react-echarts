import {
	useLayoutEffect,
	useRef,
	useCallback,
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from 'react';
import { dispose, getInstanceByDom, init, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { connect } from '../utils/event';
import { useResize } from '../hook/useResize';
import type { ECharts } from 'echarts/core';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { EchartsProps } from '../types/base';
import type { EchartsEventName, RecordToArray } from '../types/event';
import type { Extensions } from '../utils/extensions';

interface ReactEchartProps extends Omit<EchartsProps<EChartsOption>, EchartsEventName> {
	readonly options: EChartsOption;
	extensions: Extensions;
	events: RecordToArray;
	finished: boolean;
}

export interface CoreRef {
	instance: () => ECharts | undefined;
}

use([CanvasRenderer]);
/**
 * bind events
 */
const bind = connect();
/**
 * remove last bind events
 */
const removeBind = connect('off');

const defaultHeight = 'fit-content';
const defaultMinHeight = '300px';

export const Core = forwardRef<CoreRef, ReactEchartProps>(
	(
		{
			theme,
			options,
			notMerge = true,
			lazyUpdate = false,
			debounceDelay = 0,
			showLoading,
			className,
			style,
			extensions,
			onFinish,
			events,
			finished,
		},
		ref,
	) => {
		// TODO: use Sequence Component to change into sync coding style
		// so need a flag to control render
		// when uninitialized, can not be render
		const [isUpdatePreparation, setUpdatePreparation] = useState(false);
		const dom = useRef<HTMLDivElement>(null);
		/**
		 * when first init echart
		 *
		 * should be use mounted element's attributes initial
		 */
		const isFirstResize = useRef(true);
		/**
		 * echarts instance
		 */
		const instance = useRef<ECharts>();
		/**
		 * last events
		 *
		 * for remove events more easily
		 */
		const PREVIOUS_EVENTS = useRef<ReactEchartProps['events']>([]);
		/**
		 * dispose echarts instance
		 */
		const disposeInstance = useCallback(() => {
			if (dom.current) {
				dispose(dom.current);
			}
		}, []);
		/**
		 * when inline style or className changed, resize
		 */
		const resize = () => {
			const echartInstance = instance.current;
			if (echartInstance && !isFirstResize.current) {
				try {
					echartInstance.resize({
						width: 'auto',
						height: 'auto',
					});
				} catch (e) {
					console.warn(e);
				}
			}
			isFirstResize.current = false;
		};
		/**
		 * use Resize Observer as chart size trigger
		 */
		useResize({
			ref: dom,
			fun: resize,
			debounceDelay,
		});
		/**
		 * update the local echarts
		 */
		const updateEChartsOption = useCallback(() => {
			const echartInstance = instance.current;
			if (echartInstance && options) {
				const mergerOptions: string[] = [];
				if ('legend' in options) {
					mergerOptions.push('legend');
				}
				if ('tooltip' in options) {
					mergerOptions.push('tooltip');
				}
				if ('series' in options) {
					mergerOptions.push('series');
				}
				echartInstance.setOption(options, {
					replaceMerge: mergerOptions,
					lazyUpdate,
				});
			}
		}, [options, lazyUpdate]);
		/**
		 * update the local echarts loading status
		 */
		const updateEchartLoading = useCallback(() => {
			const echartInstance = instance.current;
			if (echartInstance) {
				if (showLoading) {
					if (typeof showLoading === 'boolean') {
						echartInstance.showLoading();
					} else {
						const { type, opts } = showLoading;
						echartInstance.showLoading(type, opts);
					}
				} else {
					echartInstance.hideLoading();
				}
			}
		}, [showLoading]);
		/**
		 * init echart instance
		 *
		 * when extensions or theme changed, re-init echart
		 */
		// TODO optimize into compare ref
		const initEchart = useCallback(() => {
			// if extensions is not empty, use extensions
			// otherwise, do not use extensions
			if (dom.current && finished && Array.isArray(extensions) && extensions.length > 0) {
				setUpdatePreparation(false);
				// finished means that all extensions has downloaded
				use(extensions);

				/**
				 * now, initEchart will also be activated by other props
				 * such as
				 * options | notMerge | lazyUpdate | showLoading | className | style |
				 * onFinish | events |
				 *
				 * but this is useless and waste of calculate resource
				 *
				 * need be optimized to that way
				 * just extensions & theme‘s value diff from last
				 */
				if (instance.current) {
					// if instance already existed
					// firstly, should be dispose
					disposeInstance();
				}
				/**
				 * use element width and height init echart instance
				 *
				 * ref may be cleared by user in runtime every moment
				 *
				 * so need prevent ref clear into empty
				 */
				if (dom.current) {
					const opts = {
						width: dom.current.clientWidth,
						height: dom.current.clientHeight,
						renderer: 'canvas',
					} as const;
					init(dom.current, theme, opts);
					// update echart instance
					instance.current = getInstanceByDom(dom.current);
					setUpdatePreparation(true);
				}
			}
		}, [finished, extensions, disposeInstance, theme]);
		/**
		 * bind events to local echarts
		 */
		const bindEvents = useCallback(() => {
			const echartInstance = instance.current;
			if (echartInstance) {
				const PREVIOUS = PREVIOUS_EVENTS.current;
				removeBind(echartInstance, PREVIOUS);
				bind(echartInstance, events);
			}
		}, [events]);
		/**
		 * render a new echarts instance
		 *
		 * when theme or options or event changed, re-render
		 */
		const render = useCallback(() => {
			updateEChartsOption();
			bindEvents();
			if (instance.current && typeof onFinish === 'function') {
				onFinish(instance.current);
			}
		}, [updateEChartsOption, bindEvents, onFinish]);
		/**
		 * when window resize
		 */
		useEffect(() => {
			updateEchartLoading();
		}, [updateEchartLoading]);

		useLayoutEffect(() => {
			initEchart();
		}, [initEchart]);

		useLayoutEffect(() => {
			if (isUpdatePreparation) {
				render();
			}
		}, [isUpdatePreparation, render]);

		useLayoutEffect(() => {
			resize();
		}, [className, style]);
		/**
		 * when window resize
		 */
		useEffect(() => {
			return () => {
				if (instance.current) {
					console.log(
						'Unmounted Core: remove Resize Event & dispose',
						instance.current.getOption(),
					);
				}
				disposeInstance();
			};
		}, [disposeInstance]);

		useImperativeHandle(ref, () => ({
			instance: () => instance.current,
		}));

		return (
			<div
				ref={dom}
				style={style || { height: defaultHeight, minHeight: defaultMinHeight }}
				className={className || ''}
			/>
		);
	},
);

export default Core;
