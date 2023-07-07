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
  line-height: 1;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 14px;

  &.outline {
    border: 1px solid rgba(0, 0, 0, .2);
    color: #00bcd4;
  }

  &.plain {
    background: #00bcd4;
    color: white;
  }

  &.oasis {
    background: #ffebee;
    color: #de3012;
  }
}
</style>