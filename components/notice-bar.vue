<script setup lang="ts">

</script>

<template>
  <div class="notice-bar">
    <slot/>
  </div>
</template>

<style lang="less">
.notice-bar {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 0;
  font-size: 16px;
  border-radius: 5px;
  background: #e0f7fa;
  color: #00bcd4;

  .mdi::before {
    font-size: 20px;
  }

  .mdi {
    margin-right: .5em;
  }
}
</style>