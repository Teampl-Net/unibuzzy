<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <div class="w-100P" style=" height: 100vh; overflow:auto" id="testArea">
    <div style="min-height: 800px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <!-- <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/> -->
      <!-- <writePushPageTitle class="pleft-2" titleText="알림작성"  @clickEvnt="clickPageTopBtn" :btnYn ="false" pageType="writePush"/> -->
      <gConfirmPop confirmText='알림을 발송 하시겠습니까?' @no='checkPopYn=false' v-if="checkPopYn" @ok='sendMsg' />
      <gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='발송되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <!-- <div  :style="setColor" class="paperBackground"> -->
          <!-- <div class="fr changePaperBtn font13" style="color:white; border-radius:0.3em; padding: 4px 10px;" @click="clickPageTopBtn('sendPushMsg')" >발송하기</div> -->
        <div class="paperBackground">
          <div class="whitePaper">
            <div class="overFlowYScroll pushInputArea">
              <div class="pageTopArea">
                <!-- {{receiverList}} -->
                <div class="fl" style="margin-bottom: 15px;">
                  <p class="fontBold commonColor">수신 대상</p>
                  <div style="width: calc(100% - 115px); min-height: 2rem; padding-top: 3px; float: left;" v-if="!this.replyPopYn">
                    <div class="fl" style="border: 1px solid #ccc; margin-bottom: 10px; margin-left: 10px;">
                      <div class="fl" style="width: 50px; text-align: center; border-right: 1px solid #ccc; background-color: #f9f9f9; color: black;" @click="selectRecvType(true)" :class="{receiverClickColor: receiverClickYn === true }" :checked="allRecvYn" id="allTrue" :value="true">전체</div>
                      <div class="fl" style="width: 50px; text-align: center; background-color: #f9f9f9; color: black;" @click="selectRecvType(false)" id="allFalse" :value="false" :class="{receiverClickColor: receiverClickYn === false }" :checked="!allRecvYn">선택</div>
                    </div>
                    <!-- <input type="radio" name="receiveAllYn" style="margin-left: 5px; margin-top: 4px;" class="mright-05 fl" @change="selectRecvType(true)" :checked="allRecvYn"  id="allTrue" :value="true">
                    <label class="mright-1 fl" for="allTrue">전체</label>

                    <input class="mright-05 fl" type="radio" style="margin-left: 5px; margin-top: 4px;" name="receiveAllYn" @change="selectRecvType(false)" id="allFalse" :value="false" :checked="!allRecvYn">
                    <label class="mright-1 fl" for="allFalse">선택</label> -->
                    <div v-if="!allRecvYn" class="inputArea recvUserArea font15" style="padding: 3px 10px; width: calc(100% + 20px); background: rgb(204 204 204 / 48%);" @click="openPushReceiverSelect">
                      {{receiverText}}
                    </div>
                  </div>
                  <div style="width: calc(100% - 100px); background: rgb(204 204 204 / 48%); padding: 0 5px; margin-left: 5px; margin-top: 3px; border-radius: 5px; height: 100%; float: left;" v-else>
                    <span>{{this.creUserName + '님에게 답변'}}</span><!-- {{this.replyData.creUserKey}} -->
                  </div>
                </div>

                <div class="fl" style="width: 100%; min-height: 25px; margin-left: 5px; margin-bottom: 15px;" v-if="!this.replyPopYn">
                  <div style="width: 120px; height: 100%; float: left; margin-right: 30px;"><input id="creNameInput" type="checkbox" style="float: left; margin-top: 6px;" v-model="showCreNameYn"><label style="margin-left: 5px;" for="creNameInput">작성자명 공개</label></div>
                  <div style="width: 85px; height: 100%; float: left;"><input id="replyInput" type="checkbox" style="float: left; margin-top: 6px;"  v-model="canReplyYn"><label style="margin-left: 5px;" for="replyInput">답변 허용</label></div>
                </div>

                <div v-else class="fl" style="width: 100%; min-height: 25px; margin-left: 5px; margin-bottom: 15px;">
                  <div style="width: 120px; height: 100%; float: left; margin-right: 30px;">
                    <img src="../../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" />
                    <label class="fl" style="width: calc(100% - 20px); margin-left: 5px;" for="creNameInput">작성자명 공개</label>
                  </div>
                  <div style="width: 100px; height: 100%; float: left;">
                    <!-- <div style="width: 13px; height: 13px; background-color: #ccc; float: left; margin-top: 6px;"></div> -->
                    <img src="../../../assets/images/push/checkedBox.svg" style="width: 15px; height: 15px; float: left; margin-top: 4px;" />
                    <label class="fl" style=" width: calc(100% - 30px); margin-left: 5px;" for="replyInput">답변 허용</label>
                  </div>
                </div>

              </div>

              <div style="width: 100%;float: left; min-height: 50px; position: relative;">
                <gActiveBar :tabList="this.activeTabList" style="width: 100%; position: absolute;" class="mbottom-05 fl mtop-05" @changeTab= "changeTab" />
                <div style="width: 100px; margin-left: 5px; height: 25px; margin-left: 5px; float: right; right: -20px; position: absolute; margin-top: 7px; ">
                  <input type="checkbox" v-model="titleShowYn" class="fl" style="margin-top: 5px; margin-right: 5px;" name="" id="titleShow">
                  <label class="fl" for="titleShow">제목 추가</label>
                </div>
              </div>
              <input type="text" v-if="titleShowYn" id="pushTitleInput" :placeholder="replyPopYn? '답장 제목을 입력해주세요':'알림 제목을 입력해주세요'" class="recvUserArea mbottom-05 inputArea fl" v-model="writePushTitle" style="padding: 0 10px; background-color:white; width: 100%;" name="" >
              <div class="pageMsgArea" style="">
                <!-- <p class="">내용</p> -->
                <div id="textMsgBox" class="formCard" @click="test" v-if="viewTab === 'text'" style="padding:7px; overflow: hidden scroll; width: 100%; height: 85%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></div>
                <div @click="formEditorShowYn = true" v-else-if="viewTab === 'complex'" class="msgArea" style="padding:7px; overflow: hidden scroll;" id="msgBox">클릭하여 내용을 작성해주세요</div>
                <!-- <textArea style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border: 1px solid #ccc; border-radius: 5px;">test</textArea> -->
                <!-- <div class="msgArea" @click="messageAreaClick" style="padding:5px; overflow: auto;">
                  {{msgData}}
                </div> -->
              </div>

            </div>

          </div>
          <!-- <div style="width: 100%;" >
                  <gBtnSmall class="mright-05" btnTitle='발송하기' @click="clickPageTopBtn('sendPushMsg')" />
                  <gBtnSmall class="mright-05" btnTitle='임시저장' @click="clickPageTopBtn('requestTS')" />
          </div> -->
        </div>
      </div>
    </div>
      <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
      <!-- <msgPop @no='popNo' v-if="msgPopYn" @save='popSave' :propMsgData='msgData'/> -->
  </div>
  <div v-if="formEditorShowYn" style="position: fixed; top: 0; left: 0; width: 100vw; background: #fff; height: 100vh; z-index: 99999999999999999999">
    <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="알림작성" />
    <formEditor :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
  </div>
  <div v-if="receiverPopYn" style="position: fixed; top: 0; left: 0; width: 100vw; background: #fff; height: 100vh; z-index: 99999999999999999999"  >
      <selectReceivPop  :selectPopYn='true' :propData='params' @closeXPop='receiverPopYn= false' @sendReceivers='setSelectedList' />
  </div>
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
    replyData: {}
  },
  watch: {
    sendOk: function () {
      this.clickPageTopBtn()
    }
  },
  data () {
    return {
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
      activeTabList: [{ display: '기본 알림', name: 'text' }, { display: '복합 알림', name: 'complex' }],
      viewTab: 'text',
      titleShowYn: false
    }
  },
  computed: {
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
  created () {
    if (this.params.replyPopYn) {
      this.replyPopYn = true
      this.allRecvYn = false
      this.creUserName = this.$changeText(this.params.creUserName)
      this.showCreNameYn = true
      this.canReplyYn = true
    }
  },
  methods: {
    test(){

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
    setSelectedList (obj) {
      this.receiverPopYn = false
      // debugger
      this.receiverList = obj.data
      this.list = []
      this.selectedReceiverList = []
      this.receiverText = ''
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
          this.receiverText += ', ' + selectedBookList.cabinetNameMtext
          this.list.push(shareItemBookObject)
        }
        /* this.selectedReceiverList.push(this.receiverList.bookList[i].cabinetKey) */
        this.receiverText += selectedBookList.cabinetNameMtext + ', '
        this.selectedReceiverList.push(shareItemBookObject)
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
          this.receiverText += this.$changeText(selectedMemberList.userDispMtext) + ', '
          this.selectedReceiverList.push(shareItemMemberObject)
        }
      }


      console.log(obj)
    },
    openPushReceiverSelect () {
      this.receiverPopYn = true
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
      this.sendLoadingYn = true
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var innerHtml =''
      param.bodyHtmlYn = true //기본알림또한 html형식으로 들어감
      var targetMsgDiv = null
      if(this.viewTab === 'complex') {
        param.bodyHtmlYn = true
        
        /* 용량 관리 위해: 나중에 주석 풀어야 함_수민 */
        /* var imgSrc = null
        var imgList = document.querySelectorAll('#msgBox img')
        for (var img=0; img < imgList.length; img ++) {
          imgSrc = imgList[img].src
          paramImgList.push(imgSrc)
          imgList[img].src = 'imgTagSrc' + img
        }
        param.imgList = imgList */
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
        document.querySelectorAll('#textMsgBox')[0].contentEditable = false
        // debugger
        targetMsgDiv = document.getElementById('textMsgBox')

      }
      innerHtml = targetMsgDiv.innerHTML


      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
      param.allRecvYn = this.allRecvYn
      if (this.allRecvYn === true) {

      } else {
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
        param.title = this.$titleToBody(targetMsgDiv)
      }
      // debugger
      param.jobkindId = 'ALIM'
      param.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext

      param.showCreNameYn = this.showCreNameYn
      param.canReplyYn = this.canReplyYn
      //debugger
      var result = await this.$saveContents(param)
      debugger
      if (result === true) {
        this.sendLoadingYn = false
        this.$emit('closeXPop', true)
      }

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
        msgData = document.getElementById('textMsgBox').innerHTML
      }
      if (msgData !== undefined && msgData !== null && msgData !== '') {
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
    }
    /* countDown () {
      this.closeAutoPopCnt --
      if(this.closeAutoPopCnt === 0)
                clearInterval(play)
    } */
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
      position: relative;
      width: 100%;
      margin: 0 auto;
      margin-top: 1rem;
      border-radius: 0.8rem;
      height: calc(100% - 60px);
      min-height: 500px;
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

  .whitePaper:after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
  .whitePaper:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 50px solid #7373734f;
  border-right: 50px solid #F9F9F9;
  width: 0;
}

