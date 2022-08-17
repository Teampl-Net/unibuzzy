<template>
<div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; ">
    <div style="width: 80%; height: 220px; max-height: 500px; max-height: 250px; border-radius: 10px; background: #FFFFFF;">
      <div style="height: 50px; width: 100%; border-bottom: 1px solid #6768A7; padding: 0.6rem 0.5rem;">
        <img src="../assets/images/common/thealim_header_logo.png" class="fl" style=" width: 1.7rem; margin: 0 0.4rem" >
        <p class="font20 headerFont commonColor fl" style="line-height: 2.2rem;" >더알림</p>
        <p class="font12 headerFont commonColor fl" style="line-height: 2.6rem; margin-left: 0.3rem" >가장 편리한 구독-알림</p>
      </div>
      <div style="width: 100%; padding: 3rem 0">
        <p style="color: #3E3F6A; font-size: 18px; font-weight: bold;">로그아웃 하시겠습니까?</p>
        <div style="display: flex; margin: 2rem auto; height: 20px; justify-content:center;">
          <gBtnSmall style="margin-right: 0.5rem;" v-on:click="goLogout" :btnTitle="this.okBtn"/>
          <gBtnSmall  :btnThema="'light'" v-on:click="closePop" :btnTitle="this.cancelBtn"/>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      okBtn: '확인',
      cancelBtn: '취소'
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style scoped>

</style>
