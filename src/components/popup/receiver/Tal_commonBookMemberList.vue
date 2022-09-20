<template>
<div class="receiverTeamMemberArea" >
    <!-- <div style="width: 100%; height: calc(100% - 40px); margin-top: 10px; overflow: hidden scroll;"> -->
        <draggable style="--webkit-tap-highlight-color: rgba(0,0,0,0);" ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <template v-for="(data, index) in listData" :key='data'>
                    <div class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true, selectedBox : data.selectedYn}" :style="selectPopYn === true ? 'width:90%;' : ''" style="width:100%; min-height:60px; position: relative;"  >
                        <div v-if="data.userProfileImg" :style="'background-image: url(' + (data.domainPath? data.domainPath + data.userProfileImg : data.userProfileImg ) + ');'" style="background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                          <!-- <img :src="data.userProfileImg" /> -->
                        </div>
                        <div v-else style="background-image: url('../../../assets/images/main/main_subscriber.png');background-size: cover; background-repeat: no-repeat; background-position: center;"  class="memberPicImgWrap">
                        </div><!--
                        <div style="width: 100px;float: left; height: 100%;">

                        </div> -->
                        <div @click="!selectPopYn? openModiPop(data,index): ''" class="fl textOverdot mleft-1" style="width: calc(100% - 110px - 1rem); height: 100%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;" >
                            <p class="fl font16 commonBlack">{{this.$changeText(data.userDispMtext || data.userNameMtext)}}</p>
                            <p class="fl font12 commonBlack" v-if="data.phoneEnc && (!propData.selectMemberType === 'manager' || selectPopYn !== true)">{{this.setPhone(data.phoneEnc)}}</p>
                            <p class="fl font11 commonBlack" v-if="!data.phoneEnc && (!propData.selectMemberType === 'manager' || selectPopYn !== true) ">등록된 번호가 없습니다.</p>
                        </div>
                        <div v-if=" !propData.selectMemberType === 'manager' || selectPopYn !== true" class="fr" style="width:70px; height: 100%; display:flex; justify-content: space-between;">

                            <img src="../../../assets/images/common/callPhoneIcon.svg" v-if="mobileYn" @click="callPhone(data.phoneEnc)" style="width: 20px;" class="mright-15" alt="">

                            <img v-if="propData.value.creUserKey !== data.userKey" src="../../../assets/images/formEditor/trashIcon_gray.svg" @click="deleteMemberClick(data,index)" style="width: 20px;" alt="">
                            <img v-else src="../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px;  float: right; margin-right: 18px; margin-top: 20px;" class="fl">
                        </div>
                        <div v-if="selectPopYn === true" class="fr" style="height: 100%; width: 30px; display:flex; flex-shrink: 0; flex-grow: 0; ">
                            <img style="width: 30px; flex-shrink: 0; flex-grow: 0; " src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn" @click="addSelectedList(data,index)" >
                            <img style="width: 25px; height: 20px; margin-top: 5px; flex-shrink: 0; flex-grow: 0; " src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else @click="checkClick(index)">
                        </div>
                        <div v-if="this.searchFilterList.length > 0" style="width: calc(100% - 30px); margin-bottom: 2px; min-height: 25px; display: flex; margin-top: 5px; justify-content: space-around; align-items: center; float: right;">
                          <div class="filterWrap font12"><div  class="filterTagBox">{{ data.sSub1?  '#' + data.sSub1 : ''}}</div></div>
                          <div style="width: 1px; height: 20px; background: #6768a745;"></div>
                          <div class="filterWrap font12"><div  class="filterTagBox" style="  ">{{data.sSub2? '#' + data.sSub2 : ''}} </div></div>
                          <div style="width: 1px; height: 20px; background: #6768a745;"></div>
                          <div class="filterWrap font12"><div   class="filterTagBox" style="  ">{{data.sSub3? '#' + data.sSub3 : ''}}</div></div>
                        </div> <!-- :style="data.sSub3 ? 'background:ghostWhite;': ''" -->
                    </div>
                </template>
            </transition-group>
        </draggable>
    <!-- </div> -->
