<template>
    <div id="gPopup" v-if="reloadYn === false && this.popId" :style="this.targetType === 'writeContents'? 'background: transparent' : ''" class="commonPopWrap">
      <loadingCompo style="z-index: 999!important; position:absolute; top:0; left:0;" v-if="loadingYn" />
      <pushPop @closePushPop="closePushPop" @goChanDetail="goChanDetail" v-if="notiDetailShowYn" :detailVal="notiDetail"  />
      <transition name="showModal">
        <fullModal @goScrollTarget="goScrollTarget" @successWrite="successWriteBoard" @parentClose="parentClose" @addDirectAddMemList="addDirectAddMemList" @reloadPop="reloadPop" :style="getWindowSize" transition="showModal" :id="popId" ref="commonGPopWrap" @selectedReceiverBookNMemberList='selectedReceiverBookNMemberList'
                                        @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.thisPopN" :propParams="this.popParams" :propData="this.propParams" @toAlimFromBoard='toAlimThisPageClose' @saveCabinet='refreshCabinet' @channelMenuReload='channelMenuReload' @closeNewPop='closeNewPop'                                        />
      </transition>
      <popHeader  ref="gPopupHeader" :checkOfficialChanYn="this.propData" :helpYn="this.helpYn" :class="(targetType === 'chanDetail' || targetType === 'boardMain')? 'chanDetailPopHeader': ''" :chanName="this.propParams.chanName" :headerTitle="this.headerTitle" :chanAlimListTeamKey="this.propParams.targetKey" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"
      v-if="targetType !=='writeContents'" :followYn="this.headerFollowYn"
      @openMenu='openChanMenuYn = true' :bgblack='this.bgblackYn' :propBookDetailPopYn='this.mBookDetailPopYn' @closeBookDetail='mBookDetailPopYn = false' :targetType='targetType' />
      <div class="w-100P h-100P" style=" position: relative;" v-if=" popId &&  this.targetType === 'chanDetail'">
        <chanAlimList :pPopId="popId" :propData="this.propParams" :notiScrollTarget="notiScrollTarget" ref="gPopChanAlimList"  @pageReload="reloadPop" @openLoading="loadingYn = true"  @closeLoading="this.loadingYn = false" :chanDetail="propParams" v-if=" popId && targetType === 'chanDetail' && popId " @openPop="openPop" @bgcolor='setBgColor' @followYn="headerFollowYn = true" @showToastPop="showToastPop" />
      </div>
      <div class="w-100P h-100P" style="padding-top: 50px; background: rgb(220, 221, 235); position: relative;" v-if=" popId &&  this.targetType === 'pushList'">
        <pushList :pPopId="popId" style="" :propParams="this.propParams" :ref="'gPopPush'" :popYn="true" :readySearchList="this.readySearchList" @openPop="openPop" @showToastPop="showToastPop" @openUserProfile="openPop" />
      </div>

      <div class="w-100P h-100P" style="padding-top: 50px; background: rgb(220, 221, 235); position: relative;" v-if=" popId &&  this.targetType === 'chanList'">
        <chanList :pPopId="popId" :propData="this.propParams" ref="gPopChan" :popYn="true" @closeLoading="this.loadingYn = false" @openPop = "openPop"/>
      </div>
      <div class="w-100P h-100P" style="padding-top: 50px; background: rgb(220, 221, 235); position: relative;" v-if="popId &&  this.targetType === 'searchPop'">
        <searchPage :pPopId="popId" :propData="this.propParams" :popYn="true" @openPop="openPop" />
      </div>
      <changeInfo :pPopId="popId" @closeLoading="this.loadingYn = false"  @successUpdate="this.closeXPop(true)" :kind="this.changInfoType" v-if=" popId &&  this.targetType === 'changeInfo'" />
      <askTal :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'askTal'" @closeXPop="closeXPop" @openPop = "openPop" :propData='this.propParams' />
      <talInfo :pPopId="popId"  @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'theAlimInfo'" />
      <question :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'question'" @openPop = "openPop"/>
      <leaveTal :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'leaveTheAlim'" @closeXPop="closeXPop" />
      <createChannel :pPopId="popId" v-if=" popId &&  this.targetType === 'createChannel'" :chanDetail="this.propParams"  @closeXPop="closeXPop(true)" @closePop="closePop" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" @successCreChan='successCreChan' @openPop='openPop' />

      <div v-if="popId &&  this.targetType === 'writeContents'" style="position: absolute; top:0; left:0; z-index:10; background:#00000050; width: 100vw; height: 100vh;"></div>
      <writeContents :pPopId="popId" ref="writeContentsCompo" v-if="popId &&  this.targetType === 'writeContents'" :contentType="this.propParams.contentsJobkindId" :params="this.propParams" :propData="this.propParams" @closeXPop="closeXPop" @openPop='openPop' @changePop='changePop' @toAlimFromBoard="toAlimFromBoard" />

      <selectBookList :pPopId="popId" v-if=" popId &&  this.targetType === 'selectBookList'" :pSelectedList="this.selectPlist" :selectPopYn='true' :propData='this.propParams' @closeXPop='closeXPop' @openPop='openPop'  @sendReceivers='selectedReceiverBookNMemberList' />
      <chanMenu :pPopId="popId" ref="chanMenuCompo" :propData="this.propParams" @openPop="openPop" :propChanAlimListTeamKey="this.propParams.targetKey" v-if='openChanMenuYn === true && popId' @closePop='openChanMenuYn = false' @openItem='openPop' @openChanMsgPop="closeNopenChanMsg()"/>
      <boardMain :pPopId="popId" ref="boardMainPop" :propData="this.propParams" :chanAlimListTeamKey="this.propParams.targetKey" v-if=" popId &&  this.targetType === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop"  @closeLoading="this.loadingYn = false" @openLoading="this.loadingYn = true"/>
      <contentsDetail :pPopId="popId" @closeAndNewPop="closeAndNewPop" :propData="this.propParams" ref="boardDetailCompo" v-if=" popId &&  this.targetType === 'contentsDetail'" @openPop="openPop" :propParams='this.propParams' @reloadParent='reloadParent' @closeXPop="closeXPop" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />
      <editBookList :pPopId="popId" ref="editBookListComp" @closeXPop="closeXPop" :propData="this.propParams" :chanAlimListTeamKey="this.propParams.targetKey" v-if="this.targetType=== 'editBookList'" @openPop='openPop' @showToastPop="showToastPop" @openBookDetailPop='openBookDetailPop' :propBookDetailPopYn='this.mBookDetailPopYn' />
      <editManagerList :pPopId="popId" ref="editManagerListComp" :propData="this.propParams" @openPop="openPop" :managerOpenYn='true'   v-if="this.targetType=== 'editManagerList'" />
      <bookMemberDetail :pPopId="popId" @openPop="openPop" @addDirectAddMemList="addDirectAddMemList" @closeXPop="closeXPop" @deleteManager='closeXPop' :propData="this.propParams" v-if="this.targetType=== 'bookMemberDetail'" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />
      <onlyMemberSelectPop :pPopId="popId"  @openPop="openPop" ref="selectManagerCompo" :pSelectedList="this.propParams.pSelectedList" :propData="this.propParams" v-if="this.targetType=== 'selectMemberPop'" @closeXPop='closeXPop' @saveCabinet='saveCabinet' />
      <memberManagement :pPopId="popId" :propData="this.propParams" ref="mamberManagementCompo" v-if=" popId &&  this.targetType === 'memberManagement'" @openPop='openPop'/>
      <selectAddressBookList :pPopId="popId" :propData="this.propParams" v-if=" popId &&  this.targetType === 'selectAddressBookList'" @closeXPop='closeXPop' />
      <div class="pagePaddingWrap" style="padding-top: 50px; position: relative;" v-if=" popId &&  this.targetType === 'setMypage'">
        <setMypage :pPopId="popId" v-if=" popId &&  this.targetType === 'setMypage'" @closeXPop="closeXPop" @openPop="openPop" />
      </div>
      <editMyChanMenu :pPopId="popId" v-if=" popId && this.targetType === 'myChanMenuEdit'" :propData="this.propParams" @openPop="openPop"  />
      <editBoardPop :pPopId="popId" v-if=" popId && this.targetType === 'editBoard'" :propData="this.propParams" @openPop="openPop" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />
      <chanInfoComp :pPopId="popId" ref="gPopChanDetailRef" v-if=" popId &&  this.targetType === 'chanInfo'" :propData="this.propParams" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" @closeXPop="closeXPop" @pageReload="reloadPop" @openPop="openPop" @changeFollowYn="changeFollowYn"  :alimSubPopYn="alimListToDetail" :chanDetail="this.propParams.value" style="background-color: #fff;"></chanInfoComp>
      <autoAnswerList :pPopId="popId" v-if=" popId &&  this.targetType === 'autoAnswer'" :propData="this.propParams" @openPop="openPop"  />
      <memberFormList :pPopId="popId" v-if=" popId &&  this.targetType === 'memberFormList'" :propData="this.propParams" @openPop="openPop" @closeXPop="closeXPop" />
      <memberForm :pPopId="popId" v-if=" popId &&  this.targetType === 'memberForm'" :propData="this.propParams" @closeXPop="closeXPop" @openPop="openPop" />
      <memberFormPreView :pPopId="popId" v-if=" popId &&  this.targetType === 'mQPreview'" :propData="this.propParams" @openPop="openPop" @closeXPop="closeXPop" />
      <errorPage :pPopId="popId" v-if=" popId &&  this.targetType === 'errorPage'" :propData="this.propParams" @openPop="openPop" />
      <creAddressBook :pPopId="popId" v-if="this.targetType === 'creAddressBook'" :propData="this.propParams" @openPop="openPop" @closePop="closePop" @closeXPop="closeXPop" @saveCabinet="saveCabinet" />
      <gConfirmPop :confirmText="errorText" confirmType='one' @no='failPopYn = false' v-if="failPopYn" style="z-index: 999999999;"/>
      <editMemberTypePop ref="editMemberTypePop" :pPopId="popId" v-if="popId && this.targetType === 'editMemberTypePop'" :propData="this.propParams" @openPop="openPop" @closeXPop="closeXPop" />
      <memInfoCreEditPop :pPopId="popId" v-if="popId && this.targetType === 'memInfoCreEditPop'" :propData="this.propParams" @openPop="openPop" @closeXPop="closeXPop" />
      <notiHitstory :pPopId="popId" v-if="popId && this.targetType === 'notiHitstory'" :propData="this.propParams" @openPop="openPop" @closeXPop="closeXPop" />
    </div>
