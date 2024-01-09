/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import store from '@/store'
import routes from './routerIndex/D_index'
// import { useStore } from 'vuex'
// let rList = require('./routerIndex/D_index')
var appInfo = store.getters['D_USER/AC_USER_APP']

// if (appInfo && appInfo.appType) rList = require(`./routerIndex/${appInfo.appType}_index`)
// const routes = rList.routes
console.log(routes)
export const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
