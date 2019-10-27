import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/FacilityRegister.vue')
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
