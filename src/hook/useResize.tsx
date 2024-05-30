import { useLayoutEffect, useRef, RefObject } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

export const useResize = ({
	ref,
	debounceDelay,
	fun,
}: {
	ref: RefObject<HTMLDivElement>;
	debounceDelay?: number;
	fun: (entry: ResizeObserverEntry) => unknown;
}) => {
	const animationFrameRef = useRef<number[]>([]);
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
			entries.forEach((entry, index) => {
				animationFrameRef.current[index] = window.requestAnimationFrame(() => {
					/**
					 * executed when there is not empty
					 */
					debounced(entry);
				});
			});
		});

		resizeObserver.observe(element);

		return () => {
			const animationFrames = animationFrameRef.current;
			if (animationFrames.length) {
				animationFrames.forEach((i) => {
					window.cancelAnimationFrame(i);
				});
			}
			animationFrameRef.current = [];
			resizeObserver.unobserve(element);
		};
	}, [ref, debounced, fun]);
};
