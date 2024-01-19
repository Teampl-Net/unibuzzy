<template>
  <div id="smallConfirmPopWrap">
    <p class="smallConfirmText" v-html="confirmText"></p>
    <div v-if="addSmallTextYn" style="width: 100%; height: 40px; background: none;"></div>
    <p v-if="addSmallTextYn" class="addSmallText" v-html="addSmallMsg"></p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  created() {
    this.timeOut()
  },
  props: {
    confirmText: {},
    addSmallMsg: {},
    addSmallTextYn: {}
  },
  methods: {
  timeOut() {
    setTimeout(()=>{
      document.getElementById('smallConfirmPopWrap').style.animation= 'fadeout 1s ease-in-out'
    }, 2000)
    setTimeout(() => {
      this.$emit('no')
    }, 3000)
    }
  }
}
</script>

<style>
#smallConfirmPopWrap {
  min-height: 50px;
  max-width: 80%;
  min-width: fit-content;
  left: 40%;
  transform: translate(-50%, 0);
  position: absolute;
  bottom: 10%;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 7px 3px rgb(74 102 158)40;
  z-index: 99999;
  margin-left: 10%;
  margin-right: 10%;
  animation: fadein 0.3s ease-in-out;
  animation-fill-mode: forwards;
}
.smallConfirmText {font-size: 14px; color: black; width: 100%; word-break: keep-all; float: left; text-align: center; }
.addSmallText {font-size: 12px; color: #505050; width: 100%; word-break: keep-all; float: left; text-align: center;}
</style>
