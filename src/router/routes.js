import { LocalStorage } from 'quasar'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta:{
      requiresAuth:false
    },

    children: [
      { 
        path: '',
       component: () => import('pages/Index.vue'),
       },
    ],
  },
  {
    path: '/auth',
    component: () => import ('layouts/auth.vue'),
    meta: {requiresAuth: true},
    name: 'auth',

  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

