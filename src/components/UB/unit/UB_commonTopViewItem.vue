<i18n>
{
  "ko": {
    "CONF_MSG_CHECK_UNABLE": "멤버가 아니므로 유저 정보를 볼 수 없습니다."
  },
  "en": {
    "CONF_MSG_CHECK_UNABLE": "Sorry, you are not a member, so you cannot access user information."
  }
}
</i18n>
<template>
  <div v-if="mLoadingShowYn" id="loading">
    <div class="spinner"></div>
  </div>
  <div class="profilePopBg" v-if="mProfilePopShowYn" @click="closeProfilePop"></div>
  <userDetailPop v-if="mProfilePopShowYn" :propData="mPopParam" :pClosePop="closeProfilePop" />
  <div :class="animationYn? 'newContentsAni':''" class="contentsWrap" key="animationYn" v-if="this.CONT_DETAIL" :style="`padding-bottom: ${this.$STATUS_HEIGHT}px; ${propTargetType !=='contentsDetail'? 'box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4);':''}`">
    <div v-if="propJustShowYn" class="stickerBox" :style="propPreStickerList && propPreStickerList.length > 0? 'height: calc(100% - 50px);' : 'height: calc(100%);'"></div>
    <div class="contentsCardHeaderArea">
      <div @click="goChannelMain()" :style="this.GE_USER.userKey === CONT_DETAIL.creUserKey? 'border: 2px solid #5B1CFC !important; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" class="contentsCardLogoArea" >
        <div class="chanImgBox" :style="'background-image: url(' + (CONT_DETAIL.domainPath ? CONT_DETAIL.domainPath + $changeUrlBackslash(CONT_DETAIL.logoPathMtext) : CONT_DETAIL.logoPathMtext) + ');'"></div>
      </div>
      <div class="contentsDetailArea">
        <div class="contentsHeaderBox">
          <template v-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && CONT_DETAIL.titleBlindYn">
            <p class="textLeft textOverdot commonBlack fontBold font14 noPerm">
              {{ $t('COMM_MSG_NOPERM') }}
            </p>
          </template>
          <template v-else>
            <p @click="goContentsDetail()" class="cursorDragText textLeft textOverdot commonBlack fontBold font14 noPerm" :class="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''">
              <img v-if="CONT_DETAIL.jobkindId === 'ALIM'" src="@/assets/images/contents/contTitle_alim.svg" class="cursorNotDrag jobkindImg" alt="Alim">
              <img v-else-if="CONT_DETAIL.jobkindId === 'BOAR'" src="@/assets/images/contents/contTitle_board.svg" class="cursorNotDrag" alt="Board">
              {{CONT_DETAIL.title}}
            </p>
            <img v-if="!pNoAuthYn" class="moreBtn" src="@/assets/images/contents/contents_moreBtnIcon.svg" alt="" @click="contentMenuClick">
          </template>
        </div>
        <div class="contentsInfoBox">
          <div class="CLDeepGrayColor font10 fl textLeft fontBold userInfoBox">
            <p @click="goUserProfile()" class="textOverdot w100P fontNomal h100P textOverdot">
              {{this.$changeText(CONT_DETAIL.creUserName)}}
            </p>
          </div>
          <p class="fr CLDeepGrayColor font10 creDate">{{this.$changeDateFormat(CONT_DETAIL.creDate)}}</p>
          <div @click="openRecvActorListPop(CONT_DETAIL.rUserCount === -1? true : '')" class="fr cursorP font10 commonGrayBG CDeepColor fontBold mtop-02 mright-05 receiveUser" v-if="CONT_DETAIL.jobkindId === 'ALIM'" :style="CONT_DETAIL.rUserCount !== -1 && CONT_DETAIL.creUserKey === GE_USER.userKey? 'background: rgb(221 229 251)!important;':''">
            <template   v-if="CONT_DETAIL.rUserCount === -1">
              {{ this.$t('COMMON_TAB_ALL') }}
            </template>
            <template v-else-if="CONT_DETAIL.rUserCount !== -1">
              <img src="@/assets/images/contents/userIcon.svg" class="img-w13 mright-01 fl" alt="">
              <p class="font10 fl mleft-01 CDeepColor userCount">{{CONT_DETAIL.rUserCount}}</p>
            </template>
          </div>
        </div>
        <div v-if="!GE_USER.unknownYn" class="w100P fl">
          <statCodeComponent v-if="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && !pNoAuthYn" @click="openWorkStatePop(CONT_DETAIL)" :alimDetail="CONT_DETAIL" class="fr" :contentsKey="CONT_DETAIL.contentsKey" :teamKey="CONT_DETAIL.creTeamKey" :currentCodeKey="CONT_DETAIL.workStatCodeKey" :codeList="CONT_DETAIL.workStatCodeList" />
          <!-- <p class="fr font10 lightGray mright-03" @click="CONT_DETAIL.rUserCount !== -1? this.openRecvListPop(): ''" v-if="CONT_DETAIL.jobkindId === 'ALIM'" style="border: 1px solid rgb(204, 204, 204); padding: 0px 5px; border-radius: 8px; display: flex; align-items: center;" > -->
          <p class="fl commonColor font10 fl textLeft fontBold cursorP replyBtn" v-if="!pNoAuthYn && CONT_DETAIL.creUserKey !== GE_USER.userKey && CONT_DETAIL.showCreNameYn === 1 && CONT_DETAIL.jobkindId === 'ALIM'" @click="sendReply">{{ this.$t('COMM_BTN_REPLY') }}</p>
          <div v-if="cancelTimerShowCheck(CONT_DETAIL)" class="fl" :id="'timerArea'+CONT_DETAIL.contentsKey" @click="cancelConfirm(CONT_DETAIL)">
            <p :id="'timerText'+CONT_DETAIL.contentsKey" class="font10 fl textRight w100P" >{{setIntervalTimer(CONT_DETAIL.creDate, CONT_DETAIL.contentsKey)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!propJustShowYn" :class="(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)? 'opacity05': ''"  @click="goContentsDetail(true)" class="contentsCardBodyArea">
      <div v-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && !CONT_DETAIL.titleBlindYn" @cick="zzz" class="font10 cursorP mbottom-05 bodyFullStr" v-html="$notPerText()"></div>
      <div v-else-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN  === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && CONT_DETAIL.titleBlindYn" @cick="zzz" class="" ></div>
      <div v-else class="fl w100P contentsBoxWrap" ref="contentsBoxRef" :id="'contentsBodyBoxArea'+CONT_DETAIL.contentsKey">
        <pre :ref="'mainContRef' + CONT_DETAIL.contentsKey" @loadeddata="testLoad"  :class="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''" :id="'bodyFullStr'+CONT_DETAIL.contentsKey" class="font10 mbottom-05 mainConts cursorDragText h100P w100P fl contentsPre" v-html="$setBodyLength(CONT_DETAIL.bodyFullStr, CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)"></pre>
      </div>
      <div v-if="!propJustShowYn && CONT_DETAIL.D_CONT_USER_STICKER_LIST && CONT_DETAIL.D_CONT_USER_STICKER_LIST.length > 0" class="stickerArea">
        <template v-for="(value, index) in CONT_DETAIL.D_CONT_USER_STICKER_LIST" :key="index" >
        <!-- <template v-for="(value, index) in this.mContStickerList" :key="index" > -->
          <gStickerLine @click="goStickerContentsList(value)" v-if="value" :pSmallYn="true" class="stickerItem" :pSticker="value.sticker" />
        </template>
      </div>
      <div v-if="!mFadeNotShowYn && mContentMoreShowYn" class="w100P fadeEffect"></div>
      <p :ref="'bodyMoreRef' + CONT_DETAIL.contentsKey" v-if="!mFadeNotShowYn && mContentMoreShowYn" class="w-100P textRight fr font10 commonColor fontBold mtop-05 mright-1 bodyMore">{{$t('COMMON_NAME_MORE')}} > </p>
    </div>
    <div v-else class="stickerAreaFull">
      <template v-for="(value, index) in propPreStickerList" :key="index" >
        <gStickerLine v-if="value" :pSelecteModeYn="true" :pSmallYn="true" class="stickerItem" @click="this.$emit('selectSticker', value)" :pSticker="value" />
      </template>
    </div>
    <template v-if="!propJustShowYn && (pNoAuthYn || (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN  === true) || CONT_DETAIL.jobkindId === 'ALIM' || CONT_DETAIL.creUserKey === this.GE_USER.userKey)" :class="(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)? 'opacity05': ''" >
      <div v-if="!pNoAuthYn && this.CONT_DETAIL.D_CONT_USER_DO " class="contentsCardUserDoArea">
          <div class="userDoBox" v-if="this.CONT_DETAIL.D_CONT_USER_DO && this.CONT_DETAIL.D_CONT_USER_DO[1]">
            <div class="userDoCont" @click="GE_USER.unknownYn ? pOpenUnknownLoginPop(CONT_DETAIL) : changeAct(this.CONT_DETAIL.D_CONT_USER_DO[1], this.CONT_DETAIL.contentKey)">
              <div class="userDoImgBox">
                <img class="w100P" v-if="!this.CONT_DETAIL.D_CONT_USER_DO[1].doKey || this.CONT_DETAIL.D_CONT_USER_DO[1].doKey === 0" src="@/assets/images/contents/cont_like_no.svg" alt="">
                <img class="w100P" v-else src="@/assets/images/contents/cont_like.svg" alt="">
              </div>
              <p class="font10 fl fontBold w100P mtop-01  userDoColor">{{CONT_DETAIL.likeCount}}</p>
            </div>
            <div class="userDoCont" @click="GE_USER.unknownYn ? pOpenUnknownLoginPop(CONT_DETAIL) : changeAct(this.CONT_DETAIL.D_CONT_USER_DO[0], this.CONT_DETAIL.contentKey)">
              <div class="userDoImgBox">
                <img class="w100P" v-if="!this.CONT_DETAIL.D_CONT_USER_DO[0].doKey || this.CONT_DETAIL.D_CONT_USER_DO[0].doKey === 0" src="@/assets/images/contents/cont_star_no.svg" alt="">
                <img class="w100P" v-else src="@/assets/images/contents/cont_star.svg" alt="">
              </div>
              <p class="font10 fontBold fl mtop-01  w100P userDoColor">{{CONT_DETAIL.starCount}}</p>
            </div>
            <div class="userDoCont" @click="this.goContentsDetail(undefined, true)">
              <div class="userDoImgBox">
                <img class="w100P" v-if="mWriteMemoYn" src="@/assets/images/contents/cont_memo.svg" alt="">
                <img class="w100P" v-else src="@/assets/images/contents/cont_memo_no.svg" alt="">
              </div>
              <p class="font10 fontBold mtop-01 fl w100P userDoColor">{{CONT_DETAIL.memoCount}}</p>
            </div>
            <div class="userDoCont" @click="clickFileDownload()" v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0">
              <div class="userDoImgBox">
                <img v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" src="@/assets/images/contents/contentsClipIcon.svg" class="" alt="">
                  <img v-else src="@/assets/images/contents/contentsClipIcon.svg" class="w100P" alt="">
              </div>
              <p class="font10 fontBold mtop-01 fl w100P userDoColor">{{CONT_DETAIL.fileCount}}</p>
            </div>
          </div>
          <div class="shareBox">
            <div class="shareImgBox">
              <img src="../../../assets/images/contents/contentsShareIcon.svg" class=" fl" alt="공유 아이콘"
                data-clipboard-action="copy" id="boardDetailCopyBody" @click="contentsSharePop()"
                :data-clipboard-text="CONT_DETAIL.copyTextStr">
            </div>
            <p class="font10 fl fontBold w-100P mtop-01 userDoColor">{{this.$t('COMMON_NAME_SHARE')}}</p>
          </div>
        </div>
        <div v-else class="contentsCardUserDoArea">
        </div>
    </template>
  </div>
  <gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false"  @report="report" @editable="editable" @bloc="bloc" :contentsInfo="CONT_DETAIL" :contentType="CONT_DETAIL.jobkindId" :contentOwner="this.GE_USER.userKey === CONT_DETAIL.creUserKey"/>
  <statCodePop @closeXPop="this.mWorkStateCodePopShowYn = false" :currentWorker="{workUserKey: mWorkStateCodePopProps.workUserKey, workUserName: mWorkStateCodePopProps.workUserName}" :teamKey="mWorkStateCodePopProps.creTeamKey" :alimDetail="mWorkStateCodePopProps" :contentsKey="mWorkStateCodePopProps.contentsKey" v-if="mWorkStateCodePopShowYn" :codeList="mWorkStateCodePopProps.workStatCodeList" :currentCodeKey="mWorkStateCodePopProps.workStatCodeKey" class="fr "></statCodePop>
  <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk" @no='mConfirmPopShowYn=false'/>
  <div v-if="mSelectBoardPopShowYn === true" class="selectBoardPopShadow" />
  <div v-if="mSelectBoardPopShowYn === true" class="selectBoardPopBg">
    <gSelectBoardPop :type="mSelectBoardType" @closeXPop="mSelectBoardPopShowYn = false" :boardDetail="mMoveContentsDetailValue" />
  </div>
  <attachFileListPop propTargetType="C" :propFileData="this.mFilePopData" @clickFileDownload="clickFileDownload" v-if="mFilePopYn === true" @closePop="mFilePopYn = false"/>
</template>
<script>
import { onMessage } from '@/assets/js/webviewInterface'
import statCodePop from '@/components/board/UB_manageStateCodePop.vue'
import attachFileListPop from '@/components/pageComponents/main/unit/UB_commonAttachFileListPop.vue'
import userDetailPop from '@/components/UB/popup/UB_userDetailPop.vue'

export default {
  components: {
    attachFileListPop,
    statCodePop,
    userDetailPop
  },
  props: {
    pFadeNotShowYn: {},
    pOpenUnknownLoginPop: Function,
    propTargetType: {},
    contentsEle: {},
    propDetailYn: {},
    propContIndex: {},
    imgClickYn: {},
    propJustShowYn: {},
    propPreStickerList: {},
    index: {},
    pNoAuthYn: {}
  },
  created () {
    if (this.pFadeNotShowYn) this.mFadeNotShowYn = true
    else this.mFadeNotShowYn = false
    if (this.CONT_DETAIL) {
      if (this.CONT_DETAIL.D_CONT_USER_STICKER_LIST) {
        var stickerList = []
        for (var s = 0; s < this.CONT_DETAIL.D_CONT_USER_STICKER_LIST.length; s++) {
          if (!this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[s].sticker) continue
          stickerList.push(this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[s].sticker)
        }
        this.mContStickerList = this.replaceArr(stickerList)
      }
    }
  },
  data () {
    return {
      mFadeNotShowYn: false,
      mContentMoreShowYn: true,
      mStickerList: [],
      mContStickerList: [],
      openStickerListYn: false,
      mMoreYn: false,
      mFilePopShowYn: false,
      mLoadingShowYn: false,
      mContMenuShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      // mMemoWritePopShowYn: true,
      mContentsSharLink: null,

      mSelectBoardPopShowYn: false,
      mMoveContentsDetailValue: {},
      mSelectBoardType: '',
      mMemoResetYn: false,
      mWorkStateCodePopShowYn: false,
      mWorkStateCodePopProps: {},
      mClickImgList: [],
      mClickTime: null,
      mClickEndYn: false,
      mSelectedImgIndex: 0,
      mImgDetailAlertShowYn: false,
      mPreviewPopShowYn: false,
      mSelectImgObject: {},
      mFileDownData: {},
      mFilePopData: {},
      mFilePopYn: false,
      mContRecvPopShowYn: false,
      mActorListInitDataList: [],
      mWriteMemoYn: false,
      mMemoMoreShowYn: false,
      mStickerPopShowYn: false,
      animationYn: false,
      mProfilePopShowYn: false,
      mPopParam: {}
    }
  },
  updated () {
    this.addImgEvnt()
  },
  async mounted () {
    // this.addImgEvnt()
    var scrollWrap = document.getElementById('mainAllWrap')
    if (scrollWrap) {
      scrollWrap.addEventListener('scroll', this.handleScroll)
    }
    // if (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTACH_FILE_LIST) {
    //   this.settingFileList()
    // }
    var this_ = this
    this.$nextTick(async () => {
      this_.addImgEvnt()
      // this_.showContentMore()
    })
    await this.setContentsMoreText()
    // this.showContentMore()
    await this.setPreTagInFirstTextLine()
    if (this.pNoAuthYn) {
      this.alimBigView()
    }
  },
  methods: {
    closeProfilePop () {
      this.mProfilePopShowYn = false
    },
    returnCommentText () {
      if (this.GE_LOCALE === 'ko') {
        return `댓글 ${this.mMemoLeng}개 모두 보기`
      } else {
        return `See all ${this.mMemoLeng} comments`
      }
    },
    // showContentMore () {
    //   if (this.propDetailYn) this.alimBigView()
    //   let contentHeight = 0
    //   if (this.$refs.mainContRef) {
    //     contentHeight = this.$refs.mainContRef.offsetHeight
    //   }
    //   // var bodyMoreText = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
    //   if (contentHeight < 300) {
    //     this.mContentMoreShowYn = false
    //     // bodyMoreText.style.display = 'block'
    //   } else {
    //     this.mContentMoreShowYn = true
    //     // bodyMoreText.style.display = 'none'
    //   }
    // },
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey)
      // var bodyMoreArea = window.document.getElementById('bodyMore' + this.CONT_DETAIL.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      // let contentRef = {}
      // if (this.$refs.mainContRef) {
      //   this.mContentMoreShowYn = false
      //   contentRef = this.$refs.mainContRef
      //   contentRef.style.maxHeight = '100%'
      // }
      this.mContentMoreShowYn = false
      // this.mMoreYn = false
      // bodyMoreArea.style.display = 'none'
    },
    saveStickerList (params) {
      this.mContStickerList = params.mContStickerList
    },
    async openStickerPop () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        return
      }
      if (!this.openStickerListYn) {
        var param = {}
        if (this.GE_USER.unknownYn) return
        param.creUserKey = this.GE_USER.userKey
        var result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.getStickerList',
          param: param
        })
        this.mStickerList = result.data
        // var index
        // for (var i = 0; i < this.mContStickerList.length; i++) {
        //   index = this.mStickerList.findIndex((item) => Number(item.stickerKey) === Number(this.mContStickerList[i].stickerKey))
        //   if (index !== -1) {
        //     this.mStickerList.splice(index, 1)
        //   }
        // }
        this.openStickerListYn = true
      } else {
        this.openStickerListYn = false
      }
    },
    openSettingStickerPop (params) {
      this.$emit('openPop', params)
    },
    addAnimation () {
      this.animationYn = true
      var this_ = this
      setTimeout(() => {
        this_.animationYn = false
      }, 2000)
    },
    goStickerContentsList (val) {
      if (!val.stickerKey) return
      this.$emit('requestSearchSticker', { selectedSticker: val })
    },
    updateMemo (param) {
      var idx
      var idx2
      if (param[2] !== null) {
        idx = this.CONT_DETAIL.D_MEMO_LIST.findIndex((item) => item.memoKey === Number(param[2]))
        idx2 = this.CONT_DETAIL.D_MEMO_LIST[idx].cmemoList.findIndex((item) => item.memoKey === Number(param[1]))
        this.CONT_DETAIL.D_MEMO_LIST[idx].cmemoList[idx2].attachFileList = param[0]
      } else {
        idx = this.CONT_DETAIL.D_MEMO_LIST.findIndex((item) => item.memoKey === Number(param[1]))
        this.CONT_DETAIL.D_MEMO_LIST[idx].attachFileList = param[0]
      }
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    setMoreMemoBtn () {
      if (!this.CONT_DETAIL) return
      var memoList = this.CONT_DETAIL.D_MEMO_LIST
      if (!memoList) {
        memoList = this.CONT_DETAIL.memoList
      }
      /* if (memoList.length > 3) {
        return true
      } */
      var leng = memoList.length
      for (var i = 0; i < memoList.length; i++) {
        if (memoList[i].creUserKey === this.GE_USER.userKey) this.mWriteMemoYn = true
        for (var c = 0; c < memoList[i].cmemoList.length; c++) {
          if (memoList[i].cmemoList[c].creUserKey === this.GE_USER.userKey) this.mWriteMemoYn = true
        }
        leng += memoList[i].cmemoList.length
      }
      if (leng > 3) {
        this.mMemoMoreShowYn = true
        if (this.CONT_DETAIL && this.CONT_DETAIL.memoCount) this.mMemoLeng = this.CONT_DETAIL.memoCount
      }
    },
    closeRecvListPop (openPopParam) {
      this.mContRecvPopShowYn = false
      if (openPopParam) {
        this.openWriteContentsPop(openPopParam)
      }
    },
    openWriteContentsPop (openPopParam) {
      var param = {}
      param.selectedList = openPopParam
      param.targetType = 'writeContents'
      param.targetKey = this.contentsEle.creTeamKey
      param.popHeaderText = this.contentsEle.nameMtext
      this.$emit('openPop', param)
    },
    sendReply () {
      var selectedList = { memberList: [], bookList: [] }
      var creUserObj = {}
      creUserObj.accessKind = 'U'
      creUserObj.userKey = this.contentsEle.creUserKey
      creUserObj.userDispMtext = 'EN$^$' + this.contentsEle.creUserName
      selectedList.memberList.push(creUserObj)
      this.openWriteContentsPop(selectedList)
    },
    async openRecvActorListPop (allYn) {
      if (allYn === true) {
        this.$showToastPop('채널 전체 대상 알림입니다!')
        return
      }
      if (this.contentsEle.creUserKey !== this.GE_USER.userKey) {
        this.$showToastPop('내가 보낸 알림만 수신자 확인이 가능합니다!')
        return
      }
      var paramMap = new Map()
      paramMap.set('contentsKey', this.contentsEle.contentsKey)
      paramMap.set('teamKey', this.contentsEle.creTeamKey)
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.getContentsActorList',
          param: Object.fromEntries(paramMap)
        })
        if (result && result.data && result.data.length > 0) {
          var actorList = result.data
          this.mActorListInitDataList.actorList = actorList
          this.mContRecvPopShowYn = true
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        /* this.memoShowYn = false
        this.mLoadingShowYn = false */
      }
    },
    async saveModiMemo (modiMemoObj) {
      var memo = null
      if (modiMemoObj.param) {
        memo = modiMemoObj.param
      }
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (result.data.resultList && result.data.resultList.memoList.length > 0) {
            var saveMemoObj = {}
            var index
            if (memo.parentMemoKey) {
              // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 ^memo%키값을 찾음
              index = await result.data.resultList.memoList.findIndex((item) => item.memoKey === memo.parentMemoKey)
              saveMemoObj = await result.data.resultList.memoList[index]
            } else {
              saveMemoObj = await result.data.resultList.memoList[0]

              saveMemoObj = await result.data.resultList.memoList[0]
              var newMemoList = [
                ...this.CONT_DETAIL.D_MEMO_LIST,
                ...result.data.resultList.memoList
              ]

              this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newMemoList)
              // eslint-disable-next-line vue/no-mutating-props
              this.contentsEle.D_MEMO_LIST = this.replaceArr(newMemoList)
            }
            saveMemoObj.creTeamKey = this.CONT_DETAIL.creTeamKey
            saveMemoObj.jobkindId = this.CONT_DETAIL.jobkindId
            await this.$store.commit('UB_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.mLoadingShowYn = false
      }
    },
    async clickFileDownload () {
      await this.getContentsDetail()
      await this.settingFileList_downAtt()
      this.mFilePopData = this.mFileDownData
      // if (!this.propDetailYn) {
      //   await this.getContentsDetail()
      //   await this.settingFileList_downAtt()
      //   this.mFilePopData = this.mFileDownData
      // } else {
      //   this.mFilePopData = this.CONT_DETAIL
      // }
      // this.$emit('fileDownload', this.mFileDownData)
      this.mFilePopYn = true
    },
    async getContentsDetail () {
      var param = {}
      param.contentsKey = this.contentsEle.contentsKey
      param.targetKey = this.contentsEle.contentsKey
      param.jobkindId = this.contentsEle.jobkindId
      param.userKey = this.GE_USER.userKey
      param.ownUserKey = this.GE_USER.userKey
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      this.mFileDownData = detailData
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    async settingFileList_downAtt () {
      try {
        if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
          var attachFileList = []
          var bodyImgFileList = []
          for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
            if (this.CONT_DETAIL.attachFileList[a].attachYn === true) {
              attachFileList.push(this.CONT_DETAIL.attachFileList[a])
            } else if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
              bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
            }
          }

          var cont = this.contentsEle
          cont.D_ATTACH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
          this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          return bodyImgFileList
        }
      } catch (error) {
        console.log(error)
      }
    },
    async settingFileList_old () {
      try {
        if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
          var attachFileList = []
          var bodyImgFileList = []
          for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
            if (this.CONT_DETAIL.attachFileList[a].attachYn === true) {
              attachFileList.push(this.CONT_DETAIL.attachFileList[a])
            } else if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
              bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
            }
          }

          var cont = this.contentsEle
          cont.D_ATTACH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
          this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          return bodyImgFileList
        }
      } catch (error) {
        console.log(error)
      }
    },
    async settingFileList () {
      if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
        var bodyImgFileList = []
        for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
          if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
            bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
          }
        }

        /*  var cont = this.contentsEle
          cont.D_ATTACH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.mFileDownData.D_ATTACH_FILE_LIST = attachFileList
          this.mFileDownData.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS', [cont]) */
        return bodyImgFileList
      }
    },
    async setPreTagInFirstTextLine () {
      // 본문 영역에 첫번째 줄이 사진이 아닐 경우 라인을 그어주기 위한 함수
      // if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      // if (!this.$refs.mainContRef) return
      if (!this.$refs[['mainContRef' + this.contentsEle.contentsKey]]) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return

      // var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)
      if (this.$refs['mainContRef' + this.contentsEle.contentsKey]) var contents = this.$refs['mainContRef' + this.contentsEle.contentsKey]
      if (!contents || !contents.childNodes || contents.childNodes.length === 0) return
      if (contents.childNodes.length > 0) {
        var i = 0
        var child = contents.childNodes[i]
        while (child.innerText === '') {
          child = contents.childNodes[i]
          i += 1

          if (contents.childNodes.length === i) break
        }
        if (child.id === 'formEditText') {
          // 밑에 체크를 안해주면 중복으로 줄이 생김
          var tempCheck = window.document.getElementById('firstTextLine' + this.contentsEle.contentsKey)
          if (tempCheck === undefined || tempCheck === null) {
            var tempDiv = document.createElement('div')
            tempDiv.id = 'firstTextLine' + this.contentsEle.contentsKey
            tempDiv.classList.add('firstTextLine')
            child.prepend(tempDiv)
          }
        } else {
        }
      }
    },
    async getMemoTop () {
      // contentsDetail.vue에서 스크롤 무브로 사용하고 있습니다.
      if (this.propDetailYn === false) return
      this.$nextTick(() => {
        var memoFrist = window.document.getElementById('contentsCardMemoArea' + this.CONT_DETAIL.contentsKey)
        if (!memoFrist) return
        var memoFristTop = memoFrist.offsetTop
        return memoFristTop
      })
    },
    cancelConfirm () {
      this.mConfirmText = this.$t('COMMON_MSG_CANCEL_NOTI')
      this.mCurrentConfirmType = 'alimCancel'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    setIntervalTimer (date, contentsKey) {
      var time = this.$cancelTimer(date)
      // var innerHTML = '<p class="CErrorColor font10 fr mleft-05" style="text-decoration: underline;" id="contentsTime' + contentsKey +'"></p> <p class="font10 fr textRight" id="contentsTime' + contentsKey + '"></p>'
      if (time !== false) {
        this.$nextTick(() => {
          // document.getElementById('timerText'+contentsKey).innerHTML = innerHTML
          setInterval(() => {
            time = this.$cancelTimer(date)
            if (time !== false) {
              if (document.getElementById('timerText' + contentsKey)) document.getElementById('timerText' + contentsKey).innerHTML = time
            } else {
              clearInterval()
              if (document.getElementById('timerBtn' + contentsKey)) document.getElementById('timerBtn' + contentsKey).innerText = ''
              if (document.getElementById('timerText' + contentsKey)) document.getElementById('timerText' + contentsKey).innerText = ''
              if (document.getElementById('timerArea' + contentsKey)) document.getElementById('timerArea' + contentsKey).innerText = ''
            }
          }, 1000)
        })
      }
    },
    cancelTimerShowCheck (contents) {
      var result = false
      if (contents.jobkindId === 'ALIM' && contents.creUserKey === this.GE_USER.userKey) {
        var time = this.$cancelTimer(contents.creDate)
        if (time !== false) {
          result = true
        }
      }
      return result
    },
    memoLoadMore () {
      this.$emit('memoLoadMore')
    },
    writeMemoScrollMove () {
      this.$emit('writeMemoScrollMove')
    },
    handleScroll () {
      this.mClickEndYn = true
    },
    clearMemoObj () {
      this.mMememoValue = null
    },
    writeMeMemo (memoObj) {
      this.mMememoValue = {}
      this.mMememoValue = memoObj
      this.$refs.gMemoRef.setMememo(memoObj)
    },
    memoEmitFunc (emitData) {
      var type = emitData.targetType
      var data = emitData.value
      if (type === 'goUserProfile') {
        if (this.propDetailYn) {
          this.goUserProfile(data.creUserKey)
        } else {
          this.goContentsDetail(undefined, true)
        }
        //
      } else if (type === 'goContentsDetail') {
        // 댓글로 스크롤하기 위해 2번째 파라미터를 true로 보내줌 (1번째는 컨텐츠 더보기 유무)
        this.goContentsDetail(undefined, true)
      } else if (type === 'writeMeMemo') {
        this.writeMeMemo(data)
      }
    },
    confirmOk () {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        if (this.CONT_DETAIL.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.CONT_DETAIL.contentsKey
        } else return false
        param.creUserKey = this.GE_USER.userKey
        toastText = this.$t('COMMON_MSG_REPORT_USER')
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'alimDEL') {
        this.deleteContents(this.$t('COMMON_MSG_DELETED_NOTI'))
      } else if (this.mCurrentConfirmType === 'boardDEL') {
        this.deleteContents(this.$t('COMMON_MSG_DELETED_POST'))
      } else if (this.mCurrentConfirmType === 'alimCancel') {
        this.alimCancle()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    async alimCancle () {
      // 현재 시간과 비교하며 3분이 지났으면 false가 오고있음 혹시 모르니 한번 더 체크하는 중
      var checkTime = this.$cancelTimer(this.contentsEle.creDate)
      if (checkTime !== false) {
        this.mLoadingShowYn = true
        try {
          var param = {}
          param = this.contentsEle
          var result = await this.$commonAxiosFunction({
            url: 'https://www.unibuzzy.com/sUniB/tp.deleteContents',
            param: param
          })
          if (result) {
            this.$emit('contDelete', this.propContIndex)
            // this.$store.commit('UB_CHANNEL/MU_DEL_CONT_LIST', [this.contentsEle])
            this.$showToastPop(this.$t('COMM_MSG_CANCELED_NOTI'))
          }
        } catch (e) {
          this.$showToastPop(this.$t('COMM_MSG_CANCEL_FAIL'))
          console.log(e)
        } finally {
          this.mLoadingShowYn = false
        }
      } else {
        this.$showToastPop(this.$t('COMM_MSG_CANCLE_TIMEOUT'))
      }
    },
    editable (type, allYn) {
      this.mContMenuShowYn = false
      if (type === 'edit') {
        if (this.contentsEle.jobkindId === 'BOAR') {
          this.editBoard()
        }
      } else if (type === 'delete') {
        if (allYn) {
        } else {
          this.deleteConfirm()
        }
      } else if (type === 'alimBloc') {
      } else if (type === 'move' || type === 'copy') {
        this.moveOrCopyContent(type)
      } else if (type === 'writeBoard') {
        this.makeNewContents(type)
      } else if (type === 'writeAlim') {
        this.makeNewContents(type)
      } else if (type === 'subScribe') {
        this.subScribeContents(type)
      } else if (type === 'textCopy') {
        this.textCopy()
      }
    },
    async editBoard () {
      var param = {}
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetType = 'writeContents'
      param.contentsJobkindId = 'BOAR'
      param.jobkindId = 'BOAR'
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) param.attachMfilekey = this.CONT_DETAIL.attachMfilekey
      if (this.CONT_DETAIL.attachFileList) param.attachFileList = this.CONT_DETAIL.attachFileList
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      param.value = this.CONT_DETAIL
      this.$emit('openPop', param)
    },
    deleteConfirm () {
      if (this.contentsEle.jobkindId === 'ALIM') {
        this.mConfirmText = this.$t('COMMON_MSG_DELETE_NOTI')
        this.mCurrentConfirmType = 'alimDEL'
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        this.mConfirmText = this.$t('COMMON_MSG_DELETE_POST')
        this.mCurrentConfirmType = 'boardDEL'
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    async deleteContents (toastText) {
      var result
      var inParam = {}
      if (this.contentsEle.jobkindId === 'ALIM') {
        inParam = {}
        inParam.mccKey = this.contentsEle.mccKey
        inParam.jobkindId = 'ALIM'
        result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.deleteMCabContents',
          param: inParam
        })
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        inParam = {}
        inParam.mccKey = this.contentsEle.mccKey
        inParam.contentsKey = this.contentsEle.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.contentsEle.creTeamKey
        inParam.deleteYn = true
        result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.deleteContents',
          param: inParam
        })
      }
      if (result) {
        this.$showToastPop(toastText)
      }
      // 반복문에 index값을 prop으로 받아 해당 함수가 리스트에 몇번째에서 발생한지 인지하고 그 인덱스를 삭제
      this.$emit('contDelete', this.propContIndex)
      // @@@ 추후에 vuex에 컨텐츠 삭제를 해야함 @@@@ @@@@ @@@@ @@@@ @@@@ #추가
      // this.$store.commit('UB_CHANNEL/MU_DEL_CONT_LIST', inParam)
    },
    moveOrCopyContent (type) {
      this.mSelectBoardType = type
      this.mMoveContentsDetailValue = this.CONT_DETAIL
      this.mSelectBoardPopShowYn = true
    },
    closeSelectBoardPop () {
      this.mSelectBoardPopShowYn = false
    },
    async makeNewContents (type) { // writeBoard -> 알림을 게시글로 작성, writeAlim -> 게시글을 알림으로 작성
      if (this.contentsEle.creTeamKey && type !== 'writeBoard' && (!this.CHANNEL_DETAIL.ownerYn || !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) && (!this.CHANNEL_DETAIL.memberYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn) && (this.CHANNEL_DETAIL.memberYn === 0 || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 0) && (!this.CHANNEL_DETAIL.managerKey || !this.CHANNEL_DETAIL.D_CHAN_AUTH.managerKey)) {
        this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
        // this.$checkDeleteHistory('bottomWriteSheets')
        // this.$emit('openMember')
        return
      }
      // const param = {}
      // param.contentsKey = this.contentsEle.contentsKey
      // param.targetKey = this.contentsEle.contentsKey
      // param.jobkindId = this.contentsEle.jobkindId
      // param.userKey = this.GE_USER.userKey
      // param.ownUserKey = this.GE_USER.userKey
      // var resultList = await this.$getContentsList(param)
      var writeParam = {}
      writeParam.contentsJobkindId = type === 'writeBoard' ? 'BOAR' : 'ALIM'
      writeParam.targetKey = this.contentsEle.creTeamKey
      writeParam.teamKey = this.contentsEle.creTeamKey
      writeParam.currentTeamKey = this.contentsEle.creTeamKey
      writeParam.attachMfilekey = this.contentsEle.attachMfilekey
      if (this.contentsEle.attachFileList) writeParam.attachFileList = this.contentsEle.attachFileList
      writeParam.targetType = 'writeContents'
      if (writeParam.contentsJobkindId === 'ALIM') {
        writeParam.UseAnOtherYn = true
        writeParam.targetNameMtext = this.CHANNEL_DETAIL.nameMtext
      } else if (writeParam.contentsJobkindId === 'BOAR') {
        var teamList = await this.$getWriteBoardData(this.contentsEle.creTeamKey)
        if (teamList === false) {
          this.$showToastPop(this.$t('COMM_MSG_CHAN_NONE'))
          return
        }
        writeParam.selectBoardYn = true
        writeParam.UseAnOtherYn = true
        writeParam.initData = teamList
      }
      writeParam.titleStr = this.contentsEle.title
      writeParam.bodyFullStr = this.contentsEle.bodyFullStr
      writeParam.modiContentsKey = this.contentsEle.contentsKey
      this.$emit('openPop', writeParam)
      // this.mSeleteWriteTypePopShowYn = false
    },
    /* makeNewContents (type) {
      var tempData = JSON.parse(JSON.stringify(this.contentsEle))
      tempData.contentsJobkindId = type === 'writeBoard' ? 'BOAR' : type === 'writeAlim' ? 'ALIM' : undefined
      tempData.targetType = 'writeContents'

      tempData.UseAnOtherYn = true
      tempData.selectBoardYn = true

      // tempData.bodyFullStr = tempData.bodyFullStr
      tempData.titleStr = tempData.title

      tempData.modiContentsKey = tempData.contentsKey

      this.$emit('openPop', tempData)
    }, */
    bloc (type) {
      var typeText = type === 'USER' ? this.$t('COMMON_TITLE_USER') : this.$t('COMMON_TAB_POST')
      // this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      if (this.GE_LOCALE === 'ko') {
        this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      } else {
        return 'Block this' + typeText + '?'
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    returnConfirmText () {
      if (this.GE_LOCALE === 'ko') {
        return '[' + this.$changeText(this.chanDetail.nameMtext) + '] 채널에 <br>멤버신청서를 제출하시겠습니까?'
      } else {
        return `Do you want to apply for membership on the [${this.$changeText(this.chanDetail.nameMtext)}] channel?`
      }
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText
      if (type === 'ALIM') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = this.$t('COMMON_MSG_REPORT_NOTI')
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = this.$t('COMMON_MSG_REPORT_POST')
      } else if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.memoKey
        toastText = this.$t('COMMON_MSG_REPORT_COMMENT')
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.CONT_DETAIL.creTeamKey
        toastText = this.$t('COMMON_MSG_REPORT_CHAN')
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.CONT_DETAIL.creUserKey
        toastText = this.$t('COMMON_MSG_REPORT_USER')
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.saveClaimLog',
          param: param
        })
        if (result) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    contentMenuClick () {
      this.mContMenuShowYn = true
    },
    textCopy () {
      const textarea = document.createElement('textarea')
      // textarea.style.display = 'none'
      document.body.appendChild(textarea)

      var contKey, content
      try {
        if (this.contentsEle.jobkindId) {
          contKey = this.contentsEle.contentsKey
          // content = document.getElementById('bodyFullStr' + contKey).innerText
          content = this.$refs[['mainContRef' + contKey]].innerText
        }

        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop(this.$t('COMMON_MSG_COPY_SUCCESS'))
      } catch (error) {
        this.$showToastPop(this.$t('COMMON_MSG_COPY_FAIL'))
      }
    },
    async saveMemo (inSaveMemoObj) {
      if (inSaveMemoObj.saveMemoHtml === undefined) return
      this.mLoadingShowYn = true
      var memo = {}
      if (inSaveMemoObj.attachFileList) {
        memo.attachFileList = inSaveMemoObj.attachFileList
      }
      memo.parentMemoKey = null
      if (this.mMememoValue !== undefined && this.mMememoValue !== null && this.mMememoValue !== {}) {
        memo.parentMemoKey = this.mMememoValue.parentMemoKey
      }

      memo.bodyFullStr = inSaveMemoObj.saveMemoHtml
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.toUserKey = this.CONT_DETAIL.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      memo.allYn = true
      memo.ownUserKey = this.GE_USER.userkey
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (result.data.resultList && result.data.resultList.memoList.length > 0) {
            var saveMemoObj = {}
            var index
            this.$emit('scrollToMemoTop')
            if (memo.parentMemoKey) {
              // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
              index = await result.data.resultList.memoList.findIndex((item) => item.memoKey === memo.parentMemoKey)
              saveMemoObj = await result.data.resultList.memoList[index]
            } else {
              saveMemoObj = await result.data.resultList.memoList[0]
            }
            saveMemoObj.creTeamKey = this.CONT_DETAIL.creTeamKey
            saveMemoObj.jobkindId = this.CONT_DETAIL.jobkindId
            await this.$store.commit('UB_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.mLoadingShowYn = false
      }
    },
    /** 컨텐츠의 크기를 비교해서 더보기> 버튼 보여주는 함수 */
    async setContentsMoreText () {
      // 컨텐츠가 게시글이면서 권한이 없으면 리턴
      // if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      if (!this.$refs['mainContRef' + this.contentsEle.contentsKey]) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      try {
        if (this.propDetailYn === true) { this.alimBigView(); return }

        // var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey).offsetHeight
        if (this.$refs['mainContRef' + this.contentsEle.contentsKey]) {
          var contents = this.$refs['mainContRef' + this.contentsEle.contentsKey].offsetHeight
        }

        // 이미지를 불러오는 이유는 마운트 시점에 이미지의 크기를 못받오기에 추가함
        var imgList = await window.document.querySelectorAll('#bodyFullStr' + this.contentsEle.contentsKey + ' img')
        if (imgList && imgList.length > 0) {
          for (let i = 0; i < imgList.length; i++) {
            imgList[i].addEventListener('load', (event) => {
              try {
                var imgsHeight = 0
                imgsHeight += imgList[i].clientHeight
                // imgsHeight += event.path[0].clientHeight
                var contentHeight = contents + imgsHeight
                // var bodyMoreText = this.$refs['bodyMoreRef' + this.contentsEle.contentsKey]
                // var bodyMoreText = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
                if (contentHeight > 399) {
                  // this.mMoreYn = true
                  this.mContentMoreShowYn = true
                } else {
                  this.mContentMoreShowYn = false
                }
              } catch (error) {
              }
            })
          }
        } else {
          var contentHeight = contents
          // var bodyMoreText = await window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
          if (contentHeight > 399) {
            // bodyMoreText.style.display = 'block'
            this.mContentMoreShowYn = true
          } else {
            this.mContentMoreShowYn = false
          }
        }
        // })
      } catch (e) {
        console.log(e)
      }
    },
    async contentsSharePop () {
      var link = await this.$makeShareLink(this.CONT_DETAIL.contentsKey, 'contentsDetail', this.CONT_DETAIL.bodyFullStr, this.CONT_DETAIL.title)
      var shareItem = { title: this.$t('COMMON_NAME_APP'), text: this.CONT_DETAIL.title, url: link }
      if (navigator.share) {
        navigator.share(shareItem)
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
      /*  if (window.navigator.share) {
        window.navigator.share({ title: '더알림', text: this.CONT_DETAIL.title, url: this.CONT_DETAIL.copyTextStr })
      } else {
        this.$showToastPop('지원하지 않는 브라우저입니다.')
      } */
    },
    goChannelMain () {
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'chanDetail'
      // targetContentsKey키를 주면 스크롤 이벤트가 작동
      // openPopParam.targetContentsKey = this.CONT_DETAIL.contentsKey
      this.$emit('openPop', openPopParam)
    },
    async goUserProfile (targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('CONF_MSG_CHECK_UNABLE'))
        return
      }
      // const result = await this.$getAxiosContentsDetail(this.CONT_DETAIL.contentsKey, this.CONT_DETAIL.jobkindId)
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.CONT_DETAIL.creUserKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (targetUserKey) openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.mPopParam = openPopParam
      this.mProfilePopShowYn = true
    },
    goContentsDetail (moreCheckYn, memoScrollYn) {
      if (this.propDetailYn) return
      // 권한이 없는 컨텐츠는 이동하지 못하게 리턴
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      // if (window.getSelection() !== null || window.getSelection() !== '') return
      if (moreCheckYn) {
        this.alimBigView()
        return
      }
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      var openPopParam = {}
      openPopParam.targetType = 'contentsDetail'
      openPopParam.targetKey = this.CONT_DETAIL.contentsKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.creTeamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.jobkindId = this.CONT_DETAIL.jobkindId
      if (memoScrollYn) openPopParam.memoScrollYn = true

      if (this.CONT_DETAIL.jobkindId === 'ALIM') {
        openPopParam.popHeaderText = this.CONT_DETAIL.nameMtext
      } else if (this.CONT_DETAIL.jobkindId === 'BOAR') {
        openPopParam.popHeaderText = this.CONT_DETAIL.cabinetNameMtext
      }
      if (this.CONT_DETAIL.officialYn) {
        openPopParam.officialYn = this.CONT_DETAIL.officialYn
      }
      openPopParam.value = this.CONT_DETAIL

      this.$emit('openPop', openPopParam)
    },
    async changeAct (act, key) {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      // eslint-disable-next-line no-unused-vars
      var result = null
      var saveYn = true
      var changeUserDoList = []
      var tempDetail = this.CONT_DETAIL
      if (!tempDetail.D_CONT_USER_DO) {
        tempDetail.D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
      }
      changeUserDoList = tempDetail.D_CONT_USER_DO
      for (var i = 0; i < changeUserDoList.length; i++) {
        if (changeUserDoList[i].doType === act.doType) {
          if (changeUserDoList[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.propParams).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          tempDetail.likeCount -= 1
        }
        for (i = 0; i < changeUserDoList.length; i++) {
          if (changeUserDoList[i].doType === act.doType) {
            changeUserDoList[i].doKey = 0
          }
        }
        tempDetail.D_CONT_USER_DO = changeUserDoList
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then(result => {
          for (var d = changeUserDoList.length - 1; d >= 0; d--) {
            if (changeUserDoList[d].doType === act.doType) {
              changeUserDoList[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          tempDetail.D_CONT_USER_DO = changeUserDoList
          tempDetail.likeCount = result.likeCount
          if (result.result === true && act.doType === 'LI') {
            tempDetail.subsYn = result.subsYn = 1
          }
          tempDetail.starCount = result.starCount
          this_.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        })
        for (var d = changeUserDoList.length - 1; d >= 0; d--) {
          if (changeUserDoList[d].doType === act.doType) {
            changeUserDoList[d].doKey = 1
          }
        }
        if (act.doType === 'LI') {
          tempDetail.likeCount += 1
        }
        if (act.doType === 'ST') {
          tempDetail.starCount += 1
        }
        this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        // }
      }
    },
    async subScribeContents () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        // this.$showToastPop('로그인 후 이용가능합니다.')
        return
      }
      // eslint-disable-next-line no-unused-vars
      var result = null
      var subsYn = this.CONT_DETAIL.subsYn
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetKind = 'C'
      if (param.targetKey === null) { return }
      if (subsYn !== null && subsYn !== undefined) {
        param.subsYn = !subsYn
      } else {
        param.subsYn = true
      }
      param.userKey = this.GE_USER.userKey
      // var req = 'save'
      var reqText = ''
      if (this.GE_LOCALE === 'ko') {
        reqText = '해당 컨텐츠의 알림설정이 되었습니다.'
      } else {
        reqText = 'The noti for that content has been turned on.'
      }
      if (!param.subsYn) {
        if (this.GE_LOCALE === 'ko') {
          reqText = '해당 컨텐츠의 알림설정이 해제되었습니다.'
        } else {
          reqText = 'The noti for that content has been turned off.'
        }
      }
      // eslint-disable-next-line no-redeclare
      var result = await this.$commonAxiosFunction({
        url: 'https://www.unibuzzy.com/sUniB/tp.saveSubscribe',
        param: { subscribe: param }
      })
      this.$showToastPop(reqText)
      this.cDetail.subsYn = param.subsYn
      var contentsDetail = this.CONT_DETAIL
      // contentsDetail.subsYn = param.subsYn
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    openWorkStatePop (data) {
      this.mWorkStateCodePopProps = data
      this.mWorkStateCodePopShowYn = true
    },
    async addImgEvnt () {
      // if (!this.imgClickYn) return
      var contBody = this.$refs.contentsBoxRef
      if (!contBody) return
      // var fileList = await this.settingFileList()
      this.mClickImgList = contBody.querySelectorAll('img')
      for (let m = 0; m < this.mClickImgList.length; m++) {
        var this_ = this
        this_.mClickImgList[m].addEventListener('click', () => {
          if (!this_.mContentMoreShowYn) {
            this_.$emit('openImgPop', [this_.mClickImgList, m])
          }
        })
      }
    },
    openImgDetailAlert (img) {
      if (this.imgClickYn === false) return
      // var history = this.$store.getters['UB_HISTORY/hStack']
      // this.alertPopId = 'imgDetailAlertPop' + history.length
      // this.alertPopId = this.$setParentsId(this.pPopId, this.alertPopId)
      // history.push(this.alertPopId)
      // this.$store.commit('UB_HISTORY/updateStack', history)
      this.mImgDetailAlertShowYn = true
      this.mClickEndYn = false
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.mImgDetailAlertShowYn = false
        this.mClickEndYn = false
        this.mPreviewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.$getMobileYn()) {
          onMessage('REQ', 'saveCameraRoll', this.mSelectImgObject.path)
        } else {
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(this.mSelectImgObject.fileKey, this.mSelectImgObject.path)
        }
        this.$showToastPop(this.$t('COMM_MSG_AFTER_SAVE'))
        this.mImgDetailAlertShowYn = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_STICKER_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_STICKER_LIST']
    },
    CHANNEL_DETAIL () {
      var detail = this.$getDetail('TEAM', this.contentsEle.creTeamKey)
      if (detail && detail.length > 0) {
        if (!detail[0].D_CHAN_AUTH || detail[0].D_CHAN_AUTH === true || (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    },
    CONT_DETAIL () {
      if (!this.contentsEle) return
      var cont = this.$getContentsDetail(null, this.contentsEle.contentsKey, this.contentsEle.creTeamKey)
      if (!cont) {
        cont = [this.contentsEle]
        // this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.contentsEle])
      }
      if (cont && cont.length > 0) {
        const viewAuth = this.$checkUserAuth(cont[0].shareItem).V
        /* if (cont[0].shareList) {
          const shareList = cont[0].shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
        cont[0].VIEW_YN = viewAuth
        return cont[0]
      } else {
        var content = this.contentsEle
        const viewAuth = this.$checkUserAuth(this.contentsEle.shareItem).V
        /* if (this.contentsEle.shareList) {
          const shareList = this.contentsEle.shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
        content.VIEW_YN = viewAuth
        return content
      }
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
      // return this.$store.getters['UB_USER/GE_USER']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['UB_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
      },
      deep: true
    },
    GE_STICKER_LIST: {
      handler (value, old) {
        if (this.GE_STICKER_LIST.length === 0) {
          this.CONT_DETAIL.D_CONT_USER_STICKER_LIST = []
          return
        }
        if (this.CONT_DETAIL.D_CONT_USER_STICKER_LIST.length > 0) {
          var newArr = []
          var idx
          for (var i = 0; i < this.CONT_DETAIL.D_CONT_USER_STICKER_LIST.length; i++) {
            if (this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker !== null) {
              idx = this.GE_STICKER_LIST.findIndex((value) => {
                return value.stickerKey === this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker.stickerKey
              })
              if (idx !== -1) {
                this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker.picBgPath = this.GE_STICKER_LIST[idx].picBgPath
                this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker.nameMtext = this.GE_STICKER_LIST[idx].nameMtext
                newArr.push(this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i])
              }
            }
          }
          this.CONT_DETAIL.D_CONT_USER_STICKER_LIST = newArr
        }
      },
      deep: true
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        // if (this.contentsEle && (content === undefined || content === null)) content = this.contentsEle
        if (value[0].targetKey !== content.contentsKey) return
        // this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
        var memoAleadyIdx = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
        if (memoAleadyIdx !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [
            value[0],
            ...content.D_MEMO_LIST
          ]
        }
        this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newArr)
        // eslint-disable-next-line vue/no-mutating-props
        this.contentsEle.D_MEMO_LIST = this.replaceArr(newArr)
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
      },
      deep: true
    }
  }
}
</script>

<style scoped>
#loading {
  display: block;
  z-index:9999999
}
.contentsCard {
  background: #FFFFFF;
  border-bottom: 2px solid #E1E1E1;
  display: flex;
  flex-direction: column;
}
.contentsCardLogoArea {
    width: 30px;
    height: 30px;
    overflow: hidden;
    float: left;
    border-radius: 100%;
    border: 2px solid #5B1CFC;
    display: flex;
    justify-content: center;
    align-items: center;
}
.overHidden{
  overflow: hidden;
}
pre div[id='formEditText'] {
  border-top: 1px solid #ccc;
}
.profilePopBg {
  background-color: #00000050;
  width:100%;
  height:100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
}
.contentsWrap {
  height: 160px;
  width: 60%;
  background: #FFF;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 20px;
  float: left;
  box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4);
  margin-bottom: 10px;
  position: relative;
  border-radius: 8px;
}
.stickerBox {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
}
.contentsCardHeaderArea {
  width: 100%;
  min-height: 20px;
  float: left;
  padding: 10px 20px;
}
.chanImgBox {
  width: calc(100% - 2px);
  height:  calc(100% - 2px);
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.contentsDetailArea {
  width: calc(100% - 40px);
  margin-left: 10px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
}
.contentsHeaderBox {
  width: 100%;
  position: relative;
  height: 50%;
  min-height: 26px;
  position: relative;
}
.noPerm {
  width: calc(100% - 35px);
}
.jobkindImg {
  width: 20px;
  margin-top: 2px;
  float: left;
  margin-right: 5px;
}
.moreBtn {
  width: 30px;
  position: absolute;
  right: 0;
  top: 0;
}
.contentsInfoBox {
  width: 100%;
  position: relative;
  height: 50%;
  min-height: 25px;
}
.userInfoBox {
  line-height: 23px;
  height: 23px;
  width: calc(100% - 75px);
}
.userInfoBox > p {
  line-height: 23px;
}
.receiveUser {
  padding: 0px 8px;
  border-radius: 8px;
  height: 18px;
  display: flex;
  align-items: center;
}
.userCount {
  line-height: 1;
  margin-top: 1px;
}
.replyBtn {
  margin-top: 2px;
}
.contentsCardBodyArea {
  width: 100%;
  float: left;
  height: 32px;
  position: relative;
}
.bodyFullStr {
  min-height: 30px;
}
.contentsBoxWrap {
  word-break: break-all;
  overflow: hidden;
  max-height: 300px;
}
.contentsPre {
  word-break: break-all;
  overflow: hidden auto;
}
.stickerArea {
  width: 100%;
  padding: 5px 10px;
  padding-left: 20px;
  padding-bottom: 0;
  float: left;
  min-height: 20px;
  margin-top: 10px;
}
.stickerItem {
  float: left !important;
  margin-right: 5px !important;
  min-width: 30px !important;
}
.fadeEffect {
  position: absolute;
  bottom: -20px;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
}
.bodyMore {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.stickerAreaFull {
  width: 100%;
  padding: 5px 10px;
  padding-bottom: 0;
  float: left;
  min-height: 35px;
}
.contentsCardUserDoArea {
  position: relative;
  width: 100%;
  background: #F8F8FF;
  min-height: 40px;
  float: left;
  justify-content: space-between;
  display: flex;
  margin-top: 15px;
  padding: 10px 20px;
}
.userDoBox {
  float: left;
  width: calc(100% - 40px);
  height: 100%;
}
.userDoCont {
  cursor: pointer;
  width: 15px;
  height: 25px;
  display: flex;
  float: left;
  margin-right: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userDoImgBox {
  width: 100%;
  height: 20px;
  float: left;
}
.shareBox {
  width: 30px;
  height: 25px;
  display: flex;
  float: right;
  margin-right: 10px;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.shareImgBox {
  width: 100%;
  height: 20px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shareImgBox > img {
  height: 15px;
}
.selectBoardPopShadow {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #00000010;
  z-index: 9;
  top: 0;
  left: 0;
}
.selectBoardPopBg {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
}
.imgPreviewPop {
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0px !important;
  left: 0% !important;
  z-index: 999999 !important;
  padding: 20px 0 !important;
  background: #000000 !important;
}
.recvPopBg {
  width: calc(100% + 1rem);
  height: 100%;
  top: 0;
  z-index: 10;
  left: -1rem;
  position: fixed;
  background: #00000026;
}
.creDate {
  width: 75px;
}
</style>

<style>
.contentsCardBodyArea .formLine, .contentsCardBodyArea .formDot {
  padding: 0 10px !important;
}
</style>
