import { createApp } from "vue";

import App from "./App.vue";
import "virtual:svg-icons-register";
import "uno.css";
import { setupStore } from "@/store";
import router from "./router/index";

import "@/permission";

import "@/styles/index.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 全局注册 状态管理(store)
setupStore(app);

app.use(router).mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
