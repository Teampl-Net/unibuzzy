import { createRouter, createWebHistory } from 'vue-router'
// import { useStore } from 'vuex'

import routerMain from '../pages/Tal_router_main.vue'

import main from '../pages/routerPages/Tal_main.vue'
import login from '../pages/intro/Tal_login.vue'
import permissions from '../pages/intro/Tal_permissions.vue'
import policies from '../pages/intro/Tal_policies.vue'
import setMypage from '../pages/routerPages/Tal_setMypage.vue'
import pushList from '../pages/routerPages/Tal_pushList.vue'
import chanList from '../pages/routerPages/Tal_chanList.vue'

import test from '../pages/test.vue'
// import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'routerMain',
    component: routerMain,
    children: [
      {
        path: '/',
        name: 'main',
        props: true,
        component: main,
        beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
            return next()
          }
          next('/policies')
        }
      },
      {
        path: '/setMypage',
        name: 'setMypage',
        props: true,
        component: setMypage
        /* beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
            return next()
          }
          next('/policies')
        } */
      },
      {
        path: '/pushList',
        name: 'pushList',
        props: true,
        component: pushList
        /* beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
            return next()
          }
          next('/policies')
        } */
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: chanList
        /* beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
            return next()
          }
          next('/policies')
        } */
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: login
  },
  {
    path: '/permissions',
    name: 'permissions',
    props: true,
    component: permissions
  },
  {
    path: '/policies',
    name: 'policies',
    props: true,
    component: policies
  },
  {
    path: '/test',
    name: 'test',
    props: true,
    component: test
  }
  // {
  //  path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
