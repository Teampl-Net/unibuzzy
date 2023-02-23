/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
// import { useStore } from 'vuex'
import { functions } from '../assets/js/D_vuexFunction'

// import jisuTest from '../jisuTest.vue'
import { methods, commonAxiosFunction } from '../../public/commonAssets/Tal_axiosFunction'
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
import ssoLogin from '../pages/backuplogin.vue'

import contDetail from '../pages/routerPages/D_contentsDetail.vue'
import forSearchContList from '../pages/routerPages/D_forSearchContList.vue'
import store from '@/store'
function decodeUnicode (str) {
  const urlParam = str.replace('?', '')
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(urlParam).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

/* import naverCallback from '../pages/intro/Tal_naverLoginCallback.vue' */

const routes = [
  // {
  //   path: '/jisuTest',
  //   name: 'jisuTest',
  //   component: jisuTest
  // },
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
          if (localStorage.getItem('loginYn') !== true) { return next() } else next({ name: 'policies', params: { boardData: 'social' } })
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
    path: '/login/:boardData',
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
    path: '/policies/:boardData',
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
  },
  {
    path: '/test',
    name: 'test',
    props: true,
    component: suminTest
  },
  {
    path: '/ssoLogin',
    name: 'ssoLogin',
    props: true,
    component: ssoLogin
  },
  {
    path: '/contDetail',
    name: 'contDetail',
    props: true,
    component: contDetail
  },
  {
    path: '/contList',
    name: 'contList',
    props: true,
    component: forSearchContList
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
    component: () => import(/* webpackChunkName: "about" */ '../components/board/D_boardMain.vue'),
    beforeEnter: async (to, from, next) => {
      // 만약 로그인 상태라면
      const user = store.getters['D_USER/GE_USER']
      if (document.referrer.indexOf('officeon') === -1 && document.referrer.indexOf('localhost') === -1) {
        next('/errorPage')
        return
      }
      var urlString = location.search
      if (to.query && to.query.boardData) {
        urlString = to.query.boardData
      }
      const paramString = decodeUnicode(urlString)
      const splited = paramString.split(/[=?&]/)
      const param = {}
      const paramMap = new Map()
      console.log(splited)
      for (let i = 1; i < splited.length; i++) {
        const key = splited[i]
        let val = decodeURIComponent(splited[++i])
        if (key.indexOf('Key') !== -1 || key.indexOf('key') !== -1) {
          val = Number(val)
        }
        param[key] = val
        paramMap.set(key, val)
      }
      /* if (to.query) {
        localStorage.setItem('urlString', JSON.stringify(to.query))
      } */
      if (user && user.userKey) {
        paramMap.set('userEmail', user.userEmail)
        paramMap.set('soAccessToken', user.soAccessToken)
        paramMap.set('fcmKey', user.fcmKey)
        paramMap.set('userKey', user.userKey)
        const extendInfo = param.extendInfo
        const extendList = extendInfo.split('$#$')
        for (let i = 0; i < extendList.length; i++) {
          const splitList = extendList[i].split('$^$')
          const key = splitList[0]
          let val = splitList[1]
          if (key.indexOf('Key') !== -1 || key.indexOf('key') !== -1) {
            val = Number(val)
          }
          param[key] = val
          paramMap.set(key, val)
        }
        var result = await commonAxiosFunction({
          url: 'service/tp.goDirectBoard',
          param: Object.fromEntries(paramMap)
        })
        const resultMainData = result.data.cabinet
        console.log(result)
        if (resultMainData.contentsListPage) {
          var contentList = resultMainData.contentsListPage.content
          for (let i = 0; i < contentList.length; i++) {
            contentList[i].shareItem = resultMainData.cabinet.mShareItemList
          }
          store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
        }
        await functions.addChanList(result.data.cabinet.cabinet.creTeamKey)
        var goBoardMainParam = {}
        goBoardMainParam.initData = resultMainData
        goBoardMainParam.targetType = 'boardMain'
        goBoardMainParam.teamKey = result.data.cabinet.cabinet.creTeamKey
        goBoardMainParam.targetKey = result.data.cabinet.cabinet.cabinetKey
        goBoardMainParam.cabinetNameMtext = result.data.cabinet.cabinet.cabinetNameMtext
        /* localStorage.setItem('BOAR_DIRECT_DATA', JSON.stringify('')) */
        if (result.data.result) {
          console.log(goBoardMainParam)
          // eslint-disable-next-line no-debugger
          debugger
          return next({ name: 'boardMain', params: { board: JSON.stringify(goBoardMainParam) }, replace: true })
        }
      } else {
        console.log(JSON.stringify(param))
        localStorage.setItem('directParam', JSON.stringify(param))
        next({ name: 'policies', params: { boardData: urlString } })
      }
    }
  },
  {
    path: '/boardMain/:board',
    name: 'boardMain',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../components/board/D_boardMain.vue')
  }
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
