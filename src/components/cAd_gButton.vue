<template>
    <div v-on:click="clickEvent()" :class="this.btnType === 'light'? 'lightC' : ''" class="gWhiteBtn" v-html="this.btnName"></div>
</template>
<script>
export default {
  props: {
    btnName: {},
    btnType: {}
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
.gWhiteBtn{float: left; font-size: 14px; cursor: pointer; border-radius: 5px; min-height: 30px; background-color: #6768A7; color: #FFFFFF; text-align: center; box-sizing: border-box; padding: 0.3rem 0.6rem;}
.lightC{background-color: #BFBFDA!important;}
</style>
