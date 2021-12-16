import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { visualizer } from "rollup-plugin-visualizer";
import writeCDNScripts from "./vitePlugins/writeCDN";
// vite.config.js
// import ViteComponents, {
//   AntDesignVueResolver,
//   VantResolver,
// } from "unplugin-vue-components/resolvers";
// import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  resolve: {
    alias: {
      // dayjs: "dayjs/esm",
    },
  },
  plugins: [
    vue(),
    writeCDNScripts(),
    // Components({
    // 这个懒加载会使得 vite 的加载异常的慢
    //   resolvers: [AntDesignVueResolver(), VantResolver()],
    // }),
    // visualizer({
    //   open: true,
    // }), // 分析打包产物
  ],
  optimizeDeps: {
    include: ["ant-design-vue", "vant"],
    exclude: [
      "nkn",
      "vue",
      "vue-router",
      "vue-i18n",
      "pdfjs-dist/types/src/display/api",
      "streamsaver",
      "file-saver",
    ],
    // include: ["streamsaver", "file-saver"],
  },
  build: {
    rollupOptions: {
      external: [
        "nkn",
        "vue",
        "vue-router",
        "vue-i18n",
        "pdfjs-dist",
        "streamsaver",
        "file-saver",
      ],
    },
  },
  server: {
    port: 4000, // 要 4000 才能websocket auth验证通过
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}));
