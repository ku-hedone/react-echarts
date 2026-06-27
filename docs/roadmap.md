# React EChart Roadmap

## 已完成

- [x] 现代化工具链迁移（oxlint, oxfmt, tsup, vitest）
- [x] 升级到 React 19, TypeScript 6.0, ECharts 6.1
- [x] 添加完整文档（CLAUDE.md, docs/）
- [x] 优化 ECharts 导入（统一从 echarts/core 导入运行时代码）
- [x] 移除 forwardRef，使用 React 19 的 ref as prop 特性
- [x] 搭建测试体系（Vitest + React Testing Library + Playwright）
- [x] 测试覆盖率 95%+（超过 80% 目标）

## 已完成

- [x] 添加 Ladle 组件文档（Storybook 轻量替代）

## 进行中

- [ ] Bundle 大小分析和优化
- [ ] 补充 ECharts 6.x 新特性

## 计划中

### 短期（1-2 个月）

- [ ] 配置 CI/CD 自动化流程
- [ ] 发布 v0.4.0 稳定版本

### 中期（3-6 个月）

- [ ] 添加更多图表类型（Treemap, Graph, Parallel 等）
- [ ] 性能优化和 tree-shaking 增强

### 长期（6+ 个月）

- [ ] 引入 React Compiler（需评估消费方兼容性）
- [ ] 支持 Server Components
- [ ] 支持 React Native（通过 react-native-svg）

## 技术决策记录

### React Compiler 策略

**决策**：短期内不引入 React Compiler

**原因**：

1. 作为 npm 包发布，消费方可能没有启用 React Compiler
2. 已编译的代码无法被 React Compiler 优化
3. 需要保留 useMemo/useCallback/memo 以确保性能

**未来方案**：

- 发布两个版本：编译优化版本 + 源码版本
- 或等待 React Compiler 成为 React 默认行为

**相关讨论**：2026-06-26 代码优化讨论

---

## 版本计划

| 版本   | 目标                     | 预计时间 |
| ------ | ------------------------ | -------- |
| v0.4.0 | 添加测试，Storybook 文档 | 2026 Q3  |
| v0.5.0 | CI/CD，性能优化          | 2026 Q3  |
| v1.0.0 | 稳定版本，完整功能       | 2026 Q4  |
