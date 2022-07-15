<template>
    <div id="gPopup" v-if="reloadYn===false" :style="this.targetType === 'writePush'? 'background: transparent' : ''" class="commonPopWrap" ref="commonWrap" >
      <loadingCompo style="z-index: 9999999;" v-show="loadingYn" />
      <pushPop @closePushPop="closePushPop" @openDetailPop="openDetailPop" v-if="notiDetailShowYn" :detailVal="notiDetail" />
      <transition name="showModal">
        <fullModal  @successWrite="successWriteBoard" @parentClose="parentClose" @addDirectAddMemList="addDirectAddMemList" @reloadPop="reloadPop" :style="getWindowSize" transition="showModal" :id="popId" ref="commonWrap" :headerTitle="this.newHeaderT" @selectedReceiverBookNMemberList='selectedReceiverBookNMemberList'
                                        @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.thisPopN" :params="this.popParams" :propData="this.params"/>
      </transition>
      <popHeader ref="gPopupHeader" :class="detailVal !== {} && (targetType === 'chanDetail' || targetType === 'boardMain' || targetType === 'boardDetail')? 'chanDetailPopHeader': ''" :chanName="this.chanName" :headerTitle="this.headerTitle" :chanAlimListTeamKey="chanAlimListTeamKey" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader" @sendOk="sendOkYn++" @openMenu='openChanMenuYn = true' :bgblack='bgblackYn' :memberDetailOpen='memberDetailOpen' @memberDetailClose='memberDetailOpen = false' :targetType='targetType' />
      <!-- <managerPopHeader ref="gPopupHeader" :class="{'chanDetailPopHeader': detailVal.length > 0}" :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/>
      -->
      <pushDetail @reloadParent="reloadParent" @closeLoading="this.loadingYn = false"  @openLoading="this.loadingYn = true"  :detailVal="this.detailVal" v-if="this.targetType === 'pushDetail'" class="commonPopPushDetail" @openPop = "openPop" />
      <chanAlimList ref="gPopChanAlimList"  @pageReload="reloadPop" @openLoading="this.loadingYn = true"  @closeLoading="this.loadingYn = false" :chanDetail="this.detailVal" v-if="this.targetType === 'chanDetail' " @openPop="openPop" @bgcolor='bgcolor' :refreshToken='refreshToken' />
      <div class="pagePaddingWrap" style="padding-top: 50px;" v-if="this.targetType === 'pushList'">
        <pushList :propData="this.params" :ref="'gPopPush'" :pushListAndDetailYn="pushListAndDetailYn" :popYn="true" :readySearhList="this.readySearchList" @openLoading="this.loadingYn = true" @closeLoading="this.loadingYn = false" @openPop="openPop" />
      </div>
      <pushBox @closeLoading="this.loadingYn = false" v-if="this.targetType === 'pushBox'" @openPop = "openPop"/>
      <div class="pagePaddingWrap" style="padding-top: 50px; position: relative;" v-if="this.targetType === 'chanList'">
        <chanList :propData="this.params" :popYn="true" @closeLoading="this.loadingYn = false" @openPop = "openPop"/>
      </div>
      <changeInfo @closeLoading="this.loadingYn = false" :kind="this.changInfoType" v-if="this.targetType === 'changeInfo'" />
      <askTal @closeLoading="this.loadingYn = false" v-if="this.targetType === 'askTal'" @closeXPop="closeXPop" @openPop = "openPop"/>
      <talInfo @closeLoading="this.loadingYn = false" v-if="this.targetType === 'theAlimInfo'" />
      <question @closeLoading="this.loadingYn = false" v-if="this.targetType === 'question'" @openPop = "openPop"/>
      <leaveTal @closeLoading="this.loadingYn = false" v-if="this.targetType === 'leaveTheAlim'" @closeXPop="closeXPop" />
      <createChannel  v-if="this.targetType === 'createChannel'" :chanDetail="this.params"  @closeXPop="closeXPop(true)"  @closeLoading="this.loadingYn = false" @successCreChan='successCreChan'/>
      <writePush ref="writePushCompo" v-if="this.targetType === 'writePush'" :params="this.params" @closeXPop="closeXPop" :sendOk='sendOkYn' @openPop='openPop' @changePop='changePop' />

      <selectBookList v-if="this.targetType === 'selectBookList'" :selectPopYn='true' :propData='this.params' @closeXPop='closeXPop' @openPop='openPop'  @sendReceivers='selectedReceiverBookNMemberList' />

      <chanMenu ref="chanMenuCompo" :propData="this.propParams" @openPop="openPop" :chanAlimListTeamKey="chanAlimListTeamKey" v-if='openChanMenuYn' @closePop='openChanMenuYn = false'  @openAddChanMenu='openAddChanMenuYn=true' :addChanList='addChanMenuList' @openItem='openChannelItem' @openBookDetail='openBookItem'/>

      <boardMain ref="boardMainPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if="this.targetType === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop"  @closeLoading="this.loadingYn = false" @openLoading="this.loadingYn = true"/>

      <boardDetail :propData="this.params" ref="boardDetailCompo" v-if="this.targetType === 'boardDetail'" @openPop="openPop" style="" :detailVal='this.params' @reloadParent='reloadParent' @closeXPop="closeXPop" />
      <editBookList ref="editBookListComp" @closeXPop="closeXPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if="this.targetType=== 'editBookList'" @openPop='openPop' @openDetailYn='openDetailYn' :memberDetailOpen='memberDetailOpen' />

      <editManagerList ref="editManagerListComp" :propData="this.params" @openPop="openPop" :managerOpenYn='true'   v-if="this.targetType=== 'editManagerList'" />
      <bookMemberDetail @addDirectAddMemList="addDirectAddMemList" @closeXPop="closeXPop" :propData="this.params" v-if="this.targetType=== 'bookMemberDetail'" />

      <boardWrite @closeXPop="closeXPop" @successWrite="successWriteBoard" @successSave="this.$refs.boardMainPop.getContentsList()" :propData="this.params" v-if="this.targetType=== 'writeBoard'" :sendOk='sendOkYn' @openPop='openPop' />
      <selectMemberPop  @openPop="openPop" ref="selectManagerCompo" :pSelectedList="params.pSelectedList" :propData="this.params" v-if="this.targetType=== 'selectMemberPop'" @closeXPop='closeXPop'  @sendReceivers='setManagerSelectedList' />
      <memberManagement :propData="this.params" ref="mamberManagementCompo" v-if="this.targetType === 'memberManagement'" @openPop='openPop'/>
      <selectAddressBookList :propData="this.params" v-if="this.targetType === 'selectAddressBookList'" @closeXPop='closeXPop' />
    </div>
