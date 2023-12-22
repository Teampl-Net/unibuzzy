<i18n>
  {
    "ko":{
      "COMM_ME" : "나",
      "COMM_ERR_DATE" : "목표 날짜를 지정해주세요.",
      "COMM_ERR_TAG" : "태그를 선택해주세요.",
      "COMM_ERR_TITLE" :"제목 또는 내용을 작성해주세요.",
      "COMM_ERR_TITLE_COUNT" : "제목은 256자 이내로 작성해주세요.",
      "COMM_ERR_FILL_CONTENT" : "공유하고자 하는 내용을 작성하거나 파일을 첨부해주세요.",
      "COMM_ERR_NO_TITLE": "제목을 작성해주세요.",
      "FORM_BTN_WRITE": "작성",
      "FORM_BTN_APPLY": "신청",
      "FORM_BTN_SEND": "발송하기",
      "FORM_BTN_LONG_APPLY": "신청하기",
      "FORM_BTN_EDIT": "수정하기",
      "FORM_BTN_POST": "게시하기",
      "FORM_TITLE_RECEIVE": "수신",
      "FORM_MSG_TARGET": "쪽지를 보낼 대상을 선택해주세요.",
      "FORM_TITLE_OPTION": "옵션",
      "FORM_BTN_ID": "실명",
      "FORM_BTN_COMMENT": "댓글",
      "FORM_BTN_TITLE": "제목",
      "FORM_TITLE_BOARD": "게시판",
      "FORM_MSG_TITLE": "제목을 입력해주세요",
      "FORM_BTN_FILE": "파일",
      "FORM_MSG_ID": "실명인증을 하면 익명게시판에 글을 작성할 수 있어요",
      "FORM_MSG_SEND_NOTI": "쪽지를 발송하시겠습니까?",
      "FORM_MSG_APPLY_NOTI": "알림을 신청하시겠습니까?",
      "FORM_MSG_EDIT": "게시글을 수정하시겠습니까?",
      "FORM_MSG_SAVE": "게시글을 저장하시겠습니까?",
      "FORM_MSG_SUCCESS_APPLY": "신청되었습니다.",
      "FORM_MSG_SUCCESS_SAVE": "저장 되었습니다.",
      "FORM_MSG_NOPERM": "권한없음",
      "FORM_MSG_REASON": "알림을 신청하는 사유를 입력해주세요",
      "FORM_MSG_SU_TARGET": "수신자를 선택해주세요",
      "FORM_MSG_NOTI_NOCONT": "쪽지 내용을 입력해주세요",
      "FORM_MSG_POST_NOCONT": "게시글의 내용을 입력해주세요",
      "FORM_MSG_DIFFBOARD": "해당 게시판에 작성 권한이 없습니다. 다른 게시판을 선택해주세요.",
      "FORM_MSG_NOBOARD": "게시글을 작성할 게시판을 선택해주세요.",
      "FORM_MSG_SUCCESS_POST": "게시되었습니다.",
      "FORM_MSG_SUCCESS_EDIT": "수정되었습니다.",
      "FORM_MSG_FAIL_EDIT": "게시되지 못했습니다.",
      "FORM_MSG_SUCCESS_POST": "발송되었습니다.",
      "FORM_MSG_FAIL_POST": "발송하지 못했습니다.",
      "FORM_MSG_DRAG": "이곳에 파일을 올려 주세요.",
      "COMM_TITLE_COUNT" : "제목은 256자 이내로 작설해주세요.",
    },
    "en": {
      "COMM_ME" : "ME",
      "COMM_ERR_DATE" : "Please specify the target date.",
      "COMM_ERR_TAG" : "Please select tag.",
      "COMM_ERR_TITLE" :"Please write title or content.",
      "COMM_ERR_TITLE_COUNT" : "Please write the title within 256 characters.",
      "COMM_ERR_FILL_CONTENT" : "Please write what you want to share or attach a file.",
      "COMM_ERR_NO_TITLE": "Please write title.",
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
     "FORM_MSG_FAIL_POST": "Failed to send.",
     "FORM_MSG_DRAG": "Drop the file here.",
     "COMM_TITLE_COUNT" : "Please write the title within 256 characters.",
    }
  }
