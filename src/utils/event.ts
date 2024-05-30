import type { EChartsType } from 'echarts';
import type { RecordToArray } from '../types/event';

/**
 * bind or remove event
 * @param type
 * @returns
 */
export const connect =
	(type: 'on' | 'off' = 'on') =>
	(instance: EChartsType, event: RecordToArray) => {
		/**
		 * fn = instance[type]  will lose this
		 *
		 * so need bind this
		 *
		 */
		const fn = instance[type].bind(instance);
		event.forEach((i) => {
			fn(i.eventName, i.callback);
		});
	};
/**
 *
 * @param target target str
 * @param search need be search str
 * @param start match started index
 * @returns
 */
export const startWith = (target: string, search: string, start = 0) => {
	// if String has startsWith
	if (Object.prototype.hasOwnProperty.call(String.prototype, 'startsWith')) {
		return target.startsWith(search, start);
	}
	// profiled
	let i = 0;
	const size = search.length;
	while (i < size) {
		if (target[start + i] === search[i]) {
			i++;
		} else {
			return false;
		}
	}
	return true;
};