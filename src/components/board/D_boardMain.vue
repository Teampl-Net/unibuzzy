<i18n>
  {
    "ko": {
      "CHAN_POST_NONE_CONT": "버튼을 눌러 첫 컨텐츠를 작성해보세요.",
      "CHAN_POST_MSG_SET_ERROR": "작성 setting 중 오류",
      "CHAN_POST_NO_PERMI": "권한이 없습니다.",
      "CHAN_POST_TITLE": "제목",
      "CHAN_POST_CRE_USER": "작성자",
      "CHAN_POST_SENT": "보낸",
      "CHAN_POST_DATE": "날짜",
      "CHAN_POST_FILTER": "필터",
      "CHAN_POST_STAT": "분류",
      "CHAN_NAME" : "채널명",
      "CHAN_CREDATE" : "만든일",
      "CHAN_BOARD_FUNCTION" : "게시판 기능",
      "BOARD_NO_CONTENTS": "컨텐츠가 없어요!",
      "BOARD_NEW_CONTENT" : "버튼을 눌러 첫 게시글을 작성해보세요.",
      "COMM_TITLE_GUEST" :"손님",
      "COMM_DO_KNOWN" : "실명인증을 하면 익명게시판에 글을 작성할 수 있어요",
    },
    "en": {
      "CHAN_POST_NONE_CONT": "Create the first content for your channel's bulletin board.",
      "CHAN_POST_MSG_SET_ERROR": "Error during creation setting",
      "CHAN_POST_NO_PERMI": "You don't have permission.",
      "CHAN_POST_TITLE": "Title",
      "CHAN_POST_CRE_USER": "Writer",
      "CHAN_POST_SENT": "Sent",
      "CHAN_POST_DATE": "Date",
      "CHAN_POST_FILTER": "Filter",
      "CHAN_POST_STAT": "Status",
      "CHAN_NAME" : "Channel Name",
      "CHAN_CREDATE" : "Created date",
      "CHAN_BOARD_FUNCTION" : "Board",
      "BOARD_NO_CONTENTS": "There is no written content.",
      "BOARD_NEW_CONTENT" : "Click the button to create your first post.",
      "COMM_TITLE_GUEST" :"Guest",
      "COMM_DO_KNOWN" : "If you verify your real name, you can write on the anonymous board.",
    }
  }
  </i18n>
