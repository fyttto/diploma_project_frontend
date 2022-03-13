<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { compareFunc } from '@/utils/tools';

export default {
  setup() {
    const container = ref(null);
    let myChart = '';
    const store = useStore();
    const valData = reactive({
      titleData: [],
      highData: [],
      lowData: [],
    });
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;

    const drawCharts = (val) => {
      myChart = echarts.init(container.value);
      myChart.setOption({
        title: {
          text: '报警情况',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['已解决报警', '全部报警'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: val.titleData,
        },
        yAxis: {
          type: 'value',
          ticks: {
            min: 0, // 最小值
            max: 100, // 最大值
          },
        },

        series: [
          {
            name: '已解决报警',
            type: 'line',
            stack: 'Total',
            data: val.lowData,
          },
          {
            name: '全部报警',
            type: 'line',
            stack: 'Total',
            data: val.highData,
          },
        ],
      });
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    };

    onMounted(() => {
      store.dispatch('alert/getAlertLine', { userId }).then(() => {
        const result = store.getters.alertLine.sort(compareFunc('key'));
        let beforeRes = {};
        if (beforeRes !== result) {
          result.forEach((value) => {
            if (valData.titleData) {
              valData.titleData.push(value.key);
            }
            if (valData.highData) {
              valData.highData.push(value.value.all);
            }
            if (valData.lowData) {
              valData.lowData.push(value.value.resolved);
            }
          });
        }
        beforeRes = result;
        drawCharts(valData);
      });
    });
    // watch(
    //   () => store.getters.alertLine,
    //   (newOptions) => {
    //     if (myChart !== null && myChart !== '' && myChart !== undefined) {
    //       myChart.dispose();
    //     }
    //     drawCharts(newOptions);
    //     console.log(myChart);
    //   },
    //   { deep: true },
    // );
    return {
      container,
    };
  },
};
</script>

<style lang="scss" scoped></style>
