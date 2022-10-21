<template>
  <div style="position: absolute; top:0; left:0; background:#00000050" class="fl w-100P h-100P"></div>

  <div class="whitePaper">
      <div class="w-100P fl" style="padding: 1rem 1.5rem 0 1.5rem; display: flex; flex-direction: column; align-items: center;">
        <div class="fl w-100P" style="display: flex; align-items: center; justify-content: space-between;">
          <p class="fontBold commonColor font20 fl">알림 {{requestPushYn === false ? '작성' : '신청' }}</p>
          <img style="width: 1rem;" @click="closeXPop" class="mleft-1 fr cursorP"  src="../../assets/images/common/popup_close.png"/>
        </div>
        <div class="fl mtop-05" style="width:95%; border-bottom: 2px solid #5F61BD;"></div>
      </div>
      <div class="fl w-100P h-100P" style="overflow: auto">
        <div class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">수신</p>
          <div class="fl" style="min-height: 2rem; float: left; width:80%;" >
            <checkBtnArea class="mleft-05" title='전체' :selectedYn='allRecvYn' @click="allRecvYn = true" />
            <checkBtnArea class="mleft-05" title='선택' :selectedYn='!allRecvYn' @click="allRecvYn = false" />
            <div v-if="!allRecvYn" class="fl w-100P textLeft mleft-05 mtop-05" @click="openPushReceiverSelect" style="border:1px solid #ccc; border-radius:8px; min-height: 30px; background: white; padding-left: 5px; display: flex; justify-content: space-between; align-items: center;">
              <div v-if="this.receiverList.list && this.receiverList.list.length > 0" class="fl w-100P">
                <div v-for="(value, index) in this.receiverList.list" :key="index" class="fl mright-1">
                  <img v-if="value.type === 'BOOK'" class="img-w20 fl" src="../../assets/images/channel/channer_addressBook.svg" alt="">
                  <img v-if="value.type === 'USER'" class="img-w20 fl" src="../../assets/images/footer/icon_people.svg" alt="">
                  <p class="fl font16 mleft-05">{{value.name}}</p>
                </div>
              </div>
              <p class='font12 fl' style="color:#aaa; " v-else >알림을 보낼 대상을 선택해주세요.</p>
              <!-- 이미지 임시!!! -->
              <img class="fr img-w17 mright-05"  src="../../assets/images/push/plusIcon.svg" />
            </div>
          </div>
        </div>

        <div class="fl w-100P mtop-1 " style="display: flex; align-items: center; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">옵션</p>
          <div style="min-height: 2rem; float: left;">
            <checkBtnArea class="mleft-05" title='작성자공개' :selectedYn='showCreNameYn' @click="showCreNameYn = !showCreNameYn" />
            <checkBtnArea class="mleft-05" title='댓글허용' :selectedYn='canReplyYn' @click="canReplyYn = !canReplyYn" />
            <checkBtnArea class="mleft-05" title='제목추가' :selectedYn='titleShowYn' @click="titleShowYn = !titleShowYn" />
          </div>
        </div>

        <div v-if="titleShowYn" class="fl w-100P mtop-1 " style="display: flex; align-items: center; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">제목</p>
          <input class="fl mleft-05" style="width:80%; min-height:30px; background-color:white !important;" type="text" v-if="titleShowYn" id="pushTitleInput" placeholder="알림 제목을 입력해주세요" v-model="writePushTitle" >
        </div>

        <div class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">파일</p>
          <div style="min-height: 30px; " class="fl">
            <attachFileList  @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
          </div>
        </div>

        <div id="pageMsgAreaWrap" class="pageMsgArea mtop-1 w-100P fl" style="height: 100%;">
          <formEditor style="margin-top:1rem; margin-bottom: 1rem;" class="fl" ref="complexEditor" @changeUploadList="changeUploadList" :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
          <div @click="formEditorShowYn = true" v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>
        </div>
      </div>
  </div>
  <gBtnSmall class="font20 " style="position: absolute; bottom:8%; left:50%; transform: translateX(-50%); border: 2px solid #FFFFFF;width: 100px; line-height: 30px;" :style="viewTab === 'complex' ? 'bottom: 7.5%;' : ''"  :btnTitle="requestPushYn === false ? '발송하기' : '신청하기'" @click="clickPageTopBtn()" />

  <commonConfirmPop v-if="failPopYn" @no="failPopYn = false" confirmType="timeout" :confirmText="errorText" />
  <gConfirmPop :confirmText="'알림을 ' + (requestPushYn === false ? '발송' : '신청') + ' 하시겠습니까?'" v-if="checkPopYn" @ok='sendMsg(), checkPopYn=false' @no='confirmNo()' />
  <gConfirmPop @no="closeXPop()" confirmText='신청되었습니다.' confirmType='timeout' v-if="okPopYn" />
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
</template>

