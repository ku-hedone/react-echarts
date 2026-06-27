/** @type {import('@ladle/react').UserConfig} */
export default {
  addons: {
    a11y: {
      enabled: false,
    },
    action: {
      enabled: true,
      defaultState: [],
    },
    control: {
      enabled: true,
      defaultState: {},
    },
    ladle: {
      enabled: true,
    },
    mode: {
      enabled: true,
      defaultState: 'full',
    },
    msw: {
      enabled: false,
    },
    rtl: {
      enabled: false,
      defaultState: false,
    },
    source: {
      enabled: true,
      defaultState: false,
    },
    theme: {
      enabled: true,
      defaultState: 'light',
    },
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024,
      },
      defaultState: 0,
    },
  },
  appendToHead: `
    <style>
      /* 自定义 Ladle 主题样式 - 现代化设计 */
      :root {
        /* 主色调 */
        --ladle-accent: #6366f1;
        --ladle-accent-hover: #4f46e5;
        --ladle-accent-light: #e0e7ff;
        --ladle-accent-subtle: #f5f3ff;

        /* 背景色 */
        --ladle-bg-primary: #ffffff;
        --ladle-bg-secondary: #f8fafc;
        --ladle-bg-tertiary: #f1f5f9;
        --ladle-bg-hover: #e2e8f0;

        /* 文字色 */
        --ladle-text-primary: #0f172a;
        --ladle-text-secondary: #475569;
        --ladle-text-tertiary: #94a3b8;
        --ladle-text-inverse: #ffffff;

        /* 边框和阴影 */
        --ladle-border: #e2e8f0;
        --ladle-border-light: #f1f5f9;
        --ladle-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --ladle-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --ladle-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        --ladle-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

        /* 圆角 */
        --ladle-radius-sm: 6px;
        --ladle-radius: 8px;
        --ladle-radius-md: 10px;
        --ladle-radius-lg: 12px;
        --ladle-radius-xl: 16px;

        /* 间距 */
        --ladle-spacing-xs: 4px;
        --ladle-spacing-sm: 8px;
        --ladle-spacing-md: 12px;
        --ladle-spacing-lg: 16px;
        --ladle-spacing-xl: 24px;
        --ladle-spacing-2xl: 32px;

        /* 过渡 */
        --ladle-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        --ladle-transition-fast: all 0.1s ease;
        --ladle-transition-slow: all 0.3s ease;
      }

      [data-theme="dark"] {
        --ladle-accent: #818cf8;
        --ladle-accent-hover: #6366f1;
        --ladle-accent-light: #312e81;
        --ladle-accent-subtle: #1e1b4b;

        --ladle-bg-primary: #0f172a;
        --ladle-bg-secondary: #1e293b;
        --ladle-bg-tertiary: #334155;
        --ladle-bg-hover: #475569;

        --ladle-text-primary: #f8fafc;
        --ladle-text-secondary: #94a3b8;
        --ladle-text-tertiary: #64748b;
        --ladle-text-inverse: #0f172a;

        --ladle-border: #334155;
        --ladle-border-light: #1e293b;
        --ladle-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.2);
        --ladle-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);
        --ladle-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
        --ladle-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
      }

      /* 全局样式 */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        letter-spacing: -0.01em;
      }

      /* 侧边栏样式 */
      .ladle-sidebar {
        background: var(--ladle-bg-primary) !important;
        border-right: 1px solid var(--ladle-border) !important;
        box-shadow: var(--ladle-shadow) !important;
        width: 280px !important;
      }

      /* 侧边栏标题 */
      .ladle-sidebar h1 {
        font-size: 1.375rem !important;
        font-weight: 700 !important;
        color: var(--ladle-text-primary) !important;
        padding: 20px 20px 16px !important;
        margin: 0 !important;
        border-bottom: 1px solid var(--ladle-border) !important;
        letter-spacing: -0.025em;
      }

      /* 侧边栏链接 */
      .ladle-sidebar a {
        color: var(--ladle-text-secondary) !important;
        font-size: 0.875rem !important;
        font-weight: 500 !important;
        padding: 10px 16px !important;
        margin: 2px 8px !important;
        border-radius: var(--ladle-radius) !important;
        transition: var(--ladle-transition) !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }

      .ladle-sidebar a:hover {
        background: var(--ladle-bg-tertiary) !important;
        color: var(--ladle-text-primary) !important;
        transform: translateX(2px);
      }

      .ladle-sidebar a[data-selected] {
        background: var(--ladle-accent) !important;
        color: var(--ladle-text-inverse) !important;
        box-shadow: 0 2px 4px 0 rgb(99 102 241 / 0.3) !important;
      }

      /* 侧边栏搜索框 */
      .ladle-sidebar input[type="text"] {
        width: calc(100% - 32px) !important;
        margin: 12px 16px !important;
        padding: 10px 14px !important;
        border-radius: var(--ladle-radius-md) !important;
        border: 1.5px solid var(--ladle-border) !important;
        background: var(--ladle-bg-secondary) !important;
        font-size: 0.875rem !important;
        transition: var(--ladle-transition) !important;
      }

      .ladle-sidebar input[type="text"]:focus {
        outline: none !important;
        border-color: var(--ladle-accent) !important;
        background: var(--ladle-bg-primary) !important;
        box-shadow: 0 0 0 3px var(--ladle-accent-light) !important;
      }

      .ladle-sidebar input[type="text"]::placeholder {
        color: var(--ladle-text-tertiary) !important;
      }

      /* 主内容区 */
      .ladle-main {
        background: var(--ladle-bg-secondary) !important;
        padding: 24px !important;
      }

      /* 故事容器 */
      .ladle-story {
        background: var(--ladle-bg-primary) !important;
        border-radius: var(--ladle-radius-lg) !important;
        box-shadow: var(--ladle-shadow) !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 1px solid var(--ladle-border) !important;
        overflow: hidden !important;
        transition: var(--ladle-transition) !important;
      }

      .ladle-story:hover {
        box-shadow: var(--ladle-shadow-md) !important;
      }

      /* 底部工具栏 */
      .ladle-bottom {
        background: var(--ladle-bg-primary) !important;
        border-top: 1px solid var(--ladle-border) !important;
        box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.05) !important;
        padding: 12px 20px !important;
      }

      /* 工具栏按钮 */
      .ladle-bottom button {
        border-radius: var(--ladle-radius) !important;
        transition: var(--ladle-transition) !important;
        font-weight: 500 !important;
        padding: 8px 16px !important;
      }

      .ladle-bottom button:hover {
        background: var(--ladle-bg-tertiary) !important;
        transform: translateY(-1px);
      }

      .ladle-bottom button:active {
        transform: translateY(0);
      }

      /* 代码块 */
      pre {
        background: var(--ladle-bg-tertiary) !important;
        border-radius: var(--ladle-radius-md) !important;
        padding: 20px !important;
        border: 1px solid var(--ladle-border) !important;
        font-size: 0.875rem !important;
        font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace !important;
        overflow-x: auto !important;
        line-height: 1.7 !important;
      }

      /* 控制面板 */
      .ladle-addons {
        background: var(--ladle-bg-primary) !important;
        border: 1px solid var(--ladle-border) !important;
        border-radius: var(--ladle-radius-lg) !important;
        box-shadow: var(--ladle-shadow) !important;
        padding: 16px !important;
      }

      /* 选择框 - 限定在 Ladle 控件内 */
      .ladle-addons select,
      .ladle-bottom select {
        border-radius: var(--ladle-radius) !important;
        border: 1.5px solid var(--ladle-border) !important;
        padding: 8px 12px !important;
        font-size: 0.875rem !important;
        font-weight: 500 !important;
        background: var(--ladle-bg-primary) !important;
        color: var(--ladle-text-primary) !important;
        transition: var(--ladle-transition) !important;
        cursor: pointer !important;
      }

      .ladle-addons select:hover,
      .ladle-bottom select:hover {
        border-color: var(--ladle-accent) !important;
      }

      .ladle-addons select:focus,
      .ladle-bottom select:focus {
        outline: none !important;
        border-color: var(--ladle-accent) !important;
        box-shadow: 0 0 0 3px var(--ladle-accent-light) !important;
      }

      /* 按钮样式 - 限定在 Ladle 控件内 */
      .ladle-addons button,
      .ladle-bottom button {
        font-family: inherit !important;
        cursor: pointer !important;
      }

      /* 标签页样式 */
      [role="tablist"] {
        gap: 4px !important;
        padding: 4px !important;
        background: var(--ladle-bg-tertiary) !important;
        border-radius: var(--ladle-radius-md) !important;
      }

      [role="tab"] {
        padding: 8px 16px !important;
        border-radius: var(--ladle-radius) !important;
        font-weight: 500 !important;
        transition: var(--ladle-transition) !important;
      }

      [role="tab"][aria-selected="true"] {
        background: var(--ladle-bg-primary) !important;
        box-shadow: var(--ladle-shadow-sm) !important;
      }

      /* 滚动条样式 */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--ladle-border);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: var(--ladle-text-tertiary);
      }

      /* 响应式调整 */
      @media (max-width: 768px) {
        .ladle-sidebar {
          width: 240px !important;
        }

        .ladle-main {
          padding: 16px !important;
        }
      }

      /* 动画关键帧 */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-8px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .ladle-story {
        animation: fadeIn 0.3s ease-out;
      }

      .ladle-sidebar a {
        animation: slideIn 0.2s ease-out;
      }
    </style>
  `,
};
