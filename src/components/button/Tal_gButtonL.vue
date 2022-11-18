
<template >
  <div class="commonBtnL font15" >
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
.deepColor{background-color: #7678E2; color: #FFFFFF;}
.commonBtnL {line-height: 2.5rem; width: fit-content; cursor: pointer; color: #FFFFFF; width: 100%; background-color: #7678E2; border-radius: 5px; height: 2.7rem; text-align: center; padding: 0.2rem 0.4rem;}
</style>
