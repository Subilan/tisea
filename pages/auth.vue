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
            <span class="mdi mdi-information-outline"/> 使用火星港账号登录后将自动注册
          </notice-bar>
        </div>
      </div>

      <div class="auth-box-textfields" v-if="!registering">
        <div class="auth-box-textfield">
          <span class="mdi mdi-account-circle"/>
          <input placeholder="用户名" class="auth-box-textfield-input" v-model="loginData.displayname" type="text"/>
        </div>
        <div class="auth-box-textfield">
          <span class="mdi mdi-key"/>
          <input placeholder="密码" @keydown="ev => {
                        if (ev.key == 'Enter') {
                            console.log('login')
                            login();
                        }
                    }" class="auth-box-textfield-input" v-model="loginData.password"
                 type="password"/>
        </div>
      </div>
      <div class="auth-box-textfields" v-if="registering">
        <div class="auth-box-textfield">
          <span class="mdi mdi-account-circle"/>
          <input placeholder="用户名" class="auth-box-textfield-input" v-model="registrationData.displayname" type="text"/>
        </div>
        <div class="auth-box-textfield">
          <span class="mdi mdi-minecraft"/>
          <input placeholder="Minecraft 游戏名" class="auth-box-textfield-input" v-model="registrationData.minecraft" type="text"/>
        </div>
        <div class="auth-box-textfield">
          <span class="mdi mdi-key"/>
          <input placeholder="密码" class="auth-box-textfield-input" v-model="registrationData.password"
                 type="password"/>
        </div>
        <div class="auth-box-textfield">
          <span class="mdi mdi-shield-key"/>
          <input placeholder="确认密码" class="auth-box-textfield-input" v-model="passwordV"
                 type="password"/>
        </div>
      </div>

      <div class="auth-box-divider"/>

      <div class="auth-box-actions">
        <btn class="primary" v-if="!registering" @click="login()">登录</btn>
        <btn class="primary" v-if="registering" @click="register()">注册</btn>
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
let loginData: Partial<IUserCreation> = {
  displayname: '',
  password: '',
}
let registrationData: Partial<IUserCreation> = {
  displayname: '',
  password: '',
  oasis: null,
  minecraft: ''
}
let passwordV = ''

function login() {

}

function register() {

}

onMounted(() => {
  setInterval(() => {
    titleUnderscoreShown.value = !titleUnderscoreShown.value;
  }, 600);
})
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

.auth-box-textfield-input {
  outline: none;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, .2);
  transition: all .2s ease;
  font-size: 16px;
  width: calc(100% - 18px);
  resize: none;

  padding: 8px;
  font-family: Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;

  &:hover,
  &:focus {
    border-color: #00bcd4;
  }

  &:focus {
    background: rgba(0, 0, 0, .04);
  }
}

.auth-box-textfield {
  display: flex;
  align-items: center;
  gap: 16px;
  .mdi::before {
    font-size: 28px;
    color: rgba(0, 0, 0, .6);
  }
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