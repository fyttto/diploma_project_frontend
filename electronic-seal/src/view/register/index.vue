<template>
  <div class="w-screen h-screen flex justify-center items-center bg-img">
    <div
      class="w-auto h-auto register-container"
      style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)"
    >
      <form-register />
    </div>
  </div>
</template>

<script setup>
import formRegister from './components/form-register.vue';
</script>

<style scoped>
.bg-img {
  background-image: url('../../assets/img/login/bgimg.png');
}

.register-container {
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.register-container::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  z-index: -1;
  margin: -30px;
}
</style>
