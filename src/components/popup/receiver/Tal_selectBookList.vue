<template>
<div class="selectBookListWrap">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" :managerBtn='true' @sendOk='editPop' />
      <div class="selectBookListContents">
        <bookList class="bookListStyle" :listData="bookList" :teamInfo="this.propData" :parentSelectList="this.selectedList" :selectPopYn="true" @changeSelectBookList="changeSelectBookList" :propData="propData" :selectBookDetail="selectBookDetail" ref="teamListRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn"/>
        <transition name="showGroup">
            <memberList :listData="memberList" :parentSelectList="this.selectedList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.selectBookDetail" class="memberListStyle" transition="showGroup" ref="memberListRef" v-if="detailOpenYn" />
        </transition>
      </div>
      <selectedListCompo class="selectedListStyle" :selectShareTargetYn="true" @addMemberList="addMe" :currentTeamKey="propData.teamKey"  @changeSelectedList="changeSelectedList" ref="selectedListCompo" style="" transition="showGroup" :listData='selectedList'  @btnClick='sendReceivers' />
</div>

</template>
<script>
/* eslint-disable */
import bookList from './Tal_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    chanInfo: {},
    detailSelectedYn: {},
    selectedListYn: {},
    propData: {},
    pSelectedList: {}
  },
  created () {
    this.propData.teamNameMtext = this.$changeText(this.propData.targetNameMtext)
    if (this.pSelectedList) {
      this.selectedList = this.pSelectedList
    }

    if (this.selectedListYn) {
      this.selectedTeamList = this.selectedList.selectedTeamList
      this.selectedMemberList = this.selectedList.selectedMemberList
    }
    this.getBookList()

  },

  computed: {
    historyStack () {
      return this.$store.getters.hRPage
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
    },
    historyStack (value, old) {
    }
  },
  components: { bookList, memberList, selectedListCompo },
  data () {
    return {
      memberList: [],
      bookList:[],
      popId: null,
      subPopId: null,
      selectedYn: false,
      setSelectedList: [],
      detailOpenYn: false,
      titleText: '팀플',
      receiverTitle: '주소록 선택',
      selectReceivers: [],
      teamLength: 100,
      selectedTeamList: [],
      selectedMemberList: [],
      selectedList: {},
      selectBookDetail: null
    }
  },
  methods: {
    async getBookList () {
        console.log(this.propData)
        var paramMap = new Map()
        paramMap.set('teamKey', this.propData.currentTeamKey || this.propData.teamKey || this.propData.targetKey)
        paramMap.set('sysCabinetCode', 'USER')
        paramMap.set('adminYn', true)
        var result = await this.$commonAxiosFunction({
            url: 'https://mo.d-alim.com:10443/tp.getTeamMenuList',
            param: Object.fromEntries(paramMap)
        })
        this.bookList = result.data
        for(var i = 0; i < this.bookList.length; i ++) {
            var changeT = this.bookList[i].cabinetNameMtext
            this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
        }
        this.editBookSelectedList()
        //
    },
    async getBookMemberList () {
        var paramMap = new Map()
        paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
        paramMap.set('jobkindId', 'USER')
        var result = await this.$commonAxiosFunction({
            url: 'https://mo.d-alim.com:10443/tp.getMCabContentsList',
            param: Object.fromEntries(paramMap)
        })
        this.memberList = result.data
          if (this.memberList) { // dispName이 없을시 userName으로 대체
        for (var i =0; i < this.memberList.length; i ++) {
            if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                } else {
                    this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                }
            }
        }
        this.editMemberSelectedList()
        //
    },
    editPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params = this.propData
      params.targetType = 'editBookList'
      params.currentTeamKey = this.propData.targetKey
      params.value = ''
      this.$emit('openPop', params)
    },
    /* oepnPop (param) {
      this.$emit('openPop', param)
    }, */
    sendReceivers () {
      // eslint-disable-next-line no-new-object
      var obj = new Object()
      obj.data = this.selectedList
      this.$emit('sendReceivers', obj)
      // this.$emit('selectedList', this.selectedList)
    },
    // 유민참고
    changeSelectMemberList (data) {
      this.selectedList.memberList = data
      this.$refs.selectedListCompo.upDatePage()
    },
    addMe (data) {
      if(this.selectedList.memberList) {
        this.selectedList.memberList.unshift(data)
      } else {
        this.selectedList.memberList = []
        this.selectedList.memberList.unshift(data)
      }
      this.changeSelectMemberList(this.selectedList.memberList)
    },

    changeSelectBookList (data) {
      // eslint-disable-next-line vue/no-mutating-props
      this.selectedList.bookList = data
      this.$refs.selectedListCompo.upDatePage()
    },
    changeSelectedList (selectedListData) {
      this.selectedList = selectedListData
      this.editMemberSelectedList()
      this.editBookSelectedList()
      this.$refs.selectedListCompo.upDatePage()
    },
    editMemberSelectedList () {
      if(this.selectedList.memberList){
        var changeList = this.selectedList.memberList
        for(var m = 0; m < this.memberList.length; m ++) {
          this.memberList[m].selectedYn = false
          for(var c = 0; c < changeList.length; c++) {
            if (changeList[c].userKey === this.memberList[m].userKey) {
              this.memberList[m].selectedYn = true
            }
          }
        }
      }
    },
    editBookSelectedList () {
      if(this.selectedList.bookList){
        var changeList = this.selectedList.bookList
        for(var m = 0; m < this.bookList.length; m ++) {
          this.bookList[m].selectedYn = false
          for(var c = 0; c < changeList.length; c++) {
            if (changeList[c].cabinetKey === this.bookList[m].cabinetKey) {
              this.bookList[m].selectedYn = true
            }
          }
        }
      }
    },
    setResult () {
      // eslint-disable-next-line no-new-object
      var obj = new Object()
      obj.data = this.selectReceivers
      obj.selectedTeamList = this.selectedTeamList
      obj.selectedMemberList = this.selectedMemberList
      // this.$emit('selectedReceiver', this.selectReceivers)
      this.$emit('selectedReceiver', obj)
      // this.$emit('selectedReceiver', this.selectReceivers)
    },
    delectClick (data, index) {
      this.selectReceivers.splice(index, 1)
    },
    addTeamList (obj) {
      this.selectReceivers.unshift(obj)
    },
    addMemberList (obj) {
      this.selectReceivers.unshift(obj)
    },

    backClick () {

      var hStack = this.$store.getters.hStack

      var removePage = hStack[hStack.length - 1]

      if (this.subPopId === hStack[hStack.length - 1] ) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('setRemovePage', removePage)
        this.$store.commit('updateStack', hStack)
        // this.detailOpenYn = false
        this.teamLength = 100
        this.memberEditYn = false
        this.receiverTitle = '주소록 선택'
        this.detailOpenYn = false
      } else {
        // hStack = hStack.filter((element, index) => index < hStack.length - 1)
        // this.$store.commit('setRemovePage', removePage)
        // this.$store.commit('updateStack', hStack)
        this.$emit('closeXPop')
      }
    },
    async openMCabUserList (data) {
      if (!this.teamEditYn) {
        this.selectBookDetail = data
        await this.getBookMemberList()
        this.detailOpenYn = true

        this.selectBookDetail = data
        var history = this.$store.getters.hStack
        this.subPopId = 'commonBookMemberList' + history.length
        history.push(this.subPopId)
        this.$store.commit('updateStack', history)

        this.receiverTitle = '구성원 관리'
         if (this.selectPopYn) {
          this.receiverTitle = '대상 선택'
          // this.titleText = "대상선택 > 팀플 > " + data.reveiverTeamName
        }

        /* if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '') {
          this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
        } else {
          this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
        } */

      }
    },
    addAllClick () {
      var i = 0
      // eslint-disable-next-line no-new-object
      var obj = new Object()
      if (this.detailOpenYn) {
        // 멤버 리스트에서 전체 추가 클릭

        obj.data = this.clickList
        this.selectReceivers.unshift(obj)
        //  arr3.findIndex(i => i.name == "강호동");
        const addAllMemTeamIdx = this.selectBookDetail.findIndex(i => i.reveiverTeamName === this.clickList.reveiverTeamName)
        this.selectBookDetail.splice(addAllMemTeamIdx, 1) // 전체 리스트에서 해당 인덱스 삭제
        this.detailOpenYn = false // 삭제 되었으면 디테일 끄기
        this.titleText = '대상선택 > ' + this.$changeText(this.chanInfo.value.nameMtext)
      } else {
        // 팀 리스트에서 전체 추가 클릭
        for (i = 0; i < this.selectBookDetail.length; i++) {
          // eslint-disable-next-line no-new-object
          obj = new Object()
          obj.data = this.selectBookDetail[i]
          this.selectReceivers.unshift(obj)
        }
        this.selectBookDetail.splice(0, this.selectBookDetail.length) // 전체 리스트에서 제거
      }
    }

  }
}
</script>

<style >
.selectBookListWrap{height: 100vh; background-color:white; width:100%; z-index:999; position:absolute; top:0; left:0}
.selectBookListContents{width: 100%; height: 50%; position: relative; padding: 0 1rem; float: left; margin-top:50px;}
.bookListStyle{position: absolute; height: calc(100%); overFlow: hidden scroll; top: 0; width: calc(100% - 3rem) !important; background: #fff;}
.memberListStyle{position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); width: calc(100% - 3rem); background: #fff;}
.selectedListStyle{float: left; width:100%; height:calc(50% - 50px); position: absolute; bottom:0px; left:0px}
</style>
