<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <div class="w-100P" style=" height: 100vh;top: 50px; position: absolute; overflow:auto">
    <div style="min-height: 800px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <!-- <pushDetailPop v-if="this.pushDetailPopShowYn" @closeDetailPop="closeDetailPop"/> -->
      <!-- <writePushPageTitle class="pleft-2" titleText="알림작성"  @clickEvnt="clickPageTopBtn" :btnYn ="false" pageType="writePush"/> -->
      <gConfirmPop confirmText='게시글을 저장하시겠습니까?' @no='checkPopYn=false' v-if="checkPopYn" @ok='sendMsg' />
      <gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='저장 되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <!-- <div  :style="setColor" class="boardWritePaperBack"> -->
          <!-- <div class="fr changePaperBtn font13" style="color:white; border-radius:0.3em; padding: 4px 10px;" @click="clickPageTopBtn('sendPushMsg')" >발송하기</div> -->
        <div class="boardWritePaperBack">
          <div class="whitePaper">
            <div class="overFlowYScroll pushInputArea">
              <div class="writeBoardPageTopArea">
                <div class=""><p style="">제목</p><input type="text" id="pushTitleInput" placeholder="제목을 입력해주세요" class="recvUserArea inputArea fl" v-model="writePushTitle" style="background-color:white" name="" ></div>
                <!-- <div class="">
                  <p style="">수신대상</p>
                  <div class="inputArea recvUserArea" style="padding-left: 2px; background: rgb(204 204 204 / 48%);" @click="openBoardReceiverSelect">
                  </div>
                </div> -->
                <!-- <p style="mright-05">옵션선택</p>
                <div style="width: 150px; margin-left: 5px; min-height: 25px; float: left;"><input id="creNameInput" type="checkbox" style="float: left;margin-top: 6px;"  v-model="showCreNameYn"><label class="mleft-05" for="creNameInput">작성자명 공개</label></div>
                <div style="width: 100px; margin-left: 5px; min-height: 25px; float: left;"><input id="replyInput" type="checkbox" style="float: left;margin-top: 6px;"  v-model="canReplyYn"><label class="mleft-05" for="replyInput">답글허용</label></div> -->
              </div>
              <gActiveBar :tabList="this.activeTabList" style="" class="mbottom-05 fl mtop-1" @changeTab= "changeTab" />
              <div class="pageMsgArea" style="">
                <!-- <p class="">내용</p> -->
                <div id="textMsgBox" class="formCard"  v-if="viewTab === 'text'" style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></div>
                <div @click="formEditorShowYn = true" v-else-if="viewTab === 'complex'" class="msgArea" style="padding:7px; overflow: hidden scroll;" id="msgBox">클릭하여 내용을 작성해주세요</div>

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
    <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="게시글작성" />
    <formEditor :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText"/>
  </div>
</template>
<script>
// import msgPop from '../admPages/TalAdm_writePush/TalAdm_msgPopup.vue'
// import writePushPageTitle from '../admPages/TalAdm_writePush/TalAdm_writePushTop.vue'
// import gPageTitle from '../../../components/unit/admUnit/TalAdm_gPageTitle.vue'
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../../unit/formEditor/Tal_formEditor.vue'

