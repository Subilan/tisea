

<template>
  <div class="help">
    <tooltip tooltip-text="获取帮助">
      <div @click="helpDialog = true" class="help-button" :class="buttonClass">
        <span class="mdi mdi-help-circle-outline"/>
      </div>
    </tooltip>
  </div>
  <div class="dialog">
    <dlg full-width v-model="helpDialog">
      <template #title>
        <slot name="title"/>
      </template>
      <template #content>
        <div class="typo">
          <slot name="content"/>
        </div>
      </template>
      <template #actions>
        <slot :close="close" name="actions"/>
      </template>
    </dlg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonClass: {
    type: String
  }
})

const helpDialog = ref(false);

function close() {
  helpDialog.value = false;
}
</script>

<style scoped lang="less">
.help {
  position: absolute;
  top: 32px;
  right: 32px;
}

.help-button {
  cursor: pointer;
  background: #00bcd4;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content:  center;
  border-radius: 100%;
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  transition: all .2s ease;

  .mdi::before {
    font-size: 28px;
  }

  &:hover {
    background: darken(#00bcd4, 6%);
  }
}
</style>