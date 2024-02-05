<i18n>
  {
    "ko": {
      "COMM_MANAGE_GROUP" : "그룹 관리",
      "COMM_MANAGE_MEMBER" : "구성원 관리",
      "COMM_SELECT_TARGET" : "대상 선택",
    },
    "en": {
      "COMM_MANAGE_GROUP" : "Group Management",
      "COMM_MANAGE_MEMBER" : "Member Management",
      "COMM_SELECT_TARGET" : "Select target",
    }
  }
  </i18n>
<template>
<div style="height: 100vh; background-color:white; width:100%; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  />
    <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->
    <div class="longHeight w-100P" style="position:absolute; top:50px; h overflow: auto;" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'">
      <div style="width: 100%; position: relative; float: left;">
        <selectBookNMemberList ref="selectBookNMemberListCompo" :itemType="itemType" @addSelectList="addSelectList" :propData='propData' :selectBookNList='parentList' :selectList='selectList' />
      </div>
      <selectedListCompo :itemType="itemType"  @changeSelectedList="changeSelectedItem" ref="testCompo" style="height: 310px; position: absolute; bottom: 50px; left: 0px;" transition="showGroup" :listData='setSelectedList' @btnClick="sendReceivers" />
    </div>
</div>

</template>

<script>
/* eslint-disable */
import selectBookNMemberList from './Tal_selectBookAndMemberList.vue'
import selectedListCompo from './D_selectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    chanInfo: {},
    detailSelectedYn: {},
    propData: {},
    parentList: {},
    itemType: {}, // W: 작성/ V: 열람/ R: 댓글
    selectList: {} // 공유대상에서 선택한 북 & 멤버 리스트
  },
  created () {


    // if (!this.selectList) {
    //   var paramMap = new Map()
    //   paramMap.set('teamKey', this.propData.currentTeamKey || this.propData.teamKey || this.propData.targetKey)
    //   paramMap.set('sysCabinetCode', 'USER')
    //   paramMap.set('adminYn', true)
    //   var result = await this.$commonAxiosFunction({
    //       url: 'https://www.hybric.net:9443/service/tp.getTeamMenuList',
    //       param: Object.fromEntries(paramMap)
    //   })
    //   this.bookList = result.data
    //   for(var i = 0; i < this.bookList.length; i ++) {
    //       var changeT = this.bookList[i].cabinetNameMtext
    //       this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
    //   }
    // }
  },
  components: { selectedListCompo, selectBookNMemberList },
  data () {
    return {
      selectedYn: false,
      setSelectedList: {},
      detailOpenYn: false,

      titleText: 'Teampl',
      receiverTitle: this.$t('COMM_MANAGE_GROUP'),
      selectReceivers: [],
      teamLength: 100,
      addPopOpenYn: null,
      addPopOpen: '',
      selectedTeamList: [],
      selectedMemberList: [],
      selectedList: {},
      selectBookDetail: null,
      itemList: []
    }
  },
  methods: {
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
        this.receiverTitle = this.$t('COMM_MANAGE_GROUP')
        if (this.selectPopYn) {
          this.receiverTitle = this.$t('COMM_SELECT_TARGET')
        }

        if (this.selectPopYn) {
          this.titleText = this.$t('COMM_SELECT_TARGET') + '>' + this.$changeText(this.chanInfo.value.nameMtext)
        } else {
          this.titleText = 'Teampl'
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
        this.receiverTitle = this.$t('COMM_MANAGE_MEMBER')
        if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '') {
          this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
        } else {
          this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
        }
        if (this.selectPopYn) {
          this.receiverTitle = this.$t('COMM_SELECT_TARGET')
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
        this.titleText = this.$t('COMM_SELECT_TARGET') + ' > ' + this.$changeText(this.chanInfo.value.nameMtext)
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
