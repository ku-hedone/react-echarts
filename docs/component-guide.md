# React EChart 组件使用指南

## 1. 安装

```bash
npm install @hedone/react-echart

# 或
yarn add @hedone/react-echart

# 或
pnpm add @hedone/react-echart
```

依赖要求：

```json
{
  "peerDependencies": {
    "react": ">=17.0.2",
    "react-dom": ">=17.0.2",
    "echarts": "^5.5.0"
  }
}
```

---

## 2. 基础用法

### 2.1 使用具体图表组件

```tsx
import { Bar } from '@hedone/react-echart';

const App = () => (
  <Bar
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }}
  />
);
```

### 2.2 使用通用 Chart 组件

```tsx
import { Chart } from '@hedone/react-echart';

const App = () => (
  <Chart
    type="bar"
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }}
  />
);
```

### 2.3 TypeScript 类型化用法

```tsx
import { Bar } from '@hedone/react-echart';
import type { BarOptions } from '@hedone/react-echart';

const App = () => {
  const options: BarOptions = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };

  return <Bar options={options} />;
};
```

---

## 3. 支持的图表类型

### 3.1 基础图表

```tsx
import {
  Bar,
  Line,
  Pie,
  Funnel,
  Gauge,
  Heatmap,
  Sankey,
  Sunburst,
  Graphic,
} from '@hedone/react-echart';
```

### 3.2 图表类型列表

| 组件       | 说明     | ECharts 扩展                                    |
| ---------- | -------- | ----------------------------------------------- |
| `Bar`      | 柱状图   | GridComponent, BarChart                         |
| `Line`     | 折线图   | GridComponent, LineChart                        |
| `Pie`      | 饼图     | PieChart                                        |
| `Funnel`   | 漏斗图   | FunnelChart                                     |
| `Gauge`    | 仪表盘   | GaugeChart                                      |
| `Heatmap`  | 热力图   | GridComponent, HeatmapChart, VisualMapComponent |
| `Sankey`   | 桑基图   | SankeyChart                                     |
| `Sunburst` | 旭日图   | SunburstChart                                   |
| `Graphic`  | 图形组件 | GraphicComponent                                |

### 3.3 使用 Chart 组件动态选择

```tsx
import { Chart } from '@hedone/react-echart';

// type 支持的值：bar, line, pie, funnel, gauge, heatmap, sankey, sunburst, graphic
<Chart type="line" options={lineOptions} />;
```

---

## 4. 配置项

### 4.1 通用 Props

所有图表组件共享以下 props：

```typescript
interface EchartsProps<T> {
  // 图表配置（必需）
  readonly options: T;

  // 主题
  readonly theme?: Record<string, string> | string;

  // 响应式防抖延迟（毫秒）
  debounceDelay?: number;

  // setOption 参数
  notMerge?: boolean;
  lazyUpdate?: boolean;

  // Loading 状态
  showLoading?: boolean | { type?: string; opts?: LoadingOptions };

  // 图表就绪回调
  onFinish?: (instance: ECharts) => void;

  // 容器样式
  style?: CSSProperties;
  className?: string;

  // 自动响应式（默认 true）
  autoResize?: boolean;
}
```

### 4.2 主题配置

```tsx
// 使用内置主题
<Bar theme="dark" options={options} />

// 使用自定义主题对象
<Bar
  theme={{
    color: ['#c23531', '#2f4554', '#61a0a8', '#d48265'],
    backgroundColor: '#fefefe',
  }}
  options={options}
/>
```

### 4.3 Loading 状态

```tsx
// 简单 loading
<Bar showLoading={true} options={options} />

// 自定义 loading
<Bar
  showLoading={{
    type: 'default',
    opts: {
      text: '加载中...',
      color: '#c23531',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0,
    },
  }}
  options={options}
/>
```

### 4.4 响应式配置

```tsx
// 启用自动响应式（默认）
<Bar autoResize={true} options={options} />

// 禁用自动响应式
<Bar autoResize={false} options={options} />

// 配置防抖延迟
<Bar debounceDelay={300} options={options} />
```

