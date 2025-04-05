<script setup lang="tsx">
import { basicSetup, EditorView } from 'codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import { StreamLanguage } from '@codemirror/language'
import { Icon } from '@iconify/vue'

import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { detectLanguage } from '@/utils/languages'
import { useRoute } from 'vue-router'
import type { Gist } from '@/utils/gists'

const views = [
  {
    name: 'Run',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          d="M20.409 9.353a2.998 2.998 0 0 1 0 5.294L7.597 21.614C5.534 22.737 3 21.277 3 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"
        ></path>
      </svg>
    ),
  },
  {
    name: 'Comments',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5 3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-4.59l-3.7 3.71c-.18.18-.43.29-.71.29a1 1 0 0 1-1-1v-3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m13 1H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4v4l4-4h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
        ></path>
      </svg>
    ),
  },
  {
    name: 'AI',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16v-6a2 2 0 1 1 4 0v6m-4-3h4m4-5v8"
        ></path>
      </svg>
    ),
  },
]

const route = useRoute()
const id = route.query.id as string | undefined;

const languageCompartment = new Compartment()

const editorRef = useTemplateRef('editor')
// the editor itself
let e: EditorView | null = null

const filename = ref<string>('')
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

function setRightPanel(view) {}

async function setLanguage() {
  if (!e) return

  let ext = [];

  if (language.value.id) {
    if (language.value.support) {
      // has normal support
      e.dispatch({
        effects: languageCompartment.reconfigure(language.value.support)
      })
      console.log('dispatch', e)
    } else {
      // has stream, use legacy
      e?.dispatch({
        effects: languageCompartment.reconfigure(StreamLanguage.define(language.value.stream))
      })
    }
  }
}

onMounted(async () => {
  let doc;

  if (id) {
    const body = await (await fetch(`https://api.github.com/gists/${id}`)).json() as Gist

    /** @todo support multiple files */
    let file = Object.entries(body.files)[0][1]
    if (!file.truncated) {
      doc = file.content
      filename.value = file.filename
    }
  }

  const state = EditorState.create(doc ? {
    doc,
    extensions: [
      basicSetup,
      languageCompartment.of((detectLanguage(filename.value)?.stream ? StreamLanguage.define(detectLanguage(filename.value)?.stream!) : detectLanguage(filename.value)?.support)!),
    ]
  } : {
    extensions: [
      basicSetup,
      languageCompartment.of([]),
    ]
  })
  e = new EditorView({
    parent: editorRef.value!,
    state
  });
})
</script>

<template>
  <div class="editor-container flex flex-row p-1 py-2 w-full max-w-[100lvw] max-h-full">
    <!-- Two Major Tabs -->
    <div class="flex flex-col grow max-w-[94%]">
      <!-- Main Code Editor Tab -->
      <div class="flex min-h-8 flex-row items-center justify-start gap-1 px-1">
        <!-- Icon -->
        <div :key="language.name">
          <Icon :icon="language.icon" />
        </div>

        <!-- Text Editor for file name -->
        <div>
          <input
            v-model="filename"
            class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 bg-[var(--color-background)]"
            placeholder="file.txt"
            @change="setLanguage()"
          />
        </div>
      </div>
      <div class="editor w-full">
        <div ref="editor"
        ></div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-start gap-4 px-3 border-l dark:border-gray-100 w-full max-w-14">
      <!-- Tab Items -->
      <div v-for="view in views" :key="view.name">
        <div @click="setRightPanel(view)">
          <component :is="view.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cm-editor {
  max-height: 82lvh;
}

@media (prefers-color-scheme: dark) {
  .cm-gutter {
    background-color: var(--color-background);
  }
}
</style>
