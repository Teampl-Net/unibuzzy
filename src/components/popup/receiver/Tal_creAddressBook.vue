<template>
  <div style="width:100vw; height:100vh; position: fixed; top:0; left:0; background:#00000050; z-index: 9999;" @click="this.$emit('closePop')"></div>
  <div style="width: 50%; min-width: 300px; min-height:200px; background:#ffffff; position: absolute; top:50%; left:50%; z-index: 9999;transform: translate(-50%, -50%);padding: 0.5rem 1rem">
    <div class="fl w-100P" style="border-bottom:1px solid #ccc;">
      <p class="fl w-100P textLeft font18 fontBold mleft-05">주소록 {{type}}</p>
    </div>
    <div class="fl w-100P mtop-1" style="">
      <p class="fl w-100P textLeft font16 fontBold ">주소록 명

      </p>
      <input class="fl w-100P font16 mtop-05" style="padding-left: 5px; height: 30px; border: 1px solid #ccc; border-radius: 5px; cursor: text; width: 100%; background: white !important; float: left;" type="text" v-model="inputAddressBookName"/>

      <div class="w-100P fl mtop-1" style="display: flex; justify-content: center;">
        <gBtnSmall class="fl w-100P" :btnTitle='type' />
      </div>

    </div>

  </div>
</template>
<script>
export default {
  props: {
    openType: { type: String, default: 'create' },
    addressBookName: {}
  },
  mounted () {
    if (this.openType === 'create') {
      this.type = '만들기'
    } else {
      this.type = '수정'
    }
  },
  data () {
    return {
      type: '',
      inputAddressBookName: ''
    }
  }
}
</script>
<style>

</style>
