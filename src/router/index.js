/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import { functions } from '../assets/js/D_vuexFunction'
import axios from 'axios'
import store from '../store'
import { methods, commonAxiosFunction } from '../../public/commonAssets/Tal_axiosFunction'
// import routerMain from '../pages/Tal_router_main.vue'
import search from '../pages/routerPages/D_searchPage.vue'
// import myChanList from '../components/popup/del_Tal_managerChanList.vue'
/* import naverCallback from '../pages/intro/Tal_naverLoginCallback.vue' */

let routes = []
let type = ''
type = 'UB'
// type = 'D'
if (type === 'UB') {
  const routerMain = () => import('../pages/UB/UB_router_main.vue')
  const login = () => import('../pages/UB/intro/UB_login.vue')
  routes = [
    {
      path: '/PARTNER',
      name: 'D_PARTNER',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/D_coreProxy.vue')
    },
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
              // eslint-disable-next-line no-debugger
              debugger
            }
            next()
            // ...
          }
        },
        {
          // path: '/chan/:key',
          // path: '/chan/:pTeamKey',
          path: '/chan/:encodedTeamKey',
          name: 'chanMain',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_chanMain.vue'),
          beforeEnter (to, from, next) {
            // eslint-disable-next-line no-debugger
            debugger
            if (from.name && from.name !== to.name && from.name === 'contents') {
              const fromTeamKey = localStorage.getItem('preListTeamKey')
              if (fromTeamKey && fromTeamKey === to.params.encodedTeamKey) {
                localStorage.setItem('preDataYn', 'true')
              }
            } else {
              store.commit('D_PRE_DATA/MU_CLEAN')
              localStorage.removeItem('preDataYn')
              localStorage.removeItem('preListTeamKey')
            }
            next()
            // ...
          },
          beforeRouteLeave (to, from, next) {
            // 여기에 페이지를 떠나기 전에 수행할 작업을 추가합니다.
            if (to.name !== 'contents') {
              store.commit('D_PRE_DATA/MU_CLEAN')
              localStorage.removeItem('preDataYn')
              localStorage.removeItem('preListTeamKey')
            }
            // 예시: 페이지를 떠나기 전에 어떤 동작 수행
            console.log('상세 페이지를 떠나기 전에 수행할 작업입니다.')

            // 다음 페이지로 이동하려면 next()를 호출합니다.
            next()
          }

          // alias: ['/:pTeamKey', '']
        },
        {
          // path: '/chan/:key',
          // path: '/chan/:pTeamKey',
          path: '/board/:teamKey/:targetKey',
          name: 'board',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/UB/routerPages/UB_boardMain.vue')
          // alias: ['/:pTeamKey', '']
        },
        {
          path: '/mylog',
          name: 'logList',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../components/pageComponents/main/D_notiHistoryList.vue')
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
          component: search
        },
        {
          path: '/myPage',
          name: 'myPage',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_myPage.vue'),
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
          component: () => import(/* webpackChunkName: "about" */ '../components/popup/file/D_totalFileList.vue')
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
        /* {
          path: '/',
          name: 'pushList',
          props: true,
          component: pushList,
          meta: {
            page: 2
          }
        }, */
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
        },
        {
          path: '/logList',
          name: 'logList',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/Tal_logList.vue'),
          beforeEnter: (to, from, next) => {
            // 만약 로그인 상태라면
            if (localStorage.getItem('loginYn') !== true) { return next() } else next({ name: 'policies' })
          }
        }
        // {
        //   path: '/favList',
        //   name: 'favList',
        //   props: true,
        //   component: () => import(/* webpackChunkName: "about" */ '../components/UB/popup/UB_favListPop.vue')
        // }
      ]
    },
    {
      path: '/naverCallback',
      name: 'naverCallback',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_naverLoginCallback.vue')
    },
    // {
    //   path: '/naverCallbackTest',
    //   name: 'naverCallbackTest',
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_naverLoginCallback copy.vue')
    // },
    {
      path: '/testLoginPage',
      name: 'testLoginPage',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/testLoginPage.vue')
    },
    {
      path: '/nonMemInquiryBoard',
      name: 'nonMemInquiryBoard',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_nonMemberInquiryBoard.vue')
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
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_permissions.vue')
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
      path: '/saveName',
      name: 'saveName',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/Tal_saveName.vue')
    },
    {
      path: '/certiPhone',
      name: 'certiPhone',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/pageComponents/intro/D_certi_phone.vue')
    },
    {
      path: '/certiPhoneReturn',
      name: 'certiPhoneReturn',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/pageComponents/intro/D_certi_phone_return.vue')
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ '../pages/intro/suminTest.vue')
    // },
    {
      path: '/ssoLogin',
      name: 'ssoLogin',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/backuplogin.vue')
    },
    {
      path: '/contDetail',
      name: 'contDetail',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_contentsDetail.vue')
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_errorPage.vue')
    },
    {
      path: '/boardDetail',
      name: 'boardDetail',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/board/D_boardMain.vue')
    }
  ]
} else if (type === 'D') {
  const routerMain = () => import('../pages/Tal_router_main.vue')
  const login = () => import('../pages/intro/Tal_login.vue')

  routes = [
    {
      path: '/PARTNER',
      name: 'D_PARTNER',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/D_coreProxy.vue')
    },
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
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_main.vue')
          /* ,
          beforeEnter: (to, from, next) => {
            // 만약 로그인 상태라면
            var loginYn = localStorage.getItem('loginYn')
            if (loginYn !== false) {
              return next()
            } else if (loginYn === false) {
              next('/policies')
            }
          } */
        },
        {
          path: '/unknown',
          name: 'unknown',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_main.vue')
        },
        {
          path: '/search',
          name: 'search',
          props: true,
          component: search
        },
        {
          path: '/myPage',
          name: 'myPage',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_myPage.vue'),
          meta: {
            page: 4
          }
        },
        /* {
          path: '/',
          name: 'pushList',
          props: true,
          component: pushList,
          meta: {
            page: 2
          }
        }, */
        {
          path: '/chanList',
          name: 'chanList',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_chanList.vue'),
          meta: {
            page: 3
          }
        },
        {
          path: '/logList',
          name: 'logList',
          props: true,
          component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/Tal_logList.vue'),
          beforeEnter: (to, from, next) => {
            // 만약 로그인 상태라면
            if (localStorage.getItem('loginYn') !== true) { return next() } else next({ name: 'policies' })
          }
        }
      ]
    },
    {
      path: '/naverCallback',
      name: 'naverCallback',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_naverLoginCallback.vue')
    },
    // {
    //   path: '/naverCallbackTest',
    //   name: 'naverCallbackTest',
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_naverLoginCallback copy.vue')
    // },
    {
      path: '/testLoginPage',
      name: 'testLoginPage',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/testLoginPage.vue')
    },
    {
      path: '/nonMemInquiryBoard',
      name: 'nonMemInquiryBoard',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_nonMemberInquiryBoard.vue')
    },
    {
      path: '/login',
      name: 'login',
      props: true,
      component: login,
      beforeEnter: (to, from, next) => {
        // 만약 로그인 상태라면
        next()
      }
    },
    {
      path: '/permissions',
      name: 'permissions',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_permissions.vue')
    },
    {
      path: '/policies',
      name: 'policies',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/intro/Tal_policies.vue')
    },
    {
      path: '/savePhone',
      name: 'savePhone',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/Tal_savePhone.vue')
    },
    {
      path: '/saveName',
      name: 'saveName',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/Tal_saveName.vue')
    },
    {
      path: '/certiPhone',
      name: 'certiPhone',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/pageComponents/intro/D_certi_phone.vue')
    },
    {
      path: '/certiPhoneReturn',
      name: 'certiPhoneReturn',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/pageComponents/intro/D_certi_phone_return.vue')
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   props: true,
    //   component: () => import(/* webpackChunkName: "about" */ '../pages/intro/suminTest.vue')
    // },
    {
      path: '/ssoLogin',
      name: 'ssoLogin',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/backuplogin.vue')
    },
    {
      path: '/contDetail',
      name: 'contDetail',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_contentsDetail.vue')
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../pages/routerPages/D_errorPage.vue')
    },
    {
      path: '/boardDetail',
      name: 'boardDetail',
      props: true,
      component: () => import(/* webpackChunkName: "about" */ '../components/board/D_boardMain.vue')
    }
  ]
}

const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
  console.log(to)
  var history = store.getters['D_HISTORY/hStack']
  console.log(history)
  history.push('router$#$' + to.name)
  store.commit('D_HISTORY/updateStack', history)
})
export default router
