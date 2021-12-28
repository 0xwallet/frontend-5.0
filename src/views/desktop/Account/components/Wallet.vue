<template>
  <div
    class="h-14 px-6 flex items-center justify-between"
    :style="{
      'border-bottom': '1px solid #eff2f9',
    }"
  >
    <div class="font-semibold font-16">钱包</div>
    <a-button @click="onClickAddAsset">
      <PlusOutlined class="align-middle" />添加
    </a-button>
  </div>
  <div v-if="index < 0" class="main-con px-6">
    <div
      style="padding-right: 1.5rem"
      v-for="(wallet, i) in wallet_list"
      @click="choose_wallet(i)"
    >
      <img :src="wallet.img" class="w-16 h-16" />
      <div>{{ wallet.title }}</div>
    </div>
  </div>
  <div v-else class="flex items-center">
    <div style="padding: 0.5rem; flex-shrink: 0">
      <img :src="wallet.data.payImg" style="height: 280px; width: auto" />
    </div>
    <div style="flex: 1; padding-right: 0.5rem">
      <div style="text-align: right; padding: 0.2rem 0">
        <SettingOutlined @click="show_setModel" />
      </div>
      <a-table
        :columns="wallet.data.columns"
        :data-source="wallet.data.data"
        style="text-align: center"
      >
        <template #avatar="{ text }">
          <!-- {{text}} -->
          <img :src="text" style="width: 2rem; height: 2rem" />
        </template>
        <template #customTitle>
          <span>
            <smile-outlined />
          </span>
        </template>
        <template #user="{ text: tags }">
          <div>{{ tags[0] }}</div>

          <div class="text-gray-400 font-12">{{ tags[1] }}</div>
        </template>
        <template #country="{ text }">
          <img :src="text" style="width: auto; height: 1rem" />
        </template>
        <template #activity="{ text: tags }">
          <div class="text-gray-400 font-12">{{ tags[0] }}</div>
          <div class="font-semibold">{{ tags[1] }}</div>
        </template>
      </a-table>
    </div>
  </div>
  <!-- 添加资产弹窗 -->
  <a-modal
    destroyOnClose
    centered
    v-model:visible="modalAddAssetVisible"
    @afterClose="onModalAssetClose"
    :title="modalAssetTitle"
    :width="480"
  >
    <!-- 第一步 -->
    <div v-if="modalAssetStage === 1">
      <a-row align="middle" justify="center">
        <a-col :span="6">收款货币:</a-col>
        <a-col :span="14">
          <a-radio-group v-model:value="modalAssetStageOneType">
            <a-radio :value="1">数字货币</a-radio>
            <a-radio :value="2">法定货币</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
    </div>
    <!-- 第二步 -->
    <div v-if="modalAssetStage === 2">
      <a-row
        align="middle"
        :class="{
          'pb-4': modalAssetStageOneType === 1,
        }"
        justify="center"
      >
        <a-col :span="6">代币类型:</a-col>
        <a-col v-if="modalAssetStageOneType === 1" :span="16">
          <a-radio-group
            class="flex items-center"
            v-model:value="modalAssetStageTwoCryptoType"
          >
            <a-radio
              v-for="item in modalAssetStageTwoCryptoRadioOptions"
              :key="item"
              class="flex items-center"
              :value="item"
            >
              <div class="relative ml-2">
                <!-- :src="require(`../../../assets/images/cryptos/${item}.png`)" -->
                <img
                  class="w-16 h-16"
                  :src="getCryptosImageUrl(item)"
                  :alt="item"
                />
                <div class="absolute font-14 left-0 right-0 text-center pt-0.5">
                  {{ item.toUpperCase() }}
                </div>
              </div>
            </a-radio>
          </a-radio-group>
        </a-col>
        <a-col v-if="modalAssetStageOneType === 2" :span="14">
          <a-radio-group v-model:value="modalAssetStageTwoLegalType">
            <a-radio value="dollar">美元稳定币</a-radio>
            <a-radio value="cny">数字人民币</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
    </div>
    <!-- 第三步 -->
    <div v-if="modalAssetStage === 3">
      <a-row align="middle" class="mb-4">
        <a-col :span="6">钱包地址:</a-col>
        <a-col :span="16">
          <a-input v-model:value="modalAssetStageThreeForm.address" />
        </a-col>
      </a-row>
      <a-row align="middle" class="mb-4">
        <a-col :span="6">地址备注(选填):</a-col>
        <a-col :span="16">
          <a-input v-model:value="modalAssetStageThreeForm.remark" />
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="6">密码:</a-col>
        <a-col :span="16">
          <a-input v-model:value="modalAssetStageThreeForm.pwd" />
        </a-col>
      </a-row>
    </div>
    <template #footer>
      <div v-if="modalAssetStage === 1">
        <a-button class="w-20" @click="onCloseModalAsset">取消</a-button>
        <a-button
          class="w-20"
          type="primary"
          @click="onConfirmModalAssetStage(1)"
          >下一步</a-button
        >
      </div>
      <div v-if="modalAssetStage === 2">
        <a-button class="w-20" @click="onBackToModalAssetStage(1)"
          >上一步</a-button
        >
        <a-button
          class="w-20"
          type="primary"
          @click="onConfirmModalAssetStage(2)"
          >下一步</a-button
        >
      </div>
      <div v-if="modalAssetStage === 3">
        <a-button class="w-20" @click="onBackToModalAssetStage(2)"
          >上一步</a-button
        >
        <a-button
          class="w-20"
          type="primary"
          @click="onConfirmModalAssetStage(3)"
          >确认</a-button
        >
      </div>
    </template>
  </a-modal>
  <a-modal
    destroyOnClose
    centered
    v-model:visible="showSet"
    title="钱包设置"
    :width="480"
  >
    <a-row align="middle" class="pb-4" justify="center">
      <a-col :span="6">代币类型:</a-col>
      <a-col :span="16">
        <a-radio-group
          class="flex items-center"
          v-model:value="modalAssetStageTwoCryptoType"
        >
          <a-radio class="flex items-center">设置类型</a-radio>
          <a-radio class="flex items-center">设置类型2</a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, PropType, defineProps, defineEmits, reactive, toRaw } from "vue";
