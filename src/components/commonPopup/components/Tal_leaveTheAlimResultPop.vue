<template>
<div class="modalBack">
    <div style="width: 80%; max-width: 670px; background-color: #FFFFFF; height: 600px; border-radius: 10px; padding: 1rem;">
      <div style="height: 90%;display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <img src="../../../assets/images/common/message_logo.png" style="width:6rem" alt="">
        <p style="color: #6768A7; font-size: 15px; font-weight: bold; margin-top: 2rem;;">회원 탈퇴가 완료되었습니다.</p>
        <p style="color: #6768A7; font-size: 12px; margin-top: 0.5rem;">더알림을 이용해주시고 사랑해주셔서 감사합니다.<br>더욱 더 노력하고 발전하는 더알림이 되겠습니다.</p>
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
.modalBack{width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center;}
</style>
