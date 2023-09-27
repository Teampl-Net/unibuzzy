/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import { functions } from '../assets/js/D_vuexFunction'
import axios from 'axios'
import store from '../store'
import { methods, commonAxiosFunction } from '../../public/commonAssets/Tal_axiosFunction'

let routes = []
const routerMain = () => import('../pages/UB/UB_router_main.vue')
const login = () => import('../pages/UB/intro/UB_login.vue')
routes = [
  {
    path: '/',
    name: 'routerMain',
    component: routerMain,
    children: [
      {
        path: '/',
        name: 'main',
        props: true,
        meta: {
          page: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '@/pages/UB/routerPages/UB_main.vue')
        // beforeEnter: (to, from, next) => {
        //   // 만약 로그인 상태라면
        //   var loginYn = localStorage.getItem('loginYn')
        //   if (loginYn !== 'false' || loginYn !== false) {
        //     return next()
        //   } else if (loginYn === false || loginYn === 'false') {
        //     return next('/policies')
        //   }
        // }
      },
      {
        path: '/unibuzzy',
        name: 'uniBmain',
        props: true,
        meta: {
          page: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_uniB_main.vue')
      },
      {
        path: '/contents/:contentsKey/:creTeamKey/:cabinetKey',
        name: 'contents',
        props: true,
        meta: {
          page: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_contentsDetail.vue'),
        beforeEnter (to, from, next) {
          if (from.name && from.name !== to.name && from.name === 'chanMain') {
            localStorage.setItem('preListTeamKey', from.params.encodedTeamKey)
          }
          next()
          // ...
        }
      },
      {
        path: '/chan/:encodedTeamKey',
        name: 'chanMain',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_chanMain.vue'),
        beforeEnter (to, from, next) {
          if (from.name && from.name !== to.name && from.name === 'contents') {
            const fromTeamKey = localStorage.getItem('preListTeamKey')
            if (fromTeamKey && fromTeamKey === to.params.encodedTeamKey) {
              localStorage.setItem('preDataYn', 'true')
            }
          } else {
            store.commit('UB_PRE_DATA/MU_CLEAN')
            localStorage.removeItem('preDataYn')
            localStorage.removeItem('preListTeamKey')
          }
          next()
          // ...
        },
        beforeRouteLeave (to, from, next) {
          // 여기에 페이지를 떠나기 전에 수행할 작업을 추가합니다.
          if (to.name !== 'contents') {
            store.commit('UB_PRE_DATA/MU_CLEAN')
            localStorage.removeItem('preDataYn')
            localStorage.removeItem('preListTeamKey')
          }
          // 예시: 페이지를 떠나기 전에 어떤 동작 수행
          console.log('상세 페이지를 떠나기 전에 수행할 작업입니다.')

          // 다음 페이지로 이동하려면 next()를 호출합니다.
          next()
        }
      },
      {
        path: '/board/:teamKey/:targetKey',
        name: 'board',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_boardMain.vue')
      },
      {
        path: '/unknown',
        name: 'unknown',
        props: true,
        // component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_main.vue')
        component: login
      },
      {
        path: '/search',
        name: 'search',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/UB_searchPage.vue')
      },
      {
        path: '/myPage',
        name: 'myPage',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/UB_myPage.vue'),
        meta: {
          page: 4
        }
      },
      {
        path: '/settings',
        name: 'settings',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_setMyPage.vue'),
        meta: {
          page: 4
        }
      },
      {
        path: '/fileBox',
        name: 'fileBox',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../components/popup/file/UB_totalFileList.vue')
      },
      {
        path: '/saveBox',
        name: 'saveBox',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_morePushList.vue')
      },
      {
        path: '/cancel',
        name: 'cancel',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_leaveUniBuzzy.vue')
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_chanList.vue'),
        meta: {
          page: 3
        }
      },
      {
        path: '/findChan',
        name: 'findChan',
        component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_findChanList.vue')
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
    path: '/testLoginPage',
    name: 'testLoginPage',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../pages/intro/UB_testLoginPage.vue')
  },
  {
    path: '/permissions',
    name: 'permissions',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../pages/intro/UB_permissions.vue')
  },
  {
    path: '/policy/:type',
    name: 'policy',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../pages/UB/intro/UB_policies.vue')
  },
  {
    path: '/policies',
    name: 'policies',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../pages/UB/intro/UB_agreePolicies.vue')
  },
  {
    path: '/errorPage',
    name: 'errorPage',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/UB_errorPage.vue')
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
  console.log(to)
  var history = store.getters['UB_HISTORY/hStack']
  console.log(history)
  history.push('router$#$' + to.name)
  store.commit('UB_HISTORY/updateStack', history)
})
export default router
