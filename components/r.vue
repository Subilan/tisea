<template>
  <a class="r" :href="props.href" :target="newTab ? '_blank' : ''">
    <slot/>
    <span class="mdi mdi-arrow-top-right"/> </a>
</template>
<script setup lang="ts">
const props = defineProps({
  href: {
    type: String
  },
  newTab: {
    type: Boolean,
    default: true
  }
})
</script>
<style scoped lang="less">
.r {
  text-decoration: underline dotted 1px;
  opacity: .8;
  color: #00e3db;

  &:hover {
    opacity: 1;
  }
}
</style>