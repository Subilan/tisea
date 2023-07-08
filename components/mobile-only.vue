<template>
  <slot v-if="mobile()"/>
</template>

<script setup lang="ts">
import isMobile from "ismobilejs";
function mobile() {
  return window.innerWidth < 900 || isMobile(navigator.userAgent).any;
}
</script>

<style scoped lang="less">

</style>