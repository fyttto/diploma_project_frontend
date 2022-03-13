<template>
  <div class="min-h-full">
    <el-row :gutter="20">
      <el-col :lg="10" :md="12">
        <div class="w-full h-full from-part p-4" style="background-color: rgb(255, 251, 251)">
          <el-descriptions title="用户信息" direction="vertical" :column="4" border>
            <el-descriptions-item label-align="center" align="center" label="用户名" :span="2">
              {{ userInfo.nickname }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" align="center" label="头像" :span="2">
              <el-avatar :size="75" :src="userInfo.icon"></el-avatar>
              <el-upload :action="avaterUrl" multiple :limit="3" :on-success="changeAvater">
                <el-button type="primary">更换头像</el-button>
              </el-upload>
            </el-descriptions-item>
            <el-descriptions-item label-align="center" align="center" label="电话号码" :span="2">
              {{ userInfo.phoneNumber }}
            </el-descriptions-item>
            <el-descriptions-item label-align="center" align="center" label="职位" :span="1">
              {{ userInfo.role }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
      <el-col :lg="14" :md="12">
        <div class="w-full h-full from-part p-4" style="background-color: rgb(255, 251, 251)">
          <el-carousel v-loading="loading" type="card">
            <el-carousel-item v-for="item in fourTable" :key="item" initial-index="2" loop>
              <el-image fit="contain" :src="item" class="w-full h-full"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row class="mt-3">
      <el-col :span="24">
        <div class="w-full h-full from-part p-4" style="background-color: rgb(255, 251, 251)">
          <el-descriptions title="名下矿井信息" direction="vertical" :column="4" border>
            <el-descriptions-item label="矿井名称" :span="2" label-align="center" align="center">
              {{ mineInfo.mineName }}
            </el-descriptions-item>
            <el-descriptions-item label="矿井地点" :span="2" label-align="center" align="center">
              {{ mineInfo.minePlace }}
            </el-descriptions-item>
            <el-descriptions-item
              label="矿井面积（㎡）"
              :span="1"
              label-align="center"
              align="center"
            >
              <el-tag size="small" color="#f0f2f5" type="warning"> {{ mineInfo.mineSize }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="车辆数目" :span="1" label-align="center" align="center">
              <el-tag size="small" color="#f0f2f5">{{ mineInfo.vehicleNum }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="设备数目" :span="1" label-align="center" align="center">
              <el-tag size="small" color="#f0f2f5">{{ mineInfo.equipmentNum }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="工人人数" :span="1" label-align="center" align="center">
              <el-tag size="small" color="#f0f2f5">{{ mineInfo.workerNum }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item
              label="矿井区域列表"
              :span="4"
              label-align="center"
              align="center"
            >
              <el-collapse v-model="showCollapse">
                <el-collapse-item title="矿井区域列表" name="areaList">
                  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <li v-for="i in areaList" :key="i" class="infinite-list-item">{{ i }}</li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { getAlertDetail, getAlertList } from '@/utils/request';

export default defineComponent({
  setup() {
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    const userInfo = ref({});
    const mineInfo = ref({});
    const store = useStore();
    const areaList = ref({});
    const loading = ref(true);
    const count = ref(0);
    const showCollapse = ref('areaList');
    const avaterUrl = ref(`/api/user/uploadAvatar/\${userId}?userId=${userId}`);
    const changeAvater = (res) => {
      console.log(res);
      if (res.code !== 200) {
        ElMessage.error(res.message);
      }
    };
    const fourTable = ref([]);
    const load = () => {
      count.value += 2;
    };
    onMounted(() => {
      store.dispatch('user/getInfo', { userId }).then((res) => {
        if (res.code === 200 && res.success) {
          mineInfo.value = res.data.information;
          areaList.value = Object.keys(mineInfo.value.areaList).map(
            (val) => mineInfo.value.areaList[val],
          );
        }
      });
      userInfo.value = store.state.user.otherInfo
        ? JSON.parse(window.localStorage.getItem('userInfo'))
        : store.state.user.otherInfo;
      getAlertList({ userId, limit: 4, page: 1 })
        .then((res) => {
          fourTable.value = [];
          if (res.status === 200 && res.data.code === 200) {
            if (res.data.data.items) {
              res.data.data.items.forEach((val) => {
                getAlertDetail({ id: val.id })
                  .then((response) => {
                    if (res.status === 200 && res.data.code === 200) {
                      if (Array.isArray(response.data.data.alert.urls)) {
                        response.data.data.alert.urls.forEach((value) => {
                          fourTable.value.push(value);
                        });
                      } else {
                        fourTable.value.push(response.data.data.alert.urls);
                      }
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                loading.value = false;
              });
            }
          }
        })
        .catch((error) => {
          ElMessage.error('请求失败', error);
        });
    });
    return {
      userInfo,
      mineInfo,
      showCollapse,
      fourTable,
      loading,
      load,
      areaList,
      avaterUrl,
      changeAvater,
    };
  },
});
</script>

<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
