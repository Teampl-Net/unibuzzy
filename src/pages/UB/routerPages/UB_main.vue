<template>
  <div ref="mainRef" class="w100P h100P" style="display: flex; align-items: center; overflow: hidden; z-index: -1;" @click="getInRectImgList">
    <commonConfirmPop v-if="mAppCloseYn" @ok="closeApp" @appClose='closeApp' @no="this.mAppCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
    <createBoardChannel v-if="mCreChannelShowYn" @successCreChan="successCreChan" :pAreaInfo="mAreaInfo" :chanDetail="{ modiYn: false }" @openPage="openPage" :pSelectedAreaInfo="mAreaInfo" :pClosePop="closeCreChanPop" :pBdAreaList="mBdAreaList" />
    <!-- <createChannel @successCreChan="successCreChan" v-if="mCreChannelShowYn" :chanDetail="{ modiYn: false }" @openPage="openPage" :pSelectedAreaInfo="mAreaInfo" :pClosePop="closeCreChanPop" :pBdAreaList="mBdAreaList" /> -->
    <div v-if="mSelectSchoolPopShowYn" @click="closeSchoolPop" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 99999; background: #00000050;"></div>
    <transition name="showUp">
      <selectSchoolPop v-if="mSelectSchoolPopShowYn" :pGoTown="goTown" :pSchoolList="mSchoolList" :pClosePop="closeSelectSchoolPop" />
    </transition>
    <div v-if="mInfoBoxShowYn" @click="closeInfoBox" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 99999; background: #00000050;"></div>
    <transition name="showUp">
      <areaInfoPop :pBdClickedYn="mBdClickedYn" :chanDetail="{ modiYn: false }" :pBdAreaList="mBdAreaList" :pOpenCreChanPop="openCreChanPop" @openPage="openPage" v-if="mInfoBoxShowYn" :pAreaDetail="mAreaDetail" :pAreaInfo="mAreaInfo" :pClosePop="closeInfoBox" :pMoveToChan="moveToChan" />
    </transition>
    <div class="w100P" style="height: calc(100%); position: relative; background-repeat: no-repeat; background-image: url('/resource/main/UB_mainBg.png'); background-position: center; background-size: 100% 100%; overflow: hidden;">
      <div class="ballon">Go to other town?</div>
      <img @click="openSelectSchoolPop" class="cursorP planeImg" src="@/assets/images/main/icon_plane.png" style="filter: drop-shadow(5px 5px 5px #00000036); width:20%; max-width: 100px; position: absolute; right: 30px; top: 100px;" alt="">
      <!-- <UBBgEffect /> -->
      <!-- my profile -->
      <div @click="goUserProfile" v-if="!GE_USER.unknownYn" :style="{top: this.$STATUS_HEIGHT + 60 + 'px'}" style="height: 50px; position: absolute; left: 15px; display: flex; align-items: center;">
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
      <template v-if="!mLoadingYn">
          <template v-for="(area) in mBdAreaList" :key="area.bdAreaKey">
            <div v-if="village.areaList[area.priority].w !== 0 && village.areaList[area.priority].h !== 0" style="cursor: pointer;position: absolute; z-index: 99;" class="flexCenter areaDiv" :class="{clicked: village.areaList[area.priority].clickedYn}" :style="{ width: village.areaList[area.priority].w + 'px', height: village.areaList[area.priority].h + 'px', top: village.areaList[area.priority].top + 'px', left: village.areaList[area.priority].left + 'px' }">
            <img style="position: absolute; z-index: 99" :src="village.areaList[area.priority].maskedImageUrl" :style="village.areaList[area.priority].maskedImageStyle" />
            <div v-if="area.bdAreaNameMtext" class="fontBold" :style="{'margin-top': area.priority !== 0 && area.priority !== 1 ? 15 + (village.areaList[area.priority].h)/1.5 + 'px' : ''}" style="background-color: rgba(245, 245, 220, 0.7) !important; color: black; border-radius: 5px; padding: 5px; height: 30px; z-index: 99;">
                <p class="textCenter fontBold font16" style="height: 20px; line-height: 20px;">{{ area.bdAreaNameMtext }}</p>
            </div>
            </div>
            <template v-for="(bd, index) in area.bdList" :key="bd.targetKey">
            <div ref="bdRef" :id="`area${area.bdAreaKey}bd${bd.bdKey}pri${bd.priority}`" v-if="village.areaList[area.priority].buildingList[index] && village.areaList[area.priority].buildingList[index].w !== 0 && village.areaList[area.priority].buildingList[index].h !== 0" class="bdDiv" :class="{clicked: village.areaList[area.priority].buildingList[index].clickedYn}" style="position: absolute; "
            :style="[`z-index: ${1000 - bd.priority};`, village.areaList[area.priority].buildingList[index].maskedImageStyle, { top: village.areaList[area.priority].buildingList[index].top + 'px', left: village.areaList[area.priority].buildingList[index].left + 'px' }]">
                <div v-if="area.priority === 0" class="banner flexCenter" style="width: 250px; height: 80px; position: absolute; top: -50px; left: 0;" :style="{left: -(125 - village.areaList[area.priority].buildingList[index].w / 2) + 'px'}">
                <img src="../../../assets/images/main/banner2.png" class="w100P" style="position: absolute;" /> <!-- 여기 -->
                <div v-html="$changeText(bd.nameMtext)" class="w100P font16 fontBold" style="position: absolute; margin-bottom: 30px;"></div>
                </div>
                <img :src="village.areaList[area.priority].buildingList[index].maskedImageUrl"/>
                <!-- <span class="fontBold font12" style="position: absolute; background: rgba(100,100,100,0.7); color: white; border-radius: 5px; padding: 0 5px; top: -15px;left: 0;">{{ $changeText(bd.nameMtext) || $changeText(bd.cabinetNameMtext) }}</span> -->
                <!-- <span class="fontBold font12" :style="[{left: -(village.areaList[area.priority].buildingList[index].w /2 ) + 'px'}, {top: village.areaList[area.priority].buildingList[index].h + ((Number(bd.priority) + 1) / 2 * 20) + 'px'}]" style="position: absolute; background: rgba(100,100,100,0.7); color: white; width: 100px; border-radius: 5px; padding: 0 5px;">{{ $changeText(bd.nameMtext) || $changeText(bd.cabinetNameMtext) }}</span> -->
                <span v-if="!(area.priority === 0 && index === 0)" class="fontBold font12" style="position: absolute; line-height: 15px; color: #333333; border: 1px solid #ccc; width: 80px; border-radius: 5px; padding: 0 5px;"
                :style="[{ 'background-color': index === 0 ? '#f1f1f1CC' : (index === 1 || index === 2) ? '#f1f1f199' : (index === 3 || index === 4) ? '#f1f1f180' : '' }, {left: -40 + (village.areaList[area.priority].buildingList[index].w /2 ) + 'px'}, {top: village.areaList[area.priority].buildingList[index].h + ((Number(bd.priority)) / 2 * 10) + 'px'}]" >{{ $changeText(bd.nameMtext) || $changeText(bd.cabinetNameMtext) }}</span>
            </div>
            </template>
        </template>
      </template>
    </div>
    <!-- <div class="PostsBallon">view Town's Posts</div>
    <div @click="openBoardPop" class="cursorP testBox" style="width: 70px; position: fixed; bottom: 100px; right: 15px; ">
        <img style="width: 100%;" src="../../../assets/images/main/UBTownFeed.svg" alt="">
    </div> -->
    <transition name="showUp">
        <mainBoardList @openImgPop="openImgPop" @openPage="openPage" @openPop="openPop" :pAreaInfo="mAreaInfo" :pTownTeamKey="mTownTeamKey" v-if="mBoardPopShowYn" ref="mainBoardRef" :pClosePop="closeBoardPop"/>
    </transition>
    <div v-if="mBoardPopShowYn" @click="$refs.mainBoardRef.closeXPop" style="width: 100%; height: 100%; background: #00000040; position: absolute; z-index: 9998; top: 0; left: 0;"></div>
  </div>
