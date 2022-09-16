import { lazy, Suspense } from 'react';
import { ChartTypes } from '../constant';
import type { FC } from 'react';
import type { ChartType } from '../types/base';
import type { BarProps } from './bar';
import type { GaugeProps } from './gauge';
import type { HeatMapProps } from './heatmap';
import type { PieProps } from './pie';
import type { SankeyProps } from './sankey';
import type { GraphicProps } from './graphic';

export type ChartComponentProps =
	| ({
			type: 'bar';
	  } & BarProps)
	| ({
			type: 'gauge';
	  } & GaugeProps)
	| ({
			type: 'heatmap';
	  } & HeatMapProps)
	| ({
			type: 'pie';
	  } & PieProps)
	| ({
			type: 'sankey';
	  } & SankeyProps)
	| ({
			type: 'graphic';
	  } & GraphicProps);

export const Chart: FC<ChartComponentProps> = ({ type, options, ...other }) => {
    try {
        if (typeof type === 'undefined' || !type) {
            throw new Error(`type must be valid string. eg: ${ChartTypes.toString()}`);
        }
        type = type.toLowerCase().trim() as ChartType;
        if (ChartTypes.indexOf(type) === -1) {
            throw new Error(`type must in ${ChartTypes.toString()}`);
        }
        const Chart = lazy<FC<Omit<ChartComponentProps, 'type'>>>(async () =>
            import(`../charts/${type}.js`).then((res) => {
                const ChartName = type.split('');
                ChartName[0] = ChartName[0].toLocaleUpperCase();
                return {
                    ...res,
                    default: res[ChartName.join('')],
                };
            }),
        );
        return (
            <Suspense fallback={null}>
                <Chart
                    options={options}
                    {...other}
                />
            </Suspense>
        );
    } catch(e) {
        console.error(e);
        return null;
    }

};
