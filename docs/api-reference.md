# React EChart API 参考

## 1. 组件 API

### 1.1 Bar 组件

柱状图组件。

```typescript
import { Bar } from '@hedone/react-echart';

interface BarProps extends EchartsProps<GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis> {}

<Bar options={barOptions} />
```

**Props:**

| 属性          | 类型                                                            | 默认值               | 说明                   |
| ------------- | --------------------------------------------------------------- | -------------------- | ---------------------- |
| options       | `GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis` | -                    | 图表配置（必需）       |
| theme         | `string \| Record<string, string>`                              | -                    | 主题                   |
| debounceDelay | `number`                                                        | `0`                  | 响应式防抖延迟（毫秒） |
| notMerge      | `boolean`                                                       | -                    | setOption 是否合并     |
| lazyUpdate    | `boolean`                                                       | -                    | 是否延迟更新           |
| showLoading   | `boolean \| LoadingOptions`                                     | -                    | Loading 状态           |
| onFinish      | `(instance: ECharts) => void`                                   | -                    | 图表就绪回调           |
| style         | `CSSProperties`                                                 | `{ height: '100%' }` | 容器样式               |
| className     | `string`                                                        | `''`                 | 容器类名               |
| autoResize    | `boolean`                                                       | `true`               | 自动响应式             |
| onClick       | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 点击事件               |
| onDblClick    | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 双击事件               |
| onMouseDown   | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 鼠标按下事件           |
| onMouseMove   | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 鼠标移动事件           |
| onMouseUp     | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 鼠标抬起事件           |
| onMouseOver   | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 鼠标进入事件           |
| onMouseOut    | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 鼠标离开事件           |
| onGlobalOut   | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 全局鼠标离开事件       |
| onContextMenu | `(params: DefaultLabelFormatterCallbackParams) => void`         | -                    | 右键菜单事件           |

**Ref:**

```typescript
interface CoreRef {
  instance: () => EChartsType | undefined;
}
```

---

### 1.2 Line 组件

折线图组件。

```typescript
import { Line } from '@hedone/react-echart';

interface LineProps extends EchartsProps<GeneratorOptions<LineSeriesOption, ExtensionsComponent> & Axis> {}

<Line options={lineOptions} />
```

**Props:** 与 Bar 组件相同，options 类型为 `GeneratorOptions<LineSeriesOption, ExtensionsComponent> & Axis`。

---

### 1.3 Pie 组件

饼图组件。

```typescript
import { Pie } from '@hedone/react-echart';

interface PieProps extends EchartsProps<GeneratorOptions<PieSeriesOption, ExtensionsComponent>> {}

<Pie options={pieOptions} />
```

**Props:** 与 Bar 组件相同，options 类型为 `GeneratorOptions<PieSeriesOption, ExtensionsComponent>`。

---

### 1.4 Funnel 组件

漏斗图组件。

```typescript
import { Funnel } from '@hedone/react-echart';

interface FunnelProps extends EchartsProps<GeneratorOptions<FunnelSeriesOption, ExtensionsComponent>> {}

<Funnel options={funnelOptions} />
```

---

### 1.5 Gauge 组件

仪表盘组件。

```typescript
import { Gauge } from '@hedone/react-echart';

interface GaugeProps extends EchartsProps<GeneratorOptions<GaugeSeriesOption, ExtensionsComponent>> {}

<Gauge options={gaugeOptions} />
```

---

### 1.6 Heatmap 组件

热力图组件。

```typescript
import { Heatmap } from '@hedone/react-echart';

interface HeatMapProps extends EchartsProps<GeneratorOptions<HeatmapSeriesOption, ExtensionsComponent> & Axis> {}

<Heatmap options={heatmapOptions} />
```

---

### 1.7 Sankey 组件

桑基图组件。

