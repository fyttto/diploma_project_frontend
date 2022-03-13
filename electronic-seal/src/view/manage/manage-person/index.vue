<template>
  <div class="min-h-screen">
    <el-row class="flex justify-center">
      <el-col :span="10">
        <el-input
          v-model="personName"
          placeholder="请输入查询的工作人员姓名"
          class="input-with-select mb-4"
          @change="searchPeople"
        >
          <template #append>
            <el-button :icon="Search" @click="searchPeople"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="flex justify-center">
      <el-col :span="24">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column prop="id" label="编号" width="100" />
          <el-table-column prop="identifier" sortable label="工号" width="130" />
          <el-table-column prop="name" label="姓名" width="150" />
          <el-table-column prop="company" label="公司" width="100" />
          <el-table-column prop="position" label="职位" width="100" />
          <el-table-column prop="location" label="当前办公地" width="200" />
          <el-table-column prop="startUpTime" label="上次打卡时间" width="250" />
          <el-table-column prop="endTime" label="本次打卡时间" width="250" />
          <el-table-column prop="health" label="健康情况" width="133" />
        </el-table>
      </el-col>
      <div class="bottom-0 flex justify-center mt-4 w-4/6 h-3.5">
        <el-pagination
          :v-if="totalData.pageshow"
          :page-count="totalData.page"
          :current-page.sync="totalData.currentPage"
          background
          onUpdate:currentPage
          @current-change="currentChange(val)"
          layout="prev, pager, next"
          :pager-count="7"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { getWorkerInfo, searchWorkerInfo } from '@/utils/request';
import { formatDateTimeForHMSS } from '@/utils/tools';
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElPagination } from 'element-plus';
import _ from 'lodash';

export default defineComponent({
  components: {
    ElPagination,
  },
  setup() {
    const tableData = ref([]);
    const personName = ref('');
    const totalData = ref({
      page: 0,
      currentPage: 1,
      pageshow: false,
    });
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    const tableLoading = ref(false);
    const searchPeople = _.debounce(() => {
      if (personName.value) {
        searchWorkerInfo({ limit: 10, name: personName.value, page: 1, userId })
          .then((res) => {
            if (res.status === 200 && res.data.code === 200 && res.data.success) {
              if (res.data.data.items && res.data.data.items.length !== 0) {
                tableData.value = res.data.data.items;
                tableData.value = tableData.value.map((val) => {
                  val.startUpTime = formatDateTimeForHMSS(val.startUpTime);
                  val.endTime = formatDateTimeForHMSS(val.endTime);
                  val.health = val.health === 1 ? '健康' : '其他';
                  return val;
                });
                ElMessage.success('查询成功');
              } else {
                ElMessage.error('未查询到相关信息');
              }
            }
          })
          .catch((error) => {
            ElMessage.error(error);
          });
      } else {
        ElMessage({
          type: 'info',
          message: '请输入查询的工作人员姓名',
        });
        getWorkerInfo({ limit: 20, page: 1, userId })
          .then((res) => {
            if (res.data.code === 200) {
              tableData.value = res.data.data.items;
            }
            tableData.value = tableData.value.map((val) => {
              val.startUpTime = formatDateTimeForHMSS(val.startUpTime);
              val.endTime = formatDateTimeForHMSS(val.endTime);
              val.health = val.health === 1 ? '健康' : '其他';
              return val;
            });
          })
          .catch((error) => {
            ElMessage.error('网络错误，请稍后重试');
            console.log(error);
          });
      }
    }, 2000);
    const currentChange = (page) => {
      totalData.value.pageshow = false;
      getWorkerInfo({ limit: 10, page, userId })
        .then((res) => {
          if (res.data.code === 200) {
            totalData.value.pageshow = true;
            tableData.value = res.data.data.items;
            totalData.value.currentPage = res.data.data.current;
            totalData.value.page = res.data.data.pages;
          }
          tableData.value = tableData.value.map((val) => {
            val.startUpTime = formatDateTimeForHMSS(val.startUpTime);
            val.endTime = formatDateTimeForHMSS(val.endTime);
            val.health = val.health === 1 ? '健康' : '其他';
            return val;
          });
        })
        .catch((error) => {
          ElMessage.error('网络错误，请稍后重试');
          console.log(error);
        });
    };
    onMounted(() => {
      getWorkerInfo({ limit: 20, page: 1, userId })
        .then((res) => {
          if (res.data.code === 200) {
            tableData.value = res.data.data.items;
            totalData.value.currentPage = res.data.data.current;
            totalData.value.page = res.data.data.pages;
          }
          tableData.value = tableData.value.map((val) => {
            val.startUpTime = formatDateTimeForHMSS(val.startUpTime);
            val.endTime = formatDateTimeForHMSS(val.endTime);
            val.health = val.health === 1 ? '健康' : '其他';
            return val;
          });
        })
        .catch((error) => {
          ElMessage.error('网络错误，请稍后重试');
          console.log(error);
        });
    });
    return { totalData, tableData, Search, personName, tableLoading, searchPeople, currentChange };
  },
});
</script>

<style lang="scss" scoped>
:deep() .el-table .el-table__cell {
  text-align: center;
}
:deep() .el-form-item__label {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
