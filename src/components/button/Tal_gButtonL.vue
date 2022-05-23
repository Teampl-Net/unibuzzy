
<template >
  <div class="commonBtnL" >
      {{btnTitle}}
  </div>
</template>
<script>
export default {
  mounted () {
  },
  data: function () {
    return { // 데이터 정의
    }
  },
  props: {
    btnTitle: String,
    btnThema: {}
  }
}
</script>
<style scoped>

.lightColor{background-color: #F5F5F9; color: #000000;}
.deepColor{background-color: #A9AACD; color: #FFFFFF;}
.commonBtnL {line-height: 2.5rem; width: fit-content; cursor: pointer; color: #FFFFFF; width: 100%; font-size: 15px; background-color: #6768A7; border-radius: 5px; height: 2.7rem; text-align: center; padding: 0.2rem 0.4rem;}
.commonBtn {width: fit-content; font-size: 13px;line-height: 1.5rem; border-radius: 5px; min-width: 3rem; float: right; height: 1.4rem; padding: 0 7px; text-align: center;}
</style>
