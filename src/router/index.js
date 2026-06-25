import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/group/:id',
    name: 'group',
    component: () => import('../views/GroupView.vue'),
    props: true
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
