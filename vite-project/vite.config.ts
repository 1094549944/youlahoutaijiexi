// UserConfig,ConfigEnv 都是类型约束
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 配置vue使用jsx
import vueJsx from "@vitejs/plugin-vue-jsx";

// 以下三项引入是为配置Element-plus自动按需导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 引入svg
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// 引入路径
import { resolve } from "path";

// 指定路径 使用 @ 代替/src
const pathSrc = resolve(__dirname, "src");

// https://vitejs.dev/config/

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    plugins: [
      vue(),
      // jsx、tsx语法支持
      vueJsx(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "pinia", "vue-router"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        eslintrc: {
          enabled: true, //  默认 false, true 启用生成。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把 enable 关掉，即改成 false。
          //  否则这个文件每次会在重新加载的时候重新生成，这会导致 eslint 有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
          // 浏览器需要访问所有应用到 vue/element api 的页面才会生成所有自动导入 api 的文件 json
          filepath: "./.eslintrc-auto-import.json",
          // 默认就是 ./.eslintrc-auto-import.json
          globalsPropValue: true,
        },
        vueTemplate: true, // 默认 true 是否在vue 模版中自动导入
        dts: resolve(pathSrc, "typings", "auto-import.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        dts: resolve(pathSrc, "typings", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      // 通过 createSvgIconsPlugin() 入参指定了svg 文件所在的目录和 symbolId。
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        // symbolId
        symbolId: "icon-[dir]-[name]",
      }),
    ],
  };
});
