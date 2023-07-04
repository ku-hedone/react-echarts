import { forwardRef, useMemo } from 'react';
import Core, { CoreRef } from '../core';
import { startWith } from '../utils/event';
import useExtensions from '../hook/useExtensions';
import type { AdapterEChartsOption, EchartsProps } from '../types/base';
import type { OmitEventOnSymbol, RecordToArray } from '../types/event';
import type { Extensions } from '../utils/extensions';

export interface AdapterProps extends EchartsProps<AdapterEChartsOption> {
	use: Extensions;
}

export interface AdapterRef extends CoreRef {}

const EMPTY_EVENTS: RecordToArray = [];

export const Adapter = forwardRef<AdapterRef, AdapterProps>(
	(
		{
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
		},
		ref,
	) => {
		/**
		 * use extensions by options' attribute
		 */
		const { extensions, finished } = useExtensions(options, use);
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
			return EMPTY_EVENTS;
		}, [other]);

		return (
			<Core
				ref={ref}
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
				finished={finished}
			/>
		);
	},
);

export default Adapter;
