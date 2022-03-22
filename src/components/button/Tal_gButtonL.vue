
<template >
  <div class="commonBtnL" style="">
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
    btnTitle: String
  }
}
</script>
<style scoped>
.commonBtnL {line-height: 2.5rem; width: fit-content; cursor: pointer; color: #FFFFFF; width: 100%; font-size: 15px; background-color: #6768A7; border-radius: 5px; height: 2.7rem; text-align: center; padding: 0.2rem 0.4rem;}
</style>
