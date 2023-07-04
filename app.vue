<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script lang="ts" setup>
if (process.client) {
  window.addEventListener("visibilitychange", e => {
    console.log(e)
  })
}
</script>

<style lang="less">
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