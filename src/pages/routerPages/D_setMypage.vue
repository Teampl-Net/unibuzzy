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
    "PROF_TITLE_LATE_VERSION": "최신버전"
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
    "PROF_TITLE_LATE_VERSION": "Latest"
  }
}
</i18n>
<template>
  <div style="padding-bottom: 30px; overflow: hidden scroll; height: 100%;">
    <logoutPop v-if="logOutShowYn" @closePop="closeLogoutPop"/>
    <policyPop v-if="this.showPolicyPopYn" :policyType="this.policyType" @closePolicyPop="closePolicyPop" />
    <settingAlim v-if="settingAlimPopYn"   @closePolicyPop="settingAlimPopYn = false" />
    <userImgSelectCompo @closeXPop="this.$emit('closeXPop')" :pSelectedIconPath="this.GE_USER.domainPath + this.GE_USER.userProfileImg" :parentSelectedIconFileKey="this.GE_USER.picMfilekey"  @no="backClick" v-if="changeUserIconShowYn"/>
    <div class="" >
      <div class="profileWrap ">
        <div @click="changeUserImg()" class="cursorP imgSize">
          <div class="roundDiv picImgWrap" :style="'background-image: url('+ (GE_USER.domainPath ? GE_USER.domainPath + this.$changeUrlBackslash(GE_USER.userProfileImg) : GE_USER.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
          <div @click="changeUserImg()" class="font14" style="padding: 0 8px; float: left; position: absolute; bottom: 10px; right: -10px; z-index: 9; min-height: 20px; border-radius: 5px; background: #00000070; color: #FFF;">{{ $t('COMM_BTN_EDIT2') }}</div>
        </div>
        <div class="font20 fontBold mtop-1" style="width:100%; display: flex; justify-content: center; float:left; transform: translate(10px);" v-show="!changeYn" >
          <span class="fl">{{this.$changeText(this.GE_USER.userDispMtext)}}</span>
          <img src="../../assets/images/push/noticebox_edit.png" style="width: 20px; height: 20px; margin-left: 10px; margin-top: 2px;" class="fr cursorP" @click="changeUserDispMtext()" >
        </div>

        <div class="fl" style=" width:100%; position: relative;" v-show="changeYn">
          <div class="" style="position: absolute; left:50%; transform: translate(-50%); width:80%; max-width:250px; min-width:50px; margin-top: 10px;">
            <input class="fl font16" type="text" v-model="tempUserDispName" style="width:calc(100% - 100px); outline: none; border: 1px solid #ccc;" @keyup.enter="setDispName" />
            <div class="fl" style="width: 100px">
              <p class="fl mleft-1 font13" style="line-height:30px" @click="setDispName" >{{ $t('COMMON_BTN_OK') }}</p>
              <p class="fl mleft-1 font13" style="line-height:30px" @click="changeYn = false">{{ $t('COMMON_BTN_CANCEL') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="" style="text-align: left; ">
        <userItem class="w-100P font16 mbottom-1" uItem="이메일" style="border-bottom: 0.5px solid #E4E4E4; " @openPop="openPop('changeEmail', $t('PROF_BTN_EDIT_EMAIL'))" />
        <userItem @click="goDevMode" class="w-100P font16" @openPop="openPop" uItem="휴대폰 번호" />
      </div>
      <div class="grayLine"></div>
    </div>
    <div class="subPaddingWrap">
      <table>
        <!-- <tr @click="settingAlimPopYn = true"><th colspan="2">알림 설정</th></tr> -->
        <tr><th>{{ $t('PROF_TITLE_DOWNLOAD') }}</th><td class="textRight">{{this.$dayjs(GE_USER.creDate).format('YYYY/MM/DD')}}</td></tr>
        <!-- <tr><th class="font16">가입일</th><td class="textRight font16">{{this.$changeDateFormat(GE_USER.creDate, true)}}</td></tr> -->
        <tr @click="openPolicyPop('personalInfo')"><th class="font16" colspan="2">{{ $t('PROF_BTN_POLICY') }}</th></tr>
        <tr @click="openPolicyPop('useTheAlim')"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_TERMS') }}</th></tr>
        <tr @click="checkAppVersion" v-if="isMobile">
          <th class="font16">
            {{ $t('PROF_TITLE_VERSION') }}
            <p class="font10">{{ $t('PROF_TITLE_LATE_VERSION') }}: {{lastVersion}}</p>
          </th>
          <td class="textRight font16">{{appVersion}}</td></tr>
          <tr @click="cleanApp"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_CASH') }}</th></tr>
          <tr v-if="isMobile && this.systemName === 'android' || this.systemName === 'Android'" @click="reloadApp"><th class="font16 cursorP" colspan="2">{{ $t('PROF_BTN_CASH') }}</th></tr>
          <!-- <tr @click="this.myChanListPopYn = true">
            <th>
              내 채널 -->
              <!-- <a href="http://adm.pushmsg.net/">내 채널</a> -->
            <!-- </th>
            <td class="textRight"></td>
          </tr> -->

      </table>
      <div v-on:click="openLogoutPop" class="font14 cursorP" style="background-color: #F5F5F9; width: 100%; color:#6768A7; font-weight: bold; height: 45px; margin-bottom: 2rem;border-radius: 5px; padding: 0.6rem;">
        {{ $t('PROF_BTN_LOGOUT') }}
      </div>
      <p v-if="GE_LOCALE === 'ko'" class="leaveText font14">더알림을 탈퇴하려면 <span class="cursorP" v-on:click="openPop('leaveTheAlim', '탈퇴')">여기</span>를 눌러주세요.</p>
      <p v-else class="leaveText font14">Click <span class="cursorP" v-on:click="openPop('leaveTheAlim', '탈퇴')">here</span> to delete your account from uniBuzzy.</p>
    </div>

    <gConfirmPop :confirmText='checkVersionText' class="" confirmType='two' @ok="goPlayStore" @no='checkVersionPopShowYn = false' v-if="checkVersionPopShowYn"/>
    <gConfirmPop :confirmText='reloadShowText' class="" confirmType='two' @ok="reloadOk" @no='reloadShowYn = false' v-if="reloadShowYn"/>
    <gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
    <DevNotiSettingPop :id="devPopId" v-if="devModePopShowYn" @closeXPop="backClick" />
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
import { onMessage } from '../../assets/js/webviewInterface'
import DevNotiSettingPop from './D_DevNotiSettingPop.vue'
export default {
  name: 'myPage',
  components: {
    userItem,
    logoutPop,
    policyPop,
    settingAlim,
    userImgSelectCompo,
    DevNotiSettingPop
  },
  data () {
    return {
      pageHistoryName: '',
      changeUserIconShowYn:false,
      myChanListPopYn: false,
      userEmail: { click: 'changeEmail', icon: '/resource/common/main_email.png', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '변경', link: 'http://naver.com' },
      userPhone: { click: 'changeMobile', icon: '/resource/common/main_phone.png', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '변경', link: 'http://naver.com' },
      appVersion: 0,
      logOutShowYn: false,
      showPolicyPopYn: false,
      policyType: 'useTheAlim',
      settingAlimPopYn: false,
      tempUserDispName: '',
      changeYn: false,
      errorBoxYn:false,
      errorBoxText : '관리자에게 문의하세요.',
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
    this.$emit('changePageHeader', '설정')
    // .stringify(localStorage.getItem('appInfo')))
    if (this.isMobile) {
        this.appInfo = JSON.parse(localStorage.getItem('appInfo'))
        console.log(this.appInfo)
        console.log('this.appInfo')
        if (this.appInfo) {
            this.appVersion = this.appInfo.current
            this.lastVersion = this.appInfo.last
        }
    }
    if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }

    /* var history = localStorage.getItem('popHistoryStack').split('$#$')
    this.pageHistoryName = 'page' + (history.length - 1) */
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
       return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  mounted () {
    this.$emit('closeLoading')
  },
  methods: {
    openDevPop () {
        var history = this.$store.getters['D_HISTORY/hStack']
        this.devPopId = 'devModPop' + history.length
        // console.log(history)
        history.push(this.devPopId)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.devModePopShowYn = true
    },
    closeDevPop () {
        var hStack = this.$store.getters['D_HISTORY/hStack']
        var removePage = hStack[hStack.length - 1]
        if (this.popId === hStack[hStack.length - 1]) {
            hStack = hStack.filter((element, index) => index < hStack.length - 1)
            this.$store.commit('D_HISTORY/setRemovePage', removePage)
            this.$store.commit('D_HISTORY/updateStack', hStack)
            this.$emit('closePop')
        } else {

        }
    },
    goDevMode () {
        if (this.devModeClickCnt === 0) {
            this.setTimer(true)
        }
        this.devModeClickCnt += 1
        console.log(this.devModeClickCnt)
        if (this.devModeClickCnt > 4) {
            this.openDevPop()
            this.setTimer(false)
        }
        var this_ = this

    },
    devSendPush () {
        // 1. 알림을 수신할래? 클릭할래?
        // 2. 어떤 컨텐츠를 수신할래? 없으면 가장최신
        // 3. 몇초뒤에 수신할래?

    },
    setTimer (startYn) {
        var intervalId = null
        if (startYn) {
            var this_ = this
            intervalId = setInterval(() => this_.devModeClickTimer += 1, 1000);
        } else {
            if (intervalId) {
                clearInterval(intervalId)
            }
            this.devModeClickTimer = 0
            this.devModeClickCnt = 0
            console.log(this.devModeClickCnt)
        }
        setTimeout(() => {
            if (intervalId) {
                clearInterval(intervalId)
            }
            this.devModeClickTimer = 0
            this.devModeClickCnt = 0
            console.log(this.devModeClickCnt)
      }, 2000);
    },
    checkAppVersion () {
        if (this.systemName === 'android' || this.systemName === 'Android') {
            if (this.appInfo.current !== this.appInfo.last) {
            this.checkVersionText = '앱 버전 업데이트가 필요합니다. <br>플레이스토어로 이동할까요?'
            this.checkVersionPopShowYn = true
            // window.open(appInfo.playStoreUrl, '_blank')
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
        /* onMessage('closeApp', 'requestUserPermission').then(res => {
        aTag.click()
      }) */
        }
      }
            // document.body.removeChild(aTag)
    },
    reloadApp () {
        this.reloadShowText ='앱을 재시작하시겠습니까?'
        this.reloadShowYn = true
    },
    reloadOk () {
        onMessage('REQ', 'reloadApp')
    },
    cleanApp () {
        this.$store.commit('D_CHANNEL/MU_CLEAN_CHAN_LIST')
        this.$router.push('/')
        this.$emit('closeXPop')
    },
    changeUserImg () {
      if(this.changeUserIconShowYn) {
        ;
      } else {
        this.changeUserIconShowYn = true
        var history = this.$store.getters['D_HISTORY/hStack']
        this.changeUserIconPop = 'changeUserIconPop' + history.length
        // console.log(history)
        history.push(this.changeUserIconPop)
        this.$store.commit('D_HISTORY/updateStack', history)
        // console.log(this.$store.getters['D_HISTORY/hStack'])
      }
    },
    async setDispName () {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      // param.user = this.GE_USER
      user.userKey = this.GE_USER.userKey
      user.userNameMtext = this.GE_USER.userNameMtext
      user.userDispMtext = 'KO$^$' + this.tempUserDispName
      param.user = user
      param.updateYn = true
      param.firstYn = true
      // console.log(param)

      var result = await this.$changeDispName(param)
      console.log(result)
      // console.log(result)
      if (result.data) {
        this.changeYn = false
        this.$store.commit('D_USER/MU_USER', result.data.userInfo)
        this.$router.push('/')
        this.$emit('closeXPop')
        // this.GE_USER.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {
        this.errorBoxText = '이름 변경 중 서버에 오류'
        this.errorBoxYn = true
      }
    },
    changeUserDispMtext () {
      this.changeYn = true
      this.tempUserDispName = this.$changeText(this.GE_USER.userDispMtext)
    },
    openPop (target, title) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
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
    openPolicyPop (type) {
      this.policyType = type
      this.showPolicyPopYn = true
    },
    closePolicyPop () {
      this.showPolicyPopYn = false
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.changeUserIconPop === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.changeUserIconShowYn = false
      } else if (this.devPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.devModePopShowYn = false
      } else {

      }
    },
    callPhone (num) {
            if (num != undefined && num != null && num != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='tel:' + num
                else
                    onMessage('REQ', 'callphone', num)
            } else {
              this.errorBoxText = '전화번호 정보가 없습니다'
              this.errorBoxYn = true
            }
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
/* .picImgWrap {position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem;
}
.picImgWrap img {width: 100%; position: absolute; top: 0; left: 0;} */
</style>
