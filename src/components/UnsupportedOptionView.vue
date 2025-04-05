<script setup lang="ts">
defineProps<{
  coming: string | undefined,
}>()
</script>

<template>
  <div>
    <p>This feature is not supported yet. Sorry for the inconvenience</p>
    <p v-if="coming">We are currently working on it: you can take a look <a :href="coming" target="_blank">here</a></p>
  </div>
</template>
