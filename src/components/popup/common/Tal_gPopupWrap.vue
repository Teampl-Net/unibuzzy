<template>
    <div id="gPopup" v-if="reloadYn===false" :style="this.targetType === 'writeContents'? 'background: transparent' : ''" class="commonPopWrap">
      <loadingCompo style="z-index: 999999999999999999999999999999999999999999999999999999999999 !important; position:absolute; top:0; left:0;" v-if="loadingYn" />
      <pushPop @closePushPop="closePushPop" @goChanDetail="goChanDetail" v-if="notiDetailShowYn" :detailVal="notiDetail"  />
      <transition name="showModal">
        <fullModal @goScrollTarget="goScrollTarget" @successWrite="successWriteBoard" @parentClose="parentClose" @addDirectAddMemList="addDirectAddMemList" @reloadPop="reloadPop" :style="getWindowSize" transition="showModal" :id="popId" ref="commonGPopWrap" :headerTitle="this.newHeaderT" @selectedReceiverBookNMemberList='selectedReceiverBookNMemberList'
                                        @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.thisPopN" :params="this.popParams" :propData="this.params" @toAlimFromBoard='toAlimThisPageClose' @saveCabinet='refreshCabinet' @channelMenuReload='channelMenuReload'
                                        />
      </transition>
      <popHeader  ref="gPopupHeader" :checkOfficialChanYn="this.propData" :helpYn="this.helpYn" :class="detailVal !== {} && (targetType === 'chanDetail' || targetType === 'boardMain' || targetType === 'boardDetail')? 'chanDetailPopHeader': ''" :chanName="this.chanName" :headerTitle="this.headerTitle" :chanAlimListTeamKey="chanAlimListTeamKey" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader" @sendOk="sendOkYn++"
      v-if="targetType !=='writeContents'" :followYn="this.headerFollowYn"
      @openMenu='openChanMenuYn = true' :bgblack='this.bgblackYn' :memberDetailOpen='memberDetailOpen' @memberDetailClose='memberDetailOpen = false' :targetType='targetType' />
      <!-- <managerPopHeader ref="gPopupHeader" :class="{'chanDetailPopHeader': detailVal.length > 0}" :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/> -->
      <!-- <pushDetail @reloadParent="reloadParent" @closeLoading="this.loadingYn = false"  @openLoading="this.loadingYn = true"  :detailVal="this.detailVal" v-if=" popId &&  this.targetType === 'pushDetail'" class="commonPopPushDetail" @openPop = "openPop" /> -->
      <chanAlimList :pPopId="popId" :notiScrollTarget="notiScrollTarget" ref="gPopChanAlimList"  @pageReload="reloadPop" @openLoading="this.loadingYn = true"  @closeLoading="this.loadingYn = false" :chanDetail="this.detailVal" v-if=" popId &&  this.targetType === 'chanDetail' && popId " @openPop="openPop" @bgcolor='setBgColor' @followYn="this.headerFollowYn = true" @showToastPop="showToastPop" />
      <!-- <chanAlimList ref="gPopChanAlimList"  @pageReload="reloadPop" @openLoading="this.$emit('openLoading')"  @closeLoading="this.$emit('closeLoading')" :chanDetail="this.detailVal" v-if=" popId &&  this.targetType === 'chanDetail' " @openPop="openPop" @bgcolor='bgcolor' :refreshToken='refreshToken' /> -->
      <div class="pagePaddingWrap" style="padding-top: 50px;" v-if=" popId &&  this.targetType === 'pushList'">
        <pushList :pPopId="popId" :propData="this.params" :ref="'gPopPush'" :pushListAndDetailYn="pushListAndDetailYn" :popYn="true" :readySearchList="this.readySearchList" @openPop="openPop" @showToastPop="showToastPop" @openUserProfile="openPop" />
      </div>
      <pushBox :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'pushBox'" @openPop = "openPop"/>
      <div class="pagePaddingWrap" style=" position: relative; padding: 48px 0.5rem 0 0.5rem; " v-if=" popId &&  this.targetType === 'chanList'">
        <chanList :pPopId="popId" :propData="this.params" ref="gPopChan" :popYn="true" @closeLoading="this.loadingYn = false" @openPop = "openPop"/>
      </div>
      <changeInfo :pPopId="popId" @closeLoading="this.loadingYn = false"  @successUpdate="successchangeUserInfo" :kind="this.changInfoType" v-if=" popId &&  this.targetType === 'changeInfo'" />
      <askTal :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'askTal'" @closeXPop="closeXPop" @openPop = "openPop" :propData='this.params' />
      <talInfo :pPopId="popId"  @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'theAlimInfo'" />
      <question :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'question'" @openPop = "openPop"/>
      <leaveTal :pPopId="popId" @closeLoading="this.loadingYn = false" v-if=" popId &&  this.targetType === 'leaveTheAlim'" @closeXPop="closeXPop" />
      <createChannel :pPopId="popId" v-if=" popId &&  this.targetType === 'createChannel'" :chanDetail="this.params"  @closeXPop="closeXPop(true)" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" @successCreChan='successCreChan'/>

      <writeContents :pPopId="popId" ref="writeContentsCompo" v-if="popId &&  this.targetType === 'writeContents'" :contentType="this.params.contentsJobkindId" :params="this.params" :propData="this.params" @closeXPop="closeXPop" :sendOk='sendOkYn' @openPop='openPop' @changePop='changePop' @toAlimFromBoard="toAlimFromBoard" />

      <!-- <boardWrite :pPopId="popId" @closeXPop="closeXPop" @successWrite="successWriteBoard" @successSave="this.$refs.boardMainPop.getContentsList()" :propData="this.params" v-if="this.targetType=== 'writeBoard'" :sendOk='sendOkYn' @openPop='openPop' /> -->

      <selectBookList :pPopId="popId" v-if=" popId &&  this.targetType === 'selectBookList'" :pSelectedList="params.pSelectedList" :selectPopYn='true' :propData='this.params' @closeXPop='closeXPop' @openPop='openPop'  @sendReceivers='selectedReceiverBookNMemberList' />

      <chanMenu :pPopId="popId" ref="chanMenuCompo" :propData="this.propParams" @openPop="openPop" :chanAlimListTeamKey="chanAlimListTeamKey" v-if='openChanMenuYn && popId' @closePop='openChanMenuYn = false'  @openAddChanMenu='openAddChanMenuYn=true' :addChanList='addChanMenuList' @openItem='openChannelItem' @openBookDetail='openBookItem'/>

      <boardMain :pPopId="popId" ref="boardMainPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if=" popId &&  this.targetType === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop"  @closeLoading="this.loadingYn = false" @openLoading="this.loadingYn = true"/>

      <boardDetail :pPopId="popId" @closeAndNewPop="closeAndNewPop" :propData="this.params" ref="boardDetailCompo" v-if=" popId &&  this.targetType === 'boardDetail' || this.targetType === 'pushDetail'" @openPop="openPop" :detailVal='this.params' @reloadParent='reloadParent' @closeXPop="closeXPop" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />
      <editBookList :pPopId="popId" ref="editBookListComp" @closeXPop="closeXPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if="this.targetType=== 'editBookList'" @openPop='openPop' @openDetailYn='openDetailYn' :memberDetailOpen='memberDetailOpen' @showToastPop="showToastPop"/>

      <editManagerList :pPopId="popId" ref="editManagerListComp" :propData="this.params" @openPop="openPop" :managerOpenYn='true'   v-if="this.targetType=== 'editManagerList'" />
      <bookMemberDetail :pPopId="popId" @openPop="openPop" @addDirectAddMemList="addDirectAddMemList" @closeXPop="closeXPop" @deleteManager='closeXPop' :propData="this.params" v-if="this.targetType=== 'bookMemberDetail'" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />
      <selectMemberPop :pPopId="popId"  @openPop="openPop" ref="selectManagerCompo" :pSelectedList="params.pSelectedList" :propData="this.params" v-if="this.targetType=== 'selectMemberPop'" @closeXPop='closeXPop' @saveCabinet='saveCabinet' />
      <!-- <followerManagement :propData="this.params" ref="mamberManagementCompo" v-if=" popId &&  this.targetType === 'followerManagement'" @openPop='openPop'/> -->
      <!-- <managerManagement :propData="this.params" ref="mamberManagementCompo" v-if=" popId &&  this.targetType === 'managerManagement'" @openPop='openPop'/> -->
      <memberManagement :pPopId="popId" :propData="this.params" ref="mamberManagementCompo" v-if=" popId &&  this.targetType === 'memberManagement'" @openPop='openPop'/>

      <selectAddressBookList :pPopId="popId" :propData="this.params" v-if=" popId &&  this.targetType === 'selectAddressBookList'" @closeXPop='closeXPop' />
      <div class="pagePaddingWrap" style="padding-top: 50px; position: relative;" v-if=" popId &&  this.targetType === 'setMypage'">
        <setMypage :pPopId="popId" v-if=" popId &&  this.targetType === 'setMypage'" @closeXPop="closeXPop" @openPop="openPop" />
      </div>
      <editMyChanMenu :pPopId="popId" v-if=" popId &&  this.targetType === 'myChanMenuEdit'" :propData="this.params" @openPop="openPop"  />
      <editBoardPop :pPopId="popId" v-if=" popId &&  this.targetType === 'editBoard'" :propData="this.params" @openPop="openPop" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" />

      <chanInfoComp :pPopId="popId" ref="gPopChanDetailRef" v-if=" popId &&  this.targetType === 'chanInfo'" :propData="this.params" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" @closeXPop="closeXPop" @changeshowProfileYn='changeshowProfileYn' @pageReload="reloadPop" @openPop="openPop" @changeFollowYn="changeFollowYn"  :parentshowProfileYn="showProfileYn" :adminYn="adminYn" :alimSubPopYn="alimListToDetail" :chanDetail="this.params.value" style="background-color: #fff;"></chanInfoComp>
      <autoAnswerList :pPopId="popId" v-if=" popId &&  this.targetType === 'autoAnswer'" :propData="this.params" @openPop="openPop"  />
      <memberForm :pPopId="popId" v-if=" popId &&  this.targetType === 'memberForm'" :propData="this.params" @closeXPop="closeXPop" @openPop="openPop" />
      <memberFormList :pPopId="popId" v-if=" popId &&  this.targetType === 'memberFormList'" :propData="this.params" @openPop="openPop" @closeXPop="closeXPop" />

      <memberFormPreView :pPopId="popId" v-if=" popId &&  this.targetType === 'mQPreview'" :propData="this.params" @openPop="openPop" />
      <errorPage :pPopId="popId" v-if=" popId &&  this.targetType === 'errorPage'" :propData="this.params" @openPop="openPop" />

      <creAddressBook :pPopId="popId" v-if=" popId &&  this.targetType === 'creAddressBook'" :propData="this.params" @openPop="openPop" @closePop="closePop" @closeXPop="closeXPop" @saveCabinet="saveCabinet" />
      <gConfirmPop :confirmText="errorText" confirmType='one' @no='failPopYn = false' v-if="failPopYn" style="z-index: 9999999999999999999999999999999999999999999999;"/>
    </div>
