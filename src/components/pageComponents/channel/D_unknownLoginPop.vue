
<template>
  <div class="fl headerBottom" style="z-index: 101; position: relative; height: 250px; width: 350px; left: calc(50% - 175px); top: calc(50% - 125px); background: white; box-shadow: 0px 7px 9px 9px #00000036; border-radius: 5px;">
    <div class="fl fontBold font14" style="color: white; height: 30px; top: -30px; position: absolute; width: 100%; display: flex; align-items: center; justify-content: center;">
      <!-- <span class="commonLightColor textOverdot fontBold fl" style="max-width: 120px;" >{{ this.$changeText(pContDetail.nameMtext) }}</span> -->
      <!-- <span style="text-shadow: 2px 2px 9px black;" class="fl fontBold w-100P">모두조인을 더 돌아다녀보고 싶으시면 로그인하세요!</span> -->
    </div>
    <div class="popHeader fl textRight w-100P" style="height: 40px; line-height: 50px; padding: 10px;">
      <img style="width: 15px;" class="fr cursorP" src="../../../assets/images/common/popup_close.png" @click="pClosePop ? pClosePop() : backClick" />
    </div>
    <div class="popDAlim fl w-100P" style="height: 30px; margin-bottom: 20px; display: flex; align-items: center; justify-content: center;">
      <img class="fl mainHeaderLogo" src="../../../assets/images/common/thealim_header_logo.png" />
      <div class="font25 headerFont commonColor fl mright-05">{{ $t('COMMON_NAME_APP') }}</div>
    </div>
    <div class="fl w-100P" style="height: calc(100% - 100px);">
      <!-- <div class="fl textLeft font16" style="width: 80%;"> -->
        <!-- <span class="fontBold fl w-100P">{{ this.$changeText(pContDetail.nameMtext) }}채널뿐 아니라,</span> -->
      <!-- </div> -->
      <!-- <div class="fl textLeft font16" style="width: 80%; margin-bottom: 20px;">나에게 필요할 채널과 게시판 더 보고 싶다면?</div> -->
      <div class="fl textLeft font16 textCenter fontBold" style="width: 100%; margin-bottom: 35px; height: 30px; line-height: 30px;">{{ $t('RECE_LOGIN_TEXT') }}</div>
      <div class="fl w-100P" style="height: calc(100% - 50px); display: flex; align-items: center; justify-content: center;">
        <div class="fl font20 cursorP CDeepBgColor CDeepColorBorder textCenter fontBold" style="color: white; height: 50px; border-radius: 5px; line-height: 50px; width: 90%;" @click="goLoginPage">{{$t('COMM_BTN_SOCAIL_LOGIN')}}</div>
        <!-- <div class="fl font22 cursorP CDeepBgColor CDeepColorBorder textCenter fontBold" style="color: white; height: 50px; border-radius: 5px; line-height: 50px; width: 90%;" @click="tableYn = true">소셜 로그인 하러가기</div> -->
      </div>
    </div>
    <!-- <div class="fl w-100P textCenter" style="height: 100px; border-top: 1px solid #ccc; padding: 10px; display: flex; justify-content: center; flex-direction: column; align-items: center;">
      <span class="w-100P fl fontBold" style="height: 30px; line-height: 30px;">모두조인 계정이 아직 없다면?</span>
      <span class="w-100P fl" style="height: 30px; line-height: 30px;">소셜 계정으로 쉽고 빠르게 <span class="fontBold commonColor">Sign up</span></span>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    pClosePop: {}
    // pContDetail: {}
  },
  data () {
    return {
      // isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  methods: {
    goLoginPage () {
      // var isMobile = /Mobi/i.test(window.navigator.userAgent)
      this.$router.push({ path: '/policies' })
      // if (isMobile && (localStorage.getItem('nativeYn') === false || localStorage.getItem('nativeYn') === 'false')) {
      //   window.location.href = 'https://thealim.page.link/LOGIN'
      // } else {
      //   this.$router.push({ path: '/policies' })
      // }
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'selectStickerPop' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  }
}
</script>
<style scoped>
.mainHeaderLogo {
    width: 1.7rem;
    margin: 0 0.4rem;
    -webkit-user-drag: none;
}
</style>
