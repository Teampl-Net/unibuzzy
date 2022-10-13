
<template>
<div id="alimWrap" v-if="this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH" ref="scrollBox" style="overflow: scroll;" :style="'background-image: url(' + (this.CHANNEL_DETAIL.bgDomainPath ? this.CHANNEL_DETAIL.bgDomainPath + CHANNEL_DETAIL.bgPathMtext : CHANNEL_DETAIL.bgPathMtext) + ')'" class="chanDetailWrap">
  <p class="font20 fontBold" :style="titleLongYn ? 'font-size: 15px !important;': '' " style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex;" :class="{officialTitle: CHANNEL_DETAIL.officialYn}" > <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="CHANNEL_DETAIL.officialYn" style="width:30px;" alt="" /> {{changeText(CHANNEL_DETAIL.nameMtext)}}</p>
  <!-- <div>{{pushKey}}</div> -->
  <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
  <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
  <welcomePopUp type="follow" v-if="openWelcomePopYn" :chanInfo="CHANNEL_DETAIL" @copyText="copyText" @goChanMain="openWelcomePopYn = false" @closePop="okMember" @applyMember="okMember" />
  <!-- <div id="summaryWrap" v-if="this.detailShowYn === false" class="summaryWrap mtop-05" style="padding: 0 1rem;" :style="followYn === false ? 'top: 50%; transform: translateY(-60%);' : '' " > -->
  <div id="summaryWrap" v-if="this.detailShowYn === false" class="summaryWrap mtop-05" style="padding: 0 1rem;" >
    <div id="chanInfoSummary" ref="chanImg"  class="mt-header chanWhiteBox ">
      <div class="chanImgRound" :style="'background-image: url(' + (this.CHANNEL_DETAIL.logoDomainPath ? this.CHANNEL_DETAIL.logoDomainPath + this.CHANNEL_DETAIL.logoPathMtext : this.CHANNEL_DETAIL.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;" > <!-- 채널 로고 부분 -->
        <!-- <img id="chanImg" :style="setProfileSize" :src="CHANNEL_DETAIL.logoPathMtext" style="width: 90%" alt="채널사진" /> -->
        <!-- <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="CHANNEL_DETAIL.officialYn" style="position: absolute; width:30px; top:-1rem" alt=""> -->
      </div>
      <div class="chanTextBox fl mleft-05;" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; width:100%; margin-left: 0.5rem;">
        <div class="fl font16  w-100P">
          <!-- <div style="width:20px;" class="fl">
            <img class="fl" style="width:20px; margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘">
          </div> -->
          <p class="font15 textLeft fl">
            <!-- <pp class="fl" style="width:50px;"> -->
            <img class="fl img-w20" style="margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘">
            <!-- </pp> -->
            {{this.CHANNEL_DETAIL.teamTypeText}}
          </p>
          </div>

        <div class="fl font15  w-100P " style="box-sizing:boborder-box; word-break:break-all; " >
          <!-- <div style="width:20px;" class="fl"> -->
            <!-- <img class="fl" style="width:20px; margin-top:2px; src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"> -->
          <!-- </div> -->

          <p class="font14 textLeft fl " style="word-break:break-all" >
            <!-- <pp class="fl" style="width:50px;"> -->
            <img class="fl img-w20" style="margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘">
            <!-- </pp> -->
            {{this.$changeText(CHANNEL_DETAIL.memoMtext)}}
          </p>
        </div>

        <div class="fl font15  w-100P " style="box-sizing:boborder-box; word-break:break-all; " >

            <p class="font13 commonColor textLeft fl fontBold " style="color:#6768a7; white-space: nowrap;"> 개설일</p>
            <!-- <img class="fl" style="width:20px; margin-top:2px;" src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"> -->
            <!-- <p class="font16 commonColor textLeft fl mleft-05" style="color:#6768a7"> 설명  </p> -->

          <p class="font14 textLeft fl mleft-1" style="word-break:break-all" >{{this.$dayjs(CHANNEL_DETAIL.creDate).format('YYYY-MM-DD')}}</p>
          </div>

      </div>
    </div>
    <div id="ownerChannelEditArea" class="w-100P cursorP fl" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn">
      <div class="fr mbottom-05" @click="editChan" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float:right !important; ">
        <p class="font16 textLeft lightGray fr "  >편집 > </p>
      </div>
    </div>

    <div id="channelCardWrap" class="fl w-100P " :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; flex-direction: row; justify-content:space-around">
      <p class="font16 fl w-100P">구독자 {{CHANNEL_DETAIL.followerCount}}명</p>

      <p class="font16 fl w-100P" style="border-left: 2px solid #00000050">누적 알림 {{CHANNEL_DETAIL.totalContentsCount}}건</p>
      <!-- <p class="font16 fl w-100P" style="border-left: 2px solid #00000050">개설일 {{this.$changeDateFormat(CHANNEL_DETAIL.creDate)}}</p> -->
    </div>

    <div id="userCardWrap" class="fl w-100P" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; flex-direction: row; justify-content: space-between;">

        <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="fl" style="display: flex; align-items: center;">
          <div @click="goProfile" :style="'background-image: url(' + (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.GE_USER.userProfileImg : this.GE_USER.userProfileImg) + ');'" style=" background-size: cover; background-repeat: no-repeat; background-position: center; width:30px; height:30px; border-radius: 100%; border:1.5px solid #6768a7; overflow: hidden;">
            <!-- <img :src="this.GE_USER.userProfileImg" style="width: 30px;" class="fl "/> -->
          </div>
          <div class="mleft-05" style="display:flex; flex-direction: column;">
            <p @click="goProfile" class="font16">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
            <div>
              <p class="fl font14 commonBlack">{{CHANNEL_DETAIL.D_CHAN_AUTH.followTypeText}}</p>
              <p class="fl commonBlack font14 cursorP" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn">(공개)</p>
            </div>
          </div>
          <!-- <p class="fl commonBlack font16">{{userGrade}}</p> -->
        </div>
        <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH && CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="fl" style="display: flex; width: 40%; justify-content: space-around; align-items: center;">
          <div style="padding: 3px 10px; border-radius: 10px; border: 1px solid #ccc;" :style="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn ? 'background-color:#6768a7' : 'background-color:#eee' " >
            <p class="fl font14 cursorP fontBold"  @click="saveMemberButton" :style="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn ? 'color:white' : '' " >공개</p>
            <!-- <p class="fl font14 fontBold"  @click="saveMemberButton" :style="showProfileYn ? 'color:white' : '' " >내정보공개</p> -->
          </div>
          <img class="cursorP img-w20" @click="changeRecvAlimYn" v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn" src="../../../assets/images/common/icon_bell_fillin.svg" alt="">
          <img class="cursorP img-w20" @click="changeRecvAlimYn" v-else src="../../../assets/images/common/icon_bell.svg" alt="">

          <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
              :data-clipboard-text="CHANNEL_DETAIL.copyTextStr">
            <img class="img-w20" src="../../../assets/images/common/icon_share_square.svg" alt="">
          </div>
        </div>

        <div v-if="!CHANNEL_DETAIL.D_CHAN_AUTH.followYn" @click="changeFollowYn" class="w-100P fl" style="min-height:100px;display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <!-- <p class="font20 fontBold">구독하기</p> -->
          <p class="fl w-100P font16 fontBold textLeft"> [ {{changeText(CHANNEL_DETAIL.nameMtext)}} ] 채널을 구독하고 알림을 받아보세요!</p>
          <gBtnSmall @click="changeFollowYn" class="fl w-100P mtop-1 fontBold font14" btnTitle="구독하기" />
        </div>

    </div>

    <div id="followerCancelArea" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && CHANNEL_DETAIL.teamKey !== 377" class="fr" style="padding: 5px 10px; border-radius: 10px; border: 1px solid #ccc;" :style="CHANNEL_DETAIL.D_CHAN_AUTH.followYn ? 'background-color:#DC143C' : 'background-color:#eee' " >
      <p @click="changeFollowYn" class="fl font14 fontBold" :style="CHANNEL_DETAIL.D_CHAN_AUTH.followYn ? 'color:white' : '' " >구독취소</p>
    </div>
    <!-- <div style="width: fit-content; height: 24px; padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">
        <p class="fl fontBold font16 commonBlack">{{followTypeText}}</p>
        <p class="fl commonBlack font16" v-if="showProfileYn">(멤버)</p>
      </div> -->

    <!-- <div id="memberInfoArea" class="chanTextBox" :class="chanBgBlackYn === true ? 'blackTextBox': 'whiteTextBox'" style="height: 30px; float: right; position: absolute; bottom: 3rem; right: 1rem;" >
      <p class="fl font14 fontBold" @click="saveMemberButton" style="">멤버 신청하기 ></p>
    </div>
    <div id="chanInfoArea" class="chanTextBox" :class="chanBgBlackYn === true ? 'blackTextBox': 'whiteTextBox'" style="height: 30px; float: right; position: absolute; top: 19rem; right: 1rem;">
      <p class="fl font14 fontBold" @click="openPop" style="">채널 정보 ></p>
    </div> -->

    <!-- <p class="fl font14 fontBold" @click="openPop" style="">채널 정보 ></p> -->
  </div>
  <!-- <div v-if="this.detailShowYn === false " class="channelItemBox " id="channelItemBox"  style="padding: 1.5rem 1.5rem 0 1rem; margin-top: 350px; overflow: hidden;"> -->
  <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="channelItemBox" ref="channelItemBoxPushListDivCompo" id="channelItemBox"  style="margin-top: 350px; background: rgb(220, 221, 235); padding-top: 0; overflow: hidden;">
    <pushList :targetContents="{targetContentsKey : chanDetail.targetContentsKey, jobkindId : chanDetail.jobkindId }" :chanAlimYn="true" :chanDetail="this.CHANNEL_DETAIL" :chanAlimTargetType="this.chanDetail.targetType" :reloadShowYn="this.reloadShowYn" ref="ChanAlimListPushListCompo" :alimListYn="true" @openPop="openPushDetailPop" style="" :chanDetailKey="this.CHANNEL_DETAIL.teamKey" @numberOfElements='numberOfElements' @targetContentScrollMove='targetContentScrollMove' @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @showToastPop="this.$emit('showToastPop')" @openUserProfile='openItem' @changeMainTab='changeMainTab' isOpen='chanAlim'/>
    <!-- <div v-else style="">
        notiScrollTarget: {
      handler (value, old) {
        alert(value)
      },
      deep: true
    },
      <p>구독하고 알림을 받아보세요!</p>
    </div> -->
  </div>
  <div class="btnPlus" v-show="CHANNEL_DETAIL.D_CHAN_AUTH.adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div>
  <!-- <div class="btnPlus" v-if="adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div> -->
  <div v-if="CHANNEL_DETAIL.detailShowYn" >
    <chanDetailComp ref="chanDetailRef" @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @closeXPop="this.closeDetailPop" @changeshowProfileYn='changeshowProfileYn' :parentshowProfileYn="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn" :adminYn="CHANNEL_DETAIL.D_CHAN_AUTH.adminYn" :alimSubPopYn="alimListToDetail" @pageReload="this.$emit('pageReload', true)" @openPop="openPushDetailPop" @closeDetailPop="this.closeDetailPop" @changeFollowYn="changeFollowYn" :chanDetail="this.CHANNEL_DETAIL" style="background-color: #fff;"></chanDetailComp>
  </div>
  <gConfirmPop :confirmText='errorBoxText' :confirmType='errorBoxType' @no='errorBoxYn=false' v-if="errorBoxYn" @ok="confirmOk"/>
  <div v-if="writePushYn" style="position: absolute; width:100%; height:100%; top:0; left:0;z-index:999">
    <writePush  ref="chanAlimListWritePushRefs"  @closeXPop='closeWritePushPop' :params="writePushData" style="position: absolute; width:100%; height:100%; top:0; left:0;"  @openPop='openItem' :changeMainTab='changeMainTab' @toAlimFromBoard='toAlimFromBoard' />
  </div>
  <div v-if="writeBoardYn" style="position: absolute; width:100%; height:100%; top:0; left:0;z-index:999">
    <boardWrite @closeXPop="closeWritePushPop" @successWrite="successWriteBoard" :propData="writeBoardData" @openPop='openItem' />
  </div>

  <!-- <writePush ref="writePushCompo" v-if="this.targetType === 'writePush'" :params="this.params" @closeXPop="closeXPop" @openPop='openPop' @changePop='changePop' /> -->
  <!-- <gConfirmPop :confirmText='errorMsg' :confirmType='errorBoxType ? "two" : "timeout" ' v-if="errorPopYn" @no='errorPopYn = false'  /> -->