</template>

<script>
import pushPop from '../push/Tal_pushDetailPopup.vue'
// eslint-disable-next-line
import pushDetail from '../../pageComponents/push/Tal_pushDetail.vue'
import changeInfo from '../info/Tal_changeInfo.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import pushBox from '../../pageComponents/push/Tal_pushBox.vue'
import chanList from '../../../pages/routerPages/Tal_chanList.vue'
import chanAlimList from '../../pageComponents/channel/Tal_chanAlimList.vue'
import askTal from '../info/Tal_askTheAlim.vue'
import talInfo from '../info/Tal_theAlimInfo.vue'
import question from '../info/Tal_question.vue'
import leaveTal from '../info/Tal_leaveTheAlim.vue'

// import selectChanType from './Tal_creChannelStep00.vue'
import createChannel from '../creChannel/Tal_creChannel.vue'
import writePush from '../../../pages/routerPages/admPages/TalAdm_writePush.vue'

import chanMenu from '../chanMenu/Tal_channelMenu.vue'
// import addChanMenu from '../popup/Tal_addChannelMenu.vue'

import boardMain from '../board/Tal_boardMain.vue'
import boardDetail from '../board/Tal_boardDetail.vue'
import editBookList from '../receiver/Tal_editBookList.vue'
import bookMemberDetail from '../receiver/Tal_bookMemberDetail.vue'
import editManagerList from '../receiver/Tal_selectManagerList.vue'
import boardWrite from '../board/Tal_boardWrite.vue'
import selectMemberPop from '../receiver/Tal_selectMemberPop.vue'

