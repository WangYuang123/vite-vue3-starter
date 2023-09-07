<template>
  <div class="tags-container">
    <router-link
      v-for="item in visitedViews"
      :key="item.path"
      class="tags-item"
      :class="{ active: isActive(item) }"
      :data-path="item.path"
      :to="{ path: item.path, query: item.query }"
      @contextmenu.prevent="openTagMenu(item, $event)"
    >
      {{ item.title }}
      <span v-if="!isAffix(item)" class="tags-item-close" @click.prevent.stop="closeSelectedTag(item)">
        <i-ep-close class="text-[10px]"></i-ep-close>
      </span>
    </router-link>

    <!-- tag标签操作菜单 -->
    <ul v-show="tagMenuVisible" class="tag-menu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectedTag(selectedTag)">
        <svg-icon icon-class="refresh"></svg-icon>
        刷新
      </li>
      <li>
        <svg-icon icon-class="close"></svg-icon>
        关闭
      </li>
      <li>
        <svg-icon icon-class="close_other"></svg-icon>
        关闭其他
      </li>
      <li>
        <svg-icon icon-class="close_left"></svg-icon>
        关闭左侧
      </li>
      <li>
        <svg-icon icon-class="close_right"></svg-icon>
        关闭右侧
      </li>
      <li>
        <svg-icon icon-class="close_all"></svg-icon>
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch, getCurrentInstance, ComponentInternalInstance } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTagsViewStore, TagsView } from "@/store/modules/tagsView";
import router from "@/router";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const tagsViewStore = useTagsViewStore();
const { visitedViews } = storeToRefs(tagsViewStore);
const route = useRoute();
function addTags() {
  if (route.name) {
    tagsViewStore.addView(route);
  }
}
watch(
  route,
  () => {
    addTags();
  },
  {
    immediate: true,
  }
);
function isActive(tag: TagsView) {
  return tag.path === route.path;
}
function isAffix(tag: TagsView) {
  return tag.meta && tag.meta.affix;
}
const left = ref(0);
const top = ref(0);
const tagMenuVisible = ref(false); // 标签操作菜单显示状态
watch(tagMenuVisible, (value) => {
  if (value) {
    document.body.addEventListener("click", closeTagMenu);
  } else {
    document.body.removeEventListener("click", closeTagMenu);
  }
});
const selectedTag = ref({});
function openTagMenu(tag: TagsView, e: MouseEvent) {
  const meunMinWidth = 105;
  const offsetLeft = proxy?.$el.getBoundingClientRect().left;
  const offsetWidth = proxy?.$el.offsetWidth;
  const maxLeft = offsetWidth - meunMinWidth;
  const l = e.clientX - offsetLeft + 15;

  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }

  top.value = e.clientY;
  tagMenuVisible.value = true;
  selectedTag.value = tag;
}
function closeTagMenu() {
  tagMenuVisible.value = false;
}

function toLastView(visitedViews: TagsView[], view?: any) {
  const lastView = visitedViews.slice(-1)[0]; // 获取最后一个标签
  if (lastView && lastView.fullPath) {
    router.push(lastView.fullPath);
  } else {
    if (view.name === "Dashboard") {
      router.replace({ path: "/redirect" + view.fullPath });
    } else {
      router.push("/");
    }
  }
}
function closeSelectedTag(view: TagsView) {
  tagsViewStore.delView(view).then((res: any) => {
    if (isActive(view)) {
      toLastView(res.visitedViews, view);
    }
  });
}

function refreshSelectedTag(view: TagsView) {
  tagsViewStore.delCachedView(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({ path: "/redirect" + fullPath }).catch((err) => {
      console.warn(err);
    });
  });
}
</script>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  height: 34px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 1px var(--el-box-shadow-light);

  .tags-item {
    display: inline-block;
    padding: 3px 8px;
    margin: 4px 0 0 5px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid var(--el-border-color-light);

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &.active {
      color: #fff;
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        content: "";
        background: #fff;
        border-radius: 50%;
      }
    }

    &-close {
      border-radius: 100%;

      &:hover {
        color: #fff;
        background: rgb(0 0 0 / 16%);
      }
    }
  }
}

.tag-menu {
  position: absolute;
  z-index: 99;
  font-size: 12px;
  background: var(--el-bg-color-overlay);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  li {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: var(--el-fill-color-light);
    }
  }
}
</style>
