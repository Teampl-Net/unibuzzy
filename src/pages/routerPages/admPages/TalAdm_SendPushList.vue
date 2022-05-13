<template>
    <div style="position: relative; width: 100%; height: 100%;">
      <div v-if="subLeftMenuShowYn === true" @click="this.subLeftMenuShowYn = false" style="width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; z-index: 99; background: rgb(0 0 0 / 10%);"></div>
      <subLeftMenu  v-if="subLeftMenuShowYn" @closeLeftMenu="this.subLeftMenuShowYn= false" style="position: absolute; left: 0; background: #FFF; z-index: 999; border-right:1px solid #6768A7; " pageType="sendPushList" title="전체알림" />
      <img src="../../../assets/images/common/channerList_open.png" @click="subLeftMenuShowYn = true" v-if="subLeftMenuShowYn === false"   style="position: absolute; top: 0.7rem; left: 0;" alt="">
      <div style="width: 100%; height: 50px; padding: 15px 10px; border-bottom: 1px solid #ccc; display: flex;">
        <p class="listTitle fl w-50P mleft-1 textLeft" style="border-right: 1px solid $ccc;">전체알림</p>
        <div class="fl w-50P">
          <p class="listTitle fl textLeft" id="alimDetailTitle" >알림상세</p>
          <div class="fr">
            <gBtnSmall class="mtop-05" btnTitle="수신확인" />
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 100%; display: flex;">
        <div class="leftPage">
            <pushList  @openPop="openPushDetailPop" :chanDetailKey="this.chanDetailKey"/>
        </div>
        <div class="rightPage">
            <pushDetail style="height: 100%; padding-top: 10px;" v-if="detailYn" :detailVal="this.detailVal"  />
        </div>
      </div>
    </div>
</template>

<script>
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import pushDetail from '../../../components/commonPopup/components/Tal_pushDetail.vue'
import subLeftMenu from '../../../components/unit/admUnit/TalAdm_subLeftMenu.vue'
export default {
  components: {
    pushList,
    pushDetail,
    subLeftMenu
  },
  data () {
    return {
      chanDetailKey: '',
      detailVal: [],
      subLeftMenuShowYn: false,
      detailYn: false
    }
  },
  props: {
  },
  created () {
    this.chanDetailKey = JSON.parse(localStorage.getItem('sessionTeam')).teamKey
  },
  methods: {
    openPushDetailPop (param) {
      this.detailVal = param
      this.detailYn = true
    }
  }
}
</script>
<style scoped>

.leftPage {width: 50%; height: 100%; position: relative; float: left; padding: 0px 20px;}
.rightPage {width: 50%; height: 100%; position: relative; float: left; padding: 0px; border-left: 1px solid #ccc}

.listTitle{color:#6768A7; font-size: 16px; font-weight: bold;}

@media screen and (max-width:730px) {
    .leftPage, .rightPage {width: 100%;}
    .rightPage, #alimDetailTitle {display: none!important;}
}
</style>
