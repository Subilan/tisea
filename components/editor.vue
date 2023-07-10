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
      <tooltip tooltip-text="删除线">
        <btn @click="getFocus().toggleStrike().run()" class="icon white rounded"><span
            class="mdi mdi-format-strikethrough"/></btn>
      </tooltip>
      <div class="vertical-divider"/>
      <tooltip tooltip-text="引用">
        <btn @click="getFocus().toggleBlockquote().run()" class="icon white rounded">
          <span class="mdi mdi-format-quote-close"/>
        </btn>
      </tooltip>
      <tooltip tooltip-text="分割线">
        <btn @click="getFocus().setHorizontalRule().run()" class="icon white rounded">
          <span class="mdi mdi-minus"/>
        </btn>
      </tooltip>
      <tooltip tooltip-text="高亮">
        <btn class="icon white rounded" @click="getFocus().toggleHighlight().run()"><span class="mdi mdi-marker"/></btn>
      </tooltip>
      <dropdown>
        <tooltip tooltip-text="图片">
          <btn @click="editorReactive.insertImageURL = ''" class="icon white rounded"><span class="mdi mdi-image"/>
          </btn>
        </tooltip>
        <template #menu="{ close }">
          <div class="menu-item-raw">
            <textfield v-model="editorReactive.insertImageURL" placeholder="有效的图片链接..."></textfield>
            <btn :loading="loadings.insertImageURL" class="primary" size="small" @click="createImage(); close();">插入
            </btn>
            <btn class="white" size="small" @click="close()">取消</btn>
          </div>
        </template>
      </dropdown>
      <div class="vertical-divider"/>
      <dropdown no-close-on-click>
        <tooltip tooltip-text="更多">
          <btn class="icon white rounded"><span class="mdi mdi-dots-horizontal"/>
          </btn>
        </tooltip>
        <template #menu="{ close }">
          <div class="menu-item" @click="getFocus().clearNodes().run(); getFocus().unsetAllMarks().run(); close()">
            <span class="mdi mdi-format-clear"/>清除格式
          </div>
          <dropdown no-close-on-click position="right-plus">
            <div class="menu-item" @click="handleColor">
              <span class="mdi mdi-palette"/>颜色
            </div>
            <template #menu>
              <div class="menu-item-raw">
                <color-picker :is-widget="true" v-model:pure-color="editorReactive.colorPure"
                              v-model:gradient-color="editorReactive.colorGrad"/>
              </div>
            </template>
          </dropdown>
          <dropdown position="right">
            <div class="menu-item">
              <span class="mdi mdi-format-header-pound"/>标题
            </div>
            <template #menu>
              <div class="menu-item" @click="getFocus().toggleHeading({level: 1}).run()"><span
                  class="mdi mdi-format-header-1"/>一级标题
              </div>
              <div class="menu-item" @click="getFocus().toggleHeading({level: 2}).run()"><span
                  class="mdi mdi-format-header-2"/>二级标题
              </div>
              <div class="menu-item" @click="getFocus().toggleHeading({level: 3}).run()"><span
                  class="mdi mdi-format-header-3"/>三级标题
              </div>
              <div class="menu-item" @click="getFocus().clearNodes().run()"><span class="mdi mdi-delete"/>撤销标题</div>
            </template>
          </dropdown>
          <dropdown position="right">
            <div class="menu-item">
              <span class="mdi mdi-format-align-justify"/>对齐
            </div>
            <template #menu>
              <div class="menu-item" @click="getFocus().setTextAlign('left').run()">
                <span class="mdi mdi-format-align-left"/>居左
              </div>
              <div class="menu-item" @click="getFocus().setTextAlign('center').run()">
                <span class="mdi mdi-format-align-center"/>居中
              </div>
              <div class="menu-item" @click="getFocus().setTextAlign('right').run()">
                <span class="mdi mdi-format-align-right"/>居右
              </div>
            </template>
          </dropdown>
        </template>
      </dropdown>
    </div>
    <mobile-only>
      <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
        <button-group>
          <div @click="getFocus().clearNodes().run()"><span class="mdi mdi-close"/> 清除格式</div>
          <div @click="getFocus().toggleBold().run()"><span class="mdi mdi-format-bold"/> 粗体</div>
          <div @click="getFocus().toggleItalic().run()"><span class="mdi mdi-format-italic"/> 斜体</div>
        </button-group>
      </bubble-menu>
    </mobile-only>

    <div class="editor-wrapper">
      <editor-content ref="editorRef" class="editor-content" :editor="editor"/>
      <!--suppress TypeScriptUnresolvedReference -->
      <small class="counter-text">{{ editor.storage.characterCount.characters() }}/500</small>
    </div>

    <dlg v-model="dialogs.invalidImageURL">
      <template #title>
        无法插入图片
      </template>
      <template #content>
        你所提供的图片地址（<code>{{
          // noinspection TypeScriptUnresolvedReference
          editorReactive.insertImageURL
        }}</code>）无效。请确保目标地址可以正常访问，且为正确的图片格式。
      </template>
      <template #actions>
        <btn class="primary" size="medium" @click="dialogs.invalidImageURL = false">关闭</btn>
      </template>
    </dlg>
    <dlg v-model="dialogs.invalidImageRegexTest">
      <template #title>
        不支持此图片地址
      </template>
      <template #content>
        <p>你所提供的图片地址（<code>{{
            // noinspection TypeScriptUnresolvedReference
            editorReactive.insertImageURL
          }}</code>）不受本站支持。请确保它是 <em>https</em> 协议下的正确链接。</p>
        <p>一个正确的图片地址应当与下面的示例在格式上类似。</p>
        <pre><code>https://example.com/path/to/example.png</code></pre>
      </template>
      <template #actions>
        <btn class="primary" size="medium" @click="dialogs.invalidImageRegexTest = false">关闭</btn>
      </template>
    </dlg>
    <dlg v-model="dialogs.invalidLanguage">
      <template #title>
        不支持的语言
      </template>
      <template #content>
        <p>你输入了不支持的语言“{{ provided.langSelect.targetLanguage }}”，将无法实现代码高亮或者代码标注。目前我们支持的语言如下。</p>
        <pre><code>{{ provided.langSelect.languages.join(", ") }}</code></pre>
      </template>
      <template #actions>
        <btn class="primary" size="medium" @click="dialogs.invalidLanguage = false">关闭</btn>
      </template>
    </dlg>
  </div>
