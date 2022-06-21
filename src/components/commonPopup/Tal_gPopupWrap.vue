<template>
    <div id="gPopup" v-if="reloadYn===false" :style="this.targetType === 'writePush'? 'background: transparent' : ''" class="commonPopWrap" ref="commonWrap" >
      <transition name="showModal">
        <fullModal @reloadPop="reloadPop" :style="getWindowSize" transition="showModal" :id="popId" ref="commonWrap" :headerTitle="this.newHeaderT"
                                        @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.thisPopN" :params="this.popParams" :propData="this.params"/>
      </transition>
      <popHeader ref="gPopupHeader" :class="detailVal !== {} && (targetType === 'chanDetail' || targetType === 'boardMain' || targetType === 'boardDetail')? 'chanDetailPopHeader': ''" :headerTitle="this.headerTitle" :chanAlimListTeamKey="chanAlimListTeamKey" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader" @sendOk="sendOkYn++" @openMenu='openChanMenuYn = true' />
      <!-- <managerPopHeader ref="gPopupHeader" :class="{'chanDetailPopHeader': detailVal.length > 0}" :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/>
       -->
      <pushDetail @reloadParent="reloadParent" @closeLoading="this.$emit('closeLoading')"  @openLoading="this.$emit('openLoading')"  :detailVal="this.detailVal" v-if="this.targetType === 'pushDetail'" class="commonPopPushDetail" @openPop = "openPop"/>
      <chanAlimList :ref="'gPopDetail'" @closeLoading="this.$emit('closeLoading')" @openLoading="this.$emit('openLoading')" :chanDetail="this.detailVal" v-if="this.targetType === 'chanDetail' " @openPop="openPop"/>
      <div class="pagePaddingWrap" style="padding-top: 35px;" v-if="this.targetType === 'pushList'">
        <pushList :propData="this.params" :ref="'gPopPush'" :notiTargetKey="notiTargetKey" :popYn="true" :readySearhList="this.readySearchList" @closeLoading="this.$emit('closeLoading')" @openPop = "openPop" />
      </div>
      <pushBox @closeLoading="this.$emit('closeLoading')" v-if="this.targetType === 'pushBox'" @openPop = "openPop"/>
      <div class="pagePaddingWrap" style="padding-top: 35px;" v-if="this.targetType === 'chanList'">
        <chanList :popYn="true" @closeLoading="this.$emit('closeLoading')" @openPop = "openPop"/>
      </div>
      <changeInfo @closeLoading="this.$emit('closeLoading')" :kind="this.changInfoType" v-if="this.targetType === 'changeInfo'" />
      <askTal @closeLoading="this.$emit('closeLoading')" v-if="this.targetType === 'askTal'" @closeXPop="closeXPop" @openPop = "openPop"/>
      <talInfo @closeLoading="this.$emit('closeLoading')" v-if="this.targetType === 'theAlimInfo'" />
      <question @closeLoading="this.$emit('closeLoading')" v-if="this.targetType === 'question'" @openPop = "openPop"/>
      <leaveTal @closeLoading="this.$emit('closeLoading')" v-if="this.targetType === 'leaveTheAlim'" @closeXPop="closeXPop" />
      <createChannel  v-if="this.targetType === 'createChannel'" :chanDetail="this.params"  @closeXPop="closeXPop(true)"  @closeLoading="this.$emit('closeLoading')" @successCreChan='successCreChan'/>
      <writePush v-if="this.targetType === 'writePush'" :params="this.params" @closeXPop="closeXPop" :sendOk='sendOkYn' @openPop='openPop'  />

      <chanMenu :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if='openChanMenuYn' @closePop='openChanMenuYn = false' @openAddChanMenu='openAddChanMenuYn=true' :addChanList='addChanMenuList' @openItem='openChannelItem' @openBookDetail='openBookItem'/>
      <boardMain ref="boardMainPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if="this.targetType === 'boardMain'" @openPop='openPop' @closeXPop="closeXPop" />

      <boardDetail :propData="this.params"  v-if="this.targetType === 'boardDetail'" style="" :detailVal='params'/>
      <editBookList @closeXPop="closeXPop" :propData="this.params" :chanAlimListTeamKey="chanAlimListTeamKey" v-if="this.targetType=== 'editBookList'" @openPop='openPop' />

      <bookMemberDetail @closeXPop="closeXPop" :propData="this.params" v-if="this.targetType=== 'bookMemberDetail'" />

      <boardWrite @closeXPop="closeXPop" @successSave="this.$refs.boardMainPop.getContentsList()" :propData="this.params" v-if="this.targetType=== 'writeBoard'" :sendOk='sendOkYn' @openPop='openPop' />

    </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import pushDetail from './components/Tal_pushDetail.vue'
import changeInfo from './components/Tal_changeInfo.vue'
import pushList from '../../pages/routerPages/Tal_pushList.vue'
import pushBox from './components/Tal_pushBox.vue'
import chanList from '../../pages/routerPages/Tal_chanList.vue'
import chanAlimList from './components/Tal_chanAlimList.vue'
import askTal from './components/Tal_askTheAlim.vue'
import talInfo from './components/Tal_theAlimInfo.vue'
import question from './components/Tal_question.vue'
import leaveTal from './components/Tal_leaveTheAlim.vue'