</template>

<script>
import pushPop from '../push/Tal_pushDetailPopup.vue'
import changeInfo from '../info/Tal_changeInfo.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import chanList from '../../../pages/routerPages/D_chanList.vue'
import searchPage from '../../../pages/routerPages/D_searchPage.vue'
import chanAlimList from '../../pageComponents/channel/D_chanAlimList.vue'
import askTal from '../info/Tal_askTheAlim.vue'
import talInfo from '../info/Tal_theAlimInfo.vue'
import question from '../info/Tal_question.vue'
import leaveTal from '../info/Tal_leaveTheAlim.vue'
import createChannel from '../creChannel/D_createChannel.vue'
import writeContents from '../D_writeContents.vue'
import chanMenu from '../chanMenu/D_channelMenu.vue'
import boardMain from '@/components/board/D_boardMain.vue'
import contentsDetail from '@/components/common/D_contentsDetail.vue'
import editBookList from '../receiver/D_editBookList.vue'
import bookMemberDetail from '../receiver/Tal_bookMemberDetail.vue'
import editManagerList from '../receiver/Tal_selectManagerList.vue'
import onlyMemberSelectPop from '../receiver/D_onlyMemberSelectPop.vue'
import selectBookList from '../receiver/D_selectBookList.vue'
import setMypage from '../../../pages/routerPages/D_setMypage.vue'
// import followerManagement from '../member/D_manageFollowerList.vue'
// import managerManagement from '../member/D_manageManagerList.vue'
import memberManagement from '../member/D_manageFollowerList.vue'
// import memberManagement from '../member/Tal_memberManagement.vue'
import selectAddressBookList from '../member/Tal_selectAddressBook.vue'
import loadingCompo from '../../layout/Tal_loading.vue'
import editBoardPop from '../board/D_editBoardList.vue'
import editMyChanMenu from '../chanMenu/D_editMyChanMenu.vue'
import chanInfoComp from '../../pageComponents/channel/Tal_chanDetail.vue'
import autoAnswerList from '../chanMenu/D_autoAnswerList.vue'
import memberForm from '../memberQuestion/D_editMemberForm.vue'
import memberFormList from '../memberQuestion/D_memberFormList.vue'
import memberFormPreView from '../memberQuestion/D_memberFormPreView.vue'
import errorPage from '../../popup/common/Tal_errorPage.vue'
import creAddressBook from '../receiver/D_creAddressBook.vue'
import editMemberTypePop from '../memberInfo/D_editMemberTypePop.vue'
import memInfoCreEditPop from '../memberInfo/D_memInfoCreEditPop.vue'
import notiHitstory from '../../pageComponents/main/D_notiHistoryList.vue'
export default {
  created () {
    console.log(this.propParams)
    this.settingPop()
    localStorage.setItem('notiReloadPage', 'none')
  },
  data () {
    return {
      helpYn: false,
      notiDetail: {},
      notiDetailShowYn: false,
      popId: null,
      openChanMenuYn: false,
      reloadYn: false,
      popShowYn: false,
      targetType: '',
      // subPopShowYn: false,
      thisPopN: {},
      headerTitle: '',
      popParams: '',
      changInfoType: '',
      readySearchList: {}, // chanDetail -> pushList 열때 필요
      successChanParam: {},
      bgblackYn: false,
      loadingYn: false,
      headerFollowYn: false,
      axiosQueue: [],
      notiScrollTarget: null,
      errorText: '',
      failPopYn: false,
      selectPlist: [],
      mBookDetailPopYn: false
    }
  },
  props: {
    propParams: {},
    parentPopN: {}
  },
  components: {
    searchPage,
    memInfoCreEditPop,
    editMemberTypePop,
    setMypage,
    chanAlimList,
    pushList,
    chanList,
    changeInfo,
    askTal,
    talInfo,
    question,
    leaveTal,
    createChannel,
    writeContents,
    chanMenu,
    boardMain,
    contentsDetail,
    editBookList,
    bookMemberDetail,
    pushPop,
    editManagerList,
    onlyMemberSelectPop,
    memberManagement,
    selectAddressBookList,
    selectBookList,
    loadingCompo,
    editBoardPop,
    editMyChanMenu,
    chanInfoComp,
    autoAnswerList,
    memberForm,
    memberFormList,
    memberFormPreView,
    errorPage,
    creAddressBook,
    notiHitstory
  },
  updated () {
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    deepLinkQueue () {
      return this.$store.getters['D_HISTORY/deepLinkQueue']
    },
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory(this.popId)
  },
  watch: {
    pageUpdate (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        this.closeXPop() // 혹시 모르니 일단 삭제
      } else {
        if (history[history.length - 1] === this.popId) {
          this.closeXPop()
        }
      }
    },
    async deepLinkQueue (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
      } else {
        if (value.length > 0) {
          var target = value[value.length - 1]
          // eslint-disable-next-line no-new-object
          var param = new Object()
          console.log(target)
          if (!target.targetKind || !(target.targetKind === 'chanDetail' || target.targetKind === 'contentsDetail')) return
          param.targetType = target.targetKind
          param.creTeamKey = Number(target.targetKey)

          // 현재 에러남
          if (target.targetKind === 'chanDetail') {
            this.goChanDetail(param)
          } else {
            this.goDetail(param)
          }
          this.$store.commit('D_HISTORY/changeDeepLinkQueue', [])
        }
      }
    },
    historyStack (value, old) {
    }
  },
  methods: {
    closeNopenChanMsg () {
      this.openChanMenuYn = false
      this.$refs.gPopChanAlimList.openReqMemPop()
    },
    openBookDetailPop () {
      this.mBookDetailPopYn = true
    },
    setBgColor (param) {
      var test = false
      if (param === 1 || param === true) { test = true }
      this.bgblackYn = test
    },
    emitFunc (emitName, param) {
      this.$emit(emitName, param)
    },
    refreshCabinet (param) {
      if (param.cabinetType === 'address') {
        this.$refs.editBookListComp.getBookList()
      } else if (param.cabinetType === 'member') {
        this.$refs.editBookListComp.getBookMemberList()
      }
    },
    saveCabinet (param) {
      console.log('--- gPop Wrap saveCabinet ---')
      console.log(param)
      if (param.cabinetType === 'address') {
        this.emitFunc('saveCabinet', param)
      } else if (param.cabinetType === 'member') {
        this.emitFunc('saveCabinet', param)
      }
    },
    // 헤더에게 현재 chanAlimList에 화면이 구독중인지 확인하기 위해 사용
    async getFollowerYn (teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('userKey', this.GE_USER.userKey)
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      }, true)
      // console.log(result)
      if (result.data.content.length > 0) {
        return true
      } else {
        return false
      }
    },
    selectedReceiverBookNMemberList (param) {
      if (!param.emit) {
        param.emit = true
        this.$emit('selectedReceiverBookNMemberList', param)
        this.closeXPop()
      } else {
        if (this.targetType === 'chanDetail') {
          this.$refs.gPopChanAlimList.setSelectedList(param)
        } else {
          this.$refs.writeContentsCompo.setSelectedList(param)
        }
      }
    },
    async addDirectAddMemList (param) {
      if (this.targetType === 'bookMemberDetail') {
        this.$emit('addDirectAddMemList', param)
      } else if (this.targetType === 'editBookList') {
        await this.$refs.editBookListComp.saveMemberDirectly(param)
        this.closePop()
      } else {
        if (param.cabinetKey === undefined || param.cabinetKey === null || param.cabinetKey === '') {
          await this.$refs.mamberManagementCompo.addDirectly(param)
        } else {
          await this.$refs.selectManagerCompo.changeDirectMemList(param)
        }
        this.closePop()
      }
    },
    async reloadParent () {
      if (this.propParams.openActivity === 'chanAlimList') {
      } else {
        this.$emit('reloadPop')
      }
    },
    reloadPop (parentReloadYn) {
      if (this.targetType === 'myChanMenuEdit') {
        this.closePop()
        return
      }
      if (parentReloadYn === true) {
        this.reloadParent()
      }
      this.reloadYn = true
      setTimeout(() => {
        this.reloadYn = false
      }, 100)
    },
    async successWriteBoard (inParam) {
      if (this.targetType === 'writeContent') {
        this.$emit('successWrite', inParam)
      } else {
        await this.closePop()
        this.openPop(inParam)
      }
    },
    async settingPop (successChanYn) {
      var target = this.propParams
      if (successChanYn === true) {
        target = this.successChanParam
      }
      // alert(JSON.stringify(target))
      this.headerTitle = this.$changeText(target.popHeaderText)
      this.targetType = target.targetType
      if (this.targetType === 'contentsDetail' || this.targetType === 'chanDetail') {
        /* if (!this.targeType || !target.targetKey) return */
        this.popId = this.targetType + target.targetKey
      } else if (this.targetType === 'pushList') {
        if (target.readySearchList !== undefined && target.readySearchList !== null && target.readySearchList !== '') {
          this.readySearchList = target.readySearchList
        }
      } else if (this.targetType === 'askTal') {
        if (target.jobKind === 'QUES') this.headerTitle = '문의하기'
        if (target.jobKind === 'ERRO') this.headerTitle = '오류접수'
      } else if (this.targetType === 'changeEmail') {
        this.changInfoType = this.targetType
        this.targetType = 'changeInfo'
      } else if (this.targetType === 'editBookList' || this.targetType === 'memberManagement') {
        this.helpYn = true
      } else if (this.targetType === 'selectBookList') {
        this.selectPlist = this.propParams.pSelectedList
      }
      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.thisPopN = Number(this.parentPopN) + 1
      } else {
        this.thisPopN = 100
      }
      if (!this.popId) {
        this.popId = 'gPopup' + this.thisPopN
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', this.popId)
      } catch (error) {
        console.log(error)
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', this.popId)
      } catch (error) {
        console.log(error)
      }
    },

    openPop (params) {
      if (params.targetType === 'chanDetail') {
        this.goChanDetail(params)
        return
      }
      // console.log('hahahaha')
      console.log(params)
      this.popParams = params
      this.popShowYn = true
    },
    async parentClose (delyn) {
      await this.closePop(true)
      this.$emit('reloadPop', true)
      await this.closeXPop(true)
    },
    changePop (params) {
      this.$emit('parentClose')
    },
    /** 자식 팝업을 닫는 함수
     * @param {reloadYn} Boolean true 보내면 리로드 */
    async closePop (reloadYn) {
      reloadYn = false
      console.log('**** closePop ****')
      console.log(this.targetType)
      if (this.targetType === 'boardMain' || this.targetType === 'chanDetail' || this.targetType === 'followerManagement') reloadYn = true
      if (this.targetType === 'editMemberTypePop') {
        this.$refs.editMemberTypePop.refreshList()
      }
      this.popShowYn = false
      var gPopHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      gPopHistory = gPopHistory.filter((element, index) => index < gPopHistory.length - 1)
      this.$store.dispatch('D_HISTORY/AC_UPDATE_GPOP_STACK', gPopHistory)
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      if (reloadYn) {
        if (this.targetType === 'editBookList') {
          await this.$refs.editBookListComp.refresh()
        } else if (this.targetType === 'setMypage') {
          this.closeXPop()
        } else if (this.targetType === 'editManagerList') {
          await this.$refs.editManagerListComp.refresh()
        }
      }
    },
    toAlimFromBoard () {
      this.$emit('toAlimFromBoard')
    },
    toAlimThisPageClose () {
      this.$refs.gPopChanAlimList.toAlimFromBoard('P')
      this.popShowYn = false
    },
    showToastPop (msg) {
      setTimeout(() => {
        this.$showToastPop(msg)
      }, 500)
    },
    async successCreChan (params) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(params)
      if (params.deleteYn !== undefined && params.deleteYn !== null && params.deleteYn === true) {
        this.$emit('parentClose', true)
        setTimeout(() => {
          this.$showToastPop('채널이 삭제되었습니다.')
        }, 500)
      } else if (params.modiYn !== undefined && params.modiYn !== null && params.modiYn === true) {
        this.closeXPop()
        setTimeout(() => {
          this.$showToastPop('채널정보가 수정되었습니다.')
        }, 500)
      } else {
        setTimeout(() => {
          this.$showToastPop('채널이 생성되었습니다.')
        }, 500)
        this.$emit('closeNewPop', params)
      }
    },
    closeNewPop (newOpenParams) {
      this.$emit('closePop')
      this.openPop(newOpenParams)
    },
    closeAndNewPop (params) {
      this.closeXPop(true)
    },
    async channelMenuReload () {
      await this.$refs.chanMenuCompo.refresh()
    },
    async closeXPop (reloadYn) { // 내 팝업 닫기
      if (this.targetType === 'myChanMenuEdit') {
        this.$emit('channelMenuReload')
      }
      this.$emit('closePop', reloadYn)
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    async goChanDetail (detailValue) {
      console.log(' -- chanDetail Function -- ')
      // var currentPage = this.$store.getters['D_HISTORY/hCPage']
      // var indexOf = currentPage.indexOf('chanDetail')
      // if (indexOf !== -1) {
      //   if (this.propParams.targetKey === data.creTeamKey) {
      //     return
      //   }
      // }
      // // eslint-disable-next-line no-new-object
      // var param = new Object()
      // param.targetType = 'chanDetail'
      // param.targetKey = data.creTeamKey
      // param.nameMtext = data.nameMtext
      // param.chanName = data.nameMtext
      // if (data.contentsKey) {
      //   param.jobkindId = data.jobkindId
      //   param.targetContentsKey = data.contentsKey
      // }
      // // 세션에서 유저키 받아오기
      // if (data.creUserKey === this.GE_USER.userKey) {
      //   param.ownerYn = true
      // }

      var goChanDetailParam = {}
      goChanDetailParam.targetType = 'chanDetail'
      console.log(detailValue)
      var teamKey = detailValue.targetKey
      if (!teamKey && detailValue.creTeamKey) {
        teamKey = detailValue.creTeamKey
      }
      goChanDetailParam.teamKey = teamKey
      goChanDetailParam.targetKey = teamKey
      goChanDetailParam.nameMtext = detailValue.nameMtext
      goChanDetailParam.chanName = detailValue.nameMtext
      if (detailValue.contentsKey) {
        goChanDetailParam.jobkindId = detailValue.jobkindId
        goChanDetailParam.targetContentsKey = detailValue.contentsKey
      }
      // 세션에서 유저키 받아오기
      if (detailValue.creUserKey === this.GE_USER.userKey) {
        goChanDetailParam.ownerYn = true
      }

      console.log(detailValue)
      var paramMap = new Map()
      paramMap.set('teamKey', detailValue.targetKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      var result = await this.$getViewData({ url: 'service/tp.getChanMainBoard', param: Object.fromEntries(paramMap) }, false)
      if (!result || !result.data || !result.data.result || !result.data.result === 'NG') {
        alert('채널을 찾을 수 없습니다!')
        return
      }
      var teamDetail = result.data.team.content[0]
      var contentsList = result.data.contentsListPage.content
      await this.$addChanVuex([teamDetail])
      await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentsList)
      // eslint-disable-next-line no-new-object
      var initData = new Object()
      initData.team = teamDetail
      initData.contentsList = result.data.contentsListPage
      goChanDetailParam.initData = initData

      this.popParams = goChanDetailParam
      this.popShowYn = true
      // this.openPop(param)
    },
    async targetKeyYn (targetKey, jobkindId) {
      // var result = null
      var detail = await this.$getContentsOnly({ contentsKey: targetKey, jobkindId: jobkindId })
      if (detail.contentsList.length === 0) {
        return false
      } else {
        return detail.contentsList[0]
      }
    },
    async goDetail (detailValue) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var history = this.$store.getters['D_HISTORY/hStack']
      var currentPage = this.$store.getters['D_HISTORY/hCPage']
      var indexOf = null

      if (detailValue.chanYn) {
        this.goChanDetail(detailValue)
      } else {
        param.targetType = 'contentsDetail'
        indexOf = currentPage.indexOf('contentsDetail')
        if (indexOf !== -1) {
          if (this.propParams.targetKey === detailValue.contentsKey) {
            await this.$addContents(detailValue.contentsKey, detailValue.jobkindId)
            return
          }
        }
        // eslint-disable-next-line no-new-object
        var detailParam = new Object()
        detailParam.targetType = 'contentsDetail'
        detailParam.targetKey = detailValue.contentsKey
        // param.targetType = value.contentsKey
        if (detailValue.jobkindId === 'BOAR') {
          detailParam.cabinetKey = detailValue.cabinetKey
          detailParam.cabinetNameMtext = detailValue.cabinetNameMtext
          detailParam.popHeaderText = detailValue.cabinetNameMtext
        } else {
          detailParam.nameMtext = detailValue.nameMtext
          detailParam.teamName = detailValue.nameMtext
          detailParam.popHeaderText = detailValue.nameMtext
        }
        detailParam.contentsKey = detailValue.contentsKey
        detailParam.jobkindId = detailValue.jobkindId
        detailParam.teamKey = detailValue.creTeamKey
        detailParam.notiYn = true
        detailParam.value = detailValue

        this.openPop(detailParam)
      }
    },
    async getContentsMemoList (targetKey, memoKey, parentMemoKey) {
      var memo = {}
      memo.targetKind = 'C'
      memo.parentMemoKey = parentMemoKey
      memo.targetKey = targetKey
      memo.allMemoYn = true
      memo.memoKey = memoKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      }, true)
      var memos = result.data.memoList[0]
      return memos
    },
    async getContentsDetail (contentsKey, jobkindId) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.contentsKey = contentsKey
      param.jobkindId = jobkindId
      var resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      detailData.D_CONT_USER_DO = await this.settingUserDo(detailData.userDoList)

      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    async getFollowerList (teamKey, userKey, showProfileYn, managerYn) {
      var paramMap = new Map()
      if (this.axiosQueue.findIndex((item) => item === 'getFollowerList') !== -1) return
      this.axiosQueue.push('getFollowerList')
      paramMap.set('teamKey', teamKey)
      paramMap.set('userKey', userKey)
      if (showProfileYn) {
        paramMap.set('showProfileYn', showProfileYn)
      } else {
        if (managerYn) {
          paramMap.set('managerYn', managerYn)
        }
      }
      // paramMap.set('followerType', 'M')
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      }, true)
      var index = this.axiosQueue.findIndex((item) => item === 'getFollowerList')
      this.axiosQueue = this.axiosQueue.splice(index, 1)
      var user = result.data.content
      return user
    },
    goScrollTarget (targetKey) {
      this.notiScrollTarget = targetKey
    },
    async recvNotiFromMain (notiDetail, currentPop, vuexResultData) {
      if (currentPop && currentPop !== this.popId) {
        if (this.$refs.commonGPopWrap.recvNotiFromMain) {
          this.$refs.commonGPopWrap.recvNotiFromMain(notiDetail, currentPop, vuexResultData)
        }
        return
      }
      var notiUserDo = JSON.parse(notiDetail.userDo)
      // eslint-disable-next-line no-new-object
      var goDetailParam = new Object()
      goDetailParam.creTeamKey = Number(notiDetail.creTeamKey)
      if (notiUserDo.targetKind === 'CONT') {
        goDetailParam.contentsKey = notiUserDo.targetKey
        goDetailParam.targetKey = notiUserDo.targetKey
        goDetailParam.jobkindId = notiDetail.jobkindId
        if (goDetailParam.jobkindId === 'ALIM') {
          goDetailParam.chanName = vuexResultData.nameMtext
          goDetailParam.nameMtext = vuexResultData.nameMtext
        } else if (goDetailParam.jobkindId === 'BOAR') {
          goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
          goDetailParam.cabinetKey = vuexResultData.cabinetKey
        }
      } else if (notiUserDo.targetKind === 'CABI') {
        goDetailParam.contentsKey = notiUserDo.ISub
        goDetailParam.jobkindId = notiDetail.jobkindId
        if (goDetailParam.jobkindId === 'ALIM') {
          goDetailParam.nameMtext = vuexResultData.nameMtext
        } else if (goDetailParam.jobkindId === 'BOAR') {
          goDetailParam.cabinetNameMtext = vuexResultData.cabinetNameMtext
          goDetailParam.cabinetKey = vuexResultData.cabinetKey
        }
      } else if (notiUserDo.targetKind === 'TEAM') {
        // this.$router.replace({ path: '/' })
        goDetailParam.chanYn = true
        goDetailParam.targetKey = notiUserDo.targetKey
        // goDetailParam.chanName = vuexResultData.nameMtext
        // goDetailParam.nameMtext = vuexResultData.nameMtext
      }
      goDetailParam.notiYn = true
      // goDetailParam.value = vuexResultData
      if (notiUserDo.targetKind === 'TEAM') {
        this.goChanDetail(goDetailParam)
      } else if (notiUserDo.targetKind === 'CONT' || notiUserDo.targetKind === 'CABI') {
        this.goDetail(goDetailParam)
      }
    },
    async recvNoti (e) {
      // var message
      if (this.$isJsonString(e.data) === true) {
        // message = JSON.parse(e.data)
      } else {
        // message = e.data
      }
    }
  }
}
</script>

<style scoped>

/* .commonPopWrap{position: absolute;width: 100%;height: 100%;top: 0;z-index: 9999; background: #FFFFFF;} */
.commonPopWrap{position: absolute;width: 100%;height: 100%;top: 0;z-index: 99; background: #FFFFFF; overflow: hidden;}
.commonPopPushDetail{box-sizing: border-box;height: 100%;width: 100%;}
/* .commonPopPushDetail{box-sizing: border-box;height: 100%;width: 100%;padding-top: 50px;} */

.dNone{display: none;}

.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
