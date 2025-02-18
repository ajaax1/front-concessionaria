import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/usuarios/?page=:page(\\d+)',
      name: 'user',
      component: UserView,
    },
    {
      path: '/usuarios',
      name: 'user',
      component: UserView,
    }
  ],
})

export default router
