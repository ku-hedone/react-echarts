# React EChart 开发指南

## 1. 开发环境

### 1.1 环境要求

```text
Node.js: >= 16
pnpm: >= 8
TypeScript: >= 5.4.5
```

### 1.2 克隆项目

```bash
git clone git@github.com:jay0815/react-echart.git
cd react-echart
```

### 1.3 安装依赖

```bash
pnpm install
```

---

## 2. 项目结构

```
react-echart/
├── src/
│   ├── adapter/          # Adapter 组件
│   │   └── index.tsx
│   ├── charts/           # 图表组件
│   │   ├── bar.tsx
│   │   ├── line.tsx
│   │   ├── pie.tsx
│   │   └── ...
│   ├── components/       # ECharts 组件封装
│   │   ├── GridComponent.ts
│   │   ├── TooltipComponent.ts
│   │   └── ...
│   ├── core/             # Core 组件
│   │   └── index.tsx
│   ├── hook/             # 自定义 Hooks
│   │   ├── useDebouncedCallback.tsx
│   │   ├── useEvent.tsx
│   │   ├── useExtensions.ts
│   │   └── useResize.tsx
│   ├── types/            # TypeScript 类型定义
│   │   ├── base.ts
│   │   ├── event.ts
│   │   └── image.ts
│   ├── utils/            # 工具函数
│   │   ├── browser.ts
│   │   ├── compare.ts
│   │   ├── event.ts
│   │   ├── extensions.ts
│   │   └── image.ts
│   ├── constant.ts       # 常量定义
│   └── index.tsx         # 入口文件
├── docs/                 # 项目文档
├── static/               # 静态资源
├── cjs.tsconfig.json     # CJS 构建配置
├── esm.tsconfig.json     # ESM 构建配置
├── declare.tsconfig.json # 类型声明构建配置
├── tsconfig.json         # 基础 TypeScript 配置
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
└── package.json
```

---

## 3. 常用命令

测试用例编写规范见 [测试用例编写指南](./testing-guide.md)。

### 3.1 开发命令

```bash
# 类型检查（不生成文件）
pnpm run check

# 监听模式类型检查
tsc --noEmit --watch
```

### 3.2 构建命令

```bash
# 完整构建（类型检查 + 清理 + CJS + ESM + 声明文件）
pnpm run build

# 单独构建 CJS
pnpm run cjs

# 单独构建 ESM
pnpm run esm

# 单独构建类型声明
pnpm run declare

# 清理构建产物
pnpm run clean
```

### 3.3 代码质量

```bash
# ESLint 检查
eslint src/

# ESLint 自动修复
eslint src/ --fix

# Prettier 格式化
prettier --write src/
```

### 3.4 版本管理

```bash
# 更新补丁版本
pnpm run update:patch

# 更新次版本
pnpm run update:minor

# 更新主版本
pnpm run update:major
```

---

## 4. 构建配置

### 4.1 TypeScript 配置继承

```text
tsconfig.json (基础配置)
  ├── cjs.tsconfig.json (CommonJS 输出)
  ├── esm.tsconfig.json (ES Modules 输出)
  └── declare.tsconfig.json (类型声明输出)
```

### 4.2 基础配置

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext", "DOM"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "importHelpers": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

### 4.3 CJS 配置

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node10",
    "outDir": "./cjs"
  }
}
```

### 4.4 ESM 配置

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./esm"
  }
}
```

### 4.5 类型声明配置

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "./typings"
  }
}
```

---

## 5. 代码规范

### 5.1 ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
  },
};
```

### 5.2 Prettier 配置

```json
{
  "printWidth": 90,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxBracketSameLine": true,
  "endOfLine": "auto",
  "singleAttributePerLine": true,
  "useTabs": true
}
```

### 5.3 代码风格要点

```text
- 使用 Tab 缩进
- 使用单引号
- 使用尾逗号
- 每行最多 90 字符
- JSX 属性单独一行
- 未使用变量以 _ 前缀命名
```

---

## 6. 添加新图表类型

### 6.1 创建图表组件

```typescript
// src/charts/newchart.tsx
import { GridComponent } from 'echarts/components';
import { NewChartChart } from 'echarts/charts';
import Adapter from '../adapter';
import { forwardRef, useMemo } from 'react';
import type { NewChartSeriesOption } from 'echarts/charts';
import type { CoreRef } from '../core';
import type { Axis, EchartsProps, ExtensionsComponent, GeneratorOptions } from '../types/base';

export interface NewChartProps
  extends EchartsProps<GeneratorOptions<NewChartSeriesOption, ExtensionsComponent> & Axis> {}

const NewChart = forwardRef<CoreRef, NewChartProps>((props, ref) => {
  const NewChartExtensions = useMemo(() => [GridComponent, NewChartChart], []);
  return (
    <Adapter
      use={NewChartExtensions}
      ref={ref}
      {...props}
    />
  );
});

export { NewChart };
```

