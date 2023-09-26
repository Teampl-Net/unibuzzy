<i18n>
{
  "ko": {
    "FOLLOW_NAME_OWNER": "소유자",
    "FOLLOW_NAME_MEMBER": "멤버",
    "FOLLOW_NAME_FOLLOWER": "구독자",
    "FOLLOW_MSG_NOEMAIL": "이메일 정보 없음",
    "FOLLOW_MSG_NONUMBER": "휴대폰 정보 없음",
    "FOLLOW_NAME_MANAGE": "관리자",
    "FOLLOW_MSG_NOAUTH": "구독자는 세부정보 확인이 불가합니다."
  },
  "en": {
    "FOLLOW_NAME_OWNER": "Owner",
    "FOLLOW_NAME_MEMBER": "Member",
    "FOLLOW_NAME_FOLLOWER": "Follower",
    "FOLLOW_MSG_NOEMAIL": "No Email Info",
    "FOLLOW_MSG_NONUMBER": "No Phone Number Info",
    "FOLLOW_NAME_MANAGE": "Manager",
    "FOLLOW_MSG_NOAUTH": "Subscriber cannot check details."
  }
}
</i18n>
<template>
    <gConfirmPop :confirmText="confirmManagerText" :confirmType="two" @no="confirmManagerPopShowYn = false, reportYn = false" @ok="okSaveManager" v-if="confirmManagerPopShowYn"/>
    <div class="followerCard" v-for="(member, index) in managingList" :id="'mamberCard'+member.userKey" :key="index" >
        <div class="followerCardWrap">
            <div class="fl mleft-01 w100P followerCardInfoArea" @click="goMemberInfo(member)">
                <div class="followerAuth">
                    <gProfileImg class="followerImg" :smallYn="true" :userInfo="member" />
                    <div v-if="member.ownerYn" class="followerAuthBox">
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{ $t('Owner') }}</p>
                    </div>
                    <div v-else class="followerAuthBox">
                        <p class="fr font12 cursorP fontBold lightGray"  @click="saveMemberButton" >{{ $t('Member') }}</p>
                    </div>
                </div>
                <div class="followerInfoBox">
                    <p class="fl font16 grayBlack followerName">{{$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
                    <p v-if="(member.memberTypeKey)" class="grayBlack font12 fontBold  textLeft textOverdot w-100P">{{member.userEmail? member.userEmail: $t('No Email Info')}}</p>
                    <p v-else class="grayBlack font12 fontBold textLeft textOverdot">{{$changeFollowerInfo('email', member.userEmail)}}</p>
                    <p v-if="(member.memberTypeKey)" class="grayBlack font12 fontBold textLeft textOverdot">{{member.phoneEnc? member.phoneEnc: $t('No Phone Number Info')}}</p>
                    <p v-else class="grayBlack font12 fontBold textLeft textOverdot">{{$changeFollowerInfo('phone', member.phoneEnc)}}</p>
                    <div class="w100P fl">
                        <p class="textLeft fl fontBold grayBlack font12" >{{$changeText(member.memberNameMtext)}}</p>
                    </div>
                </div>
            </div>
            <div class="fr  memberItemBox" >
                <div @click="clickManagerBox('CHAN', member, index, member.mngTeamYn)" :class="{activeMChan: member.mngTeamYn === 1}" class="font12 cursorP memMngBtn">{{ $t('COMM_CHAN_MANAGER') }}</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
// eslint-disable-next-line
export default {
  props: {
    managingList: {}
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  data () {
    return {
      confirmManagerText: '',
      confirmManagerPopShowYn: false,
      selectedUserParamObj: {}
    }
  },
  created () {
    if (this.managingList) {
      this.disp_list = this.managingList
    }
  },
  methods: {
    clickManagerBox (manType, member, index, status) {
      this.selectedUserParamObj = { manType: manType, member: member, index: index }
      var typeText = null
      if (manType === 'CHAN') typeText = this.$t('COMMON_NAME_CHANNEL') + ' ' + this.$t('FOLLOW_NAME_MANAGE')
      if (manType === 'MEMBER') typeText = this.$t('FOLLOW_NAME_MEMBER') + ' ' + this.$t('FOLLOW_NAME_MANAGE')
      if (manType === 'ALIM') typeText = this.$t('COMMON_TAB_NOTI') + ' ' + this.$t('FOLLOW_NAME_MANAGE')
      var actText = null
      if (status || status === 1) {
        actText = '에서 제외시키겠습니까?'
      } else {
        actText = '로 지정하시겠습니까?'
      }
      if (this.GE_LOCALE === 'ko') {
        this.confirmManagerText = this.$changeText(member.userDispMtext) + '을(를)<br>' + typeText + actText
      } else {
        this.confirmManagerText = `Are you sure you want to revoke ${this.$changeText(member.userDispMtext)}'s ${typeText} authority?`
      }
      this.confirmManagerPopShowYn = true
    },
    okSaveManager () {
      var manType = this.selectedUserParamObj.manType
      var member = this.selectedUserParamObj.member
      var index = this.selectedUserParamObj.index
      this.setManager(manType, member, index)
      this.confirmManagerPopShowYn = false
    },
    async setManager (manType, member, index) { // index 1: 관리자 제외 / 0: 관리자로 지정
      var param = {}
      if (member.managerKey) {
        param.managerKey = member.managerKey
      }
      param.userKey = member.userKey
      param.teamKey = member.teamKey
      param.followerKey = member.followerKey
      var localStatusObj = {}
      // 추후 멤버 매니저가 복구되면 사용할 코드
      // if (member.mngMemberYn === 1) {
      //   if (manType === 'MEMBER') {
      //     param.mngMemberYn = false
      //     this.managingList[index].mngMemberYn = 0
      //     param.manDelYn = true
      //     localStatusObj.mngMemberYn = false
      //   } else {
      //     localStatusObj.mngMemberYn = true
      //   }
      // } else {
      //   if (manType === 'MEMBER') {
      //     param.mngMemberYn = true
      //     this.managingList[index].mngMemberYn = 1
      //     localStatusObj.mngMemberYn = true
      //   } else {
      //     localStatusObj.mngMemberYn = false
      //   }
      // }
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
      if (localStatusObj.mngAlimYn === false && localStatusObj.mngMemberYn === false && localStatusObj.mngTeamYn === false) {
        await this.deleteManager(param)
      } else {
        this.$emit('saveManager', param)
      }
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.deleteManager',
        param: param
      })
      return result
    },
    goMemberInfo (member) {
      this.$emit('memberInfo', member)
    }
  }
}
</script>

<style scoped>
.memberItemBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-content: center;
  height: 30px;
}
.followerCard {
  float: left;
  width: 100%;
  min-height: 50px;
  padding: 0.5rem 1rem;
  border-bottom: 0.8px solid #ccc;
  float: left;
  background-color: white;
  transition : background-color 0.5s ease-in;
  animation-name: fadein; animation-duration: 0.3s;
  white-space: nowrap;
  /* transition : height 0.5s ease-in; */
}
.adminTag {
  width: 30px;
  background-color:#CCC;
  border-radius:0.5rem;
  position: absolute;
  bottom:-0.4rem;
  animation-name: fadein;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}
