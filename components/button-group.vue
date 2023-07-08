<template>
  <div class="button-group">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less">
.button-group {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 4px;
  padding: 4px;
  background: #efefef;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  border: rgba(0, 0, 0, .2);
  border-radius: 5px;

  > div {
    &:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &::selection {
      background: transparent;
    }

    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    background: white;
    color: black;
    font-size: 14px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    gap: 4px;
    transition: all .2s ease;

    .mdi::before {
      font-size: 16px;
    }

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>