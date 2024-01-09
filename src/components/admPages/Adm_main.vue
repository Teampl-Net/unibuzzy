<template>
  <div class="w100P h100P admPageMain">
    <div class="topArea w100P" style="height:50px;">
      <div class="myInfoArea">
        <p class="font14" style="padding-right:10px;">내 조직 IN </p>
        <select v-model="mSelectedApp" @change="setSelectedApp">
          <option v-for="(apps, index) in myApps" :key="index" :value="apps">{{ apps.title }}</option>
        </select>
      </div>
      <div class="searchArea"></div>
    </div>

    <div class="w100P" style="border:1px solid red;">
      <div v-for="(branch, index) in mBranchList" :key="index">{{ branch }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myApps: [],
      mSelectedApp: {},
      myUerKey: 0,
      mBranchList: []
    }
  },
  created () {
    this.setMyApps()
  },
  methods: {
    setMyApps () {
      this.myApps.push(
        { appKey: 0, title: '더알림', branch: ['더알림 공식', '유니버지 공식'] },
        { appKey: 1, title: '아파트123', branch: ['개나리 아파트', '달팽이 아파트'] },
        { appKey: 2, title: '컴퍼니톡', branch: ['새움소프트', '헌움소프트'] }) // 추후 Axios로 변경
    },
    setSelectedApp () {
    }
  },
  watch: {
    mSelectedApp: {
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
</style>
