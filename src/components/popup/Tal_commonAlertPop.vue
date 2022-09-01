<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="this.$emit('closePop')"></div>
  <div class="imgAlertWrap" style="margin: 1rem 0rem;">
    <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <p v-for="(value, index) in btnList" :key="index" class="fl font16 w-100P alertRow commonColor" style="min-height:50px; line-height:50px; " @click="this.$emit('clickBtn', value.event)">{{value.text}}</p>
      <!-- <p class="fl font16 w-100P imgAlertMenuListBase" style="border-top: 1px solid #eee;" @click="bloc('channel')" v-if="this.contentType === 'alim' && !contentOwner">채널 차단</p> -->
      <!-- <p class="fl font16 w-100P imgAlertMenuListBase" style="border-top: 1px solid #eee;">유저 차단</p> -->

    </div>

    <div class="fl mtop-05" @click="this.$emit('closePop')" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
      <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; " >
        취소
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    btnList: {}
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.imgAlertWrap {
  width:95%; position: fixed; bottom:0; left:2.5%; z-index:9999;
}
.imgAlertMenuListBase {
  min-height:50px; line-height:50px; color:red;
}
.alertRow {border-top: 1px solid #eee;}
.alertRow :first {border-top: none;}
.alertRow :first-child {border-top: none;}
</style>
