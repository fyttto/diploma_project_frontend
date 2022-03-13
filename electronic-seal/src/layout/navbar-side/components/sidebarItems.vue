<template>
  <template
    v-if="
      haveOneShowingChild(item, item.children) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow
    "
  >
    <el-menu-item :index="item.path" :route="onlyOneChild.path">
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        {{ item.meta.title }}
      </template>
    </el-menu-item>
  </template>

  <el-sub-menu v-else ref="subMenu" :index="item.path" popper-append-to-body>
    <template #title>
      <el-icon>
        <component :is="item.meta && item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>

    <sidebar-items
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  setup() {
    const onlyOneChild = ref([]);
    function haveOneShowingChild(parent, children = []) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        onlyOneChild.value = item;
        return true;
      });

      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        onlyOneChild.value = {
          ...parent,
          path: '',
          noShowingChildren: true,
        };
        return true;
      }
      return false;
    }

    return {
      haveOneShowingChild,
      onlyOneChild,
    };
  },
});
</script>

<style></style>
