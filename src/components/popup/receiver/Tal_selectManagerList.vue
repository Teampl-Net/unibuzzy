<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  />
    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: auto;" >
        <div style="width: 100%; height:100%; position: relative; float: left;">
        <memberList  @openAddPop='openAddManagerPop' @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.propData" style="position: absolute; top: 0; overFlow: hidden scroll; height: 100% background: #fff;"/>
        <!-- <memberList :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); background: #fff;"/> -->
        </div>
        <!-- <selectedListCompo @changeSelectedList="changeSelectedList" ref="selectedListCompo" style="float: left;" transition="showGroup" :listData='selectedList' @btnClick="sendReceivers" /> -->

    </div>
    <div class="btnPlus" @click="openAddManagerPop" ><p style="font-size: 40px;">+</p></div>
</div>

</template>

<script>
import memberList from './Tal_commonBookMemberList.vue'
// import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
  props: {
    // selectPopYn: {},
    // chanInfo: {},
    // detailSelectedYn: {},
    // selectedListYn: {},
    propData: {}
    // pSelectedList: {}
  },
  created () {
    console.log('######!@#!@#!#@!#!@#@!########')
    console.log(this.propData)
  },
  computed: {

  },
  components: { memberList },
  data () {
    return {
      // openAddManagerPopYn:false
    }
  },
  methods: {
    backClick () {
      this.$emit('closeXPop')
    },
    openMCabUserList (data) {
      this.selectBookDetail = data
      this.receiverTitle = '구성원 관리'
      if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '') {
        this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
      } else {
        this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
      }
    },
    openAddManagerPop () {
      var param = {}
      param.targetType = 'bookMemberDetail'
      // param.currentCabinetKey = this.propData.cabinetKey
      param.currentTeamKey = this.propData.currentTeamKey

      this.$emit('openPop', param)

      // this.openAddManagerPopYn = true
    }

  }
}
</script>

<style >

</style>
