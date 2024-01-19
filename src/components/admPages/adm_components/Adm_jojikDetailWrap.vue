<template>
    <div class="w100P topArea">
      <div class="backBtn mRight-1 cursorP" @click="pClosePage">
        <img :src="require(`@/assets/images/common/icon_back.png`)" :alt="뒤로가기"/>
      </div>
      <div class="myInfoArea">
        <select v-model="mSelectedBranch" @change="changeSelectedBranch" style="height:30px;">
          <option v-for="(branch, index) in pPropParams.branch" :key="index" :value="branch">{{ branch.orgName }}</option>
        </select>
        <!-- <p class="font30" style="padding-left:10px;">IN {{ pPropParams.myApps ? pPropParams.myApps.title : '' }}</p> -->
        <p class="font30" style="padding-left:10px;">관리자 페이지</p>
      </div>
    </div>

    <div class="bottomArea w100P">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #5F61BD; ">
        <ul style="display:flex; align-items:center; justify-content:start; gap:1rem; margin-bottom:0;">
          <li class="jojikTab cursorP" v-for="(tab, index) in jojikTabs" :key="index" :class="{selected : mSelectedJojikTabIdx === index}" @click="changeJojikTab(index)">
            {{ tab.tabName }}
          </li>
        </ul>
        <div v-if="mSelectedJojikTabIdx === 1" class="userBtns">
          <div class="managerBtns">
            <div class="searchArea">
              <input type="text" v-model="mSearchData" style="cursor:auto;"/>
              <div class="cursorP" style="background-color:#fff; padding:0px 10px;">검색</div>
            </div>
            <select v-model="selectedManage">
              <option value="전체">전체</option>
              <option v-for="(manager, index) in mSelectedBranch.manage" :key="index">{{ manager.name }}</option>
            </select>
            <span @click="addMember('addMember')" class="btnAdd cursorP">추가</span>
            <span class="btnDel cursorP">삭제</span>
            <span @click="addUser" class="btnAdd cursorP">수정</span>
          </div>
        </div>
      </div>

      <div class="detailInfos w100P">
        <jojikDetailInfo v-if="mSelectedJojikTabIdx === 0" @openPop="openPop" @openUserInfo="openUserInfo" :pPageData="pPageData" :pSelectedApp="mSelectedBranch"/>
        <jojikUesrInfo v-if="mSelectedJojikTabIdx === 1" :pSelectedApp="mSelectedBranch" :pFilteredPageData="filteredPageData" :pAddUser="addUserYn" :pCloseAddUser="closeAddUser"/>
      </div>
    </div>

</template>

<script>
import jojikDetailInfo from '@/components/admPages/adm_components/Adm_jojikDetailInfo.vue'
import jojikUesrInfo from '@/components/admPages/adm_components/Adm_jojikUserInfo.vue'
import axios from 'axios'
export default {
  components: {
    jojikDetailInfo,
    jojikUesrInfo
  },
  props: {
    pPropParams: {},
    pPageData: {},
    pMyBranches: [],
    pMyApps: {},
    pClosePage: Function
  },
  created () {
    console.log('jojikDetailWrap pPageData', this.pPageData)
    console.log('pPropParams', this.pPropParams)
    this.mSelectedBranch = this.pPageData
  },
  data () {
    return {
      mSelectedBranch: '',
      mSelectedBranchIdx: 0,
      selectedAppName: '',
      mSelectedJojikTabIdx: 0,
      jojikTabs: [
        { idx: 1, tabName: '조직 정보' },
        { idx: 1, tabName: '사용자 관리' }
      ],
      mSearchData: '',
      selectedManage: '전체',
      addUserYn: false,
      changedBranch: '',
      fromWhere: {},
      propParams: {},
      mMOrgUserList: []
      // filteredPageData: {}
    }
  },
  mounted () {
    this.getMOrgMemberList()
  },
  methods: {
    openPop () {
      this.$emit('openPop')
    },
    changeJojikTab (index) {
      this.mSelectedJojikTabIdx = index
    },
    addMember (popType) {
      this.propParams.popType = popType
      this.propParams.orgKey = this.pPageData.orgKey
      this.$emit('openPop', this.propParams)
    },
    changeSelectedBranch () {
      console.log('this.mSelectedBranch', this.mSelectedBranch)
    },
    openUserInfo (param) {
      console.log('jojikDetailWrap emit param', param)
      // this.filteredPageData(param)
      this.mSelectedJojikTabIdx = 1
    },
    async getMOrgMemberList () {
      var paramSet = {}
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.orgKey = this.pPageData.orgKey
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      var result = await axios.post('/sUniB/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { DemoYn: true } })
      if (result && result.data) {
        this.mMOrgUserList = result.data
      }
      console.log('mMOrgUserList', this.mMOrgUserList)
    }
  },
  computed: {
    uniqueManages () {
      const manages = new Set()
      this.mSelectedBranch.user.forEach(user => manages.add(user.manage))
      console.log('new Array', Array.from(manages))
      return Array.from(manages)
    },
    filteredPageData () {
      let filteredList = this.mSelectedBranch.user

      if (!this.selectedManage || this.selectedManage === '전체') {
        filteredList = this.mSelectedBranch.user
      } else {
        filteredList = this.mSelectedBranch.user.filter(user => user.manage === this.selectedManage)
      }
      if (this.mSearchData) {
        filteredList = filteredList.filter(user => user.name.includes(this.mSearchData))
      }

      return filteredList
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.topArea{
  display:flex;
  align-items:center;
  justify-content:start;
  gap:1rem;
  height:auto;
  padding:0px 0 20px;
}
.myInfoArea{
  display:flex;
  align-items:center;
  justify-content:start;
}

.bottomArea{
  padding-top:30px;
}

.jojikTab{
  list-style-type:none;
  padding:10px 20px;
  border-radius:20px 20px 0 0;
  background-color:#fff;
  border-bottom:2px solid #5F61BD;
  margin-bottom:-2px;
}
.jojikTab.selected{
  border-bottom:2px solid #fff;
  font-weight:bold;
}
.managerBtns{
  width:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:0.5rem;
}

.searchArea{
  display:flex;
  align-items:center;
  gap:0.3rem;
}
.btnDel, .btnAdd{
  padding:5px 10px;
  border:1px solid #ccc;
  background-color:#fff;
}
.btnDel{
  background-color:#eee;
}
.detailInfos{
  background-color:#fff;
  height:auto;
  padding:10px;
}

</style>
