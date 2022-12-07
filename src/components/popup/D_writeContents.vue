<template>
<!-- <div style="width: 100%; float: left;"> -->
  <div class="whitePaper">
      <!-- 컨텐츠 작성 헤더 영역 -->
      <div class="w-100P fl" style="padding: 1rem 1.5rem 0 1.5rem; display: flex; flex-direction: column; align-items: flex-start;">
        <div class="fl w-100P" style="display: flex; align-items: center; justify-content: space-between;">
          <p v-if="contentType === 'ALIM'" class="fontBold commonColor font20 fl">알림{{requestPushYn === false ? '작성' : '신청' }}</p>
          <p v-if="contentType === 'BOAR'" class="fontBold commonColor font20 fl">게시글{{modiYn?'수정' : '작성'}}</p>
          <div class="fr" style="display: flex; flex-direction: row; align-items: center;">
            <gBtnSmall class="writeContenBtn" v-if="contentType === 'ALIM'"   :btnTitle="contentType === 'ALIM' && requestPushYn === false ? '발송하기' : '신청하기'" @click="clickPageTopBtn()"  />
            <gBtnSmall class="writeContenBtn" v-if="contentType === 'BOAR'"   :btnTitle="contentType === 'BOAR' && modiYn === true ? '수정하기' : '게시하기'" @click="boardDataCheck()"   />
            <img style="width: 1rem;" @click="closeXPop" class="mleft-2 fr cursorP"  src="../../assets/images/common/popup_close.png"/>
          </div>
        </div>
        <div class="fl mtop-05" style="width:100%; border-bottom: 2px solid #5F61BD;"></div>
      </div>
      <div class="fl w-100P h-100P" id="scrollFormArea" ref="scrollFormArea" style="overflow: hidden auto">
        <!-- 알림 영역 -->
        <template v-if="contentType === 'ALIM'">
          <div class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
            <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">수신</p>
            <div class="fl" style="min-height: 2rem; float: left; width: calc(100% - 3.5rem);" v-if="!params.userKey">
              <checkBtnArea class="mleft-05" title='전체' :selectedYn='allRecvYn' @click="allRecvYn = true" />
              <checkBtnArea class="mleft-05" title='선택' :selectedYn='!allRecvYn' @click="allRecvYn = false" />
              <p class="fr commonDarkGray font14" style="line-height: 30px;">{{allRecvYn === false ? receiverText : '전체' }}</p>
              <div v-if="!allRecvYn" class="fl w-100P textLeft mleft-05 mtop-05" @click="openPushReceiverSelect" style="border:1px solid #ccc; border-radius:8px; min-height: 30px; background: white; padding-left: 5px; display: flex; justify-content: space-between; align-items: center;">
                <div v-if="this.receiverList.list && this.receiverList.list.length > 0" class="fl w-100P">
                  <div v-for="(value, index) in this.receiverList.list" :key="index" class="fl mright-1" style="display: flex;">
                    <img v-if="value.type === 'BOOK' && !value.memberYn" class="img-w15 fl" src="../../assets/images/channel/channer_addressBook.svg" alt="">
                    <img v-if="value.type === 'BOOK' && value.memberYn" class="img-w15 fl" src="../../assets/images/common/memberIcon.svg" alt="">
                    <img v-if="value.type === 'USER'" class="img-w15 fl" src="../../assets/images/footer/icon_people.svg" alt="">
                    <p class="fl font14 mleft-01 commonDarkGray">{{value.name}}</p>
                  </div>
                </div>
                <p class='font12 fl' style="color:#aaa; " v-else >알림을 보낼 대상을 선택해주세요.</p>
                <!-- 이미지 임시!!! -->
                <!-- <img class="fr img-w17 mright-05"  src="../../assets/images/push/plusIcon.svg" /> -->
                <img class="fr img-w17 mright-05"  src="../../assets/images/formEditor/icon_formEditPlus.svg" />
              </div>
            </div>
            <p v-else class="fl w-100P font16 textLeft commomBlack">
              <img src="../../assets/images/footer/icon_people.svg" class="fl img-w15 mtop-02 mleft-05 mright-03" alt="">
              {{params.userName}}
              </p>
          </div>

          <div class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
            <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">옵션</p>
            <div style="min-height: 2rem; float: left;">
              <checkBtnArea class="mleft-05" title='실명' :selectedYn='showCreNameYn' @click="showCreNameYn = !showCreNameYn" />
              <checkBtnArea class="mleft-05" title='댓글' :selectedYn='canReplyYn' @click="canReplyYn = !canReplyYn" />
              <checkBtnArea class="mleft-05" title='제목' :selectedYn='titleShowYn' @click="titleShowYn = !titleShowYn" />
            </div>
          </div>
        </template>

        <!-- 게시판 영역 -->
        <template v-if="contentType === 'BOAR'">
          <div v-if="selectBoardYn === true" class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
            <p class="fontBold commonColor CDeepColor font16 fl mright-05" style="word-break: keep-all; position: relative;">게시판<pss class="font12 fl" style="position: absolute; left: 0; bottom: -1rem;" :style="selectBoardCabinetKey !== null ? 'color:#6768a7' : 'color:red'">{{writeBoardPlaceHolder}}</pss></p>
            <!-- <p class="font12 fl mleft-05 fontBold" :style="selectBoardCabinetKey !== null ? 'color:#6768a7' : 'color:red'">{{writeBoardPlaceHolder}}</p> -->
            <div class="fl " style=" width: calc(100% - 3.5rem); height: 2rem; overflow: auto; white-space: nowrap; display: flex; align-items: center" >
              <div v-for="(data, index) in selectBoardList" :key="index" class="fl mleft-05 font12 fontBold" @click="selectBoard(data, index)" style=" border-radius:10px; display: inline-flex;" :style="{background: data.picBgPath}" :class="{'CDeepBorderColor selectPadding' : selectBoardIndex === index, 'noneSelectPadding' : selectBoardIndex !== index, 'mleft-0': index === 0}">
                <div class="fl"> <img class="img-w15" v-if="selectBoardIndex === index" src="../../assets/images/common/icon_check_commonColor.svg" /></div>
                <label class="mleft-03 font14"  :class="{'commonColor selectBoardBorder' : selectBoardIndex === index}" :for="'selectBoardCheckBox'+index">{{this.$changeText(data.cabinetNameMtext)}}</label>
              </div>
            </div>
          </div>
        </template>

        <!-- 공통 영역 -->
        <div v-if="titleShowYn" class="fl w-100P mtop-1" style="display: flex; align-items: center; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">제목</p>
          <input class="fl mleft-05 titlePlaceholder" style="width: calc(100% - 3.5rem); min-height:30px; background-color:white !important;" type="text" v-if="titleShowYn" id="pushTitleInput" placeholder="알림 제목을 입력해주세요" v-model="writePushTitle" >
        </div>

        <div class="fl w-100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
          <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">파일</p>
          <div style="width: calc(100% - 3.5rem); min-height: 30px; " class="fl mleft-05">
            <attachFileList @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
          </div>
        </div>

      <!-- 작성 창 영역 -->
      <div id="pageMsgAreaWrap" class="pageMsgArea mtop-1 w-100P fl" style=" padding: 0px 1.5rem 0rem 1.5rem; ">
        <formEditor style="margin-top:1rem; margin-bottom: 1rem;" class="fl" ref="complexEditor" @changeUploadList="changeUploadList" :editorType="this.editorType" :propFormData="propFormData" @setParamInnerHtml="setParamInnerHtml" @setParamInnerText="setParamInnerText" @postToolBox='postToolBox'/>
        <div @click="formEditorShowYn = true" v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>
      </div>
    </div>

  </div>
  <gToolBox :propTools='mToolBoxOptions' @changeTextStyle='changeFormEditorStyle' />

  <commonConfirmPop v-if="failPopYn" @no="failPopYn = false" confirmType="timeout" :confirmText="errorText" />
  <gConfirmPop v-if="contentType === 'ALIM' && checkPopYn" :confirmText="'알림을 ' + (requestPushYn === false ? '발송' : '신청') + ' 하시겠습니까?'" @ok='sendMsg(), checkPopYn=false' @no='confirmNo()' />
  <gConfirmPop v-if="contentType === 'BOAR' && checkPopYn" :confirmText="modiYn? '게시글을 수정 하시겠습니까?' : '게시글을 저장하시겠습니까?'" @ok='sendBoard(), checkPopYn=false' @no='confirmNo()'   />
  <gConfirmPop @no="closeXPop()" :confirmText="contentType === 'ALIM' ? '신청되었습니다.' : '저장 되었습니다.' " confirmType='timeout' v-if="okPopYn" />
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList"/>
  <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
