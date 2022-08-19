<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <!-- <div class="w-100P" style=" height:100vh;top: 50px; position: absolute; overflow:auto"> -->
    <div class="w-100P" style=" height:100vh;top: 0; position: absolute; overflow:auto">
    <div style="min-height: 400px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <gConfirmPop :confirmText="modiYn? '게시글을 수정 하시겠습니까?' : '게시글을 저장하시겠습니까?'" @no='checkPopYn=false' v-if="checkPopYn" @ok='sendMsg' />
      <gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='저장 되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <div class="boardWritePaperBack"></div>
          <div class="whitePaperBoard">
            <div class="overFlowYScroll boardInputArea">
              <div class="w-100P fl" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ccc; margin-bottom: 1.5rem; padding-bottom:0.5rem;">
                <p class="fontBold commonColor font20 fl">게시글작성</p>
                <img style="width: 1rem;" @click="this.$emit('closeXPop')" class="mleft-1 fr"  src="../../../assets/images/common/popup_close.png"/>
              </div>
              <div class="writeBoardPageTopArea">
                <div class=""><p class="boardWriteTitleText" style="">제목</p><input type="text" id="pushTitleInput" placeholder="제목을 입력해주세요" class="pageTopInputArea font15 inputArea fl" v-model="writePushTitle" style="background-color:white" name="" ></div>
                <div class="" v-if="propData.nonMemYn"><p class="boardWriteTitleText" style="">문의자</p><input type="text" id="pushTitleInput" placeholder="이름을 입력해주세요" class="pageTopInputArea font15 inputArea fl" v-model="nonMemUserName" style="background-color:white" name="" ></div>
              </div>
              <gActiveBar modeType="write" :tabList="this.activeTabList" ref="activeBar" style="" class="mbottom-05 fl mtop-1" @changeTab= "changeTab" />
              <div class="pageMsgArea" style="">
                <!-- <p class="">내용</p> -->
                <div id="textMsgBox" class="editableContent"  v-show="viewTab === 'text'" style="padding:7px; overflow: hidden scroll; width: 100%; height: 100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></div>
                <div id="msgBox" @click="formEditorShowYn = true" v-show="viewTab === 'complex'" class="msgArea font15" style="padding:7px; overflow: hidden scroll;" >클릭하여 내용을 작성해주세요</div>

              </div>
              <div style="float: left; width: 100%; padding: 10px 0; min-height: 50px;">
                <div style="width: 100%; min-height: 30px;">
                  <img src="../../../assets/images/formEditor/attachFIleIcon.svg" style="width: 23px; margin-top: 6px; float: left;" alt="">
                  <p class="commonColor fl font16 fontBold" style="margin-top: 4px;">첨부파일</p>
                  <attachFileList style="min-width:80px;" :attachTrueAddFalseList="this.attachTrueFileList" @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
                </div>
              </div>
            </div>

          </div>
          <!-- <gBtnSmall class="mright-05 font20 writePushBtn commonColor whitePurpleBG" style="color:#6768a7; font-weight:bold; " btnTitle='발송하기' @click="clickPageTopBtn()" /> -->
      </div>
    </div>
    <gBtnSmall class="mright-05 commonColor writeBoardBtn whitePurpleBG" style="color:#6768a7; font-weight:bold; bottom: 1rem" btnTitle='작성하기' @click="clickPageTopBtn()" />
      <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
      <!-- <msgPop @no='popNo' v-if="msgPopYn" @save='popSave' :propMsgData='msgData'/> -->
  </div>  <!-- v-if="progressShowYn" -->
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
  <div v-if="formEditorShowYn" style="position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 100vh; z-index: 99999999999999999999">
    <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" headerTitle="게시글작성" />
    <formEditor @changeUploadList="changeUploadList" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" />
  </div>
