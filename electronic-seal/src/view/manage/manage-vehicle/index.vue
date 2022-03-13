<template>
  <div>
    <el-row class="mt-3 flex justify-center">
      <el-col :span="23">
        <el-table :data="tableData" :border="true" style="width: 100%">
          <el-table-column prop="id" label="编号" />
          <el-table-column prop="identifier" label="车牌号" />
          <el-table-column prop="isOnline" label="是否联网" />
          <el-table-column prop="mineName" label="所属煤矿" />
          <el-table-column prop="areaName" label="当前所在地" />
          <el-table-column prop="status" label="使用状态" />
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
import { defineComponent, ref, onMounted } from 'vue';
import { getAllVehicleInfo } from '@/utils/request';

export default defineComponent({
  setup() {
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    const tableData = ref([]);
    const totalData = ref({
      page: 0,
      currentPage: 1,
      pageshow: false,
    });
    const currentChange = (val) => {
      console.log(val);
    };
    onMounted(() => {
      getAllVehicleInfo({ limit: 10, page: 1, userId }).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 200 && res.data.success) {
          tableData.value = res.data.data.items;
          tableData.value = tableData.value.map((val) => {
            val.isOnline = val.isOnline === 1 ? '是' : '否';
            val.status = val.status === 1 ? '是' : '否';

            return val;
          });
        }
      });
    });
    return { tableData, totalData, currentChange };
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
