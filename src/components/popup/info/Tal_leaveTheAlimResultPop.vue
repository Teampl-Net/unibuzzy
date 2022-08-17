<template>
<div class="modalBack">
    <div class="leaveContainer">
      <div class="leaveContentsArea">
        <img src="../../../assets/images/common/message_logo.png" alt="종모양 아이콘">
        <p class="leaveComplete-1">회원 탈퇴가 완료되었습니다.</p>
        <p class="leaveComplete-2">더알림을 이용해주시고 사랑해주셔서 감사합니다.<br>더욱 더 노력하고 발전하는 더알림이 되겠습니다.</p>
      </div>
      <gBtnLarge v-on:click="closePop" :btnTitle="'확인'" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    closePop () {
      this.$emit('closeXPop')
    }
  }
}
</script>
<style scoped>
.modalBack{width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center;}
.leaveContainer{width: 80%; max-width: 670px; background-color: #FFFFFF !important; height: 600px; border-radius: 10px; padding: 1rem;}
.leaveContentsArea{height: 90%;display: flex; justify-content: center; align-items: center; flex-direction: column;}
.leaveContentsArea img {width: 6rem;}
.leaveComplete-1{color: #6768A7; font-size: 15px; font-weight: bold; margin-top: 2rem;}
.leaveComplete-2{color: #6768A7; font-size: 12px; margin-top: 0.5rem;}
</style>
