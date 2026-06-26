# React EChart 现代化升级计划

## 1. 升级概览

### 1.1 工具链替换

| 类别      | 当前工具     | 替换为      | 版本   |
| --------- | ------------ | ----------- | ------ |
| Linter    | ESLint 8.x   | **oxlint**  | 1.71.0 |
| Formatter | Prettier 3.x | **oxfmt**   | 0.56.0 |
| 测试框架  | 无           | **Vitest**  | 4.1.9  |
| 图表库    | ECharts 5.x  | **ECharts** | 6.1.0  |
| 构建工具  | tsc 手动编译 | **tsup**    | -      |

> **注意**：tscgo（TypeScript Go 编译器重写）目前尚未正式发布，建议先使用 tsup 作为构建工具，待 tsgo 稳定后再迁移。

### 1.2 核心收益

- **oxlint**：比 ESLint 快 50-100 倍，Rust 编写，零配置即可使用
- **oxfmt**：比 Prettier 快 35 倍+，Rust 编写，兼容 Prettier 格式
- **Vitest**：与 Vite 生态无缝集成，即时反馈的测试体验
- **ECharts 6.x**：更好的 TypeScript 支持，性能优化
- **tsup**：基于 esbuild，构建速度极快，配置简单

---

## 2. 升级步骤

### 2.1 构建工具升级（tsup）

**安装依赖**：

```bash
pnpm add -D tsup
```

**创建配置文件**：

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'echarts'],
  banner: {
    js: '"use client";',
  },
});
```

**更新 package.json**：

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit"
  }
}
```

**删除旧配置文件**：

```bash
rm cjs.tsconfig.json esm.tsconfig.json declare.tsconfig.json
```

---

### 2.2 Linter 升级（oxlint）

**安装依赖**：

```bash
pnpm add -D oxlint
```

**创建配置文件**：

```json
// .oxlintrc.json
{
  "rules": {
    "typescript/no-explicit-any": "warn",
    "typescript/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "ignore": ["dist", "node_modules", "*.config.*"]
}
```

**更新 package.json**：

```json
{
  "scripts": {
    "lint": "oxlint src/",
    "lint:fix": "oxlint src/ --fix"
  }
}
```

**删除旧配置文件**：

```bash
rm .eslintrc.js
```

---

### 2.3 Formatter 升级（oxfmt）

**安装依赖**：

```bash
pnpm add -D oxfmt
```

**创建配置文件**：

```json
// .oxfmtrc.json
{
  "printWidth": 90,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxBracketSameLine": true,
  "endOfLine": "auto",
  "useTabs": true
}
```

**更新 package.json**：

```json
{
  "scripts": {
    "format": "oxfmt src/",
    "format:check": "oxfmt src/ --check"
  }
}
```

**删除旧配置文件**：

```bash
rm .prettierrc
```

---

### 2.4 测试框架引入（Vitest）

**安装依赖**：

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

**创建配置文件**：

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
```

**更新 package.json**：

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

**创建测试目录结构**：

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
└── test/
    └── setup.ts
```

---

### 2.5 ECharts 升级

**更新依赖**：

```bash
pnpm add echarts@latest
```

**更新 peerDependencies**：

```json
{
  "peerDependencies": {
    "echarts": "^5.5.0 || ^6.0.0"
  }
}
```

**检查兼容性**：

1. 检查 ECharts 6.x 的 API 变更
2. 更新类型导入路径（如有变化）
3. 运行测试确保功能正常

---

### 2.6 TypeScript 配置更新

**更新 tsconfig.json**：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 3. Pre-commit Hooks

**安装依赖**：

```bash
pnpm add -D husky lint-staged
npx husky init
```

**配置 lint-staged**：

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["oxlint --fix", "oxfmt"],
    "*.{json,md}": ["oxfmt"]
  }
}
```

**配置 husky**：

```bash
# .husky/pre-commit
pnpm lint-staged
```

---

## 4. CI/CD 配置

**GitHub Actions**：

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm test:run
      - run: pnpm build
```

---

## 5. 完整 package.json 示例

```json
{
  "name": "@hedone/react-echart",
  "version": "1.0.0",
  "description": "React wrapper for Apache ECharts",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "lint": "oxlint src/",
    "lint:fix": "oxlint src/ --fix",
    "format": "oxfmt src/",
    "format:check": "oxfmt src/ --check",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "prepare": "husky"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "echarts": "^5.5.0 || ^6.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "echarts": "^6.1.0",
    "husky": "^9.0.0",
    "jsdom": "^25.0.0",
    "lint-staged": "^15.0.0",
    "oxfmt": "^0.56.0",
    "oxlint": "^1.71.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.6.0",
    "vitest": "^4.1.0"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["oxlint --fix", "oxfmt"],
    "*.{json,md}": ["oxfmt"]
  }
}
```

