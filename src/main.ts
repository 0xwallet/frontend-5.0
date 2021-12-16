// import { createApp } from "vue";
// import App from "./App.vue";

// createApp(App).mount("#app");

import "vue-global-api";
import { isMobile } from "./hooks";
// markdown style
// import "./assets/github-markdown-css.less";
import "./assets/github-markdown.css";
import "./assets/tailwind.css";

(window as any).__isMobile__ = isMobile();
if ((window as any).__isMobile__) {
  console.log("isMobile");
  import(
    /* webpackChunkName: "mobile" */
    /* webpackPrefetch: true */
    "./main_mobile"
  ).then((module) => {
    // console.log("加载移动端模块_mobile_module", module);
    console.log("加载移动端模块_mobile_module");
  });
} else {
  console.log("isPC");
  import(
    /* webpackChunkName: "pc" */
    /* webpackPrefetch: true */
    "./main_desktop"
  ).then((module) => {
    // console.log("加载PC端模块_pc_module", module);
    console.log("加载PC端模块_pc_module");
  });
}

setTimeout(() => {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntriesByName("first-paint")) {
      console.log("性能-FP candidate:", entry.startTime, entry);
    }
  }).observe({ type: "paint", buffered: true });
}, 2000);
