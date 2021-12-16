<template>
  <div>
    <template v-for="(title, idx) in titleArr" :key="title">
      <div>{{ title }}</div>
      <span v-if="idx < titleArr.length - 1" class="px-2 text-gray-400">/</span>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  titleArr: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
