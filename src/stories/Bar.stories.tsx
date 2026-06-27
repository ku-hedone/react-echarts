import type { Story } from '@ladle/react';
import { Bar } from '../charts/bar';

export const Default: Story = () => (
  <Bar
    options={{
      title: {
        text: 'Bar Chart',
        subtext: 'Basic Example',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }}
  />
);

export const WithTitle: Story = () => (
  <Bar
    options={{
      title: {
        text: 'Sales Data',
        subtext: 'Weekly Report',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }}
  />
);

export const WithTooltip: Story = () => (
  <Bar
    options={{
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }}
  />
);

export const WithLegend: Story = () => (
  <Bar
    options={{
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Sales', 'Profit'],
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Sales',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
        {
          name: 'Profit',
          data: [20, 50, 40, 10, 10, 30, 40],
          type: 'bar',
        },
      ],
    }}
  />
);

export const CustomStyle: Story = () => (
  <Bar
    style={{ width: '600px', height: '400px' }}
    className="custom-bar-chart"
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          itemStyle: {
            color: '#5470c6',
            borderRadius: [5, 5, 0, 0],
          },
        },
      ],
    }}
  />
);

export const WithLoading: Story = () => (
  <Bar
    showLoading={true}
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    }}
  />
);