</i18n>
<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <button @click="closeXPop" type="button" class="closeBtn">
          <img
            src="../../assets/images/common/popup_close.png"
            alt="close button"
            style="width:20px;"
          />
        </button>
      <p class="commonColor fontBold" style="font-size:20px; line-height: 30px;">{{ pOptions.purpose }}</p>
      <div class="HeaderbtnWrap">
        <div @click="postContents" class="saveBtn fontBold">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </div>
        <!-- <button @click="closePop">Cancel</button> -->
      </div>
    </header>
    <main>
      <form>
        <!-- neccessary post values -->
        <!-- TITLE -->
        <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
            <textarea
              id="title"
              type="text"
              :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
              v-model="params.title" @input="countLines"
              class="titleInput"
              :style="{}"
            />
        </fieldset>
        <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- Select Board -->
        <fieldset v-if="contentType === 'BOAR' && (!propParams || (propParams && !propParams.nonMemYn)) && params.modiYn === false" id="postTitle">
          <legend>게시판 선택</legend>
            <label for="" style="line-height:30px;">{{$t('COMMON_NAME_BOARD')}}</label>
          <div class="w100P" style="overflow: auto hidden;  height: 100%;">
            <div style="height: 100%; display: flex; gap:0.5; width:auto;">
              <div v-for="(board, index) in propParams.initData" :key="index" @click="selectBoard(board, index)" class="cursorP"  style=" border-radius:10px; padding:0px 10px;" :style="{background: board.picBgPath, border: selectBoardIndex === index ? '2px solid #7678E2' : `2px solid ${board.picBgPath}`}">
                <label class="font14" style="white-space:nowrap;"  :class="{'commonColor selectBoardBorder' : selectBoardIndex === index}" :for="'selectBoardCheckBox'+index">{{this.$changeText(board.cabinetNameMtext)}}</label>
              </div>
            </div>
          </div>
        </fieldset>
        <div v-if="contentType === 'BOAR' && (!propParams || (propParams && !propParams.nonMemYn)) && params.modiYn === false" class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- DATE -->
        <fieldset v-if="pOptions.model === 'mankik' && contentType === 'TODO'" id="dateSelect">
            <legend>날짜 선택</legend>
            <label for="">{{$t('COMMON_TITLE_DATE')}}</label>
            <div class="dateBoxWrap">
              <input
                v-if="pOptions.model === 'mankik'" type="date"
                id="fromDate"
                v-model="params.workFromDateStr"
                style="min-height:20px;"
              />
              <input id="toDate" type="date" v-model="params.workToDateStr" style="min-height:20px;"/>
            </div>
          </fieldset>
        <div v-if="pOptions.model === 'mankik' && contentType === 'TODO'" class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
        <!-- ACTOR -->
        <fieldset v-if="contentType !== 'MEMO' && contentType !== 'BOAR'" id="neccessaryOptions">
          <legend>Informations</legend>
          <fieldset id="postReceivers">
            <div class="selectReceiverBox">
              <label v-if="contentType === 'TODO'" for="" style="line-height:30px;">{{ $t('COMMON_TODO_RECEIVER') }}</label>
              <label v-else for="" style="line-height:30px;">{{ $t('FORM_TITLE_RECEIVE') }}</label>
              <div class="selectInput">
                <div @click="toggleReceiverSelectPop" class="cursorP" :style="{width : contentType === 'TODO' ? '90%' : '95%'}" style="display:flex; align-items:center; overflow-x:auto; height:30px; border-bottom:1px solid #C0BFF9;">
                   <!-- 선택된 target -->
                   <template v-for="(target, idx) in params.actorList" :key="target.accessKey">
                    <div v-if="target.accessKey === GE_USER.userKey" style="white-space:nowrap">{{ $t('COMM_ME')}}</div>
                    <div v-else style="white-space:nowrap;">
                      {{idx !== 0? ', ' : ''}}{{ !target.accessName ? '나' : $changeText(target.accessName) }}
                    </div>
                    <!-- <template v-else-if="contentType !== 'TODO'">
                      <div v-if="params.actorList.length === 1" style="white-space:nowrap;">
                        {{ propParams ? $changeText(propParams.targetNameMtext) + ' 전체' : '-'}}
                      </div>
                      <div v-else-if="target.accessName" style="white-space:nowrap;">
                        {{ target.accessName ? target.accessName + ', ' : '-' }}
                      </div>
                    </template> -->
                  </template>
                </div>
                <div v-if="contentType === 'TODO'" @click="toggleTargetsArea" class="h100P cursorP" style="width:40px;">
                  <img :src="require(`@/assets/images/button/Icon_showMore.png`)" class="w100P " :style="openTargetsYn?'transition: all ease 0.5s; transform: rotate( 180deg );' : ''"/>
                </div>
              </div>
            </div>
            <!-- target선택 팝업 -->
            <transition name="show_left">
              <SelectTargetPop
                v-if="showReceiverSelectList"
                :pSelectData="receiverList"
                :pReloadList="getRefreshList"
                :pSelectedTargetList="params.actorList"
                :pSelectOnlyYn="pSelectOnlyYn"
                @saveTarget="setSelectedTargetList"
                @closeXPop="toggleReceiverSelectPop"
                @openPop="openPop"
              />
            </transition>
            <!-- CHECK -->
            <fieldset id="postCheck" v-if="openTargetsYn && contentType === 'TODO'">
              <div class="selectReceiverBox">
                <legend>Select Checker</legend>
                <label for="" style="line-height:30px;">{{ $t('COMMON_TODO_REVIEWER') }}</label>
                <div class="selectInput">
                  <div @click="toggleCheckSelectPop" class="cursorP" style="display:flex; align-items:center; gap:0.2rem; overflow-x:auto; width:90%; height:30px; border-bottom:1px solid #C0BFF9;">
                    <!-- 선택된 target -->
                    <template v-for="target in params.checkList" :key="target.accessKey" >
                      <div style="white-space:nowrap;">
                        {{ !target.accessName ? '나' + ', ' : $changeText(target.accessName) + ', '}}
                      </div>
                    </template>
                  </div>
                  <div @click="selectNoCheck" class="h100P cursorP" style="width:40px;">
                    <img src="../../assets/images/common/popup_close.png" style="width:10px; margin-left: 8px" />
                  </div>
                </div>
              </div>
              <!-- target선택 팝업 -->
              <transition name="show_left">
                <SelectTargetPop
                  v-if="showCheckSelectList"
                  :pSelectData="receiverList"
                  :pReloadList="getRefreshList"
                  :pSelectedTargetList="params.checkList"
                  :pSelectOnlyYn="pSelectOnlyYn"
                  @saveTarget="setSelectedCheckList"
                  @closeXPop="toggleCheckSelectPop"
                 @openPop="openPop"
                />
              </transition>
              </fieldset>
            <!-- PUBLIC, RPIVATE -->
            <fieldset id="postRefs" v-if="openTargetsYn && contentType === 'TODO'">
              <div class="selectReceiverBox">
                <legend>참조자 지정</legend>
                <label for="" style="line-height:30px;">{{ $t('COMMON_TODO_PUBORPRI') }}</label>
                <div class="selectInput">
                  <div @click="toggleRefsSelectPop" class="cursorP" style="display:flex; align-items:center; gap:0.2rem; overflow-x:auto; width:90%; height:30px; border-bottom:1px solid #C0BFF9;">
                    <!-- 선택된 target -->
                    <template v-for="target in params.refList" :key="target.accessKey" >
                      <div style="white-space:nowrap;">
                        {{ !target.accessName ? '나' + ', ' : $changeText(target.accessName) + ', '}}
                      </div>
                    </template>
                  </div>
                  <div @click="selectNoRefs" class="h100P cursorP" style="width:40px;">
                    <img src="../../assets/images/common/popup_close.png" style="width:10px; margin-left: 8px;"/>
                  </div>
                </div>
              </div>
              <!-- target선택 팝업 -->
              <transition name="show_left">
                <SelectTargetPop
                  v-if="showRefsSelectList"
                  :pSelectData="receiverList"
                  :pReloadList="getRefreshList"
                  :pSelectedTargetList="params.refList"
                  :pSelectOnlyYn="pSelectOnlyYn"
                  @saveTarget="setSelectedRefList"
                  @closeXPop="toggleRefsSelectPop"
                  @openPop="openPop"
                />
              </transition>
            </fieldset>
          </fieldset>
          <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>
          <!-- <fieldset
            id="optionToggleBtnWrap"
            v-if="!pContentsData"
            v-show="$route.path !== '/todo'"
          >
          <fieldset v-if="$route.path === '/todo' || hasTitleYn" id="postTitle">
            <label for="">{{ $t('COMMON_TITLE_TITLE') }}</label>
            <textarea
              id="title"
              type="text"
              :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
              v-model="params.title" @input="countLines"
              style="overflow-y:scroll; white-space:wrap; padding:10px 15px 15px;"
              :style="{}"
            />
          </fieldset>
            <label for="">옵션</label>
            <div class="btnWrap">
              <button
                type="button"
                @click="toggleAnonymousYn"
                :class="{ activeBtn: params.showCreNameYn }"
              >
                <img
                  v-if="params.showCreNameYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_NAME_UNKNOWN') }}
              </button>
              <button
                type="button"
                @click="toggleCommentYn"
                :class="{ activeBtn: params.canReplyYn }"
              >
                <img
                  v-if="params.canReplyYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_TODO_COMMENT') }}
              </button>
              <button
                type="button"
                @click="toggleTitleYn"
                :class="{ activeBtn: hasTitleYn }"
              >
                <img
                  v-if="hasTitleYn"
                  src="../../assets/images/common/icon_check_commonColor.svg"
                  alt="check image"
                  class="checkImg"
                />
                {{ $t('COMMON_TITLE_TITLE') }}
              </button>
            </div>
          </fieldset> -->
        </fieldset>

        <!-- optional post values -->
        <fieldset id="optionalOptions">
          <legend>선택정 정보 설정</legend>

          <fieldset v-if="pOptions.model === 'mankik' && (!propParams || (propParams && !propParams.nonMemYn))" id="categoryTag" style=" overflow: hidden;">
            <legend>태그 선택</legend>
            <label for="">{{ $t('COMMON_TODO_TAG') }}</label>
            <!-- :class="{selfTagOpenFlex : mSelfAddTagShowYn}"  -->
            <div class="w100P" style="width:calc(100% - 62px); min-height: 2rem; float: left; display:flex; align-items:start; justify-content:space-between;">
              <div class="w100P" style="display: flex; align-items: start; gap:0.3rem; flex-wrap:wrap; justify-content:space-between;">
                <div
                class="openSelfAddTagBtn cursorP"
                :style="{width: mSelfAddTagShowYn ? '20px;' : '100%;'}"
                style="text-align:left; display: flex;"
                >
                  <div style="width: calc(100% - 30px); flaot: left; padding-top: 5px;" :style="openTagsYn? 'min-height: 25px;' : 'height: 25px;'">
                    <div v-if="mSelfAddTagShowYn" class="backgroundShadow"  style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 98;"></div>
                    <manageStickerPop ref="manageStickerPop" v-if="mSelfAddTagShowYn" :pCloseStickerPop="openSelfAddTag" />
                    <div style="width:100%;">
                      <button
                        type="button"
                        @click="toggleSelectTag(sticker, index)"
                        v-for="(sticker, index) in tagListForDom"
                        :key="sticker.stickerKey"
                        :style=" sticker.picBgPath && !sticker.isSelected? `border: 2px solid ${sticker.picBgPath};`: sticker.picBgPath && sticker.isSelected? `background: ${sticker.picBgPath}; color: #FFF;` : ''"
                        :class="{ activeBtn: sticker.isSelected }"
                        style="margin-bottom: 5px;margin-right: 5px; font-size: 13px;"
                        class="tagButton "
                      >
                        <!-- <img v-if="sticker.isSelected" src="../../assets/images/common/icon_check_commonColor.svg" alt="check image" class="checkImg" /> -->
                        {{ $changeText(sticker.nameMtext) }}
                      </button>
                    </div>
                    <gBtnSmall v-if="openTagsYn" @click="openSelfAddTag" :btnTitle="this.$t('COMMON_BTN_MANAGE')" class="fl mright-05 mtop-03 " style="height: 22px; float: left; background: #8f90cc; padding: 0 5px; font-size: 12px; line-height: 22px; font-weight:bold;"/>
                  </div>
                  <!-- @click="$refs.manageStickerPop.backClick" -->
                    <!-- <img :src="require(`@/assets/images/button/Icon_AddTag.png`)" style="width:20px;"/> -->
                    <div @click="openTagsYn = !openTagsYn" class="h100P fr cursorP" style="width:30px;">
                      <img :src="require(`@/assets/images/button/Icon_showMore.png`)" class="w100P " :style="openTagsYn?'transition: all ease 0.5s; transform: rotate( 180deg );' : ''"/>
                    </div>
                </div>
              </div>

            </div>
          </fieldset>
          <div class="w100P mtop-05" v-if="(!propParams || (propParams && !propParams.nonMemYn))" style="border-bottom:1px solid #EBEBEB;"></div>

          <fieldset v-if="contentType !== 'MEMO' && pOptions.model === 'mankik'" id="categoryTag" style="height:70px;">
            <legend>중요도 선택</legend>
            <label for="">{{$t('COMMON_TODO_PRIORITY')}}</label>
            <div class="" style=" width: calc(100% - 62px); text-align:left; position:relative;">
              <div class="tagBtnWrap" style="position:absolute; z-index:3;">
                <select class="selectPriority" id="prioritySelect" v-model="selectedPriority">
                  <option value="01">{{ $t('COMMON_TODO_MID') }}</option>
                  <option value="00">{{ $t('COMMON_TODO_HIGH') }}</option>
                  <option value="02">{{ $t('COMMON_TODO_LOW') }}</option>
                </select>
              </div>
            <div class="w100P" style="position:absolute; top:0; right:0;">
              <TalAttachFile
                @delAttachFile="delAttachFile"
                @setSelectedAttachFileList="setAttachedFile"
                :attachTrueAddFalseList="propAttachFileList"
              />
            </div>
            </div>
          </fieldset>
          <fieldset style="height: 60%">
            <legend>작성 내용</legend>
            <TalFormEditor
              ref="complexEditor"

              @changeUploadList="changeUploadList"
              @setParamInnerHtml="setParamInnerHtml"
              @postToolBox="postToolBox"
            />
            <div v-show="previewContentsShowYn" class="msgArea" id="msgBox"></div>

          </fieldset>
        </fieldset>
      </form>
    </main>
    <!-- <footer>
      <div class="footerBtnWrap">
        <button @click="postContents" style="margin-right: 10px">
          {{ pContentsData ? 'Edit' : 'Save' }}
        </button>
        <button @click="closePop">Cancel</button>
      </div>
    </footer> -->
    <commonConfirmPop v-if="failPopYn" @no="failPopYn = false" confirmType="timeout" :confirmText="errorText" />
  </div>
  <gToolBox
    :pMemoYn="pMemoYn"
    :propTools="mToolBoxOptions"
    @changeTextStyle="changeFormEditorStyle"
    style="z-index: 15 !important"
  />
</template>

<script>
// system settings
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import dayjs from 'dayjs'
import { methods } from '../../../public/commonAssets/Tal_axiosFunction.js'
import { openView } from '@/assets/js/D_openView.js'
import { commonMethods } from '@/assets/js/Tal_common.js'

