<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <Logo v-if="sidebarLogo" />
  </div>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";

import { storeToRefs } from "pinia";
import { useSettingStore } from "@/store/modules/settings";
const settingStore = useSettingStore();

const { sidebarLogo } = storeToRefs(settingStore);
</script>
