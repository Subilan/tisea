

<template>
<div class="selection">
  <div class="icon" v-if="icon.length > 0">
    <span class="mdi" :class="icon"/>
  </div>
  <div contenteditable="false" :id="`option-activator-${uid}`" @click="handleInputClick()" :style="{color: selected ? '#000' : 'rgb(117, 117, 117)'}" :class="{active: optionsActive}" class="selection-input">
    {{ selected || placeholder }}
  </div>
  <div :id="`option-wrapper-${uid}`" class="selection-options-wrapper" :class="{active: optionsActive}" :style="{display: displayOptions ? 'block' : 'none'}">
    <div class="selection-options">
      <div class="option" :key="i" v-for="(x, i) in options" @click="selected = x.value ? x.value : x.text; closeOptions()">
        {{ x.text }}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";
import {getRandomString} from "~/lib/common/butils/common";

const selected = ref('');
const displayOptions = ref(false);
const optionsActive = ref(false);
const uid = getRandomString(7);
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array // {text: string, value?: string}[]
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue']);

watch(() => selected.value, v => {
  emit('update:modelValue', v);
})

function openOptions() {
  displayOptions.value = true;
  setTimeout(() => {
    optionsActive.value = true;
  }, 1);
}

function closeOptions() {
  optionsActive.value = false;
  setTimeout(() => {
    displayOptions.value = false;
  }, 200)
}

function handleInputClick() {
  if (displayOptions.value === false && optionsActive.value === false) {
    openOptions();
  } else {
    closeOptions()
  }
}

function clickOutsideHandler(e: MouseEvent) {
  const el = e.target as HTMLElement;

  const closestActivator: HTMLElement | null = el.closest(`#option-activator-${uid}`);
  const closedWrapper: HTMLElement | null = el.closest(`#option-wrapper-${uid}`);
  // satisfied when clicking outside the 'option self-handling area'.
  if (closestActivator === null && closedWrapper === null) {
    closeOptions();
  }
}

onMounted(() => {
  document.addEventListener('click', clickOutsideHandler);
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutsideHandler);
})
</script>

<style scoped lang="less">
.mdi::before {
  color: rgba(0, 0, 0, .6);
  font-size: 28px;
}

.selection {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.selection-input {
  outline: none;
  border-radius: 5px;
  border: 2px solid rgba(0, 0, 0, .2);
  transition: all .2s ease;
  font-size: 18px;
  resize: none;
  box-sizing: border-box;
  padding: 8px;
  font-family: Cascadia Mono, Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;
  width: 100%;
  line-height: 1;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover,
  &.active{
    border-color: #00bcd4;
  }

  &.error {
    border-color: #f44336;
  }

  &.active {
    background: rgba(0, 0, 0, .04);
  }
}

@sel-opt-padding: .6rem;
@sel-opt-left: 44px;
@sel-opt-border: 2px;

.selection-options-wrapper {
  display: block;
  position: absolute;
  left: @sel-opt-left;
  top: 100%;
  border: @sel-opt-border solid rgba(0, 0, 0, .2);
  border-top: none;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  padding: @sel-opt-padding;
  border-radius: 5px;
  box-sizing: content-box;
  width: calc(100% - @sel-opt-left - 2 * @sel-opt-padding - 2 * @sel-opt-border);
  opacity: 0;
  transform: translateY(-20px);
  transition: all .2s ease;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}

.selection-options {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;

  .option {
    padding: .4rem;
    transition: all .2s ease;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #e0f7fa;
    }
  }
}
</style>