```typescript
import { Sankey } from '@hedone/react-echart';

interface SankeyProps extends EchartsProps<GeneratorOptions<SankeySeriesOption, ExtensionsComponent>> {}

<Sankey options={sankeyOptions} />
```

---

### 1.8 Sunburst 组件

旭日图组件。

```typescript
import { Sunburst } from '@hedone/react-echart';

interface SunburstProps extends EchartsProps<GeneratorOptions<SunburstSeriesOption, ExtensionsComponent>> {}

<Sunburst options={sunburstOptions} />
```

---

### 1.9 Graphic 组件

图形组件。

```typescript
import { Graphic } from '@hedone/react-echart';

interface GraphicProps extends EchartsProps<GraphicComponentOption> {}

<Graphic options={graphicOptions} />
```

---

### 1.10 Chart 组件

通用图表组件，支持动态选择图表类型。

```typescript
import { Chart } from '@hedone/react-echart';

interface ChartComponentProps = {
  type: ChartType;
  // ... 其他 props 根据 type 不同而不同
}

<Chart type="bar" options={options} />
```

**Props:**

| 属性    | 类型                                                                                                  | 默认值 | 说明             |
| ------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------- |
| type    | `'bar' \| 'line' \| 'pie' \| 'funnel' \| 'gauge' \| 'heatmap' \| 'sankey' \| 'sunburst' \| 'graphic'` | -      | 图表类型（必需） |
| options | 对应类型的 options                                                                                    | -      | 图表配置（必需） |
| ...     | 同具体图表组件                                                                                        | -      | 其他 props       |

**支持的 type 值:**

```typescript
type ChartType =
  | 'bar'
  | 'funnel'
  | 'gauge'
  | 'graphic'
  | 'heatmap'
  | 'line'
  | 'pie'
  | 'sankey'
  | 'sunburst';
```

---

## 2. 类型定义

### 2.1 EchartsProps

所有图表组件共享的基础 props 类型。

```typescript
interface EchartsProps<T> extends Partial<EchartsEventSource> {
  readonly options: T;
  readonly theme?: Record<string, string> | string;
  debounceDelay?: number;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  showLoading?: boolean | { type?: string; opts?: LoadingOptions };
  onFinish?: (instance: ECharts) => void;
  style?: CSSProperties;
  className?: string;
  autoResize?: boolean;
}
```

---

### 2.2 GeneratorOptions

图表 options 的生成类型。

```typescript
type GeneratorOptions<T, E extends ComponentOption> = {
  series: T[];
} & ComposeUnitOption<E> &
  AdapterEChartsBaseOption;
```

**使用示例:**

```typescript
// Bar 组件的 options 类型
type BarOptions = GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis;

// 包含：
// - series: BarSeriesOption[]
// - grid?: GridComponentOption
// - tooltip?: TooltipComponentOption
// - legend?: LegendComponentOption
// - title?: TitleComponentOption
// - xAxis?: XAXisComponentOption
// - yAxis?: YAXisComponentOption
// - ... 其他基础选项
```

---

### 2.3 Axis

坐标轴类型。

```typescript
interface Axis {
  xAxis?: XAXisComponentOption | XAXisComponentOption[];
  yAxis?: YAXisComponentOption | YAXisComponentOption[];
}
```

---

### 2.4 ExtensionsComponent

扩展组件选项的联合类型。

```typescript
type ExtensionsComponent =
  | DatasetComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | VisualMapComponentOption
  | GraphicComponentOption
  | TimelineComponentOption;
```

---

### 2.5 CoreRef

通过 ref 访问 ECharts 实例的类型。

```typescript
interface CoreRef {
  instance: () => EChartsType | undefined;
}
```

**使用示例:**

```typescript
import { useRef } from 'react';
import { Bar } from '@hedone/react-echart';
import type { CoreRef } from '@hedone/react-echart';

const App = () => {
  const chartRef = useRef<CoreRef>(null);

  const getInstance = () => {
    return chartRef.current?.instance();
  };

  return <Bar ref={chartRef} options={options} />;
};
```

