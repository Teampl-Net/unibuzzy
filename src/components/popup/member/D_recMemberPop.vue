<i18n>
{
  "ko": {
    "REQ_MEM_NAME_REQ": "멤버신청",
    "REQ_MEM_TITLE_CONT": "신청내용",
    "REQ_MEM_BTN_REQ": "신청",
    "REQ_MEM_MSG_SUBMIT": "신청되었습니다!",
    "REQ_MEM_MSG_NOCONT": "신청 내용을 입력해주세요."
  },
  "en": {
    "REQ_MEM_NAME_REQ": "Request Member Access",
    "REQ_MEM_TITLE_CONT": "Request Content",
    "REQ_MEM_BTN_REQ": "Request",
    "REQ_MEM_MSG_SUBMIT": "Applied!",
    "REQ_MEM_MSG_NOCONT": "Please enter the application details."
  }
}
</i18n>
<template>
    <div style="width: calc(100% - 40px);min-height: 500px; height: 90%; z-index: 99999999999999999999999; position: fixed; left: 20px; bottom: 0; background: #fff; border-radius: 0.8rem 0.8rem 0 0;">
        <div style="width: 100%; position: relative; padding: 10px 20px; min-height: 50px; float: left;" class="headerShadow">
            <p class="textLeft font20 commonColor fontBold" style="color: #6768A7!important">{{ $t('REQ_MEM_NAME_REQ') }}</p>
            <img @click="successSendForm(false)" class="" style="width: 25px; position: absolute; top: 15px; right: 20px;" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
        <div style="width: 100%; height: calc(100% - 120px); float: left; padding: 10px 20px;">
            <p class="font18 fontBold textLeft" style="color: #6768A7!important; margin: 10px 0;">{{ $t('REQ_MEM_TITLE_CONT') }}</p>
            <div id="receptStrArea" :contenteditable='true' class="font16 editableContent" style="width: 100%; min-height: 100px; padding: 10px; text-align: left; height: 80%; border: 1px solid #ccc;"></div>
        </div>
        <div style="width: 100%; height: 50px; margin-bottom: 10px; display: flex; justify-content: center; align-items: center;">
            <gBtnSmall @click="openReceptPop" class="mright-05" btnThema=""  :btnTitle="$t('REQ_MEM_BTN_REQ')" :class="{'CWDeepGrayBgColor' : sendOkYn === false}" />
            <gBtnSmall @click="successSendForm(false)" btnThema="light" :btnTitle="$t('COMMON_BTN_CANCEL')" />
        </div>
        <gConfirmPop @no="receptPopShowYn = false" :confirmText="returnConfirmText()" @ok="sendForm" confirmType='two' v-if="receptPopShowYn" />
        <gConfirmPop @no="successSendForm" :confirmText="$t('REQ_MEM_MSG_SUBMIT')" confirmType='timeout' v-if="okPopShowYn" />
    </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
export default {
  data () {
    return {
      receptPopShowYn: false,
      okPopShowYn: false,
      reqMemPopId: null,
      inputArea: {},
      sendOkYn: false
    }
  },
  props: {
    chanDetail: {}
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.reqMemPopId = 'reqMemPop' + this.chanDetail.teamKey
    // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
    history.push(this.reqMemPopId)
    this.$store.commit('D_HISTORY/updateStack', history)
    console.log(this.chanDetail)
  },
  mounted () {
    this.inputArea = document.getElementById('receptStrArea')
    this.inputArea.addEventListener('keyup', (event) => {
      if (this.inputArea.innerText.trim() === '') {
        this.sendOkYn = false
      } else {
        this.sendOkYn = true
      }
    })
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    returnConfirmText () {
      if (this.GE_LOCALE === 'ko') {
        return '[' + this.$changeText(this.chanDetail.nameMtext) + '] 채널에 <br>멤버신청서를 제출하시겠습니까?'
      } else {
        return `Do you want to apply for membership on the [${this.$changeText(this.chanDetail.nameMtext)}] channel?`
      }
    },
    openReceptPop () {
      if (this.sendOkYn === false) {
        this.$showToastPop(this.$t('REQ_MEM_MSG_NOCONT'))
        return
      }
      this.receptPopShowYn = true
    },
    sendForm () {
      this.receptPopShowYn = false
      this.updateFollower()
    },
    successSendForm (yn) {
      this.closeXPop(yn)
    },
    closeXPop (yn) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.reqMemPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop', yn)
      }
    },
    async updateFollower () {
      var param = {}
      var params = {}
      if (this.chanDetail.userTeamInfo && this.chanDetail.userTeamInfo.followerKey) {
        param.followerKey = this.chanDetail.userTeamInfo.followerKey
      }
      param.teamKey = this.chanDetail.teamKey
      param.userName = this.$changeText(this.GE_USER.userDispMtext)
      param.userKey = this.GE_USER.userKey
      param.showProfileYn = true
      param.teamName = this.$changeText(this.chanDetail.nameMtext)
      param.reqMemberStr = document.getElementById('receptStrArea').innerHTML
      param.reqMemberStatus = '01'
      params = { follower: param, doType: 'RQ' }
      console.log(params)
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.saveFollower',
        param: params
      })
      if (result.data.result === true) {
        // await this.$addChanList(this.chanDetail.targetKey)
        this.successSendForm()
      }
    }
  }
}
</script>

<style scoped>

</style>
