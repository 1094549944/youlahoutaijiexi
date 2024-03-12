// UserConfig,ConfigEnv 都是类型约束
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 以下三项引入是为配置Element-plus自动按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 引入路径
import { resolve } from "path";

// 指定路径 使用 @ 代替/src
const pathSrc = resolve(__dirname, "src");

// https://vitejs.dev/config/

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "pinia", "vue-router"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        dts: resolve(pathSrc, "typings", "auto-import.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        dts: resolve(pathSrc, "typings", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      ,
    ],
  };
});
