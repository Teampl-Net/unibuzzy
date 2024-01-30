<template>
  <p class="font12" style="text-align:right;"> 최종 업데이트 : {{ pSelectedOrg.upDated ? pSelectedOrg.upDated : '오늘' }}</p>

  <!-- 조직 기본 데이터들 -->
  <jojikCard :pSelectedOrg="pSelectedOrg"/>

  <!-- 조직 권한 설정 -->
  <div class="w100P manageTable">
    <jojikManageTable :pGE_USER="pGE_USER" :pPageData="pPageData" @openUserInfo="openUserInfo" :pSelectedOrg="pSelectedOrg" :pCloseAddManage="closeAddManage" :pAddManagerTypeYn="addManagerTypeYn"/>
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
    pSelectedOrg: Object,
    pGE_USER: {},
    pPageData: {}
  },
  created () {
    console.log('jojikDetailInfo pSelectedOrg', this.pSelectedOrg)
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
      this.propParams = this.pSelectedOrg
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
