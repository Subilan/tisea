<template>
  <div class="textfield" :class="ofError ? 'error' : ''">
    <div class="left" v-if="icon">
      <span class="mdi" v-if="icon" :class="icon"/>
    </div>
    <div class="right">
      <input :value="value" v-if="!textarea" :class="ofError ? 'error' : ''"
             @change="ev => {
                  if (!keyupEvent) updateModelValue(ev);
                }" @keyup="ev => {
                  if (keyupEvent) updateModelValue(ev);
                }"
             :placeholder="placeholder" :type="type"
             class="textfield-input" :maxlength="maxlength"/>
      <textarea :value="value" :style="{height: props.textareaHeight}" v-else :class="ofError ? 'error' : ''"
                @change="ev => {
                  if (!keyupEvent) updateModelValue(ev);
                }" @keyup="ev => {
                  if (keyupEvent) updateModelValue(ev);
                }" :placeholder="placeholder"
                class="textfield-textarea" :maxlength="maxlength"/>
      <Transition name="fadeRight">
        <small class="hint-text" v-if="hintText">{{ hintText }}</small>
      </Transition>
      <Transition name="fadeRight">
        <small class="error-text" v-if="errorText">{{ errorText }}</small>
      </Transition>
      <small class="counter-text" v-if="!hintText && !errorText && Number(maxlength) > 0">{{
          modelValue.length
        }}/{{ maxlength }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String
  },
  placeholder: {
    type: String
  },
  type: {
    type: String
  },
  errorText: {
    type: String
  },
  hintText: {
    type: String
  },
  maxlength: {
    type: String
  },
  textarea: {
    type: Boolean,
    default: false
  },
  textareaHeight: {
    type: String,
    default: '500px'
  },
  modelValue: {
    type: String,
    required: true
  },
  keyupEvent: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue']);

const maxlengthNum = computed(() => {
  let r = Number(props.maxlength);
  return isNaN(r) ? 0 : r;
})

const ofError = computed(() => {
  return !!props.errorText;
})

const value = computed(() => {
  return props.modelValue;
})

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
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
    font-size: 1.5rem;
    color: rgba(0, 0, 0, .6);
  }
}

.right {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hint-text, .counter-text {
  color: rgba(0, 0, 0, .5);
}

.error-text {
  color: #f44336;
}

.textfield-textarea,
.textfield-input {
  outline: none;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, .2);
  transition: all .2s ease;
  font-size: 1rem;
  resize: none;
  box-sizing: border-box;

  padding: 8px;
  font-family: Cascadia Mono, Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;

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