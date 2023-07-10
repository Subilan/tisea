<template>
  <div class="menu">
    <div class="content">
      <slot @click="menuOpen = !menuOpen"/>
    </div>
    <div class="menu" v-if="menuOpen">
      <slot name="menu"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const menuOpen = ref(false);
</script>

<style scoped lang="less">

</style>