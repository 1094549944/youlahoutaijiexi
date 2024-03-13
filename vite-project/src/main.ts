import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
// element-plus 引入icon
import { setupElIcons } from "@/plugins";
// 引入svg
import "virtual:svg-icons-register";

const app = createApp(App);
// 全局注册Element-plus图标
setupElIcons(app);
app.mount("#app");
