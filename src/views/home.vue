<script setup lang="ts">
import { useCounterStore } from "@/store/counter";
const counterStore = useCounterStore();
</script>

<template>
  <div>
    <h1 class="text-3xl">vue3-element-admin-父组件</h1>
    <el-button type="primary" @click="counterStore.increment">count++</el-button>
    <HelloWorld />
  </div>
</template>

<style scoped></style>
