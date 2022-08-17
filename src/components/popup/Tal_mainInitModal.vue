<template>
    <div class="modalWrap">
        <div class="overlay" v-on:click="$emit('close-modal')" > </div>
        <div class="modal-card">
          <div class="mbottom-1 mtop-1">
            <img class="mbottom-1" src="../../assets/images/main/message_logo.png" style="width: 4rem" alt="">
            <p class="font20 fontBold">환영합니다!</p>
            <p class="font15" >{{userName}}김이랑님, 회원가입을 축하합니다.</p>
          </div>
          <div d>
            <userItem :uItem="this.userEmail" />
            <userItem :uItem="this.userPhone" />
          </div>
          <gBtnLarge class="mtop-1"  :btnTitle="this.joinTheAlimBtn" />
        </div>
    </div>
</template>

<script>
import userItem from '../unit/Tal_userItem.vue'
export default {
  emits: ['close-modal'],
  components: {
    userItem
  },
  mounted () {
    if (this.userPhone.value === undefined || this.userPhone.value === 'undefined') { this.userPhone.value = '등록된 번호가 없습니다.' }
    if (this.userEmail.value === undefined || this.userEmail.value === 'undefined') { this.userEmail.value = '등록된 이메일 주소가 없습니다.' }
    // this.userEmail = localStorage.getItem('userEmail')
    // this.mobile = localStorage.getItem('userMobile')
  },
  data () {
    return {
      // userEmail: '',
      joinTheAlimBtn: '시작하기',
      userName: localStorage.getItem('userName'),
      userEmail: { icon: 'http://placehold.it/10', title: '이메일', value: localStorage.getItem('userEmail'), btnText: '수정', link: 'http://naver.com' },
      userPhone: { icon: 'http://placehold.it/10', title: '휴대폰 번호', value: localStorage.getItem('userMobile'), btnText: '수정', link: 'http://naver.com' }
    }
  },
  props: {
    // userEmail: {},
    // userMobile: {}
  }
}
</script>
<style scoped>
.modalWrap, .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
.modalWrap{
z-index: 999999;
}
.overlay{
    opacity: 0.5;
    background-color: black;
}
.modal-card{
    box-sizing: border-box;
    position: relative;
    width: 80%;
    margin: 40% auto;
    padding: 1.5rem;
    height: 25rem;
    border-radius: 10px;
    background-color: white;
    z-index: 10;
    opacity: 1;
}
</style>