import selectBookList from '../receiver/Tal_selectBookList.vue'

import memberManagement from '../member/Tal_memberManagement.vue'
import selectAddressBookList from '../member/Tal_selectAddressBook.vue'
import loadingCompo from '../../layout/Tal_loading.vue'
export default {
  async created () {
    await this.settingPop()
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    /* this.$addHistoryStack('pop' + this.thisPopN) */
    localStorage.setItem('notiReloadPage', 'none')
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  data () {
    return {
      notiDetail: {},
      notiDetailShowYn: false,
      popId: '',
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
      selectedBookNMemberList: {}

    }
  },
  props: {
    params: {},
    // headerTitle: {},
    parentPopN: {}
  },
  components: {
    pushDetail,
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
    writePush,
    chanMenu,
    boardMain,
    boardDetail,
    editBookList,
    bookMemberDetail,
    boardWrite,
    pushPop,
    editManagerList,
    selectMemberPop,
    memberManagement,
    selectAddressBookList,
    selectBookList,
    loadingCompo
  },
  updated () {
  },
  computed: {
    historyStack () {
      return this.$store.getters.hStack
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    },
    deepLinkQueue () {
      return this.$store.getters.deepLinkQueue
    },
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters.hStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        this.closeXPop() // 혹시 모르니 일단 삭제
      } else {
        if (hStack[hStack.length - 1] === this.popId) {
          this.closeXPop()
        }
      }
    },
    deepLinkQueue (value, old) {
      var history = this.$store.getters.hStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
      } else {
        if (value.length > 0) {
          var target = value[value.length - 1]
          // eslint-disable-next-line no-new-object
          var param = new Object()
          param.targetType = target.targetKind
          param.targetKey = target.targetKey

          /* target.splice(0, 1)
          this.$store.commit('addDeepLinkQueue', target) */
          this.$store.commit('addDeepLinkQueue', [])
          this.openPop(param)
        }
      }
    },
    historyStack (value, old) {
      /* if (this.popId === value) {
        this.closeXPop()
      } */
    }
  },
  methods: {
    selectedReceiverBookNMemberList (param) {
      if (!param.emit) {
        param.emit = true
        this.$emit('selectedReceiverBookNMemberList', param)
        this.closeXPop()
      } else {
        this.$refs.writePushCompo.setSelectedList(param.data)
      }
    },
    async addDirectAddMemList (param) {
      if (this.targetType === 'bookMemberDetail') {
        this.$emit('addDirectAddMemList', param)
      } else {
        if (param.cabinetKey === undefined || param.cabinetKey === null || param.cabinetKey === '') {
          await this.$refs.mamberManagementCompo.addDirectly(param)
        } else {
          await this.$refs.selectManagerCompo.changeDirectMemList(param)
        }

        //           addDirectAddMemList
        // changeDirectMemList

        this.closePop()
      }
    },
    openDetailYn (bool) {
      this.memberDetailOpen = bool
    },
    bgcolor (data) {
      console.log(data)
      this.bgblackYn = data
    },
    openChannelItem (data) {
      // this.itemTitle = item
      if (data.targetType === 'boardMain') {
        this.openChanMenuYn = false
      } else {
        this.openChanMenuYn = true
      }
      this.openPop(data)
    },
    openBookItem (data) {
      // this.itemTitle = item
      this.openBookMenuYn = false
      this.openPop(data)
    },
    async reloadParent () {
      console.log(this.params)
      if (this.params.openActivity === 'chanAlimList') {
      } else {
        this.$emit('reloadPop')
      }
    },
    reloadPop (parentReloadYn) {
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
      if (this.targetType === 'writeBoard') {
        this.$emit('successWrite', inParam)
      } else {
        await this.closePop()
        this.openPop(inParam)
      }
    },
    BackPopClose (e) {
      this.closeXPop()
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
      if (this.targetType === 'pushDetail' || this.targetType === 'chanDetail') {
        this.detailVal = target
        this.popId = this.targetType + this.detailVal.targetKey || this.detailVal.contentsKey || this.detailVal.teamKey
        if (this.detailVal.value) {
          if (this.detailVal.value.nameMtext !== undefined && this.detailVal.value.nameMtext !== 'undefined' && this.detailVal.value.nameMtext !== null && this.detailVal.nameMtext !== '') {
            this.headerTitle = this.changeText(this.detailVal.value.nameMtext)
          } else {
            this.headerTitle = '상세'
          }
        }
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
        this.headerTitle = '문의하기'
      } else if (this.targetType === 'theAlimInfo') {
        this.headerTitle = '더알림이란?'
      } else if (this.targetType === 'changeMobile') {
        this.changInfoType = this.targetType
        this.targetType = 'changeInfo'
        this.headerTitle = '휴대폰 번호 수정'
      } else if (this.targetType === 'changeEmail') {
        this.targetType = 'changeInfo'
        this.changInfoType = this.targetType
        this.headerTitle = '이메일 수정'
      } else if (this.targetType === 'createChannel') {
        if (target.modiYn === true) {
          this.headerTitle = '채널 수정'
        } else {
          this.headerTitle = '채널 생성'
        }
      } else if (this.targetType === 'writePush') {
        this.headerTitle = '알림 작성'
      } else if (this.targetType === 'boardMain') {
        // this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext)
      } else if (this.targetType === 'editBookList') {
        this.headerTitle = '주소록 관리'
        this.chanName = this.propParams.teamNameMtext
      } else if (this.targetType === 'bookMemberDetail') {
        if (target.currentCabinetKey) {
          if (target.newMemYn) { this.headerTitle = '구성원 등록' } else { this.headerTitle = '구성원 상세' } // this.$changeText(this.params.value.userDispMtext)
        } else {
          this.headerTitle = '매니저 등록' // this.$changeText(this.params.value.userDispMtext)
        }
      } else if (this.targetType === 'writeBoard') {
        this.headerTitle = '게시글 작성'
      } else if (this.targetType === 'boardDetail') {
        this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext) || this.$changeText(this.params.cabinetNameMtext)
      } else if (this.targetType === 'editManagerList') {
        this.headerTitle = '매니저 관리'
        this.chanName = this.propParams.teamNameMtext
        // this.chanName = this.$changeText(this.propParams.teamNameMtext)
      } else if (this.targetType === 'selectMemberPop') {
        this.headerTitle = '멤버선택'
      } else if (this.targetType === 'memberManagement') {
        this.headerTitle = '멤버 관리'
      }

      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.thisPopN = Number(this.parentPopN) + 1
      } else {
        this.thisPopN = 100
      }
      if (this.popId === '') {
        this.popId = 'gPopup' + this.thisPopN
      }
      var history = this.$store.getters.hStack
      history.push(this.popId)
      this.$store.commit('updateStack', history)
      this.newHeaderT = '새로운 타이틀' + this.thisPopN
    },

    openPop (params) {
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
    async closePop (reloadYn) { // 자식 팝업닫기
      if (this.targetType === 'boardMain' || this.targetType === 'chanDetail') reloadYn = true

      this.popShowYn = false
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      if (reloadYn !== undefined && reloadYn !== null && (reloadYn === true || reloadYn === 'true')) {
        // eslint-disable-next-line no-unused-vars
        if (this.targetType === 'pushList' || this.targetType === 'chanList') {
          this.pushListAndDetailYn = false
          this.reloadYn = true
          setTimeout(() => {
            this.reloadYn = false
          }, 100)
          // this.reloadYn = false
        } else if (this.targetType === 'editBookList') {
          await this.$refs.editBookListComp.refresh()
        } else if (this.targetType === 'editManagerList') {
          /* if (this.params.selectMemberType = 'manager')
            await this.$refs.selectManagerCompo.refresh()
          else */
          await this.$refs.editManagerListComp.refresh()
        } else if (this.targetType === 'boardDetail') {
          /* if (this.params.selectMemberType = 'manager')
            await this.$refs.selectManagerCompo.refresh()
          else */

          this.$refs.boardDetailCompo.getContentsList()
        } else if (this.targetType === 'boardMain') {
          this.$refs.boardMainPop.getContentsList()
          await this.$refs.boardMainPop.refresh()
        } else if (this.targetType === 'chanDetail' && this.delyn !== true) {
          await this.$refs.gPopChanAlimList.refreshList()
          await this.$refs.chanMenuCompo.refresh()
        } else if (this.targetType === 'pushListAndDetail') {
          this.pushListAndDetailYn = false
        } else if (this.targetType === 'pushListAndDetail') {

        }
      }
    },
    successCreChan (params) {
      console.log('successCreChan params!!!')
      console.log(params)
      if (params.deleteYn === true && params.modiYn === true) {
        this.$emit('parentClose', true)

        // this.closeXPop()
        return
      }
      console.log('gPopWrap params!!!')
      console.log(params)
      if (params.modiYn !== undefined && params.modiYn !== null && params.modiYn === true) {
        this.$emit('reloadPop', true) // 부모페이지까지 리로드?
        this.closeXPop(true)
      } else {
        this.$emit('reloadPop')
        this.successChanParam = params
        this.settingPop(true)
      }
    },
    async closeXPop (reloadYn) { // 내 팝업 닫기
      if (this.targetType === 'pushDetail') {
      //   this.pushListAndDetailYn = false
        reloadYn = true
      }
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
    openDetailPop (params) {
      var setParams = params
      if (this.targetType === 'pushList') {
        setParams.targetType = 'pushDetail'
        this.openPop(setParams)
      } else {
        setParams.targetType = 'pushListAndDetail'
        this.openPop(setParams)
      }
      this.openPop(params)
      this.notiDetailShowYn = false
    },
    closePushPop () {
      this.notiDetailShowYn = false
    },
    recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
            this.systemName = localStorage.getItem('systemName')
          }
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          if (this.notiDetail.targetKind === 'CONT') {
            if (Number(this.notiDetail.creUserKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
              return
            }
            var currentPage = this.$store.getters.hCPage
            if (JSON.parse(message.pushMessage).arrivedYn === true || JSON.parse(message.pushMessage).arrivedYn === 'true') {
              if ((currentPage === 0 || currentPage === undefined)) {
              } else {
                if (this.targetType === 'chanDetail') {
                  if (this.chanAlimListTeamKey === Number(this.notiDetail.creTeamKey)) {
                    this.$refs.boardMainPop.refresh()
                  } else {
                    this.notiDetailShowYn = true
                  }
                } else if (this.targetType === 'writePush') {
                  return
                } else {
                  this.notiDetailShowYn = true
                }
              }
            } else {
              currentPage = this.$store.getters.hCPage
              if ((currentPage === 0 || currentPage === undefined)) {
              } else {
                if (this.targetType === 'pushList') {
                  this.openPop({ contentsKey: this.notiDetail.targetKey, targetType: 'pushDetail', value: this.notiDetail })
                } else {
                  this.openPop({ contentsKey: this.notiDetail.targetKey, targetKey: this.notiDetail.targetKey, targetType: 'pushListAndDetail', value: this.notiDetail })
                }
              }
            }
          } else if (this.notiDetail.targetKind === 'TEAM') {
            if (Number(this.notiDetail.creUserKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
              return
            }
            currentPage = this.$store.getters.hCPage
            if ((currentPage === 0 || currentPage === undefined)) {
            } else {
              this.$router.replace({ path: '/' })
              if (this.notiDetail.actType === 'FL') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              } else if (this.notiDetail.actType === 'ME' || this.notiDetail.actType === 'FM') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              } else if (this.notiDetail.actType === 'MA') {
                this.openPop({ targetKey: this.notiDetail.targetKey, targetType: 'chanDetail', value: this.notiDetail, pushOpenYn: true })
              }
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    }
  }
}
</script>

<style scoped>

.commonPopWrap{position: fixed;width: 100vw;height: 100vh;top: 0;z-index: 9999; background: #FFFFFF;}
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
