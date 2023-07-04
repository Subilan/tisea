<template>
  <div :disabled="disabled" class="button">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less">
.button {
  padding: 8px 16px;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  background: white;

  transition: all .2s ease;
}

.button.outline {
  border: 1px solid rgba(0, 0, 0, .2);
  color: #00bcd4;

  &:hover {
    border-color: #00bcd4;
  }
}

.button.white {
  background: white;
  color: #00bcd4;
  border: 1px solid rgba(0, 0, 0, .2);

  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, .1);
  }
}

.button.primary {
  background: #00bcd4;
  color: white;

  &:hover {
    box-shadow: 0 0 0 4px #b2ebf2;
  }
}

.button.solid {
  background: #e0f7fa;
  color: #00bcd4;

  &:hover {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, .1)
  }
}

.button[disabled='true'] {
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
  border: none;
  background: rgba(0, 0, 0, .2);
  color: white;

  &:hover {

    opacity: 1;
    box-shadow: none;
  }
}

.button:hover {
  opacity: .8;

}
</style>