<script>
import checkBtnArea from './writeContentUnit/D_commonCheckBtn.vue'
import commonConfirmPop from './confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../unit/formEditor/Tal_formEditor.vue'
import attachFileList from '../unit/formEditor/Tal_attachFile.vue'
export default {
  components: {
    attachFileList,
    formEditor,
    checkBtnArea,
    commonConfirmPop
  },
  data () {
    return {
      failPopYn: false,
      errorText: '',
      confirmText: '',
      progressShowYn: false,
      uploadFileList: [],
      okPopYn: false,
      allRecvYn: true,
      showCreNameYn: true, // 작성자 명 공개
      canReplyYn: true, // 댓글 허용
      titleShowYn: false, // 제목 공개 허용
      writePushTitle: '',
      receiverList: { memberList: [], bookList: [] },
      bodyString: '',
      requestPushYn: false,
      addFalseList: [],
      propFormData: [],
      editorType: 'text',
      complexOkYn: false,
      selectedReceiverList: [],
      receiverText: '',
      checkPopYn: false
    }
  },
  props: {
    params: {}
  },
  created () {
    this.screenInnerHeight = window.innerHeight
    this.screenInnerWidth = window.innerWidth
    // console.log('// console.log(this.params)// console.log(this.params)// console.log(this.params)// console.log(this.params)')
    console.log(this.params)
    if (this.params.bodyFullStr) {
      if (this.params.UseAnOtherYn) {
        // 게시글을 -> 알림 // 알림 -> 게시글을 할 땐 decode가 필요없기에 구분
        this.bodyString = this.params.bodyFullStr
        if (this.params.titleStr) {
          this.titleShowYn = true
          this.writePushTitle = this.params.titleStr
        }
      } else {
        // 추후 수정이 있을 때
      }
    }
  },
  mounted () {
    document.querySelector('#pageMsgAreaWrap').addEventListener('paste', (e) => {
      var items = (e.clipboardData || e.originalEvent.clipboardData).items

      for (const i of items) {
        var item = i
        if (item.type.indexOf('image') !== -1) {
          /* this.editorType = 'complex' */
          var file = item.getAsFile()
          this.handleImageUpload(file)
          // console.log(file);
          // uploadFile(file);
        } else {}
      }
      e.preventDefault()
      var textData = (e.originalEvent || e).clipboardData.getData('Text')
      document.execCommand('insertHTML', false, textData)
    })

    // var screenSize = document.querySelector('#alimWrap')
    var textArea = document.querySelector('#textMsgBoxPush')
    if (textArea) {
      textArea.addEventListener('focus', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
      textArea.addEventListener('blur', () => {
        document.querySelector('#alimWrap').style.height = this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
    }
    if (this.answerRequsetYn) {
      this.$refs.textAreaRequestTitle.style.backgroundColor = '#00000010'
      this.$refs.textAreaRequestTitle.readOnly = true
    }
    if (this.bodyString !== undefined && this.bodyString !== null && this.bodyString !== '') this.settingAlim()
  },
  methods: {
    setSelectedList (obj) {
      var mList = []
      var bList = []
      var myMList = []
      var myBList = []
      console.log('2!@#!@#!@@@@@2222')
      console.log(obj)
      if (this.receiverList.memberList !== undefined && this.receiverList.memberList !== null && this.receiverList.memberList.length > 0) {
        myMList = this.receiverList.memberList
      }
      if (this.receiverList.bookList !== undefined && this.receiverList.bookList !== null && this.receiverList.bookList.length > 0) {
        myBList = this.receiverList.bookList
      }
      console.log('-----------------------------------')
      console.log(this.receiverList)
      this.receiverList.list = []
      for (let i = 0; i < this.receiverList.memberList.length; i++) {
        var temp = {}
        temp.type = 'USER'
        temp.name = this.$changeText(this.receiverList.memberList[i].userDispMtext)
        this.receiverList.list.push(temp)
      }
      for (let i = 0; i < this.receiverList.bookList.length; i++) {
        temp = {}
        temp.type = 'BOOK'
        temp.name = this.$changeText(this.receiverList.bookList[i].cabinetNameMtext)
        this.receiverList.list.push(temp)
      }

      this.list = []
      this.selectedReceiverList = []
      this.receiverTotalNum = myMList.length + mList.length + myBList.length + bList.length
      // this.receiverText = ''
    },
    setParamInnerHtml (formCard) {
      var innerHtml = ''
      for (var i = 0; i < formCard.length; i++) {
        innerHtml += formCard[i].outerHtml
      }

      this.propFormData = []
      this.propFormData.push(...formCard)
      // this.propFormData = formCard
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.editorType = 'complex'
      this.complexOkYn = true
      this.clickPageTopBtn()
      // this.formEditorShowYn = false
    },
    async clickPageTopBtn () {
      // 취소를 누르거나 유효성 검사 (이 함수)에 통과하지 못하면 값을 다시 가져와야함. 그러므로 --> this.complexOkYn = false
      if (this.complexOkYn === false) {
        this.complexOkYn = true
        await this.$refs.complexEditor.setParamInnerHtml()
      } else {
        var title = this.writePushTitle
        title = title.trim()
        if (this.titleShowYn) {
          if (title !== undefined && title !== null && title !== '') {
          } else {
            this.errorText = '제목을 입력해주세요'
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
        }

        if (this.requestPushYn === true) {
          if (this.requestTitle.replace(' ', '') === '') {
            this.errorText = '알림을 신청하는 사유를 입력해주세요'
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
        }

        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        msgData = msgData.trim()
        if (msgData !== undefined && msgData !== null && msgData !== '' && (msgData !== '클릭하여 내용을 작성해주세요' || this.uploadFileList.length > 0)) {
        } else {
          this.errorText = '알림 내용을 입력해주세요'
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        this.checkPopYn = true
      }
    },
    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },
    changeUploadList (upList) {
      if (this.uploadFileList.length > 0) {
        var temp = this.uploadFileList
        this.uploadFileList = []
        this.uploadFileList = [
          ...temp,
          upList
        ]
      } else {
        this.uploadFileList.push(upList)
      }
    },
    encodeUTF8 (str) { //  특수문자도 포함할 경우 encodeURIComponent(str)를 사용.
      return encodeURI(str)
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    confirmNo () {
      this.checkPopYn = false
      this.complexOkYn = false
      // console.log(this.propFormData)
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.editorType = 'text'
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    settingAlim () {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
            jsonObj.type = 'text'
            imgYn = false
            break
          } else if (formC[i].classList[c] === 'formLine') {
            jsonObj.type = 'line'
            imgYn = false
          } else if (formC[i].classList[c] === 'formDot') {
            jsonObj.type = 'dot'
            imgYn = false
          } else if (formC[i].classList[c] === 'formBlock') {
            jsonObj.type = 'block'
            imgYn = false
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src
          jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      this.propFormData = newArr
      this.$refs.complexEditor.setFormCard(this.propFormData)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      // this.viewTab = 'complex'
      this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      // console.log('this.propData.parentAttachTrueFileList')
      // // console.log(this.propData.parentAttachTrueFileList)
      // this.formEditorShowYn = true
    },
    closeXPop (reloadYn) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    async sendMsg () {
      this.checkPopYn = false
      this.sendLoadingYn = true

      try {
        var param = {}
        var innerHtml = ''
        param.bodyHtmlYn = true // 기본알림또한 html형식으로 들어감
        var targetMsgDiv = null
        if (this.uploadFileList.length > 0) {
          this.progressShowYn = true
          await this.formSubmit()
          setTimeout(() => {
            this.progressShowYn = false
          }, 2000)
        } else {
        }
        // this.$refs.complexEditor.setParamInnerHtml()
        param.bodyHtmlYn = true
        /* 용량 관리 위해: 나중에 주석 풀어야 함_수민 */
        /* var imgSrc = null
        var imgList = document.querySelectorAll('#msgBox img')
        for (var img=0; img < imgList.length; img ++) {
            imgSrc = imgList[img].src
            paramImgList.push(imgSrc)
            imgList[img].src = 'imgTagSrc' + img
            }
            param.imgList = imgList
            */
        var formList = document.querySelectorAll('#msgBox .formCard')
        if (formList) {
          for (var f = 0; f < formList.length; f++) {
            formList[f].contentEditable = false
            // formlist중 Text component만 찾아서 http로 시작하는 url에 a태그 넣어주기
            if (formList[f].id === 'formEditText') {
              innerHtml = formList[f].innerHTML
              formList[f].innerHTML = this.$findUrlChangeAtag(innerHtml)
            }
            // if (formList[f].id)
          }
          param.getBodyHtmlYn = true
        }
        targetMsgDiv = document.getElementById('msgBox')
        innerHtml = targetMsgDiv.innerHTML

        param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
        param.allRecvYn = this.allRecvYn
        var attachFileList = await this.setAttachFileList()
        if (attachFileList.length > 0) {
          param.attachFileList = attachFileList
        }
        if (this.allRecvYn === true) {

        } else {
          // console.log(this.param)
          if (this.replyPopYn) {
            param.parentContentsKey = this.params.targetContentsKey
            param.actorList = [{ accessKind: 'U', accessKey: this.params.creUserKey }]
          } else {
            await this.settingRecvList()
            if (this.selectedReceiverList.length > 0) {
              param.actorList = this.selectedReceiverList
            } else {
              this.errorText = '수신자를 선택해주세요'
              this.failPopYn = true
              return
            }
          }
        }
        param.teamName = this.$changeText(this.params.targetNameMtext)
        param.creTeamKey = this.params.targetKey || this.creTeamKey
        if (this.params.currentTeamKey || this.params.creTeamKey) {
          param.creTeamKey = this.params.currentTeamKey || this.params.creTeamKey
        }

        param.creUserKey = this.GE_USER.userKey
        if (this.writePushTitle !== '') {
          param.title = this.writePushTitle
        } else {
          // param.title = this.encodeUTF8(this.$titleToBody(targetMsgDiv))
          param.title = this.$titleToBody(targetMsgDiv)
        }
        //
        param.jobkindId = 'ALIM'
        param.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)

        param.showCreNameYn = this.showCreNameYn
        param.canReplyYn = this.canReplyYn
        var result
        if (this.requestPushYn === true) {
          param.requestTitle = this.requestTitle
          this.okPopYn = true
          return
        }
        result = await this.$saveContents(param)
        param = {}
        param.contentsKey = result.contents.contentsKey
        param.jobkindId = result.contents.jobkindId
        var resultList = await this.$getContentsList(param)
        var detailData = resultList.content[0]
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
        this.$showToastPop('발송되었습니다.')
      } catch (error) {
        this.$showToastPop('발송하지 못했습니다.')
        console.error(error)
      } finally {
        this.sendLoadingYn = false
        this.closeXPop(true)
      }
    },
    settingRecvList () {
      var shareItemBookObject = {}
      if (this.receiverList.bookList) {
        for (let i = 0; i < this.receiverList.bookList.length; i++) {
          var selectedBookList = this.receiverList.bookList[i]

          shareItemBookObject = {}
          shareItemBookObject.accessKind = 'C'
          shareItemBookObject.accessKey = selectedBookList.cabinetKey

          /* this.list.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += ', ' + selectedBookList.cabinetNameMtext
          // this.list.push(shareItemBookObject)
          this.receiverText += selectedBookList.cabinetNameMtext + ', '
          this.selectedReceiverList.push(shareItemBookObject)
        }
        /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
      }
      // var shareItemMemberList = []
      // eslint-disable-next-line no-new-object
      var shareItemMemberObject = {}
      if (this.receiverList.memberList) {
        for (let i = 0; i < this.receiverList.memberList.length; i++) {
          var selectedMemberList = this.receiverList.memberList[i]
          shareItemMemberObject = {}
          shareItemMemberObject.accessKind = 'U'
          shareItemMemberObject.accessKey = selectedMemberList.userKey
          /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
          this.receiverText += this.$changeText(selectedMemberList.userDispMtext || selectedMemberList.userNameMtext) + ', '
          this.selectedReceiverList.push(shareItemMemberObject)
        }
      }
    },
    setAttachFileList () {
      var newAttachFileList = []
      var setObj = {}
      for (var i = 0; i < this.uploadFileList.length; i++) {
        setObj = {}
        setObj.addYn = true
        if (this.uploadFileList[i].attachYn) {
          setObj.attachYn = true
        } else {
          setObj.attachYn = false
        }
        setObj.fileKey = this.uploadFileList[i].fileKey
        setObj.fileName = (this.uploadFileList[i])[0].file.name
        newAttachFileList.push(setObj)
      }
      return newAttachFileList
    },
    openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.params.targetKey
      param.teamKey = this.params.targetKey
      param.teamNameMtext = this.params.teamNameMtext

      var selectedList = this.receiverList
      param.pSelectedList = selectedList

      this.$emit('openPop', param)
      // this.receiverPopYn = true
    },
    delRecvList (type, index) {
      if (type === 'm') {
        this.receiverList.memberList.splice(index, 1)
      } else if (type === 'b') {
        this.receiverList.bookList.splice(index, 1)
      }
      this.receiverTotalNum -= 1
    },
    async handleImageUpload (file) {
      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      // 0 번째 파일을 가져 온다.
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
      ) {
        console.log('originalFile instanceof Blob', file instanceof Blob) // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`)

        try {
          // eslint-disable-next-line no-undef
          var compressedFile = await this.$imageCompression(file, options)
          console.log(compressedFile)
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
          var src = null
          if (compressedFile instanceof Blob) {
            src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
            const decodImg = atob(src.split(',')[1])
            const array = []
            for (let i = 0; i < decodImg.length; i++) {
              array.push(decodImg.charCodeAt(i))
            }
            const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
            var newFile = new File([Bfile], compressedFile.name)
          } else {
            src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
          }

          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
          console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB

          this.$refs.complexEditor.addFormCard('image', src, true)
          this.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: src, addYn: true, file: newFile }], originalType: 'image' })
        } catch (error) {
          console.log(error)
        }
      }
    },

    async previewFile (file) {
      let fileExt = file.name.substring(
        file.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
            thisthis.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: result.path, addYn: true, file: result.file }], originalType: 'image' })
            // this.$emit('updateImgForm', this.previewImgUrl)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
          }
          image.onerror = function () {

          }
          image.src = e.target.result
          // this.previewImgUrl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async formSubmit () {
      if (this.uploadFileList.length > 0) {
        var iList = document.querySelectorAll('.formCard .addTrue')
        // Form 필드 생성
        // if (!this.selectFileList.length) return
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].previewImgUrl = Base64.decode(thisthis.uploadFileList[i].previewImgUrl.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (thisthis.uploadFileList[i])[0].file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://m.passtory.net:7443/fileServer/tp.uploadFile', form,
              /* {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              }, */
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(res => {
              // console.log(res)
              if (res.data.length > 0) {
                if ((this.uploadFileList[i])[0].attachYn === true) {
                  this.uploadFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.uploadFileList[i].successSave = true
                this.uploadFileList[i].filePath = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        }
        // console.log(this.uploadFileList)
        iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                // console.log('여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                // console.log(uploadFile[0].previewImgUrl)
                // console.log(iList[il].src)
                // console.log('여기!!!!!!!!!끝!!!!!!!!!!!!!!!!!!!!!!')
                if (!uploadFile[0].attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  if (iList[il].src === uploadFile[0].previewImgUrl) {
                    iList[il].src = uploadFile.filePath
                    // eslint-disable-next-line no-unused-vars
                    iList[il].setAttribute('fileKey', uploadFile.fileKey)
                    iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                    iList[il].classList.remove('addTrue')
                    iList[il].classList.add('addFalse')
                    break
                  } else {

                  }
                }
              }
            } else {
              this.uploadFileList.splice(s, 1)
            }
          }
        }
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    },
    delAttachFile (dFile) {
      if (dFile.addYn) {
        for (var d = 0; d < this.uploadFileList.length; d++) {
          if (this.uploadFileList[d].attachYn === true && this.uploadFileList[d].attachKey === dFile[0].attachKey) {
            this.uploadFileList.splice(d, 1)
          }
        }
      } else {
        this.delAddFalseFileList.push(dFile)
      }
    },
    setSelectedAttachFileList (sFile) {
      if (sFile[0].addYn === true) {
        this.uploadFileList.push(sFile)
      }
      // console.log(this.uploadFileList)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    setScrollWidth () {
      var w = 150 * this.receiverTotalNum
      return 'width: ' + w + 'px'
    },
    setColor () {
      return {
        'background-color': this.colorList[this.selectedC]
      }
    }
  }
}
</script>

<style>
.whitePaper {
      position: absolute;
      /* left: 5%; */
      /* bottom: 0; */
      top: 5%;
      left: 5%;
      /* transform: translate(-50%, -50%); */
      width: 90%;

      /* border-radius: 0.8rem 0.8rem 0 0; */
      border-radius: 0.8rem;
      /* height: 90%; */
      height: 80%;

      /* background-color: #f9f9f9; */
      background-color: #f5f5f5;
      color: #363c5f;
      /* padding: 1.5rem; */
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      /* clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%  , 0 100%); */
  }

  .whitePaperEffect {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
</style>
