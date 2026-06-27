import type { Story } from '@ladle/react';
import { Funnel } from '../charts/funnel';

export const Default: Story = () => (
  <Funnel
    options={{
      title: {
        text: 'Funnel',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' },
          ],
        },
      ],
    }}
  />
);

export const Ascending: Story = () => (
  <Funnel
    options={{
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Funnel',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          sort: 'ascending',
          label: {
            show: true,
            position: 'inside',
          },
          data: [
            { value: 60, name: 'Visit' },
            { value: 40, name: 'Inquiry' },
            { value: 20, name: 'Order' },
            { value: 80, name: 'Click' },
            { value: 100, name: 'Show' },
          ],
        },
      ],
    }}
  />
);

export const CustomColor: Story = () => (
  <Funnel
    options={{
      series: [
        {
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          data: [
            { value: 60, name: 'Visit', itemStyle: { color: '#5470c6' } },
            { value: 40, name: 'Inquiry', itemStyle: { color: '#91cc75' } },
            { value: 20, name: 'Order', itemStyle: { color: '#fac858' } },
            { value: 80, name: 'Click', itemStyle: { color: '#ee6666' } },
            { value: 100, name: 'Show', itemStyle: { color: '#73c0de' } },
          ],
        },
      ],
    }}
  />
);
