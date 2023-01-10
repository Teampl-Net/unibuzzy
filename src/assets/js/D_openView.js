/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */

import store from '../../store'
import { mapGetters, mapActions } from 'vuex'
import { methods, commonAxiosFunction } from '../../../public/commonAssets/Tal_axiosFunction'
import { commonMethods } from './Tal_common'
var this_ = this
// var g_user = store.getters['D_USER/GE_USER']
var g_axiosQueue = []
var notiDetail
export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const openView = {
  async getViewData (param, nonLoadingYn) {
    var resultData = null
    resultData = await commonAxiosFunction(param, nonLoadingYn)
    return resultData
  },
  async getBoardMainData (param, nonLoadingYn) {
    if (!nonLoadingYn) nonLoadingYn = false
    var paramMap = new Map()
    paramMap.set('currentTeamKey', param.teamKey)
    paramMap.set('cabinetKey', param.cabinetKey)

    var result = await commonAxiosFunction({ url: 'service/tp.getCabinetMainBoard', param: Object.fromEntries(paramMap) }, nonLoadingYn)
    if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
      commonMethods.showToastPop('해당 게시판의 정보를 찾을 수 없습니다!')
      return
    }
    console.log(result.data)
    return result.data
  },
  async getContentDetailData (inputParam, nonLoadingYn) {
    if (!nonLoadingYn) nonLoadingYn = false
    var result = {}
    console.log(inputParam)
    var paramSet = {}
    if (inputParam) {
      paramSet = inputParam
      paramSet.subsUserKey = store.getters['D_USER/GE_USER'].userKey
    }
    var contentDetail = await commonAxiosFunction({ url: 'service/tp.getMyContentsList', param: paramSet }, nonLoadingYn)
    if (!contentDetail || !contentDetail.data) {
      commonMethods.showToastPop('해당 컨텐츠의 정보를 찾을 수 없습니다!')
      return
    }
    var content = contentDetail.data.content[0]

    content = await commonMethods.settingUserDo(content)
    if (!content.D_MEMO_LIST && (!content.memoList || content.memoList.length === 0)) content.D_MEMO_LIST = []

    this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [content])
    result.content = content
    if (content.jobkindId === 'BOAR') {
      var cabinetInfo = content.cabinet
      cabinetInfo.shareAuth = commonMethods.checkUserAuth(cabinetInfo.mShareItemList)
      result.contentCabinet = cabinetInfo
    }
    return result
  },
  async getRouterViewData (page) {
    var resultData = null
    if (page === 'main') {
      return await openView.getMainBoard()
    } if (page === 'myPage') {
      return await openView.getMainBoard()
    } else if (page === 'search') {
      return await openView.getSearchMainBoard()
    } else if (page === 'chanList') {
      return await openView.getMainChanList()
    }
    return resultData
  },
  async getManagingPageData (data) {
    var page = data.targetType
    var resultData = null
    if (page === 'memberManagement') {
      return await openView.getFollowerList(data.param)
    } else if (page === 'editBookList') {
      return await openView.getBookList(data.param)
    } else if (page === 'editBoard') {
      return await openView.getBoardList(data.param)
    }
    return resultData
  },
  async getBoardList (paramMap) {
    var result = await commonAxiosFunction({
      url: 'service/tp.getTeamMenuList',
      param: Object.fromEntries(paramMap)
    })
    console.log(result)
    if (result.status === 200) {
      return result.data
    }
  },
  async getBookList (paramMap) {
    var result = await commonAxiosFunction({
      url: 'service/tp.getTeamMenuList',
      param: Object.fromEntries(paramMap)
    })
    console.log(result)
    if (result.status === 200) {
      return result.data
    }
  },
  async getGPopData (data) {
    var page = data.targetType
    var resultData = null
    if (page === 'selectBookList') {
      return await openView.getSelectBookList(data.param)
    }
    return resultData
  },
  async getMainBoard () {
    var paramMap = new Map()
    paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    var response = await commonAxiosFunction({ url: 'service/tp.getMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    console.log(response)
    if (response.status === 200 || response.status === '200') {
      // eslint-disable-next-line no-new-object
      var resultObject = new Object()
      resultObject.chanList = response.data.teamList.splice(0, 5)
      resultObject.mChanList = response.data.mTeamList
      resultObject.alimList = response.data.alimList
      /* this.mMainChanList = response.data.teamList.splice(0, 5)
      this.mMainMChanList = response.data.mTeamList
      this.setContsList(response.data.alimList) */
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...resultObject.chanList, ...resultObject.mChanList])
      await store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', response.data.alimList.content)
      return resultObject
    }
  },
  async getSearchMainBoard () {
    var paramMap = new Map()
    paramMap.set('cateGroupKey', 2)
    paramMap.set('orderbyStr', 'followerCount DESC')
    paramMap.set('creUserKey', store.getters['D_USER/GE_USER'].userKey)
    var response = await commonAxiosFunction({ url: 'service/tp.getSearchMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    if (response.data.result === 'OK') {
      console.log(response.data)
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', response.data.teamList.content)
      return response.data
    }
  },
  async getMainChanList () {
    var paramMap = new Map()
    paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    var response = await methods.getTeamList(paramMap)
    // var response = await commonAxiosFunction({ url: 'service/tp.getSearchMainBoard', param: Object.fromEntries(paramMap) }, false)
    // eslint-disable-next-line no-debugger
    debugger
    console.log(response)
    if (response.data.content) {
      // console.log(response.data)
      await store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', response.data.content)
      return response.data
    }
  },
  async getWriteBoardData (teamKey) {
    // 컨텐츠 작성 팝업을 열 때 작성 가능한 게시판를 주고있습니다.
    if (!teamKey) return
    var resultData = {}
    var paramMap = new Map()
    paramMap.set('teamKey', teamKey)
    paramMap.set('currentTeamKey', teamKey)
    paramMap.set('sysCabinetCode', 'BOAR')
    paramMap.set('shareType', 'W')
    paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    // console.log(paramMap)
    var response = await commonAxiosFunction({ url: 'service/tp.getCabinetListForMyShareType', param: Object.fromEntries(paramMap) }, false)
    console.log(response)
    if (response.status === 200 || response.statusText === 'OK') {
      resultData = response.data
      return resultData
    } else {
      return false
    }
    // if (!teamKey) return
    // var resultData = {}
    // var paramMap = new Map()
    // paramMap.set('teamKey', teamKey)
    // paramMap.set('currentTeamKey', teamKey)
    // paramMap.set('sysCabinetCode', 'BOAR')
    // paramMap.set('shareType', 'W')
    // paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    // // console.log(paramMap)
    // var response = await commonAxiosFunction({ url: 'service/tp.getTeamMenuList', param: Object.fromEntries(paramMap) }, false)
    // console.log(response)
    // if (response.status === 200 || response.statusText === 'OK') {
    //   resultData.teamList = response.data
    // }
    // // console.log(paramMap)
    // response = null
    // response = await this.$commonAxiosFunction({
    //   // url: 'service/tp.getCabinetDetail',
    //   url: 'service/tp.getCabinetListForMyShareType',
    //   param: Object.fromEntries(paramMap)
    // }, true)
    // console.log(response)
    // if (response.status === 200 || response.statusText === 'OK') {
    //   resultData.writeCabinetList = response.data
    // }
    // return resultData
  },
  async getFollowerList (paramMap) {
    var result = await commonAxiosFunction({
      url: 'service/tp.getFollowerList',
      param: Object.fromEntries(paramMap)
    })
    debugger
    console.log(result)
    if (result.status === 200) {
      return result.data
    }
    // // console.log(this.managingList)
    // paramMap.set('followerType', 'M')
  },
  async getSelectBookList (paramMap) {
    paramMap.set('sysCabinetCode', 'USER')
    paramMap.set('adminYn', true)
    var result = await commonAxiosFunction({
      url: 'service/tp.getTeamMenuList',
      param: Object.fromEntries(paramMap)
    })
    console.log(result)
    if (result.status === 200) {
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].jobkindId = 'BOOK'
      }
      return result.data
    }
    // this.editBookSelectedList()
  },
  async getOpenChannelListPopData (tabName) {
    // 채널리스트를 메인에서 팝업으로 열 시 데이터를 미리 보내주기 위해 만듬
    var paramMap = new Map()
    if (tabName === 'user') {
      paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
    } else if (tabName === 'all') {
      paramMap.set('fUserKey', store.getters['D_USER/GE_USER'].userKey)
    } else if (tabName === 'mychannel') {
      paramMap.set('userKey', store.getters['D_USER/GE_USER'].userKey)
      paramMap.set('managerYn', true)
    }
    paramMap.set('offsetInt', 0)
    paramMap.set('pageSize', 10)
    var result = await commonAxiosFunction({ url: 'service/tp.getUserTeamList', param: Object.fromEntries(paramMap) }, false)
    console.log(result)
    if (result.status === 200 || result.statusText === 'OK') {
      return result.data
    } else {
      return false
    }
  },
  async getOpenPushListPopData (inputParam) {
    var paramSet = {}
    if (inputParam) {
      paramSet = inputParam
      paramSet.subsUserKey = store.getters['D_USER/GE_USER'].userKey
    }
    var result = await commonAxiosFunction({ url: 'service/tp.getMyContentsList', param: paramSet }, false)
    console.log(result)
    return result.data
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$getViewData = openView.getViewData
    Vue.config.globalProperties.$getBoardMainData = openView.getBoardMainData
    Vue.config.globalProperties.$getContentDetailData = openView.getContentDetailData
    Vue.config.globalProperties.$getRouterViewData = openView.getRouterViewData
    Vue.config.globalProperties.$getManagingPageData = openView.getManagingPageData
    Vue.config.globalProperties.$getGPopData = openView.getGPopData
    Vue.config.globalProperties.$getWriteBoardData = openView.getWriteBoardData
    Vue.config.globalProperties.$getOpenChannelListPopData = openView.getOpenChannelListPopData
    Vue.config.globalProperties.$getOpenPushListPopData = openView.getOpenPushListPopData
  }
}
