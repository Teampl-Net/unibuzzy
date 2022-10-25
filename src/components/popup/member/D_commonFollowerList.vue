<template>
    <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" />
    <!-- <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" /> -->
    <div class="followerCard" v-for="(member, index) in managingList" :id="'mamberCard'+member.userKey" :key="index" >
        <div style="width: 100%; min-height: 40px; height: 100%; float: left;">
            <div class="fl mleft-01 w-100P" style="position: relative; display: flex;min-height: 40px; height: 100%; width: calc(100% - 125px)"  @click="goMemberInfo(member)">
                <div style="float: left; display: flex; flex-direction: column; margin-right: 10px; justify-content: center; align-items: center;">
                    <div v-if="member.userProfileImg"  class="managerPicImgWrap">
                        <img :src="(member.domainPath? member.domainPath + member.userProfileImg : member.userProfileImg)" />
                    </div>
                    <img v-else src="../../../../public/resource/userCommonIcon/userImg01.png" style=" width: 30px; float: left; " />
                    <!-- <div class="fl adminTag" :class="{nonTag: (!member.managerKey > 0 && currentTab === 'Show') || (!member.managerKey > 0 && currentTab === 'Admin') }">
                    <p v-if="member.ownerYn" class="font8 commonBlack fontBold" style="">관리자</p>
                    <p v-else class="font8 commonBlack fontBold" style="">매니저</p>
                    </div> -->
                    <!-- <div v-if="member.ownerYn || member.ownerYn === 1" style="padding: 3px 8px;float: left; margin-top: 4px; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'소유자'}}</p>
                    </div> -->
                    <div v-if="member.memberYn || member.memberYn === 1" style="padding: 3px 8px;float: left; margin-top: 4px;  border-radius: 8px; line-height: 18px; height: 23px; background-color:rgb(254 224 224);"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'멤버'}}</p>
                    </div>
                    <div v-else style="padding: 3px 8px;float: left; margin-top: 4px; border-radius: 8px; line-height: 18px; height: 23px; background-color:#F5F5F9;"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'구독자'}}</p>
                    </div>
                </div>
                <div style="width: 100%; min-height: 20px; float: left; display: flex; flex-direction: column;">
                    <p class="fl font16 commonBlack" style="text-align:left; padding-left:5px; width:calc(100% - 100px); line-height:30px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden scroll;">{{this.$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
                    <p v-if="(member.memberYn || member.memberYn === 1)" class="commonBlack font14 textLeft">{{member.userEmail}}</p>
                    <p v-if="(member.memberYn || member.memberYn === 1)" class="commonBlack font14 textLeft">{{member.phoneEnc}}</p>
                </div>
            </div>
            <div class="fr  memberItemBox" >
                <div @click="clickManagerBox('ALIM', member, index, member.manAlimYn)" :class="{activeMAlim: member.manAlimYn === 1}" class="font14 cursorP" style="margin-right: 5px; display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; border-radius: 5px; border: 1px solid #ccc;">알림</div>
                <div @click="clickManagerBox('MEMBER', member, index, member.manMemberYn)" :class="{activeMMember: member.manMemberYn === 1}" class="font14 cursorP" style="margin-right: 5px; display: flex; justify-content: center; align-items: center;  width: 35px; height: 35px; border-radius: 5px; border: 1px solid #ccc;">멤버</div>
                <div @click="clickManagerBox('CHAN', member, index, member.manChanYn)" :class="{activeMChan: member.manChanYn === 1}" class="font14 cursorP" style=" display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; border-radius: 5px; border: 1px solid #ccc;">채널</div>

                <!-- <div v-if="member.ownerYn" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                    <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'소유자'}}</p>
                </div>
                <div v-if="member.managerKey > 0 || member.grantDate != null" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                    <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'관리자'}}</p>
                </div> -->
            </div>
        </div>
        <gConfirmPop :confirmText='confirmManagerText' :confirmType="two" @no="confirmManagerPopShowYn = false, reportYn = false" @ok="okSaveManager" v-if="confirmManagerPopShowYn"/>
    </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
