import type { DefaultLabelFormatterCallbackParams } from 'echarts';

/**
 * react-echart support base Events
 */
type EchartsMouseEvent =
	| 'Click'
	| 'DblClick'
	| 'MouseDown'
	| 'MouseMove'
	| 'MouseUp'
	| 'MouseOver'
	| 'MouseOut'
	| 'GlobalOut'
	| 'ContextMenu';
/**
 * react2Echarts Events as React Events Style
 */
export type EchartsEventName = `on${EchartsMouseEvent}`;
/**
 * echarts supports Events
 */
export type OmitEventOnSymbol<T extends string> = T extends `on${infer A}`
	? Lowercase<A>
	: never;
/**
 * react2Echarts' event props
 */
export type EchartsEventSource = Record<
	EchartsEventName,
	(params: DefaultLabelFormatterCallbackParams) => void
>;
/**
 * transform chart events props to array
 */
export type RecordToArray = {
	eventName: Lowercase<EchartsMouseEvent>;
	callback: EchartsEventSource[keyof EchartsEventSource];
}[];