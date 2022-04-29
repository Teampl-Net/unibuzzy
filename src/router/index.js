import { createRouter, createWebHashHistory } from 'vue-router'
// import { useStore } from 'vuex'

import routerMain from '../pages/Tal_router_main.vue'

import testLoginPage from '../pages/intro/testLoginPage.vue'
import main from '../pages/routerPages/Tal_main.vue'
import login from '../pages/intro/Tal_login.vue'
import permissions from '../pages/intro/Tal_permissions.vue'
import policies from '../pages/intro/Tal_policies.vue'
import setMypage from '../pages/routerPages/Tal_setMypage.vue'
import pushList from '../pages/routerPages/Tal_pushList.vue'
import chanList from '../pages/routerPages/Tal_chanList.vue'
// import { loginCheck } from '../assets/js/Tal_common'
import savePhone from '../pages/routerPages/Tal_savePhone.vue'
import saveName from '../pages/routerPages/Tal_saveName.vue'
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
        component: main
        /* ,
        beforeEnter: (to, from, next) => {
          // 만약 로그인 상태라면
          var loginYn = localStorage.getItem('loginYn')
          if (loginYn !== false) {
            alert(loginYn)
            return next()
          } else if (loginYn === false) {
            next('/policies')
          }
        } */
      },
      {
        path: '/setMypage',
        name: 'setMypage',
        props: true,
        component: setMypage
        /* beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('loginYn') !== true) { return next() } else next('/policies')
        } */
      },
      {
        path: '/pushList',
        name: 'pushList',
        props: true,
        component: pushList,
        beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면

          if (localStorage.getItem('loginYn') !== true) { return next() } else next('/policies')
        }
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: chanList,
        beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
          if (localStorage.getItem('loginYn') !== true) { return next() } else next('/policies')
        }
      }
    ]
  },
  {
    path: '/testLoginPage',
    name: 'testLoginPage',
    props: true,
    component: testLoginPage
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
    path: '/savePhone',
    name: 'savePhone',
    props: true,
    component: savePhone
  },
  {
    path: '/saveName',
    name: 'saveName',
    props: true,
    component: saveName
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
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
