import type { Story } from '@ladle/react';
import { Pie } from '../../charts/pie';
import {
  Playground,
  usePlaygroundState,
  makeBaseControls,
  bool,
  select,
  range,
} from '../components/Playground';

// ============================================================================
// Pie Playground
// ============================================================================

interface PiePlaygroundState {
  showTitle: boolean;
  titleText: string;
  showTooltip: boolean;
  showLegend: boolean;
  showLabel: boolean;
  labelPosition: string;
  roseType: boolean;
  radius: number;
  innerRadius: number;
  theme: 'light' | 'dark';
}

const initialState: PiePlaygroundState = {
  showTitle: true,
  titleText: 'Pie Chart',
  showTooltip: true,
  showLegend: true,
  showLabel: true,
  labelPosition: 'outside',
  roseType: false,
  radius: 70,
  innerRadius: 0,
  theme: 'light',
};

export const PiePlayground: Story = () => {
  const [state, updateState] = usePlaygroundState(initialState);

  const controlGroups = [
    makeBaseControls(state, updateState),
    {
      title: '样式配置',
      controls: [
        bool(state, updateState, 'showLabel', '显示标签'),
        select(state, updateState, 'labelPosition', '标签位置', [
          { label: '内部', value: 'inside' },
          { label: '外部', value: 'outside' },
          { label: '中心', value: 'center' },
        ]),
        bool(state, updateState, 'roseType', '南丁格尔玫瑰图'),
        range(state, updateState, 'radius', '外半径 (%)', 30, 90, 5),
        range(state, updateState, 'innerRadius', '内半径 (%)', 0, 70, 5),
      ],
    },
  ];

  const radiusValue =
    state.innerRadius > 0
      ? [`${state.innerRadius}%`, `${state.radius}%`]
      : `${state.radius}%`;

  return (
    <Playground
      title="Pie Chart Playground"
      description="饼图 - 交互式配置面板"
      controlGroups={controlGroups}
      theme={state.theme}
      onThemeChange={theme => updateState('theme', theme)}
    >
      <Pie
        theme={state.theme}
        options={{
          title: state.showTitle
            ? {
                text: state.titleText,
                left: 'center',
              }
            : undefined,
          tooltip: state.showTooltip ? { trigger: 'item' } : undefined,
          legend: state.showLegend
            ? {
                orient: 'vertical',
                left: 'left',
                top: 'middle',
              }
            : undefined,
          series: [
            {
              type: 'pie',
              radius: radiusValue,
              center: ['60%', '50%'],
              roseType: state.roseType ? 'area' : undefined,
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
              ],
              label: {
                show: state.showLabel,
                position: state.labelPosition as 'inside' | 'outside' | 'center',
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
    </Playground>
  );
};

PiePlayground.meta = {
  name: 'Pie',
};
