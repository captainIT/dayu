import { createRouter, createWebHistory } from 'vue-router'
import  Layout  from '@/components/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'data',
      component: Layout,
      children:[
        {
          path:"/",
          component: () => import('../views/Data.vue')
        },
        {
        path:"settings",
        component: () => import('../views/AboutView.vue')
      },{
        path:"data",
        component: () => import('../views/Data.vue')
      }
        ,{
          path:"model",
          component: () => import('../views/Model.vue')
        }
        ,{
          path:"labeling",
          component: () => import('../views/Labeling.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/cropperTools',
      name: 'cropperTools',
      component: () => import('../views/tools/cropperTools/index.vue')
    }
  ]
})


router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localStorage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
