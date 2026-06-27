import type { Story } from '@ladle/react';
import { Gauge } from '../../charts/gauge';
import {
  Playground,
  usePlaygroundState,
  bool,
  text,
  color,
  range,
} from '../components/Playground';

// ============================================================================
// Gauge Playground
// ============================================================================

interface GaugePlaygroundState {
  showTitle: boolean;
  titleText: string;
  value: number;
  min: number;
  max: number;
  showPointer: boolean;
  pointerColor: string;
  axisLineColor: string;
  showSplitLine: boolean;
  showAxisLabel: boolean;
  theme: 'light' | 'dark';
}

const initialState: GaugePlaygroundState = {
  showTitle: false,
  titleText: 'Gauge',
  value: 60,
  min: 0,
  max: 100,
  showPointer: true,
  pointerColor: '#5470c6',
  axisLineColor: '#eee',
  showSplitLine: true,
  showAxisLabel: true,
  theme: 'light',
};

export const GaugePlayground: Story = () => {
  const [state, updateState] = usePlaygroundState(initialState);

  const controlGroups = [
    {
      title: '基础配置',
      controls: [
        bool(state, updateState, 'showTitle', '显示标题'),
        text(state, updateState, 'titleText', '标题文本'),
      ],
    },
    {
      title: '仪表盘配置',
      controls: [
        range(state, updateState, 'value', '当前值', state.min, state.max),
        {
          type: 'number' as const,
          key: 'min',
          label: '最小值',
          value: state.min,
          onChange: (v: number) => updateState('min', v),
        },
        {
          type: 'number' as const,
          key: 'max',
          label: '最大值',
          value: state.max,
          onChange: (v: number) => updateState('max', v),
        },
        bool(state, updateState, 'showPointer', '显示指针'),
        color(state, updateState, 'pointerColor', '指针颜色'),
      ],
    },
    {
      title: '样式配置',
      controls: [
        color(state, updateState, 'axisLineColor', '轴线颜色'),
        bool(state, updateState, 'showSplitLine', '显示分割线'),
        bool(state, updateState, 'showAxisLabel', '显示刻度标签'),
      ],
    },
  ];

  return (
    <Playground
      title="Gauge Chart Playground"
      description="仪表盘 - 交互式配置面板"
      controlGroups={controlGroups}
      theme={state.theme}
      onThemeChange={theme => updateState('theme', theme)}
    >
      <Gauge
        theme={state.theme}
        options={{
          title: state.showTitle
            ? {
                text: state.titleText,
                left: 'center',
              }
            : undefined,
          series: [
            {
              type: 'gauge',
              min: state.min,
              max: state.max,
              data: [{ value: state.value }],
              pointer: {
                show: state.showPointer,
                itemStyle: {
                  color: state.pointerColor,
                },
              },
              axisLine: {
                lineStyle: {
                  color: [[1, state.axisLineColor]],
                },
              },
              splitLine: {
                show: state.showSplitLine,
              },
              axisLabel: {
                show: state.showAxisLabel,
              },
            },
          ],
        }}
      />
    </Playground>
  );
};

GaugePlayground.meta = {
  name: 'Gauge',
};