</template>

<script setup lang="ts">
import {Editor, EditorContent, BubbleMenu, VueNodeViewRenderer} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {onBeforeUnmount} from "#imports";
import Tooltip from "~/components/tooltip.vue";
import ButtonGroup from "~/components/button-group.vue";
import {Mention} from "@tiptap/extension-mention";
import suggestion from '~/lib/editor/plugins/mention/suggestion';
import {Placeholder} from "@tiptap/extension-placeholder";
import {Color} from "@tiptap/extension-color";
import EditorCodeSelection from "~/lib/editor/plugins/code-block/lang-select.vue";
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";
import * as lowlight from "lowlight";
import html from '~/lib/editor/hljs-languages/xml';
import markdown from '~/lib/editor/hljs-languages/markdown';
import css from '~/lib/editor/hljs-languages/css';
import {typescript, javascript} from '~/lib/editor/hljs-languages/typescript';
import java from '~/lib/editor/hljs-languages/java';
import mcfunction from '~/lib/editor/hljs-languages/mcfunction';
import python from '~/lib/editor/hljs-languages/python';
import ini from '~/lib/editor/hljs-languages/ini';
import yaml from '~/lib/editor/hljs-languages/yaml';
import json from '~/lib/editor/hljs-languages/json';
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import {CharacterCount} from "@tiptap/extension-character-count";
import Dropdown from "~/components/dropdown.vue";
import {Highlight} from "@tiptap/extension-highlight";
import {Typography} from "@tiptap/extension-typography";
import {TextAlign} from "@tiptap/extension-text-align";
import {ColorHighlighter} from "~/lib/editor/plugins/color-swatch/plugin";
import {Image} from "@tiptap/extension-image";
import {TextStyle} from "@tiptap/extension-text-style";
import {ColorPicker} from "@/vendor/vue3-colorpicker";
import {getMit, post} from "~/lib/common/futils/common";

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
const emit = defineEmits(['update:modelValue'])

const dialogs = reactive({
  invalidImageURL: false,
  invalidImageRegexTest: false,
  invalidLanguage: false
})
const loadings = reactive({
  insertImageURL: false
})
const editorReactive = reactive({
  insertImageURL: '',
  colorPure: '',
  colorGrad: ''
})
const colorInput = ref<null | HTMLElement>(null);
const provided = reactive({
  langSelect: {
    targetLanguage: '',
    languages: [] as string[]
  }
})

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
  }), CharacterCount.configure({
    limit: 500
  }), Highlight, Typography, TextAlign.configure({
    types: ['heading', 'paragraph']
  }), ColorHighlighter, Image, TextStyle],
  content: props.modelValue,
  onUpdate(target) {
    emit('update:modelValue', target.editor.getText())
  }
});

onBeforeUnmount(() => {
  editor.destroy();
})

function getFocus() {
  return editor.chain().focus();
}

function handleColor(v: string) {
  getFocus().setColor(v).run();
}

watch(() => editorReactive.colorGrad, handleColor);
watch(() => editorReactive.colorPure, handleColor);

async function createImage() {
  if (editorReactive.insertImageURL.length === 0 || editorReactive.insertImageURL.trim() === '') {
    return;
  }
  if (!/https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(editorReactive.insertImageURL)) {
    dialogs.invalidImageRegexTest = true;
    return;
  }
  loadings.insertImageURL = true;
  const res = await post<boolean>('/api/common/check-value', {
    type: "image.valid",
    value: editorReactive.insertImageURL
  });
  loadings.insertImageURL = false;
  if (!res.data) {
    dialogs.invalidImageURL = true;
    return;
  }
  getFocus().setImage({src: editorReactive.insertImageURL}).run();
}

const emitter = getMit(inject);

if (emitter) {
  emitter.on('dispatchInvalidLanguageDialog', (obj: { targetLanguage: string, languages: string[] }) => {
    const {targetLanguage, languages} = obj;
    provided.langSelect.targetLanguage = targetLanguage;
    provided.langSelect.languages = languages;
    dialogs.invalidLanguage = true;
  })
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

.counter-text {
  color: rgba(0, 0, 0, .5);
}
</style>

<style lang="less">
@import '@/assets/styles/typo.less';

@border-width-arg: 2px;

.editor-content {

  .ProseMirror {
    outline: none;
    border-radius: 5px;
    border: solid 2px rgba(0, 0, 0, .2);
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

    .color {
      white-space: nowrap;
      cursor: pointer;

      &::before {
        content: ' ';
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid rgba(0, 0, 0, .1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
        vertical-align: middle;
        margin-right: 0.1em;
        margin-bottom: 0.15em;
        border-radius: 2px;
        background-color: var(--color);
      }
    }
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