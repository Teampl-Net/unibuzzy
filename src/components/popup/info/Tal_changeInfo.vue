<template>
<div class="pagePaddingWrap" >
  <div class="mt-header introText">
      <p v-html="this.introText"></p>
  </div>
  <div class="textLeft" v-if="this.kind === 'changeMobile'">
    <select>
      <option>대한민국(+82)</option>
    </select>
  </div>
  <div class="inputWrap">
    <input type="number" :placeholder="this.kindText + ' 입력'" name="" id="" >
    <gBtnSmall :btnTitle="this.sendNumberBtn" class="inputBtn" />
  </div>
  <div class="inputWrap">
    <input type="number" placeholder="인증번호 입력" name="" id="" >
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      sendNumberBtn: '인증하기',
      introText: '',
      targetKind: '',
      kindText: '',
      beforeEmail: '',
      beforePhone: ''
    }
  },
  created () {
    this.checkMyInfo()
  },
  props: {
    kind: {}
  },
  methods: {
    checkMyInfo () {
      if (this.kind === 'changeMobile') {
        this.kindText = '휴대전화 번호'
        var userMobile = JSON.parse(localStorage.getItem('sessionUser')).phoneEnc
        if (userMobile !== undefined && userMobile !== 'undefined' && userMobile !== null && userMobile !== 'null' && userMobile !== '' && localStorage.getItem('userMobile').length > 7) {
          this.targetKind = 'change'
          this.introText = '기존 휴대폰 번호는 ' + localStorage.getItem('userMobile') + ' 입니다.<br>변경할 휴대폰 번호로 인증 번호 받기'
        } else {
          this.targetKind = 'new'
          this.introText = '현재 등록되어 있는 휴대폰 번호가 없습니다. <br>추가할 휴대폰 번호로 인증번호 받기'
        }
      } else if (this.kind === 'changeEmail') {
        this.kindText = '이메일 주소'
        var userEmail = JSON.parse(localStorage.getItem('sessionUser')).userEmail
        if (userEmail !== undefined && userEmail !== 'undefined' && userEmail !== null && userEmail !== 'null' && userEmail !== '' && localStorage.getItem('userEmail').length > 7) {
          this.targetKind = 'change'
          this.introText = '기존 이메일은 ' + localStorage.getItem('userEmail') + ' 입니다.<br>변경할 이메일로 인증 메일 받기'
        } else {
          this.targetKind = 'new'
          this.introText = '현재 등록되어 있는 이메일이 없습니다.<br>추가할 이메일로 인증 메일 받기'
        }
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: #6768A7; font-size: 15px;}
.changeInfoWrap{height: 100vh; width: 100vw;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}
</style>
