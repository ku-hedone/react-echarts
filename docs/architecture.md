# React EChart 架构设计

## 1. 设计目标

架构设计要解决的核心问题：

```text
如何在不牺牲 ECharts 灵活性的前提下，
提供符合 React 开发习惯的图表组件，
同时优化包体积和渲染性能。
```

核心约束：

- ECharts 扩展组件按需加载，不增加未使用功能的 bundle 体积。
- React 组件生命周期与 ECharts 实例生命周期自动同步。
- TypeScript 类型覆盖所有公开 API。
- 组件重渲染由 props 变化驱动，不依赖外部状态管理。

---

## 2. 核心分层

```text
Chart Layer
  用户直接使用的图表组件（Bar、Line、Pie 等）

Adapter Layer
  扩展加载、事件转换、类型适配

Core Layer
  ECharts 实例管理、渲染、销毁、响应式处理
```

职责边界：

```text
Chart 不直接管理 ECharts 实例。
Adapter 不直接操作 DOM。
Core 不感知具体的图表类型。
扩展加载由 Adapter 协调，Core 只消费已加载的扩展。
```

---

## 3. 组件层次结构

```text
Chart (动态导入包装)
  └── [Bar | Line | Pie | ...] (类型化图表组件)
        └── Adapter (扩展加载 + 事件转换)
              └── Core (ECharts 初始化/渲染/销毁)
```

### 3.1 Chart 组件

位置：`src/charts/chart.tsx`

职责：

```text
- 根据 type 字符串动态导入对应的图表组件
- 使用 React.lazy 实现代码分割
- 提供 Suspense 边界处理加载状态
```

使用方式：

```tsx
import { Chart } from '@hedone/react-echart';

<Chart type="bar" options={barOptions} />;
```

动态导入机制：

```typescript
const Chart = lazy<FC<Omit<ChartComponentProps, 'type'>>>(async () =>
  import(`../charts/${type}.js`).then(res => {
    const ChartName = type.split('');
    ChartName[0] = ChartName[0].toLocaleUpperCase();
    return {
      ...res,
      default: res[ChartName.join('')],
    };
  }),
);
```

### 3.2 具体图表组件

位置：`src/charts/*.tsx`

职责：

```text
- 声明该图表类型所需的 ECharts 扩展
- 提供类型化的 props 接口
- 将扩展和 props 传递给 Adapter
```

示例（Bar 组件）：

```typescript
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { BarSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { Axis, EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';

export interface BarProps
  extends EchartsProps<GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis> {}

const Bar = forwardRef<CoreRef, BarProps>((props, ref) => {
  const BarExtensions = useMemo(() => [GridComponent, BarChart], []);
  return (
    <Adapter
      use={BarExtensions}
      ref={ref}
      {...props}
    />
  );
});

export { Bar };
```

扩展声明模式：

```typescript
// 每个图表组件通过 useMemo 声明其必需的扩展
const BarExtensions = useMemo(() => [GridComponent, BarChart], []);
```

### 3.3 Adapter 组件

位置：`src/adapter/index.tsx`

职责：

```text
- 调用 useExtensions 解析 options 中需要的扩展
- 将 React 风格的事件 props 转换为 ECharts 事件格式
- 将扩展、事件和所有 props 传递给 Core
```

扩展解析流程：

```text
options 对象
  → 识别包含的扩展 key（grid、tooltip、legend 等）
  → 动态导入对应的 ECharts 组件
  → 合并到 extensions 数组
  → 传递给 Core
```

事件转换流程：

```text
onClick prop
  → 识别 on 前缀
  → 转换为 click 事件名
  → 包装为 { eventName, callback } 格式
  → 传递给 Core
```

### 3.4 Core 组件

位置：`src/core/index.tsx`

职责：

```text
- 管理 ECharts 实例的完整生命周期
- 处理 options 更新并调用 setOption
- 绑定和解绑事件
- 监听容器大小变化并调用 resize
- 通过 ref 暴露实例访问方法
```

生命周期管理：

```text
Mount:
  → 初始化 ECharts 实例
  → 绑定事件
  → 设置 options

Update:
  → 比较新旧 props
  → 更新 options（使用 replaceMerge 策略）
  → 更新事件绑定
  → 处理 loading 状态

Unmount:
  → 解绑事件
  → 销毁 ECharts 实例
```

自定义 memo 比较：

```typescript
export default memo(Core, (prev, current) => {
  // 逐一比较所有 props
  // 避免引用不同但值相同的 props 导致重渲染
  if (prev.className !== current.className) return false;
  if (prev.options !== current.options) return false;
  // ... 其他比较
  return true;
});
```

---

