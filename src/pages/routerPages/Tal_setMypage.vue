<template>
    <div style="padding-bottom: 30px; overflow: hidden scroll; height: 100%;">
    <!-- <pushPop :detailVal='dummy' @closePushPop="closePushPop" /> -->
      <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
      <logoutPop v-if="logOutShowYn" @closePop="closeLogoutPop"/>
      <policyPop v-if="this.showPolicyPopYn" :policyType="this.policyType" @closePolicyPop="closePolicyPop" />
      <settingAlim v-if="settingAlimPopYn"   @closePolicyPop="settingAlimPopYn = false" />
      <userImgSelectCompo @closeXPop="this.$emit('closeXPop')" :parentSelectedIconFileKey="this.userInfo.picMfilekey"  @no="this.changeUserIconShowYn = false" v-if="changeUserIconShowYn"/>
      <div class="" >
        <div class="profileWrap ">
          <div class="imgSize">
            <div class="roundDiv">
              <img v-if="this.userInfo.userProfileImg" :src="this.userInfo.userProfileImg" style="width: 100%; position: absolute; left: 0; top: 0;"/>
              <img  v-else src="../../assets/images/main/main_profile.png" style="width: 100%; position: absolute; left: 0; top: 0;"/>
            </div>
            <div @click="changeUserImg()" class="font14" style="padding: 0 8px; float: left; position: absolute; bottom: 10px; right: -10px; z-index: 999; min-height: 20px; border-radius: 5px; background: #00000070; color: #FFF;">변경</div>
            <!-- <img src="../../assets/images/push/noticebox_edit.png" style="width: 20px; height: 20px; position: absolute; bottom: 10px; right: -5px; z-index: 999;" class="fr" @click="changeUserImg()" > -->
          </div>
          <div class="font20 fontBold mtop-1" style="width:100%; display: flex; justify-content: center; float:left; transform: translate(10px);" v-show="!changeYn" >
            <span class="fl">{{this.$changeText(this.userInfo.userDispMtext)}}</span>
            <img src="../../assets/images/push/noticebox_edit.png" style="width: 20px; height: 20px; margin-left: 10px; margin-top: 2px;" class="fr" @click="changeUserDispMtext()" >
          </div>

          <div class="fl" style=" width:100%; position: relative;" v-show="changeYn">
            <div class="" style="position: absolute; left:50%; transform: translate(-50%); width:80%; max-width:250px; min-width:50px; margin-top: 10px;">
              <input class="fl font16" type="text" v-model="tempUserDispName" style="width:calc(100% - 100px); outline: none; border: 1px solid #ccc;" @keyup.enter="setDispName" />
              <div class="fl" style="width: 100px">
                <p class="fl mleft-1 font13" style="line-height:30px" @click="setDispName" >확인</p>
                <p class="fl mleft-1 font13" style="line-height:30px" @click="changeYn = false">취소</p>
              </div>
            </div>
          </div>
        </div>
        <div class="" style="text-align: left; ">
          <userItem class="w-100P font16 mbottom-1" uItem="이메일" style="border-bottom: 0.5px solid #E4E4E4; " @openPop="openPop" />
          <userItem class="w-100P font16" @openPop="openPop" uItem="휴대폰 번호" />
        </div>
        <div class="grayLine"></div>
      </div>
      <div class="subPaddingWrap">
        <table>
          <!-- <tr @click="settingAlimPopYn = true"><th colspan="2">알림 설정</th></tr> -->
          <!-- <tr><th>가입일</th><td class="textRight">{{this.$dayjs(userInfo.creDate).format('YYYY-MM-DD')}}</td></tr> -->
          <tr><th class="font16">가입일</th><td class="textRight font16">{{this.$changeDateFormat(userInfo.creDate)}}</td></tr>
          <!-- <tr><th>가입일</th><td class="textRight">{{this.$changeDateFormat('2021-06-22 14:22')}}</td></tr> -->
          <tr @click="openPolicyPop('personalInfo')"><th class="font16" colspan="2">개인정보 처리방침</th></tr>
          <tr @click="openPolicyPop('useTheAlim')"><th class="font16" colspan="2">이용약관</th></tr>
          <tr>
            <th class="font16">
              버전정보
              <p class="font10">최신버전: 1.0</p>
            </th>
            <td class="textRight font16">{{appVersion}}</td></tr>
            <!-- <tr @click="this.myChanListPopYn = true">
              <th>
                내 채널 -->
                <!-- <a href="http://adm.pushmsg.net/">내 채널</a> -->
              <!-- </th>
              <td class="textRight"></td>
            </tr> -->

        </table>
        <div v-on:click="openLogoutPop" class="font14" style="background-color: #F5F5F9; width: 100%; color:#6768A7; font-weight: bold; height: 45px; margin-bottom: 2rem;border-radius: 5px; padding: 0.6rem;">
          더알림 로그아웃
        </div>
        <p class="leaveText font14">더알림을 탈퇴하려면 <span v-on:click="openPop('leaveTheAlim')">여기</span>를 눌러주세요.</p>
      </div>

      <gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
    </div>
</template>

