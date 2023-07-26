import { defineStore } from "pinia";

export const useTagsViewStore = defineStore("tagsView", () => {
  const cacheViews = ref<string[]>([]);

  return {
    cacheViews,
  };
});
