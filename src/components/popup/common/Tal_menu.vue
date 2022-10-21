<template>

  <div class="pagePaddingWrap" style="padding-top: 0 !important;" >
      <div class="menuHeader" >
          <img v-on:click="this.$emit('hideMenu')" class="mtop-05 cursorP mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/main/icon_back_white.png"/>
          <p class="font16" >메뉴</p>
      </div>
      <div style="margin-top: 50px;">
        <div class="menuRow"  v-for="(value, index) in menuList" :key="index">
          <!-- <img class="mr-04" :src="value.iconUrl" alt=""> -->
          <div v-on:click="goPage(value.link)" v-if="value.type === 'page'">{{value.menuText}}</div>
          <div v-else v-on:click="openPop(value.link, value.jobKind)">{{value.menuText}}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  mounted () {
  },
  data () {
    return {
      menuList: [
        { iconUrl: 'http://placehold.it/25', menuText: '홈', link: '', type: 'page' },
        { iconUrl: 'http://placehold.it/25', menuText: '알림', link: 'pushList', type: 'page' },
        { iconUrl: 'http://placehold.it/25', menuText: '채널', link: 'chanList', type: 'page' },
        { iconUrl: 'http://placehold.it/25', menuText: '마이페이지', link: 'myPage', type: 'page' },
        { iconUrl: 'http://placehold.it/25', menuText: '더알림이란?', link: 'theAlimInfo', type: 'pop' },
        { iconUrl: 'http://placehold.it/25', menuText: '자주 찾는 질문', link: 'question', type: 'pop' },
        { iconUrl: 'http://placehold.it/25', menuText: '문의하기', link: 'askTal', type: 'pop', jobKind: 'QUES' },
        { iconUrl: 'http://placehold.it/25', menuText: '오류접수', link: 'askTal', type: 'pop', jobKind: 'ERRO' }
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
    openPop (link, jobKind) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = link
      params.jobKind = jobKind
      this.$emit('openPop', params)
    }
  }

}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{color: #FFFFFF; text-align: center; font-weight: bold;}
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%) }
</style>
