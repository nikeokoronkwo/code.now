<script setup lang="ts">
import ActiveEditor from '@/components/ActiveEditor.vue';
import usePersistentCode from '@/stores/usePersistentCode';
import type { Gist } from '@/utils/gists';
import { detectLanguage } from '@/utils/languages';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from "@iconify/vue"

const route = useRoute()
const id = route.query.id as string | undefined

const currentIndex = ref(0);

const codeFiles = ref<{
  name: string;
  code: string;
}[]>([])

const currentFilename = computed({
  get: () => codeFiles.value.length === 0 ? '' : codeFiles.value[currentIndex.value].name,
  set(newValue) {
    if (codeFiles.value.length === 0) return;
    codeFiles.value[currentIndex.value].name = newValue
  }
})
const currentCode = ref(codeFiles.value.length === 0 ? '' : codeFiles.value[currentIndex.value].code)

watch(currentIndex, (newValue) => {
  console.log(currentIndex.value, newValue, codeFiles.value[newValue].code)
  currentCode.value = codeFiles.value[newValue].code
})


const currentLanguage = computed(
  () =>
    getLanguage(currentFilename.value),
)

function getLanguage(filename: string) {
  return detectLanguage(filename) ?? {
      name: 'unknown',
      id: undefined,
      icon: 'vscode-icons:default-file',
    };
}

function addNewFile() {
  codeFiles.value.push({
    name: '',
    code: ''
  });
  currentIndex.value = codeFiles.value.length - 1
}

const persistentCode = usePersistentCode()

onMounted(async () => {
  if (id) {
    const body = (await (await fetch(`https://api.github.com/gists/${id}`)).json()) as Gist

    /** @todo support multiple files */
    const files = Object.entries(body.files)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    codeFiles.value = files.map(([_str, fileInfo]) => {
      return {
        name: fileInfo.filename,
        code: fileInfo.content
      }
    })

  } else {
    const storedCodeFiles = persistentCode.getAllCodeFiles();

    codeFiles.value = storedCodeFiles ?? [];
  }

  currentCode.value = codeFiles.value[0].code
  currentFilename.value = codeFiles.value[0].name
})

watch(codeFiles, (newValue) => {
  persistentCode.saveAllCodeFiles(newValue)
}, { deep: true })

</script>

<template>
  <div class="flex flex-1 grow flex-col w-full max-w-[100lvw] h-full">
    <div class="flex flex-row justify-between min-h-8 border-b-[1px]">
      <div class="flex flex-row">
        <div
          v-for="codeFile in codeFiles"
          :key="codeFiles.indexOf(codeFile)"
          :class="`flex flex-row items-center justify-evenly border-l border-r space-x-3 px-3 ` + (codeFile.name !== currentFilename ? 'bg-gray-300' : '')"
          @click="currentIndex = codeFiles.indexOf(codeFile)"
        >
          <div :key="getLanguage(codeFile.name).name">
            <Icon :icon="getLanguage(codeFile.name).icon" class="scale-[2]" />
          </div>

          <Transition name="slide">
            <div v-if="codeFile.name !== currentFilename" class="flex flex-col items-center justify-center">
              <span class="text-sm">{{ codeFile.name }}</span>
            </div>
            <div v-else class="flex flex-col items-center justify-center">
              <input
                v-model="currentFilename"
                class="block min-w-0 grow bg-[var(--color-background)] py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:text-gray-100"
                placeholder="file.txt"
              />
            </div>
          </Transition>
        </div>

      </div>
      <button
        class="min-w-2 border-l-2 flex flex-col items-center justify-center"
        @click="addNewFile()"
      >
        <Icon icon="ic:round-plus" class="aspect-square w-8 scale-150" />
      </button>
    </div>

    <ActiveEditor v-model:code="currentCode" v-model:filename="currentFilename" />
  </div>
</template>

<style lang="css" scoped>
/* .slide-enter-active {
  animation: slide 0.5s;
}
.slide-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
