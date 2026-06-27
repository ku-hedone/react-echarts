import type { Story } from '@ladle/react';
import { Sankey } from '../charts/sankey';

export const Default: Story = () => (
  <Sankey
    options={{
      title: {
        text: 'Sankey Diagram',
      },
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
      },
      series: [
        {
          type: 'sankey',
          data: [
            { name: 'a' },
            { name: 'b' },
            { name: 'a1' },
            { name: 'b1' },
            { name: 'c' },
          ],
          links: [
            { source: 'a', target: 'a1', value: 5 },
            { source: 'a', target: 'b1', value: 3 },
            { source: 'b', target: 'a1', value: 8 },
            { source: 'b', target: 'c', value: 2 },
            { source: 'a1', target: 'c', value: 4 },
          ],
          emphasis: {
            focus: 'adjacency',
          },
          lineStyle: {
            color: 'gradient',
            curveness: 0.5,
          },
        },
      ],
    }}
  />
);

export const WithLevels: Story = () => (
  <Sankey
    options={{
      series: [
        {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency',
          },
          data: [
            { name: 'a' },
            { name: 'b' },
            { name: 'a1' },
            { name: 'a2' },
            { name: 'b1' },
            { name: 'c' },
          ],
          links: [
            { source: 'a', target: 'a1', value: 5 },
            { source: 'a', target: 'a2', value: 3 },
            { source: 'b', target: 'b1', value: 8 },
            { source: 'a1', target: 'c', value: 2 },
            { source: 'a2', target: 'c', value: 4 },
            { source: 'b1', target: 'c', value: 6 },
          ],
          levels: [
            {
              depth: 0,
              itemStyle: {
                color: '#fbb4ae',
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6,
              },
            },
            {
              depth: 1,
              itemStyle: {
                color: '#b3cde3',
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6,
              },
            },
            {
              depth: 2,
              itemStyle: {
                color: '#ccebc5',
              },
              lineStyle: {
                color: 'source',
                opacity: 0.6,
              },
            },
          ],
        },
      ],
    }}
  />
);
