import type { CSSProperties } from 'react';
import type { EchartsProps } from '../types/base';
import type { RecordToArray } from '../types/event';

export const isSameStyle = (last?: CSSProperties, next?: CSSProperties): boolean => {
	if (last && next) {
		const previousKeys = Reflect.ownKeys(last) as (keyof CSSProperties)[];
		const currentKeys = Reflect.ownKeys(next) as (keyof CSSProperties)[];
		let isSame = previousKeys.length === currentKeys.length;
		if (isSame) {
			const set = new Set(previousKeys);
			// check if all keys same
			isSame = currentKeys.every((key) => set.has(key));
			if (isSame) {
				// check if all values same
				isSame = currentKeys.every((key) => {
					return last[key] === next[key];
				});
			}
		}
		return isSame;
	}
	return last === next;
};
export const isSameEvent = (last: RecordToArray, next: RecordToArray): boolean => {
	let isSame = last.length === next.length;
	if (isSame) {
		const set = new Set([...last.map((i) => i.eventName)]);
		// check if all keys same
		isSame = next.every((key) => set.has(key.eventName));
		if (isSame) {
			// check if all values same
			isSame = next.every((item, index) => {
				return last[index].callback === item.callback;
			});
		}
	}
	return isSame;
};

type Theme = EchartsProps<unknown>['theme'];

export const isSameTheme = (last: Theme, next: Theme): boolean => {
	const lastType = typeof last as 'string' | 'undefined' | 'object';
	const nextType = typeof next as 'string' | 'undefined' | 'object';
	let isSame = nextType === lastType;
	if (isSame) {
		if (lastType === 'undefined') {
			return true;
		}
		if (lastType === 'string') {
			return last === next;
		}
		const previousKeys = Reflect.ownKeys(last as Record<string, string>) as string[];
		const currentKeys = Reflect.ownKeys(next as Record<string, string>) as string[];
		isSame = previousKeys.length === currentKeys.length;
		if (isSame) {
			const set = new Set(previousKeys);
			// check if all keys same
			isSame = currentKeys.every((key) => set.has(key));
			if (isSame) {
				// check if all values same
				isSame = currentKeys.every((key) => {
					return (
						(last as Record<string, string>)[key] ===
						(next as Record<string, string>)[key]
					);
				});
			}
		}
		return isSame;
	}
	return isSame;
};
