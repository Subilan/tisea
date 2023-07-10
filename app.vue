<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <div class="snackbar-container">
      <snackbar v-model="snackbarGlobal.display" v-html="snackbarGlobal.text"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useSnackbar, useUser} from "~/lib/common/futils/states";
import {setOnlineStatus} from "~/lib/common/futils/common";
import 'normalize.css';


const snackbarGlobal = useSnackbar();
const user = useUser();

function updateOnlineStatus() {
  if (user.value.ready) {
    setOnlineStatus(document.visibilityState === 'visible');
  }
}

onMounted(() => {
  updateOnlineStatus();
})

if (process.client) {
  window.addEventListener("visibilitychange", () => {
    updateOnlineStatus();
  })
}
</script>

<style lang="less">
.snackbar-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.default-fade-enter-active,
.default-fade-leave-active {
  transition: all .2s;
}

.default-fade-enter-from,
.default-fade-leave-to {
  opacity: 0;
}

.default-fade-enter-to,
.default-fade-enter-from {
  opacity: 1;
}
</style>