<template>
  <p class="font13" style="text-align:right;"> 최종 업데이트 : {{ pSelectedApp.upDated ? pSelectedApp.upDated : '오늘' }}</p>

  <!-- 조직 기본 데이터들 -->
  <jojikCard :pSelectedApp="pSelectedApp"/>

  <!-- 조직 권한 설정 -->
  <div class="w100P manageTable">
    <jojikManageTable :pPageData="pPageData" @openUserInfo="openUserInfo" :pSelectedApp="pSelectedApp" :pCloseAddManage="closeAddManage" :pAddManagerTypeYn="addManagerTypeYn"/>
  </div>

</template>

<script>
import jojikCard from '@/components/admPages/adm_components/Adm_jojikCard.vue'
import jojikManageTable from '@/components/admPages/adm_components/Adm_jojikManageTable.vue'
export default {
  components: {
    jojikManageTable,
    jojikCard
  },
  props: {
    pSelectedApp: Object,
    pPageData: {}
  },
  created () {
    console.log('jojikDetailInfo pSelectedApp', this.pSelectedApp)
  },
  data () {
    return {
      moreOpen: false,
      propParams: {}
    }
  },
  methods: {
    saveManage () {
      return false
    },
    openPop (popType) {
      this.propParams = this.pSelectedApp
      this.propParams.popType = popType
      this.$emit('openPop', this.propParams)
    },
    openUserInfo (param) {
      console.log('jojnikDetailInfo emit param', param)
      this.$emit('openUserInfo', param)
    }
  }

}
</script>

<style scoped>

.jojikInfoWrap{
  border:1px solid gray;
  padding:20px;
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

.manageTable{
  height:auto;
}

</style>
