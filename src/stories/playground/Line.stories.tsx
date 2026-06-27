import type { Story } from '@ladle/react';
import { Line } from '../../charts/line';
import {
  Playground,
  usePlaygroundState,
  makeBaseControls,
  color,
  range,
  bool,
} from '../components/Playground';

// ============================================================================
// Line Playground
// ============================================================================

interface LinePlaygroundState {
  showTitle: boolean;
  titleText: string;
  showTooltip: boolean;
  showLegend: boolean;
  lineColor: string;
  lineWidth: number;
  smooth: boolean;
  showArea: boolean;
  showSymbol: boolean;
  symbolSize: number;
  data1: number;
  data2: number;
  data3: number;
  data4: number;
  data5: number;
  data6: number;
  data7: number;
  theme: 'light' | 'dark';
}

const initialState: LinePlaygroundState = {
  showTitle: false,
  titleText: 'Line Chart',
  showTooltip: true,
  showLegend: false,
  lineColor: '#5470c6',
  lineWidth: 2,
  smooth: false,
  showArea: false,
  showSymbol: true,
  symbolSize: 8,
  data1: 150,
  data2: 230,
  data3: 224,
  data4: 218,
  data5: 135,
  data6: 147,
  data7: 260,
  theme: 'light',
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const LinePlayground: Story = () => {
  const [state, updateState] = usePlaygroundState(initialState);

  const controlGroups = [
    makeBaseControls(state, updateState),
    {
      title: '样式配置',
      controls: [
        color(state, updateState, 'lineColor', '线条颜色'),
        range(state, updateState, 'lineWidth', '线宽', 1, 10),
        bool(state, updateState, 'smooth', '平滑曲线'),
        bool(state, updateState, 'showArea', '显示面积'),
        bool(state, updateState, 'showSymbol', '显示标记点'),
        range(state, updateState, 'symbolSize', '标记大小', 2, 20),
      ],
    },
    {
      title: '数据配置',
      controls: DAYS.map((day, i) =>
        range(
          state,
          updateState,
          `data${i + 1}` as keyof LinePlaygroundState,
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
      title="Line Chart Playground"
      description="折线图 - 交互式配置面板"
      controlGroups={controlGroups}
      theme={state.theme}
      onThemeChange={theme => updateState('theme', theme)}
    >
      <Line
        theme={state.theme}
        options={{
          title: state.showTitle
            ? {
                text: state.titleText,
                left: 'center',
              }
            : undefined,
          tooltip: state.showTooltip ? { trigger: 'axis' } : undefined,
          legend: state.showLegend ? { data: ['Line'], top: 30 } : undefined,
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              name: 'Line',
              data: [
                state.data1,
                state.data2,
                state.data3,
                state.data4,
                state.data5,
                state.data6,
                state.data7,
              ],
              type: 'line',
              smooth: state.smooth,
              areaStyle: state.showArea ? {} : undefined,
              lineStyle: {
                color: state.lineColor,
                width: state.lineWidth,
              },
              itemStyle: { color: state.lineColor },
              showSymbol: state.showSymbol,
              symbolSize: state.symbolSize,
            },
          ],
        }}
      />
    </Playground>
  );
};

LinePlayground.meta = {
  name: 'Line',
};
