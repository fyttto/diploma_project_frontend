export default function barchartCreate() {
  return {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 30, 15, 10, 20],
      },
    ],
  };
}
