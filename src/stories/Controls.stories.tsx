import type { Story } from '@ladle/react';
import { Bar } from '../charts/bar';
import { Line } from '../charts/line';
import { Pie } from '../charts/pie';

// 带 Controls 的 Bar 图表
export const BarWithControls: Story<{
  title: string;
  showTitle: boolean;
  showTooltip: boolean;
  showLegend: boolean;
  color: string;
  borderRadius: number;
  barWidth: number;
  data1: number;
  data2: number;
  data3: number;
  data4: number;
  data5: number;
}> = ({
  title,
  showTitle,
  showTooltip,
  showLegend,
  color,
  borderRadius,
  barWidth,
  data1,
  data2,
  data3,
  data4,
  data5,
}) => (
  <Bar
    options={{
      title: showTitle
        ? {
            text: title,
            left: 'center',
          }
        : undefined,
      tooltip: showTooltip ? { trigger: 'axis' } : undefined,
      legend: showLegend ? { data: ['Sales'], top: 30 } : undefined,
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Sales',
          data: [data1, data2, data3, data4, data5],
          type: 'bar',
          barWidth: `${barWidth}%`,
          itemStyle: {
            color,
            borderRadius: [borderRadius, borderRadius, 0, 0],
          },
        },
      ],
    }}
  />
);

BarWithControls.args = {
  title: 'Sales Chart',
  showTitle: true,
  showTooltip: true,
  showLegend: false,
  color: '#5470c6',
  borderRadius: 4,
  barWidth: 60,
  data1: 120,
  data2: 200,
  data3: 150,
  data4: 80,
  data5: 70,
};

BarWithControls.argTypes = {
  title: {
    control: { type: 'text' },
  },
  showTitle: {
    control: { type: 'boolean' },
  },
  showTooltip: {
    control: { type: 'boolean' },
  },
  showLegend: {
    control: { type: 'boolean' },
  },
  color: {
    control: { type: 'color' },
  },
  borderRadius: {
    control: { type: 'range', min: 0, max: 20, step: 1 },
  },
  barWidth: {
    control: { type: 'range', min: 20, max: 100, step: 5 },
  },
  data1: {
    name: 'Mon',
    control: { type: 'range', min: 0, max: 300, step: 10 },
  },
  data2: {
    name: 'Tue',
    control: { type: 'range', min: 0, max: 300, step: 10 },
  },
  data3: {
    name: 'Wed',
    control: { type: 'range', min: 0, max: 300, step: 10 },
  },
  data4: {
    name: 'Thu',
    control: { type: 'range', min: 0, max: 300, step: 10 },
  },
  data5: {
    name: 'Fri',
    control: { type: 'range', min: 0, max: 300, step: 10 },
  },
};

// 带 Controls 的 Line 图表
export const LineWithControls: Story<{
  smooth: boolean;
  showArea: boolean;
  color: string;
  lineWidth: number;
  showSymbol: boolean;
  symbolSize: number;
}> = ({ smooth, showArea, color, lineWidth, showSymbol, symbolSize }) => (
  <Line
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          smooth,
          areaStyle: showArea ? {} : undefined,
          lineStyle: { color, width: lineWidth },
          itemStyle: { color },
          showSymbol,
          symbolSize,
        },
      ],
    }}
  />
);

LineWithControls.args = {
  smooth: false,
  showArea: false,
  color: '#5470c6',
  lineWidth: 2,
  showSymbol: true,
  symbolSize: 8,
};

LineWithControls.argTypes = {
  smooth: {
    control: { type: 'boolean' },
  },
  showArea: {
    control: { type: 'boolean' },
  },
  color: {
    control: { type: 'color' },
  },
  lineWidth: {
    control: { type: 'range', min: 1, max: 10, step: 1 },
  },
  showSymbol: {
    control: { type: 'boolean' },
  },
  symbolSize: {
    control: { type: 'range', min: 2, max: 20, step: 1 },
  },
};

// 带 Controls 的 Pie 图表
export const PieWithControls: Story<{
  showLabel: boolean;
  labelPosition: string;
  roseType: boolean;
  radius: number;
  innerRadius: number;
}> = ({ showLabel, labelPosition, roseType, radius, innerRadius }) => (
  <Pie
    options={{
      series: [
        {
          type: 'pie',
          radius: innerRadius > 0 ? [`${innerRadius}%`, `${radius}%`] : `${radius}%`,
          roseType: roseType ? 'area' : undefined,
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
          label: {
            show: showLabel,
            position: labelPosition as any,
            formatter: '{b}: {d}%',
          },
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
);

PieWithControls.args = {
  showLabel: true,
  labelPosition: 'outside',
  roseType: false,
  radius: 50,
  innerRadius: 0,
};

PieWithControls.argTypes = {
  showLabel: {
    control: { type: 'boolean' },
  },
  labelPosition: {
    options: ['inside', 'outside', 'center'],
    control: { type: 'select' },
  },
  roseType: {
    control: { type: 'boolean' },
  },
  radius: {
    control: { type: 'range', min: 20, max: 80, step: 5 },
  },
  innerRadius: {
    name: 'Inner Radius (0 = solid)',
    control: { type: 'range', min: 0, max: 60, step: 5 },
  },
};

// 带 Controls 的主题切换
export const ThemeControls: Story<{
  theme: string;
  backgroundColor: string;
}> = ({ theme, backgroundColor }) => (
  <div style={{ backgroundColor, padding: '20px', borderRadius: '8px' }}>
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
);

ThemeControls.args = {
  theme: 'light',
  backgroundColor: '#ffffff',
};

ThemeControls.argTypes = {
  theme: {
    options: ['light', 'dark'],
    control: { type: 'radio' },
  },
  backgroundColor: {
    control: { type: 'color' },
  },
};
