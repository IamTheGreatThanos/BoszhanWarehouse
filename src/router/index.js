import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Day/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/night',
    name: 'HomeViewNight',
    component: () => import('../views/Night/HomeViewNight.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/orders/tomorrow',
    name: 'TomorrowsOrders',
    component: () => import('../views/Day/TomorrowsOrders.vue')
  },
  {
    path: '/orders/today',
    name: 'TodaysOrders',
    component: () => import('../views/Day/TodaysOrders.vue')
  },
  {
    path: '/time',
    name: 'TimeView',
    component: () => import('../views/Day/TimeView.vue')
  },
  {
    path: '/incoming',
    name: 'IncomingMovements',
    component: () => import('../views/Day/IncomingMovements.vue')
  },
  {
    path: '/outbound',
    name: 'OutboundMovements',
    component: () => import('../views/Day/OutboundMovements.vue')
  },
  {
    path: '/balance',
    name: 'BalanceReport',
    component: () => import('../views/Day/BalanceReport.vue')
  },
  {
    path: '/night/balance',
    name: 'BalanceReportNight',
    component: () => import('../views/Night/BalanceReportNight.vue')
  },
  {
    path: '/night/tomorrow',
    name: 'TomorrowOrdersNight',
    component: () => import('../views/Night/TomorrowOrdersNight.vue')
  },
  {
    path: '/night/incoming',
    name: 'IncomingMovementsNight',
    component: () => import('../views/Night/IncomingMovementsNight.vue')
  },
  {
    path: '/night/outbound',
    name: 'OutboundMovementsNight',
    component: () => import('../views/Night/OutboundMovementsNight.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
