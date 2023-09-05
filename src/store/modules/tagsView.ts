import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

export interface TagsView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref<TagsView[]>([]);

  function addVisitedView(view: TagsView) {
    if (visitedViews.value.some((v) => v.path === view.path)) return;

    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || "no-name",
      })
    );
  }

  function addView(view: TagsView) {
    addVisitedView(view);
  }

  function delAllViews() {
    console.log("执行清除所有路由操作");
  }

  return {
    delAllViews,
    visitedViews,
    addView,
  };
});
