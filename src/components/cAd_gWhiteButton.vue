<template>
    <div v-on:click="clickEvent()" class="gWhiteBtnStyle">{{this.btnName}}</div>
</template>
<script>
export default {
  props: {
    btnName: {}
  },
  mounted () {
  },
  methods: {
    clickEvent () {
      this.$emit('btnEvent')
    }
  }
}
</script>
<style scoped>
.gWhiteBtnStyle{float: left; border-radius: 5px; height: 30px; cursor: pointer;background-color: #FFFFFF; border: 1px solid #BFBFDA; color: #3A3A3A; font-size: 12px; text-align: center; box-sizing: border-box; padding: 0.3rem 0.6rem;}
</style>
