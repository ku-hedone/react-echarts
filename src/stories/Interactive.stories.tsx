import { useState } from 'react';
import type { Story } from '@ladle/react';
import { Bar } from '../charts/bar';
import { Line } from '../charts/line';
import { Pie } from '../charts/pie';

// 动态切换数据
export const DynamicData: Story = () => {
  const [data, setData] = useState([120, 200, 150, 80, 70]);

  const randomize = () => {
    setData(data.map(() => Math.floor(Math.random() * 300)));
  };

  const double = () => {
    setData(data.map(v => v * 2));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={randomize} style={{ marginRight: 8 }}>
          随机数据
        </button>
        <button onClick={double}>数据翻倍</button>
      </div>
      <Bar
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: [{ data, type: 'bar' }],
        }}
      />
    </div>
  );
};

// 动态切换主题
export const DynamicTheme: Story = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          切换主题: {theme}
        </button>
      </div>
      <div
        style={{
          background: theme === 'dark' ? '#1a1a1a' : '#fff',
          padding: 20,
        }}
      >
        <Bar
          theme={theme}
          options={{
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            },
            yAxis: { type: 'value' },
            series: [
              {
                data: [120, 200, 150, 80, 70],
                type: 'bar',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

// 动态切换图表类型
export const DynamicChartType: Story = () => {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const commonOptions = {
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    yAxis: { type: 'value' as const },
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setChartType(chartType === 'bar' ? 'line' : 'bar')}>
          切换类型: {chartType}
        </button>
      </div>
      {chartType === 'bar' ? (
        <Bar
          options={{
            ...commonOptions,
            series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }],
          }}
        />
      ) : (
        <Line
          options={{
            ...commonOptions,
            series: [{ data: [120, 200, 150, 80, 70], type: 'line' }],
          }}
        />
      )}
    </div>
  );
};

// 动态切换样式
export const DynamicStyle: Story = () => {
  const [color, setColor] = useState('#5470c6');
  const [borderRadius, setBorderRadius] = useState(0);

  const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          颜色:
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                marginLeft: 8,
                background: c,
                color: '#fff',
                border: color === c ? '2px solid #000' : 'none',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div>
          圆角:
          <input
            type="range"
            min="0"
            max="20"
            value={borderRadius}
            onChange={e => setBorderRadius(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
          <span style={{ marginLeft: 8 }}>{borderRadius}px</span>
        </div>
      </div>
      <Bar
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              data: [120, 200, 150, 80, 70],
              type: 'bar',
              itemStyle: {
                color,
                borderRadius: [borderRadius, borderRadius, 0, 0],
              },
            },
          ],
        }}
      />
    </div>
  );
};

// 动态添加/删除系列
export const DynamicSeries: Story = () => {
  const [series, setSeries] = useState([
    { name: 'Series 1', data: [120, 200, 150, 80, 70] },
  ]);

  const addSeries = () => {
    const newSeries = {
      name: `Series ${series.length + 1}`,
      data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 300)),
    };
    setSeries([...series, newSeries]);
  };

  const removeSeries = () => {
    if (series.length > 1) {
      setSeries(series.slice(0, -1));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={addSeries} style={{ marginRight: 8 }}>
          添加系列
        </button>
        <button onClick={removeSeries}>删除系列</button>
        <span style={{ marginLeft: 16 }}>当前系列数: {series.length}</span>
      </div>
      <Bar
        options={{
          tooltip: { trigger: 'axis' },
          legend: { data: series.map(s => s.name) },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: series.map(s => ({
            ...s,
            type: 'bar' as const,
          })),
        }}
      />
    </div>
  );
};

// 动态切换 Loading 状态
export const DynamicLoading: Story = () => {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={simulateLoading}>模拟加载 (2秒)</button>
        <span style={{ marginLeft: 16 }}>状态: {loading ? '加载中...' : '已加载'}</span>
      </div>
      <Bar
        showLoading={loading}
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }],
        }}
      />
    </div>
  );
};

// 动态切换饼图数据
export const DynamicPie: Story = () => {
  const [data, setData] = useState([
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ]);

  const randomize = () => {
    setData(
      data.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 1000) + 100,
      })),
    );
  };

  const addCategory = () => {
    setData([
      ...data,
      {
        value: Math.floor(Math.random() * 500) + 100,
        name: `Category ${data.length + 1}`,
      },
    ]);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={randomize} style={{ marginRight: 8 }}>
          随机数据
        </button>
        <button onClick={addCategory}>添加分类</button>
      </div>
      <Pie
        options={{
          tooltip: { trigger: 'item' },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }}
      />
    </div>
  );
};
