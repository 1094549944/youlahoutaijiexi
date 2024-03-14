import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
// element-plus 引入icon
import { setupElIcons } from "@/plugins";
// 引入svg
import "virtual:svg-icons-register";
// 引入样式
import "@/styles/index.scss";
const app = createApp(App);
// 引入uno.css
import "uno.css";
// 进入动画
import "animate.css";
// 全局注册Element-plus图标
setupElIcons(app);
app.mount("#app");
