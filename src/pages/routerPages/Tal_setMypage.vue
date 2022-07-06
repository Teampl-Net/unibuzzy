<template>
    <div style="padding-bottom: 60px; overflow: hidden scroll; height: 100%;">
    <!-- <pushPop :detailVal='dummy' @closePushPop="closePushPop" /> -->
      <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
      <logoutPop v-if="logOutShowYn" @closePop="closeLogoutPop"/>
      <policyPop v-if="this.showPolicyPopYn" :policyType="this.policyType" @closePolicyPop="closePolicyPop" />
      <settingAlim v-if="settingAlimPopYn"   @closePolicyPop="settingAlimPopYn = false" />

      <div class="" >
        <div class="profileWrap ">
          <div class="roundDiv imgSize">
            <img src="../../assets/images/main/main_profile.png" style="width: 100px;"/>

          </div>
          <span class="font20 fontBold" style="width:100%; float:left; transform: translate(10px);" v-show="!changeYn" >
            {{this.$makeMtextMap(this.userInfo.userDispMtext, 'KO')}}
            <img src="../../assets/images/push/noticebox_edit.png" style="width: 20px;" class="r" @click="changeUserDispMtext()" >
          </span>

          <div class="fl" style=" width:100%; position: relative;" v-show="changeYn">
            <div class="" style="position: absolute; left:50%; transform: translate(-50%); width:80%; max-width:250px; min-width:50px;">
              <input class="fl" type="text" v-model="tempUserDispName" style="width:calc(100% - 75px);"/>
              <div class="fl" style="width:75px">
                <p class="fl mleft-1" style="line-height:30px" @click="setDispName" >확인</p>
                <p class="fl mleft-1" style="line-height:30px" @click="changeYn = false">취소</p>
              </div>

            </div>



          </div>

        </div>
        <div class="" style="text-align: left; ">
          <userItem class="w-100P mbottom-1" uItem="이메일" style="border-bottom: 0.5px solid #E4E4E4; " @openPop="openPop" />
          <userItem class="w-100P" @openPop="openPop" uItem="휴대폰 번호" />
        </div>
        <div class="grayLine"></div>
      </div>
      <div class="subPaddingWrap">
        <table>
          <tr @click="settingAlimPopYn = true"><th colspan="2">알림 설정</th></tr>
          <!-- <tr><th>가입일</th><td class="textRight">{{this.$dayjs(userInfo.creDate).format('YYYY-MM-DD')}}</td></tr> -->
          <tr><th>가입일</th><td class="textRight">{{this.$changeDateFormat(userInfo.creDate)}}</td></tr>
          <!-- <tr><th>가입일</th><td class="textRight">{{this.$changeDateFormat('2021-06-22 14:22')}}</td></tr> -->
          <tr @click="openPolicyPop('personalInfo')"><th colspan="2">개인정보 처리방침</th></tr>
          <tr @click="openPolicyPop('useTheAlim')"><th colspan="2">이용약관</th></tr>
          <tr>
            <th>
              버전정보
              <p class="font10">최신버전: 1.0</p>
            </th>
            <td class="textRight">{{appVersion}}</td></tr>
            <!-- <tr @click="this.myChanListPopYn = true">
              <th>
                내 채널 -->
                <!-- <a href="http://adm.pushmsg.net/">내 채널</a> -->
              <!-- </th>
              <td class="textRight"></td>
            </tr> -->

        </table>
        <div v-on:click="openLogoutPop" style="background-color: #F5F5F9; width: 100%; color:#6768A7; font-weight: bold; height: 45px; margin-bottom: 2rem;border-radius: 5px; padding: 0.6rem;">
          더알림 로그아웃
        </div>
        <p class="leaveText">더알림을 탈퇴하려면 <span v-on:click="openPop('leaveTheAlim')">여기</span>를 눌러주세요.</p>
      </div>
    </div>

</template>

<script>
import userItem from '../../components/unit/Tal_userItem.vue'
import logoutPop from '../../components/pageComponents/myPage/Tal_logoutPop.vue'
import policyPop from '../../components/pageComponents/myPage/Tal_policyPop.vue'
import settingAlim from '../../components/pageComponents/myPage/Tal_SettingAlimDetail.vue'
/* import pushPop from '../../components/popup/Tal_pushDetailPopup.vue' */

export default {
  name: 'myPage',
  components: {
    userItem,
    logoutPop,
    policyPop,
    settingAlim
  },
  data () {
    return {
      pageHistoryName: '',
      userInfo: {},
      headerTitle: '마이페이지',
      myChanListPopYn: false,
      userEmail: { click: 'changeEmail', icon: '/resource/common/main_email.png', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '변경', link: 'http://naver.com' },
      userPhone: { click: 'changeMobile', icon: '/resource/common/main_phone.png', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '변경', link: 'http://naver.com' },
      appVersion: '1.0.1',
      logOutShowYn: false,
      showPolicyPopYn: false,
      policyType: 'useTheAlim',
      settingAlimPopYn: false,
      tempUserDispName: '',
      changeYn: false
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
    async setDispName () {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      param.user = this.userInfo
      param.user.userDispMtext = 'KO$^$' + this.tempUserDispName
      param.updateYn = true
      console.log(param)

      var result = await this.$changeDispName(param)
      console.log(result)

      if (result.data === 'OK') {
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        this.$router.push('/')
        this.changeYn = false
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
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
      if (this.userInfo.phoneLast); else this.userInfo.phoneLast = '등록된 번호가 없습니다.'
      if (this.userInfo.userDispMtext); else {
        if (this.userInfo.userNameMtext) { this.userInfo.userDispMtext = this.userInfo.userNameMtext } else { this.userInfo.phoneLast = '등록된 이름이 없습니다.' }
      }
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
.imgSize{ width: 6rem; height: 6rem; border-radius: 6rem; margin-bottom: 0.5rem;}
.grayLine{background-color: #F3F3F3; height: 0.8rem; width: 100%;}
.roundDiv{box-sizing: border-box; overflow: hidden;}
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

.subPaddingWrap{padding: 0.7rem 0 ; box-sizing: border-box; width: 100%; }
.leaveText{text-align: left; color: #A1A1A1;}
.leaveText span {text-decoration: underline;}
</style>
