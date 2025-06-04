<script setup lang="ts">
import markdownRender from '@/utils/markdownRender';
import { ref, watch } from 'vue';

const model = defineModel({
  type: String
})

const html = ref<string>('');

watch(model, async (value, oldValue) => {
  html.value = value ? await markdownRender(value) : ''
})
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="markdown" v-html="html"></div>
  </div>
</template>