---

### 2.6 EchartsEventName

事件名称类型。

```typescript
type EchartsEventName = `on${EchartsMouseEvent}`;

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
```

---

### 2.7 EchartsEventSource

事件源类型。

```typescript
type EchartsEventSource = Record<
  EchartsEventName,
  (params: DefaultLabelFormatterCallbackParams) => void
>;
```

---

### 2.8 RecordToArray

内部事件存储格式。

```typescript
type RecordToArray = {
  eventName: Lowercase<EchartsMouseEvent>;
  callback: EchartsEventSource[keyof EchartsEventSource];
}[];
```

---

## 3. Hooks API

### 3.1 useExtensions

自动加载 ECharts 扩展的 Hook。

```typescript
const useExtensions: (
  options: EchartsProps<AdapterEChartsOption>['options'],
  use: Extensions,
) => {
  extensions: Extensions;
  finished: boolean;
};
```

**参数:**

| 参数    | 类型                   | 说明           |
| ------- | ---------------------- | -------------- |
| options | `AdapterEChartsOption` | 图表配置       |
| use     | `Extensions`           | 手动指定的扩展 |

**返回值:**

| 属性       | 类型         | 说明             |
| ---------- | ------------ | ---------------- |
| extensions | `Extensions` | 已加载的扩展数组 |
| finished   | `boolean`    | 扩展加载完成标志 |

**使用示例:**

```typescript
import useExtensions from '../hook/useExtensions';

const { extensions, finished } = useExtensions(options, manualExtensions);
```

---

### 3.2 useResize

监听容器大小变化的 Hook。

```typescript
const useResize: ({
  ref,
  debounceDelay,
  fun,
}: {
  ref: RefObject<HTMLDivElement>;
  debounceDelay?: number;
  fun: (entry?: ResizeObserverEntry) => unknown;
}) => DebouncedState<(entry?: ResizeObserverEntry) => unknown>;
```

**参数:**

| 参数          | 类型                                       | 说明             |
| ------------- | ------------------------------------------ | ---------------- |
| ref           | `RefObject<HTMLDivElement>`                | 容器 ref         |
| debounceDelay | `number`                                   | 防抖延迟（毫秒） |
| fun           | `(entry?: ResizeObserverEntry) => unknown` | 回调函数         |

**返回值:** 防抖后的回调函数。

**使用示例:**

```typescript
import { useResize } from '../hook/useResize';

const dom = useRef<HTMLDivElement>(null);

const debouncedResize = useResize({
  ref: dom,
  fun: entry => {
    console.log('容器大小变化', entry);
  },
  debounceDelay: 300,
});
```

---

### 3.3 useDebouncedCallback

防抖回调 Hook。

```typescript
const useDebouncedCallback: <T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  wait?: number,
  options?: Options,
) => DebouncedState<T>;

interface Options {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}
```

**参数:**

| 参数             | 类型      | 默认值  | 说明                 |
| ---------------- | --------- | ------- | -------------------- |
| func             | `T`       | -       | 要防抖的函数         |
| wait             | `number`  | -       | 防抖延迟（毫秒）     |
| options.leading  | `boolean` | `false` | 是否在延迟开始前调用 |
| options.trailing | `boolean` | `true`  | 是否在延迟结束后调用 |
| options.maxWait  | `number`  | -       | 最大等待时间         |

**返回值:** 防抖后的函数。

**使用示例:**

```typescript
import { useDebouncedCallback } from '../hook/useDebouncedCallback';

const debouncedCallback = useDebouncedCallback(
  (value: string) => {
    console.log(value);
  },
  300,
  { leading: false, trailing: true },
);
```

---

### 3.4 useEvent

稳定回调引用 Hook。

```typescript
const useEvent: <T extends (...args: any[]) => unknown>(callback: T) => T;
```

