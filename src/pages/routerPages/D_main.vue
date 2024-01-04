<i18n>
  {
    "ko": {
      "MAIN_MESSAGE_WELCOME": "하이브릭에 오신 것을 환영해요!",
      "MAIN_TITLE_MANAGING_CHANNEL": "내 관리 채널",
      "MAIN_TITLE_FOLLOWING_CHANNEL": "구독중인 채널",
      "MAIN_TITLE_POPULAR_CHANNEL": "인기있는 채널",
      "MAIN_TITLE_RECV_CONTENTS": "받은 쪽지, 게시글",
      "MAIN_TITLE_RECENT_POSTS": "최근 게시글",
      "MAIN_MESSAGE_LOGIN": "로그인을 하고 채널을 구독해보세요",
      "PROF_NAME_SETTING": "프로필 설정"
    },
    "en": {
      "MAIN_MESSAGE_WELCOME": "Welcome to TheAlim!",
      "MAIN_TITLE_MANAGING_CHANNEL": "Managing",
      "MAIN_TITLE_FOLLOWING_CHANNEL": "Following",
      "MAIN_TITLE_POPULAR_CHANNEL": "Popular",
      "MAIN_TITLE_RECV_CONTENTS": "Noti & Posts",
      "MAIN_TITLE_RECENT_POSTS": "Posts",
      "MAIN_MESSAGE_LOGIN": "Sign in and follow channels o see interesting contents!",
      "PROF_NAME_SETTING": "Profile Setting"
    }
  }
  </i18n>
  <template>
    <imageMain v-if="mSocialMainYn !== undefined && (mSocialMainYn === false)" @changeRouterPath="changeRouterPath" :mRouterHeaderText="mRouterHeaderText" :pPortalMainData="mPortalMainTeam" :pChangeNightYn="pChangeNightYn"  @openSelectChannelPop="openSelectChannelPop"/>
    <div v-if="(mSocialMainYn === undefined || (mSocialMainYn && mSocialMainYn === true)) && this.GE_USER && this.GE_MAIN_CHAN_LIST" id="mainAllWrap" class="" ref="mainScrollWrap" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'" style="height: 100%; overflow: hidden scroll;">
          <loadingCompo style="z-index: 999999999;" v-if="mLoadingYn"/>
          <commonConfirmPop v-if="mAppCloseYn" @ok="closeApp" @appClose='closeApp' @no="this.mAppCloseYn=false" confirmType="two" confirmText="하이브릭을 종료하시겠습니까?" />
          <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 100; background: #00000050;"></div>
          <unknownLoginPop :pContDetail="mUnknownContDetail" :pClosePop="closeUnknownLoginPop" style="position: absolute;" v-if="GE_USER.unknownYn && mUnknownLoginPopYn" />
          <div class="w-100P fl">
              <div class="userProfileWrap">
                  <div class="userProfileWelcomeWrap">
                      <p class="commonLightColor font16 textLeft" style="font-weight: 600;">{{ $t('MAIN_MESSAGE_WELCOME') }}</p>
                      <p v-if="GE_USER.unknownYn" class="commonLightColor font16 textLeft" style="font-weight: 600;">{{ $t('MAIN_MESSAGE_LOGIN') }}</p>
                      <div v-else >
                          <div class="loginTrueUserWrap">
                              <div class="loginTrueUserTextArea">
                                  <p class="fl fontBold font18 CDeepColor" style="position: absolute; z-index: 1;">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
                                  <p class="fl fontBold font18" style="color: transparent!important">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
                                  <div class="highLightYellow w-100P" style="position: absolute; bottom: 5px; left: 0;"></div>
                              </div>
                              <p style="font-weight: 600;" class="font16 fl commonLightColor">{{$t("COMMON_MESSAGE_USER_TITLE")}}</p>
                          </div>
                      </div>
                  </div>
                  <div v-if="!GE_USER.unknownYn" style="width:22px;" class="cursorP mright-1 notiHistoryIcon" @click="openNotiHistoryPop">
                    <img src="../../assets/images/contents/icon_bell.png" class="w100P" alt="">
                    <div v-if="newNoti" class="newNoti">1</div>
                  </div>
                  <gProfileImg v-if="!GE_USER.unknownYn" :selfYn="true" class="fr" @click="goUserProfile" />
                  <gBtnSmall v-else @click="goLoginPage" :btnTitle="$t('COMMON_BTN_SIGN_IN')" class="fr"/>
              </div>
              <div v-if="!GE_USER.unknownYn && (this.mMainMChanList || this.mMainChanList)" style="background: #FFFFFF; margin-top: 15px; padding: 20px; padding-right: 0; border-radius: 30px 30px 0px 0px; width: 100%; float: left;">
                  <div v-if="this.mMainMChanList"  style="width: 100%; height: 30px; float: left;">
                      <img src="../../assets/images/main/main_settingIcon2.png" style="float: left; margin-right: 8px;" class="img-w23" alt="">
                      <p @click="goChannelPop('mychannel')" class="font20 fontBold deepBorderColor textLeft CDeepColor cursorP" style="line-height: 26px;">{{ $t('MAIN_TITLE_MANAGING_CHANNEL') }} ></p>
                  </div>
                  <div v-if="this.mMainMChanList" id="channelWrap" style="width: 100%; height: 100px; margin-top: 5px; margin-bottom: 15px; float: left; overflow: scroll hidden;" :class="!isMobile? 'thinScrollBar':''" @wheel="horizontalScroll">
                      <div style="height: 100%; min-width: 100%; display:flex;">
                          <chanRoundIcon :chanElement="chan" v-for="(chan, index) in this.mMainMChanList" :key="index" @openPop="openPop"/>
                          <createChanIcon @openPop="openPop" />
                          <template v-if="this.mMainMChanList.length === 0 && this.mMainChanList.length === 0">
                              <circleSkeleton v-for="(value) in 10" :key="value"/>
                          </template>
                      </div>
                  </div>
                  <div v-if="this.mMainChanList" class="mtop-1 " style="width: 100%; height: 30px; float: left; ">
                      <img src="../../assets/images/main/main_followIcon2.png" style="float: left; margin-right: 8px;" class="img-w23 cursorP" alt="">
                      <p @click="goChannelPop('user')" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">{{ $t('MAIN_TITLE_FOLLOWING_CHANNEL') }} ></p>
                  </div>
                  <div v-if="this.mMainChanList" :class="!isMobile? 'thinScrollBar':''" id="subChannelWrap" style="width: 100%; height: 110px; margin-top: 5px;float: left; overflow: scroll hidden;" @wheel="horizontalScroll">
                      <div style="height: 100%; min-width: 100%; display:flex; gap:0.1rem;">
                          <chanSquareIcon :chanElement="chan" v-for="(chan, index) in this.mMainChanList" :key="index" @openPop="openPop"/>
                          <searchChanIcon @openPop="openPop" />
                          <template v-if="this.mMainChanList.length === 0">
                              <squareSkeleton v-for="(value) in 10" :key="value"/>
                          </template>
                      </div>
                  </div>
              </div>
              <div v-if="GE_USER.unknownYn && this.mMainChanList" class="loginFalseChanList">
                  <div v-if="this.mMainChanList" class="w-100P fl" style="height: 30px;">
                      <img src="../../assets/images/main/main_followIcon2.png" style="margin-right: 8px;" class="fl img-w23 cursorP" alt="">
                      <p @click="goChannelPop('user')" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">{{$t('MAIN_TITLE_POPULAR_CHANNEL')}} ></p>
                  </div>
                  <div v-if="this.mMainChanList" :class="!isMobile? 'thinScrollBar':''" class="chanListWrap" id="subChannelWrap" style="" @wheel="horizontalScroll">
                      <div class="chanListScrollWrap">
                          <chanSquareIcon :chanElement="chan" v-for="(chan, index) in this.mMainChanList" :key="index" @openPop="openPop"/>
                          <searchChanIcon @openPop="openPop" />
                          <template v-if="this.mMainChanList.length === 0">
                              <squareSkeleton v-for="(value) in 10" :key="value"/>
                          </template>
                      </div>
                  </div>
              </div>
              <div class="mainContentsWrap">
                <div class="w-100P fl" style=" background-color: #E7EDFF; ">
                  <div class="mainContHeaderWrap">
                  <img src="../../assets/images/main/main_contentsBellIcon2.png" style="margin-right: 8px;" class="fl img-w24" alt="">
                  <p @click="!GE_USER.unknownYn? goContentListPop() : ''" class="font20 fontBold deepBorderColor fl textLeft cursorP CDeepColor" style="line-height: 26px;">{{!GE_USER.unknownYn? $t('MAIN_TITLE_RECV_CONTENTS') : $t('MAIN_TITLE_RECENT_POSTS')}} ></p>
                  <img class="fr cursorP" @click="openFindPop"  style="width: 25px; position: absolute;right: 65px;" src="../../assets/images/common/iocn_search.png" alt="">
                      <div class="mainContReload" @click="refreshMainList">
                          <img src="../../assets/images/common/reload_button.svg" class="cursorP img-w20" />
                      </div>
                  </div>
                  <div v-if="!GE_USER.unknownYn" style="width: 100%; min-height: 30px; background: #FFFFFF; padding: 0 10px; float: left; overflow: auto hidden;">
                      <div @click="getContentsListForSticker({stickerKey: 0})" :class="mSelectedStickerKey === 0 ? 'CDeepBgColor whiteColor' : 'CDeepColor CDeepBorderColor'" class="font14 fontBold " style="float: left; margin-right: 5px;min-width: 30px; height: 25px; padding: 0 10px; display: flex; align-items: center; text-align: center; border-radius: 5px; border position: relative;">전체</div>
                      <template v-for="(sticker, index) in mStickerList" :key="index">
                          <gStickerLine @click="getContentsListForSticker(sticker)" :pSelectedYn="mSelectedStickerKey === sticker.stickerKey? true: false" class="cursorP fl cursorHover" style="margin-right: 5px;" :pSticker="sticker"/>
                      </template>
                  </div>
              </div>
              <div v-if="mMainAlimList" style="float: left; width: 100%; margin-top: 2px; min-height: 10px; background: #F4F4F4; padding: 8px;" >
                  <template v-if="mMainAlimList.length === 0 && mContentsEmptyYn === false">
                      <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
                  </template>
                  <div v-if="mMainAlimList.length === 0 && mContentsEmptyYn === true" style="width: 100%; min-height: 300px; background: #FFFFFF; float: left;">
                      <gEmpty contentName="전체" tabName="최신" class="mtop-2"/>
                  </div>
                  <mainContsList :pMyCabinetKeyListStr="mMyCabinetKeyListStr" :pOpenUnknownLoginPop="openUnknownLoginPop" @goSearchDirect="goSearchDirect"  @openImgPop="oepnImgPop" ref="mainContsList" v-if="mMainAlimList.length > 0" :pMainAlimList="mMainAlimList" :propUserKey="this.GE_USER.userKey" @openPop='openPop' />
              </div>
              </div>
          </div>
      </div>
  </template>
