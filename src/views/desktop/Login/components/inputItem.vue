<template>
  <div class="loginInputBox">
    <div
      class="userName"
      :class="forcusUserNameFlag ? 'forcusUserName':'blurUserName'"
      :style="{
            borderColor: error ? 'red' : 'black'
        }"
    >
      <div
        class="identification"
        :class="forcusUserNameFlag ? 'forcusName':'blurName'"
        :style="{
                color: error && forcusUserNameFlag ? 'red' : 
                 forcusUserNameFlag ? 'black' : '#cccccc'
            }"
      >{{text}}*</div>
      <div class="inputBox">
        <input
          v-model="value"
          :type="type ? 'text': 'password'"
          @focus="inputUserName"
          @blur="blurUserName"
          @input="onChange"
        />
      </div>
      <div class="icon" @click="sendConfirm">
        <img :src="icon" class="w-6 h-6" v-if="icon" />
        <span class="code" v-else>发送</span>
      </div>
    </div>
    <div class="error" :style="{
        display: error ? 'block' : 'none'
    }">{{error}}</div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, reactive, ref, toRaw, defineProps, defineEmits } from "vue";
import urlUserName from "../../../../assets/images/nkn_gray.png";
const props = defineProps({
  // type 代表是否是非密码框，默认是普通的输入框
  type: {
    type: Boolean,
    default: true
  },
  // 是否存在icon图标
  icon: {
    type: String,
    default: ""
  },
  // 文案
  text: {
    type: String,
    default: "邮箱"
  },
  error: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["onChange", "ok"]);
const { type } = props;
const value = ref('');
const forcusUserNameFlag = ref(false); // username的输入框是否聚集焦点
const inputUserName = () => {
  forcusUserNameFlag.value = true;
};
const blurUserName = (e: any) => {
  if (e.target.value) return;
  forcusUserNameFlag.value = false;
};
const onChange = (e: any) => {
  emit('onChange', e.target.value)
};
const sendConfirm = (e: any) => {
  emit('ok', {
      value: value.value
  })
};
console.log(props, "======");
</script>

<style lang="less" scoped>
.loginInputBox {
  margin-bottom: 22px;
  .userName {
    width: 100%;
    height: 45px;
    // border: 1px solid black;
    display: flex;
    line-height: 36px;
    border-radius: 5px;
    padding-left: 10px;
    position: relative;
    .forcusName {
      font-size: 10px;
      color: black;
      position: absolute;
      top: -20px;
      background-color: white;
      padding: 0 5px;
      transition: top 3s ease-in 2s;
    }
    .blurName {
      color: #cccccc;
      font-size: 15px;
      transition: top 3s;
    }
    .inputBox {
      z-index: 1;
      flex: 1;
      margin-top: 3px;
      overflow: hidden;
      input {
        width: 100%;
      }
    }
    .icon {
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
      .code {
        color: #03a9f4;
        font-size: 10px;
      }
    }
  }
  .forcusUserName {
    border: 2px solid black;
  }
  .blurUserName {
    border: 1px solid #cccccc;
  }
  .error {
    font-size: 10px;
    color: red;
    margin-top: 6px;
    display: none;
  }
}
</style>