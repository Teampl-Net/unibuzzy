<i18n>
{
  "ko": {
    "PROF_TITLE_DOWNLOAD": "가입일",
    "PROF_BTN_POLICY": "개인정보 처리방침",
    "PROF_BTN_TERMS": "이용약관",
    "PROF_BTN_CASH": "캐시정보 삭제",
    "PROF_TITLE_VERSION": "버전정보",
    "PROF_BTN_LOGOUT": "더알림 로그아웃",
    "PROF_BTN_DELETE": "더알림을 탈퇴하려면 여기를 눌러주세요",
    "PROF_BTN_EDIT_EMAIL": "이메일 변경",
    "PROF_TITLE_LATE_VERSION": "최신버전",
    "PROF_MSG_RESTART": "앱을 재시작하시겠습니까?",
    "PROF_MSG_NAME_ERROR": "이름 변경 중 서버에 오류",
    "PROF_MSG_NO_PHONE": "전화번호가 없습니다.",
    "PROF_TITLE_LANGUAGE": "언어",
    "PROF_TITLE_TIME": "시간"
  },
  "en": {
    "PROF_TITLE_DOWNLOAD": "Downloaded",
    "PROF_BTN_POLICY": "Privacy Policy",
    "PROF_BTN_TERMS": "Terms of Use",
    "PROF_BTN_CASH": "Delete cash",
    "PROF_TITLE_VERSION": "Version",
    "PROF_BTN_LOGOUT": "Logout uniBuzzy",
    "PROF_BTN_DELETE": "Click here to delete your account from uniBuzzy",
    "PROF_BTN_EDIT_EMAIL": "Edit Email",
    "PROF_TITLE_LATE_VERSION": "Latest",
    "PROF_MSG_RESTART": "Do you want to restart the app?",
    "PROF_MSG_NAME_ERROR": "Error on server while changing name change",
    "PROF_MSG_NO_PHONE": "There is no phone number.",
    "PROF_TITLE_LANGUAGE": "Language",
    "ROPF_TITLE_TIME": "Time zone"
  }
}
</i18n>
<template>
  <gPopHeader :headerTitle="`Settings`" @closeXPop="closeXPop"/>
  <div class="setMyPageWrap">
    <logoutPop v-if="logOutShowYn" @goLogout="goLogout" @closePop="closeOnlyLogoutPop"/>
    <userImgSelectCompo @closeXPop="closeImgPop" :pSelectedIconPath="GE_USER.domainPath + GE_USER.userProfileImg" :parentSelectedIconFileKey="GE_USER.picMfilekey"  @noChange="backClick" v-if="changeUserIconShowYn"/>
    <div>
       <div class="languageArea" :style="'padding-top:' + ($STATUS_HEIGHT + 5)+ 'px;'">
         <p class="font12 fl mright-05">{{ $t('PROF_TITLE_LANGUAGE') }}</p>
        <select class="fl mRight10 font12" @change="change18n('userLang', selectedI18nLocale)" v-model="selectedI18nLocale" name="selectLang" id="selectLang"><option value="en">English</option><option value="ko">한국어</option></select>
        <p class="font12 fl mright-05">{{ $t('ROPF_TITLE_TIME') }}</p>
        <select class="fl mRight10 font12" @change="change18n('areaKey', GE_TIME_LOCALE)" v-model="selectedLocale" name="selectLocale" id="selectLocale"><option value="US">United States</option><option value="KR">South Korea</option></select>
       </div>
       <div class="profileWrap ">
        <div @click="changeUserImg()" class="cursorP imgSize">
          <div class="roundDiv profilePicImgWrap" :style="'background-image: url('+ (GE_USER.domainPath ? GE_USER.domainPath + $changeUrlBackslash(GE_USER.userProfileImg) : GE_USER.userProfileImg) +');'"></div>
          <div @click="changeUserImg()" class="font14 changeImgBtn">{{ $t('COMM_BTN_EDIT') }}</div>
        </div>
        <div class="font20 fontBold mtop-1 userNameBox" v-show="!changeYn" >
          <span class="fl textOverdot">{{$changeText(GE_USER.userDispMtext)}}</span>
          <img src="@/assets/images/contents/noticebox_edit.png" class="fr cursorP" @click="changeUserDispMtext()" >
        </div>

        <div class="fl nameChangeWrap" v-show="changeYn">
          <div class="nameChangeBox">
            <input class="fl font16" type="text" v-model="tempUserDispName" @keyup.enter="setDispName" />
            <div class="fl w100P">
              <p class="fl mleft-1 font13 lineHeight30" @click="setDispName" >{{ $t('COMMON_BTN_OK') }}</p>
              <p class="fl mleft-1 font13 lineHeight30" @click="changeYn = false">{{ $t('COMM_BTN_CANCEL') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="textLeft">
        <userItem class="w-100P font16 mbottom-1 border05" uItem="이메일" @openPop="openPop('changeEmail', $t('PROF_BTN_EDIT_EMAIL'))" />
        <userItem @click="goDevMode" class="w-100P font16" @openPop="openPop" uItem="휴대폰 번호" />
      </div>
      <div class="grayLine"></div>
    </div>
    <div class="subPaddingWrap">
      <table>
        <tr><th>{{ $t('PROF_TITLE_DOWNLOAD') }}</th><td class="textRight">{{$dayjs(GE_USER.creDate).format('YYYY/MM/DD')}}</td></tr>
        <tr @click="openPolicyPop('privacy')"><th class="font16" colspan="2">{{ $t('PROF_BTN_POLICY') }}</th></tr>
        <tr @click="openPolicyPop('termsOfUse')"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_TERMS') }}</th></tr>
        <tr @click="checkAppVersion" v-if="isMobile">
          <th class="font16">
            {{ $t('PROF_TITLE_VERSION') }}
            <p class="font10">{{ $t('PROF_TITLE_LATE_VERSION') }}: {{lastVersion}}</p>
          </th>
          <td class="textRight font16">{{appVersion}}</td></tr>
          <tr v-if="isMobile && systemName === 'android' || systemName === 'Android'" @click="reloadApp"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_CASH') }}</th></tr>
          <tr v-else @click="cleanApp"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_CASH') }}</th></tr>
      </table>
      <div v-on:click="openLogoutPop" class="font14 cursorP logoutBtn">
        {{ $t('PROF_BTN_LOGOUT') }}
      </div>
      <p v-if="GE_LOCALE === 'ko'" class="leaveText font14">더알림을 탈퇴하려면 <span class="cursorP" v-on:click="openPop('leaveTheAlim', '탈퇴')">여기</span>를 눌러주세요.</p>
      <p v-else class="leaveText font14 pBottom-20 mBottom20">Click <span class="cursorP" v-on:click="goLeaveUnibuzzy">here</span> to delete your account from uniBuzzy.</p>
    </div>

    <gConfirmPop :confirmText='checkVersionText' class="" confirmType='two' @ok="goPlayStore" @no='checkVersionPopShowYn = false' v-if="checkVersionPopShowYn"/>
    <gConfirmPop :confirmText='reloadShowText' class="" confirmType='two' @ok="reloadOk" @no='reloadShowYn = false' v-if="reloadShowYn"/>
    <gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
  </div>
</template>

<script>
import userItem from '@/components/unit/UB_userItem.vue'
import logoutPop from '@/components/popup/LogoutPop.vue'
import userImgSelectCompo from '@/components/pageComponents/myPage/UB_changeUserIcon.vue'
import { onMessage } from '@/assets/js/webviewInterface'
import { getCurrentInstance } from 'vue'
import i18n from '../../../assets/i18n'
export default {
  name: 'myPage',
  components: {
    userItem,
    logoutPop,
    userImgSelectCompo
  },
  data () {
    return {
      selectedI18nLocale: i18n.global.locale,
      selectedLocale: this.$locale,
      changeUserIconShowYn: false,
      userEmail: { click: 'changeEmail', icon: '/resource/common/main_email.png', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '변경', link: 'http://naver.com' },
      userPhone: { click: 'changeMobile', icon: '/resource/common/main_phone.png', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '변경', link: 'http://naver.com' },
      appVersion: 0,
      logOutShowYn: false,
      showPolicyPopYn: false,
      tempUserDispName: '',
      changeYn: false,
      errorBoxYn: false,
      errorBoxText: '관리자에게 문의하세요.',
      changeUserIconPop: null,
      reloadShowText: '',
      reloadShowYn: false,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      appInfo: null,
      lastVersion: 0,
      checkVersionPopShowYn: false,
      checkVersionText: '',
      systemName: 'iOS',
      devModeClickCnt: 0,
      devModeClickTimer: 0,
      devModePopShowYn: false,
      devPopId: null
    }
  },
  created () {
    localStorage.setItem('notiReloadPage', 'none')
    if (this.isMobile) {
      this.appInfo = JSON.parse(localStorage.getItem('appInfo'))
      if (this.appInfo) {
        this.appVersion = this.appInfo.current
        this.lastVersion = this.appInfo.last
      }
    }
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
  },
  computed: {
    GE_TIME_LOCALE () {
      if (this.selectedLocale === 'US') {
        return 2
      } else if (this.selectedLocale === 'KR') {
        return 1
      } else {
        return 2
      }
    },
    GE_LOCALE () {
      return this.$i18n.locale
    },
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  mounted () {
    this.$emit('closeLoading')
    this.$addHistoryStack('setMyPage')
  },
  setup () {
    const instance = getCurrentInstance()
    const setGlobalValue = function (val) {
      if (instance) {
        instance.appContext.config.globalProperties.$locale = val
      }
    }
    return { setGlobalValue }
  },
  methods: {
    async goLogout (request) {
      this.logOutShowYn = false

      this.$UBLogOut()
    },
    async change18n (target, type) {
      var param = {}
      var user = {}
      var localUser = this.$store.getters['UB_USER/GE_USER']
      if (localUser.userEmail !== undefined && localUser.userEmail !== null && localUser.userEmail !== '') { user.soEmail = localUser.userEmail }
      if (localUser.userKey !== undefined && localUser.userKey !== null && localUser.userKey !== '') { user.userKey = localUser.userKey }
      if (localUser.soAccessToken !== undefined && localUser.soAccessToken !== null && localUser.soAccessToken !== '') { user.soAccessToken = localUser.soAccessToken }
      if (localUser.fcmKey !== undefined && localUser.fcmKey !== null && localUser.fcmKey !== '') { user.fcmKey = localUser.fcmKey }
      if (localUser.deviceKey !== undefined && localUser.deviceKey !== null && localUser.deviceKey !== '') { user.deviceKey = localUser.deviceKey }
      user[target] = type
      param.user = user

      var result = null
      var response = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveUser',
        param: param
      })
      result = response
      if (result.data.userMap) {
        user = result.data.userMap
        try {
          localStorage.setItem('user', JSON.stringify(result.data.userMap))
          await this.$store.dispatch('UB_USER/AC_USER', result.data.userMap)
          localStorage.setItem('sessionUser', JSON.stringify(result.data.userMap))

          // 다른 JS 파일에서 전역 변수 수정하기
          if (result.data.userMap.countryCode) {
            this.setGlobalValue(result.data.userMap.countryCode)
          }
          if (result.data.userMap.userLang) {
            i18n.global.locale = result.data.userMap.userLang
          }
        } catch (error) {
          console.log(error)
        }
      }
      return result
    },
    closeXPop () {
      this.$router.push('/mypage')
    },
    backClick () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      if (this.changeUserIconPop === removePage) {
        this.changeUserIconShowYn = false
      } else if (this.devPopId === removePage) {
        this.devModePopShowYn = false
      }
    },
    goLeaveUnibuzzy () {
      this.$router.push('/cancel')
    },
    openDevPop () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.devPopId = 'devModPop' + history.length
      history.push(this.devPopId)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.devModePopShowYn = true
    },
    closeDevPop () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        this.$emit('closePop')
      } else {

      }
    },
    goDevMode () {
      if (this.devModeClickCnt === 0) {
        this.setTimer(true)
      }
      this.devModeClickCnt += 1
      if (this.devModeClickCnt > 4) {
        this.openDevPop()
        this.setTimer(false)
      }
    },
    setTimer (startYn) {
      var intervalId = null
      if (startYn) {
        var this_ = this
        intervalId = setInterval(() => { this_.devModeClickTimer = this_.devModeClickTimer + 1 }, 1000)
      } else {
        if (intervalId) {
          clearInterval(intervalId)
        }
        this.devModeClickTimer = 0
        this.devModeClickCnt = 0
      }
      setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId)
        }
        this.devModeClickTimer = 0
        this.devModeClickCnt = 0
      }, 2000)
    },
    checkAppVersion () {
      if (this.systemName === 'android' || this.systemName === 'Android') {
        if (this.appInfo.current !== this.appInfo.last) {
          if (this.GE_LOCALE === 'ko') {
            this.checkVersionText = '앱 버전 업데이트가 필요합니다. <br>플레이스토어로 이동할까요?'
          } else {
            this.checkVersionText = 'An app version update is required. <br>Go to the Play Store?'
          }
          this.checkVersionPopShowYn = true
        }
      }
    },
    goPlayStore () {
      this.checkVersionPopShowYn = false
      if (
        localStorage.getItem('systemName') !== undefined &&
        localStorage.getItem('systemName') !== 'undefined' &&
        localStorage.getItem('systemName') !== null
      ) {
        var systemName = localStorage.getItem('systemName')
      }
      var appInfo = localStorage.getItem('appInfo')
      if (appInfo) {
        appInfo = JSON.parse(appInfo)
      }
      if (systemName === 'android' || systemName === 'Android') {
        if (appInfo.current !== appInfo.last) {
          window.open('https://play.google.com/store/apps/details?id=com.tal_project', '_blank')
        }
      }
    },
    reloadApp () {
      this.reloadShowText = this.$t('PROF_MSG_RESTART')
      this.reloadShowYn = true
    },
    reloadOk () {
      onMessage('REQ', 'reloadApp')
    },
    cleanApp () {
      this.$store.commit('UB_CHANNEL/MU_CLEAN_CHAN_LIST')
      this.$router.push('/')
      this.$emit('closeXPop')
    },
    changeUserImg () {
      if (this.changeUserIconShowYn) {
        ;
      } else {
        this.changeUserIconShowYn = true
        var history = this.$store.getters['UB_HISTORY/hStack']
        this.changeUserIconPop = 'changeUserIconPop' + history.length
        history.push(this.changeUserIconPop)
        this.$store.commit('UB_HISTORY/updateStack', history)
      }
    },
    closeImgPop () {
      this.changeUserIconShowYn = false
    },
    async setDispName () {
      var param = {}
      var user = {}
      user.userKey = this.GE_USER.userKey
      user.userNameMtext = this.GE_USER.userNameMtext
      user.userDispMtext = 'EN$^$' + this.tempUserDispName
      param.user = user
      param.updateYn = true
      param.firstYn = true

      var result = await this.$changeDispName(param)
      if (result.data) {
        this.changeYn = false
        this.$store.commit('UB_USER/MU_USER', result.data.userInfo)
        this.$emit('closeXPop')
      } else {
        this.errorBoxText = this.$t('PROF_MSG_NAME_ERROR')
        this.errorBoxYn = true
      }
    },
    changeUserDispMtext () {
      this.changeYn = true
      this.tempUserDispName = this.$changeText(this.GE_USER.userDispMtext)
    },
    openPop (target, title) {
      var params = {}
      params.targetType = target
      params.popHeaderText = title
      this.$emit('openPop', params)
    },
    openLogoutPop () {
      this.logOutShowYn = true
    },
    async closeLogoutPop (request) {
      this.logOutShowYn = false

      this.$d_AlimLogout()
    },
    async closeOnlyLogoutPop () {
      this.logOutShowYn = false
    },
    openPolicyPop (type) {
      this.$emit('changeRouterPath', type)
    },
    closePolicyPop () {
      this.showPolicyPopYn = false
    }
  }
}
</script>

