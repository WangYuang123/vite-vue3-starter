<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />

    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppMain, Sidebar, Navbar } from "./components/index";

import { useSettingStore } from "@/store/modules/settings";
const settingStore = useSettingStore();
const fixedHeader = computed(() => settingStore.fixedHeader);

import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  withoutAnimation: appStore.sidebar.withoutAnimation,
}));
</script>

<style lang="scss" scoped>
.app-wrapper {
  &::after {
    display: table;
    clear: both;
    content: "";
  }

  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>
