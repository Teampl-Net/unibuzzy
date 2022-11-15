<template>
  <div v-if="this.GE_USER && this.GE_MAIN_CHAN_LIST" :key="componentKey" class="pagePaddingWrap" style="padding-bottom: 10px; padding-top: 10px;height: 100%; overflow: hidden scroll;">
    <loadingCompo style="z-index: 999999999;" v-if="mLoadingYn"/>
    <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />

    <div class="userProfileWrap" style="background: #fff; padding: 10px; border-radius: 0.8rem;     box-shadow: 0 0 7px 3px #b7b4b440;" >
      <div @click="goUserProfile" v-if="this.GE_USER.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.$changeUrlBackslash(this.GE_USER.userProfileImg) : this.GE_USER.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
      <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
      <div class="userProfileTextWrap" >
        <p ref="userName" class="mainUserName font18 fontBold grayBlack">{{$changeText(this.GE_USER.userDispMtext)}}</p>
        <img  src="../../assets/images/common/ico_refresh.png" @click="refreshBtnClick" class="mainRefreshBtn" style="position: absolute; right: 0; top: 0; width: 25px;" alt="">
        <div>
          <img class="mainIcon" src="../../assets/images/main/main_email.png" style= 'width: 1rem' />
          <span class="profileTitle font14" ref="userEmail" @click="this.$showChanCommonPop(true)">이메일</span>
          <span class="grayBlack font14" @click="getNaverProfile" ref="userEmail">{{this.GE_USER.userEmail}}</span>
        </div>
        <div>
          <img class="mainIcon" src="../../assets/images/main/main_phone.png" style= 'width: 1rem' />
          <span @click="this.$testClick" class="profileTitle font14" ref="userMobile">휴대폰</span>
          <span class="grayBlack font14" ref="userMobile">{{this.$setPhone(this.GE_USER.phoneEnc)}}</span>
        </div>
      </div>
    </div>
    <top5Alim    class="mainContentsBoxArea" :propAlimList="this.mMainAlimList" @openPop="openPop" ref="topAlim" />
    <top5Channel class="mainContentsBoxArea" :propChanList="this.mMainChanList" @openPop="openPop" ref="topChan" />
  </div>
</template>
<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import top5Channel from '../../components/pageComponents/main/D_top5ChanList.vue'
import top5Alim from '../../components/pageComponents/main/D_top5ContentsList.vue'
import { onMessage } from '../../assets/js/webviewInterface'
import loadingCompo from '../../components/layout/Tal_loading.vue'
export default {
  data () {
    return {
      mAppCloseYn: false,
      mLoadingYn: false,
      mMainAlimList: [],
      mMainChanList: [],
      mAxiosQueue: []
    }
  },
  components: {
    // initModal,
    commonConfirmPop,
    top5Channel,
    top5Alim,
    loadingCompo
  },
  created () {
    if (!this.GE_USER) {
      this.$router.push('/policies')
      return
    }
    this.getMainBoard().then(res => {
      this.mLoadingYn = false
    })
    this.mLoadingYn = true
    this.$store.commit('D_HISTORY/setRemovePage', '')
    this.$store.commit('D_HISTORY/updateStack', [])
    this.$store.dispatch('D_HISTORY/AC_UPDATE_GPOP_STACK', [])
    this.$emit('changePageHeader', '더알림')
  },
  mounted () {
    this.mLoadingYn = false
    this.$userLoginCheck()
  },
  methods: {
    async getNaverProfile () {
      var result = await this.$commonAxiosFunction({
        url: 'real/tp.getNaverProfile',
        param: { aToken: this.GE_USER.soAccessToken }
      })
      console.log(result)
    },
    async getMainBoard () {
      if (this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      var response = await this.$axios.post('service/tp.getMainBoard', Object.fromEntries(paramMap)
      )
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response.status === 200 || response.status === '200') {
        this.mMainChanList = response.data.teamList
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', this.mMainChanList)
        var teamList = this.GE_MAIN_CHAN_LIST
        console.log(this.GE_MAIN_CHAN_LIST)
        this.mMainAlimList = response.data.alimList
        var index = null
        var poolList = null
        var index1 = null
        for (var i = 0; i < this.mMainAlimList.length; i++) {
          index = teamList.findIndex((item) => item.teamKey === this.mMainAlimList[i].creTeamKey)
          if (index !== -1) {
            if (this.mMainAlimList[i].jobkindId === 'BOAR') {
              poolList = teamList[index].ELEMENTS.boardList
            } else {
              poolList = teamList[index].ELEMENTS.alimList
            }
            index1 = poolList.findIndex((item) => item.mccKey === this.mMainAlimList[i].mccKey)
            if (index1 === -1) {
              if (this.mMainAlimList[i].jobkindId === 'BOAR') {
                teamList[index].ELEMENTS.boardList.push(this.mMainAlimList[i])
              } else {
                teamList[index].ELEMENTS.alimList.push(this.mMainAlimList[i])
              }
            }
          }
        }
      }
    },
    goUserProfile () {
      var param = {}
      this.mLoadingYn = true
      param.targetType = 'setMypage'
      param.popHeaderText = '프로필 설정'
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    async refreshBtnClick () {
      this.mLoadingYn = true
      this.getMainBoard().then(res => {
        this.mLoadingYn = false
      })
      this.$store.commit('D_HISTORY/setRemovePage', '')
      this.$store.commit('D_HISTORY/updateStack', [])
      this.$emit('changePageHeader', '더알림')
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.mAppCloseYn = false
    },
    openPop (openParam) {
      this.$emit('openPop', openParam)
    }
  },
  computed: {
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
    }
  },

  watch: {
    pageUpdate (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (this.$route.path === '/') {
          // this.openCloseAppPop()
          this.mAppCloseYn = true
        }
      }
    }
  }
}
</script>

<style scoped>

/* main */
.userProfileWrap{ display:flex; align-items: flex-start; margin-top: 1rem;}
  .userProfileTextWrap{width: calc(100% - 85px); text-align: left; position: relative;}
  .userProfileTextWrap >p{margin-bottom: 0.2rem;}
  .userProfileTextWrap img{ width:1rem; margin-right: 0.2rem;}
  .userProfileTextWrap .profileTitle{font-weight: bold; color: #6768A7; margin-right: 0.4rem;}
.picImgWrap {width: 80px; height: 80px; position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem;
}
.picImgWrap img {width: 100%; position: absolute; top: 0; left: 0;}

.mainContentsBoxArea {
  background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
}

@media screen and (max-width: 300px) {
  .picImgWrap{
    width: 60px!important;
    height: 60px!important;
  }
  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
}
</style>
