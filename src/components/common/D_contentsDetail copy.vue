<template>
    <div v-if="this.CHANNEL_DETAIL && this.CONT_DETAIL && (CONT_DETAIL.jobkindId === 'ALIM' || (CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL))" class="boardDetailWrap" :style="(CONT_DETAIL.jobkindId === 'BOAR' && CAB_DETAIL.picBgPath) ? 'background: ' + CAB_DETAIL.picBgPath + ';' : 'background: #6768A7;'">
        <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>
        <loadingCompo class="fl" style="z-index: 999999999 !important; position:absolute; top:0; left:0; width:100%; height:100%;" v-if="loadingYn" />
        <imgPreviewPop :mFileKey="CONT_DETAIL.attachMfilekey" :startIndex="selectImgIndex" @closePop="this.backClick()" v-if="previewPopShowYn && CONT_DETAIL.attachMfilekey" style="width: 100%; height: calc(100%); position: absolute; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="CONT_DETAIL.title" :creUserName="CONT_DETAIL.creUserName" :creDate="CONT_DETAIL.dateText"  :imgList="this.clickImgList" />
        <div id="boardDetailScrollArea" class="pagePaddingWrap mtop-1 overflowYScroll" ref="memoarea" >
            <div class="content pushMbox">
                <div class="pushDetailTopArea">
                    <div @click="goChanDetail(CHANNEL_DETAIL.teamKey)" class="boardDetailChanLogoImgWrap fl" :style="'background-image: url(' + (CHANNEL_DETAIL.logoDomainPath !== undefind ? CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext : CHANNEL_DETAIL.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
                    <div class="pushDetailHeaderTextArea">
                        <p :class="CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46? 'completeWork': ''" class=" font18 fontBold commonBlack cursorDragText" style="word-break: break-word;">
                            <pp v-if="CONT_DETAIL.jobkindId === 'ALIM'" class="font14 fl contentTypeTextArea fontNomal" style="background:#6768A7; color: #FFF;">{{'알림'}}</pp>
                            <pp v-else-if="CONT_DETAIL.jobkindId === 'BOAR'" class="font14 fl contentTypeTextArea commonColor" style="background:#FFF; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</pp>
                            <img class="fr mright-03" style="width:4.5px;" @click="contentMenuClick({type: CONT_DETAIL.jobkindId === 'ALIM' ? 'alim' : 'board', ownerYn: GE_USER.userKey === CONT_DETAIL.creUserKey || (!propParams.nonMemYn && CONT_DETAIL.creUserKey === 0), tempData: CONT_DETAIL})" src="../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
                            {{CONT_DETAIL.title}}
                        </p>
                        <div class="w-100P fl" style=" margin-bottom: 5px;">
                            <p style="width:100%; " class="font14 fl grayBlack">
                                <img src="../../assets/images/channel/icon_official2.svg" v-if="CONT_DETAIL.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                                <pp class="font12 fl grayBlack "  @click="userNameClick(CONT_DETAIL.creUserKey, CONT_DETAIL.creTeamKey, CONT_DETAIL.showCreNameYn === 0)">{{CONT_DETAIL.showCreNameYn === 1 ? this.$changeText(CONT_DETAIL.creUserName) : '익명'}}</pp>
                                <pp v-if="CONT_DETAIL.jobkindId === 'BOAR'">/{{this.$changeText(CONT_DETAIL.cabinetNameMtext)}}</pp>
                            </p>
                        </div>
                        <div class="w-100P fl" style="padding: 5px 0; ">
                            <div class="fr" style="display: flex; align-items: center;">
                                <pp class="font14 fl lightGray">{{this.$changeDateFormat(CONT_DETAIL.creDate, true)}}</pp>
                            </div>
                            <div v-if="CONT_DETAIL.jobkindId === 'ALIM'" style="width: 1px; height: 10px; background: #ccc; float: right; margin: 0 8px; margin-top: 4px;"> </div>
                            <div div v-if="cancelTimerShowCheck(CONT_DETAIL)" class="fl" :id="'timerArea'+CONT_DETAIL.contentsKey" @click="cancelConfirm(CONT_DETAIL)">
                                <p :id="'timerText'+CONT_DETAIL.contentsKey" class="font12 fl textRight w-100P" >{{setIntervalTimer(CONT_DETAIL.creDate, CONT_DETAIL.contentsKey)}}</p>
                            </div>
                            <div v-if="CONT_DETAIL.jobkindId === 'ALIM'" class="fr" style="padding: 0 5px;">
                                <img v-if="CONT_DETAIL.rUserCount !== -1" src="../../assets/images/main/main_subscriber.png" style="width:13px;margin-right: 2px; margin-top: 2px;" class="fl" alt="">
                                <p class="fl font14 lightGray" >{{CONT_DETAIL.rUserCount === -1 ? '전체' : CONT_DETAIL.rUserCount }}</p>
                            </div>
                            <div v-if="CONT_DETAIL.attachMfilekey" style="width: 1px; height: 10px; background: #ccc; float: right; margin: 0 8px; margin-top: 4px;"> </div>
                            <div v-if="CONT_DETAIL.attachMfilekey" class="fr" style="padding: 0 5px;">
                                <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width:17px; margin-top: 2px;" class="fl" alt="">
                            </div>
                            <div v-if="CONT_DETAIL.workStatYn" style="width: 1px; height: 10px; background: #ccc; float: right; margin: 0 8px; margin-top: 4px;"> </div>
                            <statCodeComponent :alimDetail="CONT_DETAIL" class="fr" :contentsKey="CONT_DETAIL.contentsKey" :teamKey="CONT_DETAIL.creTeamKey" :currentCodeKey="CONT_DETAIL.workStatCodeKey" :codeList="CONT_DETAIL.workStatCodeList" />
                        </div>
                    </div>
                </div>
                <div v-if="this.CONT_DETAIL.D_ATTATCH_FILE_LIST && this.CONT_DETAIL.D_ATTATCH_FILE_LIST.length > 0" style="position: relative;width: 100%; height: 30px; float: left; ">
                    <span @click="filePopShowYn = !filePopShowYn" class="commonBlack font14 fr">파일 다운로드 <!-- <span class="font14 fontBold">({{this.attachTrueFileList.length}})</span> --></span>
                    <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width: 20px; float: right;" alt="">
                    <div v-if="filePopShowYn" style="width: 70%; word-break: break-all; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); border-radius: 6px 0px 6px 6px; max-width: 300px; min-width: 100px; min-height: 200px; max-height: 30%; right: 0; top: 25px; background: #fff; z-index: 1; overflow: hidden auto; position: absolute">
                        <div style=" margin: 15px; float: left; width: calc(100% - 30px);">
                            <templete v-for="(value, index) in this.CONT_DETAIL.D_ATTATCH_FILE_LIST" :key="index">
                                <div  v-if="value.attachYn"  style="width: 100%; word-break: break-all;min-height: 30px; float: left;" >
                                    <!-- <p class="font12 commonBlack mtop-05" style="margin-left: 2px; margin-right: 5px; float: left" >- </p> -->
                                    <img :src="settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
                                    <a style="width: calc(100% - 20px);" :fileKey="value.fileKey" @click="download1(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot"  >
                                    {{value.fileName}}
                                    </a>
                                </div>
                            </templete>
                        </div>
                    </div>
                </div>
                <pre  id="contentsBodyArea"  @click="memoShowYn = false" class="font15 mbottom-2 cursorDragText" v-html="decodeContents(CONT_DETAIL.bodyFullStr, CONT_DETAIL.workStatYn && CONT_DETAIL.workStatCodeKey === 46)"></pre>

                <div id="alimCheckArea">
                    <div class="alimCheckContents">
                        <div v-if="!propParams.nonMemYn" class="w-100P fr mbottom-05" >
                            <p class="commonBlack font13" style="float: right;">좋아요 {{CONT_DETAIL.likeCount}}개</p>
                            <p class="commonBlack font13" style="float: right; margin-right: 10px;'">댓글 {{this.CONT_DETAIL.memoCount}}개</p>
                        </div>
                        <div v-else class="mbottom-05 fr" style="min-height: 30px;">
                            <div class="commonBlack font12" style="float: left; padding: 2px 10px; background: rgb(0 0 0 / 21%); border-radius: 5px;">{{CONT_DETAIL.memoCount > 0? '답변완료' : '답변대기'}}</div>
                        </div>
                        <div class="fl" style="display:flex;">
                            <template v-if="!propParams.nonMemYn">
                                <div @click="changeAct(userDo, CONT_DETAIL.contentsKey)"  class="fl" v-for="(userDo, index) in this.CONT_DETAIL.D_CONT_USER_DO" :key="index">
                                    <template v-if="userDo.doType === 'ST'">
                                        <img class="mright-05 mtop-01 fl" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                                        <img class="mright-05 mtop-01 fl" v-else src="../../assets/images/common/starIcon.svg" alt="">
                                    </template>
                                    <template v-else-if="userDo.doType === 'LI'">
                                        <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                                        <img class="mright-05 fl" style="margin-top: 5px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                                    </template>
                                </div>
                            </template>
                            <img src="../../assets/images/common/icon_share_square.svg" class="img-w20 fl" alt="공유 아이콘"
                            data-clipboard-action="copy" id="boardDetailCopyBody" @click="openSelectSharePop"
                                :data-clipboard-text="CONT_DETAIL.copyTextStr">
                        </div>
                        <gBtnSmall v-if="!propParams.nonMemYn && (this.CONT_DETAIL.jobkindId === 'ALIM' || (this.CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL.replyYn === 1))" btnTitle="댓글쓰기" class="fr" btnThema="light" @click="writeMemo"/>
                    </div>
                    <div v-if="!propParams.nonMemYn && CONT_DETAIL.jobkindId === 'BOAR' && !this.CAB_DETAIL.replyYn" class="fl w-100P mtop-05 mbottom-05" style="background-color:#cccccc50; padding: 0.5rem 0; border-radius: 10px;">
                        <p class="w-100P commonBlack font13 textCenter" >관리자가 댓글 사용을 중지하였습니다.</p>
                    </div>
                    <div class="boardBorder"></div>
                    <div id="memoWrap" class="w-100P fl" style=" min-height: 100px;" >
                        <gMemoList :nonMemYn="propParams.nonMemYn" @loadMore='loadMore' ref="boardMemoListCompo" :memoList="CONT_DETAIL.D_MEMO_LIST" @deleteMemo='deleteConfirm' @editTrue='editMemo' @mememo='writeMememo' @scrollMove='scrollMove' @contentMenuClick="contentMenuClick" @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo"  @clearMemo='clearMemo' />
                    </div>
                </div>
            </div>
            <div class="paperEffect" ><div class="pushDetailPaperEffect"></div></div>
        </div>
        <div v-if="memoShowYn" class="memoBoxBackground" @click="memoPopNo()"></div>
        <gMemoPop transition="showMemoPop" ref="contentDetailMemoPop" :resetMemoYn="resetMemoYn"  :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' :writeMemoTempData='tempMemoData' />
        <gConfirmPop :confirmText='confirmText' :confirmType="confirmType ? 'two' : 'timeout'" v-if="confirmPopShowYn" @no='confirmPopShowYn=false, reportYn = false' @ok='confirmOk' />
        <gReport :contentsInfo="this.CONT_DETAIL" v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @report="report" @editable="editable" @bloc="bloc" />
        <smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
        <imgLongClickPop @closePop="backClick" @clickBtn="longClickAlertClick" v-if="imgDetailAlertShowYn" />
        <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="CONT_DETAIL.jobkindId === 'BOAR' && selectBoardPopShowYn" :boardDetail="CONT_DETAIL" :boardValue="CAB_DETAIL" />
    </div>
