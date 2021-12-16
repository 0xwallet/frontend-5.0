<template>
  <header class="px-4 bg-white h-14 flex items-center">
    <div class="mr-4">
      <img class="w-8 h-8" src="../../assets/images/logo_icon.png" alt="" />
    </div>
    <div class="font-18">{{ title }}</div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
