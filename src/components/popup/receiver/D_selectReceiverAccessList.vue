<template>
<div style="height: 100vh; background-color:white; width:100%; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  />
    <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->
    <div class="w-100P pagePaddingWrap" style="position:absolute; overflow: auto; padding-top:50px" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'">
      <div style="width: 100%; position: relative; float: left; height: calc(100% - 95px); overflow: auto;">
        <selectBookNMemberList v-if="detailOpenYn === false" ref="selectBookNMemberListCompo" :itemType="itemType" @addSelectList="addSelectList" :propData='propData' :selectBookNList='parentList' :selectList='selectList' @detail='detailOpen' />
        <!-- <selectBookNMemberList ref="selectedMemberListCompo" v-if="detailOpenYn === true" :itemType="itemType" @addSelectList="addSelectList" :selectBookNList='memberList' :selectList='selectList' @detail='detailOpen' :memberOnly='true' /> -->
        <transition name="showGroup">
            <!-- <memberList :listData="memberList" :parentSelectList="pSelectedMemberList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.propData" class="memberListStyle" transition="showGroup" ref="memberListRef" v-if="detailOpenYn" /> -->
            <memberList :listData="memberList" :parentSelectList="selectList.memberList" :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.propData" class="memberListStyle" transition="showGroup" ref="memberListRef" v-if="detailOpenYn" />
        </transition>
      </div>
      <selectedListCompo :oneMemberCanAddYn="oneMemberCanAddYn" :itemType="itemType"  @changeSelectedList="changeSelectedItem" ref="testCompo" transition="showGroup" :listData='setSelectedList' @btnClick="sendReceivers" style="float: left; width:100%; position: absolute; bottom:0px; left:0px; min-height: 150px;" />
    </div>
</div>

</template>

