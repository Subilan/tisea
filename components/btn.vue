<template>
  <div :class="size" :disabled="disabled" class="button">
    <template v-if="loading">
      <spinner-diamond :size="spinnerSize"/>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'large'
  }
})

const spinnerSize = computed(() => {
  return props.size === 'large' ? '45px' : (props.size === 'medium' ? '36px' : '24px')
})
</script>

<style lang="less">
.button {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  transition: all .2s ease;
  line-height: 1;
}

.button:not(.icon) {
  &.large {
    min-height: 1.2rem;
  }

  &.medium {
    font-size: 1rem;
    max-height: 16px;
  }

  &.small {
    font-size: .8rem;
    max-height: 14px;
  }
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

.button.primary-amber {
  background: #ffc107;
  color: white;

  &:hover {
    box-shadow: 0 0 0 4px #fff8e1;
    background: darken(#ffc107, 3%);
  }
}

.button.primary-blue {
  background: #2196f3;
  color: white;

  &:hover {
    box-shadow: 0 0 0 4px #e3f2fd;
    background: darken(#2196f3, 3%);
  }
}


.button.primary-green {
  background: #4caf50;
  color: white;

  &:hover {
    box-shadow: 0 0 0 4px #e8f5e9;
    background: darken(#4caf50, 3%);
  }
}

.button.primary {
  background: #00bcd4;
  color: white;

  &:hover {
    box-shadow: 0 0 0 4px #b2ebf2;
    background: darken(#00bcd4, 3%);
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

.button.icon {
  display: inline-flex;
  padding: 0;

  &.rounded {
    border-radius: 100%;

    &.large {
      height: 36px;
      width: 36px;
    }
  }
}
</style>