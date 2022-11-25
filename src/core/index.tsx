import { useLayoutEffect, useRef, useCallback, memo, useState, useEffect } from 'react';
import { dispose, getInstanceByDom, init, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { connect } from '../utils/event';
import { useResize } from '../hook/useResize';
import type { FC } from 'react';
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

export const Core: FC<ReactEchartProps> = memo(
	({
		theme,
		options,
		notMerge = false,
		lazyUpdate = false,
		debounceDelay = 0,
		showLoading,
		className,
		style,
		extensions,
		onFinish,
		events,
		finished,
	}) => {
		// TODO: use Sequence Component to change into sync coding style
		// so need a flag to control render
		const [isUpdatePreparation, setUpdatePreparation] = useState(false);
		const ref = useRef<HTMLDivElement>(null);
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
		const disposeInstance = () => {
			if (ref.current) {
				dispose(ref.current);
			}
		};
		/**
		 * init echart instance
		 *
		 * when extensions or theme changed, re-init echart
		 */
		// TODO optimize into compare ref
		const initEchart = useCallback(() => {
			if (ref.current && finished) {
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
				if (ref.current) {
					const opts = {
						width: ref.current.clientWidth,
						height: ref.current.clientHeight,
						renderer: 'canvas',
					} as const;
					init(ref.current, theme, opts);
					// update echart instance
					instance.current = getInstanceByDom(ref.current);
					setUpdatePreparation(true);
				}
			}
		}, [extensions, theme, finished]);
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
			ref,
			fun: resize,
			debounceDelay,
		});
		/**
		 * update the local echarts
		 */
		const updateEChartsOption = useCallback(() => {
			const echartInstance = instance.current;
			if (echartInstance && options) {
				echartInstance.setOption(options, notMerge, lazyUpdate);
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
		}, [lazyUpdate, notMerge, options, showLoading]);
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
			setUpdatePreparation(false);
		}, [bindEvents, updateEChartsOption, onFinish]);

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
				console.log('remove Resize & dispose');
				disposeInstance();
			};
		}, []);

		return (
			<div
				ref={ref}
				style={style || { height: defaultHeight, minHeight: defaultMinHeight }}
				className={className || ''}
			/>
		);
	},
);

export default Core;
