import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PaperHome from '@/views/PaperHome.vue'
import AboutView from '@/views/AboutView.vue'
import Paper from '../views/Paper.vue'

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
      component: PaperHome
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    // /paper/{id} to Paper.vue
    {
      path: '/paper/:id',
      name: 'paper',
      component: Paper
    }
  ]
})

export default router
