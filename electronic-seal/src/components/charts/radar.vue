<template>
  <div id="radarChart" class="w-full h-full"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

export default {
  props: {
    all: {
      indicator: {
        type: Object,
        default: '',
      },
      legend: {
        type: Array,
        default: [''],
      },
      series: {
        type: Array,
        default: '',
      },
    },
  },
  setup(props) {
    onMounted(() => {
      const myChart = echarts.init(document.getElementById('radarChart'));
      myChart.setOption({
        title: {
          text: 'test',
        },
        legend: {
          data: props.all.legend,
          // ['Allocated Budget', 'Actual Spending'],
        },
        radar: {
          // shape: 'circle',
          indicator: props.all.indicator,
          // { name: 'Sales', max: 6500 },
          // { name: 'Administration', max: 16000 },
          // { name: 'Information Technology', max: 30000 },
          // { name: 'Customer Support', max: 38000 },
          // { name: 'Development', max: 52000 },
        },
        series: props.all.series,
        // {
        //   name: 'Budget vs spending',
        //   type: 'radar',
        //   data: [
        //     {
        //       value: [4200, 3000, 20000, 35000, 50000, 18000],
        //       name: 'Allocated Budget',
        //     },
        //     {
        //       value: [5000, 14000, 28000, 26000, 42000, 21000],
        //       name: 'Actual Spending',
        //     },
        //   ],
        // },
      });
      window.addEventListener('resize', () => {
        myChart.resize();
      });
      // eslint-disable-next-line func-names
      // window.onresize = function () {
      //   // 自适应大小
      //   myChart.resize();
      // };
    });
  },
};
</script>
