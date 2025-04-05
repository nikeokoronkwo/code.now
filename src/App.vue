<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Layout View -->
  <div class="main flex h-screen flex-col">
    <header class="sticky flex flex-row items-center justify-between border-b px-2 py-2 shadow-sm">
      <div class="font-mono text-lg font-bold">code.now</div>
      <!-- <div>
        <div>Share</div>
      </div> -->
    </header>
    <!-- Main View -->
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
    <footer
      class="flex w-full flex-row justify-between border-t bg-[var(--color-background)] px-2 py-3"
    >
      <!-- <div>
        <button>Share <span class="font-mono font-bold">code.now</span></button>
      </div> -->
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
