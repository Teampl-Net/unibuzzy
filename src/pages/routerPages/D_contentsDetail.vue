<i18n>
{
  "ko": {
    "DETAIL_MSG_FEATURE": "해당 모드에서는 지원하지 않는 기능입니다.",
    "DETAIL_MSG_SAVED": "저장되었습니다!"
  },
  "en": {
    "DETAIL_MSG_FEATURE": "This feature is not supported in this mode.",
    "DETAIL_MSG_SVAED": "Saved!"
  }
}
</i18n>
<template>
    <div ref="contScrollWrap" id="contsScrollWrap" class="boardDetailWrap" v-if="cDetail">
      <popHeader :pNoAuthYn="true" ref="gPopupHeader" class="commonPopHeaderWrap headerShadow commonPopHeader" :style="'top:' + 0 + 'px'" :headerTitle="cDetail.cabinetNameMtext? cDetail.cabinetNameMtext:cDetail.nameMtext" targetType="contentsDetail" @openMenu="openChanMenuYn = true" />
          <gContentsBox :pFadeNotShowYn="true" :pNoAuthYn="true" @openImgPop="openImgPop" @scrollToMemoTop="scrollToMemoTop" @fileDownload="filePopShowYn = !filePopShowYn" :imgClickYn="true" ref="myContentsBox" :propDetailYn="true" :contentsEle="this.cDetail" :childShowYn="true" @openPop="openPop" @writeMemoScrollMove='writeMemoScrollMove' @memoLoadMore='memoLoadMore'/>
        <!-- <attachFileListPop :propFileData="this.CONT_DETAIL" v-if="filePopShowYn === true" @closePop="filePopShowYn = false"/> -->

        <!-- <div @click="filePopShowYn =false"  v-if="filePopShowYn"  style="width: 100%; height: 100%;     position: absolute;; background: #00000020; z-index: 2; top: 0;"></div>
        <div v-if="filePopShowYn" style="width: 80%; word-break: break-all; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); border-radius: 6px 6px 6px 6px;  min-height: 200px; max-height: 30%; left: 10%; top: 20%; background: #fff; z-index: 2; overflow: hidden auto; position: absolute">
            <div style=" margin: 15px; float: left; width: calc(100% - 30px); position: relative; ">
                <p class="textLeft font16 fontBold mbottom-1">파일 다운로드</p>
                <img @click="filePopShowYn =false"  src="../../assets/images/common/grayXIcon.svg" style="position: absolute; right: 5px; top: 0px;" alt="">
                <templete v-for="(value, index) in this.CONT_DETAIL.D_ATTATCH_FILE_LIST" :key="index">
                    <div  v-if="value.attachYn"  style="width: 100%; word-break: break-all;min-height: 30px; float: left;" >
                        <img :src="settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
                        <a style="width: calc(100% - 20px); text-align: left;" :fileKey="value.fileKey" @click="download1(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot"  >
                        {{value.fileName}}
                        </a>
                    </div>
                </templete>
                <p class="text16 fontBold textLeft">본문에 추가된 이미지</p>
                {{this.CONT_DETAIL.D_BODY_IMG_FILE_LIST}}
                <templete v-for="(value, index) in this.CONT_DETAIL.D_BODY_IMG_FILE_LIST" :key="index">
                <div  v-if="value"  style="width: 100%; word-break: break-all;min-height: 30px; float: left;" >
                    <img :src="$settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
                    <a style="width: calc(100% - 20px); text-align: left;" :fileKey="value.fileKey" @click="$downloadFile(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot"  >
                    {{value.fileName}}
                    </a>
                </div>
                </templete>
            </div>
        </div> -->
    </div>
</template>
<script>
// import attachFileListPop from '../pageComponents/main/unit/D_commonAttatchFileListPop.vue'
// import html2pdf from 'html2pdf.js'
import { onMessage } from '../../assets/js/webviewInterface'
// import { useMeta } from 'vue-meta'

