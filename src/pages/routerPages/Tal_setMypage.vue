<template>
    <div style="padding-bottom: 60px">
      <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
      <logoutPop v-if="logOutShowYn" @closePop="closeLogoutPop"/>
      <policyPop v-if="this.showPolicyPopYn" :policyType="this.policyType" @closePolicyPop="closePolicyPop" />
      <div class="" >
        <div class="profileWrap ">
          <div class="roundDiv imgSize">
            <img src="../../assets/images/main/main_profile.png" style="width: 100px;"/>
          </div>
          <span class="font20 fontBold" >{{this.$makeMtextMap(getUserInform.userDispMtext, 'KO')}}</span>
        </div>
        <div class="" style="text-align: left; ">
          <userItem class="w-100P mbottom-1" uItem="이메일" style="border-bottom: 0.5px solid #E4E4E4; " @openPop="openPop" />
          <userItem class="w-100P" @openPop="openPop" uItem="휴대폰 번호" />
        </div>
        <div class="grayLine"></div>
      </div>
      <div class="subPaddingWrap">
        <table>
          <tr><th>가입일</th><td class="textRight">{{this.$dayjs(getUserInform.creDate).format('YYYY-MM-DD')}}</td></tr>
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
      </div>
      <div class="subPaddingWrap">
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
import policyPop from '../../components/pageComponents/myPage/Tal_policyPop'
export default {
  name: 'myPage',
  components: {
    userItem,
    logoutPop,
    policyPop
  },
  data () {
    return {
      pageHistoryName: '',
      headerTitle: '마이페이지',
      myChanListPopYn: false,
      userEmail: { click: 'changeEmail', icon: '/resource/common/main_email.png', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '변경', link: 'http://naver.com' },
      userPhone: { click: 'changeMobile', icon: '/resource/common/main_phone.png', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '변경', link: 'http://naver.com' },
      appVersion: '1.0.1',
      logOutShowYn: false,
      showPolicyPopYn: false,
      policyType: 'useTheAlim'
    }
  },
  created () {
    localStorage.setItem('notiReloadPage', 'none')
    document.addEventListener('message', e => this.BackPopClose(e))
    window.addEventListener('message', e => this.BackPopClose(e))
    var history = localStorage.getItem('popHistoryStack').split('$#$')
    this.pageHistoryName = 'page' + (history.length - 1)
    this.$emit('changePageHeader', '설정')
  },
  computed: {
  },
  mounted () {
    this.$emit('closeLoading')
  },
  methods: {
    BackPopClose (e) {
      if (JSON.parse(e.data).type === 'goback') {
        if (localStorage.getItem('pageDeleteYn') === true || localStorage.getItem('pageDeleteYn') === 'true') {
          alert(localStorage.getItem('curentPage') + this.pageHistoryName)
          if (localStorage.getItem('curentPage') === this.pageHistoryName) {
            this.$removeHistoryStackForPage(this.pageHistoryName)
          }
        }
      }
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
      var userInfo = await this.$getUserInform()
      if (userInfo.userEmail); else userInfo.userEmail = '등록된 이메일이 없습니다.'
      if (userInfo.phoneLast); else userInfo.phoneLast = '등록된 번호가 없습니다.'
      if (userInfo.userDispMtext); else {
        if (userInfo.userNameMtext) { userInfo.userDispMtext = userInfo.userNameMtext } else { userInfo.phoneLast = '등록된 이름이 없습니다.' }
      }
      return userInfo
    },
    openManagerChanDetail (param) {
      this.$emit('openPop', param)
    }
  }
}
</script>

<style scoped>
.profileWrap{display: flex; flex-direction: column;justify-content: center; align-items: center; width: 100%; height: 200px }
.imgSize{ width: 6rem; height: 6rem; border-radius: 6rem; margin-bottom: 0.5rem;}
.grayLine{background-color: #F3F3F3; height: 0.8rem; width: 100%;}
.roundDiv{box-sizing: border-box; overflow: hidden;}
table{text-align: left; width: 100%;}
tr, td, th {
  height: 4rem;
  margin-bottom: 1rem
}
tr{border-bottom: 1px solid #F3F3F3}
th {color: #6768A7}

.subPaddingWrap{padding: 0.7rem 0 ; box-sizing: border-box; width: 100%; height: 100%;}
.leaveText{text-align: left; color: #A1A1A1;}
.leaveText span {text-decoration: underline;}
</style>
