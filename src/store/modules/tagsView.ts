import { defineStore } from "pinia";

export const useTagsViewStore = defineStore("tagsView", () => {
  function delAllViews() {
    console.log("执行清除所有路由操作");
  }

  return {
    delAllViews,
  };
});
