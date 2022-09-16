import { useMemo, memo } from 'react';
import Core from '../core';
import { startWith } from '../utils/event';
import type { MutableRefObject } from 'react';
import type { Extensions } from '../core';
import type { ComposeOption } from 'echarts/core';
import type { EchartsProps, ExtensionsComponent, ExtensionsKeyValue } from '../types/base';
import type { OmitEventOnSymbol, RecordToArray } from '../types/event';

type AdapterEChartsOption = ComposeOption<ExtensionsComponent>;

export interface AdapterProps<T extends (options: ExtensionsKeyValue) => Promise<Extensions>>
	extends EchartsProps<AdapterEChartsOption> {
	use: MutableRefObject<T>;
}

export const Adapter = memo(
	<T extends (options: ExtensionsKeyValue) => Promise<Extensions>>({
		options,
		use,
		onFinish,
		style,
		className,
		theme,
		notMerge,
		lazyUpdate,
		showLoading,
		debounceDelay,
		...other
	}: AdapterProps<T>) => {
		/**
		 * use extensions by options' attribute
		 */
		const extensions = useMemo(async () => {
			const exts = await use.current({
				title: options.title,
				toolbox: options.toolbox,
				tooltip: options.tooltip,
				legend: options.legend,
				grid: options.grid,
				visualMap: options.visualMap,
				dataset: options.dataset,
				graphic: options.graphic,
			});
			return exts;
		}, [
			options.dataset,
			options.grid,
			options.legend,
			options.title,
			options.toolbox,
			options.tooltip,
			options.visualMap,
			options.graphic,
			use,
		]);
		/**
		 * pick and transform event' props to array type
		 *
		 * in order to bind and remove more easily
		 */
		const events = useMemo(() => {
			const keys = Object.keys(other) as (keyof typeof other)[];
			if (keys.length) {
				const eventBus: RecordToArray = [];
				keys.forEach((eventName) => {
					const event = other[eventName];
					if (startWith(eventName, 'on') && event) {
						/**
						 * transform eventName
						 *
						 * eg: onClick -> click
						 */
						const name = eventName
							.replace('on', '')
							.toLocaleLowerCase() as OmitEventOnSymbol<typeof eventName>;
						eventBus.push({
							eventName: name,
							callback: event,
						});
					}
				});
				return eventBus;
			}
			return [];
		}, [other]);

		return (
			<Core
				options={options}
				style={style}
				className={className}
				theme={theme}
				notMerge={notMerge}
				lazyUpdate={lazyUpdate}
				showLoading={showLoading}
				extensions={extensions}
				debounceDelay={debounceDelay}
				onFinish={onFinish}
				events={events}
			/>
		);
	},
);

export default Adapter;
