<template>
  <el-dropdown :hide-on-click="false" class="mr-7">
    <span class="el-dropdown-link">
      <el-avatar shape="square" :src="avater" :alt="name"></el-avatar>
      <el-icon class="el-icon--right"> <ArrowDown /> </el-icon
    ></span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>首页</el-dropdown-item>
        <el-dropdown-item @click="toHomePage()">个人中心</el-dropdown-item>
        <el-dropdown-item :divided="true" @click="logOut"> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    ArrowDown,
  },
  props: ['avater', 'name'],
  setup() {
    const store = useStore();
    const router = useRouter();
    const toHomePage = () => {
      router.push('/personal');
    };
    const logOut = () => {
      store.dispatch('user/logout');
    };
    return {
      toHomePage,
      logOut,
    };
  },
});
</script>

<style></style>
