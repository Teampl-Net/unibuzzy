<template>
    <select name="" class="gWhiteStyle" id="">
      <option>{{defaltText}}</option>
    </select>
</template>
<script>
export default {
  props: {
    defaltText: {}
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
.gWhiteStyle{float: left;height: 30px; border: none; background-color: #FFFFFF; color: #000000; font-size: 14px; text-align: center; box-sizing: border-box; padding: 0.2rem 0.6rem;}
</style>
