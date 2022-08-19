<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <div class="w-100P" style=" height: 100vh; overflow: auto " id="testArea">
    <div style="min-height:600px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <!-- <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/> -->
      <!-- <writePushPageTitle class="pleft-2" titleText="알림작성"  @clickEvnt="clickPageTopBtn" :btnYn ="false" pageType="writePush"/> -->
      <gConfirmPop confirmText='알림을 발송 하시겠습니까?' @no='checkPopYn=false' v-if="checkPopYn" @ok='sendMsg' />
      <gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='발송되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <!-- <div  :style="setColor" class="paperBackground"> -->
          <!-- <div class="fr changePaperBtn font13" style="color:white; border-radius:0.3em; padding: 4px 10px;" @click="clickPageTopBtn('sendPushMsg')" >발송하기</div> -->
        <div class="paperBackground"></div>
          <div class="whitePaper">
            <div class="overFlowYScroll pushInputArea">
              <div class="pageTopArea">
                <!-- {{receiverList}} -->
                <div class="fl" style="margin-bottom: 5px; width:100%;">
                  <div class="w-100P fl" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ccc; margin-bottom: 1.5rem; padding-bottom:0.5rem;">
                    <p class="fontBold commonColor font20 fl">알림작성</p>
                    <img style="width: 1rem;" @click="this.$emit('closeXPop')" class="mleft-1 fr"  src="../../../assets/images/common/popup_close.png"/>
                  </div>
                  <p class="fontBold commonColor font16">수신</p>
                  <div style="min-height: 2rem; padding-top: 3px; float: left;" v-if="!this.replyPopYn">
                    <div class="fl" style="margin-bottom: 10px; margin-left: 5px;">
                      <div class="fl font16" style="border: 1px solid #ccc; width: 50px; text-align: center; border-right: 1px solid #ccc; background-color: #f9f9f9; color: black;" @click="selectRecvType(true)" :class="{receiverClickColor: receiverClickYn === true }" :checked="allRecvYn" id="allTrue" :value="true">전체</div>
                      <div class="fl font16" style="border: 1px solid #ccc; width: 50px; text-align: center; background-color: #f9f9f9; color: black;" @click="selectRecvType(false)" id="allFalse" :value="false" :class="{receiverClickColor: receiverClickYn === false }" :checked="!allRecvYn">선택</div>
                    </div>
                    <!-- <input type="radio" name="receiveAllYn" style="margin-left: 5px; margin-top: 4px;" class="mright-05 fl" @change="selectRecvType(true)" :checked="allRecvYn"  id="allTrue" :value="true">
                    <label class="mright-1 fl" for="allTrue">전체</label>

                    <input class="mright-05 fl" type="radio" style="margin-left: 5px; margin-top: 4px;" name="receiveAllYn" @change="selectRecvType(false)" id="allFalse" :value="false" :checked="!allRecvYn">
                    <label class="mright-1 fl" for="allFalse">선택</label> -->

                  </div>
                  <div v-if="!allRecvYn && !this.replyPopYn" class="fr" @click="openPushReceiverSelect" style="border-radius:10px; background-color:white; display: flex; align-items: center; justify-content: center; padding-left:10px;">
                    <img class="fl" style="line-height:30px; width:15px;" src="../../../assets/images/main/main_subscriber.png" alt="">
                    <p class="fr font16">{{receiverTotalNum}}</p>
                  </div>
                  <!-- <div v-if="!allRecvYn && !this.replyPopYn" class="inputArea recvUserArea font15 fl" style="padding: 0px 10px; width: calc(100%); background: rgb(204 204 204 / 48%);" @click="openPushReceiverSelect">
                      {{receiverText}}
                  </div> -->
                  <div v-else-if="this.replyPopYn" style="width: calc(100% - 100px); background: rgb(204 204 204 / 48%); padding: 0 5px; margin-left: 5px; margin-top: 3px; border-radius: 5px; height: 100%; float: left;" >
                    <span>{{this.creUserName + '님에게 답변'}}</span><!-- {{this.replyData.creUserKey}} -->
                  </div>

                </div>

                <!-- <div class="fl" style="width: 100%; min-height: 25px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;" v-if="!this.replyPopYn"> -->
                <div class="fl" style="width: 100%; min-height: 25px; margin-bottom: 15px;" v-if="!this.replyPopYn">
                  <!-- <div style="width: 120px; height: 100%; float: left; margin-right: 30px;"><input id="creNameInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="showCreNameYn"><label style="margin-left: 5px;" for="creNameInput">작성자 공개</label></div>
                  <div style="width: 85px; height: 100%; float: left;"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="canReplyYn"><label style="margin-left: 5px;" for="replyInput">답변 허용</label></div> -->
                  <div class="fl"><input id="creNameInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="showCreNameYn"><label style="margin-left: 5px;" class="font16 fontBold commonColor" for="creNameInput">작성자공개</label></div>
                  <!-- <div class="fl mleft-05"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="canReplyYn"><label style="margin-left: 5px;" class="font14" for="replyInput">답변 허용</label></div> -->
                  <div class="fl mleft-1"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="canReplyYn"><label style="margin-left: 5px;" class="font16 fontBold commonColor" for="replyInput">덧글허용</label></div>
                  <div class="fl mleft-1" ><input type="checkbox" v-model="titleShowYn" class="fl" style="margin-top: 6px;" name="" id="titleShow"> <label class="font16 fontBold commonColor" style="margin-left: 5px;" for="titleShow">제목추가</label></div>
                </div>

                <div v-else class="fl" style="width: 100%; min-height: 25px; margin-left: 5px; margin-bottom: 15px;">
                  <div style="width: 120px; height: 100%; float: left; margin-right: 30px;">
                    <img src="../../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" />
                    <label class="fl" style="width: calc(100% - 20px); margin-left: 5px;" for="creNameInput">작성자 공개</label>
                  </div>
                  <div style="width: 100px; height: 100%; float: left;">
                    <!-- <div style="width: 13px; height: 13px; background-color: #ccc; float: left; margin-top: 6px;"></div> -->
                    <img src="../../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" />
                    <label class="fl" style=" width: calc(100% - 30px); margin-left: 5px;" for="replyInput">답변 허용</label>
                  </div>
                </div>
          <input type="text" v-if="titleShowYn" id="pushTitleInput" :placeholder="replyPopYn? '답장 제목을 입력해주세요':'알림 제목을 입력해주세요'" class="recvUserArea mbottom-05 inputArea fl" v-model="writePushTitle" style="padding: 0 10px; background-color:white; width: 100%;" name="" >
              </div>

              <div style="width: 100%;float: left; min-height: 50px; position: relative;">
                <gActiveBar modeType="write" :tabList="this.activeTabList" style="width: 100%; position: absolute;" class="mbottom-05 fl mtop-05" @changeTab= "changeTab" />
                <!-- <div class="titleAddArea" >
                  <input type="checkbox" v-model="titleShowYn" class="fl" style="margin-top: 5px; margin-right: 5px;" name="" id="titleShow">
                  <label class="fl" for="titleShow">제목 추가</label>
                </div> -->
              </div>
              <!-- <input type="text" v-if="titleShowYn" id="pushTitleInput" :placeholder="replyPopYn? '답장 제목을 입력해주세요':'알림 제목을 입력해주세요'" class="recvUserArea mbottom-05 inputArea fl" v-model="writePushTitle" style="padding: 0 10px; background-color:white; width: 100%;" name="" > -->
              <div class="pageMsgArea" style="">
                <!-- <p class="">내용</p> -->
                <div id="textMsgBoxPush" class="editableContent" @click="test" v-show="viewTab === 'text'"  contenteditable=true></div>
                <div @click="formEditorShowYn = true" v-show="viewTab === 'complex'" class="msgArea" id="msgBox">클릭하여 내용을 작성해주세요</div>
                <!-- <textArea style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border: 1px solid #ccc; border-radius: 5px;">test</textArea> -->
                <!-- <div class="msgArea" @click="messageAreaClick" style="padding:5px; overflow: auto;">
                  {{msgData}}
                </div> -->
              </div>

            </div>
            <div class="whitePaperEffect" style="position: absolute; bottom:0;"></div>
          </div>
          <gBtnSmall class="mright-05 font20 writePushBtn commonColor whitePurpleBG" style="color:#6768a7; font-weight:bold; " btnTitle='발송하기' @click="clickPageTopBtn()" />

          <!-- <div style="width: 100%;" >
                  <gBtnSmall class="mright-05" btnTitle='발송하기' @click="clickPageTopBtn('sendPushMsg')" />
                  <gBtnSmall class="mright-05" btnTitle='임시저장' @click="clickPageTopBtn('requestTS')" />
          </div> -->
        <!-- </div> -->
      </div>
    </div>
      <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
      <!-- <msgPop @no='popNo' v-if="msgPopYn" @save='popSave' :propMsgData='msgData'/> -->
  </div>
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
  <div v-show="formEditorShowYn" style="position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 100vh; z-index: 99999999999999999999">
    <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="블로그형 작성" />
    <formEditor @changeUploadList="changeUploadList" :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
  </div>
  <!-- <div v-if="receiverPopYn" style="position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 100vh; z-index: 99999"  >
      <selectReceivPop  :selectPopYn='true' :propData='params' @closeXPop='receiverPopYn= false' @sendReceivers='setSelectedList' @openPop='openPop' />
  </div> -->
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
// import msgPop from '../admPages/TalAdm_writePush/TalAdm_msgPopup.vue'
// import writePushPageTitle from '../admPages/TalAdm_writePush/TalAdm_writePushTop.vue'
// import gPageTitle from '../../../components/unit/admUnit/TalAdm_gPageTitle.vue'
import commonConfirmPop from '../../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../../../components/unit/formEditor/Tal_formEditor.vue'
import selectReceivPop from '../../../components/popup/receiver/Tal_selectBookList.vue'
export default {
  props: {
    params: {},
    sendOk: {},
    replyData: {},
  },
  watch: {
    sendOk: function () {
      this.clickPageTopBtn()
    },
  },
  mounted() {
    // var screenSize = document.querySelector('#alimWrap')
    var textArea = document.querySelector('#textMsgBoxPush')
    textArea.addEventListener('focus', () => {
      document.querySelector('#alimWrap').style.height = this.screenInnerHeight
      document.querySelector('#alimWrap').style.width = this.screenInnerWidth
    })
    textArea.addEventListener('blur', () => {
      document.querySelector('#alimWrap').style.height = this.screenInnerHeight
      document.querySelector('#alimWrap').style.width = this.screenInnerWidth
    })
  },
  data () {
    return {
      screenInnerWidth: window.innerWidth,
      screenInnerHeight: window.innerHeight,
      receiverClickYn: true,
      replyPopYn: false,
      showCreNameYn: false,
      canReplyYn: false,
      propFormData: [],
      formEditorShowYn: false,
      // msgPopYn:false,
      testpopYn: true,
      failPopYn: false,
      errorText: '',
      checkPopYn: false,
      msgData: '',
      writePushTitle: '',
      okPopYn: false,
      sendLoadingYn: false,
      myProgress: 55.5,
      closeAutoPopCnt: 5,
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      selectFileList: [],
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
      // The configuration of the editor.
      toolWidth: 500,
      // toolShowYn: false,
      selectedTab: 0,
      colorList: ['#6768A7', '#BFBFDA', '#00000029', '#C8C8C8A3', '#E1E1E1', '#BFBFDA', '#EFEFF6', '#6768A7', '#A9AACD', '#A1A1A1', '#0000002E'],
      selectedC: 0,
      pushDetailPopShowYn: true,
      progressShowYn: false,
      editorType: 'text',
      receiverPopYn: false,
      receiverList: '',
      receiverText: '수신자를 선택해주세요',
      allRecvYn: true,
      selectedReceiverList: [],
      allRecvYnInput: true,
      creUserName: null,
      activeTabList: [{ display: '텍스트형', name: 'text' }, { display: '블로그형', name: 'complex' }],
      viewTab: 'text',
      titleShowYn: false,
      uploadFileList: [],
      receiverTotalNum: 0
      // formCardHeight: 0
    }
  },
  computed: {
    // calcFormCardHeight() {
    //   if (this.formCardHeight) {
    //   } else {
    //     this.formCardHeight = 300
    //   }
    //   return {
    //     '--formCardHeight': this.formCardHeight + 'px'
    //   }
    // },
    // toolBoxWidth () {
    //   return {
    //     '--width': this.toolWidth + 'px'
    //   }
    // },
    setColor () {
      return {
        'background-color': this.colorList[this.selectedC]
      }
    }
  },
  created() {
    this.screenInnerHeight = window.innerHeight
    this.screenInnerWidth = window.innerWidth
    if (this.params.replyPopYn) {
      this.replyPopYn = true
      this.allRecvYn = false
      this.creUserName = this.$changeText(this.params.creUserName)
      this.showCreNameYn = true
      this.canReplyYn = true
      // document.getElementById('replyInput')
    }
  },
  methods: {
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
    encodeUTF8(str){// 특수문자도 포함할 경우  encodeURIComponent(str) 를 사용.     
      return encodeURI(str);
    },
    openPop(param){
      console.log('param');
      console.log(param);
      this.$emit('openPop',param)
    },
    changeTab (tab) {
      this.viewTab = tab
    },
    selectRecvType (allRecvYnInput) {
      this.allRecvYn = allRecvYnInput
      this.receiverClickYn = allRecvYnInput
    },
    // setReceiverText(){
    // this.$changeText(this.params.targetNameMtext)
    // },
    setSelectedList(obj) {

      this.receiverList = obj
      this.list = []
      this.selectedReceiverList = []
      this.receiverTotalNum = 0
      this.receiverText = ''
      console.log(this.receiverList.bookList);
      // var shareItemBookList = []
      // eslint-disable-next-line no-new-object
      var shareItemBookObject = new Object()
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
          this.receiverTotalNum += 1
        }
        /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */

      }
      // var shareItemMemberList = []
      // eslint-disable-next-line no-new-object
      var shareItemMemberObject = new Object()
      if (this.receiverList.memberList) {
        for (let i = 0; i < this.receiverList.memberList.length; i++) {
          var selectedMemberList = this.receiverList.memberList[i]
          shareItemMemberObject = {}
          shareItemMemberObject.accessKind = 'U'
          shareItemMemberObject.accessKey = selectedMemberList.userKey
          /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
          this.receiverText += this.$changeText(selectedMemberList.userDispMtext || selectedMemberList.userNameMtext) + ', '
          this.selectedReceiverList.push(shareItemMemberObject)
          this.receiverTotalNum += 1
        }
      }
      this.receiverText = this.receiverText.slice(0,-2);


    },
    openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.params.targetKey
      param.teamKey = this.params.targetKey
      param.teamNameMtext = this.params.teamNameMtext
      console.log(this.params);


      this.$emit('openPop',param)

      // this.receiverPopYn = true

    },
    setParamInnerHtml (formCard) {
      var innerHtml = ''
      for (var i = 0; i < formCard.length; i++) {
        innerHtml += formCard[i].outerHtml
      }
      this.propFormData = formCard
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.editorType = 'complex'
      this.formEditorShowYn = false
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
    async sendMsg () {
      var paramImgList = []
      if (this.viewTab === 'complex' && this.uploadFileList.length > 0) {
        this.checkPopYn = false
        this.progressShowYn = true
      } else {
        this.sendLoadingYn = true
      }
      // this.sendLoadingYn = true
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var innerHtml =''
      param.bodyHtmlYn = true //기본알림또한 html형식으로 들어감
      var targetMsgDiv = null
      if(this.viewTab === 'complex') {
        param.bodyHtmlYn = true
        if (this.uploadFileList.length > 0) {
          await this.formSubmit()
          setTimeout(() => {
            this.progressShowYn = false
          }, 2000)
          this.sendLoadingYn = true
        }
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
          }
          param.getBodyHtmlYn = true
        }
        targetMsgDiv = document.getElementById('msgBox')
      } else if (this.viewTab === 'text') {
        // param.bodyHtmlYn = false
        document.querySelectorAll('#textMsgBoxPush')[0].contentEditable = false
        //
        targetMsgDiv = document.getElementById('textMsgBoxPush')



      }
      innerHtml = targetMsgDiv.innerHTML
      // innerHtml = this.encodeUTF8(targetMsgDiv.innerHTML)

      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
      param.allRecvYn = this.allRecvYn
      var attachFileList = await this.setAttachFileList()
      if (attachFileList.length > 0) {
        param.attachFileList = attachFileList
      }
      if (this.allRecvYn === true) {

      } else {
        console.log(this.param)
        if(this.replyPopYn) {
        param.parentContentsKey = this.params.targetContentsKey
        param.actorList = [{accessKind: 'U', accessKey: this.params.creUserKey}]
        } else {
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
      param.creTeamKey = this.params.targetKey
      // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
      // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
      param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if(this.writePushTitle !== '') {
        param.title = this.writePushTitle
      } else {
        // param.title = this.encodeUTF8(this.$titleToBody(targetMsgDiv))
        param.title = this.$titleToBody(targetMsgDiv)
      }
      //
      param.jobkindId = 'ALIM'
      param.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)

      param.showCreNameYn = this.showCreNameYn
      param.canReplyYn = this.canReplyYn
      //
      var result = await this.$saveContents(param)
      if (result.result === true) {

        this.sendLoadingYn = false
        if (this.replyPopYn) {
          var param = {}
          param = this.params
          param.targetType = 'chanDetail'


          this.$emit('changePop', param)

        }else{
          this.$emit('closeXPop',true)
        }
      }

    },
    setAttachFileList () {
      var newAttachFileList = new Array()
      var setObj = new Object()
      for (var i = 0; i < this.uploadFileList.length; i++) {
        setObj = new Object()
        setObj.addYn = true
        setObj.attachYn = false
        setObj.fileKey = this.uploadFileList[i].fileKey
        setObj.fileName = (this.uploadFileList[i])[0].file.name
        newAttachFileList.push(setObj)
      }
      return newAttachFileList
    },
    messageAreaClick () {
      this.msgPopYn = true
    },
    popNo () {
      this.msgPopYn = false
    },
    popSave (obj) {
      this.msgData = obj.admMsg
      this.msgPopYn = false
    },
    async clickPageTopBtn () {
      var title = this.writePushTitle
      if (this.titleShowYn) {
        if (title !== undefined && title !== null && title !== '') {
        } else {
          this.errorText = '제목을 입력해주세요'
          this.failPopYn = true
          return
        }
      }

      var msgData = ''
      if(this.viewTab === 'complex') {
        msgData = document.getElementById('msgBox').innerHTML
      } else if (this.viewTab === 'text') {
        msgData = document.getElementById('textMsgBoxPush').innerHTML
      }
      if (msgData !== undefined && msgData !== null && msgData !== '' && msgData !== '클릭하여 내용을 작성해주세요') {
      } else {
        this.errorText = '알림 내용을 입력해주세요'
        this.failPopYn = true
        return
      }

      this.checkPopYn = true
    },
    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },
    selectedColor (index) {
      this.selectedC = index
    },
    openPushDetail () {
      this.pushDetailPopShowYn = true
    },
    closeDetailPop () {
      this.pushDetailPopShowYn = false
      // this.toolShowYn = false
      // this.toolWidth = 0
    },
    changeOption (tab) {
      this.selectedTab = tab
    },
    deleteFile (idx) {
      this.selectFileList.splice(idx, 1)
    },
    openSelectFilePop () {
      this.$refs.selectFile.click()
    },
    async formSubmit () {
      if (this.uploadFileList.length > 0) {
        var testtest = this.uploadFileList
        console.log(this.uploadFileList)
        var iList = document.querySelectorAll(".msgArea .formCard .addTrue")
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
            .post('fileServer/tp.uploadFile', form/* ,
              {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.progressBarList[i].percentage = Math.round(percentage)
                }
              } */,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(res => {
              console.log(res)
              if(res.data.length > 0) {
                var path =res.data[0].pathMtext
                this.uploadFileList[i].previewImgUrl = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
                this.uploadFileList[i].completeYn = true
              }
            })
            .catch(error => {
              this.response = error
              this.isUploading = false
            })
        }
        console.log(this.uploadFileList)
        for (var i = 0; i < this.uploadFileList.length; i++) {
          iList[i].src = this.uploadFileList[i].previewImgUrl
          iList[i].setAttribute('fileKey', this.uploadFileList[i].fileKey)
          iList[i].setAttribute('fileSizeKb', this.uploadFileList[i].fileSizeKb)
          iList[i].classList.remove("addTrue")
          iList[i].classList.add('addFalse')
        }
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    },
  },

  components: {
    commonConfirmPop,
    formEditor,
    selectReceivPop
    // msgPop,
    // writePushPageTitle,
    // pushPop
  }
}
</script>
<style scoped>

