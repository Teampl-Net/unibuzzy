<i18n>
{
    "ko": {
    "MAIN_MESSAGE_WELCOME": "하이브릭에 오신 것을 환영해요!",
    "MAIN_TITLE_MANAGING_CHANNEL": "내 관리 채널",
    "MAIN_TITLE_FOLLOWING_CHANNEL": "구독중인 채널",
    "MAIN_TITLE_POPULAR_CHANNEL": "인기있는 채널",
    "MAIN_TITLE_RECV_CONTENTS": "받은 알림, 게시글",
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
    "MAIN_MESSAGE_LOGIN": "Sign in and follow channels to see interesting contents!",
    "PROF_NAME_SETTING": "Profile Setting"
    }
}
</i18n>
<template>
  <div class="popBg" v-if="mBoardPopShowYn || mCommingSoon" @click.stop></div>
  <boardListPop v-if="mBoardPopShowYn" :pChanDetail="CHANNEL_DETAIL" :pClosePop="closeBoardPop"/>
  <commpingSoonPop v-if="mCommingSoon" :pClosePop="closeCommingSoon" :pClickedInfo="mClickedInfo"/>
    <div style="height:calc(100%); overflow: hidden scroll; background-color:#fff;">
      <div class="w100p mainTownArea" :class="{mainTownAreaNight : mNightYn}">
      <div class="plane" style="">
        <img
          @click="openSelectChannelPop"
          class="cursorP w100P"
          :src="require(`@/assets/images/imageMain/plane.png`)"
          style=""
          alt=""
        />
        <p>{{ mDispTitle }}</p>
      </div>
        <!-- <div class="ballon">
        <img
          src="@/assets/images/main/ballon.png"
          alt="go to other town?"
          class="w100P"
        />
      </div>
      <div class="planeBox">
        <img
          @click="openSelectChannelPop"
          class="cursorP planeImg"
          src="@/assets/images/main/icon_plane.png"
          style=""
          alt=""
        />
      </div> -->
      <div
        @click="goUserProfile"
        class="profileBox"
        :style="{ top: $STATUS_HEIGHT + 60 + 'px' }"
      >
        <gProfileImg :selfYn="true" class="fl profileImg" />
        <div v-if="GE_USER.unknownYn" class="fl font20 fontBold userName">
          HI, GUEST
        </div>
        <div v-else class="fl font20 fontBold userName">
          {{ $changeText(GE_USER.userDispMtext) }}
        </div>
      </div>
        <template v-if="mPcStyleYn">
          <div
            class="zoom"
            :class="{'clickEvent' : mSelectedAreaPriority === building.priority && building.priority !== 0, 'zoomtwo' : building.priority !== 0, hotBalloon: building.priority === 0}"
            v-for="building in mTownBuildingList"
            :key="building.priority"
            style="position: absolute; transform: translate(-50%, -50%); z-index:2;"
            :style="{
              width: building.pcW,
              height: building.pcH,
              left: building.left,
              top: building.top,
            }"
          >
            <img
              @click="moveToSelectInfo(building.priority)"
              class="w100P h100P"
              :src="mNightYn ? building.nightImgPath : building.imgPath"
              alt=""
            />
            <img
              :style="{ left: building.titleLeft, top: building.titleTop }"
              style="position: absolute; transform: translate(-50%, -50%); width:85px;"
              :src="building.titlePath"
              alt=""
            />
          </div>
          <img
            :src="mMountainImgPath"
            style="
              position: absolute;
              left: 20%;
              top: 55%;
              transform: translate(-50%, -50%);
              width: 35%;
              height: 20%;
            "
            alt=""
          />
        </template>
        <template v-else>
        <div
          class="zoom"
          :class="{'clickEvent' : mSelectedAreaPriority === building.priority && building.priority !== 0, 'zoomtwo' : building.priority !== 0, hotBalloon: building.priority === 0}"
          v-for="building in mTownBuildingList"
          :key="building.priority"
          style="position: absolute; transform: translate(-50%, -50%)"
          :style="{ width: building.w, left: building.left, top: building.top }"
        >
          <img
            class="w100P h100P"
            @click="moveToSelectInfo(building.priority)"
            :src="mNightYn ? building.nightImgPath : building.imgPath"
            alt=""
          />
          <img
            :style="{ left: building.titleLeft, top: building.titleTop }"
            style="position: absolute; transform: translate(-50%, -50%); width:85px;"
            :src="building.titlePath"
            alt=""
          />
        </div>
        <img
          :src="mMountainImgPath"
          style="
            position: absolute;
            left: 20%;
            top: 55%;
            transform: translate(-50%, -50%);
            width: 35%;
          "
          alt=""
        />
      </template>
      </div>
    </div>
</template>

<script>
import boardListPop from '@/components/popup/D_BoardListPop.vue'
import commpingSoonPop from '@/components/popup/D_CommingSoonPop.vue'

