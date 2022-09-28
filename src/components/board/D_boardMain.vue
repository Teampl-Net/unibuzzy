<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <!-- <div :class="{popHeight :popYn == true}" style="position: absolute; top:0;left:0; z-index:9999; height: calc(100vh - 120px); position: absolute; top:0;left:0;background-color:white;"> -->
  <div id="boardWrap" v-if="CAB_DETAIL" :style="CAB_DETAIL.picBgPath? 'background: ' + CAB_DETAIL.picBgPath + ';' : 'background: #ece6cc;'" style="overflow: auto;" ref="boardListWrap" class="boardListWrap">
    <!-- <span class="font20 fontBold">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</span> -->
    <p class="font20 fontBold" :style="CAB_DETAIL.cabinetNameMtext.length > 15 ? 'font-size:14px !important;' :'' " style="color:#2c3e50; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex;">{{ this.$changeText(CAB_DETAIL.cabinetNameMtext)}}</p>
    <div id="summaryHeader" class="summaryHeader">
      <!-- <p class="font20 fontBold" style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex;" :style="propData.officialYn ? 'padding-right: 30px;':'' "> <img class="fl" src="../../assets/images/channel/icon_official.svg" v-if="propData.officialYn" style="width:30px;" alt="" /> {{this.$changeText(propData.nameMtext)}}</p> -->
      <div id="boardInfoSummary" class="mt-header boardWhiteBox">

        <!-- 게시판 이름 , 소속 채널 -->
        <!-- <div class="font22 boardCard">
          <p class="cBlack font20 mbottom-05" style="width: 100%; ">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</p>
          <p class="font16 grayBlack" style="width: 100%;">{{ this.$changeText(this.propData.nameMtext) }}</p>
        </div> -->
      <div id="chanInfoSummary" ref="chanImg"  class=" boardCard" style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; padding: 10px;">{{value}}
        <div class="chanImgRound" :style="'background-image: url('+  (CHANNEL_DETAIL.logoDomainPath? CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext : CHANNEL_DETAIL.logoPathMtext) + ');' " style="background-size: cover; background-position: center; background-repeat: no-repeat;" > <!-- 채널 로고 부분 -->
          <!-- <img class="fl" src="../../assets/images/channel/icon_official.svg" v-if="chanItem.officialYn" style="position: absolute; width:30px; top:-1rem" alt=""> -->
        </div>
        <div class="chanTextBox fl mleft-05;" style=" width:100%; margin-left: 0.5rem;">
          <div class="fl font16  w-100P">
            <div style="width:50px;" >
              <!-- <img class="fl" style="width:20px; margin-top:2px;" src="../../assets/images/channel/channer_4.png" alt="구독자 아이콘"> -->
              <p class="font15 commonColor textLeft fl mleft-05" style="color:#6768a7; white-space: nowrap;"> 채널명 </p>
            </div>
            <p class="font14 textLeft fl mleft-1 commonBlack">{{this.$changeText(CHANNEL_DETAIL.nameMtext) }}</p>
          </div>
          <div class="fl font16  w-100P">
            <div style="width:50px;" >
              <!-- <img class="fl" style="width:20px; margin-top:2px;" src="../../assets/images/channel/channer_4.png" alt="구독자 아이콘"> -->
              <p class="font15 commonColor textLeft fl mleft-05" style="color:#6768a7; white-space: nowrap;"> 만든일 </p>
            </div>
            <p class="font14 textLeft fl mleft-1 commonBlack">{{this.$changeDateFormat(CAB_DETAIL.creDate)}}</p>
          </div>

          <div class="fl font15  w-100P mtop-05 " style="box-sizing:boborder-box; word-break:break-all; " >
            <div class="fl font15  w-100P">
              <div style="width:100%" class="fl" >
                <!-- <img class="fl" style="width:20px; margin-top:2px;" src="../../assets/images/channel/channer_4.png" alt="구독자 아이콘"> -->
                <p class="font15 commonColor textLeft fl mleft-05" style="color:#6768a7;  white-space: nowrap;"> 게시판기능 </p>
              </div>
              <p class="mleft-05 fl font12 commonBlack" v-if="CAB_DETAIL.replyYn === 1">댓글</p>
              <p class="fl font12 mleft-05 commonBlack" v-if="CAB_DETAIL.fileYn === 1">파일업로드</p>
              <p class="fl font12 mleft-05 commonBlack" v-if="CAB_DETAIL.blindYn === 1">익명</p>
            </div>
            <!-- <p class="fl font14">{{mCabinetContentsDetail.blindYn === 1? '파일업로드O/': '파일업로드X/'}}</p> -->
          </div>
        </div>
      </div>

        <!-- 익명게시판 여부 -->
        <!-- <div v-if="mCabinetContentsDetail.blindYn === 1" class="font16" style="width: 100%; margin-top: 10px; margin-bottom: 20px; ">익명게시판</div> -->

        <!-- <div class="summaryTop">
          <p class="cBlack fl font16" style="width: 100%; height: 30px;">공유 {{mCabinetContentsDetail.mShareItemCnt}}명</p>
          <p class="cBlack fl font16" style="width: 100%; height: 30px; border-left: 1px solid white">게시글 {{totalElements}}개</p>
          <div class="fl boardMainAdminArea"  v-if="this.propData.value.adminYn">
            <p class="fl font16 fontBold cBlack" style="text-align: left;width: 50px; height: 100%;" >관리자</p>
            <img src="../../assets/images/common/icon_manager_tie.svg" class="fl" style="width: 15px; height: 15px;" />
          </div>
        </div> -->
        <div class="fl w-100P boardCard mtop-05" style="display: flex; flex-direction: row; justify-content: space-between;">
          <p class="cBlack fl font15" style="width: 100%; ">공유 {{CAB_DETAIL.mShareItemCnt}}명</p>
          <p class="cBlack fl font15" style="width: 100%; border-left: 1px solid white">게시글 {{this.CAB_DETAIL.totalContentsCount}}개</p>
        </div>

        <div class="fl w-100P boardCard mtop-05" style="display: flex; flex-direction: row; justify-content: space-between;">
          <div style="display:flex; align-items: center;">
            <div @click="goProfile" :style="'background-image: url(' +  (GE_USER.domainPath? GE_USER.domainPath + GE_USER.userProfileImg : GE_USER.userProfileImg)  + ')'" style="width:30px; height:30px; border-radius: 100%; border:1.5px solid #6768a7; overflow: hidden; background-size: cover; background-position: center; background-repeat: no-repeat;">
             <!--  <img :src="currentUserInfo.userProfileImg" style="width: 30px;" class="fl "/> -->
            </div>
            <div class="mleft-05" style="display:flex; flex-direction: column;">
              <p @click="goProfile" class="font16 commonBlack">{{this.$changeText(GE_USER.userDispMtext)}}</p>
              <div>
                <p class="fl font14 commonBlack">{{CHANNEL_DETAIL.D_CHAN_AUTH.followTypeText}}</p>
                <p class="fl commonBlack font14 " v-if="CHANNEL_DETAIL.D_CHAN_AUTH.showProfileYn">(내정보공개)</p>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items: center; justify-content: space-around; max-width:100px; width:40%;">

            <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.W === true" class="fr img-w20" src="../../assets/images/board/icon_square_pen.svg" alt="">
            <img v-else class="fr img-w20" src="../../assets/images/board/icon_square_pen_solid.svg" alt="">

            <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.V === true" class="fr img-w20" src="../../assets/images/board/icon_eyes.svg" alt="">
            <img v-else class="fr img-w20" src="../../assets/images/board/icon_eyes_solid.svg" alt="">

            <img v-if="CAB_DETAIL.shareAuth && CAB_DETAIL.shareAuth.R === true" class="fr img-w20" src="../../assets/images/common/icon_comment.svg" alt="">
            <img v-else class="fr img-w20" src="../../assets/images/common/icon_comment_solid.svg" alt="">
          </div>
        </div>

      </div>
      <div id="boardInfoSummary2" class="summaryHeader2">
        <span class="font20 fontBold">{{ this.$changeText(CAB_DETAIL.cabinetNameMtext)}}</span>
        <span class="font13 mbottom-05 fl">{{ this.$changeText(CHANNEL_DETAIL.nameMtext) }}</span>
      </div>
    </div>

    <div class="boardItemBox" id="boardItemBox" style="">
      <!-- <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll"> -->
      <div style="position: relative; float: left; width: 100%; overflow: hidden scroll; height: 100%;" id="boardListWrap" ref="boardListWrapCompo">
        <transition name="showModal">
          <findContentsList :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
        </transition>
        <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
          <!-- <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" /> -->
          <gActiveBar :searchYn="true" @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" ref="activeBar" :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100%);"/>
        </div>
        <div :style="calcBoardPaddingTop" style="padding-top: calc(60px + var(--paddingTopLength)) ; height: calc(100%);" class="commonBoardListWrap" ref="commonBoardListWrapCompo">
          <!-- <div class="fr boardReadCheckAlimArea" :class="this.scrolledYn? 'boardReadCheckAlimArea--unpinned': 'boardReadCheckAlimArea--pinned'"  style="height: 20px; position: sticky; top:20px; z-index: 9; display: flex; align-items: center; " > <input type="checkbox" v-model="readCheckBoxYn" id="boardReadYn" style="" > <label for="boardReadYn" class="mleft-05">안읽은 알림 보기</label></div> -->
          <boardList :shareAuth="CAB_DETAIL.shareAuth" :blindYn="(CAB_DETAIL.blindYn === 1)" ref="boardListCompo" @moreList="loadMore" @goDetail="goDetail" :commonListData="this.mCabContentsList" @contentMenuClick="contentMenuClick" style=" margin-top: 5px; float: left;"  @refresh='refresh' @openPop="openPop" />
          <gEmty :tabName="currentTabName" contentName="게시판" v-if="emptyYn && mCabContentsList.length === 0 " />
        </div>
        <!-- <div style="width: 100%; height: 200px; background: #ccc; position: absolute; bottom: 0;">{{this.firstContOffsetY}}, {{scrollDirection}}, {{this.newScrollPosition}}</div> -->
      </div>
    </div>
    <div :class="(this.scrolledYn || !this.reloadShowYn) ? 'reload--unpinned': 'reload--pinned'"
    v-on="handleScroll"
    style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 2rem; right: calc(50% - 25px);"
    @click="refreshAll" >
      <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;" />
    </div>
  <div class="btnPlus" @click="openWriteBoard" v-if="CAB_DETAIL.shareAuth && this.CAB_DETAIL.shareAuth.W === true" ><p style="font-size:40px;">+</p></div>
