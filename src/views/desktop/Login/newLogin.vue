<template>
  <div class="loginBox">
    <div class="loginContent">
      <div class="loginPanel">
        <!-- logo区域 -->
        <div class="logo">
          <div
            class="inline-block w-20 h-20 flex items-center justify-center"
            :style="{
              filter: 'drop-shadow(0px 0px 8px #231F20)',
            }"
          >
            <XSvgIcon
              icon="logoWhiteBorder"
              :size="22.1"
              :style="{
                transform: 'scale(3)',
              }"
            />
          </div>
        </div>
        <!-- 操作区域 -->
        <div class="optionBox">
          <div class="title">
            <span class="welcom">{{ $t("pageLogin.welcomeUsage") }}</span>
            <span class="version">{{ $t("pageLogin.productVer") }}</span>
          </div>
          <div class="des">
            {{ $t("pageLogin.signInDesc") }}
            <!-- 比特网盘使您安全地发行和使用各类通证及数字版权🏦 💳并且在任意设备上与朋友, 同事及客户智慧协作🎉💰 -->
          </div>
          <!-- 输入框 -->
          <!-- 用户名 -->
          <InputItem
            :type="true"
            :text="'邮箱'"
            :icon="urlUserName"
            :error="emailError"
            @onChange="getEmail"
            @ok="emailOk"
          ></InputItem>
          <!-- 密码框 -->
          <InputItem :type="false" :text="'密码'" :icon="hiddenPassword"></InputItem>
          <!-- 验证码 -->
          <!-- <InputItem :type='false' :text="'验证码'"></InputItem> -->
          <div class="optionSelect">
            <div class="forgetPassword">忘记密码？</div>
            <div class="forgetPassword">WebAuthn</div>
            <div class="sumbit">登录</div>
          </div>
          <div class="noAccount">
            <span class="noAccountDes">还没有账号？</span>
            <span class="goSign">马上注册👉</span>
          </div>
        </div>
      </div>
      <div class="bgImg">
        <img src="../../../assets/images/login_bg.jpg" alt />
        <div class="hashCode">
          <span>#</span>
          <span>{{hashContent}}</span>
          <!-- #{{hashContent}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import urlUserName from "../../../assets/images/nkn_gray.png";
import hiddenPassword from "../../../assets/svg/hidden-password.svg";
import { XSvgIcon, XLocaleSwither } from "../../../components/desktop";
import { defineComponent, reactive, ref, toRaw } from "vue";
import InputItem from "./components/inputItem.vue";
const forcusUserNameFlag = ref(false); // username的输入框是否聚集焦点
const emailError = ref("");
const getEmail = (value: any) => {
  console.log("value", value);
  emailError.value = "对不起，邮箱错误";
};
// emailOk
const emailOk = (value: any) => {
  console.log("value", value);
  emailError.value = "";
};
/** 头部hash start*/
const hashContent = ref<string>(
  "77fbeed45a8f630e68c984cdc408ca88e67b8683fbebd5288bd9f8d03632acc2"
);
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  background-color: #9e9e9e36;
  padding: 100px;
  .loginContent {
    width: 100%;
    height: 100%;
    display: flex;
    .loginPanel {
      width: 440px;
      background: white;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      padding-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }
      .optionBox {
        .title {
          margin-bottom: 6px;
          .welcom {
            font-size: 20px;
            padding-right: 15px;
          }
          .version {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .des {
          color: #cccccc;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 1px;
          margin-bottom: 30px;
        }
        .optionSelect {
          display: flex;
          justify-content: space-between;
          margin-top: 80px;
          color: #03a9f4;
          font-size: 13px;
          cursor: pointer;
          height: 40px;
          line-height: 40px;
          font-weight: 600;
          .sumbit {
            background-color: #2196f3;
            color: white;
            border-radius: 5px;
            width: 80px;
            text-align: center;
            font-size: 10px;
          }
        }
        .noAccount {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          font-size: 13px;
          color: rgba(117, 117, 117, 1);
          cursor: pointer;
          .goSign {
            color: #03a9f4;
          }
        }
      }
    }
    .bgImg {
      flex: 1;
      background: rgb(20, 20, 20);
      padding-top: 50px;
      padding-bottom: 50px;
      box-sizing: border-box;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .hashCode {
        width: 20px;
        height: 20px;
        font-size: 10px;
        color: white;
        //   background-color: red;
        position: absolute;
        top: 53px;
        right: 8px;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
      }
      .hashCode:hover {
        animation: move 0.5s cubic-bezier(0.17, 0.86, 0.73, 0.14) 1;
        animation-fill-mode: forwards;
        border-radius: 8px;
        box-sizing: border-box;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}

@keyframes move {
  40% {
    width: 100px;
  }
  80% {
    width: 200px;
  }
  to {
    width: 500px;
  }
}
</style>