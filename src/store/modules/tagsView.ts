import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

export interface TagsView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export const useTagsViewStore = defineStore("tagsView", () => {
  const visitedViews = ref<TagsView[]>([]);
  const cachedViews = ref<string[]>([]);

  function addVisitedView(view: TagsView) {
    if (visitedViews.value.some((v) => v.path === view.path)) return;

    if (view.meta && view.meta.affix) {
      visitedViews.value.unshift(
        Object.assign({}, view, {
          title: view.meta?.title || "no-name",
        })
      );
    } else {
      visitedViews.value.push(
        Object.assign({}, view, {
          title: view.meta?.title || "no-name",
        })
      );
    }
  }

  function addCachedView(view: TagsView) {
    const viewName = view.name as string;
    if (cachedViews.value.includes(viewName)) return;
    if (view.meta?.keepAlive) {
      cachedViews.value.push(viewName);
    }
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

  function delCachedView(view: TagsView) {
    const viewName = view.name as string;
    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(viewName);
      index > -1 && cachedViews.value.splice(index, 1);
      resolve([...cachedViews.value]);
    });
  }

  function addView(view: TagsView) {
    addVisitedView(view);
    addCachedView(view);
  }

  function delView(view: TagsView) {
    return new Promise((resolve) => {
      delVisitedView(view);
      delCachedView(view);

      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      });
    });
  }

  function delAllViews() {
    console.log("执行清除所有路由操作");
  }

  return {
    delAllViews,
    cachedViews,
    visitedViews,
    addView,
    delView,
  };
});
