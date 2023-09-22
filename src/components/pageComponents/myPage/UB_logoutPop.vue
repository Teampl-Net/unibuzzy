<i18n>
  {
    "ko": {
      "LOGOUT_MSG_ASK": "로그아웃 하시겠습니까?",
    },
    "en": {
      "LOGOUT_MSG_ASK": "Are you sure to log out?",
    }
  }
</i18n>
<template>
  <gConfirmPop :confirmText="$t('LOGOUT_MSG_ASK')" @ok="goLogout"  @no="closePop" />
</template>
<script>
export default {
  data () {
    return {
      okBtn: this.$t('COMMON_BTN_OK'),
      cancelBtn: this.$t('COMM_BTN_CANCEL')
    }
  },
  methods: {
    goLogout () {
      this.$emit('goLogOut', 'goMain')
    },
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style scoped>

</style>
