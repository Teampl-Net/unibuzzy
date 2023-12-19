<i18n>
{
  "ko": {
    "EDIT_BOARD_NAME_BOARD": "게시판 수정",
    "EDIT_BOARD_TITLE_NAME": "게시판 이름",
    "EDIT_BOARD_MSG_NAME": "게시판 이름을 입력하세요.",
    "EDIT_BOARD_DROP_TYPE": "게시판의 유형을 선택해주세요.",
    "EDIT_BOARD_TITLE_FUNCTION": "게시판 기능",
    "EDIT_BOARD_BTN_COMMENT": "댓글",
    "EDIT_BOARD_BTN_FILE": "파일첨부",
    "EDIT_BOARD_BTN_ANONY": "익명",
    "EDIT_BOARD_BTN_ID": "실명",
    "EDIT_BOARD_BTN_STATUS": "상태설정",
    "EDIT_BOARD_BTN_HIDE": "제목 비공개(미권한자)",
    "EDIT_BOARD_TITLE_SAMPLE": "예시글 작성",
    "EDIT_BOARD_MSG_SAMPLE": "예시글을 추가해주세요",
    "EDIT_BOARD_MSG_ISSAMPLE": "예시글 있음",
    "EDIT_BOARD_BTN_ALLMEM": "구독자전체",
    "EDIT_BOARD_TITLE_READ": "게시글 열람",
    "EDIT_BOARD_BTN_NONE": "안함",
    "EDIT_BOARD_MSG_STATUS": "권한을 설정해주세요.",
    "EDIT_BOARD_TITLE_COMMENT": "댓글 작성",
    "EDIT_BOARD_MSG_STATUSO": "상태O",
    "EDIT_BOARD_MSG_STATUSX": "상태X",
    "EDIT_BOARD_MSG_COMMENTO": "/댓글O",
    "EDIT_BOARD_MSG_COMMENTX": "/댓글X",
    "EDIT_BOARD_MSG_FILEO": "/파일O",
    "EDIT_BOARD_MSG_FILEX": "/파일X",
    "EDIT_BOARD_MSG_ANONY": "/익명",
    "EDIT_BOARD_MSG_ID": "실명",
    "EDIT_BOARD_MSG_HIDETITLEO": "제목 비공개(미권한자)",
    "EDIT_BOARD_MSG_HIDETITLEX": "제목 공개(미권한자)",
    "EDIT_BOARD_MSG_SHARE": "게시판을 공유할 대상을 선택해주세요.",
    "EDIT_BOARD_TITLE_WRITE": "게시글 작성",
    "EDIT_BOARD_WRITE_PERMISSION": "작성권한",
    "EDIT_BOARD_READ_PERMISSION": "열람권한",
    "EDIT_BOARD_COMMENT_PERMISSION": "댓글권한",
    "EDIT_BOARD_BTN_EDIT": "수정하기",
    "EDIT_BOARD_MSG_EDITSUCC": "성공적으로 수정되었습니다.",
    "EDIT_BOARD_MSG_SELECTMEM": "먼저 공유대상을 선택해주세요."
  },
  "en": {
    "EDIT_BOARD_NAME_BOARD": "Edit Board",
    "EDIT_BOARD_TITLE_NAME": "Board Name",
    "EDIT_BOARD_MSG_NAME": "Write a name of the board",
    "EDIT_BOARD_DROP_TYPE": "Select the type of the board",
    "EDIT_BOARD_TITLE_FUNCTION": "Board Functions",
    "EDIT_BOARD_BTN_COMMENT": "Comments",
    "EDIT_BOARD_BTN_FILE": "Attach File",
    "EDIT_BOARD_BTN_ANONY": "Anonymous",
    "EDIT_BOARD_BTN_ID": "Identified",
    "EDIT_BOARD_BTN_STATUS": "Work Status",
    "EDIT_BOARD_BTN_HIDE": "Hide Title to Non-Member",
    "EDIT_BOARD_TITLE_SAMPLE": "Default Sample Text",
    "EDIT_BOARD_MSG_SAMPLE": "Please add default sample text",
    "EDIT_BOARD_MSG_ISSAMPLE": "Default Sample Text 0",
    "EDIT_BOARD_BTN_ALLMEM": "All members",
    "EDIT_BOARD_TITLE_READ": "Read Contents",
    "EDIT_BOARD_BTN_NONE": "None",
    "EDIT_BOARD_MSG_STATUS": "Set an access status",
    "EDIT_BOARD_TITLE_COMMENT": "Comments",
    "EDIT_BOARD_MSG_STATUSO": "Work Status O",
    "EDIT_BOARD_MSG_STATUSX": "Work Status X",
    "EDIT_BOARD_MSG_COMMENTO": "/Comments O",
    "EDIT_BOARD_MSG_COMMENTX": "/Comments X",
    "EDIT_BOARD_MSG_FILEO": "/File O",
    "EDIT_BOARD_MSG_FILEX": "/File X",
    "EDIT_BOARD_MSG_ANONY": "/Anonymous",
    "EDIT_BOARD_MSG_ID": "/Identified",
    "EDIT_BOARD_MSG_HIDETITLEO": "/HIde Title to non-member",
    "EDIT_BOARD_MSG_HIDETITLEX": "/Show Title to non-member",
    "EDIT_BOARD_MSG_SHARE": "Please select a target to share the board with.",
    "EDIT_BOARD_TITLE_WRITE": "Write Contents",
    "EDIT_BOARD_WRITE_PERMISSION": "Write Permission",
    "EDIT_BOARD_READ_PERMISSION": "Read Permission",
    "EDIT_BOARD_COMMENT_PERMISSION": "Comment Permission",
    "EDIT_BOARD_BTN_EDIT": "Edit",
    "EDIT_BOARD_MSG_EDITSUCC": "Edited successfully.",
    "EDIT_BOARD_MSG_SELECTMEM": "First, please select a target to share."
  }
}
</i18n>
<template>
<!-- 이 페이지는 gPop에서 열어주지 않고 있고, editBoard 파일에서 가지고 있다. -->
<div class="addNewBoardWrap pagePaddingWrap jjjPaddingWrap" :style="'padding-top:' + (this.$STATUS_HEIGHT)+ 'px'"  style="padding-top: 0;">
  <popHeader @closeXPop="closePop()" :headerTitle="$t('EDIT_BOARD_NAME_BOARD')" />
  <loadingCompo v-if="loadingYn" />

  <!-- 헤더를 제외한 나머지 부분 // 스크롤을 위해 넣었으나, overflow가 되면서 밑 권한 설정 화면에서 쉐도우 처리 양 끝이 hidden 됨-->

  <div class="w-100P h-100P fl ptop-1" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'"  style="overflow: auto; height: calc(100% - 70px);" >
    <div class="itemWrite fl ">
      <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_NAME') }}</p>
      <input class="fl" style="width: calc(100% - 140px);" v-model="boardName" type="text" :placeholder="$t('EDIT_BOARD_MSG_NAME')" id="channelName">

      <div class="fl mleft-1" @click="this.colorPickerShowYn = !this.colorPickerShowYn" style=" border: none; min-width: 30px; max-width: 30px; width:30px; height: 30px; border-radius:100%;" :style="'background:' + this.selectedColor + ';'" ></div>
    </div>

    <div v-if="colorPickerShowYn" class="fr" style="width: calc(100% - 100px);">
      <gColorPicker :colorPick="selectedColor" @closePop="closeColorPickerPop" v-if="colorPickerShowYn" @choiceColor='choiceColor' ref="colorPicker" />
    </div>

    <div class="itemWrite fl">
      <p class="fontBold textLeft font16 fl mtop-02" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_FUNCTION') }}</p>
      <div class="fl" style="width: calc(100% - 100px);">
        <gCheckBtn class="fl gCheck-W mtop-03 mright-03"  :title="$t('EDIT_BOARD_BTN_COMMENT')" :selectedYn='replyYnInput' @click="replyYnInput = !replyYnInput" />
        <gCheckBtn class="fl gCheck-W mtop-03 mright-03" :title="$t('EDIT_BOARD_BTN_FILE')" :selectedYn='fileYnInput' @click="fileYnInput = !fileYnInput" />
        <gCheckBtn class="fl gCheck-W mtop-03 mright-03" :title="blindYn === true ? $t('EDIT_BOARD_BTN_ANONY') : $t('EDIT_BOARD_BTN_ID')" :selectedYn='blindYn' @click="blindYn = !blindYn" />
        <gCheckBtn class="fl gCheck-W mtop-03 mright-03"  :title="$t('EDIT_BOARD_BTN_STATUS')" :selectedYn='workStatYn' @click="workStatYn = !workStatYn" />
        <gCheckBtn class="fl gCheck-W mtop-03 mright-03" :title="$t('EDIT_BOARD_BTN_HIDE')" v-show="permissionVGroup.type !== 'A'" :selectedYn='titleBlindYn' @click="titleBlindYn = !titleBlindYn" />
      </div>

    </div>

    <div class="itemWrite fl ">
      <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_SAMPLE') }}</p>
      <div class="fr textLeft receivBox" style="width: calc(100% - 100px); padding:5px;" @click="this.samplePopShowYn = true" >
        <p class="fl textLeft commonDarkGray font14 textOverdot pholder" style="width: calc(100% - 74px);" :placeholder="$t('EDIT_BOARD_MSG_SAMPLE')">{{this.guideSampleInnerHtml? $t('EDIT_BOARD_MSG_ISSAMPLE'): ''}}</p>
      </div>
    </div>

    <div class="itemWrite fl ">
      <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('COMMON_TITLE_SHARE') }}</p>
      <div class="fl" style="width: calc(100% - 100px);">
        <gCheckBtn id="all" ref="all" class="fl gCheck-W"  :title="$t('COMMON_TAB_ALL')" :selectedYn="this.shareGroup.type === 'A'" @click="changeSelectType('A')" />
        <gCheckBtn id="fol" ref="fol" class="fl gCheck-W mleft-05"  :title="$t('EDIT_BOARD_BTN_ALLMEM')" :selectedYn="this.shareGroup.type === 'F'" @click="changeSelectType('F')" />
        <gCheckBtn id="sel" ref="sel" class="fl gCheck-W mleft-05"  :title="$t('COMMON_BTN_SELECTED')" :selectedYn="this.shareGroup.type === 'S'" @click="changeSelectType('S')" />
        <!-- <p class="fr font12 commonDarkGray " style="padding-top:12px">{{this.shareGroup.type === 'S' ? setSelectReceiveCount(this.shareGroup.selectedList) : '전체'}}</p> -->
        <p class="fr font12 commonDarkGray " style="padding-top:12px" v-if="this.shareGroup.type === 'A'">{{ $t('COMMON_TAB_ALL') }}</p>
        <seletedIconText v-else :propData='setSelectReceiveCount(this.shareGroup.selectedList)' style="padding-top:12px" />

      </div>
    </div>
    <div class="fr textLeft receivBox pholder" style="width: calc(100% - 100px); padding:5px;" v-if="this.shareGroup.type === 'S'" @click="showSelectBookPop('select')" :placeholder="$t('EDIT_BOARD_MSG_SHARE')">
      {{setReceiveName(this.shareGroup.selectedList)}}
    </div>

    <!-- 권한 설정 -->
    <div class="fl w-100P mtop-1 " style="position: relative; padding: 0 1rem;" :class="{'mtop-2' : shareGroup.type === 'S'}">
      <triangleTag :style="this.shareGroup.type === 'A' ? 'left: calc(1.5rem + 100px)' : 'left: calc(1.5rem + 100px + 80px)' " style="position: absolute; top: -22px; border-right: 22px solid transparent; border-bottom: 23px solid #ffffff; border-left: 22px solid transparent; filter: drop-shadow(0px -10px 16px #ccc); z-index: 1;"/>
      <div class="fl w-100P" style="box-shadow: 1px 0px 17px 2px #eee; position: absolute; width:98%; max-width:1000px; transform: translateX(-1.5rem);  padding: 0.5rem 1rem;  background:#ffffff; border-radius: 20px; left: 50%; transform: translateX(-50%);">

        <!-- 열람 권한 -->
        <div class="fl w-100P " :class="{'shareSelecStyle': shareGroup.type === 'S'}">
          <div class="itemWrite fl " :style="this.shareGroup.type === 'S' ? 'display: contents;' : '' ">
            <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_READ') }}</p>
            <div class="fl" style="width: calc(100% - 40px);" v-if="this.shareGroup.type === 'A' || this.shareGroup.type === 'F'">
              <gCheckBtn class="fl gCheck-W"  :title="$t('COMMON_TAB_ALL')" :selectedYn="permissionVGroup.type === 'A'" @click="this.permissionVGroup.type = 'A'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('COMMON_BTN_SELECTED')" :selectedYn="permissionVGroup.type === 'S'" @click="this.permissionVGroup.type = 'S'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('EDIT_BOARD_BTN_NONE')" :selectedYn="permissionVGroup.type === 'N'" @click="this.permissionVGroup.type = 'N'" />
            </div>
          </div>
          <div class="fr textLeft receivBox" style="width: calc(100% - 40px); padding:5px;" v-if="permissionVGroup.type === 'S'" @click="showSelectBookPop('V')" >
            <p class="fl textLeft commonDarkGray font14 textOverdot pholder permissionBox" :placeholder="$t('EDIT_BOARD_MSG_STATUS')">{{setReceiveName(this.permissionVGroup.selectedList)}}</p>
            <!-- <p class="fr font12 commonDarkGray" style="">{{setSelectReceiveCount(this.permissionVGroup.selectedList)}}</p> -->
            <seletedIconText :propData='setSelectReceiveCount(this.permissionVGroup.selectedList)' />
          </div>
        </div>

        <!-- 게시글 작성 권한 -->
        <div class="fl w-100P " :class="{'shareSelecStyle': shareGroup.type === 'S'}">
          <div class="itemWrite fl " :style="this.shareGroup.type === 'S' ? 'display: contents;' : '' ">
            <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_WRITE') }}</p>
            <div class="fl" style="width: calc(100% - 40px);" v-if="this.shareGroup.type === 'A' || this.shareGroup.type === 'F'">
              <gCheckBtn class="fl gCheck-W"  :title="$t('COMMON_TAB_ALL')" :selectedYn="permissionWGroup.type === 'A'" @click="this.permissionWGroup.type = 'A'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('COMMON_BTN_SELECTED')" :selectedYn="permissionWGroup.type === 'S'" @click="this.permissionWGroup.type = 'S'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('EDIT_BOARD_BTN_NONE')"  :selectedYn="permissionWGroup.type === 'N'" @click="this.permissionWGroup.type = 'N'" />
            </div>
          </div>
          <div class="fr textLeft receivBox" style="width: calc(100% - 40px); padding:5px;" v-if="permissionWGroup.type === 'S'" @click="showSelectBookPop('W')">
            <p class="fl textLeft commonDarkGray font14 textOverdot pholder permissionBox" :placeholder="$t('EDIT_BOARD_MSG_STATUS')">{{setReceiveName(this.permissionWGroup.selectedList)}}</p>
            <!-- <p class="fr font12 commonDarkGray" style="">{{setSelectReceiveCount(this.permissionWGroup.selectedList)}}</p> -->
            <seletedIconText :propData='setSelectReceiveCount(this.permissionWGroup.selectedList)' />
          </div>
        </div>

        <!-- 댓글 권한 -->
        <div class="fl w-100P " :class="{'shareSelecStyle': shareGroup.type === 'S'}" style="position: relative;">
          <div class="itemWrite fl " :style="this.shareGroup.type === 'S' ? 'display: contents;' : '' ">
            <p class="fontBold  textLeft font16 fl" style="width: 100px;">{{ $t('EDIT_BOARD_TITLE_COMMENT') }}</p>
            <div class="fl" style="width: calc(100% - 40px);" v-if="this.shareGroup.type === 'A' || this.shareGroup.type === 'F'">
              <gCheckBtn class="fl gCheck-W" :title="$t('COMMON_TAB_ALL')" :selectedYn="permissionRGroup.type === 'A'" @click="this.permissionRGroup.type = 'A'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('COMMON_BTN_SELECTED')" :selectedYn="permissionRGroup.type === 'S'" @click="this.permissionRGroup.type = 'S'" />
              <gCheckBtn class="fl gCheck-W mleft-05" :title="$t('EDIT_BOARD_BTN_NONE')" :selectedYn="permissionRGroup.type === 'N'" @click="this.permissionRGroup.type = 'N'" />
            </div>
          </div>
          <div class="fr textLeft receivBox" style="width: calc(100% - 40px); padding:5px;" v-if="permissionRGroup.type === 'S'" @click="showSelectBookPop('R')" >
            <p class="fl textLeft commonDarkGray font14 textOverdot pholder permissionBox" :placeholder="$t('EDIT_BOARD_MSG_STATUS')">{{setReceiveName(this.permissionRGroup.selectedList)}}</p>
            <!-- <p class="fr font12 commonDarkGray" style="">{{setSelectReceiveCount(this.permissionRGroup.selectedList)}}</p> -->
            <seletedIconText v-if="permissionRGroup.type === 'S'" :propData='setSelectReceiveCount(this.permissionRGroup.selectedList)' />
          </div>
        </div>

      </div>
    </div>
  </div>
  <gBtnSmall @click="updateCabinet" :btnTitle="$t('EDIT_BOARD_BTN_EDIT')" class="font16 CDeepBgColor" style="width: 70%; min-height:40px; line-height:40px; border-radius:8px; position: absolute; bottom:1.5rem; left:15%;" />
