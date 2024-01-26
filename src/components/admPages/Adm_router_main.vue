<template>
  <div id="routerRef" class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden; padding-top:60px;"  >
  <gAdmPopWrap v-if="popUpShow" @dataUpdated="dataUpdated" :pPropParams="propParams" :pClosePop="closePop" :pOrgList="myOrgList"/>
  <gAdmPageWrap v-if="pageShow" @changeBranch="changeBranch" @openPop="openPop" :pPropParams="propParams" :pPageData="pageData" :pClosePage="closePage" :pOrgList="myOrgList"/>
  <commonHeader />
  <router-view v-if="dataLoaded" style="overflow:hidden auto;" @openPage="openPage" @openPop="openPop" :pSelectedApp="mSelectedApp" :pMyOrgList="myAppList"></router-view>
  <commonFooter v-if="footer" />
  </div>
</template>

<script>
import commonHeader from '@/components/admPages/commonCompo/Adm_commonHeader.vue'
import commonFooter from '@/components/admPages/commonCompo/Adm_commonFooter.vue'
import axios from 'axios'
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
        { appKey: 0, title: '더알림', branch: [] },
        { appKey: 1, title: '아파트123', type: '아파트', allCount: '132', branch: [{ name: '개나리 아파트', code: 'ABC10' }] },
        { appKey: 2, title: '컴퍼니톡', branch: [{ name: '새움소프트', code: 'ABC10' }, { name: '헌움소프트', code: 'ABC10' }, { name: '중간움소프트', code: 'ABC10' }] }
      ],
      myOrgList: [],
      dataLoaded: false
    }
  },
  created () {
    this.getOrgList()
    console.log('GE_USER', this.GE_USER)
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'admMain' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  methods: {
    async getOrgList () {
      console.log('getOrgList 실행됨 - router-main')
      var paramSet = {}
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      var result = await axios.post('/sUniB/tp.getOrgList', paramSet, { withCredentials: true, headers: { DemoYn: true } })
      console.log('result', result)
      if (result && result.data) {
        this.mResult = result
        this.dataLoaded = true
      }
      this.myOrgList = result.data.org
      this.myAppList = this.defaultAppList
      this.myAppList[0].branch = this.myOrgList
      console.log(this.myAppList[0])
    },
    openPop (params) {
      console.log('router-main openPop params', params)
      if (params) {
        this.propParams = params
      }
      this.popUpShow = true
    },
    closePop () {
      this.popUpShow = false
    },
    openPage (propParams) {
      if (propParams) {
        this.propParams = propParams
        if (propParams.pageType === 'jojikDetail') {
          this.pageData = propParams.selBranch
        }
      }
      this.pageShow = true
    },
    closePage () {
      this.pageShow = false
    },
    changeBranch () {
    }
  },
  mounted () {
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  }
}
</script>

<style scoped>
</style>
