<template>
    <div class="memberCard" v-for="(member, index) in managingList" :key="index" @click="memberInfo(member)">
      <div class="fl mleft-01 w-100P" style="position: relative; width: calc(100% - 125px)">
        <img src="../../../assets/images/main/main_profile.png" style=" width: 30px; float: left; " />
        <div v-if="member.managerKey > 0" style="width: 30px;background-color:#CCCCCC; border-radius:0.5rem; position: absolute; bottom:-0.4rem;" class="fl">
          <p class="font8 commonBlack fontBold" style="">관리자</p>
        </div>
        <p class="fl font16 commonBlack" style="text-align:left; padding-left:10px; width:calc(100% - 30px); line-height:30px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden scroll;">{{this.$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
      </div>
      <div class="fr  memberItemBox" >
        <img class="fl" @click="openPop('writePush', member)" src="../../../assets/images/common/icon_message_solid.svg" style=" width:20px; height:18px; margin:0.6rem"  />
        <img class="fl" @click="openPop('selectAddressBookList', member)" src="../../../assets/images/channel/channer_addressBook.svg"  style="width:20px; margin:0.6rem" >
        <!-- <gToggle :toggleId='member.userKey' :isChecked="(member.managerKey !== undefined && member.managerKey !== null && member.managerKey !== '')" class="fl mtop-01" style="margin:0.5rem; padding-top:0.3rem" /> -->
        <!-- <div v-if="currentTab == 'Admin'"> -->
        <div v-if="currentOwner">
          <img v-if='member.ownerYn' src="../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px; margin:0.6rem 0.8rem; " class="fl">
          <div v-if="!member.ownerYn" class="fl" style="margin:0.5rem; position: relative; display: flex; justify-content: center;" >
            <gToggle :toggleId='member.userKey' @changeToggle='setManager' :isChecked="(member.managerKey > 0)" class="fl" />
            <label :for="member.userKey" class="font8 commonBlack fontBold" style=" position: absolute; bottom:-0.4rem;" >관리자</label>
          </div>
        </div>

        <!-- </div> -->

      </div>

    </div>
</template>

<script>

/* eslint-disable */
// eslint-disable-next-line
export default {
  props: {
    managingList: {},
    currentOwner: {}
  },
  // watch: {
  //   tab(){
  //     alert(true)
  //     this.currentTab = this.tab
  //   }
  // },
  data () {
    return {
      // currentTab:''
    }
  },
  methods: {
    openPop(targetType, member){
      var param = {}
      param.targetType = targetType
      param.teamKey = member.teamKey
      param.userKey = member.userKey
      if(member.userDispMtext) {param.userDispMtext = member.userDispMtext} else {param.userNameMtext = member.userNameMtext}

      if(targetType === 'writePush'){
        // param.targetKey = this.detailVal.value.creTeamKey
        param.targetKey = member.teamKey
        param.replyPopYn = true
        // param.creUserName = this.alimDetail[0].creUserName
        if(member.userDispMtext) {param.creUserName = member.userDispMtext} else {param.creUserName = member.userNameMtext}

        param.creUserKey = member.userKey
        // this.$emit('openPop', params)
      }
      this.$emit('openPop',param)
    },
    setManager(param){
      console.log(param);
      var params = {}
      params.userKey = param.toggleId
      params.manager = param.toggleYn
      this.$emit('setManager',params)

    },
    memberInfo(member){
      console.log(member);
    },
    memoDeleteClick(data, index){
      var param = {}
      param = data
      param.clickIndex = index
      this.$emit('deleteMemo', param)
    },
    cancelEdit(){
      this.editIndex = ''
    },
    // async editEnd(data){
    //   var memo = new Object()
    //   memo.bodyFullStr = this.inputText
    //   memo.bodyMinStr = this.inputText
    //   memo.memoKey = data.memoKey
    //   var result = await this.$commonAxiosFunction({
    //     url: '/api/tp.saveMemo',
    //     param: {memo: memo}
    //   })
    //   // console.log(result)
    //   if(result.data.result === true || result.data.result === 'true') {
    //     this.editIndex = ''
    //     this.$emit('editTrue')
    //   }
    // },
    scrollMove (key) {
      var location = document.getElementById(key).offsetTop;
      this.$emit('scrollMove',location)
      this.anima(key)
    },
    anima(key){
      document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.6)'

      setTimeout(() => {
        document.getElementById(key).style.backgroundColor = ''
      }, 700)
    }

  }
}
</script>

<style scoped>
.memberItemBox{
  min-width: 125px;

  display: flex; flex-direction: row; align-items: center; justify-content: flex-end; align-content: center; height: 30px;
}
.memberCard{
  float: left;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center; */

  width: 100%; min-height: 30px; padding: 0.5rem; border-bottom: 0.8px solid #ccc; float: left;
  background-color: white;
  transition : background-color 0.5s ease-in;
  animation-name: fadein; animation-duration: 0.3s;
  /* transition : height 0.5s ease-in; */
}

</style>
