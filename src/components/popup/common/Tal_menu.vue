<template>
  <div class="pagePaddingWrap" style="padding-top: 0 !important;" >
    <div class="menuHeader" >
      <!-- <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/main/icon_back_white.png"/> -->
      <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/common/grayXIcon.svg"/>
      <!-- <img src="../../../../assets/images/common/grayXIcon.svg" @click="closePop()" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt=""> -->
      <p class="font20 " style="line-height:35px;" >메뉴</p>
    </div>
    <div style="margin-top: 50px;">
      <div class="menuRow fontBold"  v-for="(value, index) in menuList" :key="index" :style="(index + 1) % 4 === 0 ? 'border-bottom: 3px solid #F5F5F9; ': '' ">
        <img class="fl mright-1 mtop-02" :src="value.iconUrl" alt="">
        <div class="fl" v-on:click="goPage(value.link)" v-if="value.type === 'page'">{{value.menuText}}</div>
        <div class="fl" v-else v-on:click="openPop(value)">{{value.menuText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
      menuList: [
        { iconUrl: 'resource/menu/icon_home_color.svg', menuText: '홈', link: 'main', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_group_color.svg', menuText: '채널', link: 'chanList', type: 'page' },
        { iconUrl: 'resource/menu/icon_search_color.svg', menuText: '검색', link: 'search', type: 'page' },
        { iconUrl: 'resource/menu/icon_user_color.svg', menuText: '마이페이지', link: 'myPage', type: 'page' },
        { iconUrl: 'resource/menu/icon_D-alim_color.svg', menuText: '더알림이란?', link: 'theAlimInfo', type: 'pop' },
        { iconUrl: 'resource/menu/icon_text_color.svg', menuText: '자주 찾는 질문', link: 'question', type: 'pop' },
        { iconUrl: 'resource/menu/icon_board_color.svg', menuText: '문의하기', link: 'askTal', type: 'pop', jobKind: 'QUES' },
        { iconUrl: 'resource/menu/icon_report_color.svg', menuText: '오류접수', link: 'askTal', type: 'pop', jobKind: 'ERRO' }
        /* { iconUrl: 'http://placehold.it/25', menuText: '문의하기', link: 'askTal', type: 'pop' } */
        // { iconUrl: '', menuText: 'Q&A', link: 'qna' }
      ]
    }
  },
  components: {
  },
  emits: ['openPop', 'goPage'],
  methods: {
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (menuData) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = menuData.link
      params.popHeaderText = menuData.menuText
      params.jobKind = menuData.jobKind
      this.$emit('openPop', params)
    }
  }

}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; top: 0; left: 0; width: 100%; height: 50px; border-bottom: 2px solid #6768A8;}
.menuHeader p{color: #5F61BD; text-align: center; font-weight: bold;}
/* .menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%) } */
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; }
</style>
