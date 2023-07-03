import { createApp } from "vue";

import App from "./App.vue";
import "virtual:svg-icons-register";
import "uno.css";
import router from "./router/index";

import { setupStore } from "@/store";

import "@/permission";

const app = createApp(App);

// 全局注册 状态管理(store)
setupStore(app);

app.use(router).mount("#app");
