<template>
  <div class="mainBG" style="display: flex; align-items: center; overflow: hidden; z-index: -1;" @click="getInRectImgList">
    <div v-if="mSelectSchoolPopShowYn" @click="mSelectSchoolPopShowYn = false" class="w100P h100P" style="position: absolute;top: 0; left: 0; z-index: 99999; background: transparent;"></div>
    <transition name="showUp">
      <selectSchoolPop v-if="mSelectSchoolPopShowYn" :pGoTown="goTown" :pSchoolList="mSchoolList" :pClosePop="closeSelectSchoolPop" />
    </transition>
    <div v-if="mInfoBoxShowYn" @click="closeInfoBox" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 99999; background: transparent;"></div>
      <transition name="showUp">
        <areaInfoPop @openPage="openPage" v-if="mInfoBoxShowYn" :pAreaDetail="mAreaDetail" :pAreaInfo="mAreaInfo" :pClosePop="closeInfoBox" :pMoveToChan="moveToChan" />
      </transition>
    <div class="w100P h100P" style="position: relative; background-repeat: no-repeat; background-image: url('/resource/main/UB_mainBg.png'); background-position: center; background-size: cover; overflow: hidden;">
      <div class="ballon">Click to move!</div>
      <img @click="openSelectSchoolPop" class="cursorP planeImg" src="@/assets/images/main/icon_plane.png" style="width: 100px; position: absolute; right: 30px; top: 100px;" alt="">
      <!-- <UBBgEffect /> -->
      <!-- my profile -->
      <div @click="goUserProfile" v-if="!GE_USER.unknownYn" class="w100P " style="height: 50px; position: absolute; top: 60px; left: 15px; display: flex; align-items: center;">
        <gProfileImg style="width: 40px; height: 40px; margin-right: 10px; " :selfYn="true" class="fl" />
        <div class="fl font20 fontBold" style="color: white; text-shadow: 1px 2px 2px black;">{{ this.$changeText(this.GE_USER.userDispMtext) }}</div>
      </div>
      <div v-else class="w100P" style="height: 50px; position: absolute; top: 60px; left: 15px; display: flex; align-items: center;">
        <gBtnSmall @click="goLoginPage" btnTitle="Sign In" class="fr" style="margin-top: 60px;" />
      </div>
    <!-- <div v-if="mInfoBoxShowYn" @click="closeInfoBox" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 99999; background: #00000050;"></div>
      <transition name="showUp">
        <UBInfoBox v-if="mInfoBoxShowYn" :pType="'BD'" @openPage="openPage" :pChan="clickedBd" />
        <UBInfoBox v-else-if="clickedArea.clickedYn" :pType="'AR'" :pMoveToDetail="moveToChan" :pClickedInfo="clickedArea" :pVillageInfo="village.villageInfo" :innerHeight="innerHeight" :innerWidth="innerWidth" />
      </transition> -->
      <div v-if="mShowAreaBdListYn" @click="mShowAreaBdListYn = false" class="w100P h100P" style="position: absolute;top: 0; left: 0; z-index: 99999; background: #00000050;"></div>
      <transition name="showUp">
        <UBAreaBdList v-if="mShowAreaBdListYn" style="top: 100px; height: calc(100% - 100px); width: 80%;" />
      </transition>
      <!-- area -->
      <!-- <template v-for="(area) in village.areaList" :key="area.key">
        <div style="position: absolute;" class="flexCenter areaDiv" :class="{clicked: area.clickedYn}" :style="{ width: area.w + 'px', height: area.h + 'px', top: area.top + 'px', left: area.left + 'px' }">
          <img :ref="area.name + area.key" style="position: absolute;" :src="area.maskedImageUrl" :style="area.maskedImageStyle" />
          <div v-if="area.name" class="fontBold" style="background-color: rgba(245, 245, 220, 0.5) !important; border-radius: 5px; padding: 5px; height: 30px; z-index: 99;">
            <p class="textCenter fontBold font16" style="height: 20px; line-height: 20px;">{{ area.name }}</p>
          </div>
        </div>
        <div v-for="(bd) in area.buildingList" :key="bd.key" class="bdDiv" :class="{clicked: bd.clickedYn}" style="position: absolute; z-index: 9;" :style="[bd.maskedImageStyle, { top: bd.top+ 'px', left: bd.left + 'px' }]">
          <img :src="bd.maskedImageUrl" />
          <span class="fontBold" style="position: absolute; background: rgba(100,100,100,0.7); color: white; border-radius: 5px; padding: 0 5px; top: -15px;left: 0;">{{ bd.nameMtext }}</span>
        </div>
      </template> -->
      <template v-for="(area) in mBdAreaList" :key="area.bdAreaKey">
        <div style="position: absolute;" class="flexCenter areaDiv" :class="{clicked: village.areaList[area.priority].clickedYn}" :style="{ width: village.areaList[area.priority].w + 'px', height: village.areaList[area.priority].h + 'px', top: village.areaList[area.priority].top + 'px', left: village.areaList[area.priority].left + 'px' }">
          <img style="position: absolute;" :src="village.areaList[area.priority].maskedImageUrl" :style="village.areaList[area.priority].maskedImageStyle" />
          <div v-if="area.bdAreaNameMtext" class="fontBold" style="background-color: rgba(245, 245, 220, 0.5) !important; border-radius: 5px; padding: 5px; height: 30px; z-index: 99;">
            <p class="textCenter fontBold font16" style="height: 20px; line-height: 20px;">{{ area.bdAreaNameMtext }}</p>
          </div>
        </div>
        <template v-for="(bd, index) in area.bdList" :key="bd.targetKey">
          <div v-if="village.areaList[area.priority].buildingList[index]" class="bdDiv" :class="{clicked: village.areaList[area.priority].buildingList[index].clickedYn}" style="position: absolute; z-index: 999;" :style="[village.areaList[area.priority].buildingList[index].maskedImageStyle, { top: village.areaList[area.priority].buildingList[index].top+ 'px', left: village.areaList[area.priority].buildingList[index].left + 'px' }]">
            <img :src="village.areaList[area.priority].buildingList[index].maskedImageUrl" />
            <!-- <span class="fontBold font12" style="position: absolute; background: rgba(100,100,100,0.7); color: white; border-radius: 5px; padding: 0 5px; top: -15px;left: 0;">{{ $changeText(bd.nameMtext) || $changeText(bd.cabinetNameMtext) }}</span> -->
            <span class="fontBold font12" :style="'top: ' + village.areaList[area.priority].buildingList[index].h + 'px;'" style="position: absolute; background: rgba(100,100,100,0.7); color: white; border-radius: 5px; padding: 0 5px; left: 0;">{{ $changeText(bd.nameMtext) || $changeText(bd.cabinetNameMtext) }}</span>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import areaInfoPop from '../../../components/UB/popup/UB_areaInfoPop.vue'
