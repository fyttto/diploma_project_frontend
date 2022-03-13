<template>
  <div>
    <el-row :gutter="30" justify="space-around" class="h-40">
      <el-col :lg="6" :xs="12" :sm="12" :md="6">
        <div class="w-full h-20 map-part" style="background-color: rgb(255, 251, 251)">
          <el-card :body-style="{ padding: '0px', display: 'flex', width: '100%', heigth: '100%' }">
            <div class="w-48 h-40 flex justify-center items-center bg-gray-100">
              <img class="w-20 h-20" src="@/assets/img/home/worker.png" />
            </div>
            <div style="padding: 14px; color: #95d475" class="flex justify-center items-center">
              <span style="width: 18px; margin: 0 20px; line-height: 18px; font-size: 18px">
                工人在线人数
              </span>
              <span style="width: 24px; line-height: 24px; font-size: 24px">{{
                equipment.actualUndergroundPersonNum
              }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :lg="6" :xs="12" :sm="12" :md="6">
        <div class="w-full h-40 from-part" style="background-color: rgb(255, 251, 251)">
          <el-card :body-style="{ padding: '0px', display: 'flex', width: '100%', heigth: '100%' }">
            <div class="w-48 h-40 flex justify-center items-center bg-gray-100">
              <img class="w-20 h-20" src="@/assets/img/home/surveillance-cameras-two.png" />
            </div>
            <div style="padding: 14px; color: #95d475" class="flex justify-center items-center">
              <span style="width: 18px; margin: 0 20px; line-height: 18px; font-size: 18px">
                摄像头在线数目
              </span>
              <span style="width: 24px; line-height: 24px; font-size: 24px">{{
                equipment.cameraOnlineNum
              }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :lg="6" :xs="12" :sm="12" :md="6">
        <div class="w-full h-40 from-part" style="background-color: rgb(255, 251, 251)">
          <el-card :body-style="{ padding: '0px', display: 'flex', width: '100%', heigth: '100%' }">
            <div class="w-48 h-40 flex justify-center items-center bg-gray-100">
              <img class="w-20 h-20" src="@/assets/img/home/helmet-one.png" />
            </div>
            <div style="padding: 14px; color: #95d475" class="flex justify-center items-center">
              <span style="width: 18px; margin: 0 20px; line-height: 18px; font-size: 18px"
                >工作设备数量</span
              >
              <span style="width: 24px; line-height: 24px; font-size: 24px">{{
                equipment.equipmentOperationNum
              }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :lg="6" :xs="12" :sm="12" :md="6">
        <div class="w-full h-40 from-part" style="background-color: rgb(255, 251, 251)">
          <el-card :body-style="{ padding: '0px', display: 'flex', width: '100%', heigth: '100%' }">
            <div class="w-48 h-40 flex justify-center items-center bg-gray-100">
              <img class="w-20 h-20" src="@/assets/img/home/taxi.png" />
            </div>
            <div style="padding: 14px; color: #95d475" class="flex justify-center items-center">
              <span style="width: 18px; margin: 0 20px; line-height: 18px; font-size: 18px"
                >工作车辆数量</span
              >
              <span style="width: 24px; line-height: 24px; font-size: 24px">{{
                equipment.vehicleOperationNum
              }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-2" justify="space-around">
      <el-col :lg="15" :xs="24" :sm="24" :md="15" class="background-color: rgb(255, 251, 251)">
        <div class="w-full h-120 map-part" style="background-color: rgb(255, 251, 251)">
          <maps />
        </div>
      </el-col>
      <el-col :lg="9" :xs="24" :sm="24" :md="9">
        <div class="w-full h-120 from-part" style="background-color: rgb(255, 251, 251)">
          <line-chart></line-chart>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt-2" justify="space-around">
      <el-col :lg="24" :md="24" :xs="24" :sm="24">
        <div class="w-full h-120 chart-part" style="background-color: rgb(255, 251, 251)">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mt-2" justify="space-around">
      <el-col :lg="12" :md="12" :xs="24" :sm="12">
        <div class="w-full h-120 chart-part" style="background-color: rgb(255, 251, 251)">
          <Scroll></Scroll>
        </div>
      </el-col>

      <el-col :lg="12" :md="12" :xs="24" :sm="12">
        <div class="w-full h-120 chart-part" style="background-color: rgb(255, 251, 251)">
          <pie-chart class="circle" :pieData="pieData"></pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import Scroll from '@/components/alert-scroll/scroll.vue';
import maps from '@/components/maps/maps.vue';
import { useStore } from 'vuex';
import pieChart from '@/components/charts/pie-chart.vue';
import lineChart from '@/components/charts/line-chart.vue';
import barChart from '@/components/charts/bar-chart.vue';
import { ElLoading } from 'element-plus';
import { getOnlineEvery } from '@/utils/request';

export default defineComponent({
  components: {
    lineChart,
    pieChart,
    Scroll,
    maps,
    barChart,
  },
  setup() {
    const store = useStore();
    const equipment = ref({});
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')) &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    const pieData = reactive([]);
    const loading = ref(null);
    const openFullScreen1 = () => {
      loading.value = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    };

    onMounted(() => {
      openFullScreen1();
      store.dispatch('alert/getAlertType', { userId }).then((res) => {
        Object.keys(res).forEach((i) => {
          const tempData = {
            name: store.getters.alertTypeText[i],
            value: res[i],
          };
          pieData.push(tempData);
        });
      });
      getOnlineEvery({ userId })
        .then((res) => {
          if (res.status === 200 && res.data.code === 200) {
            equipment.value = res.data.data;
            loading.value.close();
          }
        })
        .catch((error) => {
          console.log(error);
          loading.value.close();
        });
    });
    return {
      pieData,
      equipment,
    };
  },
});
</script>

<style scoped>
:deep() .el-header {
  padding: 0;
}

@media (max-width: 1199px) {
  .map-part {
    margin-bottom: 20px;
  }
  .form-part {
    margin-bottom: 20px;
  }
  .chart-part {
    margin-bottom: 20px;
  }
}
</style>
