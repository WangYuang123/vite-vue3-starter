<script setup lang="ts">
// defineProps<{ msg: string }>();
import variables from "@/styles/variables.module.scss";
console.log(variables.bgColor);
</script>

<template>
  <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
  <el-button type="info"><svg-icon icon-class="system" />SVG 本地图标</el-button>
  <div class="box" />

  <div style="width: 100px; height: 100px; margin-top: 10px;" :style="{ 'background-color': variables.bgColor }" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