</template>

<script>
import pushPop from '../push/Tal_pushDetailPopup.vue'
// eslint-disable-next-line
import changeInfo from '../info/Tal_changeInfo.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import pushBox from '../../pageComponents/push/Tal_pushBox.vue'
import chanList from '../../../pages/routerPages/D_chanList.vue'
import chanAlimList from '../../pageComponents/channel/D_chanAlimList.vue'
import askTal from '../info/Tal_askTheAlim.vue'
import talInfo from '../info/Tal_theAlimInfo.vue'
import question from '../info/Tal_question.vue'
import leaveTal from '../info/Tal_leaveTheAlim.vue'

// import selectChanType from './Tal_creChannelStep00.vue'
import createChannel from '../creChannel/Tal_creChannel.vue'
import writeContents from '../D_writeContents.vue'

import chanMenu from '../chanMenu/Tal_channelMenu.vue'
// import addChanMenu from '../popup/Tal_addChannelMenu.vue'

import boardMain from '@/components/board/D_boardMain.vue'
import boardDetail from '@/components/common/D_contentsDetail.vue'
import editBookList from '../receiver/D_editBookList.vue'
import bookMemberDetail from '../receiver/Tal_bookMemberDetail.vue'
import editManagerList from '../receiver/Tal_selectManagerList.vue'
// import boardWrite from '@/components/board/Tal_boardWrite.vue'
import selectMemberPop from '../receiver/Tal_selectMemberPop.vue'

