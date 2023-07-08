<template>
  <div class="editor">
    <div class="editor-toolbar">
      <tooltip tooltip-text="粗体">
        <btn @click="getFocus().toggleBold().run()" class="icon white rounded"><span class="mdi mdi-format-bold"/></btn>
      </tooltip>
      <tooltip tooltip-text="斜体">
        <btn @click="getFocus().toggleItalic().run()" class="icon white rounded"><span class="mdi mdi-format-italic"/>
        </btn>
      </tooltip>
      <div class="vertical-divider"/>
      <tooltip tooltip-text="清除格式">
        <btn @click="getFocus().toggleStrike().run()" class="icon white rounded"><span
            class="mdi mdi-format-strikethrough"/></btn>
      </tooltip>
      <tooltip tooltip-text="标题">
        <btn class="icon white rounded"><span class="mdi mdi-format-header-pound"/></btn>
      </tooltip>
    </div>
    <mobile-only>
      <bubble-menu :editor="editor" :tippy-options="{ duration: 100}" v-if="editor">
        <button-group>
          <div @click="getFocus().clearNodes().run()"><span class="mdi mdi-close"/> 清除格式</div>
          <div @click="getFocus().toggleBold().run()"><span class="mdi mdi-format-bold"/> 粗体</div>
          <div @click="getFocus().toggleItalic().run()"><span class="mdi mdi-format-italic"/> 斜体</div>
        </button-group>
      </bubble-menu>
    </mobile-only>
    <editor-content class="editor-content" :editor="editor"></editor-content>
  </div>
</template>

<script setup lang="ts">
import {Editor, EditorContent, BubbleMenu, VueNodeViewRenderer} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {onBeforeUnmount} from "#imports";
import Tooltip from "~/components/tooltip.vue";
import ButtonGroup from "~/components/button-group.vue";
import {Mention} from "@tiptap/extension-mention";
import suggestion from '~/components/editor-mention-suggestions';
import {Placeholder} from "@tiptap/extension-placeholder";
import {Color} from "@tiptap/extension-color";
import EditorCodeSelection from "~/components/editor-code-selection.vue";
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import * as lowlight from "lowlight";
import html from '@/utils/lib/hljs-languages/xml';
import markdown from '@/utils/lib/hljs-languages/markdown';
import css from '@/utils/lib/hljs-languages/css';
import {typescript, javascript} from '@/utils/lib/hljs-languages/typescript';
import java from '@/utils/lib/hljs-languages/java';
import mcfunction from '@/utils/lib/hljs-languages/mcfunction';
import python from '@/utils/lib/hljs-languages/python';
import ini from '@/utils/lib/hljs-languages/ini';
import yaml from '@/utils/lib/hljs-languages/yaml';
import json from '@/utils/lib/hljs-languages/json';
import 'highlight.js/styles/atom-one-dark-reasonable.css'

lowlight.lowlight.registerLanguage('html', html)
lowlight.lowlight.registerLanguage('js', javascript);
lowlight.lowlight.registerLanguage('css', css);
lowlight.lowlight.registerLanguage('ts', typescript);
lowlight.lowlight.registerLanguage('markdown', markdown);
lowlight.lowlight.registerLanguage('java', java);
lowlight.lowlight.registerLanguage('mcfunction', mcfunction);
lowlight.lowlight.registerLanguage('python', python);
lowlight.lowlight.registerLanguage('toml', ini);
lowlight.lowlight.registerLanguage('json', json);
lowlight.lowlight.registerLanguage('yaml', yaml);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
defineModel('modelValue');
const emit = defineEmits(['update:modelValue'])

const editor = new Editor({
  extensions: [StarterKit, Mention.configure({
    HTMLAttributes: {
      class: 'mention'
    },
    suggestion
  }), Placeholder.configure({
    placeholder: '写点什么...'
  }), Color.configure({
    types: ['textStyle']
  }), CodeBlockLowlight.extend({
    addNodeView() {
      return VueNodeViewRenderer(EditorCodeSelection)
    }
  }).configure({
    // @ts-ignore
    lowlight: lowlight.lowlight
  })],
  content: props.modelValue,
  onUpdate(target) {
    emit('update:modelValue', target.editor.getText())
  }
})

onBeforeUnmount(() => {
  editor.destroy();
})

function getFocus() {
  return editor.chain().focus();
}
</script>

<style scoped lang="less">
.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
}

.vertical-divider {
  display: inline-block;
  margin: 0 4px;
  background: rgba(0, 0, 0, .2);
  height: 25px;
  width: 1px;
}

.editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

<style lang="less">
@import '@/assets/styles/typo.less';

.editor-content {

  .ProseMirror {
    outline: none;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, .2);
    transition: all .2s ease;
    font-size: 18px;
    resize: none;
    box-sizing: border-box;
    height: 400px;
    overflow-y: auto;

    padding: 8px;
    font-family: Cascadia Mono, Consolas, ui-monospace, '微软雅黑', 'Microsoft Yahei', ui-sans-serif, monospace;

    &:hover,
    &:focus {
      border-color: #00bcd4;
    }

    &.error {
      border-color: #f44336;
    }

    .typo;
  }
}

.bubble-menu-toolbar {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
}

// Display a Placeholder only for the first line in an empty editor.

.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>