</template>
<script>
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '../../unit/formEditor/Tal_formEditor.vue'
import progressBar from '../common/Tal_commonProgressBar.vue'
import attachFileList from '../../unit/formEditor/Tal_attachFile.vue'
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
  mounted () {
    var temp = document.createElement('div')
    temp.innerHTML = this.bodyString
    if (temp.getElementsByClassName('formCard').length > 0) {
      this.$refs.activeBar.switchtab(1)
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
          if (formC[i].classList[c] === 'formText') {
            jsonObj.type = 'text'
            imgYn = false
            break
          }
        }
        if (imgYn) {
          jsonObj.pSrc = formC[i].querySelector('img').src

          jsonObj.pFilekey = formC[i].querySelector('img').attributes.filekey.value
        }
        newArr.push(jsonObj)
      }
      this.propFormData = newArr
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.viewTab = 'complex'
      this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      // eslint-disable-next-line no-debugger
      debugger
      console.log(this.propData.parentAttachTrueFileList)
      // this.formEditorShowYn = true
    } else {
      document.getElementById('textMsgBox').innerHTML = this.bodyString
    }
    if (this.propData.parentAttachTrueFileList && this.propData.parentAttachTrueFileList.length > 0) {
      this.addFalseList = [
        ...this.addFalseList,
        ...this.propData.parentAttachTrueFileList
      ]
    }
    console.log(this.addFalseList)
  },
  data () {
    return {
      addFalseList: [],
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
      activeTabList: [{ display: '텍스트형', name: 'text' }, { display: '블로그형', name: 'complex' }],
      bodyString: '',
      modiYn: false,
      nonMemUserName: '',
      uploadFileList: [],
      attachTrueFileList: [],
      delAddFalseFileList: []
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
    if (this.propData.bodyFullStr) {
      this.bodyString = this.decodeContents(this.propData.bodyFullStr)
      this.modiYn = true
      console.log('WOW!!!!' + this.decodeContents(this.bodyString))
    }
    if (this.propData.parentAttachTrueFileList && this.propData.parentAttachTrueFileList.length > 0) {
      this.attachTrueFileList = this.propData.parentAttachTrueFileList
    }
    if (this.propData.titleStr) {
      this.writePushTitle = this.propData.titleStr
    }
  },
  methods: {
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
      console.log(this.uploadFileList)
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
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
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
    encodeUTF8 (str) { // 특수문자도 포함할 경우,encodeURIComponent(str)를 사용.
      return encodeURI(str)
    },
    async setAttachFileList () {
      var imgItemList = document.querySelectorAll('.msgArea .formCard .editorImg')
      console.log(imgItemList)
      console.log(this.addFalseList)
      console.log(this.delAddFalseFileList)
      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-undef
      var delList = []
      for (var f = this.addFalseList.length - 1; f > -1; f--) {
        if (this.addFalseList[f].attachYn) {
          for (var af = 0; af < this.delAddFalseFileList.length; af++) {
            if (this.addFalseList[f].fileKey === this.delAddFalseFileList[af].fileKey) {
              delList.push(this.addFalseList[f])
              break
            }
          }
        } else {
          var delYn = true
          for (var t = 0; t < imgItemList.length; t++) {
            if (Number(this.addFalseList[f].attributes.filekey.value) === Number(imgItemList[t].attributes.filekey.value)) {
              delYn = false
              break
            }
          }
          if (delYn) {
            delList.push(this.addFalseList[f])
          }
        }
      }
      console.log(delList)
      // eslint-disable-next-line no-array-constructor
      var newAttachFileList = new Array()
      // eslint-disable-next-line no-new-object
      var setObj = new Object()
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(this.addFalseList)
      if (delList.length > 0) {
        for (var a = 0; a < delList.length; a++) {
          // eslint-disable-next-line no-new-object
          setObj = new Object()
          setObj.addYn = false
          setObj.attachYn = false
          setObj.mFilekey = this.propData.attachMfilekey
          if (delList[a].attachYn) {
            setObj.fileKey = delList[a].fileKey
          } else {
            setObj.fileKey = Number(delList[a].attributes.filekey.value)
          }
          newAttachFileList.push(setObj)
        }
      }
      for (var i = 0; i < this.uploadFileList.length; i++) {
        // eslint-disable-next-line no-new-object
        setObj = new Object()
        if (this.uploadFileList[i].successSave) {
          setObj.addYn = true
          if (this.uploadFileList[i].attachYn) {
            setObj.attachYn = this.uploadFileList[i].attachYn
          } else {
            setObj.attachYn = false
          }
          setObj.mFilekey = this.propData.attachMfilekey
          setObj.fileKey = this.uploadFileList[i].fileKey
          setObj.fileName = (this.uploadFileList[i])[0].file.name
          newAttachFileList.push(setObj)
        }
      }
      // eslint-disable-next-line no-debugger
      debugger
      console.log(newAttachFileList)
      return newAttachFileList
    },
    async sendMsg () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      console.log('업로드할 개수는!!!' + this.uploadFileList.length)
      if (this.uploadFileList.length > 0) {
        this.checkPopYn = false
        this.progressShowYn = true
        await this.uploadFile()
        setTimeout(() => {
          this.progressShowYn = false
        }, 2000)
        this.sendLoadingYn = true
      } else {
        this.sendLoadingYn = true
      }
      param.attachFileList = await this.setAttachFileList()
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
        // var text = this.encodeUTF8(document.getElementById('textMsgBox').innerHTML)
        // innerHtml = text
      }
      param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')

      param.jobkindId = 'BOAR'
      param.cabinetKey = this.propData.cabinetKey
      param.creTeamKey = this.propData.currentTeamKey
      param.actorList = this.propData.actorList

      if (this.propData.attachMfilekey) {
        param.attachMfilekey = this.propData.attachMfilekey
      }
      // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
      // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
      if (this.propData.nonMemYn) {
        param.creUserName = this.nonMemUserName
        param.creUserKey = 0
      } else {
        param.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      }

      param.cabinetName = this.propData.cabinetNameMtext
      param.title = this.writePushTitle
      param.showCreNameYn = true

      if (this.modiYn) {
        param.contentsKey = this.propData.modiContentsKey
      }
      var result = await this.$saveContents(param)
      if (result.result === true) {
        this.sendLoadingYn = false
        // eslint-disable-next-line no-new-object
        var newP = new Object()
        newP.targetKey = result.contentsKey
        newP.targetType = 'boardDetail'
        newP.cabinetNameMtext = this.propData.cabinetNameMtext
        newP.value = this.propData
        this.progressShowYn = false
        if (!this.modiYn) {
          this.$emit('successWrite', newP)
        } else {
          this.$emit('closeXPop', true)
        }
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
    async uploadFile () {
      if (this.uploadFileList.length > 0) {
        console.log('this.uploadFileList')
        console.log(this.uploadFileList)
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          thisthis.uploadFileList[i].percentage = 0
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].filePath = Base64.decode(thisthis.uploadFileList[i].filePath.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (thisthis.uploadFileList[i])[0].file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('fileServer/tp.uploadFile', form,
              {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              },
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(res => {
              console.log(res)
              // eslint-disable-next-line no-debugger
              debugger
              if (res.data.length > 0) {
                if ((this.uploadFileList[i])[0].attachYn === true) {
                  this.uploadFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].pathMtext
                this.uploadFileList[i].successSave = true
                this.uploadFileList[i].filePath = path
                this.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              console.log(error)
            })
          /* } */
          // var selFile = this.selectFileList[i].file
        }
        console.log(this.uploadFileList)
        var iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            console.log('여기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            console.log(uploadFile)
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                if (!uploadFile[0].attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  iList[il].src = uploadFile.filePath
                  // eslint-disable-next-line no-unused-vars
                  iList[il].setAttribute('fileKey', uploadFile.fileKey)
                  iList[il].setAttribute('fileSizeKb', uploadFile.fileSizeKb)
                  iList[il].classList.remove('addTrue')
                  iList[il].classList.add('addFalse')
                  break
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
    }
  },

  components: {
    commonConfirmPop,
    formEditor,
    progressBar,
    attachFileList
    // msgPop,
    // writePushPageTitle,
    // pushPop
  }
}
</script>
<style scoped>
.whitePaperBoard {
      /* position: relative;
      width: 100%;
      margin: 0 auto;
      margin-top: 1rem; */
      position: absolute;
      left: 50%;
      top: 47%;
      transform: translate(-50%, -50%);
      /* width: 100%; */
      width: 90%;

      border-radius: 0.8rem;
      /* height: calc(100% - 60px); */
      min-height: 500px;
      /* height: 90%; */
      height: 85%;
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

  .whitePaperBoard:after {
      content: '';
      position: absolute;
      display: block;
      width: 50px;
      height: 50px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
  .whitePaperBoard:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-bottom: 50px solid #7373734f;
  border-right: 50px solid #F9F9F9;
  width: 0;
}

/* add by_jeong */
.pageMsgArea{ height: 100px; min-height: 200px; float: left; height: calc(100% - 14rem); width: 100%; }
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{font-size: 15px; color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; height:calc(100%); border:1px solid #BFBFDA; border-radius: 5px; background-color: white;font-size: 15px;}

.writeBoardPageTopArea{
  width: 100%; height: 3rem;
}
.writeBoardPageTopArea >div{
  width: 100%; min-height: 2.5rem;
}
.writeBoardPageTopArea p{width: 60px; font-size: 15px; color: #3A3A3A; float: left; line-height: 30px;}
.writeBoardPageTopArea input{font-size: 15px;}
.writeBoardPageTopArea .inputArea{width: calc(100% - 60px); box-sizing: border-box;  overflow: hidden;}

.editorOption{display: flex; flex-direction: column; border-right: 1px solid #BFBFDA; width: 100px;}
.editorOption > div {height: 50px; text-align: center; padding: 0.5rem; cursor: pointer;}
.activeColor{background: #EFEFF6;}
.activeColor p{color: #6768A7!important;}
.editorOption p{color: #6768A7; color: #BFBFDA; font-size: 11px;}

/* .writeArea{padding: 2rem 0; width: 100%; float: left; height: calc(100% - 5rem); min-height: 600px;     height: 100%; margin-top: 0rem; float: left; background:#0000005e; padding-top: 0;} */
.writeArea{padding: 2rem 0; width: 100%; float: left;min-height: 650px; height: 100%; margin-top: 0rem; float: left; background:#0000005e; padding-top: 0; overflow: hidden; position: relative;}
/* .writeArea{padding: 2rem 0; width: calc(100% - var(--width)); float: left; height: calc(100% - 2rem); margin-top: 0rem; float: left; background:#F9F9F9; padding-top: 0;} */
/* .boardWritePaperBack{width: 100%; 100%; position: relative; margin: 0 auto; padding: 2rem 2rem; border-radius: 10px 10px 0 0;} */
.boardWritePaperBack{width: 100%; min-height: 500px; height:100%; position: absolute; top:0; left:0 }

.changePaperBtn{border: 1px solid #FFFFFF; position: absolute; top: 1.5rem; right: 2rem;}
.latestPushBtn{float: right!important; position: absolute; right: 1.5rem; margin-top: 0.5rem;}
.boardInputArea{height: 100%; width: 100%;}

.boardInputArea .pageTopInputArea{border: 1px solid #BFBFDA; border-radius: 5px; height: 30px; float: left; position: relative; }

.msgArea span {padding: 0;}
#loading {
  width: 100%;
  height: 100%;
  position: absolute;
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

@media screen and (max-width: 300px) {
  .boardWriteTitleText {
    display: none !important;
  }
  .writeBoardPageTopArea .inputArea{width: calc(100%);}
}
.writeBoardBtn{
position: absolute; left:50%; bottom: 0; transform: translateX(-50%);
 width: 30% !important; min-width: 100px !important; max-width: 250px; height: 6% !important; font-size: 16px; display: flex; justify-content: center; align-items: center;
}
</style>
