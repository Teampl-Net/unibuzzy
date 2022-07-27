<template>
    <div class="memberCard" v-for="(member, index) in managingList" :id="'mamberCard'+member.userKey" :key="index" >
      <div class="fl mleft-01 w-100P" style="position: relative; width: calc(100% - 125px)" @click="memberInfo(member)">
        <div v-if="member.userProfileImg"  class="managerPicImgWrap">
          <img :src="member.userProfileImg" />
        </div>
        <img v-else src="../../../assets/images/main/main_profile.png" style=" width: 30px; float: left; " />
        <div class="fl adminTag" :class="{nonTag: !member.managerKey > 0}">
          <p v-if="member.ownerYn" class="font8 commonBlack fontBold" style="">관리자</p>
          <p v-else class="font8 commonBlack fontBold" style="">매니저</p>
        </div>
        <p class="fl font16 commonBlack" style="text-align:left; padding-left:5px; width:calc(100% - 40px); line-height:30px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden scroll;">{{this.$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
      </div>
      <div class="fr  memberItemBox" >
        <img class="fl" @click="openPop('writePush', member)" src="../../../assets/images/common/icon_message_solid.svg" style=" width:20px; height:18px; margin:0.6rem"  />
        <img class="fl" @click="openPop('selectAddressBookList', member)" src="../../../assets/images/channel/channer_addressBook.svg"  style="width:20px; margin:0.6rem" >
        <!-- <gToggle :toggleId='member.userKey' :isChecked="(member.managerKey !== undefined && member.managerKey !== null && member.managerKey !== '')" class="fl mtop-01" style="margin:0.5rem; padding-top:0.3rem" /> -->
        <!-- <div v-if="currentTab == 'Admin'"> -->
        <div v-if="currentOwner">
          <img v-if='member.ownerYn' src="../../../assets/images/channel/ownerChannel_crown.svg" alt="" style="width: 20px; margin:0.6rem 0.8rem; " class="fl">
          <div v-if="!member.ownerYn && member.followerKey > 0" class="fl" style="margin:0.5rem; position: relative; display: flex; justify-content: center;" >
            <gToggle :toggleId='member.userKey' @changeToggle='setManager' :isChecked="(member.managerKey > 0)" class="fl" />
            <label :for="member.userKey" class="font8 commonBlack fontBold" style=" position: absolute; bottom:-0.4rem;" >매니저</label>

          </div>
          <div v-if="!member.ownerYn && !member.followerKey" style="margin: 0 0.6rem;" class="fl" @click="this.$emit('match')">
            <!-- <p class="commonBlack font10">팔로우</p> -->
            <match :color="'#6768a7'" size='5px' style="width:10px;" />
            <p class="commonBlack font10">대기중</p>
          </div>
        </div>

        <!-- </div> -->

      </div>

    </div>
</template>

<script>
import match from './Tal_matching.vue'
// eslint-disable-next-line
export default {
  components: { match },
  props: {
    managingList: {},
    currentOwner: {}
  },
  data () {
    return {
      // currentTab:''
    }
  },
  methods: {

    openPop (targetType, member) {
      var param = {}
      param.targetType = targetType
      param.teamKey = member.teamKey
      param.userKey = member.userKey
      if (member.userDispMtext) { param.userDispMtext = member.userDispMtext } else { param.userNameMtext = member.userNameMtext }

      if (targetType === 'writePush') {
        // param.targetKey = this.detailVal.value.creTeamKey
        param.targetKey = member.teamKey
        param.replyPopYn = true
        // param.creUserName = this.alimDetail[0].creUserName
        if (member.userDispMtext) { param.creUserName = member.userDispMtext } else { param.creUserName = member.userNameMtext }

        param.creUserKey = member.userKey
        // this.$emit('openPop', params)
      }
      this.$emit('openPop', param)
    },
    setManager (param) {
      var params = {}
      params.userKey = param.toggleId
      params.manager = param.toggleYn

      // if(param.toggleYn === false){
      // this.animation('mamberCard'+param.toggleId, true)
      // }
      this.$emit('setManager', params)
    },
    memberInfo (member) {
      this.$emit('memberInfo', member)
    },
    animation (key) {
      // document.getElementById(key).style.display = 'none'
      document.getElementById(key).className = 'noneCard'
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
  width: 100%; height: 50px; padding: 0.5rem; border-bottom: 0.8px solid #ccc; float: left;
  background-color: white;
  transition : background-color 0.5s ease-in;
  animation-name: fadein; animation-duration: 0.3s;
  white-space: nowrap;
  /* transition : height 0.5s ease-in; */
}
.adminTag{
  width: 30px;background-color:#CCCCCC; border-radius:0.5rem; position: absolute; bottom:-0.4rem;
  animation-name: fadein; animation-duration: 0.3s;
  animation-fill-mode: forwards;
}
.nonTag{
  animation-name: fadeout; animation-duration: 0.3s;
  animation-fill-mode: forwards;

}
.noneCard{
  animation-name: listout; animation-duration: 0.2s;
  animation-fill-mode: forwards;

}
@keyframes listout {
  0% {
    /* padding: 0.5rem; */
    opacity: 1;
  }

  100% {
    /* margin-right: 100%; */
    opacity: 0;
  }
}

.managerPicImgWrap {width: 30px; height: 30px; border-radius: 100%; border:1.5px solid #6768a7; float: left; background: #6768a745; overflow: hidden; display: flex; margin-right: 10px}
.managerPicImgWrap img {width: 100%;}
</style>
