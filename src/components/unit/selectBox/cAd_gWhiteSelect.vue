<template>
    <select name="" :class="this.roundYn === true ? 'borderRadius' : ''" class="gWhiteStyle cursorP" id="">
      <option>{{defaltText}}</option>
    </select>
</template>
<script>
export default {
  props: {
    defaltText: {},
    roundYn: {}
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
.gWhiteStyle {
  float: left;
  border-radius: 5px;
  height: 30px;
  background-color: #FFFFFF;
  border: 1px solid #BFBFDA;
  color: #3A3A3A;
  font-size: 12px;
  text-align: center;
  box-sizing: border-box;
  padding: 0.2rem 0.6rem;
}
.borderRadius {
  border-radius: 18px;
  height: 32px;
}
</style>