import selectBookList from '../receiver/Tal_selectBookList.vue'

import setMypage from '../../../pages/routerPages/Tal_setMypage.vue'
// import followerManagement from '../member/D_manageFollowerList.vue'
// import managerManagement from '../member/D_manageManagerList.vue'
import memberManagement from '../member/Tal_memberManagement.vue'

import selectAddressBookList from '../member/Tal_selectAddressBook.vue'
import loadingCompo from '../../layout/Tal_loading.vue'
import editBoardPop from '../D_editBoardList.vue'
import editMyChanMenu from '../../popup/chanMenu/Tal_editMyChanMenu.vue'
import chanInfoComp from '../../pageComponents/channel/Tal_chanDetail.vue'
import autoAnswerList from '../../popup/chanMenu/Tal_autoAnswerList.vue'

import memberForm from '../memberQuestion/Tal_editMemberForm.vue'
import memberFormList from '../memberQuestion/Tal_memberFormList.vue'
import memberFormPreView from '../memberQuestion/Tal_memberFormPreView.vue'

import errorPage from '../../popup/common/Tal_errorPage.vue'

import creAddressBook from '../receiver/D_creAddressBook.vue'

export default {
  async created () {
    await this.settingPop()
    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
    /* this.$addHistoryStack('pop' + this.thisPopN) */
    localStorage.setItem('notiReloadPage', 'none')
  },
  unmounted () {
    // document.removeEventListener('message', e => this.recvNoti(e))
    // window.removeEventListener('message', e => this.recvNoti(e))
  },
  data () {
    return {
      toAlimFromBoardYn: false,
      helpYn: false,
      notiDetail: {},
      notiDetailShowYn: false,
      popId: null,
      openBookMenuYn: false,
      openChanItemYn: false,
      openAddChanMenuYn: false,
      openChanMenuYn: false,
      reloadYn: false,
      makeTitle: 'aaaaa',
      popShowYn: false,
      targetType: '',
      // subPopShowYn: false,
      thisPopN: {},
      newHeaderT: '',
      headerTitle: '',
      pushListAndDetailYn: false,
      popParams: '',
      changInfoType: '',

      detailVal: {},

      chanFollowYn: false,
      readySearchList: {}, // chanDetail -> pushList 열때 필요
      successChanParam: {},
      sendOkYn: 0,
      // itemTitle: '',
      chanAlimListTeamKey: null, // 채널메인에서 header로 넘기는 teamKey  > 채널 게시판 매뉴 구현
      receiverList: {},
      bgblackYn: false,
      propParams: {},
      chanName: '',
      memberDetailOpen: false,
      refreshToken: 0,
      delyn: false,
      loadingYn: false,
      selectedBookNMemberList: {},
      headerFollowYn: false,
      axiosQueue: [],
      notiScrollTarget: null,
      errorText: '',
      failPopYn: false
    }
  },
  props: {
    params: {},
    // headerTitle: {},
    parentPopN: {}
  },
  components: {
    setMypage,
    /* pushDetail, */
    chanAlimList,
    pushList,
    chanList,
    changeInfo,
    pushBox,
    askTal,
    talInfo,
    question,
    leaveTal,
    createChannel,
    writeContents,
    chanMenu,
    boardMain,
    boardDetail,
    editBookList,
    bookMemberDetail,
    // boardWrite,
    pushPop,
    editManagerList,
    selectMemberPop,
    // followerManagement,
    // managerManagement,
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
    creAddressBook
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
          // alert(JSON.stringify(target))
          if (!target.targetKind || !(target.targetKind === 'chanDetail' || target.targetKind === 'pushDetail' || target.targetKind === 'boardDetail')) return
          param.targetType = target.targetKind
          param.creTeamKey = Number(target.targetKey)
          // alert(JSON.stringify(param))

          // eslint-disable-next-line no-debugger
          debugger
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
    setBgColor (param) {
      // alert(param)
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
      })
      // console.log(result)
      if (result.data.content.length > 0) {
        return true
      } else {
        return false
      }
    },
    selectedReceiverBookNMemberList (param) {
      // console.log('selectedReceiverBookNMemberList')
      // console.log(this.targetType)
      // console.log(param.data.memberList)
      console.log('***************************************')
      console.log(param)
      if (!param.emit) {
        param.emit = true
        this.$emit('selectedReceiverBookNMemberList', param)
        this.closeXPop()
      } else {
        if (this.targetType === 'chanDetail') {
          this.$refs.gPopChanAlimList.setSelectedList(param.data)
        } else {
          this.$refs.writeContentsCompo.setSelectedList(param.data)
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
    openDetailYn (bool) {
      this.memberDetailOpen = bool
    },
    openChannelItem (data) {
      /* if (data.targetType === 'boardMain') {
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.openChanMenuYn = false
      } else {
        this.openChanMenuYn = true
      } */
      this.openPop(data)
    },
    openBookItem (data) {
      // this.itemTitle = item
      this.openBookMenuYn = false
      this.openPop(data)
    },
    async reloadParent () {
      if (this.params.openActivity === 'chanAlimList') {
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
    // sendOk(){

    // },
    async successWriteBoard (inParam) {
      if (this.targetType === 'writeContent') {
        this.$emit('successWrite', inParam)
      } else {
        await this.closePop()
        this.openPop(inParam)
      }
    },
    BackPopClose (e) {
      this.closeXPop()
    },
    successchangeUserInfo () {
      this.closeXPop(true)
    },
    async settingPop (successChanYn) {
      this.chanFollowYn = false
      var target = this.params
      if (successChanYn === true) {
        target = this.successChanParam
      }
      this.propParams = target
      this.targetType = target.targetType
      // eslint-disable-next-line no-unused-vars
      // var tt = this.params
      if (this.targetType === 'pushDetail' || this.targetType === 'chanDetail' || this.targetType === 'boardDetail') {
        this.detailVal = target
        this.headerTitle = '상세'
        // var chan = this.$getDetail('TEAM', target.targetKey)
        // eslint-disable-next-line no-debugger
        debugger
        console.log()
        if (this.detailVal.notiYn) {
          if (this.detailVal.jobkindId === 'BOAR') {
            if (this.detailVal.cabinetNameMtext) {
              this.headerTitle = this.changeText(this.detailVal.cabinetNameMtext)
            }
          } else if (this.detailVal.jobkindId === 'ALIM') {
            if (this.detailVal.nameMtext) {
              this.headerTitle = this.changeText(this.detailVal.nameMtext)
            }
          }
        } else {
          if (this.detailVal.value) {
            if (this.detailVal.value.nameMtext !== undefined && this.detailVal.value.nameMtext !== 'undefined' && this.detailVal.value.nameMtext !== null && this.detailVal.nameMtext !== '') {
              this.headerTitle = this.changeText(this.detailVal.value.nameMtext)
            }
            if (this.detailVal.jobkindId && this.detailVal.jobkindId === 'BOAR' && this.detailVal.value.cabinetNameMtext) {
              this.headerTitle = this.changeText(this.detailVal.value.cabinetNameMtext)
            }
          }
        }
        console.log('popId만듦-----------------------------------------------------------------')
        console.log(this.detailVal)
        this.popId = this.targetType + this.detailVal.contentsKey || this.detailVal.targetKey || this.detailVal.teamKey

        if (this.targetType === 'chanDetail') {
          this.headerTitle = ''
          this.chanAlimListTeamKey = target.targetKey || target.teamKey
        }
      } else if (this.targetType === 'pushListAndDetail') {
        this.pushListAndDetailYn = true
        this.targetType = 'pushList'
        this.headerTitle = '알림'
      } else if (this.targetType === 'pushList') {
        this.headerTitle = '알림'
        if (target.readySearchList !== undefined && target.readySearchList !== null && target.readySearchList !== '') {
          this.readySearchList = target.readySearchList
        }
      } else if (this.targetType === 'chanList') {
        this.headerTitle = '채널'
      } else if (this.targetType === 'pushBox') {
        this.headerTitle = '알림함'
      } else if (this.targetType === 'leaveTheAlim') {
        this.headerTitle = '탈퇴'
      } else if (this.targetType === 'question') {
        this.headerTitle = '자주 찾는 질문'
      } else if (this.targetType === 'qna') {
        this.headerTitle = 'Q&A'
      } else if (this.targetType === 'askTal') {
        if (target.jobKind === 'QUES') this.headerTitle = '문의하기'
        if (target.jobKind === 'ERRO') this.headerTitle = '오류접수'
      } else if (this.targetType === 'theAlimInfo') {
        this.headerTitle = '더알림이란?'
      } else if (this.targetType === 'changeMobile') {
        this.changInfoType = this.targetType
        this.targetType = 'changeInfo'
        this.headerTitle = '휴대폰 번호 수정'
      } else if (this.targetType === 'changeEmail') {
        this.changInfoType = this.targetType
        this.targetType = 'changeInfo'
        this.headerTitle = '이메일 수정'
      } else if (this.targetType === 'createChannel') {
        if (target.modiYn === true) {
          this.headerTitle = '채널 수정'
        } else {
          this.headerTitle = '채널 생성'
        }
      } else if (this.targetType === 'writeContents') {
        // this.headerTitle = '게시글 작성'
        // this.headerTitle = '알림 작성'
      } else if (this.targetType === 'boardMain') {
        // this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext)
      } else if (this.targetType === 'editBookList') {
        this.headerTitle = '주소록 관리'
        this.chanName = this.propParams.teamNameMtext
        this.helpYn = true
      } else if (this.targetType === 'bookMemberDetail') {
        if (target.currentCabinetKey) {
          // if (target.newMemYn) { this.headerTitle = '구성원 등록' } else { this.headerTitle = '구성원 상세' } // this.$changeText(this.params.value.userDispMtext)
          if (target.newMemYn) { this.headerTitle = '등록' } else { this.headerTitle = '상세' } // this.$changeText(this.params.value.userDispMtext)
        } else {
          if (target.selfYn === true) {
            this.headerTitle = '내 정보'
          } else {
            if (target.contentOpenYn === true) {
              this.headerTitle = '매니저 정보'
            } else {
              if (!target.managerKey) {
                this.headerTitle = '매니저 등록' // this.$changeText(this.params.value.userDispMtext)
              } else {
                this.headerTitle = '매니저 수정'
              }
            }
          }
        }
      // } else if (this.targetType === 'writeBoard') {
      //   this.headerTitle = '게시글 작성'
      } else if (this.targetType === 'boardDetail') {
        if (this.params.value) {
          this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext) || this.$changeText(this.params.cabinetNameMtext)
        } else {
          this.headerTitle = this.$changeText(this.params.cabinetNameMtext)
        }
      } else if (this.targetType === 'editManagerList') {
        this.headerTitle = '매니저 관리'
        this.chanName = this.propParams.teamNameMtext
        // this.chanName = this.$changeText(this.propParams.teamNameMtext)
      } else if (this.targetType === 'selectMemberPop') {
        // eslint-disable-next-line no-unused-vars
        if (target.cabinetNameMtext) {
          this.headerTitle = target.cabinetNameMtext + '에 추가할 유저'
        } else {
          this.headerTitle = '대상 선택'
        }
      } else if (this.targetType === 'followerManagement') {
        this.headerTitle = '멤버 관리'
        this.helpYn = true
      // } else if (this.targetType === 'managerManagement') {
      } else if (this.targetType === 'memberManagement') {
        this.headerTitle = '매니저 관리'
        this.helpYn = true
      } else if (this.targetType === 'editBoard') {
        this.headerTitle = '게시판 관리'
      } else if (this.targetType === 'myChanMenuEdit') {
        this.headerTitle = '채널 관리'
      } else if (this.targetType === 'chanInfo') {
        this.headerTitle = '채널 상세'
      } else if (this.targetType === 'autoAnswer') {
        this.headerTitle = '자동 응답'
      } else if (this.targetType === 'memberForm') {
        this.headerTitle = '공개신청서 만들기'
      } else if (this.targetType === 'setMypage') {
        this.headerTitle = '프로필 설정'
      } else if (this.targetType === 'memberFormList') {
        this.headerTitle = '공개신청서 목록'
      } else if (this.targetType === 'templateList') {
        this.headerTitle = '공개신청서 템플릿 목록'
      } else if (this.targetType === 'mQPreview') {
        this.headerTitle = '공개신청서 미리보기'
      } else if (this.targetType === 'creAddressBook') {
        if (target.newAddressYn === true) {
          this.headerTitle = '주소록 만들기'
        } else {
          this.headerTitle = '주소록 수정'
        }
      }

      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.thisPopN = Number(this.parentPopN) + 1
      } else {
        this.thisPopN = 100
      }
      if (!this.popId) {
        this.popId = 'gPopup' + this.thisPopN
      }
      console.log('----------팝업 추가-----------')
      console.log(this.popId)
      var gPopHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      gPopHistory.push(this.popId)
      console.log('----------현재팝업은-----------')
      console.log(gPopHistory)
      this.$store.dispatch('D_HISTORY/AC_UPDATE_GPOP_STACK', gPopHistory)
      var history = this.$store.getters['D_HISTORY/hStack']
      history.push(this.popId)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.newHeaderT = '새로운 타이틀' + this.thisPopN
    },

    openPop (params) {
      // console.log('hahahaha')
      // console.log(params)
      this.popParams = params
      this.popShowYn = true
    },
    async parentClose (delyn) {
      this.delyn = delyn
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
        // eslint-disable-next-line no-unused-vars
        /* if (this.targetType === 'pushList' || this.targetType === 'chanList') {
          this.pushListAndDetailYn = false
          this.reloadYn = true
          setTimeout(() => {
            this.reloadYn = false
          }, 100)
          if (this.targetType === 'pushList') {
            this.$refs.gPopChan.refreshList()
          } else if (this.targetType === 'chanList') {
            this.$refs.gPopPush.refreshList()
          }
          // this.reloadYn = false
        } else  */if (this.targetType === 'editBookList') {
          await this.$refs.editBookListComp.refresh()
        } else if (this.targetType === 'setMypage') {
          this.closeXPop()
        } else if (this.targetType === 'editManagerList') {
          /* if (this.params.selectMemberType = 'manager')
            await this.$refs.selectManagerCompo.refresh()
          else */
          await this.$refs.editManagerListComp.refresh()
        } else if (this.targetType === 'pushListAndDetail') {
          this.pushListAndDetailYn = false
        } /* else if (this.targetType === 'followerManagement') {
          // getManagingList
          // await this.$refs.mamberManagementCompo.changeTab('Admin')
          await this.$refs.mamberManagementCompo.refresh()
          // await this.$refs.mamberManagementCompo.getManagingList()
        } */
      }
      /* } */
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
    successCreChan (params) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
      console.log(params)
      // eslint-disable-next-line no-debugger
      debugger
      if (params.deleteYn !== undefined && params.deleteYn !== null && params.deleteYn === true) {
        this.$emit('parentClose', true)
        setTimeout(() => {
          this.$showToastPop('채널이 삭제되었습니다.')
        }, 500)
        // this.closeXPop()
      } else if (params.modiYn !== undefined && params.modiYn !== null && params.modiYn === true) {
        // this.$emit('reloadPop', true) // 부모페이지까지 리로드?
        this.closeXPop()
        setTimeout(() => {
          this.$showToastPop('채널정보가 수정되었습니다.')
        }, 500)
      } else {
        setTimeout(() => {
          this.$showToastPop('채널이 생성되었습니다.')
        }, 500)
        this.$emit('reloadPop')
        this.successChanParam = params
        this.settingPop(true)
      }
    },
    closeAndNewPop (params) {
      // eslint-disable-next-line no-new-object
      /* var param = new Object()
      param.targetType = 'boardMain'
      param.tagetKey = params.cabinetKey
      this.successChanParam = param
      this.settingPop(true) */
      this.closeXPop(true)
    },
    async channelMenuReload () {
      await this.$refs.chanMenuCompo.refresh()
    },
    async closeXPop (reloadYn) { // 내 팝업 닫기
      if (this.targetType === 'myChanMenuEdit') {
        this.$emit('channelMenuReload')
      }
      // if (this.targetType === 'pushDetail') {
      // //   this.pushListAndDetailYn = false
      //   reloadYn = true
      // }
      this.$emit('closePop', reloadYn)
    },
    // sucssesCreChan(){
    //   if (localStorage.getItem('curentPage') === 'pop' + this.thisPopN) {
    //     this.$emit('closePop', reloadYn)
    //   }
    // }
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    // openDetailPop (params) {
    //   var setParams = params
    //   if (this.targetType === 'pushList') {
    //     setParams.targetType = 'pushDetail'
    //     this.openPop(setParams)
    //   } else {
    //     this.openPop(params)
    //   }
    //   this.openPop(params)
    //   setTimeout(() => {
    //     this.notiDetailShowYn = false
    //   }, 200)
    // },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    goChanDetail (data) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (data.targetType === 'chanDetail') {
        param.targetType = 'chanDetail'
        param.teamKey = data.creTeamKey
        param.targetKey = data.creTeamKey
        param.nameMtext = data.nameMtext
        param.chanName = data.nameMtext
        if (data.contentsKey) {
          param.jobkindId = data.jobkindId
          param.targetContentsKey = data.contentsKey
        }
        // 세션에서 유저키 받아오기
        if (data.creUserKey === this.GE_USER.userKey) {
          param.ownerYn = true
        }
      }
      this.openPop(param)
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
    async goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var history = this.$store.getters['D_HISTORY/hStack']
      var currentPage = this.$store.getters['D_HISTORY/hCPage']
      var indexOf = null
      if (currentPage === this.popId) {

      }
      console.log(this.popId)
      if (value.jobkindId === 'ALIM') {
        param.targetType = 'pushDetail'
        indexOf = currentPage.indexOf('pushDetail')
      } else {
        param.targetType = 'boardDetail'
        indexOf = currentPage.indexOf('boardDetail')
      }
      console.log(this.params)
      console.log(value)
      if (indexOf !== -1) {
        //  if (this.params.targetKey === value.contentsKey) {
        if (this.params.contentsKey === undefined || this.params.contentsKey === null || this.params.contentsKey === '' ||
         value.contentsKey === undefined || value.contentsKey === null || value.contentsKey === '') {
          return
        }
        console.log(this.params.contentsKey + '**' + value.contentsKey)
        if (this.params.contentsKey === value.contentsKey) {
          await this.$addContents(value.contentsKey, value.jobkindId)
          return
          // alert('같은 컨텐츠')
        } else {
          // alert('다른 컨텐츠')
        }
      }
      var targetYn = await this.targetKeyYn(value.contentsKey, value.jobkindId)
      console.log('과연??있나요?' + targetYn)
      // eslint-disable-next-line no-debugger
      debugger
      if (targetYn !== false && targetYn !== 'false') {
        param.targetKey = value.contentsKey
        // param.targetType = value.contentsKey
        if (value.jobkindId === 'BOAR') {
          param.cabinetKey = targetYn.cabinetKey
          param.cabinetNameMtext = targetYn.cabinetNameMtext
        } else {
          param.nameMtext = targetYn.nameMtext
          param.teamName = targetYn.nameMtext
        }
        param.contentsKey = value.contentsKey
        param.jobkindId = value.jobkindId
        param.teamKey = value.creTeamKey
        param.value = value
        param.notiYn = true
        this.openPop(param)
      } else {
        this.errorText = '해당 컨텐츠가 삭제되었거나 열람권한이 없습니다'
        this.failPopYn = true
      }
    },
    /* goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (value.jobkindId === 'ALIM') {
        param.targetType = 'pushDetail'
      } else {
        param.targetType = 'boardDetail'
      }
      param.targetKey = value.contentsKey
      param.contentsKey = value.contentsKey
      param.teamKey = value.creTeamKey
      param.value = value
      this.openPop(param)
    }, */
    async getContentsMemoList (targetKey, memoKey, parentMemoKey) {
      var memo = {}
      memo.targetKind = 'C'
      memo.parentMemoKey = parentMemoKey
      memo.targetKey = targetKey
      memo.memoKey = memoKey

      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      })
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
      })
      var index = this.axiosQueue.findIndex((item) => item === 'getFollowerList')
      this.axiosQueue = this.axiosQueue.splice(index, 1)
      var user = result.data.content
      return user
    },
    goScrollTarget (targetKey) {
      this.notiScrollTarget = targetKey
    },
    async recvNotiFromMain (notiDetail, arrivedYn) {
      var popHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      var currentPop = popHistory[popHistory.length - 1]
      console.log(this.popId, '***', currentPop)
      if (currentPop !== this.popId) {
        if (this.$refs.commonGPopWrap.recvNotiFromMain) {
          this.$refs.commonGPopWrap.recvNotiFromMain(notiDetail, arrivedYn)
        }
        return
      }
      if (JSON.parse(notiDetail.userDo).targetKind === 'CONT') {
        if (Number(JSON.parse(notiDetail.userDo).userKey) === this.GE_USER.userKey) {
          return
        }
        if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
          if (arrivedYn === true || arrivedYn === 'true') {
            /* var memo = await this.getContentsMemoList(Number(JSON.parse(notiDetail.userDo).targetKey), Number(JSON.parse(notiDetail.userDo).ISub))
            memo.jobkindId = notiDetail.jobkindId
            memo.creTeamKey = Number(notiDetail.creTeamKey)
            await this.$store.commit('D_CHANNEL/MU_REPLACE_NEW_MEMO', memo) */
          } else {
            /* if (this.chanAlimListTeamKey === Number(notiDetail.creTeamKey)) {
                  console.log(Number(JSON.parse(notiDetail.userDo).targetKey), notiDetail.jobkindId)
                  await this.$refs.gPopChanAlimList.targetContentScrollMove(Number(JSON.parse(notiDetail.userDo).targetKey), notiDetail.jobkindId)
                  await this.$refs.gPopChanAlimList.setNotiScroll(Number(JSON.parse(notiDetail.userDo).targetKey), notiDetail.jobkindId)
                  // param.targetContentsKey
                } else {
                  if (currentPage !== this.popId) return
                  if (notiDetail.jobkindId === 'ALIM') {
                    this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), jobkindId: notiDetail.jobkindId, creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
                  } else if (notiDetail.jobkindId === 'BOAR') {
                    this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), creTeamKey: Number(notiDetail.creTeamKey), jobkindId: notiDetail.jobkindId, targetType: 'chanDetail' })
                    // this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, jobkindId: notiDetail.jobkindId, targetType: 'boardDetail' })
                  }
                } */
            /* if (currentPage !== this.popId) {
                    if (currentPage.findIndex((item) => item === 'write') === -1) return
                    return
                } */
            if (notiDetail.jobkindId === 'ALIM') {
              this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), jobkindId: notiDetail.jobkindId, creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
            } else if (notiDetail.jobkindId === 'BOAR') {
              this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), creTeamKey: Number(notiDetail.creTeamKey), jobkindId: notiDetail.jobkindId, targetType: 'chanDetail' })
              // this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, jobkindId: notiDetail.jobkindId, targetType: 'boardDetail' })
            }
          }
        } else {
          if (arrivedYn === true || arrivedYn === 'true') {
          } else {
            this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), jobkindId: notiDetail.jobkindId, creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
          }
        }
      } else if (JSON.parse(notiDetail.userDo).targetKind === 'CABI') {
        if (Number(JSON.parse(notiDetail.userDo).userKey) === Number(this.GE_USER.userKey)) {
          return
        }
        if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
          if (arrivedYn === true || arrivedYn === 'true') {
            ;
          } else {
            this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).ISub), creTeamKey: Number(notiDetail.creTeamKey), jobkindId: notiDetail.jobkindId, targetType: 'chanDetail' })
            // this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).ISub), cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, jobkindId: notiDetail.jobkindId, targetType: 'boardDetail' })
          }
        }
      } else if (JSON.parse(notiDetail.userDo).targetKind === 'TEAM') {
        if (arrivedYn === true || arrivedYn === 'true') {
        } else {
          /* if (this.chanAlimListTeamKey === Number(notiDetail.creTeamKey)) {
                return
              } */
          if (notiDetail.actType === 'FL' || notiDetail.actType === 'RQ' || notiDetail.actType === 'AP') {
            this.goDetail({ targetKey: Number(JSON.parse(notiDetail.userDo).targetKey), creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
          } else if (notiDetail.actType === 'ME' || notiDetail.actType === 'FM') {
            this.goDetail({ targetKey: Number(JSON.parse(notiDetail.userDo).targetKey), creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
          } else if (notiDetail.actType === 'MA') {
            this.goDetail({ targetKey: Number(JSON.parse(notiDetail.userDo).targetKey), creTeamKey: Number(notiDetail.creTeamKey), targetType: 'chanDetail' })
          }
        }
      } else if (JSON.parse(notiDetail.userDo).targetKind === 'MEMO') {
        if (notiDetail.actYn === true || notiDetail.actYn === 'true') {
          var memo_ = await this.getContentsMemoList(null, Number(JSON.parse(notiDetail.userDo).ISub), Number(JSON.parse(notiDetail.userDo).targetKey))
          if (arrivedYn === true || arrivedYn === 'true') {
            memo_.jobkindId = notiDetail.jobkindId
            memo_.creTeamKey = Number(notiDetail.creTeamKey)
            // await this.$store.commit('D_CHANNEL/MU_REPLACE_NEW_MEMO', memo_)
          } else {
            if (notiDetail.jobkindId === 'ALIM') {
              this.goDetail({ contentsKey: memo_.targetKey, creTeamKey: Number(notiDetail.creTeamKey), jobkindId: notiDetail.jobkindId, targetType: 'chanDetail' })
            } else if (notiDetail.jobkindId === 'BOAR') {
              this.goDetail({ contentsKey: memo_.targetKey, creTeamKey: Number(notiDetail.creTeamKey), jobkindId: notiDetail.jobkindId, targetType: 'chanDetail' })
              // this.goDetail({ contentsKey: Number(JSON.parse(notiDetail.userDo).targetKey), cabinetNameMtext: JSON.parse(notiDetail.userDo).targetName, jobkindId: notiDetail.jobkindId, targetType: 'boardDetail' })
            }
          }
        }
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
.commonPopWrap{position: absolute;width: 100%;height: 100%;top: 0;z-index: 9999; background: #FFFFFF; overflow: hidden;}
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