<template>
<div>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <!-- <div :class="{popHeight :popYn == true}" style="position: absolute; top:0;left:0; z-index:9999; height: calc(100vh - 120px); position: absolute; top:0;left:0;background-color:white;"> -->
    <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>
    <div id="boardWrap" v-if="CAB_DETAIL" :style="CAB_DETAIL.picBgPath? 'background: ' + CAB_DETAIL.picBgPath + ';' + 'padding-top: ' + this.$STATUS_HEIGHT + 'px' : 'background: #ece6cc;' + 'padding-top: ' + this.$STATUS_HEIGHT + 'px'" style="overflow: auto;" ref="boardListWrap" class="boardListWrap">
      <!-- <span class="font20 fontBold">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</span> -->
      <p class="font20 fontBold textOverdot" :style="CAB_DETAIL.cabinetNameMtext.length > 15 ? 'font-size:14px !important;' :'' " style="color:#2c3e50; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); max-width: calc(100% - 120px);">{{ this.$changeText(CAB_DETAIL.cabinetNameMtext)}}</p>
      <div id="summaryHeader" class="summaryHeader">
        <!-- <p class="font20 fontBold" style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex;" :style="propData.officialYn ? 'padding-right: 30px;':'' "> <img class="fl" src="../../assets/images/channel/icon_official.svg" v-if="propData.officialYn" style="width:30px;" alt="" /> {{this.$changeText(propData.nameMtext)}}</p> -->
        <div id="boardInfoSummary" class="mt-header boardWhiteBox">
          <div v-if="CHANNEL_DETAIL" id="chanInfoSummary" ref="chanImg"  class=" boardCard" style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; padding: 10px;">{{value}}
            <div class="chanImgRound" :style="'background-image: url('+  (CHANNEL_DETAIL.logoDomainPath? CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext : CHANNEL_DETAIL.logoPathMtext) + ');' " style="background-size: cover; background-position: center; background-repeat: no-repeat;" > <!-- 채널 로고 부분 -->
            </div>
            <div class="chanTextBox fl mleft-05;" style=" width:100%; margin-left: 0.5rem;">
              <div class="fl font16  w-100P">
                <div style="width:50px;" >
                  <p class="font15 commonColor textLeft fl mleft-05" style="color:rgb(74 102 158); white-space: nowrap;"> {{ this.$t('CHAN_NAME') }} </p>
                </div>
                <p class="font14 textLeft fl mleft-1 commonBlack">{{this.$changeText(CHANNEL_DETAIL.nameMtext) }}</p>
              </div>
              <div class="fl font16  w-100P">
                <div style="width:50px;" >
                  <p class="font15 commonColor textLeft fl mleft-05" style="color:rgb(74 102 158); white-space: nowrap;"> {{this.$t('CHAN_CREDATE')}} </p>
                </div>
                <p class="font14 textLeft fl mleft-1 commonBlack">{{this.$changeDateFormat(CAB_DETAIL.creDate)}}</p>
              </div>

              <div class="fl font15  w-100P mtop-05 " style="box-sizing:boborder-box; word-break:break-all; " >
                <div class="fl font15  w-100P">
                  <div style="width:100%" class="fl" >
                    <p class="font15 commonColor textLeft fl mleft-05" style="color:rgb(74 102 158);  white-space: nowrap;">{{ this.$t('CHAN_BOARD_FUNCTION') }} </p>
                  </div>
                  <p class="mleft-05 fl font12 commonBlack" >{{CAB_DETAIL.replyYn === 1? $t('COMMON_TITLE_COMMENT')+'O': $t('COMMON_TITLE_COMMENT')+'X'}}</p>
                  <p class="fl font12 commonBlack" >/{{CAB_DETAIL.fileYn === 1? $t('COMM_NAME_CONT_FILE')+'O':$t('COMM_NAME_CONT_FILE'+'X')}}</p>
                  <p class="fl font12 commonBlack" >/{{CAB_DETAIL.blindYn === 1? $t('COMMON_NAME_UNKNOWN'):$t('COMMON_NAME_KNOWN')}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="fl w-100P boardCard mtop-05" style="display: flex; flex-direction: row; justify-content: space-between;">
            <p class="cBlack fl font15" style="width: 100%; ">{{$t('COMMON_NAME_SHARE')}} {{CAB_DETAIL.mShareItemCnt}}</p>
            <p class="cBlack fl font15" style="width: 100%; border-left: 1px solid white">{{ $t('COMMON_TAB_POST') }} {{this.totalElements? this.totalElements:0}}</p>
          </div>

          <div v-if="GE_USER" class="fl w-100P boardCard mtop-05" style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="display:flex; align-items: center;">
              <div @click="goProfile" :style="'background-image: url(' +  (GE_USER.domainPath? GE_USER.domainPath + GE_USER.userProfileImg : GE_USER.userProfileImg)  + ')'" style="width:30px; height:30px; border-radius: 100%; border:1.5px solid rgb(74 102 158); overflow: hidden; background-size: cover; background-position: center; background-repeat: no-repeat;">
              <!--  <img :src="currentUserInfo.userProfileImg" style="width: 30px;" class="fl "/> -->
              </div>
              <div class="mleft-05" style="display:flex; flex-direction: column;">
                <p @click="goProfile" class="font16 commonBlack">{{GE_USER.userDispMtext? this.$changeText(GE_USER.userDispMtext): $t('COMM_TITLE_GUEST')}}</p>
                <!-- <div>
                  <p class="fl font14 commonBlack">{{CHANNEL_DETAIL.D_CHAN_AUTH.followTypeText}}</p>
                  <p class="fl commonBlack font14 " v-if="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn">(내정보공개)</p>
                </div> -->
              </div>
            </div>
            <div style="display:flex; align-items: center; justify-content: space-around; max-width:150px; width:55%;">

              <img v-if="CAB_DETAIL.workStatYn === 1 || CAB_DETAIL.workStatYn === true" class="fr img-w20 mleft-05" style="width: 25px; margin-top: 3px;" src="../../assets/images/board/workStatYnIcon.svg" alt="">

              <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.W === true" class="fr img-w20 mleft-05" src="../../assets/images/board/icon_square_pen.svg" alt="">
              <img v-else class="fr img-w20 mleft-05" src="../../assets/images/board/icon_square_pen_solid.svg" alt="">

              <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.V === true" class="fr img-w20 mleft-05" src="../../assets/images/board/icon_eyes.svg" alt="">
              <img v-else class="fr img-w20 mleft-05" src="../../assets/images/board/icon_eyes_solid.svg" alt="">

              <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.R === true" class="fr img-w20 mleft-05" src="../../assets/images/common/icon_comment.svg" alt="">
              <img v-else class="fr img-w20 mleft-05" src="../../assets/images/common/icon_comment_solid.svg" alt="">
              <!-- <img v-else class="fr img-w20" src="../../assets/images/common/icon_comment_solid.svg" alt=""> -->
            </div>
          </div>

        </div>
        <div id="boardInfoSummary2" class="summaryHeader2">
          <span class="font20 fontBold">{{ this.$changeText(CAB_DETAIL.cabinetNameMtext)}}</span>
          <span class="font13 mbottom-05 fl">{{ this.$changeText(CHANNEL_DETAIL.nameMtext) }}</span>
        </div>
      </div>

      <div class="boardItemBox" id="boardItemBox" style="">
        <div style="position: relative; float: left; width: 100%; overflow: hidden scroll; height: 100%;" id="boardListWrap" ref="boardListWrapCompo">
          <transition name="showModal">
            <findContentsList :pOnlyMineYn="mOnlyMineYn" :tpGroupCode="(CAB_DETAIL.workStatYn === 1 || CAB_DETAIL.workStatYn === true) ? 'C_STAT' : null" :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
          </transition>
          <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
            <gActiveBar :searchYn="true" @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"  style=" width:calc(100%);"/>
          </div>
          <div :style="calcBoardPaddingTop" style="padding-top: calc(60px + var(--paddingTopLength)) ; height: calc(100%); padding-bottom: 40px; min-height: 500px" class="commonBoardListWrap" ref="commonBoardListWrapCompo">

            <!-- 스크롤 시 첫번째 로우의 위치를 확인하기 위해 넣은 태그입니다. ( 스크롤 시 헤더 숨기게 ) -->
            <div class="w-100P fl commonBoardListContentBox" style="height:1px;" />
            <gContentsBox @contDelete="refreshAll" @openImgPop="openImgPop" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-for="(cont) in this.BOARD_CONT_LIST" :key="cont.contentsKey"/>
            <myObserver @triggerIntersected="loadMore" id="observer" class="fl w-100P" style=""></myObserver>
            <!-- <boardList :emptyYn="BOARD_CONT_LIST.length === 0? true: false" :shareAuth="CAB_DETAIL.shareAuth" :blindYn="(CAB_DETAIL.blindYn === 1)" ref="boardListCompo" @moreList="loadMore" @goDetail="goDetail" :commonListData="BOARD_CONT_LIST" @contentMenuClick="contentMenuClick" style=" margin-top: 5px; float: left;"
              @refresh='refresh' @openPop="openPop" @makeNewContents="makeNewContents" @moveOrCopyContent="moveOrCopyContent" @imgLongClick="imgLongClick"
              @writeMememo="writeMememo" @riteMemo="writeMemo" @deleteMemo='deleteConfirm' @yesLoadMore='yesLoadMore'
              @clearMemo='clearMemo'/> -->
            <gListEmpty v-if="emptyYn && BOARD_CONT_LIST.length === 0" :title="$t('BOARD_NO_CONTENTS')" :subTitle="$t('BOARD_NEW_CONTENT')" option='EDIT' />
            <!-- <commonList @delContents="delContents" id="commonPush" :chanAlimYn="chanAlimYn" v-if=" viewMainTab === 'P'" :commonListData="this.GE_DISP_ALIM_LIST" @makeNewContents="makeNewContents"
              @moveOrCopyContent="moveOrCopyContent" @goDetail="openPop" @imgLongClick="imgLongClick" @clickImg="openImgPreviewPop" :targetContentsKey="targetCKey"
              ref='pushListChangeTabLoadingComp' :imgUrl="this.imgUrl" @openLoading="this.loadingYn = true" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 0px;"
              :alimListYn="this.alimListYn" @moreList="loadMore" @topLoadMore="loadMore" @scrollMove="scrollMove" @targetContentScrollMove="targetContentScrollMove"
              @openPop="openUserProfile" @writeMememo="writeMememo" @writeMemo="writeMemo" @deleteMemo='deleteConfirm' @yesLoadMore='yesLoadMore' /> -->
          </div>
        </div>
      </div>
      <div :class="(this.scrolledYn || !this.reloadShowYn) ? 'reload--unpinned': 'reload--pinned'"
      v-on="handleScroll"
      style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: #879dc9d1; padding: 10px; bottom: 2rem; right: calc(50% - 25px);"
      @click="refreshAll" >
        <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;" />
      </div>
    <img id='writeBtn' src="../../assets/images/button/Icon_WriteBoardBtn.svg" v-if="CAB_DETAIL.shareAuth && this.CAB_DETAIL.shareAuth.W === true" @click="openWriteBoard" alt="게시글 작성 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78">
  </div>
  <gConfirmPop :confirmText='errorBoxText' :confirmType="confirmType ? 'two' : 'timeout'" @no="errorBoxYn = false, reportYn = false" @ok="confirmOk" v-if="errorBoxYn"/>
  <!-- <boardWrite @closeXPop="closeXPop" @successWrite="successWriteBoard" @successSave="this.$refs.boardMainPop.getContentsList()" :propData="this.params" v-if="this.targetType=== 'writeBoard'" :sendOk='sendOkYn' @openPop='openPop' /> -->
  <!-- <div v-if="boardWriteYn" style="width:100%; height:100%; top:0; left:0; position: absolute; z-index:999"> -->
    <!-- <boardWrite @closeXPop="closeWriteBoardPop()" @successWrite="successWriteBoard" @successSave="getContentsList" :propData="boardWriteData" :sendOk='sendOkYn' @openPop='openPop' style="z-index:999"/> -->
  <div v-if="boardWriteYn" style="position: absolute; top:0; left:0; z-index:10; background:#00000050; width: 100vw; height: 100vh;"></div>
  <writeContents v-if="boardWriteYn"  ref="chanAlimListWritePushRefs" @successWrite="successWriteBoard" @successSave="getContentsList" :contentType="currentPushListMainTab === 'P' ? 'ALIM' : 'BOAR'" @closeXPop='closeWriteBoardPop' :params="boardWriteData" style="position: absolute; width:100%; height:100%; min-height:100vh; top:0; left:0;"  @openPop='openItem' :changeMainTab='changeMainTab' @toAlimFromBoard='toAlimFromBoard' :propData="boardWriteData" />
  <!-- </div> -->
  <!-- <div style="width: 100vw; height: 100vh; dispaly: flex; flex-direction: column; align-items:center; position: absolute; bottom: 0; right: 0;background: #00000026; z-index: 999999;" v-if="mGuidePopShowYn">
  </div>
  <div style="dispaly: flex; flex-direction: column; align-items:center; position: absolute; bottom: 5rem; right: 20px;;background: #00000026; z-index: 999999; width: calc(100% - 40px); height: 250px; background: #FFFFFF; border-radius: 0.8rem;">
    <img src="../../assets/images/main/main_logo.png" alt="">
    <p class="commonColor font20 fontBold">아직 작성중인 글이 없어요<br>가장먼저 게시글을 작성해보세요!</p>
  </div> -->

  <div v-if="memoShowYn === true" class="boardMainMemoBoxBackground" @click="memoPopNo()"></div>
  <transition name="showMemoPop">
    <gMemoPop ref="gMemoRef" transition="showMemoPop"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' style="z-index:999999; height: fit-content;" :writeMemoTempData='tempMemoData'/>
  </transition>

  <imgPreviewPop :mFileKey="this.selectImgParam.mfileKey" :startIndex="selectImgParam.imgIndex" @closePop="this.backClick()" v-if="previewPopShowYn" style="width: 100%; height: calc(100%); position: fixed; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="selectImgParam.title" :creUserName="selectImgParam.creUserName" :creDate="selectImgParam.creDate"  />
  <imgLongClickPop @closePop="backClick" @clickBtn="longClickAlertClick" v-if="imgDetailAlertShowYn" />
  <gCertiPop :pPopText="$t('COMM_DO_KNOWN')" @goSavePhonePop="goSavePhonePop" v-if="gCertiPopShowYn" @no='gCertiPopShowYn = false'  />
  <gReport v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @editable="editable" @report="report" @bloc="bloc" />
  <smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
  <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="selectBoardPopShowYn" :boardDetail="boardDetailValue" :boardValue="detailVal" />
</div>
</template>
<script>
// import findContentsList from '../D_findContentsList.vue'
/* import boardList from '@/components/list/D_commonList.vue' */
import findContentsList from '@/components/popup/common/D_findContentsList.vue'
// import boardWrite from '@/components/board/Tal_boardWrite.vue'
import writeContents from '../../components/popup/D_writeContents.vue'

import imgLongClickPop from '../../components/popup/Tal_imgLongClickPop.vue'
import imgPreviewPop from '../../components/popup/file/Tal_imgPreviewPop.vue'
import { onMessage } from '../../assets/js/webviewInterface'

export default {
  components: {
    findContentsList,
    /* boardList, */
    // boardWrite,
    writeContents,
    imgLongClickPop,
    imgPreviewPop
  },
  props: {
    propData: {},
    initData: {},
    pOnlyMineYn: {}
  },
  updated () {
    if (this.CAB_DETAIL) {
      // this.boardListWrap.scrolTop = this.currentScroll
      // this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
      this.box = this.$refs.boardListWrap // 이 dom scroll 이벤트를 모니터링합니다
      if (this.box) {
        this.box.addEventListener('scroll', this.updateScroll)
        this.box.addEventListener('mousewheel', e => {
          this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
        })
      }

      this.listBox = this.$refs.commonBoardListWrapCompo
      if (this.listBox) {
        this.listBox.addEventListener('scroll', this.handleScroll)
      }
      // eslint-disable-next-line no-unused-vars
      if (this.findPopShowYn) {
        this.findPaddingTopBoard()
      }
    }
  },
  created () {
    console.log('???mCabContentsList', this.mCabContentsList)
    if (this.pOnlyMineYn) {
      this.mOnlyMineYn = true
      this.activeTabList = [{ display: this.$t('COMMON_TAB_RECENT'), name: 'N' }, { display: this.$t('COMMON_TAB_LIKED'), name: 'L' }, { display: this.$t('COMMON_TAB_SAVED'), name: 'S' }]
    }
    this.mPropData = this.propData
    console.log(this.board)
    this.$emit('openLoading')
    if (!this.mPropData.initData) {
      var this_ = this
      this.getCabinetDetail().then(() => {
        this_.getContentsList().then(response => {
          if (!response.content) return
          this_.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', '*')
          var newArr = [
            ...this_.BOARD_CONT_LIST,
            ...response.content
          ]
          this_.mCabContentsList = this.replaceArr(newArr)
        })
      })
    } else {
      var propBoardInitData = JSON.parse(JSON.stringify(this.mPropData.initData))
      this.cabinetDetail = propBoardInitData.cabinet
      if (propBoardInitData.cabinet && propBoardInitData.cabinet.mShareItemList) {
        this.cabinetDetail.shareAuth = this.$checkUserAuth(propBoardInitData.cabinet.mShareItemList)
      }

      console.log(this.cabinetDetail)

      if (propBoardInitData.contentsListPage) {
        this.mCabContentsList = propBoardInitData.contentsListPage.content
        this.totalElements = propBoardInitData.contentsListPage.totalElements

        console.log(this.mCabContentsList)
      } else {
        this.mCabContentsList = []
      }
      if (this.mCabContentsList.length === 0) {
        this.mGuidePopShowYn = true
      }
    }
  },
  mounted () {
    this.readyFunction()
  },
  beforeUnmount () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  data () {
    return {
      mGuidePopShowYn: false,
      paddingTop: 0,
      activeTabList: [{ display: this.$t('COMMON_TAB_RECENT'), name: 'N' }, { display: this.$t('COMMON_TAB_LIKED'), name: 'L' }, { display: this.$t('COMMON_TAB_SAVED'), name: 'S' }, { display: this.$t('COMM_TAB_MY_WRITE'), name: 'M' }],
      listBox: null,
      firstContOffsetY: null,
      scrolledYn: false,
      reloadShowYn: false,
      errorBoxYn: false,
      errorBoxText: '',
      box: null,
      totalElements: 0,
      scrollDirection: null,
      scrollPosition: null,
      mCabContentsList: [],
      offsetInt: 0,
      endListYn: false,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      actorList: [],
      /* subHistoryList: [], */
      viewTab: 'N',
      findKeyList: {},
      resultSearchKeyList: [],
      scrollCheckSec: 0,
      readCheckBoxYn: false,
      boardWriteYn: false,
      boardWriteData: {},
      writePopId: null,
      currentTabName: this.$t('COMMON_TAB_RECENT'),
      emptyYn: true,
      contentType: '',
      reportYn: false,
      contentOwner: false,
      tempData: {},
      confirmType: false,
      currentConfirmType: '',
      smallPopYn: false,
      confirmMsg: '',
      selectBoardType: null,
      boardDetailValue: null,
      selectBoardPopShowYn: false,
      cabinetDetail: null,
      alertPopId: null,
      selectImgObject: {},
      selectImgParam: {},
      imgDetailAlertShowYn: false,
      mememoValue: {},
      currentContentsKey: '',
      memoShowYn: false,
      writeMemoTempTeamKey: '',
      mobileYn: this.$getMobileYn(),
      axiosQueue: [],
      saveMemoLoadingYn: false,
      tempMemoData: {},
      gCertiPopShowYn: false,
      mPropData: null,
      mOnlyMineYn: false
    }
  },

  methods: {
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.$emit('openPop', param)
      // this.openPop(param)
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    async readyFunction () {
      var this_ = this
      this.$nextTick(() => {
        var blockBox = document.getElementById('summaryHeader')
        // this_.boardListWrap.addEventListener('scroll', this_.saveScroll)
        // this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
        this_.listBox = this_.$refs.commonBoardListWrapCompo
        if (this_.listBox) this_.listBox.addEventListener('scroll', this_.handleScroll)

        this_.box = this_.$refs.boardListWrap // 이 dom scroll 이벤트를 모니터링합니다
        if (this_.box) {
          if (this_.mOnlyMineYn) {
            blockBox.style.height = '50px'
            this_.box.scrollTop = 250
          }
          this_.box.addEventListener('scroll', this_.updateScroll)
          this_.box.addEventListener('mousewheel', e => {
            this_.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
          })
        }
      })
      this.$emit('closeLoading')
    },
    memoPopNo () {
      this.memoShowYn = false
      this.tempMemoData = this.$refs.gMemoRef.getMemoData()
      // document.body.focus()
    },
    clearMemo () {
      this.tempMemoData = undefined
    },
    async getContentsMemoList (key, pageSize, offsetInt) {
      if (this.axiosQueue.findIndex((item) => item === 'getContentsMemoList') !== -1) return
      this.axiosQueue.push('getContentsMemoList')
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = key
      memo.ownUserKey = this.GE_USER.userKey
      // eslint-disable-next-line no-unused-vars
      var idx, cont

      idx = this.BOARD_CONT_LIST.findIndex(i => i.contentsKey === key)
      if (idx !== -1) cont = this.BOARD_CONT_LIST[idx]

      if (pageSize) memo.pageSize = pageSize
      else memo.pageSize = this.pagesize
      if (offsetInt !== undefined && offsetInt !== null && offsetInt !== '') memo.offsetInt = offsetInt
      else memo.offsetInt = this.offsetInt

      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemoList',
        param: memo
      })
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'getContentsMemoList')
      this.axiosQueue.splice(queueIndex, 1)

      return result.data.memoList
    },
    async saveMemo (inSaveMemoObj) {
      if (!inSaveMemoObj.saveMemoHtml) return
      if (this.axiosQueue.findIndex((item) => item === 'saveMemo') !== -1) return
      this.axiosQueue.push('saveMemo')
      this.saveMemoLoadingYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }
      memo.bodyFullStr = inSaveMemoObj.saveMemoHtml
      if (inSaveMemoObj.attachFileList) {
        memo.attachFileList = inSaveMemoObj.attachFileList
      }
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.currentContentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'saveMemo')
        this.axiosQueue.splice(queueIndex, 1)
        if (result.data.result === true || result.data.result === 'true') {
          /* this.confirmText = '댓글 저장 성공'
          this.confirmPopShowYn = true */
          this.memoShowYn = false
          // await this.getContentsList()
          // await this.getBoardMemoList(true)

          // this.currentMemoList = []
          // var cont = this.currentMemoObj
          var idx, memoLength, cont
          // if (this.viewMainTab === 'P') {
          idx = this.BOARD_CONT_LIST.findIndex(i => i.contentsKey === this.currentContentsKey)
          if (idx !== -1) {
            memoLength = this.BOARD_CONT_LIST[idx].memoList.length
            cont = this.BOARD_CONT_LIST[idx]
          }

          if (memoLength !== undefined && memoLength !== null && memoLength !== '') {
            var response = await this.getContentsMemoList(this.currentContentsKey, memoLength + 1, 0)
            if (!cont.D_MEMO_LIST) cont.D_MEMO_LIST = []
            var newArr = [
              ...response,
              ...cont.D_MEMO_LIST
            ]
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            // cont.memoCount = newList.length
            cont.memoCount += 1
            // this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      } catch (e) {
        console.error('D_boardMain error')
        console.error(e)
      } finally {
        this.saveMemoLoadingYn = false
      }
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.backClick()
        this.previewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', this.selectImgObject.path)
        } else {
          await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
        }
        this.$showToastPop(this.$t('COMM_MSG_AFTER_SAVE'))
        this.backClick()
        // this.failPopYn = true
      } catch (error) {
        console.log(error)
      }
    },
    async yesLoadMore (contentKey) {
      var cont, idx
      idx = this.BOARD_CONT_LIST.findIndex(i => i.contentsKey === contentKey)
      if (idx !== -1) cont = this.BOARD_CONT_LIST[idx]
      var response = await this.getContentsMemoList(contentKey, cont.D_MEMO_LIST.length + 5, 0)
      var newArr = [
        ...cont.D_MEMO_LIST,
        ...response
      ]
      var newList = await this.replaceMemoArr(newArr)
      cont.D_MEMO_LIST = newList
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        this.tempData = data
      }

      if (data === 'memo' || this.tempData.memoKey) {
        this.errorBoxText = this.$t('COMMON_MSG_DELETE_COMMENT')
        if (this.tempData.parentMemoKey) {
          this.errorBoxText = this.$t('COMMON_MSG_DELETE_REPLY')
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.tempData.jobkindId === 'ALIM') {
        this.errorBoxText = this.$t('COMMON_MSG_DELETE_NOTI')
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.tempData.jobkindId === 'BOAR') {
        this.errorBoxText = this.$t('COMMON_MSG_DELETE_POST')
        this.currentConfirmType = 'boardDEL'
      }
      this.confirmType = 'two'
      this.errorBoxYn = true
    },
    writeMemo (param) {
      this.mememoValue = null
      this.memoShowYn = true
      var idx
      idx = this.BOARD_CONT_LIST.findIndex(i => i.contentsKey === param.contentsKey)
      if (idx !== -1) {
        this.currentContentsKey = this.BOARD_CONT_LIST[idx].contentsKey
      } else {
        this.memoShowYn = false
        this.$showToastPop('error during write setting')
        return
      }
      this.writeMemoTempTeamKey = param.teamKey
    },
    writeMememo (memo) {
      this.mememoValue = {}
      this.currentContentsKey = memo.memo.targetKey
      this.mememoValue = memo
      this.memoShowYn = true
    },
    /* 이미지 다운로드 */
    imgLongClick (param) {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      this.alertPopId = this.$setParentsId(this.pPopId, this.alertPopId)
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.selectImgObject = param.selectObj
      this.selectImgParam = param.previewParam
      this.imgDetailAlertShowYn = true
    },
    makeNewContents (data) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = data.contentsKey
      param.targetType = data.writeType === 'BOAR' ? 'writeBoard' : data.writeType === 'ALIM' ? 'writePush' : undefined
      param.writeType = data.writeType
      param.creTeamKey = data.creTeamKey
      param.currentTeamKey = data.creTeamKey
      if (data.attachMfilekey) { param.attachMfilekey = data.attachMfilekey }
      // eslint-disable-next-line no-undef
      param.bodyFullStr = Base64.decode(data.bodyFullStr)
      param.UseAnOtherYn = true
      param.selectBoardYn = true
      param.modiContentsKey = data.contentsKey
      param.titleStr = data.title
      this.$emit('openPop', param)
    },
    delContents (cont) {
      var idx = null
      console.log(cont)
      if (cont.jobkindId === 'BOAR') {
        idx = this.mCabContentsList.findIndex((item) => item.mccKey === cont.mccKey)
        if (idx !== -1) {
          this.mCabContentsList.splice(idx, 1)
        }
      }
    },
    replaceArr (arr) {
      if (!arr || arr.length === 0) return
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.popHeaderText = this.$t('COMMON_NAME_MY_INFO')
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    editable (type) {
      if (type === 'edit') {
        this.reportYn = false
        this.openUpdateContentsPop()
      } else if (type === 'delete') {
        this.reportYn = false
        this.boardFuncClick()
      } else if (type === 'move' || type === 'copy') {
        this.reportYn = false
        this.moveOrCopyContent(type)
      }
    },
    bloc (type) {
      var typeText = type
      if (typeText === 'USER') {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK')
      } else {
        this.mConfirmText = this.$t('COMMON_MSG_BLOCK_BOAR')
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveActLog',
        param: param
      })
      // console.log(result.data.result)
      if (result.data.result === true) {
        this.confirmMsg = this.errorBoxText
        this.smallPopYn = true
        // this.confirmPopShowYn = true
      }
    },
    moveOrCopyContent (type) {
      this.selectBoardType = type
      this.boardDetailValue = this.tempData
      // console.log(this.tempData)
      this.selectBoardPopShowYn = true
    },
    closeSelectBoardPop () {
      this.refresh()
      this.selectBoardPopShowYn = false
    },
    boardFuncClick () {
      this.confirmType = true
      this.errorBoxText = this.$t('COMMON_MSG_DELETE_POST')
      this.errorBoxYn = true
      this.currentConfirmType = 'deleteBoar'
    },
    async confirmOk () {
      this.errorBoxYn = false
      this.confirmType = false
      if (this.currentConfirmType === 'deleteBoar') {
        var inParam = {}
        // // console.log(this.alimDetail)
        inParam.contentsKey = this.tempData.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.tempData.creTeamKey

        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteContents',
          param: inParam
        })
        this.refreshAll()
        // this.$emit('closeXPop', true)
      } else if (this.currentConfirmType === 'BLOC') {
        this.currentConfirmType = ''
        // console.log(this.tempData)
        var param = {}
        param.claimType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.errorBoxText = this.$t('COMMON_MSG_UNKWON')
        }
        param.creUserKey = this.GE_USER.userKey
        this.errorBoxText = this.$t('COMMON_MSG_BLOCKED')
        this.saveActAxiosFunc(param)
      } else if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey, contentsKey: this.tempData.targetKey, parentMemoKey: this.tempData.parentMemoKey })
      }
    },
    async deleteMemo (param) {
      if (this.axiosQueue.findIndex((item) => item === 'deleteMemo') !== -1) return
      var memo = {}
      memo.memoKey = param.memoKey
      this.axiosQueue.push('deleteMemo')
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.deleteMemo',
        param: memo
      })
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'deleteMemo')
      this.axiosQueue.splice(queueIndex, 1)
      var index
      if (result.data.result === true) {
        var idx, cont

        idx = this.BOARD_CONT_LIST.findIndex(i => i.contentsKey === this.tempData.targetKey)
        if (idx !== -1) cont = this.BOARD_CONT_LIST[idx]

        index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === param.memoKey)
        var cmemoListIdx
        if (param.parentMemoKey) {
          for (let i = 0; i < cont.D_MEMO_LIST.length; i++) {
            if (cont.D_MEMO_LIST[i].cmemoList.length > 0) {
              index = cont.D_MEMO_LIST[i].cmemoList.findIndex(i => i.memoKey === param.memoKey)
              if (index !== -1) {
                cmemoListIdx = i
                break
              }
            }
          }
          cont.D_MEMO_LIST[cmemoListIdx].cmemoList.splice(index, 1)
        } else {
          cont.D_MEMO_LIST.splice(index, 1)
        }
        cont.memoCount -= 1
        // cont.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)

        // this.currentMemoList = cont.D_MEMO_LIST
        // this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
        // this.currentMemoObj = cont
        // this.memoSetCount(response.totalElements)
      }
      this.$showToastPop(this.$t('COMMON_MSG_DELETED_COMMENT'))
    },
    report (type) {
      var targetKind
      var targetKey
      if (type === 'alim') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.errorBoxText = this.$t('COMMON_MSG_REPORT_NOTI')
      } else if (type === 'board') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.errorBoxText = this.$t('COMMON_MSG_REPORT_POST')
      } else if (type === 'memo') {
        targetKind = 'C'
        targetKey = this.tempData.memoKey
        this.errorBoxText = this.$t('COMMON_MSG_REPORT_COMMENT')
      } else if (type === 'channel') {
        targetKind = 'T'
        targetKey = this.tempData.creTeamKey
        this.errorBoxText = this.$t('COMMON_MSG_REPORT_CHAN')
      } else if (type === 'user') {
        targetKind = 'U'
        targetKey = this.tempData.creUserKey
        this.errorBoxText = this.$t('COMMON_MSG_REPORT_USER')
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param)
    },
    contentMenuClick (params) {
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      this.tempData = params.tempData
      this.reportYn = true
    },
    openUpdateContentsPop () {
      var param = {}
      param.targetKey = this.tempData.contentsKey
      param.targetType = 'writeContents'
      param.creTeamKey = this.tempData.creTeamKey
      if (this.tempData.attachMfilekey) param.attachMfilekey = this.tempData.attachMfilekey
      param.bodyFullStr = this.tempData.bodyFullStr
      param.modiContentsKey = this.tempData.contentsKey
      param.titleStr = this.tempData.title
      param.parentAttachTrueFileList = this.attachTrueFileList
      this.$emit('openPop', param)
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }

        if (message.actType === 'WR' && JSON.parse(message).targetKey === this.mPropData.targetKey) {
          this.refresh()
        }
      } catch (err) {
        console.error(this.$t('COMM_MSG_FAIL_PARSE') + err)
      }
    },
    successWriteBoard (data) {
      // this.$emit('successWrite', data)
      // successWriteBoard
      this.findKeyList.searchKey = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.changeTab('N')
      this.offsetInt = 0

      this.closeWriteBoardPop()
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.writePopId === hStack[hStack.length - 1]) {
        this.closeWriteBoardPop()
      } else if (this.alertPopId === hStack[hStack.length - 1]) {
        var removePage = history[history.length - 1]
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.imgDetailAlertShowYn = false
      } else {
        this.previewPopShowYn = false
      }
    },
    closeWriteBoardPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.boardWriteYn = false
    },
    successSave () {
      this.$emit('successSave')
    },
    findPaddingTopBoard () {
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.paddingTop = element.clientHeight - 10
      } else {
        this.paddingTop = 0
      }
    },
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.findKeyList.searchKey = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.changeTab('N')
      this.offsetInt = 0
      var ScrollWrap = this.$refs.commonBoardListWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.$refs.activeBar.switchtab(0)
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('commonBoardListContentBox')[0]
      var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      if (this.firstContOffsetY > 0) {
        this.scrollDirection = 'up'
        this.scrolledYn = false
        if (this.firstContOffsetY > 59) {
          this.box.style.overflow = 'scroll'
        }
      }
      if (time / 1000 > 1 && this.$diffInt(this.listBox.scrollTop, this.scrollPosition) > 150) {
        this.scrollCheckSec = currentTime
        if (this.firstContOffsetY < 0) {
          if (this.listBox.scrollTop > this.scrollPosition) {
            this.scrollDirection = 'down'
            this.scrolledYn = true
          } else if (this.listBox.scrollTop <= this.scrollPosition) {
            this.scrollDirection = 'up'
            this.scrolledYn = false
          }
        }
      }
      // var test = document.getElementById('boardPageHeader')
      // parentElement = element.parentElement
      // this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
      // var test = this.firstContOffsetY

      this.scrollPosition = this.listBox.scrollTop
    },
    // handleScroll () {
    //   var element = document.getElementsByClassName('boardRow')[0]
    //   var parentElement = element.parentElement
    //   this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)

    //   var test = document.getElementById('commonBoardListHeader')
    //   parentElement = element.parentElement
    //   this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
    //   if (this.firstContOffsetY < 0) {
    //     if (this.newBox.scrollTop > this.newScrollPosition) {
    //       this.scrolledYn = true
    //     } else if (this.box.scrollTop <= this.newScrollPosition) {
    //       this.scrolledYn = false
    //     }
    //   }
    //   this.newScrollPosition = this.newBox.scrollTop
    // },
    async refresh () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getContentsList(pSize, 0)
      this.mCabContentsList = resultList.content
      this.endList = false
      // 임시 삭제
      /* var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getContentsList(pSize, 0)
      this.mCabContentsList = resultList.content
      this.endList = false
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryHeader')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }

      this.scrollPosition = this.box.scrollTop

      if (this.scrollDirection === 'down' && this.scrollPosition > 200) {
        blockBox.style.height = '50px'
        // blockBox.scrollHeight = 100
        document.getElementById('boardInfoSummary').classList.add('displayNIm')
        // document.getElementById('boardInfoSummary2').classList.add('displayBIm')
        document.getElementById('boardItemBox').classList.add('boardItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 250) {
        blockBox.style.height = '300px'
        this.box.style.height = ''
        document.getElementById('boardInfoSummary').classList.remove('displayNIm')
        // document.getElementById('boardInfoSummary2').classList.remove('displayBIm')
        document.getElementById('boardItemBox').classList.remove('boardItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    openWriteBoard () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeContents'
      params.actorList = this.actorList
      params.targetNameMtext = this.propData.nameMtext
      params.teamKey = this.propData.currentTeamKey
      params.currentTeamKey = this.propData.currentTeamKey
      params.bodyFullStr = ''
      params.cabinetNameMtext = this.$changeText(this.CAB_DETAIL.cabinetNameMtext)
      params.cabinetKey = this.CAB_DETAIL.cabinetKey
      params.value = this.CAB_DETAIL
      params.contentsJobkindId = 'BOAR'
      if (this.CAB_DETAIL.guideFullStr) {
        params.guideFullStr = this.CAB_DETAIL.guideFullStr
      }
      this.boardWriteData = {}
      this.boardWriteData = params
      var history = this.$store.getters['D_HISTORY/hStack']
      this.writePopId = 'writeContents' + history.length
      this.writePopId = this.$setParentsId(this.pPopId, this.writePopId)
      history.push(this.writePopId)
      this.$store.commit('D_HISTORY/updateStack', history)

      this.boardWriteYn = true

      // this.$emit('openPop', params)
    },
    updateStoreData (Detail) {
      // console.log(this.CAB_DETAIL)
      var tempChan = this.CHANNEL_DETAIL
      var cabinetList = tempChan.ELEMENTS.cabinetList
      var index = cabinetList.findIndex((item) => item.cabinetKey === this.CAB_DETAIL.cabinetKey)
      cabinetList[index] = Detail
      tempChan.ELEMENTS.cabinetList = cabinetList
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', tempChan)
      /* this.$actionVuex('TEAM', tempChan, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    openWriteBoard () {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(this.$t('COMMON_MSG_NO_LOGIN'))
        return
      }
      // console.log(this.propData)
      if ((!this.GE_USER.certiDate) && (this.CAB_DETAIL.blindYn === 1 || this.CAB_DETAIL.blindYn === true)) {
        // 익명게시판일 떄
        this.gCertiPopShowYn = true
        return
      }
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeContents'
      params.actorList = this.actorList
      params.targetNameMtext = this.mPropData.nameMtext
      params.teamKey = this.mPropData.currentTeamKey
      if (!params.teamKey) params.teamKey = this.mPropData.teamKey
      params.currentTeamKey = this.mPropData.currentTeamKey
      if (!params.currentTeamKey) params.currentTeamKey = this.mPropData.teamKey

      params.bodyFullStr = ''
      params.cabinetNameMtext = this.$changeText(this.CAB_DETAIL.cabinetNameMtext)
      params.cabinetKey = this.CAB_DETAIL.cabinetKey
      params.value = this.CAB_DETAIL
      params.contentsJobkindId = 'BOAR'
      if (this.CAB_DETAIL.guideFullStr) {
        params.guideFullStr = this.CAB_DETAIL.guideFullStr
      }
      this.boardWriteData = {}
      this.boardWriteData = params
      var history = this.$store.getters['D_HISTORY/hStack']
      this.writePopId = 'writeContents' + history.length
      this.writePopId = this.$setParentsId(this.pPopId, this.writePopId)
      history.push(this.writePopId)
      this.$store.commit('D_HISTORY/updateStack', history)

      this.boardWriteYn = true

      // this.$emit('openPop', params)
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryHeader')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }

      this.scrollPosition = this.box.scrollTop

      if (this.scrollDirection === 'down' && this.scrollPosition > 200) {
        blockBox.style.height = '50px'
        // blockBox.scrollHeight = 100
        if (this.scrollPosition > 249) {
          this.box.style.overflow = 'hidden'
        }

        document.getElementById('boardInfoSummary').classList.add('displayNIm')
        // document.getElementById('boardInfoSummary2').classList.add('displayBIm')
        document.getElementById('boardItemBox').classList.add('boardItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 250) {
        blockBox.style.height = '300px'
        this.box.style.height = ''
        document.getElementById('boardInfoSummary').classList.remove('displayNIm')
        // document.getElementById('boardInfoSummary2').classList.remove('displayBIm')
        document.getElementById('boardItemBox').classList.remove('boardItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    async getCabinetDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var tt = this.propData
      param.currentTeamKey = this.mPropData.currentTeamKey
      param.cabinetKey = this.mPropData.targetKey
      var resultList = await this.$getCabinetDetail(param)
      // mShareItemList가 잘 들어오면 save잘 된것
      //   this.shareAuth.R = true
      //   this.shareAuth.W = true
      //   this.shareAuth.V = true
      // } else {
      resultList.mCabinet.shareAuth = this.$checkUserAuth(resultList.mCabinet.mShareItemList)
      if (resultList && resultList.mCabinet) {
        this.cabinetDetail = resultList.mCabinet
      }
      // this.updateStoreData(resultList.mCabinet)
      // eslint-disable-next-line no-new-object

      // }
      /* if (this.shareAuth.V === false) {
        this.$emit('closeXPop')
      } */
      // this.actorList = this.CAB_DETAIL.mShareItemList
      this.findPopShowYn = false
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    async getContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      } */
      this.$emit('closeLoading')
      param.cabinetKey = this.mPropData.targetKey
      if (this.offsetInt === 0 && this.mCabContentsList && this.mCabContentsList.length > 0) this.offsetInt += 1
      param.offsetInt = this.offsetInt
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      // } else {
        // param.offsetInt = this.offsetInt
      }
      console.log(param.offsetInt)
      if (pageSize) {
        param.pageSize = pageSize
      } else {
        pageSize = 10
      }

      if (this.findKeyList) {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          param.title = this.findKeyList.searchKey
        } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.findKeyList.toCreDateStr
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.findKeyList.fromCreDateStr
        } if (this.findKeyList.workStatCodeKey !== undefined && this.findKeyList.workStatCodeKey !== null && this.findKeyList.workStatCodeKey !== '') {
          param.workStatCodeKey = this.findKeyList.workStatCodeKey
        } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
          param.creUserName = this.findKeyList.creUserName
        } if (this.findKeyList.selectedSticker) {
          param.findActStickerYn = true
          param.findActYn = true
          param.stickerKey = this.findKeyList.selectedSticker.stickerKey
        }
      }
      param.jobkindId = 'BOAR'

      if (this.readCheckBoxYn) {
        param.findLogReadYn = false
      }
      if (this.mOnlyMineYn) {
        param.creUserKey = this.GE_USER.userKey
        param.ownUserKey = this.GE_USER.userKey
      }
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.ownUserKey = this.GE_USER.userKey
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.ownUserKey = this.GE_USER.userKey
        param.findActStarYn = true
      // } else if (this.viewTab === 'R') {
      //   param.findLogReadYn = false
      // }
      } else if (this.viewTab === 'M') {
        param.creUserKey = this.GE_USER.userKey
        param.ownUserKey = this.GE_USER.userKey
      }

      var resultList = await this.$getContentsList(param)
      if (this.viewTab === 'N') {
        this.totalElements = resultList.totalElements
      }
      for (var i = 0; i < resultList.length; i++) {
        // resultList.
      }

      return resultList
    },
    closeSearchPop () {
      this.findPopShowYn = false
      /* this.subHistoryList.splice(-1, 1) */
    },
    goDetail (value) {
      if (this.CAB_DETAIL.shareAuth.V === false && value.creUserKey !== this.GE_USER.userKey) {
        this.errorBoxText = this.$t('COMM_MSG_NOPERM')
        this.errorBoxYn = true
      } else {
        // value.functions = [{replyYn:this.propData.value.replyYn},{fileYn:this.propData.value.fileYn},{blindYn:this.propData.value.blindYn}]
        value.replyYn = this.CAB_DETAIL.replyYn
        value.fileYn = this.CAB_DETAIL.fileYn
        value.blindYn = this.CAB_DETAIL.blindYn
        value.shareAuth = this.CAB_DETAIL.shareAuth
        value.teamKey = this.CHANNEL_DETAIL.teamKey
        value.value = this.CAB_DETAIL
        this.openPop(value)
      }
    },
    openPop (value) {
      console.log(value)
      if (value && value.targetType === 'chanDetail') return
      value.onlyMineYn = true
      this.$emit('openPop', value)
    },
    async changeTab (tabName) {
      if (this.viewTab !== tabName) {
        this.readCheckBoxYn = false
      }
      // this.$emit('openLoading')
      // activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }, { display: '내가 쓴', name: 'M' }],
      this.viewTab = tabName
      switch (this.viewTab) {
        case 'N' :
          this.currentTabName = this.$t('COMMON_TAB_RECENT')
          break
        case 'L' :
          this.currentTabName = this.$t('COMMON_TAB_LIKED')
          break
        case 'S' :
          this.currentTabName = this.$t('COMMON_TAB_SAVED')
          break
        case 'M' :
          this.currentTabName = this.$t('COMM_TAB_MY_MADE')
          break
      }
      this.offsetInt = 0
      // this.mCabContentsList = []
      this.emptyYn = false
      var resultList = await this.getContentsList(null, 0)
      // if (resultList)
      if (!resultList || (resultList.content && resultList.content.length === 0)) {
        this.mCabContentsList = []
      } else {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        this.mCabContentsList = this.replaceArr(resultList.content)
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.offsetInt += 1
          this.endListYn = false
        }
      }

      if (this.mCabContentsList.length === 0) this.emptyYn = true
      this.scrollMove()
    },
    scrollMove () {
      this.$nextTick(() => {
        var ScrollWrap = this.$refs.commonBoardListWrapCompo
        ScrollWrap.scrollTo({ top: 0, behavior: 'smooth' })
      })
    },
    async requestSearchList (param) {
      this.offsetInt = 0
      console.log(param)
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
          this.findKeyList.creUserName = param.creUserName
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        } if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
          this.findKeyList.workStatCodeKey = param.workStatCodeKey
          this.findKeyList.codeNameMtext = param.codeNameMtext
        } if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
          this.findKeyList.selectedSticker = param.selectedSticker
        }
      }

      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      var resultList = await this.getContentsList(null, 0)
      this.mCabContentsList = resultList.content
      if (!resultList || resultList === '') {
        this.endListYn = false
      } else {
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.endListYn = false
        }
      }
      this.scrollMove()
      this.findPopShowYn = false
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_TITLE')
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_CREATOR')
        searchObj.type = 'creUserName'
        searchObj.keyword = param.creUserName
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = this.$t('COMM_TAB_MY_SEND')
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_DATE')
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_FILTER')
        searchObj.type = 'workStatCodeKey'
        searchObj.keyword = param.codeNameMtext
        resultArray.push(searchObj)
      }
      if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_CATEGORY')
        searchObj.type = 'stickerKey'
        searchObj.keyword = this.$changeText(param.selectedSticker.nameMtext)
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (type) {
      this.offsetInt = 0
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      } else if (type === 'workStatCodeKey') {
        delete this.findKeyList.workStatCodeKey
      } else if (type === 'creUserName') {
        delete this.findKeyList.creUserName
      } else if (type === 'stickerKey') {
        delete this.findKeyList.selectedSticker
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      if (this.resultSearchKeyList.length === 0) {
        this.paddingTop = 0
      }
      // await this.getCabinetDetail()
      var resultList = await this.getContentsList(null, 0)
      this.mCabContentsList = resultList.content
      this.findPaddingTopBoard()
      if (!resultList || resultList === '') {
        this.endListYn = false
      } else {
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.endListYn = false
        }
      }
      this.scrollMove()
      // await this.getCabinetDetail()

      this.findPopShowYn = false
    },
    // replaceArr (arr) {
    //   var uniqueArr = arr.reduce(function (data, current) {
    //     if (data.findIndex(({ contentsKey }) => contentsKey === current.contentsKey) === -1) {
    //       data.push(current)
    //     }
    //     return data
    //   }, [])
    //   return uniqueArr
    // },
    updateStoreBoardList (uniqueArr) {
      var tempChan = this.CHANNEL_DETAIL
      var cabinetList = tempChan.ELEMENTS.cabinetList
      var index = cabinetList.findIndex((item) => item.cabinetKey === this.CAB_DETAIL.cabinetKey)
      cabinetList[index].boardList = uniqueArr
      tempChan.ELEMENTS.cabinetList = cabinetList
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', tempChan)
      /* this.$actionVuex('TEAM', tempChan, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    async loadMore (pageSize) {
      if (this.endListYn === false) {
        if (this.mCabContentsList && (!this.CAB_DETAIL.totalContentsCount > this.mCabContentsList.length)) return

        var resultList = await this.getContentsList()
        if (!resultList) {
          resultList = {}
          resultList.content = []
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)

        // const newArr = [
        //   ...this.CAB_DETAIL.boardList,
        //   ...resultList.content
        // ]

        // 더 불러온 컨텐츠에 D_MEMO_LIST가 없어 넣어주고 있음
        const newArr = [
          ...this.BOARD_CONT_LIST,
          ...resultList.content
        ]

        var uniqueArr = this.replaceArr(newArr)
        var tempCabData = this.CAB_DETAIL
        // tempCabData.boardList
        this.mCabContentsList = uniqueArr
        if (this.viewTab === 'N') {
          tempCabData.totalContentsCount = resultList.totalElements
        }
        console.log(resultList)
        if (!resultList || resultList === '') {
          this.endListYn = false
        } else {
          if (resultList.pageable) {
            if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
              this.endListYn = true
            } else {
              this.offsetInt += 1
              this.endListYn = false
            }
          }
        }
      } else {
      }
      this.findPopShowYn = false
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      console.log(this.mPropData)
      console.log('this.mPropData')
      if (!this.mPropData) return null
      var team = this.$getDetail('TEAM', this.mPropData.teamKey)
      console.log(team)
      if (team && team.length > 0) {
        return team[0]
      } else {
        if (this.mPropData.teamKey && (this.mPropData.initData && this.mPropData.initData.cabinet && this.mPropData.initData.cabinet.nameMtext)) {
          return {
            teamKey: this.mPropData.teamKey, nameMtext: this.mPropData.initData.cabinet.nameMtext
          }
        } else {
          return null
        }
      }
    },
    CAB_DETAIL () {
      if (this.cabinetDetail) {
        return this.cabinetDetail
      }
      return null
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    calcBoardPaddingTop () {
      return {
        '--paddingTopLength': (this.paddingTop) + 'px'
      }
    },
    BOARD_CONT_LIST () {
      var contentList = []
      var vPoolChanIdx, vPoolContentIdx
      var vPoolChanInfo = null
      var vPoolContList = []
      if (!this.mCabContentsList) {
        // this.emptyYn = true
        return []
      }
      for (let i = 0; i < this.mCabContentsList.length; i++) {
        vPoolChanIdx = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mCabContentsList[i].creTeamKey)
        vPoolChanInfo = this.GE_MAIN_CHAN_LIST[vPoolChanIdx]
        if (vPoolChanInfo && vPoolChanInfo.ELEMENTS) {
          vPoolContList = vPoolChanInfo.ELEMENTS.boardList
          vPoolContentIdx = vPoolContList.findIndex((item) => item.mccKey === this.mCabContentsList[i].mccKey)
        } else {
          vPoolContentIdx = -1
        }
        if (vPoolContentIdx !== -1) {
          contentList.push(vPoolContList[vPoolContentIdx])
        } else {
          contentList.push(this.mCabContentsList[i])
        }
      }

      return contentList
    },
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_DEL_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_DEL_CONT_LIST']
    }
  },
  watch: {
    CHANNEL_DETAIL (value, old) {
    },
    GE_DEL_CONT_LIST: {
      handler (value, old) {
        if (value) {
          this.delContents(value[0])
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
    },
    readCheckBoxYn () {
      this.changeTab(this.viewTab)
    },
    GE_USER: {
      immediate: true,
      handler (val, old) {
        if (!val) return
        if (val.unknownYn) {
          this.activeTabList = [{ display: this.$t('COMMON_TAB_RECENT'), name: 'N' }]
        } else {
          this.activeTabList = [{ display: this.$t('COMMON_TAB_RECENT'), name: 'N' }, { display: this.$t('COMMON_TAB_LIKED'), name: 'L' }, { display: this.$t('COMMON_TAB_SAVED'), name: 'S' }, { display: this.$t('COMM_TAB_MY_MADE'), name: 'M' }]
        }
      }
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        // var memoContents = value[0]
        var content = null
        var index = this.mCabContentsList.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
        if (index !== -1) {
          content = this.mCabContentsList[index]
          var count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
          this.mCabContentsList[index].memoCount = count
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mCabContentsList[index])
        }
        if (!content) return
        var memoAleadyIdx1 = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
        if (memoAleadyIdx1 !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx1].D_MEMO_LIST = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [
            value[0],
            ...content.D_MEMO_LIST
          ]
        }
        var idx1 = this.mCabContentsList.findIndex((item) => item.contentsKey === content.contentsKey)
        this.mCabContentsList[idx1].D_MEMO_LIST = this.replaceMemoArr(newArr)
      },
      deep: true
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (value[0].cabinetKey === this.CAB_DETAIL.cabinetKey) {
          newArr = [
            value[0],
            ...this.mCabContentsList
          ]
          this.mCabContentsList = this.replaceArr(newArr)
        }
      },
      deep: true
    }
  }

}
</script>

<style scoped>
.boardMainAdminArea{
  width: 100%; height: 30px; display: flex; align-items: center; justify-content: center; border-left: 1px solid white; background: rgba(255, 255, 255, 0.5); border-radius: 10px; margin-right: calc(5% - 10px)
}
.commonBoardListWrap{width: 100%; position: relative; float: left; width: 100%; overflow: hidden scroll;}
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(10rem);
    transition: .5s;
}
.summaryHeader{height: 300px; width: 100%; float: left; position: absolute;}
.summaryHeader2 {height: 50px;  width: 100%; float: left;}
.boardListHeader {
  width: 100%;
  /* min-height: 132px; */
  min-height: 50px;
  position: absolute;
  background-color: #FFF;
  top: 0;
  /* left: 0; */
  z-index: 9;
  will-change: transform;
  transition: transform 0.3s linear;
}
.boardListHeader--pinned {
    transform: translateY(0%);
}
.boardListHeader--unpinned {
    transform: translateY(-100%);
}

