<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 只包含一个子路由节点的路由，显示其【唯一子路由】 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
    >
      <AppLink v-if="onlyOneChild.meta" :to="''"></AppLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import AppLink from "./Link.vue";
import { isExternal } from "@/utils/index";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    required: true
  }
});

/**
 * 解析路径
 * @param routePath
 */
function resolvePath(routePath: string) {
  if(isExternal(routePath)) {
    return routePath
  }
}

const onlyOneChild = ref(); // 临时变量，唯一子路由

/**
 * 判断当前路由是否只有一个子路由
 *
 * 1.如果只有一个子路由： 返回true
 * 2.如果无子路由，返回true
 * @param children 子路由数组
 * @param parent 当前路由
 */
function hasOneShowingChild(children = [], parent: any) {
  // 需要显示的子路由数组
  const showingChildren = children.filter((item: any) => {
    if (item.meta?.hidden) {
      return false;
    } else {
      onlyOneChild.value = item; // 唯一子路由赋值（多个子路由的情况，onlyOneChild的变量使用不上的）
      return true;
    }
  });

  // 1.如果只有一个子路由，返回true
  if (showingChildren.length === 1) {
    return true;
  }

  // 2.如果没有子路由，复制当前的路由信息作为其子路由，满足只拥有一个子路由的条件，返回true
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
}
</script>