<script>
/* eslint-disable */
import selectBookNMemberList from './D_selectBookAndMemberList.vue'
import memberList from './receiverUnit/D_commonBookMemberList.vue'
import selectedListCompo from './D_selectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    chanInfo: {},
    detailSelectedYn: {},
    propData: {},
    parentList: {},
    oneMemberCanAddYn: {},
    itemType: {}, // W: 작성/ V: 열람/ R: 댓글
    selectList: {} // 공유대상에서 선택한 북 & 멤버 리스트

  },
  created () {
    console.log(this.selectList)
    console.log(this.chanInfo)
    console.log(this.parentList)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    // console.log(this.parentList)


    // if (!this.selectList) {
    //   // console.log(this.propData)
    //   var paramMap = new Map()
    //   paramMap.set('teamKey', this.propData.currentTeamKey || this.propData.teamKey || this.propData.targetKey)
    //   paramMap.set('sysCabinetCode', 'USER')
    //   paramMap.set('adminYn', true)
    //   var result = await this.$commonAxiosFunction({
    //       url: 'service/tp.getTeamMenuList',
    //       param: Object.fromEntries(paramMap)
    //   })
    //   this.bookList = result.data
    //   for(var i = 0; i < this.bookList.length; i ++) {
    //       var changeT = this.bookList[i].cabinetNameMtext
    //       this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
    //   }
    // }
  },
  components: { selectedListCompo, selectBookNMemberList, memberList },
  data () {
    return {
      selectedYn: false,
      setSelectedList: {},

      titleText: '팀플',
      receiverTitle: '그룹 관리',
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
    async detailOpen (data) {
      // this.detailOpenYn = true

      // this.searchKeyword = ''
      // this.receiverTitle = data.cabinetNameMtext /* + ' 멤버 관리' */
      // this.selectBookDetail = data
      // this.setBookSearchFilter()
      var history = this.$store.getters['D_HISTORY/hStack']
      this.selectPopId = 'selectMemeberPopup' + history.length
      this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.selectPopId)
      this.$store.commit('D_HISTORY/updateStack', history)

      await this.getBookMemberList(data.cabinetKey)
    },
    async getBookMemberList (key) {
      // this.imInYn = false
      this.detailOpenYn = false
      var paramMap = new Map()
      var orderText = 'mcc.creDate DESC'
      // if (this.orderByText === 'userDispMtext') {
      //     orderText = 'u.userDispMtext'
      // }
      paramMap.set('orderbyStr', orderText)
      // paramMap.set('userDispMtext', this.searchKeyword)
      paramMap.set('cabinetKey', key)
      paramMap.set('jobkindId', 'USER')
      var result = await this.$commonAxiosFunction({
          url: 'service/tp.getMCabContentsList',
          param: Object.fromEntries(paramMap)
      })
      this.memberList = {}
      this.memberList = result.data
      if (this.memberList) { // dispName이 없을시 userName으로 대체
          for (var i =0; i < this.memberList.length; i ++) {
              // if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

              // } else {
              //     this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
              // }
              this.memberList[i].userDispMtext = this.$changeText(this.memberList[i].userDispMtext)
              // if (this.memberList[i].userKey === this.GE_USER.userKey) {
              //     this.imInYn = true
              // }
          }
          // this.cabinetName = this.$changeText(this.selectBookDetail.cabinetNameMtext)
          // this.$refs.selectedMemberListCompo.reloadMemberList()
          this.detailOpenYn = true
      }
      console.log('#######################')
      console.log(this.memberList)
    },

    // settingList(){
    // // console.log("######@!@#!@#!@#!@#######")
    // // console.log(this.parentList)
    // if(this.parentList.bookList){
    //   for (let index = 0; index < array.length; index++) {
    //     const element = array[index];

    //   }
    // }
    // if(this.parentList.bookList){
    //   for (let i = 0; i < array.length; i++) {
    //     const element = array[i];

    //   }
    // }

    // // this.addSelectList()
    // },
    changeSelectedItem (data) {
      // data = {itemList: [], itemType: 'W'}
      // setSelectedList = {R: [], V: [], W: []}
      // eslint-disable-next-line no-

      // if (this.itemType === 'V') {
      //   this.setSelectedList.V = data.itemList
      // } else if (data.itemType === 'W') {
      //   this.setSelectedList.W = data.itemList
      // } else if (data.itemType === 'R') {
      //   this.setSelectedList.R = data.itemList
      // }

      // if(data.type === 'U'){
      //   var changeList = data.memberList
      //   for(var m = 0; m < this.memberList.length; m ++) {
      //     this.memberList[m].selectedYn = false
      //     for(var c = 0; c < changeList.length; c++) {
      //       if (changeList[c].userKey === this.memberList[m].userKey) {
      //         this.memberList[m].selectedYn = true
      //       }
      //     }
      //   }

      // }else if(data.type === 'C'){


      // }

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
      console.log('$$$$$$$$$$$$$$$')
      console.log(data)
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
      console.log('^^^^^^^^^^^^^^^')
      console.log(data)

      this.$emit('sendReceivers', data)
      this.$emit('closeXPop')
    },
    addSelectList (data) {
      this.setSelectedList = data
      this.$refs.testCompo.upDatePage(data)
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
      if (this.addPopOpenYn) {
        // MemberList에 구성원추가 팝업
        this.addPopOpenYn = false
      } else if (this.detailOpenYn) {
        this.detailOpenYn = false
        this.receiverTitle = '그룹 관리'
        if (this.selectPopYn) {
          this.receiverTitle = '대상 선택'
        }

        if (this.selectPopYn) {
          this.titleText = '대상선택 > ' + this.$changeText(this.chanInfo.value.nameMtext)
        } else {
          this.titleText = '팀플'
        }

        this.teamLength = 100
        this.memberEditYn = false
      } else {
        this.$emit('closeXPop')
      }
    },
    openMCabUserList (data) {
      if (!this.teamEditYn) {
        this.selectBookDetail = data
        this.detailOpenYn = true
        this.receiverTitle = '구성원 관리'
        if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '') {
          this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
        } else {
          this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
        }
        if (this.selectPopYn) {
          this.receiverTitle = '대상 선택'
          // this.titleText = "대상선택 > 팀플 > " + data.reveiverTeamName
        }
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
/* btnPlus common.css로 옮김 */

.longHeight{
height:100% !important;
}
.selectedReceiverBox{
    height: calc(100% - 100px);
    width: 100%;
    margin-top: 5px;
    overflow-y: scroll;
    padding: 10px;
    background-color:white;
    text-align: left;
}
[contenteditable=true] {
  outline: none;
}
input:focus{
  outline: none;
}
</style>
