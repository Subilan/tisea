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

      <div class="textfield-container" v-if="!registering && method === 'oasis'">
        <textfield placeholder="Oasis 用户名" icon="mdi-account-circle" type="text" v-model="loginDataOasis.username"/>
        <textfield placeholder="Oasis 密码" icon="mdi-key" type="password" v-model="loginDataOasis.password"/>
      </div>
      <div class="textfield-container" v-if="!registering && method === 'common'">
        <textfield placeholder="用户名" icon="mdi-account-circle" type="text" v-model="loginData.username"/>
        <textfield placeholder="密码" icon="mdi-key" type="password" v-model="loginData.password"/>
      </div>
      <div class="textfield-container" v-if="registering">
        <textfield placeholder="用户名" :error-text="errorTexts.username" icon="mdi-account-circle" type="text"
                   v-model="registrationData.username"/>
        <textfield placeholder="Minecraft 游戏名" :error-text="errorTexts.minecraft" icon="mdi-minecraft" type="text"
                   v-model="registrationData.minecraft"/>
        <textfield placeholder="密码" icon="mdi-key" :error-text="errorTexts.password" type="password"
                   v-model="registrationData.password"/>
        <textfield placeholder="确认密码" icon="mdi-shield-key" :error-text="errorTexts.passwordV" type="password"
                   v-model="passwordV"/>
      </div>

      <div class="auth-box-divider"/>

      <div class="auth-box-actions">
        <btn :loading="loading.login" class="primary" v-if="!registering && method === 'oasis'"
             @click="loginWithOasis()">
          使用火星港账号登录
        </btn>
        <btn :loading="loading.login" class="primary" v-if="!registering && method === 'common'" @click="login()">
          登录
        </btn>
        <btn :disabled="!canRegister" class="primary" v-if="registering" @click="dialogs.needToBindOasis = true">注册
        </btn>
        <btn class="white" v-if="registering && method === 'common'" @click="registering = false">转到登录</btn>
        <btn class="white" v-if="!registering && method === 'common'" @click="registering = true">转到注册</btn>
        <btn class="white" v-if="method !== 'oasis'" @click="registering = false; method = 'oasis'">使用火星港账号登录
        </btn>
        <btn class="white" v-if="method === 'oasis'" @click="registering = false; method = 'common'">转到通用登录</btn>
        <btn class="white" v-if="method === 'oasis'" @click="registering = true; method = 'common'">转到通用注册</btn>
      </div>
    </div>
    <dlg :cover="false" v-model="dialogs.authInformation">
      <template #title>
        发生了一些问题
      </template>
      <template #content>
        <p>服务器在处理信息时发生了一些问题，返回的错误信息如下。</p>
        <notice-bar target-class="warn">
          <span class="mdi mdi-alert-outline"/> 如果问题看起来难以解决，请联系管理员
        </notice-bar>
        <p v-html="authInformationHtml"/>
      </template>
      <template #actions>
        <btn class="primary" @click="dialogs.authInformation = false">关闭</btn>
      </template>
    </dlg>
    <dlg :cover="true" v-model="dialogs.needToBindOasis">
      <template #title>
        推荐立即绑定火星港账号
      </template>
      <template #content>
        <p>火星港是 Oasis 官方开设的玩家交流社区，起到综合 Oasis 服务器信息的作用。如果你有火星港账号，可以将其与你所创建的
          Tisea 账号直接绑定，使用起来更加方便快捷。未来我们也将推出更多联动功能。</p>
        <p>你也可以稍后在后台处绑定。</p>
        <p>没有火星港账号？花两分钟
          <r href="https://i.oases.red/register">立即注册</r>
          一个吧。
        </p>
      </template>
      <template #actions>
        <btn class="primary" @click="dialogs.needToBindOasis = false; dialogs.bindOasis = true;">现在绑定</btn>
        <btn class="primary" :loading="loading.register" @click="register()">
          不绑定注册
        </btn>
        <btn class="white" @click="dialogs.needToBindOasis = false">取消</btn>
      </template>
    </dlg>
    <dlg :cover="true" v-model="dialogs.bindOasis">
      <template #title>
        绑定火星港账号
      </template>
      <template #content>
        <p>我们将会自动登录你的账号并绑定。</p>
        <div class="textfield-container" style="min-width: 400px">
          <textfield placeholder="Oasis 用户名" icon="mdi-account-circle" type="text"
                     v-model="loginDataOasis.username"/>
          <textfield placeholder="Oasis 密码" icon="mdi-key" type="password" v-model="loginDataOasis.password"/>
        </div>
      </template>
      <template #actions>
        <btn :loading="loading.register" class="primary" @click="bindOasisAndRegister()">
          绑定并注册
        </btn>
        <btn class="white" @click="dialogs.bindOasis = false; dialogs.needToBindOasis = true">上一步</btn>
      </template>
    </dlg>
  </div>
