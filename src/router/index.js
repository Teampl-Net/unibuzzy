import { createRouter, createWebHistory } from 'vue-router'
// import { useStore } from 'vuex'

import routerMain from '../views/Tal_router_main.vue'

import main from '../views/Tal_main.vue'
import login from '../views/intro/Tal_login.vue'
import permissions from '../views/intro/Tal_permissions.vue'
import policies from '../views/intro/Tal_policies.vue'

import setMypage from '../views/Tal_setMypage.vue'
import pushList from '../views/Tal_pushList.vue'
import chanList from '../views/Tal_chanList.vue'

import test from '../views/test.vue'
// import store from '../store/index'

const routes = [
  {
    path: '/2',
    name: 'routerMain',
    component: routerMain,
    children: [
      {
        path: '/',
        name: 'main',
        props: true,
        component: main
        // beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        //   if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
        //    return next()
        //  }
        //   next('/policies')
        // }

      },
      {
        path: '/setMypage',
        name: 'setMypage',
        props: true,
        component: setMypage
        // beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        //   if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
        //    return next()
        //  }
        //   next('/policies')
        // }
      },
      {
        path: '/pushList',
        name: 'pushList',
        props: true,
        component: pushList
        // beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        //   if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
        //    return next()
        //  }
        //   next('/policies')
        // }
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: chanList
        // beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        //   if (localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== '') {
        //    return next()
        //  }
        //   next('/policies')
        // }
      }
    ]
    // beforeEnter: (to, from, next) => {
    //   if (useStore.state.displayName !== '') {
    //     return next()
    //   }
    //   alert('로그인 필요')
    //   next('/login')
    // }
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
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
