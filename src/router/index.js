/* eslint-disable no-unused-vars */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  createMemoryHistory
} from 'vue-router'
import { functions } from '../assets/js/D_vuexFunction'
import axios from 'axios'
import store from '../store'
import {
  methods,
  commonAxiosFunction
} from '../../public/commonAssets/Tal_axiosFunction'

let routes = []
const routerMain = () => import('../pages/Router_main.vue')
const login = () => import('../pages/intro/Login.vue')
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
        component: () =>
          import(/* webpackChunkName: "about" */ '@/pages/routerPages/Main.vue')
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
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/UniB_main.vue'
          )
      },
      {
        path: '/contents/:contentsKey/:creTeamKey/:cabinetKey',
        name: 'contents',
        props: true,
        meta: {
          page: 1
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/ContentsDetail.vue'
          ),
        beforeEnter(to, from, next) {
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
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/ChanMain.vue'
          ),
        beforeEnter(to, from, next) {
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
        beforeRouteLeave(to, from, next) {
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
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/BoardMain.vue'
          )
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
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/SearchPage.vue'
          )
      },
      {
        path: '/myPage',
        name: 'myPage',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/MyPage.vue'
          ),
        meta: {
          page: 4
        }
      },
      {
        path: '/settings',
        name: 'settings',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/SetMyPage.vue'
          ),
        meta: {
          page: 4
        }
      },
      {
        path: '/fileBox',
        name: 'fileBox',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/TotalFileList.vue'
          )
      },
      {
        path: '/saveBox',
        name: 'saveBox',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/MorePushList.vue'
          )
      },
      {
        path: '/cancel',
        name: 'cancel',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/LeaveUniBuzzy.vue'
          )
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/ChanList.vue'
          ),
        meta: {
          page: 3
        }
      },
      {
        path: '/findChan',
        name: 'findChan',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/FindChanList.vue'
          )
      },
      {
        path: '/developer',
        name: 'developer',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/DeveloperPage.vue'
          )
      },
      {
        path: '/todo',
        name: 'todo',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../pages/routerPages/TodoList.vue'
          )
      },
      {
        path: '/todo/:contentsKey/:creTeamKey/:cabinetKey',
        name: 'todoContents',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../components/pageComponents/todo/unibDetailPop.vue'
          )
      },
      {
        path: '/testSetup',
        name: 'testSetup',
        component: () =>
          import(/* webpackChunkName: "about" */ '../pages/Test.vue')
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
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/intro/TestLoginPage.vue')
  },
  {
    path: '/permissions',
    name: 'permissions',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/intro/Permissions.vue')
  },
  {
    path: '/policy/:type',
    name: 'policy',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/intro/Policies.vue')
  },
  {
    path: '/policies',
    name: 'policies',
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/intro/AgreePolicies.vue')
  },
  {
    path: '/errorPage',
    name: 'errorPage',
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../pages/routerPages/ErrorPage.vue'
      )
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
