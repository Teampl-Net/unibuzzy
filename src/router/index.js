/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import store from '@/store'
import { routes } from './routerIndex/D_index'
// import { useStore } from 'vuex'
// let rList = require('./routerIndex/D_index')
var appInfo = store.getters['D_USER/AC_USER_APP']

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
