<template>
  <!-- <pushPop v-if='testpopYn' @no='testpopYn = false' :detailVal='"1000001"' /> -->
  <!-- <div class="w-100P" style=" height:100vh;top: 50px; position: absolute; overflow:auto"> -->
    <div class="w-100P" style=" height:100vh;top: 0; position: absolute; overflow:auto">
    <div style="min-height: 400px; height: 100%;">
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <gConfirmPop :confirmText="modiYn? '게시글을 수정 하시겠습니까?' : '게시글을 저장하시겠습니까?'" @no='confirmNo(), checkPopYn=false' v-if="checkPopYn" @ok='sendMsg(), checkPopYn=false' />
      <gConfirmPop @click="this.$emit('closeXPop', true)" confirmText='저장 되었습니다.' confirmType='timeout' v-if="okPopYn" />
      <div :style="toolBoxWidth" class="writeArea">
        <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
        <!-- <div class="boardWritePaperBack" @click="this.$emit('closeXPop')"></div> -->
        <div class="boardWritePaperBack" ></div>
          <div class="whitePaperBoard" :style="viewTab === 'complex' ? 'height: 80%' : ''">
            <div class="overFlowYScroll boardInputArea">
              <div class="w-100P fl" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #ccc; padding-bottom:0.5rem;">
                <p class="fontBold commonColor font20 fl">{{this.modiYn?'게시글 수정' : '게시글 작성'}}</p>
                <img style="width: 1rem;" @click="this.$emit('closeXPop')" class="mleft-1 fr cursorP"  src="../../assets/images/common/popup_close.png"/>
              </div>
              <div style="width: 100%; height: calc(100% - 39px); float: left; padding-top:1.5rem; overflow: hidden auto; ">
                <div v-if="selectBoardYn === true" class="w-100P fl " >
                  <p class="fontBold font15 fl ">게시판을 선택 해주세요</p>
                  <p class="font12 fl mleft-05 fontBold" :style="selectBoardCabinetKey !== null ? 'color:#6768a7' : 'color:red'">{{writeBoardPlaceHolder}}</p>
                  <div class="w-100P fl" style="margin:0.5rem 0; overflow: auto; white-space: nowrap;">
                    <div v-for="(data, index) in selectBoardList" :key="index" class=" mleft-05 font12 fontBold" @click="selectBoard(data, index)" style="padding:5px; border-radius:10px; display: inline-flex;" :style="'background:'+data.picBgPath" :class="{selectBoard : selectBoardIndex === index}">
                      <!-- <img class="img-w20" v-if="selectBoardIndex === index" src="../../assets/images/common/icon_check_commonColor.svg" alt=""> -->
                      <input type="radio" :id="'selectBoardCheckBox'+index" name="selectBoardCheckBox" style="line-height:18px">
                      <label class="mleft-03" :for="'selectBoardCheckBox'+index">{{this.$changeText(data.cabinetNameMtext)}}</label>

                    </div>
                  </div>
                </div>
                <div class="writeBoardPageTopArea font15">
                  <div class=""><p class="boardWriteTitleText font15 fontBold commonColor" style="">제목</p><input type="text" id="pushTitleInput" placeholder="제목을 입력해주세요" class="font15 pageTopInputArea font15 inputArea fl" v-model="writePushTitle" style="background-color:white" name="" ></div>
                  <div class="" v-if="propData.nonMemYn"><p class="font15 boardWriteTitleText" style="">문의자</p><input type="text" id="pushTitleInput" placeholder="이름을 입력해주세요" class="pageTopInputArea font15 inputArea fl" v-model="nonMemUserName" style="background-color:white" name="" ></div>
                  <div v-show="fileYn" style="float: left; width: 100%; padding: 10px 0; padding-top: 0; min-height: 50px;">
                    <div style="width: 100%; min-height: 30px;">
                      <!-- <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width: 23px; margin-top: 6px; float: left;" alt=""> -->
                      <p class="boardWriteTitleText fontBold font15 fl commonColor" style="margin-top: 4px;">첨부파일</p>
                      <attachFileList style="min-width:80px;" :attachTrueAddFalseList="attachTrueFileList" @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
                    </div>
                  </div>
                </div>
                <gActiveBar modeType="write" :tabList="this.activeTabList" ref="activeBar" style="" class="mbottom-05 fl mtop-1" @changeTab= "changeTab" />
                <div id="pageMsgBoardAreaWrap" class="pageMsgArea" style="">
                  <!-- <p class="">내용</p> -->
                  <pre id="textMsgBox" class="editableContent"  v-show="viewTab === 'text'" style="padding:7px; word-break: break-all; min-height: 300px; overflow: hidden scroll; width: 100%; height: 100%; border-radius: 5px; border: 1px solid #6768a745; text-align: left; background: #fff; " contenteditable=true></pre>
                  <formEditor ref="complexEditor" @changeUploadList="changeUploadList" v-show="viewTab === 'complex'" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" />
                  <div id="msgBox" @click="formEditorShowYn = true" v-show="previewContentsShowYn"  class="msgArea font15" style="padding:7px; overflow: hidden scroll;" >클릭하여 내용을 작성해주세요</div>

                </div>

                <!-- <gBtnSmall class="commonColor writeBoardBtn font16" style="font-weight:bold; font-size: 16px; bottom: 1rem; margin-top: 20px; margin-bottom: 60px;" btnTitle='작성하기' @click="clickPageTopBtn()" /> -->
              </div>
          </div>

          </div>
          <gBtnSmall class="mright-05 font20 writePushBtn " style="position: absolute; bottom:2%; left:50%; transform: translateX(-50%); border: 4px solid #D6D6E7;" :style="viewTab === 'complex' ? 'bottom: 7.5%;' : ''" :btnTitle="modiYn === true ? '수정하기' : '게시하기'" @click="clickPageTopBtn()" />
          <!-- <gBtnSmall class="mright-05 font20 writePushBtn commonColor whitePurpleBG" style="color:#6768a7; font-weight:bold; " btnTitle='발송하기' @click="clickPageTopBtn()" /> -->
      </div>
    </div>
      <!--<div id="toolBox" :style="toolBoxWidth"  v-if="this.toolShowYn" style="padding: 1rem; float: left; width: var(--width); height: 100%; background: #FFFFFF;"> -->
      <!-- <msgPop @no='popNo' v-if="msgPopYn" @save='popSave' :propMsgData='msgData'/> -->
  </div>  <!-- v-if="progressShowYn" -->
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
  <!-- <div v-if="formEditorShowYn" style="position: absolute; top: 0; left: 0; width: 100%; background: #fff; height: 100vh; z-index: 99999999999999999999">
    <popHeader @closeXPop="this.formEditorShowYn = false" class="commonPopHeader" :headerTitle="this.modiYn?'블로그형 작성' : '블로그형 작성'" />
    <formEditor @changeUploadList="changeUploadList" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" />
  </div> -->