<!-- </div> -->
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
      checkPopYn: false,

      modiYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      selectBoardIndex: null,
      selectBoardCabinetKey: null,
      writeBoardPlaceHolder: '',
      cabBlindYn: false,

      mToolBoxOptions: {}
    }
  },
  props: {
    propData: {},
    params: {},
    contentType: { type: String, default: 'ALIM' }
  },
  watch: {
    uploadFileList: {
      handler () {
        console.log(' ****************************** ')
        console.log(this.uploadFileList)
      },
      deep: true

    },
    receiverList () {
      console.log(' ^^^^^################## ')
      console.log(this.receiverList)
    }
  },
  created () {
    if (this.contentType === 'BOAR') this.titleShowYn = true
    this.screenInnerHeight = window.innerHeight
    this.screenInnerWidth = window.innerWidth
    // console.log('// console.log(this.params)// console.log(this.params)// console.log(this.params)// console.log(this.params)')
    console.log(this.params)
    if (this.params.bodyFullStr || this.propData.guideFullStr) {
      if (this.contentType === 'ALIM') {
        if (this.params.UseAnOtherYn) {
          // 게시글을 -> 알림 // 알림 -> 게시글을 할 땐 decode가 필요없기에 구분
          this.bodyString = this.decodeContents(this.params.bodyFullStr)
          if (this.params.titleStr) {
            this.titleShowYn = true
            this.writePushTitle = this.params.titleStr
          }
        } else {
          // 추후 수정이 있을 때
        }
      } else if (this.contentType === 'BOAR') {
        this.titleShowYn = true
        if (this.propData.UseAnOtherYn) {
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          this.selectBoardYn = true
        } else {
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          // console.log('WOW!!!!' + this.decodeContents(this.bodyString))
          this.modiYn = true
        }
        if (this.propData.guideFullStr) {
          // eslint-disable-next-line no-debugger
          debugger
          this.modiYn = false
          this.bodyString = this.decodeContents(this.propData.guideFullStr)
        }
        console.log(this.bodyString)
        if (this.propData.titleStr) {
          this.writePushTitle = this.propData.titleStr
        }
        this.getCabinetDetail(this.propData.cabinetKey)
      }
    }
    // alert(JSON.stringify(this.params))
    // alert(JSON.stringify(this.propData))
    if (this.params.userKey) {
      this.allRecvYn = false
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

    // if (this.propData.parentAttachTrueFileList && this.propData.parentAttachTrueFileList.length > 0) {
    //   this.addFalseList = [
    //     ...this.addFalseList,
    //     ...this.propData.parentAttachTrueFileList
    //   ]
    // }

    if (this.bodyString !== undefined && this.bodyString !== null && this.bodyString !== '') this.settingAlim()

    if (this.contentType === 'BOAR') {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      if (temp.getElementsByClassName('formCard').length > 0) {
        // this.$refs.activeBar.switchtab(1)
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
        this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
        // console.log('this.propData.parentAttachTrueFileList')
        // console.log(this.propData.parentAttachTrueFileList)
        // this.formEditorShowYn = true
      }
      if (this.propData.selectBoardYn === true) {
        this.selectBoardYn = true
        if (!this.propData.initData) {
          this.getTeamMenuList()
        } else {
          // initData <- selectBoard에서도 구분하고 있음 수정 시 같이 봐야함!
          this.selectBoardList = this.propData.initData
          if (this.selectBoardList.length > 0) {
            console.log(this.selectBoardList[0])
            this.selectBoard(this.selectBoardList[0], 0)
          }
        }
      }
    }
  },
  methods: {
    changeFormEditorStyle (changeParam) {
      // toolbox에 기능 전부, 선택된 formEditor에 드레그 한 text로 처리를 하기에 ref로 접근해서 함수를 실행하고 있습니다.
      // bold, italic, underLine은 text만 넘겨줘도 기능이 작동하기에 따로 구분을 하지 않았습니다.
      var targetType = changeParam.type
      if (targetType === 'font') {
        this.$refs.complexEditor.changeFontSize(changeParam.size)
      } else if (targetType === 'delFormCard') {
        this.$refs.complexEditor.delFormCard()
      } else {
        this.$refs.complexEditor.changeTextStyle(targetType)
      }
    },
    postToolBox (toolBoxOption) {
      // toolbox에 들어간 option들을 formEditor에서 watch로 계속 넘겨받고 prop으로 넘겨주고 있습니다! -j
      this.mToolBoxOptions = toolBoxOption
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    async getCabinetDetail (cabinetKey) {
      var paramMap = new Map()
      console.log(this.propData)
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      // console.log(paramMap)
      var response = await this.$commonAxiosFunction({
        // url: 'service/tp.getCabinetDetail',
        url: 'service/tp.getCabinetListForMyShareType',
        param: Object.fromEntries(paramMap)
      }, true)
      console.log('!!!!!!!!!!!!!!!!!!!!!!@!@@@@@@@@@@@@@@@@@')
      console.log(response)
      var mCabinet = response.data.mCabinet
      // console.log(mCabinet)
      this.fileYn = mCabinet.fileYn
      return mCabinet
    },
    async selectBoard (data, index) {
      this.selectBoardIndex = index
      var mCabinet
      if (!this.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        console.log(mCabinet.mShareItemList)
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            this.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            this.cabinetName = data.cabinetNameMtext
            this.writeBoardPlaceHolder = ''
          } else {
            this.selectBoardCabinetKey = null
            this.writeBoardPlaceHolder = '권한없음'
            return
          }
        } else {
          this.selectBoardCabinetKey = null
          this.writeBoardPlaceHolder = '권한없음'
          return
        }
      } else {
        mCabinet = data
        this.selectBoardCabinetKey = mCabinet.cabinetKey
        this.cabinetName = mCabinet.cabinetNameMtext
      }
      // var cardList = document.querySelectorAll('.commonFormCard')
      if (mCabinet.guideFullStr) {
        this.$refs.complexEditor.addFormCard('text', this.decodeContents(mCabinet.guideFullStr))
      }
      if (mCabinet.blindYn) {
        this.cabBlindYn = true
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
      await this.$getTeamMenuList(paramMap).then((result) => {
        this.selectBoardList = result
        if (this.selectBoardList.length > 0) {
          // this.$nextTick(() => {
          // document.getElementById('selectBoardCheckBox0').checked = true
          console.log(this.selectBoardList[0])
          this.selectBoard(this.selectBoardList[0], 0)
          // })
        }
      })
      // console.log(result)
    },
    // gPopWrap에서 선택한 리스트가 넘겨주고 있음
    setSelectedList (obj) {
      // var mList = []
      // var bList = []
      // var myMList = []
      // var myBList = []
      console.log('2!@#!@#!@@@@@2222')
      console.log(obj)
      // if (this.receiverList.memberList !== undefined && this.receiverList.memberList !== null && this.receiverList.memberList.length > 0) {
      //   myMList = this.receiverList.memberList
      // }
      // if (this.receiverList.bookList !== undefined && this.receiverList.bookList !== null && this.receiverList.bookList.length > 0) {
      //   myBList = this.receiverList.bookList
      // }
      this.receiverList = obj
      // if (obj.bookList && obj.bookList.length > 0) {
      //   this.receiverList.bookList = obh
      // }
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
        temp.memberYn = this.receiverList.bookList[i].memberYn
        if (!this.receiverList.bookList[i].memberYn) {
          temp.name = this.$changeText(this.receiverList.bookList[i].cabinetNameMtext)
        } else {
          temp.name = this.$changeText(this.receiverList.bookList[i].nameMtext)
        }
        this.receiverList.list.push(temp)
      }
      this.list = []
      this.selectedReceiverList = []
      // this.receiverTotalNum = myMList.length + mList.length + myBList.length + bList.length
      // this.receiverText = ''
      this.setRecvText()
    },
    setRecvText () {
      var list = this.receiverList.list
      var uCount = 0
      var bCount = 0
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].type === 'USER') uCount += 1
        if (list[i].type === 'BOOK') bCount += 1
      }
      var a = (bCount > 0) ? '주소록' + bCount : ''
      var b = (bCount > 0 && uCount > 0) ? ', ' : ''
      var c = (uCount > 0) ? '유저' + uCount : ''
      this.receiverText = a + b + c
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
      if (this.contentType === 'ALIM') this.clickPageTopBtn()
      if (this.contentType === 'BOAR') this.boardDataCheck()
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
        if (this.allRecvYn === true) {} else {
          await this.settingRecvList()
          if (this.selectedReceiverList.length > 0) {
          } else {
            if (!this.params.userKey) {
              this.errorText = '수신자를 선택해주세요'
              this.failPopYn = true
              this.complexOkYn = false
              return
            }
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
    boardDataCheck () {
      if (this.complexOkYn === false) {
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
        msgData = document.getElementById('msgBox').innerText
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

    changeUploadList (upList) {
      // console.log(upList)
      // upList.selectFileList.targetKey = upList.targetKey
      if (this.uploadFileList.length > 0) {
        var index = this.uploadFileList.findIndex(item => item.targetKey === upList.targetKey)
        // console.log(index)
        if (index === -1) {
          var temp = this.uploadFileList
          this.uploadFileList = []
          this.uploadFileList = [
            ...temp,
            upList
          ]
        } else if (index !== -1) {
          this.uploadFileList.splice(index, 1, upList)
        }
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
      if (formC && formC.length === 0) {
        var firstSettingDiv = document.createElement('div')
        firstSettingDiv.classList.add('formText')
        firstSettingDiv.classList.add('editableContent')
        firstSettingDiv.classList.add('formCardTextid')
        firstSettingDiv.classList.add('formCard')
        firstSettingDiv.attributes.formidx = 0
        firstSettingDiv.attributes.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = this.bodyString
        jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
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
    async sendBoard () {
      var param = {}
      this.sendLoadingYn = true
      this.checkPopYn = false
      try {
        if (this.uploadFileList.length > 0) {
          this.progressShowYn = true
          // await this.uploadFile()
          await this.formSubmit()
          setTimeout(() => {
            this.progressShowYn = false
          }, 2000)
        }
        param.attachFileList = await this.setAttachFileList()
        var innerHtml = ''
        param.bodyHtmlYn = true
        var formList = document.querySelectorAll('#msgBox .formCard')
        if (formList) {
          for (var f = 0; f < formList.length; f++) {
            formList[f].contentEditable = false
            // formlist중 Text component만 찾아서 http로 시작하는 url에 a태그 넣어주기
            if (formList[f].id === 'formEditText') {
              if (formList[f].innerText === '') {
                formList[f].remove()
              } else {
                formList[f].classList.remove('formEditorTextPadding')
                innerHtml = formList[f].innerHTML
                formList[f].innerHTML = this.$findUrlChangeAtag(innerHtml)
              }
            }
          }
          param.getBodyHtmlYn = true
        }
        innerHtml = document.getElementById('msgBox').innerHTML

        param.bodyFullStr = innerHtml.replaceAll('width: calc(100% - 30px);', 'width: 100%;')
        // param.bodyFullStr = innerHtml.replaceAll('formEditorTextPadding', '')
        param.jobkindId = 'BOAR'
        if (this.selectBoardYn === true) {
          param.cabinetKey = this.selectBoardCabinetKey
          param.actorList = []
        } else {
          param.cabinetKey = this.propData.cabinetKey
          param.actorList = this.propData.actorList
        }
        param.onlyManagerYn = false
        if (param.cabinetKey === 12006 || param.cabinetKey === 11188) {
          param.onlyManagerYn = true
        }
        param.creTeamKey = this.propData.currentTeamKey || this.propData.creTeamKey
        if (this.propData.attachMfilekey) {
          param.attachMfilekey = this.propData.attachMfilekey
        }
        if (this.propData.nonMemYn) {
          param.creUserName = this.nonMemUserName
          param.creUserKey = 0
        } else {
          param.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
          param.creUserKey = this.GE_USER.userKey
        }
        param.cabinetName = this.propData.cabinetNameMtext || this.cabinetName

        param.title = this.writePushTitle
        param.showCreNameYn = true

        if (this.cabBlindYn) {
          param.showCreNameYn = false
        }
        if (this.modiYn) {
          param.contentsKey = this.propData.modiContentsKey
        } else {
          param.workStatCodeKey = 40
        }
        var result = await this.$saveContents(param)
        if (result.result === true) {
          var newParam = {}
          newParam.contentsKey = result.contents.contentsKey
          newParam.jobkindId = 'BOAR'
          await this.$getContentsList(newParam).then(newReslute => {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
          })

          var newP = {}
          newP.targetKey = result.contents.contentsKey
          newP.teamKey = result.contents.creTeamKey
          newP.contentsKey = result.contents.contentsKey
          newP.targetType = 'contentsDetail'
          newP.cabinetNameMtext = result.contents.cabinetName
          newP.popHeaderText = result.contents.cabinetName
          newP.jobkindId = 'BOAR'
          newP.value = this.propData
          newP.cabinetKey = result.contents.cabinetKey
          this.progressShowYn = false
          if (!this.modiYn && !this.UseAnOtherYn) {
            this.$emit('successWrite', newP)
          }
        }
        // this.$showToastPop('게시되었습니다.')
        if (!this.modiYn) {
          this.$showToastPop('게시되었습니다.')
        } else {
          this.$showToastPop('수정되었습니다.')
        }
      } catch (error) {
        this.$showToastPop('게시되지 못했습니다.')
        console.error(error)
      } finally {
        this.closeXPop(true)
        this.sendLoadingYn = false
      }
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
              if (formList[f].innerText === '') {
                formList[f].remove()
              } else {
                formList[f].classList.remove('formEditorTextPadding')
                innerHtml = formList[f].innerHTML
                formList[f].innerHTML = this.$findUrlChangeAtag(innerHtml)
              }
            }
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
          // if (this.replyPopYn) {
          //   param.parentContentsKey = this.params.targetContentsKey
          //   param.actorList = [{ accessKind: 'U', accessKey: this.params.creUserKey }]
          // } else {
          if (this.params.userKey) {
            param.actorList = [{ accessKind: 'U', accessKey: this.params.userKey }]
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
          // }
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
    // 선택한 수신리스트를 서비스에 보내 전 데이터 전처리
    settingRecvList () {
      var shareItemBookObject = {}
      if (this.receiverList.bookList) {
        for (let i = 0; i < this.receiverList.bookList.length; i++) {
          var selectedBookList = this.receiverList.bookList[i]
          if (!selectedBookList.memberYn) {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'C'
            shareItemBookObject.accessKey = selectedBookList.cabinetKey
          } else {
            shareItemBookObject = {}
            shareItemBookObject.accessKind = 'M'
            shareItemBookObject.accessKey = selectedBookList.memberTypeKey
          }
          /* this.list.push(this.receiverList.bookList[i].cabinetKey) */
          // this.receiverText += ', ' + selectedBookList.cabinetNameMtext
          // this.list.push(shareItemBookObject)
          // this.receiverText += selectedBookList.cabinetNameMtext + ', '
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
          // this.receiverText += this.$changeText(selectedMemberList.userDispMtext || selectedMemberList.userNameMtext) + ', '
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
    async openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.params.targetKey
      param.teamKey = this.params.targetKey
      param.teamNameMtext = this.params.teamNameMtext
      var selectListParamMap = new Map()
      selectListParamMap.set('teamKey', this.params.targetKey)
      param.param = selectListParamMap
      var initData = await this.$getGPopData(param)
      param.initData = initData
      var selectedList = this.receiverList
      param.pSelectedList = selectedList

      this.$emit('openPop', param)
      // this.receiverPopYn = true
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
          var pasteImg = true
          this.$refs.complexEditor.addFormCard('image', src, true, pasteImg)
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
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
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
      // eslint-disable-next-line no-debugger
      debugger
      if (dFile.addYn) {
        for (var d = 0; d < this.uploadFileList.length; d++) {
          if (this.uploadFileList[d][0].attachYn === true && this.uploadFileList[d][0].attachKey === dFile.attachKey) {
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
    // setScrollWidth () {
    //   var w = 150 * this.receiverTotalNum
    //   return 'width: ' + w + 'px'
    // },
    setColor () {
      return {
        'background-color': this.colorList[this.selectedC]
      }
    },
    setBoxHegiht () {
      var h = window.innerHeight
      var cal = h * 0.15
      return 'min-height: ' + cal + 'px'
      // return {
      //   '--writeContenHeight': cal + 'px'
      // }
    }
  }
}
</script>

<style>

.whitePaper {
      /* overflow: auto; */
      /* position: fixed; */
      position: absolute;
      /* left: 5%; */
      /* bottom: 0; */
      top: 5%;
      z-index: 11;
      left: 5%;
      /* transform: translate(-50%, -50%); */
      width: 90%;

      /* border-radius: 0.8rem 0.8rem 0 0; */
      border-radius: 0.8rem;
      /* height: 90%; */
      height: 78%;
      min-height: 600px;

      /* background-color: #f9f9f9; */
      background-color: #f5f5f5 !important;
      color: #363c5f;
      /* padding: 1.5rem; */
      text-align: left;
      /* box-shadow: 0 0 9px 0 #ccc; */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      /* overflow: hidden; */
      /* clip-path: polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%  , 0 100%); */
  }
  .titlePlaceholder::placeholder {
    color: #AFAFAF
  }
.writeContenBtn {
  /* border: 2px solid #FFFFFF; */
  /* line-height: 28px; */
  height: 35px;
  font-size:14px;
  padding :7px 20px !important;
  display: flex;
  align-items: center;
  border-radius: 8px !important;
}
</style>
