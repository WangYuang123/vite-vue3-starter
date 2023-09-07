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

  function delVisitedView(view: TagsView) {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1);
          break;
        }
      }
      resolve([...visitedViews.value]);
    });
  }

  function addView(view: TagsView) {
    addVisitedView(view);
  }

  function delView(view: TagsView) {
    return new Promise((resolve) => {
      delVisitedView(view);

      resolve({
        visitedViews: [...visitedViews.value],
      });
    });
  }

  function delAllViews() {
    console.log("执行清除所有路由操作");
  }

  return {
    delAllViews,
    visitedViews,
    addView,
    delView
  };
});
