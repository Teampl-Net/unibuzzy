<i18n>
{
  "ko": {
    "FORM_BTN_WRITE": "작성",
    "FORM_BTN_APPLY": "신청",
    "FORM_BTN_SEND": "발송하기",
    "FORM_BTN_LONG_APPLY": "신청하기",
    "FORM_BTN_EDIT": "수정하기",
    "FORM_BTN_POST": "게시하기",
    "FORM_TITLE_RECEIVE": "수신",
    "FORM_MSG_TARGET": "알림을 보낼 대상을 선택해주세요.",
    "FORM_TITLE_OPTION": "옵션",
    "FORM_BTN_ID": "실명",
    "FORM_BTN_COMMENT": "댓글",
    "FORM_BTN_TITLE": "제목",
    "FORM_TITLE_BOARD": "게시판",
    "FORM_MSG_TITLE": "제목을 입력해주세요",
    "FORM_BTN_FILE": "파일",
    "FORM_MSG_ID": "실명인증을 하면 익명게시판에 글을 작성할 수 있어요",
    "FORM_MSG_SEND_NOTI": "알림을 발송하시겠습니까?",
    "FORM_MSG_APPLY_NOTI": "알림을 신청하시겠습니까?",
    "FORM_MSG_EDIT": "게시글을 수정하시겠습니까?",
    "FORM_MSG_SAVE": "게시글을 저장하시겠습니까?",
    "FORM_MSG_SUCCESS_APPLY": "신청되었습니다.",
    "FORM_MSG_SUCCESS_SAVE": "저장 되었습니다.",
    "FORM_MSG_NOPERM": "권한없음",
    "FORM_MSG_REASON": "알림을 신청하는 사유를 입력해주세요",
    "FORM_MSG_SU_TARGET": "수신자를 선택해주세요",
    "FORM_MSG_NOTI_NOCONT": "알림 내용을 입력해주세요",
    "FORM_MSG_POST_NOCONT": "게시글의 내용을 입력해주세요",
    "FORM_MSG_DIFFBOARD": "해당 게시판에 작성 권한이 없습니다. 다른 게시판을 선택해주세요.",
    "FORM_MSG_NOBOARD": "게시글을 작성할 게시판을 선택해주세요.",
    "FORM_MSG_SUCCESS_POST": "게시되었습니다.",
    "FORM_MSG_SUCCESS_EDIT": "수정되었습니다.",
    "FORM_MSG_FAIL_EDIT": "게시되지 못했습니다.",
    "FORM_MSG_SUCCESS_POST": "발송되었습니다.",
    "FORM_MSG_FAIL_POST": "발송하지 못했습니다.",
    "FORM_MSG_SUCCESS_SEND_ALIM": "성공적으로 발송되었습니다.",
    "FORM_MESSAGE_ASK_SEND_ALIM": "멤버들에게 알림이 발송되지 않는 게시글입니다. 멤버들을 향해 알림을 발송하시겠습니까? ",
    "FORM_MSG_DRAG": "이곳에 파일을 올려 주세요."
  },
  "en": {
    "FORM_BTN_WRITE": "Write",
    "FORM_BTN_APPLY": "Apply",
    "FORM_BTN_SEND": "Send",
    "FORM_BTN_LONG_APPLY": "Apply",
    "FORM_BTN_EDIT": "Edit",
    "FORM_BTN_POST": "Post",
    "FORM_TITLE_RECEIVE": "Receive",
    "FORM_MSG_TARGET": "Please select the destination to send the noti to.",
    "FORM_TITLE_OPTION": "Options",
    "FORM_BTN_ID": "Identified",
    "FORM_BTN_COMMENT": "Comments",
    "FORM_BTN_TITLE": "Title",
    "FORM_TITLE_BOARD": "Board",
    "FORM_MSG_TITLE": "Please enter the title",
    "FORM_BTN_FILE": "Files",
    "FORM_MSG_SEND_NOTI": "Do you want to send noti?",
    "FORM_MSG_APPLY_NOTI": "Do you want to apply for noti?",
    "FORM_MSG_ID": "If you authenticate your real name, you can write on the anonymous board.",
    "FORM_MSG_EDIT": "Do you want to edit the post?",
    "FORM_MSG_SAVE": "Do you want to save the post?",
    "FORM_MSG_SUCCESS_APPLY": "Applied.",
    "FORM_MSG_SUCCESS_SAVE": "Saved.",
    "FORM_MSG_NOPERM": "No permissions",
    "FORM_MSG_REASON": "Please enter a reason for requesting notification",
    "FORM_MSG_SU_TARGET": "Please select a recipient",
    "FORM_MSG_NOTI_NOCONT": "Please enter the noti content.",
    "FORM_MSG_POST_NOCONT": "Please enter the contents of the post",
    "FORM_MSG_DIFFBOARD": "You do not have permission to create on this board. Please select a different board.",
    "FORM_MSG_NOBOARD": "Please select the board on which you want to create a post.",
    "FORM_MSG_SUCCESS_POST": "Posted.",
    "FORM_MSG_SUCCESS_EDIT": "Edited.",
    "FORM_MSG_FAIL_EDIT": "Failed to publish.",
    "FORM_MSG_SUCCESS_POST": "Sent.",
    "FORM_MSG_SUCCESS_WRITE_POST": "Saved.",
    "FORM_MSG_FAIL_POST": "Failed to send.",
    "FORM_MSG_SUCCESS_SEND_ALIM": "successfully",
    "FORM_MESSAGE_ASK_SEND_ALIM": "The post does not send notifications to members. Would you like to send notifications to members?",
    "FORM_MSG_DRAG": "Drop the file here."
  }
}
</i18n>
<template>
  <div
    class="whitePaper hhhhhh"
    style="cursor: default"
    @drop="onDrop"
    @dragleave="onDragleave"
    @dragenter="onDragenter"
    @dragover="onDragover"
  >
    <!-- 컨텐츠 작성 헤더 영역 -->
    <div class="w100P fl writeHeader">
      <div class="fl w100P writeHeaderBox">
        <p v-if="contentType === 'ALIM'" class="fontBold commonColor font20 fl">
          {{ $t('COMMON_TAB_NOTI') }}
          {{
            requestPushYn === false ? $t('FORM_BTN_WRITE') : $('FORM_BTN_APPLY')
          }}
        </p>
        <p v-if="contentType === 'BOAR'" class="fontBold commonColor font20 fl">
          {{ $t('COMMON_TAB_POST') }}
          {{ modiYn ? $t('COMM_BTN_EDIT2') : $t('FORM_BTN_WRITE') }}
        </p>
        <p v-if="contentType === 'TODO'" class="fontBold commonColor font20 fl">
          Todo {{ modiYn ? $t('COMM_BTN_EDIT2') : $t('FORM_BTN_WRITE') }}
        </p>
        <div class="fr flexAlignCenter">
          <gBtnSmall
            class="writeContenBtn"
            v-if="contentType === 'ALIM'"
            :btnTitle="
              contentType === 'ALIM' && requestPushYn === false
                ? $t('FORM_BTN_SEND')
                : $t('FORM_BTN_LONG_APPLY')
            "
            @click="clickPageTopBtn()"
          />
          <gBtnSmall
            :btnThema="mCanWriteYn ? '' : 'light'"
            :style="!mCanWriteYn ? 'background: #FFF; cursor: default;' : ''"
            class="writeContenBtn"
            v-if="contentType === 'BOAR'"
            :btnTitle="
              contentType === 'BOAR' && modiYn === true
                ? $t('FORM_BTN_EDIT')
                : $t('FORM_BTN_POST')
            "
            @click="mCanWriteYn ? boardDataCheck() : ''"
          />
          <gBtnSmall
            class="writeContenBtn"
            v-if="contentType === 'TODO'"
            :btnTitle="'POST'"
            @click="clickPageTopBtn()"
          />
          <img
            style="width: 1rem"
            @click="closeXPop"
            class="mleft-2 fr cursorP"
            src="@/assets/images/common/popup_close.png"
          />
        </div>
      </div>
      <div class="fl mtop-05 headerLine"></div>
    </div>
    <div
      class="fl w100P h100P scrollOn"
      id="scrollFormArea"
      ref="scrollFormArea"
    >
      <!-- 게시판 영역 -->
      <template v-if="contentType === 'BOAR'">
        <div v-if="selectBoardYn === true" class="fl w100P mtop-1 checkBtnBox">
          <p
            class="fontBold commonColor CDeepColor font16 fl mright-05 titleBoard"
          >
            {{ $t('FORM_TITLE_BOARD') }}
            <pss
              class="font12 fl boardPlaceHolder"
              :style="
                selectBoardCabinetKey !== null ? 'color:#6768a7' : 'color:red'
              "
              >{{ writeBoardPlaceHolder }}</pss
            >
          </p>
          <div
            class="fl boardListWrap"
            :class="!isMobile ? 'thinScrollBar' : ''"
            id="boardListWrap"
            @wheel="horizontalScroll"
          >
            <div
              v-for="(data, index) in selectBoardList"
              :key="index"
              class="fl mleft-05 font12 fontBold boardItem"
              @click="selectBoard(data, index)"
              :style="{ background: data.picBgPath }"
              :class="{
                'CDeepBorderColor selectPadding': selectBoardIndex === index,
                noneSelectPadding: selectBoardIndex !== index,
                'mleft-0': index === 0
              }"
            >
              <div class="fl">
                <img
                  class="img-w15"
                  v-if="selectBoardIndex === index"
                  src="@/assets/images/common/icon_check_commonColor.svg"
                />
              </div>
              <label
                class="mleft-03 font14"
                :class="{
                  'commonColor selectBoardBorder': selectBoardIndex === index
                }"
                :for="'selectBoardCheckBox' + index"
                >{{ this.$changeText(data.cabinetNameMtext) }}</label
              >
            </div>
          </div>
        </div>
      </template>

      <!-- todo 영역 -->
      <template v-if="contentType === 'TODO'">
        <div
          class="fl w100P mtop-1"
          style="display: flex; align-items: flex-start; padding: 0 1.5rem"
        >
          <p
            class="fontBold commonColor CDeepColor font16 fl mright-1"
            style="word-break: keep-all"
          >
            {{ $t('FORM_TITLE_RECEIVE') }}
          </p>
          <div
            class="fl"
            style="min-height: 2rem; float: left; width: calc(100% - 3.5rem)"
          >
            <!-- <div class="fl" style="min-height: 2rem; float: left; width: calc(100% - 3.5rem);" v-if="!params.userKey"> -->
            <checkBtnArea
              class="mleft-05"
              :title="$t('COMMON_TAB_ALL')"
              :selectedYn="allRecvYn"
              @click="allRecvYn = true"
            />
            <checkBtnArea
              class="mleft-05"
              :title="$t('COMMON_BTN_SELECTED')"
              :selectedYn="!allRecvYn"
              @click="allRecvYn = false"
            />
            <p class="fr commonDarkGray font14" style="line-height: 30px">
              {{ allRecvYn === false ? receiverText : $t('COMMON_TAB_ALL') }}
            </p>
            <div
              v-if="!allRecvYn"
              class="fl w100P textLeft mleft-05 mtop-05"
              @click="openPushReceiverSelect"
              style="
                border: 1px solid #ccc;
                border-radius: 8px;
                min-height: 30px;
                background: white;
                padding-left: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <!-- <div v-if="this.receiverList.list && this.receiverList.list.length > 0" class="fl w100P">
                  <div v-for="(value, index) in this.receiverList.list" :key="index" class="fl mright-1" style="display: flex;">
                    <img v-if="value.type === 'BOOK' && !value.memberYn" class="img-w15 fl" src="../../assets/images/channel/channer_addressBook.svg" alt="">
                    <img v-if="value.type === 'BOOK' && value.memberYn" class="img-w15 fl" src="../../assets/images/common/memberIcon.svg" alt="">
                    <img v-if="value.type === 'USER'" class="img-w15 fl" src="../../assets/images/footer/icon_people.svg" alt="">
                    <p class="fl font14 mleft-01 commonDarkGray">{{value.name}}</p>
                  </div>
                </div>
                <p class='font12 fl' style="color:#aaa; " v-else >{{ $t('FORM_MSG_TARGET') }}</p> -->
              <!-- <p class='font12 fl' style="color:#aaa; " >{{ $t('FORM_MSG_TARGET') }}</p> -->
              <!-- 이미지 임시!!! -->
              <!-- <img class="fr img-w17 mright-05"  src="../../assets/images/push/plusIcon.svg" />
                <img class="fr img-w17 mright-05"  src="../../assets/images/formEditor/icon_formEditPlus.svg" /> -->
            </div>
          </div>
          <!-- <p v-else class="fl w100P font16 textLeft commomBlack">
              <img src="../../assets/images/footer/icon_people.svg" class="fl img-w15 mtop-02 mleft-05 mright-03" alt="">
              {{params.userName}}
              </p> -->
        </div>

        <div
          class="fl w100P mtop-1"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.5rem;
          "
        >
          <p
            class="fontBold commonColor CDeepColor font16 fl mright-1"
            style="word-break: keep-all; margin-right: 22px"
          >
            Date
          </p>
          <div class="w100P" style="min-height: 2rem; float: left">
            <input
              class="fl w100P"
              type="date"
              v-model="selectedDate"
              style="min-height: 30px; padding-left: 5px"
            />
          </div>
        </div>
        <!-- <div class="fl w100P mtop-1 " style="display: flex; align-items: flex-start; padding: 0 1.5rem;">
            <p class="fontBold commonColor CDeepColor font16 fl mright-1" style="word-break: keep-all">{{ $t('FORM_TITLE_OPTION') }}</p>
            <div style="min-height: 2rem; float: left;">
              <checkBtnArea class="mleft-05" :title="$t('FORM_BTN_ID')" :selectedYn='showCreNameYn' @click="showCreNameYn = !showCreNameYn" />
              <checkBtnArea class="mleft-05" :title="$t('FORM_BTN_COMMENT')" :selectedYn='canReplyYn' @click="canReplyYn = !canReplyYn" />
              <checkBtnArea class="mleft-05" :title="$t('FORM_BTN_TITLE')" :selectedYn='titleShowYn' @click="titleShowYn = !titleShowYn" />
            </div>
          </div> -->
      </template>

      <!-- 공통 영역 -->
      <div v-if="titleShowYn" class="fl w100P mtop-1 contentsTitleBox">
        <p class="fontBold commonColor CDeepColor font16 fl mright-1 keepAll">
          {{ $t('FORM_BTN_TITLE') }}
        </p>
        <input
          class="fl mleft-05 titlePlaceholder"
          type="text"
          v-if="titleShowYn"
          id="pushTitleInput"
          :placeholder="$t('FORM_MSG_TITLE')"
          v-model="writePushTitle"
        />
      </div>

      <div v-if="fileYn" class="fl w100P mtop-1 contentsFileBox">
        <p class="fontBold commonColor CDeepColor font16 fl mright-1 keepAll">
          {{ $t('FORM_BTN_FILE') }}
        </p>
        <div class="fl mleft-05 fileItemBox">
          <attachFileList
            ref="attachFileRef"
            :attachTrueAddFalseList="pAttachFileList"
            @delAttachFile="delAttachFile"
            @setSelectedAttachFileList="setSelectedAttachFileList"
          />
        </div>
      </div>

      <!-- 작성 창 영역 -->
      <div
        id="pageMsgAreaWrap"
        class="pageMsgArea mtop-1 w100P fl contentsFormBox"
      >
        <formEditor
          class="fl formEditor"
          ref="complexEditor"
          @changeUploadList="changeUploadList"
          :editorType="this.editorType"
          :propFormData="propFormData"
          @setParamInnerHtml="setParamInnerHtml"
          @setParamInnerText="setParamInnerText"
          @postToolBox="postToolBox"
        />
        <div
          @click="formEditorShowYn = true"
          v-show="previewContentsShowYn"
          class="msgArea"
          id="msgBox"
        ></div>
      </div>
    </div>
    <div v-if="mIsDraggedYn" class="flexJustiCenter dragBox">
      {{ this.$t('FORM_MSG_DRAG') }}
    </div>
  </div>
  <gToolBox
    :propTools="mToolBoxOptions"
    @changeTextStyle="changeFormEditorStyle"
  />
  <div
    v-if="mAskSendAlimPopShowYn"
    @click="closeAskAlimPop"
    style="
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 98;
    "
  ></div>
  <gConfirmPop
    v-if="mAskSendAlimPopShowYn"
    @no="closeAskAlimPop"
    confirmType="two"
    @ok="sendAlimToMember"
    :confirmText="$t('FORM_MESSAGE_ASK_SEND_ALIM')"
  />
  <gConfirmPop
    v-if="failPopYn"
    @no="failPopYn = false"
    confirmType="timeout"
    :confirmText="errorText"
  />
  <gConfirmPop
    v-if="contentType === 'BOAR' && checkPopYn"
    :confirmText="modiYn ? $t('FORM_MSG_EDIT') : $t('FORM_MSG_SAVE')"
    @ok="sendBoard(), (checkPopYn = false)"
    @no="confirmNo()"
  />
  <gConfirmPop
    @no="closeXPop()"
    :confirmText="
      contentType === 'ALIM'
        ? $t('FORM_MSG_SUCCESS_APPLY')
        : $t('FORM_MSG_SUCCESS_SAVE')
    "
    confirmType="timeout"
    v-if="okPopYn"
  />
  <progressBar v-if="progressShowYn" :uploadFileList="uploadFileList" />
  <div v-if="sendLoadingYn" id="loading">
    <div class="spinner"></div>
  </div>
  <!-- </div> -->