## 4. 扩展自动加载机制

### 4.1 设计目标

```text
用户不需要手动调用 echarts.use()
库根据 options 内容自动识别并加载所需扩展
未使用的扩展不会出现在 bundle 中
```

### 4.2 实现流程

```text
1. Adapter 接收 options 和手动指定的 use 扩展
2. 调用 useExtensions(options, use)
3. useExtensions 识别 options 中的扩展 key
4. 动态导入对应的 ECharts 组件
5. 合并手动指定和自动识别的扩展
6. 返回 extensions 数组和 finished 标志
7. Core 在 finished 为 true 后初始化 ECharts
```

### 4.3 可自动加载的扩展

```text
options.grid      → GridComponent
options.tooltip   → TooltipComponent
options.legend    → LegendComponent
options.title     → TitleComponent
options.toolbox   → ToolboxComponent
options.visualMap → VisualMapComponent
options.timeline  → TimelineComponent
.options.dataset  → DataSetComponent
options.graphic   → GraphicComponent
```

### 4.4 扩展加载状态管理

```text
useExtensions 返回:
  - extensions: 已加载的扩展数组
  - finished: 扩展加载完成标志

Core 的行为:
  - finished 为 false 时，不初始化 ECharts
  - finished 为 true 后，调用 initEchart()
  - extensions 变化时，重新初始化实例
```

---

## 5. 响应式处理

### 5.1 实现机制

```text
Core 组件
  → 使用 useResize hook
  → 创建 ResizeObserver 监听容器 div
  → 容器大小变化时调用 ECharts.resize()
  → 支持防抖配置（debounceDelay）
```

### 5.2 防抖实现

```text
useResize hook
  → 内部使用 useDebouncedCallback
  → 支持 requestAnimationFrame 优化
  → 可配置 leading/trailing 行为
```

### 5.3 自动响应式

```text
props:
  - autoResize: boolean (默认 true)
  - debounceDelay: number (默认 0)

行为:
  - autoResize 为 true 时，自动监听容器变化
  - autoResize 为 false 时，禁用自动响应式
  - debounceDelay 控制防抖延迟（毫秒）
```

---

## 6. 事件系统

### 6.1 React 风格事件

```text
支持的事件:
  - onClick
  - onDblClick
  - onMouseDown
  - onMouseMove
  - onMouseUp
  - onMouseOver
  - onMouseOut
  - onGlobalOut
  - onContextMenu
```

### 6.2 事件转换

```text
React 风格:
  <Bar onClick={(params) => console.log(params)} />

转换为 ECharts 风格:
  instance.on('click', (params) => console.log(params))
```

### 6.3 事件生命周期

```text
Mount:
  → 绑定所有事件

Update:
  → 解绑旧事件
  → 绑定新事件
  → 通过事件名比较优化绑定

Unmount:
  → 解绑所有事件
```

---

## 7. 类型系统

### 7.1 核心类型

```text
EchartsProps<T>
  - options: T
  - theme?: string | Record<string, string>
  - debounceDelay?: number
  - notMerge?: boolean
  - lazyUpdate?: boolean
  - showLoading?: boolean | LoadingOptions
  - onFinish?: (instance: ECharts) => void
  - style?: CSSProperties
  - className?: string
  - autoResize?: boolean
  - [事件 props]: (params) => void
```

### 7.2 图表特定类型

```text
GeneratorOptions<T, E>
  - series: T[]
  - [扩展组件选项]
  - [基础选项]

示例:
  BarProps.options = GeneratorOptions<BarSeriesOption, ExtensionsComponent> & Axis
```

### 7.3 事件类型

```text
EchartsEventName = `on${EchartsMouseEvent}`
OmitEventOnSymbol<T> = T extends `on${infer A}` ? Lowercase<A> : never
RecordToArray = { eventName, callback }[]
```

---

## 8. 性能优化策略

### 8.1 渲染优化

```text
- Core 使用自定义 memo 比较函数
- 避免引用不同但值相同的 props 导致重渲染
- 使用 useCallback/useMemo 缓存函数和对象
```

### 8.2 包体积优化

```text
- 扩展组件按需加载
- 使用 echarts/core 而非完整 echarts
- Chart 组件使用 React.lazy 代码分割
```

### 8.3 初始化优化

```text
- 使用容器的 clientWidth/clientHeight 初始化
- 避免初始化后的立即 resize
- 支持 lazyUpdate 延迟更新
```

---

## 9. 设计原则总结

```text
按需加载是默认行为，不是可选优化。
类型安全是开发体验的保障，不是事后补充。
封装不丢失控制能力，ref 暴露底层实例。
性能优化内置化，不是用户的负担。
```
