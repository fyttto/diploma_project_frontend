<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script>
import * as echarts from 'echarts';
import { onMounted, ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const container = ref(null);
    const chart = ref(null);
    const userId = {
      userId:
        JSON.parse(window.localStorage.getItem('userInfo')).id &&
        JSON.parse(window.localStorage.getItem('userInfo')).id,
    };
    const AllData = reactive([]);
    const store = useStore();
    const drawCharts = (val) => {
      chart.value = echarts.init(container.value);
      chart.value.setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: '报警类型分布',
            type: 'pie',
            radius: [10, 80], // 设置图标的大小
            center: ['50%', '60%'], // 调整中间图表的位置
            roseType: 'area',
            itemStyle: {
              borderRadius: 4,
            },
            data: val, // 设置图标的数据
          },
        ],
      });
      window.addEventListener('resize', () => {
        chart.value.resize();
      });
    };
    onMounted(() => {
      // chart.value = echarts.init(container.value);
      store.dispatch('alert/getAlertType', userId).then((res) => {
        Object.keys(res).forEach((i) => {
          const tempData = {
            name: store.getters.alertTypeText[i],
            value: res[i],
          };
          AllData.push(tempData);
        });
        drawCharts(AllData);
      });
    });

    return {
      container,
    };
  },
};
</script>

<style lang="scss" scoped></style>