export default {
  components: {
    boardListPop,
    commpingSoonPop
  },
  props: {
    pPortalMainData: {},
    pChangeNightYn: Function,
    mRouterHeaderText: {}
  },
  data () {
    return {
      mNightYn: false,
      mPcStyleYn: true,
      mTownBuildingList: [
        {
          priority: 1,
          left: '80%',
          top: '57%',
          w: '40%',
          pcW: '40%',
          pcH: '12%',
          titleLeft: '70%',
          titleTop: '70%',
          imgPath: require('@/assets/images/imageMain/main_invitation.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_invitation.png'),
          titlePath: require('@/assets/images/imageMain/title_invitation.png')
        },
        {
          priority: 2,
          left: '52%',
          top: '65%',
          w: '40%',
          pcW: '40%',
          pcH: '18%',
          titleLeft: '5%',
          titleTop: '70%',
          imgPath: require('@/assets/images/imageMain/main_myday.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_myday.png'),
          titlePath: require('@/assets/images/imageMain/title_myday.png')
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
          imgPath: require('@/assets/images/imageMain/main_community.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_community.png'),
          titlePath: require('@/assets/images/imageMain/title_community.png')
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
          imgPath: require('@/assets/images/imageMain/main_friends.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_friends.png'),
          titlePath: require('@/assets/images/imageMain/title_friends.png')
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
          imgPath: require('@/assets/images/imageMain/main_nearby.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_nearby.png'),
          titlePath: require('@/assets/images/imageMain/title_nearby.png')
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
          imgPath: require('@/assets/images/imageMain/main_lab.png'),
          nightImgPath: require('@/assets/images/imageMain/main_night_lab.png'),
          titlePath: require('@/assets/images/imageMain/title_lab.png')
        }
      ],
      mBoardPopShowYn: false,
      mPortalMainData: {},
      mMainChanList: {},
      mMainMChanList: {},
      mMainAlimListcontent: {},
      mStickerListst: {},
      mMyCabinetKeyList: {},
      mPortalMainTeam: {},
      mCommingSoon: false,
      pClickedInfo: '',
      mDispTitle: ''
    }
  },
  created () {
    console.log('mRouterHeaderText', this.mRouterHeaderText)
    this.setNativeHeight()
    // 아침, 밤 구분
    let xmlHttpRequest
    if (window.XMLHttpRequest) {
      // code for Firefox, Mozilla, IE7, etc.
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
      this.mMountainImgPath = require('@/assets/images/imageMain/main_night_mountain.png')
    } else {
      this.pChangeNightYn(false)
      this.mNightYn = false
      this.mMountainImgPath = require('@/assets/images/imageMain/main_mountain.png')
    }
    console.log('mNightYn', this.mNightYn)
  },
  mounted () {
    this.setRatio()
    window.addEventListener('resize', this.setRatio)
  },
  methods: {
    openCommingSoon () {
      this.mCommingSoon = true
    },
    closeCommingSoon () {
      this.mCommingSoon = false
    },
    openBoardPop () {
      this.mBoardPopShowYn = true
    },
    closeBoardPop () {
      console.log('???')
      this.mBoardPopShowYn = false
    },
    openSelectChannelPop () {
      console.log('open it!!')
      this.$emit('openSelectChannelPop')
    },
    openSelectChannel () {
      this.$emit('openSelectChannel')
    },
    goUserProfile () {
      this.$emit('changeRouterPath', 'myPage')
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
    moveToSelectInfo (area) {
      // if (area) {
      if (area === 0) {
        // this.openBoardPop()
        // this.openCommingSoon()
        // this.mClickedInfo = 'All Boards'
      } else if (area === 1) {
        this.openCommingSoon()
        this.mClickedInfo = 'Invitation'
      } else if (area === 2) {
        this.$router.push('/todo')
      } else if (area === 3) {
        this.openCommingSoon()
      } else if (area === 4) {
        this.$router.push('/comList')
      } else if (area === 5) {
        this.openCommingSoon()
        this.mClickedInfo = 'Friends'
      } else if (area === 6) {
        this.openCommingSoon()
        this.mClickedInfo = 'Near by'
      }
      // }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.GE_USER.myTeamKey)
    }
  },
  watch: {
    mRouterHeaderText: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.mDispTitle = val
      }
    }
  }
}

</script>

<style scoped>

.popBg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background: #00000050;
}
.mainTownArea {
  height: calc(100%);
  position: relative;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/imageMain/town_background.png');
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
}
.mainTownAreaNight{
    background-image: url('../../assets/images/imageMain/town_night_background.png') !important;
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
.plane{
  width:90%;
  max-width:550px;
  height:auto;
  position:absolute;
  top:20%;
  left:50%;
  transform:translate(-50%, 0);
  filter: drop-shadow(5px 5px #00000036);
  transition: 0.2s;
  animation: moving 3s 0s ease-in-out infinite alternate;
  position:relative;
}
.plane p{
  position:absolute;
  top:50%;
  right:50%;
  transform:translate(70%, -50%);
  font-weight:bold;
  color:rgb(74 102 158);
}

@keyframes area-zoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}
.hotBalloon{
  animation: moving 2s 0s ease-in-out infinite alternate;
  filter:drop-shadow(5px 5px #00000036);
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
    transform: translate(-50%, 0px);
  }
  100% {
    transform: translate(-50%, -10px);
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
  content: "";
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
    transform: scale(1) translate(-50%, -50%);
  }
  50% {
    transform: scale(1.05) translate(-50%, -50%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
  }
}
.clickEvent {
  filter: drop-shadow(0 0 10px #f6ff7b);
  transform-origin: center;
  animation: uniB-zoom 0.8s;
}
@media (hover: hover) {
  /* when supported */
  .zoom:hover {
    cursor: pointer;
    filter: drop-shadow(0 0 10px #f6ff7b);

  }
  .zoomtwo:hover{
    transform-origin: center;
    animation: uniB-zoom 0.8s;
  }
}
@media screen and (max-width: 499px) {
  .laboratory {
    width: 25% !important;
    bottom: 70px !important;
  }
}
</style>
