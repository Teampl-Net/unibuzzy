<template>
  <div ref="uniBMainRef" class="w100P h100P uniBMainWrap" :style="'padding-top:' + (this.$STATUS_HEIGHT)+ 'px'">
    <div v-if="mGuidePopShowYn" @click="closeGuidePop" class="popBg"></div>
    <div v-if="mSelectSchoolPopShowYn" @click="closeSelectSchoolPop" class="popBg"></div>
    <transition name="showUp">
      <selectSchoolPop v-if="mSelectSchoolPopShowYn" :pGoTown="goTown" :pSchoolList="mSchoolList" :pClosePop="closeSelectSchoolPop" />
    </transition>
    <transition name="showUp">
      <guidePop v-if="mGuidePopShowYn" :pClosePop="closeGuidePop" />
    </transition>
    <div class="w100P uniBTownBox">
      <div class="ballon">
        <img src="@/assets/images/main/ballon.png" alt="go to other town?" class="w100P"/>
      </div>
      <div class="planeBox">
        <img @click="openSelectSchoolPop" class="cursorP planeImg" src="@/assets/images/main/icon_plane.png" style="" alt="">
      </div>
      <!-- <div class="ballon">Go to other town?</div>
      <img @click="openSelectSchoolPop" class="cursorP planeImg" src="@/assets/images/main/icon_plane.png" alt=""> -->
      <!-- my profile -->
      <div @click="goUserProfile" v-if="!GE_USER.unknownYn" :style="{top: this.$STATUS_HEIGHT + 60 + 'px'}" class="profileBox">
        <gProfileImg :selfYn="true" class="fl profileImg" />
        <div class="fl font20 fontBold userName">{{ this.$changeText(this.GE_USER.userDispMtext) }}</div>
      </div>
      <div v-else class="w100P btnWrap">
        <gBtnSmall @click="goLoginPage" btnTitle="Sign In" class="fr mTop60" />
      </div>
      <!-- <img v-for="elem in mUniBElementList" :key="elem.key" :src="elem.maskedImageUrl" :style="`width: ${elem.w}px; height: ${elem.h}px;`" style="position: absolute; transform: translate(-50%, 0);" alt=""> -->
      <template v-for="(uniB) in mUniBElementList" :key="uniB.key">
        <img @click="uniB.clickFunction" class="w100P mobileNone uniBimg" :class="uniB.key !== 1? 'zoom':''" :src="uniB.imgLink" :style="{ width: uniB.w, left: uniB.left, top: uniB.top }"/>
        <img @click="uniB.clickFunction" class="w100P pcNone uniBimg" :class="uniB.key !== 1? 'zoom':''" :src="uniB.imgLink" :style="{ width: uniB.mobileW, left: uniB.left, top: uniB.top }"/>
      </template>
    </div>
  </div>