</template>
<script>
import commonConfirmPop from '../../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import areaInfoPop from '../../../components/UB/popup/UB_areaInfoPop.vue'
// import UBInfoBox from '../../../components/popup/info/UB_infoBox.vue'
import UBAreaBdList from '../../../components/popup/info/UB_areaBdList.vue'
import selectSchoolPop from '../../../components/UB/popup/UB_selectSchoolPop.vue'
// import createChannel from '../../../components/UB/popup/UB_createChannel.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import createBoardChannel from '@/components/UB/popup/UB_createBoardChannel.vue'
import mainBoardList from '../../../components/UB/popup/UB_boardListPop.vue'
// import UBBgEffect from '../../../components/pageComponents/main/UB_bgEffect.vue'
export default {
  props: {
    // pFindAllDrawn: Function
    // pCampusTownInfo: {}
  },
  data () {
    return {
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
      mOffsetInt: 0
    }
  },
  created () {
    // localStorage.clear()
    // onMessage('REQ', 'test', null)
    // this.findAllDrawn()
    this.resetHistory()
    this.setNativeHeight()
    this.$store.commit('D_HISTORY/updateStack', [0])
    this.$emit('clearInfo', { detail: null, targetType: 'main' })
    // this.getUserTeamList()

    var urlParam = localStorage.getItem('deepLinkQueue')
    if (urlParam && urlParam.trim() !== '') {
      urlParam = JSON.parse(urlParam)
      urlParam.targetKey = urlParam.targetKey.split('/')[0]
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
      if (this.mBdAreaList && this.mBdAreaList[0] && this.mBdAreaList[0].bdList && this.mBdAreaList[0].bdList[0]) {
        this.$emit('changePageHeader', this.$changeText(this.mBdAreaList[0].bdList[0].nameMtext))
      } else {
        this.$emit('changePageHeader', 'Campus')
      }
      this.$emit('enterCloudLoading', false)
      setTimeout(() => {
        this.$emit('showCloudLoading', false)
      }, 1000)
    })

    // if (this.pCampusTownInfo) {
    //   // this.village = this.pCampusTownInfo
    //   console.log('this.pCampusTownInfo')
    //   console.log(this.pCampusTownInfo)
    // }
    // const vilInfo = this.village.villageInfo
    // const headerInfoParam = { name: vilInfo.name, logoImg: vilInfo.logoImg }
  },
  methods: {
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.mAppCloseYn = false
    },
    successCreChan (param) {
      this.closeCreChanPop()
      if (param.deleteYn) {
        return
      }
      param.targetType = 'chanDetail'
      this.openPage(param)
    },
    closeInfoBox () {
      this.resetHistory()
      if (this.clickedArea && this.clickedArea.clickedYn) {
        this.clickedArea.clickedYn = false
      } else if (this.clickedBd && this.clickedBd.clickedYn) {
        this.clickedBd.clickedYn = false
      }
      this.mInfoBoxShowYn = false
      return false
    },
    closeSchoolPop () {
      this.resetHistory()
      this.mSelectSchoolPopShowYn = false
    },
    openCreChanPop () {
      this.mInfoBoxShowYn = false
      this.mCreChannelShowYn = true
    },
    closeBoardPop (shadowClickYn) {
    /*     if (shadowClickYn) {
            this.$refs.mainBoardRef
            refs.mainBoardRef.closeXPop
        } */
      this.mBoardPopShowYn = false
    },
    openBoardPop () {
      this.mBoardPopShowYn = true
    },
    closeCreChanPop () {
      this.mCreChannelShowYn = false
    },
    findAllDrawn () {
      this.$emit('showCloudLoading', true, false)
      const intervalHandler = setInterval(() => {
        if (this.$refs.bdRef) {
          this.$emit('enterCloudLoading', false)
          setTimeout(() => {
            this.$emit('showCloudLoading', false)
          }, 1000)
          clearInterval(intervalHandler)
        }
      }, 100)
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

      var result = await this.$getTeamList(paramMap, false)
      var resultList = result.data
      return resultList
    },
    async openSelectSchoolPop () {
      this.mSchoolList = null/* await this.getChannelList(10, 0, false) */
      this.mSelectSchoolPopShowYn = true
    },
    closeSelectSchoolPop () {
      this.resetHistory()
      this.mSelectSchoolPopShowYn = false
    },
    async goTown (chanEle) {
      this.$emit('showCloudLoading', true, false)
      var param = {
        user: {
          userKey: this.GE_USER.userKey,
          myTeamKey: chanEle.teamKey
        },
        updateYn: true
      }
      await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveUser',
        param: param
      }, true)
      this.$emit('changePageHeader', this.$changeText(chanEle.nameMtext))
      window.location.reload()
      // this.$router.go(0)
    },
    async openAreaInfoPop (area) {
      if (this.mBgNotClickYn) return
      const param = {
        bdArea: {
          bdAreaKey: area.bdAreaKey
          // bdAreaKey: 3
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
          console.log('====mAreaDetail===', result)
          console.log('====mAreaInfo===', this.mAreaInfo)
          this.mInfoBoxShowYn = true
          this.allClearFocus()
        }
      }
    },
    closePop () {
      this.mInfoBoxShowYn = false
      this.allClearFocus()
      this.mBgNotClickYn = true
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
    async goLoginPage () {
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
      this.mCreChannelShowYn = false
      this.$emit('openPage', param)
    },
    openPop (openParam) {
      this.$emit('openPop', openParam)
    },
    async getMainBoard () {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        // paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        if ((localStorage.getItem('sessionUser'))) paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      if (this.GE_USER.soAccessToken && this.GE_USER.soAccessToken !== '') { paramMap.set('soAccessToken', this.GE_USER.soAccessToken) }
      if (this.GE_USER.fcmKey !== undefined && this.GE_USER.fcmKey !== null && this.GE_USER.fcmKey !== '') { paramMap.set('fcmKey', this.GE_USER.fcmKey) }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      // paramMap.set('myTeamKey', this.GE_USER.myTeamKey)
      // paramMap.set('myTeamKey', 836)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      var response = await this.$axios.post('/sUniB/tp.UB_firstLoginCheck', Object.fromEntries(paramMap)
      )
      console.log('responsed')
      console.log(response)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response && (response.status === 200 || response.status === '200')) {
        this.mBdAreaList = response.data.bdAreaList
        this.mFTeamList = response.data.fTeamList
        this.mAlimCount = response.data.alimCount
        if (this.mBdAreaList && this.mBdAreaList.length > 0) {
          this.mTownTeamKey = this.mBdAreaList[0].teamKey
        }
        this.$emit('setMainInfo', { fTeamList: this.mFTeamList, alimCount: this.mAlimCount })
        this.village.areaList = []
        const leftList = [110, 110, -18, 235, 110, 0, 0]
        const topList = [280, 280, 370, 370, 460, 0, 0]
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
            left: leftList[i],
            top: topList[i],
            w: 0,
            h: 0,
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
              maskedImageUrl: area.bdList[j].bdIconPath,
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
        // await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...this.mBdAreaList, ...this.mMainMChanList])
        // await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimListmMainAlimList)
        if (response.data.cTeamList) {
          // area.bdList[j].teamKey = area.bdList[j].targetKey
          await this.$addChanVuex(response.data.cTeamList)
        }
      }
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
      // this.$emit('changePageHeader', 'uniBuzzy')
    },
    moveToChan (clickedInfo) {
      // const errorRoute = { name: 'errorPage', query: { errorStatus: error.response.status } }
      this.closeInfoBox()
      this.$emit('chanInfo', clickedInfo)
      // const chanRoute = { name: 'chanMain', query: {chanInfo: JSON.stringify(clickedInfo)} }
      // this.$router.push(chanRoute)
    },
    createMaskingAreaImg () {
      // eslint-disable-next-line no-debugger
      debugger
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
          if (area.key === 0) { // campus
            area.w = 2 / 5 * w
            area.h = 1 / 7 * h
            area.left = w / 2 - area.w / 2 + this.blankWidth
            area.top = (h / 3 - area.h / 6) + this.blankHeight
          } else if (area.key === 1) { // plaza
            area.w = 2 / 5 * w
            area.h = 1 / 6 * h
            area.left = w / 2 - 1 / 2 * area.w + this.blankWidth
            area.top = 1 / 2 * h - area.h / 4 + this.blankHeight
          } else {
            if (area.key === 2) { // club & Startup
              area.h = 1 / 7 * h
              area.w = 6 / 16 * w
              area.left = w / 2 - area.w - area.w * 3 / 8 + this.blankWidth
              area.top = 2 / 5 * h + area.h / 12 + this.blankHeight
            } else if (area.key === 3) { // Major
              area.h = 1 / 7 * h
              area.w = 6 / 16 * w
              area.left = 5 / 8 * w + 1 / 12 * area.w + this.blankWidth
              area.top = 2 / 5 * h + area.h / 12 + this.blankHeight
            } else if (area.key === 4) { // Class
              area.h = 1 / 6 * h
              area.w = 2 / 5 * w
              area.left = w / 2 + area.w / 12 + this.blankWidth
              area.top = 13 / 32 * h + area.h + this.blankHeight
            } else if (area.key === 5) { // Living
              area.h = 1 / 6 * h
              area.w = 2 / 5 * w
              area.left = w / 2 - area.w - area.w / 12 + this.blankWidth
              area.top = 13 / 32 * h + area.h + this.blankHeight
            } else if (area.key === 6) { // Nearby
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
            let scaleFactor = area.w / this.width
            const canvas = document.createElement('canvas')
            const newWidth = Math.floor(this.width * scaleFactor)
            scaleFactor = area.h / this.height
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
      this.mLoadingYn = false
    },
    createMaskingBuildingImg (area) {
      const bdList = area.buildingList
      if (area.key === 6) {
        area.loadYn = true
      }
      if (bdList === null || bdList.length === 0) return

      for (let j = 0; j < bdList.length; j++) {
        const bd = bdList[j]
        bd.w = 1 / 5 * area.w
        bd.h = 1 / 3 * area.h
        if (bd.rank === 1) {
          if (bd.type === 'CB') {
            bd.w = 1 / 2 * area.w
            bd.h = 1 / 2 * area.h
            if (window.innerWidth > 1000) {
              bd.w = 1 / 3 * area.w
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
          let newWidth = bd.w
          let newHeight = bd.h
          let scaleFactor = 1
          if (bd.type !== 'CB' && window.innerWidth > 1000) {
            scaleFactor = bd.w / this.width * 4 / 5
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
                if (window.innerWidth > 1000) {
                  bd.top = i + area.top - bd.h / 2
                } else {
                  bd.top = i + area.top - bd.h / 3
                }
                console.log('bd.top', bd.top)
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
    getInRectImgList (event) {
      if (this.mainShowPopYn) return
      // 빌딩부터 역순으로 뒤짐
      // 빌딩이 발견됨, 스타일클리어 시키고, 효과를 주고 return해버리기
      // 빌딩 클릭이 없음, areaclick을 찾음
      console.log(window.innerWidth)
      let blankWidth = 0
      if (window.innerWidth > 1000) {
        // area width = 1000 (원래는 1500)
        blankWidth = (window.innerWidth - 1000) / 2
      }
      if ((this.clickedBd && this.clickedBd.clickedYn && this.mInfoBoxShowYn)) return
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
            if (event.clientX >= bd.left + blankWidth && event.clientX <= (bd.left + bd.w + blankWidth) && event.clientY >= bd.top && event.clientY <= (bd.top + bd.h)) {
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
        if (event.clientX >= area.left + blankWidth && event.clientX <= (area.left + area.w + blankWidth) && event.clientY >= area.top && event.clientY <= (area.top + area.h)) {
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
        const _x = event.clientX - area.left - blankWidth
        const _y = event.clientY - area.top
        const pixelData = area.ctx.getImageData(_x, _y, 1, 1).data
        if (pixelData[3] !== 0) {
          this.clickedArea = area
          this.mBdClickedYn = false
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
    /* locale (val) {
      this.$i18n.locale = val
    }, */
    pageUpdate (value, old) {
      var history = this.historyStack
      console.log(history)
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined || history[0] === 'router$#$routerMain')) {
        if (this.$route.path === '/') {
          console.log(this.$checkMobile())
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
  mounted () {
    this.findAllDrawn()
    this.setWindowSize()
    window.addEventListener('resize', this.createMaskingAreaImg)
  },
  computed: {
    mainShowPopYn () {
      let showYn = false
      if (this.mBoardPopShowYn || this.mInfoBoxShowYn || this.mShowAreaBdListYn || this.mFavListPopShowYn || this.mCreChannelShowYn) showYn = true
      return showYn
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
    mainBoardList,
    // createChannel,
    commonConfirmPop,
    // UBInfoBox,
    selectSchoolPop,
    UBAreaBdList,
    areaInfoPop,
    createBoardChannel
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
  font-weight: bold;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  right: 10px;
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
    content: "";
    position: absolute;
    top: -5px;
    left: 100px;
}
/* .st0 .slick-next::after {
  content : url('../../../assets/images/main/UBTownFeed.svg');
} */
.testBox {
 content : url('../../../assets/images/main/UBTownFeed.svg')
}
.bdDiv:hover {
  cursor: pointer;
  transform: scale(1.2);
  transform-origin: 50% 50%;
  transition: 0.2s;
}
.testBox:hover {
  transform: scale(1.2);
  transform-origin: 50% 50%;
  transition: 0.2s;
}
/* .st0 .slick-next:hover::after {
  content : url('../../..assets/images/main/UBTownFeed.svg#hover');
} */
</style>