</template>
<script>
import commonConfirmPop from '@/components/popup/confirmPop/Tal_commonConfirmPop.vue'
import formEditor from '@/components/unit/formEditor/Tal_formEditor.vue'
import progressBar from '@/components/popup/common/Tal_commonProgressBar.vue'
import attachFileList from '@/components/unit/formEditor/Tal_attachFile.vue'
// import { nextTick } from '@vue/runtime-core'
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
    document.querySelector('#pageMsgBoardAreaWrap').addEventListener('paste', (e) => {
      var items = (e.clipboardData || e.originalEvent.clipboardData).items
      for (const i of items) {
        var item = i
        if (item.type.indexOf('image') !== -1) {
          this.$refs.activeBar.switchtab(1)
          this.viewTab = 'complex'
          /* this.editorType = 'complex' */
          var file = item.getAsFile()
          this.handleImageUpload(file)
          // console.log(file)
          // uploadFile(file);
        }
      }
      e.preventDefault()
      var textData = (e.originalEvent || e).clipboardData.getData('Text')
      document.execCommand('insertHTML', false, textData)
    })
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
      // console.log(this.propData.parentAttachTrueFileList)
      // this.formEditorShowYn = true
    } else {
      document.getElementById('textMsgBox').innerHTML = this.$findATagDelete(this.bodyString)
    }
    if (this.propData.parentAttachTrueFileList && this.propData.parentAttachTrueFileList.length > 0) {
      this.addFalseList = [
        ...this.addFalseList,
        ...this.propData.parentAttachTrueFileList
      ]
    }
    // console.log(this.addFalseList)

    if (this.propData.selectBoardYn === true) {
      this.selectBoardYn = true
      this.getTeamMenuList()
    }
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
      delAddFalseFileList: [],
      complexOkYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      selectBoardIndex: null,
      selectBoardCabinetKey: null,
      writeBoardPlaceHolder: '',
      fileYn: false
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
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
      if (this.propData.UseAnOtherYn) {
        this.bodyString = this.propData.bodyFullStr
        this.selectBoardYn = true
      } else {
        this.bodyString = this.decodeContents(this.propData.bodyFullStr)
        // console.log('WOW!!!!' + this.decodeContents(this.bodyString))
        this.modiYn = true
      }
    }
    if (this.propData.parentAttachTrueFileList && this.propData.parentAttachTrueFileList.length > 0) {
      this.attachTrueFileList = this.propData.parentAttachTrueFileList
    }
    if (this.propData.titleStr) {
      this.writePushTitle = this.propData.titleStr
    }

    this.getCabinetDetail(this.propData.cabinetKey)
  },
  methods: {
    async getCabinetDetail (cabinetKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      var response = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.getCabinetDetail',
        param: Object.fromEntries(paramMap)
      })
      var mCabinet = response.data.mCabinet
      // console.log(mCabinet)
      this.fileYn = mCabinet.fileYn
      return mCabinet
    },
    async selectBoard (data, index) {
      this.selectBoardIndex = index

      // var paramMap = new Map()
      // paramMap.set('teamKey', this.propData.currentTeamKey)
      // paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      // paramMap.set('cabinetKey', data.cabinetKey)
      // paramMap.set('sysCabinetCode', 'BOAR')
      // paramMap.set('shareType', 'W')
      // paramMap.set('userKey', this.GE_USER.userKey)
      // // console.log(paramMap)
      // var response = await this.$commonAxiosFunction({
      //   url: 'https://mo.d-alim.com:9443/service/tp.getCabinetDetail',
      //   param: Object.fromEntries(paramMap)
      // })
      var mCabinet = await this.getCabinetDetail(data.cabinetKey)
      var mCabinetShare = mCabinet.mShareItemList
      // console.log(mCabinetShare)
      if (mCabinetShare[0]) {
        if (mCabinetShare[0].shareType) {
          this.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
          this.cabinetName = data.cabinetNameMtext
          this.writeBoardPlaceHolder = ''
        } else {
          this.selectBoardCabinetKey = null
          this.writeBoardPlaceHolder = '권한없음'
        }
      } else {
        this.selectBoardCabinetKey = null
        this.writeBoardPlaceHolder = '권한없음'
      }
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey || this.propData.creTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      var result = await this.$getTeamMenuList(paramMap)
      this.selectBoardList = result
      if (this.selectBoardList.length > 0) {
        this.$nextTick(() => {
          document.getElementById('selectBoardCheckBox0').checked = true
          this.selectBoard(this.selectBoardList[0], 0)
        })
      }
      // console.log(result)
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
      /* this.formEditorShowYn = false */
      this.complexOkYn = true
      this.clickPageTopBtn()
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
      // console.log(imgItemList)
      // console.log(this.addFalseList)
      // console.log(this.delAddFalseFileList)
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
      // console.log(delList)
      // eslint-disable-next-line no-array-constructor
      var newAttachFileList = new Array()
      // eslint-disable-next-line no-new-object
      var setObj = new Object()
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
      // console.log(this.addFalseList)
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
      // console.log(newAttachFileList)
      return newAttachFileList
    },
    async sendMsg () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // console.log('업로드할 개수는!!!' + this.uploadFileList.length)
      this.sendLoadingYn = true
      this.checkPopYn = false
      try {
        if (this.uploadFileList.length > 0) {
          this.progressShowYn = true
          await this.uploadFile()
          setTimeout(() => {
            this.progressShowYn = false
          }, 2000)
        }
        param.attachFileList = await this.setAttachFileList()
        var innerHtml = ''
        if (this.viewTab === 'complex') {
          param.bodyHtmlYn = true
          var formList = document.querySelectorAll('#msgBox .formCard')
          if (formList) {
            for (var f = 0; f < formList.length; f++) {
              formList[f].contentEditable = false
              // formlist중 Text component만 찾아서 http로 시작하는 url에 a태그 넣어주기
              if (formList[f].id === 'formEditText') {
                var formTextinnerHtml = formList[f].innerHTML
                formList[f].innerHTML = this.$findUrlChangeAtag(formTextinnerHtml)
              }
            }
            param.getBodyHtmlYn = true
          }
          innerHtml = document.getElementById('msgBox').innerHTML
        } else if (this.viewTab === 'text') {
          param.bodyHtmlYn = false
          document.querySelectorAll('#textMsgBox')[0].contentEditable = false
          innerHtml = document.getElementById('textMsgBox').innerHTML
          innerHtml = this.$findUrlChangeAtag(innerHtml)

          // innerHtml = document.getElementById('textMsgBox').innerHTML
          // var text = this.encodeUTF8(document.getElementById('textMsgBox').innerHTML)
          // innerHtml = text
        }
        param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')

        param.jobkindId = 'BOAR'
        if (this.selectBoardYn === true) {
          param.cabinetKey = this.selectBoardCabinetKey
          param.actorList = []
        } else {
          param.cabinetKey = this.propData.cabinetKey
          param.actorList = this.propData.actorList
        }
        param.onlyManagerYn = false
        // 12006
        if (param.cabinetKey === this.$DALIM_ORYU_CAB_KEY) {
          param.onlyManagerYn = true
        }
        param.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
        if (this.propData.attachMfilekey) {
          param.attachMfilekey = this.propData.attachMfilekey
        }
        // param.creTeamKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
        // param.creTeamNameMtext = JSON.parse(localStorage.getItem('sessionTeam')).nameMtext
        if (this.propData.nonMemYn) {
          param.creUserName = this.nonMemUserName
          param.creUserKey = 0
        } else {
          param.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
          param.creUserKey = this.GE_USER.userKey
        }

        param.cabinetName = this.propData.cabinetNameMtext || this.cabinetName
        // console.log(param)

        param.title = this.writePushTitle
        param.showCreNameYn = true

        if (this.modiYn) {
          param.contentsKey = this.propData.modiContentsKey
        }
        var result = await this.$saveContents(param)
        if (result.result === true) {
          var newParam = {}
          newParam.contentsKey = result.contents.contentsKey
          newParam.jobkindId = 'BOAR'
          await this.$getContentsList(newParam).then(newReslute => {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
          })
          this.progressShowYn = false
          // eslint-disable-next-line no-new-object
          var newP = new Object()
          newP.targetKey = result.contents.contentsKey
          newP.teamKey = result.contents.creTeamKey
          newP.contentsKey = result.contents.contentsKey
          newP.targetType = 'contentsDetail'
          newP.popHeaderText = result.contents.cabinetName
          newP.cabinetNameMtext = result.contents.cabinetName
          newP.jobkindId = 'BOAR'
          newP.value = this.propData
          newP.cabinetKey = result.contents.cabinetKey

          if (!this.modiYn && !this.UseAnOtherYn) {
            this.$emit('successWrite', newP)
          }
        }
      } catch (error) {
        console.error(error)
        // this.$showToastPop('일시적인 오류로 발송하지 못했습니다. 잠시 후 다시 시도해주세요.')
      } finally {
        this.$emit('closeXPop', true)
        this.sendLoadingYn = false
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
    confirmNo () {
      this.complexOkYn = false
    },
    async clickPageTopBtn () {
      if (this.viewTab === 'complex' && this.complexOkYn === false) {
        this.complexOkYn = true
        this.$refs.complexEditor.setParamInnerHtml()
      } else {
        var title = this.writePushTitle
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          this.errorText = '제목을 입력해주세요'
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        var msgData = ''
        if (this.viewTab === 'complex') {
          msgData = document.getElementById('msgBox').innerText
        } else if (this.viewTab === 'text') {
          msgData = document.getElementById('textMsgBox').innerText
        }
        msgData = msgData.trim()
        if ((msgData !== undefined && msgData !== null && msgData !== '') || this.uploadFileList.length > 0) {
        } else {
          this.errorText = '게시글의 내용을 입력해주세요'
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        if (this.selectBoardYn === true) {
          if (this.selectBoardIndex !== undefined && this.selectBoardIndex !== null && this.selectBoardIndex !== '') {
            if (this.selectBoardCabinetKey === null) {
              this.errorText = '해당 게시판에 작성 권한이 없습니다. 다른 게시판을 선택해주세요.'
              this.failPopYn = true
              this.complexOkYn = false
              return
            }
          } else if (this.selectBoardIndex === undefined || this.selectBoardIndex === null || this.selectBoardIndex === '') {
            this.errorText = '게시글을 작성할 게시판을 선택해주세요.'
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
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
        // console.log('this.uploadFileList')
        // console.log(this.uploadFileList)
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          this.uploadFileList[i].percentage = 0
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].filePath = Base64.decode(thisthis.uploadFileList[i].filePath.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (this.uploadFileList[i])[0].file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://m.passtory.net:7443/fileServer/tp.uploadFile', form,
              {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              },
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              // console.log(res)
              if (res.data.length > 0) {
                if ((thisthis.uploadFileList[i])[0].attachYn === true) {
                  thisthis.uploadFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                thisthis.uploadFileList[i].successSave = true
                thisthis.uploadFileList[i].filePath = path
                thisthis.uploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                thisthis.uploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              console.log(error)
            })
          /* } */
          // var selFile = this.selectFileList[i].file
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
                  }
                }
              }
            } else {
              this.uploadFileList.splice(s, 1)
            }
          }
        }
      } else {
        this.$showToastPop('파일을 선택해 주세요.')
      }
      return true
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
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        console.log('originalFile instanceof Blob', file instanceof Blob) // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`)

        try {
          // eslint-disable-next-line no-undef
          var compressedFile = await this.$imageCompression(file, options)
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
          this.$refs.complexEditor.successImgPreview({ selectFileList: { previewImgUrl: src, addYn: true, file: newFile }, originalType: 'image' })
          this.$refs.complexEditor.addFormCard('image', src, true)
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
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        // FileReader 를 활용하여 파일을 읽는다
        var reader = new FileReader()
        var thisthis = this
        reader.onload = e => {
          var image = new Image()
          image.onload = async function () {
            var result = await thisthis.$saveFileSize(image, file)
            thisthis.$refs.complexEditor.successImgPreview({ selectFileList: [{ previewImgUrl: result.path, addYn: true, file: result.file }], originalType: 'image' })
            thisthis.$refs.complexEditor.addFormCard('image', result.path, true)
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
      /* if (thisthis.$refs.selectFile.files.length > 1) {
        thisthis.$emit('setMultiFile', thisthis.selectFileList)
      } */
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
/*  .whitePaperBoard:after {
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
} */

/* add by_jeong */
.pageMsgArea{ min-height: 200px; float: left; width: 100%; }
/* .pageMsgArea{ min-height: 500px; height: calc(100% - 10rem);width: 100%; } */
.pageMsgArea p{color: #3A3A3A;  line-height: 30px; }
.pageMsgArea .msgArea{ width:100%; height:calc(100%); border:1px solid #BFBFDA; border-radius: 5px; background-color: white;}

.writeBoardPageTopArea{
  width: 100%; height: 3rem;
}
.writeBoardPageTopArea >div{
  width: 100%; min-height: 2.5rem;
}
.writeBoardPageTopArea p{width: 60px; float: left; line-height: 30px;}
.writeBoardPageTopArea .inputArea{width: calc(100% - 60px); box-sizing: border-box;  overflow: hidden;}

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

input[name="selectBoardCheckBox"] {
  accent-color: #6768a7;
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

.writePushBtn{
 float: left; margin: 0 auto!important; margin-top: 20px !important; width: 30% !important; min-width: 100px !important; max-width: 250px; height: 6% !important; font-size: 16px; display: flex; justify-content: center; align-items: center;
}
@media screen and (max-width: 300px) {
  .boardWriteTitleText {
    display: none !important;
  }
  .writeBoardPageTopArea .inputArea{width: calc(100%);}
}
.writeBoardBtn{
 width: 30% !important; min-width: 100px !important; max-width: 250px; height: 6% !important; display: flex; justify-content: center; align-items: center;
}
</style>
