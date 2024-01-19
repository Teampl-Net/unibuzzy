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
  <div v-if="mLoadingShowYn" id="loading"><div class="spinner"></div></div>
  <!-- <div class="profilePopBg" v-if="mProfilePopShowYn" @click="closeProfilePop"></div> -->
  <!-- <userDetailPop v-if="mProfilePopShowYn" :propData="mPopParam" :pClosePop="closeProfilePop" /> -->
  <div class="profilePopBg" v-if="mWorkStateCodePopShowYn" @click="mWorkStateCodePopShowYn = false"></div>
  <statCodePop @closeXPop="mWorkStateCodePopShowYn = false" :currentWorker="{workUserKey: mWorkStateCodePopProps.workUserKey, workUserName: mWorkStateCodePopProps.workUserName}" :teamKey="mWorkStateCodePopProps.creTeamKey" :alimDetail="mWorkStateCodePopProps" :contentsKey="mWorkStateCodePopProps.contentsKey" v-if="mWorkStateCodePopShowYn" :codeList="mWorkStateCodePopProps.workStatCodeList" :currentCodeKey="mWorkStateCodePopProps.workStatCodeKey" class="fr "></statCodePop>
  <div class="profilePopBg" v-if="mContMenuShowYn" @click="mContMenuShowYn = false"></div>
  <gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false" @report="report" @editable="editable" @bloc="bloc" :contentsInfo="CONT_DETAIL" :contentType="CONT_DETAIL.jobkindId" :contentOwner="GE_USER.userKey === CONT_DETAIL.creUserKey"/>
  <div class="profilePopBg" v-if="mFilePopYn" @click="mFilePopYn = false"></div>
  <attachFileListPop propTargetType="C" :propFileData="mFilePopData" @clickFileDownload="clickFileDownload" v-if="mFilePopYn === true" @closePop="mFilePopYn = false"/>
  <div :class="animationYn? 'newContentsAni':''" class="contentsWrap" @dragenter="onDragenter" @dragleave="onDragleave" @dragover="onDragover" key="animationYn" v-if="CONT_DETAIL" :style="`padding-bottom: ${$STATUS_HEIGHT}px; ${propTargetType !=='contentsDetail'? 'box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4);':''}`">
    <div v-if="propJustShowYn" :style="propPreStickerList && propPreStickerList.length > 0? 'height: calc(100% - 50px);' : 'height: calc(100%); '" class="justSticker"></div>
    <div class="contentsCardHeaderArea">
      <img class="fl" src="../../../assets/images/todo/checkboxBlank.png" width="40" height="40"/>
      <!-- <div @click="goChannelMain" :style="GE_USER.userKey === CONT_DETAIL.creUserKey? 'border: 2px solid #5B1CFC !important; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" class="contentsCardLogoArea" >
        <div class="chanIcon" :style="'background-image: url(' + (CONT_DETAIL.domainPath ? CONT_DETAIL.domainPath + $changeUrlBackslash(CONT_DETAIL.logoPathMtext) : CONT_DETAIL.logoPathMtext) + ');'"></div>
      </div> -->
      <div class="contentsCardInfo" >
        <div class="contentsCardInfoBox">
          <template v-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN === false && CONT_DETAIL.creUserKey !== GE_USER.userKey) && CONT_DETAIL.titleBlindYn">
            <p class="textLeft textOverdot commonBlack fontBold font16 noPerm">
              {{ $t('COMM_MSG_NOPERM') }}
            </p>
          </template>
          <template v-else>
            <p @click="goContentsDetail()" class="cursorDragText textLeft textOverdot commonBlack fontBold font16 noPerm" :class="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''">
                <img v-if="CONT_DETAIL.jobkindId === 'ALIM'" src="@/assets/images/push/contTitle_alim.svg" class="cursorNotDrag" alt="">
                <img v-else-if="CONT_DETAIL.jobkindId === 'BOAR'" src="@/assets/images/push/contTitle_board.svg" class="cursorNotDrag" alt="">
                {{CONT_DETAIL.title}}
            </p>
            <img v-if="!pNoAuthYn" class="moreMenu" src="@/assets/images/push/contents_moreBtnIcon.svg" alt="" @click="contentMenuClick">
          </template>
        </div>
        <div class="userInfoArea">
          <div class="CLDeepGrayColor font14 fl textLeft fontBold lineHeight23">
            <p v-if="CONT_DETAIL.jobkindId === 'BOAR'" class="CLDeepGrayColor font14 fl textLeft fontBold " @click="goChannelMain()">
              <img class="officialImg fl" src="@/assets/images/channel/icon_official2.svg" v-if="CONT_DETAIL.officialYn" alt="" />
              <span class="fl">
                {{ $changeText(CONT_DETAIL.cabinetNameMtext) }}
              </span>
              <span class="textOverdot fl chanName">
                ({{$changeText(CONT_DETAIL.nameMtext)}})
              </span>
            </p>
            <p v-else class="CLDeepGrayColor font14 fl textLeft fontBold " @click="goChannelMain()">
              <img class="officialImg fl" src="@/assets/images/channel/icon_official2.svg" v-if="CONT_DETAIL.officialYn" alt="" />
              <span class="fl"> {{$changeText(CONT_DETAIL.nameMtext)}}</span>
            </p>
            <span @click="goUserProfile()" class="mleft-03 fontNomal">
              <span class="fontNomal">|</span> {{$changeText(CONT_DETAIL.creUserName)}}
            </span>
          </div>
          <p class="fr CLDeepGrayColor font12 lineHeight23">{{$changeDateFormat(CONT_DETAIL.creDate)}}</p>
        </div>
          <div v-if="!GE_USER.unknownYn" class="w100P fl">
            <statCodeComponent v-if="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && !pNoAuthYn" @click="openWorkStatePop(CONT_DETAIL)" :alimDetail="CONT_DETAIL" class="fr" :contentsKey="CONT_DETAIL.contentsKey" :teamKey="CONT_DETAIL.creTeamKey" :currentCodeKey="CONT_DETAIL.workStatCodeKey" :codeList="CONT_DETAIL.workStatCodeList" />
          </div>
      </div>
    </div>
    <div v-if="!propJustShowYn" :class="(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)? 'opacity05': ''"  @click="goContentsDetail(true)" class="contentsCardBodyArea" style="width: 100%;  float: left; min-height: 20px; position: relative;">
      <div v-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN === false && CONT_DETAIL.creUserKey !== GE_USER.userKey) && !CONT_DETAIL.titleBlindYn" class="font14 cursorP mbottom-05 bodyFullStr" style="min-height: 30px;" v-html="$notPerText()"></div>
      <div v-else-if="!pNoAuthYn && (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN  === false && CONT_DETAIL.creUserKey !== GE_USER.userKey) && CONT_DETAIL.titleBlindYn" class="" ></div>
      <div v-else class="fl w100P contentsPreWrap" ref="contentsBoxRef" :id="'contentsBodyBoxArea'+CONT_DETAIL.contentsKey">
        <pre :ref="'mainContRef' + CONT_DETAIL.contentsKey" @loadeddata="testLoad"  :class="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''" :id="'bodyFullStr'+CONT_DETAIL.contentsKey" class="font14 mbottom-05 mainConts cursorDragText h100P w100P fl contentsPre" v-html="$setBodyLength(CONT_DETAIL.bodyFullStr, CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)"></pre>
      </div>
      <p v-if="!mFadeNotShowYn && !mContentMoreShowYn && !mFoldYn" @click.stop="foldContentsDetail" class="w100P textRight fr font14 commonColor fontBold mtop-05 mright-1 cursorP"> Fold &lt; </p>
      <div v-if="!mFadeNotShowYn && mContentMoreShowYn && mFoldYn" class="w100P fadeEffect"></div>
      <p :ref="'bodyMoreRef' + CONT_DETAIL.contentsKey" v-if="!mFadeNotShowYn && mContentMoreShowYn && mFoldYn" class="cursorP w100P textRight fr font14 commonColor fontBold mtop-05 mright-1 moreBtn">{{$t('COMMON_NAME_MORE')}} > </p>
    </div>
    <template v-if="!propJustShowYn && (pNoAuthYn || (CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN  === true) || CONT_DETAIL.jobkindId === 'ALIM' || CONT_DETAIL.creUserKey === GE_USER.userKey)" :class="(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)? 'opacity05': ''" >
      <div class="contentsCardUserDoArea">
        <div class="contentsCardUserDoWrap">
          <!-- <div class="userDoBox" @click="GE_USER.unknownYn ? pOpenUnknownLoginPop(CONT_DETAIL) : changeAct(CONT_DETAIL.D_CONT_USER_DO[1], CONT_DETAIL.contentKey)">
            <div class="userDoItem">
              <img v-if="CONT_DETAIL.D_CONT_USER_DO && !CONT_DETAIL.D_CONT_USER_DO[1].doKey" class="" src="@/assets/images/contents/cont_like_no.svg" alt="">
              <img v-else src="@/assets/images/contents/cont_like.svg" alt="" class="">
            </div>
            <p class="font12 fl fontBold w100P mtop-01  userDoColor">{{CONT_DETAIL.likeCount}}</p>
          </div> -->
          <!-- <div class="userDoBox" @click="GE_USER.unknownYn ? pOpenUnknownLoginPop(CONT_DETAIL) : changeAct(CONT_DETAIL.D_CONT_USER_DO[0], CONT_DETAIL.contentKey)">
            <div class="userDoItem">
              <img v-if="CONT_DETAIL.D_CONT_USER_DO && !CONT_DETAIL.D_CONT_USER_DO[0].doKey" class="" src="@/assets/images/contents/cont_star_no.svg" alt="">
              <img v-else src="@/assets/images/contents/cont_star.svg" alt="" class="">
            </div>
            <p class="font12 fontBold fl mtop-01  w100P userDoColor">{{CONT_DETAIL.starCount}}</p>
          </div> -->
          <div class="userDoBox" @click="goContentsDetail(undefined, true)">
            <div class="userDoItem">
              <img v-if="mWriteMemoYn" src="@/assets/images/contents/cont_memo.svg" class="" alt="">
              <img v-else src="@/assets/images/contents/cont_memo_no.svg" class="" alt="">
            </div>
            <p class="font12 fontBold mtop-01 fl w100P userDoColor">{{CONT_DETAIL.memoCount}}</p>
          </div>
          <div class="userDoBox" @click="clickFileDownload()" v-if="CONT_DETAIL.attachMfilekey && CONT_DETAIL.attachMfilekey > 0 && CONT_DETAIL.fileCount > 0">
            <div class="userDoItem">
              <img v-if="CONT_DETAIL.attachMfilekey && CONT_DETAIL.attachMfilekey > 0" src="@/assets/images/push/contentsClipIcon.svg" class="" alt="">
              <img v-else src="@/assets/images/push/contentsClipIcon.svg" class="" alt="">
          </div>
          <p class="font12 fontBold mtop-01 fl w100P userDoColor">{{CONT_DETAIL.fileCount}}</p>
        </div>
      </div>
        <div class="contShare">
          <div class="contShareBox">
            <div>
              <img src="@/assets/images/push/contentsShareIcon.svg" class=" fl" alt="공유 아이콘"
                  data-clipboard-action="copy" id="boardDetailCopyBody" @click="contentsSharePop()"
                      :data-clipboard-text="CONT_DETAIL.copyTextStr">
            </div>
            <p class="font12 fl fontBold w-100P mtop-01 userDoColor">{{$t('COMMON_NAME_SHARE')}}</p>
          </div>
        </div>
      </div>
      <div class="contentsCardMemoArea" v-if="!pNoAuthYn && CONT_DETAIL.D_MEMO_LIST && CONT_DETAIL.D_MEMO_LIST.length > 0" :id="'contentsCardMemoArea'+CONT_DETAIL.contentsKey">
        <p v-if="propDetailYn === false && mMemoMoreShowYn" class="fl w-100P textLeft font12 commonColor fontBold mbottom-05 mright-05" @click="goContentsDetail(undefined, true)" >{{ returnCommentText() }}</p>
        <template v-for="(memo, mIndex) in CONT_DETAIL.D_MEMO_LIST" :key="mIndex">
            <memoCompo @updateMemo="updateMemo"  @openImgPop="openImgPop" :propContDetail="CONT_DETAIL" :diplayCount="-1" @saveModiMemo="saveModiMemo" v-if="propDetailYn || mIndex < 3" :childShowYn="propDetailYn" :propMemoEle="memo" :propMIndex="mIndex" :propMemoLength="this.CONT_DETAIL.D_MEMO_LIST.length" @memoEmitFunc='memoEmitFunc' />
        </template>
        <myObserver v-if="propDetailYn === true" @triggerIntersected="memoLoadMore" id="observer" class="fl w100P"></myObserver>
      </div>
      <div class="contentsCardMemoArea" v-else-if="pNoAuthYn && CONT_DETAIL.memoList && CONT_DETAIL.memoList.length > 0" :id="'contentsCardMemoArea'+CONT_DETAIL.contentsKey">
          <template v-for="(memo, mIndex) in CONT_DETAIL.memoList" :key="mIndex">
              <memoCompo :pNoAuthYn="pNoAuthYn" @updateMemo="updateMemo"  @openImgPop="openImgPop" :propContDetail="CONT_DETAIL" :diplayCount="-1" @saveModiMemo="saveModiMemo" v-if="propDetailYn || mIndex < 3" :childShowYn="propDetailYn" :propMemoEle="memo" :propMIndex="mIndex" :propMemoLength="this.CONT_DETAIL.memoList.length" @memoEmitFunc='memoEmitFunc' />
          </template>
          <p v-if="propDetailYn === false && mMemoMoreShowYn" class="fr font14 commonColor fontBold mtop-05 mright" @click="goContentsDetail(undefined, true)" >{{ returnCommentText() }}</p>
          <myObserver v-if="propDetailYn === true" @triggerIntersected="memoLoadMore" id="observer" class="fl w100P"></myObserver>
      </div>
    </template>
  </div>
  <!-- 밑에는 댓글 작성 창 -->
  <gMemoPop style="position: absolute; bottom: 0;" :resetMemoYn="mMemoResetYn"  v-if="!pNoAuthYn && propDetailYn && !(CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.VIEW_YN  === false && CONT_DETAIL.creUserKey !== GE_USER.userKey)" ref="gMemoRef" transition="showMemoPop" :mememo='mMememoValue'  @saveMemoText="saveMemo"  @clearMemoObj='clearMemoObj' @writeMemoScrollMove='writeMemoScrollMove' />
  <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk" @no='mConfirmPopShowYn=false'/>
  <div v-if="mSelectBoardPopShowYn === true" class="profilePopBg"/>
  <div v-if="mSelectBoardPopShowYn === true" class="selectBoardWrap">
    <gSelectBoardPop :type="mSelectBoardType" @closeXPop="closeMoveContentsPop" :boardDetail="mMoveContentsDetailValue" />
  </div>
