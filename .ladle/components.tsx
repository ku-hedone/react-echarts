import type { GlobalProvider } from '@ladle/react';

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <div
      style={{
        padding: '24px',
        minHeight: '100vh',
        backgroundColor: globalState.theme === 'dark' ? '#0f172a' : '#f8fafc',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};
