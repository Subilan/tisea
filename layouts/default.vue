<template>
    <div class="layout-default">
        <nav class="navbar">
            <div class="logo">
                <img draggable="false" @click="useRouter().push('/')" class="logo-img" src="~/assets/icons/tisea.svg" />
            </div>
            <div class="navigation-links">
                <NuxtLink class="link" to="/">首页</NuxtLink>
                <NuxtLink class="link" to="/terms">周目</NuxtLink>
                <client-only>
                    <NuxtLink v-if="!loggedIn" class="link" to="/auth">登录</NuxtLink>
                </client-only>
            </div>
            <div class="divider"></div>
            <client-only>
                <div class="avatar" v-if="loggedIn">

                </div>
                <btn @click="() => {
                    user.logout();
                    useRouter().go(0)
                }" class="solid" v-if="loggedIn">
                    登出
                </btn>
            </client-only>
        </nav>
        <slot />
    </div>
</template>

<script lang="ts">
import FUserUtil from '@/utils/FUserUtil'

export default {
    data() {
        return {
            loggedIn: false
        }
    },
    async created() {
        this.loggedIn = await FUserUtil.loggedIn();
    }
}
</script>

<style scoped lang="less">
@import '~/assets/styles/var.less';

@nav-padding: 16px;
@nav-height: 36px;

.divider {
    flex: 1;
}

.layout-default {
    margin-top: @nav-height + 2 * @nav-padding;
}

.navbar {
    position: fixed;
    top: 0;
    width: calc(100% - 2 * @nav-padding);
    padding: @nav-padding;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .2);
    height: @nav-height;
    display: flex;
    background: white;
    align-items: center;
    animation: .4s cubic-bezier(.41, .01, .03, .98) FlowDown, .4s cubic-bezier(.41, .01, .03, .98) OpacityFade;
    animation-delay: .2s;
    z-index: 1000;
    backdrop-filter: blur(10px);
    gap: 32px;
}

.navigation-links {
    display: flex;
    align-items: center;
    gap: 32px;
    font-size: 20px;
}

.link {
    text-decoration: none;
    color: rgba(0, 0, 0, .4);
    transition: all .2s ease;
    position: relative;
}

.router-link-exact-active,
.link:hover {
    color: @text-1;
}

.router-link-exact-active {
    transform: scale(1.3);
    position: relative;
}

.logo {
    display: flex;
    align-items: center;
}

.logo-img {
    height: 28px;
    cursor: pointer;
}
</style>