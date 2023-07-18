<template>
  <div id="alimWrap" v-if="CHANNEL_DETAIL && CHANNEL_DETAIL.D_CHAN_AUTH" ref="chanScrollWrap" style="overflow: scroll;" :style="settingBackground" class="chanDetailWrap">
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index: 100;" v-if="mFollowerListPopShowYn" @click="closeFollowerList"></div>
    <followerList v-if="mFollowerListPopShowYn" :pManagerList="mManagerList" :pClosePop="closeFollowerList"  :pOpenProfilePop="openProfilePop"  />
    <div style="background-color:#00000050; width:100%; height:100vh; position:absolute; top:0; left:0; z-index: 100;" v-if="mUserDetailPopShowYn" @click="closeFollowerList"></div>
    <userDetailPop v-if="mUserDetailPopShowYn" :propData="mPopParam" :pClosePop="closeUserDetailPop" />
    <div id="gChannelPopup" v-if="commonChanPopShowYn" style="display: absolute; top: 0; left: 0; z-index: 999;">
      <gChannelPop :propCateItemKey="CHANNEL_DETAIL.cateKey" @openPop="openCertiPop" :propTeamKey="CHANNEL_DETAIL.teamKey" :propPopMessage="mChanPopMessage" v-if="this.GE_USER" @closeXPop='closeChannelPop' />
    </div>
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
    <!-- <div v-if="mReceptMemPopShowYn" @click="closeReqMemPop" style="position: absolute; width: 100%; height: 100vh; top: 0; left: 0; background: #00000050; z-index: 99999">
    </div> -->
    <!-- <recMemberPop :chanDetail="CHANNEL_DETAIL" v-if="mReceptMemPopShowYn" @closeXPop="closeReqMemPop" /> -->
    <div class="font20 fontBold" :style="mChanNameLongYn ? 'font-size: 15px !important;' : ''" style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex; max-width: calc(100% - 120px);" :class="{ officialTitle: CHANNEL_DETAIL.officialYn }"> <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="CHANNEL_DETAIL.officialYn" style="width:30px;" alt="" />
      <p class="font20 fontBold textOverdot" :style="CHANNEL_DETAIL.blackYn === 1 || CHANNEL_DETAIL.blackYn === true ? 'color:white' : 'color: #6768a7'">
        {{ changeText(CHANNEL_DETAIL.nameMtext) }}
      </p>
    </div>
    <div id="summaryWrap" ref="summaryWrap" v-if="!mChanInfoPopShowYn" class="summaryWrap mtop-05">

      <div id="chanInfoSummary" ref="chanInfoSummary" style="background-position: center; width:100%; height:100px; position: relative; background-size: contain;background-position-y: 40px;background-repeat: no-repeat;">
        <div class="w100P h100P" style="">
          <!-- <img src="../../../assets/images/channel/chanBgImg.jpeg" style="width:100%; height: calc(100% + 50px); position: absolute; left: 0; top: -50px;" /> -->
          <div class="w100P" style="height: calc(100% + 50px); position: absolute; left: 0; top: -50px; background: linear-gradient(to bottom, rgba(20, 20, 20, 0) 40%,rgba(20, 20, 20, 0.25) 50%,rgba(20, 20, 20, 0.5) 70%,rgba(20, 20, 20, 0.6) 90%,rgba(20, 20, 20, 0.8) 100%);"></div>
          <!-- <div class="font16 fontBold textLeft nameTitleSmall" style=" position: absolute; left: 125px;bottom: 35px; color: white;">{{ propParams.areaInfo.bdAreaDesc }} > {{ changeText(CHANNEL_DETAIL.nameMtext) }}</div> -->
          <div class="font16 fontBold textLeft nameTitleSmall" style=" position: absolute; left: 125px;bottom: 35px; color: white;">Gerogia Tech > {{ changeText(CHANNEL_DETAIL.nameMtext) }}</div>
          <div class="font22 fontBold textLeft nameTitleBig" style=" position: absolute; left: 125px;bottom: 5px; color: white;">{{ changeText(CHANNEL_DETAIL.nameMtext) }}</div>
          <div @click="test" id="chanAlimListBG" ref="chanAlimListBG" class="chanImgRound" :style="'background-image: url(' + (CHANNEL_DETAIL.logoDomainPath ? this.CHANNEL_DETAIL.logoDomainPath + this.CHANNEL_DETAIL.logoPathMtext : this.CHANNEL_DETAIL.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
          <!--follow-->
          <gBtnSmall style="position: absolute; right: 5px; bottom: 5px;" @click="changeFollowYn" v-if="!CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !GE_USER.unknownYn" class="fl w-100P fontBold font14" :btnTitle="$t('COMM_BTN_SUB')" />
          <!--following-->
          <gBtnSmall style="position: absolute; right: 5px; bottom: 5px;" @click="changeFollowYn" class="fl w-100P fontBold font14" ref="followerCancelArea" id="followerCancelArea" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY" :btnTitle="$t('COMM_BTN_UNSUB')" />
        </div>

        <div class="chanInfoWrap" style="background: white; border-bottom: 1px solid #ccc; width: 100%; float: left; min-height:118px; padding: 15px; box-sizing:border-box; word-break:break-all">
          <div class="h100P fl flexCenter" style="width: 100px; padding-top: 50px;">
            <div class="cursorP" style="width: 40px; height: 40px; margin-right: 10px; background: #f1f1f1; border-radius: 30px; float:left; display: flex; justify-content: center; align-items: center;" @click="addToFavlist">
              <img @click="ImgClick" class="cursorP" width="20" height="20" :src="CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey? require('@/assets/images/channel/icon_star_fill.svg'):require('@/assets/images/channel/icon_star.svg')" alt="">
            </div>
            <div class="cursorP" style="width: 40px; height: 40px; background: #f1f1f1; border-radius: 30px; float:left; display: flex; justify-content: center; align-items: center;" data-clipboard-action="copy" id="copyTextBody" @click="copyText" :data-clipboard-text="CHANNEL_DETAIL.copyTextStr">
              <img src='../../../assets/images/contents/icon_share.png' width="20" height="20"/>
            </div>
          </div>
          <div class="h100P fl mleft-1" style="position: relative; display: flex; align-items: center; flex-direction: column; border-radius: 5px; padding: 10px; border: 2px solid #ccc; width: calc(100% - 100px - 1rem);">
            <div class="fontBold fl w100P font14 textLeft" style="word-break:break-all;">{{ $changeText(CHANNEL_DETAIL.memoMtext) }}</div>
            <div class="w100P fl" style="display: flex; align-items: space-between;">
              <div @click="openFollowerPop" class="font14" style="float: left; margin-right:20px">Follower <span style="color:black; text-decoration: underline;" class="fontBold">{{ CHANNEL_DETAIL.followerCount }}</span></div>
              <div class="font14">Total Contents <span class="fontBold" style="color:black;">{{ CHANNEL_DETAIL.totalContentsCount }}</span></div>
              <!-- <div v-if="mChanInfo.managerList" class="fontBold font14" style="float: left;">Manager: <span style="color:black; font-weight: 1000;">{{ mChanInfo.managerList.length }}</span></div> -->
            </div>
            <div class="w100P fl font14 textLeft">My Status <span class="fontBold" style="color:black;">{{ this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)? this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH): '-' }}</span></div>
            <!-- <div class="fr mbottom-05" @click="editChan" :class="chanBgBlackYn === true ? 'blackTextBox' : 'whiteTextBox'" style="float:right !important; ">
              <p class="font16 textLeft lightGray fr ">편집 > </p>
            </div> -->
            <!-- <div ref="ownerChannelEditArea" class="w100P cursorP fl" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn || (CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 && CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext)">
              <div v-if="GE_USER.userKey === 192 || GE_USER.userKey === 228 || GE_USER.userKey === 382" class="fr mright-05 mbottom-05" @click="getTeamToken" :class="chanBgBlackYn === true ? 'blackTextBox' : 'whiteTextBox'" style="float:right !important; background-color:#DC143C; color: #FFFFFF;">
                <p class="font16 textLeft fr" style="color: #FFFFFF!important;">채널아이디 발급 </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="channelItemBox" ref="channelItemBox" style="background: rgb(220, 221, 235); padding-top: 0; overflow: hidden;">
      <pushList :pUnknownYn="mUnknownYn" @openImgPop="openImgPop" @goScroll="mChanMainScrollWrap.style.overflow = 'scroll'" :initData="this.mChanInfo.initData.contentsList" @cMemoEditYn="changeMemoEditYn"
        :targetContents="{ targetContentsKey: mChanInfo.targetContentsKey, jobkindId: mChanInfo.jobkindId }" :chanAlimYn="true" :pChannelDetail="this.CHANNEL_DETAIL" :chanAlimTargetType="this.mChanInfo.targetType"
        ref="ChanAlimListPushListCompo" :alimListYn="true" @openPage="openPage" :chanDetailKey="this.CHANNEL_DETAIL.teamKey" @numberOfElements='numberOfElements'
        @targetContentScrollMove='targetContentScrollMove' @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @openPop="openWriteContentsPop" @openUserProfile='openItem' @changeMainTab='changeMainTab' isOpen='chanAlim' @memoEdit='memoEdit' />
    </div>

    <div v-if="this.mChanInfoPopShowYn">
      <chanDetailComp ref="chanDetailRef" @openLoading="this.$emit('openLoading')"
        @closeLoading="this.$emit('closeLoading')" @closeXPop="this.closeDetailPop" @changeshowProfileYn='changeshowProfileYn' :parentshowProfileYn="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn" :adminYn="CHANNEL_DETAIL.D_CHAN_AUTH.adminYn" :alimSubPopYn="alimListToDetail"
        @pageReload="this.$emit('pageReload', true)" @openPop="openPushDetailPop" @closeDetailPop="this.closeDetailPop" @changeFollowYn="changeFollowYn" :chanDetail="this.CHANNEL_DETAIL" style="background-color: #fff;">
      </chanDetailComp>
    </div>
    <img v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !GE_USER.unknownYn" id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" @click="openWritePushPop" alt="알림 작성 버튼" style="position: absolute; bottom: 70px; right: 10%; z-index:9; cursor: pointer;" class="img-78 img-w66">
    <gConfirmPop :confirmText='mErrorPopBodyStr' :confirmType='mErrorPopBtnType' @no='mErrorPopShowYn = false' v-if="mErrorPopShowYn" @ok="confirmOk" />
    <div v-if="writeBottSheetYn" @click="writeBottSheetYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
    <transition name="showUp">
      <writeBottSheet v-if="writeBottSheetYn === true" @openPop='openWriteContentsPop' @closePop='writeBottSheetYn = false' :propTeamKey='CHANNEL_DETAIL.teamKey' @openMember='openChannelMsgPop()' />
    </transition>
  </div>
  <div v-if="writeContentsYn === true" style="position: absolute; top:0; left:0; z-index:10; background:#00000050; width: 100vw; min-height: 100vh;" class=""></div>
  <writeContents v-if="writeContentsYn === true" ref="chanAlimListWritePushRefs" :contentType="mPushListMainTab === 'P' ? 'ALIM' : 'BOAR'" @closeXPop='closeWritePushPop' :params="mWriteAlimData"
    @openPop='openItem' :changeMainTab='changeMainTab' @toAlimFromBoard='toAlimFromBoard' :propData="mWriteBoardData" />
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
import chanDetailComp from '../../../components/pageComponents/channel/Tal_chanDetail.vue'
import pushList from './UB_pushList'
import writeContents from '../../../components/popup/D_writeContents.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
// import recMemberPop from '../../../components/popup/member/D_recMemberPop.vue'
// import boardWrite from '../../board/Tal_boardWrite.vue'
import writeBottSheet from '../../../components/pageComponents/main/unit/D_contentsWriteBottSheet.vue'
import followerList from '../../../components/UB/popup/UB_followerList.vue'
import userDetailPop from '../../../components/UB/popup/UB_userDetailPop.vue'
// import unknownLoginPop from '@/components/pageComponents/channel/D_unknownLoginPop.vue'
// import { AES, enc } from 'crypto-js'
export default {
  data () {
    return {
      imgSource: '/resource/common/memIconPublic.svg',
      isImgChanged: false,
      mUnknownLoginPopYn: false,
      mUnknownYn: false,
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
      writeBottSheetYn: false,
      mwWidth: 0,
      mwHeight: 0,
      prevVisualViewport: 0,
      mDirectTeamKey: null,
      mChanInfo: {},
      mFollowerListPopShowYn: false,
      mManagerList: [],
      mUserDetailPopShowYn: false,
      mPopParam: {},
      selectMemberObj: {},
      mMemberTypeList: []
      // errorPopYn: false
    }
  },
  props: {
    propParams: {},
    pClearInfo: Function,
    pAreaInfo: {},
    pGoChannelMain: Function
    // notiScrollTarget: {},
    // pPopId: {},
    // popYn: { type: Boolean, default: false }
  },
  components: {
    pushList,
    writeBottSheet,
    chanDetailComp,
    writeContents,
    // recMemberPop,
    followerList,
    userDetailPop
  //   unknownLoginPop
  },
  created () {
    this.getMemberTypeList()
    // eslint-disable-next-line no-debugger
    debugger
    // this.$emit('openLoading')
    // this.$showAxiosLoading(true)
    if (this.propParams && this.propParams.targetType === 'chanDetail' && this.propParams.initData) {
      this.mChanInfo = this.propParams
      if (this.mChanInfo.initData.team.D_CHAN_AUTH && this.mChanInfo.initData.team.D_CHAN_AUTH.followYn) {
        this.$emit('followYn')
      }
      if (this.CHANNEL_DETAIL) {
        console.log(this.mChanInfo.initData.team.copyTextStr === undefined)
        if ((this.mChanInfo.initData.team.copyTextStr === undefined && this.CHANNEL_DETAIL.copyTextStr === undefined) && !this.mMakeDeepLinkIng) {
          this.mMakeDeepLinkIng = true
          const title = '[uniBuzzy]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
          const message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
          const this_ = this
          this.$makeShareLink(this.CHANNEL_DETAIL.teamKey, 'chanDetail', message, title).then(res => {
            this.CHANNEL_DETAIL.copyTextStr = res
            this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
            this_.mMakeDeepLinkIng = false
          })
        }
      }
    } else {
      this.getChanMain()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.calcSummaryWrapH()
    })
    this.mChanMainScrollWrap = this.$refs.chanScrollWrap
    if (this.mChanMainScrollWrap) {
      this.mChanMainScrollWrap.addEventListener('scroll', this.updateScroll)
      this.mChanMainScrollWrap.addEventListener('mousewheel', e => {
        this.mChanMainScrollDirection = e.deltaY > 0 ? 'down' : 'up'
      })
    }
    this.setWindowSize()
    window.addEventListener('resize', this.handleResize)
  },
  updated () {
    this.$nextTick(() => {
      this.calcSummaryWrapH()
    })
  },
  methods: {
    test () {
      console.log(this.CHANNEL_DETAIL)
    },
    async ImgClick () {
      try {
        if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey) {
          const param = {
            targetKind: 'T',
            doType: 'LI',
            userKey: this.GE_USER.userKey,
            actYn: true,
            targetKey: this.CHANNEL_DETAIL.teamKey,
            userName: this.$changeText(this.GE_USER.userDispMtext)
          }
          const response = await this.$commonAxiosFunction({
            url: '/service/tp.saveUserDo',
            param: param
          })
          this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey = response.data.doKey
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        } else {
          const param = {
            doKey: this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey,
            targetKind: 'T',
            doType: 'LI',
            userKey: this.GE_USER.userKey,
            actYn: true,
            targetKey: this.CHANNEL_DETAIL.teamKey,
            userName: this.$changeText(this.GE_USER.userDispMtext)
          }
          await this.$commonAxiosFunction({
            url: '/service/tp.deleteUserDo',
            param: param
          })
          this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey = null
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        }
      } catch (error) {
        console.error(error)
      }

      this.isImgChanged = !this.isImgChanged
    },
    async openWritePushPop () {
      if (this.propTeamKey && this.mSelectedWriteType === 'ALIM' && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext) {
        this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
        this.$checkDeleteHistory('bottomWriteSheets')
        this.$emit('openMember')
        return
      }
      var writeParam = {}
      writeParam.contentsJobkindId = 'BOAR'
      writeParam.targetKey = this.CHANNEL_DETAIL.teamKey
      writeParam.teamKey = this.CHANNEL_DETAIL.teamKey
      writeParam.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      writeParam.targetType = 'writeContents'

      var teamList = await this.$getWriteBoardData(this.CHANNEL_DETAIL.teamKey)
      if (teamList === false) {
        this.$showToastPop(this.$t('BOTTOM_MSG_CHECK'))
        return
      }
      writeParam.selectBoardYn = true
      writeParam.initData = teamList
      this.$emit('openPop', writeParam)
      // this.mSeleteWriteTypePopShowYn = false
    },
    calcSummaryWrapH () {
      if (this.$refs.summaryWrap) {
        const height = this.$refs.summaryWrap.offsetHeight + 'px'
        this.$refs.channelItemBox.style.marginTop = height
      }
    },
    async openReqPop () {
      this.resultReqData.memberYn = true
      // if (!this.selectMemberObj) {
      //   return
      // }
      var result = await this.getMemberTypeItemList()
      if (result === true) this.reqPopShowYn = false // 생략해도 됨(학생 멤버가 되었습니다! 컨펌팝이라)
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.selectMemberObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: '/service/tp.getMemberTypeItemList',
        param: param
      })
      console.log('--------------------------')
      console.log(memberTypeItemList)
      if (memberTypeItemList.data.result) {
        var this_ = this
        if (memberTypeItemList.data.memberTypeItemList.length === 0) {
        // eslint-disable-next-line no-new-object
          var typeParam = new Object()
          if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
            typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
          }
          typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
          // eslint-disable-next-line no-debugger
          debugger
          this.$commonAxiosFunction({
            url: '/service/tp.saveFollower',
            param: { follower: typeParam }
          }).then(() => {
            this_.resultReqData.memberYn = true
            this_.resultReqData.memberType = this_.selectMemberObj
            this_.closeXPop()
            return false
          })
        } else {
          this.selectMemberObj.initData = memberTypeItemList.data.memberTypeItemList
          return true
        }
      } else {
        this.$showToastPop(this.$t('ERROR_MSG_INQUIRY_MANAG'))
        return false
      }
    },
    openProfilePop (userInfo) {
      var openPopParam = {}
      openPopParam.targetKey = userInfo.teamKey
      openPopParam.teamKey = userInfo.teamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = userInfo.userKey

      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.mPopParam = openPopParam
      this.mFollowerListPopShowYn = false
      this.mUserDetailPopShowYn = true
    },
    closeUserDetailPop () {
      this.mUserDetailPopShowYn = false
    },
    closeFollowerList () {
      this.mFollowerListPopShowYn = false
    },
    async openFollowerPop () {
      await this.getFollowerList()
      this.mFollowerListPopShowYn = true
    },
    async getFollowerList () {
      var result = {}
      var paramMap = new Map()
      // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
      paramMap.set('pageSize', 100)

      result = await this.$commonAxiosFunction({
        url: '/service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      this.mManagerList = result.data.content
    },
    openPage (value) {
      const obj = value
      obj.channelYn = true
      this.$emit('openPage', obj)
    },
    async getChanMain () {
      // eslint-disable-next-line no-debugger
      debugger
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      const encodedKey = Number(this.$route.params.encodedTeamKey)
      // const encryptedKey = decodeURIComponent(encodedKey)
      // const teamKey = AES.decrypt(encryptedKey, 'encryptionSecret').toString(enc.Utf8)
      const teamKey = encodedKey
      chanMainParam.teamKey = teamKey
      chanMainParam.targetKey = teamKey
      const param = {}
      param.teamKey = teamKey
      param.fUserKey = this.GE_USER.userKey
      param.userKey = this.GE_USER.userKey
      try {
        const result = await this.$getViewData({ url: '/service/tp.getChanMainBoard', param: param }, false)
        // eslint-disable-next-line no-debugger
        debugger
        if (!result || !result.data || result.data.result !== 'OK') {
          this.$showToastPop('채널을 찾을 수 없습니다!')
          return
        }
        const teamDetail = result.data.team.content[0]
        await this.$addChanVuex([teamDetail])
        chanMainParam.nameMtext = teamDetail.nameMtext
        chanMainParam.chanName = teamDetail.nameMtext
        var initData = {}
        initData.team = teamDetail
        if (result.data.contentsListPage && result.data.contentsListPage.content && result.data.contentsListPage.content.length > 0) {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.data.contentsListPage.content)
        }
        initData.contentsList = result.data.contentsListPage
      } catch (error) {
        this.$showToastPop('죄송합니다! 관리자에게 문의해주세요!')
        console.error(error)
      }
      chanMainParam.initData = initData
      this.mChanInfo = chanMainParam
      this.$emit('clearInfo', { detail: this.mChanInfo, targetType: 'chanDetail' })
      console.log('this.mChanInfothis.mChanInfothis.mChanInfo', this.mChanInfo)
    },
    async getTeamToken () {
      if (this.CHANNEL_DETAIL.teamId) {
        console.log(this.CHANNEL_DETAIL.teamId)
      } else {
        var result = await this.$commonAxiosFunction({
          url: '/service/tp.getAndSaveTeamAESToken',
          param: { teamKey: this.CHANNEL_DETAIL.teamKey }
        })
        console.log(result.data)
      }
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    },
    openUnknownLoginPop () {
      this.mUnknownLoginPopYn = true
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    openCertiPop (param) {
      console.log(param)
      this.$emit('openPop', param)
    },
    setWindowSize () {
      this.mwWidth = window.innerWidth
      var nowHeight = window.innerHeight

      if (this.mwHeight < nowHeight) this.mwHeight = nowHeight
    },
    handleResize (event) {
      if (this.$checkMobile() === 'IOS') {
      } else {
        this.setWindowSize()
      }
    },
    openChannelMsgPop () {
      this.writeBottSheetYn = false
      this.commonChanPopShowYn = true
    },
    openWriteContentsPop (openPopParam) {
      this.writeBottSheetYn = false
      this.$emit('openPop', openPopParam)
    },
    async closeChannelPop (resultReqData) {
      this.commonChanPopShowYn = false
      if (resultReqData) {
        var memberInfoText = ''
        if (resultReqData.memberYn && resultReqData.memberType) {
          memberInfoText += '환영합니다!<br>"'
          memberInfoText += this.$changeText(resultReqData.memberType.nameMtext)
          memberInfoText += '" 멤버가 되었습니다<br>'
          if (resultReqData.memberType.initData && resultReqData.memberType.initData.length > 0) {
            /* this.mReqResultMsg += '<br><p class="textLeft commonColor font16 fontBold">부가정보</p>' */
            memberInfoText += '('
            for (var i = 0; i < resultReqData.memberType.initData.length; i++) {
              memberInfoText += (i !== 0 ? ' ' : '')
              memberInfoText += this.$changeText(resultReqData.memberType.initData[i].itemNameMtext) + '  ' + resultReqData.memberType.initData[i].value
              memberInfoText += (i === resultReqData.memberType.initData.length - 1 ? ')' : '')
            }
          }
          // memberInfoText += '"'
          // memberInfoText += '<br>정상적으로 신청되었습니다!'
        } else {
          memberInfoText += '회원님은 현재 구독자상태이며,<br>언제든지 다시 멤버신청을 할 수 있습니다!'
        }

        this.mErrorPopBodyStr = memberInfoText
        this.mErrorPopBtnType = 'one'
        this.mErrorPopShowYn = true
        await this.$addChanList(this.mChanInfo.teamKey)
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
      if (wich || this.mChanInfo.targetContentsKey) {
        const unit = this.$refs.chanScrollWrap
        unit.scrollTo({ top: 500, behavior: 'smooth' })
        var blockBox = document.getElementById('summaryWrap')
        blockBox.style.height = 50 + 'px'
        const chanInfoSummaryRef = this.$refs.chanInfoSummary
        // const ownerChannelEditArea = this.$refs.ownerChannelEditArea
        const channelItemBoxRef = this.$refs.channelItemBox

        if (chanInfoSummaryRef) chanInfoSummaryRef.classList.add('displayNIm')
        // if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY) document.getElementById('followerCancelArea').classList.add('displayNIm')
        // if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && ownerChannelEditArea) ownerChannelEditArea.classList.add('displayNIm')
        if (channelItemBoxRef) channelItemBoxRef.classList.add('channelItemBoxHeight')
      }
    },
    openReqMemPop () {
      this.openChannelMsgPop()
    },
    async closeReqMemPop (yn) {
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
      result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'CR' }, 'save')
      if (result.result || result) {
        if (result.message === 'OK') {
          // this.mOpenWelcomePopShowYn = false
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
      await this.$addChanList(this.mChanInfo.teamKey)

      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.selectMemberObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: '/service/tp.getMemberTypeItemList',
        param: param
      })
      console.log('--------------------------')
      console.log(memberTypeItemList)
      if (memberTypeItemList.data.result) {
        if (memberTypeItemList.data.memberTypeItemList.length === 0) {
        // eslint-disable-next-line no-new-object
          var typeParam = new Object()
          if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
            typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
          }
          typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
          // eslint-disable-next-line no-debugger
          debugger
          await this.$commonAxiosFunction({
            url: '/service/tp.saveFollower',
            param: { follower: typeParam }
          })
        } else {
          this.selectMemberObj.initData = memberTypeItemList.data.memberTypeItemList
          return true
        }
        // this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
      } else {
        this.$showToastPop(this.$t('ERROR_MSG_INQUIRY_MANAG'))
        return false
      }
      this.$emit('closeLoading')
    },
    async confirmOk () {
      this.mErrorPopShowYn = false
      if (this.mSaveFollowerType === 'follow') {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.admYn === true) {
          this.mErrorPopBodyStr = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
          this.mErrorPopShowYn = true
          this.mErrorPopBtnType = 'two'
        } else {
          var fStatus = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          // eslint-disable-next-line no-new-object
          this.mSaveFollowerParam = new Object()
          this.mSaveFollowerParam.teamKey = this.CHANNEL_DETAIL.teamKey
          this.mSaveFollowerParam.teamName = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
          this.mSaveFollowerParam.userKey = this.$store.getters['D_USER/GE_USER'].userKey
          this.mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
          var result = false
          if (fStatus) {
            if (this.axiosQueue.findIndex((item) => item === 'changeFollower') !== -1) return
            this.axiosQueue.push('changeFollower')
            result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'CR' }, 'del')
            var queueIndex = this.axiosQueue.findIndex((item) => item === 'changeFollower')
            // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
            this.axiosQueue.splice(queueIndex, 1)
            this.CHANNEL_DETAIL.D_CHAN_AUTH = null
            this.CHANNEL_DETAIL.followerKey = null
            this.CHANNEL_DETAIL.userTeamInfo = null
            this.CHANNEL_DETAIL.followerCount -= 1
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])

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
            // this.mChanPopMessage = '[' + this.$changeText(this.CHANNEL_DETAIL.nameMtext) + '] 채널의 구독자가 되었습니다.<br>멤버가 되면<br>우리채널에 알림을 보낼 수 있어요!<br>멤버들끼리 자유롭게 소통할 수 있어요!'
            // this.openChannelMsgPop()
          }
        }
      }
    },
    async getMemberTypeList () {
      var param = {}
      param.teamKey = Number(this.$route.params.encodedTeamKey)
      // param.cateItemKey = this.propCateItemKey
      var memberTypeList = await this.$commonAxiosFunction({
        url: '/service/tp.getMemberTypeList',
        param: param
      })
      if (memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
        if (this.mMemberTypeList.length > 0) {
          this.selectMemberObj = this.mMemberTypeList[0]
        }
      }
    },
    async changeFollowYn () {
      this.mSaveFollowerType = 'follow'
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn === true) {
        this.mErrorPopBodyStr = 'Do you want to unfollow this channel?'
        this.mErrorPopBtnType = 'two'
        this.mErrorPopShowYn = true
      } else {
        // this.mErrorPopBodyStr = 'You followed' + 'Channel name'
        // this.mErrorPopBtnType = 'one'
        // this.mErrorPopShowYn = true
        this.confirmOk()
        // this.$router.go(0)
      }
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
    },
    async copyText () {
      if ((this.mChanInfo.initData.team.copyTextStr === undefined && this.CHANNEL_DETAIL.copyTextStr === undefined) && !this.mMakeDeepLinkIng) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.mMakeDeepLinkIng = true
        var title = '[uniBuzzy]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
        var message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
        var this_ = this
        this.$makeShareLink(this.CHANNEL_DETAIL.teamKey, 'chanDetail', message, title).then(res => {
          this.CHANNEL_DETAIL.copyTextStr = res
          this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
          this_.mMakeDeepLinkIng = false
        })
      }
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
      if (this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn') !== -1) return
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.CHANNEL_DETAIL.userTeamInfo.followerKey
      var toastText = ''
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn === 1) {
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

      await this.$changeRecvAlimYn({ follower: param })
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey).then(() => {
        var queueIndex = this.axiosQueue.findIndex(item => item === 'changeRecvAlimYn')
        this.axiosQueue.splice(queueIndex, 1)
      })
      this.CHANNEL_DETAIL.copyTextStr = this.mChanInfo.initData.team.copyTextStr
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
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
    // openWritePushPop () {
    //   if (this.GE_USER.unknownYn) {
    //     this.openUnknownLoginPop()
    //     // this.$showToastPop('로그인 후 이용해주세요')
    //     return
    //   }
    //   this.writeBottSheetYn = true
    // },
    openPushDetailPop (param) {
      // eslint-disable-next-line no-debugger
      debugger
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
    // updateScroll () {
    //   var blockBox = document.getElementById('summaryWrap')
    //   if (this.mChanMainScrollWrap.scrollTop > this.mChanMainScrollPosition) {
    //     this.mChanMainScrollDirection = 'down'
    //   } else if (this.mChanMainScrollWrap.scrollTop < this.mChanMainScrollPosition) {
    //     this.mChanMainScrollDirection = 'up'
    //   }

    //   this.mChanMainScrollPosition = this.mChanMainScrollWrap.scrollTop
    //   if (this.mChanMainScrollDirection === 'down' && this.mChanMainScrollPosition > 120) {
    //     blockBox.style.height = 50 + 'px'
    //     if (this.mChanMainScrollPosition > 160) this.mChanMainScrollWrap.style.overflow = 'hidden'

    //     document.getElementById('chanInfoSummary').classList.add('displayNIm')

    //     // 더알림 채널은 구독취소버튼이 없으므로 아래의 클래스가 v-if에 의해 생성되지 않으므로 에러가 나기에 추가함
    //     if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY) document.getElementById('followerCancelArea').classList.add('displayNIm')

    //     // if (document.getElementById('ownerChannelEditArea')) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')

    //     document.getElementById('channelCardWrap').classList.add('displayNIm')
    //     document.getElementById('userCardWrap').classList.add('displayNIm')

    //     document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
    //   } else if (this.mChanMainScrollDirection === 'up' && this.mChanMainScrollPosition < 170) {
    //     document.getElementById('chanInfoSummary').classList.remove('displayNIm')
    //     // document.getElementById('chanInfoArea').classList.remove('displayNIm')
    //     // document.getElementById('memberInfoArea').classList.remove('displayNIm')
    //     if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY) document.getElementById('followerCancelArea').classList.remove('displayNIm')

    //     // if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) document.getElementById('ownerChannelEditArea').classList.remove('displayNIm')

    //     document.getElementById('channelCardWrap').classList.remove('displayNIm')
    //     document.getElementById('userCardWrap').classList.remove('displayNIm')

    //     blockBox.style.height = '220px'
    //     this.mChanMainScrollWrap.style.height = ''
    //     // document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
    //     document.getElementById('channelItemBox').classList.remove('channelItemBoxHeight')
    //   }
    // }
    updateScroll () {
      var blockBox = this.$refs.summaryWrap
      if (this.mChanMainScrollWrap.scrollTop > this.mChanMainScrollPosition) {
        this.mChanMainScrollDirection = 'down'
      } else if (this.mChanMainScrollWrap.scrollTop < this.mChanMainScrollPosition) {
        this.mChanMainScrollDirection = 'up'
      }

      this.mChanMainScrollPosition = this.mChanMainScrollWrap.scrollTop
      const chanInfoSummaryRef = this.$refs.chanInfoSummary
      const followerCancelAreaRef = this.$refs.followerCancelArea
      const channelItemBoxRef = this.$refs.channelItemBox
      if (this.mChanMainScrollDirection === 'down' && this.mChanMainScrollPosition > 120) {
        blockBox.style.height = 50 + 'px'
        if (this.mChanMainScrollPosition > 160) this.mChanMainScrollWrap.style.overflow = 'hidden'
        chanInfoSummaryRef.classList.add('displayNIm')
        // 더알림 채널은 구독취소버튼이 없으므로 아래의 클래스가 v-if에 의해 생성되지 않으므로 에러가 나기에 추가함
        if (followerCancelAreaRef && this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY) followerCancelAreaRef.classList.add('displayNIm')
        // if (ownerChannelEditAreaRef) ownerChannelEditAreaRef.classList.add('displayNIm')
        if (channelItemBoxRef) channelItemBoxRef.classList.add('channelItemBoxHeight')
      } else if (this.mChanMainScrollDirection === 'up' && this.mChanMainScrollPosition < 170) {
        chanInfoSummaryRef.classList.remove('displayNIm')
        if (followerCancelAreaRef && this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && this.CHANNEL_DETAIL.teamKey !== this.$DALIM_TEAM_KEY) followerCancelAreaRef.classList.remove('displayNIm')
        // if (this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && ownerChannelEditAreaRef) ownerChannelEditAreaRef.classList.remove('displayNIm')

        blockBox.style.height = '220px'
        this.mChanMainScrollWrap.style.height = ''
        channelItemBoxRef.classList.remove('channelItemBoxHeight')
      }
    }
  },
  computed: {
    mSummaryWrapH () {
      if (this.$refs.summaryWrap) {
        return {
          'margin-top': this.$refs.summaryWrap.offsetHeight + 'px'
        }
      }
      return {}
    },
    CHANNEL_DETAIL () {
      if (!this.mChanInfo && !this.mDirectTeamKey) return {}
      let teamKey
      if (this.mChanInfo) {
        teamKey = this.mChanInfo.targetKey || this.mChanInfo.teamKey
      } else if (this.mDirectTeamKey) {
        teamKey = this.mDirectTeamKey.teamKey
      }
      var detail = this.$getDetail('TEAM', teamKey)
      if (detail.length < 1) {
        return
      }
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!detail')
      console.log(detail)
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
    settingBackground () {
      var imgPath = 'url(' + (this.CHANNEL_DETAIL.bgDomainPath ? this.CHANNEL_DETAIL.bgDomainPath + this.CHANNEL_DETAIL.bgPathMtext : this.CHANNEL_DETAIL.bgPathMtext) + ')'
      return {
        '--wWidth': this.$getMobileYn() === true ? this.mwWidth + 'px ' : '100% ',
        '--wHeight': this.$getMobileYn() === true ? this.mwHeight + 'px ' : '100% ',
        // '--wWidth': this.$getMobileYn() === true ? window.innerWidth + 'px ' : '100% ',
        // '--wHeight': this.$getMobileYn() === true ? window.innerHeight + 'px ' : '100% ',
        '--backImg': imgPath,
        '--paddingTop': this.$STATUS_HEIGHT + 'px'
      }
    },
    // getWindowHeight () {
    //   return {

    //   }
    // },
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
      immediate: true,
      handler (value, old) {
        if (value && value.D_CHAN_AUTH && value.D_CHAN_AUTH.followYn) {
          this.$emit('followYn')
        } else if (value && value.D_CHAN_AUTH && !value.D_CHAN_AUTH.followYn) {
          this.mUnknownYn = true
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
.gBtnSmall {
  float: left !important;
  margin-top: 0.7rem
}

.chanDetailWrap {
  /* min-height: 900px;
    max-height: 1000px; */
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 1000px;
  /* max-height: 1000px; */
  /* height: 100%vh */

  width: var(--wWidth);
  height: var(--wHeight);
  background-image: var(--backImg);
  padding-top: var(--paddingTop);
}

.officialTitle {
  padding-right: 30px;
}

.chanDetailWrap tr,
.chanDetailWrap td {
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}

.channelItemBox {
  background-color: #fff;
  border-radius: 5px;
  min-height: calc(100% - 50px);
  position: relative;
  width: 100%;
  float: left;
  box-sizing: border-box;
}
.channelItemBoxHeight{height: calc(100% - 50px)!important; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; }
.chanDetailWrap table {
  width: 85vw;
  max-width: 400px;
}

.chanDetailWrap table img {
  width: 1.3rem
}

.iconTd {
  display: flex;
  align-items: flex-start;
  padding-top: 1.2rem !important;
}
.summaryWrap{min-height: 220px; width: 100%; float: left; position: absolute;}
.summaryWrap2 {
  height: 50px;
  width: 100%;
  float: left;
}

.displayNIm {
  display: none !important;
}

.displayBIm {
  display: flex !important;
}

.chanImgRound{
  width: 100px; height: 100px;
  bottom: -50px; left: 15px; position: absolute;
  display: flex; align-items: center; justify-content: center;
  border-radius: 100%;
  border-top: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;
  background-repeat: no-repeat; background-size: cover; background-position: center; background-color:white;
}
#chanInfoSummary2 {
  width: 100%;
  padding-top: 0;
  height: 100%;
  flex-direction: column;
  float: left
}

.blockBox {
  width: 100%;
  height: 320px;
  float: left;
  height: var(--height);
  min-height: 50px;
}
span {
  color: white;
}
@media screen and (max-width: 768px) {
  .chanImgRound {
    width: 70px;
    height: 70px;
    bottom: -25px;
  }
  .nameTitleSmall, .nameTitleBig {
    left: 100px !important;
  }
  .nameTitleSmall {
    font-size: 15px !important;
  }
  .nameTitleBig {
    font-size: 18px !important;
  }
}
</style>
