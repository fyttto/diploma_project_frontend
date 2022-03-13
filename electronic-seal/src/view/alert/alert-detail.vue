<template>
  <div class="w-full min-h-full">
    <div v-if="singleShow">
      <el-row justify="center">
        <el-col :span="20">
          <videoPlay v-if="videoVision" v-bind="optionsSingle" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-descriptions
            :title="`报警编号${showTable.id}`"
            direction="vertical"
            :column="4"
            border
          >
            <el-descriptions-item label="报警区域" :span="2">{{
              showTable.areaName
            }}</el-descriptions-item>
            <el-descriptions-item label="报警信息" :span="2">{{
              showTable.message
            }}</el-descriptions-item>
            <el-descriptions-item label="状态" :span="2">
              <el-tag size="small" :type="showTable.statusColor">{{ showTable.statusText }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="等级" :span="2">
              <el-tag size="small" :type="showTable.levelColor">{{ showTable.level }}级报警</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="时间">{{ showTable.time }} </el-descriptions-item>
            <el-descriptions-item label="报警类型" :span="4"
              >{{ alertType[showTable.type] }}
            </el-descriptions-item>
            <el-descriptions-item label="负责人" :span="2"
              >{{ showTable.personnel }}
            </el-descriptions-item>

            <el-descriptions-item label="图片证据" :span="2">
              <el-image
                style="width: 100px; height: 100px"
                v-if="showPic"
                :src="showTable.urls[0]"
                :initial-index="4"
                :preview-src-list="showTable.urls"
                fit="cover"
                class="mx-4"
              >
              </el-image>
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="30" v-else>
      <el-col :md="12" :lg="8">
        <div>
          <div class="flex justify-center">
            <videoPlay v-if="videoVision" v-bind="optionThreeShow" :src="videoFromSrc[0]" />
          </div>
          <div class="mt-6" v-if="threeTable[0]">
            <div>
              <el-descriptions
                :title="`报警编号：${threeTable[0].id}`"
                direction="vertical"
                :column="6"
                border
              >
                <el-descriptions-item
                  label="报警区域"
                  align="center"
                  label-align="center"
                  :span="4"
                >
                  {{ threeTable[0].areaName }}
                </el-descriptions-item>
                <el-descriptions-item label="状态" :span="2" align="center" label-align="center">
                  <el-tag size="small" :type="threeTable[0].statusColor">
                    {{ threeTable[0].statusText }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                  label="报警信息"
                  :span="6"
                  align="center"
                  label-align="center"
                >
                  {{ threeTable[0].message }}
                </el-descriptions-item>

                <el-descriptions-item label="等级" align="center" label-align="center" :span="2">
                  <el-tag size="small" :type="threeTable[0].levelColor">
                    {{ threeTable[0].level }}级报警
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="时间" align="center" label-align="center" :span="4">
                  {{ threeTable[0].time }}
                </el-descriptions-item>
                <el-descriptions-item label="负责人" align="center" label-align="center" :span="2"
                  >{{ threeTable[0].personnel }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="图片证据"
                  align="center"
                  label-align="center"
                  :span="4"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    v-if="showPic"
                    :src="threeTable[0].urls[0]"
                    :initial-index="4"
                    :preview-src-list="threeTable[0].urls"
                    fit="cover"
                    class="mx-4"
                  >
                  </el-image>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="12" :lg="8">
        <div>
          <div class="flex justify-center">
            <videoPlay v-if="videoVision" v-bind="optionThreeShow" :src="videoFromSrc[1]" />
          </div>
          <div class="mt-6" v-if="threeTable[1]">
            <div>
              <el-descriptions
                :title="`报警编号：${threeTable[1].id}`"
                direction="vertical"
                :column="6"
                border
              >
                <el-descriptions-item
                  label="报警区域"
                  align="center"
                  label-align="center"
                  :span="4"
                >
                  {{ threeTable[1].areaName }}
                </el-descriptions-item>
                <el-descriptions-item label="状态" align="center" label-align="center" :span="2">
                  <el-tag size="small" :type="threeTable[1].statusColor">
                    {{ threeTable[1].statusText }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                  label="报警信息"
                  :span="6"
                  align="center"
                  label-align="center"
                >
                  {{ threeTable[1].message }}
                </el-descriptions-item>

                <el-descriptions-item label="等级" align="center" label-align="center" :span="2">
                  <el-tag size="small" :type="threeTable[1].levelColor">
                    {{ threeTable[1].level }}级报警
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="时间" align="center" label-align="center" :span="4"
                  >{{ threeTable[1].time }}
                </el-descriptions-item>
                <el-descriptions-item label="负责人" align="center" label-align="center" :span="2"
                  >{{ threeTable[1].personnel }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="图片证据"
                  align="center"
                  label-align="center"
                  :span="2"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    v-if="showPic"
                    :src="threeTable[1].urls[0]"
                    :initial-index="4"
                    :preview-src-list="threeTable[1].urls"
                    fit="cover"
                    class="mx-4"
                  >
                  </el-image>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="8">
        <div>
          <div class="flex justify-center">
            <videoPlay v-if="videoVision" v-bind="optionThreeShow" :src="videoFromSrc[2]" />
          </div>
          <div class="mt-6" v-if="threeTable[2]">
            <div>
              <el-descriptions
                :title="`报警编号：${threeTable[2].id}`"
                direction="vertical"
                :column="6"
                border
              >
                <el-descriptions-item
                  label="报警区域"
                  align="center"
                  label-align="center"
                  :span="4"
                >
                  {{ threeTable[2].areaName }}
                </el-descriptions-item>
                <el-descriptions-item label="状态" :span="2" align="center" label-align="center">
                  <el-tag size="small" :type="threeTable[2].statusColor">
                    {{ threeTable[2].statusText }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item
                  label="报警信息"
                  :span="6"
                  align="center"
                  label-align="center"
                >
                  {{ threeTable[2].message }}
                </el-descriptions-item>

                <el-descriptions-item label="等级" :span="2" align="center" label-align="center">
                  <el-tag size="small" :type="threeTable[2].levelColor">
                    {{ threeTable[2].level }}级报警
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="时间" :span="4" align="center" label-align="center"
                  >{{ threeTable[2].time }}
                </el-descriptions-item>
                <el-descriptions-item label="负责人" align="center" label-align="center"
                  >{{ threeTable[2].personnel }}
                </el-descriptions-item>
                <el-descriptions-item
                  label="图片证据"
                  :span="1"
                  align="center"
                  label-align="center"
                >
                  <el-image
                    style="width: 100px; height: 100px"
                    v-if="showPic"
                    :src="threeTable[2].urls[0]"
                    :initial-index="4"
                    :preview-src-list="threeTable[2].urls"
                    fit="cover"
                    class="mx-4"
                  >
                  </el-image>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, ref } from 'vue';
import 'vue3-video-play/dist/style.css';
import { videoPlay } from 'vue3-video-play';
import { getAlertDetail, getAlertList } from '@/utils/request';
import { formatDateTimeForHMSS } from '@/utils/tools';
import { resolveStatus, statusColor, levelColor } from '@/utils/constant';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    videoPlay,
  },
  setup() {
    const store = useStore();
    const showPic = ref(false);
    const videoVision = ref(false);
    const showTable = ref({});
    const route = useRoute();
    const singleShow = ref(false);
    const videoFromSrc = ref([]);
    const threeTable = ref([]);
    const userId =
      JSON.parse(window.localStorage.getItem('userInfo')).id &&
      JSON.parse(window.localStorage.getItem('userInfo')).id;
    const alertType = reactive(store.getters.alertTypeText);
    const optionThreeShow = reactive({
      width: '400px', // 播放器高度
      height: '300px', // 播放器高度
      color: '#409eff', // 主题色
      title: '报警详情', // 视频名称
      // src: '', // 视频源
      muted: false, // 静音
      webFullScreen: false,
      speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], // 播放倍速
      autoPlay: true, // 自动播放
      loop: false, // 循环播放
      mirror: false, // 镜像画面
      ligthOff: false, // 关灯模式
      volume: 0.5, // 默认音量大小
      control: true, // 是否显示控制器
    });
    const optionsSingle = reactive({
      width: '100%', // 播放器高度
      height: '100%', // 播放器高度
      color: '#409eff', // 主题色
      title: '报警详情', // 视频名称
      src: '', // 视频源
      muted: false, // 静音
      webFullScreen: false,
      speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], // 播放倍速
      autoPlay: false, // 自动播放
      loop: false, // 循环播放
      mirror: false, // 镜像画面
      ligthOff: false, // 关灯模式
      volume: 0.5, // 默认音量大小
      control: true, // 是否显示控制器
    });
    onMounted(() => {
      console.log(alertType);
      singleShow.value = route.params.alertId !== '' && route.params.alertId !== undefined;
      if (singleShow.value) {
        const getAlertDetailId = route.params.alertId;

        getAlertDetail({ id: getAlertDetailId }).then((res) => {
          if (res.status === 200 && res.data.code === 200) {
            if (res.data.data.alert) {
              optionsSingle.src = res.data.data.alert.video;
              videoVision.value = !videoVision.value;
              showTable.value = res.data.data.alert;
              showTable.value.time = formatDateTimeForHMSS(showTable.value.time);
              showTable.value.statusColor = statusColor[showTable.value.status];
              showTable.value.statusText = resolveStatus[showTable.value.status];
              showTable.value.levelColor = levelColor[showTable.value.level];
              showPic.value = !showPic.value;
            }
          }
        });
      } else {
        getAlertList({ userId, limit: 3, page: 1 })
          .then((res) => {
            threeTable.value = [];
            if (res.status === 200 && res.data.code === 200) {
              if (res.data.data.items) {
                res.data.data.items.forEach((val) => {
                  getAlertDetail({ id: val.id })
                    .then((response) => {
                      if (res.status === 200 && res.data.code === 200) {
                        videoFromSrc.value.push(response.data.data.alert.video);
                        if (videoFromSrc.value.length === 3) {
                          videoVision.value = !videoVision.value;
                        }
                        threeTable.value.push(response.data.data.alert);
                        if (threeTable.value.length === 3) {
                          threeTable.value = threeTable.value.map((value) => {
                            value.statusColor = statusColor[value.status];
                            value.statusText = resolveStatus[value.status];
                            value.levelColor = levelColor[value.level];
                            value.time = formatDateTimeForHMSS(value.time);
                            showPic.value = !showPic.value;
                            return value;
                          });
                        }
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              }
            }
          })
          .catch((error) => {
            ElMessage.error('请求失败', error);
          });
      }
    });
    return {
      optionsSingle,
      videoVision,
      showTable,
      showPic,
      threeTable,
      singleShow,
      videoFromSrc,
      optionThreeShow,
      alertType,
    };
  },
});
</script>
