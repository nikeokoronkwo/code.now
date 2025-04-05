<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- Layout View -->
  <div class="main flex flex-col">
    <header class="flex flex-row justify-between items-center py-2 px-2">
      <div class=" font-mono text-lg font-bold">code.now</div>
      <div>
        <div>Share</div>
      </div>
    </header>
    <!-- Main View -->
    <main>
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
}

.main {
  max-height: 100%;
}
</style>
