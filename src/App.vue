<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Layout View -->
  <div class="flex flex-col main h-screen">
    <header class="flex flex-row sticky justify-between items-center py-2 px-2 shadow-sm border-b">
      <div class=" font-mono text-lg font-bold">code.now</div>
      <!-- <div>
        <div>Share</div>
      </div> -->
    </header>
    <!-- Main View -->
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
    <footer class="flex flex-row justify-between py-3 px-2 bg-[var(--color-background)] w-full">
      <div>
        <button>Share <span class="font-mono font-bold">code.now</span></button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
main {
  max-width: 100%;
}

.main {
  max-height: 100%;
}
</style>
