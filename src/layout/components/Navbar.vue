<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <hamburger :is-active="appStore.sidebar.opened" @toggleClick="toggleSideBar" />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置（窄屏隐藏） -->
      <div v-if="device !== 'mobile'" class="setting-container">
        <!-- 全屏 -->
        <div class="setting-item" @click="toggle">
          <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"> </svg-icon>
        </div>

        <!-- 布局大小 -->
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <sizeSelect class="setting-item" />
        </el-tooltip>

        <!-- 用户头像 -->
        <el-dropdown trigger="click">
          <div class="avatar-container">
            <img :src="userStore.avatar + '?imageView2/1/w/80/h/80'" />
            <i-ep-caret-bottom class="w-3 h-3"></i-ep-caret-bottom>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
              <a target="_blank" href="https://github.com/youlaitech/vue3-element-admin">
                <el-dropdown-item>Github</el-dropdown-item>
              </a>
              <a target="_blank" href="https://gitee.com/haoxr">
                <el-dropdown-item>码云</el-dropdown-item>
              </a>
              <a target="_blank" href="https://juejin.cn/post/7228990409909108793">
                <el-dropdown-item>项目文档</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="logout"> 退出 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { useFullscreen } from "@vueuse/core";

const appStore = useAppStore();
const { device } = storeToRefs(appStore); // 设备类型：desktop-宽屏设备 mobile-窄屏设备

const { isFullscreen, toggle } = useFullscreen();

function toggleSideBar() {
  appStore.toggleSidebar(true);
}

const userStore = useUserStore();

function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore.logout().then(() => {
      console.log('清除路由tags')
    })
  });
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 0 1px #0003;

  .setting-container {
    display: flex;
    align-items: center;

    .setting-item {
      display: inline-block;
      width: 30px;
      height: 50px;
      line-height: 50px;
      color: #5a5e66;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: rgb(249 250 251 / 100%);
      }
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
    justify-items: center;
    margin: 0 5px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
}
</style>
