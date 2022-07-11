<template>
  <div class="smallConfirmPopWrap">
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
    setTimeout(() => {
      this.$emit('no')
    }, 3000)
    }
  }
}
</script>

<style>
.smallConfirmPopWrap {
  min-height: 50px;
  max-width: 80%;
  min-width: fit-content;
  left: 40%;
  transform: translate(-50%, 0);
  position: fixed;
  bottom: 10%;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 7px 3px #6768a740;
  z-index: 99999;
  margin-left: 10%;
  margin-right: 10%;
}
.smallConfirmText {font-size: 18px; color: black; width: 100%; word-break: keep-all; float: left; text-align: center; }
.addSmallText {font-size: 16px; color: #505050; width: 100%; word-break: keep-all; float: left; text-align: center;}
</style>
