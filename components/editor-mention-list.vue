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
      No result
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  command: {
    type: Function,
    default: () => {}
  }
})
let selectedIndex = ref<number>(0);
const items: string[] = reactive([]);

function keydownHandler(obj: {event: KeyboardEvent}) {
  const { event } = obj;
  switch (event.key) {
    case 'ArrowUp': {
      selectedIndex.value = ((selectedIndex.value + items.length) - 1) % items.length;
      break;
    }

    case 'ArrowDown': {
      selectedIndex.value = (selectedIndex.value + 1) % items.length;
      break;
    }

    case "Enter": {
      selectItem(selectedIndex.value);
      break;
    }
  }
}

function selectItem(index: number) {
  if (items[index]) {
    props.command({id: index});
  }
}

watch(items, () => {
  selectedIndex.value = 0;
})
</script>

<style lang="less">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.05),
      0 10px 20px rgba(0, 0, 0, 0.1);
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    border-color: #000;
  }
}
</style>