.nonTag{
  animation-name: fadeout;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}
.noneCard{
  animation-name: listout;
  animation-duration: 0.2s;
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
.managerPicImgWrap {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border:1.5px solid #6768a7;
  float: left;
  background: #6768a745;
  overflow: hidden;
  display: flex;
}
.managerPicImgWrap img {
  width: 100%;
}

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
.followerCardWrap {
  width: 100%;
  min-height: 40px;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.followerCardInfoArea {
  position: relative;
  display: flex;
  min-height: 40px;
  height: 100%;
  width: calc(100% - 130px)
}
.followerAuth {
  float: left;
  display: flex;
  flex-direction: column;
  width: 35px;
  margin-right: 25px;
  justify-content: center;
  align-items: center;
}
.followerImg {
  width: 35px !important;
  height: 35px !important;
}
.followerAuthBox {
  padding: 3px 8px;
  float: left;
  margin-top: 4px;
  border-radius: 8px;
  line-height: 18px;
  height: 23px;
  background-color:rgb(254 224 224);
}
.followerBg {
  background-color:#F5F5F9;
}
.followerInfoBox {
  width: calc(100% - 50px);
  min-height: 20px;
  float: left;
  display: flex;
  flex-direction: column;
}
.followerName {
  text-align: left;
  width: 100%;
  line-height: 23px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}
.alimMngBtn {
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 5px;
  box-shadow: inset 0 0 4px 1px #00000010;
  padding: 5px;
}
.memMngBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-radius: 5px;
  box-shadow: inset 0 0 4px 1px #00000010;
  padding: 5px;
}
</style>
