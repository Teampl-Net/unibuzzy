<template>
  <div class="jojikInfoWrap w100P">
    <div class="defaultInfos w100P">
      <div style="display:flex; align-items:center;">
        <div class="imgInfo"></div>
        <div class="textInfo">
          <p class="font15">{{ mSelectedBranch.orgName ? mSelectedBranch.orgName : '새 조직' }}</p>
          <!-- <p class="font13">{{ mSelectedBranch.orgKey ? mSelectedBranch.orgKey : '00' }}</p> -->
        </div>
      </div>
      <div>
        <p class="font14">{{ mSelectedBranch.orgType && mSelectedBranch.orgType === 'C' ? '회사' : mSelectedBranch.orgType === 'A' ? '아파트' : '학교' }}</p>
        <p class="font13">🙍🏻‍♂️{{ mSelectedBranch.allCount ? mSelectedBranch.allCount : '미측정' }}</p>
      </div>
    </div>

    <div class="w100P detailInfos">
      <div class="w100P" style="padding-bottom:10px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #ccc;">
        <p class="font15" style="width:calc(100% - 20px)' text-align:left;">{{ mSelectedBranch.orgDesc ? mSelectedBranch.orgDesc : '안녕하세요, 우리 조직을 소개합니다.' }}</p>
        <div v-if="moreOpen===false" class="cursorP" @click="showMore" style="width:20px;">➕</div>
        <div v-if="moreOpen===true" class="cursorP" @click="showMore" style="width:20px;">➖</div>
      </div>
      <div v-if="moreOpen" class="w100P" style="padding-top:10px;">
        <div style="display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <p class="font14">📫{{ mSelectedBranch.address ? mSelectedBranch.address : mSelectedBranch.orgName + '의 주소입니다.' }}</p>
          <p class="font14">👜***-***-****</p>
        </div>
        <div class="w100P" style="display:flex; align-items:center; justify-content:space-between; text-align:left;">
          <p class="font14" style="calc(100% - 20px);">🤵🏻‍♂️{{ mSelectedBranch.founder ? mSelectedBranch.founder : '대표명 (010-1111-1111)' }}</p>
          <p @click="openPop('editGroup')" class="font16 cursorP" style="width:20px;">⚙️</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pSelectedApp: Object,
    pMyOrgList: [],
    appKey: Number,
    orgKey: Number
  },
  created () {
    if (this.pSelectedApp) {
      this.mSelectedBranch = this.pSelectedApp
    } else {
      console.log('jojikCard Props', this.pSelectedApp, this.pMyOrgList, this.appKey, this.orgKey)
      if (this.appKey && this.orgKey && this.pMyOrgList) {
        this.orgDetails = this.pMyOrgList.filter(app => app.appKey === Number(this.appKey))
        console.log('this.orgDetails', this.orgDetails)
      }
      this.mSelectedBranch = this.orgDetails[0].branch.filter(branch => branch.orgKey === Number(this.orgKey))
      this.mSelectedBranch = this.mSelectedBranch[0]
      console.log('this.mSelectedBranch', this.mSelectedBranch)
    }
  },
  data () {
    return {
      moreOpen: false,
      orgDetails: {},
      mSelectedBranch: {}
    }
  },
  methods: {
    showMore () {
      this.moreOpen = !this.moreOpen
    }
  }

}
</script>

<style scoped>
.jojikInfoWrap{
  border:1px solid gray;
  padding:20px;
  background-color:#fff;
}
.defaultInfos{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.imgInfo{
  width:70px;
  height:70px;
  border-radius:50%;
  background-color:pink;
}
.textInfo{
  text-align:left;
  margin-left:0.5rem;
}
.detailInfos{
  height:auto;
  display:flex;
  flex-direction:column;
  align-items:start;
  justify-content:center;
  padding-top:30px;
}

</style>
