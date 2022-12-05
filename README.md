<h1 align="center">echart-for-rc</h1>

<div align="center">

An simple React wrapper for Apache ECharts.

Includes some specific type templates.

</div>

[![](./static/example.png)](example)

English | [简体中文](./README-zh_CN.md)

## ✨ Features

- 🛡 Written in TypeScript with predictable static types.
- 🌈 Implemented using react hooks.
- 📦 For more friendly hint, base on Echarts V5 .
- 🎨 Auto decide how to import required extensions then do more optimization for bundle size.
- ⚙️  support JSX event style.

## 📦 Install

```bash
npm install @hedone/react-echart
```

```bash
yarn add @hedone/react-echart
```

## 🔨 Usage


```jsx
import { Bar } from '@hedone/react-echart';

const App = () => (
  <>
    <Bar 
      options={{
        title: {
          text: 'Tesla',
          subtext: 'Fuck Data',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
          },
        ],
      }}
    />
  </>
);
```

or

```tsx
import { Bar } from '@hedone/react-echart';
import type { BarOptions } from '@hedone/react-echart';

const App = () => {

  const options: BarOptions = {
    title: {
      text: 'Tesla',
      subtext: 'Fuck Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  }
  return (
    <Bar 
      options={options}
    />
  )
};
```

## TypeScript

`react-echart` base on latest stable TypeScript Version（>=4.6.3）.

## ⌨️ Development

clone locally:

```bash
$ git clone git@github.com:jay0815/react-echart.git
$ cd react-echart
$ pnpm install
```