import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Inicio' }
  },
  {
    path: '/grupo/:id',
    name: 'grupo',
    component: () => import('../views/GroupView.vue'),
    props: true,
    meta: { title: 'Grupo' }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'inicio' }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
