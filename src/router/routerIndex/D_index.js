
import routerMain from '../../pages/Tal_router_main.vue'
import search from '../../pages/routerPages/D_searchPage.vue'
import login from '../../pages/intro/Tal_login.vue'

export const routes = [
  // {
  //   path: '/jisuTest',
  //   name: 'jisuTest',
  //   component: jisuTest
  // },
  {
    path: '/PARTNER',
    name: 'D_PARTNER',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/D_coreProxy.vue')
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
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_main.vue')
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
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_main.vue')
      },
      {
        path: '/imgmain',
        name: 'imagemain',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_ImageMain.vue')
      },
      {
        path: '/comList',
        name: 'imagemain',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_communityList.vue')
      },
      {
        path: '/search',
        name: 'search',
        props: true,
        component: search
      },
      {
        path: '/todo',
        name: 'todo',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/TodoList.vue')
      },
      {
        path: '/myPage',
        name: 'myPage',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_myPage.vue'),
        meta: {
          page: 4
        }
      },
      {
        path: '/view/:date/:jobkindId',
        name: 'frameView',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_frameView.vue'),
        meta: {
          page: 2
        }
      },
      {
        path: '/chanList',
        name: 'chanList',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_chanList.vue'),
        meta: {
          page: 3
        }
      },
      {
        path: '/logList',
        name: 'logList',
        props: true,
        component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/Tal_logList.vue'),
        beforeEnter: (to, from, next) => {
          // 만약 로그인 상태라면
          if (localStorage.getItem('loginYn') !== true) { return next() } else next({ name: 'policies' })
        }
      }
    ]
  },
  {
    path: '/developer',
    name: 'developer',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_developerPage.vue')
  },
  {
    path: '/naverCallback',
    name: 'naverCallback',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/Tal_naverLoginCallback.vue')
  },
  {
    path: '/naverCallbackTest',
    name: 'naverCallbackTest',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/Tal_naverLoginCallback copy.vue')
  },
  /* {
      path: '/testLoginPage',
      name: 'testLoginPage',
      props: true,
      component: () => import('../../pages/intro/testLoginPage.vue')
    }, */
  {
    path: '/nonMemInquiryBoard',
    name: 'nonMemInquiryBoard',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/Tal_nonMemberInquiryBoard.vue')
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: login
  },
  // {
  //   path: '/login',
  //   name: 'UBlogin',
  //   props: true,
  //   component: UBlogin
  // },
  {
    path: '/permissions',
    name: 'permissions',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/Tal_permissions.vue')
  },
  {
    path: '/policies',
    name: 'policies',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/Tal_policies.vue')
  },
  // {
  //   path: '/policies',
  //   name: 'UBpolicies',
  //   props: true,
  //   component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/UB_AgreePolicies.vue')
  // },
  {
    path: '/savePhone',
    name: 'savePhone',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/Tal_savePhone.vue')
  },
  {
    path: '/saveName',
    name: 'saveName',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/Tal_saveName.vue')
  },
  {
    path: '/certiPhone',
    name: 'certiPhone',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../components/pageComponents/intro/D_certi_phone.vue')
  },
  {
    path: '/certiPhoneReturn',
    name: 'certiPhoneReturn',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../components/pageComponents/intro/D_certi_phone_return.vue')
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   props: true,
  //   component: () => import(/* webpackChunkName: "about" */ '../../pages/intro/suminTest.vue')
  // },
  // {
  //   path: '/ssoLogin',
  //   name: 'ssoLogin',
  //   props: true,
  //   component: () => import(/* webpackChunkName: "about" */ '../../pages/backuplogin.vue')
  // },
  {
    path: '/contDetail',
    name: 'contDetail',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_contentsDetail.vue')
  },
  {
    path: '/errorPage',
    name: 'errorPage',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../pages/routerPages/D_errorPage.vue')
  },
  {
    path: '/boardDetail',
    name: 'boardDetail',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../../components/board/D_boardMain.vue')
  }
]

export default routes
