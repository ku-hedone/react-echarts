import { StrictMode } from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Bar } from '../src/charts/bar';

const options = {
  xAxis: {
    type: 'category' as const,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
  yAxis: {
    type: 'value' as const,
    max: 100,
  },
  series: [
    {
      type: 'bar' as const,
      data: [100, 100, 100, 100, 100],
    },
  ],
};

const App = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <main
      style={{
        minHeight: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: '#f6f7f9',
      }}
    >
      <section
        data-testid="chart-container"
        style={{
          width: '80vw',
          maxWidth: 960,
          minWidth: 280,
          height: 360,
        }}
      >
        <Bar
          options={options}
          style={{ width: '100%', height: '100%' }}
          onClick={() => setClickCount(count => count + 1)}
        />
      </section>
      <output data-testid="click-count">{clickCount}</output>
    </main>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
