<template>
  <div id="mainAllWrap" class="" ref="mainScrollWrap" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'" style="height: 100%; overflow: hidden scroll;">
    <loadingCompo style="z-index: 999999999;" v-if="mLoadingYn"/>
    <commonConfirmPop v-if="mAppCloseYn" @ok="closeApp" @appClose='closeApp' @no="this.mAppCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />

    <div style="width: 100%; float: left;">
        <div class="userProfileWrap" style=" border-radius: 0.8rem; padding: 0 1.5rem;" >
            <div style="width: calc(100% - 80px); float: left; height: 100%;">
                <!-- <a href="web+test://pwa">Americano</a> -->
                <p class="commonLightColor font16 textLeft " style="font-weight: 600;">더알림에 오신 것을 환영해요!</p>
                <p class="commonLightColor font16 textLeft fl" style="font-weight: 600;">로그인을 하고 채널을 구독해보세요</p>
            </div>
            <gBtnSmall btnTitle="로그인" class="fr"/>
            <!-- <div @click="goUserProfile" style="position: relative; width: 60px; height: 60px; justify-content: center; align-items: center; padding: 1px; border-radius: 100%; border:2.5px solid #5B1CFC; float: left; display: flex; padding: 2px; flex-grow: 0; flex-shrink: 0;">
                <div v-if="this.GE_USER.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.$changeUrlBackslash(this.GE_USER.userProfileImg) : this.GE_USER.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;">
                    <img v-if="this.GE_USER.certiDate" style="position: absolute; width: 20px; bottom: 0px; right: -5px;" src="../../assets/images/common/userCertiIcon.svg" alt="">
                </div>
                <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                    <img v-if="this.GE_USER.certiDate" style="position: absolute; width: 20px; bottom: 0px; right: -5px;" src="../../assets/images/common/userCertiIcon.svg" alt="">
                </div>
            </div> -->
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
        <div style="border-radius: 30px 30px 0px 0px; width: 100%; float: left;">
          <div  style="width:100%; background-color: #E7EDFF; float:left;">
            <div style="width: 100%; display: flex; align-items: center; background: #FFF; height: 60px; float: left; padding: 17px 20px; border-radius: 30px 30px 0px 0px; position: relative; border-bottom: 2px; solid #F4F7FF!important; margin-top: 15px;">
              <img src="../../assets/images/main/main_contentsBellIcon2.png" style="float: left; margin-right: 8px;" class="img-w24" alt="">
              <p @click="goContentListPop()" class="font20 fontBold deepBorderColor fl textLeft cursorP CDeepColor" style="line-height: 26px;">받은 알림, 게시글 ></p>
              <img class="fr cursorP" @click="openFindPop"  style="width: 25px; position: absolute;right: 65px;" src="../../assets/images/common/iocn_search.png" alt="">
                <div style="position: absolute; top:15px; right:25px; z-index:8; width: 30px; height: 30px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); display: flex; align-items: center; justify-content: center; " @click="refreshMainList">
                    <img src="../../assets/images/common/reload_button.svg" class="cursorP img-w20" />
                </div>
            </div>
          </div>
          <div style="float: left; width: 100%; margin-top: 2px; min-height: 10px; background: #F4F4F4; padding: 8px;" >
            <template v-if="mMainAlimList.length === 0 && mContentsEmptyYn === false">
                <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
            </template>
            <div v-if="mMainAlimList.length === 0 && mContentsEmptyYn === true" style="width: 100%; min-height: 300px; background: #FFFFFF; float: left;">
                <gEmpty contentName="전체" tabName="최신" class="mtop-2"/>
            </div>
            <mainContsList :pUnknownYn="true"  @goSearchDirect="goSearchDirect"   @openImgPop="oepnImgPop" ref="mainContsList" v-if="mMainAlimList.length > 0" :pMainAlimList="mMainAlimList" :propUserKey="this.GE_USER? this.GE_USER.userKey : null" @openPop='openPop' />
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
/* import chanRoundIcon from '../../components/pageComponents/main/D_chanRoundIcon.vue'
import chanSquareIcon from '../../components/pageComponents/main/D_chanSquareIcon.vue' */
import mainContsList from '../../components/pageComponents/main/D_mainContList.vue'
/*
import createChanIcon from '../../components/pageComponents/main/unit/D_createChanRoundIcon.vue'
import searchChanIcon from '../../components/pageComponents/main/unit/D_searchChanSquareIcon.vue'
import circleSkeleton from '../../components/pageComponents/main/D_mainChanCircleSkeleton.vue'
import squareSkeleton from '../../components/pageComponents/main/D_mainChansquareSkeleton.vue' */
import SkeletonBox from '../../components/pageComponents/push/D_contentsSkeleton'
export default {
  data () {
    return {
      mAppCloseYn: false,
      mLoadingYn: false,
      mMainAlimList: [],
      mMainChanList: [],
      mMainMChanList: [],
      mAxiosQueue: [],
      mContentsEmptyYn: false,
      mActiveTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  components: {
    // initModal,
    commonConfirmPop,
    /* pushList, */
    /* searchChanIcon,
    createChanIcon, */
    loadingCompo,
    /* chanRoundIcon,
    chanSquareIcon, */
    mainContsList,
    /* circleSkeleton,
    squareSkeleton, */
    SkeletonBox
  },
  created () {
    this.mLoadingYn = true
    this.getMainBoard().then(res => {
      this.mLoadingYn = false
    })
    this.$store.commit('D_HISTORY/setRemovePage', '')
    this.$store.commit('D_HISTORY/updateStack', [])
    this.$store.dispatch('D_HISTORY/AC_CLEAR_GPOP_STACK')
  },
  mounted () {
  },
  methods: {
    callbackFunc (e) {
      console.log(e)
    },
    async getMyContentsList () {
      var param = {}
      param.ownUserKey = this.GE_USER.userKey
      param.subsUserKey = this.GE_USER.userKey
      param.allYn = true
      param.pageSize = 10
      param.offsetInt = 0
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
      this.mMainAlimList = res.content
    },
    goChannelPop (type) {
      var openPopParam = {}
      openPopParam.targetType = 'chanList'
      openPopParam.popHeaderText = '채널'
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
      openPopParam.popHeaderText = '받은 알림, 게시글'
      this.openPop(openPopParam)
    },
    async getMainBoard () {
      console.log('getMainBoard')
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getMainBoard') !== -1) return
      this.mAxiosQueue.push('getMainBoard')
      var paramMap = new Map()
      paramMap.set('jobkindId', 'BOAR')
      paramMap.set('allYn', true)
      var response = await this.$axios.post('/sUniB/tp.getMyContentsList', Object.fromEntries(paramMap))
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getMainBoard')
      this.mAxiosQueue.splice(queueIndex, 1)
      if (response.status === 200 || response.status === '200') {
        this.mMainAlimList = response.data.content
        await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMainAlimList)
      }
    },
    async openPagePop (targetKind, targetKey) {
      var param = {}
      param.targetType = targetKind
      param.targetKey = Number(targetKey)
      this.openPop(param)
    },
    async goPage (test) {
      /* if (test && test.targetType === 'chanDetail') {
        detailParam.targetKey =
      } */
      /* if (test.targetType === 'chanDetail') {
        detailParam.cabinetKey = detailValue.cabinetKey
        detailParam.cabinetNameMtext = detailValue.cabinetNameMtext
        detailParam.popHeaderText = detailValue.cabinetNameMtext
      } */
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

.mainContentsBoxArea {
  background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
}

@media screen and (max-width: 300px) {

  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
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
</style>
