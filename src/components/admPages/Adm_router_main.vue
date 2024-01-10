<template>
  <div id="routerRef" class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden"  >
  <gAdmPopWrap v-if="popUpShow" :pClosePop="closePop"/>
  <gAdmPageWrap v-if="pageShow" :pMyApps="myApps" :pMyBranches="myBranches" :pPageData="pageData" :pClosePage="closePage"/>
  <commonHeader />
  <router-view style="padding:60px 20px 0;" @openPage="openPage" @openPop="openPop"></router-view>
  <commonFooter v-if="footer" />
  </div>
</template>

<script>
import commonHeader from '@/components/admPages/commonCompo/Adm_commonHeader.vue'
import commonFooter from '@/components/admPages/commonCompo/Adm_commonFooter.vue'
export default {
  components: {
    commonHeader,
    commonFooter
  },
  data () {
    return {
      popUpShow: false,
      pageShow: false,
      pageData: {},
      myBranches: [],
      myApps: {}
    }
  },
  created () {

  },
  methods: {
    openPop () {
      this.popUpShow = true
    },
    closePop () {
      this.popUpShow = false
    },
    openPage (param, myBranches, myApps) {
      this.pageData = param
      this.myBranches = myBranches
      this.myApps = myApps
      this.pageShow = true
    },
    closePage () {
      this.pageShow = false
    }
  }
}
</script>

<style scoped>
</style>
