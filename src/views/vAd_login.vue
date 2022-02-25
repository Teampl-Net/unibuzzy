<template>
  <div style="width: 100vw; height: 100vh; background-color: #6768A7; box-sizing: border-box; display: flex; justify-content: center; align-items: center;">
    <div style="box-sizing: border-box;">
      <div style="width: 100%; height: 8rem; padding-left: 4rem;">
        <img class="fl" src="../resource/images/login_Wlogo.png" alt="">
        <p style="margin-left: 2rem; line-height: 5rem; float: left; color: #FFFFFF; font-size: 40px; font-weight: bold;">더알림 관리자 로그인</p>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #FFFFFF; width: 670px; height: 437px; border-radius: 15px; box-sizing: border-box; padding: 4rem 5rem;">
        <div style="height: 8rem;">
          <img class="fl" src="../resource/images/login_Clogo.png" alt="">
          <p style="margin-left: 1rem; line-height: 3rem; float: left; color: #6768A7; font-size: 25px; font-weight: bold;">더알림에서 인증번호 받기</p>
        </div>
        <div style="position: relative;">
          <p class="commonPstyle">+82 대한민국</p>
          <input type="text" maxlength="11" placeholder="-를 제외하고 입력해주세요." oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '')" style="font-size: 15px; width: 450px; height: 49px; border-radius: 5px; border: 1px solid #BFBFDA; padding: 0.3rem 1rem; padding-right: 8rem; box-sizing: border-box;">
          <gButton :btnName="this.reqNumBtnName" @btnEvent = 'requestNum' style="position: absolute; right: 1rem; top: 3.1rem;"/>
          <p class="commonPstyle">인증번호 요청 후, 더알림 앱에서 인증번호를 확인하세요.</p>
          <input type="text" maxlength="6" placeholder="인증번호를 입력해주세요." oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '')" style="font-size: 15px; width: 450px; height: 49px; border-radius: 5px; border: 1px solid #BFBFDA; padding: 0.3rem 1rem; padding-right: 8rem; box-sizing: border-box;">
          <span style="position: absolute; right: 1rem; top: 9.5rem; font-size: 15px; color: #6768A7;">4:22</span>
        </div>
        <gButton style="margin-top: 1rem;" :btnName="this.loginBtnName" @btnEvent = 'requestLogin'/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      reqNumBtnName: '인증번호 요청',
      loginBtnName: '로그인 하기'
    }
  },
  components: {
  },
  methods: {
    requestNum () {
      alert(true)
    },
    requestLogin () {
      alert('login')
      this.$router.push({ name: 'main' })
    }
  }
}
</script>

<style scoped>
.commonPstyle{color: #6768A7; font-size: 15px; font-weight: bold; margin: 0.8rem 0;}
</style>
