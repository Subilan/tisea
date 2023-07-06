<template>
  <div class="notice-bar" :class="targetClass">
    <slot/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  targetClass: {
    type: String,
    default: 'default'
  }
})
</script>

<style lang="less">
.notice-bar {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 0;
  font-size: 16px;
  border-radius: 5px;

  &.default {
    background: #e0f7fa;
    color: #00bcd4;
  }

  &.warn {
    background: #fff8e1;
    color: #ffc107;
  }

  &.critical {
    background: #ffebee;
    color: #f44336;
  }

  .mdi::before {
    font-size: 24px;
  }

  .mdi {
    margin-right: 1em;
  }
}
</style>