</template>
<script>
import loadingCompo from '@/components/layout/Tal_loading.vue'
import imgPreviewPop from '@/components/popup/file/Tal_imgPreviewPop.vue'
import { onMessage } from '../../assets/js/webviewInterface'
import statCodeComponent from '@/components/board/D_manageStateCode.vue'
/* import manageStickerPop from '../sticker/Tal_manageStickerPop.vue' */
export default {
  data () {
    return {
      selectBoardPopShowYn: false,
      selectBoardType: 'move',
      confirmText: '',
      confirmPopShowYn: false,
      memoShowYn: false,
      clickImgList: [],
      selectImgIndex: 0,
      selectedImgContentsIndex: 0,
      filePopShowYn: false,
      imgDetailAlertShowYn: false,
      previewPopShowYn: false,
      mememoValue: null,
      confirmType: false,
      boardFuncType: '',
      offsetInt: 0,
      pagesize: 10,
      endListYn: false,
      reportYn: false,
      contentType: '',
      contentOwner: false,
      tempData: {},
      currentConfirmType: '',
      smallPopYn: false,
      confirmMsg: '',
      clickTime: 0,
      selectImgObject: {},
      mobileYn: this.$getMobileYn(),
      clickEndYn: false,
      alertPopId: null,
      clickImg: null,
      systemName: localStorage.getItem('systemName'),
      loadingYn: false,
      saveMemoLoadingYn: false,
      cabinetDetail: null,
      resetMemoYn: false,
      cDetail: null,
      currentMemoKey: 0,
      tempMemoData: {}
    }
  },
  props: {
    propParams: {},
    pPopId: {}
  },
  components: {
    /* manageStickerPop, */
    imgPreviewPop,
    loadingCompo,
    statCodeComponent
  },
  created () {
    this.readyFunction()
  },
  updated () {
    this.settingAtag()
  },
  beforeUnmount () {
    this.filePopShowYn = false
  },
  unmounted () {
    this.filePopShowYn = false
  },

  mounted () {
    var this_ = this
    this.$nextTick(() => {
      this_.addImgEvnt()
    })
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    CHANNEL_DETAIL () {
      var chan = this.$getDetail('TEAM', this.propParams.teamKey)
      if (chan) {
        return chan[0]
      } else {
        return null
      }
    },
    CAB_DETAIL () {
      if (this.propParams.jobkindId === 'BOAR') {
        if (!this.cabinetDetail) return null
        return this.cabinetDetail.mCabinet
      } else {
        return null
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    CONT_DETAIL () {
      if (!this.cDetail || !this.CHANNEL_DETAIL) return
      var cont = this.$getContentsDetail(null, this.cDetail.contentsKey, this.CHANNEL_DETAIL.teamKey)
      if (!cont) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.cDetail])
      }
      if (cont) {
        return cont[0]
      } else {
        return this.cDetail
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    CONT_DETAIL: {
      handler (value, old) {
        if (value) {
          this.onLoadFunction()
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        if (value[0].targetKey !== content.contentsKey) return
        var count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
        this.CONT_DETAIL.memoCount = count
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
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
      },
      deep: true
    }
  },
  methods: {
    settingFileIcon (fileName) {
      let fileExt = fileName.substring(
        fileName.lastIndexOf('.') + 1
      )
      var fileScr = ''
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'raw', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_img.svg'
      } else if (
        ['mp4', 'avi', 'mov'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_mov.svg'
      } else if (
        ['mp3', 'wav'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_music.svg'
      } else if (
        ['xls'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_excel.svg'
      } else if (
        ['pdf'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_pdf.svg'
      } else if (
        ['ppt'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_ppt.svg'
      } else if (
        ['doc'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_doc.svg'
      } else if (
        ['zip'].includes(fileExt)
      ) {
        fileScr = '/resource/fileIcon/fileType_zip.svg'
      } else {
        fileScr = '/resource/fileIcon/fileType_common.svg'
      }
      return fileScr
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
    cancelTimerShowCheck (alim) {
      var result = false
      if (alim.jobkindId === 'ALIM' && alim.creUserKey === this.GE_USER.userKey) {
        var time = this.$cancelTimer(alim.creDate)
        if (time !== false) {
          result = true
        }
      }
      return result
    },
    cancelConfirm (alim) {
      this.tempData = alim
      this.confirmText = '알림 발송을 취소 하시겠습니까?'
      this.currentConfirmType = 'alimCancel'
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    memoPopNo () {
      this.memoShowYn = false
      this.tempMemoData = this.$refs.contentDetailMemoPop.getMemoData()
      // document.body.focus()
    },
    clearMemo () {
      this.tempMemoData = undefined
    },
    async readyFunction () {
      try {
        this.loadingYn = true
        if (!this.CHANNEL_DETAIL || !this.CHANNEL_DETAIL.D_CHAN_AUTH || !this.CHANNEL_DETAIL.D_CHAN_AUTH.settingYn) {
          await this.$addChanList(this.propParams.teamKey)
        }
        if (this.propParams.jobkindId === 'BOAR') {
          this.getCabinetDetail(this.propParams.creTeamKey)
        }
        if ((!this.CONT_DETAIL || (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTATCH_FILE_LIST))) {
          await this.getContentsDetail()
        }
        if (!this.CONT_DETAIL.D_MEMO_LIST) {
          this.CONT_DETAIL.D_MEMO_LIST = []
          await this.getMemoList()
        }
        if (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTATCH_FILE_LIST) {
          this.settingFileList()
        }
      } catch (e) {
        console.log(e)
      }
      this.loadingYn = false
    },
    async getCabinetDetail (teamKey) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var tt = this.propData
      param.currentTeamKey = teamKey
      param.cabinetKey = this.propParams.value.cabinetKey
      var resultList = await this.$getCabinetDetail(param)
      resultList.mCabinet.shareAuth = this.$checkUserAuth(resultList.mCabinet.mShareItemList)
      // eslint-disable-next-line no-debugger
      debugger
      this.cabinetDetail = resultList
      console.log('')
      console.log(this.propParams)

      console.log(this.cabinetDetail)
    },
    async getContentsDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = this.propParams.targetKey
      param.targetKey = this.propParams.targetKey
      param.jobkindId = this.propParams.jobkindId
      param.userKey = this.GE_USER.userKey
      param.ownUserKey = this.GE_USER.userKey
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      // eslint-disable-next-line no-debugger
      detailData.D_CONT_USER_DO = await this.settingUserDo(detailData.userDoList)
      if (!detailData.D_MEMO_LIST && (!detailData.memoList || detailData.memoList.length === 0)) detailData.D_MEMO_LIST = []
      this.cDetail = detailData
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    onLoadFunction () {
      var thisthis = this
      if (this.CONT_DETAIL) {
        this.addImgEvnt()
        this.settingAtag()
        this.loadingYn = false
      } else {
        setTimeout(() => {
          thisthis.addImgEvnt()
          thisthis.loadingYn = false
        }, 1000)
      }
      var pushListWrap = this.$refs.memoarea
      if (pushListWrap) {
        pushListWrap.addEventListener('scroll', () => {
          this.clickEndYn = true
        })
      } else {
        setTimeout(() => {
          if (pushListWrap) {
            pushListWrap.addEventListener('scroll', () => {
              this.clickEndYn = true
            })
          }
        }, 300)
      }
    },
    memoUserNameClick (params) {
      this.userNameClick(params.userKey, this.CONT_DETAIL.creTeamKey, false)
    },
    userNameClick (userKey, teamKey, blindYn) {
      if (!blindYn) {
        var param = {}
        param.targetType = 'bookMemberDetail'
        param.popHeaderText = '프로필'
        param.readOnlyYn = true
        param.userKey = userKey
        param.teamKey = teamKey
        if (userKey === this.GE_USER.userKey) {
          param.selfYn = true
          param.popHeaderText = '내 정보'
        } else {
          param.contentOpenYn = true
        }
        this.$emit('openPop', param)
      } else {
        this.$showToastPop('익명의 게시글로 유저 정보를 볼 수 없습니다.')
      }
    },
    settingAtag () {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        return
      }
      var contentsATagList = document.querySelectorAll('#contentsBodyArea a')
      if (contentsATagList && contentsATagList.length > 0) {
        for (var i = 0; i < contentsATagList.length; i++) {
          contentsATagList[i].target = '_blank'
        }
      }
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.backClick()
        this.clickEndYn = false
        this.previewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', this.selectImgObject.path)
        } else {
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
        }
        this.confirmText = '저장되었습니다!'
        this.confirmType = false
        this.backClick()
        this.confirmPopShowYn = true
      } catch (error) {
        // // console.log(error)
      }
    },
    openSelectBoardPop (type) {
      this.selectBoardType = type
      this.selectBoardPopShowYn = true
    },
    closeSelectBoardPop (value) {
      this.selectBoardPopShowYn = false
      this.$emit('closeAndNewPop', value)
    },
    editable (type, allYn) {
      this.reportYn = false
      // tempData는 어떤 컨텐츠가 올지, 어떤 Function이 올지 몰라 해당 컨텐츠의 데이터를 일단 받아주는 변수입니다..!

      if (this.CONT_DETAIL.contentsKey) {
        if (type === 'edit') {
          if (this.CONT_DETAIL.jobkindId === 'BOAR') {
            // this.deleteConfirm('board')
            this.editBoard()
          }
          //
        } else if (type === 'delete') {
          if (allYn) {
            this.deleteAlimAll()
          } else {
            if (this.CONT_DETAIL.jobkindId === 'ALIM') {
              this.deleteConfirm('alim')
            } else if (this.CONT_DETAIL.jobkindId === 'BOAR') {
              this.deleteConfirm('board')
            }
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
        }
      } else if (this.tempData.memoKey) {
        if (type === 'edit') {
          this.$refs.boardMemoListCompo[0].editMemoClick(this.tempData, this.tempData.index, this.tempData.cIndex)
          // this.openUpdateContentsPop()
        } else if (type === 'delete') {
          this.deleteConfirm('memo')
          // this.deleteMemo({ memoKey: this.tempData.memoKey })
          // this.boardFuncClick('BOAR')
        }
      }
      if (type === 'textCopy') {
        this.textCopy()
      }
    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        // console.log(data)
        this.tempData = data
      }

      if (data === 'memo' || (this.tempData && this.tempData.memoKey)) {
        this.confirmText = '댓글을 삭제하시겠습니까?'
        if (this.tempData.parentMemoKey) {
          this.confirmText = '대댓글을 삭제하시겠습니까?'
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.CONT_DETAIL.jobkindId === 'ALIM') {
        this.confirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.CONT_DETAIL.jobkindId === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'boardDEL'
      }
      // console.log(this.tempData);
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    textCopy () {
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      try {
        // textarea.style.display = 'none'
        var contKey, content
        if (this.tempData.memoKey) {
          contKey = this.tempData.memoKey
          content = document.getElementById('memoFullStr' + contKey).innerText
        } else {
          // contKey = this.tempData.contentsKey
          content = document.getElementById('contentsBodyArea').innerText
        }
        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        this.$showToastPop('복사되었습니다.')
      } catch (error) {
        console.log(error)
        this.$showToastPop('복사하지 못했습니다.')
      } finally {
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
    },
    editBoard () {
      // console.log();
      var param = {}
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetType = 'writeContents'
      param.contentsJobkindId = 'BOAR'
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) { param.attachMfilekey = this.CONT_DETAIL.attachMfilekey }
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      // param.parentAttachTrueFileList = this.attachTrueFileList
      this.$emit('openPop', param)
    },
    async deleteAlim (allYn) {
      // console.log(this.tempData)
      var inParam = {}
      if (this.CONT_DETAIL.jobkindId === 'ALIM') {
        if (allYn) {

        }
        inParam.mccKey = this.CONT_DETAIL.mccKey
        inParam.jobkindId = 'ALIM'
        // inParam.teamKey = this.tempData.creTeamKey

        await this.$commonAxiosFunction({
          url: 'service/tp.deleteMCabContents',
          param: inParam
        })
      } else if (this.CONT_DETAIL.jobkindId === 'BOAR') {
        // // console.log(this.alimDetail)
        inParam.mccKey = this.CONT_DETAIL.mccKey
        inParam.contentsKey = this.CONT_DETAIL.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.CONT_DETAIL.creTeamKey
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: 'service/tp.deleteContents',
          param: inParam
        })
      }
      this.$store.commit('D_CHANNEL/MU_DEL_CONT_LIST', inParam)
      this.$emit('closeXPop', true)
    },
    report (type) {
      var targetKind
      var targetKey
      if (type === 'alim') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 알림이 신고되었습니다.'
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'memo') {
        targetKind = 'C'
        targetKey = this.tempData.memoKey
        this.confirmText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'channel') {
        targetKind = 'T'
        targetKey = this.tempData.creTeamKey
        this.confirmText = '해당 채널이 신고되었습니다.'
      } else if (type === 'user') {
        targetKind = 'U'
        targetKey = this.tempData.creUserKey
        this.confirmText = '해당 유저가 신고되었습니다.'
      }

      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveActLog',
        param: param
      })
      // // console.log(result.data.result)
      if (result.data.result === true) {
        this.confirmMsg = this.confirmText
        this.smallPopYn = true
        // this.confirmPopShowYn = true
      }
    },
    bloc (type) {
      var typeText = type === 'user' ? '유저를' : '게시글을'
      this.confirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.confirmType = 'two'
      this.confirmPopShowYn = true
      this.currentConfirmType = 'BLOC'
    },
    contentMenuClick (params) {
      this.memoShowYn = false
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      if (params.tempData) {
        params.tempData.index = params.index
        params.tempData.cIndex = params.cIndex
        // console.log(params.tempData.index)
      }
      this.tempData = params.tempData
      this.reportYn = true
    },
    async download1 (fileKey, path) {
      // eslint-disable-next-line no-unused-vars
      var result = await this.$downloadFile(fileKey, path)
    },
    openSelectSharePop () {
      if (navigator.share) {
        navigator.share({ title: '더알림', text: this.CONT_DETAIL.title, url: this.CONT_DETAIL.copyTextStr })
      } else this.$showToastPop('지원하지 않는 브라우저입니다.')
    },
    addImgEvnt () {
      // console.log(this.CONT_DETAIL)
      this.clickImgList = document.querySelectorAll('#contentsBodyArea img')
      for (let m = 0; m < this.clickImgList.length; m++) {
        var thisthis = this
        thisthis.clickImgList[m].addEventListener('touchstart', () => {
          thisthis.clickTime = Date.now()
          thisthis.clickEndYn = false
          thisthis.clickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.clickEndYn === false) {
              thisthis.memoShowYn = false
              thisthis.selectImgObject.path = thisthis.clickImgList[m].src
              thisthis.selectImgObject.fileKey = Number(thisthis.clickImgList[m].attributes.filekey.value)
              thisthis.selectImgIndex = m
              thisthis.clickImgList[m].style.opacity = 1
              this.openImgDetailAlert(thisthis.clickImgList[m])
            }
          }, 300)
          // thisthis.previewPopShowYn = true
        })
        thisthis.clickImgList[m].addEventListener('touchend', () => {
          thisthis.clickEndYn = true
          thisthis.clickImgList[m].style.opacity = 1
        })

        thisthis.clickImgList[m].addEventListener('mousedown', () => {
          thisthis.clickTime = Date.now()
          thisthis.clickEndYn = false
          thisthis.clickImgList[m].style.opacity = 0.8
          setTimeout(() => {
            if (thisthis.clickEndYn === false) {
              thisthis.memoShowYn = false
              thisthis.selectImgObject.path = thisthis.clickImgList[m].src
              thisthis.selectImgObject.fileKey = Number(thisthis.clickImgList[m].attributes.filekey.value)
              this.openImgDetailAlert(thisthis.clickImgList[m])
              thisthis.selectImgIndex = m
              thisthis.clickImgList[m].style.opacity = 1
            }
          }, 1000)
        })
        thisthis.clickImgList[m].addEventListener('mouseup', () => {
          thisthis.clickEndYn = true
          thisthis.clickImgList[m].style.opacity = 1
        })
      }
      // this.settingFileList(false)
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.imgDetailAlertShowYn = false
      } else {
        this.previewPopShowYn = false
      }
    },
    openImgDetailAlert (img) {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      this.alertPopId = this.$setParentsId(this.pPopId, this.alertPopId)
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      // console.log(this.$store.getters['D_HISTORY/hStack'])
      this.imgDetailAlertShowYn = true
      this.clickEndYn = false
    },
    openUpdateContentsPop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.targetType = 'writeContents'
      param.contentsJobkindId = this.CONT_DETAIL.jobkindId
      param.creTeamKey = this.CONT_DETAIL.creTeamKey
      if (this.CONT_DETAIL.attachMfilekey) { param.attachMfilekey = this.CONT_DETAIL.attachMfilekey }
      param.bodyFullStr = this.CONT_DETAIL.bodyFullStr
      param.modiContentsKey = this.CONT_DETAIL.contentsKey
      param.titleStr = this.CONT_DETAIL.title
      param.parentAttachTrueFileList = this.CONT_DETAIL.D_ATTATCH_FILE_LIST
      this.$emit('openPop', param)
    },
    boardFuncClick (type) {
      this.confirmType = true
      this.boardFuncType = type
      if (type === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'deleteBoar'
      } else if (type === 'REPORT') {
        this.confirmText = '해당 게시글을 신고 하시겠습니까?'
      } else if (type === 'memoDel') {
        this.confirmText = '댓글을 삭제하시겠습니까?'
      }
      this.confirmPopShowYn = true
    },
    /* async confirmOk () {
      this.confirmType = false
      this.confirmPopShowYn = false
      if (this.currentConfirmType === 'deleteBoar') {
        var inParam = {}
        // console.log(this.alimDetail)
        inParam.contentsKey = this.CONT_DETAIL.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.CONT_DETAIL.creTeamKey
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: 'service/tp.deleteContents',
          param: inParam
        })
        this.$emit('closeXPop', true)
        // console.log('Delete Content Result' + result)
      } else if (this.currentConfirmType === 'BLOC') {
        this.currentConfirmType = ''
        // console.log(this.tempData)
        var param = {}
        param.actType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.errorBoxText = '알수 없는 오류입니다.'
        }
        param.creUserKey = this.GE_USER.userKey
        this.errorBoxText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param)
      } else if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey })
      }
    }, */
    confirmOk () {
      this.confirmType = 'timeout'
      if (this.currentConfirmType === 'BLOC') {
        this.currentConfirmType = ''
        // console.log(this.tempData);
        var param = {}
        param.claimType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.confirmText = '알수 없는 오류입니다.'
        }
        param.creUserKey = this.GE_USER.userKey
        this.confirmText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param)
      } else if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey })
        this.$emit('showToastPop', '댓글을 삭제하였습니다.')
      } else if (this.currentConfirmType === 'alimDEL') {
        this.$emit('showToastPop', '알림을 나에게서 삭제하였습니다.')
        this.deleteAlim()
      } else if (this.currentConfirmType === 'boardDEL') {
        this.$emit('showToastPop', '게시글을 삭제하였습니다.')
        this.deleteAlim()
      } else if (this.currentConfirmType === 'alimCancel') {
        // this.$emit('showToastPop', '게시글을 삭제하였습니다.')
        this.alimCancle()
      }

      this.currentConfirmType = ''
      this.confirmPopShowYn = false
    },
    mememoCancel () {
      this.mememoValue = null
    },
    scrollMove (wich) {
      var middle = (document.innerHeight || window.innerHeight) / 2 - 100
      var memoArea = this.$refs.memoarea
      if (wich === -1) {
        wich = document.getElementById(this.CONT_DETAIL.D_MEMO_LIST[this.CONT_DETAIL.D_MEMO_LIST.length - 1].memoKey).offsetTop
        this.$refs.boardMemoListCompo[0].anima(this.CONT_DETAIL.D_MEMO_LIST[this.CONT_DETAIL.D_MEMO_LIST.length - 1].memoKey)
      }
      memoArea.scrollTo({ top: (wich - middle), behavior: 'smooth' })
    },
    writeMemo () {
      if ((this.CONT_DETAIL.jobkindId === 'ALIM' && this.CONT_DETAIL.canReplyYn === 1) || (this.CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL.shareAuth.R === true)) {
        if (this.currentMemoKey !== this.CONT_DETAIL.contentsKey) {
          // this.$emit('clearMemo')
          this.clearMemo()
        }
        this.currentMemoKey = this.CONT_DETAIL.contentsKey
        if (this.mememoValue) {
          this.resetMemoYn = true
        }
        this.mememoValue = null
        this.memoShowYn = true
      } else {
        this.$showToastPop('댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.')
        // this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        // this.confirmPopShowYn = true
      }
    },
    writeMememo (memo) {
      if (this.currentMemoKey !== memo.memoKey) {
        // this.$emit('clearMemo')
        this.clearMemo()
      }
      this.currentMemoKey = memo.memoKey
      if ((this.CONT_DETAIL.jobkindId === 'ALIM' && this.CONT_DETAIL.canReplyYn === 1) || (this.CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL.shareAuth.R === true)) {
        var data = {}
        data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
        if (memo.parentMemoKey !== undefined && memo.parentMemoKey !== null && memo.parentMemoKey !== '') {
          data.parentMemoKey = memo.parentMemoKey
        }
        data.memo = memo
        // eslint-disable-next-line no-debugger
        debugger
        if (!this.mememoValue) {
          this.resetMemoYn = true
        } else {
          if (this.mememoValue.parentMemoKey !== data.parentMemoKey) {
            this.resetMemoYn = true
          } else {
            this.resetMemoYn = false
          }
        }
        // eslint-disable-next-line no-new-object
        this.mememoValue = new Object()
        this.mememoValue = data
        this.memoShowYn = true
      } else {
        this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        this.confirmPopShowYn = true
      }
    },
    async subScribeContents (act) {
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
      this.cDetail.subsYn = param.subsYn
      /* if (result === true) {
        await this.$emit('refresh')
      } */
    },
    async deleteMemo (param) {
      // console.log(param)
      var memo = {}
      memo.memoKey = param.memoKey
      // // console.log(param)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.deleteMemo',
        param: memo
      })
      if (result.data.result === true) {
        // var cont
        var memos = this.CONT_DETAIL.D_MEMO_LIST
        var index = memos.findIndex((item) => item.memoKey === param.memoKey)
        if (this.tempData.parentMemoKey) {
          var cmemoListIdx
          for (let i = 0; i < memos.length; i++) {
            if (memos[i].cmemoList.length > 0) {
              index = memos[i].cmemoList.findIndex(i => i.memoKey === param.memoKey)
              if (index !== -1) {
                cmemoListIdx = i
                break
              }
            }
          }
          if (cmemoListIdx !== -1) memos[cmemoListIdx].cmemoList.splice(index, 1)
        } else {
          memos.splice(index, 1)
        }
        this.CONT_DETAIL.D_MEMO_LIST = memos
        this.CONT_DETAIL.memoCount = this.$countingTotalMemo(memos)
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', this.CONT_DETAIL)
      }
    },
    async loadMore () {
      if (!this.CONT_DETAIL.D_MEMO_LIST || this.CONT_DETAIL.memoCount > (this.CONT_DETAIL.D_MEMO_LIST.length)) {
        await this.getMemoList()
      }
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
    async editMemo (memo) {
      var cont = this.CONT_D_MEMO
      var index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === memo.memoKey)
      cont.D_MEMO_LIST[index].bodyFullStr = memo.bodyFullStr
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
    },
    async getMemoList (refreshYn) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      memo.pageSize = this.pagesize
      memo.offsetInt = this.offsetInt
      memo.pageSize = this.CONT_DETAIL.memoCount + 1
      memo.offsetInt = 0

      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      })

      if (result.data.memoList) {
        this.CONT_DETAIL.memoCount = result.data.totalElements
        var tempList = []
        // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
        if (this.CONT_DETAIL.D_MEMO_LIST && !refreshYn) {
          tempList = this.CONT_DETAIL.D_MEMO_LIST
        }
        const newArr = [
          ...tempList,
          ...result.data.memoList
        ]
        var tempMemo = this.replaceArr(newArr)

        if (tempMemo && tempMemo.length > 0) {
          for (let i = 0; i < tempMemo.length; i++) {
            if (tempMemo.parentMemoKey) {
              for (let j = 0; j < tempMemo.length; j++) {
                if (tempMemo[j].memoKey === tempMemo[i].parentMemoKey) {
                  tempMemo[i].meMemoUserDispMtext = this.$changeText(tempMemo[j].userDispMtext)
                  tempMemo[i].meMemoBodyMinStr = tempMemo[j].bodyFullStr
                }
              }
            }
          }
        }
        var cont = this.CONT_DETAIL
        cont.D_MEMO_LIST = [...tempMemo]
        // var memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        // cont.memoCount = result.data.totalElements.length === 0 ? 0 : result.data.totalElements
        this.CONT_DETAIL.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        this.offsetInt = result.data.totalElements
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
      // this.$refs.boardMemoListCompo[0].memoLoadingHide()
    },
    /* async getLikeCount () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.actYn = true
      param.targetKind = 'C'
      param.targetKey = this.CONT_DETAIL.contentsKey
      param.doType = 'LI'
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getUserDoListPage',
        param: param
      })
    }, */
    async saveMemo (inSaveMemoObj) {
      if (!inSaveMemoObj.saveMemoHtml) return
      this.saveMemoLoadingYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }
      // memo.bodyFullStr = text
      if (inSaveMemoObj.saveMemoHtml) {
        memo.bodyFollStr = inSaveMemoObj.saveMemoHtml
      }
      if (inSaveMemoObj.attachFileList) {
        memo.attachFileList = inSaveMemoObj.attachFileList
      }
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.toUserKey = this.CONT_DETAIL.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result) {
          // this.memoShowYn = false
          // if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
          //   await this.getMemoList(true)
          // } else {
          //   await this.getMemoList()
          // }
          this.getMemoList(true)
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.saveMemoLoadingYn = false
      }
    },
    async settingFileList () {
      // eslint-disable-next-line no-unused-vars
      var test = this.CONT_DETAIL
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
    },
    decodeContents (data, completeYn) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      if (completeYn) {
        changeText = changeText.replaceAll('formCard', 'formCard completeWork')
      }
      return changeText
    },
    async settingUserDo (userDo) {
      var D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }, { doType: 'SB', doKey: 0 }]

      if (userDo !== undefined && userDo !== null && userDo !== '') {
        // eslint-disable-next-line no-array-constructor
        /* this.userDoStickerList = new Array() */
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            D_CONT_USER_DO[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            D_CONT_USER_DO[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            D_CONT_USER_DO[2].doKey = true
          }
          if (userDo[i].doType === 'SB') {
            D_CONT_USER_DO[3].doKey = userDo[i].doKey
          }
          /* if (userDo[i].doType === 'SK') {
            this.userDoStickerList.push(userDo[i].sticker)
          } */
        }
      }
      /* var cont = this.CONT_DETAIL
      cont.D_CONT_USER_DO = D_CONT_USER_DO
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont]) */
      return D_CONT_USER_DO
    },

    async changeAct (act, key) {
      // eslint-disable-next-line no-unused-vars
      var result = null
      var saveYn = true
      var temp = []
      var tempDetail = this.CONT_DETAIL
      if (!tempDetail.D_CONT_USER_DO) {
        tempDetail.D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }, { doType: 'SB', doKey: 0 }]
      }
      if (tempDetail.D_CONT_USER_DO) {
        temp = tempDetail.D_CONT_USER_DO
      }
      for (var i = 0; i < temp.length; i++) {
        if (temp[i].doType === act.doType) {
          if (temp[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.propParams).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = key
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          tempDetail.likeCount -= 1
        }
        for (i = 0; i < temp.length; i++) {
          if (temp[i].doType === act.doType) {
            temp[i].doKey = 0
          }
        }
        tempDetail.D_CONT_USER_DO = temp
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then(result => {
          // eslint-disable-next-line no-debugger
          debugger
          for (var d = temp.length - 1; d >= 0; d--) {
            if (temp[d].doType === act.doType) {
              temp[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          tempDetail.D_CONT_USER_DO = temp
          tempDetail.likeCount = result.likeCount
          this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        })
        for (var d = temp.length - 1; d >= 0; d--) {
          if (temp[d].doType === act.doType) {
            temp[d].doKey = 1
          }
        }
        if (act.doType === 'LI') {
          tempDetail.likeCount += 1
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        // }
      }
    },
    goChanDetail () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      // eslint-disable-next-line no-new-object
      var value = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = this.CHANNEL_DETAIL.teamKey
      value.nameMtext = this.CHANNEL_DETAIL.nameMtext
      params.value = this.CHANNEL_DETAIL.teamKey
      // params.chanName = value.chanName
      // params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    pointAni () {
      var firstMemoCard = document.querySelectorAll('#memoWrap .memoCard')[0]
      if (firstMemoCard) {
        firstMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
        firstMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
        setTimeout(() => {
          firstMemoCard.style.boxShadow = 'none'
        }, 1000)
      } else {
      }
    }
  }
}
</script>
<style scoped>
.pagePaddingWrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 0;
    padding-bottom: 50px;
}
.boardBorder{width: 100%; height: 20px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;}
.boardDetailWrap{height: fit-content; z-index: 99999; width: 100%; height: 100%; padding-top: 50px; width: 100%; background: rgb(236, 230, 204); height: calc(100vh);}
.pushDetailTopArea{min-height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
/* .pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;} */
.pushDetailHeaderTextArea{width: calc(100% - 48px); cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; min-height: 30px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100% - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushMbox{margin-bottom: 20px;}

.pushMbox{margin-bottom: 20px;}

.content {
  position: relative;
  width: 100%;
  margin: auto;
  border-radius: 0.8rem 0.8rem 0 0;
  background-color: #ffffff;
  color: #363c5f;
  padding: 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 22rem;
  padding-bottom: 3rem;
  float: left;
  margin-bottom: -10px;

}

.paperEffect {
    width: 100%; float: left; min-height: 50px; background: #FFF; position: relative; border-radius: 0 0 0 0.8rem;
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);
}

.showMemoPop-enter {
  bottom: 0;
  animation: showMemoPop-dialog-fade-in 0.2s ease;
}
.showMemoPop-leave{
  bottom: 100px;
}
/* @keyframes showMemoPop-dialog-fade-in {
  0% {bottom: -100px};
  100% {top: 0px;}
}
@keyframes showMemoPop-dialog-fade-out {
    0% {top: 0px}
    100% { bottom: -100px}
}*/
.showMemoPop-enter {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
.showMemoPop-enter-active {animation: showMemoPop-dialog-fade-in 0.2s ease;}
.showMemoPop-leave-active {animation: showMemoPop-dialog-fade-out 0.2s ease forwards;}
@keyframes showMemoPop-dialog-fade-in {
    /* 0% {transform: translateY(var(--widndowHeight));}
    100% {transform: translateY(0);} */
    0% {bottom: -100px;}
    100% {bottom: 0;}
}
@keyframes showMemoPop-dialog-fade-out {
    /* 0% {transform: translateY(0);}
    100% { transform: translateY(var(--widndowHeight));} */
    0% {bottom: 0;}
    100% {bottom: -100px;}
}
.memoBoxBackground{width: 100%; height: 100vh; background: #00000036; position: absolute; top: 0; left: 0;}
/* .copyTextWrap{background: #6768a7; width: 35px; height: 35px; float: right; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px;} */
.boardDetailChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}
</style>