import {
  SmileOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
interface Wallet {
  /**钱包类型图 */
  img: string;
  /**钱包标题*/
  title: string;
  data: {
    /**钱包的收款码*/
    payImg: string;

    columns: Array<any>;
    data: Array<any>;
  };
}
// 组件 props
const props = defineProps({
  wallet_list: {
    type: Array as PropType<Array<Wallet>>,
    default: () => [
      {
        img: "/assets/images/cryptos/bsv.png",
        title: "个人",
        data: {
          payImg: "/assets/images/zfb.jpg",
          columns: [
            {
              dataIndex: "avatar",
              key: "avatar",
              slots: { title: "customTitle", customRender: "avatar" },
            },
            {
              title: "User",
              dataIndex: "user",
              key: "user",
              slots: { customRender: "user" },
            },
            {
              title: "Country",
              dataIndex: "country",
              key: "country",
              slots: { customRender: "country" },
            },
            {
              title: "Order ID",
              key: "orderID",
              dataIndex: "orderID",
            },
            {
              title: "Amount",
              key: "amount",
              dataIndex: "amount",
            },
            {
              title: "Activity",
              dataIndex: "activity",
              key: "activity",
              slots: { customRender: "activity" },
            },
          ],
          data: [
            {
              key: "1",
              avatar: "/assets/logo_icon.png",
              user: ["Yiorgos Avrramu", "New|Register:Jan 1"],
              country: "/assets/success_rocket.png",
              orderID: "#202111056555482",
              amount: 0.99,
              activity: ["Last login", "10 sec ago"],
            },
            {
              key: "2",
              avatar: "/assets/logo_icon.png",
              user: ["Yiorgos Avrramu", "New|Register:Jan 1"],
              country: "/assets/success_rocket.png",
              orderID: "#202111056555482",
              amount: 0.99,
              activity: ["Last login", "10 sec ago"],
            },
            {
              key: "3",
              avatar: "/assets/logo_icon.png",
              user: ["Yiorgos Avrramu", "New|Register:Jan 1"],
              country: "/assets/success_rocket.png",
              orderID: "#202111056555482",
              amount: 0.99,
              activity: ["Last login", "10 sec ago"],
            },
          ],
        },
      },
      {
        img: "/assets/images/cryptos/bsv.png",
        title: "公司",
        data: { payImg: "/assets/images/zfb.jpg" },
      },
      {
        img: "/assets/images/cryptos/nkn.png",
        title: "个人",
        data: { payImg: "/assets/images/zfb.jpg" },
      },
    ],
  },
});
/**当前选中第几个钱包 */
const index = ref(-1);

/**当前选中的钱包 */
const wallet = computed(() => {
  // if (index.value >= 0) {
  //   return props.wallet_list[index.value];
  // }
  return props.wallet_list[index.value]
});
/**是否显示设置 */
const showSet = ref(false);
const show_setModel = () => {
  showSet.value = true;
};
/** 选择对应的钱包 */
const choose_wallet = (i: number) => {
  index.value = i;
  console.log("index", index);
};
const onModalAssetClose = () => {
  modalAssetStage.value = 1;
};
type ModalAssetStage = 1 | 2 | 3;
/** 1是数字货币,2是法定货币 */
type ModalAssetSageOneType = 1 | 2;
/** 第二步中的数字货币类型 */
type ModalAssetCryptoType = "bsv" | "nkn";
/** 第二步中的法定货币类型 */
type ModalAssetLegalType = "dollar" | "cny";
const modalAssetTitle = ref("");
const modalAssetStage = ref<ModalAssetStage>();
const modalAddAssetVisible = ref(false);
const modalAssetStageOneType = ref<ModalAssetSageOneType>();
/** 第二部的数字代币类型 */
const modalAssetStageTwoCryptoType = ref<ModalAssetCryptoType>();
const modalAssetStageTwoCryptoRadioOptions: ModalAssetCryptoType[] = [
  "bsv",
  "nkn",
];
/** 第二部的法定代币类型 */
const modalAssetStageTwoLegalType = ref<ModalAssetLegalType>();
const modalAssetStageThreeForm = reactive({
  address: "",
  remark: "",
  pwd: "",
});
const onClickAddAsset = () => {
  modalAssetStage.value = 1;
  modalAssetTitle.value = "第一步";
  modalAddAssetVisible.value = true;
};
const getCryptosImageUrl = (item: "bsv" | "nkn") => {
  return new URL(`../../../../assets/images/cryptos/${item}.png`, import.meta.url)
    .href;
};
const onConfirmModalAssetStage = (s: ModalAssetStage) => {
  if (s === 1) {
    console.log("stage 1");
    if (!modalAssetStageOneType.value) {
      message.info("请选择收款货币");
      return;
    }
    modalAssetTitle.value = "第二步";
    modalAssetStage.value = 2;
  } else if (s === 2) {
    console.log("stage 2");
    // TODO 检查空值

    modalAssetTitle.value = "第三步";
    modalAssetStage.value = 3;
  } else if (s === 3) {
    if (!modalAssetStageThreeForm.address) {
      message.info("请输入钱包地址");
      return;
    } else {
      message.info("祝贺添加成功");
    }

    console.log("stage 3");
  }
};
const onCloseModalAsset = () => {
  modalAddAssetVisible.value = false;
};

const onBackToModalAssetStage = (s: ModalAssetStage) => {
  // 1. 去到 stage1
  if (s === 1) {
    // 2. 去到 stage2
    modalAssetTitle.value = "第一步";
    modalAssetStage.value = 1;
  } else if (s === 2) {
    modalAssetTitle.value = "第二步";
    modalAssetStage.value = 2;
  }
};
</script>

<style scoped>
.main-con {
  display: flex;
  padding-top: 1rem;
  text-align: center;
}
</style>
