<template>
  <a
    rel="noopener"
    :href="href"
    :target="target"
    :title="title"
    :class="{
      XLinkDisabled: disabled,
    }"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
// https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a
const props = defineProps({
  href: {
    type: String,
    default: "javascript:;",
  },
  target: {
    type: String as PropType<"_self" | "_blank">,
    default: "_self",
  },
  title: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
// 禁用的样式
.XLinkDisabled {
  cursor: not-allowed;
  color: #9ca3af;
}
</style>
