# 测试用例编写指南

本文档用于约束本项目后续测试用例的编写方式。目标不是单纯提高测试数量，而是让测试能稳定发现核心行为回归。

## 1. 测试目标

测试应该验证行为契约，而不是只验证代码没有报错。

对于 React ECharts 组件，核心行为包括：

- ECharts instance 被正确初始化
- `echarts.use` 按需注册扩展
- `setOption` 收到正确的 options 和更新参数
- 事件 props 能映射到 ECharts 事件绑定
- loading、resize、ref、dispose 等生命周期逻辑按预期执行
- E2E 中用户操作能产生可观察结果

如果某个测试在删除核心实现后仍然通过，它就是不可靠测试。

## 2. 常见不可靠测试

### 2.1 只断言 DOM 存在

不推荐：

```tsx
render(<Bar options={options} />);
expect(container.querySelector('div')).toBeInTheDocument();
```

这只能证明 React 渲染了容器，不能证明 ECharts 初始化成功，也不能证明 options 被传给 ECharts。

更可靠的做法：

```tsx
render(<Bar options={options} />);

await waitFor(() => {
  expect(mockInstance.setOption).toHaveBeenCalledWith(
    options,
    expect.objectContaining({ lazyUpdate: false }),
  );
});
```

### 2.2 mock 没有驱动真实路径

如果组件依赖 `getInstanceByDom` 获取 ECharts instance，mock 必须返回可断言的 instance。

不推荐：

```ts
getInstanceByDom: vi.fn(),
```

推荐：

```ts
const mockInstance = {
  setOption: vi.fn(),
  resize: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  dispose: vi.fn(),
  getOption: vi.fn(() => ({})),
};

vi.mock('echarts/core', () => ({
  init: vi.fn(() => mockInstance),
  getInstanceByDom: vi.fn(() => mockInstance),
  use: vi.fn(),
  dispose: vi.fn(),
}));
```

否则 `Core` 可能不会设置 `instance.current`，`setOption`、事件绑定、loading 等分支都不会执行，测试会出现 false positive。

### 2.3 异步断言没有 await

不推荐：

```ts
waitFor(() => {
  expect(ref.current).toBeDefined();
});
```

推荐：

```ts
await waitFor(() => {
  expect(ref.current).toBeDefined();
});
```

所有 `waitFor`、`findBy*`、异步 user event、Playwright assertion 都必须进入测试等待链。

### 2.4 E2E 断言外部现象

不推荐用 wrapper CSS 变化代替图表 resize：

```ts
const initialBox = await chartContainer.boundingBox();
await page.setViewportSize({ width: 800, height: 600 });
const newBox = await chartContainer.boundingBox();
expect(newBox?.width).not.toBe(initialBox?.width);
```

这只能证明 CSS 响应式生效，不能证明 ECharts canvas 发生 resize。

推荐断言 canvas 或可观察的图表状态：

```ts
const chart = page.locator('canvas').first();
const initialBox = await chart.boundingBox();

await page.setViewportSize({ width: 800, height: 600 });

await expect
  .poll(async () => (await chart.boundingBox())?.width)
  .not.toBe(initialBox?.width);
```

### 2.5 事件测试没有结果断言

不推荐：

```ts
await chart.click();
```

推荐在测试页注册真实事件，并让事件更新可观察状态：

```tsx
<Bar onClick={() => setClickCount(count => count + 1)} />
<output data-testid="click-count">{clickCount}</output>
```

```ts
await chart.click();
await expect(page.locator('[data-testid="click-count"]')).toHaveText('1');
```

## 3. 本项目测试规则

### 3.1 组件测试

组件测试优先验证组件与 ECharts 的交互契约：

- `echarts.use` 是否被调用
- `setOption` 参数是否正确
- `showLoading` / `hideLoading` 是否执行
- `on` / `off` 是否绑定到正确事件名
- ref 是否暴露可用 instance 访问方法
- unmount 时是否 dispose

只断言容器存在的测试只能作为 smoke test，不能作为核心行为测试。

### 3.2 Hook 测试

Hook 测试应覆盖：

- 初始状态
- 状态变化后的结果
- cleanup 行为
- debounce / async / race condition
- 参数变化后的重新计算

涉及 timer 时使用 fake timers，并显式推进时间。

### 3.3 工具函数测试

工具函数应覆盖：

- 正常输入
- 边界输入
- 无效输入
- 分支逻辑
- 类型允许但值为空的情况

如果测试需要刻意传入类型外的值，应使用局部 `unknown as ...`，并在用例名中说明这是 runtime boundary test。

### 3.4 E2E 测试

E2E 测试只验证用户路径和浏览器真实行为，不应重复单元测试细节。

E2E 必须满足：

- 操作前有初始状态断言
- 操作后有可观察结果断言
- resize 断言图表自身效果，而不是只断言页面布局
- click、hover、keyboard 等交互必须绑定真实业务路径
- 尽量避免固定 `waitForTimeout`，优先使用 locator assertion 或 `expect.poll`

## 4. 映射和枚举必须完整覆盖

对于 `ChartTypes`、loader map、extension map 这类枚举驱动代码，优先使用参数化测试覆盖完整集合。

推荐：

```ts
it.each(ChartTypes)('renders %s chart', async type => {
  render(<Chart type={type} options={getOptions(type)} />);

  await waitFor(() => {
    expect(container.firstElementChild).toBeInTheDocument();
  });
});
```

这样新增图表类型或修改导出名时，测试能自动暴露遗漏。

## 5. 自查清单

提交测试前逐项检查：

- 删除目标实现后，测试是否会失败？
- 断言是否落在真正的行为结果上？
- mock 是否返回了足够驱动真实路径的数据？
- `waitFor` / async assertion 是否都有 `await`？
- 是否验证了核心依赖调用参数，而不是只验证 DOM？
- E2E 是否有操作前和操作后的可观察状态？
- resize 是否验证图表自身，而不是只验证 wrapper？
- 事件测试是否注册了真实回调并断言回调结果？
- 枚举、映射、loader 是否完整覆盖？
- 是否同时跑过 `pnpm typecheck` 和 `pnpm test:run`？

## 6. 验证命令

修改测试后至少运行：

```bash
pnpm typecheck
pnpm test:run
pnpm lint
pnpm format:check
```

涉及 Playwright 或浏览器行为时运行：

```bash
pnpm test:e2e
```

涉及打包入口、动态 import、exports 或类型导出时运行：

```bash
pnpm build
```

## 7. 判断测试质量的标准

可靠测试应满足一个简单标准：当目标行为被破坏时，它必须稳定失败。

如果测试只是让覆盖率上升，却不能在关键路径损坏时失败，应降低它的重要性，或补充真正的行为断言。
