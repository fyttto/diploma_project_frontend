<template>
  <div class="w-screen h-screen flex justify-center items-center z-0 bg-img">
    <login-input />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import LoginInput from './components/login-input/login-input.vue';

export default defineComponent({
  components: {
    LoginInput,
  },
});
</script>

<style lang="scss">
.bg-img {
  background-image: url('@/assets/img/login/bgimg.png');
}
</style>
