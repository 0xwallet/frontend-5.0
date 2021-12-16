import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import writeCDNScripts from "./vitePlugins/writeCDN";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), writeCDNScripts()],
  optimizeDeps: {
    exclude: ["pdfjs-dist/types/src/display/api"],
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
