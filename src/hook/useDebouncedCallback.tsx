import { useRef, useEffect, useMemo } from 'react';
export interface Options {
	leading?: boolean;
	trailing?: boolean;
	maxWait?: number;
}
export interface DebouncedState<T extends (...args: any[]) => ReturnType<T>> {
	(...args: Parameters<T>): ReturnType<T> | undefined;
}

export const useDebouncedCallback = <T extends (...args: any[]) => ReturnType<T>>(
	func: T,
	wait?: number,
	options?: Options,
): DebouncedState<T> => {
	const lastCallTime = useRef<number>();
	const lastInvokeTime = useRef<number>(0);
	const timerId = useRef<number>();
	const lastArgs = useRef<unknown[]>();
	const lastThis = useRef<unknown>();
	const result = useRef<ReturnType<T>>();
	const funcRef = useRef(func);
	const mounted = useRef(true);

	const optionsRef = useRef<Options>();

	useEffect(() => {
		funcRef.current = func;
	}, [func]);

	const useRAF =
		typeof wait !== 'undefined' && wait !== 0 && typeof window !== 'undefined';

	if (typeof func !== 'function') {
		throw new TypeError('Expected a function');
	}

	optionsRef.current = options || {};
	/**
	 * leading use `false` by default
	 *
	 * trailing use `true` by default
	 */
	const { 
        leading = false, 
        trailing = true 
    } = optionsRef.current;
	const hasMaxWait = 'maxWait' in optionsRef.current;
	const maxWait = hasMaxWait
		? Math.max(optionsRef.current.maxWait || 0, wait || 0)
		: undefined;

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	const debounced = useMemo(() => {
        const waitTime = wait || 0;

		const invokeFunc = (time: number) => {
			const args = lastArgs.current || [];
			const thisArg = lastThis.current;
			// reset
			lastArgs.current = lastThis.current = undefined;
			lastInvokeTime.current = time;
			return (result.current = funcRef.current.apply(thisArg, args));
		};

		const startTimer = (pendingFunc: () => void, wait: number) => {
			if (useRAF && typeof timerId.current !== 'undefined') {
				cancelAnimationFrame(timerId.current);
			}
			timerId.current = useRAF
				? requestAnimationFrame(pendingFunc)
				: setTimeout(pendingFunc, wait);
		};

		const shouldInvoke = (time: number) => {
			if (!mounted.current) return false;

			const timeSinceLastCall = time - (lastCallTime.current || 0);
			const timeSinceLastInvoke = time - lastInvokeTime.current;

			// Either this is the first call, activity has stopped and we're at the
			// trailing edge, the system time has gone backwards and we're treating
			// it as the trailing edge, or we've hit the `maxWait` limit.
			return (
				!lastCallTime.current ||
				timeSinceLastCall >= waitTime ||
				timeSinceLastCall < 0 ||
				(hasMaxWait && timeSinceLastInvoke >= (maxWait || 0))
			);
		};

		const trailingEdge = (time: number) => {
			timerId.current = undefined;

			// Only invoke if we have `lastArgs` which means `func` has been
			// debounced at least once.
			if (trailing && lastArgs.current) {
				return invokeFunc(time);
			}
			lastArgs.current = lastThis.current = undefined;
			return result.current;
		};

		const timerExpired = () => {
			const time = Date.now();
			if (shouldInvoke(time)) {
				return trailingEdge(time);
			}
			if (!mounted.current) {
				return;
			}
			// Remaining wait calculation
			const timeSinceLastCall = time - (lastCallTime.current || 0);
			const timeSinceLastInvoke = time - lastInvokeTime.current;
			const timeWaiting = waitTime - timeSinceLastCall;
			const remainingWait = hasMaxWait
				? Math.min(timeWaiting, (maxWait || 0) - timeSinceLastInvoke)
				: timeWaiting;

			// Restart the timer
			startTimer(timerExpired, remainingWait);
		};

		const func: DebouncedState<T> = (
			...args: Parameters<T>
		): ReturnType<T> | undefined => {
			const time = Date.now();
			const isInvoking = shouldInvoke(time);

			lastArgs.current = args;
			lastThis.current = this;
			lastCallTime.current = time;

			if (isInvoking) {
				if (!timerId.current && mounted.current) {
					// Reset any `maxWait` timer.
					lastInvokeTime.current = lastCallTime.current;
					// Start the timer for the trailing edge.
					startTimer(timerExpired, waitTime);
					// Invoke the leading edge.
					return leading ? invokeFunc(lastCallTime.current) : result.current;
				}
				if (hasMaxWait) {
					// Handle invocations in a tight loop.
					startTimer(timerExpired, waitTime);
					return invokeFunc(lastCallTime.current);
				}
			}
			if (!timerId.current) {
				startTimer(timerExpired, waitTime);
			}
			return result.current;
		};
		return func;
	}, [leading, hasMaxWait, wait, maxWait, trailing, useRAF]);

	return debounced;
}