.receiverClickColor {
  background-color: #6768A7 !important;
  color: white !important;
}
.toggleInputWrap {
  width: calc(100% - 150px); float: left; display: flex; justify-content: flex-end;
}
.toggleBtn{width: 50%; height: 100%;background-color: #fff; float: left; line-height: 25px;}

.whitePaper {
      position: absolute;
      left: 50%;
      top: 47%;
      transform: translate(-50%, -50%);
      /* width: 100%; */
      width: 90%;
      margin: 0 auto;
      /* margin-top: 1rem; */
      border-radius: 0.8rem;
      /* height: calc(100% - 60px); */
      min-height: 500px;
      /* height: 90%; */
      height: 85%;

      /* overflow: auto; */
      /* background-color: #fafafa; */
      background-color: #f9f9f9;
      color: #363c5f;
      padding: 1.5rem;
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%  , 0 100%);
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
  /* .whitePaper:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 50px solid #7373734f;
  border-right: 50px solid #F9F9F9;
  width: 0;
} */

/* add by_jeong */
/* .pageMsgArea{ height: 100px; height: calc(100% - 10rem); width: 100%; float: left;} */
.pageMsgArea{ min-height: 240px; float: left; width: 100%; height: 60%; }
.pageMsgArea p{font-size: 16px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ padding:7px; overflow: hidden scroll; margin-bottom: 60px; width: 100%; min-height: 240px; height: 90%;; border-radius: 5px; background: #fff; border:1px solid #BFBFDA; font-size: 16px; text-align: left;}

.pageTopArea{
  width: 100%; min-height: 3.5rem;
}
.pageTopArea >div{
  width: 100%; min-height: 2rem;
}
.pageTopArea p{ float: left; line-height: 30px; margin-left: 5px; margin-right: 10px; }
/* .pageTopArea p{width: 60px; font-size: 15px; color: #3A3A3A; float: left; line-height: 30px;} */
.pageTopArea input{font-size: 16px;}
.pageTopArea .inputArea{width: calc(100% - 60px); box-sizing: border-box;  overflow: hidden;}

#toolBox{margin-top: -1rem; float: left; height: 100%; background: #FFFFFF; display: flex;  width: var(--width); height: 100%;  border-left: none;}
#toolBox >.toolContentsArea {height: calc(100% - 6rem); width: calc(100% - 100px)}
.toolContentsArea {position: relative; padding: 0.5rem 1rem;  padding-right: 1.5rem;}

.colorBox{float: left; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;}
.selectedColor{border: 2px solid #000}

.editorOption{display: flex; flex-direction: column; border-right: 1px solid #BFBFDA; width: 100px;}
.editorOption > div {height: 50px; text-align: center; padding: 0.5rem; cursor: pointer;}
.activeColor{background: #EFEFF6;}
.activeColor p{color: #6768A7!important;}
.editorOption p{color: #6768A7; color: #BFBFDA; font-size: 11px;}

.writeArea{padding: 2rem 0; width: 100%; float: left;min-height: 650px; height: 100%; margin-top: 0rem; float: left; background:#0000005e; padding-top: 0; overflow: hidden; position: relative;}
/* .writeArea{padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;} */
/* .paperBackground{width: 100%; height: calc(100% - 10rem);min-height: 600px; position: relative; margin: 0 auto; padding: calc(3rem - 2px) 2rem;  border-radius: 10px 10px 0 0;} */
.paperBackground{width: 100%; min-height: 500px; height:100%; position: absolute; top:0; left:0 }
.changePaperBtn{border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;}
.latestPushBtn{float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;}
.pushInputArea{height: 100%; width: 100%;}

.pushInputArea .recvUserArea{border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; line-height: 30px; float: left; position: relative; }
.orgaIcon{position: absolute; top: 0.3rem; right: 0.5rem; cursor: pointer;}

.pushBodyInput{resize: none; border-radius: 5px; border: 1px solid #BFBFDA; width: 100%; height: calc(100% - 7rem); padding: 1rem; box-sizing: border-box; color: #010101; font-size: 16px;}
.attatchFileBtn{cursor: pointer; width: 80px; height: 80px;margin-top: 0.5rem;border-radius: 5px; background: #A9AACD; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.attatchFileBtn p{color: #FFFFFF; font-size: 10px; margin-top: 0.5rem;}

.toolBtnArea{justify-content: flex-end; position: absolute; right: 0; top: 0rem}
.toolLeftTab{color: #6768A7; font-weight: bold; font-size: 16px;margin-bottom: 1rem;}

.toolSearchBox{border: 1px solid #BFBFDA!important; border-radius: 5px!important;}
.toolPushCard{box-shadow: none !important; border: 1px solid #E1E1E1 !important;}
.selectPaperWrap{width: 100%; height: 100%; float: left; margin-top: 1rem;}

.formText {padding: 0;}
.editableContent{ padding: 7px;  overflow: hidden scroll; width: 100%; min-height: 240px; height:90%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; }
.msgArea span {padding: 0;}
.titleAddArea{
  width: 100px; margin-left: 5px; height: 25px; margin-left: 5px; float: right; right: -20px; position: absolute; margin-top: 7px;
}
.writePushBtn{
position: absolute; left:50%; bottom:0.5rem; transform: translateX(-50%); width: 30% !important; min-width: 100px !important; max-width: 250px; height: 6% !important; font-size: 16px; display: flex; justify-content: center; align-items: center;
}
@media screen and (max-width:330px) {
  .titleAddArea{
    top: -1.5rem;
  }

}
</style>