<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import { onMessage } from '../../assets/js/webviewInterface'
import loadingCompo from '../../components/layout/Tal_loading.vue'
/* import pushList from '../routerPages/Tal_pushList.vue' */
import chanRoundIcon from '../../components/pageComponents/main/D_chanRoundIcon.vue'
import chanSquareIcon from '../../components/pageComponents/main/D_chanSquareIcon.vue'
import mainContsList from '../../components/pageComponents/main/D_mainContList.vue'

import createChanIcon from '../../components/pageComponents/main/unit/D_createChanRoundIcon.vue'
import searchChanIcon from '../../components/pageComponents/main/unit/D_searchChanSquareIcon.vue'
import circleSkeleton from '../../components/pageComponents/main/D_mainChanCircleSkeleton.vue'
import squareSkeleton from '../../components/pageComponents/main/D_mainChansquareSkeleton.vue'
import SkeletonBox from '../../components/pageComponents/push/D_contentsSkeleton'
import unknownLoginPop from '../../components/pageComponents/channel/D_unknownLoginPop.vue'
import imageMain from './D_ImageMain.vue'

export default {
  data () {
    // this.$i18n.locale = 'en'
    return {
      tableYn: false,
      mUnknownContDetail: {},
      mUnknownLoginPopYn: false,
      mAppCloseYn: false,
      mLoadingYn: false,
      mMainAlimList: [],
      mMainChanList: [],
      mMainMChanList: [],
      mAxiosQueue: [],
      mStickerList: [],
      mSelectedStickerKey: 0,
      mContentsEmptyYn: false,
      mMyCabinetKeyListStr: null,
      mActiveTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mImagePortal: false,
      mPortalMainTeam: {},
      popUpType: ''
    }
  },
  props: {
    pChangeNightYn: Function,
    pSetRouterData: Function,
    mRouterHeaderText: {}
  },
  components: {
    // initModal,
    commonConfirmPop,
    /* pushList, */
    searchChanIcon,
    createChanIcon,
    loadingCompo,
    chanRoundIcon,
    chanSquareIcon,
    mainContsList,
    circleSkeleton,
    squareSkeleton,
    SkeletonBox,
    unknownLoginPop,
    imageMain
  },
  created () {
    this.resetHistory()
    this.setNativeHeight()

    var urlParam = localStorage.getItem('deepLinkQueue')
    if (urlParam && urlParam.trim() !== '') {
      urlParam = JSON.parse(urlParam)
      if (urlParam.targetKey) {
        urlParam.targetKey = urlParam.targetKey.split('/')[0]
      }
      if (urlParam.targetType) {
        if (urlParam.targetType === 'followList') {
          const param = {}
          param.targetType = 'followList'
          param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
          this.$emit('openPop', param)
        } else if (urlParam.targetType === 'chanDetail') {
          this.openPagePop(urlParam.targetType, urlParam.targetKey)
        } else {
          this.goPage(urlParam)
        }
        localStorage.removeItem('deepLinkQueue')
      }
    }
    if (!this.GE_USER) {
      this.$router.replace({ name: 'unknown' })
      // this.$router.push({ name: 'policies' })
      return
    }
    this.getMainBoard().then(res => {
      this.mLoadingYn = false
    })
  },
  methods: {
    changeRouterPath () {
      this.$emit('changeRouterPath', 'myPage')
    },
    openSelectChannelPop () {
      console.log('open it!!')
      this.$emit('openSelectChannelPop')
    },
    setNativeHeight () {
      var varUA = localStorage.getItem('systemName')
      var nativeYn = localStorage.getItem('nativeYn')
      if ((varUA !== undefined && varUA !== null && varUA !== '') || (nativeYn !== false && nativeYn !== 'false')) {
        if ((nativeYn === true || nativeYn === 'true') || varUA === 'android' || varUA === '"Android"' || varUA === 'ios' || varUA === '"iOS"') {
          this.$STATUS_HEIGHT = 35 // 35
        } else {
          this.$STATUS_HEIGHT = 35
        }
      } else {
        this.$STATUS_HEIGHT = 0
      }
    },
    goPageForUrl (urlParam) {
      if (urlParam.targetType) {
        this.goPage(urlParam)
      }
      if (urlParam.contentsDetail || urlParam.chanDetail) {
        if (urlParam.contentsDetail) {
          this.openPagePop('contentsDetail', urlParam.contentsDetail)
        } else if (urlParam.chanDetail) {
          this.openPagePop('chanDetail', urlParam.chanDetail)
        }
      }
    },
    resetHistory () {
      this.$store.commit('D_HISTORY/setRemovePage', '')
      this.$store.commit('D_HISTORY/updateStack', [])
      this.$store.dispatch('D_HISTORY/AC_CLEAR_GPOP_STACK')
      if (this.mSocialMainYn !== undefined && this.mSocialMainYn === false) {
        //
      } else {
        if (this.$APP_CONFIG && this.$APP_CONFIG.appName) this.$emit('changePageHeader', this.$APP_CONFIG.appName)
      }
    },
    goLoginPage () {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile && (localStorage.getItem('nativeYn') === false || localStorage.getItem('nativeYn') === 'false')) {
        if (this.$APP_CONFIG && this.$APP_CONFIG.deepLink && this.$APP_CONFIG.deepLink.login) window.location.href = this.$APP_CONFIG.deepLink.login
      } else {
        this.$router.push({ path: '/policies' })
      }
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    },
    openUnknownLoginPop (contDetail) { // 이 컨텐츠의 정보
      this.mUnknownLoginPopYn = true
      // this.mUnknownContDetail = contDetail
    },
    async getContentsListForSticker (sticker) {
      if (!sticker) return
      this.mSelectedStickerKey = sticker.stickerKey
      this.mMainAlimList = []
      this.mContentsEmptyYn = false
      var res = await this.getMyContentsList()
      if (!res && res === '') {
        this.mContentsEmptyYn = true
      } else if (res && res.content) {
        this.mMainAlimList = res.content
        if (this.mMainAlimList && this.mMainAlimList.length === 0) this.mContentsEmptyYn = true
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimList)
      }
    },
    async getMyContentsList () {
      var param = {}
      param.ownUserKey = this.GE_USER.userKey
      param.subsUserKey = this.GE_USER.userKey
      param.allYn = true
      param.pageSize = 10
      param.offsetInt = 0
      if (this.mMyCabinetKeyListStr) {
        param.cabinetKeyListStr = this.mMyCabinetKeyListStr
      }
      if (this.mSelectedStickerKey != null && this.mSelectedStickerKey !== 0) {
        param.findActStickerYn = true
        param.findActYn = true
        param.stickerKey = this.mSelectedStickerKey
      }
      var result = await this.$getContentsList(param, true)
      var resultList = result
      return resultList
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 5
      })
    },
    openFindPop () {
      this.$refs.mainContsList.openFindPop()
    },
    oepnImgPop (param) {
      this.$emit('openImgPop', param)
    },
    scrollTop0 () {
      const unit = this.$refs.mainScrollWrap
      if (unit) {
        unit.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    async refreshMainList () {
      this.mMainAlimList = []
      var res = await this.$refs.mainContsList.refreshMainContList()
      if (res) {
        this.mMainAlimList = res.content
      }
    },
    goChannelPop (type) {
      var openPopParam = {}
      openPopParam.targetType = 'chanList'
      openPopParam.popHeaderText = this.$t('COMMON_NAME_CHANNEL')
      openPopParam.channelTabType = type
      this.openPop(openPopParam)
    },
    goSearchDirect (param) {
      this.$emit('goSearchDirect', param)
    },
    goContentListPop () {
      /* this.$emit('goSearchDirect') */
      var openPopParam = {}
      openPopParam.targetType = 'pushList'
      openPopParam.popHeaderText = this.$t('MAIN_TITLE_RECV_CONTENTS')
      this.openPop(openPopParam)
    },
    async getMainBoard () {
      if (this.GE_USER.unknownYn) {
        await this.getUnknownMainBoard()
        return
      }
      console.log('getMainBoard')
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      console.log(this.GE_USER)
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      if (this.GE_USER.soAccessToken !== undefined && this.GE_USER.soAccessToken !== null && this.GE_USER.soAccessToken !== '') { paramMap.set('soAccessToken', this.GE_USER.soAccessToken) }
      if (this.GE_USER.fcmKey !== undefined && this.GE_USER.fcmKey !== null && this.GE_USER.fcmKey !== '') { paramMap.set('fcmKey', this.GE_USER.fcmKey) }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      if (this.mSocialMainYn !== undefined && this.mSocialMainYn === false) {
        paramMap.set('portalYn', true)
      }
      var response = await this.$axios.post('/sUniB/tp.firstLoginCheck', Object.fromEntries(paramMap)
      )
      this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST')
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response.status === 200 || response.status === '200') {
        if (response.data) {
          if (this.mSocialMainYn !== undefined && this.mSocialMainYn === false) {
            if (response.data.mainTeam) {
              this.mPortalMainTeam = response.data.mainTeam
              this.mStickerList = response.data.stickerList
              this.$emit('chanePageHeader', this.$changeText(this.mPortalMainTeam.namtMtext))
              if (this.pSetRouterData) {
                this.pSetRouterData(this.mPortalMainTeam)
              }
              console.log([response.data.mainTeam])
              await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [{ teamKey: -1 }, ...response.data.mainTeam])
              await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.mStickerList)
            }
          } else {
            this.mMainChanList = response.data.teamList
            this.mMainMChanList = response.data.mTeamList
            this.mMainAlimList = response.data.alimList.content
            this.mStickerList = response.data.stickerList
            this.mMyCabinetKeyListStr = response.data.cabinetKeyListStr
            const todoObject = {
              teamKey: 0
            }
            await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', this.mStickerList)
            await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [{ teamKey: -1 }, todoObject, ...this.mMainChanList, ...this.mMainMChanList])
            await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimList)
          }
        }
        // To Do 저장을 위한 기본 저장소
      }
    },
    async getUnknownMainBoard () {
      console.log('getMainBoard')

      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      var response = await this.$axios.post('/sUniB/tp.getUnknownMainBoard', Object.fromEntries(paramMap)
      )
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      console.log(response.data)
      if (response.status === 200 || response.status === '200') {
        if (response.data) {
          this.mMainChanList = response.data.teamList.content
          this.mMainAlimList = response.data.alimList.content
          await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', this.mMainChanList)
          await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimList)
        }
      }
    },
    async openPagePop (targetKind, targetKey) {
      var param = {}
      param.targetType = targetKind
      if (Number(targetKey) === 735) param.homepageYn = true
      param.targetKey = Number(targetKey)
      this.openPop(param)
    },
    async goPage (data) {
      var detailParam = data
      if (data && data.targetType && data.targetKey) {
        var detailValue = await this.$addContents(Number(data.targetKey), data.jobkindId)
        if (detailValue !== false) {
          data.targetKey = Number(data.targetKey)
          if (data.creTeamKey) {
            data.creTeamKey = Number(data.creTeamKey)
            data.teamKey = Number(data.creTeamKey)
          }
          detailParam.targetType = data.targetType
          if (detailValue.jobkindId === 'BOAR') {
            detailParam.cabinetKey = detailValue.cabinetKey
            detailParam.cabinetNameMtext = detailValue.cabinetNameMtext
            detailParam.popHeaderText = detailValue.cabinetNameMtext
          } else {
            detailParam.nameMtext = detailValue.nameMtext
            detailParam.teamName = detailValue.nameMtext
            detailParam.popHeaderText = detailValue.nameMtext
          }
        }
        detailParam.value = data
        detailParam.notiYn = true
        this.openPop(detailParam)
      }
    },
    getParamMap (urlString) {
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      console.log(splited)
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    },
    async getNaverProfile () {
      var result = await this.$commonAxiosFunction({
        url: 'real/tp.getNaverProfile',
        param: { aToken: this.GE_USER.soAccessToken }
      })
      console.log(result)
    },
    goUserProfile () {
      var param = {}
      // this.mLoadingYn = true
      param.targetType = 'setMypage'
      param.popHeaderText = this.$t('PROF_NAME_SETTING')
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.mAppCloseYn = false
    },
    openPop (openParam) {
      this.$emit('openPop', openParam)
    },
    openNotiHistoryPop () {
      console.log('hhh?')
      this.$emit('openNotiHistoryPop')
      // if (!(this.GE_USER.userKey === 255 || this.GE_USER.userKey === 123 || this.GE_USER.userKey === 104 || this.GE_USER.userKey === 192 || this.GE_USER.userKey === 228 || this.GE_USER.userKey === 1)) return
      // // eslint-disable-next-line no-new-object
      // var param = new Object()
      // param.targetType = 'notiHitstory'
      // param.popHeaderText = '알림이력'
      // this.openPop(param)
    }
  },
  computed: {
    mSocialMainYn () {
      console.log(localStorage.getItem('currentScreen'))
      console.log(localStorage.getItem('currentScreen') === 'Smain')
      return localStorage.getItem('currentScreen') === 'Smain'
    },
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    GE_CREATE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_CREATE_CHAN_LIST']
    },
    GE_REMOVE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_REMOVE_CHAN_LIST']
    },
    GE_UPDATE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_UPDATE_CHAN_LIST']
    }
  },
  watch: {
    // locale (val) {
    //   this.$i18n.locale = val
    // },
    GE_STICKER_LIST: {
      handler (value, old) {
        this.mStickerList = this.GE_STICKER_LIST
      },
      deep: true
    },
    pageUpdate (value, old) {
      var history = this.historyStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (this.$route.path === '/') {
          if (this.$checkMobile() !== 'IOS') this.mAppCloseYn = true
        }
      } else if (history[0] === 'mainPage') {
        this.$removeHistoryStack()
      }
    },
    GE_CREATE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        this.mMainMChanList.unshift(value[0])
        this.mMainChanList.unshift(value[0])

        this.$store.dispatch('D_CHANNEL/AC_CREATE_CHANNEL_DEL', value[0])
      },
      deep: true
    },
    GE_REMOVE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        try {
          var findDelIdx = this.mMainMChanList.findIndex(item => item.teamKey === value[0].teamKey)
          if (findDelIdx !== -1) {
            this.mMainMChanList.splice(findDelIdx, 1)
          } else {
            return false
          }
          findDelIdx = this.mMainChanList.findIndex(item => item.teamKey === value[0].teamKey)
          if (findDelIdx !== -1) {
            this.mMainChanList.splice(findDelIdx, 1)
          } else {
            return false
          }
        } catch (error) {
          return false
        } finally {
          this.$store.dispatch('D_CHANNEL/AC_REMOVE_CHANNEL_DEL', value[0])
        }
      },
      deep: true
    },
    GE_UPDATE_CHAN_LIST: {
      async handler (value, old) {
        if (!value || value.length === 0) return
        var updateData = value[0]
        try {
          var detail = await this.$getDetail('TEAM', updateData.teamKey)[0]
          var findIdx = this.mMainMChanList.findIndex(item => item.teamKey === updateData.teamKey)
          if (findIdx !== -1) {
            this.mMainMChanList[findIdx] = detail
          } else {
            return false
          }

          findIdx = this.mMainChanList.findIndex(item => item.teamKey === updateData.teamKey)
          if (findIdx !== -1) {
            this.mMainChanList[findIdx] = detail
          } else {
            return false
          }
        } catch (error) {
          return false
        } finally {
          this.$store.dispatch('D_CHANNEL/AC_DEL_UPDATE_CHAN_LIST', updateData)
        }
      },
      deep: true
    }
  }
}
</script>

  <style scoped>

  /* main */

  .notiHistoryIcon{
    position:relative;
  }
  .newNoti{
    content:'';
    display:block;
    width:15px;
    height: 15px;
    line-height:15px;
    border-radius:50%;
    background-color:red;
    position:absolute;
    top:0;
    right:-5px;
    color:#fff;
    font-weight:bold;
    font-size:9px;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .userProfileWrap{ display:flex; align-items: center; justify-content: space-between; margin-top: 0; height: 50px;float: left;width: 100%; border-radius: 0.8rem; padding: 0 1.5rem;}
    .userProfileTextWrap{width: calc(100% - 85px); text-align: left; position: relative;}
    .userProfileTextWrap >p{margin-bottom: 0.2rem;}
    .userProfileTextWrap img{ width:1rem; margin-right: 0.2rem;}
    .userProfileTextWrap .profileTitle{font-weight: bold; color: #5B1CFC; margin-right: 0.4rem;}

  .mainContentsBoxArea {
    background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
  }

  @media screen and (max-width: 300px) {

    .mainUserName {font-size: 15px!important;}
    .mainIcon {width: 0.7rem!important;}
    .mainRefreshBtn {width: 20px!important}
  }
  .userProfileWelcomeWrap {
      width: calc(100% - 85px); float: left; height: 100%;
  }
  .quickSearchInput {
      background: #e4e4e463;
      width: 100%;
      height: 32px;
      margin-bottom: 5px!important;
      border-radius: 12px !important;
      padding: 0.4rem;
      padding-left: 2rem !important;
      box-sizing: border-box;
      float: left;
      border: 1px solid #cccccc;
  }
  .loginTrueUserWrap {
      float: left; height: calc(100% - 20px); width: 100%;
  }
  .loginTrueUserTextArea {
      float: left; height: 100%; position: relative;
  }
  .loginFalseChanList {
      background: #FFFFFF; padding: 20px; margin-top: 15px; padding-right: 0; padding-top: 20px; border-radius: 30px 30px 0px 0px; width: 100%; float: left;
  }
  .chanListWrap{
      width: 100%; height: 110px; margin-top: 5px;float: left; overflow: scroll hidden;
  }
  .chanListScrollWrap {
      height: 100%; min-width: 100%; display:flex;
  }
  .mainContentsWrap{
      border-radius: 30px 30px 0px 0px; width: 100%; float: left;
  }
  .mainContReload {
      position: absolute; top:15px; right:25px; z-index:8; width: 30px; height: 30px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); display: flex; align-items: center; justify-content: center;
  }
  .mainContHeaderWrap {width: 100%; display: flex; align-items: center; background: #FFF; height: 60px; float: left; padding: 17px 20px; border-radius: 30px 30px 0px 0px; position: relative; /* border-bottom: 2px solid #F4F7FF!important;  */margin-top: 15px;}

  </style>
