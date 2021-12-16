import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import writeCDNScripts from "./vitePlugins/writeCDN";
// vite.config.js
import ViteComponents, {
  AntDesignVueResolver,
  VantResolver,
} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // dayjs: "dayjs/esm",
    },
  },
  plugins: [
    vue(),
    writeCDNScripts(),
    Components({
      resolvers: [AntDesignVueResolver(), VantResolver()],
    }),
  ],
  optimizeDeps: {
    exclude: [
      "vue",
      "vue-router",
      "vue-i18n",
      "pdfjs-dist/types/src/display/api",
      "streamsaver",
      "file-saver",
    ],
    // include: ["streamsaver", "file-saver"],
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
});
