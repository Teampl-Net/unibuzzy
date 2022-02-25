import { createRouter, createWebHistory } from 'vue-router'
import mainRoute from '../views/vAd_mainRoute.vue'
import main from '../views/vAd_main.vue'
import login from '../views/vAd_login.vue'
import manageChannel from '../views/vAd_manageChan.vue'
import writePush from '../views/vAd_writePush.vue'
import manageRecvList from '../views/vAd_recvUserList.vue'
import sendPushList from '../views/vAd_sendPushList.vue'
// import statistics from '../views/vAd_statistic.vue'
const routes = [
  {
    path: '/',
    name: 'mainRoute',
    component: mainRoute,
    children: [
      {
        path: '/',
        name: 'main',
        component: main
      },
      {
        path: '/manageChannel',
        name: 'manageChannel',
        component: manageChannel
      },
      {
        path: '/writePush',
        name: 'writePush',
        component: writePush
      },
      {
        path: '/manageRecvList',
        name: 'manageRecvList',
        component: manageRecvList
      },
      {
        path: '/sendPushList',
        name: 'sendPushList',
        component: sendPushList
      }
      // {
      //   path: '/statistics',
      //   name: 'statistics',
      //   component: statistics
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
