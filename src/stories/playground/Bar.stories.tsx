import type { Story } from '@ladle/react';
import { Bar } from '../../charts/bar';
import {
  Playground,
  usePlaygroundState,
  makeBaseControls,
  color,
  range,
  bool,
} from '../components/Playground';

// ============================================================================
// Bar Playground
// ============================================================================

interface BarPlaygroundState {
  showTitle: boolean;
  titleText: string;
  showTooltip: boolean;
  showLegend: boolean;
  barColor: string;
  barWidth: number;
  borderRadius: number;
  showBackground: boolean;
  data1: number;
  data2: number;
  data3: number;
  data4: number;
  data5: number;
  theme: 'light' | 'dark';
}

const initialState: BarPlaygroundState = {
  showTitle: true,
  titleText: 'Sales Chart',
  showTooltip: true,
  showLegend: false,
  barColor: '#5470c6',
  barWidth: 60,
  borderRadius: 4,
  showBackground: false,
  data1: 120,
  data2: 200,
  data3: 150,
  data4: 80,
  data5: 70,
  theme: 'light',
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;

export const BarPlayground: Story = () => {
  const [state, updateState] = usePlaygroundState(initialState);

  const controlGroups = [
    makeBaseControls(state, updateState),
    {
      title: '样式配置',
      controls: [
        color(state, updateState, 'barColor', '柱子颜色'),
        range(state, updateState, 'barWidth', '柱子宽度 (%)', 20, 100, 5),
        range(state, updateState, 'borderRadius', '圆角', 0, 20),
        bool(state, updateState, 'showBackground', '显示背景'),
      ],
    },
    {
      title: '数据配置',
      controls: DAYS.map((day, i) =>
        range(
          state,
          updateState,
          `data${i + 1}` as keyof BarPlaygroundState,
          day,
          0,
          300,
          10,
        ),
      ),
    },
  ];

  return (
    <Playground
      title="Bar Chart Playground"
      description="柱状图 - 交互式配置面板"
      controlGroups={controlGroups}
      theme={state.theme}
      onThemeChange={theme => updateState('theme', theme)}
    >
      <Bar
        theme={state.theme}
        options={{
          title: state.showTitle
            ? {
                text: state.titleText,
                left: 'center',
              }
            : undefined,
          tooltip: state.showTooltip ? { trigger: 'axis' } : undefined,
          legend: state.showLegend ? { data: ['Sales'], top: 30 } : undefined,
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              name: 'Sales',
              data: [state.data1, state.data2, state.data3, state.data4, state.data5],
              type: 'bar',
              barWidth: `${state.barWidth}%`,
              showBackground: state.showBackground,
              itemStyle: {
                color: state.barColor,
                borderRadius: [state.borderRadius, state.borderRadius, 0, 0],
              },
            },
          ],
        }}
      />
    </Playground>
  );
};

BarPlayground.meta = {
  name: 'Bar',
};
