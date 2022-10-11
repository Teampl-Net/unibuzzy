<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <div class="w-100P" style=" height: 100vh; overflow: auto " id="testArea">
    <div style="min-height:600px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <!-- <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/> -->
      <!-- <writePushPageTitle class="pleft-2" titleText="알림작성"  @clickEvnt="clickPageTopBtn" :btnYn ="false" pageType="writePush"/> -->
      <gConfirmPop :confirmText="'알림을 ' + (requestPushYn === false ? '발송' : '신청') + ' 하시겠습니까?'" @no='confirmNo(),checkPopYn=false' v-if="checkPopYn" @ok='sendMsg(), checkPopYn=false' />
      <gConfirmPop @no="closeXPop" confirmText='신청되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <div class="paperBackground"></div>
          <div class="whitePaper" :style="viewTab === 'complex' ? 'height: 80%' : ''">
            <div class="overFlowYScroll pushInputArea">
              <div class="w-100P fl" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ccc; padding-bottom:0.5rem;">
                <p class="fontBold commonColor font20 fl">알림 {{requestPushYn === false ? '작성' : '신청' }}</p>
                <img style="width: 1rem;" @click="closeXPop" class="mleft-1 fr cursorP"  src="../../assets/images/common/popup_close.png"/>
              </div>
              <div style="width: 100%; height: calc(100% - 30px); padding: 1.5rem 0 !important; float: left; overflow: hidden auto;" :style="viewTab === 'complex' ? 'height: calc(100% - 50px)' : ''">
                <div v-if="requestPushYn === true" class="fl w-100P">
                  <p class="fontBold commonColor font16">사유</p>
                  <textarea ref="textAreaRequestTitle" type="text" style="min-height: 50px; background-color:white !important; resize: none; border: 1px solid #ccc; border-radius: 5px; outline: none;" v-model="requestTitle" class="w-100P mtop-03 commmonBlack"/>
                </div>
                <div v-if="requestPushYn === true && answerRequsetYn === true" class="fl w-100P ">
                  <p class="fontBold commonColor font16 fl w-100P">응답메시지</p>
                  <div v-if="requestAgreeYn === false" class="fl w-100P mtop-03" style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-bottom: 0.5rem;">
                    <textarea  type="text" v-model="answerRequestMsg" class="fl commmonBlack" style="width:calc(100% - 70px); min-height: 70px; background-color:white !important; resize: none; border: 1px solid #ccc; border-radius: 5px; outline: none;"/>
                    <div class="fr" style="width: 70px; height: 70px; display: flex; flex-direction: column; justify-content: space-around; align-items: center;">
                      <gBtnSmall btnTitle="승인" class="fl" @click="requestPushAgreeClick" />
                      <gBtnSmall btnTitle="거절" class="fl" style="background-color: #f9f9f9 !important; border: 1px solid #ccc;" @click="requestPushDisagreeClick" btnThema="light" />
                    </div>
                  </div>
                <div v-else class="w-100P fl mtop-05 mbottom-05" style="padding: 10px 0; border:1px solid #ccc; border-radius: 5px; display: flex; align-items: center; justify-content: space-evenly; ">
                  <p class="fl commonColor font14 textCenter fontBold" style=""> 승인되었습니다. </p>
                  <gBtnSmall btnTitle="거절" class="fl" @click="requestPushDisagreeClick" />
                </div>

                </div>

                <div class="pageTopArea fl">
                  <!-- {{receiverList}} -->
                  <div v-if="requestPushYn === false || answerRequsetYn === true" class="fl" style="margin-bottom: 5px; width:100%;">
                    <p class="fontBold commonColor font16">수신</p>
                    <div style="min-height: 2rem; float: left;" v-if="!this.replyPopYn">
                      <div class="fl" style="border: 1px solid #ccc; margin-bottom: 10px; margin-left: 5px; overflow: hidden; border-radius: 5px;">
                        <div class="fl font16" style=" width: 50%; min-width: 50px; height: 100%; text-align: center; border-right: 1px solid #ccc; background-color: #f9f9f9; color: black;" @click="selectRecvType(true)" :class="{receiverClickColor: receiverClickYn === true }" :checked="allRecvYn" id="allTrue" :value="true">전체</div>
                        <div class="fl font16" style=" width: 50%; min-width: 50px; height: 100%; text-align: center; background-color: #f9f9f9; color: black;" @click="selectRecvType(false)" id="allFalse" :value="false" :class="{receiverClickColor: receiverClickYn === false }" :checked="!allRecvYn">선택</div>
                      </div>
                      <!-- <input type="radio" name="receiveAllYn" style="margin-left: 5px; margin-top: 4px;" class="mright-05 fl" @change="selectRecvType(true)" :checked="allRecvYn"  id="allTrue" :value="true">
                      <label class="mright-1 fl" for="allTrue">전체</label>
                      <input class="mright-05 fl" type="radio" style="margin-left: 5px; margin-top: 4px;" name="receiveAllYn" @change="selectRecvType(false)" id="allFalse" :value="false" :checked="!allRecvYn">
                      <label class="mright-1 fl" for="allFalse">선택</label> -->

                    </div>
                    <div v-if="!allRecvYn && !this.replyPopYn" class="fr" @click="openPushReceiverSelect" style="border-radius:10px; background-color:white; display: flex; align-items: center; justify-content: center; padding-left:10px;">
                      <img class="fl" style="line-height:30px; width:15px;" src="../../assets/images/main/main_subscriber.png" alt="">
                      <p class="fr font16">{{receiverTotalNum}}</p>
                    </div>
                    <!-- <div v-if="!allRecvYn && !this.replyPopYn" class="inputArea recvUserArea font15 fl" style="padding: 0px 10px; width: calc(100%); background: rgb(204 204 204 / 48%);" @click="openPushReceiverSelect">
                        {{receiverText}}
                    </div> -->
                    <div v-else-if="this.replyPopYn" style="width: calc(100% - 100px); background: rgb(204 204 204 / 48%); padding: 0 5px; margin-left: 5px; margin-top: 3px; border-radius: 5px; height: 100%; float: left;" >
                      <span>{{this.creUserName + '님'}}</span>
                    </div>
                    <div v-if="!allYn && (this.receiverList.memberList.length > 0 || this.receiverList.bookList.length > 0)" style="width: calc(100%); overflow: auto hidden; background: rgb(204 204 204 / 48%); padding: 5px 5px; margin-left: 5px; margin-top: 3px; border-radius: 5px; height: 100%; float: left;" >
                      <div :style="setScrollWidth" style="min-width = 100%; height: 100%; float: left;">
                        <div v-for="(value, index) in this.receiverList.memberList" :key="index" style="min-width: 30px; margin-left: 5px; float: left; padding: 0 10px; height: 25px; border-radius: 5px; background: #fff;">
                            <span class="font14 fl">{{this.$changeText(value.userDispMtext)}}</span>
                            <span @click="delRecvList('m', index)" class="font14 fr mleft-1">x</span>
                        </div><!-- {{this.replyData.creUserKey}} -->
                        <div v-for="(value, index) in this.receiverList.bookList" :key="index" style="min-width: 30px; margin-left: 5px; float: left; padding: 0 10px; height: 25px; border-radius: 5px; background: #fff;">
                            <span class="font14 fl">{{this.$changeText(value.cabinetNameMtext)}}</span>
                            <span @click="delRecvList('b', index)" class="font14 fr  mleft-1">x</span>
                        </div><!-- {{this.replyData.creUserKey}} -->
                      </div>
                    </div>

                  </div>

                  <div class="fl" style="width: 100%; min-height: 25px; margin-bottom: 15px;" v-if="!this.replyPopYn">
                    <div class="fl mright-1"><input id="creNameInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="showCreNameYn"><label style="margin-left: 5px;" class="font16 fontBold commonColor" for="creNameInput">작성자공개</label></div>
                    <!-- <div class="fl mleft-05"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="canReplyYn"><label style="margin-left: 5px;" class="font14" for="replyInput">답변 허용</label></div> -->
                    <div class="fl mright-1"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="canReplyYn"><label style="margin-left: 5px;" class="font16 fontBold commonColor" for="replyInput">댓글허용</label></div>
                    <div class="fl " ><input type="checkbox" v-model="titleShowYn" class="fl" style="margin-top: 6px;" name="" id="titleShow"> <label class="font16 fontBold commonColor" style="margin-left: 5px;" for="titleShow">제목추가</label></div>
                  </div>

                  <div v-else class="fl" style="width: 100%; min-height: 25px; margin-left: 5px; margin-bottom: 15px;">
                    <div style="width: 120px; height: 100%; float: left; margin-right: 30px;">
                      <img src="../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" />
                      <label class="fl" style="width: calc(100% - 20px); margin-left: 5px;" for="creNameInput">작성자 공개</label>
                    </div>
                    <div style="width: 100px; height: 100%; float: left;">
                      <!-- <div style="width: 13px; height: 13px; background-color: #ccc; float: left; margin-top: 6px;"></div> -->
                      <!-- <img src="../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" /> -->
                      <!-- <label class="fl" style=" width: calc(100% - 30px); margin-left: 5px;" for="replyInput">답변 허용</label> -->
                    </div>
                  </div>
                  <input type="text" v-if="titleShowYn" id="pushTitleInput" :placeholder="replyPopYn? '답장 제목을 입력해주세요':'알림 제목을 입력해주세요'" class="recvUserArea mbottom-05 inputArea fl" v-model="writePushTitle" style="padding: 0 10px; background-color:white; width: 100%;" name="" >
                </div>
                <div style="float: left; width: 100%; padding: 10px 0; padding-top: 0; min-height: 50px;">
                    <div style="width: 100%; min-height: 30px;" class="fl w-100P">
                        <!-- <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width: 23px; margin-top: 6px; float: left;" alt=""> -->
                        <p class="boardWriteTitleText fontBold font15 fl commonColor" style="margin-top: 4px;">첨부파일</p>
                        <attachFileList  @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
                    </div>
                </div>
                <div style="width: 100%;float: left; min-height: 50px; position: relative;">
                  <gActiveBar modeType="write" :tabList="this.activeTabList" ref="actBar" style="width: 100%; position: absolute; background: transparent !important;" class="mbottom-05 fl mtop-05" @changeTab= "changeTab" />
                  <!-- <div class="titleAddArea" >
                    <input type="checkbox" v-model="titleShowYn" class="fl" style="margin-top: 5px; margin-right: 5px;" name="" id="titleShow">
                    <label class="fl" for="titleShow">제목 추가</label>
                  </div> -->
                </div>
                <!-- <input type="text" v-if="titleShowYn" id="pushTitleInput" :placeholder="replyPopYn? '답장 제목을 입력해주세요':'알림 제목을 입력해주세요'" class="recvUserArea mbottom-05 inputArea fl" v-model="writePushTitle" style="padding: 0 10px; background-color:white; width: 100%;" name="" > -->
                <div id="pageMsgAreaWrap" class="pageMsgArea" style="">
                  <pre id="textMsgBoxPush" style="word-break: break-all;" class="editableContent" @click="test" v-show="viewTab === 'text'" contenteditable=true></pre>

                  <formEditor ref="complexEditor" v-show="viewTab === 'complex'" @changeUploadList="changeUploadList" :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
                  <div @click="formEditorShowYn = true" v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>

                </div>
                  <!-- <gBtnSmall class="mright-05 font20 writePushBtn " style="float: right; font-weight:bold;margin-bottom: 60px; " btnTitle='발송하기' @click="clickPageTopBtn()" /> -->
              </div>
            </div>
            <!-- <div class="whitePaperEffect" style="position: absolute; bottom:0;"></div> -->
          </div>
          <gBtnSmall class="mright-05 font20 writePushBtn " style="position: absolute; bottom:2%; left:50%; transform: translateX(-50%); border: 4px solid #D6D6E7;" :style="viewTab === 'complex' ? 'bottom: 7.5%;' : ''"  :btnTitle="requestPushYn === false ? '발송하기' : '신청하기'" @click="clickPageTopBtn()" />
      </div>
    </div>
  </div>
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
</template>
<script>
/* eslint-disable */
import commonConfirmPop from './confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../unit/formEditor/Tal_formEditor.vue'
import attachFileList from '../unit/formEditor/Tal_attachFile.vue'
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
    // pageUpdate값이 달라지면 watch에서 이를 감지하고 함수를 실행함
    pageUpdate (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history[history.length - 1] === this.popId) { // 글로벌 히스토리 리스트 변수의 마지막 값과 현 페이지의 아이디가 같은 값일때 (= 마지막 페이지가 내 페이지 일 때) close 함수 실행되도록
        this.closeXPop()
      }
    }
  },
  mounted() {
    // debugger
    // console.log(this.params)
    document.querySelector("#pageMsgAreaWrap").addEventListener("paste", (e) => {
      // console.log(e)
      var items = (e.clipboardData || e.originalEvent.clipboardData).items;

      for (let i of items) {
          var item = i;
          if (item.type.indexOf("image") !== -1) {
              if (this.viewTab != 'complex') {
                  this.$refs.actBar.switchtab(1)
                  this.viewTab = 'complex'
              }
              /* this.editorType = 'complex' */
              var file = item.getAsFile();
              this.handleImageUpload(file)
              // console.log(file);
          //uploadFile(file);
          } else {
            // e.preventDefault()
            /* const text = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertHTML", false, text); */
            // const getText = (e.originalEvent || e).clipboardData.getData('text/plain')
            // var pastedData = event.clipboardData ||  window.clipboardData;

            // const selection = document.getSelection();
            // const range = selection.getRangeAt(0);
            // const start = range.startOffset; // 텍스트 선택 시작 위치
            // const end = range.endOffset; // 텍스트 선택 마지막 위치
            // if (this.viewTab != 'complex') {
              // const text = document.getElementById('textMsgBoxPush').textContent
              // const before = text.slice(0, start)
              // const after = text.slice(end)

              // // console.log(start)
              // // console.log(before)
              // // console.log(after)
              // document.getElementById('textMsgBoxPush').textContent = before + getText + after;
              // document.getElementById('textMsgBoxPush').textContent = getText;
              // const text = (e.originalEvent || e).clipboardData.getData('text/html')
            // }
            // e.preventDefault()
            // const text = (e.originalEvent || e).clipboardData.getData('text/html');
            // document.execCommand("insertHTML", false, text);
          }
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
    // textArea.addEventListener('paste', () => {
    //   const paste = (event.clipboardData || window.clipboardData).getData('text');
    //   const selection = window.getSelection();
    //   if (!selection.rangeCount) return false;
    //   selection.deleteFromDocument();
    //   selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    //   event.preventDefault();
    // })
    //  // 1)해당 페이지(팝업)의 유니크한 아이디값을 정의
    // this.popId = 'gPopup' + 9999
    // // 2) index.js (store) vuex에 저장된 글로벌 히스토리 리스트 변수를 불러옴
    // var history = this.$store.getters['D_HISTORY/hStack']
    // // 3) 현 페이지(팝업)을 글로벌 히스토리 리스트 변수에 추가하여 업데이트 시켜줌
    // history.push(this.popId)

    // this.$store.commit('D_HISTORY/updateStack', history)

    // 알림신청 건을 승인 또는 취소를 하기 위함.
    // this.answerRequsetYn = true
    if (this.answerRequsetYn) {
      this.$refs.textAreaRequestTitle.style.backgroundColor = '#00000010'
      this.$refs.textAreaRequestTitle.readOnly = true
    }

    this.settingAlim()
  },
  data () {
    return {
      screenInnerWidth: window.innerWidth,
      screenInnerHeight: window.innerHeight,
      receiverClickYn: true,
      replyPopYn: false,
      showCreNameYn: true, // 작성자 명 공개
      canReplyYn: true, // 댓글 허용
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
      receiverList: {memberList: [], bookList: []},
      receiverText: '수신자를 선택해주세요',
      allRecvYn: true,
      selectedReceiverList: [],
      allRecvYnInput: true,
      creUserName: null,
      activeTabList: [{ display: '텍스트형', name: 'text' }, { display: '블로그형', name: 'complex' }],
      viewTab: 'text',
      titleShowYn: false,
      uploadFileList: [],
      receiverTotalNum: 0,
      complexOkYn: false,
      thisPopN: 'writePush',
      popId: {},
      requestPushYn: false,
      requestTitle: '',
      // 요청 받은 알림신청 건이면 true로 변경
      answerRequsetYn: false,
      answerRequestMsg: '',
      requestAgreeYn: false,
      creTeamKey: 0,
      bodyString: ''
      // formCardHeight: 0


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

    if (this.params.parentAttachTrueFileList && this.params.parentAttachTrueFileList.length > 0) {
      // this.attachTrueFileList = this.params.parentAttachTrueFileList
    }

    if (this.params.replyPopYn) {
      this.replyPopYn =
      this.allRecvYn = false
      this.creUserName = this.$changeText(this.params.creUserName)
      // console.log(this.params)
      if (this.params.targetKey) {
        this.creTeamKey = this.params.targetKey
      }
      this.creUserName = this.params.userName
      this.showCreNameYn = true
      this.canReplyYn = true
      // document.getElementById('replyInput')
    }
    if (this.params.requestPushYn){
      this.requestPushYn = true
    }
  },
  methods: {
    settingAlim() {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      if (temp.getElementsByClassName('formCard').length > 0) {
        this.$refs.actBar.switchtab(1)
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
        this.viewTab = 'complex'
        this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
        // console.log('this.propData.parentAttachTrueFileList')
        // // console.log(this.propData.parentAttachTrueFileList)
        // this.formEditorShowYn = true
      } else {
        document.getElementById('textMsgBoxPush').innerHTML = this.$findATagDelete(this.bodyString)
      }

    },
    async requestPushAgreeClick () {
      if (this.checkRequstAgree() === true){
        var param = {}
        param.requestKey = this.params.requestKey
        param.answerRequestMsg = this.answerRequestMsg
        param.teamName = this.$changeText(this.params.targetNameMtext)
        param.creTeamKey = this.params.targetKey
        param.creUserKey = this.GE_USER.userKey
        // var response = await this.$commonAxiosFunction({
        //   url: 'https://mo.d-alim.com/service/tp.승인 처리',
        //   param: param
        // })
        // if (response.data === true){

        // }
        this.errorText = '알림 신청이 승인 처리되었습니다.'
        this.failPopYn = true
        // this.requestAgreeYn = true
      }
    },
    async requestPushDisagreeClick () {
      if (this.checkRequstAgree() === true){
        var param = {}
        param.requestKey = this.params.requestKey
        param.answerRequestMsg = this.answerRequestMsg
        param.teamName = this.$changeText(this.params.targetNameMtext)
        param.creTeamKey = this.params.targetKey
        param.creUserKey = this.GE_USER.userKey
        // var response = await this.$commonAxiosFunction({
        //   url: ''https://mo.d-alim.com/service/tp.거절 처리',
        //   param: param
        // })
        // if (response.data === true){

        // }
        this.errorText = '알림 신청이 거절 처리되었습니다.'
        this.failPopYn = true
        // this.requestAgreeYn = true
      }
    },
    delRecvList (type, index) {
        if (type === 'm') {
            this.receiverList.memberList.splice(index, 1)
        } else if (type === 'b') {
            this.receiverList.bookList.splice(index, 1)
        }
        this.receiverTotalNum -= 1
    },
    checkRequstAgree () {
      var checkYn = false
      if (this.answerRequestMsg.replaceAll(' ', '') !== '') {
        checkYn = true
      }else {
        this.errorText = '응답메시지를 입력해주세요.'
        this.failPopYn = true
        return
      }
      return checkYn
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
    encodeUTF8(str){// 특수문자도 포함할 경우  encodeURIComponent(str) 를 사용.     
      return encodeURI(str);
    },
    openPop(param){
      // console.log('param');
      // console.log(param);
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
        var mList = []
        var bList = []
        var myMList = []
        var myBList = []
        // console.log('2!@#!@#!@@@@@2222')
        // console.log(this.receiverList)
        // console.log(obj)
        if (this.receiverList.memberList !== undefined && this.receiverList.memberList !== null && this.receiverList.memberList.length > 0) {
            myMList = this.receiverList.memberList
        }
        if (this.receiverList.bookList !== undefined && this.receiverList.bookList !== null && this.receiverList.bookList.length > 0) {
            myBList = this.receiverList.bookList
        }

        // if (obj.bookList && obj.bookList.length > 0) {
        //     bList = obj.bookList
        //     if (this.receiverList.bookList !== undefined && this.receiverList.bookList !== null && this.receiverList.bookList.length > 0) {
        //         myBList = this.receiverList.bookList
        //         for (var mb = 0; mb < myBList.length; mb ++) {
        //             for (var b = obj.bookList.length - 1; b >= 0; b --) {
        //                 if (obj.bookList[b].cabinetKey === myBList[mb].cabinetKey) {
        //                   bList = bList.splice(b, 1)
        //                   // break
        //                 }
        //             }
        //         }
        //     }
        //     if (bList === undefined || bList === null) bList = []
        // }

        // if (obj.memberList && obj.memberList.length > 0) {
        //     mList = obj.memberList
        //     if (this.receiverList.memberList !== undefined && this.receiverList.memberList !== null && this.receiverList.memberList.length > 0) {
        //         // console.log('this.receiverList')
        //         // console.log(this.receiverList)
        //         mList = this.receiverList.memberList

        //         for (var mm = 0; mm < myMList.length; mm ++) {
        //             for (var m = obj.memberList.length - 1; m >= 0; m --) {
        //                 if (obj.memberList[m].userKey === myMList[mm].userKey) {
        //                   mList = mList.splice(m, 1)
        //                   // break
        //                 }
        //             }
        //         }
        //     }
        //     if (mList === undefined || mList === null) mList = []
        // }
        // if (myMList.length > 0) {
        //     if (mList.length > 0) {
        //         this.receiverList.memberList = [
        //             ...myMList,
        //             ...mList
        //         ]
        //     }
        // } else {
        //     if(mList.length > 0) {
        //         this.receiverList.memberList = mList
        //     }
        // }

        // if (myBList.length > 0) {
        //     if (bList.length > 0) {
        //         this.receiverList.bookList = [
        //             ...myBList,
        //             ...bList
        //         ]
        //     }
        // } else {
        //     if(bList.length > 0) {
        //         this.receiverList.bookList = bList
        //     }
        // }


      this.list = []
      this.selectedReceiverList = []
      this.receiverTotalNum = myMList.length + mList.length + myBList.length + bList.length
      this.receiverText = ''
      // console.log(this.receiverList.bookList);
      // var shareItemBookList = []
      // eslint-disable-next-line no-new-object


    },
    settingRecvList () {
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
            }
        }
    },
    openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.params.targetKey
      param.teamKey = this.params.targetKey
      param.teamNameMtext = this.params.teamNameMtext
      param.pSelectedList = this.receiverList
      // console.log(this.params)
      // console.log(param)

      this.$emit('openPop',param)
      // this.receiverPopYn = true
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
    confirmNo(){
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
    async sendMsg () {
        this.checkPopYn=false
        var paramImgList = []
        this.sendLoadingYn = true

        try {
          var param = {}
          var innerHtml =''
          param.bodyHtmlYn = true //기본알림또한 html형식으로 들어감
          var targetMsgDiv = null
          // console.log('업로드할 개수는!!!' + this.uploadFileList.length)
          if (this.uploadFileList.length > 0) {
              this.progressShowYn = true
              await this.formSubmit()
              setTimeout(() => {
                this.progressShowYn = false
              }, 2000)
          } else {
          }

          if(this.viewTab === 'complex') {
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
                      var innerHtml = formList[f].innerHTML
                      formList[f].innerHTML = this.$findUrlChangeAtag(innerHtml)
                    }
                    // if (formList[f].id)
                }
              param.getBodyHtmlYn = true
              }
              targetMsgDiv = document.getElementById('msgBox')
              innerHtml = targetMsgDiv.innerHTML

          } else if (this.viewTab === 'text') {
              // param.bodyHtmlYn = false
              document.querySelectorAll('#textMsgBoxPush')[0].contentEditable = false
              //
              targetMsgDiv = document.getElementById('textMsgBoxPush')
              innerHtml = targetMsgDiv.innerHTML
              innerHtml = this.$findUrlChangeAtag(innerHtml)
          }

          // innerHtml = this.$findUrlChangeAtag(innerHtml)
          // innerHtml = this.encodeUTF8(targetMsgDiv.innerHTML)

          param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
          param.allRecvYn = this.allRecvYn
          var attachFileList = await this.setAttachFileList()
          if (attachFileList.length > 0) {
              param.attachFileList = attachFileList
          }
          if (this.allRecvYn === true) {

          } else {
              // console.log(this.param)
              if(this.replyPopYn) {
              param.parentContentsKey = this.params.targetContentsKey
              param.actorList = [{accessKind: 'U', accessKey: this.params.creUserKey}]
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
          if (this.params.currentTeamKey || this.params.creTeamKey){
            param.creTeamKey = this.params.currentTeamKey || this.params.creTeamKey
          }
          // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
          // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
          param.creUserKey = this.GE_USER.userKey
          if(this.writePushTitle !== '') {
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
          //
          var result
          if (this.requestPushYn === true) {
              param.requestTitle = this.requestTitle

              // result = this.$saveContents(param)
              // this.closeXPop(true)
              // this.sendLoadingYn = false
              this.okPopYn = true
              return
          }
          result = await this.$saveContents(param)
          /* if (result.contents) {
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [result.contents] )
          }
          var isMobile = /Mobi/i.test(window.navigator.userAgent);
          debugger */
          var isMobile = /Mobi/i.test(window.navigator.userAgent);
          /* if (!isMobile) {
      // eslint-disable-next-line no-new-object
              this.closeXPop(true)
          } else {
              this.closeXPop(true)
          } */
          // this.closeXPop(true)
          var param = new Object()
          param.contentsKey = result.contents.contentsKey
          param.jobkindId = result.contents.jobkindId
          var resultList = await this.$getContentsList(param)
          var detailData = resultList.content[0]
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
        } catch (error) {
          console.error(error)
          // this.$showToastPop('일시적인 오류로 발송하지 못했습니다. 잠시 후 다시 시도해주세요.')
        } finally {
          this.sendLoadingYn = false
          this.closeXPop(true)
        }


       /*  } */

    },
    closeXPop (reloadYn) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
        //  글로벌 히스토리 리스트 변수의 마지막 값을 지워주며 내 페이지를 닫는 close함수 실행
      // if (this.params.writeType) {
      //   this.$parent.propParams.writeType = 'ALIM'
      //   if (this.params.writeType === 'ALIM') {
      //     this.$parent.propParams.writeType = 'ALIM'
      //     // this.$emit('toAlimFromBoard' , 'P')
      //   }
      // }
     this.$emit('closeXPop')
    },
    setAttachFileList () {
      var newAttachFileList = new Array()
      var setObj = new Object()
      for (var i = 0; i < this.uploadFileList.length; i++) {
        setObj = new Object()
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
      // 취소를 누르거나 유효성 검사 (이 함수)에 통과하지 못하면 값을 다시 가져와야함. 그러므로 --> this.complexOkYn = false
      if(this.viewTab === 'complex' && this.complexOkYn === false) {
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
        if(this.viewTab === 'complex') {
          msgData = document.getElementById('msgBox').innerText
        } else if (this.viewTab === 'text') {
          msgData = document.getElementById('textMsgBoxPush').innerText
        }
        msgData = msgData.trim()
        if (msgData !== undefined && msgData !== null && msgData !== '' && msgData !== '클릭하여 내용을 작성해주세요' || this.uploadFileList.length > 0) {
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
    async handleImageUpload (file) {
      debugger
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
        // await this.$editorImgResize(this.selectFile)
      }
        // var result = await this.$previewFile(file)
        // if (result !== undefined && result !== null && result !== ''){
        //   this.$refs.complexEditor.addFormCard('image', result.url, true)
        //   this.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: result.url, addYn: true, file: result.file }], originalType: 'image' })
        // }
      /* if (thisthis.$refs.selectFile.files.length > 1) {
        thisthis.$emit('setMultiFile', thisthis.selectFileList)
      } */
    },
    async formSubmit () {
      if (this.uploadFileList.length > 0) {
        var testtest = this.uploadFileList
        // console.log(this.uploadFileList)
        var iList = document.querySelectorAll(".formCard .addTrue")
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
              if(res.data.length > 0) {
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
        var iList = document.querySelectorAll('.msgArea .formCard .addTrue')
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
    },
  },

  components: {
    commonConfirmPop,
    formEditor,
    attachFileList
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
      /* left: 5%; */
      /* bottom: 0; */
      top: 5%;
      left: 5%;
      /* transform: translate(-50%, -50%); */
      width: 90%;

      /* border-radius: 0.8rem 0.8rem 0 0; */
      border-radius: 0.8rem;
      /* height: 90%; */
      height: 85%;

      /* background-color: #f9f9f9; */
      background-color: #f5f5f5;
      color: #363c5f;
      padding: 1.5rem;
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
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
.pageMsgArea{ min-height: 300px; float: left; width: 100%; height: calc(100% - 160px);}
.pageMsgArea p{font-size: 16px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ padding:7px; overflow: hidden scroll; margin-bottom: 60px; width: 100%; min-height: 240px; height: 90%;; border-radius: 5px; background: #fff; border:1px solid #BFBFDA; font-size: 16px; text-align: left;}

.pageTopArea{
  width: 100%; ;
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
.editableContent{ padding: 7px;  overflow: hidden scroll; width: 100%; min-height: 300px; height:100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; }
.msgArea span {padding: 0;}
.titleAddArea{
  width: 100px; margin-left: 5px; height: 25px; margin-left: 5px; float: right; right: -20px; position: absolute; margin-top: 7px;
}
.writePushBtn{
/* position: absolute; left:50%; bottom:0.5rem; transform: translateX(-50%);  */ float: left; margin: 0 auto!important; margin-top: 20px !important; width: 30% !important; min-width: 100px !important; max-width: 250px; height: 6% !important; font-size: 16px; display: flex; justify-content: center; align-items: center;
}
@media screen and (max-width:330px) {
  .titleAddArea{
    top: -1.5rem;
  }
}

</style>
