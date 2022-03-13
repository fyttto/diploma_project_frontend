<template>
  <div class="p-0 m-0 w-full min-h-screen">
    <el-container class="w-full h-full min-h-screen">
      <el-aside width="full">
        <navbar-side :options="createSideBar()" class="w-48 h-full"></navbar-side>
      </el-aside>
      <el-container class="w-full h-full">
        <el-header height="50px">
          <navbar-top :avater="avater" :name="minerName"></navbar-top>
        </el-header>
        <el-main style="background-color: #f0f2f5; width: auto">
          <router-view v-slot="{ Component }">
            <transition>
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import navbarTop from '@/layout/navbar-top/index.vue';
import navbarSide from '@/layout/navbar-side/index.vue';
import createSideBar from '@/utils/createSideBar';
import { useStore } from 'vuex';

export default defineComponent({
  components: { navbarTop, navbarSide },
  setup() {
    const store = useStore();

    const avater =
      JSON.parse(window.localStorage.getItem('userInfo')).icon &&
      JSON.parse(window.localStorage.getItem('userInfo')).icon.length !== 0
        ? JSON.parse(window.localStorage.getItem('userInfo')).icon
        : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80';
    const minerName = store.state.user.otherInfo ? store.state.user.otherInfo.name : '显示错误';
    return {
      createSideBar,
      avater,
      minerName,
    };
  },
});
</script>

<style scoped>
:deep() .el-header {
  padding: 0;
}
</style>
