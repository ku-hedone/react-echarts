# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目简介

React EChart 是一个 React 封装的 ECharts 图表库。

```bash
npm install @hedone/react-echart
```

**核心能力：**

- 按需加载 ECharts 组件
- 自动响应式容器大小变化
- 完整的 TypeScript 支持
- React 风格的事件处理
- 通过 ref 访问底层 ECharts 实例

**详细文档：**

- [项目背景](docs/project-background.md) - 项目定位、问题背景、核心目标
- [架构设计](docs/architecture.md) - 组件分层、扩展加载、响应式处理
- [组件使用指南](docs/component-guide.md) - 安装、用法、配置项、事件处理
- [开发指南](docs/development-guide.md) - 环境搭建、构建命令、代码规范
- [测试用例编写指南](docs/testing-guide.md) - 测试目标、反模式、自查清单
- [API 参考](docs/api-reference.md) - 完整的类型定义和 API 文档
- [现代化升级路线](docs/modernization-plan.md) - 技术栈升级计划和迁移指南
- [Roadmap](docs/roadmap.md) - 版本计划和技术决策记录
- [Bundle 分析](docs/bundle-analysis.md) - 包大小分析和优化策略
- [ECharts 6.x 新特性](docs/echarts6-features.md) - ECharts 6.0 功能支持
- [容器高度说明](docs/container-height.md) - 高度问题和解决方案

## 技术栈

- **前端框架**：React 19 + TypeScript 6.0
- **图表库**：Apache ECharts 6.1
- **构建工具**：tsup 8.x（基于 esbuild）
- **开发服务器**：Vite 6.x
- **包管理**：pnpm
- **Linter**：oxlint 1.71（Rust 编写，比 ESLint 快 50-100 倍）
- **Formatter**：oxfmt 0.56（Rust 编写，比 Prettier 快 35 倍+）
- **单元测试**：Vitest 4.x + React Testing Library
- **E2E 测试**：Playwright 1.61
- **组件文档**：Ladle 5.x（Storybook 轻量替代）

## 常用命令

```bash
# 安装依赖
pnpm install

# 构建
pnpm run build          # 使用 tsup 构建 CJS + ESM + 类型声明

# 开发模式（watch）
pnpm run dev

# 类型检查
pnpm run typecheck

# 代码检查（oxlint）
pnpm run lint
pnpm run lint:fix

# 代码格式化（oxfmt）
pnpm run format
pnpm run format:check

# 单元测试
pnpm run test           # watch 模式
pnpm run test:run       # 单次运行
pnpm run test:coverage  # 覆盖率报告

# E2E 测试
pnpm run test:e2e       # 运行 E2E 测试
pnpm run test:e2e:ui    # 打开 Playwright UI
pnpm run test:e2e:install  # 安装浏览器

# 组件文档（Ladle）
pnpm run storybook      # 启动文档服务器
pnpm run storybook:build  # 构建静态文档
```

## 项目结构

```
src/
├── adapter/          # Adapter 组件（扩展加载 + 事件转换）
├── charts/           # 图表组件（Bar、Line、Pie 等）
├── components/       # ECharts 组件封装（Grid、Tooltip 等）
├── core/             # Core 组件（ECharts 实例管理）
├── hook/             # 自定义 Hooks
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── constant.ts       # 常量定义
└── index.tsx         # 入口文件
```

## 核心架构

组件层次结构：

```
Chart (动态导入包装)
  └── [Bar|Line|Pie|...] (类型化图表组件)
        └── Adapter (扩展加载 + 事件转换)
              └── Core (ECharts 初始化/渲染/销毁)
```

**关键设计：**

1. **扩展自动加载**：根据 options 内容自动识别并加载所需的 ECharts 组件（Grid、Tooltip 等），优化 bundle 体积。

2. **响应式处理**：使用 ResizeObserver 监听容器大小变化，自动调用 ECharts.resize()。

3. **事件转换**：将 React 风格的事件 props（onClick）自动转换为 ECharts 事件格式。

4. **自定义 memo**：Core 组件使用自定义比较函数，避免不必要的重渲染。

## 添加新图表类型

1. 创建图表组件 `src/charts/newchart.tsx`
2. 在 `src/constant.ts` 的 `ChartTypes` 中添加类型
3. 在 `src/charts/chart.tsx` 的 `ChartComponentProps` 中添加类型
4. 在 `src/index.tsx` 中导出

示例：

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

## 构建配置

使用 tsup 统一构建，配置文件 `tsup.config.ts`：

- 输入：`src/index.ts`
- 输出：CJS (`dist/index.js`) + ESM (`dist/index.mjs`)
- 类型声明：`dist/index.d.ts`
- 自动清理 dist 目录

## 代码规范

**oxlint 规则：**

- React Hooks 规则强制执行（rules-of-hooks: error）
- 依赖数组检查（exhaustive-deps: warn）
- 未使用变量以 `_` 前缀命名允许
- 配置文件：`.oxlintrc.json`

**oxfmt 配置：**

- Tab 缩进
- 单引号
- 尾逗号
- 每行 90 字符
- JSX 属性单独一行
- 配置文件：`.oxfmtrc.json`

## 注意事项

1. **ECharts 导入**：使用 tree-shakable 导入方式（echarts/core、echarts/charts、echarts/components），不要从 bare echarts 导入。

2. **ref 访问**：所有图表组件通过 `forwardRef` 暴露 `CoreRef`，使用 `ref.instance()` 获取原生 ECharts 实例。

3. **扩展加载**：扩展组件由 Adapter 自动管理，通常不需要手动调用 `echarts.use()`。

4. **性能优化**：使用 useMemo/useCallback 缓存 options 和事件处理函数，避免不必要的重渲染。

5. **测试用例**：新增或修改测试时必须参考 [测试用例编写指南](docs/testing-guide.md)。测试应验证行为契约，避免只断言 DOM 存在、mock 不驱动真实路径、异步断言未 await、E2E 没有可观察结果等 false positive。

## 相关资源

- [项目仓库](https://github.com/jay0815/react-echart)
- [npm 包](https://www.npmjs.com/package/@hedone/react-echart)
- [ECharts 文档](https://echarts.apache.org/zh/index.html)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
