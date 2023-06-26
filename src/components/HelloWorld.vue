<script setup lang="ts">

defineProps<{ msg: string }>();

</script>

<template>
  <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