---

## 5. 事件处理

### 5.1 支持的事件

```tsx
<Bar
  options={options}
  onClick={params => console.log('点击', params)}
  onDblClick={params => console.log('双击', params)}
  onMouseDown={params => console.log('鼠标按下', params)}
  onMouseMove={params => console.log('鼠标移动', params)}
  onMouseUp={params => console.log('鼠标抬起', params)}
  onMouseOver={params => console.log('鼠标进入', params)}
  onMouseOut={params => console.log('鼠标离开', params)}
  onGlobalOut={params => console.log('全局鼠标离开', params)}
  onContextMenu={params => console.log('右键菜单', params)}
/>
```

### 5.2 事件参数

```typescript
// 事件参数类型
interface DefaultLabelFormatterCallbackParams {
  componentType: string;
  seriesType: string;
  seriesIndex: number;
  seriesName: string;
  name: string;
  dataIndex: number;
  data: any;
  value: any;
  color: string;
  // ... 更多属性
}
```

### 5.3 事件使用示例

```tsx
import { Bar } from '@hedone/react-echart';

const App = () => {
  const handleClick = params => {
    console.log('点击的数据:', params.data);
    console.log('点击的系列:', params.seriesName);
    console.log('点击的索引:', params.dataIndex);
  };

  return <Bar options={options} onClick={handleClick} />;
};
```

---

## 6. Ref 访问实例

### 6.1 获取 ECharts 实例

```tsx
import { useRef } from 'react';
import { Bar } from '@hedone/react-echart';
import type { CoreRef } from '@hedone/react-echart';

const App = () => {
  const chartRef = useRef<CoreRef>(null);

  const handleFinish = () => {
    // 获取 ECharts 实例
    const instance = chartRef.current?.instance();

    if (instance) {
      // 调用 ECharts 原生方法
      instance.showLoading();
      instance.setOption({
        /* ... */
      });
      instance.resize();
    }
  };

  return <Bar ref={chartRef} options={options} onFinish={handleFinish} />;
};
```

### 6.2 实例方法

```typescript
interface CoreRef {
  // 获取 ECharts 实例
  instance: () => EChartsType | undefined;
}

// ECharts 实例常用方法
interface EChartsType {
  setOption(option: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean): void;
  getOption(): EChartsOption;
  resize(opts?: { width?: number | string; height?: number | string }): void;
  dispose(): void;
  showLoading(type?: string, opts?: LoadingOptions): void;
  hideLoading(): void;
  getDataURL(opts?: {
    type?: string;
    pixelRatio?: number;
    backgroundColor?: string;
  }): string;
  on(eventName: string, handler: Function): void;
  off(eventName: string, handler?: Function): void;
  // ... 更多方法
}
```

### 6.3 动态更新示例

```tsx
import { useRef, useState } from 'react';
import { Bar } from '@hedone/react-echart';

const App = () => {
  const chartRef = useRef<CoreRef>(null);
  const [data, setData] = useState([120, 200, 150, 80, 70, 110, 130]);

  const updateData = () => {
    const newData = data.map(item => item * 2);
    setData(newData);

    // 也可以直接通过实例更新
    // const instance = chartRef.current?.instance();
    // instance?.setOption({ series: [{ data: newData }] });
  };

  return (
    <>
      <button onClick={updateData}>更新数据</button>
      <Bar
        ref={chartRef}
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: { type: 'value' },
          series: [{ data, type: 'bar' }],
        }}
      />
    </>
  );
};
```

---

## 7. 样式配置

### 7.1 容器样式

```tsx
<Bar options={options} style={{ width: '100%', height: '400px' }} className="my-chart" />
```

### 7.2 响应式容器

```tsx
// 默认行为：高度 100%，宽度自适应
<Bar options={options} />

// 自定义容器
<div style={{ width: '80%', height: '500px' }}>
  <Bar options={options} style={{ width: '100%', height: '100%' }} />
</div>
```

