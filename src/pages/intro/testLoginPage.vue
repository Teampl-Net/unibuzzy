<template>
<div class="introBackground">
    <div class="introWhiteCard" style=" min-height: 450px;">
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="mbottom-3 mtop-1">
          <img class="mbottom-05" src="../../assets/images/main/message_logo.png" style="width: 5rem" alt="">
          <p class="font20 mbottom-1 fontBold">환영합니다!</p>
        </div>
        <div class="mtop-1 introText">
            <p>더알림서비스 아이디와 패스워드를 입력해주세요</p>
        </div>
       <!--  <div class="textLeft">]
          <select>
            <option>대한민국(+82)</option>
          </select>
        </div> -->
        <div class="inputWrap mtop-1">
          <input type="text" v-model="userId" placeholder="아이디 입력" name="" id="" >
        </div>
        <div class="inputWrap mtop-1">
          <input type="password" v-model="userPw" placeholder="비밀번호 입력" name="" id="" >
        </div>
        <div class="startBigBtn" @click="saveUser"><p>시작하기</p></div>
      <!--   <div class="inputWrap">
          <input type="number" placeholder="인증번호 입력" name="" id="" >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { userLoginCheck } from '../../assets/js/Tal_axiosFunction'
export default {
  data () {
    return {
      userId: '',
      userPw: ''
    }
  },
  created () {
  },
  props: {
  },
  methods: {
    async saveUser () {
      var uId = this.userId
      var uPw = this.userPw
      if (uId === undefined || uId === null || uId === '') {
        alert('아이디를 입력해주세요')
        return
      } else if (uPw === undefined || uPw === null || uPw === '') {
        alert('비밀번호를 입력해주세요')
        return
      }
      if (uId === 'teampl' && uPw === 'teampl123') {
        localStorage.setItem('testYn', true)
        await this.$userLoginCheck()
      } else {
        alert('사용자 정보를 찾을 수 없습니다!')
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: #6768A7; font-size: 18px;}
.changeInfoWrap{height: 100vh; width: 100vw;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}

  .savePhoneHeader {margin-top: 14px; line-height: 27px}
  .savePhoneHeader p{ color: #6768A7; font-weight: bold;}
  .savePhoneHeader .headerFont{line-height: 32px}

  .startBigBtn{background-color: #6768A7; margin-top: 10px; color:#ffff; height: 40px; box-sizing: border-box; padding: 5px 10px; width: 100%; border-radius: 5px; text-align: center; }
  .startBigBtn p{color:#ffff; text-decoration: none; font-size: 15px; line-height: 28px;}
</style>
