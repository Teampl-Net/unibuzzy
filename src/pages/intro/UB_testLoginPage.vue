<i18n>
{
  "ko": {
    "MSG_WELCOME": "환영합니다!",
    "PUT_ID_PW": "더알림서비스 아이디와 패스워드를 입력해주세요",
    "PUT_ID": "아이디 입력",
    "PUT_PW": "비밀번호 입력",
    "GO_BACK": "뒤로가기",
    "BTN_START": "시작하기",
    "ERR_PUT_ID" : "아이디를 입력해주세요",
    "ERR_PUT_PW" : "비밀번호를 입력해주세요",
    "ERR_USER_INFO" : "사용자 정보를 찾을 수 없습니다."
  },
  "en": {
    "MSG_WELCOME": "Welcome!",
    "PUT_ID_PW": "Please put uniBuzzy ID and PW.",
    "PUT_ID": "Type your ID",
    "PUT_PW": "Type your PW ",
    "BTN_START": "Get Started",
    "GO_BACK": "Go back",
    "ERR_PUT_ID" : "Please type your ID",
    "ERR_PUT_PW" : "Please type your PW",
    "ERR_USER_INFO" : "Cannot find user info."
  }
}
</i18n>
<template>
<!-- <pushDetail v-if='testYn' @closePushPop='testYn = false' /> -->
<div class="introBackground">
  <gConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
    <div class="introWhiteCard" style=" min-height: 450px;">
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="mbottom-1 mtop-1">
          <img class="mbottom-05" src="../../assets/images/intro/login/uniB_logo.png" style="width: 5rem" alt="" @click="testLogin">
          <p class="font20 mbottom-05 fontBold">{{ $t('MSG_WELCOME') }}</p>
        </div>
        <div class="mtop-05 introText" style="height: 40px;">
            <p>{{ $t('PUT_ID_PW') }}</p>
        </div>
       <!--  <div class="textLeft">]
          <select>
            <option>대한민국(+82)</option>
          </select>
        </div> -->
        <div class="inputWrap mtop-5">
          <input type="text" v-model="userId" :placeholder="$t('PUT_ID')" name="" id="" >
        </div>
        <div class="inputWrap mtop-1">
          <input type="password" @keyup.enter="saveUser" v-model="userPw" :placeholder="$t('PUT_PW')" name="" id="" >
        </div>
        <div class="startBigBtn" @click="saveUser"><p>{{ $t('BTN_START') }}</p></div>
        <div class="startBigBtn backBtn" @click="back" style="background: #F5F5F9; color: #6768A7"><p>{{ $t('GO_BACK') }}</p></div>
      <!--   <div class="inputWrap">
          <input type="number" placeholder="인증번호 입력" name="" id="" >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import pushDetail from '../../components/popup/Tal_pushDetailPopup.vue'
// import pushDetail from '../../components/Tal_pushDetail.vue'
// import { userLoginCheck } from '../../assets/js/Tal_axiosFunction'
export default {
  data () {
    return {
      userId: '',
      userPw: '',
      errorText: '',
      failPopYn: false,
      pushdata: {},
      testLoginCount: 0
      // testYn:true
    }
  },
  components: {
    // pushDetail
  },
  methods: {
    testLogin () {
      if (this.testLoginCount !== 7) {
        this.testLoginCount += 1
        return
      }
      this.testLoginCount = 0

      this.userId = 'teampl'
      this.userPw = 'teampl123'
      this.saveUser()
    },
    back () {
      this.$router.replace({ name: 'login' })
    },
    async saveUser () {
      var uId = this.userId
      var uPw = this.userPw
      if (uId === undefined || uId === null || uId === '') {
        this.errorText = this.$t('ERR_PUT_ID')
        this.failPopYn = true
        return
      } else if (uPw === undefined || uPw === null || uPw === '') {
        this.errorText = this.$t('ERR_PUT_PW')
        this.failPopYn = true
        return
      }
      if (uId === 'teampl' && uPw === 'teampl123') {
        localStorage.setItem('testYn', true)
        await this.$userLoginCheck(true)
      } else {
        this.errorText = this.$t('ERR_USER_INFO')
        this.failPopYn = true
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: #6768A7; font-size: 18px;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}

  .savePhoneHeader {margin-top: 14px; line-height: 27px}
  .savePhoneHeader p{ color: #6768A7; font-weight: bold;}
  .savePhoneHeader .headerFont{line-height: 32px}

  .startBigBtn{background-color: #6768A7; margin-top: 10px; color:#ffff; height: 40px; box-sizing: border-box; padding: 5px 10px; width: 100%; border-radius: 5px; text-align: center; }
  .startBigBtn p{color:#ffff; text-decoration: none; font-size: 15px; line-height: 28px;}
  .backBtn p {color: #6768A7;}
</style>
