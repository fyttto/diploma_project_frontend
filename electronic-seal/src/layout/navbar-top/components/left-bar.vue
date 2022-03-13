<template>
  <div class="w-auto flex items-center" style="height: 50px">
    <div class="w-12 h-full flex justify-center items-center" @click="changeMenu">
      <el-icon v-if="collaspe" :size="30"><Expand /></el-icon>
      <el-icon :size="30" style="vertical-align: middle" v-else><Fold /></el-icon>
    </div>
    <el-breadcrumb separator="/" class="ml-3">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeUnmount } from 'vue';
import { Expand, Fold } from '@element-plus/icons-vue';
import Bus from '../../bus';

export default defineComponent({
  components: {
    Expand,
    Fold,
  },
  setup() {
    const collaspe = ref(true);
    const changeMenu = () => {
      collaspe.value = !collaspe.value;
      Bus.$emit('change-menu');
    };
    onBeforeUnmount(() => {
      Bus.$off('change-menu');
    });

    return {
      collaspe,
      changeMenu,
    };
  },
});
</script>

<style>
:deep() .el-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
