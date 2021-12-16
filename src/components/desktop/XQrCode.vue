<template>
  <canvas ref="elCanvas" :width="width" class="m-auto"></canvas>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, PropType, ref } from "vue";
import QRCode from "qrcode";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  // // 参数
  // options: {
  //   type: Object as PropType<QRCodeRenderersOptions>,
  //   default: null,
  // },
  // 宽度
  width: {
    type: Number,
    required: true,
  },
});
const elCanvas = ref<HTMLDivElement>();
onMounted(() => {
  console.log("elCanvas", elCanvas);
  console.log("props.width", props.width);
  QRCode.toCanvas(elCanvas.value, props.url, { width: props.width }, (err) => {
    console.log("qrcode.toCanvas-error", err);
  });
});
</script>

<style scoped></style>
