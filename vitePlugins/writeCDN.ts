import { Plugin } from "vite";

/** 根据html模板的变量 development_CDNS|production_CDNS 去替换真实的cdn脚本 */
export default function writeCDNScripts(): Plugin {
  // 是否生产环境
  let isDev = true;
  return {
    name: "writeCDN-plugin",
    configResolved(resolvedConfig) {
      isDev = resolvedConfig.command === "serve";
    },
    transformIndexHtml(html: string) {
      return isDev
        ? html
            .replace(/{{development_CDNS}}/g, CDNS.devlopment)
            .replace(/{{production_CDNS}}/g, "")
        : html
            .replace(/{{development_CDNS}}/g, "")
            .replace(/{{production_CDNS}}/g, CDNS.production);
    },
  };
}

var CDNS = {
  devlopment: `
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue@3.2.1/dist/vue.global.js"
></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue-router@4.0.11/dist/vue-router.global.js"
></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue-i18n@9.1.7/dist/vue-i18n.global.js"
></script>  
  `,
  production: `
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue@3.2.1/dist/vue.global.prod.js"
></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue-router@4.0.11/dist/vue-router.global.prod.js"
></script>
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/vue-i18n@9.1.7/dist/vue-i18n.global.prod.js"
></script>
  `,
};
