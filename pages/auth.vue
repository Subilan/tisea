<template>
  <div class="auth">
    <help>
      <template #title>
        登录帮助
      </template>
      <template #content>
        <div v-html="articles.auth"/>
      </template>
      <template #actions="{ close }">
        <btn class="primary" @click="close()">关闭</btn>
      </template>
    </help>
    <div class="auth-box">
      <div class="auth-box-head">
        <div class="auth-box-title" v-if="!registering">
          <div class="title-element-1">></div><!---->{{ method === 'oasis' ? 'Oasis ' : '' }}Login<!---->
          <div v-show="titleUnderscoreShown" class="title-element-2">_</div>
        </div>
        <div class="auth-box-title" v-else>
          <div class="title-element-1">></div><!---->Register<!---->
          <div v-show="titleUnderscoreShown" class="title-element-2">_</div>
        </div>

        <div class="auth-box-description" v-if="!registering">
          登入 Tisea 账号即可尽享所有功能，支持与游戏内角色创建关联，随时随地与服务器联系。
          <notice-bar v-if="method === 'oasis' && oasisNotRegistered">
            <span class="mdi mdi-account-arrow-left"/>
            未注册用户登入后将自动以火星港用户名注册
          </notice-bar>
        </div>
        <div class="auth-box-description" v-else>
          若要注册一个 Tisea 账号，请填写下列信息。
        </div>
      </div>

      <div class="textfield-container" v-if="!registering && method === 'oasis'">
        <textfield placeholder="火星港用户名" icon="mdi-account-circle" type="text" v-model="loginDataOasis.username"/>
        <textfield placeholder="火星港密码" icon="mdi-key" type="password" v-model="loginDataOasis.password"/>
        <sel icon="mdi-clock" placeholder="会话期限" v-model="loginDataOasis.expiration"
             :options="tokenExpirationSelectionObject"/>
      </div>
      <div class="textfield-container" v-if="!registering && method === 'common'">
        <textfield placeholder="用户名" icon="mdi-account-circle" type="text" v-model="loginData.username"/>
        <textfield placeholder="密码" icon="mdi-key" type="password" v-model="loginData.password"/>
        <sel icon="mdi-clock" placeholder="会话期限" v-model="loginData.expiration"
             :options="tokenExpirationSelectionObject"/>
      </div>
      <div class="textfield-container" v-if="registering">
        <textfield placeholder="用户名" :error-text="errorTextDynamic.username || errorTextStatic.username"
                   icon="mdi-account-circle" type="text"
                   v-model="registrationData.username"/>
        <textfield placeholder="Minecraft 游戏名" :error-text="errorTextDynamic.minecraft || errorTextStatic.minecraft"
                   icon="mdi-minecraft" type="text"
                   v-model="registrationData.minecraft"/>
        <textfield placeholder="密码" icon="mdi-key" :error-text="errorTextStatic.password" type="password"
                   v-model="registrationData.password"/>
        <textfield placeholder="确认密码" icon="mdi-shield-key" :error-text="errorTextStatic.passwordV" type="password"
                   v-model="passwordV"/>
        <sel icon="mdi-clock" placeholder="会话期限" v-model="registrationData.expiration"
             :options="tokenExpirationSelectionObject"/>
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
import {bindProperties} from "~/lib/common/butils/common";
import Storage from "~/lib/common/futils/storage";
import {checkValue, doAction, post} from "~/lib/common/futils/common";
import {translate as t} from "~/lib/common/futils/common";
import {dispatchSnackbar} from "~/lib/common/futils/states";
import {useRouter} from "#app/composables/router";
import {tokenExpirationSelectionObject} from "~/lib/common/template/token-expiration";
import {VueCookies} from "vue-cookies";
import Help from "~/components/help.vue";
import articles from '@/assets/help.json';

definePageMeta({
  layout: false,
  middleware: 'auth-excepted'
})

const cookies = inject<VueCookies>('$cookies') as VueCookies;

function updateExpirationCookie(exp: string) {
  cookies.set('tisea-login-session-expiration', exp);
}

function getExpirationCookie(): TokenExpiration | '' {
  return cookies.get('tisea-login-session-expiration') || ''
}

let oasisNotRegistered = ref(false);
let titleUnderscoreShown = ref(false);
let authInformationHtml: Nullable<string> = '';
let registering = location.hash === '#register';
let method: UserRegType = 'common';
let dialogs = reactive({
  authInformation: false,
  needToBindOasis: false,
  bindOasis: false,
  duplicateOasis: false
})

let loginData = reactive({
  username: '',
  password: '',
  expiration: getExpirationCookie()
})

