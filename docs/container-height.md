# 容器高度说明

## 问题背景

ECharts 需要一个有明确尺寸的容器来渲染图表。如果容器高度为 0 或很小，图表可能无法正确显示。

## 默认行为

本库为容器设置了默认样式：

```typescript
const defaultStyle = {
  width: '100%',
  minHeight: '300px', // 最小高度保障
  height: '100%', // 继承父容器高度
};
```

**效果**：

- 如果父容器有高度，图表会继承父容器高度
- 如果父容器没有高度，图表至少有 300px 高度
- 用户可以通过 `style` prop 覆盖

## 常见问题

### 问题 1：图表高度为 0

**原因**：父容器没有设置高度，`height: '100%'` 继承了 0。

**解决方案**：

```tsx
// 方案 1：设置固定高度
<Bar style={{ height: '400px' }} options={options} />

// 方案 2：设置父容器高度
<div style={{ height: '500px' }}>
  <Bar options={options} />
</div>

// 方案 3：使用 vh 单位
<Bar style={{ height: '50vh' }} options={options} />
```

### 问题 2：图表高度很小（如 100px）

**原因**：父容器高度很小，或者使用了 flexbox 但没有正确配置。

**解决方案**：

```tsx
// 使用 minHeight 保障最小高度
<Bar style={{ minHeight: '400px', height: '100%' }} options={options} />
```

### 问题 3：响应式布局中高度不正确

**原因**：父容器高度依赖于内容或其他因素。

**解决方案**：

```tsx
// 使用 aspect-ratio 保持宽高比
<Bar style={{ width: '100%', aspectRatio: '16/9' }} options={options} />
```

## 最佳实践

### 1. 始终设置明确的高度

```tsx
// ✅ 推荐
<Bar style={{ height: '400px' }} options={options} />

// ❌ 避免（除非父容器有高度）
<Bar options={options} />
```

### 2. 在响应式布局中使用 minHeight

```tsx
<Bar style={{ minHeight: '300px', height: '100%' }} options={options} />
```

### 3. 在 flexbox 布局中设置 flex 属性

```tsx
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ flex: 1, minHeight: 0 }}>
    <Bar style={{ height: '100%' }} options={options} />
  </div>
</div>
```

## 警告日志

当容器高度小于 100px 时，库会在控制台输出警告：

```
[react-echart] Container height is very small (50px).
For best results, set an explicit height on the container or use the style prop:
<Chart style={{ height: "400px" }} />
```

这个警告可以帮助你快速定位高度问题。

## 高度配置参考

| 场景         | 推荐配置                                         |
| ------------ | ------------------------------------------------ |
| 固定高度     | `style={{ height: '400px' }}`                    |
| 响应式高度   | `style={{ minHeight: '300px', height: '100%' }}` |
| 全屏高度     | `style={{ height: '100vh' }}`                    |
| 保持宽高比   | `style={{ width: '100%', aspectRatio: '16/9' }}` |
| Flexbox 布局 | `style={{ flex: 1, minHeight: 0 }}`              |
