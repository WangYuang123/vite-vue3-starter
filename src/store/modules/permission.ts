import { store } from "@/store";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { listRoutes } from "@/api/menu/index";

const Layout = () => import("@/layout/index.vue");
const modules = import.meta.glob("../../views/**/**.vue");

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role);
      }
    });

    return false;
  }
};

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route };
    const bool = hasPermission(roles, tmpRoute)

    if (bool) {
      if (tmpRoute.component?.toString() === "Layout") {
        tmpRoute.component = Layout;
      } else {
        const component = modules[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          tmpRoute.component = component;
        } else {
          tmpRoute.component = modules[`../../views/error-page/404.vue`];
        }
      }
      
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
      }
      asyncRoutes.push(tmpRoute);
    }
  });
  return asyncRoutes
};

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([]);

  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }

  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw>((reslove, reject) => {
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          setRoutes(accessedRoutes);
          reslove(accessedRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  return {
    routes,
    setRoutes,
    generateRoutes,
  };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