export default {
  components: {
  },
  data () {
    return {
      mCanLoadYn: true,
      mCheckMemoEndListYn: false,

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
      mOffsetInt: 1,
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
      tempMemoData: {},
      mParam: {},
      mContentsKey: null,
      targetType: 'chanDetail'
    }
  },
  props: {
    propParams: {},
    pPopId: {}
  },
  async created () {
    this.mContentsKey = this.$route.query.contentsKey
    this.$store.dispatch('D_USER/AC_USER', { userKey: -1 })
    await this.readyFunction()
    console.log('updated')
    if (this.cDetail.title) {
      document.querySelector('meta[property="og:title"]').setAttribute('content', this.cDetail.title)
      document.querySelector('meta[property="og:description"]').setAttribute('content', this.cDetail.title)
    }
  },
  updated () {
    var this_ = this
    this.settingAtag()
    var contsScrollWrap = document.getElementById('contsScrollWrap')
    if (!contsScrollWrap) {
      // eslint-disable-next-line no-debugger
      debugger
      return
    }
    contsScrollWrap.addEventListener('scroll', this_.handleScroll)
  },
  beforeUnmount () {
    this.filePopShowYn = false
  },
  unmounted () {
    this.filePopShowYn = false
  },

  async mounted () {
    var this_ = this
    this.$nextTick(() => {
      this_.addImgEvnt()
    })
    var contsScrollWrap = document.getElementById('contsScrollWrap')
    if (!contsScrollWrap) {
      // console.log(contsScrollWrap)
      // eslint-disable-next-line no-debugger
      debugger
      return
    }
    contsScrollWrap.addEventListener('scroll', this.handleScroll)

    if (this.mParam.memoScrollYn) {
      var memoTop
      memoTop = await this.$refs.myContentsBox.getMemoTop()
      console.log('contentDetail : ' + memoTop)

      this.scrollMove(memoTop - 100)
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    CONT_DETAIL () {
      if (!this.cDetail) return
      // var cont = this.$getContentsDetail(null, this.cDetail.contentsKey, this.CHANNEL_DETAIL.teamKey)
      // if (!cont) {
      //   this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.cDetail])
      // }
      // console.log(cont)
      // if (cont) {
      //   // this.setMemoReverse(cont[0].D_MEMO_LIST)
      //   return cont[0]
      // } else {
      // this.setMemoReverse(this.cDetail.D_MEMO_LIST)
      return this.cDetail
      // }
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
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    async scrollToMemoTop () {
      if (this.mParam.memoScrollYn) {
        var memoTop = await this.$refs.myContentsBox.getMemoTop()
        // eslint-disable-next-line no-unused-vars
        var test = this.$refs.contScrollWrap
        // eslint-disable-next-line no-debugger
        debugger
        console.log(this.$refs.contScrollWrap.scrollHeight + '///' + memoTop)
        if (this.$refs.contScrollWrap.scrollTop < memoTop) {
          console.log('contentDetail : ' + memoTop)

          this.scrollMove(memoTop - 100)
        }
      }
    },
    scrollMove (wich) {
      if (!wich) return
      this.$refs.contScrollWrap.scrollTo({ top: wich, behavior: 'smooth' })
    },
    setMemoReverse (arr) {
      if (arr !== undefined || arr !== null || arr !== '' || arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].cmemoList && arr[i].cmemoList.length > 0) {
            arr[i].cmemoList = arr[i].cmemoList.reverse()
          }
        }
      }
      return arr
    },
    handleScroll () {
      if (!this.$refs.myContentsBox) return
      this.$refs.myContentsBox.handleScroll()
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
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
        if ((!this.CONT_DETAIL || (this.CONT_DETAIL.attachMfilekey && !this.CONT_DETAIL.D_ATTATCH_FILE_LIST))) {
          await this.getContentsDetail()
        }
        /* if (!this.CONT_DETAIL.D_MEMO_LIST) {
          this.CONT_DETAIL.D_MEMO_LIST = []
          await this.getMemoList()
        } */
        if (this.CONT_DETAIL && this.CONT_DETAIL.attachMfilekey && (!this.CONT_DETAIL.D_ATTATCH_FILE_LIST || this.CONT_DETAIL.D_ATTATCH_FILE_LIST.length === 0)) {
          this.settingFileList()
        }
      } catch (e) {
        console.log(e)
      }
      this.loadingYn = false
      // console.log(this.propParams.memoScrollYn)
    },
    async getContentsDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = this.mContentsKey
      param.targetKey = this.mContentsKey
      var resultList = await this.$getContentsList(param, false, true)
      var detailData = resultList.content[0]
      // eslint-disable-next-line no-debugger
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
    async imgDownload () {
      try {
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', this.selectImgObject.path)
        } else {
          // eslint-disable-next-line no-unused-vars
          var result = await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
        }
        this.confirmText = this.$t('DETAIL_MSG_SAVED')
        this.confirmType = false
        this.backClick()
        this.confirmPopShowYn = true
      } catch (error) {
        // // console.log(error)
      }
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
        this.confirmText = this.$t('COMMON_MSG_DELETE_COMMENT')
        if (this.tempData.parentMemoKey) {
          this.confirmText = this.$t('COMMON_MSG_DELETE_REPLY')
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.CONT_DETAIL.jobkindId === 'ALIM') {
        this.confirmText = this.$t('COMMON_MSG_DELETE_NOTI')
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.CONT_DETAIL.jobkindId === 'BOAR') {
        this.confirmText = this.$t('COMMON_MSG_DELETE_POST')
        this.currentConfirmType = 'boardDEL'
      }
      // console.log(this.tempData);
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    textCopy () {
      this.$showToastPop(this.$t('COMMON_MSG_NO_LOGIN'))
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
        navigator.share({ title: this.$t('COMMON_NAME_APP'), text: this.CONT_DETAIL.title, url: this.CONT_DETAIL.copyTextStr })
      } else this.$showToastPop(this.$t('COMMON_MSG_UNSURPORT'))
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
          url: '/service/tp.d-alim.com:9443/service/tp.deleteContents',
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
    writeMemoScrollMove () {
      this.$refs.contScrollWrap.scrollTo()
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
        this.$showToastPop(this.$t('COMMON_MSG_COMM_NOPERM'))
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
        this.confirmText = this.$t('COMMON_MSG_COMM_NOPERM')
        this.confirmPopShowYn = true
      }
    },
    async deleteMemo (param) {
      // console.log(param)
      var memo = {}
      memo.memoKey = param.memoKey
      // // console.log(param)
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.d-alim.com:9443/service/tp.deleteMemo',
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
    async memoLoadMore () {
      if (this.mCanLoadYn && this.mCheckMemoEndListYn === false) {
        this.mCanLoadYn = false
        try {
          await this.getMemoList(undefined, true)
        } catch (error) {
          console.log(error)
        } finally {
          this.mCanLoadYn = true
        }
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
    endListCheckFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      var dispTotalMemoCount = this.$countingTotalMemo(this.CONT_DETAIL.D_MEMO_LIST)
      if (resultList.totalElements === dispTotalMemoCount) {
        this.mCheckMemoEndListYn = true
        // if (this.mOffsetInt > 0) this.mOffsetInt -= 1
      } else {
        this.mCheckMemoEndListYn = false
        // this.mOffsetInt += 1
      }
    },
    async getMemoList (refreshYn, loadingYn) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      // memo.pageSize = this.pagesize
      // memo.offsetInt = this.mOffsetInt
      // memo.pagesize = 5
      memo.pageSize = this.$countingTotalMemo(this.CONT_DETAIL.memoList) + 5
      memo.offsetInt = 0
      var nonLoadingYn = false
      if (loadingYn) {
        nonLoadingYn = true
      }
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.d-alim.com:9443/service/tp.getMemoList',
        param: memo
      }, nonLoadingYn, true)
      if (result.data.memoList) {
        var tempList = []
        // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
        if (this.CONT_DETAIL.D_MEMO_LIST && !refreshYn) {
          tempList = this.CONT_DETAIL.D_MEMO_LIST
        }
        const newArr = [
          ...tempList,
          ...result.data.memoList
        ]
        // var tempMemo =
        this.endListCheckFunc(result.data)

        var cont = this.CONT_DETAIL
        cont.D_MEMO_LIST = this.replaceArr(newArr)
        // var memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        // cont.memoCount = result.data.totalElements.length === 0 ? 0 : result.data.totalElements
        this.CONT_DETAIL.memoCount = result.data.totalElements
        // this.CONT_DETAIL.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
        // this.offsetInt = result.data.totalElements
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
        url: '/service/tp.d-alim.com:9443/service/tp.getUserDoListPage',
        param: param
      })
    }, */
    async settingFileList () {
      // eslint-disable-next-line no-unused-vars
      var test = this.CONT_DETAIL
      // eslint-disable-next-line no-debugger
      debugger
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
        // var bodyImgFileList = []
        // var addFalseImgList = document.querySelectorAll('#contentsBodyArea .formCard .addFalse')
        // if (addFalseImgList) {
        //   for (var s = 0; s < this.CONT_DETAIL.attachFileList.length; s++) {
        //     var attFile = this.CONT_DETAIL.attachFileList[s]
        //     for (var i = 0; i < addFalseImgList.length; i++) {
        //       if (Number(addFalseImgList[i].attributes.filekey.value) === Number(attFile.fileKey)) {
        //         addFalseImgList[i].setAttribute('mmFilekey', attFile.mmFilekey)
        //         bodyImgFileList.push(attFile)
        //         break
        //       }
        //     }
        //   }
        // }
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
    // async settingUserDo (userDo) {
    //   var D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }, { doType: 'SB', doKey: 0 }]

    //   if (userDo !== undefined && userDo !== null && userDo !== '') {
    //     // eslint-disable-next-line no-array-constructor
    //     /* this.userDoStickerList = new Array() */
    //     for (var i = 0; i < userDo.length; i++) {
    //       if (userDo[i].doType === 'LI') {
    //         D_CONT_USER_DO[1].doKey = userDo[i].doKey
    //       }
    //       if (userDo[i].doType === 'ST') {
    //         D_CONT_USER_DO[0].doKey = userDo[i].doKey
    //       }
    //       if (userDo[i].doType === 'RE') {
    //         D_CONT_USER_DO[2].doKey = true
    //       }
    //       if (userDo[i].doType === 'SB') {
    //         D_CONT_USER_DO[3].doKey = userDo[i].doKey
    //       }
    //       /* if (userDo[i].doType === 'SK') {
    //         this.userDoStickerList.push(userDo[i].sticker)
    //       } */
    //     }
    //   }
    //   /* var cont = this.CONT_DETAIL
    //   cont.D_CONT_USER_DO = D_CONT_USER_DO
    //   this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont]) */
    //   return D_CONT_USER_DO
    // },

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
.boardDetailWrap{height: fit-content; width: 100%; height: 100%; padding-top: 50px; padding-bottom: 60px; overflow: scroll; width: 100%; background: #fff; height: calc(100vh); }
.pushDetailTopArea{min-height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
/* .pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;} */
.pushDetailHeaderTextArea{width: calc(100% - 48px); cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; min-height: 30px;}

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
