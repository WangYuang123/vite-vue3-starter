<template>
  <div
    class="px-[15px] hover:bg-gray-50 cursor-pointer h-[50px] leading-[50px] dark:hover:bg-[var(--el-fill-color-light)]"
    @click="toggleClick"
  >
    <template v-if="isActive">
      <el-icon><Fold /></el-icon>
    </template>
    <template v-else>
      <el-icon><Expand /></el-icon>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    required: true,
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["toggleClick"]);

function toggleClick() {
  emit("toggleClick");
}
</script>

<style lang="scss" scoped>
.hamburger {
  width: 20px;
  height: 20px;
  vertical-align: -4px;

  &.is-active {
    transform: rotate(180deg);
  }
}
</style>
