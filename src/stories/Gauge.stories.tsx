import type { Story } from '@ladle/react';
import { Gauge } from '../charts/gauge';

export const Default: Story = () => (
  <Gauge
    options={{
      series: [
        {
          type: 'gauge',
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
        },
      ],
    }}
  />
);

export const MultiPointer: Story = () => (
  <Gauge
    options={{
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d'],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            distance: -30,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 30,
            lineStyle: {
              color: '#fff',
              width: 4,
            },
          },
          axisLabel: {
            color: 'inherit',
            distance: 40,
            fontSize: 20,
          },
          detail: {
            valueAnimation: true,
            formatter: '{value} km/h',
            color: 'inherit',
          },
          data: [
            {
              value: 70,
            },
          ],
        },
      ],
    }}
  />
);

export const Temperature: Story = () => (
  <Gauge
    options={{
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91',
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 20,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 80,
            offsetCenter: [0, '70%'],
            formatter: '{value} °C',
            color: 'inherit',
          },
          data: [
            {
              value: 20,
            },
          ],
        },
      ],
    }}
  />
);
