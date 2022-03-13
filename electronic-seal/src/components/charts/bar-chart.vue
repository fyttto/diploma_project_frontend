<template>
  <div
    id="lineChart"
    class="w-full h-full"
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
  ></div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { getOnlineEquipment } from '@/utils/request';
import { formatDateTimeForHMSS, compareFunc } from '@/utils/tools';

export default defineComponent({
  setup() {
    const showChartsData = ref([]);
    const xShowData = ref([]);
    const result = ref([]);
    const resultData = ref({
      equipmentCount: [],
      vehicleCount: [],
      workerCount: [],
    });
    const loading = ref(true);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    const map = new Map();
    const drawCharts = (xData, showData) => {
      const myCharts = echarts.init(document.getElementById('lineChart'));
      myCharts.setOption({
        title: {
          text: '设备在线统计',
          left: '3%',
          right: '4%',
          top: '3%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['设备数量', '车辆数量', '工人数量'],
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xData,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '设备数量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: showData.equipmentCount,
          },
          {
            name: '车辆数量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: showData.vehicleCount,
          },
          {
            name: '工人数量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: showData.workerCount,
          },
        ],
      });
      // eslint-disable-next-line func-names
      window.onresize = function () {
        // 自适应大小
        myCharts.resize();
      };
    };
    onMounted(() => {
      getOnlineEquipment({
        userId:
          JSON.parse(window.localStorage.getItem('userInfo')).id &&
          JSON.parse(window.localStorage.getItem('userInfo')).id,
      }).then((res) => {
        if (res.status === 200 && res.data.code === 200 && res.data.data) {
          Object.keys(res.data.data.statistics).forEach((i) => {
            const temp = {
              key: i,
              value: res.data.data.statistics[i],
            };

            if (!map.has(temp.key)) {
              map.set(temp.key, temp.value);
              showChartsData.value.push(temp);
            }
          });
          if (showChartsData.value.length !== 0) {
            result.value = showChartsData.value.sort(compareFunc('key'));
          }
          result.value.forEach((val) => {
            if (val.value.equipmentCount) {
              resultData.value.equipmentCount.push(val.value.equipmentCount);
            }
            if (val.value.vehicleCount) {
              resultData.value.vehicleCount.push(val.value.vehicleCount);
            }
            if (val.value.workerCount !== undefined) {
              resultData.value.workerCount.push(val.value.workerCount);
            }
          });
          xShowData.value = xShowData.value.map((value) => formatDateTimeForHMSS(value));

          drawCharts(xShowData.value, resultData.value);
        }
      });
    });
    return {
      loading,
      svg,
    };
  },
});
</script>

<style></style>