### 6.2 注册图表类型

```typescript
// src/constant.ts
export const ChartTypes = [
  'bar',
  'funnel',
  'gauge',
  'graphic',
  'heatmap',
  'line',
  'newchart', // 添加新类型
  'pie',
  'sankey',
  'sunburst',
] as const;
```

### 6.3 更新类型定义

```typescript
// src/charts/chart.tsx
export type ChartComponentProps =
  | ({ type: 'bar' } & BarProps)
  | ({ type: 'newchart' } & NewChartProps); // 添加新类型
// ... 其他类型
```

### 6.4 导出组件

```typescript
// src/index.tsx
export * from './charts/newchart';
```

---

## 7. 添加新 Hook

### 7.1 Hook 文件结构

```typescript
// src/hook/useMyHook.tsx
import { useState, useEffect } from 'react';

export const useMyHook = (param: string) => {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Hook 逻辑
    setState(param);
  }, [param]);

  return state;
};
```

### 7.2 Hook 命名规范

```text
- 文件名以 use 开头
- 导出函数以 use 开头
- 返回值使用 as const 或明确类型
```

---

## 8. 测试策略

### 8.1 当前状态

```text
项目目前没有配置测试框架。
建议添加以下测试：
- 组件渲染测试
- Hook 单元测试
- 类型检查测试
```

### 8.2 建议的测试结构

```
src/
├── __tests__/
│   ├── charts/
│   │   ├── bar.test.tsx
│   │   └── line.test.tsx
│   ├── hooks/
│   │   ├── useExtensions.test.ts
│   │   └── useResize.test.ts
│   └── utils/
│       ├── compare.test.ts
│       └── extensions.test.ts
```

### 8.3 测试工具建议

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "@types/jest": "^29.0.0"
  }
}
```

---

## 9. 发布流程

### 9.1 发布前检查

```bash
# 1. 类型检查
pnpm run check

# 2. 完整构建
pnpm run build

# 3. 检查构建产物
ls -la cjs/ esm/ typings/
```

### 9.2 版本更新

```bash
# 补丁版本（bug 修复）
pnpm run update:patch

# 次版本（新功能）
pnpm run update:minor

# 主版本（破坏性变更）
pnpm run update:major
```

### 9.3 发布到 npm

```bash
# 登录 npm
npm login

# 发布
npm publish --access public
```

### 9.4 发布产物

```text
cjs/           # CommonJS 模块
esm/           # ES Modules 模块
typings/       # TypeScript 类型声明
```

---

## 10. 调试技巧

### 10.1 控制台调试

```typescript
// 在 Core 组件中，卸载时会打印实例信息
console.log(
  'Unmounted Core: remove Resize Event & dispose',
  instance.current.getOption(),
);
```

### 10.2 React DevTools

```text
- 检查组件 props 是否正确传递
- 检查 ref 是否正确绑定
- 检查重渲染原因
```

### 10.3 ECharts 调试

```typescript
// 通过 ref 访问实例
const instance = chartRef.current?.instance();

// 打印当前配置
console.log(instance?.getOption());

// 检查实例状态
console.log(instance?.isDisposed());
```

### 10.4 网络调试

```text
- 检查扩展组件是否正确加载
- 检查动态导入是否成功
- 查看是否有加载错误
```

---

## 11. 常见问题

### 11.1 构建失败

```bash
# 清理并重新构建
pnpm run clean
pnpm run build

# 检查 TypeScript 错误
pnpm run check
```

### 11.2 类型错误

```text
1. 确保 ECharts 版本兼容
2. 检查 tsconfig.json 配置
3. 更新 @types/react 和 @types/react-dom
```

### 11.3 ESLint 错误

```bash
# 自动修复
eslint src/ --fix

# 检查具体错误
eslint src/ --debug
```

### 11.4 依赖问题

```bash
# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 12. 贡献指南

### 12.1 提交规范

```text
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具链更新
```

### 12.2 Pull Request 流程

```text
1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 运行测试和类型检查
5. 创建 Pull Request
6. 等待代码审查
```

### 12.3 代码审查要点

```text
- 类型安全
- 性能影响
- 向后兼容性
- 测试覆盖
- 文档更新
```

---

## 13. 资源链接

```text
项目仓库: https://github.com/jay0815/react-echart
npm 包: https://www.npmjs.com/package/@hedone/react-echart
ECharts 文档: https://echarts.apache.org/zh/index.html
React 文档: https://react.dev/
TypeScript 文档: https://www.typescriptlang.org/
```
