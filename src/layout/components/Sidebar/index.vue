<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <Logo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />

    <el-scrollbar>
      <el-menu
        :default-active="currRoute.path"
        :collapse="!appStore.sidebar.opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :basePath="route.path"
          :is-collapse="!appStore.sidebar.opened"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";

import { storeToRefs } from "pinia";

import { useSettingStore } from "@/store/modules/settings";
const settingStore = useSettingStore();
const { sidebarLogo } = storeToRefs(settingStore);

import { useAppStore } from "@/store/modules/app";
import { useRoute } from "vue-router";

const appStore = useAppStore();

const currRoute = useRoute();

import variables from "@/styles/variables.module.scss";

import SidebarItem from "./SidebarItem.vue";

import { usePermissionStore } from "@/store/modules/permission";
const permissionStore = usePermissionStore();
</script>
