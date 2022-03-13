<template>
  <div class="errPage-container">
    <el-button :icon="ArrowLeft" type="primary">
      <a href="/" class="bullshit__return-home">返回主页</a>
    </el-button>
    <el-row class="flex items-center">
      <el-col :span="12" class="my-10">
        <h1>你没有权限访问该页面</h1>
        <h6>如有不满，请联系管理员</h6>
      </el-col>
      <el-col :span="12">
        <img
          src="@/assets/error/401.gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ArrowLeft } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      ArrowLeft,
    };
  },
});
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #05bfc5;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
}
</style>
