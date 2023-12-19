<template>
<div style="width: 100%; height: 100vh; background: #00000026; display: flex; justify-content: center; align-items: center; ">
  <gBtnSmall @click="this.addYn = true" style="width: 500px; height: 100px;" btnTitle="추가" />
  <div style="display: flex; width: 50%; height: 100%; flex-direction: column; justify-content: center; align-items: center;">
      <!-- <iframe style="width: 100%; height: 50%;" src="https://www.naver.com/" frameborder="0"></iframe>
    <iframe style="width: 100%; height: 50%;" v-if="addYn" src="https://www.naver.com/" frameborder="0"></iframe> -->
    <iframe style="width: 100%; height: 50%;" src="http://gw.officeon.com/officeon/portal/address/officeon.main#noback" frameborder="0"></iframe>
    <iframe style="width: 100%; height: 50%;" v-if="addYn" src="http://gw.officeon.com/officeon/portal/address/officeon.main#noback" frameborder="0"></iframe>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addYn: false
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style scoped>

</style>