// eslint-disable-next-line
export default {
  props: {
    managingList: {},
    memberYn: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
    /* CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.teamKey)[0]
    } */
  },
  data () {
    return {
      systemName: localStorage.getItem('systemName'),
      interfaceBtnList: [{ text: '알림 보내기', event: 'sendPush' }],
      openCommonAlertPopShowYn: false,
      selectedMember: null,
      confirmManagerText: '',
      confirmManagerPopShowYn: false,
      selectedUserParamObj: {}
    }
  },
  created () {
    if (this.managingList) {
      this.disp_list = this.managingList
    }
    console.log(this.managingList)
  },
  methods: {
    clickManagerBox (manType, member, index, status) {
      this.selectedUserParamObj = { manType: manType, member: member, index: index }
      var typeText = null
      if (manType === 'CHAN') typeText = '채널관리자'
      if (manType === 'MEMBER') typeText = '멤버관리자'
      if (manType === 'ALIM') typeText = '알림관리자'
      var actText = null
      if (status || status === 1) {
        actText = '에서 제외시키겠습니까?'
      } else {
        actText = '로 지정하시겠습니까?'
      }
      this.confirmManagerText = this.$changeText(member.userDispMtext) + '을(를)<br>' + typeText + actText
      this.confirmManagerPopShowYn = true
    },
    okSaveManager () {
      var manType = this.selectedUserParamObj.manType
      var member = this.selectedUserParamObj.member
      var index = this.selectedUserParamObj.index
      this.setManager(manType, member, index)
      this.confirmManagerPopShowYn = false
    },
    async setManager (manType, member, index) {
      var param = {}
      if (member.managerKey) {
        param.managerKey = member.managerKey
      }
      param.userKey = member.userKey
      param.teamKey = member.teamKey
      param.followerKey = member.followerKey
      var localStatusObj = {}
      if (member.manAlimYn === 1) {
        if (manType === 'ALIM') {
          param.manAlimYn = false
          this.managingList[index].manAlimYn = 0
          param.manDelYn = true
          localStatusObj.manAlimYn = false
        } else {
          localStatusObj.manAlimYn = true
        }
      } else {
        if (manType === 'ALIM') {
          param.manAlimYn = true
          this.managingList[index].manAlimYn = 1
          localStatusObj.manAlimYn = true
        } else {
          localStatusObj.manAlimYn = false
        }
      }
      if (member.manMemberYn === 1) {
        if (manType === 'MEMBER') {
          param.manMemberYn = false
          this.managingList[index].manMemberYn = 0
          param.manDelYn = true
          localStatusObj.manMemberYn = false
        } else {
          localStatusObj.manMemberYn = true
        }
      } else {
        if (manType === 'MEMBER') {
          param.manMemberYn = true
          this.managingList[index].manMemberYn = 1
          localStatusObj.manMemberYn = true
        } else {
          localStatusObj.manMemberYn = false
        }
      }
      if (member.manChanYn === 1) {
        if (manType === 'CHAN') {
          param.manChanYn = false
          this.managingList[index].manChanYn = 0
          param.manDelYn = true
          localStatusObj.manMemberYn = false
        } else {
          localStatusObj.manMemberYn = true
        }
      } else {
        if (manType === 'CHAN') {
          param.manChanYn = true
          this.managingList[index].manChanYn = 1
          localStatusObj.manMemberYn = true
        } else {
          localStatusObj.manMemberYn = false
        }
      }
      console.log('param')
      console.log(param)
      if (!localStatusObj.manAlimYn && !localStatusObj.manMemberYn && !localStatusObj.manChanYn) {
        await this.deleteManager(param)
      } else {
        this.$emit('saveManager', param)
      }
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: 'service//tp.deleteManager',
        param: param
      })
      return result
    },
    openCommonAlertPop (member) {
      this.selectedMember = member
      this.openCommonAlertPopShowYn = true
    },
    closeCommonAlertPop () {
      this.openCommonAlertPopShowYn = false
    },
    clickAlertPopBtn (eventType) {
      if (eventType === 'sendPush') this.openPop('writePush', this.selectedMember)
      else if (eventType === 'sendEmail') this.sendMail()
      else if (eventType === 'callPhone') this.callPhone()
      else if (eventType === 'sendSms') this.sendSms()
      this.closeCommonAlertPop()
    },
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
    goMemberInfo (member) {
      if (member.memberYn || member.ownerYn || member.managerKey > 0) {
        this.$emit('memberInfo', member)
      } else {
        this.$showToastPop('구독자는 세부정보 확인이 불가합니다.')
      }
    }
  }
}
</script>

<style scoped>
.memberItemBox{
  width: 125px;
  display: flex; flex-direction: row; align-items: center; justify-content: flex-end; align-content: center; height: 30px;
}
.followerCard{

  float: left;
  width: 100%; min-height: 50px; padding: 0.5rem; border-bottom: 0.8px solid #ccc; float: left;
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

.managerPicImgWrap {width: 30px; height: 30px; border-radius: 100%; border:1.5px solid #6768a7; float: left; background: #6768a745; overflow: hidden; display: flex; }
.managerPicImgWrap img {width: 100%;}

.activeMAlim {
    background: rgb(204 223 239)!important;
    color: #303030
}
.activeMMember{
    background: rgb(212 232 209)!important;
    color: #303030
}
.activeMChan {
    background: rgb(252 245 181)!important;
    color: #303030
}
</style>
