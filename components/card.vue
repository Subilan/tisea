<template>
  <div class="card"
       :style="{borderColor: props.borderColor, borderWidth: props.importantText ? '5px' : '1px'}"
       :class="{important : !!props.importantText}">
    <div class="important-text" :style="{color: props.borderColor}" v-if="props.importantText?.length > 0">
      {{ props.importantText }}
    </div>
    <div class="card-title" v-if="!props.raw">
      <slot name="title"></slot>
    </div>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <div class="card-actions" v-if="slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  raw: {
    type: Boolean,
    default: false
  },
  importantText: {
    type: String
  },
  borderColor: {
    type: String,
    default: 'rgba(0, 0, 0, .15)'
  }
})

const slots = useSlots();
</script>

<style lang="less" scoped>
.card {
  padding: 16px;
  background: white;
  border: 1px solid transparent;
  border-radius: 5px;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);

  &.important {
    border-width: 5px;
  }
}

.card-title {
  font-size: 20px;
  margin-bottom: 16px;
}

.card-content {
  font-size: 18px;
  line-height: 1.5;
}

.card-actions {
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 8px;
  text-align: center;
}

.important-text {
  position: absolute;
  right: 8px;
  top: 8px;
  font-style: italic;
  font-weight: bold;
  font-size: 20px;
  line-height: 1;
  font-family: Cascadia Mono, Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;
}
</style>