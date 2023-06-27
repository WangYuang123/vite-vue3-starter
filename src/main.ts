import { createApp } from "vue";
import App from "./App.vue";
import 'virtual:svg-icons-register';


import router from "./router/index";

createApp(App).use(router).mount("#app");
