<template>
<div class="receiverTeamMemberArea" >
    <!-- <div style="width: 100%; height: calc(100% - 40px); margin-top: 10px; overflow: hidden scroll;"> -->
        <draggable style="--webkit-tap-highlight-color: rgba(0,0,0,0);" ref="editableArea" class="ghostClass" :v-model="memberList" ghost-class="ghost" :disabled="dragable" delay="200" >
            <transition-group>
                <template v-for="(data, index) in listData" :key='data'>
                    <div class="receiverTeamMemberCard fl" :class="{foo:index === 0, selectLastMargin:selectPopYn=== true, selectedBox : data.selectedYn}" :style="selectPopYn === true ? 'width:90%;' : ''" style="width:100%; height:60px; position: relative;"  >
                        <div v-if="data.userProfileImg"  class="memberPicImgWrap">
                          <img :src="data.userProfileImg" />
                        </div>
                        <img v-else src="../../../assets/images/main/main_subscriber.png" style="width: 20px; height: 20px; margin-left: 5px; margin-top: 10px;" class="fl"/>
                        <div @click="!selectPopYn? openModiPop(data,index): ''" class="fl textOverdot" style="width: calc(100% - 70px); height: 100%;" >
                            <p class="fl font16 commonBlack mleft-1 receiverTeamText ">{{this.$changeText(data.userDispMtext || data.userNameMtext)}}</p>
                        </div>
                        <div v-if=" !propData.selectMemberType === 'manager' || selectPopYn !== true" @click="deleteMemberClick(data,index)" class="fl" style="width:55px; height: 60px; line-height:60px; position:absolute; top:0; right: 0; ">
                            <img v-if="propData.value.creUserKey !== data.userKey" src="../../../assets/images/formEditor/trashIcon_gray.svg"  style="width: 20px;" alt="">
                            <img v-else src="../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px;  float: right; margin-right: 18px; margin-top: 20px;" class="fl">
                        </div>
                        <div v-if="selectPopYn === true" class="fr" style="height: 100%; width: 30px; display:flex; flex-shrink: 0; flex-grow: 0; ">
                            <img style="width: 30px; flex-shrink: 0; flex-grow: 0; " src="../../../assets/images/common/plusoutline.svg" alt="" v-if="!data.selectedYn" @click="addSelectedList(data,index)" >
                            <img style="width: 25px; height: 20px; margin-top: 5px; flex-shrink: 0; flex-grow: 0; " src="../../../assets/images/common/Tal_checkImage.svg" alt="" v-else @click="checkClick(index)">
                        </div>
                    </div>
                </template>
            </transition-group>
        </draggable>
    <!-- </div> -->
</div>

</template>

<script>
export default {
  components: { },
  props: {
    teamInfo: {},
    listData: {},
    propData: {},
    selectPopYn: {},
    parentSelectList: {}
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
      pageTopBtnTitle: '편집'
    }
  },
  beforeUnmount () {
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerListOpen = false
    // eslint-disable-next-line vue/no-mutating-props
    this.propData.managerOpenYn = true
  },
  async created () {
    // eslint-disable-next-line vue/no-mutating-props
    if (!this.propData.value) this.propData.value = {}
    this.teamName = this.$changeText(this.teamInfo.nameMtext).substr(0, 5) + '...'
  },
  methods: {
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
    async deleteMemberClick (data, index) {
      if (this.propData.value.creUserKey !== data.userKey) {
        if (this.propData.selectMemberType === 'manager') {
          this.$emit('deleteManager', data)
        } else {
          var param = {}
          console.log(data)
          param.mccKey = data.mccKey
          param.jobkindId = data.jobkindId
          var result = await this.$commonAxiosFunction({
            url: '/tp.deleteMCabContents',
            param: param
          })
          console.log(result)
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
      data.shareSeq = data.userKey
      this.selectedMemberList.push(data)
      this.$emit('changeSelectMemberList', this.selectedMemberList)
      // eslint-disable-next-line vue/no-mutating-props
      this.listData[index].selectedYn = true
      // var tt = this.listData
    },
    checkClick () {
      alert('중복선택입니다.')
    },
    deSelectList (index) {
      // eslint-disable-next-line vue/no-mutating-props
      this.listData[index].selectedYn = false
    },
    updateData (obj) {
      this.addMemberPopYn = false
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
.receiverTeamMemberCard {border-bottom:1px solid #ddd; padding: 10px 0px;}
</style>
