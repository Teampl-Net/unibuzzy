<i18n>
  {
    "ko": {
      "LOGIN_MSG_INTO_POP": "더알림의 알림을 받아보고",
      "LOGIN_MSG_INTO_POP2": "중요한 알림을 쉽게 다시찾아보려면?",
      "LOGIN_MSG_BTN": "소셜 로그인 하러가기"
    },
    "en": {
      "LOGIN_MSG_INTO_POP": "Stay informed,",
      "LOGIN_MSG_INTO_POP2": "effortlessly find vital notis with uniBuzzy!",
      "LOGIN_MSG_BTN": "Continue with Social Account"
    }
  }
  </i18n>
<template>
  <div class="fl headerBottom unknownPopWrap">
    <div class="fl fontBold font14 unknownPopHeader">
    </div>
    <div class="popHeader fl textRight w100P closeIconWrap">
      <img class="fr cursorP" src="@/assets/images/common/popup_close.png" @click="pClosePop ? pClosePop() : backClick" />
    </div>
    <div class="popDAlim fl w100P headerLogoWrap">
      <img class="fl mainHeaderLogo" src="@/assets/images/common/thealim_header_logo.png" />
      <div class="font25 headerFont commonColor fl mright-05">{{ $t('COMMON_NAME_APP') }}</div>
    </div>
    <div class="fl w100P unknownPopBody">
      <div class="fl textLeft font16 textCenter fontBold unknownText">{{ $t('LOGIN_MSG_INTO_POP') }}<br>{{ $t('LOGIN_MSG_INTO_POP2') }}</div>
      <div class="fl w100P unknownLoginBtnWrap">
        <div class="fl font20 cursorP CDeepBgColor CDeepColorBorder textCenter fontBold unknownLoginBtn" @click="goLoginPage">{{ $t('LOGIN_MSG_BTN') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pClosePop: {}
  },
  methods: {
    goLoginPage () {
      // var isMobile = /Mobi/i.test(window.navigator.userAgent)
      // if (isMobile && (localStorage.getItem('nativeYn') === false || localStorage.getItem('nativeYn') === 'false')) {
      //   window.location.href = 'https://thealim.page.link/LOGIN'
      // } else {
      this.$router.push({ path: '/policies' })
      // }
    },
    backClick () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    }
  },
  created () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'selectStickerPop' + history.length
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
  }
}
</script>
<style scoped>
.mainHeaderLogo {
  width: 1.7rem;
  margin: 0 0.4rem;
  -webkit-user-drag: none;
}
.unknownPopWrap {
  z-index: 101;
  position: relative;
  height: 250px;
  width: 350px;
  left: calc(50% - 175px);
  top: calc(50% - 125px);
  background: white;
  box-shadow: 0px 7px 9px 9px #00000036;
  border-radius: 5px;
}
.unknownPopHeader {
  color: white;
  height: 30px;
  top: -30px;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.closeIconWrap {
  height: 40px;
  line-height: 50px;
  padding: 10px;
}
.closeIconWrap > img {
  width: 15px;
}
.headerLogoWrap {
  height: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.unknownPopBody {
  height: calc(100% - 100px);
}
.unknownText {
  width: 100%;
  margin-bottom: 35px;
  height: 30px;
  line-height: 30px;
}
.unknownLoginBtnWrap {
  height: calc(100% - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.unknownLoginBtn {
  color: white;
  height: 50px;
  border-radius: 5px;
  line-height: 50px;
  width: 90%;
}
</style>
