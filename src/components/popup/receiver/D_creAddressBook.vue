<template>
  <!-- <div style="width:100vw; height:100vh; position: fixed; top:0; left:0; background:#00000050; z-index: 9999;" @click="this.$emit('closePop')"></div> -->
  <!-- <div style="width: 50%; min-width: 300px; min-height:200px; background:#ffffff; position: absolute; top:50%; left:50%; z-index: 9999;transform: translate(-50%, -50%);padding: 0.5rem 1rem"> -->
  <div id='dlTskdy' style="width:100%; height:100%; margin-top:50px; padding: 1rem 1rem 0rem 1rem; ">
    <div class="addressItemWrite">
      <p class="fontBold textLeft font16 fl" style="width: 100px;">주소록 이름</p>
      <input v-model="inputAddressBookName" type="text" placeholder="주소록 이름을 정해주세요." class="addressBookInputType"  id="addressBookName" style="">
    </div>
    <gBtnSmall class="font16 " :class="inputAddressBookName.trim() === '' ? 'CWhiteGrayBgColor CWDeepGrayColor' : 'CDeepBgColor' " style="width: 80%; height:50px; line-height:50px; left:10%; position:absolute; bottom:2rem; font-size:16px" :btnTitle='type' @click="saveCabinet" />
    <!-- <div class="fl" style=" width:100%; position:absolute; bottom:2rem; left:0%">
      <gBtnSmall class="" style="width: 90%; left:5%;" :btnTitle='type' @click="saveCabinet" />
    </div> -->
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
        this.type = this.propData.newAddressYn === true ? '생성하기' : '수정하기'
        this.inputAddressBookName = cabinet.cabinetNameMtext
      }
    },
    async saveCabinet () {
      if (this.inputAddressBookName.trim() === '') {
        this.$showToastPop('주소록 이름을 입력해주세요.')
        return
      }
      var param = {}
      param.creMenuYn = true
      console.log('gggggggggggggggggggg')
      console.log(this.propData)
      var cabinet = this.propData.cabinet
      // delete cabinet.value
      cabinet.cabinetNameMtext = this.inputAddressBookName
      param.cabinet = cabinet

      try {
        await this.$saveCabinet(param)
        var thisParam = {}
        thisParam.cabinetType = 'address'
        this.$emit('saveCabinet', thisParam)
      } catch (error) {
        console.error(error)
        this.$showToastPop('저장 중 문제가 발생했습니다. 다시 시도해주세요.')
      } finally {

      }

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
.addressBookInputType::placeholder {
  color : #BDBDBD;
}
.addressItemWrite{
  display: flex;
  align-items: center;
  min-height: 65px;
  /* border-bottom: 1px solid #ccc; */
}
</style>