**参数:**

| 参数     | 类型 | 说明             |
| -------- | ---- | ---------------- |
| callback | `T`  | 要稳定的回调函数 |

**返回值:** 引用稳定的回调函数。

**使用示例:**

```typescript
import useEvent from '../hook/useEvent';

const stableCallback = useEvent(params => {
  console.log(params);
});
```

---

## 4. 工具函数 API

### 4.1 saveAsImage

导出图表为图片。

```typescript
import { saveAsImage } from '@hedone/react-echart';

saveAsImage(instance: EChartsType): void;
```

**参数:**

| 参数     | 类型          | 说明         |
| -------- | ------------- | ------------ |
| instance | `EChartsType` | ECharts 实例 |

**使用示例:**

```typescript
import { saveAsImage } from '@hedone/react-echart';

const handleExport = () => {
  const instance = chartRef.current?.instance();
  if (instance) {
    saveAsImage(instance);
  }
};
```

---

### 4.2 connect

事件绑定/解绑工具。

```typescript
import { connect } from '../utils/event';

const bind = connect('on');
const unbind = connect('off');

// 绑定事件
bind(instance, events);

// 解绑事件
unbind(instance, events);
```

**参数:**

| 参数 | 类型            | 说明       |
| ---- | --------------- | ---------- |
| type | `'on' \| 'off'` | 绑定或解绑 |

**返回值:** 绑定/解绑函数。

---

### 4.3 startWith

字符串前缀检查。

```typescript
import { startWith } from '../utils/event';

startWith(target: string, search: string, start?: number): boolean;
```

**参数:**

| 参数   | 类型     | 默认值 | 说明       |
| ------ | -------- | ------ | ---------- |
| target | `string` | -      | 目标字符串 |
| search | `string` | -      | 搜索前缀   |
| start  | `number` | `0`    | 开始位置   |

**返回值:** 是否匹配。

---

### 4.4 isSameStyle

比较两个 CSSProperties 对象是否相同。

```typescript
import { isSameStyle } from '../utils/compare';

isSameStyle(last?: CSSProperties, next?: CSSProperties): boolean;
```

---

### 4.5 isSameEvent

比较两个事件数组是否相同。

```typescript
import { isSameEvent } from '../utils/compare';

isSameEvent(last: RecordToArray, next: RecordToArray): boolean;
```

---

### 4.6 isSameTheme

比较两个主题是否相同。

```typescript
import { isSameTheme } from '../utils/compare';

isSameTheme(last: Theme, next: Theme): boolean;
```

---

## 5. 常量

### 5.1 ChartTypes

支持的图表类型列表。

```typescript
import { ChartTypes } from '../constant';

const ChartTypes = [
  'bar',
  'funnel',
  'gauge',
  'graphic',
  'heatmap',
  'line',
  'pie',
  'sankey',
  'sunburst',
] as const;

type ChartType = (typeof ChartTypes)[number];
```

---

## 6. 内部组件 API

### 6.1 Adapter 组件

扩展加载和事件转换的中间层。

```typescript
import Adapter from '../adapter';

interface AdapterProps extends EchartsProps<AdapterEChartsOption> {
  use: Extensions;
}

<Adapter use={extensions} options={options} />
```

**Props:**

| 属性    | 类型                   | 说明                   |
| ------- | ---------------------- | ---------------------- |
| use     | `Extensions`           | 手动指定的扩展（必需） |
| options | `AdapterEChartsOption` | 图表配置（必需）       |
| ...     | 同 EchartsProps        | 其他 props             |

---

### 6.2 Core 组件

底层 ECharts 实例管理组件。

```typescript
import Core from '../core';

interface ReactEchartProps extends Omit<EchartsProps<EChartsOption>, EchartsEventName> {
  readonly options: EChartsOption;
  extensions: Extensions;
  events: RecordToArray;
  finished: boolean;
  autoResize?: boolean;
}

<Core
  options={options}
  extensions={extensions}
  events={events}
  finished={finished}
/>
```

