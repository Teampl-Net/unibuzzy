<template>
  <div class="w100P h100P admPageMain">
    <div class="topArea w100P">
      <div class="myInfoArea">
        <p class="font30" style="padding-right:10px;">내 조직 IN </p>
        <select v-model="mSelectedApp" @change="setSelectedApp" style="height:30px;">
          <option v-for="(apps, index) in pMyAppList" :key="index" :value="apps" :selected="index === mSelectedAppIdx">{{ apps.title }}</option>
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
      <div class="jojikAddBtn cursorP" @click="openPop('addGroup')">
        <div style="width:50px; height:50px; border-radius:50%; border:1px solid gray; font-size:30px; line-height:50px;">+</div>
        <p class="font15" style="margin-left:0.5rem;">조직 추가</p>
      </div>
    </div>
  </div>
</template>

<script>
import jojikCompo from '@/components/admPages/adm_components/Adm_jojikCompo.vue'
export default {
  props: {
    pMyAppList: []
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
      propParams: {}
    }
  },
  created () {
    console.log('pMyAppList', this.pMyAppList)
  },
  methods: {
    openPop (popType) {
      this.propParams.popType = popType
      this.$emit('openPop', this.propParams)
    },
    openPage (branch) {
      this.propParams.selBranch = branch
      this.propParams.branch = this.pMyAppList[this.mSelectedAppIdx].branch
      this.propParams.myApps = this.pMyAppList[this.mSelectedAppIdx]
      this.propParams.pageType = 'jojikDetail'
      this.$emit('openPage', this.propParams)
    },
    setSelectedApp () {
      // mSelectedApp의 인덱스를 찾습니다.
      this.mSelectedAppIdx = this.pMyAppList.findIndex(app => app === this.mSelectedApp)
      // 인덱스를 기반으로 mBranchList를 설정합니다.
      if (this.mSelectedAppIdx !== -1) {
        this.mBranchList = this.pMyAppList[this.mSelectedAppIdx].branch || []
        console.log('mBranchList:', this.mBranchList)
      } else {
        console.log('App not found')
      }
    }
  },
  mounted () {
    this.mSelectedApp = this.pMyAppList[0]
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
  padding:20px 0;
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
  border:1px solid rgb(199, 199, 199);
  display:flex;
  align-items:center;
  padding:10px 20px;
  background-color: #fff;
}
</style>