</div>
<gConfirmPop :confirmText='errorBoxText' :confirmType="confirmType ? 'two' : 'timeout'" @no="errorBoxYn = false, reportYn = false" @ok="confirmOk" v-if="errorBoxYn"/>
<!-- <boardWrite @closeXPop="closeXPop" @successWrite="successWriteBoard" @successSave="this.$refs.boardMainPop.getContentsList()" :propData="this.params" v-if="this.targetType=== 'writeBoard'" :sendOk='sendOkYn' @openPop='openPop' /> -->
<div v-if="boardWriteYn" style="width:100%; height:100%; top:0; left:0; position: absolute; z-index:99999">
  <boardWrite @closeXPop="closeWriteBoardPop()" @successWrite="successWriteBoard" @successSave="getContentsList" :propData="boardWriteData" :sendOk='sendOkYn' @openPop='openPop' style="z-index:999"/>
</div>
<gReport v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @editable="editable" @report="report" @bloc="bloc" />
<smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
<gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="selectBoardPopShowYn" :boardDetail="boardDetailValue" :boardValue="detailVal" />
</template>
<script>
// import findContentsList from '../Tal_findContentsList.vue'
import boardList from '@/components/list/Tal_commonList.vue'
import findContentsList from '@/components/popup/common/Tal_findContentsList.vue'
import boardWrite from '@/components/board/Tal_boardWrite.vue'

