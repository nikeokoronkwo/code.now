<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  coming: string | undefined
}>()
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full">
    <Icon icon="mage:robot-sad" class="scale-[6] pb-1" />
    <div class=" text-2xl font-bold">Whoops</div>
    <p>This feature is not supported yet. Sorry for the inconvenience</p>
    <p v-if="coming">
      We are currently working on it: you can take a look <a :href="coming" target="_blank">here</a>
    </p>
  </div>
</template>
