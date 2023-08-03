<i18n>
{
  "ko": {
    "MSG_LEAVE_UNIB": "회원 탈퇴가 완료되었습니다.",
    "MSG_ENDING_UNIB1": "더알림을 이용해주시고 사랑해주셔서 감사합니다.<br>더욱 더 노력하고 발전하는 더알림이 되겠습니다."
    "MSG_ENDING_UNIB2": "더욱 더 노력하고 발전하는 더알림이 되겠습니다."
  },
  "en": {
    "MSG_LEAVE_UNIB": "Your uniBuzzzy membership has been withdrawn.",
    "MSG_ENDING_UNIB1": "Thank you for enjoying uniBuzzy."
    "MSG_ENDING_UNIB2": "We will make more efforts and improvements."
  }
}
</i18n>
<template>
<div class="modalBack">
    <div class="leaveContainer">
      <div class="leaveContentsArea">
        <img src="../../../assets/images/common/message_logo.png" alt="bell icon">
        <p class="leaveComplete-1">{{ $t('MSG_LEAVE_UNIB') }}</p>
        <p class="leaveComplete-2">{{ $t('MSG_ENDING_UNIB1') }}<br>{{ $t('MSG_ENDING_UNIB1') }}.</p>
      </div>
      <gBtnLarge v-on:click="closePop" :btnTitle="'확인'" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    closePop () {
      this.$emit('closeXPop')
    }
  }
}
</script>
<style scoped>
.modalBack{width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index:999}
.leaveContainer{width: 80%; max-width: 670px; background-color: #FFFFFF !important; height: 600px; border-radius: 10px; padding: 1rem;}
.leaveContentsArea{height: 90%;display: flex; justify-content: center; align-items: center; flex-direction: column;}
.leaveContentsArea img {width: 6rem;}
.leaveComplete-1{color: #6768A7; font-size: 15px; font-weight: bold; margin-top: 2rem;}
.leaveComplete-2{color: #6768A7; font-size: 12px; margin-top: 0.5rem;}
</style>
