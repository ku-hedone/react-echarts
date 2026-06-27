import type { Story } from '@ladle/react';
import { SunBurst } from '../charts/sunburst';

export const Default: Story = () => (
  <SunBurst
    options={{
      title: {
        text: 'Sunburst Chart',
      },
      series: [
        {
          type: 'sunburst',
          data: [
            {
              name: 'Grandpa',
              children: [
                {
                  name: 'Uncle Leo',
                  children: [
                    { name: 'Cousin Jack', value: 20 },
                    { name: 'Cousin Mary', value: 30 },
                  ],
                },
                {
                  name: 'Father',
                  children: [
                    { name: 'Me', value: 40 },
                    {
                      name: 'Brother',
                      children: [
                        { name: 'Nephew', value: 10 },
                        { name: 'Niece', value: 15 },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'Aunt Nancy',
              children: [
                { name: 'Cousin Jimmy', value: 25 },
                { name: 'Cousin Jane', value: 35 },
              ],
            },
          ],
          radius: [0, '90%'],
          label: {
            rotate: 'radial',
          },
        },
      ],
    }}
  />
);

export const WithColors: Story = () => (
  <SunBurst
    options={{
      series: [
        {
          type: 'sunburst',
          data: [
            {
              name: 'Flora',
              itemStyle: { color: '#da0d68' },
              children: [
                {
                  name: 'Black Tea',
                  value: 1,
                  itemStyle: { color: '#975e6d' },
                },
                {
                  name: 'Floral',
                  itemStyle: { color: '#e0719c' },
                  children: [
                    {
                      name: 'Chamomile',
                      value: 1,
                      itemStyle: { color: '#f99e1c' },
                    },
                    {
                      name: 'Rose',
                      value: 1,
                      itemStyle: { color: '#ef5a78' },
                    },
                    {
                      name: 'Jasmine',
                      value: 1,
                      itemStyle: { color: '#f7f1bd' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'Fruity',
              itemStyle: { color: '#da1d23' },
              children: [
                {
                  name: 'Berry',
                  itemStyle: { color: '#dd4c51' },
                  children: [
                    {
                      name: 'Blackberry',
                      value: 1,
                      itemStyle: { color: '#3e0317' },
                    },
                    {
                      name: 'Raspberry',
                      value: 1,
                      itemStyle: { color: '#e62969' },
                    },
                  ],
                },
                {
                  name: 'Dried Fruit',
                  itemStyle: { color: '#c64191' },
                  children: [
                    {
                      name: 'Raisin',
                      value: 1,
                      itemStyle: { color: '#b53b54' },
                    },
                    {
                      name: 'Prune',
                      value: 1,
                      itemStyle: { color: '#a5446f' },
                    },
                  ],
                },
              ],
            },
          ],
          radius: ['20%', '90%'],
          sort: undefined,
          emphasis: {
            focus: 'ancestor',
          },
          levels: [
            {},
            {
              r0: '15%',
              r: '35%',
              itemStyle: {
                borderWidth: 2,
              },
              label: {
                rotate: 'tangential',
              },
            },
            {
              r0: '35%',
              r: '70%',
              label: {
                align: 'right',
              },
            },
            {
              r0: '70%',
              r: '72%',
              label: {
                position: 'outside',
                padding: 3,
                silent: false,
              },
              itemStyle: {
                borderWidth: 3,
              },
            },
          ],
        },
      ],
    }}
  />
);
