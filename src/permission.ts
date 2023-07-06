import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import {usePermissionStoreHook} from '@/store/modules/permission'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 进度条


const permissionStore = usePermissionStoreHook();
// 白名单路由
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const hasToken = localStorage.getItem("accessToken");

  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，跳转首页
      next({ path: "/" });
      NProgress.done();
    } else {
      const userStore = useUserStoreHook();
      const hasRoles = userStore.roles && userStore.roles.length > 0;
      if (hasRoles) {
        console.log("用户有权限");
      } else {
        const { roles } = await userStore.getInfo();
        // console.log(roles)
        const accessedRoutes = await permissionStore.generateRoutes(roles)
        console.log(accessedRoutes)
      }
    }
    next();
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
  // next()
});

router.afterEach(() => {
  NProgress.done();
});
