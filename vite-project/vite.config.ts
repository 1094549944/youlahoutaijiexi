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
// 引入路径resolve
import { resolve } from "path";
// 指定路径 使用 @ 代替/src
const pathSrc = resolve(__dirname, "src");
// 引入unocss
import UnoCSS from "unocss/vite";
// 引入 unplugin-icons/vite
import Icons from "unplugin-icons/vite";
// 按需导入图标
import IconsResolver from "unplugin-icons/resolver";
// 获取项目的基本信息，用于对外暴露
import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";
// 用变量获取项目的基本信息，用于对外暴露
// 受到src/typings/env.d.ts 类型约束
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  buildTimestamp: Date.now(),
};

// https://vitejs.dev/config/

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  //
  const env = loadEnv(mode, process.cwd());
  console.log("mode", mode);
  console.log("env", env);
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
        imports: ["vue", "@vueuse/core", "pinia", "vue-router"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          IconsResolver(),
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
          // 自动注册图标
          IconsResolver({ enabledCollections: ["ep"] }),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 配置文件位置 (false:关闭自动生成)
        dts: resolve(pathSrc, "typings", "components.d.ts"), //  自动导入组件类型声明文件位置，默认根目录
      }),
      // 引入自定义icon
      Icons({
        autoInstall: true,
      }),
      // 通过 createSvgIconsPlugin() 入参指定了svg 文件所在的目录和 symbolId。
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        // symbolId
        symbolId: "icon-[dir]-[name]",
      }),
      UnoCSS({
        /* options */
      }),
    ],
    // vite.config.ts
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable 全局的scss变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    // 配置代理
    server: {
      // 允许IP 访问
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT), // 在3002 端口启动
      open: true,
      proxy: {
        // 配置代理
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 接口地址
          target: env.VITE_APP_BASE_API,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    // 对外暴露项目基本信息
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
