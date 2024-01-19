<i18n>
{
  "ko": {
    "RECEPT_BTN_REJECT": "거절",
    "RECEPT_BTN_ACCEPT": "승인",
    "RECEPT_BTN_ALL": "전체선택",
    "RECEPT_MSG_NOAPPLI": "신청 가능한 요청 목록이 없습니다.",
    "RECEPT_MSG_NOSELECT": "선택한 목록이 없습니다.",
    "RECEPT_MSG_ACCEPT": "멤버신청을 승인하시겠습니까?",
    "RECEPT_MSG_REJECT": "멤버신청을 거절하시겠습니까?",
    "RECEPT_BTN_SEND": "알림 보내기"
  },
  "en": {
    "RECEPT_BTN_REJECT": "Reject",
    "RECEPT_BTN_ACCEPT": "Accept",
    "RECEPT_BTN_ALL": "Select All",
    "RECEPT_MSG_NOAPPLI": "There is no list of applicable requests.",
    "RECEPT_MSG_NOSELECT": "No list selected.",
    "RECEPT_MSG_ACCEPT": "Do you want to accept the membership application?",
    "RECEPT_MSG_REJECT": "Do you want to reject the membership application?",
    "RECEPT_BTN_SEND": "Send Noti"
  }
}
</i18n>
<template>
    <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" />
    <gConfirmPop @no="okPopShowYn = false" :confirmText="$t('RECEPT_MSG_ACCEPT')" confirmType='two' @ok="okMember" v-if="okPopShowYn" />
    <gConfirmPop @no="rejectPopShowYn = false" :confirmText="$t('RECEPT_MSG_REJECT')" confirmType='two' @ok="rejectMember" v-if="rejectPopShowYn" />
    <!-- <gAlertPop @closePop="closeCommonAlertPop" @clickBtn="clickAlertPopBtn" v-if="openCommonAlertPopShowYn" :btnList="interfaceBtnList" /> -->
    <p class="textLeft fl font16 fontBold" style="line-height: 30px;">{{ $t('COMMON_BTN_REQLIST') + '(' + this.managingList.length + ')'}}</p>
    <gBtnSmall @click="rejectClick" :btnTitle="$t('RECEPT_BTN_REJECT')" :class="{'CWDeepGrayBgColor' : managingList.length === 0}" style="margin-left: 5px;"/>
    <gBtnSmall @click="accessClick" :btnTitle="$t('RECEPT_BTN_ACCEPT')" :class="{'CWDeepGrayBgColor' : managingList.length === 0}" />
    <!-- <gBtnSmall @click="okPopShowYn = true" btnTitle="삭제" /> -->
    <div style="float: right; margin-top: 2px;margin-right: 5px; padding: 2px">
        <input v-model="allClickYn" @click="checkBoxValue(true)" type="checkbox" name="" id="allCheck" style="width: 15px; margin: 3px 0px;margin-top: 2px; margin-right: 5px; float: left; height:18px;">
        <label class="font15 fl" for="allCheck">{{ $t('RECEPT_BTN_ALL') }}</label>
    </div>
    <div style="width: 100%; height: 1.5px; background: #ccc; margin: 5px 0; margin-top: 5px;float: left;"></div>
    <div class="reqCard"  v-for="(member, index) in managingList" :id="'reqCard'+member.userKey" :key="index" >
        <input @click="checkBoxValue(false)" type="checkbox" class="reqCheck" style="float: left; width: 18px;height: 18px; margin: 5px 0; margin-right: 10px;" :id="'check' + member.userKey">
        <div style="width: calc(100% - 30px); float: left;">
            <div class="fl mleft-01 w-100P" style="position: relative;">
                <div v-if="member.userProfileImg"  class="reqPicImgWrap">
                <img :src="(member.domainPath? member.domainPath + member.userProfileImg : member.userProfileImg)" />
                </div>
                <img v-else src="../../../../public/resource/userCommonIcon/userImg01.png" style=" width: 30px; float: left; " />
                <!-- <div class="fl adminTag" :class="{nonTag: (!member.managerKey > 0 && currentTab === 'Show') || (!member.managerKey > 0 && currentTab === 'Admin') }">
                <p v-if="member.ownerYn" class="font8 commonBlack fontBold" style="">관리자</p>
                <p v-else class="font8 commonBlack fontBold" style="">매니저</p>
                </div> -->
                <p class="fl font16 fontBold commonBlack" style="text-align:left; padding-left:5px; width:calc(100% - 40px); line-height:30px; white-space: nowrap; text-overflow: ellipsis;overflow: hidden scroll;">{{this.$changeText(member.userDispMtext ||member.userNameMtext)}}</p>
            </div>
            <div style="width: 100%; min-height: 30px; margin-top: 10px; float: left;">
                <p v-html="this.decodeContents(member.reqMemberStr)" class="textLeft font15 commonBlack" style="white-space: pre-wrap; word-wrap: break-word;">
                </p>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line
