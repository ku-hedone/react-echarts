import type { Story } from '@ladle/react';
import { Funnel } from '../../charts/funnel';
import {
  Playground,
  usePlaygroundState,
  makeBaseControls,
  select,
  range,
  bool,
} from '../components/Playground';

// ============================================================================
// Funnel Playground
// ============================================================================

interface FunnelPlaygroundState {
  showTitle: boolean;
  titleText: string;
  showTooltip: boolean;
  showLegend: boolean;
  sort: string;
  gap: number;
  showLabel: boolean;
  labelPosition: string;
  theme: 'light' | 'dark';
}

const initialState: FunnelPlaygroundState = {
  showTitle: true,
  titleText: 'Funnel Chart',
  showTooltip: true,
  showLegend: true,
  sort: 'descending',
  gap: 2,
  showLabel: true,
  labelPosition: 'inside',
  theme: 'light',
};

export const FunnelPlayground: Story = () => {
  const [state, updateState] = usePlaygroundState(initialState);

  const controlGroups = [
    makeBaseControls(state, updateState),
    {
      title: '样式配置',
      controls: [
        select(state, updateState, 'sort', '排序方式', [
          { label: '降序', value: 'descending' },
          { label: '升序', value: 'ascending' },
        ]),
        range(state, updateState, 'gap', '层间距', 0, 10),
        bool(state, updateState, 'showLabel', '显示标签'),
        select(state, updateState, 'labelPosition', '标签位置', [
          { label: '内部', value: 'inside' },
          { label: '左侧', value: 'left' },
          { label: '右侧', value: 'right' },
        ]),
      ],
    },
  ];

  return (
    <Playground
      title="Funnel Chart Playground"
      description="漏斗图 - 交互式配置面板"
      controlGroups={controlGroups}
      theme={state.theme}
      onThemeChange={theme => updateState('theme', theme)}
    >
      <Funnel
        theme={state.theme}
        options={{
          title: state.showTitle
            ? {
                text: state.titleText,
                left: 'center',
              }
            : undefined,
          tooltip: state.showTooltip
            ? {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%',
              }
            : undefined,
          legend: state.showLegend
            ? {
                orient: 'vertical',
                left: 'left',
                top: 'middle',
                data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order'],
              }
            : undefined,
          series: [
            {
              name: 'Funnel',
              type: 'funnel',
              left: '20%',
              top: 60,
              bottom: 60,
              width: '60%',
              sort: state.sort as 'descending' | 'ascending',
              gap: state.gap,
              label: {
                show: state.showLabel,
                position: state.labelPosition as 'inside' | 'left' | 'right',
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
              },
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
    </Playground>
  );
};

FunnelPlayground.meta = {
  name: 'Funnel',
};
