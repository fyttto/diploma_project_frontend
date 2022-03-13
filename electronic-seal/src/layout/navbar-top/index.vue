<template>
  <div class="w-full h-full flex items-center justify-between">
    <left-bar />
    <right-bar :avater="avater" :name="name" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import rightBar from './components/right-bar.vue';
import leftBar from './components/left-bar.vue';

export default defineComponent({
  components: {
    rightBar,
    leftBar,
  },
  props: ['avater', 'name'],
});
</script>

<style></style>
