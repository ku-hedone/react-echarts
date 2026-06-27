# Bundle 大小分析

## 构建产物

| 文件               | 大小   | 格式 | 说明                               |
| ------------------ | ------ | ---- | ---------------------------------- |
| `dist/index.js`    | 31 KB  | CJS  | CommonJS 格式，Node.js 兼容        |
| `dist/index.mjs`   | 28 KB  | ESM  | ES Modules 格式，支持 Tree-shaking |
| `dist/index.d.ts`  | 8.2 KB | DTS  | TypeScript 类型声明                |
| `dist/index.d.mts` | 8.2 KB | DTS  | ESM 类型声明                       |

**总大小**：约 67 KB（不含 source map）

## Tree-shaking 优化

### 已实现

1. **按需导入 ECharts 组件**

   ```typescript
   // ✅ 正确：只导入需要的组件
   import { BarChart } from 'echarts/charts';
   import { GridComponent } from 'echarts/components';

   // ❌ 错误：导入整个 echarts
   import * as echarts from 'echarts';
   ```

2. **动态扩展加载**
   - `useExtensions` hook 根据 options 内容自动加载所需扩展
   - 未使用的扩展不会被打包

3. **ESM 格式输出**
   - 支持 bundler 进行 tree-shaking
   - 消费方可以只导入使用的组件

### 消费方优化建议

```typescript
// ✅ 推荐：使用具名导入
import { Bar, Line } from '@hedone/react-echart';

// ❌ 不推荐：导入所有组件
import * as Charts from '@hedone/react-echart';
```

## 依赖分析

### Peer Dependencies（不打包）

| 依赖      | 版本               | 大小影响     |
| --------- | ------------------ | ------------ |
| react     | >=18.0.0           | 由消费方提供 |
| react-dom | >=18.0.0           | 由消费方提供 |
| echarts   | ^5.5.0 \|\| ^6.0.0 | 由消费方提供 |

### Bundle 内容

本库只打包自身代码，不包含：

- React 运行时
- ECharts 运行时
- 第三方依赖

## 性能指标

| 指标       | 值     | 说明                        |
| ---------- | ------ | --------------------------- |
| 首次加载   | ~28 KB | ESM 格式，gzip 后约 8-10 KB |
| 组件懒加载 | 按需   | Chart 组件使用 React.lazy   |
| 扩展懒加载 | 按需   | ECharts 扩展动态导入        |

## 与同类库对比

| 库                   | 大小    | 特点                 |
| -------------------- | ------- | -------------------- |
| @hedone/react-echart | ~28 KB  | 按需加载，TypeScript |
| echarts-for-react    | ~45 KB  | 全量导入             |
| 原生 echarts         | ~800 KB | 完整库               |

## 后续优化方向

1. **代码分割**
   - 各图表组件可独立导入
   - 使用 `React.lazy` 实现懒加载

2. **压缩优化**
   - 生产环境启用 terser 压压
   - 移除 console.log 和注释

3. **CDN 分发**
   - 提供 UMD 格式
   - 支持 CDN 引用
