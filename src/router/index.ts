import { createRouter, createWebHistory } from 'vue-router'
// import main from '@/views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/main.vue'),
    },
    {
      path: '/__beta',
      name: 'beta',
      component: () => import('../views/beta.vue'),
    },
  ],
})

export default router
