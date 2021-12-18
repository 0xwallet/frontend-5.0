<template>
  <img :src="pngUrl" class="inline-block align-middle" />
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: "generic",
  }, // 文件后缀
});

const getIconUrl = (type: string) => {
  return new URL(`../../assets/images/extensions/${type}.png`, import.meta.url)
    .href;
};

const pngUrl = computed(() => getIconUrl(props.type));
</script>
