<template>
  <div class="w-full h-[50px] bg-gray-800 dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <route-link v-if="collapse" key="collapse" class="h-full w-full flex items-center justify-center" to="/">
        <img v-if="settingStore.sidebarLogo" :src="logo" alt="" class="w-5 h-5" />
        <span v-else class="ml-3 text-white text-sm font-bold">vue3-element-admin</span>
      </route-link>

      <route-link v-else key="expand" class="h-full w-full flex items-center justify-center" to="/">
        <img v-if="settingStore.sidebarLogo" :src="logo" alt="" class="w-5 h-5" />
        <span class="ml-3 text-white text-sm font-bold">vue3-element-admin</span>
      </route-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  collapse: {
    type: Boolean,
    default: true,
  },
});

import { useSettingStore } from "@/store/modules/settings";
const settingStore = useSettingStore();
console.log(settingStore.sidebarLogo);

const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href);
</script>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
