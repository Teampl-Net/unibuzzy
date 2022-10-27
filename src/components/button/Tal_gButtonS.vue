
<template >
  <div class="commonBtn font14" :class="this.btnThema === 'light' ? 'lightColor' : this.btnThema === 'deepLightColor' ? 'deepLightColor' : 'deepColor'" >
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
.deepColor{background-color: #5F61BD; color: #FFFFFF;}
.deepLightColor{background-color: #ffffff; color: #000000;}
.commonBtn {cursor: pointer; width: fit-content; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center;}
</style>
