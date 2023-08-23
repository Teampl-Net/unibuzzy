<template>
  <div class="w100P h100P listRefresh" style="overflow:hidden;">
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 100; background: #00000050;"></div>
    <!-- <unknownLoginPop :pClosePop="closeUnknownLoginPop" style="position: absolute;" v-if="GE_USER.unknownYn && mUnknownLoginPopYn" /> -->
    <gImgPop @closeXPop="closeImgPop" v-if="mGImgPopShowYn" :propImgList="mPropImgList" :propFirstIndex="mPropFirstIndex" />
    <commonConfirmPop v-if="mAppUpdatePopShwoYn" @no="goAppStore" confirmType="one" confirmText="버전 업데이트가 필요합니다.<br>앱스토어로 이동합니다." />
    <gConfirmPop :confirmText="mErrorPopBodyStr" confirmType='one' @no='mErrorPopShowYn = false' v-if="mErrorPopShowYn" style="z-index: 9999999999999999999999;"/>
    <gConfirmPop :confirmText="mNetPopBodyStr" confirmType='no' @no='mNetPopShowYn = false' v-if="mNetPopShowYn" style="z-index: 9999999999999;"/>
    <gConfirmPop confirmText="네트워크의 연결이 끊어져<br>실행 할 수 없습니다" confirmType='no' @no='mNetReturnPopShowYn = false'  style="z-index: 999999999999999999999999;" v-if="mNetReturnPopShowYn"/>
    <gUBHeader :class="{ myPageBgColor : mMyPageBgColorYn }" :pContentsYn="mTargetType === 'contentsDetail' || mTargetType === 'contDetail'" @goFavList="openPop" @goLogList="openPop" v-if="(mRouterHeaderInfo !== 'leave' && mTargetType !== 'chanDetail' && mTargetType !== 'boardMain') || $route.path === '/chanList' " @showMenu="showMenu" ref="UBMainHeaderWrap" class="header_footer " :pRouterHeaderInfo="mRouterHeaderInfo" :style="'height: ' + (this.$STATUS_HEIGHT + 50) + 'px; padding-top: ' + (this.$STATUS_HEIGHT + 10) + 'px;'" style="position: absolute; top: 0; left:-1px; z-index: 9;" />
    <chanHeader :style="'padding-top: ' + (Number(this.$STATUS_HEIGHT) + 20)  + 'px'" v-if="(mTargetType === 'chanDetail' || mTargetType === 'boardMain') && mPopType === '' && mRouterHeaderInfo !== 'leave'" @enterCloudLoading="enterCloudLoading" @showCloudLoading="showCloudLoading" @openMenu='openChanMenu' :chanAlimListTeamKey="mChanInfo.targetKey" :headerTitle="mHeaderTitle" :thisPopN="mPopN" :targetType="mTargetType" :pChanInfo="mChanInfo" @openPop="openPop" class="chanDetailPopHeader" />
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index: 100;" v-if="mPopType === 'writeContents'" @click="mPopType = ''"></div>
    <writeContents v-if="mPopType === 'writeContents'" @closeXPop="closeWritePop" :params="mPopParams" :propData="mPopParams" :contentType="mPopParams.contentsJobkindId" />
    <div v-if="mPopType === 'logList'" @click="closeWritePop" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 10000;background: #00000050;"></div>
    <transition name="showUp">
      <notiHistoryList @closeXPop="closeWritePop" @openPage="openPage" v-if="mPopType === 'logList'" />
    </transition>
    <div v-if="mPopType === 'favList'" @click="closeWritePop" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 10000; background: #00000050;"></div>
    <transition name="showUp">
      <favListPop v-if="mPopType === 'favList'" @openPage="goOpenPage" :pFTeamList="mFTeamList" @closeXPop="closeWritePop" />
    </transition>
    <!-- <gFavList /> -->
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index:10000;" v-if="mMenuShowYn" @click="hideMenu"></div>
    <transition name="show_left">
      <D_MENU transition="show_left" @hideMenu="hideMenu" @openPop="openPop" @goPage="changeRouterPath" class="D_menuStyle " v-if="mMenuShowYn" />
    </transition>
    <policies :pPolicyType="mPolicyType" v-if="mPolicyType === 'termsOfUse' || mPolicyType === 'privacy'" :pClosePolicyPop="closePolicyPop" />
    <editMyChanMenu style="z-index: 999999;" v-if="mPopType === 'myChanMenuEdit'" :pClosePop="closeWritePop" :propData="mPopParams" />
    <editBookListPop v-if="mPopType === 'editBookList'" :propData="mPopParams" @closeXPop="closeBookListPop" />
    <transition name="show_right">
      <chanMenu :pPopId="mPopId" ref="chanMenuCompo" :propChanAlimListTeamKey="mChanInfo.targetKey" :propData="mChanInfo" @openPop="openPop" v-if='openChanMenuYn' @closePop='openChanMenuYn = false' @openItem='openPage' @openChanMsgPop="closeNopenChanMsg" />
    </transition>
    <gCloudLoading v-if="mCloudLoadingShowYn" :pEnterCloudsYn="mEnterCloudsYn" style="position: absolute; top: 0; left: 0" :pCloudLeftClass="mLeftCloudClass" :pCloudRightClass="mRightCloudClass"  />
    <div :class="{ myPageBgColor : mMyPageBgColorYn}"  style="height: 100%;overflow: hidden; width:100%;" >
      <!-- 여기 -->
      <router-view :key="$route.fullPath" ref="routerView" @openImgPop="openImgPop" @setMainInfo="setMainInfo" @enterCloudLoading="enterCloudLoading" @showCloudLoading="showCloudLoading" @changeRouterPath="changeRouterPath" @openPop="openPop" @clearInfo="clearInfo" :pAreaInfo="mAreaInfo" :pCabKeyListStr="mCabKeyListStr" :pCampusTownInfo="mCampusTownInfo" :propParams="mChanInfo" :pPopId="mPopId" :parentPopN="mPopN" :initData="sendInitData" @bgcolor='setBgColor' @openPage="goOpenPage" @goDetail="goDetail" @openUserProfile="openPop" :popYn="false" @changePageHeader="changePageHeader" />
    </div>
    <gFooter v-if="!$route.path.includes('contents') && mPopType !== 'myChanMenuEdit'" @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 999;"/>
    <!-- <TalFooter :pChangePageHeader="changePageHeader" v-if="$route.name!== 'contDetail'" :pOpenUnknownLoginPop="openUnknownLoginPop" @changeRouterPath="changeRouterPath" class="header_footer footerShadow" style="position: absolute; bottom: 0; z-index: 9" /> -->
  </div>
