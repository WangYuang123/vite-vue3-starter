<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>

  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { isExternal } from "@/utils/index";

import { useRouter } from "vue-router";
const router = useRouter();

import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const device = computed(() => appStore.device);
const sidebar = computed(() => appStore.sidebar);

function push() {
  if (device.value === "mobile" && sidebar.value.opened === true) {
    appStore.closeSidebar(false);
  }

  router.push(props.to).catch((err) => {
    console.error(err);
  });
}
</script>