**Props:**

| 属性       | 类型            | 说明                     |
| ---------- | --------------- | ------------------------ |
| options    | `EChartsOption` | 图表配置（必需）         |
| extensions | `Extensions`    | 已加载的扩展（必需）     |
| events     | `RecordToArray` | 事件数组（必需）         |
| finished   | `boolean`       | 扩展加载完成标志（必需） |
| autoResize | `boolean`       | 自动响应式               |
| ...        | 同 EchartsProps | 其他 props               |

---

## 7. 类型导入

### 7.1 从主包导入

```typescript
// 组件
import { Bar, Line, Pie, Chart } from '@hedone/react-echart';

// 类型
import type { BarProps, LineProps, PieProps, CoreRef } from '@hedone/react-echart';

// 工具函数
import { saveAsImage } from '@hedone/react-echart';
```

### 7.2 从子模块导入

```typescript
// 从具体图表模块导入
import { Bar } from '@hedone/react-echart/charts/bar';
import type { BarProps } from '@hedone/react-echart/charts/bar';

// 从 core 模块导入
import { Core } from '@hedone/react-echart/core';
import type { CoreRef } from '@hedone/react-echart/core';

// 从 adapter 模块导入
import { Adapter } from '@hedone/react-echart/adapter';
import type { AdapterProps } from '@hedone/react-echart/adapter';
```

---

## 8. 版本兼容性

### 8.1 React 版本

```json
{
  "peerDependencies": {
    "react": ">=17.0.2",
    "react-dom": ">=17.0.2"
  }
}
```

### 8.2 ECharts 版本

```json
{
  "peerDependencies": {
    "echarts": "^5.5.0"
  }
}
```

### 8.3 TypeScript 版本

```json
{
  "devDependencies": {
    "typescript": "^5.4.5"
  }
}
```

---

## 9. 错误处理

### 9.1 常见错误

**类型错误:**

```typescript
// 错误：options 类型不匹配
<Bar options={invalidOptions} />

// 正确：使用正确的类型
const options: BarOptions = { /* ... */ };
<Bar options={options} />
```

**Ref 错误:**

```typescript
// 错误：ref 类型不匹配
const ref = useRef<HTMLDivElement>(null);
<Bar ref={ref} />

// 正确：使用 CoreRef 类型
const ref = useRef<CoreRef>(null);
<Bar ref={ref} />
```

### 9.2 运行时错误

**扩展加载失败:**

```text
错误信息: use extensions error
原因: ECharts 扩展组件加载失败
解决: 检查网络连接和 ECharts 版本
```

**实例未初始化:**

```text
错误信息: Cannot read property 'xxx' of undefined
原因: 在 ECharts 实例初始化前访问
解决: 使用 onFinish 回调或检查 instance() 返回值
```

---

## 10. 性能优化建议

### 10.1 options 稳定性

```typescript
// 好：使用 useMemo 缓存 options
const options = useMemo(() => ({
  series: [{ data }]
}), [data]);

<Bar options={options} />

// 避免：每次渲染创建新对象
<Bar options={{ series: [{ data }] }} />
```

### 10.2 事件稳定性

```typescript
// 好：使用 useCallback 缓存事件处理
const handleClick = useCallback((params) => {
  console.log(params);
}, []);

<Bar options={options} onClick={handleClick} />
```

### 10.3 样式稳定性

```typescript
// 好：使用 useMemo 缓存样式
const style = useMemo(() => ({
  width: '100%',
  height: '400px',
}), []);

<Bar options={options} style={style} />
```

### 10.4 响应式配置

```typescript
// 好：配置防抖延迟
<Bar options={options} debounceDelay={300} />

// 好：禁用不需要的自动响应式
<Bar options={options} autoResize={false} />
```
