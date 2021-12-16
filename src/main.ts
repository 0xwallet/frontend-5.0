import { createApp } from "vue";
import "vue-global-api";
import { createPinia } from "pinia";
// markdown style
// import "./assets/github-markdown-css.less";
import "./assets/github-markdown.css";
// import "./assets/tailwind.css";
import "tailwindcss/tailwind.css";
// 注意 是响应式的
import languages from "./languages";
import { createI18n } from "vue-i18n";
import { DEFAULT_LANG } from "./constants";
const storageLocale = useLocalStorage("locale", DEFAULT_LANG);
import { useLocalStorage } from "@vueuse/core";
import { isMobile, lastOfArray } from "./hooks";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import routerMobile from "./router/mobile";
import routerDesktop from "./router/desktop";
export const i18n = createI18n({
  messages: languages,
  locale: storageLocale.value,
  fallbackLocale: DEFAULT_LANG,
});
// ui framework -start
import Vant from "vant";
import "vant/lib/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
// ui framework -end

import AppMobile from "./views/mobile/App_mobile.vue";
import AppDesktop from "./views/desktop/App_desktop.vue";
// const mobileApp = createApp(App);
(window as any).__isMobile__ = isMobile();
if ((window as any).__isMobile__) {
  console.log("isMobile");
  const vueAppMobile = createApp(AppMobile);
  vueAppMobile
    .use(i18n)
    .use(Vant)
    .use(createPinia())
    .use(routerMobile)
    .mount("#app");
} else {
  console.log("isPC");
  const vueAppDesktop = createApp(AppDesktop);
  // 注册全局属性
  // 专门给模板中调试事件用的 @click="$log"
  vueAppDesktop.config.globalProperties.$log = console.log;
  // 专门给模板用的提取最后一个元素
  vueAppDesktop.config.globalProperties.$lastOfArray = lastOfArray;
  vueAppDesktop
    .use(i18n)
    .use(Antd)
    .use(createPinia())
    .use(routerDesktop)
    .mount("#app");
}

setTimeout(() => {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntriesByName("first-paint")) {
      console.log("性能-FP candidate:", entry.startTime, entry);
    }
  }).observe({ type: "paint", buffered: true });
}, 2000);
