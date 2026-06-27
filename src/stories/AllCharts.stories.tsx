import type { Story } from '@ladle/react';
import { Bar } from '../charts/bar';
import { Line } from '../charts/line';
import { Pie } from '../charts/pie';
import { Gauge } from '../charts/gauge';
import { Funnel } from '../charts/funnel';

export const Overview: Story = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
    <div>
      <h3>Bar Chart</h3>
      <Bar
        style={{ height: '300px' }}
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
    <div>
      <h3>Line Chart</h3>
      <Line
        style={{ height: '300px' }}
        options={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: [{ data: [150, 230, 224, 218, 135], type: 'line' }],
        }}
      />
    </div>
    <div>
      <h3>Pie Chart</h3>
      <Pie
        style={{ height: '300px' }}
        options={{
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
              ],
            },
          ],
        }}
      />
    </div>
    <div>
      <h3>Gauge Chart</h3>
      <Gauge
        style={{ height: '300px' }}
        options={{
          series: [
            {
              type: 'gauge',
              data: [{ value: 60, name: 'Speed' }],
            },
          ],
        }}
      />
    </div>
    <div style={{ gridColumn: 'span 2' }}>
      <h3>Funnel Chart</h3>
      <Funnel
        style={{ height: '300px' }}
        options={{
          series: [
            {
              type: 'funnel',
              left: '10%',
              width: '80%',
              data: [
                { value: 100, name: 'Show' },
                { value: 80, name: 'Click' },
                { value: 60, name: 'Visit' },
                { value: 40, name: 'Inquiry' },
                { value: 20, name: 'Order' },
              ],
            },
          ],
        }}
      />
    </div>
  </div>
);

export const DarkTheme: Story = () => (
  <div style={{ background: '#1a1a1a', padding: '20px' }}>
    <Bar
      theme="dark"
      style={{ height: '400px' }}
      options={{
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      }}
    />
  </div>
);

export const WithEvents: Story = () => (
  <Bar
    style={{ height: '400px' }}
    options={{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150, 80, 70], type: 'bar' }],
    }}
    onClick={params => {
      alert(`Clicked: ${params.name} - ${params.value}`);
    }}
  />
);
