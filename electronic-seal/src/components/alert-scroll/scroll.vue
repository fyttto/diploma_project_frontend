<template>
  <div
    class="mainbox"
    v-if="showScroll"
    v-loading.lock="loading"
    :element-loading-svg="svg"
    :data="allData"
    element-loading-svg-view-box="-10, -10, 50, 50"
    style="width: 100%"
  >
    <div class="even-tab">
      <ul class="even-tab-bt">
        <li>区域</li>
        <li>时间</li>
        <li>信息</li>
        <li>状态</li>
        <li>等级</li>
      </ul>
      <div style="width: 100%; height: 20px"></div>
      <!--表中同学信息-->
      <div id="new_txscroll">
        <div class="new-overa">
          <ul
            class="even-tab-nr"
            v-for="(item, index) in allData"
            :key="index"
            @click="jumpDetail(item.id)"
          >
            <el-popover
              placement="top-start"
              title="报警详情   （点击下方表格任意位置 查看详情）"
              :width="400"
              trigger="hover"
              transition="el-fade-in-linear"
            >
              <template #reference>
                <div class="popper-box">
                  <li>{{ item.areaName }}</li>
                  <li class="timeBox">{{ item.time }}</li>
                  <li class="messageBox">{{ item.message }}</li>
                  <li class="statusBox">
                    <el-tag :type="statusColor[item.status]">
                      {{ resolveStatus[item.status] }}</el-tag
                    >
                  </li>
                  <li class="levelBox">
                    <el-tag :type="levelColor[item.level]"> {{ item.level }}级报警</el-tag>
                  </li>
                </div>
              </template>
              <el-table :data="[item]" :key="index" @click="jumpDetail(item.id)">
                <el-table-column width="100" property="areaName" label="区域"></el-table-column>
                <el-table-column width="200" property="time" label="时间"></el-table-column>
                <el-table-column width="200" property="message" label="信息"></el-table-column>
                <el-table-column width="50" property="status" label="状态"></el-table-column>
                <el-table-column width="50" property="level" label="等级"></el-table-column>
              </el-table>
            </el-popover>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getAlertDetail } from '@/utils/request';
import { statusColor, levelColor, resolveStatus } from '@/utils/constant';

export default {
  setup() {
    const showScroll = ref(false);
    const store = useStore();
    const router = useRouter();
    const allData = reactive([]);
    const parma = {
      userId:
        JSON.parse(window.localStorage.getItem('userInfo')).id &&
        JSON.parse(window.localStorage.getItem('userInfo')).id,
      limit: 15,
      page: 0,
    };

    const loading = ref(false);
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
    // 设置滚动特效
    function scrollNews(obj) {
      const $self = obj.find('.new-overa');
      const lineHeight = $self.find('ul:first').height();
      $self.animate(
        {
          // "scrollTop": -lineHeight + "px"
          marginTop: `${-lineHeight + -8}px`,
        },
        1500,
        () => {
          $self
            .css({
              marginTop: 0,
            })
            .find('ul:first')
            .appendTo($self); // 将滚出去的在给添加到列表的尾部实现无限循环滚动
        },
      );
    }
    const jumpDetail = (val) => {
      getAlertDetail({ id: val });
      router.push({ path: '/detail', name: 'detail', params: { alertId: val } });
    };

    // eslint-disable-next-line no-undef
    onMounted(() => {
      loading.value = true;
      store
        .dispatch('alert/getAlertList', parma)
        .then(() => {
          const arr = store.getters.alertList;
          loading.value = false;
          showScroll.value = !showScroll.value;
          arr.forEach((value) => {
            allData.push(value);
          });
          console.log(statusColor[allData[0].status]);
        })
        .catch((err) => {
          loading.value = false;

          showScroll.value = !showScroll.value;
          console.log(err);
        });
      // eslint-disable-next-line no-undef
      const $this = $('#new_txscroll');
      let scrollTimer;
      // 设置鼠标移入清楚定时器,移出时恢复滚动
      $this
        .hover(
          () => {
            clearInterval(scrollTimer);
          },
          () => {
            scrollTimer = setInterval(() => {
              scrollNews($this);
            }, 1500);
          },
        )
        .trigger('mouseleave');
    });
    return {
      scrollNews,
      allData,
      jumpDetail,
      showScroll,
      loading,
      svg,
      statusColor,
      levelColor,
      resolveStatus,
    };
  },
};
</script>

<style scoped lang="scss">
.mainbox .even-tab .even-tab-bt {
  width: 100%;
  line-height: 40px;
  background: #84cbf5;
  text-align: center;
  display: flex;
  display: -webkit-flex;
}
.popper-box {
  width: 100%;
  line-height: 40px;
  // background: #84cbf5;
  text-align: center;
  display: flex;
}
.mainbox .even-tab .even-tab-bt li {
  width: 20%;
  height: 40px;
  line-height: 40px;
  // background: #84cbf5;
  font-size: 16px;
  color: #f5f0f0;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
}
.mainbox .even-tab .even-tab-nr {
  width: 100%;
  line-height: 40px;
  text-align: center;
  display: flex;
  display: -webkit-flex;
  margin-bottom: 8px;
}
.mainbox .even-tab .even-tab-nr li {
  width: 20%;
  line-height: 40px;
  font-size: 10px;
  color: #000000;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.mainbox .even-tab .even-tab-nr :nth-child(3) {
  margin-left: 10px;
}
/* .mainbox .even-tab .even-tab-nr .bt-sj {
  background: #3979d9;
} */

.mainbox .even-tab h2 {
  height: 0.6rem;
  color: rgb(228, 227, 227);
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
  font-weight: 400;
}
.mainbox .even-tab h2 a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.125rem;
}

.mainbox .new-overa {
  box-sizing: border-box;
  width: 100%;
  /*高度要比他父级的高,这样看不到添加ul时的效果,只看到滚动效果*/
  height: 700px;
  overflow: hidden;
}
.mainbox #new_txscroll {
  height: 400px;
  overflow: hidden;
}
</style>
