import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/papers',
      name: 'papers',
      component: () => import('../views/PaperHome.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    // /paper/{id} to Paper.vue
    {
      path: '/paper/:id',
      name: 'paper',
      component: () => import('../views/Paper.vue')
    }
  ]
})

export default router
