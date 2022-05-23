<template>
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 99999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
<div :style="popLeft" class="confirmPopWrap">
  <div class="confirmPopHeader">
    <img src="../../../assets/images/common/thealim_header_logo.png" class="fl" >
    <p class="font25 headerFont commonColor fl" style="line-height: 2.2rem;" >더알림</p>
    <p class="font15 headerFont commonColor fl" style="line-height: 2.6rem; margin-left: 0.3rem" >가장 편리한 구독-알림</p>
  </div>

  <div class="confirmPopBody" >
    <p class="confirmText" v-html="confirmText"></p>

    <div class="confirmBtnArea" v-if="confirmType==='timeout'">
      <gBtnSmall class="mright-05" v-on:click="goNo" btnTitle="닫기"/>
    </div>

    <div class="confirmBtnArea" v-if="confirmType==='one'">
      <gBtnSmall class="mright-05" v-on:click="goNo" btnTitle="확인"/>
    </div>

    <div class="confirmBtnArea" v-if="confirmType==='two'||confirmType== null">
      <gBtnSmall class="mright-05" v-on:click="goOk" btnTitle="확인"/>
      <gBtnSmall  :btnThema="'light'" v-on:click="goNo" btnTitle="취소"/>
    </div>

  </div>

</div>

</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    confirmText: {},
    confirmType: {} // two: 2btn  one: 1btn(alert)  timeout: 2sec exit
  },
  methods: {
    goOk () {
      this.$emit('ok')
    },
    goNo () {
      this.$emit('no')
    },
    timeOut () {
      if (this.confirmType === 'timeout') {
        setTimeout(() => {
          this.$emit('no')
        }, 2000)
      }
    }

  },
  computed: {
    popLeft () {
      return { left: (window.innerWidth - 350) / 2 + 'px' }
    }
  },
  created () {
    this.timeOut()
  }
}
</script>
<style scoped>
.confirmPopWrap{width: 350px; position: fixed; z-index: 999; top: 30%; min-height: 220px;box-shadow: 0 0 9px 2px #b8b8b8; max-height: 500px; max-height: 250px; border-radius: 10px; background: #FFFFFF;}
.confirmPopHeader{height: 55px; width: 100%; border-bottom: 1px solid #6768A7; padding: 0.8rem 0.5rem;}
.confirmPopHeader img{width: 1.7rem; margin: 0 0.4rem}
.confirmText{color: #3E3F6A; font-size: 18px; font-weight: bold;}
.confirmPopBody{width: 100%; padding: 3rem 0}
.confirmBtnArea{display: flex; margin: 2rem auto; height: 20px; justify-content:center;}

.confirmPopWrap {
  z-index: 99999;
  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s; /* Firefox */
  -webkit-animation: fadein 0.3s; /* Safari and Chrome */
  -o-animation: fadein 0.3s; /* Opera */
}

</style>