export default {
  components: {
    findContentsList,
    boardList,
    boardWrite
  },
  props: {
    propData: {}
  },
  async created () {
    // console.log(this.CAB_DETAIL)
    // console.log('this.CAB_DETAIL')
    this.$emit('openLoading')
    await this.getCabinetDetail()

    // var resultList = await this.getContentsList()
    // this.mCabContentsList = resultList.content
    // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
    //   this.endListYn = true
    // } else {
    //   this.endListYn = false
    // }
  },
  mounted () {
    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
    if (this.CAB_DETAIL) {
      this.boardListWrap = this.$refs.boardListWrap
      this.boardListWrap.addEventListener('scroll', this.saveScroll)
      this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
      this.listBox.addEventListener('scroll', this.handleScroll)
    }
  },
  updated () {
    if (this.CAB_DETAIL) {
      this.boardListWrap.scrollTop = this.currentScroll
      this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]

      // eslint-disable-next-line no-unused-vars
      this.box = this.$refs.boardListWrap // 이 dom scroll 이벤트를 모니터링합니다
      this.box.addEventListener('scroll', this.updateScroll)
      this.box.addEventListener('mousewheel', e => {
        this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      })
      if (this.findPopShowYn) {
        this.findPaddingTopBoard()
      }
    }
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  data () {
    return {
      paddingTop: 0,
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 쓴', name: 'M' }],
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
      currentTabName: '최신',
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
      selectBoardPopShowYn: false
    }
  },

  methods: {
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
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
      var typeText = type === 'user' ? '유저를' : '게시글을'
      this.errorBoxText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.confirmType = 'two'
      this.errorBoxYn = true
      this.currentConfirmType = 'BLOC'
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveActLog',
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
      this.errorBoxText = '게시글을 삭제 하시겠습니까?'
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
          url: 'service/tp.deleteContents',
          param: inParam
        })
        this.refresh()
        // this.$emit('closeXPop', true)
      } else if (this.currentConfirmType === 'BLOC') {
        this.currentConfirmType = ''
        // console.log(this.tempData)
        var param = {}
        param.actType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.errorBoxText = '알수 없는 오류입니다.'
        }
        param.creUserKey = this.GE_USER.userKey
        this.errorBoxText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param)
      }
    },
    report (type) {
      var targetKind
      var targetKey
      if (type === 'alim') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.errorBoxText = '해당 알림이 신고되었습니다.'
      } else if (type === 'board') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.errorBoxText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'memo') {
        targetKind = 'C'
        targetKey = this.tempData.memoKey
        this.errorBoxText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'channel') {
        targetKind = 'T'
        targetKey = this.tempData.creTeamKey
        this.errorBoxText = '해당 채널이 신고되었습니다.'
      } else if (type === 'user') {
        targetKind = 'U'
        targetKey = this.tempData.creUserKey
        this.errorBoxText = '해당 유저가 신고되었습니다.'
      }
      var param = {}
      param.actType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param)
    },
    contentMenuClick (params) {
      // alert(JSON.stringify(params))
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      this.tempData = params.tempData
      this.reportYn = true
    },
    openUpdateContentsPop () {
      var param = {}
      param.targetKey = this.tempData.contentsKey
      param.targetType = 'writeBoard'
      param.creTeamKey = this.tempData.creTeamKey
      if (this.tempData.attachMfilekey) { param.attachMfilekey = this.tempData.attachMfilekey }
      param.bodyFullStr = this.tempData.bodyFullStr
      param.modiContentsKey = this.tempData.contentsKey
      param.titleStr = this.tempData.title
      param.parentAttachTrueFileList = this.attachTrueFileList
      this.$emit('openPop', param)
    },
    async recvNoti (e) {
      var message
      // alert(JSON.stringify(e))
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }

        if (message.actType === 'WR' && JSON.parse(message).targetKey === this.propData.targetKey) {
          this.refresh()
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
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
      this.paddingTop = element.clientHeight
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
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
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
      // 임시 삭제
      /* var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getContentsList(pSize, 0)
      this.mCabContentsList = resultList.content
      this.endList = false
      this.$refs.boardListCompo.loadingRefHide() */
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
      params.targetType = 'writeBoard'
      params.actorList = this.actorList
      params.targetNameMtext = this.propData.nameMtext
      params.currentTeamKey = this.propData.currentTeamKey
      params.cabinetNameMtext = this.$changeText(this.CAB_DETAIL.cabinetNameMtext)
      params.cabinetKey = this.CAB_DETAIL.cabinetKey
      params.value = this.CAB_DETAIL
      this.boardWriteData = {}
      this.boardWriteData = params
      var history = this.$store.getters['D_HISTORY/hStack']
      this.writePopId = 'writeBoard' + history.length
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
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', tempChan)
      /* this.$actionVuex('TEAM', tempChan, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    async getCabinetDetail () {
      if (!this.CAB_DETAIL.shareAuth) {
        // eslint-disable-next-line no-new-object
        var param = new Object()
        // var tt = this.propData
        param.currentTeamKey = this.propData.currentTeamKey
        param.cabinetKey = this.propData.targetKey
        var resultList = await this.$getCabinetDetail(param)
        // mShareItemList가 잘 들어오면 save잘 된것
        //   this.shareAuth.R = true
        //   this.shareAuth.W = true
        //   this.shareAuth.V = true
        // } else {
        resultList.mCabinet.shareAuth = this.$checkUserAuth(resultList.mCabinet.mShareItemList)
        this.updateStoreData(resultList.mCabinet)
      }
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
      param.cabinetKey = this.propData.targetKey
      param.offsetInt = this.offsetInt
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      // } else {
        // param.offsetInt = this.offsetInt
      }
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
        }
      }
      param.jobkindId = 'BOAR'

      if (this.readCheckBoxYn) {
        param.findLogReadYn = false
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

      return resultList
    },
    closeSearchPop () {
      this.findPopShowYn = false
      /* this.subHistoryList.splice(-1, 1) */
    },
    goDetail (value) {
      if (this.CAB_DETAIL.shareAuth.V === false && value.creUserKey !== this.GE_USER.userKey) {
        this.errorBoxText = '권한이 없습니다.'
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
      // eslint-disable-next-line no-new-object
      // var params = new Object()
      // if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
      //   params.targetType = value.targetType
      // } else {
      //   params.targetType = 'pushDetail'
      // }
      // params = value
      // if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      // if (value.nameMtext !== undefined && value.teamName !== null && value.teamName !== '') { params.chanName = value.teamName }
      this.$emit('openPop', value)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
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
          this.currentTabName = '최신'
          break
        case 'L' :
          this.currentTabName = '좋아요'
          break
        case 'S' :
          this.currentTabName = '스크랩'
          break
        case 'M' :
          this.currentTabName = '내가 쓴'
          break
      }
      this.$refs.boardListCompo.loadingRefShow()
      this.offsetInt = 0
      // this.mCabContentsList = []
      this.emptyYn = false
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.offsetInt += 1
        this.endListYn = false
      }
      if (this.mCabContentsList.length === 0) this.emptyYn = true
      // this.$refs.boardListCompo.loadingRefHide()
      this.scrollMove()
    },
    scrollMove () {
      var ScrollWrap = this.$refs.commonBoardListWrapCompo
      ScrollWrap.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async requestSearchList (param) {
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        }
      }

      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      this.findPopShowYn = false
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = '제목'
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = '보낸'
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = '날짜'
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (type) {
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // await this.getCabinetDetail()
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      this.findPaddingTopBoard()
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      // await this.getCabinetDetail()

      this.findPopShowYn = false
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ contentsKey }) => contentsKey === current.contentsKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    updateStoreBoardList (uniqueArr) {
      var tempChan = this.CHANNEL_DETAIL
      var cabinetList = tempChan.ELEMENTS.cabinetList
      var index = cabinetList.findIndex((item) => item.cabinetKey === this.CAB_DETAIL.cabinetKey)
      cabinetList[index].boardList = uniqueArr
      tempChan.ELEMENTS.cabinetList = cabinetList
      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', tempChan)
      /* this.$actionVuex('TEAM', tempChan, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    async loadMore (pageSize) {
      if (this.endListYn === false) {
        if (this.CAB_DETAIL.boardList && (!this.CAB_DETAIL.totalContentsCount > this.CAB_DETAIL.boardList.length)) return

        var resultList = await this.getContentsList()
        if (this.CAB_DETAIL.boardList === undefined || this.CAB_DETAIL.boardList.length === 0) {
          this.CAB_DETAIL.boardList = []
        }

        const newArr = [
          ...this.CAB_DETAIL.boardList,
          ...resultList.content
        ]
        var uniqueArr = this.replaceArr(newArr)
        var tempCabData = this.CAB_DETAIL
        tempCabData.boardList = uniqueArr
        if (this.viewTab === 'N') {
          tempCabData.totalContentsCount = resultList.totalElements
        }
        // eslint-disable-next-line no-debugger
        debugger
        this.updateStoreData(tempCabData)

        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.offsetInt += 1
          this.endListYn = false
        }
        this.mCabContentsList = newArr
      } else {
        this.$refs.boardListCompo.loadingRefHide()
      }
      this.findPopShowYn = false
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.currentTeamKey)[0]
    },
    CAB_DETAIL () {
      return this.$getBoardCabinetDetail(this.CHANNEL_DETAIL, this.propData.targetKey)[0]
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    calcBoardPaddingTop () {
      return {
        '--paddingTopLength': (this.paddingTop) + 'px'
      }
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
    }
  },
  watch: {
    CHANNEL_DETAIL (value, old) {
      alert('채널 변화 생김요!')
    },
    pageUpdate (value, old) {
      this.backClick()
    },
    readCheckBoxYn () {
      this.changeTab(this.viewTab)
    },
    historyStack (value, old) {
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
  padding-top: 1rem;
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

/* .stickerWrap{width: 100%; overflow-x: scroll; overflow-y: hidden;} */
.stickerFrame{min-width: 100%;  width: var(--stickerDivWidth); height: 40px;}
.stickerDiv p {line-height: 20px;}

.popHeight{
  padding-right: 0; padding-left: 0;
  height: calc(100vh - 35px) !important;
}

.summaryIconChange{
  background-color: rgba(0, 0, 0, 0.26); color: white;
}

.boardItemBox {padding: 0 1rem;}

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
  color: #6768a7 !important;
}
#boardReadYn[type="checkbox"]:checked::before {
  border-radius: 2px;
  transform: scale(1) translate(-50%, -50%)
}
.boardCard{
padding: 10px; width: 90%; background-color: rgba(255, 255, 255, 0.4); font-weight: bold; display: flex; flex-direction: column; justify-content:center; align-items: center; border-radius: 10px;
}
.chanImgRound{ width: 90px; height: 90px; background: rgb(255 255 255 / 50%); display: flex; align-items: center; justify-content: center; position: relative; border-radius: 110px; border: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;  }
</style>