</template>

<script>
import { Base64 } from 'js-base64'
import formEditor from '../../unit/formEditor/FormEditor.vue'
import attachFileList from '../../unit/formEditor/AttachFile.vue'
import checkBtnArea from '../../../components/button/CommonCheckBtn.vue'

export default {
  components: {
    attachFileList,
    formEditor,
    checkBtnArea
  },
  data() {
    return {
      mSelectedBoard: null,
      mContentsParams: {},
      mAskSendAlimPopShowYn: false,
      mSelectMemberList: [],
      failPopYn: false,
      errorText: '',
      confirmText: '',
      progressShowYn: false,
      uploadFileList: [],
      okPopYn: false,
      allRecvYn: true,
      showCreNameYn: true, // 작성자 명 공개
      titleShowYn: false, // 제목 공개 허용
      canReplyYn: true,
      fileYn: false,
      selectedDate: '',
      writePushTitle: '',
      receiverList: { memberList: [], bookList: [] },
      bodyString: '',
      requestPushYn: false,
      addFalseList: [],
      propFormData: [],
      editorType: 'text',
      complexOkYn: false,
      selectedReceiverList: [],
      checkPopYn: false,

      modiYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      selectBoardIndex: null,
      selectBoardCabinetKey: null,
      writeBoardPlaceHolder: '',
      cabBlindYn: false,

      mToolBoxOptions: {},
      mCanWriteYn: true,
      mBoardList: [],
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mIsDraggedYn: false,
      enterTarget: null
    }
  },
  props: {
    pAttachFileList: {},
    propData: {},
    params: {},
    contentType: { type: String, default: 'ALIM' }
  },
  watch: {
    GE_USER: {
      handler(value, old) {
        if (!value || !value.certiDate) return
        if (value.certiDate) this.mCanWriteYn = true
      },
      deep: true
    },
    uploadFileList: {
      handler() {
        if (this.uploadFileList.length > 0 && this.writePushTitle === '') {
          var fileName = this.uploadFileList[0].file.name
          this.writePushTitle = fileName.normalize('NFC')
        }
      },
      deep: true
    }
  },
  created() {
    if (this.contentType === 'TODO') {
      this.titleShowYn = true
      this.fileYn = true
    }
    if (this.contentType === 'BOAR') this.titleShowYn = true
    this.screenInnerHeight = window.innerHeight
    this.screenInnerWidth = window.innerWidth
    if (this.propData && this.propData.value && this.propData.value.fileYn) {
      this.fileYn = true
    }
    if (
      this.params &&
      (this.params.bodyFullStr || this.propData.guideFullStr)
    ) {
      if (this.params.value && this.params.value.fileYn) {
        this.fileYn = true
      }
      if (this.contentType === 'BOAR') {
        this.titleShowYn = true
        if (this.propData.UseAnOtherYn) {
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          this.selectBoardYn = true
        } else {
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          this.modiYn = true
        }
        if (this.propData.guideFullStr) {
          this.modiYn = false
          this.bodyString = this.decodeContents(this.propData.guideFullStr)
        }
        if (this.propData.titleStr) {
          this.writePushTitle = this.propData.titleStr
        }
        const this_ = this
        this.getCabinetDetail(this.propData.cabinetKey).then((res) => {
          this_.mBoardList = res
        })
      }
    }
    if (this.params && this.params.userKey) {
      this.allRecvYn = false
    }
  },
  mounted() {
    if (document.querySelector('#pageMsgAreaWrap')) {
      document
        .querySelector('#pageMsgAreaWrap')
        .addEventListener('paste', (e) => {
          var items = (e.clipboardData || e.originalEvent.clipboardData).items

          for (const i of items) {
            var item = i
            if (item.type.indexOf('image') !== -1) {
              var file = item.getAsFile()
              this.handleImageUpload(file)
            }
          }
          e.preventDefault()
          var textData = (e.originalEvent || e).clipboardData.getData('Text')
          document.execCommand('insertHTML', false, textData)
        })
    }

    var textArea = document.querySelector('#textMsgBoxPush')
    if (textArea) {
      textArea.addEventListener('focus', () => {
        document.querySelector('#alimWrap').style.height =
          this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
      textArea.addEventListener('blur', () => {
        document.querySelector('#alimWrap').style.height =
          this.screenInnerHeight
        document.querySelector('#alimWrap').style.width = this.screenInnerWidth
      })
    }
    if (this.answerRequsetYn) {
      this.$refs.textAreaRequestTitle.style.backgroundColor = '#00000010'
      this.$refs.textAreaRequestTitle.readOnly = true
    }

    if (
      this.bodyString !== undefined &&
      this.bodyString !== null &&
      this.bodyString !== ''
    ) {
      this.settingAlim()
    }

    if (this.contentType === 'BOAR') {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      if (temp.getElementsByClassName('formCard').length > 0) {
        var innerHtml = ''
        var newArr = []
        var formC = temp.getElementsByClassName('formCard')
        var jsonObj = {}
        var imgYn = true
        for (var i = 0; i < formC.length; i++) {
          jsonObj = {}
          imgYn = true
          innerHtml += formC[i].outerHTML
          jsonObj.innerHtml = formC[i].innerHTML
          jsonObj.type = 'image'
          jsonObj.targetKey = i - 1
          for (var c = 0; c < formC[i].classList.length; c++) {
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
            jsonObj.pFilekey =
              formC[i].querySelector('img').attributes.filekey.value
          }
          newArr.push(jsonObj)
        }
        this.propFormData = newArr
        this.$refs.complexEditor.setFormCard(this.propFormData)
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerHtml
        this.addFalseList = document.querySelectorAll(
          '.msgArea .formCard .addFalse'
        )
      }
      if (this.propData && this.propData.selectBoardYn === true) {
        this.selectBoardYn = true
        if (!this.propData.initData) {
          this.getTeamMenuList()
        } else {
          // initData <- selectBoard에서도 구분하고 있음 수정 시 같이 봐야함!
          this.selectBoardList = this.propData.initData
          if (this.selectBoardList.length > 0) {
            this.selectBoard(this.selectBoardList[0], 0)
          }
        }
      }
    }
  },
  methods: {
    onDragenter(event) {
      // class 넣기
      this.mIsDraggedYn = true
      this.enterTarget = event.target
    },
    onDragleave(event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        this.mIsDraggedYn = false
      }
    },
    onDragover(event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop(event) {
      event.preventDefault()
      this.mIsDraggedYn = false
      const files = event.dataTransfer.files
      const fileRef = this.$refs.attachFileRef
      if (fileRef) {
        fileRef.onDrop(files)
      }
    },
    async sendAlimToMember() {
      this.mContentsParams.allRecvYn = true
      const res = await this.$commonAxiosFunction({
        url: '/sUniB/tp.sendContentsPush',
        param: this.mContentsParams
      })
      if (res.data && res.data.result) {
        this.$showToastPop(this.$t('FORM_MSG_SUCCESS_SEND_ALIM'))
        this.closeXPop(true)
      }
    },
    closeAskAlimPop() {
      this.mAskSendAlimPopShowYn = false
      this.closeXPop(true)
    },
    horizontalScroll(e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    changeFormEditorStyle(changeParam) {
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
    postToolBox(toolBoxOption) {
      // toolbox에 들어간 option들을 formEditor에서 watch로 계속 넘겨받고 prop으로 넘겨주고 있습니다! -j
      this.mToolBoxOptions = toolBoxOption
    },
    decodeContents(data) {
      var changeText = Base64.decode(data)
      return changeText
    },
    async getCabinetDetail(cabinetKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      var response = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getCabinetListForMyShareType',
          param: Object.fromEntries(paramMap)
        },
        true
      )
      var mCabinet = response.data.mCabinet
      if (mCabinet) {
        this.fileYn = mCabinet.fileYn
      }
      return mCabinet
    },
    async selectBoard(data, index) {
      this.selectBoardIndex = index
      this.mCanWriteYn = true
      var mCabinet
      if (!this.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        this.mBoardList = mCabinet
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            this.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            this.cabinetName = data.cabinetNameMtext
            this.writeBoardPlaceHolder = ''
          } else {
            this.selectBoardCabinetKey = null
            this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
            return
          }
        } else {
          this.selectBoardCabinetKey = null
          this.writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
          return
        }
      } else {
        this.mBoardList = [data]
        mCabinet = data
        this.selectBoardCabinetKey = mCabinet.cabinetKey
        this.cabinetName = mCabinet.cabinetNameMtext
      }
      this.mSelectedBoard = mCabinet
      this.fileYn = this.mSelectedBoard.fileYn
      if (mCabinet.guideFullStr) {
        this.$refs.complexEditor.addFormCard(
          'text',
          this.decodeContents(mCabinet.guideFullStr)
        )
      }
      if (mCabinet.blindYn) {
        this.cabBlindYn = true
      }
    },
    async getTeamMenuList() {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set(
        'currentTeamKey',
        this.propData.currentTeamKey || this.propData.creTeamKey
      )
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      await this.$getTeamMenuList(paramMap).then((result) => {
        this.selectBoardList = result
        if (this.selectBoardList.length > 0) {
          this.selectBoard(this.selectBoardList[0], 0)
        }
      })
    },
    setParamInnerHtml(formCard) {
      var innerHtml = ''
      for (var i = 0; i < formCard.length; i++) {
        innerHtml += formCard[i].outerHtml
      }

      this.propFormData = []
      this.propFormData.push(...formCard)
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = innerHtml
      this.editorType = 'complex'
      this.complexOkYn = true
      if (this.contentType === 'ALIM') this.clickPageTopBtn()
      if (this.contentType === 'BOAR') this.boardDataCheck()
    },
    async clickPageTopBtn() {
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
            this.errorText = this.$t('FORM_MSG_TITLE')
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
        }

        if (this.requestPushYn === true) {
          if (this.requestTitle.replace(' ', '') === '') {
            this.errorText = this.$t('FORM_MSG_REASON')
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
        }
        if (this.allRecvYn === true) {
        } else {
          await this.settingRecvList()
          if (this.selectedReceiverList.length > 0) {
          } else {
            if (!this.params.userKey) {
              this.errorText = this.$t('FORM_MSG_SU_TARGET')
              this.failPopYn = true
              this.complexOkYn = false
              return
            }
          }
        }

        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        msgData = msgData.trim()
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          this.uploadFileList.length > 0
        ) {
        } else {
          this.errorText = this.$t('FORM_MSG_NOTI_NOCONT')
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        this.checkPopYn = true
      }
    },
    boardDataCheck() {
      if (this.complexOkYn === false) {
        this.complexOkYn = true
        this.$refs.complexEditor.setParamInnerHtml()
      } else {
        var title = this.writePushTitle
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          this.errorText = this.$t('FORM_MSG_TITLE')
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        msgData = msgData.trim()
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          this.uploadFileList.length > 0
        ) {
        } else {
          this.errorText = this.$t('FORM_MSG_POST_NOCONT')
          this.failPopYn = true
          this.complexOkYn = false
          return
        }
        if (this.selectBoardYn === true) {
          if (
            this.selectBoardIndex !== undefined &&
            this.selectBoardIndex !== null &&
            this.selectBoardIndex !== ''
          ) {
            if (this.selectBoardCabinetKey === null) {
              this.errorText = this.$t('FORM_MSG_DIFFBOARD')
              this.failPopYn = true
              this.complexOkYn = false
              return
            }
          } else if (
            this.selectBoardIndex === undefined ||
            this.selectBoardIndex === null ||
            this.selectBoardIndex === ''
          ) {
            this.errorText = this.$t('FORM_MSG_NOBOARD')
            this.failPopYn = true
            this.complexOkYn = false
            return
          }
        }
        this.checkPopYn = true
      }
    },
    changeUploadList(upList) {
      if (this.uploadFileList.length > 0) {
        console.log(
          this.uploadFileList.findIndex(
            (item) => item.targetKey === upList.targetKey
          )
        )
        var index = this.uploadFileList.findIndex(
          (item) => item.targetKey === upList.targetKey
        )
        if (index === -1) {
          var temp = this.uploadFileList
          this.uploadFileList = []
          this.uploadFileList = [...temp, upList]
        } else if (index !== -1) {
          this.uploadFileList.splice(index, 1, upList)
        }
      } else {
        this.uploadFileList.push(upList)
      }
    },
    confirmNo() {
      this.checkPopYn = false
      this.complexOkYn = false
    },
    setParamInnerText(innerText) {
      if (innerText !== undefined && innerText !== null && innerText !== '') {
        document.getElementById('msgBox').innerHTML = ''
        document.getElementById('msgBox').innerHTML = innerText
        this.editorType = 'text'
        this.formEditorShowYn = false
        this.propFormData = innerText
      }
    },
    settingAlim() {
      var temp = document.createElement('div')
      temp.innerHTML = this.bodyString
      var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      var jsonObj = {}
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        jsonObj = {}
        imgYn = true
        innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
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
          jsonObj.pFilekey =
            formC[i].querySelector('img').attributes.filekey.value
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
        firstSettingDiv.attributes.creTeamKey =
          this.propData.currentTeamKey || this.propData.creTeamKey
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
      this.addFalseList = document.querySelectorAll(
        '.msgArea .formCard .addFalse'
      )
    },
    closeXPop(reloadYn) {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    async sendBoard() {
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

        param.bodyFullStr = innerHtml.replaceAll(
          'width: calc(100% - 30px);',
          'width: 100%;'
        )
        if (
          this.mSelectedBoard &&
          this.mSelectedBoard.shareList &&
          this.mSelectedBoard.shareList[0] &&
          this.mSelectedBoard.shareList[0].accessKind &&
          this.mSelectedBoard.shareList[0].accessKind === 'F'
        ) {
          param.allRecvYn = true
        }
        param.jobkindId = 'BOAR'
        param.creCabinetKey = this.selectBoardCabinetKey
        if (this.selectBoardYn === true) {
          param.cabinetKey = this.selectBoardCabinetKey
          param.actorList = []
        } else {
          param.cabinetKey = this.propData.cabinetKey
          param.actorList = this.propData.actorList
        }
        param.onlyManagerYn = false
        if (param.cabinetKey === this.$DALIM_MUN_CAB_KEY) {
          param.onlyManagerYn = true
        }
        param.creTeamKey =
          this.propData.currentTeamKey || this.propData.creTeamKey
        if (this.propData.attachMfilekey) {
          param.attachMfilekey = this.propData.attachMfilekey
        }
        if (this.propData.nonMemYn) {
          param.creUserName = this.nonMemUserName
          param.creUserKey = 0
        } else {
          param.creUserName = this.$changeText(
            this.GE_USER.userDispMtext || this.GE_USER.userNameMtext
          )
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
        this.mContentsParams = param
        var result = await this.$saveContents(param)
        if (result.result === true) {
          var newParam = {}
          newParam.contentsKey = result.contents.contentsKey
          newParam.jobkindId = 'BOAR'
          await this.$getContentsList(newParam).then((newReslute) => {
            this.$store.dispatch(
              'UB_CHANNEL/AC_ADD_CONTENTS',
              newReslute.content
            )
          })
          var detail = this.$getDetail('TEAM', this.params.targetKey)
          if (detail && detail[0] && detail[0].totalContentsCount) {
            detail[0].totalContentsCount++
          }

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
        const cab = this.selectBoardList[this.selectBoardIndex]
        if (cab && cab.shareList) {
          if (cab.shareList[0].accessKind === 'T') {
            this.mContentsParams.contentsKey = result.contents.contentsKey
            this.mContentsParams.jobkindId = 'BOAR'
            this.mAskSendAlimPopShowYn = true
            return
          }
        }
        if (!this.modiYn) {
          this.$showToastPop(this.$t('FORM_MSG_SUCCESS_WRITE_POST'))
        } else {
          this.$showToastPop(this.$t('FORM_MSG_SUCCESS_EDIT'))
        }
        this.closeXPop(true)
      } catch (error) {
        this.$showToastPop(this.$t('FORM_MSG_FAIL_EDIT'))
        console.error(error)
      } finally {
        this.sendLoadingYn = false
      }
    },
    // 선택한 수신리스트를 서비스에 보내 전 데이터 전처리
    settingRecvList() {
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
          this.selectedReceiverList.push(shareItemBookObject)
        }
      }
      var shareItemMemberObject = {}
      if (this.receiverList.memberList) {
        for (let i = 0; i < this.receiverList.memberList.length; i++) {
          var selectedMemberList = this.receiverList.memberList[i]
          shareItemMemberObject = {}
          shareItemMemberObject.accessKind = 'U'
          shareItemMemberObject.accessKey = selectedMemberList.userKey
          this.selectedReceiverList.push(shareItemMemberObject)
        }
      }
    },
    setAttachFileList() {
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
        setObj.fileName = this.uploadFileList[i].file.name.normalize('NFC')
        newAttachFileList.push(setObj)
      }
      return newAttachFileList
    },
    async handleImageUpload(file) {
      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      // 0 번째 파일을 가져 온다.
      let fileExt = file.name.substring(file.name.lastIndexOf('.') + 1)
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        [
          'jpeg',
          'jpg',
          'png',
          'gif',
          'bmp',
          'webp',
          'svg',
          'tiff',
          'tif',
          'eps',
          'heic',
          'bpg'
        ].includes(fileExt)
      ) {
        console.log('originalFile instanceof Blob', file instanceof Blob) // true
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`)

        try {
          // eslint-disable-next-line no-undef
          var compressedFile = await this.$imageCompression(file, options)
          console.log(compressedFile)
          console.log(
            'compressedFile instanceof Blob',
            compressedFile instanceof Blob
          ) // true
          var src = null
          if (compressedFile instanceof Blob) {
            src = await this.$imageCompression.getDataUrlFromFile(
              compressedFile
            )
            const decodImg = atob(src.split(',')[1])
            const array = []
            for (let i = 0; i < decodImg.length; i++) {
              array.push(decodImg.charCodeAt(i))
            }
            const Bfile = new Blob([new Uint8Array(array)], {
              type: 'image/png'
            })
            var newFile = new File([Bfile], compressedFile.name)
          } else {
            src = await this.$imageCompression.getDataUrlFromFile(
              compressedFile
            )
          }

          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ) // smaller than maxSizeMB
          // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
          var pasteImg = true
          this.$refs.complexEditor.addFormCard('image', src, true, pasteImg)
          this.$refs.complexEditor.successImgPreview({
            targetKey:
              document.querySelectorAll('#eContentsWrap .formDiv').length - 1,
            selectFileList: {
              previewImgUrl: src,
              addYn: true,
              file: newFile,
              targetKey: newFile.name
            },
            originalType: 'image'
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
    async formSubmit() {
      if (this.uploadFileList.length > 0) {
        var iList = document.querySelectorAll('.formCard .addTrue')
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          form = new FormData()
          const oldFile = thisthis.uploadFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), {
            type: oldFile.type
          })
          form.append('files[0]', newFile)
          await this.$axios
            // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://unibuzzy.com/file/tp.uploadFile', form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then((res) => {
              console.log(res)
              if (res.data.length > 0) {
                if (this.uploadFileList[i].attachYn === true) {
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
            .catch((error) => {
              this.response = error
              this.isUploading = false
            })
        }
        iList = document.querySelectorAll('.msgArea .formCard .addTrue')
        if (iList.length > 0) {
          for (var s = 0; s < this.uploadFileList.length; s++) {
            var uploadFile = this.uploadFileList[s]
            if (uploadFile.successSave) {
              for (var il = 0; il < iList.length; il++) {
                if (
                  !uploadFile.attachYn &&
                  (iList[il].attributes.filekey === undefined ||
                    iList[il].attributes.filekey === null ||
                    iList[il].attributes.filekey === '')
                ) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
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
        alert(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    },
    delAttachFile(dFile) {
      if (dFile.addYn) {
        for (var d = 0; d < this.uploadFileList.length; d++) {
          if (
            this.uploadFileList[d].attachYn === true &&
            this.uploadFileList[d].attachKey === dFile.attachKey
          ) {
            this.uploadFileList.splice(d, 1)
          }
        }
      } else {
        this.delAddFalseFileList.push(dFile)
      }
    },
    setSelectedAttachFileList(sFile) {
      if (sFile.addYn === true) {
        this.uploadFileList.push(sFile)
      }
    }
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.whitePaper {
  position: absolute;
  top: 5%;
  z-index: 1000000;
  left: 5%;
  width: 90%;
  border-radius: 0.8rem;
  height: 78%;
  min-height: 500px;
  background-color: #f5f5f5 !important;
  color: #363c5f;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.titlePlaceholder {
  width: calc(100% - 3.5rem);
  min-height: 30px;
  background-color: white !important;
}
.titlePlaceholder::placeholder {
  color: #afafaf;
}
.writeContenBtn {
  height: 35px;
  font-size: 14px;
  padding: 7px 20px !important;
  display: flex;
  align-items: center;
  border-radius: 8px !important;
}
.writeHeader {
  padding: 1rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.writeHeaderBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.headerLine {
  width: 100%;
  border-bottom: 2px solid #5f61bd;
}
.alimTopArea {
  display: flex;
  align-items: flex-start;
  padding: 0 1.5rem;
}
.alimOptionBox {
  min-height: 2rem;
  float: left;
  width: calc(100% - 3.5rem);
}
.selectRecvUserBox {
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 30px;
  background: white;
  padding-left: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dispFlex {
  display: flex;
}
.checkBtnBox {
  display: flex;
  align-items: flex-start;
  padding: 0 1.5rem;
}
.titleBoard {
  word-break: keep-all;
  position: relative;
}
.boardPlaceHolder {
  position: absolute;
  left: 0;
  bottom: -1rem;
}
.boardListWrap {
  width: calc(100% - 3.5rem);
  height: 2.2rem;
  overflow: auto hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
}
.boardItem {
  border-radius: 10px;
  display: inline-flex;
}
.contentsTitleBox {
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}
.contentsFileBox {
  display: flex;
  align-items: flex-start;
  padding: 0 1.5rem;
}
.fileItemBox {
  width: calc(100% - 3.5rem);
  min-height: 30px;
}
.contentsFormBox {
  padding: 0px 1.5rem 0rem 1.5rem;
  position: relative;
  z-index: 1;
}
.formEditor {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  position: relative !important;
  z-index: 1000 !important;
}
#loading {
  display: block;
}
.dragBox {
  line-height: 400px;
  position: absolute;
  height: 100%;
  width: 100%;
  color: #fff;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  font-weight: bold;
  font-size: 20px;
}
</style>