let loginDataOasis = reactive({
  username: '',
  password: '',
  expiration: getExpirationCookie()
})

let registrationData = reactive({
  username: '',
  password: '',
  oasis: null as Nullable<OasisUserObject>,
  minecraft: '',
  expiration: getExpirationCookie()
})

let loading = reactive({
  login: false,
  register: false
})

let errorTextStatic = {
  username: '',
  minecraft: '',
  password: '',
  passwordV: ''
}

let errorTextDynamic = {
  username: '',
  minecraft: ''
}

let passwordV = ref('')

let validation = computed(() => {
  return {
    username: /^(?=.{6,18}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(registrationData.username ?? '') || registrationData.username.length === 0 ? '' : '6~18 位英文或数字，不能以特殊符号开头或结尾',
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\$\*\.\-@~&%\{\}><\^\+\d]{8,}$/.test(registrationData.password ?? '') || registrationData.password.length === 0 ? '' : '至少 8 位且包含一位字母和数字',
    minecraft: /^[a-zA-Z0-9_]{2,16}$/mg.test(registrationData.minecraft ?? '') || registrationData.minecraft.length === 0 ? '' : '不是有效的 Minecraft 游戏名格式',
    passwordV: (passwordV.value === registrationData.password || (registrationData.password.length === 0 && passwordV.value.length === 0)) ? '' : '两次密码输入不一致'
  }
})

let canRegister = computed(() => {
  return Object.values(validation.value).filter(x => x !== '').length === 0
      && Object.values(registrationData).filter(x => typeof x === 'string' ? x.length > 0 : x === null).length === Object.keys(registrationData).length
      && Object.values(errorTextStatic).filter(x => x !== '').length === 0;
})

async function login() {
  loading.login = true;
  const r = await doAction("user.login", loginData);
  if (r.state !== 'ok') {
    dispatchSnackbar(`${t(r.msg, 'login')}`);
    loading.login = false;
    return;
  }
  Storage.token = r.data;
  loading.login = false;
  updateExpirationCookie(loginData.expiration)
  await useRouter().push('/');
}

async function bindOasisAndRegister() {
  loading.register = true;
  const check = await checkValue(loginDataOasis.username, 'user.oasis.uniqueness');
  if (!check) {
    loading.register = false;
    dialogs.bindOasis = false;
    dispatchSnackbar("该火星港账号已被其它用户绑定");
    return;
  }
  const r = await post<OasisUserObject>("/api/common/user/legacy-oasis-login", loginDataOasis);
  if (r.state !== 'ok') {
    loading.register = false;
    dialogs.bindOasis = false;
    dispatchSnackbar(`${t(r.msg, 'login')}`);
    return;
  }
  registrationData.oasis = r.data;
  await register();
  loading.register = false;
}

async function loginWithOasis() {
  loading.login = true;
  const r = await doAction("user.login.oasis", {
    username: loginDataOasis.username,
    password: loginDataOasis.password
  });
  loading.login = false;
  if (r.state === 'ok') {
    Storage.token = r.data;
    updateExpirationCookie(loginDataOasis.expiration)
    await useRouter().push("/");
  } else {
    dispatchSnackbar(`${t(r.msg, 'login')}`);
  }
}

async function register() {
  loading.register = true;
  const r = await doAction("user.create", registrationData)
  loading.register = false;
  if (r) {
    if (r.state === 'ok') {
      Storage.token = r.data;
      updateExpirationCookie(registrationData.expiration)
      await useRouter().push("/");
    } else {
      dispatchSnackbar(`${t(r.msg, 'login')}`);
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
  bindProperties(errorTextStatic, val);
}, {deep: true})

watch(() => registrationData.username, async v => {
  if (v.length === 0) return;
  if (!await checkValue(v, 'user.username.uniqueness')) {
    errorTextDynamic.username = '此用户名已被占用';
    return;
  }
  errorTextDynamic.username = '';
})

watch(() => registrationData.minecraft, async v => {
  if (v.length === 0) return;
  if (!await checkValue(v, 'user.minecraft.valid')) {
    errorTextDynamic.minecraft = '此玩家不存在';
    return;
  }
  if (!await checkValue(v, 'user.minecraft.uniqueness')) {
    errorTextDynamic.minecraft = '此玩家已被绑定至其它用户';
    return;
  }
  errorTextDynamic.minecraft = ''
});

watch(() => loginDataOasis.username, async v => {
  if (v.length === 0) {
    oasisNotRegistered.value = false;
    return;
  }
  oasisNotRegistered.value = await checkValue(v, "user.oasis.uniqueness");
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

.auth-box-actions {
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  text-align: center;
  align-items: stretch;
}
</style>