<template>
    <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" />
    <gConfirmPop :confirmText='confirmManagerText' :confirmType="two" @no="confirmManagerPopShowYn = false, reportYn = false" @ok="okSaveManager" v-if="confirmManagerPopShowYn"/>
    <!-- <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" /> -->
    <div class="followerCard" v-for="(member, index) in managingList" :id="'mamberCard'+member.userKey" :key="index" >
        <div style="width: 100%; min-height: 40px; height: 100%; float: left; display: flex;     align-items: center;">
            <div class="fl mleft-01 w-100P" style="position: relative; display: flex;min-height: 40px; height: 100%; width: calc(100% - 130px)"  @click="goMemberInfo(member)">
                <div style="float: left; display: flex; flex-direction: column; width: 35px; margin-right: 15px; justify-content: center; align-items: center;">
                    <gProfileImg :smallYn="true" :userInfo="member" style="width: 35px; height: 35px;" />
                    <!-- <div class="fl adminTag" :class="{nonTag: (!member.managerKey > 0 && currentTab === 'Show') || (!member.managerKey > 0 && currentTab === 'Admin') }">
                    <p v-if="member.ownerYn" class="font8 commonBlack fontBold" style="">관리자</p>
                    <p v-else class="font8 commonBlack fontBold" style="">매니저</p>
                    </div> -->
                    <!-- <div v-if="member.ownerYn || member.ownerYn === 1" style="padding: 3px 8px;float: left; margin-top: 4px; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'소유자'}}</p>
                    </div> -->
                    <div v-if="member.ownerYn" style="padding: 3px 8px;float: left; margin-top: 4px;  border-radius: 8px; line-height: 18px; height: 23px; background-color:rgb(254 224 224);"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'소유자'}}</p>
                    </div>
                    <div v-else-if="member.memberTypeKey" style="padding: 3px 8px;float: left; margin-top: 4px;  border-radius: 8px; line-height: 18px; height: 23px; background-color:rgb(254 224 224);"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'멤버'}}</p>
                    </div>
                    <div v-else style="padding: 3px 8px;float: left; margin-top: 4px; border-radius: 8px; line-height: 18px; height: 23px; background-color:#F5F5F9;"  >
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'구독자'}}</p>
                    </div>
                </div>
                <div style="width: calc(100% - 50px); min-height: 20px; float: left; display: flex; flex-direction: column;">
                    <p class="fl font16 grayBlack" style="text-align:left; width:calc(100%); line-height:23px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; font-weight: bold;">{{this.$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
                    <p v-if="(member.memberTypeKey)" class="grayBlack font12 fontBold  textLeft textOverdot w-100P">{{member.userEmail? member.userEmail: '이메일 정보 없음'}}</p>
                    <p v-else class="grayBlack font12 fontBold textLeft textOverdot">{{this.$changeFollowerInfo('email', member.userEmail)}}</p>
                    <p v-if="(member.memberTypeKey)" class="grayBlack font12 fontBold textLeft textOverdot">{{member.phoneEnc? member.phoneEnc: '휴대폰 정보 없음'}}</p>
                    <p v-else class="grayBlack font12 fontBold textLeft textOverdot">{{this.$changeFollowerInfo('phone', member.phoneEnc)}}</p>
                    <div class="w-100P fl">
                        <p class="textLeft fl fontBold grayBlack font12 " >{{this.$changeText(member.memberNameMtext)}}</p>
                        <p class="textLeft fl fontBold grayBlack font12" v-for="(info, index) in member.memberInfoList" :key="index">
                            {{index !== 0 ? ' | ' : '('}}{{'' + this.$changeText(info.memberTypeItemNameMtext)}}: {{info.itemVal}}{{index === member.memberInfoList.length - 1? ')' : ''}}
                        </p>
                    </div>
                </div>
            </div>
            <div class="fr  memberItemBox" >
                <div @click="clickManagerBox('ALIM', member, index, member.mngAlimYn)" :class="{activeMAlim: member.mngAlimYn === 1}" class="font14 cursorP" style="margin-right: 5px; display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; border-radius: 5px;     box-shadow: inset 0 0 4px 1px #00000010;">알림</div>
                <div @click="clickManagerBox('MEMBER', member, index, member.mngMemberYn)" :class="{activeMMember: member.mngMemberYn === 1}" class="font14 cursorP" style="margin-right: 5px; display: flex; justify-content: center; align-items: center;  width: 35px; height: 35px; border-radius: 5px;    box-shadow: inset 0 0 4px 1px #00000010;">멤버</div>
                <div @click="clickManagerBox('CHAN', member, index, member.mngTeamYn)" :class="{activeMChan: member.mngTeamYn === 1}" class="font14 cursorP" style=" display: flex; justify-content: center; align-items: center; width: 35px; height: 35px; border-radius: 5px; ;    box-shadow: inset 0 0 4px 1px #00000010;">채널</div>

                <!-- <div v-if="member.ownerYn" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                    <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'소유자'}}</p>
                </div>
                <div v-if="member.managerKey > 0 || member.grantDate != null" style="padding: 3px 8px;float: right; border-radius: 8px; line-height: 18px; margin-left: 5px; height: 23px; background-color:#F5F5F9;"  >
                    <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{'관리자'}}</p>
                </div> -->
            </div>
        </div>
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
      if (member.mngAlimYn === 1) {
        if (manType === 'ALIM') {
          param.mngAlimYn = false
          this.managingList[index].mngAlimYn = 0
          param.manDelYn = true
          localStatusObj.mngAlimYn = false
        } else {
          localStatusObj.mngAlimYn = true
        }
      } else {
        if (manType === 'ALIM') {
          param.mngAlimYn = true
          this.managingList[index].mngAlimYn = 1
          localStatusObj.mngAlimYn = true
        } else {
          localStatusObj.mngAlimYn = false
        }
      }
      if (member.mngMemberYn === 1) {
        if (manType === 'MEMBER') {
          param.mngMemberYn = false
          this.managingList[index].mngMemberYn = 0
          param.manDelYn = true
          localStatusObj.mngMemberYn = false
        } else {
          localStatusObj.mngMemberYn = true
        }
      } else {
        if (manType === 'MEMBER') {
          param.mngMemberYn = true
          this.managingList[index].mngMemberYn = 1
          localStatusObj.mngMemberYn = true
        } else {
          localStatusObj.mngMemberYn = false
        }
      }
      if (member.mngTeamYn === 1) {
        if (manType === 'CHAN') {
          param.mngTeamYn = false
          this.managingList[index].mngTeamYn = 0
          param.manDelYn = true
          localStatusObj.mngTeamYn = false
        } else {
          localStatusObj.mngTeamYn = true
        }
      } else {
        if (manType === 'CHAN') {
          param.mngTeamYn = true
          this.managingList[index].mngTeamYn = 1
          localStatusObj.mngTeamYn = true
        } else {
          localStatusObj.mngTeamYn = false
        }
      }
      console.log('param')
      console.log(localStatusObj)
      // eslint-disable-next-line no-debugger
      debugger
      if (localStatusObj.mngAlimYn === false && localStatusObj.mngMemberYn === false && localStatusObj.mngTeamYn === false) {
        await this.deleteManager(param)
      } else {
        this.$emit('saveManager', param)
      }
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.deleteManager',
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
    background: #DFF7FF!important;
    color: #2D75B7;
    font-weight: bold;
    box-shadow: 0 0 4px 1px #00000025!important;
}
.activeMMember{
    background: #D0FBE8!important;
    color: #2DB77D;
    font-weight: bold;
    box-shadow: 0 0 4px 1px #00000025!important;
}
.activeMChan {
    background: #FBF6D0!important;
    color: #B7902D;
    font-weight: bold;
    box-shadow: 0 0 4px 1px #00000025!important;
}
</style>
