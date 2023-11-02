<template>
  <div ref="mainRef" class="w100P mainWrap">
    <gConfirmPop v-if="mAppCloseYn" @ok="closeApp" @appClose='closeApp' @no="mAppCloseYn=false" confirmType="two" confirmText="Do you want to exit UniBuzzy?" />
    <createBoardChannel v-if="mCreChannelShowYn" @successCreBoard="successCreBoard" @successCreChan="successCreChan" :pAreaInfo="mAreaInfo" :chanDetail="{ modiYn: false }" @openPage="openPage" :pSelectedAreaInfo="mAreaInfo" :pClosePop="closeCreChanPop" :pBdAreaList="mBdAreaList" />
    <div v-if="mSelectSchoolPopShowYn" @click="closeSchoolPop" class="popBg"></div>
    <transition name="showUp">
      <selectSchoolPop
        v-if="mSelectSchoolPopShowYn"
        :pGoTown="goTown"
        :pSchoolList="mSchoolList"
        :pClosePop="closeSelectSchoolPop"
      />
    </transition>
    <div
      v-if="mInfoBoxShowYn && !mSelectWriteTypePopShowYn"
      @click="closeInfoBox"
      class="popBg"
    ></div>
    <transition name="showUp">
      <areaInfoPop
        :pBdClickedYn="mBdClickedYn"
        :pBoardList="mBoardList"
        :chanDetail="{ modiYn: false }"
        @openImgPop="openImgPop"
        :pBdAreaList="mBdAreaList"
        :pOpenCreChanPop="openCreChanPop"
        @openPage="openPage"
        v-if="mInfoBoxShowYn && !mSelectWriteTypePopShowYn"
        :pAreaDetail="mAreaDetail"
        :pAreaInfo="mAreaInfo"
        :pClosePop="closeInfoBox"
        :pMoveToChan="moveToChan"
      />
    </transition>
    <div
      v-if="mChanInfoPopShowYn"
      @click="closeChanInfoBox"
      class="popBg"
    ></div>
    <transition name="showUp">
      <infoBox
        v-if="mChanInfoPopShowYn"
        @openPop="openPop"
        :pClosePop="closeChanInfoBox"
        @openPage="openPage"
        :pAreaInfo="mAreaInfo"
        :pAreaDetail="mAreaDetail"
        :pChanInfo="mSelectedChanInfo"
      />
    </transition>
    <div class="w100P mainTownArea" :style="`background-image: url(${mNightYn? '/resource/main/main_night_background.png':'/resource/main/town_background.png'})`">
      <div class="ballon">
        <img
          src="@/assets/images/main/ballon.png"
          alt="go to other town?"
          class="w100P"
        />
      </div>
      <div class="planeBox">
        <img
          @click="openSelectSchoolPop"
          class="cursorP planeImg"
          src="@/assets/images/main/icon_plane.png"
          style=""
          alt=""
        />
      </div>
      <div
        @click="goUserProfile"
        class="profileBox"
        v-if="!GE_USER.unknownYn"
        :style="{ top: $STATUS_HEIGHT + 60 + 'px' }"
      >
        <gProfileImg :selfYn="true" class="fl profileImg" />
        <div class="fl font20 fontBold userName">
          {{ $changeText(GE_USER.userDispMtext) }}
        </div>
      </div>
      <div v-else class="w100P loginBtnWrap">
        <gBtnSmall
          @click="goLoginPage"
          btnTitle="Sign In"
          class="fr loginBtn"
        />
      </div>
      <!-- <div style="position: absolute; top: 120px; left: 50%; transform: translate(-50%, -50%); width: 150px; height: 100px;">
        <img class="w100P h100P" style="position: absolute; top: 0; left: 0;" src="/resource/main/main_nametag.png" alt="">
        <p class="w100P textOverdot fontBold" style="position: absolute; bottom: 10px; font-style: italic; padding: 0 5px;">{{ mTownName }}</p>
      </div> -->
      <template v-if="mPcStyleYn">
        <div class="zoom" :class="mSelectedAreaPriority === building.priority? 'clickEvent':''" v-for="building in mTownBuildingList" :key="building.priority" style="position: absolute; transform: translate(-50%, -50%);" :style="{ width: building.pcW, height: building.pcH, left: building.left, top: building.top }">
          <img @click="this.openAreaInfoPop(this.mBdAreaList[building.priority])" class="w100P h100P" :src="mNightYn? building.nightImgPath:building.imgPath" alt="">
          <img :style="{ left: building.titleLeft, top: building.titleTop }" style="position: absolute; transform: translate(-50%, -50%);" :src="building.titlePah" alt="">
        </div>
        <img :src="mMountainImgPath" style="position: absolute; left: 20%; top: 55%; transform: translate(-50%, -50%); width: 35%; height: 20%;" alt="">
      </template>
      <template v-else>
        <div class="zoom" :class="mSelectedAreaPriority === building.priority? 'clickEvent':''" v-for="building in mTownBuildingList" :key="building.priority" style="position: absolute; transform: translate(-50%, -50%);" :style="{ width: building.w, left: building.left, top: building.top }">
          <img class="w100P h100P" @click="this.openAreaInfoPop(this.mBdAreaList[building.priority])" :src="mNightYn? building.nightImgPath:building.imgPath" alt="">
          <img :style="{ left: building.titleLeft, top: building.titleTop }" style="position: absolute; transform: translate(-50%, -50%); width: 70px;" :src="building.titlePah" alt="">
        </div>
        <img :src="mMountainImgPath" style="position: absolute; left: 20%; top: 55%; transform: translate(-50%, -50%); width: 35%;" alt="">
      </template>
      <div class="fl" style="width: 66px; height: 66px; border-radius: 100%; position: absolute; bottom: 3rem; right: 50px; z-index:1000;">
        <img id='writeBtn' src="@/assets/images/button/Icon_WriteBoardBtn.svg" @click="openSelectWriteTypePop()" alt="알림 작성 버튼" style="height: auto; cursor: pointer;">
      </div>
    </div>
    <div
      v-if="mBoardPopShowYn"
      class="popBg"
      @click="$refs.mainBoardRef.closeXPop"
    ></div>
    <transition name="showUp">
      <mainBoardList
        @openImgPop="openImgPop"
        @openPage="openPage"
        @openPop="openPop"
        :pAreaInfo="mAreaInfo"
        :pTownTeamKey="mTownTeamKey"
        v-if="mBoardPopShowYn"
        ref="mainBoardRef"
        :pClosePop="closeBoardPop"
      />
    </transition>
    <div
      v-if="mSelectWriteTypePopShowYn"
      class="popBg"
      @click="mSelectWriteTypePopShowYn = false"
    ></div>
    <transition name="showUp">
      <writeBottSheet
        transition="showUp"
        v-if="mSelectWriteTypePopShowYn"
        @openPop="openPop"
        @closePop="mSelectWriteTypePopShowYn = false"
        :propChanList="mSelectChanList"
      />
    </transition>
  </div>
