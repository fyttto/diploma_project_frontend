<template>
  <div class="flex">
    <navbar-side :options="createSideBar()" class="w-full h-screen"></navbar-side>
    <navbar-top></navbar-top>
  </div>
</template>

<script>
import navbarTop from '@/layout/navbar-top/index.vue';
import navbarSide from '@/layout/navbar-side/index.vue';
import createSideBar from '@/utils/createSideBar';

export default {
  components: {
    navbarSide,
    navbarTop,
  },
  setup() {
    return { createSideBar };
  },
};
</script>

<style></style>