export default {
  props: {
    managingList: {},
    followerType: {}
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
      interfaceBtnList: [{ text: this.$t('RECEPT_BTN_SEND'), event: 'sendPush' }],
      openCommonAlertPopShowYn: false,
      selectedMember: null,
      allClickYn: false,
      okPopShowYn: false,
      rejectPopShowYn: false
    }
  },
  created () {
  },
  methods: {
    accessClick () {
      if (this.managingList.length > 0) {
        this.okPopShowYn = true
      } else if (this.managingList.length === 0) {
        this.$showToastPop(this.$t('RECEPT_MSG_NOAPPLI'))
      } else {
        this.$showToastPop(this.$t('RECEPT_MSG_NOSELECT'))
      }
    },
    rejectClick () {
      if (this.managingList.length > 0) {
        this.rejectPopShowYn = true
      } else if (this.managingList.length === 0) {
        this.$showToastPop(this.$t('RECEPT_MSG_NOAPPLI'))
      } else {
        this.$showToastPop(this.$t('RECEPT_MSG_NOSELECT'))
      }
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    okMember () {
      var checkList = document.querySelectorAll('.reqCheck')
      var okList = []
      for (var c = 0; c < checkList.length; c++) {
        if (checkList[c].checked === true) {
          okList.push(this.managingList[c])
          // break
        }
      }
      this.$emit('okMember', okList)
    },
    rejectMember () {
      var checkList = document.querySelectorAll('.reqCheck')
      var rejectList = []
      var restList = [] // 거절 후 남은 인원
      for (var i = 0; i < checkList.length; i++) {
        if (checkList[i].checked === true) {
          rejectList.push(this.managingList[i])
        } else {
          restList.push(this.managingList[i])
        }
      }
    },
    checkBoxValue (allYn) {
      var checkList = document.querySelectorAll('.reqCheck')
      // eslint-disable-next-line no-debugger
      debugger
      if (allYn) {
        for (var c = 0; c < checkList.length; c++) {
          checkList[c].checked = !this.allClickYn
        }
      } else {
        if (this.allClickYn) {
          var checkedYn = 0
          for (var c1 = 0; c1 < checkList.length; c1++) {
            if (checkList[c1].checked === false) {
              checkedYn += 1
            // break
            }
          }
          if (checkedYn > 0) {
            this.allClickYn = false
          }
        } else {
          var checkYn = 0
          for (var ch = 0; ch < checkList.length; ch++) {
            if (checkList[ch].checked === false) {
              checkYn += 1
              break
            }
          }
          if (checkYn === 0) {
            this.allClickYn = true
          }
        }
      }
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
      this.$emit('memberInfo', member)
    }
  }
}
</script>

<style scoped>
.memberItemBox{
  min-width: 125px;

  display: flex; flex-direction: row; align-items: center; justify-content: flex-end; align-content: center; height: 30px;
}
.reqCard{

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

.reqPicImgWrap {width: 28px; height: 28px; border-radius: 100%; border:1.5px solid rgb(74 102 158); float: left; background-color: #879dc945; overflow: hidden; display: flex; margin-right: 5px}
.reqPicImgWrap img {width: 100%;}
</style>