</div>
<selectType :chanInfo="this.CHANNEL_DETAIL" v-if="selectTypePopShowYn" @closePop='selectTypePopShowYn = false' @addFinish='addResult' />
<selectBookList :chanInfo="this.CHANNEL_DETAIL" :propData="this.chanProps" :boardDetail="this.boardDetail" :chanAlimListTeamKey="this.modiBoardDetailProps.teamKey" v-if="selectBookListShowYn" @closeXPop='selectBookListShowYn = false' :selectPopYn='true' @sendReceivers='setSelectedList' :pSelectedList="selectedList" @openPop='openPop' />
<receiverAccessList :chanInfo="this.CHANNEL_DETAIL" :propData="CHANNEL_DETAIL" :itemType="shareActorItemType" v-if="receiverAccessListYn" @closeXPop='receiverAccessListYn=false' :parentList='selectedList.data' :selectList='permissionSelectedList'  @sendReceivers='receiverPoolInSetting'/>
<gConfirmPop  :confirmText="$t('EDIT_BOARD_MSG_EDITSUCC')" confirmType='timeout' v-if="okPopYn" @no='closePop' />
<selectSampleListPop :cabinetDetail="this.modiBoardDetailProps" @setSampleGuide="setSampleGuide" :propsInnerHtml="guideSampleInnerHtml" v-if="samplePopShowYn" @closeXPop="closeSampleListPop" />
</template>
<script>
import loadingCompo from '../../layout/Tal_loading.vue'
import selectType from './editBoardUnit/D_addChannelMenu.vue'
// import shareSelect from './Tal_shareSelect.vue'
import selectBookList from '../receiver/D_selectBookList.vue'
// import selectBookList from './receiver/Tal_selectBookList.vue'
import receiverAccessList from '../receiver/D_selectReceiverAccessList.vue'
import selectSampleListPop from './D_manageSamplePop.vue'
import seletedIconText from './editBoardUnit/D_selectReceivIconText.vue'
export default {
  props: {
    modiBoardDetailProps: {},
    chanInfo: {},
    chanName: {}
  },
  created () {
    // 로딩 닫기는 디테일을 가져오고 난 뒤
    // this.$emit('openLoading')
    this.loadingYn = true
    /* var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'modiBoardPop' + this.modiBoardDetailProps.cabinetKey
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history) */

    this.boardDetail = this.modiBoardDetailProps
    this.getCabinetDetail()
    if (this.shareGroup.type === 'S') {
      this.changeSelectType('S')
    }
    this.chanProps = this.modiBoardDetailProps
    this.chanProps.teamNameMtext = this.$changeText(this.CHANNEL_DETAIL.nameMtext)

    // // console.log(this.boardDetail)
    // // console.log(this.chanInfo)

    //
    this.$addHistoryStack('modiBoardPop')
    this.loadingYn = false
  },
  computed: {
    TLeftPosition () {
      var targetW
      if (this.shareGroup.type === 'A') {
        // this.$nextTick(() => {
        targetW = window.document.getElementById('all').getBoundingClientRect().left
        // })
      } else if (this.shareGroup.type === 'F') {
        // this.$nextTick(() => {
        targetW = window.document.getElementById('fol').getBoundingClientRect().left
        // })
      } else {
        // this.$nextTick(() => {
        targetW = window.document.getElementById('sel').getBoundingClientRect().left
        // })
      }
      return {
        '--left': targetW + 'px'
      }
    },
    CAB_FUNCTION_TEXT () {
      var text = ''
      if (this.workStatYn === true) {
        text += this.$t('EDIT_BOARD_MSG_STATUSO')
      } else {
        text += this.$t('EDIT_BOARD_MSG_STATUSX')
      }
      if (this.replyYnInput === true) {
        text += this.$t('EDIT_BOARD_MSG_COMMENTO')
      } else {
        text += this.$t('EDIT_BOARD_MSG_COMMENTX')
      }
      if (this.fileYnInput === true) {
        text += this.$t('EDIT_BOARD_MSG_FILEO')
      } else {
        text += this.$t('EDIT_BOARD_MSG_FILEX')
      }
      if (this.blindYn === true) {
        text += this.$t('EDIT_BOARD_MSG_ANONY')
      } else {
        text += this.$t('EDIT_BOARD_MSG_ID')
      }
      if (this.titleBlindYn === true) {
        text += this.$t('EDIT_BOARD_MSG_HIDETITLEO')
      } else {
        text += this.$t('EDIT_BOARD_MSG_HIDETITLEX')
      }

      return text
    },
    CHANNEL_DETAIL () {
      var team = this.$getDetail('TEAM', this.modiBoardDetailProps.teamKey)
      if (team) {
        return team[0]
      } else {
        return null
      }
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      if (this.history[this.history.length - 1] === 'modiBoardPop') {
        this.closePop()
      }
    }
  },
  data () {
    return {
      selectedColor: '#FFCDD2',
      colorPickerShowYn: false,
      chanProps: {},
      okPopYn: false,
      popId: null,
      boardDetail: {},
      selectBoardTypeText: this.$t('EDIT_BOARD_DROP_TYPE'),
      selectId: '',
      shareType: 'select', // 공유 대상자 (팔로워 전체: all, 대상 선택: select)
      selectTypePopShowYn: false,
      blindYn: false, // 익명게시판
      fileYnInput: false, // 파일업로드 게시판
      replyYnInput: false, // 댓글 지원 게시판
      workStatYn: false, // 상태설정 게시판
      show: false,
      multiStatus: [
        '진행 중',
        '진행 완료',
        '미해결'
      ],
      showNewYn: false,
      functionPopShowYn: false,
      inputvalue: '',
      showSelectStatusShowYn: false,
      selectBookListShowYn: false,
      count: null,
      sharePermissionShowYn: false,
      statusSelectShowYn: false,
      selectShareYn: false,
      selectedReceiver: this.$t('EDIT_BOARD_MSG_SHARE'),
      writePermission: this.$t('EDIT_BOARD_WRITE_PERMISSION'),
      readPermission: this.$t('EDIT_BOARD_READ_PERMISSION'),
      commentPermission: this.$t('EDIT_BOARD_COMMENT_PERMISSION'),
      bookList: null,
      selectedList: [],
      receiverAccessListYn: false,
      shareActorItemType: '',
      selectShareList: [],
      selectItemList: [],
      writePermissionAllYn: true,
      readPermissionAllYn: true,
      commentPermissionAllYn: true,
      writePermissionSelectYn: false,
      readPermissionSelectYn: false,
      commentPermissionSelectYn: false,
      permissionSelectedYn: { W: false, R: false, V: false },
      boardName: '',
      dbSelectedList: { bookList: [], memberList: [] },
      // currentPermissionType: '',
      currentSelectBookType: '',
      selectedShareList: { bookList: [], memberList: [] },
      selectedWriteList: { bookList: [], memberList: [] },
      selectedReadList: { bookList: [], memberList: [] },
      selectedCommentList: { bookList: [], memberList: [] },
      shareGroup: { type: 'A', selectedList: { bookList: [], memberList: [] } },
      permissionWGroup: { type: 'A', selectedList: { bookList: [], memberList: [] } },
      permissionRGroup: { type: 'A', selectedList: { bookList: [], memberList: [] } },
      permissionVGroup: { type: 'A', selectedList: { bookList: [], memberList: [] } },
      permissionSelectedList: [],
      loadingYn: false,
      titleBlindYn: false,
      samplePopShowYn: false,
      guideSampleInnerHtml: ''

    }
  },
  components: {
    seletedIconText,
    selectType,
    selectBookList,
    receiverAccessList,
    loadingCompo,
    selectSampleListPop
  },
  // emits: ['openPop', 'goPage'],
  methods: {
    setSampleGuide (iHtml) {
      this.guideSampleInnerHtml = iHtml
    },
    closeSampleListPop () {
      this.samplePopShowYn = false
    },
    changeSelectType (type) {
      // debugger
      this.shareGroup.type = type
      if (type === 'S') {
        this.permissionWGroup.type = type
        this.permissionVGroup.type = type
        this.permissionRGroup.type = type
      } else {
        this.permissionWGroup.type = 'A'
        this.permissionVGroup.type = 'A'
        this.permissionRGroup.type = 'A'
      }

      // this.permissionWGroup.selectedList = { bookList: [], memberList: [] }
      // this.permissionVGroup.selectedList = { bookList: [], memberList: [] }
      // this.permissionRGroup.selectedList = { bookList: [], memberList: [] }
      // this.shareGroup.selectedList = { bookList: [], memberList: [] }
      // this.selectedReceiver = '게시판을 공유할 대상을 선택해주세요.'
      // this.writePermission = '클릭하여 권한을 설정해주세요.'
      // this.readPermission = '클릭하여 권한을 설정해주세요.'
      // this.commentPermission = '클릭하여 권한을 설정해주세요.'
    },
    setSelectReceiveCount (selectGroup) {
      if (!selectGroup || !selectGroup.bookList || !selectGroup.memberList) return
      var bookList = selectGroup.bookList
      var memberSize = 0
      var bookSize = 0
      for (var i = 0; i < bookList.length; i++) {
        if (!bookList[i].memberYn) {
          bookSize += 1
        } else if (bookList[i].memberYn) {
          memberSize += 1
        }
      }
      // eslint-disable-next-line no-debugger
      debugger
      var userSize = selectGroup.memberList.length
      // var text = ''
      var text = {}
      var list = []
      if (userSize === 0 && bookSize === 0 && memberSize === 0) {
        return ''
      } else {
        if (bookSize && bookSize > 0) {
          // text += '주소록' + bookSize
          // if (memberSize > 0) {
          //   text += ', '
          // }
          text = {}
          text.type = 'book'
          text.count = bookSize
          list.push(text)
        }
        if (memberSize && memberSize > 0) {
          // text += '주소록' + bookSize
          // if (memberSize > 0) {
          //   text += ', '
          // }
          text = {}
          text.type = 'member'
          text.count = memberSize
          list.push(text)
        }
        if (userSize && userSize > 0) {
          // text += '유저' + memberSize
          text = {}
          text.type = 'user'
          text.count = userSize
          list.push(text)
        }
        // return text
        console.log(list)
        return list
      }
    },
    setReceiveName (selectGroup) {
      // if (!selectGroup || !selectGroup.bookList || !selectGroup.memberList) return
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      console.log(selectGroup)
      var bookSize = selectGroup.bookList
      var memberSize = selectGroup.memberList
      var temp = ''
      for (let i = 0; i < bookSize.length; i++) {
        console.log(bookSize[i])
        if (!bookSize[i].memberYn) {
          temp += this.$changeText(bookSize[i].cabinetNameMtext) + ', '
        } else if (bookSize[i].memberYn) {
          temp += this.$changeText(bookSize[i].nameMtext) + ', '
        }
      }
      for (let i = 0; i < memberSize.length; i++) {
        temp += this.$changeText(memberSize[i].userDispMtext) + ', '
      }
      var text
      if (temp !== '') {
        text = temp.substring(0, (temp.length - 2))
      }

      return text
    },
    closeFuncPop () {
      // this.changeFunc()
      this.functionPopShowYn = false
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changePermission (id, type) {
      switch (id) {
        case 'W':
          this.permissionWGroup.type = type
          break
        case 'V':
          this.permissionVGroup.type = type
          break
        case 'R':
          this.permissionRGroup.type = type
          break
      }
    },
    selectPermission (id) {
      switch (id) {
        case 'write':
          this.writePermissionSelectYn = true
          break
        case 'read':
          this.readPermissionSelectYn = true
          break
        case 'comment':
          this.commentPermissionSelectYn = true
          break
      }
    },
    closeColorPickerPop (value) {
      if (value === '0') {
      } else {
        this.selectedColor = value
      }
      this.colorPickerShowYn = false
    },
    async getCabinetDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var tt = this.propData
      param.currentTeamKey = this.modiBoardDetailProps.teamKey
      param.cabinetKey = this.modiBoardDetailProps.cabinetKey
      param.adminYn = true
      var resultList = await this.$getCabinetDetail(param)
      console.log(resultList)
      this.settingCabDetail(resultList)
    },
    async settingCabDetail (data) {
      if (!data.mCabinet) return
      if (data.mCabinet) {
        this.boardName = await this.$changeText(data.mCabinet.cabinetNameMtext)
      }
      // console.log(data)
      // 작성자명/댓글지원O/파일업로드O
      if (data.mCabinet.workStatYn === 1) { this.workStatYn = true } else { this.workStatYn = false }
      if (data.mCabinet.replyYn === 1) { this.replyYnInput = true } else { this.replyYnInput = false }
      if (data.mCabinet.fileYn === 1) { this.fileYnInput = true } else { this.fileYnInput = false }
      if (data.mCabinet.blindYn === 1) { this.blindYn = true } else { this.blindYn = false }
      if (data.mCabinet.titleBlindYn === 1) { this.titleBlindYn = true } else { this.titleBlindYn = false }
      if (data.mCabinet.picBgPath) {
        this.selectedColor = data.mCabinet.picBgPath
      }
      if (data.mCabinet.guideFullStr) {
        this.guideSampleInnerHtml = this.decodeContents(data.mCabinet.guideFullStr)
      }
      var mCabinet = data.mCabinet
      console.log('------------------ mCabinet, ShareList, ItemList -----------------')

      var cabShareList = mCabinet.cabShareList
      var mShareItemList = mCabinet.mShareItemList
      console.log(mCabinet)
      console.log(cabShareList)
      console.log(mShareItemList)
      // eslint-disable-next-line no-debugger
      debugger
      // 공유 리스트에서 공유 대상이 전체(T)인지 선택인지 구분
      var findListInT = cabShareList.findIndex(i => i.accessKind === 'T')
      if (findListInT !== -1) {
        this.shareGroup.type = 'A'
        // this.selectedReceiver = '전체에게 공유 중'
      } else {
        findListInT = cabShareList.findIndex(i => i.accessKind === 'F')
        if (findListInT !== -1) {
          this.shareGroup.type = 'F'
          // this.selectedReceiver = '전체에게 공유 중'
        } else {
          this.shareGroup.type = 'S'
          this.shareGroup.selectedList = { bookList: [], memberList: [] }
          // var shareMemCount = 0
          // var shareBookCount = 0
          if (cabShareList) {
            for (let i = 0; i < cabShareList.length; i++) {
              if (cabShareList[i].accessKey === undefined || cabShareList[i].accessKey === null || cabShareList[i].accessKey === '') continue
              if (cabShareList[i].accessKind === 'C') {
                if (cabShareList[i].cabinetNameMtext === null) continue
                /* shareBookCount += 1 */
                if (cabShareList[i].muserList) {
                  cabShareList[i].mUserList = cabShareList[i].muserList
                }
                cabShareList[i].cabinetKey = cabShareList[i].accessKey
                this.shareGroup.selectedList.bookList.push(cabShareList[i])
                if (cabShareList[i].muserList) {
                  cabShareList[i].mUserList = cabShareList[i].muserList
                }
              } else if (cabShareList[i].accessKind === 'M') {
                if (cabShareList[i].nameMtext === null) continue
                cabShareList[i].memberYn = true
                cabShareList[i].memberTypeKey = cabShareList[i].accessKey
                cabShareList[i].cabinetKey = this.modiBoardDetailProps.cabinetKey
                if (cabShareList[i].muserList) {
                  cabShareList[i].mUserList = cabShareList[i].muserList
                }
                this.shareGroup.selectedList.bookList.push(cabShareList[i])
              } else if (cabShareList[i].accessKind === 'U') {
              // shareMemCount += 1
                this.shareGroup.selectedList.memberList.push(cabShareList[i])
              }
            }
            // this.selectedList = {}
            console.log('------------------ this.shareGroup.selectedList -----------------')
            console.log(this.shareGroup.selectedList)
            console.log(cabShareList)
          // this.selectedList.data = this.shareGroup.selectedList
          // this.selectedReceiver = this.shareGroup.selectedList  shareBookCount + '개 그룹, ' + shareMemCount + '명 에게 공유 중'
          }
        }

        /* this.permissionWGroup.type = 'S'
        this.permissionRGroup.type = 'S'
        this.permissionVGroup.type = 'S' */
        // var cabinetCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'C').length
        // var userCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'U').length
        // this.selectedReceiver = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      }
      // this.selectShareList = data.mCabinet.cabShareList
      // this.selectItemList = data.mCabinet.mShareItemList

      // 권한을 사용하는지 안하는지 체크하기 위해 한개라도 W,V,R 값이 있으면 ture로 변환 없으면 type = 'N' 처리
      var w = false
      var v = false
      var r = false

      this.permissionWGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      this.permissionVGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      this.permissionRGroup = { type: 'A', selectedList: { bookList: [], memberList: [] } }
      // 공유 아이템 중 W, V, R을 찾아 Radio버튼 setting
      console.log(mShareItemList)
      for (let i = 0; i < mShareItemList.length; i++) {
        if (mShareItemList[i].accessKey === undefined || mShareItemList[i].accessKey === null || mShareItemList[i].accessKey === '') continue
        var cIndex = null

        cIndex = cabShareList.findIndex(item => item.accessKey === mShareItemList[i].accessKey)
        if (mShareItemList[i].accessKind === 'C') {
          // mShareItemList[i].accessKey = mShareItemList[i].accessKey
          mShareItemList[i].shareSeq = cabShareList[cIndex].accessKey
          mShareItemList[i].cabinetKey = cabShareList[cIndex].accessKey
          mShareItemList[i].cabinetKey = cabShareList[cIndex].accessKey
          mShareItemList[i].mUserList = cabShareList[cIndex].mUserList
          if (cabShareList[cIndex].muserList) {
            mShareItemList[i].mUserList = cabShareList[cIndex].muserList
          }

          // eslint-disable-next-line no-debugger
          debugger
          if (cabShareList[cIndex].cabinetNameMtext === null) continue
          mShareItemList[i].cabinetNameMtext = this.$changeText(cabShareList[cIndex].cabinetNameMtext)
        } else if (mShareItemList[i].accessKind === 'M') {
          // mShareItemList[i].accessKey = mShareItemList[i].accessKey
          mShareItemList[i].shareSeq = cabShareList[cIndex].accessKey
          if (cabShareList[cIndex].nameMtext === null) continue
          mShareItemList[i].memberYn = true
          mShareItemList[i].cabinetKey = this.modiBoardDetailProps.cabinetKey
          mShareItemList[i].memberTypeKey = cabShareList[cIndex].accessKey
          mShareItemList[i].nameMtext = this.$changeText(cabShareList[cIndex].nameMtext)
          if (cabShareList[cIndex].muserList) {
            cabShareList[cIndex].mUserList = cabShareList[i].muserList
          }
        } else if (mShareItemList[i].accessKind === 'U') {
          mShareItemList[i].shareSeq = cabShareList[cIndex].accessKey
          mShareItemList[i].userKey = cabShareList[cIndex].accessKey
          mShareItemList[i].userDispMtext = this.$changeText(cabShareList[cIndex].userDispMtext)
          mShareItemList[i].userNameMtext = this.$changeText(cabShareList[cIndex].userNameMtext)
          mShareItemList[i].domainPath = cabShareList[cIndex].domainPath
          mShareItemList[i].pathMtext = cabShareList[cIndex].pathMtext
          mShareItemList[i].phoneEnc = cabShareList[cIndex].phoneEnc
          mShareItemList[i].userEmail = cabShareList[cIndex].userEmail
        }
        // // eslint-disable-next-line no-debugger
        // debugger
        if (mShareItemList[i].shareType === 'W') {
          if (mShareItemList[i].accessKind === 'T' || mShareItemList[i].accessKind === 'F') {
            this.permissionWGroup.type = 'A'
          } else {
            this.permissionWGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // eslint-disable-next-line no-debugger
              debugger
              // this.permissionWGroup.selectedList.bookList = []
              this.permissionWGroup.selectedList.bookList.push(mShareItemList[i])
            } else if (mShareItemList[i].accessKind === 'M') {
              this.permissionWGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionWGroup.selectedList.memberList = []
              this.permissionWGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          w = true
          //
        } else if (mShareItemList[i].shareType === 'V') {
          if (mShareItemList[i].accessKind === 'T' || mShareItemList[i].accessKind === 'F') {
            this.permissionVGroup.type = 'A'
          } else {
            this.permissionVGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // this.permissionVGroup.selectedList.bookList = []
              this.permissionVGroup.selectedList.bookList.push(mShareItemList[i])
            } else if (mShareItemList[i].accessKind === 'M') {
              // this.permissionVGroup.selectedList.bookList = []
              this.permissionVGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionVGroup.selectedList.memberList = []
              this.permissionVGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          v = true
          //
        } else if (mShareItemList[i].shareType === 'R') {
          if (mShareItemList[i].accessKind === 'T' || mShareItemList[i].accessKind === 'F') {
            this.permissionRGroup.type = 'A'
          } else {
            this.permissionRGroup.type = 'S'
            if (mShareItemList[i].accessKind === 'C') {
              // this.permissionRGroup.selectedList.bookList = []
              this.permissionRGroup.selectedList.bookList.push(mShareItemList[i])
            } else if (mShareItemList[i].accessKind === 'M') {
              // this.permissionRGroup.selectedList.bookList = []
              this.permissionRGroup.selectedList.bookList.push(mShareItemList[i])
            }
            if (mShareItemList[i].accessKind === 'U') {
              // this.permissionRGroup.selectedList.memberList = []
              this.permissionRGroup.selectedList.memberList.push(mShareItemList[i])
            }
          }
          r = true
        }
      }
      if (w === false && this.shareGroup.type !== 'S') this.permissionWGroup.type = 'N'
      if (v === false && this.shareGroup.type !== 'S') this.permissionVGroup.type = 'N'
      if (r === false && this.shareGroup.type !== 'S') this.permissionRGroup.type = 'N'
      if (findListInT === -1) {
        this.permissionWGroup.type = 'S'
        this.permissionVGroup.type = 'S'
        this.permissionRGroup.type = 'S'
      }
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(this.permissionWGroup.selectedList)
      console.log(this.permissionVGroup.selectedList)
      console.log(this.permissionRGroup.selectedList)
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@')

      // var cabinetCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'C').length
      // var userCount = mShareItemList.filter(i => i.shareType === 'W' && i.accessKind === 'U').length
      // this.writePermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'

      // cabinetCount = mShareItemList.filter(i => i.shareType === 'V' && i.accessKind === 'C').length
      // userCount = mShareItemList.filter(i => i.shareType === 'V' && i.accessKind === 'U').length
      // this.readPermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'

      // cabinetCount = mShareItemList.filter(i => i.shareType === 'R' && i.accessKind === 'C').length
      // userCount = mShareItemList.filter(i => i.shareType === 'R' && i.accessKind === 'U').length
      // this.commentPermission = cabinetCount + '개 그룹, ' + userCount + '명 에게 권한 부여'
      this.setTextPermission()

      console.log(this.permissionWGroup.type)
      console.log(this.permissionVGroup.type)
      console.log(this.permissionRGroup.type)

      console.log(this.permissionWGroup.selectedList)
      console.log(this.permissionVGroup.selectedList)
      console.log(this.permissionRGroup.selectedList)

      // this.$emit('closeLoading')
      this.loadingYn = false
    },
    selectShareActorItem (itemType) {
      console.log('selectShareActorItem')
      console.log(itemType)
      this.currentSelectBookType = itemType
      if (itemType === 'V') {
        this.permissionSelectedYn.V = true
      }
      if (itemType === 'R') {
        this.permissionSelectedYn.R = true
      }
      if (itemType === 'W') {
        this.permissionSelectedYn.W = true
      }
      console.log(this.shareGroup.type)
      if (this.shareGroup.type === 'S') {
        console.log('*************************')
        console.log(this.shareGroup.selectedList)
        this.permissionSelectedList = []
        if (itemType === 'V') {
          this.permissionSelectedList = this.permissionVGroup.selectedList
        }
        if (itemType === 'R') {
          this.permissionSelectedList = this.permissionRGroup.selectedList
        }
        if (itemType === 'W') {
          this.permissionSelectedList = this.permissionWGroup.selectedList
        }
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
        console.log(this.permissionSelectedList)
        this.selectedList = {}
        if (this.shareGroup.selectedList && ((this.shareGroup.selectedList.bookList && this.shareGroup.selectedList.bookList.length > 0) || (this.shareGroup.selectedList.memberList && this.shareGroup.selectedList.memberList.length > 0))) {
          this.selectedList.data = this.shareGroup.selectedList
          this.shareActorItemType = itemType
          this.receiverAccessListYn = true
          this.$addHistoryStack('modiPopReceiverSelecPop')
        } else {
          this.$showToastPop(this.$t('EDIT_BOARD_MSG_SELECTMEM'))
        }
      }
      // if (this.selectedList.data) {
      //   if (this.selectedList.data.bookList || this.selectedList.data.memberList) {
      //     this.shareActorItemType = itemType
      //     this.receiverAccessListYn = true
      //   }
      // }
    },
    choiceColor (color) {
      this.selectedColor = color
      this.$refs.colorPicker.setColor(color)
      // console.log(color)
    },
    async updateCabinet () {
      // console.log(this.permissionWGroup.selectedList)
      // console.log(this.permissionVGroup.selectedList)
      // console.log(this.permissionRGroup.selectedList)

      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-new-object
      var cabinet = new Object()
      cabinet.teamMenuKey = this.modiBoardDetailProps.teamMenuKey
      cabinet.cabinetNameMtext = 'KO$^$' + this.boardName
      cabinet.cabinetKey = this.modiBoardDetailProps.cabinetKey
      cabinet.MenuType = 'C'
      cabinet.blindYn = this.blindYn
      cabinet.fileYn = this.fileYnInput
      cabinet.replyYn = this.replyYnInput
      cabinet.workStatYn = this.workStatYn
      if (this.guideSampleInnerHtml) {
        cabinet.guideFullStr = this.guideSampleInnerHtml
      } else {
        cabinet.guideFullStr = ''
      }
      var shareList = []
      var itemList = []
      // eslint-disable-next-line no-new-object
      var share = new Object()
      // eslint-disable-next-line no-new-object
      var item = new Object()
      share.cabinetKey = this.modiBoardDetailProps.cabinetKey
      // // console.log(this.shareType)
      var teampItemList = {}
      var shareSeqList = null
      if (this.shareGroup.type === 'A') {
        share = {}
        share.accessKind = 'T'
        share.accessKey = this.modiBoardDetailProps.teamKey
        share.cabinetKey = this.modiBoardDetailProps.cabinetKey
        share.shareSeq = 0
        shareList.push(share)
      } else if (this.shareGroup.type === 'F') {
        share = {}
        share.accessKind = 'F'
        share.accessKey = this.modiBoardDetailProps.teamKey
        share.cabinetKey = this.modiBoardDetailProps.cabinetKey
        share.shareSeq = 0
        shareList.push(share)
      } else if (this.shareGroup.type === 'S') {
        console.log('this.shareGroup.selectedList')
        console.log(this.shareGroup.selectedList)
        if (!this.shareGroup.selectedList.bookList) this.shareGroup.selectedList.bookList = []
        shareSeqList = this.shareGroup.selectedList.bookList
        for (var i = 0; i < shareSeqList.length; i++) {
          share = {}
          // eslint-disable-next-line no-debugger
          debugger
          if (shareSeqList[i].memberYn) {
            share.accessKind = 'M'
            share.accessKey = shareSeqList[i].accessKey
            share.shareSeq = shareSeqList[i].accessKey
            share.cabinetKey = this.modiBoardDetailProps.cabinetKey
            if (shareSeqList[i].cabinetNameMtext) share.nameMtext = this.$changeText(shareSeqList[i].nameMtext)
          } else {
            share.accessKind = 'C'
            share.accessKey = shareSeqList[i].accessKey
            share.cabinetKey = this.modiBoardDetailProps.cabinetKey
            share.shareSeq = shareSeqList[i].accessKey
            if (shareSeqList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(shareSeqList[i].cabinetNameMtext)
          }

          var index = shareList.findIndex(item => item.accessKey === shareSeqList[i].accessKey)
          if (index === -1) {
            shareList.push(share)
          }
        }
        // eslint-disable-next-line no-array-constructor
        /* shareSeqList = new Array()
        shareSeqList = this.shareGroup.selectedList.memberList */
        // eslint-disable-next-line no-debugger
        debugger
        for (i = 0; i < this.shareGroup.selectedList.length; i++) {
          share = {}
          share.accessKind = 'U'
          share.cabinetKey = this.modiBoardDetailProps.cabinetKey
          if (this.shareGroup.selectedList[i].userDispMtext) share.userDispMtext = this.$changeText(this.shareGroup.selectedList[i].userDispMtext)
          if (this.shareGroup.selectedList[i].userNameMtext) share.userNameMtext = this.$changeText(this.shareGroup.selectedList[i].userNameMtext)
          if (this.shareGroup.selectedList[i].accessKey) {
            share.accessKey = shareSeqList[i].accessKey
          } else if (this.shareGroup.selectedList[i].userKey) {
            share.accessKey = this.shareGroup.selectedList[i].userKey
          }
          // hare.accessKey = shareSeqList[i].cabinetKey
          share.shareSeq = this.shareGroup.selectedList[i].accessKey
          index = shareList.findIndex(item => item.accessKey === this.shareGroup.selectedList[i].accessKey)
          if (index === -1 && !share.accessKey) {
            shareList.push(share)
          }
        }
      }
      console.log('2222this.shareGroup.selectedList')
      console.log(shareList)
      console.log(this.permissionWGroup)
      /* W 권한 처리 */
      if (this.permissionWGroup.type === 'A') {
        for (var sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'W' // 작성
          itemList.push(item)
        }
      } else if (this.permissionWGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionWGroup.type === 'S') {
        if (this.permissionWGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionWGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionWGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              // eslint-disable-next-line no-debugger
              debugger
              if (!this.permissionWGroup.selectedList.bookList[i].memberYn) {
                share.accessKind = 'C'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                if (this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext)
              } else {
                share.memberYn = true
                share.accessKind = 'M'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                share.nameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].nameMtext)
              }
              share.accessKey = this.permissionWGroup.selectedList.bookList[i].accessKey
              share.shareSeq = this.permissionWGroup.selectedList.bookList[i].accessKey
              console.log('shareList.push')
              console.log(share)
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'W'
            if (!this.permissionWGroup.selectedList.bookList[i].memberYn) {
              if (this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].cabinetNameMtext)
              teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            } else {
              teampItemList.nameMtext = this.$changeText(this.permissionWGroup.selectedList.bookList[i].nameMtext)
            }

            teampItemList.shareSeq = this.permissionWGroup.selectedList.bookList[i].accessKey
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionWGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionWGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionWGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionWGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionWGroup.selectedList.memberList[i].accessKey
              if (this.permissionWGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionWGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userNameMtext)
              console.log('shareList.push')
              console.log(share)
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'W'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionWGroup.selectedList.memberList[i].accessKey
            if (this.permissionWGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionWGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionWGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }

      console.log(this.permissionVGroup)
      /* V 권한 처리 */
      if (this.permissionVGroup.type === 'A') {
        for (sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'V' // 작성
          itemList.push(item)
        }
      } else if (this.permissionVGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionVGroup.type === 'S') {
        if (this.permissionVGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionVGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionVGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              if (!this.permissionVGroup.selectedList.bookList[i].memberYn) {
                share.accessKind = 'C'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                if (this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext)
              } else {
                share.accessKind = 'M'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                share.nameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].nameMtext)
              }
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.accessKey = this.permissionVGroup.selectedList.bookList[i].accessKey
              share.shareSeq = this.permissionVGroup.selectedList.bookList[i].accessKey
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'V'
            if (!this.permissionVGroup.selectedList.bookList[i].memberYn) {
              if (this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].cabinetNameMtext)
              teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            } else {
              teampItemList.nameMtext = this.$changeText(this.permissionVGroup.selectedList.bookList[i].nameMtext)
            }
            teampItemList.shareSeq = this.permissionVGroup.selectedList.bookList[i].accessKey
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionVGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionVGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionVGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionVGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionVGroup.selectedList.memberList[i].accessKey
              if (this.permissionVGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionVGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userNameMtext)
              shareList.push(share)
            }

            teampItemList = {}
            teampItemList.shareType = 'V'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionVGroup.selectedList.memberList[i].accessKey
            if (this.permissionVGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionVGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionVGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }

      console.log(this.permissionRGroup)
      // eslint-disable-next-line no-debugger
      debugger
      /* R 권한 처리 */
      if (this.permissionRGroup.type === 'A') {
        for (sh = 0; sh < shareList.length; sh++) {
          item = {}
          // item.shareSeq = shareList[sh].accessKey
          item.shareSeq = 0
          item.shareType = 'R' // 작성
          itemList.push(item)
        }
      } else if (this.permissionRGroup.type === 'N') {
        // itemList = []
      } else if (this.permissionRGroup.type === 'S') {
        if (this.permissionRGroup.selectedList.bookList) {
          for (let i = 0; i < this.permissionRGroup.selectedList.bookList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionRGroup.selectedList.bookList[i].accessKey)
            if (index === -1) {
              share = {}
              if (!this.permissionRGroup.selectedList.bookList[i].memberYn) {
                share.accessKind = 'C'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                if (this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext) share.cabinetNameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext)
              } else {
                share.accessKind = 'M'
                share.cabinetKey = this.modiBoardDetailProps.cabinetKey
                share.nameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].nameMtext)
              }
              share.accessKey = this.permissionRGroup.selectedList.bookList[i].accessKey
              share.shareSeq = this.permissionRGroup.selectedList.bookList[i].accessKey
              shareList.push(share)
            }
            teampItemList = {}
            teampItemList.shareType = 'R'
            if (!this.permissionRGroup.selectedList.bookList[i].memberYn) {
              if (this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext) teampItemList.cabinetNameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].cabinetNameMtext)
              teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            } else {
              teampItemList.nameMtext = this.$changeText(this.permissionRGroup.selectedList.bookList[i].nameMtext)
            }
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionRGroup.selectedList.bookList[i].accessKey
            itemList.push(teampItemList)
            // if(teampItemList.shareType !== data.bookList[i].shareType ){
          }
        }

        if (this.permissionRGroup.selectedList.memberList) {
          for (let i = 0; i < this.permissionRGroup.selectedList.memberList.length; i++) {
            index = shareList.findIndex(item => item.shareSeq === this.permissionRGroup.selectedList.memberList[i].accessKey)
            if (index === -1) {
              share = {}
              share.accessKind = 'U'
              share.accessKey = this.permissionRGroup.selectedList.memberList[i].accessKey
              share.cabinetKey = this.modiBoardDetailProps.cabinetKey
              share.shareSeq = this.permissionRGroup.selectedList.memberList[i].accessKey
              if (this.permissionRGroup.selectedList.memberList[i].userDispMtext) share.userDispMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userDispMtext)
              if (this.permissionRGroup.selectedList.memberList[i].userNameMtext) share.userNameMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userNameMtext)
              shareList.push(share)
            }

            teampItemList = {}
            teampItemList.shareType = 'R'
            teampItemList.cabinetKey = this.modiBoardDetailProps.cabinetKey
            teampItemList.shareSeq = this.permissionRGroup.selectedList.memberList[i].accessKey
            if (this.permissionRGroup.selectedList.memberList[i].userDispMtext) teampItemList.userDispMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userDispMtext)
            if (this.permissionRGroup.selectedList.memberList[i].userNameMtext) teampItemList.userNameMtext = this.$changeText(this.permissionRGroup.selectedList.memberList[i].userNameMtext)
            itemList.push(teampItemList)
          }
        }
      }
      cabinet.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      cabinet.targetKind = 'T'
      cabinet.targetKey = this.CHANNEL_DETAIL.teamKey
      cabinet.picBgPath = this.selectedColor
      cabinet.shareList = shareList
      cabinet.itemList = itemList
      cabinet.titleBlindYn = this.titleBlindYn
      param.cabinet = cabinet
      param.creMenuYn = false

      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(param)
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        // // console.log('@@성공@@')
        this.okPopYn = true
      }
      // this.$store.dispatch('D_CHANNEL/AC_ADD_UPDATE_CHAN_LIST', 'CABINET')
    },
    closePop () {
      this.$checkDeleteHistory('modiBoardPop')
      this.$emit('closePop')
    },
    // 주소록 전체에서 고르기
    async showSelectBookPop (type) {
      console.log(type)
      this.currentSelectBookType = type
      if (this.shareGroup.type === 'A' || this.shareGroup.type === 'F' || (this.shareGroup.type === 'S' && type === 'select')) {
        if (type === 'select') {
          this.selectedList = this.shareGroup.selectedList
        } else {
          if (type === 'W') {
            this.selectedList = this.permissionWGroup.selectedList
          } else if (type === 'V') {
            this.selectedList = this.permissionVGroup.selectedList
          } else if (type === 'R') {
            this.selectedList = this.permissionRGroup.selectedList
          }
        }
        console.log('prop selectedList 값')
        console.log(this.selectedList)
        var selectListParamMap = new Map()
        selectListParamMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
        // eslint-disable-next-line no-new-object
        var param = new Object()
        param.targetType = 'selectBookList'
        param.param = selectListParamMap
        var initData = await this.$getGPopData(param)
        this.chanProps.initData = initData
        // param.initData = initData
        this.selectBookListShowYn = true
        this.$addHistoryStack('modiPopReceiverSelecPop')
      } else {
        // 선택한 주소에서 고르기
        this.selectShareActorItem(type)
      }
    },
    goNo () {
      this.closePop()
    },
    boardTypeClick () {
      this.selectTypePopShowYn = true
    },
    addResult (data) {
      this.selectBoardTypeText = data.chanMenuTitle

      this.selectId = data.idNum
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.selectTypePopShowYn = false
    },
    click () {
      var toggle0 = document.getElementById('toggle0')
      this.show = !toggle0.checked
      if (!toggle0.checked) {
        this.statusSelectShowYn = true
      } else {
        this.statusSelectShowYn = false
      }
    },
    receiverPoolInSetting (datas) {
      console.log(' %%%%%%%%%%%%%%% ')
      console.log(datas)
      // eslint-disable-next-line no-debugger
      debugger
      console.log(this.currentSelectBookType)
      // var bookCount, memberCount
      if (datas.bookList) {
        var settingBookList = []
        const books = datas.bookList
        // bookCount = books.length
        for (var i = 0; i < books.length; i++) {
          var tempList = {}
          var accKey = null
          if (books[i].shareSeq) {
            accKey = books[i].shareSeq
          } else if (books[i].accessKey) {
            accKey = books[i].accessKey
          }
          if (!books[i].memberYn) {
            tempList.cabinetNameMtext = this.$changeText(books[i].cabinetNameMtext)
            tempList.accessKind = 'C'
            tempList.mUserList = books[i].mUserList
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          } else {
            tempList.nameMtext = this.$changeText(books[i].nameMtext)
            tempList.accessKind = 'M'
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          }
          tempList.accessKey = accKey
          tempList.shareSeq = accKey

          settingBookList.push(tempList)
        }
        if (this.currentSelectBookType === 'W') {
          if (!this.permissionWGroup.selectedList.bookList) {
            this.permissionWGroup.selectedList.bookList = []
          }
          // this.permissionWGroup.selectedList.bookList = []
          this.permissionWGroup.selectedList.bookList = settingBookList
        } else if (this.currentSelectBookType === 'V') {
          if (!this.permissionVGroup.selectedList.bookList) {
            this.permissionVGroup.selectedList.bookList = []
          }
          // this.permissionVGroup.selectedList.bookList = []
          this.permissionVGroup.selectedList.bookList = settingBookList
        } else if (this.currentSelectBookType === 'R') {
          if (!this.permissionRGroup.selectedList.bookList) {
            this.permissionRGroup.selectedList.bookList = []
          }
          // this.permissionRGroup.selectedList.bookList = []
          this.permissionRGroup.selectedList.bookList = settingBookList
        }
      }
      if (datas.memberList) {
        const members = datas.memberList
        var settingMemList = []
        // memberCount = members.length
        for (let i = 0; i < members.length; i++) {
          tempList = {}
          tempList.userDispMtext = this.$changeText(members[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(members[i].userNameMtext)
          var mAccKey = null
          if (members[i].shareSeq) {
            mAccKey = members[i].shareSeq
          } else if (members[i].accessKey) {
            mAccKey = members[i].accessKey
          }

          tempList.domainPath = members[i].domainPath
          tempList.pathMtext = members[i].pathMtext
          tempList.userProfileImg = members[i].userProfileImg
          tempList.phoneEnc = members[i].phoneEnc
          tempList.userEmail = members[i].userEmail

          tempList.accessKey = mAccKey
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = mAccKey
          settingMemList.push(tempList)
        }

        if (this.currentSelectBookType === 'W') {
          if (!this.permissionWGroup.selectedList.memberList) {
            this.permissionWGroup.selectedList.memberList = []
          }
          // this.permissionWGroup.selectedList.memberList = []
          this.permissionWGroup.selectedList.memberList = settingMemList
        } else if (this.currentSelectBookType === 'V') {
          if (!this.permissionVGroup.selectedList.memberList) {
            this.permissionVGroup.selectedList.memberList = []
          }
          // this.permissionVGroup.selectedList.memberList = []
          this.permissionVGroup.selectedList.memberList = settingMemList
        } else if (this.currentSelectBookType === 'R') {
          if (!this.permissionRGroup.selectedList.memberList) {
            this.permissionRGroup.selectedList.memberList = []
          }
          // this.permissionRGroup.selectedList.memberList = []
          this.permissionRGroup.selectedList.memberList = settingMemList
        }
      }
      // console.log('---- setTextPermission -----')
      // console.log(bookCount + ' ' + memberCount)
      // console.log(this.currentSelectBookType)

      // if (this.currentSelectBookType === 'W') {
      //   this.writePermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else if (this.currentSelectBookType === 'V') {
      //   this.readPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else if (this.currentSelectBookType === 'R') {
      //   this.commentPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // }
      this.setTextPermission()
    },
    setSelectedList (datas) {
      // 권한 선택시 실행
      console.log('-------------------------------------')
      this.selectedShareList = []
      var data = datas
      this.selectBookListShowYn = false
      // var bookCount, memberCount
      console.log(datas)
      if (data.bookList) {
        var settingBookList = []
        // bookCount = data.bookList.length
        const books = datas.bookList
        for (var i = 0; i < books.length; i++) {
          var tempList = {}
          var accKey = null
          if (books[i].shareSeq) {
            accKey = books[i].shareSeq
          } else if (books[i].accessKey) {
            accKey = books[i].accessKey
          }
          if (!books[i].memberYn) {
            tempList.cabinetNameMtext = this.$changeText(books[i].cabinetNameMtext)
            tempList.accessKind = 'C'
            tempList.mUserList = books[i].mUserList
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          } else {
            tempList.memberYn = true
            tempList.nameMtext = this.$changeText(books[i].nameMtext)
            tempList.accessKind = 'M'
            tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          }
          tempList.accessKey = accKey
          tempList.shareSeq = accKey

          settingBookList.push(tempList)
        }
        if (this.currentSelectBookType === 'select') {
          if (!this.shareGroup.selectedList.bookList) {
            this.shareGroup.selectedList.bookList = []
          }
          this.shareGroup.selectedList.bookList = settingBookList
          this.permissionWGroup.selectedList.bookList = settingBookList
          this.permissionVGroup.selectedList.bookList = settingBookList
          this.permissionRGroup.selectedList.bookList = settingBookList
        } else {
          if (this.currentSelectBookType === 'W') {
            if (!this.permissionWGroup.selectedList.bookList) {
              this.permissionWGroup.selectedList.bookList = []
            }
            this.permissionWGroup.selectedList.bookList = settingBookList
          } else if (this.currentSelectBookType === 'V') {
            if (!this.permissionVGroup.selectedList.bookList) {
              this.permissionVGroup.selectedList.bookList = []
            }
            this.permissionVGroup.selectedList.bookList = settingBookList
          } else if (this.currentSelectBookType === 'R') {
            if (!this.permissionRGroup.selectedList.bookList) {
              this.permissionRGroup.selectedList.bookList = []
            }
            this.permissionRGroup.selectedList.bookList = settingBookList
          }
        }
      }
      if (data.memberList) {
        var settingMemList = []
        // memberCount = data.memberList.length
        for (let i = 0; i < data.memberList.length; i++) {
          tempList = {}
          var uAccKey = data.memberList[i].userKey
          if (!uAccKey) {
            uAccKey = data.memberList[i].accessKey
          }
          if (!uAccKey) {
            uAccKey = data.memberList[i].shareSeq
          }
          tempList.userDispMtext = this.$changeText(data.memberList[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(data.memberList[i].userNameMtext)
          tempList.accessKey = uAccKey
          tempList.accessKind = 'U'

          tempList.domainPath = data.memberList[i].domainPath
          tempList.pathMtext = data.memberList[i].pathMtext
          tempList.userProfileImg = data.memberList[i].userProfileImg
          tempList.phoneEnc = data.memberList[i].phoneEnc
          tempList.userEmail = data.memberList[i].userEmail

          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = uAccKey
          settingMemList.push(tempList)
        }
        if (this.currentSelectBookType === 'select') {
          if (!this.shareGroup.selectedList.memberList) {
            this.shareGroup.selectedList.memberList = []
          }
          this.shareGroup.selectedList.memberList = settingMemList
          this.permissionWGroup.selectedList.memberList = settingMemList
          this.permissionVGroup.selectedList.memberList = settingMemList
          this.permissionRGroup.selectedList.memberList = settingMemList
        } else {
          if (this.currentSelectBookType === 'W') {
            if (!this.permissionWGroup.selectedList.memberList) {
              this.permissionWGroup.selectedList.memberList = []
            }
            this.permissionWGroup.selectedList.memberList = settingMemList
          } else if (this.currentSelectBookType === 'V') {
            if (!this.permissionVGroup.selectedList.memberList) {
              this.permissionVGroup.selectedList.memberList = []
            }
            this.permissionVGroup.selectedList.memberList = settingMemList

            // 열람 시
            this.permissionRGroup.selectedList.memberList = settingMemList
          } else if (this.currentSelectBookType === 'R') {
            if (!this.permissionRGroup.selectedList.memberList) {
              this.permissionRGroup.selectedList.memberList = []
            }
            this.permissionRGroup.selectedList.memberList = settingMemList
          }
        }
      }
      // console.log('---- setTextPermission -----')
      // console.log(bookCount + ' ' + memberCount)
      // console.log(this.currentSelectBookType)
      // if (bookCount === undefined) bookCount = 0
      // if (memberCount === undefined) memberCount = 0
      // if (this.currentSelectBookType === 'select') {
      //   this.selectedReceiver = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      // } else {
      //   if (this.currentSelectBookType === 'W') {
      //     this.writePermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   } else if (this.currentSelectBookType === 'V') {
      //     this.readPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   } else if (this.currentSelectBookType === 'R') {
      //     this.commentPermission = bookCount + '개 그룹, ' + memberCount + '명 에게 권한 부여'
      //   }
      // }
      this.setTextPermission()
      // this.setTextPermission(bookCount, memberCount)
    },
    // // 작성, 열람, 댓글의 텍스트를 셋팅해준다.
    setTextPermission () {
      /* console.log('---- setTextPermission -----')
      var sharMem, sharBook, WMem, WBook, VMem, VBook, RMem, RBook
      if (this.shareGroup.selectedList.bookList) { sharBook = this.shareGroup.selectedList.bookList.length !== 0 ? this.shareGroup.selectedList.bookList.length + '개 그룹' : '' } else { sharBook = '' }
      if (this.shareGroup.selectedList.memberList) { sharMem = this.shareGroup.selectedList.memberList.length !== 0 ? this.shareGroup.selectedList.memberList.length + '명' : '' } else { sharMem = '' }

      if (this.permissionWGroup.selectedList.bookList) { WBook = this.permissionWGroup.selectedList.bookList.length !== 0 ? this.permissionWGroup.selectedList.bookList.length + '개 그룹' : '' } else { WBook = '' }
      if (this.permissionWGroup.selectedList.memberList) { WMem = this.permissionWGroup.selectedList.memberList.length !== 0 ? this.permissionWGroup.selectedList.memberList.length + '명' : '' } else { WMem = '' }

      if (this.permissionVGroup.selectedList.bookList) { VBook = this.permissionVGroup.selectedList.bookList.length !== 0 ? this.permissionVGroup.selectedList.bookList.length + '개 그룹' : '' } else { VBook = '' }
      if (this.permissionVGroup.selectedList.memberList) { VMem = this.permissionVGroup.selectedList.memberList.length !== 0 ? this.permissionVGroup.selectedList.memberList.length + '명' : '' } else { VMem = '' }

      if (this.permissionRGroup.selectedList.bookList) { RBook = this.permissionRGroup.selectedList.bookList.length !== 0 ? this.permissionRGroup.selectedList.bookList.length + '개 그룹' : '' } else { RBook = '' }
      if (this.permissionRGroup.selectedList.memberList) { RMem = this.permissionRGroup.selectedList.memberList.length !== 0 ? this.permissionRGroup.selectedList.memberList.length + '명' : '' } else { RMem = '' }
 */
      /* if (sharBook === '' && sharMem === '') { this.selectedReceiver = '게시판을 공유할 대상을 선택해주세요.' } else {
        this.selectedReceiver = sharBook + (sharBook !== '' ? sharMem !== '' ? ', ' : '' : '') + sharMem + ' 에게 권한 부여 중'
      } */

      /* if (WBook === '' && WMem === '') { this.writePermission = '클릭하여 권한을 설정해주세요.' } else {
        this.writePermission = WBook + (WBook !== '' ? WMem !== '' ? ', ' : '' : '') + WMem + ' 에게 권한 부여 중'
      }

      if (VBook === '' && VMem === '') { this.readPermission = '클릭하여 권한을 설정해주세요.' } else {
        this.readPermission = VBook + (VBook !== '' ? VMem !== '' ? ', ' : '' : '') + VMem + ' 에게 권한 부여 중'
      }

      if (RBook === '' && RMem === '') { this.commentPermission = '클릭하여 권한을 설정해주세요.' } else {
        this.commentPermission = RBook + (RBook !== '' ? RMem !== '' ? ', ' : '' : '') + RMem + ' 에게 권한 부여 중'
      } */
    },
    changeShareType (type) {
      this.shareType = type
    },
    changed () {
      this.multiStatus += this.inputvalue
    },
    statusDeleteYn (index) {
      // this.multiStatus.removeItem(index)
      this.multiStatus.splice(index, 1)
    },
    showSelectStatus (input) {
      this.showSelectStatusShowYn = true
      if (input === 'input') {
        this.showNewYn = true
        this.count = 2
      } else {
        this.showNewYn = false
        this.count = 1
      }
    },
    hidePop () {
      this.hideSelectStatus()
      this.functionPopShowYn = false
    },
    hideSelectStatus () {
      if (this.inputvalue !== '') {
        this.multiStatus.unshift(this.inputvalue)
        this.inputvalue = ''
      } else if (this.inputvalue === '') {
        this.showSelectStatusShowYn = false
      }

      this.count -= 1
      if (this.count === 0) {
        this.showSelectStatusShowYn = false
      } else if (this.count === 1) {
        this.showNewYn = false
      }
    },
    showHidePermission () {
      if (this.sharePermissionShowYn) {
        this.sharePermissionShowYn = false
      } else {
        this.sharePermissionShowYn = true
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    }
  }

}
</script>
<style>
.addNewBoardWrap {
  width:100% ;
  height: 100vh;
  position: absolute; z-index: 999;
  top: 0;
  right: 0;
  background-color: white;
}
.itemWrite {
  width: 100%;
  min-height: 30px;
  display: flex;
  /* border-bottom: 1px solid #ccc; */
  padding: 0.8rem 0;
  align-items: flex-start;
}
.itemWrite input {
  background: #fff !important;
  min-height: 30px !important;
  height: 100% !important;
  border: 1px solid #BEBBD4 !important;
  border-radius: 8px !important;
  padding-left : 10px;
  color: #505050;
}
.itemWrite input::placeholder {
  color: #BDBDBD;
}

.itemWrite .gCheck-W {
  min-width: 80px;
  min-height: 30px
}
.receivBox {
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #505050;
  font-size: 14px;
}
.pholder:empty:before{
  content: attr(placeholder);
  color:#AFAFAF;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shareSelecStyle {
  display: flex; align-items: center; padding: 0.6rem 0;
}
.permissionBox {
  width: calc(100% - 80px);
}
@media screen and (max-width:350px){
  .jjjPaddingWrap{
    /* padding: 60px 1rem 9px 1rem !important */
    padding-top: 60px !important ;
  }
}
@media screen and (max-width:430px){
  .itemWrite .gCheck-W {
    min-width: 60px;
    min-height: 30px
  }
}
</style>
