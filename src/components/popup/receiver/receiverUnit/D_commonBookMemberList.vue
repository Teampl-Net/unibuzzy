<i18n>
  {
    "ko": {
      "SELECT_MSG_MEMBERS_NONE": "멤버가 없어요.",
      "SELECT_MSG_MEMBERS_ADD": "버튼을 눌러 멤버를 추가해보세요.",
      "SELECT_MSG_ADDRESS_DELETED": "주소가 삭제되었습니다.",
    },
    "en": {
      "SELECT_MSG_MEMBERS_NONE": "There are no members.",
      "SELECT_MSG_MEMBERS_ADD": "Press the button to add the members.",
      "SELECT_MSG_ADDRESS_DELETED": "The address has been deleted."
    }
  }
</i18n>
<template>
  <div class="receiverTeamMemberArea" >
    <template v-for="(data, index) in mCommonMemberList" :key='data'>
      <gReceiveCard :propData="data" :option="selectPopYn === true ? 'SELE' : 'EDIT'" :pPropMemberList="propMemberList" :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
    </template>
    <gListEmpty v-if="mCommonMemberList.length === 0" :title="$t('SELECT_MSG_MEMBERS_NONE')" :subTitle="$t('SELECT_MSG_MEMBERS_ADD')" :option="selectPopYn === true ? 'SELE' : 'EDIT'" />
  </div>
</template>

<script>
import gReceiveCard from './D_commonReceiveCard .vue'
export default {
  components: { gReceiveCard },
  props: {
    teamInfo: {},
    propMemberList: {},
    propData: {},
    selectPopYn: {},
    parentSelectList: {},
    pSearchFilterList: {}
  },
  data () {
    return {
      mCommonMemberList: [],
      mSelectedMemberList: [],
      mSearchFilterList: []
    }
  },
  updated () {
    if (this.pSearchFilterList) {
      this.mSearchFilterList = this.pSearchFilterList
    }
    this.setMemberList()
  },
  created () {
    console.log('this.propMemberList = 이 채널을 팔로우하는 모든 사람', this.propMemberList)
    var this_ = this
    this.$nextTick(() => {
      this_.setMemberList()

      if (this_.pSearchFilterList) {
        this_.mSearchFilterList = this_.pSearchFilterList
      }
      if (this_.parentSelectList) {
        this_.mSelectedMemberList = []
        this_.mSelectedMemberList = JSON.parse(JSON.stringify(this_.parentSelectList))
        this_.setParentSelectList()
      }
    })
  },
  methods: {
    deleteSelectedMember (data, onlyUpdateYn) {
      // 실제 선택한 데이터 중 멤버를 삭제하는 작업
      if (onlyUpdateYn) {
        this.mSelectedMemberList = data
      } else {
        var findIdx = this.mSelectedMemberList.findIndex(item => item.accessKey === data.userKey)
        console.log(this.mSelectedMemberList)
        console.log(data)
        if (findIdx !== -1) {
          this.mSelectedMemberList.splice(findIdx, 1)
        }
        this.$emit('changeSelectMemberList', this.mSelectedMemberList)
      }
      this.setParentSelectList()
    },

    receiveCardEmit (param) {
      var type = param.targetType
      var data = param.data
      var idx = param.index
      if (type === 'open') {
        this.openProfilePop(data, idx)
      } else if (type === 'delete') {
        this.deleteMemberClick(data, idx)
      } else if (type === 'add') {
        this.addSelectedList(data, idx)
      } else if (type === 'deleteList') {
        this.deleteSelectedMember(data)
      }
    },
    setMemberList () {
      this.mCommonMemberList = this.propMemberList
      for (let i = 0; i < this.mCommonMemberList.length; i++) {
        this.mCommonMemberList[i].jobkindId = 'USER'
      }
    },
    async refresh () {
      if (this.propData.selectMemberType === 'manager') { await this.getFollowerList() } else { this.$emit('refreshList') }
    },
    setParentSelectList () {
      var tempList = this.mCommonMemberList
      this.mCommonMemberList = []
      if (this.mSelectedMemberList) {
        for (var i = 0; i < tempList.length; i++) {
          tempList[i].selectedYn = false
          for (var s = 0; s < this.mSelectedMemberList.length; s++) {
            if (this.mSelectedMemberList[s].accessKey === tempList[i].userKey) {
              tempList[i].selectedYn = true
              break
            }
          }
        }
      }
      this.mCommonMemberList = tempList
    },
    deleteMemberClick (data, index) {
      var param = {}
      param.data = data
      param.index = index
      param.targetType = 'member'
      this.$emit('delAddress', param)
    },
    async deleteMember (data, index) {
      // 주소록 관리에서 주소 삭제가 안되기에 주석처리 하였음.
      // if (this.propData.value.creUserKey !== data.userKey) {
      if (this.propData.selectMemberType === 'manager') {
        this.$emit('deleteManager', data)
      } else {
        var param = {}
        param.mccKey = data.mccKey
        param.jobkindId = data.jobkindId
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteMCabContents',
          param: param
        })
        if (result.data === 'true' || result.data === true) {
          this.mCommonMemberList = []
          this.$emit('refreshList')
          this.$showToastPop(this.$t('SELECT_MSG_ADDRESS_DELETED'))
        }
      }
    },
    openProfilePop (data, index) {
      data.targetType = 'bookMemberDetail'
      data.currentCabinetKey = data.cabinetKey
      data.currentTeamKey = this.teamInfo.teamKey
      data.teamKey = this.teamInfo.teamKey
      data.readOnlyYn = true
      data.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      this.$emit('openPop', data)
    },
    addSelectedList (data, index) {
      if (!this.mSelectedMemberList) this.mSelectedMemberList = []

      if (!data.accessKey) data.accessKey = data.userKey

      data.shareSeq = data.userKey
      var findIdx = this.mSelectedMemberList.findIndex(item => item.accessKey === data.accessKey)
      if (findIdx === -1) {
        this.mSelectedMemberList.push(data)

        this.mCommonMemberList[index].selectedYn = true
        this.$emit('changeSelectMemberList', this.mSelectedMemberList)
      } else {
        this.mSelectedMemberList.splice(findIdx, 1)
        this.mCommonMemberList[index].selectedYn = false
      }
    },
    searchFilter () {
      this.$emit('searchFilter', this.mSearchFilterList)
    }
  },
  watch: {
    propMemberList () {
      this.setMemberList()
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.teamInfo.teamKey)[0]
    }
  }
}
</script>

<style >
.selectedBox{background-color:#6768A720;}
.receiverTeamMemberArea{float: left;  width: 100%; height: 100%;}
.cBlack{
    color: black;
}
.selPopFr{
    float:right;
    margin-right: 4rem;
}
.memberPicImgWrap {width: 50px; height: 50px; border-radius: 100%; border:1.5px solid #ECEDF5; float: left; background: #ECEDF5; overflow: hidden; display: flex;}
.memberPicImgWrap img {width: 100%;}
.receiverTeamMemberCard {border-bottom:1px solid #ddd; cursor: pointer; padding: 10px 10px; padding-bottom: 0;}
.filterTagBox {/* border: 1px solid #6768a745;  */padding: 0 10px; min-height: 20px; line-height: 20px; min-width: 80px; float: left; border-radius: 15px;}
.filterWrap{width: 33.3%; display: flex; justify-content: center;}
</style>
