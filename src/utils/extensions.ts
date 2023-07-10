import { LabelLayout } from 'echarts/features';
import { use } from 'echarts/types/dist/shared';
import type { ExtensionsKeyValue } from '../types/base';

export type Extensions = Parameters<typeof use>[0];
/**
 * decide and apply extensions to echarts according to options' attributes
 *
 * @param extensions init extensions
 * @returns final extensions
 */
const applyExt = (extensions: unknown) => async (options: ExtensionsKeyValue) => {
	const ext = Array.isArray(extensions) ? [...extensions] : [extensions];
	if (options.grid) {
		const GridComponent = await import('../components/GridComponent');
		ext.push(GridComponent.default);
	}
	if (options.visualMap) {
		const VisualMapComponent = await import('../components/VisualMapComponent');
		ext.push(VisualMapComponent.default);
	}
	if (options.tooltip) {
		const TooltipComponent = await import('../components/TooltipComponent');
		ext.push(TooltipComponent.default);
	}
	if (options.title) {
		const TitleComponent = await import('../components/TitleComponent');
		ext.push(TitleComponent.default);
	}
	if (options.legend) {
		const LegendComponent = await import('../components/LegendComponent');
		ext.push(LegendComponent.default);
	}
	if (options.toolbox) {
		const ToolboxComponent = await import('../components/ToolboxComponent');
		ext.push(ToolboxComponent.default);
	}
	if (options.timeline) {
		const TimelineComponent = await import('../components/TimelineComponent');
		ext.push(TimelineComponent.default);
	}
	if (options.dataset) {
		const DataSetComponent = await import('../components/DataSetComponent');
		ext.push(DataSetComponent.default);
	}
	if (options.graphic) {
		const GraphicComponent = await import('../components/GraphicComponent');
		ext.push(GraphicComponent.default);
	}
	ext.push(LabelLayout);
	return ext;
};

export default applyExt;