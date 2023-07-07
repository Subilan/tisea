<template>
  <div class="col nowrap gap-8">
    <div class="function" :class="props.color">
      <div class="icon">
        <span class="mdi" :class="props.icon"/>
      </div>
      <div class="text">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="subtitle">
          <slot name="subtitle"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String
  },
  color: {
    type: String,
    default: 'cyan'
  }
})
</script>
<style scoped lang="less">

.function {
  cursor: pointer;

  &.cyan {
    background: #e0f7fa;
    color: #00bcd4;
  }

  &.amber {

    background: #fff8e1;
    color: #ffc107;
  }

  &.blue {
    color: #2196f3;
    background: #e3f2fd;
  }

  padding: 16px;
  border-radius: 5px;
  position: relative;

  .icon {
    position: absolute;
    top: 16px;
    right: 16px;

    .mdi::before {
      font-size: 20px;
    }
  }

  .text {
    .title {
      font-size: 20px;
    }

    .subtitle {
      font-size: 14px;
      color: rgba(0, 0, 0, .5);
    }
  }
}
</style>