</template>
<script>
// import { AES } from 'crypto-js'
import gUBHeader from '../../components/UB/layout/UB_gMainHeader'
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import D_MENU from '../../components/UB/popup/common/UB_common_menu.vue'
import policies from './intro/UB_policies.vue'
import chanHeader from '../../components/UB/layout/UB_gChanMainHeader.vue'
import chanMenu from '../../components/popup/chanMenu/D_channelMenu.vue'
import notiHistoryList from '@/components/UB/popup/UB_notiHistoryList.vue'
import writeContents from '../../components/popup/D_writeContents.vue'
import editMyChanMenu from '../../components/UB/popup/UB_editMyChanMenu.vue'
import favListPop from '../../components/UB/popup/UB_favListPop.vue'
import editBookListPop from '@/components/UB/popup/UB_editBookListPop.vue'
// import unknownLoginPop from '../../components/pageComponents/channel/D_unknownLoginPop.vue'
export default {
  data () {
    return {
      // mUnknownLoginPopYn: false,
      mEnterCloudsYn: false,
      mAfterCloudYn: false,
      mPolicyType: '',
      mMyPageBgColorYn: false,
      mGPopShowYn: false,
      mPopN: {},
      mPopId: null,
      bgblackYn: false,
      mTargetType: '',
      openChanMenuYn: false,
      mFavListShowYn: false,
      sendInitData: null,
      mCloudLoadingShowYn: false,
      mRouterHeaderInfo: '',
      mPopParams: null,
      mChanInfo: null,
      mMenuShowYn: false,
      mNetPopBodyStr: '',
      mErrorPopBodyStr: '',
      mErrorPopShowYn: false,
      mNetReturnPopShowYn: false,
      mCampusTownInfo: {},
      mPopType: '',
      mBottomYn: Boolean,
      mFTeamList: [],
      mAlimCount: 0,
      mLeftCloudClass: '',
      mRightCloudClass: '',
      mAxiosQueue: [],
      mPropFirstIndex: -1,
      mPropImgList: [],
      mGImgPopShowYn: false
    }
  },
  created () {
    // console.log('testYntestYntestYntestYn', localStorage.getItem('testYn'))
    if (this.GE_USER.unknownYn) {
      this.$router.push({ name: 'policies' })
      return
    } else {
      /* if (this.GE_USER.myTeamKey === 836) {
        this.$router.push({ name: 'uniBmain' })
        return
      } */
    }
    if (localStorage.getItem('backBtnShowYn') !== undefined && localStorage.getItem('backBtnShowYn') !== 'undefined') {
      localStorage.setItem('backBtnShowYn', 'false')
    }
    if (localStorage.getItem('backBtnShowYn') !== undefined && localStorage.getItem('backBtnShowYn') !== 'undefined') {
      this.mBackBtnShowYn = JSON.parse(localStorage.getItem('backBtnShowYn'))
    }
    this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST') // 앱 시작 vuex 초기화
    var urlString = location.search
    var param = this.getParamMap(urlString)
    if (param.fcmKey && param.dcmKey) {
      var checkParam = {}
      checkParam.userKey = Number(param.dcmKey)
      checkParam.fcmKey = param.fcmKey
      console.log('checkParam', checkParam)
    }
    // this.getCTeamList()
    // this.showCloudLoading(false, 5000)
  },
  methods: {
    closeBookListPop () {
      this.deleteHistory()
      this.mPopType = ''
    },
    openImgPop (param) {
      if (param) {
        this.mPropFirstIndex = param[1]
        this.mPropImgList = param[0]
        this.mGImgPopShowYn = true
      }
    },
    closeImgPop () {
      this.mPropFirstIndex = -1
      this.mPropImgList = []
      this.mGImgPopShowYn = false
    },
    deleteHistory () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
    },
    setMainInfo (params) {
      this.mFTeamList = params.fTeamList
      this.mAlimCount = params.alimCount
    },
    closePolicyPop () {
      this.deleteHistory()
      this.mPolicyType = ''
    },
    closeWritePop () {
      this.deleteHistory()
      this.mPopType = ''
    },
    clearInfo (value) {
      this.mChanInfo = value.detail
      this.mTargetType = value.targetType
    },
    async goUniBTown () {
      this.$router.push('/unibuzzy')
    },
    async getCTeamList () {
      const param = {}
      param.teamKey = 824
      param.fUserKey = this.GE_USER.userKey
      param.userKey = this.GE_USER.userKey
      const result = await this.$getViewData({ url: '/sUniB/tp.getChanMainBoard', param: param }, false)
      if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
        this.$showToastPop('Cannot find your campus!')
      } else {
        const cTeamList = result.data.cTeamList
        this.mCampusTownInfo.campus = result.data.team.content[0]
        this.mCampusTownInfo.cTeamList = cTeamList
      }
    },
    openChanMenu () {
      this.openChanMenuYn = true
    },
    async settingPop () {
      var target = this.mChanInfo
      this.mTargetType = target.targetType
      if (this.mTargetType === 'askTal') {
        if (target.jobKind === 'QUES') this.mHeaderTitle = '문의하기'
        if (target.jobKind === 'ERRO') this.mHeaderTitle = '오류접수'
      } else if (this.mTargetType === 'changeEmail') {
        this.changInfoType = this.mTargetType
        this.mTargetType = 'changeInfo'
      } else if (this.mTargetType === 'changePhone') {
        this.mHeaderTitle = '실명인증'
      } else if (this.mTargetType === 'editBookList' || this.mTargetType === 'memberManagement') {
        this.helpYn = true
      } else if (this.mTargetType === 'selectBookList') {
        this.selectPlist = target.pSelectedList
      } else if (this.mTargetType === 'writeContents') {
        if (target.attachFileList) {
          this.mAttachFileList = target.attachFileList
        }
        var paramMap = new Map()
        console.log(this.GE_USER.userKey)
        paramMap.set('contentsKey', target.targetKey)
        paramMap.set('jobkindId', target.contentsJobkindId)
        paramMap.set('ownUserKey', this.GE_USER.userKey)
        paramMap.set('subsUserKey', this.GE_USER.userKey)
        paramMap.set('userKey', this.GE_USER.userKey)
        const response = await this.$axios.post('/sUniB/tp.getMyContentsList', Object.fromEntries(paramMap))
        if (response.data && response.data.content) this.mAttachFileList = response.data.content[0].attachFileList
      }

      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.mPopN = Number(this.parentPopN) + 1
      } else {
        this.mPopN = 100
      }
      if (!this.mPopId) {
        this.mPopId = 'gPopup' + this.mPopN
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
    },
    closeXPop (page) {
      console.log('page', page)
      if (page === 'main') {
        this.mTargetType = 'main'
        this.$router.push('/')
      }
    },
    setBgColor (param) {
      let test = false
      if (param === 1 || param === true) { test = true }
      this.bgblackYn = test
    },
    async goSearchDirect (data) {
      var pageData = await this.$getRouterViewData('search')
      pageData.pSearchList = data
      this.sendInitData = pageData
      console.log({ initData: pageData })
      await this.$router.replace({
        name: 'search'
      })
    },
    async recvNotiFormBridge (notiDetail, currentPage, vuexResultData) {
      try {
        var notiUserDo = JSON.parse(notiDetail.userDo)
        if ((currentPage === 0 || currentPage === undefined)) {
          // eslint-disable-next-line no-new-object
          var goDetailParam = new Object()
          goDetailParam.notiYn = true
          goDetailParam.creTeamKey = Number(notiDetail.creTeamKey)
          if (notiUserDo.targetKind === 'C') {
            goDetailParam.contentsKey = notiUserDo.targetKey
            goDetailParam.targetKey = notiUserDo.targetKey
            goDetailParam.jobkindId = notiDetail.jobkindId
            if (notiUserDo.iSub) {
              goDetailParam.cabinetKey = notiUserDo.iSub
            }

            if (goDetailParam.jobkindId === 'ALIM') {
              goDetailParam.chanName = vuexResultData.nameMtext
              goDetailParam.nameMtext = vuexResultData.nameMtext
            } else if (goDetailParam.jobkindId === 'BOAR') {
              goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
              goDetailParam.cabinetKey = vuexResultData.cabinetKey
            }
            this.goDetail(goDetailParam)
          } if (notiUserDo.targetKind === 'R') {
            goDetailParam.contentsKey = notiUserDo.targetKey
            goDetailParam.targetKey = notiUserDo.targetKey
            goDetailParam.jobkindId = notiDetail.jobkindId
            if (goDetailParam.jobkindId === 'ALIM') {
              goDetailParam.chanName = vuexResultData.nameMtext
              goDetailParam.nameMtext = vuexResultData.nameMtext
            } else if (goDetailParam.jobkindId === 'BOAR') {
              goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
              goDetailParam.cabinetKey = vuexResultData.cabinetKey
            }
            this.goDetail(goDetailParam)
          } else if (notiUserDo.targetKind === 'T' || notiUserDo.targetKind === 'M' || notiUserDo.targetKind === 'N') {
            this.$router.replace({ path: '/' })
            goDetailParam.chanYn = true
            goDetailParam.targetKey = notiUserDo.targetKey
            this.goChanDetail(goDetailParam)
          }
          // goDetailParam.value = vuexResultData
        } else {
          this.$refs.mainGPopWrap.recvNotiFromMain(notiDetail, currentPage, vuexResultData)
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    async goDetail (detailValue) {
      if (detailValue.chanYn) {
        this.goChanDetail(detailValue)
      } else {
        var detailParam = {}
        detailParam.targetType = 'contentsDetail'
        detailParam.targetKey = detailValue.targetKey
        if (!detailParam.targetKey) detailParam.targetKey = detailValue.contentsKey
        detailParam.memoScrollYn = detailValue.memoScrollYn

        var axiosParam = {}
        axiosParam.targetKey = detailValue.targetKey
        axiosParam.contentsKey = detailValue.targetKey
        axiosParam.teamKey = detailValue.teamKey || detailValue.creTeamKey
        axiosParam.jobkindId = detailValue.jobkindId
        if (detailValue.cabinetKey) {
          axiosParam.cabinetKey = detailValue.cabinetKey
        }
        if (axiosParam.jobkindId) {
          axiosParam.userKey = this.GE_USER.userKey
          axiosParam.ownUserKey = this.GE_USER.userKey
          axiosParam.creTeamKey = axiosParam.teamKey
          // axiosParam.cabinetKey = detailParam.cabinetKey
        }

        var result = await this.$getContentDetailData(axiosParam, false)
        if (!result) return
        if (!detailParam.jobkindId) {
          detailParam.jobkindId = result.content.jobkindId
          detailParam.teamKey = result.content.creTeamKey
          detailParam.popHeaderText = result.content.nameMtext
          if (detailParam.jobkindId === 'BOAR') {
            detailParam.cabinetKey = result.content.cabinetKey
            if (!detailParam.cabinetKey) {
              detailParam.cabinetKey = detailValue.cabinetKey
            }
            detailParam.cabinetNameMtext = this.$changeText(result.content.cabinetNameMtext)
            if (result.content.cabinetNameMtext) this.changePageHeader(this.$changeText(result.content.cabinetNameMtext))
          } else {
            detailParam.nameMtext = this.$changeText(result.content.nameMtext)
            detailParam.teamName = this.$changeText(result.content.nameMtext)
            if (result.content.nameMtext) this.changePageHeader(detailParam.teamName)
          }
        }
        detailParam.initData = result
        detailParam.notiYn = true

        detailParam.channelYn = detailValue.channelYn

        this.mChanInfo = detailParam
        this.mTargetType = 'contDetail'

        this.$router.push(`/contents/${axiosParam.contentsKey}/${detailParam.teamKey}/${detailParam.cabinetKey}`)
      }
    },
    getParamMap (urlString) {
      // eslint-disable-next-line no-debugger
      debugger
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      console.log(splited)
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    },
    showCloudLoading (showYn, enterCloudsYn) {
      this.mCloudLoadingShowYn = showYn
      this.mEnterCloudsYn = enterCloudsYn
      if (showYn === false) {
        this.mLeftCloudClass = ''
        this.mRightCloudClass = ''
      }
    },
    enterCloudLoading (enterYn) {
      if (enterYn) {
        this.mLeftCloudClass = 'cloud-left-enter'
        this.mRightCloudClass = 'cloud-right-enter'
      } else {
        this.mLeftCloudClass = 'cloud-left-leave'
        this.mRightCloudClass = 'cloud-right-leave'
      }
    },
    async goOpenPage (param) {
      if (param.targetType === 'chanDetail' || param.targetType === 'boardMain') {
        // this.mCloudLoadingShowYn = true
        // this.showCloudLoading(true)
        if (this.$route.path === '/') {
          this.showCloudLoading(true, true)
          this.enterCloudLoading(true)
        }
      }
      this.openChanMenuYn = false
      if (param) {
        await this.openPage(param)
      }
    },
    async getCabinetDetail (params) {
      var paramMap = new Map()
      paramMap.set('teamKey', params.teamKey)
      paramMap.set('currentTeamKey', params.teamKey)
      paramMap.set('cabinetKey', params.targetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      var response = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getCabinetDetail',
        param: Object.fromEntries(paramMap)
      })
      var mCabinet = response.data.mCabinet
      console.log('mCabinet')
      console.log(mCabinet)
      return mCabinet
    },
    async getTownCabinetList (teamKey) {
      var param = {}
      param.parentTeamKey = teamKey
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTownCabinetList',
        param: param
      })
      if (result && result.data && result.data.result) {
        this.mCabKeyListStr = result.data.cabinetKeyListStr
      }
      console.log(result)
    },
    async goChanDetail (detailValue) {
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      let teamKey = detailValue.targetKey
      if (!teamKey && detailValue.creTeamKey) {
        teamKey = detailValue.creTeamKey
      }
      const parentYn = this.GE_USER.myTeamKey === teamKey ? 1 : 0
      chanMainParam.teamKey = teamKey
      chanMainParam.targetKey = teamKey
      if (detailValue && detailValue.nameMtext) chanMainParam.nameMtext = detailValue.nameMtext
      // chanMainParam.chanName = detailValue.nameMtext
      if (detailValue.contentsKey) {
        chanMainParam.jobkindId = detailValue.jobkindId
        chanMainParam.targetContentsKey = detailValue.contentsKey
      }
      // 세션에서 유저키 받아오기
      if (detailValue.creUserKey === this.GE_USER.userKey) {
        chanMainParam.ownerYn = true
      }
      const paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      paramMap.set('userKey', this.GE_USER.userKey)
      // eslint-disable-next-line no-debugger
      debugger
      try {
        // 메인일 경우에만 로딩화면이 안 보이도록 처리(다른 화면에서는 로딩이 보여야 함)
        let nonLoadingYn = true
        if (this.$route.fullPath !== '/') {
          nonLoadingYn = false
        }
        const result = await this.$getViewData({ url: '/sUniB/tp.getChanMainBoard', param: Object.fromEntries(paramMap) }, nonLoadingYn)
        if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
          this.mCloudLoadingShowYn = false
          this.$showToastPop('채널을 찾을 수 없습니다!')
          return
        }
        const teamDetail = result.data.team.content[0]
        console.log(teamDetail)
        if (teamDetail.userTeamInfo === undefined || teamDetail.userTeamInfo === null || teamDetail.userTeamInfo === '') {
          if (result.data.memberTypeList && result.data.memberTypeList.length !== 0 && result.data.memberTypeList[0].muserList) {
            if (result.data.memberTypeList[0].muserList) {
              const index = result.data.memberTypeList[0].muserList.findIndex((item) => item.userKey === this.GE_USER.userKey)
              if (index !== -1) {
                teamDetail.userTeamInfo = result.data.memberTypeList[0].muserList[index]
              }
            }
          }
        }
        await this.$addChanVuex([teamDetail])
        var initData = {}
        initData.team = teamDetail
        if (result.data.contentsListPage && result.data.contentsListPage.content && result.data.contentsListPage.content.length > 0) {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.data.contentsListPage.content)
        }
        initData = result.data
        // await this.getTownCabinetList().then((res) => {
        //   this.getMyContentsList(null, null, true).then((res) => {
        //     initData.contentsList = res.content
        //   })
        // })
        if (parentYn) {
          if (detailValue.cabinetKeyListStr) {
            this.mCabKeyListStr = detailValue.cabinetKeyListStr
          } else {
            await this.getTownCabinetList(teamKey)
          }
          initData.cabinetKeyListStr = this.mCabKeyListStr
          initData.contentsList = await this.getMyContentsList(20, null, !nonLoadingYn)
        } else {
          initData.contentsList = result.data.contentsListPage
        }
      } catch (error) {
        this.mCloudLoadingShowYn = false
        this.$showToastPop('죄송합니다! 관리자에게 문의해주세요!')
        console.error(error)
      }
      chanMainParam.initData = initData
      this.mChanInfo = chanMainParam
      if (initData.teamMenuList) {
        this.mChanInfo.boardList = initData.teamMenuList
      } else {
        var paramMap2 = new Map()
        paramMap2.set('teamKey', teamKey)
        paramMap2.set('currentTeamKey', teamKey)
        paramMap2.set('sysCabinetCode', 'BOAR')
        paramMap2.set('userKey', this.GE_USER.userKey)

        const result2 = await this.$getTeamMenuList(paramMap, true)
        this.mChanInfo.boardList = result2
      }

      if (detailValue.areaInfo) {
        this.mChanInfo.areaInfo = detailValue.areaInfo
      }
      this.mChanMainTeamKey = detailValue.teamKey
      this.mTargetType = 'chanDetail'
      // this.$router.push({ name: 'chanMain', params: { pTeamKey: this.mChanMainTeamKey } })
      // const encryptedTeamKey = AES.encrypt(teamKey, 'encryptionSecret').toString()
      // const encodedTeamKey = encodeURIComponent(encryptedTeamKey)
      // let encodedTeamKey = detailValue.targetKey
      // if (!teamKey && detailValue.creTeamKey) {
      //   encodedTeamKey = detailValue.creTeamKey
      // }
      this.$router.push(`/chan/${chanMainParam.teamKey}/${parentYn}`)
      // this.showCloudLoading(false, 1750)
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn, searchParam) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}
      if (searchParam) {
        param = searchParam
      }
      if (this.viewTab === 'P') {
        param.orderbyStr = 'a.popPoint DESC, a.creDate DESC'
      } else if (this.viewTab === 'N') {
        param.orderbyStr = 'a.creDate DESC'
      }
      param.myUserKey = this.GE_USER.userKey
      param.cabinetKeyListStr = this.mCabKeyListStr
      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }

      if (this.findKeyList) {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          param.title = this.findKeyList.searchKey
        } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.findKeyList.toCreDateStr
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.findKeyList.fromCreDateStr
        } if (this.findKeyList.workStatCodeKey !== undefined && this.findKeyList.workStatCodeKey !== null && this.findKeyList.workStatCodeKey !== '') {
          param.workStatCodeKey = this.findKeyList.workStatCodeKey
        } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
          param.creUserName = this.findKeyList.creUserName
        } if (this.findKeyList.selectedSticker) {
          param.findActStickerYn = true
          param.findActYn = true
          param.stickerKey = this.findKeyList.selectedSticker.stickerKey
        }
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      return resultList
    },
    async openPop (params) {
      this.mPopType = params.targetType
      this.mPopParams = params
      this.mGPopShowYn = true
      this.openChanMenuYn = false
      this.hideMenu()
      if (params.targetType === 'setMypage') {
        this.openPage(params)
      } else if (params.targetType === 'totalFileList') {
        this.changePageHeader('File Box')
        this.$router.push('/fileBox')
      } else if (params.targetType === 'contentsDetail') {
        this.openPage(params)
      } else if (params.targetType === 'totalSaveList') {
        await this.goMoreList('saved')
        this.$router.push('/saveBox')
      }
    },
    async goMoreList (type) {
      if (type === 'saved') {
        // eslint-disable-next-line no-new-object
        var param = new Object()

        param.DESCYn = true
        param.findActLikeYn = false
        param.findActStarYn = true
        param.findActYn = true
        param.findLogReadYn = null
        param.jobkindId = 'BOAR'
        param.offsetInt = 0
        param.ownUserKey = this.GE_USER.userKey
        param.pageSize = 20
        param.subsUserKey = this.GE_USER.userKey

        var result = await this.$getContentsList(param, false)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.content)

        var resultList = result.content

        this.mChanInfo = resultList
      }
    },
    // goLogList (param) {
    //   this.openPage(param)
    //   this.mRouterHeaderInfo = param.popHeaderText
    //   this.$router.push({ name: 'logList' })
    // },
    changePageHeader (title) {
      this.mRouterHeaderInfo = title
    },
    hideMenu () {
      this.$removeHistoryStack()
      this.openChanMenuYn = false
      this.mMenuShowYn = false
    },
    showMenu () {
      this.$addHistoryStack('mainPage')
      this.$addHistoryStack('mainMenu')
      this.mMenuShowYn = true
      this.$showHistoryStack()
    },
    closePop (reloadYn) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$store.dispatch('D_HISTORY/AC_REMOVE_POP_HISTORY_STACK')
      this.mTargetType = ''
      this.mGPopShowYn = false
    },
    async goBoardDetail (params) {
      this.mChanInfo = params
      this.mChanInfo.chanYn = params.chanYn
      this.mTargetType = 'boardMain'
      // await this.getCabinetDetail(params)
      this.$router.push(`/board/${params.teamKey}/${params.targetKey}`)
    },
    async openPage (params) {
      if (params.targetType === 'chanDetail') {
        if (this.$route.path === '/') {
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        await this.goChanDetail(params)
        return
      } else if (params.targetType === 'favList') {
        this.goFavList(params)
        return
      } else if (params.targetType === 'logList') {
        this.goLogList(params)
      } else if (params.targetType === 'contDetail' || params.targetType === 'contentsDetail') {
        this.goDetail(params)
      } else if (params.targetType === 'myPage') {
        this.goMyPage(params)
      } else if (params.targetType === 'boardMain') {
        if (this.$route.path === '/') {
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
        this.goBoardDetail(params)
        this.hideMenu()
        return
      } else if (params.targetType === 'myChanMenuEdit' || params.targetType === 'editBookList' || params.targetType === 'writeContents') {
        this.openPop(params)
      } else if (params.targetType === 'setMypage') {
        this.mChanInfo = params
        this.mTargetType = 'setMypage'
        this.$router.push('/settings')
      }
      this.hideMenu()
      this.mCloudLoadingShowYn = false
    },
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      var paramMap = new Map()
      var userKey = this.GE_USER.userKey
      // paramMap.set('cateItemKey', 3)
      if (this.mViewTab === 'user') {
        paramMap.set('userKey', userKey)
      } else if (this.mViewTab === 'all') {
        paramMap.set('fUserKey', userKey)
      } else if (this.mViewTab === 'mychannel') {
        paramMap.set('userKey', userKey)
        paramMap.set('managerYn', true)
      }
      if (offsetInput !== undefined) {
        paramMap.set('offsetInt', offsetInput)
      } else {
        if (this.mOffsetInt === 0 && this.mChannelList.length === 10) this.mOffsetInt = 1
        paramMap.set('offsetInt', this.mOffsetInt)
      }
      if (pageSize) {
        paramMap.set('pageSize', pageSize)
      } else {
        paramMap.set('pageSize', 10)
      }

      var result = await this.$getTeamList(paramMap, mLoadingYn)
      var resultList = result.data
      return resultList
    },
    async changeRouterPath (page) {
      const mainYn = this.$route.path === '/'
      if (page !== 'termsOfUse' && page !== 'privacy' && this.$route.path === '/') {
        this.showCloudLoading(true, true)
        this.enterCloudLoading(true)
      }
      var pageData = {}
      this.mMenuShowYn = false
      if (page === 'termsOfUse' || page === 'privacy') {
        // this.$route.push('/policy')
        this.$router.push(`/policy/${page}`)
        return
      } else if (page !== 'chanList' && page !== 'myPage' && page !== 'main') {
        pageData = await this.$getRouterViewData(page, mainYn)
      } else if (page === 'myPage') {
        // eslint-disable-next-line no-debugger
        debugger
        // @point
        // eslint-disable-next-line no-new-object
        var param = new Object()

        param.pageSize = 5

        param.creUserKey = this.GE_USER.userKey
        param.jobkindId = 'BOAR'
        // param.allYn = true

        var result = await this.$getContentsList(param, mainYn)

        var resultList = result

        this.mChanInfo = {
          targetType: 'myPage',
          mContentsList: resultList
        }
      } else if (page === 'chanList') {
        pageData = await this.getChannelList(10, 0, mainYn)
      }
      if (page !== 'main' && page !== 'termsOfUse' && page !== 'privacy') {
        if (this.$route.path === '/') {
          await new Promise((resolve) => setTimeout(resolve, 1500))
        }
      }
      this.mTargetType = page
      // eslint-disable-next-line no-debugger
      debugger
      this.sendInitData = pageData
      this.$router.replace({
        name: page
      })
      if (this.$route.path === '/' && page === 'main') {
        setTimeout(() => {
          this.enterCloudLoading(false)
          this.showCloudLoading(true, false)
        }, 1500)
        setTimeout(() => {
          this.showCloudLoading(false)
        }, 3000)
      }
    },
    changeNetStatePop () {
      if (this.mNetReturnPopShowYn === true) return
      this.mNetReturnPopShowYn = true
      var this_ = this
      setTimeout(() => {
        this_.mNetReturnPopShowYn = false
      }, 2000)
    },
    parentClose () {
      this.$refs.routerViewCompo.refreshAll()
    },
    goAppStore () {
      this.mAppUpdatePopShwoYn = false
      if (this.systemName === 'android' || this.systemName === 'Android') {
        window.open('https://play.google.com/store/apps/details?id=com.tal_project', '_blank')
      } else {
        window.open('https://itunes.apple.com/app/id1620854215', '_blank')
      }
    }
  },
  // beforeCreate () {
  //   if (!this.isMobile) {
  //     if ('serviceWorker' in navigator && 'SyncManager' in window) {
  //       const channel = new BroadcastChannel('new-server-post')
  //       // service worker가 보낸 message 수신
  //       channel.addEventListener('message', event => {
  //         const response = event.data
  //         var message = response.noti.data
  //         console.log('onMessage: ', message)
  //         this.$recvNotiFromBridge(null, null, message)
  //       })
  //     }
  //   }
  // },
  mounted () {
    // setTimeout(() => {
    //   this.mAfterCloudYn = true
    // }, 1000)
    this.$showChanCommonPop(false)
    if (
      localStorage.getItem('systemName') !== undefined &&
    localStorage.getItem('systemName') !== 'undefined' &&
    localStorage.getItem('systemName') !== null
    ) {
      this.systemName = localStorage.getItem('systemName')
    }
    var appInfo = localStorage.getItem('appInfo')
    if (appInfo) {
      appInfo = JSON.parse(appInfo)
    }

    if (this.systemName && (this.systemName === 'android' || this.systemName === 'Android' || this.systemName === 'ios' || this.systemName === 'iOS')) {
      if (appInfo && (appInfo.current !== appInfo.last)) {
        this.mAppUpdatePopShwoYn = true
      }
    }
  },
  computed: {
    BACK_BTN_SHOWYN () {
      if (localStorage.getItem('backBtnShowYn') === 'undefined' || localStorage.getItem('backBtnShowYn') === undefined) return false
      return JSON.parse(localStorage.getItem('backBtnShowYn'))
    },
    GE_NET_STATE () {
      return this.$store.getters['D_USER/GE_NET_STATE']
    },
    GE_WINDOW_SIZE () {
      return {
        '--windowWidth': window.innerWidth + 'px'
      }
    },
    GE_GPOP_STACK () {
      return this.$store.getters['D_HISTORY/GE_GPOP_STACK']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_NOTI () {
      return this.$store.getters['D_NOTI/GE_NEW_NOTI']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    $i18n: {
      immediate: true,
      handler (val) {
        console.log(val)
      },
      deep: true
    },
    $route: {
      immediate: true,
      handler (val) {
        this.mPopType = ''
        this.mPolicyType = ''
        if (val.path === '/myPage') {
          this.mMyPageBgColorYn = true
        } else {
          this.mMyPageBgColorYn = false
        }
        if (val.path === '/login') {
          this.mTargetType = ''
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      var history = this.historyStack
      history = history[history.length - 1]
      if (history === 'mainMenu') {
        this.hideMenu()
      }
    },
    GE_NEW_NOTI: {
      handler (value, old) {
        if (value) {
          var notiDetailObj = value.notiDetailObj // 일치시킨 push data
          var currentPage = value.currentPage // 현재페이지
          var addVueResult = value.addVueResult // axios에서 유효성 검사로 받은 데이터
          this.recvNotiFormBridge(notiDetailObj, currentPage, addVueResult)
        }
      },
      deep: true
    },
    GE_NET_STATE: {
      handler (value, old) {
        var this_ = this
        if (old === false && value) {
          this.mNetPopBodyStr = '네트워크가 연결되었습니다!<br>'
          this.mShadowScreenShowYn = false
          this.mNetPopShowYn = true
          setTimeout(() => {
            this_.mNetPopShowYn = false
          }, 2000)
        } else if (old && value === false) {
          this.mShadowScreenShowYn = true
          this.mNetPopBodyStr = '네트워크 연결이 끊어졌습니다.<br> 잠시후 다시시도 해주세요'
          this.mNetPopShowYn = true
          setTimeout(() => {
            this_.mNetPopShowYn = false
          }, 2000)
        }
      },
      deep: true
    }
  },
  components: {
    editMyChanMenu,
    writeContents,
    notiHistoryList,
    // unknownLoginPop,
    gUBHeader,
    commonConfirmPop,
    D_MENU,
    policies,
    chanHeader,
    chanMenu,
    favListPop,
    editBookListPop
  }
}
</script>
<style scoped>
.page {
  position: absolute;
  top: 30px;
}
.D_menuStyle {
  height: 100vh;
  top: 0;
  position: absolute;
  padding: 0 1rem;
  box-sizing: border-box;
  width: 65%;
  max-width: 400px;
  /* background-color: #6768a7; */
  background-color: white;
  color: #5F61BD;
  z-index: 10000;
  left: 0;
}
.myPageBgColor {background-color: #9FDDEE;}
.myPagePadding {padding-bottom: 0!important; padding-top: 0!important}
</style>
