<template>
  <node-view-wrapper class="code-block">
    <select contenteditable="false" v-model="selectedLanguage">
      <option value="plaintext" :key="255">
        plaintext
      </option>
      <option v-for="(language, index) in languages" :value="language" :key="index">
        {{ language }}
      </option>
    </select>
    <pre><code><node-view-content/></code></pre>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from '@tiptap/vue-3'
import {getMit} from "~/lib/common/futils/common";

const emitter = getMit(inject);
const props = defineProps({
  ...nodeViewProps
});

const disableWarning = ref(false);
const languages = ['plaintext', 'html', 'js', 'css', 'ts', 'markdown', 'java', 'python', 'toml', 'yaml', 'json', 'mcfunction']
    .sort((a, b) => a.localeCompare(b));

function transpileAliases(input: string | null) {
  if (input === null) input = 'plain'
  const lower = input.toLowerCase();
  const match: dict<string> = {
    'plain': 'plaintext',
    'javascript': 'js',
    'typescript': 'ts',
    'ini': 'toml',
    'jsonc': 'json'
  }
  const transpiled = Object.keys(match).includes(lower) ? match[lower] : lower;
  if (!languages.includes(transpiled) && !disableWarning.value) {
    emitter.emit('dispatchInvalidLanguageDialog', {
      targetLanguage: props.node.attrs.language,
      languages
    });
    disableWarning.value = true;
  }
  return transpiled;
}

const selectedLanguage = ref(transpileAliases(props.node.attrs.language));

watch(() => selectedLanguage.value, (value, oldValue) => {
  if (value !== oldValue) {
    props.updateAttributes({v: value});
  }
})
</script>

<style lang="scss">
.code-block {
  position: relative;

  select {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}
</style>