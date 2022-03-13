<template>
  <el-upload
    ref="upLoadRef"
    :action="ImgUrl"
    list-type="picture"
    method="post"
    :auto-upload="true"
    :on-success="onSuccess"
    :on-error="onError"
    show-file-list
    class="upload-demo"
    :limit="5"
  >
    <el-button type="primary">新增图片证据</el-button>
    <template #tip>
      <div class="el-upload__tip">最多不超过五张照片</div>
    </template>
  </el-upload>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
  setup(props, context) {
    const ImgUrl = '/api/oss/uploadOssFile';
    const upLoadRef = ref(null);
    const onSuccess = (res, file) => {
      if (res.code === 200 && res.message === '成功' && res.success) {
        if (res.data) {
          file.url = res.data.url;
          context.emit('deliverUrl', res.data.url);
        }
      } else {
        ElMessage.error('网络错误，请稍后重试');
      }
    };
    const onError = (error) => {
      ElMessage.error('上传错误，请稍后重试');
      console.error(error);
    };

    return {
      ImgUrl,
      upLoadRef,
      onError,
      onSuccess,
    };
  },
});
</script>
