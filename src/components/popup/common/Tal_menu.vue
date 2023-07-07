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
        <div v-if="value.type === 'page'" style="width: 100%; height: 100%;" v-on:click="goPage(value.link)">
          <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
          <div class="fl">{{value.menuText}}</div>
        </div>
        <div class="fl" style="width: 100%; height: 100%;" v-else v-on:click="openPop(value)">
          <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
          <div class="fl">{{value.menuText}}</div>
        </div>
      </div>
      <div>로그아웃</div>
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
        { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('MENU_BTN_REPO_ERROR'), link: 'askTal', type: 'pop', jobKind: 'ERRO' }
      ]
    }
  },
  components: {
    unknownLoginPop
  },
  emits: ['openPop', 'goPage'],
  methods: {
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
      params.jobKind = menuData.jobKind
      this.$emit('openPop', params)
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    },
    GE_LOCALE () {
      return this.$i18n.locale
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
          { iconUrl: 'resource/menu/icon_report_color.svg', menuText: this.$t('MENU_BTN_REPO_ERROR'), link: 'askTal', type: 'pop', jobKind: 'ERRO' }
        ]
      },
      deep: true
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; left: 0; width: 100%; height: 50px; border-bottom: 2px solid #6768A8;}
.menuHeader p{color: #5F61BD; text-align: center; font-weight: bold;}
/* .menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%) } */
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; width: 100%;}
</style>
