<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  />
    <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->

    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: auto;" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->

        <!-- <div style="display: none">
            <gSearchBox style="" @changeSearchList="changeSearchList" @openFindPop="test" :resultSearchKeyList="this.resultSearchKeyList" />
            <transition name="showModal">
                <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
            </transition>
        </div> -->

        <div style="width: 100%; height: calc(100% - 310px); position: relative; float: left;">
          <selectBookNMemberList :itemType="itemType" @addSelectList="addSelectList" :propData='propData' :selectBookNList='parentList'  />
        </div>
        <selectedListCompo :itemType="itemType"  @changeSelectedList="changeSelectedItem" ref="testCompo" style="float: left;" transition="showGroup" :listData='setSelectedList' @btnClick="sendReceivers" />
    </div>
</div>

</template>

<script>
import selectBookNMemberList from './Tal_selectBookAndMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
  props: {
    selectPopYn: {},
    chanInfo: {},
    detailSelectedYn: {},
    propData: {},
    parentList: {},
    itemType: {} // W: 작성/ V: 열람/ R: 댓글
  },
  created () {
    // alert(JSON.stringify(this.parentList) + 'sssss')
  },
  components: { selectedListCompo, selectBookNMemberList },
  data () {
    return {
      selectedYn: false,
      setSelectedList: {},
      detailOpenYn: false,

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
      itemList: []
    }
  },
  methods: {
    changeSelectedItem (data) {
      // alert(true)
      // data = {itemList: [], itemType: 'W'}
      // setSelectedList = {R: [], V: [], W: []}
      alert(true)
      // eslint-disable-next-line no-debugger
      debugger
      if (data.itemType === 'V') {
        this.setSelectedList.V = data.itemList
      } else if (data.itemType === 'W') {
        this.setSelectedList.W = data.itemList
      } else if (data.itemType === 'R') {
        this.setSelectedList.R = data.itemList
      }
    },
    sendReceivers (data) {
      for (var i = 0; i < data.length; i++) {
        data.shareType = this.itemType
      }
      this.$emit('sendReceivers', data)
    },
    addSelectList (data) {
      this.setSelectedList = data
      this.$refs.testCompo.upDatePage(data)
    },
    delectClick (data, index) {
      if (data.reveiverTeamName) {
        // this.dummyList.unshift(data.data)
      } else if (data.name) {
        // var record = this.dummyList.findIndex(function(item, index, arr){return item.reveiverTeamName === data.group});
        // this.dummyList[record].team.unshift(data.data)
      }
      this.selectReceivers.splice(index, 1)
    },
    addTeamList (obj) {
      // this.selectedTeamList.unshift(obj)
      this.selectReceivers.unshift(obj)
      // alert(JSON.stringify(this.selectReceivers))
    },
    addMemberList (obj) {
      // this.selectedMemberList.unshift(obj)

      this.selectReceivers.unshift(obj)
      // alert(JSON.stringify(this.selectReceivers))
      // alert(JSON.stringify(this.selectReceivers))
      // alert(JSON.stringify(this.selectReceivers.userDispMtext))
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
        // alert(JSON.stringify(this.propData))
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
.btnPlus{
    width:4rem; height:4rem; display: flex;
    padding-top: 5px;
    justify-content: center; align-items: center;
    color:#6768a7; border:3px solid #6768a7; background-color:white ;

    border-radius:4rem; position:fixed; bottom: 80px; right: 10%;
    box-shadow: 2px 2px 7px 3px #ccc;

}

.menuHeader {padding-top:0.5rem; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{font-size: 16px; text-align: center; line-height: 2.5rem;}
.menuHeader img{ width: 0.8rem; line-height: 50px;}

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
