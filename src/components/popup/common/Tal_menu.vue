<i18n>
{
  "ko": {
    "MENU_BTN_INTRO": "하이브릭 소개",
    "MENU_BTN_FAQ": "자주 찾는 질문",
    "MENU_BTN_REQ": "문의하기",
    "MENU_BTN_REPO_ERROR": "오류접수",
    "LANG_INTO_KOREA": "한국어",
    "LANG_INTO_ENG": "영어"
  },
  "en": {
    "MENU_BTN_INTRO": "Introducing Hybric",
    "MENU_BTN_FAQ": "FAQ",
    "MENU_BTN_REQ": "Request",
    "MENU_BTN_REPO_ERROR": "Report Errors",
    "LANG_INTO_KOREA": "Korean",
    "LANG_INTO_ENG": "English"
  }
}
</i18n>
<template>
  <div class="pagePaddingWrap" style="padding-top: 0 !important;" >
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: absolute;top: 0; left: 0; z-index: 9998; background: #00000050;"></div>
    <unknownLoginPop :pClosePop="closeUnknownLoginPop" v-if="mUnknownLoginPopYn" style="position: fixed; z-index: 9999;" />
    <div class="menuHeader" :style="'top:' + (this.$STATUS_HEIGHT)+ 'px'"  >
      <!-- <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/main/icon_back_white.png"/> -->
      <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/common/grayXIcon.svg"/>
      <!-- <img src="../../../../assets/images/common/grayXIcon.svg" @click="closePop()" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt=""> -->
      <p class="font20 " style="line-height:35px;" >{{ $t('COMMON_NAME_MENU') }}</p>
    </div>
    <div  :style="'padding-top:' + (this.$STATUS_HEIGHT)+ 'px'" style=" margin-top: 50px">
      <div class="menuRow fontBold"  v-for="(value, index) in menuList" :key="index" :style="(index + 1) % 4 === 0 ? 'border-bottom: 3px solid #F5F5F9; ': '' ">
        <div v-if="value.type === 'page' && !value.select && !value.change" style="width: 100%; height: 100%;" v-on:click="goPage(value.link)">
          <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
          <div class="fl">{{value.menuText}}</div>
        </div>
        <div class="fl" style="width: 100%; height: 100%;" v-else-if="!value.select && !value.change" v-on:click="openPop(value)">
          <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
          <div class="fl">{{value.menuText}}</div>
        </div>
        <div v-if="value.select" style="width: 100%; height: 100%;" @click="changeLang(value.select)">
          <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
          <div class="fl">{{value.menuText}}</div>
        </div>
        <div v-if="value.change" @click="setPortal">
          <img class="fl mright-1 mtop-02" style="width:15px; height:18px;" :src="value.iconUrl" alt="">
          <div v-if="mLocalStorage === 'Imain'" class="fl">{{value.menuText}}</div>
          <div v-else class="fl">{{$t('MENU_BTN_IPORTAL')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import unknownLoginPop from '../../pageComponents/channel/D_unknownLoginPop.vue'
export default {
  mounted () {
  },
  data () {
    return {
      mUnknownLoginPopYn: false,
      menuList: [
        { iconUrl: 'resource/menu/icon_home_color.svg', menuText: this.$t('COMMON_NAME_HOME'), link: 'main', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_group_color.svg', menuText: this.$t('COMMON_NAME_CHANNEL'), link: 'chanList', type: 'page' },
        { iconUrl: 'resource/menu/icon_search_color.svg', menuText: this.$t('COMMON_NAME_SEARCH'), link: 'search', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_color.svg', menuText: this.$t('COMMON_NAME_MY_PAGE'), link: 'myPage', type: 'page' },
        { iconUrl: 'resource/menu/icon_D-alim_color.svg', menuText: this.$t('MENU_BTN_INTRO'), link: 'theAlimInfo', type: 'pop' },
        { iconUrl: 'resource/menu/icon_text_color.svg', menuText: this.$t('MENU_BTN_FAQ'), link: 'question', type: 'pop' },
        { iconUrl: 'resource/menu/icon_board_color.svg', menuText: this.$t('MENU_BTN_REQ'), link: 'askTal', type: 'pop', jobKind: 'QUES' },
        { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('MENU_BTN_REPO_ERROR'), link: 'askTal', type: 'pop', jobKind: 'ERRO' },
        { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('LANG_INTO_KOREA'), select: 'ko' },
        { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('LANG_INTO_ENG'), select: 'en' },
        { iconUrl: 'resource/menu/icon_fileBox.svg', menuText: this.$t('MENU_BTN_SPORTAL'), change: 'portal' }
      ],
      mLocalStorage: localStorage.getItem('currentScreen')
    }
  },
  components: {
    unknownLoginPop
  },
  emits: ['openPop', 'goPage'],
  methods: {
    setPortal () {
      this.mImagePortal = !this.mImagePortal
      const currentScreen = localStorage.getItem('currentScreen') || 'Smain'
      const newScreen = currentScreen === 'Smain' ? 'Imain' : 'Smain'
      localStorage.setItem('currentScreen', newScreen)
      this.$router.go(0)
      // console.log('currentScreen + newScreen', currentScreen, newScreen)
      // this.$emit('screenToggled', newScreen)
    },
    changeLang (lang) {
      this.$root.$i18n.locale = lang
      console.log('lang', this.$i18n.locale)
    },
    goPage (link) {
      if (this.GE_USER.unknownYn && link === 'myPage') {
        this.mUnknownLoginPopYn = true
      } else {
        this.$emit('goPage', link)
      }
    },
    openPop (menuData) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = menuData.link
      params.popHeaderText = menuData.menuText
      params.jobkindId = menuData.jobKind
      this.$emit('openPop', params)
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
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
          { iconUrl: 'resource/menu/icon_D-alim_color.svg', menuText: this.$t('MENU_BTN_INTRO'), link: 'theAlimInfo', type: 'pop' },
          { iconUrl: 'resource/menu/icon_text_color.svg', menuText: this.$t('MENU_BTN_FAQ'), link: 'question', type: 'pop' },
          { iconUrl: 'resource/menu/icon_board_color.svg', menuText: this.$t('MENU_BTN_REQ'), link: 'askTal', type: 'pop', jobKind: 'QUES' },
          { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('MENU_BTN_REPO_ERROR'), link: 'askTal', type: 'pop', jobKind: 'ERRO' },
          { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('LANG_INTO_KOREA'), select: 'ko' },
          { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('LANG_INTO_ENG'), select: 'en' },
          { iconUrl: 'resource/menu/icon_fileBox.svg', menuText: this.$t('MENU_BTN_SPORTAL'), change: 'portal' }
        ]
      },
      deep: true
    },
    locale (lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  }
}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; left: 0; width: 100%; height: 50px; border-bottom: 2px solid #6768A8;}
.menuHeader p{color: rgb(74 102 158); text-align: center; font-weight: bold;}
/* .menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%) } */
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; width: 100%;}
</style>
