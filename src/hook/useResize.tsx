import { useLayoutEffect, useRef, RefObject } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';
// import ResizeObserver from 'resize-observer-polyfill';

export const useResize = ({
	ref,
	debounceDelay,
	fun,
}: {
	ref: RefObject<HTMLDivElement>;
	debounceDelay?: number;
	fun: (...props: unknown[]) => unknown;
}) => {
	const animationFrameRef = useRef<number>();
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
			animationFrameRef.current = window.requestAnimationFrame(() => {
				/**
				 * executed when there is not empty
				 */
				if (!Array.isArray(entries) || !entries.length) {
					return;
				}
				debounced();
			});
		});

		resizeObserver.observe(element);

		return () => {
			if (animationFrameRef.current) {
				window.cancelAnimationFrame(animationFrameRef.current);
			}
			resizeObserver.unobserve(element);
		};
	}, [ref, debounced, fun]);
};
