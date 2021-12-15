<template>
  <a-result class="pt-20" status="500" title="500" :subTitle="$t('errPage.500_subTitle')">
    <template #extra>
      <a-button shape="round" type="primary" @click="onBackHome">
        {{
          $t("errPage.backHome")
        }}
      </a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const onBackHome = () => router.replace({ name: "Dashboard" });
</script>

<style scoped>
</style>