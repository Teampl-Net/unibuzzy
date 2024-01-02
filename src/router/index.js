/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
// import { useStore } from 'vuex'
let rList = require('./routerIndex/D_index')
if (localStorage.getItem('appType')) {
  if (localStorage.getItem('appType') === 'D') rList = require('./routerIndex/D_index')
  if (localStorage.getItem('appType') === 'UB') rList = require('./routerIndex/UB_index')
}
const routes = rList.routes
console.log(routes)
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
