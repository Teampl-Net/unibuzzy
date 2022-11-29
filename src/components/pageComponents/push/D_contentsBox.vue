<template>
    <div v-if="mLoadingShowYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>
    <div v-if="this.CONT_DETAIL" style="width: 100%; background: #FFF; min-height: 20px; float: left; box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4); margin-bottom: 10px; position: relative;     border-radius: 8px;">
        <div class="contentsCardHeaderArea" style="width: 100%; min-height: 20px; float: left; padding: 16px 20px;">
            <div @click="goChannelMain()" :style="this.GE_USER.userKey === CONT_DETAIL.creUserKey? 'border: 2px solid #5B1CFC !important; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" class="contentsCardLogoArea" >
                <div :style="'background-image: url(' + (CONT_DETAIL.domainPath ? CONT_DETAIL.domainPath + CONT_DETAIL.logoPathMtext : CONT_DETAIL.logoPathMtext) + ');'" style="width: calc(100% - 2px); height:  calc(100% - 2px); border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;">
                </div>
            </div>
            <div style="width: calc(100% - 55px); margin-left: 10px; height: 100%; float: left; display: flex; flex-direction: column;" >
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 26px;  position: relative;">
                    <template v-if="(CONT_DETAIL.jobkindId === 'BOAR' && this.$checkUserAuth(CONT_DETAIL.shareItem).V === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && CONT_DETAIL.titleBlindYn">
                        <p class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                            열람 권한이 없습니다.
                        </p>
                    </template>
                    <template v-else>
                        <p @click="goContentsDetail()" class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                            <img v-if="CONT_DETAIL.jobkindId === 'ALIM'" src="../../../assets/images/push/contTitle_alim.svg" style="width: 20px; margin-top: 2px; float: left; margin-right: 5px;" alt="">
                            <img v-else-if="CONT_DETAIL.jobkindId === 'BOAR'" src="../../../assets/images/push/contTitle_board.svg" style="width: 20px; margin-top: 2px;  float: left; margin-right: 5px;" alt="">
                            {{CONT_DETAIL.title}}
                        </p>
                        <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 0; top: 0;" alt="" @click="contentMenuClick">
                    </template>
                </div>
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 30px;">
                    <p style="line-height: 23px;" class="CLDeepGrayColor font14 fl textLeft fontBold ">
                      <img src="../../../assets/images/channel/icon_official2.svg" v-if="CONT_DETAIL.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                      {{this.$changeText(CONT_DETAIL.nameMtext)}}
                      <span @click="goUserProfile()" style="font-weight: normal;" class="mleft-05">
                        <!-- <span class="font-weight: normal; mSide-02">{{'|'}}</span> -->
                        <img src="../../../assets/images/footer/icon_people.svg" class="img-w12" alt="">
                        {{this.$changeText(CONT_DETAIL.creUserName)}}
                      </span>
                    </p>

                    <p class="fr CLDeepGrayColor font12" style="line-height: 23px;">{{this.$changeDateFormat(CONT_DETAIL.creDate)}}</p>
                    <statCodeComponent v-if="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn" @click="openWorkStatePop(CONT_DETAIL)" :alimDetail="CONT_DETAIL" class="fr" :contentsKey="CONT_DETAIL.contentsKey" :teamKey="CONT_DETAIL.creTeamKey" :currentCodeKey="CONT_DETAIL.workStatCodeKey" :codeList="CONT_DETAIL.workStatCodeList" />
                    <p class="fr font12 lightGray mright-03" v-if="CONT_DETAIL.jobkindId === 'ALIM'" style="border: 1px solid rgb(204, 204, 204); padding: 0px 5px; border-radius: 8px; display: flex; align-items: center;" >
                      <pp class="font12 fl ">수신</pp>
                      <span class="font12 mSide-02">{{'|'}}</span>
                      <template v-if="CONT_DETAIL.rUserCount === -1">
                        전체
                      </template>
                      <template v-else-if="CONT_DETAIL.rUserCount !== -1">
                        <img src="../../../assets/images/footer/icon_people.svg" class="img-w10 fl" alt="">
                        <p class="font12 fl mleft-01" style="line-height: 1; margin-top: 1px;">{{CONT_DETAIL.rUserCount}}</p>
                      </template>
                    </p>
                </div>
                <div v-if="cancelTimerShowCheck(CONT_DETAIL)" class="fl" :id="'timerArea'+CONT_DETAIL.contentsKey" @click="cancelConfirm(CONT_DETAIL)">
                  <p :id="'timerText'+CONT_DETAIL.contentsKey" class="font12 fl textRight w-100P" >{{setIntervalTimer(CONT_DETAIL.creDate, CONT_DETAIL.contentsKey)}}</p>
                </div>
            </div>
        </div>
        <div @click="goContentsDetail(true)" class="contentsCardBodyArea" style="width: 100%;  float: left; min-height: 20px;">
            <div v-if="(CONT_DETAIL.jobkindId === 'BOAR' && this.$checkUserAuth(CONT_DETAIL.shareItem).V === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && !CONT_DETAIL.titleBlindYn" @cick="zzz" class="font14 cursorP mbottom-05 bodyFullStr" style="min-height: 30px;" v-html="$notPerText()"></div>
            <div v-else-if="(CONT_DETAIL.jobkindId === 'BOAR' && this.$checkUserAuth(CONT_DETAIL.shareItem).V === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey) && CONT_DETAIL.titleBlindYn" @cick="zzz" class="" ></div>
            <div v-else class="h-400max overHidden fl w-100P"  style="word-break: break-all;" :id="'contentsBodyBoxArea'+CONT_DETAIL.contentsKey">
              <pre :class="CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''" :id="'bodyFullStr'+CONT_DETAIL.contentsKey" class="font14 mbottom-05 mainConts cursorDragText h-100P w-100P fl" style="word-break: break-all; overflow: hidden auto;" v-html="$setBodyLength(CONT_DETAIL.bodyFullStr, CONT_DETAIL.jobkindId === 'BOAR' && CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)"></pre>
            </div>
            <p :id="'bodyMore'+CONT_DETAIL.contentsKey" class="font16 cursorP textRight fr mright-1 lightGray" style="display:none">더보기 > </p>
        </div>
        <template v-if="((CONT_DETAIL.jobkindId === 'BOAR' && this.$checkUserAuth(CONT_DETAIL.shareItem).V === true) || CONT_DETAIL.jobkindId === 'ALIM' || CONT_DETAIL.creUserKey === this.GE_USER.userKey)">
            <div class="contentsCardUserDoArea" style="width: 100%; min-height: 40px; float: left; justify-content: space-between;  display: flex; margin-top: 15px; padding: 0 20px;">
                <div style="float: left; width: 50%; height: 100%;">
                    <div @click="changeAct(this.CONT_DETAIL.D_CONT_USER_DO[1], this.CONT_DETAIL.contentKey)" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                      <img v-if="!this.CONT_DETAIL.D_CONT_USER_DO[1].doKey || this.CONT_DETAIL.D_CONT_USER_DO[1].doKey === 0" class="img-w20" src="../../../assets/images/contents/icon_heart_red.png" alt="">
                      <img v-else src="../../../assets/images/contents/icon_heart_on.png" alt="" class="img-w20">
                      <p class="font12 fl w-100P userDoColor">{{CONT_DETAIL.likeCount}}</p>
                    </div>
                    <div  @click="changeAct(this.CONT_DETAIL.D_CONT_USER_DO[0], this.CONT_DETAIL.contentKey)" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                      <img v-if="!this.CONT_DETAIL.D_CONT_USER_DO[0].doKey || this.CONT_DETAIL.D_CONT_USER_DO[0].doKey === 0" class="img-w17" src="../../../assets/images/contents/icon_scrap.png" alt="">
                      <img v-else src="../../../assets/images/contents/icon_scrap_on.png" alt="" class="img-w17">
                      <p class="font12 fl w-100P userDoColor">{{CONT_DETAIL.starCount}}</p>
                    </div>
                    <div @click="goContentsDetail()" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                      <img  src="../../../assets/images/contents/icon_memo.png" class="img-w20" alt="">
                      <p class="font12 fl w-100P userDoColor">{{CONT_DETAIL.memoCount}}</p>
                    </div>
                    <div @click="clickFileDownload()" v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                      <img v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" src="../../../assets/images/contents/icon_clip.png" class="img-w17" alt="">
                      <img v-else src="../../../assets/images/contents/icon_clip.png" class="img-w20" alt="">
                      <p class="font12 fl w-100P userDoColor">{{CONT_DETAIL.fileList}}</p>
                    </div>
                </div>
                <div style="float: right; width: 50%; height: 100%; float: left;">
                    <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img src="../../../assets/images/contents/icon_share.png" class="img-w20 fl" alt="공유 아이콘"
                            data-clipboard-action="copy" id="boardDetailCopyBody" @click="contentsSharePop()"
                                :data-clipboard-text="CONT_DETAIL.copyTextStr">
                    </div>
                    <!-- this.$emit('fileDownload') -->
                    <!-- <div @click="clickFileDownload()" v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="this.CONT_DETAIL.attachMfilekey && this.CONT_DETAIL.attachMfilekey > 0" src="../../../assets/images/contents/icon_clip.png" class="img-w20" alt="">
                        <img v-else src="../../../assets/images/contents/icon_clip.png" class="img-w20" alt="">
                    </div> -->
                    <div @click="subScribeContents" style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="this.CONT_DETAIL.subsYn === 1 || this.CONT_DETAIL.subsYn === true" src="../../../assets/images/contents/icon_bell_on.png" class="img-w20" alt="">
                        <img v-else src="../../../assets/images/contents/icon_bell.png" class="img-w20" alt="">
                    </div>
                </div>
            </div>
            <div v-if="this.CONT_DETAIL.D_MEMO_LIST && this.CONT_DETAIL.D_MEMO_LIST.length > 0" style="height: 2px; background: #F1F1F1; width: calc(100% - 40px); margin: 10px 20px; float: left;"></div>
            <div class="contentsCardMemoArea" style="width: 100%; float: left; padding: 10px 20px 0 20px; min-height: 20px; margin-bottom: 20px" >
                <template v-for="(memo, mIndex) in this.CONT_DETAIL.D_MEMO_LIST" :key="mIndex">
                    <memoCompo :propContDetail="this.CONT_DETAIL" :diplayCount="-1" v-if="this.propDetailYn || mIndex < 3" :childShowYn="propDetailYn" :propMemoEle="memo" @memoEmitFunc='memoEmitFunc' />
                </template>
                <myObserver v-if="propDetailYn === true" @triggerIntersected="memoLoadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver>
            </div>

            <!-- 밑에는 댓글 작성 창 -->
            <gMemoPop style="position: fixed; bottom: 0;" :resetMemoYn="mMemoResetYn"  v-if="this.propDetailYn && !(CONT_DETAIL.jobkindId === 'BOAR' && this.$checkUserAuth(CONT_DETAIL.shareItem).V === false && CONT_DETAIL.creUserKey !== this.GE_USER.userKey)" ref="gMemoRef" transition="showMemoPop" :mememo='mMememoValue'  @saveMemoText="saveMemo"  @clearMemoObj='clearMemoObj' @writeMemoScrollMove='writeMemoScrollMove' />
        </template>
    </div>
  <gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false"  @report="report" @editable="editable" @bloc="bloc" :contentsInfo="CONT_DETAIL" :contentType="CONT_DETAIL.jobkindId" :contentOwner="this.GE_USER.userKey === CONT_DETAIL.creUserKey"/>
  <statCodePop @closeXPop="this.mWorkStateCodePopShowYn = false" :currentWorker="{workUserKey: mWorkStateCodePopProps.workUserKey, workUserName: mWorkStateCodePopProps.workUserName}" :teamKey="mWorkStateCodePopProps.creTeamKey" :alimDetail="mWorkStateCodePopProps" :contentsKey="mWorkStateCodePopProps.contentsKey" v-if="mWorkStateCodePopShowYn" :codeList="mWorkStateCodePopProps.workStatCodeList" :currentCodeKey="mWorkStateCodePopProps.workStatCodeKey" class="fr "></statCodePop>
  <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk" @no='mConfirmPopShowYn=false'/>
  <div v-if="mSelectBoardPopShowYn === true" style="width: 100vw; height: 100vh; position: fixed; background: #00000010; z-index: 999; top: 0; left: 0" />
  <div v-if="mSelectBoardPopShowYn === true" style="width: 100vw; height: 100vh; position: fixed;  z-index: 999; top: 0; left: 0 ">
    <gSelectBoardPop :type="mSelectBoardType" @closeXPop="mSelectBoardPopShowYn = false" :boardDetail="mMoveContentsDetailValue" />
  </div>

  <div @click="mFilePopShowYn = false"  v-if="mFilePopShowYn === true"  style="width: 100vw; height: 100vh; position: fixed; background: #00000010; z-index: 999; top: 0; left: 0"></div>
  <div v-if="this.mFilePopShowYn === true" style="width: 100vw; height: 100vh; position: fixed;  z-index: 999; top: 0; left: 0 ">
    <div style="width: 80%; word-break: break-all; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); border-radius: 6px 6px 6px 6px;  min-height: 200px; max-height: 30%; left: 10%; top: 20%; background: #fff; z-index: 999; overflow: hidden auto; position: absolute;">
      <div style=" margin: 15px; float: left; width: calc(100% - 30px); position: relative; ">
        <p class="textLeft font16 fontBold mbottom-1">파일 다운로드</p>
        <img @click="mFilePopShowYn = false"  src="../../../assets/images/common/grayXIcon.svg" style="position: absolute; right: 5px; top: 0px;" alt="">

        <templete v-for="(value, index) in this.CONT_DETAIL.D_ATTATCH_FILE_LIST" :key="index">
          <div  v-if="value.attachYn"  style="width: 100%; word-break: break-all;min-height: 30px; float: left;" >
            <img :src="$settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
            <a style="width: calc(100% - 20px); text-align: left;" :fileKey="value.fileKey" @click="$downloadFile(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot"  >
            {{value.fileName}}
            </a>
          </div>
        </templete>
      </div>
    </div>
  </div>

  <imgLongClickPop @closePop="this.mImgDetailAlertShowYn = false" @clickBtn="longClickAlertClick" v-if="mImgDetailAlertShowYn" />

