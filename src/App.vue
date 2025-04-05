<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Layout View -->
  <div class="flex flex-col max-h-screen h-screen">
    <header class="flex flex-row justify-between items-center py-2 px-2">
      <div class=" font-mono text-lg font-bold">code.now</div>
      <div>
        <div>Share</div>
      </div>
    </header>
    <!-- Main View -->
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="flex flex-row justify-between py-3 px-2">
      <div>
        <button>Share <span class="font-mono font-bold">code.now</span></button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
main {
  max-width: 100%;
  max-height: 100%;
}
</style>
