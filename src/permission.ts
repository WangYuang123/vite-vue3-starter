import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false }); // 进度条

// 白名单路由
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  // NProgress.start();

  // const hasToken = false

  // if (hasToken) {
  //   if (to.path === "/login") {
  //     // 如果已登录，跳转首页
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // const userStore = useUserStoreHook();
  //   }
  //   next();
  // } else {
  //   // 未登录可以访问白名单页面
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next("/login");
  //     NProgress.done();
  //   }
  // }
  next()
});

router.afterEach(() => {
  NProgress.done();
});
