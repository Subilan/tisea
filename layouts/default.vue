<template>
  <div class="layout-default">
    <nav class="navbar">
      <div class="logo">
        <img draggable="false" @click="useRouter().push('/')" class="logo-img" src="/assets/icons/tisea.svg"/>
      </div>
      <div class="navigation-links">
        <NuxtLink class="link" to="/">动态</NuxtLink>
        <NuxtLink class="link" to="/terms">周目</NuxtLink>
        <client-only>
          <NuxtLink v-if="!user.ready" class="link" to="/auth">登录</NuxtLink>
        </client-only>
      </div>
      <div class="divider"></div>
      <client-only>
        <div class="misc">
          <avatar width="36px" :src="user.target.avatar" :ready="user.ready"/>
          <btn @click="out()" class="solid" v-if="user.ready">
            <template v-if="loading.logoutBtn">
              <spinner-diamond color="#00bcd4" size="20px"/>
            </template>
            <template v-else>
              登出
            </template>
          </btn>
        </div>
      </client-only>
    </nav>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import {useUser} from "~/lib/common/futils/states";
import {logout} from '~/lib/common/futils/common';
import {useRouter} from "#app/composables/router";

const user = useUser();

const loading = reactive({
  logoutBtn: false
})

async function out() {
  loading.logoutBtn = true;
  if (await logout()) {
    useRouter().go(0);
  } else {
    // error dialog
  }
  loading.logoutBtn = false;
}
</script>

<style scoped lang="less">
@import '@/assets/styles/var';

.avatar {
  display: flex;
  align-items: center;
}

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

.misc {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: row;
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