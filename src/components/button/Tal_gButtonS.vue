
<template >
  <div class="commonBtn" :class="this.btnThema === 'light' ? 'lightColor':'deepColor'" >
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
    btnThema: {},
  }
}
</script>
<style scoped>

.lightColor{background-color: #F5F5F9; color: #000000;}
.deepColor{background-color: #A9AACD; color: #FFFFFF;}
.commonBtn {width: fit-content; font-size: 13px;line-height: 1.5rem; border-radius: 5px; min-width: 3rem; float: right; height: 1.4rem; padding: 0 7px; text-align: center;}
</style>
