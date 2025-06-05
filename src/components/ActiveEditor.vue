<script setup lang="tsx">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { basicSetup, EditorView } from 'codemirror';
import { Compartment, EditorState, Text } from '@codemirror/state';

import { detectLanguage } from '@/utils/languages'
import type { Gist } from '@/utils/gists'
import UnsupportedOptionView from './toolbar/UnsupportedOptionView.vue';
import usePersistentCode from '@/stores/usePersistentCode';
import { StreamLanguage } from '@codemirror/language';


const model = defineModel('filename', {
  type: String
})
const codeModel = defineModel('code', {
  type: String,
  required: false
})

const views = [
  {
    name: 'Run',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-width={1.5}
          d="M20.409 9.353a2.998 2.998 0 0 1 0 5.294L7.597 21.614C5.534 22.737 3 21.277 3 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
        ></path>
      </svg>
    ),
    view: UnsupportedOptionView,
  },
  {
    name: 'Comments',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path fill="currentColor" d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
      </svg>
    ),
    view: UnsupportedOptionView,
  },
  // {
  //   name: 'AI',
  //   icon: (
  //     <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
  //       <path
  //         fill="none"
  //         stroke="currentColor"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M8 16v-6a2 2 0 1 1 4 0v6m-4-3h4m4-5v8"
  //       ></path>
  //     </svg>
  //   ),
  //   view: UnsupportedOptionView
  // },
];

const languageCompartment = new Compartment()

const editorRef = useTemplateRef('editor')
// the editor itself
const editorState = EditorState.create(
    codeModel?.value
      ? {
          doc: codeModel.value,
          extensions: [
            basicSetup,
            languageCompartment.of( filename.value.length === 0 ? [] :
              (detectLanguage(filename.value)?.stream
                ? StreamLanguage.define(detectLanguage(filename.value)?.stream!)
                : detectLanguage(filename.value)?.support)!,
            ),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) handleChange(update.state.doc);
            }),
          ],
        }
      : {
          extensions: [basicSetup, languageCompartment.of([]), EditorView.updateListener.of((update) => {
              if (update.docChanged) handleChange(update.state.doc);
            }),],
        },
  )
let e: EditorView | null = null

const filename = computed(() => model.value ?? '');
const language = computed(
  () =>
    detectLanguage(filename.value) ?? {
      name: 'unknown',
      id: undefined,
      icon: 'vscode-icons:default-file',
    },
)

const rightViewTag = ref<string | null>(null)
const rightView = ref(null)

function setRightPanel(view: typeof views[number]) {
  if (rightViewTag.value && rightViewTag.value === view.name) {
    rightViewTag.value = null
  } else {
    rightViewTag.value = view.name
    rightView.value = view.view
  }
}

async function setLanguage() {
  if (!e) return

  let ext = []

  if (language.value.id) {
    if ('support' in language.value) {
      // has normal support
      e.dispatch({
        effects: languageCompartment.reconfigure(language.value.support),
      })
      console.log('dispatch', e)
    } else {
      // has stream, use legacy
      e?.dispatch({
        effects: languageCompartment.reconfigure(StreamLanguage.define(language.value.stream)),
      })
    }
  }
}

function handleChange(doc: Text) {
  codeModel.value = doc.toString()
}

onMounted(async () => {
  e = new EditorView({
    parent: editorRef.value!,
    state: editorState
  })
})

watch(filename, async (newValue, oldValue) => {
  await setLanguage()
  rightViewTag.value = null
})

watch(codeModel, async (newValue, oldValue) => {
  e?.dispatch({
    changes: {
      from: 0,
      to: e.state.doc.length,
      insert: newValue
    }
});
})
</script>

<template>
  <div class="flex flex-row justify-between w-screen h-full">
    <div class="editor h-full overflow-auto w-full">
      <div ref="editor"></div>
    </div>
    <div v-show="rightViewTag" class="min-w-[20rem] border-l px-3 shadow flex">
      <component :is="rightView" />
    </div>
    <div
      class="flex w-full max-w-14 flex-col items-center justify-start border-l py-2 shadow dark:border-gray-100"
    >
      <!-- Tab Items -->
      <div
        v-for="view in views"
        :key="view.name"
        class="mx-auto flex w-full items-center justify-center"
      >
        <div
          @click="setRightPanel(view)"
          :class="
            `flex w-full items-center justify-center py-2` +
            (rightViewTag == view.name
              ? ` bg-gray-400 text-[var(--color-background)] dark:bg-gray-200`
              : '')
          "
        >
          <component :is="view.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cm-editor .cm-cursor {
  border-left-color: var(--color-text);
}
.cm-activeLine {
  background-color: transparent !important;
}

.cm-editor {
  max-height: 82lvh;
}

@media (prefers-color-scheme: dark) {
  .cm-gutter {
    background-color: var(--color-background);
  }
}
</style>
