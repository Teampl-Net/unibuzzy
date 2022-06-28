<template>
    <!-- <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" :chanName="this.$changeText(this.propData.teamNameMtext)" /> -->
    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); padding-top: 50px; overflow: auto;" >
        <div style="width: 100%; height: calc(100% - 310px); position: relative; float: left;">
        <memberList ref="managerListCompo" :managerOpenYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.propData" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); background: #fff;"/>
        <!-- <memberList :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); background: #fff;"/> -->
        </div>
        <!-- <selectedListCompo @changeSelectedList="changeSelectedList" ref="selectedListCompo" style="float: left;" transition="showGroup" :listData='selectedList' @btnClick="sendReceivers" /> -->

    </div>
    <div class="btnPlus" @click="openAddManagerPop" ><p style="font-size: 40px;">+</p></div>
    <selectBookList :propData="propData" v-if="selectBookListShowYn" @closeXPop='selectBookListShowYn = false' :pSelectedList='list' @sendReceivers='setSelectedList'/>

</template>

<script>
/* eslint-disable */
import memberList from './Tal_commonBookMemberList.vue'
// import selectBookList from '../receiver/Tal_selectBookList.vue'
// import selectedListCompo from './Tal_selectedReceiverList.vue'
import selectBookList from '../receiver/Tal_managerList.vue'
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
    // alert(JSON.stringify(this.propData.teamNameMtext))
  },
  computed: {
  },
  components: { memberList, selectBookList },
  data () {
    return {
      // openAddManagerPopYn:false
      selectBookListShowYn : false,
      receiverTitle: '매니저 관리',
      list:[]
    }
  },
  methods: {
    refresh () {
      this.$refs.managerListCompo.refresh()
    },
    backClick () {
      this.$emit('closeXPop')
    },
    openMCabUserList (data) {
      this.selectBookDetail = data
      if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '') {
        this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
      } else {
        this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
      }
    },
    async openAddManagerPop () {
      var params = new Object()
      params.teamKey = this.propData.currentTeamKey
      params.memberYn = true
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerList',
        param: params
      })

      console.log('##############');
      console.log(result.data.content);
      this.list = result.data.content
      // this.list = []
      console.log(this.list);

      this.selectBookListShowYn = true

      // var param = {}
      // param.targetType = 'bookMemberDetail'
      // // param.currentCabinetKey = this.propData.cabinetKey
      // param.currentTeamKey = this.propData.currentTeamKey

      // this.$emit('openPop', param)

      // this.openAddManagerPopYn = true
    }

  }
}
</script>

<style >

</style>
