<template>
    <div class="layout-default">
        <nav class="navbar">
            <div class="logo">

            </div>
            <div class="navigation-links">
                <NuxtLink class="link" to="/">首页</NuxtLink>
                <NuxtLink class="link" to="/terms">周目</NuxtLink>
                <ClientOnly>
                    <NuxtLink v-if="!user.isUser" class="link" to="/auth">登录</NuxtLink>
                </ClientOnly>
            </div>
            <div class="divider"></div>
            <ClientOnly>
                <div class="avatar" v-if="user.isUser">

                </div>
                <btn @click="() => {
                    user.logout();
                    useRouter().go(0)
                }" class="solid" v-if="user.isUser">
                    登出
                </btn>
            </ClientOnly>
        </nav>
        <slot />
    </div>
</template>

<script setup>
import User from '@/utils/user'

const user = new User();

</script>

<style scoped lang="less">
@import '~/assets/styles/var.less';

@nav-padding: 16px;
@nav-height: 36px;

.divider {
    flex: 1;
}

.layout-default {
    margin-top: calc(@nav-height + 2 * @nav-padding);
}

.navbar {
    position: fixed;
    top: 0;
    width: calc(100% - 2 * @nav-padding);
    padding: @nav-padding;
    box-shadow: 0 1px 8px rgba(0, 0, 0, .2);
    height: @nav-height;
    display: flex;
    align-items: center;
    animation: .4s cubic-bezier(.51, .02, 0, 1.02) FlowDown, .4s cubic-bezier(.51, .02, 0, 1.02) OpacityFade;
    animation-delay: .2s;
    z-index: 1000;
    background: white;
    backdrop-filter: blur(10px);
}

.navigation-links {
    display: flex;
    align-items: center;
    gap: 32px;
    font-size: 20px;
}

.link {
    text-decoration: none;
    color: rgba(0, 0, 0, .5);
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
</style>