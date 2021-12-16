<template>
  <keep-alive>
    <component :is="curComponent"></component>
  </keep-alive>
</template>

<script setup lang="ts">
import { useUserStore } from "../../store";
import { defineComponent, ref, watch, markRaw } from "vue";
import { useRoute } from "vue-router";
import Common from "./Common.vue";
import NoLogin from "./NoLogin.vue";

type Layout = "NoLogin" | "Common";

const userStore = useUserStore();
const route = useRoute();
const curLayout = ref<Layout>("Common");
console.log("curLayout", curLayout);
/** 不重复设置相同的值 */
const dupSetCurLayout = (str: Layout) => {
  if (curLayout.value !== str) curLayout.value = str;
};
const isRoutePathShowInNoLogin = (path: string) => {
  return (
    !userStore.isLoggedIn &&
    (path.includes("sharedFile") || path.includes("peerTransfer"))
  );
};
watch(
  () => route,
  (newVal) => {
    // console.log("layout-index-watch-route", newVal);
    // 如果当前也需要显示在未登录上 , 用NoLogin layout
    // console.log(
    //   "isRoutePathShowInNoLogin(newVal.path)",
    //   isRoutePathShowInNoLogin(newVal.path)
    // );
    dupSetCurLayout(
      isRoutePathShowInNoLogin(newVal.path) ? "NoLogin" : "Common"
    );
  },
  {
    immediate: true,
  }
);
const curComponent = computed(() =>
  curLayout.value === "Common" ? markRaw(Common) : markRaw(NoLogin)
);
</script>

<style scoped></style>