</template>
<script>
import areaInfoPop from '@/components/pageComponents/main/popup/AreaInfoPop.vue'
import selectSchoolPop from '@/components/pageComponents/main/popup/SelectSchoolPop.vue'
import { onMessage } from '@/assets/js/webviewInterface'
import createBoardChannel from '@/components/popup/CreateBoardChannel.vue'
import mainBoardList from '@/components/pageComponents/main/popup/BoardListPop.vue'
import infoBox from '@/components/pageComponents/main/popup/InfoBox.vue'
import writeBottSheet from '@/components/popup/contents/ContentsWriteBottSheet.vue'
export default {
  props: {
    pChangeNightYn: Function
  },
  data () {
    return {
      mLoadingYn: false,
      mTownTeamKey: null,
      mBoardPopShowYn: false,
      mAppCloseYn: false,
      mCreChannelShowYn: false,
      mFavListPopShowYn: false,
      mShowAreaBdListYn: false,
      mInfoBoxShowYn: false,
      bgImg: {
        imgLink: ''
      },
      mMountainImgPath: '',
      mAreaShowYn: false,
      village: {
        villageInfo: {
          key: 1,
          name: 'Georgia Tech',
          followerList: [],
          level: 1,
          urlLink: 'https://www.gatech.edu/',
          logoImg: '/resource/new/logo/gtLogo.png'
        },
        areaList: []
      },
      mTownBuildingList: [
        {
          priority: 0,
          left: '52%',
          top: '65%',
          w: '40%',
          pcW: '40%',
          pcH: '18%',
          titleLeft: '5%',
          titleTop: '70%',
          imgPath: '/resource/main/main_campus.svg',
          nightImgPath: '/resource/main/main_night_campus.svg',
          titlePah: '/resource/main/title_campus.svg'
        },
        {
          priority: 1,
          left: '80%',
          top: '57%',
          w: '40%',
          pcW: '40%',
          pcH: '12%',
          titleLeft: '70%',
          titleTop: '70%',
          imgPath: '/resource/main/main_plaza.svg',
          nightImgPath: '/resource/main/main_night_plaza.svg',
          titlePah: '/resource/main/title_plaza.svg'
        },
        {
          priority: 2,
          left: '75%',
          top: '33%',
          w: '45%',
          pcW: '45%',
          pcH: '15%',
          titleLeft: '70%',
          titleTop: '95%',
          imgPath: '/resource/main/main_club.svg',
          nightImgPath: '/resource/main/main_night_club.svg',
          titlePah: '/resource/main/title_club.svg'
        },
        {
          priority: 3,
          left: '16%',
          top: '35%',
          w: '25%',
          pcW: '23%',
          pcH: '13%',
          titleLeft: '25%',
          titleTop: '95%',
          imgPath: '/resource/main/main_major.svg',
          nightImgPath: '/resource/main/main_night_major.svg',
          titlePah: '/resource/main/title_major.svg'
        },
        {
          priority: 4,
          left: '49%',
          top: '42%',
          w: '55%',
          pcW: '55%',
          pcH: '22%',
          titleLeft: '55%',
          titleTop: '45%',
          imgPath: '/resource/main/main_classin.svg',
          nightImgPath: '/resource/main/main_night_class.svg',
          titlePah: '/resource/main/title_class.svg'
        },
        {
          priority: 5,
          left: '83%',
          top: '76%',
          w: '40%',
          pcW: '35%',
          pcH: '15%',
          titleLeft: '70%',
          titleTop: '20%',
          imgPath: '/resource/main/main_living.svg',
          nightImgPath: '/resource/main/main_night_living.svg',
          titlePah: '/resource/main/title_living.svg'
        },
        {
          priority: 6,
          left: '47%',
          top: '90%',
          w: '55%',
          pcW: '55%',
          pcH: '18%',
          titleLeft: '70%',
          titleTop: '65%',
          imgPath: '/resource/main/main_nearby.svg',
          nightImgPath: '/resource/main/main_night_nearby.svg',
          titlePah: '/resource/main/title_nearby.svg'
        },
        {
          priority: 7,
          left: '20%',
          top: '75%',
          w: '35%',
          pcW: '35%',
          pcH: '18%',
          titleLeft: '40%',
          titleTop: '100%',
          imgPath: '/resource/main/main_lab.svg',
          nightImgPath: '/resource/main/main_night_lab.svg',
          titlePah: '/resource/main/title_lab.svg'
        }
      ],
      mNightYn: false,
      mSelectedAreaPriority: -1,
      innerWidth: 0,
      innerHeight: 0,
      blankHeight: 0,
      blankWidth: 0,
      clickedArea: {},
      clickedBd: {},
      clickedRank: 0,
      mBdAreaList: [],
      mFTeamList: [],
      mAlimCount: [],
      mAxiosQueue: [],
      mSelectedAreaInfo: {},
      mSelectSchoolPopShowYn: false,
      mSchoolList: [],
      mBdClickedYn: false,
      mOffsetInt: 0,
      mChanInfoPopShowYn: false,
      mSelectedChanInfo: {},
      mBoardList: [],
      mSelectChanList: [],
      mSelectWriteTypePopShowYn: false,
      mTownName: '',
      mPcStyleYn: false
    }
  },
  created() {
    if (this.GE_USER.myTeamKey === 836) {
      this.$router.push({ name: 'uniBmain' })
      return
    }
    this.resetHistory()
    this.setNativeHeight()
    this.$store.commit('UB_HISTORY/updateStack', [0])
    this.$emit('clearInfo', { detail: null, targetType: 'main' })

    var urlParam = localStorage.getItem('deepLinkQueue')
    if (urlParam && urlParam.trim() !== '') {
      urlParam = JSON.parse(urlParam)
      urlParam.targetKey = urlParam.targetKey.split('/')[0]
      if (urlParam.targetType) {
        if (urlParam.targetType === 'chanDetail') {
          const param = {
            targetType: urlParam.targetType,
            targetKey: urlParam.targetKey
          }
          this.openPage(param)
        } else {
          this.goPage(urlParam)
        }
        localStorage.removeItem('deepLinkQueue')
      }
    }
    let xmlHttpRequest
    if (window.XMLHttpRequest) { // code for Firefox, Mozilla, IE7, etc.
      xmlHttpRequest = new XMLHttpRequest()
    } else {
      return
    }

    xmlHttpRequest.open('HEAD', window.location.href.toString(), false)
    xmlHttpRequest.setRequestHeader('ContentType', 'text/html')
    xmlHttpRequest.send('')

    const serverDate = xmlHttpRequest.getResponseHeader('Date')
    const date = new Date(serverDate)
    const nowHours = date.getHours()

    if (nowHours >= 19) {
      this.pChangeNightYn(true)
      this.mNightYn = true
      this.mMountainImgPath = '/resource/main/main_night_mountain.svg'
    } else {
      this.pChangeNightYn(false)
      this.mNightYn = false
      this.mMountainImgPath = '/resource/main/main_mountain.svg'
    }
    this.getMainBoard().then(res => {
      // this.createMaskingAreaImg()
      // this.innerWidth = window.innerWidth
      // this.innerHeight = window.innerHeight
      if (this.mBdAreaList && this.mBdAreaList[0] && this.mBdAreaList[0].bdList && this.mBdAreaList[0].bdList[0]) {
        this.$emit('changePageHeader', this.$changeText(this.mBdAreaList[0].bdList[0].nameMtext))
        this.mTownName = this.$changeText(this.mBdAreaList[0].bdList[0].nameMtext)
      } else {
        this.$emit('changePageHeader', 'Campus')
      }
      this.$emit('enterCloudLoading', false)
      setTimeout(() => {
        this.$emit('showCloudLoading', false)
      }, 800)
    })
  },
  unmounted () {
    this.pChangeNightYn(false)
  },
  methods: {
    async openSelectWriteTypePop() {
      await this.getTeamList(true)
      this.mSelectWriteTypePopShowYn = true
    },
    async getTeamList(loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 100)
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      if (resultList.data) {
        this.mSelectChanList = resultList.data.content
      } else {
        this.mSelectChanList = []
      }
    },
    goLab() {
      this.$router.push('/board/824/13905')
      this.$emit('goInquiries', 'lab')
    },
    openImgPop(param) {
      this.$emit('openImgPop', param)
    },
    closeApp() {
      onMessage('closeApp', 'requestUserPermission')
      this.mAppCloseYn = false
    },
    successCreChan(param) {
      this.closeCreChanPop()
      if (param.deleteYn) {
        return
      }
      param.targetType = 'chanDetail'
      this.openPage(param)
    },
    successCreBoard(param) {
      this.closeCreChanPop()
      param.targetType = 'boardMain'
      this.openPage(param)
    },
    closeChanInfoBox() {
      this.resetHistory()
      if (this.clickedArea && this.clickedArea.clickedYn) {
        this.clickedArea.clickedYn = false
      } else if (this.clickedBd && this.clickedBd.clickedYn) {
        this.clickedBd.clickedYn = false
      }
      this.mChanInfoPopShowYn = false
      return false
    },
    closeInfoBox() {
      this.resetHistory()
      if (this.clickedArea && this.clickedArea.clickedYn) {
        this.clickedArea.clickedYn = false
      } else if (this.clickedBd && this.clickedBd.clickedYn) {
        this.clickedBd.clickedYn = false
      }
      this.mBoardList = []
      this.mInfoBoxShowYn = false
      return false
    },
    closeSchoolPop() {
      this.resetHistory()
      this.mSelectSchoolPopShowYn = false
    },
    openCreChanPop() {
      this.mInfoBoxShowYn = false
      this.mCreChannelShowYn = true
    },
    closeBoardPop(shadowClickYn) {
      this.mBoardPopShowYn = false
    },
    openBoardPop() {
      this.mBoardPopShowYn = true
    },
    closeCreChanPop() {
      this.mCreChannelShowYn = false
    },
    findAllDrawn() {
      this.$emit('enterCloudLoading', false)
      setTimeout(() => {
        this.$emit('showCloudLoading', false)
      }, 1000)
    },
    async getChannelList(pageSize, offsetInput, mLoadingYn) {
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
        if (this.mOffsetInt === 0 && this.mChannelList.length === 10) {
          this.mOffsetInt = 1
        }
        paramMap.set('offsetInt', this.mOffsetInt)
      }
      if (pageSize) {
        paramMap.set('pageSize', pageSize)
      } else {
        paramMap.set('pageSize', 10)
      }

      var result = await this.$getTeamList(paramMap, false)
      var resultList = result.data
      return resultList
    },
    async openSelectSchoolPop() {
      this.mSchoolList = null
      this.mSelectSchoolPopShowYn = true
    },
    closeSelectSchoolPop() {
      this.resetHistory()
      this.mSelectSchoolPopShowYn = false
    },
    async goTown(chanEle) {
      this.$emit('showCloudLoading', true, true)
      this.$emit('enterCloudLoading', true)
      var param = {
        user: {
          userKey: this.GE_USER.userKey,
          myTeamKey: chanEle.teamKey
        },
        updateYn: true
      }
      const result = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.saveUser',
          param: param
        },
        true
      )
      if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data.userInfo))
        await this.$store.dispatch('UB_USER/AC_USER', result.data.userInfo)
        localStorage.setItem(
          'sessionUser',
          JSON.stringify(result.data.userInfo)
        )
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_FAILED'))
      }
      this.getMainBoard().then(res => {
        if (this.mBdAreaList && this.mBdAreaList[0] && this.mBdAreaList[0].bdList && this.mBdAreaList[0].bdList[0]) {
          this.$emit('changePageHeader', this.$changeText(this.mBdAreaList[0].bdList[0].nameMtext))
        } else {
          this.$emit('changePageHeader', 'Campus')
        }
        this.$emit('enterCloudLoading', false)
        setTimeout(() => {
          this.$emit('showCloudLoading', false)
        }, 800)
      })
      this.mSelectSchoolPopShowYn = false
      if (this.GE_USER.myTeamKey === 836) {
        this.$router.push({ name: 'uniBmain' })
      }
    },
    async openChanInfoPop(area, teamKey) {
      const param = {
        bdArea: {
          bdAreaKey: area.bdAreaKey
        }
      }
      if (area.priority === 0) {
        this.mAreaInfo = area
        this.openBoardPop()
      } else {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getBdAreaDetail',
          param: param
        })
        if (result.data) {
          this.mAreaDetail = await result.data
          this.mAreaInfo = await area
          this.mChanInfoPopShowYn = true
          this.allClearFocus()

          const index = this.mAreaDetail.bdList.findIndex(
            (item) => item.targetKey === teamKey
          )
          if (index !== -1) {
            this.mSelectedChanInfo = this.mAreaDetail.bdList[index]
          }
        }
      }
    },
    async openAreaInfoPop (area) {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile && (localStorage.getItem('nativeYn') === true || localStorage.getItem('nativeYn') === 'false')) {
        if (area === undefined) {
          this.mSelectedAreaPriority = 7
        } else {
          this.mSelectedAreaPriority = area.priority
        }
        setTimeout(() => {
          this.mSelectedAreaPriority = -1
        }, 900)
      }
      if (area === undefined) {
        this.goLab()
      }
      if (this.mBgNotClickYn) return
      const param = {
        bdArea: {
          bdAreaKey: area.bdAreaKey
        }
      }
      if (area.priority === 0) {
        this.mAreaInfo = area
        this.openBoardPop()
      } else if (area.priority !== 1) {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getBdAreaDetail',
          param: param
        })
        if (result.data) {
          this.mAreaDetail = await result.data
          this.mAreaInfo = await area
          this.mInfoBoxShowYn = true
          this.allClearFocus()
        }
      } else {
        this.mAreaInfo = area
        this.mAreaDetail = {
          bdArea: this.mAreaInfo,
          bdList: null
        }
        this.mInfoBoxShowYn = true
        this.allClearFocus()
      }
    },
    closePop() {
      this.mInfoBoxShowYn = false
      this.allClearFocus()
      this.mBgNotClickYn = true
    },
    openInfoPop(value) {
      this.mSelectedAreaInfo = value
    },
    goUserProfile() {
      this.$emit('changeRouterPath', 'myPage')
    },
    async goLoginPage() {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (
        isMobile &&
        (localStorage.getItem('nativeYn') === true ||
          localStorage.getItem('nativeYn') === 'false')
      ) {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/policies' })
      }
    },
    openPage(param) {
      this.mInfoBoxShowYn = false
      this.mCreChannelShowYn = false
      this.$emit('openPage', param)
    },
    openPop(openParam) {
      this.$emit('openPop', openParam)
    },
    async getMainBoard() {
      if (
        this.mAxiosQueue.length > 0 &&
        this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1
      ) {
        return
      }
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        if (localStorage.getItem('sessionUser')) {
          paramMap.set(
            'userKey',
            JSON.parse(localStorage.getItem('sessionUser')).userKey
          )
        }
      }
      if (this.GE_USER.soAccessToken && this.GE_USER.soAccessToken !== '') {
        paramMap.set('soAccessToken', this.GE_USER.soAccessToken)
      }
      if (
        this.GE_USER.fcmKey !== undefined &&
        this.GE_USER.fcmKey !== null &&
        this.GE_USER.fcmKey !== ''
      ) {
        paramMap.set('fcmKey', this.GE_USER.fcmKey)
      }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      var response = await this.$axios.post(
        '/sUniB/tp.UB_firstLoginCheck',
        Object.fromEntries(paramMap)
      )
      var queueIndex = this.mAxiosQueue.findIndex(
        (item) => item === 'getMainBoard'
      )
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response && (response.status === 200 || response.status === '200')) {
        this.mBdAreaList = response.data.bdAreaList
        this.mFTeamList = response.data.fTeamList
        this.mAlimCount = response.data.alimCount
        if (this.mBdAreaList && this.mBdAreaList.length > 0) {
          this.mTownTeamKey = this.mBdAreaList[0].teamKey
        }
        this.$emit('setMainInfo', {
          fTeamList: this.mFTeamList,
          alimCount: this.mAlimCount
        })
        this.village.areaList = []
        for (var i = 0; i < this.mBdAreaList.length; i++) {
          const area = this.mBdAreaList[i]
          const areaObj = {
            key: area.priority,
            name: area.bdAreaNameMtext,
            ctx: {},
            maskingRef: null,
            areaYn: true,
            imgLink: area.bdAreaImgPath,
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            buildingList: [
            ]
          }
          this.village.areaList.push(areaObj)

          let count = 0
          if (area.bdList.length > 5) {
            count = 5
          } else {
            count = area.bdList.length
          }
          for (let j = 0; j < count; j++) {
            const buildingObj = {
              index: j,
              ctx: {},
              areaYn: false,
              rank: j + 1,
              type: area.priority === 0 ? 'CB' : '',
              imgLink: area.bdList[j].bdIconPath,
              maskedImageUrl: '',
              teamKey: area.bdList[j].targetKey,
              targetKind: area.bdList[j].targetKind,
              maskedImageStyle: {},
              clickedYn: false,
              left: 0,
              top: 0,
              w: 50,
              h: 0
            }
            this.village.areaList[area.priority].buildingList.push(buildingObj)
          }
        }
        if (response.data.cTeamList) {
          await this.$addChanVuex(response.data.cTeamList)
        }
      }
    },
    setNativeHeight() {
      var varUA = localStorage.getItem('systemName')
      var nativeYn = localStorage.getItem('nativeYn')
      if (
        (varUA !== undefined && varUA !== null && varUA !== '') ||
        (nativeYn !== false && nativeYn !== 'false')
      ) {
        if (
          nativeYn === true ||
          nativeYn === 'true' ||
          varUA === 'android' ||
          varUA === '"Android"' ||
          varUA === 'ios' ||
          varUA === '"iOS"'
        ) {
          this.$STATUS_HEIGHT = 35 // 35
        } else {
          this.$STATUS_HEIGHT = 35
        }
      } else {
        this.$STATUS_HEIGHT = 0
      }
    },
    resetHistory() {
      this.$store.commit('UB_HISTORY/setRemovePage', '')
      this.$store.commit('UB_HISTORY/updateStack', [])
      this.$store.dispatch('UB_HISTORY/AC_CLEAR_GPOP_STACK')
    },
    moveToChan(clickedInfo) {
      this.closeInfoBox()
      this.$emit('chanInfo', clickedInfo)
    },
    createMaskingAreaImg() {
      const areaList = this.village.areaList
      let w = 0
      let h = 0
      if (this.$refs.mainRef) {
        w = this.$refs.mainRef.offsetWidth
        h = this.$refs.mainRef.offsetHeight
      } else {
        w = window.innerWidth
        h = window.innerHeight
        const scaleFactor = h / 3167
        w = scaleFactor * 1500
        if (h > window.innerHeight) {
          this.blankHeight = (window.innerHeight - h) / 2
          this.blankWidth = (window.innerWidth - w) / 2
        } else {
          h = window.innerHeight
          const scaleFactor = h / 3167
          w = scaleFactor * 1500
          this.blankHeight = (window.innerHeight - h) / 2
          this.blankWidth = (window.innerWidth - w) / 2
        }
      }
      if (areaList && areaList.length !== 0) {
        for (let i = 0; i < areaList.length; i++) {
          const area = areaList[i]
          if (area.key === 0) {
            // campus
            area.w = (2 / 5) * w
            area.h = (1 / 7) * h
            area.left = w / 2 - area.w / 2 + this.blankWidth
            area.top = h / 3 - area.h / 6 + this.blankHeight
          } else if (area.key === 1) {
            // plaza
            area.w = (2 / 5) * w
            area.h = (1 / 6) * h
            area.left = w / 2 - (1 / 2) * area.w + this.blankWidth
            area.top = (1 / 2) * h - area.h / 4 + this.blankHeight
          } else {
            if (area.key === 2) {
              // club & Startup
              area.h = (1 / 7) * h
              area.w = (6 / 16) * w
              area.left = w / 2 - area.w - (area.w * 3) / 8 + this.blankWidth
              area.top = (2 / 5) * h + area.h / 12 + this.blankHeight
            } else if (area.key === 3) {
              // Major
              area.h = (1 / 7) * h
              area.w = (6 / 16) * w
              area.left = (5 / 8) * w + (1 / 12) * area.w + this.blankWidth
              area.top = (2 / 5) * h + area.h / 12 + this.blankHeight
            } else if (area.key === 4) {
              // Class
              area.h = (1 / 6) * h
              area.w = (2 / 5) * w
              area.left = w / 2 + area.w / 12 + this.blankWidth
              area.top = (13 / 32) * h + area.h + this.blankHeight
            } else if (area.key === 5) {
              // Living
              area.h = (1 / 6) * h
              area.w = (2 / 5) * w
              area.left = w / 2 - area.w - area.w / 12 + this.blankWidth
              area.top = (13 / 32) * h + area.h + this.blankHeight
            } else if (area.key === 6) {
              // Nearby
              area.h = (1 / 6) * h
              area.w = (1 / 2) * w
              area.left = w / 2 - area.w / 2 + this.blankWidth
              area.top = (5 / 8) * h + (area.h * 5) / 12 + this.blankHeight
            }
          }
          const _this = this
          const targetImage = new Image()
          targetImage.src = area.imgLink
          targetImage.onload = function () {
            let scaleFactor = area.w / this.width
            const canvas = document.createElement('canvas')
            const newWidth = Math.floor(this.width * scaleFactor)
            scaleFactor = area.h / this.height
            const newHeight = Math.floor(this.height * scaleFactor)
            canvas.width = newWidth
            canvas.height = newHeight
            area.w = newWidth
            area.h = newHeight
            const context = canvas.getContext('2d', {
              willReadFrequently: true
            })
            // 마스킹 이미지 그리기
            context.drawImage(this, 0, 0, newWidth, newHeight)
            area.ctx = context
            // 마스킹 이미지를 base64로 변환하여 출력
            area.maskedImageUrl = canvas.toDataURL()
            const lastYn = areaList.length - 1 === i
            _this.createMaskingBuildingImg(area, lastYn)
          }
          targetImage.src = area.imgLink
        }
      }
    },
    createMaskingBuildingImg(area, lastYn) {
      const bdList = area.buildingList
      if (area.key === 6) {
        area.loadYn = true
      }
      if (bdList === null || bdList.length === 0) return

      for (let j = 0; j < bdList.length; j++) {
        const bd = bdList[j]
        bd.w = (1 / 5) * area.w
        bd.h = (1 / 3) * area.h
        if (bd.rank === 1) {
          if (bd.type === 'CB') {
            bd.w = (1 / 2) * area.w
            bd.h = (1 / 2) * area.h
            if (window.innerWidth > 1000) {
              bd.w = (1 / 3) * area.w
              bd.left = area.left + area.w / 2 - bd.w / 2
              bd.top = area.top - this.village.areaList[0].h / 2 - bd.h / 2
            } else {
              bd.left = area.left + area.w / 2 - bd.w / 2
              bd.top = area.top - this.village.areaList[0].h / 2 + bd.h / 2
            }
            // i + area.top - bd.h / 2
          } else {
            bd.left = area.left + area.w * (2 / 5) + 5
          }
        } else if (bd.rank === 2) {
          bd.left = (1 / 5) * area.w + area.left
        } else if (bd.rank === 3) {
          bd.left = (3 / 5) * area.w + area.left
        } else if (bd.rank === 4) {
          bd.left = area.left + 10
        } else if (bd.rank === 5) {
          bd.left = (4 / 5) * area.w + area.left - 10
        }
        const targetImage = new Image()
        targetImage.src = bd.imgLink
        // eslint-disable-next-line no-unused-vars
        const this_ = this
        targetImage.onload = function () {
          let newWidth = bd.w
          let newHeight = bd.h
          let scaleFactor = 1
          if (bd.type !== 'CB' && window.innerWidth > 1000) {
            scaleFactor = ((bd.w / this.width) * 4) / 5
          } else {
            scaleFactor = bd.w / this.width
          }
          newWidth = Math.floor(this.width * scaleFactor)
          newHeight = Math.floor(this.height * scaleFactor)
          const canvas = document.createElement('canvas')
          canvas.width = newWidth
          canvas.height = newHeight
          bd.w = newWidth
          bd.h = newHeight
          const context = canvas.getContext('2d', { willReadFrequently: true })
          bd.ctx = context
          if (bd.type !== 'CB') {
            for (let i = 0; i < area.h; i++) {
              let pixelData = {}
              if (bd.rank === 1) {
                pixelData = area.ctx.getImageData(
                  (2 / 5) * area.w,
                  i,
                  1,
                  1
                ).data
              } else if (bd.rank === 2) {
                pixelData = area.ctx.getImageData(
                  (1 / 5) * area.w,
                  i,
                  1,
                  1
                ).data
              } else if (bd.rank === 3) {
                pixelData = area.ctx.getImageData(
                  (3 / 5) * area.w,
                  i,
                  1,
                  1
                ).data
              } else if (bd.rank === 4) {
                pixelData = area.ctx.getImageData(10, i, 1, 1).data
              } else if (bd.rank === 5) {
                pixelData = area.ctx.getImageData(
                  (4 / 5) * area.w - 10,
                  i,
                  1,
                  1
                ).data
              }
              if (pixelData[3] !== 0) {
                if (window.innerWidth > 1000) {
                  bd.top = i + area.top - bd.h / 2
                } else {
                  bd.top = i + area.top - bd.h / 3
                }
                break
              }
            }
          }
          // 마스킹 이미지 그리기
          context.drawImage(this, 0, 0, bd.w, bd.h)
          // 마스킹 이미지를 base64로 변환하여 출력
          bd.maskedImageUrl = canvas.toDataURL()
        }
        targetImage.src = bd.imgLink
        if (lastYn && bdList.length - 1 === j) {
          this.findAllDrawn()
        }
      }
    },
    async getInRectImgList(event) {
      if (this.mainShowPopYn) return
      // 빌딩부터 역순으로 뒤짐
      // 빌딩이 발견됨, 스타일클리어 시키고, 효과를 주고 return해버리기
      // 빌딩 클릭이 없음, areaclick을 찾음
      let blankWidth = 0
      if (window.innerWidth > 1000) {
        // area width = 1000 (원래는 1500)
        blankWidth = (window.innerWidth - 1000) / 2
      }
      if (this.clickedBd && this.clickedBd.clickedYn && this.mInfoBoxShowYn) {
        return
      }
      this.clickedArea = {}
      this.clickedBd = {}
      this.clickedRank = 0
      this.allClearFocus()
      let findYn = false
      const mBdAreaList = this.village.areaList
      for (let i = mBdAreaList.length - 1; i >= 0; i--) {
        const area = mBdAreaList[i]
        if (area.buildingList && area.buildingList.length !== 0) {
          for (let j = 0; j < area.buildingList.length; j++) {
            const bd = area.buildingList[j]
            if (bd.ctx === null) continue
            findYn = false
            if (
              event.clientX >= bd.left + blankWidth &&
              event.clientX <= bd.left + bd.w + blankWidth &&
              event.clientY >= bd.top &&
              event.clientY <= bd.top + bd.h
            ) {
              findYn = true
              bd.onImgYn = true
              break
            }
            bd.onImgYn = false
          }
          this.allClearFocus()
          if (findYn === false) continue

          for (let j = area.buildingList.length - 1; j >= 0; j--) {
            const bd = area.buildingList[j]
            if (bd.onImgYn === false) continue

            const _x = event.clientX - bd.left - blankWidth
            const _y = event.clientY - bd.top
            const pixelData = bd.ctx.getImageData(_x, _y, 1, 1).data
            if (pixelData[3] !== 0) {
              this.clickedBd = bd
              this.mBdClickedYn = true
              bd.clickedYn = true
              bd.maskedImageStyle = {
                filter:
                  'drop-shadow(0 0 5px orange) drop-shadow(0 0 10px white)'
              }
              if (bd.targetKind === 'C') {
                this.openAreaInfoPop(this.mBdAreaList[area.key])
              } else if (!this.mInfoBoxShowYn) {
                this.openChanInfoPop(this.mBdAreaList[area.key], bd.teamKey)
              }
              return
            }
          }
        }
      }
      // 빌딩 발견 안 되었을 때
      findYn = false
      for (let i = 0; i < this.village.areaList.length; i++) {
        const area = this.village.areaList[i]
        if (area.ctx === null) {
          continue
        }
        findYn = false
        if (
          event.clientX >= area.left + blankWidth &&
          event.clientX <= area.left + area.w + blankWidth &&
          event.clientY >= area.top &&
          event.clientY <= area.top + area.h
        ) {
          findYn = true
          area.onImgYn = true
          break
        }
        area.onImgYn = false
      }
      this.allClearFocus()
      if (findYn === false) {
        return
      }
      // 마우스 위치가 마스킹 영역 내부에 있는지 확인
      for (let i = this.village.areaList.length - 1; i >= 0; i--) {
        const area = this.village.areaList[i]
        if (area.onImgYn === false) {
          continue
        }
        const _x = event.clientX - area.left - blankWidth
        const _y = event.clientY - area.top
        const pixelData = area.ctx.getImageData(_x, _y, 1, 1).data
        if (pixelData[3] !== 0) {
          this.clickedArea = area
          this.mBdClickedYn = false
          this.clickedRank = area.buildingList.length + 1
          area.clickedYn = true
          area.maskedImageStyle = {
            filter: 'drop-shadow(0 0 5px yellow) drop-shadow(0 0 40px white)'
          }
          if (this.mBdAreaList[area.key].priority === 1) {
            await this.getBoardList(this.GE_USER.myTeamKey)
          }
          if (!this.mChanInfoPopShowYn) {
            this.openAreaInfoPop(this.mBdAreaList[area.key])
          }
          break
        }
      }
    },
    async getBoardList(teamKey) {
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      chanMainParam.teamKey = teamKey
      chanMainParam.targetKey = teamKey
      const param = {}
      param.teamKey = teamKey
      param.fUserKey = this.GE_USER.userKey
      param.userKey = this.GE_USER.userKey
      const result = await this.$getViewData(
        { url: '/sUniB/tp.getTeamMenuList', param: param },
        false
      )
      if (!result || !result.data) {
        this.$showToastPop('Channel not found!')
      } else {
        this.mBoardList = result.data
      }
    },
    allClearFocus() {
      for (let i = 0; i < this.village.areaList.length; i++) {
        const area = this.village.areaList[i]
        area.clickedYn = false
        area.maskedImageStyle = {}
        for (let j = 0; j < area.buildingList.length; j++) {
          const bd = area.buildingList[j]
          bd.clickedYn = false
          bd.maskedImageStyle = {}
        }
      }
    },
    setRatio () {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      if (windowWidth / windowHeight > 0.54) {
        this.mPcStyleYn = true
      } else {
        this.mPcStyleYn = false
      }
    },
    setWindowSize () {
      this.innerWidth = window.innerWidth
      const nowHeight = window.innerHeight

      if (this.innerHeight < nowHeight) this.innerHeight = nowHeight
    }
  },
  watch: {
    mLoadingYn(val) {
      if (!val) {
        this.$emit('enterCloudLoading', false)
        setTimeout(() => {
          this.$emit('showCloudLoading', false)
        }, 800)
      }
    },
    pageUpdate(value, old) {
      var history = this.historyStack
      if (
        history.length < 2 &&
        (history[0] === 0 ||
          history[0] === undefined ||
          history[0] === 'router$#$routerMain')
      ) {
        if (this.$route.path === '/') {
          if (this.$checkMobile() !== 'IOS') this.mAppCloseYn = true
        }
      } else if (history[0] === 'mainPage') {
        this.$removeHistoryStack()
      }
    }
    // clickedBd () {
    //   this.mInfoBoxShowYn = true
    // }
  },
  mounted() {
    this.$emit('showCloudLoading', true, false)
    // this.findAllDrawn()
    this.setWindowSize()
    this.setRatio()
    window.addEventListener('resize', this.setRatio)
  },
  computed: {
    mainShowPopYn() {
      let showYn = false
      if (
        this.mBoardPopShowYn ||
        this.mInfoBoxShowYn ||
        this.mShowAreaBdListYn ||
        this.mFavListPopShowYn ||
        this.mCreChannelShowYn
      ) {
        showYn = true
      }
      return showYn
    },
    historyStack() {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    pageUpdate() {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST() {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_CREATE_CHAN_LIST() {
      return this.$store.getters['UB_CHANNEL/GE_CREATE_CHAN_LIST']
    },
    GE_REMOVE_CHAN_LIST() {
      return this.$store.getters['UB_CHANNEL/GE_REMOVE_CHAN_LIST']
    },
    GE_UPDATE_CHAN_LIST() {
      return this.$store.getters['UB_CHANNEL/GE_UPDATE_CHAN_LIST']
    }
  },
  components: {
    mainBoardList,
    selectSchoolPop,
    areaInfoPop,
    createBoardChannel,
    infoBox,
    writeBottSheet
  }
}
</script>
<style scoped>
@keyframes area-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}
.areaDiv {
  animation: areaMoving 0.3s 1s ease-in-out 3 alternate;
  cursor: pointer;
  position: absolute;
  z-index: 99;
}
.areaDiv > img {
  position: absolute;
  z-index: 99;
}
.areaDiv > div {
  background-color: rgba(245, 245, 220, 0.7) !important;
  color: black;
  border-radius: 5px;
  padding: 5px;
  height: 30px;
  z-index: 99;
}
.areaDiv > div > p {
  height: 20px;
  line-height: 20px;
}
@keyframes areaMoving {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.01);
  }
}
.areaDiv.clicked {
  animation: area-zoom 0.4s alternate;
}
.bdDiv {
  position: absolute;
}
.bdDiv.clicked {
  z-index: 9999 !important;
  transform: scale(1.1);
}
.areaCard {
  position: fixed;
  top: 0;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 5px;
  z-index: 99;
}
.banner {
  width: 250px;
  height: 80px;
  position: absolute;
  top: -50px;
  left: 0;
}
.banner > img {
  position: absolute;
}
.banner > div {
  position: absolute;
  margin-bottom: 30px;
}
.bdName {
  position: absolute;
  line-height: 15px;
  color: #333333;
  border: 1px solid #ccc;
  width: 80px;
  border-radius: 5px;
  padding: 0 5px;
}
.planeBox {
  width: 20%;
  max-width: 100px;
  position: absolute;
  right: 30px;
  top: 100px;
  opacity: 1;
}
.planeImg{
  width:100%;
  filter: drop-shadow(5px 5px #00000036);
  opacity: 0;
  transition: 0.2s;
  animation: flyingPlane 1s 2s ease-in-out both,
    moving 3s 3s ease-in-out infinite alternate;
}
.userName {
  color: white;
  text-shadow: 1px 2px 2px black;
}
@keyframes flyingPlane {
  0% {
    opacity: 0;
    transform: translate(-450px, 100px);
  }
  80% {
    opacity: 1;
    transform: translate(0px, 0px) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px) scale(1);
  }
}
@keyframes moving {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
}
.planeBox:hover {
  transform: scale(1.2);
  transform-origin: 50% 50%;
  transition: 0.2s;
}
.ballon {
  font-weight: bold;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 50%;
  max-width: 220px;
  right: -30px;
  top: 80px;
  border-radius: 5px;
  padding: 8px 12.8px;
  font-size: 14px;
}