// import UBInfoBox from '../../../components/popup/info/UB_infoBox.vue'
import UBAreaBdList from '../../../components/popup/info/UB_areaBdList.vue'
import selectSchoolPop from '../../../components/UB/popup/UB_selectSchoolPop.vue'
// import { onMessage } from '../../../assets/js/webviewInterface'
// import UBBgEffect from '../../../components/pageComponents/main/UB_bgEffect.vue'
export default {
  props: {
    pCampusTownInfo: {}
  },
  data () {
    return {
      mShowAreaBdListYn: false,
      mInfoBoxShowYn: false,
      bgImg: {
        imgLink: ''
      },
      village: {
        villageInfo: {
          key: 1,
          name: 'Georgia Tech',
          followerList: [],
          level: 1,
          urlLink: 'https://www.gatech.edu/',
          logoImg: '/resource/new/logo/gtLogo.png'
        },
        areaList: [
          {
            key: 0,
            name: 'Georgia Tech',
            ctx: {},
            maskingRef: null,
            areaYn: true,
            imgLink: '/resource/main/UB_collegeArea.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 110,
            top: 280,
            w: 0,
            h: 0,
            buildingList: [
            ]
          },
          {
            // key: 1,
            key: 1,
            ctx: {},
            maskingRef: null,
            areaYn: true,
            imgLink: '/resource/main/UB_plaza.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 110,
            top: 280,
            w: 0,
            h: 0,
            buildingList: []
          },
          {
            key: 2,
            ctx: {},
            areaYn: true,
            imgLink: '/resource/main/UB_area1.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            onImgYn: false,
            clickedYn: false,
            left: -18,
            top: 370,
            w: 0,
            h: 0,
            buildingList: [
            ]
            // points: '9,355,358,544'
          },
          {
            key: 3,
            ctx: {},
            areaYn: true,
            imgLink: '/resource/main/UB_area2.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 235,
            top: 370,
            w: 0,
            h: 0,
            buildingList: [
            ]
          },
          {
            key: 4,
            ctx: {},
            areaYn: true,
            type: 'CL', // CL: club, PL: plaza, ST: startup, AC: academic
            imgLink: '/resource/main/UB_area3.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 110,
            top: 460,
            w: 0,
            h: 0,
            buildingList: [
            ]
          },
          {
            key: 5,
            ctx: {},
            areaYn: true,
            type: 'FA', // CL: club, PL: plaza, ST: startup, AC: academic, FA: Facilities
            imgLink: '/resource/main/UB_area4.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 0,
            top: 0,
            w: 0,
            h: 0,
            buildingList: [
            ]
          },
          {
            key: 6,
            ctx: {},
            areaYn: true,
            type: 'FA', // CL: club, PL: plaza, ST: startup, AC: academic, FA: Facilities
            imgLink: '/resource/main/UB_area5.png',
            maskedImageUrl: '',
            maskedImageStyle: {},
            clickedYn: false,
            left: 0,
            top: 0,
            w: 0,
            h: 0,
            buildingList: [
            ]
          }
        ]
      },
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
      mSchoolList: []
    }
  },
  async created () {
    // localStorage.clear()
    // alert(JSON.stringify(this.GE_USER))
    // onMessage('REQ', 'test', null)
    this.resetHistory()
    this.setNativeHeight()
    this.$emit('clearInfo', { detail: null, targetType: 'main' })

    var urlParam = localStorage.getItem('deepLinkQueue')
    if (urlParam && urlParam.trim() !== '') {
      urlParam = JSON.parse(urlParam)
      urlParam.targetKey = urlParam.targetKey.split('/')[0]
      console.log(urlParam)
      if (urlParam.targetType) {
        if (urlParam.targetType === 'chanDetail') {
          const param = { targetType: urlParam.targetType, targetKey: urlParam.targetKey }
          this.openPage(param)
        } else {
          this.goPage(urlParam)
        }
        localStorage.removeItem('deepLinkQueue')
      }
    }
    this.getMainBoard().then(res => {
      this.createMaskingAreaImg()
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
      if (this.mBdAreaList && this.mBdAreaList[0]) {
        this.$emit('changePageHeader', this.$changeText(this.mBdAreaList[0].bdList[0].nameMtext))
      } else {
        this.$emit('changePageHeader', 'Campus')
      }
      this.mLoadingYn = false
    })
    if (this.pCampusTownInfo) {
      // this.village = this.pCampusTownInfo
      console.log('this.pCampusTownInfo')
      console.log(this.pCampusTownInfo)
    }
    // const vilInfo = this.village.villageInfo
    // const headerInfoParam = { name: vilInfo.name, logoImg: vilInfo.logoImg }
  },
  methods: {
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      // alert(offsetInput)
      var paramMap = new Map()
      var userKey = this.GE_USER.userKey
      paramMap.set('cateItemKey', 3)
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

      var result = await this.$getTeamList(paramMap, false)
      var resultList = result.data
      return resultList
    },
    async openSelectSchoolPop () {
      this.mSchoolList = await this.getChannelList(10, 0, false)
      this.mSelectSchoolPopShowYn = true
    },
    closeSelectSchoolPop () {
      this.mSelectSchoolPopShowYn = false
    },
    async goTown (chanEle) {
      var param = {
        user: {
          userKey: this.GE_USER.userKey,
          myTeamKey: chanEle.teamKey
        },
        updateYn: true
      }
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveUser',
        param: param
      })
      this.$emit('changePageHeader', this.$changeText(chanEle.nameMtext))
      this.$router.go(0)
      console.log('------------------------------')
      console.log(result)
    },
    async openAreaInfoPop (area) {
      // eslint-disable-next-line no-debugger
      debugger
      const param = {
        bdArea: {
          bdAreaKey: area.bdAreaKey
          // bdAreaKey: 3
        }
      }
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.getBdAreaDetail',
        param: param
      })
      if (result.data) {
        this.mAreaDetail = await result.data
        this.mAreaInfo = await area
        this.mInfoBoxShowYn = true
      }
    },
    closePop () {
      this.mInfoBoxShowYn = false
      this.allClearFocus()
    },
    openInfoPop (value) {
      this.mSelectedAreaInfo = value
    },
    goUserProfile () {
      // this.$router.push('/myPage')
      this.$emit('changeRouterPath', 'myPage')
      // const param = {}
      // param.targetType = 'setMypage'
      // param.popHeaderText = this.$t('PROF_NAME_SETTING')
      // param.readOnlyYn = true
      // param.selfYn = true
      // this.$emit('openPop', param)
    },
    openAreaBdList () {
      this.mShowAreaBdListYn = true
    },
    goLoginPage () {
      this.$router.push({ path: '/login' })
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile && (localStorage.getItem('nativeYn') === true || localStorage.getItem('nativeYn') === 'false')) {
        // window.location.href = 'http://192.168.0.10:8080/#/login'
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/policies' })
      }
    },
    openPage (param) {
      this.mInfoBoxShowYn = false
      this.$emit('openPage', param)
    },
    openPop (openParam) {
      this.$emit('openPop', openParam)
    },
    async getMainBoard () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.GE_USER.unknownYn) {
        this.GE_USER.userKey = 225
      }
      console.log('getMainBoard')
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      if (this.GE_USER.soAccessToken && this.GE_USER.soAccessToken !== '') { paramMap.set('soAccessToken', this.GE_USER.soAccessToken) }
      if (this.GE_USER.fcmKey !== undefined && this.GE_USER.fcmKey !== null && this.GE_USER.fcmKey !== '') { paramMap.set('fcmKey', this.GE_USER.fcmKey) }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      // paramMap.set('myTeamKey', this.GE_USER.myTeamKey)
      // paramMap.set('myTeamKey', 836)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      var response = await this.$axios.post('/service/tp.UB_firstLoginCheck', Object.fromEntries(paramMap)
      )
      console.log('responsed')
      console.log(response)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response && (response.status === 200 || response.status === '200')) {
        this.mBdAreaList = response.data.bdAreaList
        this.mFTeamList = response.data.fTeamList
        this.mAlimCount = response.data.alimCount

        for (let i = 0; this.mBdAreaList.length > i; i++) {
          let count = 0
          if (this.mBdAreaList[i].bdList.length > 5) {
            count = 5
          } else {
            count = this.mBdAreaList[i].bdList.length
          }
          for (let j = 0; j < count; j++) {
            const buildingObj = {
              index: j,
              ctx: {},
              areaYn: false,
              rank: j + 1,
              type: this.mBdAreaList[i].priority === 0 ? 'CB' : '',
              imgLink: this.mBdAreaList[i].priority === 0 ? '/resource/bd/new_college.png' : `/resource/bd/new_bd${this.mBdAreaList[i].bdList[j].priority + 1}.png`,
              maskedImageUrl: '',
              maskedImageStyle: {},
              clickedYn: false,
              left: 0,
              top: 0,
              w: 0,
              h: 0
            }
            this.village.areaList[this.mBdAreaList[i].priority].buildingList.push(buildingObj)
          }
        }
        // await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...this.mBdAreaList, ...this.mMainMChanList])
        // await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimListmMainAlimList)
      }
      console.log('this.mBdAreaList1111111111111111')
      console.log(this.mBdAreaList)
      console.log('this.mFTeamList')
      console.log(this.mFTeamList)
      console.log('this.mAlimCount')
      console.log(this.mAlimCount)
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
    resetHistory () {
      this.$store.commit('D_HISTORY/setRemovePage', '')
      this.$store.commit('D_HISTORY/updateStack', [])
      this.$store.dispatch('D_HISTORY/AC_CLEAR_GPOP_STACK')
      this.$emit('changePageHeader', 'uniBuzzy')
    },
    closeInfoBox () {
      if (this.clickedArea && this.clickedArea.clickedYn) {
        this.clickedArea.clickedYn = false
      } else if (this.clickedBd && this.clickedBd.clickedYn) {
        this.clickedBd.clickedYn = false
      }
      this.mInfoBoxShowYn = false
      return false
    },
    moveToChan (clickedInfo) {
      // const errorRoute = { name: 'errorPage', query: { errorStatus: error.response.status } }
      console.log('clickedInfo', clickedInfo)
      this.closeInfoBox()
      this.$emit('chanInfo', clickedInfo)
      // const chanRoute = { name: 'chanMain', query: {chanInfo: JSON.stringify(clickedInfo)} }
      // this.$router.push(chanRoute)
    },
    createMaskingAreaImg () {
      const areaList = this.village.areaList
      let h = window.innerHeight
      let w = window.innerWidth
      const scaleFactor = w / 1500
      h = scaleFactor * 3167
      if (h > window.innerHeight) {
        this.blankHeight = (window.innerHeight - h) / 2
      } else {
        h = window.innerHeight
        const scaleFactor = h / 3167
        w = scaleFactor * 1500
        this.blankWidth = (window.innerWidth - w) / 2
      }

      if (areaList && areaList.length !== 0) {
        for (let i = 0; i < areaList.length; i++) {
          const area = areaList[i]
          if (area.key === 0) { // campus
            area.w = 1 / 3 * w
            area.h = 1 / 7 * h
            area.left = w / 2 - area.w / 2 - area.w / 8 + this.blankWidth
            area.top = (h / 3 - area.h / 8) + this.blankHeight
          } else if (area.key === 1) { // plaza
            area.w = 2 / 5 * w
            area.h = 1 / 6 * h
            area.left = w / 2 - 1 / 2 * area.w + this.blankWidth
            area.top = 1 / 2 * h - area.h / 4 + this.blankHeight
          } else {
            if (area.key === 2) { // academic
              area.h = 1 / 7 * h
              area.w = 7 / 16 * w
              area.left = w / 2 - area.w - area.w / 5 + this.blankWidth
              area.top = 2 / 5 * h + area.h / 12 + this.blankHeight
            } else if (area.key === 3) { // club
              area.h = 1 / 7 * h
              area.w = 7 / 16 * w
              area.left = 5 / 8 * w + 1 / 12 * area.w + this.blankWidth
              area.top = 2 / 5 * h + area.h / 12 + this.blankHeight
            } else if (area.key === 4) { // start-up
              area.h = 1 / 5 * h
              area.w = 1 / 2 * w
              area.left = w / 2 + area.w / 12 + this.blankWidth
              area.top = 3 / 8 * h + 18 / 20 * area.h + this.blankHeight
            } else if (area.key === 5) { // facilities
              area.h = 1 / 5 * h
              area.w = 1 / 2 * w
              area.left = w / 2 - area.w + area.w / 20 + this.blankWidth
              area.top = 3 / 8 * h + 18 / 20 * area.h + this.blankHeight
            } else if (area.key === 6) { // Mall
              area.h = 1 / 6 * h
              area.w = 1 / 2 * w
              area.left = w / 2 - area.w / 2 + this.blankWidth
              area.top = 5 / 8 * h + area.h * 5 / 12 + this.blankHeight
            }
          }
          const _this = this
          const targetImage = new Image()
          targetImage.src = area.imgLink
          targetImage.onload = function () {
            const scaleFactor = area.h / this.height
            const canvas = document.createElement('canvas')
            const newWidth = Math.floor(this.width * scaleFactor)
            const newHeight = Math.floor(this.height * scaleFactor)
            canvas.width = newWidth
            canvas.height = newHeight
            area.w = newWidth
            area.h = newHeight
            const context = canvas.getContext('2d', { willReadFrequently: true })
            // 마스킹 이미지 그리기
            context.drawImage(this, 0, 0, newWidth, newHeight)
            area.ctx = context
            // 마스킹 이미지를 base64로 변환하여 출력
            area.maskedImageUrl = canvas.toDataURL()
            _this.createMaskingBuildingImg(area)
          }
          targetImage.src = area.imgLink
        }
      }
    },
    createMaskingBuildingImg (area) {
      // eslint-disable-next-line no-debugger
      debugger
      const bdList = area.buildingList
      if (bdList === null || bdList.length === 0) return

      for (let j = 0; j < bdList.length; j++) {
        const bd = bdList[j]
        bd.w = 1 / 5 * area.w
        if (bd.rank === 1) {
          if (bd.type === 'CB') {
            bd.w = 1 / 2 * area.w
            bd.h = 1 / 2 * area.h
            bd.left = area.left + bd.w / 2
            bd.top = area.top - bd.h * 2 / 3
          } else {
            bd.left = area.left + area.w * (2 / 5)
          }
        } else if (bd.rank === 2) {
          bd.left = 1 / 5 * area.w + area.left
        } else if (bd.rank === 3) {
          bd.left = 3 / 5 * area.w + area.left
        } else if (bd.rank === 4) {
          bd.left = area.left + 10
        } else if (bd.rank === 5) {
          bd.left = 4 / 5 * area.w + area.left - 10
        }
        const targetImage = new Image()
        targetImage.src = bd.imgLink
        targetImage.onload = function () {
          const scaleFactor = bd.w / this.width
          const canvas = document.createElement('canvas')
          const newWidth = Math.floor(this.width * scaleFactor)
          const newHeight = Math.floor(this.height * scaleFactor)
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
                pixelData = area.ctx.getImageData(2 / 5 * area.w, i, 1, 1).data
              } else if (bd.rank === 2) {
                pixelData = area.ctx.getImageData(1 / 5 * area.w, i, 1, 1).data
              } else if (bd.rank === 3) {
                pixelData = area.ctx.getImageData(3 / 5 * area.w, i, 1, 1).data
              } else if (bd.rank === 4) {
                pixelData = area.ctx.getImageData(10, i, 1, 1).data
              } else if (bd.rank === 5) {
                pixelData = area.ctx.getImageData(4 / 5 * area.w - 10, i, 1, 1).data
              }
              if (pixelData[3] !== 0) {
                bd.top = i - 10 + area.top
                break
                // console.log('foundfoundfound', bd.top)
                // break
              }
            }
          }
          // 마스킹 이미지 그리기
          // if (bd.type !== 'CB') bd.top = 200
          // context.drawImage(this, newWidth + bd.left, newHeight + bd.top, bd.w, bd.h)
          context.drawImage(this, 0, 0, bd.w, bd.h)
          // 마스킹 이미지를 base64로 변환하여 출력
          bd.maskedImageUrl = canvas.toDataURL()
        }
        targetImage.src = bd.imgLink
      }
    },
    createMaskingBuildingImg1 (area) {
      const bdList = area.buildingList
      if (bdList && bdList.length !== 0) {
        for (let j = 0; j < bdList.length; j++) {
          const bd = bdList[j]
          bd.w = 1 / 5 * area.w
          bd.h = 1 / 4 * area.h
          if (bd.rank === 1) {
            if (bd.type === 'CB') {
              bd.w = 1 / 2 * area.w
              bd.h = 1 / 2 * area.h
              bd.left = area.left + bd.w / 2
              bd.top = area.top - bd.h * 2 / 3
            } else {
              bd.left = 1 / 2 * area.w + area.left - bd.w / 2
              bd.top = area.top - bd.h / 8
            }
          } else if (bd.rank === 2) {
            bd.left = 1 / 4 * area.w + area.left
            bd.top = 1 / 32 * area.h + area.top
          } else if (bd.rank === 3) {
            bd.left = 9 / 16 * area.w + area.left
            bd.top = 1 / 32 * area.h + area.top
          } else if (bd.rank === 4) {
            bd.left = 1 / 16 * area.w + area.left
            bd.top = 1 / 6 * area.h + area.top
          } else if (bd.rank === 5) {
            bd.left = 12 / 16 * area.w + area.left
            bd.top = 1 / 6 * area.h + area.top
          }
          const targetImage = new Image()
          targetImage.src = bd.imgLink
          targetImage.onload = function () {
            const scaleFactor = bd.w / this.width
            const canvas = document.createElement('canvas')
            const newWidth = Math.floor(this.width * scaleFactor)
            const newHeight = Math.floor(this.height * scaleFactor)
            canvas.width = newWidth
            canvas.height = newHeight
            bd.w = newWidth
            bd.h = newHeight
            const context = canvas.getContext('2d', { willReadFrequently: true })
            // 마스킹 이미지 그리기
            context.drawImage(this, 0, 0, newWidth, newHeight)
            bd.ctx = context
            // 마스킹 이미지를 base64로 변환하여 출력
            bd.maskedImageUrl = canvas.toDataURL()
          }
          targetImage.src = bd.imgLink
        }
      }
    },
    addNewBuilding () {
      // eslint-disable-next-line no-debugger
      debugger
      const bd = {}
      if (this.clickedArea.type === 'CO' || this.clickedArea.type === 'PL') return
      const area = this.clickedArea
      const rank = this.clickedRank
      bd.w = 1 / 4 * area.w
      bd.h = 1 / 3 * area.h
      if (rank === 1) {
        bd.left = 1 / 3 * area.w + area.left
        bd.top = area.top - bd.h / 2
        bd.imgLink = '/resource/bd/new_bd1.png'
      } else if (rank === 2) {
        bd.left = 1 / 6 * area.w + area.left
        bd.top = 1 / 6 * area.h + area.top - bd.h / 2
        bd.imgLink = '/resource/bd/new_bd2.png'
      } else if (rank === 3) {
        bd.left = 1 / 2 * area.w + area.left
        bd.top = 1 / 6 * area.h + area.top - bd.h / 2
        bd.imgLink = '/resource/bd/new_bd3.png'
      } else if (rank === 4) {
        bd.left = area.w / 2 - bd.w / 2 + area.left
        bd.top = 1 / 3 * area.h + area.top
        bd.imgLink = '/resource/bd/new_house1.png'
      }
      // else if (rank === 4) {
      //   bd.left = area.left
      //   bd.top = 1 / 3 * area.h + area.top
      //   bd.imgLink = '/resource/bd/new_bd4.png'
      // }
      // else if (rank === 5) {
      //   bd.left = 2 / 3 * area.w + area.left
      //   bd.top = 1 / 3 * area.h + area.top
      //   bd.imgLink = '/resource/bd/new_bd5.png'
      // }

      bd.key = String(area.key) + '.' + String(rank)
      bd.ctx = {}
      bd.areaYn = false
      bd.parentKey = area.key
      bd.type = 'BU'
      bd.status = 1
      bd.rank = rank
      bd.maskedImageUrl = ''
      bd.maskedImageStyle = {}
      bd.clickedYn = false
      const targetImage = new Image()
      targetImage.src = bd.imgLink
      targetImage.onload = function () {
        const scaleFactor = bd.w / this.width
        const canvas = document.createElement('canvas')
        const newWidth = Math.floor(this.width * scaleFactor)
        const newHeight = Math.floor(this.height * scaleFactor)
        canvas.width = newWidth
        canvas.height = newHeight
        bd.w = newWidth
        bd.h = newHeight
        const context = canvas.getContext('2d', { willReadFrequently: true })
        // 마스킹 이미지 그리기
        context.drawImage(this, 0, 0, newWidth, newHeight)
        bd.ctx = context
        // 마스킹 이미지를 base64로 변환하여 출력
        bd.maskedImageUrl = canvas.toDataURL()
      }
      targetImage.src = bd.imgLink
      if (area.buildingList && area.buildingList.length < 4) area.buildingList.push(bd)
    },
    getInRectImgList (event) {
      // 빌딩부터 역순으로 뒤짐
      // 빌딩이 발견됨, 스타일클리어 시키고, 효과를 주고 return해버리기
      // 빌딩 클릭이 없음, areaclick을 찾음
      if ((this.clickedBd && this.clickedBd.clickedYn && this.infoBoxShowYn)) return
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
            if (event.clientX >= bd.left && event.clientX <= (bd.left + bd.w) && event.clientY >= bd.top && event.clientY <= (bd.top + bd.h)) {
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

            const _x = event.clientX - bd.left
            const _y = event.clientY - bd.top
            const pixelData = bd.ctx.getImageData(_x, _y, 1, 1).data
            if (pixelData[3] !== 0) {
              this.clickedBd = bd
              bd.clickedYn = true
              bd.maskedImageStyle = { filter: 'drop-shadow(0 0 5px orange) drop-shadow(0 0 10px white)' }
              this.openAreaInfoPop(this.mBdAreaList[area.key])
              return
            }
          }
        }
      }
      // 빌딩 발견 안 되었을 때
      findYn = false
      for (let i = 0; i < this.village.areaList.length; i++) {
        const area = this.village.areaList[i]
        if (area.ctx === null) { continue }
        findYn = false
        if (event.clientX >= area.left && event.clientX <= (area.left + area.w) && event.clientY >= area.top && event.clientY <= (area.top + area.h)) {
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
        if (area.onImgYn === false) { continue }
        const _x = event.clientX - area.left
        const _y = event.clientY - area.top
        const pixelData = area.ctx.getImageData(_x, _y, 1, 1).data
        if (pixelData[3] !== 0) {
          this.clickedArea = area
          this.clickedRank = area.buildingList.length + 1
          area.clickedYn = true
          area.maskedImageStyle = { filter: 'drop-shadow(0 0 5px yellow) drop-shadow(0 0 40px white)' }
          this.openAreaInfoPop(this.mBdAreaList[area.key])
          break
        }
      }
    },
    allClearFocus () {
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
    setWindowSize () {
      this.innerWidth = window.innerWidth
      const nowHeight = window.innerHeight

      if (this.innerHeight < nowHeight) this.innerHeight = nowHeight
    }
  },
  watch: {
    locale (val) {
      this.$i18n.locale = val
    }
    // clickedBd () {
    //   this.mInfoBoxShowYn = true
    // }
  },
  mounted () {
    this.setWindowSize()
    window.addEventListener('resize', this.createMaskingAreaImg)
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
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
  components: {
    // UBInfoBox,
    selectSchoolPop,
    UBAreaBdList,
    areaInfoPop
    // UBBgEffect
  }
}
</script>
<style scoped>
@keyframes area-zoom {
  from {
    transform: scale(1)
  } to {
    transform: scale(1.05)
  }
}
.areaDiv.clicked {
  animation: area-zoom 0.4s alternate;
}
.bdDiv.clicked {
  z-index: 9999 !important;
  transform: scale(1.1)
}
.mainBG {
  width: 100vw;
  height: 100% ;
  /* position: relative; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* overflow: hidden; */
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
.planeImg:hover {
  transform: scale(1.2);
  transform-origin: 50% 50%;
  transition: 0.2s;
}
.planeImg {
  transition: 0.2s;
}
.ballon {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    right: 30px;
    top: 80px;
    background: #fce169;
    border-radius: 5px;
    padding: 8px 12.8px;
    font-size: 14px;
}

.ballon:after {
    border-top: 7px solid #fce169;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 30px;
    left: 80px;
}
</style>
