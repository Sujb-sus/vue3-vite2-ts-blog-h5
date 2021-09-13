import { ConfigEnv, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import"; // 按需导入ui组件

const CWD = process.cwd(); // 项目根目录

export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD); // mode环境变量

  return {
    base: VITE_BASE_URL,
    css: {
      modules: {
        localsConvention: "camelCase", // 默认只支持驼峰，修改为同时支持横线和驼峰
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/index.scss";',
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
      styleImport({
        // 手动导入组件
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => {
              return `vant/es/${name}/style`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    build: {
      target: "modules",
      polyfillModulePreload: true,
      outDir: "dist",
      assetsDir: "static",
      minify: "terser", // 混淆器
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "vant"],
      exclude: ["vue-demi"],
    },
    server: {
      host: "0.0.0.0",
      port: 8089, // 设置服务启动端口号
      open: true,
      cors: true, // 允许跨域
      // 设置代理，根据项目实际情况配置
      proxy: {
        "/client_api": {
          target: "http://localhost:3000/client_api/",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/client_api/, "/"),
        },
      },
    },
  };
};