<imgPreviewPop :mFileKey="CONT_DETAIL.attachMfilekey" :startIndex="mSelectImgIndex" @closePop="this.mPreviewPopShowYn = false " v-if="mPreviewPopShowYn && CONT_DETAIL.attachMfilekey" style="width: 100%; height: calc(100%); position: absolute; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="CONT_DETAIL.title" :creUserName="CONT_DETAIL.creUserName" :creDate="CONT_DETAIL.dateText"  :imgList="this.mClickImgList" />
</template>
<script>
import memoCompo from './D_contBoxMemo.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import imgPreviewPop from '@/components/popup/file/Tal_imgPreviewPop.vue'
import statCodeComponent from '@/components/board/D_manageStateCode.vue'
import statCodePop from '@/components/board/D_manageStateCodePop.vue'
export default {
  components: {
    memoCompo,
    statCodeComponent,
    statCodePop,
    imgPreviewPop
  },
  props: {
    contentsEle: {},
    propDetailYn: {},
    propContIndex: {},
    imgClickYn: {}
  },
  data () {
    return {
      mFilePopShowYn: false,
      mLoadingShowYn: false,
      mContMenuShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      // mMemoWritePopShowYn: true,
      mMememoValue: {},
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
      mSelectImgObject: {}
    }
  },
  mounted () {
    // this.addImgEvnt()
    var this_ = this
    this.$nextTick(() => {
      this_.addImgEvnt()
    })
    var scrollWrap = document.getElementById('mainAllWrap')
    if (scrollWrap) {
      scrollWrap.addEventListener('scroll', this.handleScroll)
    }
    this.setContentsMoreText()
    this.setPreTagInFirstTextLine()

    // if (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTATCH_FILE_LIST) {
    //   this.settingFileList()
    // }
  },
  methods: {
    async clickFileDownload () {
      if (this.propDetailYn === true) {
        // alert(1)
        // this.propDetailYn <- detail화면에서 true로 값을 보내고 있고, 디테일로 열었을 시 axios가 달라 filelist를 같이 보내주고 있으므로 아래의 else 함수가 필요하지 않음
        this.$emit('fileDownload')
      } else {
        // mainList화면에서 실행한 axios에는 fileList가 없으므로 클릭시 리스트를 받아오기 위해 넣었습니다.
        await this.getContentsDetail()
        await this.settingFileList()
        this.mFilePopShowYn = true
        // alert(true)
      }
    },
    async getContentsDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = this.CONT_DETAIL.contentsKey
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.jobkindId = this.CONT_DETAIL.jobkindId
      param.userKey = this.GE_USER.userKey
      param.ownUserKey = this.GE_USER.userKey
      var resultList = await this.$getContentsList(param)
      console.log(param)
      console.log(resultList)
      var detailData = resultList.content[0]
      // // eslint-disable-next-line no-debugger
      // detailData.D_CONT_USER_DO = await this.$settingUserDo(detailData.userDoList)
      // if (!detailData.D_MEMO_LIST && (!detailData.memoList || detailData.memoList.length === 0)) detailData.D_MEMO_LIST = []
      // // this.contentsEle = detailData

      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    async settingFileList () {
      try {
        console.log(this.CONT_DETAIL)
        // eslint-disable-next-line no-debugger
        debugger

        if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
          var attachFileList = []
          for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
            if (this.CONT_DETAIL.attachFileList[a].attachYn) {
              attachFileList.push(this.CONT_DETAIL.attachFileList[a])
            }
          }
          var bodyImgFileList = []
          var addFalseImgList = document.querySelectorAll('#contentsBodyArea .formCard .addFalse')
          if (addFalseImgList) {
            for (var s = 0; s < this.CONT_DETAIL.attachFileList.length; s++) {
              var attFile = this.CONT_DETAIL.attachFileList[s]
              for (var i = 0; i < addFalseImgList.length; i++) {
                if (Number(addFalseImgList[i].attributes.filekey.value) === Number(attFile.fileKey)) {
                  addFalseImgList[i].setAttribute('mmFilekey', attFile.mmFilekey)
                  bodyImgFileList.push(attFile)
                  break
                }
              }
            }
          }
          var cont = this.CONT_DETAIL
          cont.D_ATTATCH_FILE_LIST = attachFileList
          cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        }
      } catch (error) {
        console.log(error)
      }
    },
    setPreTagInFirstTextLine () {
      // 본문 영역에 첫번째 줄이 사진이 아닐 경우 라인을 그어주기 위한 함수
      if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return

      var contents = window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)
      // console.log(contents.childNodes)
      if (contents.childNodes.length > 0) {
        var i = 0
        var child = contents.childNodes[i]

        while (child.innerText === '') {
          child = contents.childNodes[i]
          i += 1
        }
        // console.log(child.innerText)
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
    cancelConfirm () {
      this.mConfirmText = '알림 발송을 취소 하시겠습니까?'
      this.mCurrentConfirmType = 'alimCancel'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    setIntervalTimer (date, contentsKey) {
      var time = this.$cancelTimer(date)
      // var innerHTML = '<p class="CErrorColor font12 fr mleft-05" style="text-decoration: underline;" id="contentsTime' + contentsKey +'"></p> <p class="font12 fr textRight" id="contentsTime' + contentsKey + '"></p>'
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
      console.log('Box call MemoLoadMore')
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
      // console.log(this.mMememoValue)
      this.$refs.gMemoRef.setMememo(memoObj)
    },
    memoEmitFunc (emitData) {
      var type = emitData.targetType
      var data = emitData.value
      if (type === 'goUserProfile') {
        this.goUserProfile(data.creUserKey)
        // alert(data.creUserKey)
      } else if (type === 'goContentsDetail') {
        this.goContentsDetail()
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
        toastText = '해당 유저를 차단했습니다.'
        console.log(param)
        console.log(toastText)
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'alimDEL') {
        this.deleteContents('알림을 나에게서 삭제하였습니다.')
      } else if (this.mCurrentConfirmType === 'boardDEL') {
        this.deleteContents('게시글을 삭제하였습니다.')
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
            url: 'service/tp.deleteContents',
            param: param
          })
          console.log(result)
          if (result) {
            this.$emit('contDelete', this.propContIndex)
            // this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', [this.contentsEle])
            this.$showToastPop('알림 발송을 취소하였습니다.')
          }
        } catch (e) {
          this.$showToastPop('취소하지 못했습니다. 앱을 다시 실행 후 시도해주세요.')
          console.log(e)
        } finally {
          this.mLoadingShowYn = false
        }
      } else {
        this.$showToastPop('3분이 지나 취소가 불가능합니다.')
      }
    },
    editable (type, allYn) {
      this.mContMenuShowYn = false
      console.log(type)
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
    editBoard () {
      var param = {}
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetType = 'writeContents'
      param.contentsJobkindId = 'BOAR'
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) { param.attachMfilekey = this.CONT_DETAIL.attachMfilekey }
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      this.$emit('openPop', param)
    },
    deleteConfirm () {
      if (this.contentsEle.jobkindId === 'ALIM') {
        this.mConfirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
        this.mCurrentConfirmType = 'alimDEL'
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        this.mConfirmText = '게시글을 삭제 하시겠습니까?'
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
          url: 'service/tp.deleteMCabContents',
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
          url: 'service/tp.deleteContents',
          param: inParam
        })
      }
      if (result) {
        console.log(result)
        this.$showToastPop(toastText)
      }
      // 반복문에 index값을 prop으로 받아 해당 함수가 리스트에 몇번째에서 발생한지 인지하고 그 인덱스를 삭제
      this.$emit('contDelete', this.propContIndex)
      // @@@ 추후에 vuex에 컨텐츠 삭제를 해야함 @@@@ @@@@ @@@@ @@@@ @@@@ #추가
      // this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', inParam)
    },
    moveOrCopyContent (type) {
      this.mSelectBoardType = type
      this.mMoveContentsDetailValue = this.CONT_DETAIL
      this.mSelectBoardPopShowYn = true
    },
    closeSelectBoardPop () {
      this.mSelectBoardPopShowYn = false
    },

    makeNewContents (type) {
      var tempData = JSON.parse(JSON.stringify(this.contentsEle))
      console.log(type)
      tempData.contentsJobkindId = type === 'writeBoard' ? 'BOAR' : type === 'writeAlim' ? 'ALIM' : undefined
      tempData.targetType = 'writeContents'

      tempData.UseAnOtherYn = true
      tempData.selectBoardYn = true

      // tempData.bodyFullStr = tempData.bodyFullStr
      tempData.titleStr = tempData.title

      tempData.modiContentsKey = tempData.contentsKey

      this.$emit('openPop', tempData)
    },
    bloc (type) {
      var typeText = type === 'USER' ? '유저를' : '게시글을'
      this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
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
      console.log(type)
      console.log(param)
      console.log(toastText)
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveClaimLog',
          param: param
        })
        console.log(result)
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
          content = document.getElementById('bodyFullStr' + contKey).innerText
        }

        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop('복사되었습니다.')
      } catch (error) {
        this.$showToastPop('복사하지 못했습니다.')
      }
    },
    async saveMemo (saveMemoHTML) {
      this.mLoadingShowYn = true
      var memo = {}
      memo.parentMemoKey = null
      if (this.mMememoValue !== undefined && this.mMememoValue !== null && this.mMememoValue !== {}) {
        memo.parentMemoKey = this.mMememoValue.parentMemoKey
      }

      memo.bodyFullStr = saveMemoHTML
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.toUserKey = this.CONT_DETAIL.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      memo.allYn = true
      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveMemo',
          param: { memo: memo }
        })
        console.log('-------------------------console.log(result) ------------------------------')
        console.log(result)
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (result.data.resultList && result.data.resultList.memoList.length > 0) {
            console.log(result.data.resultList)
            var saveMemoObj = {}
            var index
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
      if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      try {
        // 이미지를 불러오는 이유는 마운트 시점에 이미지의 크기를 못받오기에 추가함
        if (this.propDetailYn === true) { this.alimBigView(); return }
        var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey).offsetHeight
        var imgList = await window.document.querySelectorAll('#bodyFullStr' + this.contentsEle.contentsKey + ' img')
        var bodyMoreText = await window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
        if (contents > 400 || imgList.length > 0) {
          bodyMoreText.style.display = 'block'
        }
      } catch (e) {
        console.log(e)
      }
    },
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey)
      var bodyMoreArea = window.document.getElementById('bodyMore' + this.CONT_DETAIL.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      bodyMoreArea.style.display = 'none'
    },
    async contentsSharePop () {
      var link = await this.$makeShareLink(this.CONT_DETAIL.contentsKey, 'contentsDetail', this.CONT_DETAIL.bodyFullStr, this.CONT_DETAIL.title)
      var shareItem = { title: '더알림', text: this.CONT_DETAIL.title, url: link }
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
      console.log(this.CONT_DETAIL)
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'chanDetail'
      // targetContentsKey키를 주면 스크롤 이벤트가 작동
      // openPopParam.targetContentsKey = this.CONT_DETAIL.contentsKey
      this.$emit('openPop', openPopParam)
    },
    goUserProfile (targetUserKey) {
      console.log(this.CONT_DETAIL)
      var openPopParam = {}
      openPopParam.targetKey = this.CONT_DETAIL.creTeamKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.CONT_DETAIL.creUserKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (targetUserKey) openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = '프로필'
      openPopParam.readOnlyYn = true
      this.$emit('openPop', openPopParam)
    },
    goContentsDetail (moreCheckYn) {
      if (this.propDetailYn) return
      // 권한이 없는 컨텐츠는 이동하지 못하게 리턴
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      if (moreCheckYn) {
        var moreTextDisplay = window.document.getElementById('bodyMore' + this.CONT_DETAIL.contentsKey).style.display
        if (moreTextDisplay === 'block') {
          this.alimBigView()
          return
        }
      }
      console.log(this.CONT_DETAIL)
      var openPopParam = {}
      openPopParam.targetType = 'contentsDetail'
      openPopParam.targetKey = this.CONT_DETAIL.contentsKey
      openPopParam.teamKey = this.CONT_DETAIL.creTeamKey
      openPopParam.jobkindId = this.CONT_DETAIL.jobkindId

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
          // eslint-disable-next-line no-debugger
          debugger
          for (var d = changeUserDoList.length - 1; d >= 0; d--) {
            if (changeUserDoList[d].doType === act.doType) {
              changeUserDoList[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          tempDetail.D_CONT_USER_DO = changeUserDoList
          tempDetail.likeCount = result.likeCount
          console.log(result)
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
      var reqText = ' 되었습니다.'
      if (!param.subsYn) {
        // req = 'delete'
        reqText = ' 해제되었습니다.'
      }
      // eslint-disable-next-line no-redeclare
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveSubscribe',
        param: { subscribe: param }
      })
      this.$showToastPop('해당 컨텐츠의 알림설정이 ' + reqText)
      var contentsDetail = this.CONT_DETAIL
      contentsDetail.subsYn = param.subsYn
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
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
      console.log(this.mWorkStateCodePopProps)
      this.mWorkStateCodePopShowYn = true
    },
    addImgEvnt () {
      if (!this.imgClickYn) return
      // console.log(this.CONT_DETAIL)
      var contBody = document.getElementById('contentsBodyBoxArea' + this.CONT_DETAIL.contentsKey)
      if (!contBody) return
      this.mClickImgList = contBody.querySelectorAll('img')
      for (let m = 0; m < this.mClickImgList.length; m++) {
        var thisthis = this
        thisthis.mClickImgList[m].addEventListener('touchstart', () => {
          thisthis.mClickTime = Date.now()
          thisthis.mClickEndYn = false
          thisthis.mClickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.mClickEndYn === false) {
              thisthis.memoShowYn = false
              thisthis.mSelectImgObject.path = thisthis.mClickImgList[m].src
              thisthis.mSelectImgObject.fileKey = Number(thisthis.mClickImgList[m].attributes.filekey.value)
              thisthis.mSelectedImgIndex = m
              thisthis.mClickImgList[m].style.opacity = 1
              this.openImgDetailAlert(thisthis.mClickImgList[m])
            }
          }, 300)
          // thisthis.mPreviewPopShowYn = true
        })
        thisthis.mClickImgList[m].addEventListener('touchend', () => {
          thisthis.mClickEndYn = true
          thisthis.mClickImgList[m].style.opacity = 1
        })

        thisthis.mClickImgList[m].addEventListener('mousedown', () => {
          thisthis.mClickTime = Date.now()
          thisthis.mClickEndYn = false
          thisthis.mClickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.mClickEndYn === false) {
              thisthis.memoShowYn = false
              thisthis.mSelectImgObject.path = thisthis.mClickImgList[m].src
              thisthis.mSelectImgObject.fileKey = Number(thisthis.mClickImgList[m].attributes.filekey.value)
              this.openImgDetailAlert(thisthis.mClickImgList[m])
              thisthis.mSelectedImgIndex = m
              thisthis.mClickImgList[m].style.opacity = 1
            }
          }, 1000)
        })
        thisthis.mClickImgList[m].addEventListener('mouseup', () => {
          thisthis.mClickEndYn = true
          thisthis.mClickImgList[m].style.opacity = 1
        })
      }
    },
    openImgDetailAlert (img) {
      console.log(this.imgClickYn)
      if (this.imgClickYn === false) return
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      this.alertPopId = this.$setParentsId(this.pPopId, this.alertPopId)
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      // console.log(this.$store.getters['D_HISTORY/hStack'])
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
      // eslint-disable-next-line no-debugger
      debugger
      try {
        if (this.$getMobileYn()) {
          onMessage('REQ', 'saveCameraRoll', this.mSelectImgObject.path)
        } else {
          console.log(this.mSelectImgObject)
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(this.mSelectImgObject.fileKey, this.mSelectImgObject.path)
        }
        this.$showToastPop('저장되었습니다.')
        this.mImgDetailAlertShowYn = false
      } catch (error) {
        // // console.log(error)
      }
    }
  },
  computed: {
    CONT_DETAIL () {
      if (!this.contentsEle) return
      var cont = this.$getContentsDetail(null, this.contentsEle.contentsKey, this.contentsEle.creTeamKey)
      if (!cont) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.contentsEle])
      }
      // console.log(cont)
      if (cont && cont.length > 0) {
        return cont[0]
      } else {
        return this.contentsEle
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        if (content === undefined || content === null) content = this.contentsEle
        if (content === undefined || content === null) return
        if (value[0].targetKey !== content.contentsKey) return
        // var count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
        // this.CONT_DETAIL.memoCount = count
        // eslint-disable-next-line no-debugger
        debugger
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
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
        console.log(this.CONT_DETAIL.D_MEMO_LIST)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.contentsCard{background: #FFFFFF; border-bottom: 2px solid #E1E1E1; display: flex; flex-direction: column;}

.contentsCardLogoArea{
    width: 45px; height: 45px; overflow: hidden; float: left; border-radius: 100%; border: 2px solid #5B1CFC; display: flex; justify-content: center; align-items: center;
}
.h-400max{
  max-height: 400px;
}
.overHidden{
  overflow: hidden;
}
pre div[id='formEditText'] {
  border-top: 1px solid #ccc;
}
</style>
