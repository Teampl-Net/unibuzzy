<template>
  <div ref="gPopUp" class="commonPopWrap" :style="'padding-top: ' + (Number(this.$STATUS_HEIGHT) + 50)  + 'px'">
    <popHeader @closeXPop="closeXPop" :class="(mTargetType === 'chanDetail' || mTargetType === 'boardMain')? 'chanDetailPopHeader': ''" :chanAlimListTeamKey="propParams.targetKey" ref="gPopupHeader" :checkOfficialChanYn="propData" :headerTitle="mHeaderTitle" class="commonPopHeader" style="top: 0px;"
      @openMenu='openChanMenu' :thisPopN="mPopN" :targetType="mTargetType" @openPop="openPop"/>
        <!-- <chanMenu :pPopId="popId" ref="chanMenuCompo" :propData="propParams" @openPop="openPop" :propChanAlimListTeamKey="propParams.targetKey" v-if='openChanMenuYn === true && popId' @closePop='openChanMenuYn = false' @openItem='openPop' @openChanMsgPop="closeNopenChanMsg()"/> -->
    <chanMenu :pPopId="mPopId" ref="chanMenuCompo" :propData="propParams" @openPop="openPop" :propChanAlimListTeamKey="propParams.targetKey" v-if='mOpenChanMenuYn === true && mPopId' @closePop='mOpenChanMenuYn = false' @openItem='openPop' />
  </div>
</template>
<script>
import chanMenu from '../../../popup/chanMenu/D_channelMenu.vue'

export default {
  created () {
    console.log(this.propParams)
    this.settingPop()
    localStorage.setItem('notiReloadPage', 'none')
  },
  data () {
    return {
      mHeaderTitle: '',
      mPopN: {},
      mTargetType: '',
      mLoadingYn: false,
      mPopId: null,
      mOpenChanMenuYn: false,
      mPopParams: '',
      mPopShowYn: false
    }
  },
  methods: {
    openChanMenu () {
      this.openChanMenuYn = true
    },
    openPop (params) {
      console.log(params)
      this.mPopParams = params
      this.mPopShowYn = true
    },
    async settingPop () {
      var target = this.propParams
      this.mTargetType = target.targetType
      if (this.mTargetType === 'askTal') {
        if (target.jobKind === 'QUES') this.mHeaderTitle = '문의하기'
        if (target.jobKind === 'ERRO') this.mHeaderTitle = '오류접수'
      } else if (this.mTargetType === 'changeEmail') {
        this.changInfoType = this.mTargetType
        this.mTargetType = 'changeInfo'
      } else if (this.mTargetType === 'changePhone') {
        this.mHeaderTitle = '실명인증'
      } else if (this.mTargetType === 'editBookList' || this.mTargetType === 'memberManagement') {
        this.helpYn = true
      } else if (this.mTargetType === 'selectBookList') {
        this.selectPlist = target.pSelectedList
      } else if (this.mTargetType === 'writeContents') {
        if (target.attachFileList) {
          this.mAttachFileList = target.attachFileList
        }
        var paramMap = new Map()
        console.log(this.GE_USER.userKey)
        paramMap.set('contentsKey', target.targetKey)
        paramMap.set('jobkindId', target.contentsJobkindId)
        paramMap.set('ownUserKey', this.GE_USER.userKey)
        paramMap.set('subsUserKey', this.GE_USER.userKey)
        paramMap.set('userKey', this.GE_USER.userKey)
        const response = await this.$axios.post('/sUniB/tpgetMyContentsList', Object.fromEntries(paramMap))
        if (response.data && response.data.content) this.mAttachFileList = response.data.content[0].attachFileList
      }
      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.mPopN = Number(this.parentPopN) + 1
      } else {
        this.mPopN = 100
      }
      if (!this.mPopId) {
        this.mPopId = 'gPopup' + this.mPopN
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
    },
    async closePop () {
      console.log('**** closePop ****')
      console.log(this.mTargetType)
      if (this.mTargetType === 'editMemberTypePop') {
        this.$refs.editMemberTypePop.refreshList()
      }
      this.mPopShowYn = false
      var gPopHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      gPopHistory = gPopHistory.filter((element, index) => index < gPopHistory.length - 1)
      this.$store.dispatch('D_HISTORY/AC_UPDATE_GPOP_STACK', gPopHistory)
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
    }
  },
  props: {
    propParams: {},
    parentPopN: {}
  },
  components: {
    chanMenu
  }
}
</script>
<style scoped>
.commonPopWrap{position: absolute;width: 100%;height: 100%;top: 0;z-index: 99; background: #FFFFFF; overflow: hidden;}
.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
</style>
