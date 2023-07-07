<template>
  <div :style="{width: props.width, height: props.width}" class="avatar" v-if="props.ready">
    <img :style="{width: props.width}" :src="src" v-if="props.ready"/>
    <avatar-spinner :size="props.width" class="spinner" v-else/>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  src: {
    type: String
  },
  ready: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '42px'
  }
})
</script>
<style scoped lang="less">
.avatar {
  img {
    display: inline-block;
    border-radius: 100%;
    transition: all .2s ease;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, .2);

    &:hover {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, .1);
    }
  }
}
</style>