<!-- <gConfirmPop confirmText='' confirmType='' @no='' /> -->

</div>
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
// import a from '../../../assets/images/'
import chanDetailComp from './Tal_chanDetail.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import welcomePopUp from './Tal_chanFollowInfo.vue'
import writePush from '../../popup/D_writeContents.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import boardWrite from '../../board/Tal_boardWrite.vue'
export default {
  data () {
    return {
      smallPopYn: false,
      greetingInfoYn: false,
      reloadShowYn: false,
      alimListToDetail: false,
      box: null,
      scrollDirection: null,
      scrollPosition: null,
      wrapKey: 0,
      detailHeaderShowYn: false,
      memberText: '공개 신청하기 >',
      errorBoxYn: false,
      errorBoxText: '',
      errorBoxType: 'two',
      detailShowYn: false,
      myContentsCount: null,
      greetingType: 'follow',
      sendLoadingYn: false,
      followParam: null,
      openWelcomePopYn: false,
      writePushData: {},
      writePushYn: false,
      writePopId: '',
      titleLongYn: false,
      notiDetail: null,
      systemName: '',
      currentConfirmType: '',
      currentPushListMainTab: 'P',
      requestYn: false,
      axiosQueue: [],
      writeBoardYn: false,
      writeBoardData: {},
      writeBoardPopId: ''
      // errorPopYn: false
    }
  },
  props: {
    chanDetail: {},
    notiScrollTarget: {}
  },
  components: {
    pushList,
    chanDetailComp,
    welcomePopUp,
    writePush,
    boardWrite
  },
  created () {
    this.$emit('openLoading')
    this.readyFunction()
  },
  updated () {
    this.box = this.$refs.scrollBox
    if (this.box) {
      this.box.addEventListener('scroll', this.updateScroll)
      this.box.addEventListener('mousewheel', e => {
        this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      })
    }
  },
  mounted () {
    this.box = this.$refs.scrollBox
    if (this.box) {
      this.box.addEventListener('scroll', this.updateScroll)
      this.box.addEventListener('mousewheel', e => {
        this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      })
    }
  },
  methods: {
    setNotiScroll (key, jobkindId) {
      // alert(jobkindId)
      this.$refs.ChanAlimListPushListCompo.setNotiScroll(key, jobkindId)
    },
    toAlimFromBoard (tab) {
      this.$refs.ChanAlimListPushListCompo.changeMainTab(tab)
    },
    changeMainTab (tab) {
      this.currentPushListMainTab = tab
    },
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    async readyFunction () {
      // // eslint-disable-next-line no-debugger
      // debugger
      if (this.axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
      this.axiosQueue.push('addChanList')
      console.log(this.chanDetail.targetKey)
      await this.$addChanList(this.chanDetail.targetKey)
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
      // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
      this.axiosQueue.splice(queueIndex, 1)
      /* // this.$addChanList(this.chanDetail.targetKey)
      if (!this.CHANNEL_DETAIL || this.CHANNEL_DETAIL.changedYn || !this.CHANNEL_DETAIL.D_CHAN_AUTH || (this.CHANNEL_DETAIL.D_CHAN_AUTH && !this.CHANNEL_DETAIL.D_CHAN_AUTH.settingYn)) {
        // eslint-disable-next-line no-debugger
        debugger
        await this.$addChanList(this.chanDetail.targetKey)
      } */
      this.$emit('closeLoading')
    },
    targetContentScrollMove (wich, jobkindId) {
      if (wich && jobkindId) {
        var tabName = 'P'
        if (jobkindId === 'BOAR') {
          tabName = 'B'
        }
        this.changeMainTab(tabName)
        this.$refs.ChanAlimListPushListCompo.changeMainTab(tabName)
      }
      if (wich || this.chanDetail.targetContentsKey) {
        const unit = this.$refs.scrollBox
        unit.scrollTo({ top: 500, behavior: 'smooth' })
        var blockBox = document.getElementById('summaryWrap')
        blockBox.style.height = 50 + 'px'
        document.getElementById('chanInfoSummary').classList.add('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.add('displayNIm')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')
        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')
        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    setSelectedList (data) {
      this.$refs.chanAlimListWritePushRefs.setSelectedList(data)
    },
    openItem (param) {
      this.$emit('openPop', param)
    },
    editChan () {
      var param = {}
      param.targetType = 'createChannel'
      param.targetKey = this.CHANNEL_DETAIL.teamKey
      param.modiYn = true
      param.ownerYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn
      this.$emit('openPop', param)
    },
    async okMember (inshowProfileYn) {
      var result = null
      this.$emit('openLoading')
      if (inshowProfileYn) {
        this.followParam.showProfileYn = inshowProfileYn
        result = await this.$changeFollower({ follower: this.followParam, doType: 'FM' }, 'save')
      } else {
        result = await this.$changeFollower({ follower: this.followParam, doType: 'FL' }, 'save')
      }
      if (result.result || result) {
        this.sendLoadingYn = false
        if (result.message === 'OK') {
          this.openWelcomePopYn = false
          // var param = {}
          // param.targetType = 'createChannel'
          // param.targetKey = this.CHANNEL_DETAIL.teamKey
          var paramMap = new Map()
          paramMap.set('teamKey', this.chanDetail.targetKey)
          paramMap.set('fUserKey', this.GE_USER)
          var resultList = await this.$getTeamList(paramMap)
          var response = resultList.data.content[0]
          response.detailPageYn = true
          var team = null
          var teamList = this.$getDetail('TEAM', this.chanDetail.targetKey)
          team = teamList[0]
          response.ELEMENTS = team.ELEMENTS
          await this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', response)
          // var queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
          // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)

          // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', this.CHANNEL_DETAIL)
          // this.$emit('changeFollowYn', this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn)
        } else {
          this.errorMsg = result.message
          this.errorPopYn = true
        }
      } else {
        this.sendLoadingYn = false
        this.errorMsg = '실패했습니다. 관리자에게 문의해주세요'
        this.errorPopYn = true
      }

      this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn = true
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', this.CHANNEL_DETAIL)
      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
      this.$emit('closeLoading')
    },
    async confirmOk () {
      this.errorBoxYn = false
      if (this.currentConfirmType === 'follow') {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.admYn === true) {
          this.errorBoxText = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
          this.errorBoxYn = true
        } else {
          var fStatus = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          // eslint-disable-next-line no-new-object
          this.followParam = new Object()
          this.followParam.teamKey = this.CHANNEL_DETAIL.teamKey
          this.followParam.teamName = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
          this.followParam.userKey = this.$store.getters['D_USER/GE_USER'].userKey
          this.followParam.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
          // console.log(this.followParam)
          var result = false
          this.sendLoadingYn = true
          if (fStatus) {
            // console.log(this.followParam)
            if (this.axiosQueue.findIndex((item) => item === 'changeFollower') !== -1) return
            this.axiosQueue.push('changeFollower')
            result = await this.$changeFollower({ follower: this.followParam, doType: 'FL' }, 'del')
            var queueIndex = this.axiosQueue.findIndex((item) => item === 'changeFollower')
            // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
            this.axiosQueue.splice(queueIndex, 1)
            this.CHANNEL_DETAIL.D_CHAN_AUTH = null
            this.CHANNEL_DETAIL.followerKey = null
            this.CHANNEL_DETAIL.userTeamInfo = null
            this.CHANNEL_DETAIL.followerCount -= 1
            // console.log(this.CHANNEL_DETAIL)
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', this.CHANNEL_DETAIL)
            // this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true)
            // console.log(result)

            this.$emit('showToastPop', '구독 취소가 완료되었습니다.')

            if (result.result || result) {
              this.sendLoadingYn = false
              this.$emit('pageReload')
            } else {
              this.sendLoadingYn = false
              this.errorBoxText = '실패했습니다. 관리자에게 문의해주세요'
              this.errorBoxType = 'timeover'
              this.errorBoxYn = true
            }
          } else {
            this.sendLoadingYn = false
            this.openWelcomePopYn = true
          }
        }
      }
    },
    changeFollowYn () {
      // eslint-disable-next-line no-debugger
      debugger
      this.currentConfirmType = 'follow'
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn === true) {
        this.errorBoxText = '구독을 취소하시겠습니까?'
        this.confirmType = 'two'
        this.errorBoxYn = true
      } else {
        this.confirmOk()
      }
    },
    async copyText () {
      var shareItem = { title: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext), text: this.CHANNEL_DETAIL.copyTextStr, url: this.CHANNEL_DETAIL.copyTextStr }
      if (this.$checkMobile() === 'IOS') {
        shareItem = { title: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext), text: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext), url: this.CHANNEL_DETAIL.copyTextStr }
      }
      if (navigator.share) {
        navigator.share(shareItem)
      // } else this.$showToastPop('지원하지 않는 브라우저 입니다.')
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
    },
    async changeRecvAlimYn () {
      console.log(this.axiosQueue)
      if (this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn') !== -1) return
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.CHANNEL_DETAIL.userTeamInfo.followerKey
      var toastText = ''
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn === true) {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn = false
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn
        toastText = '채널 알림이 비활성화 되었습니다'
      } else {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn = true
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.recvAlimYn
        toastText = '채널 알림이 활성화 되었습니다'
      }
      this.axiosQueue.push('changeRecvAlimYn')
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', this.CHANNEL_DETAIL)

      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
      await this.$changeRecvAlimYn({ follower: param })
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey).then(() => {
        var queueIndex = this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn')
        console.log('chan 있어? : ' + queueIndex)
        console.log(this.axiosQueue)
        this.axiosQueue.splice(queueIndex, 1)
        console.log('제거 후 ')
        console.log(this.axiosQueue)
      })
      setTimeout(() => {
        this.$showToastPop(toastText)
      }, 500)
    },
    async saveMemberButton () {
      if (this.axiosQueue.findIndex((item) => item === 'saveMemberButton') !== -1) return
      this.smallPopYn = true
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn === 1) {
        this.confirmMsg = '내 정보 공개가 취소 완료되었습니다.'
        this.addSmallMsg = '(언제든 다시 ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext) + ' 의 정보 공개를 할 수 있습니다.)'
      } else {
        this.confirmMsg = '내 정보 공개가 완료되었습니다.'
        this.addSmallMsg = '(관리자는 당신의 프로필 정보를 조회할 수 있습니다.)'
      }
      var params = null
      var param = {}
      param.followerKey = this.CHANNEL_DETAIL.userTeamInfo.followerKey
      param.teamKey = this.CHANNEL_DETAIL.teamKey
      param.userName = this.$changeText(this.GE_USER.userDispMtext) || this.$changeText(this.GE_USER.userNameMtext)
      param.userKey = this.GE_USER.userKey
      param.showProfileYn = true
      param.teamName = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn === 1) {
        param.showProfileYn = false
        params = { follower: param }
      } else {
        params = { follower: param, doType: 'ME' }
      }

      this.axiosQueue.push('saveMemberButton')
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveFollower',
        param: params
      })
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'saveMemberButton')
      // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
      this.axiosQueue.splice(queueIndex, 1)
      if (result.data.result === true) {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn === 1) {
          this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn = false
        } else {
          this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn = true
        }
      }
      this.openWelcomePopYn = false
      if (this.axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
      this.axiosQueue.push('addChanList')
      await this.$addChanList(this.chanDetail.targetKey)
      queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
      // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
      this.axiosQueue.splice(queueIndex, 1)
      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    numberOfElements (num) {
      this.myContentsCount = num
    },
    changeshowProfileYn (data) {
      this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn = data
    },
    closeDetailPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.detailShowYn = false
    },
    openWritePushPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (this.currentPushListMainTab === 'P') {
      // eslint-disable-next-line no-new-object
        var params = new Object()
        params.targetKey = this.CHANNEL_DETAIL.teamKey
        params.targetType = 'writePush'
        params.targetNameMtext = this.CHANNEL_DETAIL.nameMtext
        params.contentsJobkindId = 'ALIM'
        this.writePushData = {}
        this.writePushData = params
        this.writePopId = 'writePush' + history.length
        history.push(this.writePopId)
        // this.$store.commit('D_HISTORY/updateStack', history)
        this.writePushYn = true
      } else if (this.currentPushListMainTab === 'B') {
        var param = {}
        param.targetType = 'writeBoard'
        param.selectBoardYn = true
        param.contentsJobkindId = 'BOAR'
        param.teamKey = this.CHANNEL_DETAIL.teamKey
        param.targetKey = this.CHANNEL_DETAIL.teamKey
        param.currentTeamKey = this.CHANNEL_DETAIL.teamKey
        this.writeBoardData = {}
        this.writeBoardData = param
        history = this.$store.getters['D_HISTORY/hStack']
        this.writeBoardPopId = 'writePush' + history.length
        history.push(this.writeBoardPopId)

        this.writeBoardYn = true
        // this.$emit('openPop', param)
      }
      this.$store.commit('D_HISTORY/updateStack', history)
      console.log(history)
      // this.$emit('openPop', params)
    },
    openPushDetailPop (param) {
      // console.log('openPushDetailPop')
      // console.log(param)
      if (param.targetType === 'pushDetail' || param.targetType === 'createChannel') {
        // console.log('openPushDetailPop')
        // console.log(param)
        //  && param.targetKey !== this.CHANNEL_DETAIL.teamKey
        param.openActivity = 'chanAlimList'
      } else if (param.targetType === 'chanDetail') {
        if (param.teamKey === this.CHANNEL_DETAIL.teamKey) {
          return
        }
      }
      this.$emit('openPop', param)
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) {
        if (changeTxt.length > 12) { this.titleLongYn = true }
        return changeTxt
      }
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.writePopId === hStack[hStack.length - 1]) {
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeWritePushPop()
      }
    },
    async closeWritePushPop (reloadYn) {
      /* if (reloadYn) {
        await this.refreshList()
      } */
      this.writePushYn = false
      this.writeBoardYn = false
    },
    openPop () {
      this.alimListToDetail = true
      // thiopenPop.detailShowYn = true
      this.detailHeaderShowYn = true
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryWrap')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }

      this.scrollPosition = this.box.scrollTop
      // console.log(this.scrollPosition)
      if (this.scrollDirection === 'down' && this.scrollPosition > 250) {
        blockBox.style.height = 50 + 'px'
        // blockBox.scrollHeight = 100
        document.getElementById('chanInfoSummary').classList.add('displayNIm')
        // document.getElementById('chanInfoSummary2').classList.add('displayBIm')
        // document.getElementById('chanInfoArea').classList.add('displayNIm')
        // document.getElementById('memberInfoArea').classList.add('displayNIm')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.add('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')

        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')

        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 300) {
        document.getElementById('chanInfoSummary').classList.remove('displayNIm')
        // document.getElementById('chanInfoArea').classList.remove('displayNIm')
        // document.getElementById('memberInfoArea').classList.remove('displayNIm')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.remove('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.remove('displayNIm')

        document.getElementById('channelCardWrap').classList.remove('displayNIm')
        document.getElementById('userCardWrap').classList.remove('displayNIm')

        blockBox.style.height = '350px'
        this.box.style.height = ''
        // document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
        document.getElementById('channelItemBox').classList.remove('channelItemBoxHeight')
        this.reloadShowYn = false
      }
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', this.chanDetail.targetKey)
      if (detail && detail.length > 0) {
        console.log(detail)
        if (!detail[0].copyTextStr) {
          // alert('come')
          var title = '[더알림]' + this.$changeText(detail[0].nameMtext)
          var message = this.$changeText(detail[0].memoMtext)
          var this_ = this
          this.$makeShareLink(detail[0].teamKey, 'chanDetail', message, title).then(res => {
            detail[0].copyTextStr = res
            // alert(detail[0].copyTextStr)
            this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', detail[0])
          })
        }
        if (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn) {
          return this.CHANNEL_DETAIL
        } else {
          console.log('CHANNEL_DETAIL')
          console.log(detail[0])
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          console.log('CHANNEL_DETAIL')
          console.log(this.CHANNEL_DETAIL)
          return this.CHANNEL_DETAIL
        } else {
          console.log('CHANNEL_DETAIL')
          console.log('null')
          return null
        }
      }
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    CHANNEL_DETAIL: {
      handler (value, old) {
        if (value && value.D_CHAN_AUTH && value.D_CHAN_AUTH.followYn) {
          this.$emit('followYn')
        }
      },
      deep: true
    },
    GE_RECENT_CHANGE_TEAM (value, old) {
      if (value === this.CHANNEL_DETAIL.teamKey) {
        // console.log('team [' + value + ']의 관련 정보가 변경되었음')
      }
    },
    GE_MAIN_CHAN_LIST (value, old) {
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
            this.closeSubPop()
        } */
    },
    historyStack (value, old) {
    },
    wrapKey () {
      this.refreshList()
    }
  }
}
</script>

