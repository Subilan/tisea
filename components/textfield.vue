<template>
  <div class="textfield" :class="{error: !!errorText}">
    <div class="left">
      <span class="mdi" v-if="icon" :class="icon"/>
    </div>
    <div class="right">
      <input :class="{error: !!errorText}" @change="ev => $emit('update:modelValue', ev.target.value)"
             :placeholder="placeholder" :type="type"
             class="textfield-input"/>
      <Transition name="fadeRight">
        <small class="hint-text" v-if="hintText">{{ hintText }}</small>
      </Transition>
      <Transition name="fadeRight">
        <small class="error-text" v-if="errorText">{{ errorText }}</small>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['icon', 'placeholder', 'type', 'modelValue', 'errorText', 'hintText'])
defineEmits(['update:modelValue']);
</script>

<style scoped lang="less">

.textfield {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.textfield:not(.error) {
  align-items: center;
}

.textfield.error {
  align-items: flex-start;
}

.left {
  display: flex;
  align-items: flex-start;

  .mdi::before {
    font-size: 28px;
    color: rgba(0, 0, 0, .6);
  }
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hint-text {
  color: rgba(0, 0, 0, .2);
}

.error-text {
  color: #f44336;
}

.textfield-input {
  outline: none;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, .2);
  transition: all .2s ease;
  font-size: 16px;
  width:
  resize: none;
  box-sizing: border-box;

  padding: 8px;
  font-family: Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;

  &:hover,
  &:focus {
    border-color: #00bcd4;
  }

  &.error {
    border-color: #f44336;
  }

  &:focus {
    background: rgba(0, 0, 0, .04);
  }
}
</style>