/* add by_jeong */
.pageMsgArea{ height: 100px; height: calc(100% - 10rem); width: 100%; float: left;}
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{font-size: 16px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; height:100%; border:1px solid #BFBFDA; border-radius: 5px; background-color: white;font-size: 16px;}

.pageTopArea{
  width: 100%; min-height: 3.5rem;
}
.pageTopArea >div{
  width: 100%; min-height: 2rem;
}
.pageTopArea p{width: 80px; font-size: 16px; float: left; line-height: 30px; margin-left: 5px; margin-right: 10px; }
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

.writeArea{padding: 2rem 0; width: 100%; float: left;min-height: 600px; height: 100%; margin-top: 0rem; float: left; background:#0000005e; padding-top: 0; overflow: hidden;}
/* .writeArea{padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;} */
.paperBackground{width: 100%; height: calc(100% - 10rem);min-height: 600px; position: relative; margin: 0 auto; padding: 4rem 2rem; /* box-shadow: 0 0 9px 0px #00000029; */ border-radius: 10px 10px 0 0;}
.changePaperBtn{border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;}
.latestPushBtn{float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;}
.pushInputArea{height: 100%; width: 100%;}

.pushInputArea .recvUserArea{border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; float: left; position: relative; }
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

.msgArea span {padding: 0;}

</style>