<style scoped>
.setMyPageWrap {
  padding: 60px 10px 60px 10px;
  overflow: hidden scroll;
  height: 100%;
  width: 100%;
}
.languageArea {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}
.changeImgBtn {
  padding: 0 8px;
  float: left;
  position: absolute;
  bottom: 10px;
  right: -10px;
  z-index: 9;
  min-height: 20px;
  border-radius: 5px;
  background: #00000070;
  color: #FFF;
}
.userNameBox {
  width:100%;
  display: flex;
  justify-content: center;
  float: left;
  transform: translate(10px);
}
.userNameBox > img {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 2px;
}
.profilePicImgWrap {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.nameChangeBox {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 80%;
  max-width: 250px;
  min-width: 50px;
  margin-top: 10px;
}
.nameChangeBox > input {
  width: calc(100% - 100px);
  outline: none;
  border: 1px solid #ccc;
}
.nameChangeBox > div {
  width: 100px;
}
.nameChangeWrap {
  width: 100%;
  position: relative;
}
.border05 {
  border-bottom: 0.5px solid #E4E4E4;
}
.logoutBtn {
  background-color: #F5F5F9;
  width: 100%;
  color:#6768A7;
  font-weight: bold;
  height: 45px;
  margin-bottom: 0;
  border-radius: 5px;
  padding: 0.6rem;
}
.profileWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
}
.grayLine {
  background-color: #F3F3F3;
  height: 0.8rem;
  width: 100%;
}
.roundDiv {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 6rem;
  padding: 8px;
  border:2px solid #6768a7;
  background: #6768a745;
  padding-top: 16px;
  padding-bottom: 0;
  margin-bottom: 0.5rem;
  width: 6rem;
  height: 6rem;
}
table {
  text-align: left;
  width: 100%;
}
tr, td, th {
  height: 4rem;
  margin-bottom: 1rem

}
td {
  border-bottom: none !important
}
tr {
  border-bottom: 1px solid #F3F3F3;
  line-height:4rem;
}
th {
  color: #6768A7
}
.imgSize {
  width: 6rem;
  height: 6rem;
  position: relative;
}
.subPaddingWrap {
  padding: 0.7rem 0;
  box-sizing: border-box;
  width: 100%;
}
.leaveText {
  text-align: left;
  color: #A1A1A1;
}
.leaveText span {
  text-decoration: underline;
}
.userNameBox > span {
  max-width: calc(100% - 30px);
}
/* .picImgWrap {position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem;
}
.picImgWrap img {width: 100%; position: absolute; top: 0; left: 0;} */
</style>
