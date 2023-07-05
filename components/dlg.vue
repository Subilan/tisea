<template>
  <div class="dialog">
    <div class="dialog-cover" :style="props.modelValue ? {} : {'pointer-events': 'none'}"
         :class="{cover: props.cover, active: props.modelValue}">
      <div class="dialog-card" :class="{active: props.modelValue}">
        <div class="dialog-card-title">
          <slot name="title"/>
        </div>
        <div class="dialog-card-content">
          <slot name="content"/>
        </div>
        <div class="dialog-card-actions">
          <slot name="actions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cover: {
    default: false
  },
  modelValue: {
    type: Boolean
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="less">
.dialog, .dialog-cover {
  transition: all .38s cubic-bezier(.84,0,.24,1.03);
}

.dialog-cover {
  z-index: 2000;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .2);
  opacity: 0;

  &.active {
    opacity: 1;
  }

  &:not(.cover) {
    .dialog-card {
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
      opacity: 0;
      transform: scale(.9);

      &.active {
        opacity: 1;
        transform: scale(1);
      }
    }
  }


  .dialog-card {
    transition: all .38s cubic-bezier(.84,0,.24,1.03);
    border-radius: 5px;
    max-width: 500px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .dialog-card-title {
      font-size: 34px;
      font-weight: bold;
      line-height: 1;
    }

    .dialog-card-content {
      line-height: 1.5;
      font-size: 18px;
      max-height: 700px;
      overflow-y: auto;
    }

    .dialog-card-actions {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

.dialog-cover.cover {
  backdrop-filter: blur(0) opacity(0);

  &.active {
    backdrop-filter: blur(10px) opacity(1);
    background: rgba(0, 0, 0, .5);
  }

  .dialog-card {
    color: white;
    max-width: 1000px;
    transform: translateX(-20px);
    &.active {
      transform: translateX(0);
    }
    .dialog-card-title {
      text-shadow: 0 0 3px rgba(0, 0, 0, .2);
    }

    .dialog-card-content {
      text-shadow: 0 0 3px rgba(0, 0, 0, .2);
    }
  }
}

</style>

<style lang="less">

.dialog-cover.cover {
  .dialog-card-actions {
    .button.primary {
      background: rgba(255, 255, 255, .3);
      color: white;

      &:hover {
        box-shadow: none;
      }
    }

    .button.white {
      background: rgba(0, 0, 0, .3);
      color: white;
      border: none;

      &:hover {
        box-shadow: none;
      }
    }
  }
}

.dialog-card {
  .oasis-logo {
    transform: scale(.8);
    opacity: 0;
    transition: all .38s cubic-bezier(.84,0,.24,1.03);
  }

  &.active {
    .oasis-logo {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>