export default {
  props: {
    propData: {},
    sendOk: {}
  },
  watch: {
    sendOk: function () {
      this.clickPageTopBtn()
    }
  },
  data () {
    return {
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
      viewTab: 'text',
      activeTabList: [{ display: '기본 알림', name: 'text' }, { display: '복합 알림', name: 'complex' }]
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
    console.log(this.propData
    )
  },
  methods: {
    changeTab (tab) {
      this.viewTab = tab
    },
    setParamInnerHtml (formCard) {
      var innerHtml = ''
      for (var i = 0; i < formCard.length; i++) {
        innerHtml += formCard[i].outerHtml
      }
      this.propFormData = formCard
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.formEditorShowYn = false
    },
    setParamInnerText (innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    async sendMsg () {
      this.sendLoadingYn = true
      // eslint-disable-next-line no-new-object
      var param = new Object()

      var innerHtml = ''
      if (this.viewTab === 'complex') {
        param.bodyHtmlYn = true
        var formList = document.querySelectorAll('#msgBox .formCard')
        if (formList) {
          for (var f = 0; f < formList.length; f++) {
            formList[f].contentEditable = false
          }
          param.getBodyHtmlYn = true
        }
        innerHtml = document.getElementById('msgBox').innerHTML
      } else if (this.viewTab === 'text') {
        param.bodyHtmlYn = false
        document.querySelectorAll('#textMsgBox')[0].contentEditable = false
        // debugger
        innerHtml = document.getElementById('textMsgBox').innerHTML
      }
      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')

      param.jobkindId = 'BOAR'
      param.cabinetKey = this.propData.cabinetKey
      param.creTeamKey = this.propData.currentTeamKey
      param.actorList = this.propData.actorList
      // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
      // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
      param.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext
      param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.title = this.writePushTitle
      param.showCreNameYn = true

      var result = await this.$saveContents(param)
      if (result === true) {
        this.sendLoadingYn = false
        // this.$emit('successSave')
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
      if (title !== undefined && title !== null && title !== '') {
      } else {
        this.errorText = '제목을 입력해주세요'
        this.failPopYn = true
        return
      }
      var msgData = ''
      if (this.viewTab === 'complex') {
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
    formEditor
    // msgPop,
    // writePushPageTitle,
    // pushPop
  }
}
</script>
<style scoped>
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
.pageMsgArea{ height: 100px; height: calc(100% - 10rem); width: 100%; }
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{font-size: 15px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; min-height: 300px; height:100%; border:1px solid #BFBFDA; border-radius: 5px; background-color: white;font-size: 15px;}

.writeBoardPageTopArea{
  width: 100%; height: 3rem;
}
.writeBoardPageTopArea >div{
  width: 100%; min-height: 2.5rem;
}
.writeBoardPageTopArea p{width: 60px; font-size: 15px; color: #3A3A3A; float: left; line-height: 30px;}
.writeBoardPageTopArea input{font-size: 15px;}
.writeBoardPageTopArea .inputArea{width: calc(100% - 60px); box-sizing: border-box;  overflow: hidden;}

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

.writeArea{padding: 2rem 0; width: 100%; float: left; height: calc(100% - 2rem); min-height: 600px;     height: 100%; margin-top: 0rem; float: left; background:#0000005e; padding-top: 0;}
/* .writeArea{padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;} */
.boardWritePaperBack{width: 100%; height: calc(100% - 15rem);min-height: 600px; position: relative; margin: 0 auto; padding: 4rem 2rem; /* box-shadow: 0 0 9px 0px #00000029; */ border-radius: 10px 10px 0 0;}
.changePaperBtn{border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;}
.latestPushBtn{float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;}
.pushInputArea{height: 100%; width: 100%;}

.pushInputArea .recvUserArea{border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; float: left; position: relative; }
.orgaIcon{position: absolute; top: 0.3rem; right: 0.5rem; cursor: pointer;}

.pushBodyInput{resize: none; border-radius: 5px; border: 1px solid #BFBFDA; width: 100%; height: calc(100% - 7rem); padding: 1rem; box-sizing: border-box; color: #010101; font-size: 15px;}
.attatchFileBtn{cursor: pointer; width: 80px; height: 80px;margin-top: 0.5rem;border-radius: 5px; background: #A9AACD; display: flex; flex-direction: column; justify-content: center; align-items: center;}
.attatchFileBtn p{color: #FFFFFF; font-size: 10px; margin-top: 0.5rem;}

.toolBtnArea{justify-content: flex-end; position: absolute; right: 0; top: 0rem}
.toolLeftTab{color: #6768A7; font-weight: bold; font-size: 15px;margin-bottom: 1rem;}

.toolSearchBox{border: 1px solid #BFBFDA!important; border-radius: 5px!important;}
.toolPushCard{box-shadow: none !important; border: 1px solid #E1E1E1 !important;}
.selectPaperWrap{width: 100%; height: 100%; float: left; margin-top: 1rem;}

.formText {padding: 0;}

.msgArea span {padding: 0;}
#loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  z-index: 999999;
  background: #0101014b;
}

@keyframes spinner {
  from {transform: rotate(0deg); }
  to {transform: rotate(360deg);}
}

#loading .spinner {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: #6768A7;
  border-bottom-color: #6768A7;
  animation: spinner .8s ease infinite;
}
</style>