</template>
<script>
import memoCompo from '../push/D_contBoxMemo.vue'
import { onMessage } from '@/assets/js/webviewInterface'
import statCodeComponent from '../../board/D_manageStateCode.vue'
import statCodePop from '../../board/D_manageStateCodePop.vue'
import attachFileListPop from '@/components/pageComponents/main/unit/D_commonAttachFileListPop.vue'
// import userDetailPop from '@/components/popup/UserDetailPop'

export default {
  components: {
    attachFileListPop,
    memoCompo,
    statCodeComponent,
    statCodePop
    // userDetailPop
  },
  props: {
    pFadeNotShowYn: {},
    pOpenUnknownLoginPop: Function,
    propTargetType: {},
    contentsEle: {},
    propDetailYn: {},
    propContIndex: {},
    propJustShowYn: {},
    propPreStickerList: {},
    index: {},
    pNoAuthYn: {}
  },
  created () {
    if (this.pFadeNotShowYn) this.mFadeNotShowYn = true
    else this.mFadeNotShowYn = false
  },
  data () {
    return {
      mMemoLeng: 0,
      mFadeNotShowYn: false,
      mContentMoreShowYn: false,
      mLoadingShowYn: false,
      mContMenuShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      mMememoValue: {},
      mSelectBoardPopShowYn: false,
      mMoveContentsDetailValue: {},
      mSelectBoardType: '',
      mMemoResetYn: false,
      mWorkStateCodePopShowYn: false,
      mWorkStateCodePopProps: {},
      mClickImgList: [],
      mFileDownData: {},
      mFilePopData: {},
      mFilePopYn: false,
      mWriteMemoYn: false,
      mMemoMoreShowYn: false,
      animationYn: false,
      mProfilePopShowYn: false,
      mPopParam: {},
      mFoldYn: true,
      enterTarget: null
    }
  },
  async mounted () {
    var scrollWrap = document.getElementById('mainAllWrap')
    if (scrollWrap) {
      scrollWrap.addEventListener('scroll', this.handleScroll)
    }
    var this_ = this
    this.$nextTick(async () => {
      this_.addImgEvnt()
    })
    this.setContentsMoreText()
    await this.setPreTagInFirstTextLine()
    if (this.pNoAuthYn) {
      this.alimBigView()
    }
  },
  methods: {
    closeMoveContentsPop () {
      this.mSelectBoardPopShowYn = false
      this.$emit('contMove')
    },
    onDragenter (event) {
      // class 넣기
      const memoRef = this.$refs.gMemoRef
      if (memoRef) {
        memoRef.onDragenter()
      }
      this.enterTarget = event.target
    },
    onDragleave (event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        const memoRef = this.$refs.gMemoRef
        if (memoRef) {
          memoRef.onDragleave()
        }
      }
    },
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
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      this.mContentMoreShowYn = false
      this.mFoldYn = false
    },
    foldContentsDetail () {
      this.mContentMoreShowYn = true
      this.mFadeNotShowYn = false
      this.mFoldYn = true
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '300px'
    },
    addAnimation () {
      this.animationYn = true
      var this_ = this
      setTimeout(() => {
        this_.animationYn = false
      }, 2000)
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
      if (!memoList) return
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
    async saveModiMemo (modiMemoObj) {
      var memo = null
      if (modiMemoObj.param) {
        memo = modiMemoObj.param
      }
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveMemo',
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
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
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
      if (detailData.jobkindId === 'TODO') {
        detailData.creTeamKey = 0
      }
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
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
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
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
        return bodyImgFileList
      }
    },
    async setPreTagInFirstTextLine () {
      // 본문 영역에 첫번째 줄이 사진이 아닐 경우 라인을 그어주기 위한 함수
      if (!this.$refs[['mainContRef' + this.contentsEle.contentsKey]]) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return

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
        // 여기
      } else if (this.mCurrentConfirmType === 'alimCancel') {
        this.alimCancle()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
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
          url: '/sUniB/tp.deleteMCabContents',
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
          url: '/sUniB/tp.deleteContents',
          param: inParam
        })
      }
      if (result) {
        this.$showToastPop(toastText)
        if (this.$route.fullPath.includes('contents')) {
          this.goBack()
        }
      }
      // 반복문에 index값을 prop으로 받아 해당 함수가 리스트에 몇번째에서 발생한지 인지하고 그 인덱스를 삭제
      this.$emit('contDelete', this.propContIndex)
      // @@@ 추후에 vuex에 컨텐츠 삭제를 해야함 @@@@ @@@@ @@@@ @@@@ @@@@ #추가
      // this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', inParam)
    },
    hasHistory () {
      return window.history.length > 1
    },
    async goBack () {
      if (this.hasHistory()) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    },
    moveOrCopyContent (type) {
      this.mSelectBoardType = type
      this.mMoveContentsDetailValue = this.CONT_DETAIL
      this.mSelectBoardPopShowYn = true
    },
    async makeNewContents (type) { // writeBoard -> 알림을 게시글로 작성, writeAlim -> 게시글을 알림으로 작성
      if (this.contentsEle.creTeamKey && type !== 'writeBoard' && (!this.CHANNEL_DETAIL.ownerYn || !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn) && (!this.CHANNEL_DETAIL.memberYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn) && (this.CHANNEL_DETAIL.memberYn === 0 || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 0) && (!this.CHANNEL_DETAIL.managerKey || !this.CHANNEL_DETAIL.D_CHAN_AUTH.managerKey)) {
        this.$showToastPop('해당 채널에 멤버가 아닙니다. 멤버로 신청 후 이용해주세요.')
        return
      }
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
    },
    bloc (type) {
      var typeText = type === 'USER' ? this.$t('COMMON_TITLE_USER') : this.$t('COMMON_TAB_POST')
      if (this.GE_LOCALE === 'ko') {
        this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      } else {
        this.mConfirmText = 'Block this' + typeText + '?'
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText
      if (type === 'ALIM') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = '해당 알림이 신고되었습니다.'
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.contentsKey
        toastText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.CONT_DETAIL.memoKey
        toastText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.CONT_DETAIL.creTeamKey
        toastText = '해당 채널이 신고되었습니다.'
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.CONT_DETAIL.creUserKey
        toastText = '해당 유저가 신고되었습니다.'
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
          url: '/sUniB/tp.saveClaimLog',
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
      document.body.appendChild(textarea)

      var contKey, content
      try {
        if (this.contentsEle.jobkindId) {
          contKey = this.contentsEle.contentsKey
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
          url: '/sUniB/tp.saveMemo',
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
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
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
      if (!this.$refs['mainContRef' + this.contentsEle.contentsKey]) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      try {
        if (this.propDetailYn === true) { this.alimBigView(); return }

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
                var contentHeight = contents + imgsHeight
                if (contentHeight > 300) {
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
          if (contentHeight > 300) {
            this.mContentMoreShowYn = true
          } else {
            this.mContentMoreShowYn = false
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async contentsSharePop () {
      const keySet = {
        contentsKey: this.CONT_DETAIL.contentsKey,
        teamKey: this.CONT_DETAIL.creTeamKey,
        cabinetKey: this.CONT_DETAIL.cabinetKey
      }
      if (!keySet.contentsKey || !keySet.teamKey || !keySet.cabinetKey) {
        this.$showToastPop(this.$t('COMMON_MSG_UNKWON'))
        return
      }
      var link = await this.$makeShareLink(keySet, 'contentsDetail', this.CONT_DETAIL.bodyFullStr, this.CONT_DETAIL.title)
      var shareItem = { title: this.$t('COMMON_NAME_APP'), url: link }
      if (navigator.share) {
        navigator.share(shareItem)
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
    },
    goChannelMain () {
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPage', openPopParam)
    },
    async goUserProfile (targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('CONF_MSG_CHECK_UNABLE'))
        return
      }
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.CONT_DETAIL.creUserKey

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
      if (moreCheckYn) {
        if (this.mContentMoreShowYn) {
          this.alimBigView()
        }

        return
      }
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
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
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      var param = {}
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
          tempDetail.D_CONT_USER_DO = changeUserDoList
          tempDetail.likeCount = result.likeCount
          if (result.result === true && act.doType === 'LI') {
            tempDetail.subsYn = result.subsYn = 1
          }
          tempDetail.starCount = result.starCount
          this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
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
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        // }
      }
    },
    async subScribeContents () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop(this.CONT_DETAIL)
        return
      }
      // eslint-disable-next-line no-unused-vars
      var result = null
      var subsYn = this.CONT_DETAIL.subsYn
      var param = {}
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
        url: '/sUniB/tp.saveSubscribe',
        param: { subscribe: param }
      })
      this.$showToastPop(reqText)
      this.cDetail.subsYn = param.subsYn
      var contentsDetail = this.CONT_DETAIL
      // contentsDetail.subsYn = param.subsYn
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
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
      var contBody = this.$refs.contentsBoxRef
      if (!contBody) return
      this.mClickImgList = contBody.querySelectorAll('img')
      for (let m = 0; m < this.mClickImgList.length; m++) {
        var this_ = this
        this_.mClickImgList[m].addEventListener('click', () => {
          if (!this_.mContentMoreShowYn) {
            this_.$emit('openImgPop', [this_.mClickImgList, m])
          }
        })
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
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
      var cont = this.$getContentsDetail(this.CHANNEL_DETAIL, this.contentsEle.contentsKey, this.contentsEle.creTeamKeyy, this.contentsEle.jobkindId)
      if (!cont) {
        cont = [this.contentsEle]
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.contentsEle])
      }
      // if (cont[0] && cont[0].shareList && cont[0].shareList[0] && cont[0].shareList[0].length !== 0) {
      //   if (cont[0].shareList[0].accessKind === 'F') {
      //     if (this.CHANNEL_DETAIL && (this.CHANNEL_DETAIL.D_CHAN_AUTH === true || (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn && this.CHANNEL_DETAIL.D_CHAN_AUTH.settingYn) || this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn)) {
      //       cont[0].VIEW_YN = true
      //       return cont[0]
      //     } else {
      //       cont[0].VIEW_YN = false
      //       return cont[0]
      //     }
      //     // const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
      //   }
      // }
      if (cont && cont.length > 0) {
        // const viewAuth = this.$checkUserAuth(cont[0].shareItem).V
        /* if (cont[0].shareList) {
          const shareList = cont[0].shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
        // cont[0].VIEW_YN = viewAuth
        return cont[0]
      } else {
        var content = this.contentsEle
        // const viewAuth = this.$checkUserAuth(this.contentsEle.shareItem).V
        /* if (this.contentsEle.shareList) {
          const shareList = this.contentsEle.shareList
          const index = shareList.findIndex((item) => (item.accessKind === 'T' || item.accessKind === 'F'))
          if (index !== -1) {
            viewAuth = true
          }
        } */
        // content.VIEW_YN = viewAuth
        return content
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
      // return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
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
                return this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker ? value.stickerKey === this.CONT_DETAIL.D_CONT_USER_STICKER_LIST[i].sticker.stickerKey : -1
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
    CONT_DETAIL: {
      immediate: true,
      handler (value, index) {
        this.setMoreMemoBtn()
      }
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        // if (this.contentsEle && (content === undefined || content === null)) content = this.contentsEle
        if (value[0].targetKey !== content.contentsKey) return
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
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
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
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
  width: 45px;
  height: 45px;
  overflow: hidden;
  float: left;
  border-radius: 100%;
  border: 2px solid #5B1CFC;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overHidden {
  overflow: hidden;
}
pre div[id='formEditText'] {
  border-top: 1px solid #ccc;
}
.profilePopBg {
  background-color:#00000050;
  width:100vw;
  height:100vh;
  position: fixed;
  top:0;
  left:0;
  z-index: 100000;
}
.contentsWrap {
  width: 100%;
  background: #FFF;
  overflow: hidden;
  min-height: 20px;
  float: left;
  box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4);
  margin-bottom: 10px;
  position: relative;
  padding-top: 5px;
  border-radius: 8px;
}
.justSticker {
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
.chanIcon {
  width: calc(100% - 2px);
  height:  calc(100% - 2px);
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.contentsCardInfo {
  width: calc(100% - 55px);
  margin-left: 10px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
}
.contentsCardInfoBox {
  width: 100%;
  position: relative;
  height: 50%;
  min-height: 26px;
  position: relative;
}
.noPerm {
  width: calc(100% - 35px);
}
.noPerm > img {
  width: 20px;
  margin-top: 2px;
  float: left;
  margin-right: 5px;
}
.moreMenu {
  position: absolute;
  right: 0;
  top: 0;
}
.userInfoArea {
  width: 100%;
  position: relative;
  height: 50%;
  min-height: 25px;
}
.lineHeight23 {
  line-height: 23px;
}
.officialImg {
  height: 21px;
  padding: 3px;
}
.chanName {
  display: block;
  max-width: 70px;
}
.recvUser {
  padding: 0px 8px;
  border-radius: 8px;
  height: 18px;
  display: flex;
  align-items: center;
}
.recvUserCount {
  line-height: 1;
  margin-top: 1px;
}
.replyBtn {
  margin-top: 2px;
}
.contentsPreWrap {
  word-break: break-all;
  overflow: hidden;
  max-height: 300px;
}
.contentsPre {
  word-break: break-all;
  overflow: hidden auto;
}
.stickerWrap {
  width: 100%;
  padding: 5px 10px;
  padding-left: 20px;
  padding-bottom: 0;
  float: left;
  min-height: 20px;
  margin-top: 10px;
}
.stickerItem {
  float: left;
  margin-right: 5px;
  min-width: 30px;
}
.fadeEffect {
  position: absolute;
  bottom: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
}
.moreBtn {
  position: absolute;
  bottom: 0px;
  right: 10px;
}
.stickerFullWrap {
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
  margin-top: 10px;
  padding: 10px 20px;
}
.contentsCardUserDoWrap {
  float: left;
  width: calc(100% - 100px);
  height: 100%;
}
.userDoBox {
  cursor: pointer;
  width: 30px;
  height: 35px;
  display: flex;
  float: left;
  margin-right: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userDoItem {
  width: 100%;
  height: 20px;
  float: left;
}
.contShare {
  float: right;
  width: 140px;
  height: 100%;
  float: left;
}
.contShareBox {
  width: 30px;
  height: 35px;
  display: flex;
  float: right;
  margin-right: 10px;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.contShareBox > div {
  width: 100%;
  height: 20px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contentsCardMemoArea {
  width: 100%;
  clear: both;
  cursor: pointer;
  padding: 10px 20px 0 20px;
  min-height: 20px;
  margin-bottom: 10px;
}
.selectBoardBg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #00000010;
  z-index: 9;
  top: 0;
  left: 0;
}
.selectBoardWrap {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
}
.imgPreview {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0%;
  z-index: 999999;
  padding: 20px 0;
  background: #000000;
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
</style>

<style>
.contentsCardBodyArea .formLine, .contentsCardBodyArea .formDot {
  padding: 0 10px !important;
}
</style>
