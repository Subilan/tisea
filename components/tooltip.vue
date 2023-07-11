<script setup lang="ts">
const props = defineProps({
  tooltipHtml: {
    type: String,
    default: ''
  },
  tooltipText: {
    type: String,
    default: ''
  }
})

const hoverEnabled = ref(true);
</script>

<template>
  <div @click="hoverEnabled = false" @mouseleave="hoverEnabled = true" class="tooltip-wrapper" :class="{'hover-enabled': hoverEnabled}">
    <div class="content">
      <slot/>
    </div>
    <div class="tooltip-text-wrapper">
      <div class="tooltip-text">
        <div v-html="tooltipHtml" v-if="tooltipHtml"/>
        <div v-html="tooltipText" v-if="tooltipText"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tooltip-wrapper {
  position: relative;
  display: block;
  z-index: 200;

  .tooltip-text {
    transition: all .25s cubic-bezier(.84, 0, .24, 1.03);
    background: #4f4f4f;
    color: white;
    padding: .3rem .6rem;
    border-radius: 5px;
    cursor: default;
    opacity: 0;
    transform: scale(.85);
    font-size: 12px;
    text-align: center;
    display: block;
    width: max-content;
    position: relative;
  }

  .tooltip-text-wrapper {
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    top: 110%;
    display: flex;
    justify-content: center;
  }

  &.hover-enabled {
    .content:hover + .tooltip-text-wrapper .tooltip-text {
      transform: scale(1.01); // magic, solving aligning problems
      opacity: 1;
    }
  }
}
</style>