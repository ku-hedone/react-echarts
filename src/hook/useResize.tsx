import { useLayoutEffect } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';
import type { RefObject } from 'react';

export const useResize = ({
	ref,
	debounceDelay,
	fun,
}: {
	ref: RefObject<HTMLDivElement>;
	debounceDelay?: number;
	fun: (entry?: ResizeObserverEntry) => unknown;
}) => {
	const debounced = useDebouncedCallback(
		fun,
		/**
		 * delay time
		 */
		debounceDelay,
	);
	useLayoutEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				debounced(entry);
			});
		});

		resizeObserver.observe(element);

		return () => {
			resizeObserver.unobserve(element);
		};
	}, [ref, debounced, fun]);

	return debounced;
};
