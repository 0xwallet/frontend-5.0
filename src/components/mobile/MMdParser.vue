<template>
  <div class="markdown-body" :class="themeClassName" v-html="clean"></div>
</template>

<script setup lang="ts">
import marked from "marked";
import DOMPurify from "dompurify";
import { transformRawDescription } from "../../hooks";

type MdTheme = "light" | "dark";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  theme: {
    type: String as PropType<MdTheme>,
    default: "light",
  },
});
const clean = ref("");
const themeClassName = ref("");
themeClassName.value = `markdown-body-${props.theme}`;
// marked.setOptions({});
marked.use({
  renderer: {
    // tag renderer
    text(text) {
      // console.log("arguments", arguments);
      // console.log("text", text, typeof text);
      return transformRawDescription(text);
    },
  },
});
// DOMPurify.addHook("afterSanitizeAttributes", (node) => {
//   if ("target" in (node as any)) {
//     node.setAttribute("target", "_blank");
//   }
// });
watch(
  () => props.content,
  (newVal) => {
    const parsedContent = marked(newVal);
    clean.value = DOMPurify.sanitize(parsedContent);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less">
.markTag {
  cursor: default;
  font-size: 12px;
  border-radius: 2px;
  color: white;
  text-align: center;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 7px;
  margin-right: 4px;
  &:hover {
    opacity: 0.85;
  }
}
</style>

<style lang="less" scoped>
.markdown-body {
  font-size: 14px;
}
</style>
