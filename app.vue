<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
    <div class="snackbar-container">
      <snackbar v-model="snackbarGlobal.display" v-html="snackbarGlobal.text"/>
    </div>
	</div>
</template>

<script lang="ts" setup>
import {useSnackbar} from "~/utils/states";

const snackbarGlobal = useSnackbar();

if (process.client) {
  window.addEventListener("visibilitychange", e => {
    console.log(e)
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