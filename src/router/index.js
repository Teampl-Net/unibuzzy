/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory } from 'vue-router'
// import { useStore } from 'vuex'

import routerMain from '../pages/Tal_router_main.vue'

import testLoginPage from '../pages/intro/testLoginPage.vue'
import main from '../pages/routerPages/D_main.vue'
import login from '../pages/intro/Tal_login.vue'
import permissions from '../pages/intro/Tal_permissions.vue'
import policies from '../pages/intro/Tal_policies.vue'
import pushList from '../pages/routerPages/Tal_pushList.vue'
import chanList from '../pages/routerPages/D_chanList.vue'
import logList from '../pages/routerPages/Tal_logList.vue'
import search from '../pages/routerPages/D_searchPage.vue'
// import { loginCheck } from '../assets/js/Tal_common'
import savePhone from '../pages/routerPages/Tal_savePhone.vue'
import saveName from '../pages/routerPages/Tal_saveName.vue'
import nonMemInquiryBoard from '../pages/intro/Tal_nonMemberInquiryBoard.vue'
import suminTest from '../pages/suminTest.vue'
// import myChanList from '../components/popup/del_Tal_managerChanList.vue'
// import store from '../store/index'
/* import admRouterMain from '../pages/routerPages/admPages/TalAdm_main.vue'
import admChanMain from '../pages/routerPages/admPages/TalAdm_chanMain.vue'
import admSendPushList from '../pages/routerPages/admPages/TalAdm_SendPushList.vue'
import admManageRecvList from '../pages/routerPages/admPages/TalAdm_ManageRecvList.vue'
import admManageChannel from '../pages/routerPages/admPages/TalAdm_manageChannel.vue' */

// import howToUse from '../components/popup/info/Tal_howToUse.vue'

import admWritePush from '../components/popup/D_writeContents.vue'
import helpMemberPop from '../components/popup/info/Tal_helpMemberPop.vue'
import helpBookPop from '../components/popup/info/Tal_helpBookPop.vue'
import helpBoardPop from '../components/popup/info/Tal_helpBoardPop.vue'

import myActList from '../components/pageComponents/myPage/D_myActList.vue'
import myPage from '../pages/routerPages/D_myPage.vue'
// import suminTest from '../components/unit/formEditor/Tal_attachFile.vue'
import admLogin from '../pages/intro/Tal_Adm_login.vue'
import naverCallback from '../pages/intro/Tal_naverLoginCallback.vue'
import certiPhone from '../components/pageComponents/intro/D_certi_phone.vue'
import certiPhoneReturn from '../components/pageComponents/intro/D_certi_phone_return.vue'
/* import naverCallback from '../pages/intro/Tal_naverLoginCallback.vue' */
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
        meta: {
          page: 1
        }
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
        path: '/search',
        name: 'search',
        props: true,
        component: search
      },
      {
        path: '/myPage',
        name: 'myPage',
        props: true,
        component: myPage,
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
        component: chanList,
        meta: {
          page: 3
        }
      },
      {
        path: '/logList',
        name: 'logList',
        props: true,
        component: logList,
        beforeEnter: (to, from, next) => {
          // 만약 로그인 상태라면
          if (localStorage.getItem('loginYn') !== true) { return next() } else next('/policies')
        }
      }
    ]
  },
  {
    path: '/admLogin',
    name: 'admLogin',
    props: true,
    component: admLogin
  },
  {
    path: '/naverCallback',
    name: 'naverCallback',
    props: true,
    component: naverCallback
  }, /*

  {
    path: '/admRouterMain',
    name: 'admRouterMain',
    props: true,
    component: admRouterMain,
    children: [
      {
        path: '/admChanMain',
        name: 'admChanMain',
        props: true,
        component: admChanMain
      },
      {
        path: '/admSendPushList',
        name: 'admSendPushList',
        props: true,
        component: admSendPushList
      },
      {
        path: '/admManageRecvList',
        name: 'admManageRecvList',
        props: true,
        component: admManageRecvList
      },
      {
        path: '/admWritePush',
        name: 'admWritePush',
        props: true,
        component: admWritePush
      },
      {
        path: '/admManageChannel',
        name: 'admManageChannel',
        props: true,
        component: admManageChannel
      }
    ]
  }, */
  {
    path: '/testLoginPage',
    name: 'testLoginPage',
    props: true,
    component: testLoginPage
  },
  {
    path: '/nonMemInquiryBoard',
    name: 'nonMemInquiryBoard',
    props: true,
    component: nonMemInquiryBoard
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: login
    /* children: [
      {
        path: '/login',
        name: 'login',
        props: true,
        component: login
      },
      {
        path: '/login/naver/callback',
        name: 'login',
        props: true,
        component: naverCallback
      }
    ] */
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
    path: '/certiPhone',
    name: 'certiPhone',
    props: true,
    component: certiPhone
  },
  {
    path: '/certiPhoneReturn',
    name: 'certiPhoneReturn',
    props: true,
    component: certiPhoneReturn
  }
  /* ,
  {
    path: '/test',
    name: 'test',
    props: true,
    component: suminTest
  }, */
  // {
  //   path: '/myChanList',
  //   name: 'myChanList',
  //   props: true,
  //   component: myChanList
  // },

  /* {
    path: '/writePushTest',
    name: 'admWritePush',
    component: admWritePush
  }, */
  // {
  //  path: '/about',
  // name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  // }
  // {
  //   path: '/howToUse',
  //   component: howToUse
  // },
  /* {
    path: '/helpMemberPop',
    component: helpMemberPop
  },
  {
    path: '/helpMemberPop',
    component: helpMemberPop
  },
  {
    path: '/helpBookPop',
    component: helpBookPop
  },
  {
    path: '/helpBoardPop',
    component: helpBoardPop
  },
  {
    path: '/myActList',
    component: myActList
  } */
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
