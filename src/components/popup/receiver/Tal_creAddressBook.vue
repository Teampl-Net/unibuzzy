<template>
  <!-- <div style="width:100vw; height:100vh; position: fixed; top:0; left:0; background:#00000050; z-index: 9999;" @click="this.$emit('closePop')"></div> -->
  <!-- <div style="width: 50%; min-width: 300px; min-height:200px; background:#ffffff; position: absolute; top:50%; left:50%; z-index: 9999;transform: translate(-50%, -50%);padding: 0.5rem 1rem"> -->
  <div style="width:100%; height:100%; margin-top:50px; padding: 1rem 1rem 0rem 1rem; ">
    <div class="addressItemWrite">
      <p class="fontBold textLeft font16 fl" style="width: 100px;">주소록명</p>
      <input v-model="inputAddressBookName" type="text" placeholder="주소록명을 입력해주세요." class="addressBookInputType"  id="addressBookName" style="">
    </div>
    <div class="w-100P fl " style=" position:absolute; bottom:2rem; left:0">
      <gBtnSmall class="fr mleft-05 mright-2" btnThema='light' btnTitle='취소' @click="closePop" />
      <gBtnSmall class="fr mright-05" :btnTitle='type' @click="saveCabinet" />
    </div>

  </div>
</template>
<script>
export default {
  props: {
    propData: {}
  },
  mounted () {
    console.log(this.propData)
    this.setting()
  },
  data () {
    return {
      type: '',
      inputAddressBookName: ''
    }
  },
  methods: {
    setting () {
      if (this.propData) {
        var cabinet = this.propData.cabinet
        this.type = this.propData.newAddressYn === true ? '저장' : '수정'
        this.inputAddressBookName = cabinet.cabinetNameMtext
      }
    },
    async saveCabinet () {
      var param = {}
      param.creMenuYn = true
      var cabinet = this.propData.cabinet
      cabinet.cabinetNameMtext = this.inputAddressBookName
      param.cabinet = cabinet
      await this.$saveCabinet(param)
      this.closePop()
    },
    closePop () {
      this.$emit('closeXPop', true)
    }
  }
}
</script>
<style>
.addressBookInputType{
  padding-left: 5px; height: 30px; border: 1px solid #ccc; border-radius: 5px; cursor: text; width: calc(100% - 100px); background: white !important; float: left;
}
.addressItemWrite{
  display: flex;
  align-items: center;
  min-height: 65px;
  border-bottom: 1px solid #ccc;
}
</style>
