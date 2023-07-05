<template>
  <Transition name="fadeUp">
    <div v-if="props.modelValue" class="snackbar">
      <div class="text">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

if (props.modelValue === true) {
  setTimeout(() => {
    emit('update:modelValue', false)
  }, 3000);
}

watch(() => props.modelValue, v => {
  if (v === true) {
    setTimeout(() => {
      emit('update:modelValue', false)
    }, 3000);
  }
})
</script>

<style lang="less">
.snackbar {
  display: flex;
  align-items: center;
  background: #212121;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
  min-height: 36px;
  font-size: 18px;
  position: fixed;
  min-width: 300px;
  max-width: 600px;
  line-height: 1.5;
  bottom: 0;
  color: white;
  padding: 10px 20px;
  font-family: Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', 'Courier New', Courier, monospace;
}

.text {
  animation: OpacityFade cubic-bezier(.8, 0, 0, 1) 1s;
}
</style>