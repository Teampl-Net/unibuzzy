<template>
  <div v-if="mSelectedBranch" id="admLayout">
    <div v-if="!mIframeYn" class="w100P topArea">
      <div class="backBtn mRight-1 cursorP" @click="gotoBack">
        <img :src="require(`@/assets/images/common/icon_back.png`)" :alt="뒤로가기"/>
      </div>
      <div v-if="mAppDetail && mAppDetail.length > 0" class="myInfoArea">
        <select v-model="mSelectedBranch" @change="changeSelectedBranch" style="height:30px;">
          <option v-for="(branch, index) in mSelectedBranch" :key="index" :value="branch">{{ branch.orgName ? branch.orgName : '새 조직' }}</option>
        </select>
        <!-- <p class="font30" style="padding-left:10px;">IN {{ pPropParams.myApps ? pPropParams.myApps.title : '' }}</p> -->
        <p class="font30" style="padding-left:10px;">관리자 페이지</p>
      </div>
    </div>

    <div class="bottomArea w100P">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #5F61BD; ">
        <ul style="display:flex; align-items:center; justify-content:start; gap:1rem; margin-bottom:-1px;">
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
            <span @click="gotoAddMember" class="btnAdd cursorP">추가</span>
            <span class="btnDel cursorP">삭제</span>
            <span @click="addUser" class="btnAdd cursorP">수정</span>
          </div>
        </div>
      </div>

      <div class="detailInfos w100P">
        <jojikDetailInfo v-if="mSelectedJojikTabIdx === 0" :orgKey="orgKey" @openPop="openPop" @openUserInfo="openUserInfo" :pPageData="pPageData" :pSelectedOrg="mSelectedBranch"/>
        <jojikUesrInfo v-if="mSelectedJojikTabIdx === 1" :orgKey="orgKey" :pSelectedOrg="mSelectedBranch" :pFilteredPageData="filteredPageData" :pAddUser="addUserYn" :pCloseAddUser="closeAddUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import jojikDetailInfo from '@/components/admPages/adm_components/Adm_jojikDetailInfo.vue'
import jojikUesrInfo from '@/components/admPages/adm_components/Adm_jojikUserInfo.vue'
// import axios from 'axios'
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
    pClosePage: Function,
    orgKey: Number,
    pMyOrgList: []
  },
  created () {
    window.addEventListener('message', (e) => this.receiveMessage(e), false)
    if (this.pSelectedApp) {
      this.mSelectedBranch = this.pSelectedApp
    } else {
      if (this.orgKey && this.pMyOrgList) {
        this.mAppDetail = this.pMyOrgList.filter(org => org.orgKey === Number(this.orgKey))
        console.log('this.mAppDetail', this.mAppDetail)
        this.mSelectedBranch = this.mAppDetail[0]
        console.log('this.mSelectedBranch', this.mSelectedBranch)
      }
      if (location.search) {
        const urlParam = this.getParamMap(location.search)
        console.log(urlParam)
        if (urlParam.appToken) {
          this.$APP_CONFIG.appToken = urlParam.appToken
          if (this.$route.params.orgKey) {
            this.getOrgList(Number(this.$route.params.orgKey))
          }
        }
      }
    }
  },
  data () {
    return {
      mSelectedBranch: null,
      mOtherAppUserInfo: null,
      mIframeYn: window.self !== window.top,
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
      mMOrgUserList: [],
      mBranchList: [],
      mAppDetail: {}
      // filteredPageData: {}
    }
  },
  mounted () {
  },
  methods: {
    receiveMessage (event, callback) {
      const basedUrl = 'http://192.168.0.78:9443'
      if (event.origin.includes('mankik') || event.origin.includes('localhost') || event.origin.includes('192.168') || event.origin.includes('hybric') || event.origin.includes(basedUrl)) {
        try {
          if (event.data && !event.data.type) {
            const result = JSON.parse(event.data)
            if (result.data) {
              this.mOtherAppUserInfo = result.data
              // this.$APP_CONFIG.appToken = result.data.appToken
              // this.getOrgList(this.mOtherAppUserInfo.orgKey)
            }
            if (callback) {
              callback(result)
            }
          }
          console.log(event)
        } catch (error) {
          console.log(error)
        }
      }
    },
    gotoAddMember () {
      this.$router.push(`/addMember/${this.orgKey}`)
    },
    getParamMap (urlString) {
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    },
    async getOrgList (orgKey) {
      var paramSet = { orgKey: orgKey }
      var result = await this.$axios.post('/sUniB/tp.getOrgList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.GE_USER.userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result && result.data) {
        this.mSelectedBranch = result.data.org[0]
      }
    },
    gotoBack () {
      this.$router.push('/admMain')
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changeJojikTab (index) {
      this.mSelectedJojikTabIdx = index
      if (index === 1) {
        this.mSelectedJojikTabIdx = 1
        // this.$router.push(`/memberList/${this.orgKey}`)
      }
    },
    // addMember (popType) {
    //   this.propParams.popType = popType
    //   this.propParams.orgKey = this.pPageData.orgKey
    //   this.$emit('openPop', this.propParams)
    // },
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
      paramSet.orgKey = this.mSelectedBranch.orgKey
      var result = await this.$axios.post('/sUniB/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result && result.data) {
        this.mMOrgUserList = result.data
      }
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
      if (this.mOtherAppUserInfo !== null && this.mOtherAppUserInfo.userKey !== null) {
        return this.mOtherAppUserInfo
      } else {
        return this.$store.getters['D_USER/GE_USER']
      }
    }
  },
  watch: {
    mSelectedBranch: {
      handler (val, old) {
        if (!old && val) {
          this.getMOrgMemberList()
        }
      }
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
  margin-bottom:-1px;
}
.jojikTab.selected{
  border-bottom:2px solid #fff;
  font-weight:bold;
  background-color:#fff;
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
