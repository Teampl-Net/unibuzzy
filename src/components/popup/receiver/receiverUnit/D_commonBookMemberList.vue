<template>
<div class="receiverTeamMemberArea" >
    <!-- <div style="width: 100%; height: calc(100% - 40px); margin-top: 10px; overflow: hidden scroll;"> -->
      <!-- <div v-if="addressBookList.length > 0" class="fl w-100P" style=" height: calc(100% - 60px); overflow: hidden scroll;"> -->
      <!-- <div v-if="memberList.legth > 0" class="fl w-100P"> -->
        <template v-for="(data, index) in memberList" :key='data'>
          <gReceiveCard :propData="data" :option="selectPopYn === true ? 'SELE' : 'EDIT'"  :compoIdx='index' @receiveCardEmit="receiveCardEmit"/>
        </template>
        <!-- <draggable style="--webkit-tap-highlight-color: rgba(0,0,0,0);" ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <template v-for="(data, index) in memberList" :key='data'>
                    <div class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true, selectedBox : data.selectedYn}" :style="selectPopYn === true ? 'width:90%;' : ''" style="width:100%; min-height:60px; position: relative;"  >
                        <div v-if="data.userProfileImg" :style="'background-image: url(' + (data.domainPath? data.domainPath + data.userProfileImg : data.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                        </div>
                        <div v-else style="background-image: url('../../../../assets/images/main/main_subscriber.png');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                        </div>

                        <div @click="!selectPopYn ? openModiPop(data, index): ''" class="fl textOverdot mleft-1" style="width: calc(100% - 110px - 1rem); height: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;" >
                            <p class="fl font16 commonBlack">{{this.$changeText(data.userDispMtext || data.userNameMtext)}}</p>
                            <p class="fl font12 commonBlack" v-if="data.phoneEnc && (!propData.selectMemberType === 'manager' || selectPopYn !== true)">{{this.setPhone(data.phoneEnc)}}</p>
                            <p class="fl font11 commonBlack" v-if="!data.phoneEnc && (!propData.selectMemberType === 'manager' || selectPopYn !== true) ">등록된 번호가 없습니다.</p>
                        </div>
                        <div v-if=" !propData.selectMemberType === 'manager' || selectPopYn !== true" class="fr" style="width:70px; height: 100%; display:flex; justify-content: space-between;">

                            <img src="../../../../assets/images/common/callPhoneIcon.svg" v-if="mobileYn" @click="callPhone(data.phoneEnc)" style="width: 20px;" class="mright-15" alt="">

                            <img v-if="propData.creUserKey !== data.userKey" src="../../../../assets/images/formEditor/trashIcon_gray.svg" @click="deleteMemberClick(data,index)" style="width: 20px;" alt="">
                            <img v-else src="../../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px;  float: right; margin-right: 18px; margin-top: 20px;" class="fl">
                        </div>
                        <div v-if="selectPopYn === true" class="fr" style="height: 100%; width: 30px; display:flex; flex-shrink: 0; flex-grow: 0; ">
                            <img style="width: 30px; flex-shrink: 0; flex-grow: 0; " src="../../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn" @click="addSelectedList(data,index)" >
                            <img style="width: 25px; height: 20px; margin-top: 5px; flex-shrink: 0; flex-grow: 0; " src="../../../../assets/images/common/Tal_checkImage.svg" alt="" v-else @click="checkClick(index)">
                        </div>

                        <div v-if="this.searchFilterList.length > 0" style="width: calc(100% - 30px); margin-bottom: 2px; min-height: 25px; display: flex; margin-top: 5px; justify-content: space-around; align-items: center; float: right;">
                          <div class="filterWrap font12"><div  class="filterTagBox">{{ data.sSub1?  '#' + data.sSub1 : ''}}</div></div>
                          <div style="width: 1px; height: 20px; background: #6768a745;"></div>
                          <div class="filterWrap font12"><div  class="filterTagBox" style="  ">{{data.sSub2? '#' + data.sSub2 : ''}} </div></div>
                          <div style="width: 1px; height: 20px; background: #6768a745;"></div>
                          <div class="filterWrap font12"><div   class="filterTagBox" style="  ">{{data.sSub3? '#' + data.sSub3 : ''}}</div></div>
                        </div>
                    </div>
                </template>
            </transition-group>
        </draggable> -->
    <!-- </div> -->
    <!-- </div> -->
    <gListEmpty v-if="memberList.length === 0" title="멤버가 없어요." subTitle="버튼을 눌러 멤버를 추가해보세요." :option="selectPopYn === true ? 'SELE' : 'EDIT'" />