### 7.3 默认样式

```typescript
// 默认样式
const defaultStyle: CSSProperties = {
  height: '100%',
};

// 默认高度（当容器无高度时）
const defaultHeight = '300px';
```

---

## 8. 高级用法

### 8.1 手动管理扩展

```tsx
import { Bar } from '@hedone/react-echart';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';

// 扩展由组件自动管理，通常不需要手动指定
// 但在某些场景下，可以提前加载扩展
```

### 8.2 多图表联动

```tsx
import { useRef, useEffect } from 'react';
import { Bar, Line } from '@hedone/react-echart';
import { connect } from 'echarts/core';

const App = () => {
  const barRef = useRef<CoreRef>(null);
  const lineRef = useRef<CoreRef>(null);

  useEffect(() => {
    const barInstance = barRef.current?.instance();
    const lineInstance = lineRef.current?.instance();

    if (barInstance && lineInstance) {
      // 联动两个图表
      connect([barInstance, lineInstance]);
    }
  }, []);

  return (
    <div>
      <Bar ref={barRef} options={barOptions} />
      <Line ref={lineRef} options={lineOptions} />
    </div>
  );
};
```

### 8.3 导出图片

```tsx
import { saveAsImage } from '@hedone/react-echart';
import { useRef } from 'react';
import { Bar } from '@hedone/react-echart';

const App = () => {
  const chartRef = useRef<CoreRef>(null);

  const handleExport = () => {
    const instance = chartRef.current?.instance();
    if (instance) {
      // 使用内置的 saveAsImage 工具
      saveAsImage(instance);
    }
  };

  return (
    <>
      <button onClick={handleExport}>导出图片</button>
      <Bar ref={chartRef} options={options} />
    </>
  );
};
```

---

## 9. 最佳实践

### 9.1 options 设计

```tsx
// 好：稳定的 options 引用
const options = useMemo(() => ({
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'bar' }],
}), [data]);

<Bar options={options} />

// 避免：每次渲染都创建新对象
<Bar options={{ xAxis: { /* ... */ }, series: [{ /* ... */ }] }} />
```

### 9.2 事件处理

```tsx
// 好：稳定的事件处理函数
const handleClick = useCallback((params) => {
  console.log(params);
}, []);

<Bar options={options} onClick={handleClick} />

// 避免：内联函数（除非确定引用稳定不重要）
<Bar options={options} onClick={(params) => console.log(params)} />
```

### 9.3 样式管理

```tsx
// 好：使用 className 管理样式
<Bar options={options} className="chart-container" />;

// 好：使用稳定的 style 对象
const chartStyle = useMemo(() => ({ width: '100%', height: '400px' }), []);
<Bar options={options} style={chartStyle} />;
```

### 9.4 性能优化

```tsx
// 好：配置防抖延迟
<Bar options={options} debounceDelay={300} />

// 好：禁用不需要的自动响应式
<Bar options={options} autoResize={false} />

// 好：使用 lazyUpdate 延迟更新
<Bar options={options} lazyUpdate={true} />
```

---

## 10. 常见问题

### 10.1 图表不显示

检查项：

```text
1. 容器是否有明确的宽度和高度
2. options 是否正确配置
3. 控制台是否有错误信息
4. ECharts 版本是否匹配（需要 ^5.5.0）
```

### 10.2 内存泄漏

```text
使用本库时，组件卸载会自动销毁 ECharts 实例。
如果使用原生 ECharts，需要手动调用 dispose()。
```

### 10.3 TypeScript 类型错误

```text
1. 确保使用正确的图表组件类型
2. 检查 options 是否符合对应的类型定义
3. 使用类型导入：import type { BarOptions } from '@hedone/react-echart'
```

### 10.4 扩展加载失败

```text
1. 检查网络连接（扩展组件动态导入）
2. 检查 ECharts 版本是否兼容
3. 查看控制台是否有加载错误
```
