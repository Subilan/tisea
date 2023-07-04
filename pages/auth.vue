<template>
  <div class="auth">
    <div class="auth-box">
      <div class="auth-box-head">
        <div class="auth-box-title" v-if="!registering">
          <div class="title-element-1">></div><!---->Login<!---->
          <div v-show="titleUnderscoreShown" class="title-element-2">_</div>
        </div>
        <div class="auth-box-title" v-else>
          <div class="title-element-1">></div><!---->Register<!---->
          <div v-show="titleUnderscoreShown" class="title-element-2">_</div>
        </div>

        <div class="auth-box-description" v-if="!registering">
          登入 Tisea 账号即可尽享所有功能，支持与游戏内角色创建关联，随时随地与服务器联系。
          <notice-bar v-if="method === 'oasis'">
            <span class="mdi mdi-check-decagram-outline"/> 当前正在使用火星港账号登录
          </notice-bar>
        </div>
        <div class="auth-box-description" v-else>
          若要注册一个 Tisea 账号，请填写下列信息。
          <notice-bar>
            <span class="mdi mdi-information-outline"/> 你也可以使用火星港账号登录来自动注册
          </notice-bar>
        </div>
      </div>

      <div class="auth-box-textfields" v-if="!registering">
        <textfield placeholder="用户名" icon="mdi-account-circle" type="text" v-model="loginData.displayname"/>
        <textfield placeholder="密码" icon="mdi-key" type="password" v-model="loginData.password"/>
      </div>
      <div class="auth-box-textfields" v-if="registering">
        <textfield placeholder="用户名" :error-text="errorTexts.displayname" icon="mdi-account-circle" type="text"
                   v-model="registrationData.displayname"/>
        <textfield placeholder="Minecraft 游戏名" :error-text="errorTexts.minecraft" icon="mdi-minecraft" type="text"
                   v-model="registrationData.minecraft"/>
        <textfield placeholder="密码" icon="mdi-key" :error-text="errorTexts.password" type="password"
                   v-model="registrationData.password"/>
        <textfield placeholder="确认密码" :error-text="errorTexts.passwordV" icon="mdi-shield-key" type="password"
                   v-model="passwordV"/>
      </div>

      <div class="auth-box-divider"/>

      <div class="auth-box-actions">
        <btn class="primary" v-if="!registering" @click="login()">登录</btn>
        <btn :disabled="!canRegister" class="primary" v-if="registering" @click="register()">注册</btn>
        <btn class="white" v-if="registering" @click="registering = false">转到登录</btn>
        <btn class="white" v-if="!registering" @click="registering = true">转到注册</btn>
        <btn class="white">使用火星港账号登录</btn>
      </div>
    </div>
    <snackbar v-model="snackbar.display">{{ snackbar.text }}</snackbar>
  </div>
</template>

<script lang="ts" setup>
import NoticeBar from "~/components/notice-bar.vue";
import {bindProperties} from "~/server/utils/common";

definePageMeta({
  layout: false
})

let titleUnderscoreShown = ref(false);
let registering = false;
let method: UserRegType = 'common';
let snackbar = {
  display: false,
  text: ''
}
let loginData = reactive({
  displayname: '',
  password: '',
})
let registrationData = reactive({
  displayname: '',
  password: '',
  oasis: null,
  minecraft: ''
})
let errorTexts = {
  displayname: '',
  minecraft: '',
  password: '',
  passwordV: ''
}
let passwordV = ref('')

let validation = computed(() => {
  return {
    displayname: /^(?=.{6,18}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(registrationData.displayname ?? '') || registrationData.displayname.length === 0 ? '' : '6~18 位英文或数字，不能以特殊符号开头或结尾',
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(registrationData.password ?? '') || registrationData.password.length === 0 ? '' : '至少 8 位且包含一位字母和数字',
    minecraft: /^[a-zA-Z0-9_]{2,16}$/mg.test(registrationData.minecraft ?? '') || registrationData.minecraft.length === 0 ? '' : '不是有效的 Minecraft 游戏名格式',
    passwordV: (passwordV.value === registrationData.password || registrationData.password.length === 0 || passwordV.value.length === 0) ? '' : '两次密码输入不一致'
  }
})

let canRegister = computed(() => {
  return Object.values(validation.value).filter(x => x !== '').length === 0
      && Object.values(registrationData).filter(x => typeof x === 'string' ? x.length > 0 : x === null).length === Object.keys(registrationData).length;
})

function login() {

}

function register() {

}

onMounted(() => {
  setInterval(() => {
    titleUnderscoreShown.value = !titleUnderscoreShown.value;
  }, 600);
})

watch(() => validation, v => {
  const val = v.value;
  bindProperties(errorTexts, val);
}, {deep: true})
</script>

<style lang="less">
@import "@/assets/styles/var.less";

.title-element-1,
.title-element-2 {
  display: inline-block;
}

.title-element-1 {
  margin-right: 1ex;
  color: #00bcd4;
}

.auth {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background: url(https://seati.oss-cn-qingdao.aliyuncs.com/assets/images/1.jpg) no-repeat center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-box-head {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 1.5;
  gap: 16px;
}

.auth-box-divider {
  display: block;
  border-bottom: 1px dotted rgba(0, 0, 0, .2);
  margin: 8px 0;
}

.auth-box {
  width: 400px;
  padding: 32px;
  color: @text-1;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);

  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-box-title {
  font-family: Minecraft, ui-monospace, monospace;
  font-size: 40px;
}

.auth-box-textfields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-box-actions {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  text-align: center;
  align-items: stretch;
}
</style>