<style scoped>

.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}

.chanDetailWrap{
  height: 100vh;
  /* min-height: 900px;
  max-height: 1000px; */
  background-repeat: no-repeat;
  background-size: cover;
}
.officialTitle{
  padding-right: 30px;
}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
/* .chanWhiteBox{ display: flex; flex-direction: column;align-items: center; position: relative; width: 100%; height: calc(100% - 50px); } */
.chanWhiteBox{ display: flex; flex-direction: row;align-items: flex-start; justify-content: center; position: relative; width: 100%; align-items: center; align-content: center; }
.channelItemBoxHeight{height: calc(100% - 50px)!important; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; }
/* .channelItemBox{background-color: #fff; min-height: calc(100% - 250px); position: relative; width: 100%;float: left; box-sizing: border-box;} */
.channelItemBox{background-color: #fff; border-radius: 5px; min-height: calc(100% - 50px); position: relative; width: 100%;float: left; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}

.summaryWrap{height: 350px; width: 100%; float: left; position: absolute;}
.summaryWrap2 {height: 50px;  width: 100%; float: left;}

.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
.chanImgRound{ width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center; position: relative;
  border-radius: 110px;
  border-radius: 100%;
  border: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;  }
#chanInfoSummary2{width: 100%; padding-top: 0; height: 100%;
/* display: none;  */
flex-direction: column; float: left}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */

/* btnPlus common.css로 옮김 */

  span {color: white;}
</style>
