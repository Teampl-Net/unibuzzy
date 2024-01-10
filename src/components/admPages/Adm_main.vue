<template>
  <div class="w100P h100P admPageMain">
    <div class="topArea w100P" style="height:50px;">
      <div class="myInfoArea">
        <p class="font14" style="padding-right:10px;">내 조직 IN </p>
        <select v-model="mSelectedApp" @change="setSelectedApp">
          <option v-for="(apps, index) in myApps" :key="index" :value="apps" :selected="index === mSelectedAppIdx">{{ apps.title }}</option>
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
      <div class="jojikAddBtn cursorP" @click="openPop">
        <div style="width:50px; height:50px; border-radius:50%; border:1px solid gray; font-size:30px;">+</div>
        <p class="font15" style="margin-left:0.5rem;">조직 추가</p>
      </div>
    </div>
  </div>
</template>

<script>
import jojikCompo from '@/components/admPages/adm_components/Adm_jojikCompo.vue'
export default {
  components: {
    jojikCompo
  },
  data () {
    return {
      myApps: [],
      mSelectedApp: {},
      mSelectedAppIdx: 0,
      myUerKey: 0,
      mBranchList: []
    }
  },
  created () {
    this.setMyApps()
  },
  methods: {
    openPop () {
      this.$emit('openPop')
    },
    openPage (branch) {
      this.$emit('openPage', branch, this.myApps[this.mSelectedAppIdx].branch, this.myApps[this.mSelectedAppIdx])
    },
    setMyApps () {
      this.myApps.push(
        { appKey: 0, title: '더알림', branch: [{ name: '신입사원 공식', code: 'ABC10', manage: [{ name: '일반', count: '30' }, { name: '매니저', count: 5 }, { name: '직원', count: 22 }], user: [{ name: '김보리', tel: '010-0104-0104', mail: 'bori11004@cute.cute', manage: '매니저' }, { name: '황설탕', tel: '010-1101-1101', mail: 'sugar@cute.cute', manage: '관리자' }] }, { name: '유니버지 공식', code: 'ABC10' }] },
        { appKey: 1, title: '아파트123', branch: [{ name: '개나리 아파트', code: 'ABC10' }, { name: '달팽이 아파트', code: 'ABC10' }] },
        { appKey: 2, title: '컴퍼니톡', branch: [{ name: '새움소프트', code: 'ABC10' }, { name: '헌움소프트', code: 'ABC10' }] }) // 추후 Axios로 변경
    },
    setSelectedApp () {
      // mSelectedApp의 인덱스를 찾습니다.
      this.mSelectedAppIdx = this.myApps.findIndex(app => app === this.mSelectedApp)
      // 인덱스를 기반으로 mBranchList를 설정합니다.
      if (this.mSelectedAppIdx !== -1) {
        this.mBranchList = this.myApps[this.mSelectedAppIdx].branch || []
        console.log('mBranchList:', this.mBranchList)
      } else {
        console.log('App not found')
      }
    }
  },
  mounted () {
    this.mSelectedApp = this.myApps[0]
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
  margin-top:50px;
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
}
</style>
