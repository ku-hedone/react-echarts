import { useRef, useState, useCallback, useEffect } from 'react';
import applyExtensions from '../utils/extensions';
import type { EchartsProps, AdapterEChartsOption, ExtensionsKey } from '../types/base';
import type { Extensions } from '../utils/extensions';

const extraExts = [
	'title',
	'toolbox',
	'tooltip',
	'legend',
	'grid',
	'visualMap',
	'dataset',
	'graphic',
];

const useExtensions = (
	options: EchartsProps<AdapterEChartsOption>['options'],
	use: Extensions,
) => {
	// record has been imported  option property 's extension name
	const extSnapShoot = useRef<Set<string>>(new Set());
	const immutableApplyExtensions = useRef(applyExtensions(use));
	const [extensions, setExtensions] = useState<Extensions>([]);
	const [finished, setFinished] = useState(false);
	// record task run status
	const innerFinished = useRef(false);
	const nextOption = useRef<EchartsProps<AdapterEChartsOption>['options']>();
	const isConsuming = useRef(false);
	/**
	 * use extensions by options' attribute
	 */
	const consumer = useCallback(async () => {
		// when nextOption exists, it implies that a consumption operation is needed now.
		// & there is not consuming operation now.
		// console.group('use extensions');
		// console.log('%c nextOption is existed', 'color:green', typeof nextOption.current === 'undefined');
		// console.log('%c isConsuming', 'color:pink', isConsuming.current);
		if (nextOption.current && !isConsuming.current) {
			isConsuming.current = true;
			const currentOption = nextOption.current;
			// console.log('%c currentOption', 'color:red', currentOption);
			// Decouple value reference, so that subsequent assignments to the nextOption Ref will not effect the current logic.
			nextOption.current = undefined;
			// get extensions keys from current options
			const currentOptionExtKeys: ExtensionsKey[] = [];
			const keys = Reflect.ownKeys(currentOption) as ExtensionsKey[];
			// console.log('%c keys', 'color:black', keys);
			for (const key of keys) {
				// ensure option need import extension
				if (extraExts.includes(key)) {
					currentOptionExtKeys.push(key);
				}
			}
			// console.log('%c currentOptionExtKeys', 'color:blue', currentOptionExtKeys);
			let changed =
				currentOptionExtKeys.length !== 0
					? currentOptionExtKeys.length !== extSnapShoot.current.size
					: false;
			const nextExtSnapShoot = new Set<string>();
			currentOptionExtKeys.forEach((v) => {
				if (!extSnapShoot.current.has(v)) {
					changed = true;
				}
				// 保留 相同的 extensions
				// 加载 额外的 extensions
				nextExtSnapShoot.add(v);
			});
			// console.log('%c exts is changed', 'color: blue', changed);
			// if extensions has been changed
			if (changed) {
				// now currentOptionExtKeys must be not empty
				// console.log('innerFinished', innerFinished.current);
				if (innerFinished.current) {
					setFinished(false);
					// prevented options update's conflict
					innerFinished.current = false;
				}
				const record = {} as Record<ExtensionsKey, true>;
				currentOptionExtKeys.forEach((v) => {
					record[v] = true;
				});
				// use fresh extensions instead last extensions
				// exec immutableApplyExtensions.current means extensions has been changed
				try {
					// console.group('exts start loading');
					const extensions = await immutableApplyExtensions.current(record);
					setExtensions(extensions);
					setFinished(true);
					// console.log('exts loaded');
					innerFinished.current = true;
					extSnapShoot.current = nextExtSnapShoot;
					console.groupEnd();
				} catch (e) {
					console.error('use extensions error', e);
				}
			} else {
				// Upon initial render, if the option does not contain the extension-related properties
				// while goto this branch,
				if (!innerFinished.current) {
					innerFinished.current = true;
					const extensions = await immutableApplyExtensions.current({});
					setExtensions(extensions);
					setFinished(true);
					innerFinished.current = true;
					extSnapShoot.current = nextExtSnapShoot;
				}
			}
			isConsuming.current = false;
			// loop consumer
			// if current time nextOption.current is not undefined
			// this will be run again
			// otherwise, will be stop by condition logic -> charge nextOption.current is not undefined
			if (nextOption.current) {
				// console.group('consumer next option', nextOption.current);
				consumer();
				// console.groupEnd();
			}
		}
		// console.groupEnd();
	}, []);

	useEffect(() => {
		// when options update, will update nextOption Ref
		nextOption.current = options;
		if (!isConsuming.current) {
			consumer();
		}
	}, [consumer, options]);

	return {
		extensions,
		finished,
	} as {
		extensions: Extensions;
		finished: boolean;
	};
};

export default useExtensions;