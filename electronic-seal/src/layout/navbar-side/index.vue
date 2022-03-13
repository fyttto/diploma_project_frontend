<template v-once>
  <el-menu
    :default-active="options[0].path"
    :collapse="isCollapse"
    mode="vertical"
    :collapse-transition="true"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    router
  >
    <div class="w-full h-14 flex justify-center items-center" @click="refresh">
      <img src="@img/logo/baokemeng.png" alt="" class="w-8 h-8" />
    </div>
    <el-menu-item index="dashboard">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>

    <el-sub-menu index="1">
      <template #title>
        <el-icon><Search /></el-icon>
        <span>查询</span>
      </template>
      <el-menu-item index="search">
        <el-icon><WarningFilled /></el-icon>
        <span>报警查询</span>
      </el-menu-item>
      <el-menu-item index="detail">
        <el-icon><VideoCameraFilled /></el-icon>
        <span>报警详情</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="manage-person">
      <el-icon><Stamp /></el-icon>
      <template #title>人员管理</template>
    </el-menu-item>
    <el-menu-item index="manage-vehicle">
      <el-icon><Van /></el-icon>
      <template #title>设备管理</template>
    </el-menu-item>
    <el-menu-item index="personal">
      <el-icon><Avatar /></el-icon>
      <template #title>个人中心</template>
    </el-menu-item>
    <el-menu-item index="test1">
      <el-icon><QuestionFilled /></el-icon>
      <template #title>关于</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import logoImg from '@img/logo/baokemeng.png';
import { useRouter } from 'vue-router';
import {
  House,
  Search,
  WarningFilled,
  Stamp,
  Van,
  Avatar,
  QuestionFilled,
  VideoCameraFilled,
} from '@element-plus/icons-vue';
import Bus from '../bus';

export default defineComponent({
  props: ['options', 'collapse'],
  components: {
    QuestionFilled,
    Stamp,
    House,
    Search,

    WarningFilled,
    Van,
    Avatar,
    VideoCameraFilled,
  },
  setup() {
    const isCollapse = ref(true);
    const router = useRouter();
    const refresh = () => {
      router.go(0);
    };
    onMounted(() => {
      Bus.$on('change-menu', () => {
        isCollapse.value = !isCollapse.value;
      });
    });
    return {
      isCollapse,
      logoImg,
      refresh,
    };
  },
});
</script>

<style lang="scss"></style>