// components
import manageStickerPop from './D_manageStickerPop.vue'
import SelectTargetPop from './selectTarget/SelectTargetPop.vue'
import TalFormEditor from '../unit/formEditor/Tal_formEditor.vue'
import TalAttachFile from '../unit/formEditor/Tal_attachFile.vue'
import commonConfirmPop from '../popup/confirmPop/Tal_commonConfirmPop.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  props: [
    'pOptions',
    'pUserInfo',
    'pGetTagListFn',
    'pGetReceiverList',
    'pPostContentsFn',
    'pSelectOnlyYn',
    'pClosePop',
    'pReloadList',
    // edit mode props
    'pContentsData',
    'pAttachFileList',
    'propData',
    'propParams',
    'contentTypeAB',
    'pMemoYn',
    'popUpType'
  ],
  components: {
    SelectTargetPop,
    TalFormEditor,
    TalAttachFile,
    manageStickerPop,
    commonConfirmPop
  },
  data () {
    return {
      popId: '',
      updateCount: 0,
      mSelfAddTagShowYn: false,
      openTagsYn: false,
      openTargetsYn: false,
      confirmText: '',
      progressShowYn: false,
      uploadFileList: [],
      okPopYn: false,
      showCreNameYn: true, // 작성자 명 공개
      canReplyYn: true, // 댓글 허용
      titleShowYn: false, // 제목 공개 허용
      writePushTitle: '',
      bodyString: '',
      requestPushYn: false,
      addFalseList: [],
      propFormData: [],
      editorType: 'text',
      complexOkYn: false,
      checkPopYn: false,
      selectBoardList: [],
      selectBoardYn: false,
      selectBoardCabinetKey: null,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      mIsDraggedYn: false,
      enterTarget: null,
      mSelectedTagList: [],
      mTagListForDom: []
    }
  },
  created () {
    console.log('props.propData / props.propParams', this.propData, this.propParams)
    if (!this.popUpType) {
      this.contentType = 'TODO'
    } else if (this.popUpType) {
      this.contentType = this.popUpType
    }

    // history 관리
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'writeContents' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)

    if (this.contentType === 'BOAR') {
      this.titleShowYn = true
      if (this.propData.cabinetKey) {
        this.params.selectBoardCabinetKey = this.propData.cabinetKey
      }
    }
    this.screenInnerHeight = window.innerHeight
    this.screenInnerWidth = window.innerWidth
    if (this.contentType === 'ALIM') {
      // 생성 시점에 selectedList가 있음 ==> 전체 수신이 아님 / 수정임
      if (this.propParams && this.propParams.selectedList && this.propParams.selectedList.length > 1) {
        this.setSelectedList(this.propParams.selectedList)
      }
    }
    // 수정일 때
    console.log('수정입니다 -- this.propParams', this.propParams)
    if (this.propParams && (this.propParams.bodyFullStr || this.propData.guideFullStr)) {
      console.log('수정 진행 중')

      if (this.contentType === 'ALIM') {
        console.log('알림이니까 알림에 들어옴')
        if (this.propParams.UseAnOtherYn) {
          // 게시글을 -> 알림 // 알림 -> 게시글을 할 땐 decode가 필요없기에 구분
          this.bodyString = this.decodeContents(this.propParams.bodyFullStr)
          if (this.propParams.titleStr) {
            this.titleShowYn = true
            this.writePushTitle = this.propParams.titleStr
          }
        }
      } else if (this.contentType === 'BOAR') {
        console.log('게시판이니까 게시판에 들어옴')
        this.titleShowYn = true
        if (this.propParams.UseAnOtherYn) {
          console.log('this.propData.UseAnOtherYn 있음?', this.propData.UseAfnOtherYn)
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          this.selectBoardYn = true
        } else {
          console.log('this.propData.UseAnOtherYn 없음?')
          console.log('this.propData', this.propData)
          this.bodyString = this.decodeContents(this.propData.bodyFullStr)
          this.params.modiYn = true
          this.params.title = this.propData.titleStr
        }
        if (this.propData.guideFullStr) {
          this.params.modiYn = false
          this.bodyString = this.decodeContents(this.propData.guideFullStr)
        }
        if (this.propData.titleStr) {
          this.writePushTitle = this.propData.titleStr
        }
        // 첨부파일
        // if (this.propData.attachFileList) {
        //   console.log('tempFileList', this.tempFileList)
        //   for (let i = 0; i < this.propData.attachFileList.length; i++) {
        //     const file = this.propData.attachFileList[i]
        //     this.tempFileList.push(file)
        //     if (file.attachYn) {
        //       this.propAttachFileList.push(file)
        //       this.addFalseAttachTrueFileList.push(file)
        //     } else {
        //       this.addFalseAttachFalseFileList.push(file)
        //     }
        //   }
        // }
        this.getCabinetDetail(this.propData.cabinetKey)
      }
    }
  },
  mounted () {
    if (this.bodyString !== undefined && this.bodyString !== null && this.bodyString !== '') this.settingAlim()
    // this.settingAlim()

    if (document.querySelector('#eContentsWrap')) {
      document.querySelector('#eContentsWrap').addEventListener('paste', (e) => {
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
    }

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
          jsonObj.targetKey = i - 1
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
        if (document.getElementById('msgBox') && document.getElementById('msgBox').innerHTML) {
          document.getElementById('msgBox').innerHTML = innerHtml
          document.getElementById('msgBox').innerHTML = ''
        }
        this.addFalseList = document.querySelectorAll('.msgArea .formCard .addFalse')
      }
      if (this.propData && this.propData.selectBoardYn === true) {
        this.selectBoardYn = true
        if (!this.propData.initData) {
          // this.getTeamMenuList()
        } else {
          // initData <- selectBoard에서도 구분하고 있음 수정 시 같이 봐야함!
          this.selectBoardList = this.propParams.initData
          if (this.selectBoardList.length > 0) {
            this.selectBoard(this.selectBoardList[0], 0)
          }
        }
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_STICKER_LIST () {
      const stickerList = this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
      return stickerList
    }
  },
  watch: {
    pageUpdate (value, old) {
      const history = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === history[history.length - 1]) {
        this.closePop()
      }
    },
    GE_STICKER_LIST: {
      immediate: true,
      handler (val) {
        if (val) {
          console.log(val)
          this.tagListForDom.value = val
        }
      },
      deep: true
    },
    GE_USER: {
      handler (value, old) {
        console.log(value)
        if (!value || !value.certiDate) return
        console.log(value.certiDate)
        console.log(this.selectBoardIndex)
        console.log(this.selectBoardList)
        if (value.certiDate) this.mCanWriteYn = true
      },
      deep: true
    }
  },
  methods: {
    findUrlChangeAtag (inputText) {
      const rplcdPttrn1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
      var rplcdTxt = inputText.replace(rplcdPttrn1, '<a href="$1" target="_blank">$1</a>')
      return rplcdTxt
    },
    onDragenter (event) {
      // class 넣기
      this.mIsDraggedYn = true
      this.enterTarget = event.target
    },
    onDragleave (event) {
      // class 삭제
      if (this.enterTarget === event.target) {
        event.stopPropagation()
        event.preventDefault()
        this.mIsDraggedYn = false
      }
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      event.preventDefault()
      this.mIsDraggedYn = false
      const files = event.dataTransfer.files
      const fileRef = this.$refs.attachFileRef
      if (fileRef) {
        fileRef.onDrop(files)
      }
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.openPop(param)
      // this.openPop(param)
    },
    async getCabinetDetail (cabinetKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('currentTeamKey', this.propData.currentTeamKey)
      paramMap.set('cabinetKey', cabinetKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('shareType', 'W')
      paramMap.set('userKey', this.GE_USER.userKey)
      var response = await this.$commonAxiosFunction({
        // url: '/sUniB/tp.getCabinetDetail',
        url: '/sUniB/tp.getCabinetListForMyShareType',
        param: Object.fromEntries(paramMap)
      }, true)
      var mCabinet = response.data.mCabinet
      if (mCabinet && mCabinet.fileYn) {
        this.fileYn = mCabinet.fileYn
      }
      return mCabinet
    },
    onReady (editor) {
      // Insert the toolbar before the editable area.
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      )
    },

    encodeUTF8 (str) { //  특수문자도 포함할 경우 encodeURIComponent(str)를 사용.
      return encodeURI(str)
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
      console.log('settingAlim 들어왔다')
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
    async handleImageUpload (selectFile) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      let fileExt = selectFile.name.substring(
        selectFile.name.lastIndexOf('.') + 1
      )
      // 소문자로 변환
      fileExt = fileExt.toLowerCase()
      if (
        ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
      ) {
        console.log(selectFile)
        console.log('originalFile instanceof Blob', selectFile instanceof Blob) // true
        console.log(`originalFile size ${selectFile.size / 1024 / 1024} MB`)

        try {
          // eslint-disable-next-line no-undef
          var compressedFile = await this.$imageCompression(selectFile, options)
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

          // var image = new Image()
          // image.src = src

          // image.onload = function () {
          //   // Resize image
          //   console.log(image.width + ' // ' + image.height)
          // }

          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
          // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
          // this.changeUploadList({ previewImgUrl: src, addYn: true, file: newFile })
          this.$refs.complexEditor.addFormCard('image', src, true, true)
          this.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: src, addYn: true, file: newFile, targetKey: newFile.name }, originalType: 'image' })
          /* await uploadToServer(compressedFile) */ // write your own logic
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
            thisthis.$refs.complexEditor.successImgPreview({ targetKey: document.querySelectorAll('#eContentsWrap .formDiv').length - 1, selectFileList: { previewImgUrl: result.path, addYn: true, file: result.file, targetKey: result.file.name }, originalType: 'image' })
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
      // eslint-disable-next-line no-debugger
      debugger
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
          const oldFile = thisthis.uploadFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), { type: oldFile.type })
          form.append('files[0]', newFile)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://mzoin.com/fileServer/tp.uploadFile', form,
              /* {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              }, */
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              console.log(res)
              if (res.data.length > 0) {
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
                if (!uploadFile.attachYn && (iList[il].attributes.filekey === undefined || iList[il].attributes.filekey === null || iList[il].attributes.filekey === '')) {
                  if (iList[il].src === uploadFile.previewImgUrl) {
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
        this.$showToastPop(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    },
    setSelectedAttachFileList (sFile) {
      if (sFile.addYn === true) {
        this.uploadFileList.push(sFile)
      }
      // console.log(this.uploadFileList)
    },

    // 원래데이터
    closeXPop (reloadYn) {
      if (this.pClosePop) {
        this.pClosePop()
      }
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop', true)
    },
    toggleTargetsArea () {
      this.openTargetsYn = !this.openTargetsYn
    },
    openSelfAddTag () {
      this.mSelfAddTagShowYn = !this.mSelfAddTagShowYn
    },
    getMonthDate (date) {
      var format = 'MM/DD'
      return this.$dayjs(date).add(9, 'hour').format(format)
    },
    openPop (params) {
      this.$emit('openPop', params)
    },
    closePop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory('selectTargetPop')
      if (this.pClosePop) {
        this.pClosePop()
      }
    }
  },
  setup (props, context) {
    const store = useStore()
    const failPopYn = ref(false)
    const errorText = ref('')
    // submit params 세팅
    const params = reactive({
      title: '',
      actorList: [],
      checkList: [],
      refList: [],
      attachMfilekey: '',
      workToDateStr: null,
      workFromDateStr: null,
      nowDateStr: dayjs(new Date()).format('YYYY-MM-DD'),
      bodyFullStr: '',
      stickerList: [],
      attachFileList: [],
      showCreNameYn: false,
      workStatCreUserName: '',
      canReplyYn: true,
      priority: '01',
      mLoadingYn: false,
      mSelfTag: '',
      lineCount: 0,
      selectBoardCabinetKey: 0,
      allRecvYn: false,
      cabBlindYn: false,
      modiYn: false
    })

    // 검토, 공개 영역 제어하기
    // let openTargetsYn = reactive(false)
    // const
    const showReceiverSelectList = ref(false)
    const showCheckSelectList = ref(false)
    const showRefsSelectList = ref(false)
    var selectBoardIndex = ref(0)
    var mCanWriteYn = reactive(false)
    var writeBoardPlaceHolder = reactive('')
    var gCertiPopShowYn = reactive(false)
    var cabinetName = reactive('')
    // var chanList = reactive([])

    const decodeContents = (data) => {
      console.log('decode 실행되었습니다.')
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    }

    // 채널 불러오기

    // 게시판 선택하기
    const selectBoard = async (data, index) => {
      console.log('선택된 게시판', data)
      // eslint-disable-next-line no-debugger
      debugger
      selectBoardIndex.value = index
      mCanWriteYn = true
      var mCabinet
      if (!props.propData.initData) {
        mCabinet = await this.getCabinetDetail(data.cabinetKey)
        var mCabinetShare = mCabinet.mShareItemList
        if (mCabinetShare[0]) {
          if (mCabinetShare[0].shareType) {
            params.selectBoardCabinetKey = mCabinetShare[0].cabinetKey
            cabinetName = data.cabinetNameMtext
            writeBoardPlaceHolder = ''
          } else {
            params.selectBoardCabinetKey = null
            writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
            return
          }
        } else {
          params.selectBoardCabinetKey = null
          writeBoardPlaceHolder = this.$t('FORM_MSG_NOPERM')
          return
        }
      } else {
        mCabinet = data
        if (contentType.value === 'BOAR' && (!store.getters['D_USER/GE_USER'].certiDate) && (mCabinet.blindYn === 1 || mCabinet.blindYn === true)) {
          // 익명게시판일 떄
          mCanWriteYn = false
          gCertiPopShowYn = true
          return
        }
        params.selectBoardCabinetKey = mCabinet.cabinetKey
        cabinetName = mCabinet.cabinetNameMtext
      }
      if (mCabinet.guideFullStr) {
        console.log('HI?')
        complexEditor.value.addFormCard('text', decodeContents(mCabinet.guideFullStr))
        console.log('mCabinetvmCabinet', mCabinet)
      }
      if (mCabinet.blindYn) {
        params.cabBlindYn = true
      }
    }
    // 제목 입력 란 높이 수정
    const countLines = () => {
      const textarea = document.querySelector('textarea')
      textarea.style.minHeight = '50px'
      textarea.style.maxHeight = '90px'
      if (textarea.scrollHeight > 87) {
        textarea.style.height = textarea.scrollHeight + 'px'
      }
    }
    // target data를 공통 작성 화면에서 원하는 형태로 컨버팅 하는 함수
    const convertTargetData = (target) => {
      // console.log(target)
      if (target && target.length > 0) {
        const tempList = []
        target.forEach((value) => {
          tempList.push({
            accessKind: 'U',
            accessKey: value.userKey,
            accessName: commonMethods.changeText(value.userDispMtext),
            iconFullYn: true,
            iconPath: value.domainPath
              ? commonMethods.changeUrlBackslash(
                value.domainPath + value.userProfileImg
              )
              : value.userProfileImg
          })
        })
        return tempList
      }
    }
    const getTeamMenuList = async () => {
      receiverList.splice(0, receiverList.length)
      var paramMap = new Map()
      paramMap.set('teamKey', props.propData.teamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      console.log('paramMap', paramMap)
      var result = await methods.getTeamMenuList(paramMap)

      var tempList = []
      if (result) {
        for (let i = 0; i < result.length; i++) {
          tempList.push({
            accessKey: result[i].cabinetKey,
            accessKind: 'C',
            accessName: commonMethods.changeText(result[i].cabinetNameMtext),
            accessDispComment: '',
            cList: convertTargetData(result[i].mUserList)
            // cList: result[i].mUserList
          })
        }
        receiverList.push({
          tabIndex: 0,
          tabType: 'TEAM',
          tabName: commonMethods.changeText(props.propParams.targetNameMtext),
          targetList: tempList
        })
        console.log('2차 receiverList', receiverList)
      }
    }

    // ------------------- 기본값 설정
    const receiverList = reactive([])
    console.log('receiverList')
    console.log(props.pGetReceiverList)
    if (props.pGetReceiverList) {
      receiverList.splice(0, receiverList.length)
      const test = props.pGetReceiverList()
      console.log(test)
      test.forEach(recv => {
        receiverList.push(recv)
      })
    } else if (!props.pGetReceiverList) {
      getTeamMenuList()
    }
    const getRefreshList = () => {
      receiverList.splice(0, receiverList.length)
      props.pReloadList().then(() => {
        const test = props.pGetReceiverList()
        console.log(test)
        test.forEach(recv => {
          receiverList.push(recv)
        })
        console.log(receiverList)
      })
    }
    console.log('props.pGetReceiverList', props.pGetReceiverList)

    let stickerList = reactive([])
    if (props.pGetTagListFn) {
      stickerList = props.pGetTagListFn()
      console.log('stickerList', stickerList)
    }

    var gOldFromDate = null
    var gOldToDate = null

    // ------------------- edit 관련 함수
    // * 주소록(타겟) 이름 값만 추출
    const propsTargetNameEditing = (text) => {
      let changeTxt = ''
      if (text) {
        changeTxt = text
        let indexOf = text.indexOf('KO$^$')

        if (indexOf === -1) {
          indexOf = text.indexOf('EN$^$')
          if (indexOf === -1) {
            return changeTxt
          } else {
            const returnMap = new Map()
            const splitMtext = text.split('$#$')
            // split if ~> $$가 없다면?
            for (let i = 0; i < splitMtext.length; i++) {
              const splitMtextDetail = splitMtext[i].split('$^$')
              // split if ~> $$가 없다면?
              returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
            }
            changeTxt = returnMap.get('EN')
          }
        } else {
          const returnMap = new Map()
          const splitMtext = text.split('$#$')
          // split if ~> $$가 없다면?
          for (let i = 0; i < splitMtext.length; i++) {
            const splitMtextDetail = splitMtext[i].split('$^$')
            // split if ~> $$가 없다면?
            returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
          }
          changeTxt = returnMap.get('KO')
        }
      }
      return changeTxt
    }

    // * bodyFullStr decoding 함수
    const setBodyLength = (str, completeYn) => {
      if (!str) return
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      str.replace('contenteditable= true', '')
      str = str.replaceAll('<pre', '<div')
      str = str.replaceAll('</pre', '</div')
      if (completeYn) {
        str = str.replaceAll(
          'formCard formText ',
          'formCard formText completeWork '
        )
      }
      return str
    }

    // * 편집 데이터로 formCard생성하기
    const replaceTargetInChild = (stringHTML) => {
      const parser = new DOMParser()
      const parsedHTML = parser.parseFromString(stringHTML, 'text/html')

      // 기존 코드 활용해서 formCard삽입
      var temp = document.createElement('div')
      temp.innerHTML = stringHTML
      // var innerHtml = ''
      var newArr = []
      var formC = temp.getElementsByClassName('formCard')
      // eslint-disable-next-line no-new-object
      var jsonObj = new Object()
      var imgYn = true
      for (var i = 0; i < formC.length; i++) {
        // eslint-disable-next-line no-new-object
        jsonObj = new Object()
        imgYn = true
        // innerHtml += formC[i].outerHTML
        jsonObj.innerHtml = formC[i].innerHTML
        jsonObj.type = 'image'
        jsonObj.targetKey = i
        for (var c = 0; c < formC[i].classList.length; c++) {
          // // eslint-disable-next-line no-debugger
          // debugger
          if (formC[i].classList[c] === 'formText') {
            // jsonObj.innerHtml = this.$findATagDelete(formC[i].innerHTML)
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
        firstSettingDiv.attributes.creTeamKey = 0
        firstSettingDiv.id = 'formEditText'
        firstSettingDiv.attributes.contentEditable = false
        firstSettingDiv.style.padding = '0px 20px'
        firstSettingDiv.style.display = 'inline-block'
        firstSettingDiv.style.width = '100%'
        firstSettingDiv.style.borderRight = 'rgb(204, 204, 204)'
        firstSettingDiv.style.wordBreak = 'break-all'
        firstSettingDiv.innerHTML = parsedHTML.body
        // jsonObj.innerHtml = this.$findATagDelete(firstSettingDiv.innerHTML)
        jsonObj.type = 'text'
        imgYn = false
        newArr.push(jsonObj)
      }
      complexEditor.value.setFormCard(newArr)

      // ************************************ [수정] 이미 있는 파일 리스트 따로 보관하고 있어야 함
      // this.addFalseList = document.querySelectorAll('.dragCompp .formCard .addFalse')
    }
    // --------------------------------------------------------------

    // 첨부파일 관련 리스트
    const addFalseAttachFalseFileList = reactive([])
    const addFalseAttachTrueFileList = []
    const propAttachFileList = reactive([])
    // ------------------- DOM 생성 후 실행될 로직
    onMounted(() => {
      // fromDate
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const currentDate = `${year}-${month}-${day}`
      const fromDateInput = document.getElementById('fromDate')
      const toDateInput = document.getElementById('fromDate')
      if (fromDateInput) {
        params.workFromDateStr = currentDate
      }
      if (toDateInput) {
        params.workToDateStr = currentDate
      }
      gOldFromDate = currentDate
      gOldToDate = currentDate

      const route = useRoute()

      if (route.path === '/todo') {
        hasTitleYn.value = true
      }
      // >---- 편집 상태일 때 세팅 TODO----<
      if (props.pContentsData) {
        console.log('TODO 수정하기 - 들어왔음.', props.pContentsData)
        // --- 수정일때, attachMfilekey 데이터 연결
        if (props.pContentsData && props.pContentsData.attachMfilekey) {
          params.attachMfilekey = props.pContentsData.attachMfilekey
        }
        // --- title 데이터 연결
        params.title = props.pContentsData.title
        // --- 기간 데이터 연결
        params.workFromDateStr = props.pContentsData.workFromDate
        params.workToDateStr = props.pContentsData.workToDate

        if (params.title) {
          hasTitleYn.value = true
        }
        // 선택된 주소록(target) 데이터 연결

        const format = 'YYYY-MM-DD'
        // --- 날짜 데이터 연결
        if (props.pContentsData.workFromDate) {
          params.workFromDateStr = dayjs(props.pContentsData.workFromDate).add(9, 'hour').format(format)
          console.log(params.workFromDateStr)
          const fromDateInput = document.getElementById('fromDate')
          if (fromDateInput) {
            fromDateInput.value = params.workFromDateStr
          }
        }
        if (props.pContentsData.workToDate) {
          params.workToDateStr = dayjs(props.pContentsData.workToDate).add(9, 'hour').format(format)
          const toDateInput = document.getElementById('toDate')
          if (toDateInput) {
            toDateInput.value = params.workToDateStr
          }
        }

        // 선택된 주소록(target) 데이터 연결
        params.actorList.length = 0
        let addMeYn = false
        params.refList.length = 0
        params.checkList.length = 0

        for (const editingTarget of props.pContentsData.actorList) {
          // params.actorList.length = 0
          if (editingTarget.accessKind === 'U' && editingTarget.accessKey === store.getters['D_USER/GE_USER'].userKey) {
            addMeYn = true
          }
          const actorObj = {
            accessKey: editingTarget.accessKey,
            contentsKey: editingTarget.contentsKey,
            accessKind: editingTarget.accessKind
          }
          if (editingTarget.accessKind === 'U') {
            actorObj.iconPath = editingTarget.domainPath + editingTarget.pathMtext
            actorObj.accessName = editingTarget.userDispMtext
            actorObj.userKey = editingTarget.userKey
            actorObj.actType = editingTarget.actType
          } else if (editingTarget.accessKind === 'C') {
            actorObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            actorObj.accessName = editingTarget.cabinetNameMtext
            actorObj.cabinetKey = editingTarget.accessKey
            actorObj.actType = editingTarget.actType
          }

          if (editingTarget.actType === 'RV') {
            params.actorList.push(actorObj)
          } else if (editingTarget.actType === 'RF') {
            params.refList.push(actorObj)
          } else if (editingTarget.actType === 'CK') {
            if (editingTarget.accessKind === 'U' && editingTarget.accessKey === store.getters['D_USER/GE_USER'].userKey) {

            } else {
              params.checkList.push(actorObj)
            }
          }
        }
        if (params.actorList.length > 0) {
          selectMeYn.value = true
          if (params.actorList.length === 1 && addMeYn) {
            selectMeYn.value = true
          } else {
            selectMeYn.value = false
          }
        }

        if (params.refList && params.refList.length > 0) {
          selectRefsYn.value = true
        }

        if (params.checkList && params.checkList.length > 0) {
          selectCheckYn.value = true
        }
        console.log(params)

        // bodyFullStr 디코딩 후 formCard 생성
        params.bodyFullStr = setBodyLength(props.pContentsData.bodyFullStr)
        if (params.bodyFullStr) {
          replaceTargetInChild(params.bodyFullStr) // DOM tree에서 원하는 대상 찾아 교체
        }

        // ------------------- edit상태에서 첨부 파일 관련 로직
        if (props.pContentsData.attachFileList) {
          for (let i = 0; i < props.pContentsData.attachFileList.length; i++) {
            const file = props.pContentsData.attachFileList[i]
            tempFileList.push(file)
            if (file.attachYn) {
              propAttachFileList.push(file)
              addFalseAttachTrueFileList.push(file)
            } else {
              addFalseAttachFalseFileList.push(file)
            }
          }
        }

        for (let i = 0; i < tagListForDom.length; i++) {
          for (let j = 0; j < props.pContentsData.stickerList.length; j++) {
            if (
              tagListForDom[i].stickerKey ===
            props.pContentsData.stickerList[j].stickerKey
            ) {
              toggleSelectTag(tagListForDom[i], i)
              // const stickerObj = {
              //   stickerKey: props.pContentsData.stickerList[j].stickerKey,
              //   nameMtext: props.pContentsData.stickerList[j].nameMtext,
              //   picBgPath: props.pContentsData.stickerList[j].picBgPath
              // }
              // params.stickerList.push(stickerObj)
              tagListForDom[i].isSelected = true
              break
            }
          }
        }
      }
    })
    const delAttachFile = (val) => {
      if (tempFileList.findIndex(f => f.fileKey === val.fileKey) !== -1 || tempFileList.findIndex(f => f.attachKey === val.attachKey) !== -1) {
        let index = tempFileList.findIndex(f => f.fileKey === val.fileKey)
        if (index !== -1) {
          tempFileList[index].addYn = false
        } else {
          index = tempFileList.findIndex(f => f.attachKey === val.attachKey)
          if (index !== -1) {
            tempFileList.splice(index, 1)
          }
        }
      }
      console.log(tempFileList)
    }
    // eslint-disable-next-line no-unused-vars
    const setAttachFileList = () => {
      // 계획
      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      // 2. 이미 있던 사진을 포함해서 수정: 서버에서 중복저장 되지 않게
      // const delFileList = []
      const iList = document.querySelectorAll('.formCard .addFalse')
      let delYn = true
      // 1. 이미 있던 사진을 삭제해서 수정(업데이트 하는경우): addYn: false // 삭제한 파일도 포함해야함
      for (let i = tempFileList.length - 1; i > -1; i--) {
        const tempFile = tempFileList[i]
        for (let j = 0; addFalseAttachTrueFileList.length; j++) {
          const propAttachFile = addFalseAttachTrueFileList[j]
          // let deleteYn = true
          if (!propAttachFile) break
          if (tempFile.fileKey && tempFile.fileKey === propAttachFile.file) {
            // tempFileList[i].addYn = false
            delYn = false
          }
          /*
          if (deleteYn) {
            tempFileList[i].addYn = false
            delFileList.push(tempFileList[i])
            tempFileList.splice(i, 1)
          } */
        }
        for (let s = 0; s < iList.length; s++) {
          const img = iList[s]
          console.log(img)
          if (tempFile.fileKey && Number(tempFile.fileKey) === Number(img.attributes.filekey.value)) {
            delYn = false
          }
        }
        if (delYn && !tempFileList[i].addYn) {
          tempFileList[i].addYn = false
        }
      }
    }

    // 날짜 변화 체크 로직
    watch(
      () => [params.workFromDateStr, params.workToDateStr],
      (newP) => {
        console.log('============== param changed check', newP)
        const newFromDate = newP[0]
        const newToDate = newP[1]

        let changeType = 'N'
        if (newFromDate !== gOldFromDate) {
          changeType = 'F'
        } else if (newToDate !== gOldToDate) {
          changeType = 'T'
        }

        // from변경시, to보다 이후면 to를 from으로 변경
        // to변경시, to보다 이후면 to를 to으로 변경
        if (newFromDate > newToDate) {
          if (changeType === 'F') {
            params.workToDateStr = newP[0]
          } else if (changeType === 'T') {
            params.workFromDateStr = newP[1]
          } else {
          }
        }
        gOldFromDate = newP[0]
        gOldToDate = newP[1]
      }
    )

    // 익명 & 댓글 & 제목 여부 설정
    const toggleAnonymousYn = () => {
      params.showCreNameYn = !params.showCreNameYn
    }
    const toggleCommentYn = () => {
      params.canReplyYn = !params.canReplyYn
    }
    const hasTitleYn = ref(false)
    const toggleTitleYn = () => {
      hasTitleYn.value = !hasTitleYn.value
    }
    // 쪽지 보낼 때 팝업
    const openPushReceiverSelect = async () => {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = props.propParams.targetKey
      param.teamKey = props.propParams.targetKey
      param.teamNameMtext = props.propParams.teamNameMtext
      var selectListParamMap = new Map()
      selectListParamMap.set('teamKey', props.propParams.targetKey)
      param.param = selectListParamMap
      var initData = await openView.getGPopData(param)
      console.log('initData', initData)
      param.initData = initData
      var selectedList = receiverList
      param.pSelectedList = selectedList
      context.emit('openPop', param)
    }
    // Target 선택 기능
    const toggleReceiverSelectPop = () => {
      showReceiverSelectList.value = !showReceiverSelectList.value
      if (
        showReceiverSelectList.value && params.actorList && params.actorList.length > 0 &&
        params.actorList[0].accessKey === store.getters['D_USER/GE_USER'].userKey
      ) {
        // params.actorList = []
        /* if (params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U')) !== -1) {
          alert(true)
          const index = params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U'))
          params.checkList.splice(index, 1)
        } */
      } else if (!showRefsSelectList.value) {
        /* if (params.checkList.findIndex((check) => (check.accessKey = store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U')) === -1) {
          params.checkList.push({
            accessKey: store.getters['D_USER/GE_USER'].userKey,
            accessKind: 'U',
            actType: 'CK',
            accessName: store.getters['D_USER/GE_USER'].userDispMtext
          })
        }
        selectCheckYn.value = true */
      }
    }

    // 검토자 선택 기능
    const toggleCheckSelectPop = () => {
      showCheckSelectList.value = !showCheckSelectList.value
    }

    const selectCheckYn = ref(false)
    const selectNoCheck = () => {
      params.checkList = []
      // params.checkList.push({ accessKey: store.getters['D_USER/GE_USER'].userKey, accessKind: 'U' })
    }
    selectNoCheck()

    const setSelectedCheckList = (selectedTargetList) => {
      // for (let i = 0; i < selectedTargetList.length; i++) {
      //   selectedTargetList[i].actType = 'CK'
      // }
      params.checkList = selectedTargetList
      selectCheckYn.value = true
    }

    // 참조자 선택 기능
    const toggleRefsSelectPop = () => {
      showRefsSelectList.value = !showRefsSelectList.value
    }

    const selectRefsYn = ref(false)
    const selectNoRefs = () => {
      params.refList = []
      // params.refList.push({ accessKey: store.getters['D_USER/GE_USER'].userKey, accessKind: 'U' })
    }
    selectNoRefs()

    const setSelectedRefList = (selectedTargetList) => {
      // for (let i = 0; i < selectedTargetList.length; i++) {
      //   selectedTargetList[i].actType = 'RF'
      // }
      params.refList = selectedTargetList
      console.log(params.refList)
      selectRefsYn.value = true
    }
    const replaceStickerArr = (arr) => {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => item.nameMtext.trim() === current.nameMtext.trim()
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    }

    const replaceActorArr = (arr) => {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => (item.accessKind === current.accessKind && item.accessKey === current.accessKey && item.actType === current.actType)
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
          console.log(data)
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    }
    const selectMeYn = ref(false)
    const selectTargetOnlyMe = () => {
      if (!(props.popUpType && props.popUpType === 'ALIM')) {
        params.actorList.length = 0
        params.actorList.push({
          accessKey: store.getters['D_USER/GE_USER'].userKey,
          accessName: store.getters['D_USER/GE_USER'].userDispMtext,
          iconPath: store.getters['D_USER/GE_USER'].domainPath
            ? commonMethods.changeUrlBackslash(
              store.getters['D_USER/GE_USER'].domainPath + store.getters['D_USER/GE_USER'].userProfileImg
            )
            : store.getters['D_USER/GE_USER'].userProfileImg,
          accessKind: 'U'
        })
        selectMeYn.value = true
      }
    }
    if (!props.popUpType || (props.popUpType && (props.popUpType === 'TODO' || props.popUpType === 'ALIM'))) selectTargetOnlyMe()

    const setSelectedTargetList = (selectedTargetList) => {
      params.actorList = selectedTargetList
      console.log(params.actorList)
      selectMeYn.value = false
    }

    // 우선순위 priority
    const selectedPriority = ref('01')
    watch(selectedPriority, (newValue, oldValue) => {
      console.log('newValue', newValue)
      params.priority = newValue
    })

    // Tag(category) 선택 기능
    const tagListForDom = reactive([]) // 원본 유지를 위한 복사
    watch(
      () => tagListForDom.value,
      (val) => {
        const currentData = params.stickerList
        console.log(currentData)
        tagListForDom.splice(0, tagListForDom.length)
        if (val && val.length) {
          val.forEach((sticker) => {
            const stickerObj = {
              stickerKey: sticker.stickerKey,
              nameMtext: sticker.nameMtext,
              picBgPath: sticker.picBgPath
            }
            const index = currentData.findIndex((item) => item.stickerKey === sticker.stickerKey)
            if (index !== -1) {
              stickerObj.isSelected = true
            }
            tagListForDom.push(stickerObj)
          })
        }
        console.log(tagListForDom)
      },
      { deep: true }
    )
    if (stickerList.length) {
      stickerList.forEach((sticker, index) => {
        const stickerObj = {
          stickerKey: sticker.stickerKey,
          nameMtext: sticker.nameMtext,
          picBgPath: sticker.picBgPath
        }
        stickerObj.isSelected = false
        /* if (index === 0) {
          stickerObj.isSelected = true
          params.stickerList.push(stickerObj)
        } else {
          stickerObj.isSelected = false
        } */
        tagListForDom.push(stickerObj)
      })
    }
    const selfAddTag = ref('')
    const selectColor = ref('#CCC')
    const changeTagColor = (color) => {
      selectColor.value = color
      toggleAddTagShowYn()
    }

    const addTagShowYn = ref(false)
    const toggleAddTagShowYn = () => {
      addTagShowYn.value = !addTagShowYn.value
    }

    const addSelfTag = (selfAddTag) => {
      if (selfAddTag.trim() !== '') {
        console.log('KO$^$' + selfAddTag)
        tagListForDom.unshift({ nameMtext: 'KO$^$' + selfAddTag, stickerKey: null, picBgPath: selectColor, creUserKey: store.getters['D_USER/GE_USER'].userKey, isSelected: true })
        removeSelfTag()
      }
      params.stickerList.unshift({ nameMtext: 'KO$^$' + selfAddTag, stickerKey: null, picBgPath: selectColor, creUserKey: store.getters['D_USER/GE_USER'].userKey, isSelected: true })
      console.log('params.stickerList', params.stickerList)
    }
    const removeSelfTag = () => {
      selfAddTag.value = ''
    }

    const toggleSelectTag = (selectedTag, index) => {
      console.log('params.stickerList', params.stickerList)
      const indexToRemove = params.stickerList.findIndex((st) => st.nameMtext === selectedTag.nameMtext)
      console.log(params.stickerList)
      if (indexToRemove !== -1) {
        params.stickerList.splice(indexToRemove, 1)
        tagListForDom[index].isSelected = false
      } else {
        const stickerObj = {
          stickerKey: selectedTag.stickerKey,
          nameMtext: selectedTag.nameMtext,
          picBgPath: selectedTag.picBgPath
        }
        params.stickerList.push(stickerObj)
        tagListForDom[index].isSelected = true
      }
      params.stickerList = replaceStickerArr(params.stickerList)
    }

    // attach file 설정
    const tempFileList = reactive([])
    console.log('tempFileList', tempFileList.length)

    // ------ 업로드한 파일 변수에 담기
    const setAttachedFile = (fileList) => {
      if (fileList.addYn === true) {
        tempFileList.push(fileList)
      }
      if (hasTitleYn.value && !params.title) {
        params.title = fileList.file.name
      }
      console.log(tempFileList, tempFileList.length)
    }
    // formEditor 사용 업로드 시
    const changeUploadList = (upList) => {
      if (tempFileList.length > 0) {
        console.log(
          tempFileList.findIndex((item) => item.targetKey === upList.targetKey)
        )
        const index = tempFileList.findIndex(
          (item) => item.targetKey === upList.targetKey
        )
        if (index === -1) {
          const temp = []
          for (const file of tempFileList) {
            temp.push(file)
          }
          tempFileList.length = 0
          for (const file of temp) {
            tempFileList.push(file)
          }
          tempFileList.push(upList)
          // tempFileList = [...temp, upList]
        } else if (index !== -1) {
          tempFileList.splice(index, 1, upList)
        }
      } else {
        tempFileList.push(upList)
      }
    }
    // ------ 파일 서버에 업로드
    const fileDataUploadToServer = async () => {
      if (tempFileList.length > 0) {
        let iList = document.querySelectorAll('.formCard .addTrue')
        let form = new FormData()
        for (var i = 0; i < tempFileList.length; i++) {
          form = new FormData()
          if (tempFileList[i].fileKey) continue
          const oldFile = tempFileList[i].file
          const newFile = new File([oldFile], oldFile.name.normalize('NFC'), {
            type: oldFile.type
          })
          form.append('files[0]', newFile)
          await axios
            // 파일서버 fileServer fileserver FileServer Fileserver
            .post(props.pOptions.fileServerURL, form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then((res) => {
              console.log(res)
              if (res.data.length > 0) {
                if (tempFileList[i].attachYn === true) {
                  tempFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                tempFileList[i].successSave = true
                tempFileList[i].filePath = path
                tempFileList[i].fileSizeKb = res.data[0].fileSizeKb
                tempFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch((error) => {
              // this.response = error
              // this.isUploading = false
              console.log(error)
            })
        }
        iList = document.querySelectorAll('.formCard .addTrue')
        if (iList.length > 0) {
          for (let s = 0; s < tempFileList.length; s++) {
            const uploadFile = tempFileList[s]
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
                    tempFileList[s].attachYn = false
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
              tempFileList.splice(s, 1)
            }
          }
        }
      } else {
        // alert(this.$t('COMMON_MSG_NOFILE'))
      }
      return true
    }
    // ------ 서버에 업로드된 파일 정보로 데이터 재가공
    const handleFileListForUpload = () => {
      const newAttachFileList = []
      for (let i = 0; i < tempFileList.length; i++) {
        // if (tempFileList[i].fileKey) continue
        const fileObj = {}
        fileObj.addYn = true
        fileObj.attachYn = true
        fileObj.fileName = 'dAlimImg'
        if (tempFileList[i].addYn !== undefined && tempFileList[i].addYn !== null) {
          fileObj.addYn = tempFileList[i].addYn
        }
        if (tempFileList[i].attachYn !== undefined && tempFileList[i].attachYn !== null) {
          fileObj.attachYn = tempFileList[i].attachYn
        }
        fileObj.fileKey = tempFileList[i].fileKey
        if (tempFileList[i].file) {
          fileObj.fileName = tempFileList[i].file.name.normalize('NFC')
        }
        newAttachFileList.push(fileObj)
      }
      return newAttachFileList
    }

    // 제목이 없을 경우 내용을 제목으로 넣어주는 함수
    const titleToBody = (inHtml) => {
    // eslint-disable-next-line no-debugger
      debugger
      var titleText = ''
      var childNodes = inHtml.childNodes
      var valueTextIdx = 0
      for (var i = 0; i < childNodes.length; i++) {
        titleText += childNodes[i].textContent + ' '
        titleText = titleText.trimLeft()
        if (titleText === '') valueTextIdx += 1
        if (titleText.length >= 6 && i === valueTextIdx) {
          titleText = titleText.length > 256 ? titleText.substring(0, 254) + '..' : titleText.substring(0, 254)
          break
        }
        if (titleText.length > 254) {
          titleText = titleText.substring(0, 254) + '..'
          break
        }
      }
      return titleText
    }
    // Todo 최종 Submit
    const postContents = async () => {
      if (!props.popUpType || (props.popUpType && (props.popUpType === 'TODO' || props.popUpType === 'MEMO'))) { // 공통화 되어야 함
        console.log('herererr')
        try {
          if (params.mLoadingYn) return
          if (tempFileList.length > 0) {
            await fileDataUploadToServer()
          }
          await setAttachFileList()
          params.attachFileList = handleFileListForUpload()

          // formEditor 작성 내용 추출
          boardDataCheck()

          // 제목 옵션 false일 때 자동 제목 생성
          if (!hasTitleYn.value) {
            if (!params.title && extractedInnerHtml) {
              params.title = extractedInnerHtml
            } else if (
              !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
            ) {
              params.title = params.attachFileList[0].fileName
            }
          }
          params.workStatCreUserName = store.getters['D_USER/GE_USER'].userDispMtext
          delete params.allRecvYn

          if (!props.popUpType || (props.popUpType && props.popUpType === 'TODO')) {
            // 참조자 처리 추가
            if (params.refList) {
              // params.actorList = [
              //   ...params.actorList,
              //   ...params.refList
              // ]
              // delete params.refList
            }
            // 검토자 처리 추가
            if (params.checkList) {
              // params.actorList = [
              //   ...params.actorList,
              //   ...params.checkList
              // ]
              // delete params.checkList
            }
            // params.actorList = replaceActorArr(params.actorList)
            console.log('postContents', params.actorList)
            // 나는 무조건 검토자로 추가
            if (params.checkList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
              params.checkList.push({
                accessKey: store.getters['D_USER/GE_USER'].userKey,
                accessKind: 'U',
                accessName: store.getters['D_USER/GE_USER'].userDispMtext
              })
            }
          }
          if (params.stickerList) {
            params.stickerList = replaceStickerArr(params.stickerList)
          }
          console.log(params)
          // params value 체크
          if (props.pOptions.model === 'mankik') {
            if (!props.popUpType || (props.popUpType && props.popUpType === 'TODO')) {
              if (params.actorList.length === 0 && selectMeYn) {
                params.actorList.push({
                  accessKind: 'U',
                  accessName: store.getters['D_USER/GE_USER'].userDispMtext,
                  iconPath: store.getters['D_USER/GE_USER'].domainPath
                    ? commonMethods.changeUrlBackslash(
                      store.getters['D_USER/GE_USER'].domainPath + store.getters['D_USER/GE_USER'].userProfileImg
                    )
                    : store.getters['D_USER/GE_USER'].userProfileImg,
                  accessKey: store.getters['D_USER/GE_USER'].userKey
                })
              }
            }
            if ((!props.popUpType || (props.popUpType && props.popUpType === 'TODO')) && !params.workToDateStr) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_DATE')
              // } else if (route.path !== '/todo' && (!params.bodyFullStr && !params.attachFileList.length)) {
            } else {
              // eslint-disable-next-line no-unreachable
              const parser = new DOMParser()
              const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
              const tempTitle = titleToBody(doc)
              // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
              if (hasTitleYn.value && !params.title) {
                if (tempTitle) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                } else {
                  // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE')
                }
              } else {
                // 제목은 있고, 내용이 없을 경우에는 저장됨
                if (params.title.length > 256) {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
                } else {
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                }
              }
            }
          } else if (props.pOptions.model === 'unibuzzy') {
            const parser = new DOMParser()
            const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
            const tempText = titleToBody(doc)
            if (!tempText && !params.attachFileList.length) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
            } else {
              if (hasTitleYn.value && !params.title) {
                if (params.bodyFullStr) {
                  params.title = titleToBody(doc)
                  params.mLoadingYn = true
                  props.pPostContentsFn(params)
                } else {
                  failPopYn.value = true
                  errorText.value = this.$t('COMM_ERR_NO_TITLE')
                }
              } else {
                params.mLoadingYn = true
                props.pPostContentsFn(params)
              }
            }
          }
          console.log('TO Do params', params)
        } catch (error) {
          params.mLoadingYn = false
          console.log('send todo error error error', error)
        }
      } else if (contentType.value === 'ALIM') {
        sendLetter()
      } else if (contentType.value === 'BOAR') {
        sendBoard()
      }
    }

    const sendLetter = async () => {
      try {
        if (params.mLoadingYn) return

        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        await setAttachFileList()
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        delete params.selectBoardCabinetKey
        delete params.mSelfTag
        delete params.lineCount

        params.bodyHtmlYn = true // 기본알림또한 html형식으로 들어감
        params.bodyHtmlYn = true
        if (params.actorList && params.actorList.length > 0 && params.actorList[0].accessKind === 'T') {
          params.teamName = params.actorList[0].accessName
          params.creTeamKey = params.actorList[0].accessKey
        }
        /* if (props.propParams.currentTeamKey || props.propParams.creTeamKey) {
          params.creTeamKey = props.propParams.currentTeamKey || props.propParams.creTeamKey
        } */

        // params.showCreNameYn = true
        // params.canReplyYn = true
        params.workStatCreUserName = store.getters['D_USER/GE_USER'].userDispMtext

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }
        // 참조자 처리 추가
        if (params.refList) {

        }
        // 검토자 처리 추가
        if (params.checkList) {

        }
        console.log('postContents', params.actorList)

        // 나는 무조건 검토자로 추가
        // if (params.checkList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
        //   params.checkList.push({
        //     accessKey: store.getters['D_USER/GE_USER'].userKey,
        //     accessKind: 'U',
        //     accessName: store.getters['D_USER/GE_USER'].userDispMtext
        //   })
        // }
        params.actorList = replaceActorArr(params.actorList)
        if (params.actorList && params.actorList.length > 0) {
          if (params.actorList[0].accessKind === 'T') {
            params.allRecvYn = true
            params.actorList = []
          }
        }
        console.log('sendLetter params.actorList', params.actorList)

        // 스티커
        if (params.stickerList) {
          params.stickerList = replaceStickerArr(params.stickerList)
        }
        // 우선순위
        if (params.priority) {
          params.priority = selectedPriority
        }

        // params value 체크
        if (props.pOptions.model === 'mankik') {
          if (params.actorList.length === 0 && selectMeYn && !params.allRecvYn) {
            params.actorList.push({
              accessKind: 'U',
              accessKey: store.getters['D_USER/GE_USER'].userKey
            })
          }
          // eslint-disable-next-line no-unreachable
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempTitle = titleToBody(doc)
          // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
          if (hasTitleYn.value && !params.title) {
            if (tempTitle) {
              params.title = titleToBody(doc)
              params.mLoadingYn = true
              console.log('params', params)
              // props.pPostContentsFn(params)
            } else {
              // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_TITLE')
            }
          } else {
            // 제목은 있고, 내용이 없을 경우에는 저장됨
            if (params.title.length > 256) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempText = titleToBody(doc)
          if (!tempText && !params.attachFileList.length) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
          } else {
            if (hasTitleYn.value && !params.title) {
              if (params.bodyFullStr) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              } else {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_NO_TITLE')
              }
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        }

        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
      } catch (error) {
        params.mLoadingYn = false
        console.log('send letter error error error error', error)
      }
    }

    const sendBoard = async () => {
      console.log('props.propParams', props.propParams)
      console.log('params.modiYn', params.modiYn)

      confirmPopVariable.checkPopYn = false
      try {
        if (params.mLoadingYn) return

        if (tempFileList.length > 0) {
          await fileDataUploadToServer()
        }
        await setAttachFileList()
        params.attachFileList = handleFileListForUpload()

        // formEditor 작성 내용 추출
        boardDataCheck()

        params.bodyHtmlYn = true
        params.cabinetKey = params.selectBoardCabinetKey
        params.actorList = props.propParams.actorList

        params.onlyManagerYn = false
        if (params.cabinetKey === 11188) {
          params.onlyManagerYn = true
        }

        params.creTeamKey = props.propParams.currentTeamKey || props.propParams.creTeamKey
        if (props.propParams.attachMfilekey) {
          params.attachMfilekey = props.propParams.attachMfilekey
        }

        if (props.propParams.nonMemYn) {
          params.creUserName = '비회원유저'
          params.creUserKey = 0
        } else {
          params.creUserName = store.getters['D_USER/GE_USER'].userDispMtext || store.getters['D_USER/GE_USER'].userNameMtext
          params.creUserKey = store.getters['D_USER/GE_USER'].userKey
        }
        params.cabinetName = cabinetName

        if (params.cabBlindYn) {
          params.showCreNameYn = false
        }
        if (params.modiYn) {
          console.log('=_=?')
          params.contentsKey = props.propParams.modiContentsKey
        } else {
          params.workStatCodeKey = 40
        }

        // 제목 옵션 false일 때 자동 제목 생성
        if (!hasTitleYn.value) {
          if (!params.title && extractedInnerHtml) {
            params.title = extractedInnerHtml
          } else if (
            !params.title &&
              !extractedInnerHtml &&
              params.attachFileList.length
          ) {
            params.title = params.attachFileList[0].fileName
          }
        }

        // 참조자 처리 추가
        if (params.refList) {
        }
        // 검토자 처리 추가
        if (params.checkList) {

        }
        console.log('postContents', params.actorList)

        // 나는 무조건 검토자로 추가
        // if (params.checkList.findIndex((check) => (check.accessKey === store.getters['D_USER/GE_USER'].userKey && check.accessKind === 'U' && check.actType === 'CK')) === -1) {
        //   params.checkList.push({
        //     accessKey: store.getters['D_USER/GE_USER'].userKey,
        //     accessKind: 'U',
        //     accessName: store.getters['D_USER/GE_USER'].userDispMtext
        //   })
        // }

        // 스티커
        if (params.stickerList) {
          params.stickerList = replaceStickerArr(params.stickerList)
        }
        // 우선순위
        if (params.priority) {
          params.priority = selectedPriority
        }

        // params value 체크
        if (props.pOptions.model === 'mankik') {
          // if (params.actorList.length === 0 && selectMeYn) {
          //   params.actorList.push({
          //     accessKind: 'U',
          //     accessKey: store.getters['D_USER/GE_USER'].userKey
          //   })
          // }

          // eslint-disable-next-line no-unreachable
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempTitle = titleToBody(doc)
          // 제목이 작성되지 않았을 때는 작성된 내용을 제목으로 할 수 있도록
          if (hasTitleYn.value && !params.title) {
            if (tempTitle) {
              params.title = titleToBody(doc)
              params.mLoadingYn = true
              console.log('params', params)
              // props.pPostContentsFn(params)
            } else {
              // 만약 제목과 내용 둘 다 작성되지 않았을 경우 경고창
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_TITLE')
            }
          } else {
            // 제목은 있고, 내용이 없을 경우에는 저장됨
            if (params.title.length > 256) {
              failPopYn.value = true
              errorText.value = this.$t('COMM_ERR_TITLE_COUNT')
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        } else if (props.pOptions.model === 'unibuzzy') {
          const parser = new DOMParser()
          const doc = parser.parseFromString(params.bodyFullStr, 'text/html')
          const tempText = titleToBody(doc)
          if (!tempText && !params.attachFileList.length) {
            failPopYn.value = true
            errorText.value = this.$t('COMM_ERR_FILL_CONTENT')
          } else {
            if (hasTitleYn.value && !params.title) {
              if (params.bodyFullStr) {
                params.title = titleToBody(doc)
                params.mLoadingYn = true
                // props.pPostContentsFn(params)
                console.log('params', params)
              } else {
                failPopYn.value = true
                errorText.value = this.$t('COMM_ERR_NO_TITLE')
              }
            } else {
              params.mLoadingYn = true
              // props.pPostContentsFn(params)
              console.log('params', params)
            }
          }
        }

        // console.log('send Board params', params)
        var saveResults = props.pPostContentsFn(params)
        console.log('saveResults', saveResults)
      } catch (error) {
        params.mLoadingYn = false
        console.log('send Board error error error', error)
      }
    }

    console.log('params', params)
    const openBtnWrapYn = ref(false)
    const openBtnWrap = () => {
      openBtnWrapYn.value = !openBtnWrapYn.value
    }

    // Regacy: 기존 FormEditor 컴포넌트 사용을 위한 레거시 코드들입니다. --------- 일부는 compositionAPI에 맞춰 수정
    // ============ 변수설정 ===========
    const contentType = ref('BOAR')
    const complexEditor = ref(null)
    const propFormData = reactive([])
    const mToolBoxOptions = ref({})
    const complexOkYn = ref(false)

    // Regacy: confirm pop
    const confirmPopVariable = reactive({
      errorText: '',
      failPopYn: false,
      checkPopYn: false
    })
    const confirmNo = () => {
      confirmPopVariable.checkPopYn = false
      complexOkYn.value = false
    }

    // ============ Regacy 함수 ===========
    const postToolBox = (toolBoxOption) => {
      // Regacy comment: toolbox에 들어간 option들을 formEditor에서 watch로 계속 넘겨받고 prop으로 넘겨주고 있습니다
      mToolBoxOptions.value = toolBoxOption
    }
    const changeFormEditorStyle = (changeParam) => {
      // Regacy Comment: toolbox에 기능 전부, 선택된 formEditor에 드레그 한 text로 처리를 하기에 ref로 접근해서 함수를 실행하고 있습니다.
      // Regacy Comment: bold, italic, underLine은 text만 넘겨줘도 기능이 작동하기에 따로 구분을 하지 않았습니다.
      const targetType = changeParam.type
      if (targetType === 'font') {
        complexEditor.value.changeFontSize(changeParam.size)
      } else if (targetType === 'delFormCard') {
        complexEditor.value.delFormCard()
      } else {
        complexEditor.value.changeTextStyle(targetType)
      }
    }
    let extractedInnerHtml = ''
    const setParamInnerHtml = (formCard) => {
      console.log('1 formCard', formCard)

      if (contentType.value === 'ALIM' || contentType.value === 'BOAR') {
        for (var f = 0; f < formCard.length; f++) {
          formCard[f].contentEditable = false
          // formlist중 Text component만 찾아서 http로 시작하는 url에 a태그 넣어주기
          if (formCard[f].id === 'formEditText') {
            if (formCard[f].innerText === '') {
              formCard[f].remove()
            } else {
              formCard[f].classList.remove('formEditorTextPadding')
              var innerHtml = formCard[f].innerHTML
              formCard[f].innerHTML = this.findUrlChangeAtag(innerHtml)
            }
          }
        }
        params.getBodyHtmlYn = true
      }

      // console.log('=========== forCard whole body ===========', formCard)
      let extractedOuterHtml = ''
      for (let i = 0; i < formCard.length; i++) {
        extractedOuterHtml += formCard[i].outerHtml
        extractedInnerHtml += formCard[i].innerHtml
        console.log('===일반 extractedOuterHtml', extractedOuterHtml)
        console.log('===일반 extractedInnerHtml', extractedInnerHtml)
      }
      propFormData.push(...formCard)
      console.log('2 formpropFormDataCard', propFormData)

      // this.propFormData = formCard
      document.getElementById('msgBox').innerHTML = ''
      document.getElementById('msgBox').innerHTML = extractedInnerHtml
      console.log('3 document.getElementById.innerHTML', document.getElementById('msgBox').innerHTML)
      console.log(
        `=========== forCard Data =========== \n - inner: ${extractedInnerHtml}\n - outer: ${extractedOuterHtml}`
      )

      // 문자열을 파싱하여 DOM 요소로 만듭니다.
      const parser = new DOMParser()
      const doc = parser.parseFromString(extractedOuterHtml, 'text/html')

      // "contenteditable" 속성을 삭제합니다.
      const elements = doc.querySelectorAll(
        '[contenteditable], [placeholder], [autofocus], [formidx]'
      )
      for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('contenteditable')
        elements[i].removeAttribute('placeholder')
        elements[i].removeAttribute('autofocus')
        elements[i].removeAttribute('formidx')
      }

      // 수정된 HTML 문자열을 얻습니다.
      const modifiedHtmlString = doc.body.innerHTML
      console.log(modifiedHtmlString)

      params.bodyFullStr = modifiedHtmlString
      propFormData.length = 0
      propFormData.push(...formCard)
      // document.getElementById('msgBox').innerHTML = extractedInnerHtml
      // this.editorType = 'complex'
      complexOkYn.value = true
      if (contentType.value === 'ALIM') clickPageTopBtn()
      if (contentType.value === 'BOAR') boardDataCheck()
    }
    const clickPageTopBtn = async () => {
      // 취소를 누르거나 유효성 검사 (이 함수)에 통과하지 못하면 값을 다시 가져와야함. 그러므로 --> complexOkYn.value = false
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        await complexEditor.value.setParamInnerHtml()
      } else {
        let titleValue = params.title
        titleValue = titleValue.trim()
        if (hasTitleYn.value) {
          if (
            titleValue !== undefined &&
            titleValue !== null &&
            titleValue !== ''
          ) {
          } else {
            // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
            confirmPopVariable.failPopYn = true
            complexOkYn.value = false
            return
          }
        }

        let msgData = ''
        msgData = document.getElementById('msgBox').innerText
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_NOTI_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        confirmPopVariable.checkPopYn = true
      }
    }
    const boardDataCheck = () => {
      if (complexOkYn.value === false) {
        complexOkYn.value = true
        complexEditor.value.setParamInnerHtml()
      } else {
        let title = params.title
        title = title.trim()
        if (title !== undefined && title !== null && title !== '') {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_TITLE')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }
        var msgData = ''
        msgData = document.getElementById('msgBox').innerText
        if (msgData) {
          msgData = msgData.trim()
        }
        if (
          (msgData !== undefined && msgData !== null && msgData !== '') ||
          tempFileList.length > 0
        ) {
        } else {
          // confirmPopVariable.errorText = this.$t('FORM_MSG_POST_NOCONT')
          confirmPopVariable.failPopYn = true
          complexOkYn.value = false
          return
        }

        confirmPopVariable.checkPopYn = true
      }
    }
    const setTodoPageValue = () => {
      params.showCreNameYn = true
      params.canReplyYn = true
      hasTitleYn.value = true
    }
    setTodoPageValue()
    return {
      getRefreshList,
      selfAddTag,
      addTagShowYn,
      selectColor,
      changeTagColor,
      toggleAddTagShowYn,
      params,
      receiverList,
      showReceiverSelectList,
      toggleReceiverSelectPop,
      toggleRefsSelectPop,
      setSelectedRefList,
      selectNoRefs,
      toggleCheckSelectPop,
      setSelectedCheckList,
      selectNoCheck,
      selectAllReceivers: selectTargetOnlyMe,
      setSelectedTargetList,
      toggleAnonymousYn,
      toggleCommentYn,
      hasTitleYn,
      showRefsSelectList,
      showCheckSelectList,
      toggleTitleYn,
      stickerList,
      toggleSelectTag,
      tagListForDom,
      setAttachedFile,
      changeUploadList,
      postContents,
      mToolBoxOptions,
      postToolBox,
      changeFormEditorStyle,
      complexEditor,
      setParamInnerHtml,
      clickPageTopBtn,
      boardDataCheck,
      contentType,
      confirmNo,
      propsTargetNameEditing,
      openBtnWrap,
      delAttachFile,
      openBtnWrapYn,
      propAttachFileList,
      setTodoPageValue,
      selectMeYn,
      selectRefsYn,
      selectCheckYn,
      errorText,
      failPopYn,
      addSelfTag,
      countLines,
      sendLetter,
      sendBoard,
      selectedPriority,
      selectBoard,
      selectBoardIndex,
      mCanWriteYn,
      writeBoardPlaceHolder,
      gCertiPopShowYn,
      cabinetName,
      getTeamMenuList,
      openPushReceiverSelect,
      decodeContents
    }
  }
})
</script>

<style lang="scss" scoped>

.titleInput{
  overflow-y:scroll; white-space:wrap;
  padding:10px 15px 15px;
  border:none;
  outline:none;
  background-color:#F1F1FF;
  outline:none;
  font-size:19px;
  height:45px;
  border-radius:10px;
}
.selectInput{
  height:35px;
  width:calc(100% - 62px);
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.selectPriority{
  padding:5px 10px !important;
  background-color:#F1F1FF !important;
  border-radius:5px !important;
  border:none !important;
}
.selfTagOpenFlex{
  flex-direction:column !important;
  align-items:start !important;
  gap:0.3rem;
}
.selfAddSaveBtn{
  word-break:keep-all;
  min-width:45px;
  height:25px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#7a7a7a;
  background-color:#f1f1ff;
  font-size:11px;
  border-radius:8px;
  border:2px solid #ccc;
}
// Common CSS
#layout {
  width: 90%;
  height: calc(100% - 120px);
  // padding: 16px 24px;
  overflow: hidden;
  min-height:500px;

  position: absolute;
  left: 50%;
  top: 5%;
  transform: translateX(-50%);

  z-index: 15;
  /* background-color: #f5f5f5; */
  background-color:#fff;
  border-radius: 0.8rem;
}
button {
  min-width: 40px;
  height: 25px;
  padding: 0px 10px;
  float: left;
  color: #7a7a7a;
  word-wrap: normal;
  border: none;
  /* background-color: #f1f1ff; */
  background-color:#fff;
  border-radius: 5px;
  line-height: 22px;

  // & + button {
  // margin-left: 8px;
  // }
  &.activeBtn {
    font-weight:bold !important;
    height:25px;
    line-height:20px;
  }
  &.closeBtn {
    border: none;
    background-color: none;
  }
}
h1,
label {
  min-width: 62px;
  line-height: 30px;
  color: #5f61bd;
  font-weight: bold;
  text-align: start;
}
legend {
  display: none;
}
input,
textarea {
  border: 1px solid rgba(103, 104, 167, 0.27);
}
textarea {
  resize: none;
  width: 100%;
  padding: 15px;
  &::placeholder {
    margin: 20px;
  }
}
.btnWrap img {
  width: 16px;
}
// header & footer
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:1rem 1.5rem 1rem;
  border-bottom:1px solid #EBEBEB;
  .HeaderbtnWrap{
    .saveBtn{
      font-size: 16px;
      /* padding: 7px 20px !important; */
      margin-right:10px;
      line-height:1;
      border:none;
      &:first-child {
        /* background-color: #5f61bd; */
        background-color:#fff;
        color: #5F61BD;
        font-size:21px;
      }
    }
    .closeBtn{
    padding: 3px;
    background-color: none;
    border: none;
    }
  }
}
footer {
  border-top: 1px solid #ccc;
  width: 100%;
  text-align:center;
  // position:absolute;
  // bottom:30px;
  // left:50%;
  // transform:translateX(-50%);
  .footerBtnWrap {
    padding-top: 20px;
    button {
      font-size: 16px;
      padding: 3px 10px !important;
      font-weight: bold;
      &:first-child {
        background-color: #5f61bd;
        color: #fff;
      }
    }
  }
}

// Form CSS
main {
  height: calc(100% - 57px);
  overflow-y: auto;
  margin-top: 0.5rem;
  padding:0 1.5rem;

  form {
    height: auto;
  }
  form fieldset > fieldset {
    margin-top: 10px;
  }
  form > fieldset:nth-child(3) {
    margin-top: 10px;
    height: 60%;
    textarea {
      height: 100%;
    }
  }
  // fieldset > fieldset {
  //   margin-top: 10px;
  // }

  .selectReceiverBox,
  #optionToggleBtnWrap,
  #dateSelect,
  #categoryTag,
  #uploadFile {
    display: flex;
    justify-content: space-between;
    .tagBtnWrap {
      flex-wrap: wrap;
      // height: 30px;
      height:auto;
      overflow-y: hidden;

      &.opened {
        height: auto !important;
      }
    }
    .openBtn {
      height: 25px;
      width: 25px;
      background-color: #f1f1ff;
      border: 2px solid #ccc;
      color: #7a7a7a;
      padding: 3px;
      border-radius: 8px;
      text-align: center;
      line-height: 17px;
      cursor: pointer;
    }
    .btnWrap,
    .dateBoxWrap {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: calc(100% - 62px);
      gap: 3px;
      input {
        min-height: 30px;
        width:48%;
        background-color:#F8F8FF !important;
        border:none !important;
        padding:5px 10px !important;
        border-radius:5px !important;
      }
    }
  }
  #postReceivers, #postRefs, #postCheck {
    .selectedTargetList {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 35px;
      padding: 0 0 0 8px;
      margin-top: 5px;
      margin-left: 62px;
      cursor: pointer;

      background-color: #fff;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 8px;
      & > div {
        margin-right: 16px;
        img {
          width: 15px;
        }
      }
      .plusImgWrap {
        // position: absolute;
        // top: 50%;
        // right: 8px;
        // transform: translateY(-50%);
        width: 30px;
        height: 100%;
        background-color: #fff;
        margin-right: 0;
      }
      .plusImg {
        width: 20px;
      }
    }
  }
  #postTitle {
    display: flex;
    input {
      flex-grow: 1;
    }
  }
}

@media screen and (max-width: 850px) {
}

@media screen and (max-width: 650px) {
}

@media screen and (max-width: 600px) {
  label {
    font-size: 14px !important;
  }
  button {
    font-size: 11px !important;
  }
  .checkImg{
    width:10px !important;
  }
}
</style>
