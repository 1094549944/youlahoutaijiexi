import { createApp } from "vue";
import App from "@/App.vue";
// import ".style.css";
// import "@/style.css";
// element-plus 引入icon
import { setupElIcons } from "@/plugins";
// 引入svg
import "virtual:svg-icons-register";
// 引入样式
import "@/styles/index.scss";
// 引入uno.css
import "uno.css";
// 引入动画
import "animate.css";

const app = createApp(App);
// 全局注册Element-plus图标
setupElIcons(app);
app.mount("#app");
