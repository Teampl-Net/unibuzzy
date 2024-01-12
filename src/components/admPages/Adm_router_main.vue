<template>
  <div id="routerRef" class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden"  >
  <div v-if="popUpShow" class="backDark"></div>
  <gAdmPopWrap v-if="popUpShow" :pPropParams="propParams" :pClosePop="closePop"/>
  <gAdmPageWrap v-if="pageShow" @changeBranch="changeBranch" @openPop="openPop" :pPropParams="propParams" :pPageData="pageData" :pClosePage="closePage"/>
  <commonHeader />
  <router-view style="padding:60px 20px 0;" @openPage="openPage" @openPop="openPop" :pSelectedApp="mSelectedApp" :pMyAppList="myAppList"></router-view>
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
      myApps: {},
      propParams: {},
      myAppList: [],
      defaultAppList: [
        { appKey: 0, title: '더알림', branch: [{ name: '새움소프트 공식', code: 'ABC10', type: '🏢회사', allCount: 80, manage: [{ name: '일반', count: 50 }, { name: '매니저', count: 25 }, { name: '관리자', count: 5 }], user: [{ name: '김보리', tel: '010-0104-0104', mail: 'bori11004@cute.cute', manage: '매니저' }, { name: '황설탕', tel: '010-1101-1101', mail: 'sugar@cute.cute', manage: '관리자' }] }, { name: '유니버지 공식', code: 'ABC10', type: '🏫학교', allCount: 130 }] },
        { appKey: 1, title: '아파트123', type: '아파트', allCount: '132', branch: [{ name: '개나리 아파트', code: 'ABC10' }] },
        { appKey: 2, title: '컴퍼니톡', branch: [{ name: '새움소프트', code: 'ABC10' }, { name: '헌움소프트', code: 'ABC10' }, { name: '중간움소프트', code: 'ABC10' }] }
      ]
    }
  },
  created () {
    this.setMyApps()
  },
  methods: {
    setMyApps () {
      this.myAppList = this.defaultAppList
    },
    openPop (params) {
      if (params) {
        this.propParams = params
      }
      this.popUpShow = true
    },
    closePop () {
      this.popUpShow = false
    },
    openPage (propParams) {
      this.propParams = propParams
      this.pageData = propParams.selBranch
      this.pageShow = true
    },
    closePage () {
      this.pageShow = false
    },
    changeBranch () {
    }
  },
  mounted () {
    this.setMyApps()
  }
}
</script>

<style scoped>

.backDark{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.3);
  z-index:2;
}
</style>
