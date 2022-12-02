
<template>
  <div id="alimWrap" v-if="this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH" ref="chanScrollWrap" style="overflow: scroll;" :style="'background-image: url(' + (this.CHANNEL_DETAIL.bgDomainPath ? this.CHANNEL_DETAIL.bgDomainPath + CHANNEL_DETAIL.bgPathMtext : CHANNEL_DETAIL.bgPathMtext) + ')'" class="chanDetailWrap">
      <div id="gChannelPopup" v-if="commonChanPopShowYn" style="display: absolute; top: 0; left: 0; z-index: 999;">
        <gChannelPop :propCateItemKey="this.CHANNEL_DETAIL.cateKey" :propTeamKey="this.CHANNEL_DETAIL.teamKey" :propPopMessage="mChanPopMessage" v-if="this.GE_USER" @closeXPop='closeChannelPop'/>
      </div>
      <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
      <welcomePopUp type="follow" v-if="mOpenWelcomePopShowYn" :chanInfo="CHANNEL_DETAIL" @copyText="copyText" @goChanMain="mOpenWelcomePopShowYn = false" @applyMember="openReqMemPop" />
      <div v-if="mReceptMemPopShowYn" @click="closeReqMemPop" style="position: absolute; width: 100%; height: 100vh; top: 0; left: 0; background: #00000050; z-index: 99999" ></div>
      <recMemberPop :chanDetail="this.CHANNEL_DETAIL" v-if="mReceptMemPopShowYn" @closeXPop="closeReqMemPop" />
      <div class="font20 fontBold" :style="mChanNameLongYn ? 'font-size: 15px !important;': '' " style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex; max-width: calc(100% - 120px);" :class="{officialTitle: CHANNEL_DETAIL.officialYn}" > <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="CHANNEL_DETAIL.officialYn" style="width:30px;" alt="" /> <p class="font20 fontBold textOverdot"  :style="CHANNEL_DETAIL.blackYn === 1 || CHANNEL_DETAIL.blackYn === true ? 'color:white' : 'color: #6768a7' ">{{changeText(CHANNEL_DETAIL.nameMtext)}}</p></div>
      <div id="summaryWrap" v-if="!this.mChanInfoPopShowYn" class="summaryWrap mtop-05" style="padding: 0 1rem;" >
          <div id="chanInfoSummary" ref="chanImg"  class="mt-header chanWhiteBox ">
              <div id="chanAlimListBG" ref="chanAlimListBG" class="chanImgRound" :style="'background-image: url(' + (this.CHANNEL_DETAIL.logoDomainPath ? this.CHANNEL_DETAIL.logoDomainPath + this.CHANNEL_DETAIL.logoPathMtext : this.CHANNEL_DETAIL.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;" ></div>
              <div class="chanTextBox fl mleft-05;" :class="chanBgBlackYn === true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; width:100%; margin-left: 0.5rem;">
                  <div class="fl font16  w-100P">
                      <p class="font15 textLeft fl" >
                          <img class="fl img-w20" style="margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘">
                          {{this.$changeText(this.CHANNEL_DETAIL.cateItemMtext)}}
                      </p>
                  </div>
                  <div class="fl font15 w-100P " style="box-sizing:boborder-box; word-break:break-all; " >
                      <p class="font14 textLeft fl " style="word-break:break-all" >
                          <img class="fl img-w20" style="margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘">
                          {{this.$changeText(CHANNEL_DETAIL.memoMtext)}}
                      </p>
                  </div>
                  <div class="fl font15  w-100P " style="box-sizing:boborder-box; word-break:break-all; " >
                      <p class="font13 commonColor textLeft fl fontBold " style="color:#6768a7; white-space: nowrap;"> 개설일</p>
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
          </div>
          <div id="userCardWrap" class="fl w-100P" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; flex-direction: row; justify-content: space-between;">
              <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="fl" style="display: flex; align-items: center;">
                  <div @click="goProfile" :style="'background-image: url(' + (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.GE_USER.userProfileImg : this.GE_USER.userProfileImg) + ');'" style=" background-size: cover; background-repeat: no-repeat; background-position: center; width:30px; height:30px; border-radius: 100%; border:1.5px solid #6768a7; overflow: hidden;"></div>
                  <div class="mleft-05" style="display:flex; flex-direction: column;">
                      <p @click="goProfile" class="font16 textLeft">{{this.$changeText(this.GE_USER.userDispMtext)}}</p>
                      <div>
                        <p class="fl font14 textLeft commonBlack">{{this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)}}</p>
                      </div>
                  </div>
              </div>
              <div v-if="(!CHANNEL_DETAIL.D_CHAN_AUTH === true || CHANNEL_DETAIL.D_CHAN_AUTH.followYn === undefined)" class="fl w-100P">
                  <match :color="'#6768a7'"/>
              </div>
              <div v-else-if="CHANNEL_DETAIL.D_CHAN_AUTH && CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="fl" style="display: flex; width: 40%; justify-content: space-around; align-items: center;">
                  <div style="padding: 3px 10px; border-radius: 10px; border: 1px solid #ccc;" v-if="(this.CHANNEL_DETAIL.userTeamInfo && this.CHANNEL_DETAIL.userTeamInfo.ownerYn === undefined && CHANNEL_DETAIL.userTeamInfo.memberNameMtext === undefined) || this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH) === '구독자'" >
                    <p class="fl font14 cursorP fontBold commonColor" @click="this.openReqMemPop()" >멤버신청</p>
                  </div>
                  <img class="cursorP img-w20" @click="changeRecvAlimYn" v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn" src="../../../assets/images/common/icon_bell_fillin.svg" alt="">
                  <img class="cursorP img-w20" @click="changeRecvAlimYn" v-else src="../../../assets/images/common/icon_bell.svg" alt="">
                  <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
                      :data-clipboard-text="CHANNEL_DETAIL.copyTextStr">
                      <img class="img-w20" src="../../../assets/images/common/icon_share_square.svg" alt="">
                  </div>
              </div>
              <div v-else-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn == false" class="w-100P fl" style="min-height:100px;display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <p class="fl w-100P font16 fontBold textLeft"> [ {{changeText(CHANNEL_DETAIL.nameMtext)}} ] 채널을 구독하고 알림을 받아보세요!</p>
                  <gBtnSmall @click="changeFollowYn" class="fl w-100P mtop-1 fontBold font14" btnTitle="구독하기" />
              </div>
          </div>

          <div id="followerCancelArea" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && CHANNEL_DETAIL.teamKey !== 377" class="fr" style="padding: 5px 10px; border-radius: 10px; border: 1px solid #ccc;" :style="CHANNEL_DETAIL.D_CHAN_AUTH.followYn ? 'background-color:#DC143C' : 'background-color:#eee' " >
              <p @click="changeFollowYn" class="fl font14 fontBold" :style="CHANNEL_DETAIL.D_CHAN_AUTH.followYn ? 'color:white' : '' " >구독취소</p>
          </div>
      </div>

      <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn" class="channelItemBox" ref="channelItemBoxPushListDivCompo" id="channelItemBox"  style="margin-top: 350px; background: rgb(220, 221, 235); padding-top: 0; overflow: hidden;">
          <pushList @goScroll="this.mChanMainScrollWrap.style.overflow = 'scroll'" @cMemoEditYn="changeMemoEditYn" :targetContents="{targetContentsKey : chanDetail.targetContentsKey, jobkindId : chanDetail.jobkindId }" :chanAlimYn="true" :pChannelDetail="this.CHANNEL_DETAIL" :chanAlimTargetType="this.chanDetail.targetType" ref="ChanAlimListPushListCompo" :alimListYn="true" @openPop="openPushDetailPop" style="" :chanDetailKey="this.CHANNEL_DETAIL.teamKey" @numberOfElements='numberOfElements' @targetContentScrollMove='targetContentScrollMove' @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @openUserProfile='openItem' @changeMainTab='changeMainTab' isOpen='chanAlim' @memoEdit='memoEdit'/>
      </div>

      <div v-else-if="this.mChanInfoPopShowYn" >
          <chanDetailComp ref="chanDetailRef" @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @closeXPop="this.closeDetailPop" @changeshowProfileYn='changeshowProfileYn' :parentshowProfileYn="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn" :adminYn="CHANNEL_DETAIL.D_CHAN_AUTH.adminYn" :alimSubPopYn="alimListToDetail" @pageReload="this.$emit('pageReload', true)" @openPop="openPushDetailPop" @closeDetailPop="this.closeDetailPop" @changeFollowYn="changeFollowYn" :chanDetail="this.CHANNEL_DETAIL" style="background-color: #fff;"></chanDetailComp>
      </div>
      <img id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" @click="openWritePushPop" alt="알림 작성 버튼" style="position: absolute; bottom: 2rem; right: 10%; z-index:9" class="img-78 img-w66">
      <!-- <img id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" v-if="CHANNEL_DETAIL.D_CHAN_AUTH && (CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext || CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1)  && (CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1 || CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === true) && (mPushListMainTab === 'P' || mPushListMainTab === 'A') && this.mWriteBtnShowYn" @click="openWritePushPop" alt="알림 작성 버튼" style="position: absolute; bottom: 2rem; right: 10%; z-index:9" class="img-78 img-w66"> -->
      <!-- <img id='writeBtn' src="../../../assets/images/button/Icon_WriteBoardBtn.png" v-if="mPushListMainTab === 'B' && this.mWriteBtnShowYn" @click="openWritePushPop" alt="게시글 작성 버튼" style="position: absolute; bottom: 2rem; right: 10%; " class="img-78 img-w66"> -->
      <gConfirmPop :confirmText='mErrorPopBodyStr' :confirmType='mErrorPopBtnType' @no='mErrorPopShowYn=false' v-if="mErrorPopShowYn" @ok="confirmOk"/>
      <div v-if="writeBottSheetYn" @click="writeBottSheetYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
      <transition name="showUp">
        <writeBottSheet v-if="writeBottSheetYn === true" @openPop='openWriteContentsPop' @closePop='writeBottSheetYn = false' :propTeamKey='CHANNEL_DETAIL.teamKey' @openMember='openChannelMsgPop()' />
      </transition>
  </div>
  <writeContents  v-if="writeContentsYn"  ref="chanAlimListWritePushRefs" :contentType="mPushListMainTab === 'P' ? 'ALIM' : 'BOAR'" @closeXPop='closeWritePushPop' :params="mWriteAlimData"  @openPop='openItem' :changeMainTab='changeMainTab' @toAlimFromBoard='toAlimFromBoard' :propData="mWriteBoardData" />
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
import match from '../../popup/member/Tal_matching.vue'
import chanDetailComp from './Tal_chanDetail.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import welcomePopUp from './Tal_chanFollowInfo.vue'
import writeContents from '../../popup/D_writeContents.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import recMemberPop from '../../popup/member/D_recMemberPop.vue'
// import boardWrite from '../../board/Tal_boardWrite.vue'
import writeBottSheet from '../../pageComponents/main/unit/D_contentsWriteBottSheet.vue'
export default {
  data () {
    return {
      smallPopYn: false,
      alimListToDetail: false,
      mChanMainScrollWrap: null,
      mChanMainScrollDirection: null,
      mChanMainScrollPosition: null,
      mErrorPopShowYn: false,
      mErrorPopBodyStr: '',
      mErrorPopBtnType: 'two',
      mChanInfoPopShowYn: false,
      myContentsCount: null,
      mSaveFollowerParam: null,
      mOpenWelcomePopShowYn: false,
      mWriteAlimData: {},
      writeContentsYn: false,
      writeAlimPopId: '',
      mChanNameLongYn: false,
      mSaveFollowerType: '',
      mPushListMainTab: 'A',
      axiosQueue: [],
      mWriteBoardData: {},
      mWriteBoardPopId: '',
      mReceptMemPopShowYn: false,
      mWriteBtnShowYn: true,
      mMakeDeepLinkIng: false,
      mChanPopMessage: '',
      commonChanPopShowYn: false,
      writeBottSheetYn: false
      // errorPopYn: false
    }
  },
  props: {
    chanDetail: {},
    notiScrollTarget: {},
    pPopId: {},
    popYn: { type: Boolean, default: false }
  },
  components: {
    writeBottSheet,
    pushList,
    chanDetailComp,
    welcomePopUp,
    writeContents,
    recMemberPop,
    // boardWrite,
    match
  },
  created () {
    this.$emit('openLoading')
    this.readyFunction()
  },
  // updated () {
  //   this.mChanMainScrollWrap = this.$refs.chanScrollWrap
  //   if (this.mChanMainScrollWrap) {
  //     this.mChanMainScrollWrap.addEventListener('scroll', this.updateScroll)
  //     this.mChanMainScrollWrap.addEventListener('mousewheel', e => {
  //       this.mChanMainScrollDirection = e.deltaY > 0 ? 'down' : 'up'
  //     })
  //   }
  // },
  mounted () {
    this.mChanMainScrollWrap = this.$refs.chanScrollWrap
    if (this.mChanMainScrollWrap) {
      this.mChanMainScrollWrap.addEventListener('scroll', this.updateScroll)
      this.mChanMainScrollWrap.addEventListener('mousewheel', e => {
        this.mChanMainScrollDirection = e.deltaY > 0 ? 'down' : 'up'
      })
    }
  },
  methods: {
    openChannelMsgPop () {
      this.writeBottSheetYn = false
      this.commonChanPopShowYn = true
    },
    openWriteContentsPop (openPopParam) {
      this.writeBottSheetYn = false
      this.$emit('openPop', openPopParam)
    },
    async closeChannelPop (refreshYn) {
      this.commonChanPopShowYn = false
      if (refreshYn === true) {
        await this.$addChanList(this.chanDetail.targetKey)
      }
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
        const unit = this.$refs.chanScrollWrap
        unit.scrollTo({ top: 500, behavior: 'smooth' })
        var blockBox = document.getElementById('summaryWrap')
        blockBox.style.height = 50 + 'px'
        document.getElementById('chanInfoSummary').classList.add('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.add('displayNIm')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')
        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')
        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
      }
    },
    openReqMemPop () {
      // 재준
      this.commonChanPopShowYn = true
      // if (this.CHANNEL_DETAIL.cateKey !== 3) {
      //   this.mReceptMemPopShowYn = true
      // } else {
      //   this.commonChanPopShowYn = true
      // }
    },
    async closeReqMemPop (yn) {
      console.log(yn)
      // 그냥 닫기 눌렀을 때 환영합니다. 팝업이 등장하기 위해 그냥 닫으면 false가 오고 신청을 누르면 아무것도 안오기에 undefind가 뜰 것 입니다.
      if (yn === false) {
      } else {
        await this.readyFunction()
        this.mOpenWelcomePopShowYn = false
      }
      this.mReceptMemPopShowYn = false
    },
    memoEdit (editYn) {
      var btn = document.getElementById('writeBtn')
      if (editYn === true) {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
    },
    changeMemoEditYn (memoEditYn) {
      this.mWriteBtnShowYn = memoEditYn
    },
    toAlimFromBoard (tab) {
      this.$refs.ChanAlimListPushListCompo.changeMainTab(tab)
    },
    changeMainTab (tab) {
      this.mPushListMainTab = tab
    },
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      param.popHeaderText = '내 정보'
      this.$emit('openPop', param)
    },
    async readyFunction () {
      this.$showAxiosLoading(true)
      // eslint-disable-next-line no-debugger
      debugger
      /* if (this.axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
      this.axiosQueue.push('addChanList') */
      await this.$addChanList(this.chanDetail.targetKey)
      /* var queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
      this.axiosQueue = this.axiosQueue.splice(queueIndex, 1) */
      if (this.CHANNEL_DETAIL) {
        if (!this.CHANNEL_DETAIL.copyTextStr && !this.mMakeDeepLinkIng) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.mMakeDeepLinkIng = true
          var title = '[더알림]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
          var message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
          var this_ = this
          this.$makeShareLink(this.CHANNEL_DETAIL.teamKey, 'chanDetail', message, title).then(res => {
            console.log('복사링크 없음!!!!!!!!!!!!!!!!!!!!!!!!')
            this.CHANNEL_DETAIL.copyTextStr = res
            this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
            this_.mMakeDeepLinkIng = false
          })
        }
      }
      this.$emit('closeLoading')
      this.$showAxiosLoading(false)
      /* if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.userTeamInfo && (this.CHANNEL_DETAIL.userTeamInfo.memberInfoList.length === 0 || !this.CHANNEL_DETAIL.userTeamInfo.memberInfoList[0].memberTypeKey)) this.commonChanPopShowYn = true */
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
      param.popHeaderText = '채널 수정'
      param.targetKey = this.CHANNEL_DETAIL.teamKey
      param.modiYn = true
      param.ownerYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn
      this.$emit('openPop', param)
    },
    reloadPage () {
      this.readyFunction()
    },
    async okMember () {
      var result = null
      this.$emit('openLoading')
      result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'FL' }, 'save')
      if (result.result || result) {
        if (result.message === 'OK') {
          this.mOpenWelcomePopShowYn = false
          // await this.$addChanList(this.CHANNEL_DETAIL.teamKey)
          // var queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
          // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)

          // this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', this.CHANNEL_DETAIL)
          // this.$emit('changeFollowYn', this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn)
        } else {
          this.errorMsg = result.message
          this.errorPopYn = true
        }
      } else {
        this.errorMsg = '실패했습니다. 관리자에게 문의해주세요'
        this.errorPopYn = true
      }

      this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn = true
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
      this.$emit('closeLoading')
    },
    async confirmOk () {
      console.log(1223)
      this.mErrorPopShowYn = false
      if (this.mSaveFollowerType === 'follow') {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.admYn === true) {
          this.mErrorPopBodyStr = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
          this.mErrorPopShowYn = true
        } else {
          var fStatus = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          // eslint-disable-next-line no-new-object
          this.mSaveFollowerParam = new Object()
          this.mSaveFollowerParam.teamKey = this.CHANNEL_DETAIL.teamKey
          this.mSaveFollowerParam.teamName = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
          this.mSaveFollowerParam.userKey = this.$store.getters['D_USER/GE_USER'].userKey
          this.mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
          // console.log(this.mSaveFollowerParam)
          var result = false
          if (fStatus) {
            // console.log(this.mSaveFollowerParam)
            if (this.axiosQueue.findIndex((item) => item === 'changeFollower') !== -1) return
            this.axiosQueue.push('changeFollower')
            result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'FL' }, 'del')
            var queueIndex = this.axiosQueue.findIndex((item) => item === 'changeFollower')
            // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
            this.axiosQueue.splice(queueIndex, 1)
            this.CHANNEL_DETAIL.D_CHAN_AUTH = null
            this.CHANNEL_DETAIL.followerKey = null
            this.CHANNEL_DETAIL.userTeamInfo = null
            this.CHANNEL_DETAIL.followerCount -= 1
            // console.log(this.CHANNEL_DETAIL)
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
            // this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true)
            // console.log(result)

            this.$emit('showToastPop', '구독 취소가 완료되었습니다.')

            if (result.result || result) {
              this.$emit('pageReload')
            } else {
              this.mErrorPopBodyStr = '실패했습니다. 관리자에게 문의해주세요'
              this.mErrorPopBtnType = 'timeover'
              this.mErrorPopShowYn = true
            }
          } else {
            await this.okMember()
            this.mChanPopMessage = '[' + this.$changeText(this.CHANNEL_DETAIL.nameMtext) + '] 채널의 구독자가 되었습니다.<br>더 많은 활동을 위해 멤버 신청을 해주세요!'
            this.commonChanPopShowYn = true
          }
        }
      }
    },
    changeFollowYn () {
      this.mSaveFollowerType = 'follow'
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn === true) {
        this.mErrorPopBodyStr = '구독을 취소하시겠습니까?'
        this.confirmType = 'two'
        this.mErrorPopShowYn = true
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
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
    },
    async changeRecvAlimYn () {
      // console.log(this.axiosQueue)
      if (this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn') !== -1) return
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.CHANNEL_DETAIL.userTeamInfo.followerKey
      var toastText = ''
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn === true) {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn = false
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn
        toastText = '채널 알림이 비활성화 되었습니다'
      } else {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn = true
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn
        toastText = '채널 알림이 활성화 되었습니다'
      }
      this.axiosQueue.push('changeRecvAlimYn')
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])

      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
      await this.$changeRecvAlimYn({ follower: param })
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey).then(() => {
        var queueIndex = this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn')
        this.axiosQueue.splice(queueIndex, 1)
      })
      setTimeout(() => {
        this.$showToastPop(toastText)
      }, 500)
    },
    numberOfElements (num) {
      this.myContentsCount = num
    },
    closeDetailPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.mChanInfoPopShowYn = false
    },
    openWritePushPop () {
      this.writeBottSheetYn = true
      // var history = this.$store.getters['D_HISTORY/hStack']
      // if (this.mPushListMainTab === 'A') {
      //   this.writeBottSheetYn = true
      //   return
      // }
      // if (this.mPushListMainTab === 'P') {
      // // eslint-disable-next-line no-new-object
      //   var params = new Object()
      //   params.targetKey = this.CHANNEL_DETAIL.teamKey
      //   params.targetType = 'writeContents'
      //   params.targetNameMtext = this.CHANNEL_DETAIL.nameMtext
      //   params.contentsJobkindId = 'ALIM'
      //   this.mWriteAlimData = {}
      //   this.mWriteAlimData = params
      //   this.writeAlimPopId = 'writeContents' + history.length
      //   // eslint-disable-next-line no-debugger
      //   debugger
      //   this.writeAlimPopId = this.$setParentsId(this.pPopId, this.writeAlimPopId)
      //   history.push(this.writeAlimPopId)
      //   // this.$store.commit('D_HISTORY/updateStack', history)
      //   // this.writeContentsYn = true
      // } else if (this.mPushListMainTab === 'B') {
      //   var param = {}
      //   param.targetType = 'writeContents'
      //   param.selectBoardYn = true
      //   param.contentsJobkindId = 'BOAR'
      //   param.teamKey = this.CHANNEL_DETAIL.teamKey
      //   param.targetKey = this.CHANNEL_DETAIL.teamKey
      //   param.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      //   this.mWriteBoardData = {}
      //   this.mWriteBoardData = param
      //   history = this.$store.getters['D_HISTORY/hStack']
      //   this.mWriteBoardPopId = 'writeContents' + history.length
      //   this.mWriteBoardPopId = this.$setParentsId(this.pPopId, this.mWriteBoardPopId)
      //   history.push(this.mWriteBoardPopId)

      //   // this.$emit('openPop', param)
      // }
      // this.writeContentsYn = true
      // this.$store.commit('D_HISTORY/updateStack', history)
      // this.$emit('openPop', params)
    },
    openPushDetailPop (param) {
      if (param.targetType === 'contentsDetail' || param.targetType === 'createChannel') {
        param.openActivity = 'chanAlimList'
      }
      if (param.targetType === 'createChannel') {
        param.popHeaderText = '채널 수정'
      } else if (param.targetType === 'chanDetail') {
        if (param.targetKey === this.CHANNEL_DETAIL.teamKey) {
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
        if (changeTxt.length > 12) { this.mChanNameLongYn = true }
        return changeTxt
      }
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      if (this.writeAlimPopId === hStack[hStack.length - 1]) {
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeWritePushPop()
      } else if (this.mWriteBoardPopId === hStack[hStack.length - 1]) {
        // var history = this.$store.getters['D_HISTORY/hStack']
        // var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeWritePushPop()
      }
    },
    async closeWritePushPop (reloadYn) {
      this.writeContentsYn = false
    },
    openPop () {
      this.alimListToDetail = true
      // thiopenPop.mChanInfoPopShowYn = true
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryWrap')
      if (this.mChanMainScrollWrap.scrollTop > this.mChanMainScrollPosition) {
        this.mChanMainScrollDirection = 'down'
      } else if (this.mChanMainScrollWrap.scrollTop < this.mChanMainScrollPosition) {
        this.mChanMainScrollDirection = 'up'
      }

      this.mChanMainScrollPosition = this.mChanMainScrollWrap.scrollTop
      if (this.mChanMainScrollDirection === 'down' && this.mChanMainScrollPosition > 250) {
        blockBox.style.height = 50 + 'px'
        if (this.mChanMainScrollPosition > 290) this.mChanMainScrollWrap.style.overflow = 'hidden'

        document.getElementById('chanInfoSummary').classList.add('displayNIm')

        // 더알림 채널은 구독취소버튼이 없으므로 아래의 클래스가 v-if에 의해 생성되지 않으므로 에러가 나기에 추가함
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.add('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')

        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')

        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
      } else if (this.mChanMainScrollDirection === 'up' && this.mChanMainScrollPosition < 300) {
        document.getElementById('chanInfoSummary').classList.remove('displayNIm')
        // document.getElementById('chanInfoArea').classList.remove('displayNIm')
        // document.getElementById('memberInfoArea').classList.remove('displayNIm')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== 377) document.getElementById('followerCancelArea').classList.remove('displayNIm')

        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.remove('displayNIm')

        document.getElementById('channelCardWrap').classList.remove('displayNIm')
        document.getElementById('userCardWrap').classList.remove('displayNIm')

        blockBox.style.height = '350px'
        this.mChanMainScrollWrap.style.height = ''
        // document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
        document.getElementById('channelItemBox').classList.remove('channelItemBoxHeight')
      }
    }
    /* changeshowProfileYn (data) {
      this.CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn = data
    }, */
    /* async saveMemberButton () {
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
      this.mOpenWelcomePopShowYn = false
      if (this.axiosQueue.findIndex((item) => item === 'addChanList') !== -1) return
      this.axiosQueue.push('addChanList')
      await this.$addChanList(this.chanDetail.targetKey)
      queueIndex = this.axiosQueue.findIndex((item) => item === 'addChanList')
      // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
      this.axiosQueue.splice(queueIndex, 1)
    } */
  },
  computed: {
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', this.chanDetail.targetKey)
      if (detail && detail.length > 0) {
        if (detail[0].blackYn) this.$emit('bgcolor', detail[0].blackYn)

        if (detail[0] && (detail[0].blackYn !== undefined && detail[0].blackYn !== null && detail[0].blackYn !== '')) {
          this.$emit('bgcolor', detail[0].blackYn)
        } else {
          this.$emit('bgcolor', false)
        }

        // eslint-disable-next-line no-debugger
        debugger
        if (!detail[0].D_CHAN_AUTH || detail[0].D_CHAN_AUTH === true || (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          if (this.CHANNEL_DETAIL && (this.CHANNEL_DETAIL.blackYn !== undefined && this.CHANNEL_DETAIL.blackYn !== null && this.CHANNEL_DETAIL.blackYn !== '')) {
            this.$emit('bgcolor', this.CHANNEL_DETAIL.blackYn)
          } else {
            this.$emit('bgcolor', false)
          }
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.mChanMainScrollPosition + 'px'
      }
    },
    REQ_MEM_OBJ () {
      if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.userTeamInfo && this.CHANNEL_DETAIL.userTeamInfo.reqMemberStatus) {
        return { reqMemberStatus: this.CHANNEL_DETAIL.userTeamInfo.reqMemberStatus, reqMemberStr: this.CHANNEL_DETAIL.userTeamInfo.reqMemberStr }
      } else {
        return { reqMemberStatus: '00', reqMemberStr: null }
      }
    },
    GE_CHANNEL_NOTI_QUEUE () {
      return this.$store.getters['D_CHANNEL/GE_CHANNEL_NOTI_QUEUE']
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
        var blackYn = false
        if (value && (value.blackYn !== undefined && value.blackYn !== null && value.blackYn !== '')) {
          if (value.blackYn === 1) {
            blackYn = true
          }
        }
        this.$emit('bgcolor', blackYn)
      },
      deep: true
    },
    GE_RECENT_CHANGE_TEAM (value, old) {
      // if (value === this.CHANNEL_DETAIL.teamKey) {
      // console.log('team [' + value + ']의 관련 정보가 변경되었음')
      // }
    },
    GE_MAIN_CHAN_LIST (value, old) {
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.pPopId === hStack[hStack.length - 1]) {
            this.closeSubPop()
        } */
    },
    historyStack (value, old) {
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
