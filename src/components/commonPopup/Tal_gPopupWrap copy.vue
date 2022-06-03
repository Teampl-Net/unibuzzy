<template>
    <div v-if="reloadYn===false" class="commonPopWrap" ref="commonWrap" >
      <transition name="showModal">
        <fullModal :style="getWindowSize" transition="showModal" :id="this.targetType + this.params.targetKey" ref="commonWrap" :headerTitle="this.newHeaderT"
                                        @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.thisPopN" :params="this.popParams"/>
      </transition>
      <popHeader ref="gPopupHeader" :class="{chanDetailPopHeader: detailVal}" :headerTitle="this.headerTitle" @closeXPop="BackPopClose('headerClick')" :thisPopN="this.thisPopN" class="commonPopHeader"/>
      <!-- <managerPopHeader ref="gPopupHeader" :class="{'chanDetailPopHeader': detailVal.length > 0}" :headerTitle="this.headerTitle" @closeXPop="closeXPop" :thisPopN="this.thisPopN" class="commonPopHeader"/>
       -->
      <pushDetail @closeLoading="this.$emit('closeLoading')" :detailVal="this.detailVal" v-if="this.targetType === 'pushDetail'" class="commonPopPushDetail" @openPop = "openPop"/>
      <chanAlimList :ref="'gPopDetail'" @closeLoading="this.$emit('closeLoading')" @openLoading="this.$emit('openLoading')" :chanDetail="this.params" v-if="this.targetType === 'chanDetail' " @openPop = "openPop"/>
      <div class="pagePaddingWrap" style="padding-top: 35px;" v-if="this.targetType === 'pushList'">
        <pushList :ref="'gPopPush'" :notiTargetKey="notiTargetKey" :popYn="true" :readySearhList="this.readySearchList" @closeLoading="this.$emit('closeLoading')" @openPop = "openPop"/>
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

      <createChannel  v-if="this.targetType === 'createChannel'"  @closeXPop="closeXPop(true)"  @closeLoading="this.$emit('closeLoading')" @successCreChan='closeXPop'/>
      <writePush v-if="this.targetType === 'writePush'" :params="this.params" @closeXPop="closeXPop" />

    </div>
</template>

<script>
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

export default {
  async created () {
    await this.settingPop()
    document.addEventListener('message', e => this.BackPopClose(e))
    window.addEventListener('message', e => this.BackPopClose(e))
  },
  mounted () {
  },
  computed: {
    getWindowSize () {
      return {
        '--widndowWidth': window.innerWidth + 'px'
      }
    }
  },
  data () {
    return {
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
      readySearchList: {} // chanDetail -> pushList 열때 필요
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
    writePush
  },
  updated () {
  },
  methods: {
    BackPopClose (e) {
      if (e === 'headerClick') {
        this.closeXPop()
      } else if (JSON.parse(e.data).type === 'goback') {
        if (localStorage.getItem('popHistoryStack')) {
          if (localStorage.getItem('pageDeleteYn')) {
            if ((localStorage.getItem('curentPage') === this.targetType + this.thisPopN)) {
              this.closeXPop()
            }
          }
        }
      }
    },
    async settingPop () {
      this.chanFollowYn = false
      var target = this.params
      this.targetType = target.targetType
      // eslint-disable-next-line no-unused-vars
      // var tt = this.params
      if (this.targetType === 'pushDetail' || this.targetType === 'chanDetail') {
        this.detailVal = this.params
        if (this.detailVal.value) {
          if (this.detailVal.value.nameMtext !== undefined && this.detailVal.value.nameMtext !== 'undefined' && this.detailVal.value.nameMtext !== null && this.params.value.nameMtext !== '') {
            this.headerTitle = this.changeText(this.detailVal.value.nameMtext)
          } else {
            this.headerTitle = '상세'
          }
        }
        if (this.params.targetType === 'chanDetail') {
          this.headerTitle = ''
        }
      } else if (this.params.targetType === 'pushListAndDetail') {
        this.notiTargetKey = this.params.targetKey
        this.targetType = 'pushList'
        this.headerTitle = '알림'
      } else if (this.params.targetType === 'pushList') {
        this.headerTitle = '알림'
        if (this.params.readySearchList !== undefined && this.params.readySearchList !== null && this.params.readySearchList !== '') {
          this.readySearchList = this.params.readySearchList
        }
      } else if (this.params.targetType === 'chanList') {
        this.headerTitle = '구독'
      } else if (this.params.targetType === 'pushBox') {
        this.headerTitle = '알림함'
      } else if (this.params.targetType === 'leaveTheAlim') {
        this.headerTitle = '탈퇴'
      } else if (this.params.targetType === 'question') {
        this.headerTitle = '자주 찾는 질문'
      } else if (this.params.targetType === 'qna') {
        this.headerTitle = 'Q&A'
      } else if (this.params.targetType === 'askTal') {
        this.headerTitle = '문의하기'
      } else if (this.params.targetType === 'theAlimInfo') {
        this.headerTitle = '더알림이란?'
      } else if (this.params.targetType === 'changeMobile') {
        this.changInfoType = this.params.targetType
        this.targetType = 'changeInfo'
        this.headerTitle = '휴대폰 번호 수정'
      } else if (this.params.targetType === 'changeEmail') {
        this.targetType = 'changeInfo'
        this.changInfoType = this.params.targetType
        this.headerTitle = '이메일 수정'
      } else if (this.params.targetType === 'createChannel') {
        this.headerTitle = '채널 생성'
      } else if (this.params.targetType === 'writePush') {
        this.headerTitle = '알림 작성'
      }
      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.thisPopN = Number(this.parentPopN) + 1
      } else {
        this.thisPopN = 100
      }
      this.newHeaderT = '새로운 타이틀' + this.thisPopN
      if (this.params.targetKey) {
        this.$addHistoryStack(this.targetType + this.params.targetKey)
      } else {
        this.$addHistoryStack(this.targetType + this.thisPopN)
      }
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
    async closeXPop (reloadYn) { // 내 팝업 닫기
      if (localStorage.getItem('curentPage') === 'pop' + this.thisPopN) {
        this.$emit('closePop', reloadYn)
        this.$removeHistoryStack(this.thisPopN)
      }
    },
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
.commonPopPushDetail{box-sizing: border-box;height: 100%;width: 100%;padding-top: 50px;}
.dNone{display: none;}

.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
.transBack {background: transparent;}
</style>