.boardReadCheckAlimArea{
  will-change: transform;
  transition: transform 0.3s linear;
}
.boardReadCheckAlimArea--pinned {
    transform: translateY(0%);
}
.boardReadCheckAlimArea--unpinned {
    transform: translateY(-50px);
}

#boardInfoSummary2{width: 100%; padding-top: 0; line-height: 50px; height: 100%; display: none; flex-direction: column; float: left}
.boardListWrap{
  height: 100vh;
  background-size: cover;
}
.boardWhiteBox{ display: flex; flex-direction: column;align-items: center; position: relative; width: 100%; height: 300px; }
.boardItemBox{overflow: hidden; position: relative; min-height: calc(100% - 50px); width: 100%;  margin-top: 300px; float: left; background: #fff; box-sizing: border-box;}
.boardItemBoxHeight{height: calc(100% - 50px)!important;}
.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
.summaryWrap{height: calc(35vh); width: 100%; float: left; position: absolute;}
.summaryTop{width: 100%; height: 30px; line-height: 30px; padding: 0 10px; margin-top: 30px; margin-bottom: 10px; display: flex; justify-content: space-around;}
.centerSpace{width: 100%; height: 30%;}
.summaryBottom{align-self: center; height: 30%; background-color: rgba(0, 0, 0, 0.26); color: #FFF;}
.summaryBottom p {color: #fff;}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}

.pushListCover{min-height: 3.6rem; margin-bottom: 1rem}

.popHeight{
  padding-right: 0; padding-left: 0;
  height: calc(100vh - 35px) !important;
}

.summaryIconChange{
  background-color: rgba(0, 0, 0, 0.26); color: white;
}

@media screen and (max-width: 300px) {
  .boardItemBox {padding: 0 0.7rem!important;}

}
#boardReadYn[type="checkbox"] {
  -webkit-appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  cursor: pointer;
  outline: none !important;
  border: 1px solid #eeeeee;
  border-radius: 2px;
background: #fbfbfb;
}
#boardReadYn[type="checkbox"]::before {
  content: "\2713";
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: scale(0) translate(-50%, -50%);
  line-height: 1;
}
#boardReadYn[type="checkbox"]:checked {
  border-color: rgba(255, 255, 255, 0.3);
  color: rgb(74 102 158) !important;
}
#boardReadYn[type="checkbox"]:checked::before {
  border-radius: 2px;
  transform: scale(1) translate(-50%, -50%)
}
.boardCard{
padding: 10px; width: 90%; background-color: rgba(255, 255, 255, 0.4); font-weight: bold; display: flex; flex-direction: column; justify-content:center; align-items: center; border-radius: 10px;
}
.chanImgRound{ width: 90px; height: 90px; background: rgb(255 255 255 / 50%); display: flex; align-items: center; justify-content: center; position: relative; border-radius: 110px; border: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;  }
.boardMainMemoBoxBackground{
width: 100% !important; height: 100% !important; background: #00000036 !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;
}
</style>
