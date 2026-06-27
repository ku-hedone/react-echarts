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
      /* 自定义 Ladle 主题样式 */
      :root {
        --ladle-bg-primary: #ffffff;
        --ladle-bg-secondary: #f8fafc;
        --ladle-bg-tertiary: #f1f5f9;
        --ladle-text-primary: #0f172a;
        --ladle-text-secondary: #475569;
        --ladle-border: #e2e8f0;
        --ladle-accent: #3b82f6;
        --ladle-accent-hover: #2563eb;
        --ladle-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        --ladle-radius: 8px;
      }

      [data-theme="dark"] {
        --ladle-bg-primary: #0f172a;
        --ladle-bg-secondary: #1e293b;
        --ladle-bg-tertiary: #334155;
        --ladle-text-primary: #f8fafc;
        --ladle-text-secondary: #94a3b8;
        --ladle-border: #334155;
        --ladle-accent: #60a5fa;
        --ladle-accent-hover: #3b82f6;
        --ladle-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);
      }

      /* 全局样式 */
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* 侧边栏样式 */
      .ladle-sidebar {
        background: var(--ladle-bg-primary) !important;
        border-right: 1px solid var(--ladle-border) !important;
        box-shadow: var(--ladle-shadow) !important;
      }

      /* 侧边栏标题 */
      .ladle-sidebar h1 {
        font-size: 1.25rem !important;
        font-weight: 700 !important;
        color: var(--ladle-text-primary) !important;
        padding: 16px !important;
        margin: 0 !important;
        border-bottom: 1px solid var(--ladle-border) !important;
      }

      /* 侧边栏链接 */
      .ladle-sidebar a {
        color: var(--ladle-text-secondary) !important;
        font-size: 0.875rem !important;
        padding: 8px 16px !important;
        border-radius: var(--ladle-radius) !important;
        transition: all 0.15s ease !important;
      }

      .ladle-sidebar a:hover {
        background: var(--ladle-bg-tertiary) !important;
        color: var(--ladle-text-primary) !important;
      }

      .ladle-sidebar a[data-selected] {
        background: var(--ladle-accent) !important;
        color: white !important;
      }

      /* 主内容区 */
      .ladle-main {
        background: var(--ladle-bg-secondary) !important;
      }

      /* 故事容器 */
      .ladle-story {
        background: var(--ladle-bg-primary) !important;
        border-radius: var(--ladle-radius) !important;
        box-shadow: var(--ladle-shadow) !important;
        margin: 16px !important;
        padding: 24px !important;
        border: 1px solid var(--ladle-border) !important;
      }

      /* 底部工具栏 */
      .ladle-bottom {
        background: var(--ladle-bg-primary) !important;
        border-top: 1px solid var(--ladle-border) !important;
        box-shadow: 0 -1px 3px 0 rgb(0 0 0 / 0.1) !important;
      }

      /* 工具栏按钮 */
      .ladle-bottom button {
        border-radius: var(--ladle-radius) !important;
        transition: all 0.15s ease !important;
      }

      .ladle-bottom button:hover {
        background: var(--ladle-bg-tertiary) !important;
      }

      /* 搜索框 */
      input[type="text"] {
        border-radius: var(--ladle-radius) !important;
        border: 1px solid var(--ladle-border) !important;
        padding: 8px 12px !important;
        font-size: 0.875rem !important;
        transition: all 0.15s ease !important;
      }

      input[type="text"]:focus {
        outline: none !important;
        border-color: var(--ladle-accent) !important;
        box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1) !important;
      }

      /* 故事标题 */
      h2 {
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        color: var(--ladle-text-primary) !important;
        margin-bottom: 16px !important;
      }

      /* 代码块 */
      pre {
        background: var(--ladle-bg-tertiary) !important;
        border-radius: var(--ladle-radius) !important;
        padding: 16px !important;
        border: 1px solid var(--ladle-border) !important;
        font-size: 0.875rem !important;
        overflow-x: auto !important;
      }

      /* 控制面板 */
      .ladle-addons {
        background: var(--ladle-bg-primary) !important;
        border: 1px solid var(--ladle-border) !important;
        border-radius: var(--ladle-radius) !important;
        box-shadow: var(--ladle-shadow) !important;
      }

      /* 选择框 */
      select {
        border-radius: var(--ladle-radius) !important;
        border: 1px solid var(--ladle-border) !important;
        padding: 6px 10px !important;
        font-size: 0.875rem !important;
        background: var(--ladle-bg-primary) !important;
        color: var(--ladle-text-primary) !important;
      }

      /* 按钮样式 */
      button {
        font-family: inherit !important;
      }

      /* 响应式调整 */
      @media (max-width: 768px) {
        .ladle-story {
          margin: 8px !important;
          padding: 16px !important;
        }
      }
    </style>
  `,
};
