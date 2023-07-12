<i18n>
{
  "ko": {
    "MENU_BTN_INTRO": "더알림 소개",
    "MENU_BTN_FAQ": "자주 찾는 질문",
    "MENU_BTN_REQ": "문의하기",
    "MENU_BTN_REPO_ERROR": "오류접수"
  },
  "en": {
    "MENU_BTN_INTRO": "Introducing uniBuzzy",
    "MENU_BTN_FAQ": "FAQ",
    "MENU_BTN_REQ": "Request",
    "MENU_BTN_REPO_ERROR": "Report Errors"
  }
}
</i18n>
<template>
  <div class="pagePaddingWrap" style="padding-top: 0 !important; display: flex; flex-direction: column; justify-content: space-between;">
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 9998; background: #00000050;"></div>
    <unknownLoginPop :pClosePop="closeUnknownLoginPop" v-if="mUnknownLoginPopYn" style="position: fixed; z-index: 9999;" />
    <div class="w100P">
      <logoutPop v-if="mLogOutPopShowYn" @goLogout="goLogout" @closePop="closeLogoutPop" />
      <div class="menuHeader" :style="'top:' + (this.$STATUS_HEIGHT) + 'px'">
        <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../../assets/images/common/grayXIcon.svg"/>
        <p class="font20 " style="line-height:35px;">Menu</p>
      </div>
      <div :style="'padding-top:' + (this.$STATUS_HEIGHT) + 'px'" style=" margin-top: 50px">
        <div class="menuRow fontBold" v-for="(value, index) in menuList" :key="index" :style="(index + 1) % 4 === 0 ? 'border-bottom: 3px solid #F5F5F9; ' : ''">
          <div v-if="value.type === 'page'" style="width: 100%; height: 100%;" v-on:click="goPage(value.link)">
            <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
            <div class="fl">{{ value.menuText }}</div>
          </div>
          <div class="fl" style="width: 100%; height: 100%;" v-else @click="openPop(value)">
            <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
            <div class="fl">{{ value.menuText }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fontBold menuRow " @click="openLogoutPop" style="padding-bottom: 30px; display: flex; align-items: center;">
      <img class="mright-1" style="width: 15px;" src="@/assets/images/menu/icon_logout.svg" alt="">
        {{ $t('COMMON_BTN_LOG_OUT') }}
    </div>
  </div>
</template>

<script>
import unknownLoginPop from '../../../pageComponents/channel/D_unknownLoginPop.vue'
import logoutPop from '../UB_logoutPop.vue'
export default {
  data () {
    return {
      mUnknownLoginPopYn: false,
      mLogOutPopShowYn: false,
      menuList: [
        { iconUrl: 'resource/menu/icon_home_color.svg', menuText: '홈', link: 'main', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_group_color.svg', menuText: '채널', link: 'chanList', type: 'page' },
        { iconUrl: 'resource/menu/icon_search_color.svg', menuText: '검색', link: 'search', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_color.svg', menuText: '마이페이지', link: 'myPage', type: 'page' },
        { iconUrl: 'resource/menu/icon_text_color.svg', menuText: 'Terms of Use', link: 'termsOfUse', type: 'page' },
        { iconUrl: 'resource/menu/icon_board_color.svg', menuText: 'Privacy Policy', link: 'privacy', type: 'page' }
        // { iconUrl: 'resource/menu/icon_D-alim_color.svg', menuText: '더알림 소개', link: 'theAlimInfo', type: 'pop' },
        // { iconUrl: 'resource/menu/icon_text_color.svg', menuText: '자주 찾는 질문', link: 'question', type: 'pop' },
        // { iconUrl: 'resource/menu/icon_board_color.svg', menuText: '문의하기', link: 'askTal', type: 'pop', jobKind: 'QUES' },
        // { iconUrl: 'resource/menu/icon_report_color.svg', menuText: '오류접수', link: 'askTal', type: 'pop', jobKind: 'ERRO' }
      ]
    }
  },
  emits: ['openPop', 'goPage'],
  methods: {
    async goLogout (request) {
      this.mLogOutPopShowYn = false

      this.$UBLogOut()
    },
    closeLogoutPop () {
      this.mLogOutPopShowYn = false
    },
    openLogoutPop () {
      this.mLogOutPopShowYn = true
    },
    goPage (link) {
      if (this.GE_USER.unknownYn && link === 'myPage') {
        this.mUnknownLoginPopYn = true
      } else {
        this.$emit('goPage', link)
      }
    },
    openPop (menuData) {
      const params = {}
      params.targetType = menuData.link
      params.popHeaderText = menuData.menuText
      params.jobKind = menuData.jobKind
      this.$emit('openPop', params)
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.menuList = [
          { iconUrl: 'resource/menu/icon_home_color.svg', menuText: this.$t('COMMON_NAME_HOME'), link: 'main', type: 'page' },
          { iconUrl: 'resource/menu/icon_user_group_color.svg', menuText: this.$t('COMMON_NAME_CHANNEL'), link: 'chanList', type: 'page' },
          { iconUrl: 'resource/menu/icon_search_color.svg', menuText: this.$t('COMMON_NAME_SEARCH'), link: 'search', type: 'page' },
          { iconUrl: 'resource/menu/icon_user_color.svg', menuText: this.$t('COMMON_NAME_MY_PAGE'), link: 'myPage', type: 'page' },
          { iconUrl: 'resource/menu/icon_text_color.svg', menuText: 'Terms of Use', link: 'termsOfUse', type: 'page' },
          { iconUrl: 'resource/menu/icon_board_color.svg', menuText: 'Privacy Policy', link: 'privacy', type: 'page' }
          // { iconUrl: 'resource/menu/icon_D-alim_color.svg', menuText: this.$t('MENU_BTN_INTRO'), link: 'theAlimInfo', type: 'pop' },
          // { iconUrl: 'resource/menu/icon_text_color.svg', menuText: this.$t('MENU_BTN_FAQ'), link: 'question', type: 'pop' },
          // { iconUrl: 'resource/menu/icon_board_color.svg', menuText: this.$t('MENU_BTN_REQ'), link: 'askTal', type: 'pop', jobKind: 'QUES' },
          // { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('MENU_BTN_REPO_ERROR'), link: 'askTal', type: 'pop', jobKind: 'ERRO' }
        ]
      },
      deep: true
    }
  },
  components: {
    unknownLoginPop,
    logoutPop
  }
}
</script>

<style scoped>
.menuHeader {
  padding: 0.5rem 0;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #aaa;
}

.menuHeader p {
  text-align: center;
  font-weight: bold;
}

/* .menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%) } */
.menuRow {
  padding: 1rem;
  box-sizing: border-box;
  text-align: left;
  height: 3.8rem;
  width: 100%;
}
</style>
