<template>
  <div class="items">
    <template v-if="items.length">
      <button
          class="item"
          :class="{ 'is-selected': index === selectedIndex }"
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(index)"
      >
        {{ item }}
      </button>
    </template>
    <div class="item" v-else>
      &lt;空&gt;
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  command: {
    type: Function,
    default: () => {
    }
  },
  items: {
    type: Array,
    required: true
  }
})
let selectedIndex = ref<number>(0);

function keydownHandler(obj: { event: KeyboardEvent }) {
  const {event} = obj;

  switch (event.key) {
    case 'ArrowUp': {
      selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length;
      return true;
    }

    case 'ArrowDown': {
      selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
      return true;
    }

    case "Enter": {
      selectItem(selectedIndex.value);
      return true;
    }

    default: {
      return false;
    }
  }
}

function selectItem(index: number) {
  if (props.items[index]) {
    props.command({id: props.items[index]});
  }
}

watch(props.items, () => {
  selectedIndex.value = 0;
})

defineExpose({keydownHandler});
</script>

<style lang="less">
@import "assets/styles/var.less";

.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 5px;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: .9rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
  border: 1px solid #00bcd4;
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 5px;
  padding: 0.2rem 0.4rem;
  border: none;
  .font-default;

  &.is-selected {
    background: #e0f7fa;
  }
}

.mention {
  background: #e0f7fa;
  color: #00bcd4;
  border-radius: 5px;
  padding: .2rem .4rem;
}
</style>