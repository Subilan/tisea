<template>
  <div class="dropdown-menu">
    <div
         :id="`menu-activator-${uid}`" @click="() => {
           menuDisplay = true;
           timeout(() => {
             menuOpen = !menuOpen
           }, 1)
         } " class="content">
      <slot/>
    </div>
    <div :id="`menu-wrapper-${uid}`" class="menu-wrapper">
      <div :class="{active: menuOpen}" :style="{display: menuDisplay ? 'block' : 'none'}" class="menu">
        <slot name="menu"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from "#imports";
import {getRandomString} from "~/server/utils/common";

const menuOpen = ref(false);
const menuDisplay = ref(false);
let uid = getRandomString(6);

const timeout = setTimeout.bind(window);

function clickOutsideHandler(e: MouseEvent) {
  const el = e.target as HTMLElement;
  const closestActivator: HTMLElement | null = el.closest("[id^='menu-activator']");
  const closedWrapper: HTMLElement | null = el.closest("[id^='menu-wrapper']");
  // satisfied when clicking outside the 'dropdown self-handling area'.
  if (closestActivator === null && closedWrapper === null) {
    menuOpen.value = false;
  }
}

function clickMenuItemHandler() {
  menuOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler);

  document.querySelectorAll(`#menu-wrapper-${uid} .menu-item`).forEach(e => {
    e.addEventListener('click', clickMenuItemHandler);
  })
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutsideHandler);

  document.querySelectorAll(`#menu-wrapper-${uid} .menu-item`).forEach(e => {
    e.removeEventListener('click', clickMenuItemHandler);
  })
})

watch(() => menuOpen.value, v => {
  if (v === false) {
    setTimeout(() => {
      menuDisplay.value = false;
    }, 200)
  }
})
</script>

<style lang="less">
.menu-item {
  padding: .2rem .4rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .6rem;

  .mdi::before {
    font-size: 1.2rem;
    color: #00bcd4;
  }

  &:hover {
    background: #e0f7fa;
  }
}
</style>

<style scoped lang="less">
.dropdown-menu {
  position: relative;
}

.menu-wrapper {
  position: absolute;
  top: calc(110%);
  right: 50%;
  transform: translateX(50%);
  z-index: 300;
}

.menu {
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  border: 1px solid rgba(0, 0, 0, .2);
  padding: .2rem;
  width: max-content;
  display: block;
  position: relative;
  text-align: center;
  border-radius: 5px;
  font-size: 1rem;
  pointer-events: none;

  transform: translateY(-4px) scale(.85);
  opacity: 0;
  transition: all .2s cubic-bezier(.84, 0, .24, 1.03);

  &.active {
    transform: translateY(0) scale(1);
    opacity: 1;
    pointer-events: all;
  }
}
</style>