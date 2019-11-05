import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/'

const ROLE_ADMIN = 'admin'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      beforeEnter: function(to, from, next) {
        if(store.getters.authenticated) {
          next({name: 'home'})
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/adminPanel',
      name: 'adminPanel',
      component: () => import ('@/views/AdminPanel.vue'),
      meta: { authorizeRole: ROLE_ADMIN },
      beforeEnter: requireAuth
    },
    {
      path: '/facility/:name',
      name: 'facilityDetails',
      component: () => import('@/views/FacilityDetails.vue')
    },
    {
      path: '/facility/:calendar',
      name: 'facilityCalendar',
      component: () => import('@/views/FacilityCalendar.vue')
    },
    {
      path: '/calendar/:facility',
      name: 'calendar',
      component: () => import('@/views/FacilityCalendar.vue')
    },
    {
      path: '/administratorpanel',
      name: 'administratorpanel',
      component: () => import('@/views/AdministratorPanel.vue')
    }        
  ]
})

function requireAuth(to, from, next) {
  if (store.getters.authenticated) {
    requireRole(to, from, next)
  } else {
    next({ name: 'login' })
  }
}
function requireRole(to, from, next) {
  const { authorizeRole } = to.meta;
  const userRole = store.getters.user.role 
  if(authorizeRole && userRole !== authorizeRole) {
    next({ name: 'home' })
  } else {
    next()
  }
}

export default router