---

## 6. 迁移检查清单

### 6.1 构建工具迁移

- [ ] 安装 tsup
- [ ] 创建 tsup.config.ts
- [ ] 更新 package.json 的 scripts 和 exports
- [ ] 删除 cjs.tsconfig.json、esm.tsconfig.json、declare.tsconfig.json
- [ ] 测试构建产物

### 6.2 Linter 迁移

- [ ] 安装 oxlint
- [ ] 创建 .oxlintrc.json
- [ ] 删除 .eslintrc.js
- [ ] 更新 package.json scripts
- [ ] 运行 lint 检查并修复问题

### 6.3 Formatter 迁移

- [ ] 安装 oxfmt
- [ ] 创建 .oxfmtrc.json
- [ ] 删除 .prettierrc
- [ ] 更新 package.json scripts
- [ ] 格式化所有代码

### 6.4 测试框架搭建

- [ ] 安装 Vitest 和 Testing Library
- [ ] 创建 vitest.config.ts
- [ ] 创建测试 setup 文件
- [ ] 编写核心组件测试
- [ ] 配置覆盖率报告

### 6.5 ECharts 升级

- [ ] 更新 echarts 依赖
- [ ] 更新 peerDependencies
- [ ] 检查 API 兼容性
- [ ] 运行测试

### 6.6 Pre-commit 配置

- [ ] 安装 husky 和 lint-staged
- [ ] 配置 lint-staged
- [ ] 配置 husky pre-commit hook
- [ ] 测试 pre-commit 流程

---

## 7. 工具对比

### 7.1 Linter 对比

| 特性     | ESLint     | oxlint       |
| -------- | ---------- | ------------ |
| 语言     | JavaScript | Rust         |
| 速度     | 基准       | 50-100x 更快 |
| 配置     | 复杂       | 简单/零配置  |
| 规则数量 | 丰富       | 快速增长     |
| 生态     | 成熟       | 发展中       |

### 7.2 Formatter 对比

| 特性   | Prettier   | oxfmt         |
| ------ | ---------- | ------------- |
| 语言   | JavaScript | Rust          |
| 速度   | 基准       | 35x+ 更快     |
| 配置   | 简单       | 简单          |
| 兼容性 | 标准       | 兼容 Prettier |
| 插件   | 丰富       | 基础          |

### 7.3 测试框架对比

| 特性       | Jest   | Vitest   |
| ---------- | ------ | -------- |
| 配置       | 复杂   | 简单     |
| 速度       | 快     | 更快     |
| ESM 支持   | 有限   | 原生     |
| Vite 集成  | 需配置 | 开箱即用 |
| TypeScript | 需配置 | 开箱即用 |

---

## 8. 风险和注意事项

### 8.1 工具成熟度

**oxlint/oxfmt**：

- 相对较新，可能存在边缘情况
- 规则覆盖可能不如 ESLint 完整
- 建议保留 ESLint 作为 fallback

**缓解措施**：

- 在 CI 中同时运行 oxlint 和 ESLint
- 逐步迁移，不要一次性替换

### 8.2 ECharts 6.x 兼容性

**潜在问题**：

- API 变更可能导致类型错误
- 某些组件行为可能变化
- 扩展加载机制可能不同

**缓解措施**：

- 全面运行测试套件
- 检查 ECharts 6.x 迁移指南
- 保持对 ECharts 5.x 的支持

### 8.3 构建产物兼容性

**关注点**：

- CJS/ESM 双格式支持
- 类型声明文件正确生成
- Tree-shaking 效果

**验证方法**：

- 在不同环境中测试导入
- 检查 bundle 大小
- 验证类型推断

---

## 9. 时间线

| 阶段 | 任务                  | 预计时间 |
| ---- | --------------------- | -------- |
| 1    | 构建工具升级（tsup）  | 1-2 天   |
| 2    | Linter/Formatter 升级 | 1 天     |
| 3    | 测试框架搭建          | 2-3 天   |
| 4    | ECharts 升级          | 1-2 天   |
| 5    | Pre-commit/CI 配置    | 1 天     |
| 6    | 测试和验证            | 2-3 天   |

**总计**：约 1-2 周

---

## 10. 参考资源

- [oxlint 文档](https://oxc-project.github.io/)
- [oxfmt 文档](https://oxc-project.github.io/)
- [Vitest 文档](https://vitest.dev/)
- [tsup 文档](https://tsup.egoist.dev/)
- [ECharts 6.x 迁移指南](https://echarts.apache.org/handbook/en/basics/release-note/6.0)
- [Testing Library 文档](https://testing-library.com/docs/react-testing-library/intro/)
