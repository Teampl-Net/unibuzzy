<template>
    <div class="py-3 px-4 TalFooterWrap">
      <div class="w100P h100P" style="display:flex; flex-align:center; justify-content:center">
        <div v-for="(btn, index) in mFooterBtns" :key="index" @click="routerPage(btn.path, index)" class="cursorP commonColor fontBold text-center font12" style="width:25%; display:flex; align-items:center; justify-content:center; flex-direction:column;">
          <div style="width:22.4px; height:24px;">
            <img v-if="btn.path === 'main' && this.$route.path === '/'" :src="btn.fullIcon" class="w100P" style="height:100%;"/>
            <img v-else-if="this.$route.path === `/${btn.path}`" :src="btn.fullIcon" class="w100P" style="height:100%;"/>
            <img v-else :src="btn.icon" class="w100P" style="height:100%;"/>
        </div>
          <p :class="{activeFooterMenu : mSelectedFooterIdx === index}" class="font12">{{ btn.title }}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'TalFooter',
  data () {
    return {
      // activeFooter: 'main',
      mFooterBtns: [],
      mSelectedFooterIdx: 0,
      mNewFooter: [
        { fullIcon: '/resource/footer/icon_home_fillin.svg', icon: '/resource/footer/icon_home.svg', title: '홈', path: 'main', onClick: '' },
        { fullIcon: '/resource/footer/icon_todo_fillin.svg', icon: '/resource/footer/icon_todo.svg', title: '오늘의일', path: 'todo', onClick: '' },
        { fullIcon: '/resource/footer/icon_channel_fillin.svg', icon: '/resource/footer/icon_channel.svg', title: '채널', path: 'chanList', onClick: '' },
        { fullIcon: '/resource/footer/icon_people_fillin.svg', icon: '/resource/footer/icon_people.svg', title: '마이페이지', path: 'myPage', onClick: '' }
      ]
    }
  },
  props: {
    pOpenUnknownLoginPop: Function,
    pChangePageHeader: Function
  },
  mounted () {
    this.setFooter()
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    setFooter () {
      this.mFooterBtns = this.mNewFooter

      if (this.mFooterBtns) {
        // var setPage = 'main'
        // for (let i = 0; i < this.mFooterBtns.length; i++) {
        //   if (this.mFooterBtns[i].path === 'H') {
        //     setPage = 'main'
        //   } else if (this.mFooterBtns[i].path === 'T') {
        //     setPage = 'todo'
        //   } else if (this.mFooterBtns[i].path === 'C') {
        //     setPage = 'chanList'
        //   } else if (this.mFooterBtns[i].path === 'M') {
        //     setPage = 'myPage'
        //   }
        //   this.mFooterBtns[i].onClick = setPage
        // }
      }
    },
    async routerPage (page, index) {
      this.mSelectedFooterIdx = index
      if ((page === '마이페이지' || page === '오늘의일') && this.GE_USER.unknownYn) {
        // this.$showToastPop('로그인 후 이용해주세요')
        this.pOpenUnknownLoginPop()
        return
      }
      if (page && this.GE_USER.userKey) {
        this.$emit('changeRouterPath', page)
        this.pChangePageHeader(page)
      }
    }
  }
}

</script>

<style>
.TalFooterWrap{display: flex; box-sizing: border-box; background: #E7EDFF!important; justify-content: flex-start; text-align: left; width: 100%; height: 60px; z-index: 99;}
.footerRouter {text-decoration-line: none; }
.footerRouter img{width: 1.4rem}
p{margin-bottom: 0; color: #7E7E7E;}
.activeFooterMenu{ font-weight: bolder; color: #6768A7 !important;}
</style>
