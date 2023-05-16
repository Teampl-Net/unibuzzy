<template>
<div style="height: 100%; width:100%;">
    <!-- <div style="width:100%; height:calc(100%);" > -->
        <memberListCompo class="fl" style="margin-top: 50px; padding: 0 1rem; height: 50%; background-color:white; overflow:auto;" :listData="memberList" ref="memberListCompo"  :parentSelectList="pList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="propData" />
        <selectedListCompo class="fl" style="height:calc(50% - 50px);" @addMemberList="changeDirectMemList" @openAddPop="openNewMemberPop" :selectMemberPopYn="true" ref="selectedListCompo" :currentTeamKey="this.propData.currentTeamKey"  @changeSelectedList="changeSelectedList" :listData='selectedList' :btnVisible='true' @btnClick='setManager' />
    <!-- </div> this.propData.selectMemberType==='member'? true:false -->
    <gConfirmPop :confirmText="this.propData.selectMemberType === 'member'? '구성원을 추가하시겠습니까?': '매니저를 추가하시겠습니까?'" confirmType='two' @no='confirmPopShowYn = false' @ok="saveMember" v-if="confirmPopShowYn"/>

</div>
</template>

<script>
// eslint-disable-next-line
import memberListCompo from './Tal_commonBookMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
  props: {
    propData: {},
    pSelectedList: {}
  },
  data () {
    return {
      memberList: [],
      selectedList: [{ memberList: [] }],
      pList: [{ memberList: [] }],
      receiverTitle: '신청 목록',
      confirmPopShowYn: false,
      confirmText: '',
      directAddMemList: []

    }
  },
  created () {
    var a = {}
    this.getFollowerList()
    a.memberList = this.pSelectedList
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.memberListOpen = true
    this.pList = a
    console.log('**********************')
    console.log(this.pList)
    console.log(this.pSelectedList)
    console.log(this.propData.memberListOpen)
    if (this.propData.editBookOpend === true) { this.pList = [] }
  },
  components: { memberListCompo, selectedListCompo },
  methods: {
    async changeDirectMemList (data) {
      this.directAddMemList.push(data)
      if (this.selectedList.memberList) {
      } else {
        this.selectedList.memberList = []
      }
      const newArr = [
        ...this.selectedList.memberList,
        data
      ]
      this.selectedList.memberList = newArr
      // this.$refs.selectedListCompo.upDatePage()

      await this.changeSelectMemberList(this.selectedList.memberList)
    },
    async getFollowerList () {
      var paramMap = new Map()

      paramMap.set('teamKey', this.propData.currentTeamKey)
      paramMap.set('showProfileYn', true)
      // paramMap.set('followerType', 'M')
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      this.memberList = result.data.content
      if (this.memberList) {
        for (var i = this.memberList.length - 1; i >= 0; i--) {
          if (this.propData.selectMemberType === 'manager') {
            if (this.memberList[i].managerKey !== undefined && this.memberList[i].managerKey !== null && this.managerKey !== '') {
              this.memberList.splice(i, 1)
            }
          } else if (this.propData.selectMemberType === 'member') {
            if (this.pSelectedList && this.pSelectedList.length > 0) {
              for (var p = 0; p < this.pSelectedList.length; p++) {
                if (this.pSelectedList[p].userKey === this.memberList[i].userKey) {
                  this.memberList.splice(i, 1)
                  break
                }
              }
            }
          }

          if (this.memberList[i] !== undefined && this.memberList[i] !== null && this.memberList[i] !== '') {
            this.memberList[i].selectedYn = false
            if (this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {
            } else {
              this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
            }
          }
        }
      }
    },
    openNewMemberPop () {
      this.newYn = true
      var param = {}
      param.targetType = 'bookMemberDetail'
      param.currentCabinetKey = this.propData.cabinetKey
      param.currentTeamKey = this.propData.currentTeamKey
      param.newMemYn = true
      param.popHeaderText = '유저 추가'
      this.$emit('openPop', param)
    },
    changeSelectMemberList (data) {
      this.selectedList.memberList = data
      console.log(this.selectedList.memberList)

      this.$refs.selectedListCompo.upDatePage()
    },
    changeSelectedList (data) {
      var changeList = data.memberList
      for (var m = 0; m < this.memberList.length; m++) {
        this.memberList[m].selectedYn = false
        for (var c = 0; c < changeList.length; c++) {
          // eslint-disable-next-line no-debugger
          debugger
          if (changeList[c].userKey === this.memberList[m].userKey) {
            this.memberList[m].selectedYn = true
          }
        }
      }
      // this.$refs.memberListCompo.deSelectList(data.index)
    },
    refresh () {
      this.getFollowerList()
    },
    async saveMember () {
      var userKeyList = []
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // eslint-disable-next-line no-unused-vars
      var result = null
      for (var i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i].selectedYn) {
          userKeyList.push(this.memberList[i].userKey)
        }
      }
      if (this.propData.selectMemberType === 'manager') {
        param.teamKey = this.propData.currentTeamKey
        if (userKeyList && userKeyList.length > 0) {
          param.userKeyList = userKeyList
          result = await this.$commonAxiosFunction({
            url: '/service/tp.saveManager',
            param: param
          })
        }
        if (this.directAddMemList !== undefined && this.directAddMemList !== null && this.directAddMemList.length > 0) {
          var follower = null
          for (var u = 0; u < this.directAddMemList.length; u++) {
            // eslint-disable-next-line no-new-object
            follower = new Object()
            // eslint-disable-next-line no-new-object
            param = new Object()
            follower.teamKey = this.propData.currentTeamKey

            follower.inEmail = this.directAddMemList[u].userEmail
            follower.inPhone = this.directAddMemList[u].userPhone
            follower.teamName = this.propData.teamNameMtext || this.propData.nameMtext
            follower.inUserName = this.$changeText(this.directAddMemList[u].userDispMtext || this.directAddMemList[u].userNameMtext)
            follower.userName = this.$changeText(this.directAddMemList[u].userDispMtext || this.directAddMemList[u].userNameMtext)
            param.follower = follower
            result = await this.$commonAxiosFunction({
              url: '/service/tp.saveManager',
              param: param
            })
          }
        }
      } else {
        // eslint-disable-next-line no-new-object
        if (userKeyList !== undefined && userKeyList !== null && userKeyList.length > 0) {
          param.userKeyList = userKeyList
          param.cabinetKey = this.propData.cabinetKey
          param.targetKey = this.propData.currentTeamKey
          await this.$saveMCabContents(param).then(response => {
            var thisParam = {}
            thisParam.cabinetType = 'member'
            this.$emit('saveCabinet', thisParam)
          })
        }

        if (this.directAddMemList !== undefined && this.directAddMemList !== null && this.directAddMemList.length > 0) {
          // eslint-disable-next-line no-new-object
          var mCabContents = new Object()
          for (var d = 0; d < this.directAddMemList.length; d++) {
            // eslint-disable-next-line no-new-object
            mCabContents = new Object()
            // eslint-disable-next-line no-new-object
            param = new Object()
            mCabContents.jobkindId = 'USER'
            mCabContents.cabinetKey = this.propData.cabinetKey
            mCabContents.targetKey = this.propData.currentTeamKey

            mCabContents.inEmail = this.directAddMemList[d].userEmail
            mCabContents.inPhone = this.directAddMemList[d].userPhone
            mCabContents.inUserName = this.$changeText(this.directAddMemList[d].userDispMtext || this.directAddMemList[u].userNameMtext)
            param.mCabContents = mCabContents
            result = await this.$saveMCabContents(param)
          }
        }
      }

      this.confirmPopShowYn = false
      this.$emit('closeXPop', true)

      /* if (result.data.result === true && result.data.message === 'OK') {
                this.$emit('closeXPop', true)
            } */
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      hStack = hStack.filter((element, index) => index < hStack.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', hStack)
      this.$emit('closeXPop', true)
    },
    async setManager (list) {
      this.confirmPopShowYn = true
    }

  }
}
</script>

<style>

</style>
