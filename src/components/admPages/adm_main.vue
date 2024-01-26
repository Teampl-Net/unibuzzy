<template>
  <div class="w100P h100P admPageMain" id="admLayout">
    <div class="topArea w100P">
      <div class="myInfoArea">
        <p class="font30" style="padding-right:10px;">내 조직 IN </p>
        <select v-model="mSelectedApp" @change="setSelectedApp" style="height:30px;">
          <option v-for="(apps, index) in mGetOrgList" :key="index" :value="apps" :selected="index === mSelectedAppIdx">{{ apps.title }}</option>
        </select>
      </div>
      <div class="searchArea">
        <input type="text" style="width:150px; cursor:auto;"/>
        <div class="cursorP" style="background-color:#fff; padding:0px 10px;">검색</div>
      </div>
    </div>

    <div class="w100P jojikCompoWrap">
      <template v-for="(branch, index) in mBranchList" :key="index">
        <jojikCompo @click="openPage(branch)" :pBranch="branch" class="cursorP"/>
      </template>
      <div class="jojikAddBtn cursorP" @click="gotoAddOrg">
        <div style="width:50px; height:50px; border-radius:50%; background-color:#ebebeb; font-size:30px; line-height:50px;">+</div>
        <p class="font15" style="margin-left:0.5rem;">조직 추가</p>
      </div>
    </div>
  </div>
</template>

<script>
import jojikCompo from '@/components/admPages/adm_components/Adm_jojikCompo.vue'
import axios from 'axios'
export default {
  props: {
    pMyOrgList: []
  },
  components: {
    jojikCompo
  },
  data () {
    return {
      myApps: [],
      mSelectedApp: {},
      mSelectedAppIdx: 0,
      myUerKey: 0,
      mBranchList: [],
      propParams: {},
      mGetOrgList: []
    }
  },
  created () {
    console.log('main pMyOrgList', this.pMyOrgList)
    if (this.pMyOrgList && this.pMyOrgList.length > 0) {
      this.mGetOrgList = this.pMyOrgList
    } else {
      this.getOrgList()
    }
  },
  methods: {
    gotoAddOrg () {
      this.$router.push('/addOrg')
    },
    openPop (popType) {
      this.propParams.popType = popType
      this.$emit('openPop', this.propParams)
    },
    openPage (branch) {
      this.propParams.selBranch = branch
      this.propParams.branch = this.pMyOrgList[this.mSelectedAppIdx].branch
      this.propParams.myApps = this.pMyOrgList[this.mSelectedAppIdx]
      this.propParams.pageType = 'jojikDetail'
      this.$emit('openPage', this.propParams)
    },
    setSelectedApp () {
      // mSelectedApp의 인덱스를 찾습니다.
      this.mSelectedAppIdx = this.pMyOrgList.findIndex(app => app === this.mSelectedApp)
      console.log('this.mSelectedAppIdx', this.mSelectedAppIdx)
      // 인덱스를 기반으로 mBranchList를 설정합니다.
      if (this.mSelectedAppIdx !== -1) {
        this.mBranchList = this.pMyOrgList[this.mSelectedAppIdx].branch || []
        console.log('mBranchList:', this.mBranchList)
      } else {
        console.log('App not found')
      }
    },
    async getOrgList () {
      console.log('getOrgList 실행됨 - main')
      var paramSet = {}
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      var result = await axios.post('/sUniB/tp.getOrgList', paramSet, { withCredentials: true, headers: { DemoYn: true } })
      if (result && result.data) {
        this.mGetOrgList = result.data.org
      }
    }
  },
  mounted () {
    this.mSelectedApp = this.pMyOrgList[0]
    this.setSelectedApp()
  },
  watch: {
    mSelectedAppIdx: {
      immediate: true,
      handler (value) {
        console.log('value', value)
      }
    }
  }
}
</script>

<style scoped>
.topArea{
  display:flex;
  align-items:center;
  justify-content:space-between;
  height:auto;
}
.myInfoArea{
  display:flex;
  align-items:center;
  justify-content:start;
}
.searchArea{
  display:flex;
  align-items:center;
  gap:0.3rem;
}
.jojikCompoWrap{
  margin-top:20px;
  display:flex;
  flex-direction:column;
  gap:1.5rem;
}
.jojikAddBtn{
  width:100%;
  height:100px;
  display:flex;
  align-items:center;
  padding:10px 20px;
  background-color: #fff;
  border-radius:10px;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}
</style>