</template>

<script lang="ts" setup>
import NoticeBar from "~/components/notice-bar.vue";
import {bindProperties} from "~/server/utils/common";
import Storage from "~/utils/storage";
import {doAction} from "~/utils/common";
import {loginOasis} from "~/server/utils/common";
import {dispatchSnackbar} from "~/utils/states";
import {useRouter} from "#app/composables/router";

definePageMeta({
  layout: false,
  middleware: 'auth-excepted'
})

let titleUnderscoreShown = ref(false);
let authInformationHtml: Nullable<string> = '';
let registering = location.hash === '#register';
let method: UserRegType = 'common';
let dialogs = reactive({
  authInformation: false,
  needToBindOasis: false,
  bindOasis: false
})
let loginData = reactive({
  username: '',
  password: '',
})

let loginDataOasis = reactive({
  username: '',
  password: ''
})

let registrationData = reactive({
  username: '',
  password: '',
  oasis: null as Nullable<OasisUserObject>,
  minecraft: ''
})

let loading = reactive({
  login: false,
  register: false
})

let errorTexts = {
  username: '',
  minecraft: '',
  password: '',
  passwordV: ''
}


let passwordV = ref('')

let validation = computed(() => {
  return {
    username: /^(?=.{6,18}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(registrationData.username ?? '') || registrationData.username.length === 0 ? '' : '6~18 位英文或数字，不能以特殊符号开头或结尾',
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(registrationData.password ?? '') || registrationData.password.length === 0 ? '' : '至少 8 位且包含一位字母和数字',
    minecraft: /^[a-zA-Z0-9_]{2,16}$/mg.test(registrationData.minecraft ?? '') || registrationData.minecraft.length === 0 ? '' : '不是有效的 Minecraft 游戏名格式',
    passwordV: (passwordV.value === registrationData.password || (registrationData.password.length === 0 && passwordV.value.length === 0)) ? '' : '两次密码输入不一致'
  }
})

let canRegister = computed(() => {
  return Object.values(validation.value).filter(x => x !== '').length === 0
      && Object.values(registrationData).filter(x => typeof x === 'string' ? x.length > 0 : x === null).length === Object.keys(registrationData).length;
})

async function login() {
  loading.login = true;
  const r = await doAction("user.login", loginData);
  if (r.state !== 'ok') {
    dispatchSnackbar(`登录失败：${r.msg}`);
    loading.login = false;
    return;
  }
  Storage.token = r.data;
  loading.login = false;
  await useRouter().push('/');
}

async function bindOasisAndRegister() {
  loading.register = true;
  const r = await post<OasisUserObject>("/api/common/user/legacy-oasis-login", loginDataOasis);
  if (r.state !== 'ok') {
    dialogs.bindOasis = false;
    dispatchSnackbar(`无法登录 Oasis：${r.msg}`);
    loading.register = false;
    return;
  }
  registrationData.oasis = r.data;
  await register();
  loading.register = false;
}

async function loginWithOasis() {
  loading.login = true;
  const result = await doAction("user.login.oasis", {
    username: loginDataOasis.username,
    password: loginDataOasis.password
  });
  loading.login = false;
  if (result) {
    if (result.state === 'ok') {
      Storage.token = result.data;
      await useRouter().push("/");
    } else {
      authInformationHtml = result.msg;
      dialogs.authInformation = true;
    }
  }
}

async function register() {
  loading.register = true;
  const result = await doAction("user.create", registrationData)
  loading.register = false;
  if (result) {
    if (result.state === 'ok') {
      Storage.token = result.data;
      await useRouter().push("/");
    } else {
      authInformationHtml = result.msg;
      dialogs.authInformation = true;
    }
  }
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

.auth-box-actions {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  text-align: center;
  align-items: stretch;
}
</style>