<script>
/* eslint-disable */
import userItem from '../../components/unit/Tal_userItem.vue'
import logoutPop from '../../components/pageComponents/myPage/Tal_logoutPop.vue'
import policyPop from '../../components/pageComponents/myPage/Tal_policyPop.vue'
import settingAlim from '../../components/pageComponents/myPage/Tal_SettingAlimDetail.vue'
import userImgSelectCompo from '../../components/pageComponents/myPage/Tal_changeUserIcon.vue'
/* import pushPop from '../../components/popup/Tal_pushDetailPopup.vue' */

export default {
  name: 'myPage',
  components: {
    userItem,
    logoutPop,
    policyPop,
    settingAlim,
    userImgSelectCompo
  },
  data () {
    return {
      pageHistoryName: '',
      userInfo: {},
      changeUserIconShowYn:false,
      myChanListPopYn: false,
      userEmail: { click: 'changeEmail', icon: '/resource/common/main_email.png', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '변경', link: 'http://naver.com' },
      userPhone: { click: 'changeMobile', icon: '/resource/common/main_phone.png', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '변경', link: 'http://naver.com' },
      appVersion: '1.0.1',
      logOutShowYn: false,
      showPolicyPopYn: false,
      policyType: 'useTheAlim',
      settingAlimPopYn: false,
      tempUserDispName: '',
      changeYn: false,
      errorBoxYn:false,
      errorBoxText : '관리자에게 문의하세요.'
      // dummy:{data:{title:'제목',creDate:'2022-02-11 13:12',body:'안녕하세요!~~',targetKey:'01',showCreNameYn:true ,creUserName:"KO$^$정재준" }}
    }
  },
  created () {
    this.getUserInform()

    localStorage.setItem('notiReloadPage', 'none')
    this.$emit('changePageHeader', '설정')

    /* var history = localStorage.getItem('popHistoryStack').split('$#$')
    this.pageHistoryName = 'page' + (history.length - 1) */
  },
  computed: {
  },
  mounted () {
    this.$emit('closeLoading')
  },
  methods: {
    changeUserImg () {
      if(this.changeUserIconShowYn) {
        ;
      } else {
        this.changeUserIconShowYn = true
      }
    },
    async setDispName () {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      console.log('this.userInfo');
      console.log(this.userInfo);
      // param.user = this.userInfo
      user.userKey = this.userInfo.userKey
      user.userNameMtext = this.userInfo.userNameMtext
      user.userDispMtext = 'KO$^$' + this.tempUserDispName
      param.user = user
      param.updateYn = true
      console.log(param)

      var result = await this.$changeDispName(param)
      console.log(result)

      if (result.data.message === 'OK') {
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        this.getUserInform()
        this.changeYn = false
        this.$router.push('/')
        this.$emit('closeXPop')
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {
        this.errorBoxText = '이름 변경 중 서버에 오류'
        this.errorBoxYn = true
      }
    },
    changeUserDispMtext () {
      this.changeYn = true
      this.tempUserDispName = this.$changeText(this.userInfo.userDispMtext)
    },
    openPop (target) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = target
      this.$emit('openPop', params)
    },
    openLogoutPop () {
      this.logOutShowYn = true
    },
    closeLogoutPop (request) {
      this.logOutShowYn = false
      if (request !== undefined && request !== null && request !== '') {
        localStorage.setItem('loginYn', false)
        localStorage.setItem('user', '')
        this.$router.replace('/policies')
      }
    },
    openPolicyPop (type) {
      this.policyType = type
      this.showPolicyPopYn = true
    },
    closePolicyPop () {
      this.showPolicyPopYn = false
    },
    async getUserInform () {
      this.userInfo = await this.$getUserInform()

      if (this.userInfo.userEmail); else this.userInfo.userEmail = '등록된 이메일이 없습니다.'
      if (this.userInfo.phoneLast); else this.userInfo.phoneLast = null || '등록된 번호가 없습니다.'
      if (!this.userInfo.userDispMtext) { this.userInfo.userDispMtext = this.userInfo.userNameMtext } else {this.userInfo.phoneLast = '등록된 이름이 없습니다.'}

      // console.log(this.userInfo.creDate)
    },
    openManagerChanDetail (param) {
      this.$emit('openPop', param)
    }

  }
}
</script>

<style scoped>
.profileWrap{display: flex; flex-direction: column;justify-content: center; align-items: center; width: 100%; height: 200px; }
.grayLine{background-color: #F3F3F3; height: 0.8rem; width: 100%;}
.roundDiv{position: relative; box-sizing: border-box; overflow: hidden; border-radius: 6rem; padding: 8px; border:2px solid #6768a7; background: #6768a745; padding-top: 16px; padding-bottom: 0; margin-bottom: 0.5rem; width: 6rem; height: 6rem;}
table{text-align: left; width: 100%;}
tr, td, th {
  height: 4rem;
  margin-bottom: 1rem

}
td {
  border-bottom: none !important
}
tr{border-bottom: 1px solid #F3F3F3}
th {color: #6768A7}
.imgSize {width: 6rem; height: 6rem; position: relative;}
.subPaddingWrap{padding: 0.7rem 0 ; box-sizing: border-box; width: 100%; }
.leaveText{text-align: left; color: #A1A1A1;}
.leaveText span {text-decoration: underline;}
</style>
