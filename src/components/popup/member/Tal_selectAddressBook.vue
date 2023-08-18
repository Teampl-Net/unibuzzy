<template>
    <div style="width: 100%; height: calc(100% - 310px); position: relative; float: left; margin-top:50px;">
      <bookList :listData="bookList" :teamInfo="this.propData" :selectPopYn="true" @changeSelectBookList="changeSelectBookList" :propData="propData" :selectBookDetail="selectBookDetail" style="position: absolute; height: calc(100%); overFlow: hidden scroll; top: 0; background: #fff;"/>
      <selectedListCompo :selectShareTargetYn="false" @addMemberList="addMe" :currentTeamKey="propData.teamKey"  @changeSelectedList="changeSelectedList" ref="selectAddressListCompo"  :listData='selectedList'  @btnClick='addressPushData' style="float: left; wdith:100%; height:310px; position: absolute; bottom:0px; left:0px" />
    </div>
</template>
<script>
/* eslint-disable */
import bookList from '../receiver/receiverUnit/D_commonBookList.vue'
import selectedListCompo from '../receiver/D_selectedReceiverList.vue'
export default {
  components: { bookList, selectedListCompo },
  data () {
    return {
      bookList: [],
      selectedList: {}
    }
  },
  props: {
    propData: {}
  },
  created () {
    this.getBookList()
  },
  methods: {
    async getBookList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey || this.propData.teamKey || this.propData.targetKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      })
      this.bookList = result.data
      if (this.bookList) {
        for (var i = 0; i < this.bookList.length; i++) {
          var changeT = this.bookList[i].cabinetNameMtext
          this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
        }
      }
      this.editBookSelectedList()
      //
    },
    async addressPushData (list) {
      // eslint-disable-next-line no-new-object

      // eslint-disable-next-line no-new-object
      var mCabContents = new Object()
      var param = {}
      mCabContents.jobkindId = 'USER'
      // mCabContents.cabinetKey = this.propData.currentCabinetKey
      mCabContents.ownUserKey = this.propData.userKey
      mCabContents.targetKey = this.propData.teamKey

      if (list.bookList) {
        for (let i = 0; i < list.bookList.length; i++) {
          mCabContents.cabinetKey = list.bookList[i].cabinetKey
          param.mCabContents = mCabContents
          var result = await this.$saveMCabContents(param)
        }
      }
      if (result.data.result === true) {
        this.$emit('closeXPop', true)
      }
    },
    changeSelectBookList (data) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selectedList.bookList = data
      this.$refs.selectAddressListCompo.upDatePage()
    },
    changeSelectedList (selectedListData) {
      this.selectedList = selectedListData
      this.editBookSelectedList()
      this.$refs.selectedListCompo.upDatePage()
    },
    editBookSelectedList () {
      if (this.selectedList.bookList) {
        var changeList = this.selectedList.bookList
        for (var m = 0; m < this.bookList.length; m++) {
          this.bookList[m].selectedYn = false
          for (var c = 0; c < changeList.length; c++) {
            if (changeList[c].cabinetKey === this.bookList[m].cabinetKey) {
              this.bookList[m].selectedYn = true
            }
          }
        }
      }
    }
  }
}
</script>
<style>

</style>
