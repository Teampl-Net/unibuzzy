<template>
  <div class="commonPageWrap">
    <div class="w100P topArea" style="height:50px;">
      <div class="backBtn mRight-1" @click="pClosePage">
        <img :src="require(`@/assets/images/common/icon_back.png`)" :alt="뒤로가기"/>
      </div>
      <div class="myInfoArea">
        <select v-model="mSelectedApp" @change="changeSelectedApp">
          <option v-for="(branch, index) in pMyBranches" :key="index" :value="branch">{{ branch.name }}</option>
        </select>
        <p class="font14" style="padding-left:10px;">IN {{ pMyApps.title }}</p>
      </div>
    </div>

    <div class="bottomArea w100P">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #5F61BD; ">
        <ul style="display:flex; align-items:center; justify-content:start; gap:1rem; margin-bottom:0;">
          <li class="jojikTab" v-for="(tab, index) in jojikTabs" :key="index" :class="{selected : mSelectedJojikTabIdx === index}" @click="changeJojikTab(index)">
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
              <option v-for="(manager, index) in pPageData.user" :key="index">{{ manager.manage }}</option>
            </select>
            <span class="btnDel cursorP">삭제</span>
            <span @click="addUser" class="btnAdd cursorP">추가</span>
          </div>
        </div>
      </div>

      <div class="detailInfos w100P">
        <jojikDetailInfo v-if="mSelectedJojikTabIdx === 0" :pPageData="pPageData" :pSelectedApp="mSelectedApp"/>
        <jojikUesrInfo v-if="mSelectedJojikTabIdx === 1" :pFilteredPageData="filteredPageData" :pAddUser="addUserYn" :pCloseAddUser="closeAddUser"/>
      </div>

    </div>
  </div>
</template>

<script>
import jojikDetailInfo from '@/components/admPages/adm_components/Adm_jojikDetailInfo.vue'
import jojikUesrInfo from '@/components/admPages/adm_components/Adm_jojikUserInfo.vue'
export default {
  components: {
    jojikDetailInfo,
    jojikUesrInfo
  },
  props: {
    pPageData: {},
    pMyBranches: [],
    pMyApps: {},
    pClosePage: Function
  },
  created () {
    console.log('pPageData', this.pPageData)
    console.log('myBranches', this.pMyBranches)
    console.log('pMyApps', this.pMyApps)
  },
  data () {
    return {
      mSelectedApp: {},
      mSelectedAppIdx: 0,
      selectedAppName: '',
      mSelectedJojikTabIdx: 0,
      jojikTabs: [
        { idx: 1, tabName: '조직 정보' },
        { idx: 1, tabName: '사용자 관리' }
      ],
      mSearchData: '',
      selectedManage: '전체',
      addUserYn: false
      // filteredPageData: {}
    }
  },
  mounted () {
    this.mSelectedApp = this.pPageData
  },
  methods: {
    changeJojikTab (index) {
      this.mSelectedJojikTabIdx = index
    },
    addUser () {
      this.addUserYn = true
    },
    closeAddUser () {
      this.addUserYn = false
    }
  },
  computed: {
    uniqueManages () {
      const manages = new Set()
      this.pPageData.user.forEach(user => manages.add(user.manage))
      console.log('new Array', Array.from(manages))
      return Array.from(manages)
    },
    filteredPageData () {
      let filteredList = this.pPageData.user

      if (!this.selectedManage || this.selectedManage === '전체') {
        filteredList = this.pPageData.user
      } else {
        filteredList = this.pPageData.user.filter(user => user.manage === this.selectedManage)
      }
      if (this.mSearchData) {
        filteredList = filteredList.filter(user => user.name.includes(this.mSearchData))
      }
      return filteredList
    }
  }
}
</script>

<style scoped>
.commonPageWrap{
  width:100%;
  height:100%;
  z-index:3;
  padding:60px 20px 0;
}
.topArea{
  display:flex;
  align-items:center;
  justify-content:start;
  gap:1rem;
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
  margin-right:10px;
}
.detailInfos{
  background-color:#fff;
  height:auto;
  padding:10px;
}

</style>
