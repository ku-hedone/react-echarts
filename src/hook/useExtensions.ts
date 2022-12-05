import { useRef, useState, useCallback, useEffect } from 'react';
import type { EchartsProps, AdapterEChartsOption } from '../types/base';
import applyExtensions from '../utils/extensions';
import type{ Extensions } from '../utils/extensions';

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
	const extSnapShoot = useRef<Set<string>>(new Set());
	const changed = useRef(false);
	const immutableApplyExtensions = useRef(applyExtensions(use));
	const [state, setState] = useState<{
		finished: boolean;
		extensions: Extensions;
	}>({
		finished: false,
		extensions: [],
	});
	/**
	 * use extensions by options' attribute
	 */
	const recordExts = useCallback(async () => {
		// 当 options 存在需要额外加载的 extensions [list: extraExts]
		const extraExtsList: string[] = [];
		for (const key in options) {
			if (!extSnapShoot.current.has(key)) {
				extSnapShoot.current.add(key);
				changed.current = true;
				if (extraExts.includes(key)) {
					extraExtsList.push(key);
				}
			}
		}
		if (changed.current) {
			setState((p) => ({
				...p,
				finished: false,
			}));
			const record: Record<string, true> = {};
			extraExtsList.forEach((v) => {
				record[v] = true;
			});
			const extensions = await immutableApplyExtensions.current(record);
			// 无论是否存在 额外 的 extensions, 都要标记 extensions 加载完成
			setState({
				extensions,
				finished: true,
			});
		}
	}, [options]);

	useEffect(() => {
		recordExts();
	}, [recordExts]);

	return state;
};

export default useExtensions;