<template>
  <div v-if="this.GE_USER && this.GE_MAIN_CHAN_LIST" id="mainAllWrap" class="" ref="mainScrollWrap" style="padding-top: 10px;height: 100%; overflow: hidden scroll;">
    <loadingCompo style="z-index: 999999999;" v-if="mLoadingYn"/>
    <commonConfirmPop v-if="mAppCloseYn" @ok="closeApp" @appClose='closeApp' @no="this.mAppCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />

    <div style="width: 100%; float: left;">
        <div class="userProfileWrap" style=" border-radius: 0.8rem; padding: 0 1.5rem;" >
            <div style="width: calc(100% - 42px); float: left; height: 100%;">
                <p class="commonLightColor font16 textLeft " style="font-weight: 600;">더알림에 오신 것을 환영해요!</p>
                <div style="float: left; height: calc(100% - 20px); width: 100%;">
                    <div style="float: left; height: 100%; position: relative;">
                        <p class="fl fontBold font18 CDeepColor" style="position: absolute; z-index: 1;">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
                        <p class="fl fontBold font18" style="color: transparent!important">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
                        <div class="highLightYellow w-100P" style="position: absolute; bottom: 5px; left: 0;"></div>
                    </div>
                    <p style="font-weight: 600;" @click="openNotiHistoryPop" class="font16 fl commonLightColor">님!</p>
                </div>
            </div>
            <div style="width: 60px; height: 60px; justify-content: center; align-items: center; padding: 1px; border-radius: 100%; border:2.5px solid #5B1CFC; float: left; display: flex; padding: 2px;">
                <div @click="goUserProfile" v-if="this.GE_USER.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.$changeUrlBackslash(this.GE_USER.userProfileImg) : this.GE_USER.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
                <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
            </div>
            <!-- <div class="userProfileTextWrap" >
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
            </div> -->
        </div>

        <!-- <div id="chanListPageHeader" ref="chanListHeader" class="chanListHeader" style="width: 95%; min-height: 50px; padding-top: 10px; position: absolute; background-color: #FFF; top: 10%; left: 2.5%; z-index: 2;">
          <gActiveBar :searchYn='true' :tabList="this.mActiveTabList" class="fl" style="" @changeTab="changeTab"></gActiveBar>
        </div> -->

        <div v-if="this.mMainMChanList || this.mMainChanList" style="background: #FFFFFF; margin-top: 15px; padding: 20px; padding-right: 0; border-radius: 30px 30px 0px 0px; width: 100%; float: left;">
            <div v-if="this.mMainMChanList"  style="width: 100%; height: 30px; float: left;">
                <img src="../../assets/images/main/main_settingIcon2.png" style="float: left; margin-right: 8px;" class="img-w23" alt="">
                <p @click="goChannelPop('mychannel')" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">내 관리 채널 ></p>
            </div>
            <div v-if="this.mMainMChanList" style="width: 100%; height: 85px; margin-top: 5px; margin-bottom: 15px; float: left; overflow: scroll hidden;">
                <div style="height: 100%; min-width: 100%; display:flex;">
                    <chanRoundIcon :chanElement="chan" v-for="(chan, index) in this.mMainMChanList" :key="index" @openPop="openPop"/>
                    <createChanIcon @openPop="openPop" style="margin-right:3rem"/>
                </div>
            </div>
            <div v-if="this.mMainChanList" class="mtop-1 " style="width: 100%; height: 30px; float: left;">
                <img src="../../assets/images/main/main_followIcon2.png" style="float: left; margin-right: 8px;" class="img-w23" alt="">
                <p @click="goChannelPop('user')" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">구독중인 채널 ></p>
            </div>
            <div v-if="this.mMainChanList" style="width: 100%; height: 110px; margin-top: 5px;float: left; overflow: scroll hidden;">
                <div style="height: 100%; min-width: 100%; display:flex; gap: 10px;">
                    <chanSquareIcon :chanElement="chan" v-for="(chan, index) in this.mMainChanList" :key="index" @openPop="openPop"/>
                    <searchChanIcon @openPop="openPop" />
                </div>
            </div>
        </div>
        <!-- <div style="margin-top: 15px; border-radius: 30px 30px 0px 0px; width: 100%; float: left;">
            <div style="width: 100%; background: #FFF; height: 60px; float: left; padding: 17px 20px; border-radius: 30px 30px 0px 0px; border-bottom: 2px; solid #F4F7FF!important">
                <img src="../../assets/images/main/main_contentsBellIcon2.png" style="float: left; margin-right: 8px;" class="img-w24" alt="">
                <p @click="goContentListPop()" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">도착한 알림, 게시글</p>
            </div>
            <div style="float: left; width: 100%; margin-top: 2px; min-height: 10px;" >
                <mainContsList :propUserKey="this.GE_USER.userKey" @openPop='openPop' />
            </div>
        </div> -->
        <div style="border-radius: 30px 30px 0px 0px; width: 100%; float: left;">
          <div  style="width:100%; background-color: #E7EDFF; float:left;">
            <div style="width: 100%; background: #FFF; height: 60px; float: left; padding: 17px 20px; border-radius: 30px 30px 0px 0px; border-bottom: 2px; solid #F4F7FF!important; margin-top: 15px;">
              <img src="../../assets/images/main/main_contentsBellIcon2.png" style="float: left; margin-right: 8px;" class="img-w24" alt="">
              <p @click="goContentListPop()" class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">도착한 알림, 게시글 ></p>
            </div>
          </div>
          <div style="float: left; width: 100%; margin-top: 2px; min-height: 10px; background: #F4F4F4; padding: 8px; " >
            <mainContsList :propUserKey="this.GE_USER.userKey" @openPop='openPop' />
          </div>
        </div>
    </div>
    <!-- <div style="width: 100%; box-shadow: rgb(183 180 180 / 25%) 0px 0px 7px 3px; height: calc(100% + 10px); float: left; margin-top: 10px; padding-top: 10px; background: #FFF;">
        <pushList @openPop="openPop "/>
    </div> -->
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
export default {
  data () {
    return {
      mAppCloseYn: false,
      mLoadingYn: false,
      mMainAlimList: [],
      mMainChanList: [],
      mMainMChanList: [],
      mAxiosQueue: [],
      mActiveTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }]
    }
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
    mainContsList
  },
  created () {
    var urlString = location.search
    var test = this.getParamMap(urlString)
    if (test.targetType) {
      this.goPage(test)
    }
    // alert(urlString)
    if (!this.GE_USER) {
      this.$router.push('/policies')
      return
    }
    /* this.getMainBoard().then(res => {
      this.mLoadingYn = false
    }) */
    this.mLoadingYn = true
    this.$store.commit('D_HISTORY/setRemovePage', '')
    this.$store.commit('D_HISTORY/updateStack', [])
    this.$store.dispatch('D_HISTORY/AC_CLEAR_GPOP_STACK')
    this.$emit('changePageHeader', '더알림')
  },
  /* updated () {
    this.getMainBoard()
  }, */
  mounted () {
    // this.mLoadingYn = false
    this.$userLoginCheck()
    var this_ = this
    setTimeout(() => {
      this_.mLoadingYn = false
    }, 3000)
    if (!this.GE_USER) return
    this.getMainBoard()
    // var this_ = this
    /* this.$nextTick(() => {
      this_.mLoadingYn = false
    }) */
    this.$refs.mainScrollWrap.addEventListener('scroll', this.handleScroll)
    this.mLoadingYn = false
  },
  methods: {
    goChannelPop (type) {
      var openPopParam = {}
      openPopParam.targetType = 'chanList'
      openPopParam.popHeaderText = '채널'
      openPopParam.channelTabType = type
      this.openPop(openPopParam)
    },
    goContentListPop () {
      var openPopParam = {}
      openPopParam.targetType = 'pushList'
      openPopParam.popHeaderText = '도착한 알림, 게시글'
      this.openPop(openPopParam)
    },
    async getMainBoard () {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      console.log(this.GE_USER)
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
        this.mMainMChanList = response.data.mTeamList
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [...this.mMainChanList, ...this.mMainMChanList])
      }
      console.log(this.mMainChanList)
      console.log(this.mMainMChanList)
    },
    async goPage (test) {
      console.log(test)
      if (test && test.targetType && test.targetKey && test.creTeamKey) {
        var detailValue = await this.$addContents(Number(test.targetKey), test.jobkindId)
        if (detailValue !== false) {
          test.targetKey = Number(test.targetKey)
          test.creTeamKey = Number(test.creTeamKey)
          test.teamKey = Number(test.creTeamKey)
          var detailParam = test
          detailParam.targetType = test.targetType
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
        detailParam.value = test
        detailParam.notiYn = true
        this.openPop(detailParam)
      }
    },
    getParamMap (urlString) {
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
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
      param.popHeaderText = '프로필 설정'
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
      if (!(this.GE_USER.userKey === 255 || this.GE_USER.userKey === 123 || this.GE_USER.userKey === 104 || this.GE_USER.userKey === 192 || this.GE_USER.userKey === 228 || this.GE_USER.userKey === 1)) return
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'notiHitstory'
      param.popHeaderText = '알림이력'
      this.openPop(param)
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
        console.log(' 생성 감지!!! ')
        console.log(value)
        this.mMainMChanList.unshift(value[0])
        this.mMainChanList.unshift(value[0])

        this.$store.dispatch('D_CHANNEL/AC_CREATE_CHANNEL_DEL', value[0])
      },
      deep: true
    },
    GE_REMOVE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        console.log(' 삭제 감지!!! ')
        console.log(value[0])
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
        console.log(' 수정 감지!!! ')
        console.log(value[0])
        try {
          var detail = await this.$getDetail('TEAM', updateData.teamKey)[0]
          console.log(detail)
          var findIdx = this.mMainMChanList.findIndex(item => item.teamKey === updateData.teamKey)
          if (findIdx !== -1) {
            this.mMainMChanList[findIdx] = detail
          } else {
            return false
          }
          console.log(findIdx)

          findIdx = this.mMainChanList.findIndex(item => item.teamKey === updateData.teamKey)
          if (findIdx !== -1) {
            this.mMainChanList[findIdx] = detail
          } else {
            return false
          }
          console.log(findIdx)
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
.userProfileWrap{ display:flex; align-items: center; margin-top: 0; height: 50px;}
  .userProfileTextWrap{width: calc(100% - 85px); text-align: left; position: relative;}
  .userProfileTextWrap >p{margin-bottom: 0.2rem;}
  .userProfileTextWrap img{ width:1rem; margin-right: 0.2rem;}
  .userProfileTextWrap .profileTitle{font-weight: bold; color: #5B1CFC; margin-right: 0.4rem;}
.picImgWrap {width: 100%; height: 100%; position: relative; border-radius: 100%; overflow: hidden; display: flex; background-color: #fff;
}

.mainContentsBoxArea {
  background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
}

@media screen and (max-width: 300px) {
  .picImgWrap{
    /* width: 60px!important;
    height: 60px!important; */
  }
  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
}
</style>
