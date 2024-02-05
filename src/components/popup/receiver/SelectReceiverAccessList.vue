<template>
<div class="accessListPop">
    <gPopHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  />
    <div class="w100P pagePaddingWrap accessPopBody" :style="'padding-top:' + ($STATUS_HEIGHT + 60)+ 'px'">
      <div>
        <selectBookNMemberList v-if="detailOpenYn === false" ref="selectBookNMemberListCompo" :simplePop="true" :itemType="itemType" @addSelectList="addSelectList" @delectClick="delectClick" :propData='propData' :selectBookNList='memberList' :selectList='selectList' @detail='detailOpen' />
        <transition name="showGroup">
            <gBookMemberList :listData="memberList" :propMemberList="memberList" :parentSelectList="selectList.memberList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="propData" class="memberListStyle" transition="showGroup" ref="memberListCompo" v-if="detailOpenYn" />
        </transition>
      </div>
      <selectedListCompo class="selectedListCompo" ref="selectedListCompo" :oneMemberCanAddYn="oneMemberCanAddYn" :itemType="itemType"  @changeSelectedList="changeSelectedItem" @changeSelectMemberList="changeSelectMemberList" transition="showGroup" :listData='setSelectedList' @btnClick="sendReceivers" />
    </div>
</div>

</template>

<script>
/* eslint-disable */
import selectBookNMemberList from './SelectBookAndMemberList.vue'
import selectedListCompo from './SelectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    chanInfo: {},
    propData: {},
    parentList: {},
    oneMemberCanAddYn: {},
    itemType: {}, // W: 작성/ V: 열람/ R: 댓글
    selectList: {} // 공유대상에서 선택한 북 & 멤버 리스트
  },
  created () {
    this.memberList = this.parentList
  },
  components: { selectedListCompo, selectBookNMemberList },
  data () {
    return {
      selectedYn: false,
      setSelectedList: {},

      titleText: '팀플',
      receiverTitle: 'Group Management',
      selectReceivers: [],
      teamLength: 100,
      addPopOpenYn: null,
      addPopOpen: '',
      selectedTeamList: [],
      selectedMemberList: [],
      selectedList: {},
      selectBookDetail: null,
      itemList: [],

      detailOpenYn: false,
      memberList: {},
      pPopId: {},
      selectPopId: {}
    }
  },
  methods: {
    changeSelectMemberList (params) {
      this.setSelectedList.memberList = params

      if (this.$refs.selectedListCompo) {
        this.$refs.selectedListCompo.newUpdateMember(params)
        this.$refs.selectedListCompo.upDatePage()
      }
      if (this.$refs.memberListCompo) {
        this.$refs.memberListCompo.deleteSelectedMember(params, true)
      }
    },
    async detailOpen (data) {
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.selectPopId = 'selectMemeberPopup' + history.length
      this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.selectPopId)
      this.$store.commit('UB_HISTORY/updateStack', history)

      await this.getBookMemberList(data.cabinetKey)
    },
    async getBookMemberList (key) {
      this.detailOpenYn = false
      var paramMap = new Map()
      var orderText = 'mcc.creDate DESC'
      paramMap.set('orderbyStr', orderText)
      paramMap.set('cabinetKey', key)
      paramMap.set('jobkindId', 'USER')
      var result = await this.$commonAxiosFunction({
          url: 'https://www.hybric.net:9443/service/tp.getMCabContentsList',
          param: Object.fromEntries(paramMap)
      })
      this.memberList = {}
      this.memberList = result.data
      if (this.memberList) {
          for (var i =0; i < this.memberList.length; i ++) {
              this.memberList[i].userDispMtext = this.$changeText(this.memberList[i].userDispMtext)
          }
          this.detailOpenYn = true
      }
    },
    changeSelectedItem (data) {
      if (this.itemType === 'V') {
        this.setSelectedList.V = data.itemList
      } else if (this.itemType === 'W') {
        this.setSelectedList.W = data.itemList
      } else if (this.itemType === 'R') {
        this.setSelectedList.R = data.itemList
      }
      this.$refs.selectBookNMemberListCompo.delSelectList(data.delKey, data.type)
    },
    sendReceivers (data) {
      if(data.bookList){
        if (data.bookList.length > 0 ) {
          for (var i = 0; i < data.bookList.length; i++) {
            data.bookList[i].shareType = this.itemType
          }
        }
      }
      if(data.memberList){
        if (data.memberList.length > 0 ) {
          for (var i = 0; i < data.memberList.length; i++) {
            data.memberList[i].shareType = this.itemType
          }
        }
      }
      this.$emit('sendReceivers', data)
      this.$emit('closeXPop')
    },
    addSelectList (data) {
      this.setSelectedList = data
      this.$refs.selectedListCompo.upDatePage(data)
    },
    delectClick (index) {
      this.setSelectedList.memberList.splice(index, 1)
    },
    backClick () {
      if (this.addPopOpenYn) {
        this.addPopOpenYn = false
      } else if (this.detailOpenYn) {
        this.$emit('closeXPop')
        this.receiverTitle = 'Group Management'
        if (this.selectPopYn) {
          this.receiverTitle = 'Select target'
        }

        if (this.selectPopYn) {
          this.titleText = 'Select target > ' + this.$changeText(this.chanInfo.value.nameMtext)
        } else {
          this.titleText = 'uniBuzzy'
        }
        this.teamLength = 100
        this.memberEditYn = false
      } else {
        var hStack = this.$store.getters['UB_HISTORY/hStack']
        var removePage = hStack[hStack.length - 1]
        if (this.selectPopId === hStack[hStack.length - 1]) {
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
        }
        this.$emit('closeXPop')
      }
    }
  }
}
</script>

<style >
.longHeight {
height: 100% !important;
}
.selectedReceiverBox {
  height: calc(100% - 100px);
  width: 100%;
  margin-top: 5px;
  overflow-y: scroll;
  padding: 10px;
  background-color: white;
  text-align: left;
}
[contenteditable=true] {
  outline: none;
}
input:focus{
  outline: none;
}
.accessListPop {
  height: 100vh;
  background-color:white;
  width:100%;
  z-index: 9999999;
  position: fixed;
  top: 0;
  left: 0;
}
.accessPopBody {
  position:absolute;
  overflow: auto;
  padding-top:50px
}
.accessPopBody > div:first-child {
  width: 100%;
  position: relative;
  float: left;
  height: calc(100% - 95px);
  overflow: auto;
}
.selectedListCompo {
  float: left !important;
  width: 100% !important;
  position: absolute !important;
  bottom: 0px !important;
  left: 0px !important;
  min-height: 150px !important;
}
</style>
