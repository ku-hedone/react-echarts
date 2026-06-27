# ECharts 6.x 新特性

## 概述

ECharts 6.0 带来了多项新特性和改进，本项目已支持 ECharts 6.x。

## 新特性

### 1. Axis Break（轴断裂）

ECharts 6.0 新增了轴断裂功能，可以在轴上创建"断裂"区域，用于跳过不连续的数据范围。

```typescript
// 轴断裂配置
const options = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    breaks: [
      {
        start: 'Tue',
        end: 'Thu',
        isExpanded: false, // 默认折叠
      },
    ],
  },
  // ...
};
```

### 2. Axis Break Changed Event

新增 `axisbreakchanged` 事件，监听轴断裂状态变化：

```typescript
import { Bar } from '@hedone/react-echart';

<Bar
  options={options}
  onAxisbreakchanged={(params) => {
    console.log('Break changed:', params.breaks);
    console.log('Action:', params.fromAction);
  }}
/>
```

### 3. Toggle Axis Break Action

新增 `toggleAxisBreak` action，用于切换轴断裂的展开/折叠状态：

```typescript
const instance = chartRef.current?.instance();

instance?.dispatchAction({
  type: 'toggleAxisBreak',
  xAxisIndex: 0,
  breaks: {
    start: 'Tue',
    end: 'Thu',
  },
});
```

### 4. SSR 增强

ECharts 6.0 增强了服务端渲染支持：

```typescript
const chart = echarts.init(dom, null, {
  renderer: 'svg',
  ssr: true,
});

// 获取 SVG 字符串
const svgString = chart.renderToSVGString();
```

### 5. 增量数据更新

使用 `appendData` 增量添加数据：

```typescript
const instance = chartRef.current?.instance();

instance?.appendData({
  seriesIndex: 0,
  data: newDataArray,
});
```

## 本项目支持情况

| 特性              | 支持状态    | 说明              |
| ----------------- | ----------- | ----------------- |
| Axis Break        | ✅ 支持     | 通过 options 配置 |
| Axis Break Event  | ⚠️ 需扩展   | 需要添加事件类型  |
| Toggle Axis Break | ✅ 支持     | 通过 ref 调用     |
| SSR               | ⚠️ 部分支持 | 需要 SVG 渲染器   |
| Append Data       | ✅ 支持     | 通过 ref 调用     |

## 待完成工作

1. 添加 `axisbreakchanged` 事件类型支持
2. 添加 SSR 相关文档和示例
3. 添加 `appendData` 的 React Hook 封装
