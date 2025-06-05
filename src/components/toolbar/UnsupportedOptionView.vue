<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  coming: string | undefined
}>()
</script>

<template>
  <div class="flex h-full w-full flex-col items-center justify-center space-y-2 text-center">
    <Icon icon="mage:robot-sad" class="scale-[6] pb-1" />
    <div class="text-2xl font-bold">Whoops</div>
    <p class="flex flex-col items-center justify-center text-center">
      <span>This feature is not supported yet.</span>
      <span>Sorry for the inconvenience</span>
    </p>
    <p v-if="coming">
      We are currently working on it: you can take a look <a :href="coming" target="_blank">here</a>
    </p>
  </div>
</template>
