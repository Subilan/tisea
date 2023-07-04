<template>
  <div class="inline-badge">
    <slot/>
  </div>
</template>

<style scoped lang="less">
.inline-badge {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  background: #00bcd4;
  color: white;
  line-height: 1;
  padding: 4px 6px;
  margin: 0 4px;
  border-radius: 100px;
}
</style>