// import selectChanType from './Tal_creChannelStep00.vue'
import createChannel from '../popup/creChannel/Tal_creChannel.vue'
import writePush from '../../pages/routerPages/admPages/TalAdm_writePush.vue'


import chanMenu from '../popup/chanMenu/Tal_channelMenu.vue'
// import addChanMenu from '../popup/Tal_addChannelMenu.vue'

import boardMain from '../popup/board/Tal_boardMain.vue'
import boardDetail from '../popup/board/Tal_boardDetail.vue'
import editBookList from '../popup/receiver/Tal_editBookList.vue'
import bookMemberDetail from '../popup/receiver/Tal_bookMemberDetail.vue'

import boardWrite from '../popup/board/Tal_boardWrite.vue'
export default {
  async created() {
    await this.settingPop()
    /* this.$addHistoryStack('pop' + this.thisPopN) */
    localStorage.setItem('notiReloadPage', 'none')
  },
  data () {
    return {
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
      notiTargetKey: '',
      popParams: '',
      changInfoType: '',

      detailVal: {},

      chanFollowYn: false,
      readySearchList: {}, // chanDetail -> pushList 열때 필요
      successChanParam: {},
      sendOkYn: 0,

      // itemTitle: '',
      chanAlimListTeamKey: null, // 채널메인에서 header로 넘기는 teamKey  > 채널 게시판 매뉴 구현
      receiverList: {}
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
    boardWrite
  },
  updated () {
  },
  computed: {
    historyStack () {
      return this.$store.getters.hRPage
    },
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    }
  },
  watch: {
    historyStack (value, old) {
      // alert(value + '"""""' + this.popId)
      // alert(value[value.length - 1] + 'test' + this.popId)
      if (this.popId === value) {
        // alert(true)
        // alert(true)
        this.closeXPop()
      }
      /* alert(val + oldVal) */
    }
  },
  methods: {

    openChannelItem (data) {
      // this.itemTitle = item
      this.openChanMenuYn = false
      this.openPop(data)
    },
    openBookItem (data) {
      // this.itemTitle = item
      this.openBookMenuYn = false
      this.openPop(data)
    },
    reloadParent () {
      this.$emit('reloadPop')
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
    BackPopClose (e) {
      // if (e === 'headerClick') {
      this.closeXPop()
      // } else if (JSON.parse(e.data).type === 'goback') {

      // }
    },
    async settingPop (successChanYn) {
      this.chanFollowYn = false
      var target = this.params
      if (successChanYn === true) {
        target = this.successChanParam
      }
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
        this.notiTargetKey = target.targetKey
        this.targetType = 'pushList'
        this.headerTitle = '알림'
      } else if (this.targetType === 'pushList') {
        this.headerTitle = '알림'
        if (target.readySearchList !== undefined && target.readySearchList !== null && target.readySearchList !== '') {
          this.readySearchList = target.readySearchList
        }
      } else if (this.targetType === 'chanList') {
        this.headerTitle = '구독'
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
        // alert(this.$changeText(this.params.value.cabinetNameMtext))
        // this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext)
        // alert(this.headerTitle)
      } else if (this.targetType === 'editBookList') {
        // alert(this.$changeText(this.params.value.cabinetNameMtext))
        this.headerTitle = '주소록 관리'
        // alert(this.headerTitle)
      } else if (this.targetType === 'bookMemberDetail') {
        // alert(JSON.stringify(this.params))
        this.headerTitle = '구성원 상세' // this.$changeText(this.params.value.userDispMtext)
      } else if (this.targetType === 'writeBoard') {
        this.headerTitle = '게시판 작성'
      } else if (this.targetType === 'boardDetail') {
        // alert(true)
        // alert(JSON.stringify(this.params.value))
        this.headerTitle = this.$changeText(this.params.value.cabinetNameMtext)
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
      // alert(history)
      this.$store.commit('updateStack', history)
      this.newHeaderT = '새로운 타이틀' + this.thisPopN
    },
    openPop (params) {
      this.popParams = params
      this.popShowYn = true
    },
    closePop (reloadYn) { // 자식 팝업닫기
      this.popShowYn = false
      if (reloadYn !== undefined && reloadYn !== null && (reloadYn === true || reloadYn === 'true')) {
        // eslint-disable-next-line no-unused-vars
        if (this.targetType === 'pushList' || this.targetType === 'chanList' || this.targetType === 'chanDetail') {
          this.reloadYn = true
          setTimeout(() => {
            this.reloadYn = false
          }, 100)
          // this.reloadYn = false
        }
      }
    },
    successCreChan (params) {
      if (params.modiYn !== undefined && params.modiYn !== null && params.modiYn === true) {
        this.$emit('reloadPop', true) // 부모페이지까지 리로드?
        this.closeXPop(true)
      } else {
        this.$emit('reloadPop')
        this.successChanParam = params
        this.settingPop(true)
      }
    },
    closeXPop (reloadYn) { // 내 팝업 닫기
      this.$emit('closePop', reloadYn)
      // this.$removeHistoryStack(this.thisPopN)
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
    }
  }
}
</script>

<style scoped>

.commonPopWrap{position: fixed;width: 100vw;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF;}
.commonPopPushDetail{box-sizing: border-box;height: 100%;width: 100%;}
/* .commonPopPushDetail{box-sizing: border-box;height: 100%;width: 100%;padding-top: 50px;} */

.dNone{display: none;}

.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
</style>