</template>
<script>
import selectSchoolPop from '../../../components/UB/popup/UB_selectSchoolPop.vue'
import guidePop from '../../../components/UB/popup/UB_guidePop.vue'
export default {
  data () {
    return {
      mSchoolList: [],
      mInfoBoxShowYn: false,
      mSelectSchoolPopShowYn: false,
      mUniBElementList: [
        {
          key: 1,
          title: 'title',
          left: '50%',
          top: '20%',
          w: '30%',
          mobileW: '50%',
          imgLink: '/resource/main/unib_Logo.png'
        },
        {
          key: 2,
          title: 'inquiries',
          left: '35%',
          top: '40%',
          w: '20%',
          mobileW: '30%',
          imgLink: '/resource/main/uniB_inquiries.png',
          clickFunction: this.goInquiries
        },
        {
          key: 3,
          title: 'FAQ',
          left: '80%',
          top: '45%',
          w: '25%',
          mobileW: '35%',
          imgLink: '/resource/main/uniB_FAQ.png',
          clickFunction: this.goFAQ
        },
        {
          key: 4,
          title: 'Instagram',
          left: '75%',
          top: '70%',
          w: '30%',
          mobileW: '40%',
          imgLink: '/resource/main/uniB_instagram.png',
          clickFunction: this.goInstagram
        },
        {
          key: 5,
          title: 'Guide',
          left: '20%',
          top: '80%',
          w: '35%',
          mobileW: '45%',
          imgLink: '/resource/main/uniB_guide.png',
          clickFunction: this.openGuidePop
        }
      ],
      mShowAreaBdList: false,
      innerWidth: 0,
      innerHeight: 0,
      blankHeight: 0,
      blankWidth: 0,
      clickedUniB: {},
      mMainChanList: [],
      mMainMChanList: [],
      mMainAlimList: [],
      mAxiosQueue: [],
      mGuidePopShowYn: false
    }
  },
  created () {
    this.resetHistory()
    this.setNativeHeight()

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
    this.$emit('changePageHeader', 'uniBuzzy Center')
    this.$emit('clearInfo', { detail: {}, targetType: 'main' })
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight
  },
  methods: {
    closeGuidePop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.mGuidePopShowYn = false
    },
    openGuidePop () {
      this.mGuidePopShowYn = true
    },
    goFAQ () {
      this.$showToastPop('The FAQ is being prepared.')
    },
    goInstagram () {
      window.open('https://www.instagram.com/unibuzzy/')
    },
    goInquiries () {
      this.$router.push('/board/988/13909')
      this.$emit('goInquiries', 'inquiries')
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
      const result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveUser',
        param: param
      })
      this.$emit('changePageHeader', this.$changeText(chanEle.nameMtext))
      if (result.data) {
        localStorage.setItem('user', JSON.stringify(result.data.userInfo))
        await this.$store.dispatch('D_USER/AC_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data.userInfo))
        // this.$router.push('/')
        // this.GE_USER.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_FAILED'))
      }
      this.$router.push('/')
      // window.location.reload()
      // this.$router.go(0)
    },
    closeInfoBox () {
      this.resetHistory()
      if (this.clickedArea && this.clickedArea.clickedYn) {
        this.clickedArea.clickedYn = false
      } else if (this.clickedBd && this.clickeduniB.clickedYn) {
        this.clickeduniB.clickedYn = false
      }
      this.mInfoBoxShowYn = false
      return false
    },
    createMaskingUniBImg () {
      // eslint-disable-next-line no-debugger
      debugger
      const uniBList = this.mUniBList
      const h = window.innerHeight
      const w = window.innerWidth
      if (uniBList && uniBList.length !== 0) {
        for (let i = 0; i < uniBList.length; i++) {
          const uniB = uniBList[i]
          uniB.w = 1 / 10 * w
          uniB.h = 1 / 10 * h
          let blankWidth = 0
          if (window.innerWidth > 1000) {
            blankWidth = (window.innerWidth - 1000) / 2
          }
          if (uniB.key === 1) { // youtube
            uniB.w = w
            uniB.left = 50
            uniB.top = 20
          } else if (uniB.key === 2) { // inquiries
            uniB.h = h / 9
            uniB.left = 400 / 564 * w - blankWidth
            uniB.top = 63 / 100 * h - uniB.h
          } else if (uniB.key === 3) { // faq
            uniB.h = 1 / 12 * h
            uniB.left = 360 / 564 * w - blankWidth
            uniB.top = 310 / 1000 * h - uniB.h
          } else if (uniB.key === 4) { // instagram
            uniB.h = 1 / 5 * h
            uniB.left = 370 / 564 * w - blankWidth
            uniB.top = 9 / 10 * h - uniB.h - 60
          } else if (uniB.key === 5) { // download
            uniB.h = 1 / 4 * h
            uniB.left = 120 / 564 * w - blankWidth
            uniB.top = 19 / 20 * h - uniB.h - 20
          }
          const targetImage = new Image()
          targetImage.src = uniB.imgLink
          targetImage.onload = function () {
            const canvas = document.createElement('canvas')
            const scaleFactor = uniB.h / this.height
            const newWidth = Math.floor(this.width * scaleFactor)
            const newHeight = Math.floor(this.height * scaleFactor)
            canvas.width = newWidth
            canvas.height = newHeight
            uniB.w = newWidth
            uniB.h = newHeight
            const context = canvas.getContext('2d', { willReadFrequently: true })
            // 마스킹 이미지 그리기
            context.drawImage(this, 0, 0, uniB.w, uniB.h)
            uniB.ctx = context
            // 마스킹 이미지를 base64로 변환하여 출력
            uniB.maskedImageUrl = canvas.toDataURL()
          }
          targetImage.src = uniB.imgLink
        }
      }
    },
    async openSelectSchoolPop () {
      this.mSchoolList = await this.getChannelList(10, 0, false)
      this.mSelectSchoolPopShowYn = true
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
    async goLoginPage () {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile && (localStorage.getItem('nativeYn') === true || localStorage.getItem('nativeYn') === 'false')) {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/policies' })
      }
    },
    openPage (param) {
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
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      var response = await this.$axios.post('/sUniB/tp.UB_firstLoginCheck', Object.fromEntries(paramMap)
      )
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response && (response.status === 200 || response.status === '200')) {
        this.mMainChanList = response.data.teamList
        this.mMainMChanList = response.data.mTeamList
        this.mMainAlimList = response.data.alimList.content
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...this.mMainChanList, ...this.mMainMChanList])
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimList)
      }
      console.log(this.mMainChanList)
      console.log(this.mMainMChanList)
      console.log(this.mMainAlimList)
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
    getInRectImgList (event) {
      // 빌딩부터 역순으로 뒤짐
      // 빌딩이 발견됨, 스타일클리어 시키고, 효과를 주고 return해버리기
      // 빌딩 클릭이 없음, uniBclick을 찾음
      let blankWidth = 0
      if (window.innerWidth > 1000) {
        blankWidth = (window.innerWidth - 1000) / 2
      }
      this.clickedUniB = {}
      this.allClearFocus()
      let findYn = false
      const uniBList = this.mUniBList
      for (let i = 0; i < uniBList.length; i++) {
        const uniB = uniBList[i]
        if (uniB.ctx === null) { continue }
        findYn = false
        if (event.clientX >= uniB.left + blankWidth && event.clientX <= (uniB.left + uniB.w + blankWidth) && event.clientY >= uniB.top && event.clientY <= (uniB.top + uniB.h)) {
          findYn = true
          uniB.onImgYn = true
          break
        }
        uniB.onImgYn = false
      }
      this.allClearFocus()
      if (findYn === false) {
        return
      }
      // 마우스 위치가 마스킹 영역 내부에 있는지 확인
      for (let i = uniBList.length - 1; i >= 0; i--) {
        const uniB = uniBList[i]
        if (uniB.onImgYn === false) { continue }
        const _x = event.clientX - uniB.left - blankWidth
        const _y = event.clientY - uniB.top
        const pixelData = uniB.ctx.getImageData(_x, _y, 1, 1).data
        if (pixelData[3] !== 0) {
          this.clickedUniB = uniB
          uniB.clickedYn = true
          uniB.maskedImageStyle = { filter: 'drop-shadow(0 0 5px yellow) drop-shadow(0 0 40px white)' }
          break
        }
      }
    },
    allClearFocus () {
      for (let i = 0; i < this.mUniBList.length; i++) {
        const uniB = this.mUniBList[i]
        uniB.clickedYn = false
        uniB.maskedImageStyle = {}
      }
    },
    setWindowSize () {
      this.innerWidth = window.innerWidth
      const nowHeight = window.innerHeight

      if (this.innerHeight < nowHeight) this.innerHeight = nowHeight
    },
    findAllDrawn () {
      this.$emit('enterCloudLoading', false)
      this.$emit('showCloudLoading', true, false)
      setTimeout(() => {
        this.$emit('showCloudLoading', false)
      }, 2000)
    }
  },
  mounted () {
    this.findAllDrawn()
    this.setWindowSize()
    window.addEventListener('resize', this.createMaskingUniBImg)
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
    guidePop,
    selectSchoolPop
    // UBAreaBdList
    // UBBgEffect
  }
}
</script>
<style scoped>
@keyframes uniB-zoom {
  0% {
    transform: scale(1) translate(-50%, -50%)
  } 50% {
    transform: scale(1.05) translate(-50%, -50%)
  } 100% {
    transform: scale(1) translate(-50%, -50%)
  }
}
.uniBDiv.clicked {
  animation: uniB-zoom 0.4s alternate;
}
.zoom:hover {
  cursor: pointer;
  filter: drop-shadow(0 0 10px #f6ff7b);
  transform-origin: 50% 50%;
  animation: uniB-zoom 0.8s;
}
.mainBG {
  width: 100vw;
  height: 100vh;
  display: flex; align-items: center; overflow: hidden;
  position: relative;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* overflow: hidden; */
}
.planeImg{
  width:100%;
  filter: drop-shadow(5px 5px 5px #00000036);
  opacity: 0;
  transition: 0.2s;
  animation: flyingPlane 1s 2s ease-in-out both, moving 3s 3s ease-in-out infinite alternate;
}
@keyframes flyingPlane{
  0% {
    opacity: 0; transform: translate(-450px, 100px);
  } 80% {
    opacity: 1; transform: translate(0px, 0px) scale(1.2);
  } 100% {
    opacity: 1; transform: translate(0px, 0px) scale(1);
  }
}
@keyframes moving{
  0% {
    transform:translateY(0px)
  } 100% {
    transform:translateY(-10px)
  }
}
/* .ballon {
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
} */
.uniBCard {
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
.uniBMainWrap {
  display: flex;
  align-items: center;
  overflow: hidden;
  z-index: -1;
}
.popBg {
  width:100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background: #00000050;
}
.uniBTownBox {
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-image: url('/resource/main/unib_mainBG.png');
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
.userName {
  color: white;
  text-shadow: 1px 2px 2px black;
}
.btnWrap {
  height: 50px;
  position: absolute;
  top: 60px;
  left: 15px;
  display: flex;
  align-items: center;
}
.mTop60 {
  margin-top: 60px !important;
}
.uniBimg {
  position: absolute;
  transform: translate(-50%, -50%);
}
.planeBox{
  width:20%;
  max-width: 100px;
  position: absolute;
  right: 30px;
  top: 100px;
  opacity: 1;
}
.planeBox:hover {
  transform: scale(1.2);
  transform-origin: center;
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
@media screen and (max-width: 768px) {
  .planeBox {
    width: 80px !important;
    top: 80px !important;
  }
  .ballon {
    top: 60px !important;
  }
}
</style>