.PostsBallon {
  font-weight: bold;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  right: 10px;
  bottom: 65px;
  background: #fce169;
  border-radius: 5px;
  padding: 8px 12.8px;
  font-size: 14px;
}

.PostsBallon:after {
  border-bottom: 7px solid #fce169;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 0px solid transparent;
  content: '';
  position: absolute;
  top: -5px;
  left: 100px;
}
/* .st0 .slick-next::after {
  content : url('@/assets/images/main/UBTownFeed.svg');
} */
.bdDiv:hover {
  cursor: pointer;
  transform: scale(1.2);
  transform-origin: 50% 50%;
  transition: 0.2s;
}
.laboratory {
  position: absolute;
  bottom: 80px;
  left: 3%;
  width: 15%;
}
.laboratory > img {
  animation: lab 3s 3s ease-in-out infinite alternate;
}
.laboratory > img:hover {
  filter: drop-shadow(0 0 10px #f6ff7b);
}
.laboratory > span {
  background-color: rgba(245, 245, 220, 0.7) !important;
  color: black;
  border-radius: 5px;
  padding: 5px;
  height: 30px;
  z-index: 99;
}
.mainWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: -1;
  height: calc(100% - 60px);
}
.popBg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #00000050;
}
.mainTownArea {
  height: calc(100%);
  position: relative;
  background-repeat: no-repeat;
  /* background-image: url('/resource/main/main_night_background.png'); */
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
}
.profileBox {
  height: 50px;
  position: absolute;
  left: 15px;
  display: flex;
  align-items: center;
}
.profileImg {
  width: 40px !important;
  height: 40px !important;
  margin-right: 10px !important;
}
.loginBtnWrap {
  height: 50px;
  position: absolute;
  top: 60px;
  left: 15px;
  display: flex;
  align-items: center;
}
.loginBtn {
  margin-top: 60px !important;
}
.bdList {
  top: 100px !important;
  height: calc(100% - 100px) !important;
  width: 80% !important;
}
@keyframes lab {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
.mainPcNone {
  display: none;
}
@keyframes uniB-zoom {
  0% {
    transform: scale(1) translate(-50%, -50%)
  } 50% {
    transform: scale(1.05) translate(-50%, -50%)
  } 100% {
    transform: scale(1) translate(-50%, -50%)
  }
}
.clickEvent {
  filter: drop-shadow(0 0 10px #f6ff7b);
  transform-origin: center;
  animation: uniB-zoom 0.8s;
}
@media (hover: hover) { /* when supported */
  .zoom:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 10px #f6ff7b);
    transform-origin: center;
    animation: uniB-zoom 0.8s;
  }
}
@media screen and (max-width: 499px){
  .laboratory {
    width: 25% !important;
    bottom: 70px !important;
  }
}
/* .st0 .slick-next:hover::after {
  content : url('../../..assets/images/main/UBTownFeed.svg#hover');
} */
</style>
