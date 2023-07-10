import { useCallback, useRef, version } from 'react';

type MemoFunction = (...args: any[]) => unknown;

const useLowerLevelReactEvent = <T extends MemoFunction>(callback: T): T => {
	const fnRef = useRef<T>();

	fnRef.current = callback;

	const memoFn = useCallback((...args: any[]) => {
		if (fnRef.current) {
			fnRef.current(...args);
		}
	}, []);

	return memoFn as T;
};

const hook = (() => {
	if (version.match(/^18./)) {
		return useLowerLevelReactEvent;
	} else {
		return useLowerLevelReactEvent;
	}
})() as <T extends (...args: any[]) => unknown>(callback: T) => T;

export default hook;