</div>

</template>

<script>
import gReceiveCard from './D_commonReceiveCard .vue'
import { onMessage } from '../../../../assets/js/webviewInterface'
export default {
  components: { gReceiveCard },
  props: {
    teamInfo: {},
    listData: {},
    propData: {},
    selectPopYn: {},
    parentSelectList: {},
    bookType: {},
    pSearchFilterList: {}
  },
  watch: {
    listData () {
      console.log(this.listData)
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
  },
  data () {
    return {
      teamName: '',
      popId: null,
      memberList: [],
      editYn: false,
      addMemberPopYn: false,
      dragable: false,
      newYn: true,
      selectedMemberList: [],
      pageTopBtnTitle: '편집',
      systemName: 'iOS',
      mobileYn: this.$getMobileYn(),
      searchFilterList: [],
      search1: '',
      search2: '',
      search3: ''
    }
  },
  updated () {
    if (this.pSearchFilterList) {
      this.searchFilterList = this.pSearchFilterList
    }
    // this.memberList = this.listData
    this.setMemberList()
  },
  beforeUnmount () {
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerListOpen = false
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerOpenYn = true
  },
  created () {
    this.$nextTick(() => {
      // this.memberList = this.listData
      this.setMemberList()

      if (this.pSearchFilterList) {
        this.searchFilterList = this.pSearchFilterList
      }
      // eslint-disable-next-line vue/no-mutating-props
      // if (!this.propData.value) this.propData.value = {}
      if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
      // this.teamName = this.$changeText(this.teamInfo.nameMtext).substr(0, 5) + '...'
      if (this.parentSelectList) {
        console.log('%%%%%')
        console.log(this.parentSelectList)
        // console.log(this.parentSelectList)
        this.selectedMemberList = []
        this.selectedMemberList = JSON.parse(JSON.stringify(this.parentSelectList))
        console.log(this.selectedMemberList)
        this.setParentSelectList()
      }
    })
  },
  methods: {
    deleteSelectedMember (type, key) {
      // 실제 선택한 데이터 중 멤버를 삭제하는 작업
      var findIdx = this.selectedMemberList.findIndex(item => item.accessKey === key)
      if (findIdx !== -1) {
        this.selectedMemberList.splice(findIdx, 1)
      }
      console.log(this.memberList)

      // 화면에 보이는 SELECT한 효과를 없애기 위해 처리하는 작업
      this.setParentSelectList()
      // var tempIdx = this.memberList.findIndex(item => item.accessKey === key)

      // if (tempIdx !== -1) {
      //   this.memberList[tempIdx].selectedYn = false
      // }
      console.log('delSelectedList')
      console.log(this.selectedMemberList)
    },
    // selectedListLOG () {
    //   console.log('selectedListLOG selectedMemberList selectedListLOG')
    //   console.log(this.selectedMemberList)
    // },
    receiveCardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      var idx = param.index
      if (type === 'open') {
        this.openModiPop(data, idx)
      } else if (type === 'delete') {
        this.deleteMemberClick(data, idx)
      } else if (type === 'add') {
        this.addSelectedList(data, idx)
      }
    },
    setMemberList () {
      this.memberList = this.listData
      for (let i = 0; i < this.memberList.length; i++) {
        this.memberList[i].jobKindId = 'USER'
      }
      console.log(this.memberList)
    },
    setPhone (num) {
      if (num !== undefined && num !== null && num !== '') {
        return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      }
    },
    callPhone (num) {
      if (num !== undefined && num !== null && num !== '') {
        if (this.systemName !== 'Android' && this.systemName !== 'android') { document.location.href = 'tel:' + num } else { onMessage('REQ', 'callphone', num) }
      } else {
        alert('전화번호 정보가 없습니다')
      }
    },
    async refresh () {
      if (this.propData.selectMemberType === 'manager') { await this.getFollowerList() } else { this.$emit('refreshList') }
    },
    // resetSelectList () {
    //   console.log('pppppppppppppppppppppppppppppppppp')
    //   console.log(list)
    //   this.selectedBookList = list
    //   this.settingCheck()
    // },
    setParentSelectList () {
      console.log('###########')
      console.log(this.selectedMemberList)
      console.log(this.memberList)
      var tempList = this.memberList
      this.memberList = []
      if (this.selectedMemberList) {
        for (var i = 0; i < tempList.length; i++) {
          tempList[i].selectedYn = false
          for (var s = 0; s < this.selectedMemberList.length; s++) {
            if (this.selectedMemberList[s].accessKey === tempList[i].userKey) {
              tempList[i].selectedYn = true
              // this.selectedList.push(this.memberList[i])
              break
            }
          }
        }
      }
      // eslint-disable-next-line no-debugger
      debugger
      this.memberList = tempList
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(this.memberList)
    },
    dispNameChangeUserName () {
      if (this.memberList) { // dispName이 없을시 userName으로 대체
        for (var i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {
          } else {
            this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
          }
        }
      }
    },
    changeEdit () {
      if (this.editYn) {
        this.editYn = false
        this.pageTopBtnTitle = '편집'
        this.$emit('editYn', this.editYn)
      } else {
        this.editYn = true
        this.pageTopBtnTitle = '닫기'
        this.$emit('editYn', this.editYn)
      }
    },
    deleteMemberClick (data, index) {
      var param = {}
      param.data = data
      param.index = index
      param.targetType = 'member'
      this.$emit('delAddress', param)
    },
    async deleteMember (data, index) {
      console.log(this.propData)
      console.log(data)
      // 주소록 관리에서 주소 삭제가 안되기에 주석처리 하였음.
      // if (this.propData.value.creUserKey !== data.userKey) {
      if (this.propData.selectMemberType === 'manager') {
        this.$emit('deleteManager', data)
      } else {
        var param = {}
        param.mccKey = data.mccKey
        param.jobkindId = data.jobkindId
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.deleteMCabContents',
          param: param
        })
        if (result.data === 'true' || result.data === true) {
          this.memberList = []
          this.$emit('refreshList')
          this.$showToastPop('주소가 삭제되었습니다.')
        }
      }
      // }
    },
    openModiPop (data, index) {
      // console.log(data)
      // console.log(this.teamInfo.teamKey)
      if (!this.editYn) {
        this.newYn = false
        // this.addMemberPopYn = true
        data.targetType = 'bookMemberDetail'
        data.currentCabinetKey = data.cabinetKey
        data.currentTeamKey = this.teamInfo.teamKey
        data.teamKey = this.teamInfo.teamKey
        data.readOnlyYn = true
        this.$emit('openAddPop', data)
      }
      // data.index = index
      // this.editMember = data
    },
    addSelectedList (data, index) {
      if (!this.selectedMemberList) this.selectedMemberList = []

      console.log('add ' + data.accessKey)
      if (!data.accessKey) data.accessKey = data.userKey
      console.log('add after' + data.accessKey)

      data.shareSeq = data.userKey
      var findIdx = this.selectedMemberList.findIndex(item => item.accessKey === data.accessKey)
      if (findIdx === -1) {
        this.selectedMemberList.push(data)
        console.log('===========================')
        console.log(data)
        console.log(this.selectedMemberList)

        this.memberList[index].selectedYn = true
        this.$emit('changeSelectMemberList', this.selectedMemberList)
      } else {
        this.selectedMemberList.splice(findIdx, 1)
        this.memberList[index].selectedYn = false
      }
    },
    checkClick () {
      this.$showToastPop('중복 선택입니다.')
    },
    deSelectList (index) {
      // eslint-disable-next-line vue/no-mutating-props
      this.memberList[index].selectedYn = false
    },
    updateData (obj) {
      this.addMemberPopYn = false
    },
    searchFilter () {
      // eslint-disable-next-line no-undef
      /* var param = new Obejct()
      param.searchKeyStr = 'sSub' + idx
      param.searchKeyword = selectedValue */
      this.$emit('searchFilter', this.searchFilterList)
    }

  }
}
</script>

<style >
.selectedBox{background-color:#6768A720;}
.receiverTeamMemberArea{float: left;  width: 100%;}
/* .receiverTeamMemberCard{display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom:1px solid #eee;  padding: 0.7rem 0} */

/* .selectLastMargin :last-child{
    margin-bottom: 30px;
} */
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
