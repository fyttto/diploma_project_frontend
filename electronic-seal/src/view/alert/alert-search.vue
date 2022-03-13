<template>
  <div class="my-2 py-6" style="background-color: rgb(248, 248, 248)">
    <el-row :gutter="20">
      <el-col :lg="5" :sm="5" :xs="12" class="ml-8">
        <el-select
          v-model="areaIdSelect"
          placeholder="请选择查询的区域"
          size="large"
          class="w-full"
          @change="getselectAreaId"
        >
          <el-option
            v-for="item in areaOptions"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>

      <el-col :lg="5" :sm="5" :xs="12" class="ml-8">
        <el-select v-model="yearSelect" placeholder="请选择查询的年份" size="large" class="w-full">
          <el-option
            v-for="item in yearOptions"
            :key="item.id"
            :label="item.id"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :lg="5" :sm="5" :xs="12" class="ml-8">
        <el-select v-model="monthSelect" placeholder="请选择查询的月份" size="large" class="w-full">
          <el-option
            v-for="item in monthOptions"
            :key="item.id"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :lg="2" :sm="2" :xs="12">
        <el-button round @click="searchArea" :loading="btnLoading">查询</el-button>
      </el-col>
      <!-- <el-col :lg="4" :sm="4" :xs="12" class="ml-8">
        <el-button type="primary" :icon="Document" :loading="downloadLoading">导出Elcel</el-button>
      </el-col> -->
    </el-row>
    <div>
      <div
        style="color: rgb(145, 196, 238); font-size: medium; margin-left: 40px; margin-top: 10px"
      >
        请选择需要查询的区域及日期,单独查询日期也可以哦~
      </div>
    </div>
    <el-row class="mt-3 flex justify-center">
      <el-col :span="23">
        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%"
          v-loading="tableLoading"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
        >
          <el-table-column prop="time" label="时间" sortable width="220" />
          <el-table-column prop="areaName" label="区域" width="200" />
          <el-table-column prop="mineName" label="所属煤矿" width="200" />
          <el-table-column prop="message" label="信息" width="250" />
          <el-table-column prop="statusColor" label="状态" width="120">
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <el-tag class="ml-2" :type="scope.row.statusColor" effect="dark">
                  {{ scope.row.statusText }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="等级" width="120">
            <template #default="scope">
              <div style="display: flex; align-items: center; justify-content: center">
                <el-tag class="ml-2" :type="scope.row.levelColor" effect="dark"
                  >{{ scope.row.level }}级警报</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="urls[0]" label="图片证据" width="125">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.urls[0]"
                  :initial-index="4"
                  :preview-src-list="scope.row.urls"
                  fit="cover"
                >
                </el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" width="150">
            <template #default="scope">
              <div class="flex justify-center">
                <el-button @click="editorAlert(scope)">编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="bottom-0 flex justify-center mt-4">
      <el-pagination
        :v-if="totalData.pageshow"
        :page-count="totalData.page"
        :current-page.sync="totalData.currentPage"
        background
        onUpdate:currentPage
        @current-change="currentChange"
        layout="prev, pager, next"
        hide-on-single-page
        :pager-count="7"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="报警信息修改" width="55%">
        <el-scrollbar max-height="400px">
          <div class="w-full flex justify-center">
            <el-form :ref="dialogForm" :model="dialogData.value" class="w-3/5 justify-center">
              <el-form-item label="区域">
                <el-input
                  v-model="dialogData.areaName"
                  :placeholder="dialogData.areaName"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="时间">
                <el-input
                  v-model="dialogData.time"
                  :placeholder="dialogData.time"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="所属煤矿">
                <el-input
                  v-model="dialogData.mineName"
                  :placeholder="dialogData.mineName"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select
                  v-model="dialogSelectStatusRes"
                  class="m-2"
                  :placeholder="dialogData.statusText"
                  size="large"
                  @change="getchangeStatus"
                >
                  <el-option
                    v-for="item in dialogSelectStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="等级">
                <el-select
                  v-model="dialogSelectLevelRes"
                  class="m-2"
                  :placeholder="`${dialogData.level}级`"
                  size="large"
                  @change="getchangeLevel"
                >
                  <el-option
                    v-for="item in dialogSelectLevel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="信息">
                <el-input
                  v-model="dialogSelectMessgaeRes"
                  :placeholder="dialogData.message"
                  :rows="2"
                  @blur="getChangeMessage"
                  type="textarea"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片证据">
                <div class="flex items-center">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="dialogData.urls[0]"
                    :initial-index="4"
                    :preview-src-list="dialogData.urls"
                    fit="cover"
                    class="mx-4"
                  >
                  </el-image>
                </div>
              </el-form-item>
              <div class="flex flex-nowrap items-center">
                <upload-images @deliverUrl="appendNewImg" />
              </div>
            </el-form>
          </div>
        </el-scrollbar>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmChange">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue';
import { getArea, getAlertTable, getAlertByTime, changeAlert } from '@/utils/request';
import { formatDateTimeForHMSS } from '@/utils/tools';
// import exportExcel from '@/utils/exportExcel';
import { resolveStatus, statusColor, levelColor, svg } from '@/utils/constant';
import { Document } from '@element-plus/icons-vue';
import { ElMessage, ElNotification } from 'element-plus';
import uploadImages from '@/components/upload-images/index.vue';
import _ from 'lodash';
// import XLSX from 'xlsx';
import router from '../../router';

export default defineComponent({
  components: { uploadImages },
  setup() {
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    // loading判断
    const tableLoading = ref(false);
    const btnLoading = ref(false);
    // 区域选择
    const areaIdSelect = ref('');
    const areaOptions = reactive([]);
    // 表格渲染
    const tableData = ref([]);
    // 分页器渲染
    const totalData = ref({
      page: 0,
      currentPage: 1,
      pageshow: false,
    });
    const yearSelect = ref('');
    const yearOptions = ref([
      {
        label: '2022年',
        value: '2022',
      },
      {
        label: '2021年',
        value: '2021',
      },
      {
        label: '2020年',
        value: '2020',
      },
      {
        label: '2019年',
        value: '2019',
      },
    ]);
    const monthSelect = ref('');
    const monthOptions = ref([
      {
        label: '1月',
        value: '1',
      },
      {
        label: '2月',
        value: '2',
      },
      {
        label: '3月',
        value: '3',
      },
      {
        label: '4月',
        value: '4',
      },
      {
        label: '5月',
        value: '5',
      },
      {
        label: '6月',
        value: '6',
      },
      {
        label: '7月',
        value: '7',
      },
      {
        label: '8月',
        value: '8',
      },
      {
        label: '9月',
        value: '9',
      },
      {
        label: '10月',
        value: '10',
      },
      {
        label: '11月',
        value: '11',
      },
      {
        label: '12月',
        value: '12',
      },
    ]);
    const getselectAreaId = () => {
      console.log(areaIdSelect.value);
    };
    // select-change绑定函数
    const showSelect = (val) => {
      console.log(val);
    };
    const dialogData = ref({});
    // 是否显示dialog
    const dialogVisible = ref(false);
    const dialogForm = ref(null);
    const dialogSelectMessgaeRes = ref('');
    const dialogSelectStatusRes = ref('');
    const dialogSelectStatus = ref([
      {
        label: '未解决',
        value: '0',
        // disabled: dialogData.value.statusText === this.value,
      },
      {
        label: '解决中',
        value: '1',
      },
      {
        label: '已解决',
        value: '2',
      },
    ]);
    const dialogSelectLevel = ref([
      {
        label: '0级',
        value: '0',
      },
      {
        label: '1级',
        value: '1',
      },
      {
        label: '2级',
        value: '2',
      },
      {
        label: '3级',
        value: '3',
      },
      {
        label: '4级',
        value: '4',
      },
    ]);
    const dialogSelectLevelRes = ref();
    // 编辑按钮
    const editorAlert = _.debounce((scope) => {
      dialogVisible.value = !dialogVisible.value;
      dialogData.value = scope.row;
    }, 1000);
    const changeForm = ref({
      alertId: '',
      level: '',
      locationId: '',
      msg: '',
      status: '',
      urls: [],
    });
    const downloadLoading = ref(false);

    const appendNewImg = (data) => {
      changeForm.value.urls.push(data);
    };
    const getchangeStatus = () => {
      changeForm.value.status = dialogSelectStatusRes.value;
    };
    const getchangeLevel = () => {
      changeForm.value.level = dialogSelectLevelRes.value;
    };
    const getChangeMessage = () => {
      changeForm.value.msg = dialogSelectMessgaeRes.value;
    };

    // 确认修改
    const confirmChange = () => {
      changeForm.value.alertId = dialogData.value.id;
      changeForm.value.locationId = dialogData.value.areaId;
      if (
        changeForm.value.level === '' &&
        changeForm.value.msg === '' &&
        changeForm.value.status === '' &&
        changeForm.value.urls.length === 0
      ) {
        ElMessage.info('信息未发生改变,无需修改');
      } else {
        if (changeForm.value.level === '') {
          changeForm.value.level = dialogData.value.level;
        }
        if (changeForm.value.msg === '') {
          changeForm.value.msg = dialogData.value.message;
        }
        if (changeForm.value.status === '') {
          changeForm.value.status = dialogData.value.status;
        }

        changeAlert(changeForm.value)
          .then((res) => {
            if (res.data.code === 200 && res.data.message === '成功' && res.data.success) {
              router.go(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    // 搜索按钮绑定函数
    const searchArea = _.throttle(async () => {
      if (areaIdSelect.value || yearSelect.value || monthSelect.value) {
        btnLoading.value = !btnLoading.value;
        await getAlertByTime({
          areaId: areaIdSelect.value,
          userId,
          limit: 10,
          page: 1,
          year: yearSelect.value,
          monthSelect: monthSelect.value,
        })
          .then((res) => {
            btnLoading.value = !btnLoading.value;
            if (res.status === 200 && res.data.code === 200 && res.data.success) {
              if (res.data.data) {
                tableData.value = res.data.data.items;
                ElMessage.success('查询成功');
                tableData.value.forEach((val) => {
                  if (val.status !== undefined && val.status !== null) {
                    val.statusColor = statusColor[val.status];
                    val.statusText = resolveStatus[val.status];
                  }
                  if (val.level !== undefined && val.level !== null) {
                    val.levelColor = levelColor[val.level];
                  }
                  if (res.data.data.mineName) {
                    val.mineName = res.data.data.mineName;
                  }
                  if (val.time) {
                    val.time = formatDateTimeForHMSS(val.time);
                  }
                });
              }
            }
          })
          .catch(() => {
            btnLoading.value = !btnLoading.value;
            ElMessage.error('查询过程中出现了错误,请稍后重试');
          });
      } else {
        ElMessage.info('请选择查询的区域、时间等信息');
      }
    }, 2000);
    // 分页器绑定函数
    const currentChange = async (val) => {
      window.scrollTo(0, 0);
      tableLoading.value = !tableLoading.value;
      totalData.value.pageshow = false;
      getAlertTable({ userId, limit: 10, page: val })
        .then((res) => {
          tableLoading.value = !tableLoading.value;
          totalData.value.pageshow = true;
          if (res.status === 200 && res.data.code === 200 && res.data.success) {
            const response = res.data.data;
            if (response) {
              const arr = response.items;
              for (let i = 0; i < arr.length; i += 1) {
                tableData.value.shift();
                tableData.value.push(arr[i]);
              }
              totalData.value.currentPage = response.current;
              totalData.value.page = response.pages;
              tableData.value.forEach((valTemp, index) => {
                if (valTemp.status !== undefined && valTemp.status !== null) {
                  valTemp.statusColor = statusColor[valTemp.status];
                  valTemp.statusText = resolveStatus[valTemp.status];
                }
                if (valTemp.level !== undefined && valTemp.level !== null) {
                  valTemp.levelColor = levelColor[valTemp.level];
                }
                valTemp.serialNumber = index;
                if (response.mineName) {
                  valTemp.mineName = response.mineName;
                }
                if (valTemp.time) {
                  valTemp.time = formatDateTimeForHMSS(valTemp.time);
                }
              });
            }
          }
        })
        .catch((error) => {
          tableLoading.value = !tableLoading.value;
          ElNotification({
            title: 'Error',
            message: error,
            type: 'error',
          });
        });
      await nextTick();
      totalData.value.currentPage = val;
      totalData.value.pageshow = true;
    };
    onMounted(() => {
      getArea({ userId }).then((res) => {
        if (res.status === 200 && res.data.code === 200 && res.data.success) {
          const arr = res.data.data.areaList;
          arr.forEach((val) => {
            const tempObj = {
              value: val.id,
              label: val.name,
              key: val.id,
            };
            areaOptions.push(tempObj);
          });
        } else {
          ElMessage.error('区域请求错误，请重试');
        }
      });
      tableLoading.value = !tableLoading.value;
      getAlertTable({ userId, limit: 10, page: 1 })
        .then((res) => {
          tableLoading.value = !tableLoading.value;
          totalData.value.pageshow = true;
          if (res.status === 200 && res.data.code === 200 && res.data.success) {
            const response = res.data.data;
            if (response) {
              const arr = response.items;
              for (let i = 0; i < arr.length; i += 1) {
                tableData.value.push(arr[i]);
              }
              totalData.value.currentPage = response.current;
              totalData.value.page = response.pages;
              tableData.value.forEach((val) => {
                if (val.status !== undefined && val.status !== null) {
                  val.statusColor = statusColor[val.status];
                  val.statusText = resolveStatus[val.status];
                }
                if (val.level !== undefined && val.level !== null) {
                  val.levelColor = levelColor[val.level];
                }
                if (response.mineName) {
                  val.mineName = response.mineName;
                }
                if (val.time) {
                  val.time = formatDateTimeForHMSS(val.time);
                }
              });
            }
          }
        })
        .catch((error) => {
          tableLoading.value = !tableLoading.value;
          ElNotification({
            title: 'Error',
            message: error,
            type: 'error',
          });
        });
    });

    return {
      Document,
      svg,
      areaOptions,
      areaIdSelect,
      yearSelect,
      monthSelect,
      tableData,
      totalData,
      tableLoading,
      btnLoading,
      dialogVisible,
      dialogData,
      dialogForm,
      dialogSelectStatus,
      dialogSelectStatusRes,
      dialogSelectLevel,
      dialogSelectLevelRes,
      yearOptions,
      monthOptions,
      appendNewImg,
      currentChange,
      showSelect,
      getChangeMessage,
      confirmChange,
      getchangeStatus,
      getchangeLevel,
      getselectAreaId,
      dialogSelectMessgaeRes,
      editorAlert,
      searchArea,
      resolveStatus,
      downloadLoading,
    };
  },
});
</script>

<style scoped>
:deep() .el-table .el-table__cell {
  text-align: center;
}
:deep() .el-form-item__label {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
