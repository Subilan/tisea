<template>
    <div class="auth">
        <div class="auth-box">
            <div class="auth-box-head">
                <div class="auth-box-title">
                    <div class="title-element-1">></div>Login<div v-show="titleElementShown" class="title-element-2">_</div>
                </div>

                <div class="auth-box-description">
                    登入后即可尽享 Tisea 全功能。你可以使用登录令牌或者 Oasis 的火星港账号来登录 Tisea。
                </div>
            </div>

            <div class="auth-box-textfields" v-if="currentLoginMethod === 'key'">
                <div class="auth-box-textfield">
                    <textarea placeholder="粘贴登录令牌..." class="auth-box-textfield-textarea" v-model="loginKey" type="text" />
                </div>
            </div>
            <div class="auth-box-textfields" v-else-if="currentLoginMethod === 'oasis'">
                <div class="auth-box-textfield">
                    <input placeholder="用户名" class="auth-box-textfield-input" v-model="loginData.username" type="text" />
                </div>
                <div class="auth-box-textfield">
                    <input placeholder="密码" class="auth-box-textfield-input" v-model="loginData.password" type="password" />
                </div>
            </div>

            <div class="auth-box-actions">
                <btn v-if="currentLoginMethod === 'key'" @click="currentLoginMethod = 'oasis'">使用火星港账号登录</btn>
                <btn v-if="currentLoginMethod === 'oasis'" @click="currentLoginMethod = 'key'">使用登录令牌</btn>
                <btn class="primary" @click="login()">继续</btn>
            </div>
        </div>
        <snackbar v-model="displaySnackbar">{{ snackbarInfo }}</snackbar>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})

let currentLoginMethod = 'oasis';

let titleElementShown = ref(true)

let snackbarInfo = ref('');
let displaySnackbar = false;

const loginKey = ''
const loginData = reactive({
    username: '',
    password: ''
})

function dispatchSnackbar(info: string, delay: number = 0) {
    snackbarInfo.value = info;
    if (displaySnackbar === false) {
        displaySnackbar = true;
    }
    if (delay > 0) {
        setTimeout(() => {
            displaySnackbar = false;
        }, delay);
    }
}

interface LoginResponse {
    code: number,
    status: boolean
}

function login() {
    $fetch<LoginResponse>('/api/user/login', {
        method: 'post',
        body: {
            loginType: currentLoginMethod,
            username: loginData.username,
            password: loginData.password,
            key: loginKey
        }
    }).then((r) => {
        if (r.status === true) {
            let seconds = 5;
            setInterval(() => {
                dispatchSnackbar(`登录成功，将在 ${seconds} 秒内跳转`);
                seconds -= 1;
                if (seconds === 0) {
                    if (process.client) {
                        localStorage.setItem('tisea-login-token', loginKey)
                    }
                    useRouter().push('/');
                }
            }, 1000);
        } else {
            if (r.code === 403) {
                if (currentLoginMethod === 'oasis') dispatchSnackbar('密码错误，请检查拼写是否有误', 3500);
            }
            if (currentLoginMethod === 'key') dispatchSnackbar('无效登录令牌', 3500);
        }
    })
}

onMounted(() => {
    setInterval(() => {
        titleElementShown.value = !titleElementShown.value
    }, 600);
})
</script>

<style lang="less">
@import "~/assets/styles/var.less";

.title-element-1,
.title-element-2 {
    display: inline-block;
}

.title-element-1 {
    margin-right: 1ex;
    color: #2196f3;
}

.auth {
    height: 100vh;
    width: 100vw;
    background: url(https://seati.oss-cn-qingdao.aliyuncs.com/assets/images/1.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
    font-family: Minecraft;
    font-size: 40px;
}

.auth-box-textfields {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.auth-box-textfield-input,
.auth-box-textfield-textarea {
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
        border-color: #2196f3;
    }

    &:focus {
        background: rgba(0, 0, 0, .04);
    }
}

.auth-box-textfield-textarea {
    height: 100px;
}

.auth-box-actions {
    display: flex;
    gap: 16px;
    flex-direction: row;
    justify-content: flex-end;
}
</style>