</div>

</template>

<script>
import { onMessage } from '../../../assets/js/webviewInterface'
export default {
  components: { },
  props: {
    teamInfo: {},
    listData: {},
    propData: {},
    selectPopYn: {},
    parentSelectList: {},
    bookType: {},
    pSearchFilterList: {}
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
      search3: '',
      userKey: JSON.parse(localStorage.getItem('sessionUser')).userKey
    }
  },
  updated () {
    if (this.pSearchFilterList) {
      this.searchFilterList = this.pSearchFilterList
    }
  },
  beforeUnmount () {
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerListOpen = false
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerOpenYn = true
  },
  created () {
    if (this.pSearchFilterList) {
      this.searchFilterList = this.pSearchFilterList
    }
    // eslint-disable-next-line vue/no-mutating-props
    if (!this.propData.value) this.propData.value = {}
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
    // this.teamName = this.$changeText(this.teamInfo.nameMtext).substr(0, 5) + '...'
    if (this.parentSelectList) {
      console.log(this.parentSelectList)
      this.selectedMemberList = []
      this.selectedMemberList = this.parentSelectList.memberList
    }
  },
  methods: {
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
    setParentSelectList () {
      if (this.parentSelectList) {
        if (this.parentSelectList.memberList) {
          for (var i = 0; i < this.memberList.length; i++) {
            this.memberList[i].selectedYn = false
            for (var s = 0; s < this.parentSelectList.memberList.length; s++) {
              if (this.parentSelectList.memberList[s].userKey === this.memberList[i].userKey) {
                this.memberList[i].selectedYn = true
                break
              }
            }
          }
        }
      }
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
      if (this.propData.value.creUserKey !== data.userKey) {
        if (this.propData.selectMemberType === 'manager') {
          this.$emit('deleteManager', data)
        } else {
          var param = {}
          param.mccKey = data.mccKey
          param.jobkindId = data.jobkindId
          var result = await this.$commonAxiosFunction({
            url: 'https://mo.d-alim.com/service/tp.deleteMCabContents',
            param: param
          })
          if (result.data === 'true' || result.data === true) {
            this.memberList = []
            this.$emit('refreshList')
          }
        }
      }
    },
    openModiPop (data, index) {
      if (!this.editYn) {
        this.newYn = false
        // this.addMemberPopYn = true
        data.targetType = 'bookMemberDetail'
        data.currentCabinetKey = this.propData.cabinetKey
        data.currentTeamKey = this.teamInfo.teamKey
        data.readOnlyYn = true
        this.$emit('openAddPop', data)
      }
      // data.index = index
      // this.editMember = data
    },
    addSelectedList (data, index) {
      if (!this.selectedMemberList) this.selectedMemberList = []
      data.shareSeq = data.userKey
      this.selectedMemberList.push(data)
      console.log('@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#')
      console.log(this.selectedMemberList)
      this.$emit('changeSelectMemberList', this.selectedMemberList)
      // // eslint-disable-next-line no-debugger
      // debugger
      // eslint-disable-next-line vue/no-mutating-props
      this.listData[index].selectedYn = true
      // console.log(this.listData)
      // var tt = this.listData
    },
    checkClick () {
      this.$showToastPop('중복 선택입니다.')
    },
    deSelectList (index) {
      // eslint-disable-next-line vue/no-mutating-props
      this.listData[index].selectedYn = false
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

.memberPicImgWrap {width: 30px; margin-top: 5px; height: 30px; border-radius: 100%; border:1.5px solid #6768a7; float: left; background: #6768a745; overflow: hidden; display: flex;}
.memberPicImgWrap img {width: 100%;}
.receiverTeamMemberCard {border-bottom:1px solid #ddd; cursor: pointer; padding: 10px 10px; padding-bottom: 0;}
.filterTagBox {/* border: 1px solid #6768a745;  */padding: 0 10px; min-height: 20px; line-height: 20px; min-width: 80px; float: left; border-radius: 15px;}
.filterWrap{width: 33.3%; display: flex; justify-content: center;}
</style>
