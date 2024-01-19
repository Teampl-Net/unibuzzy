<template>
  <div ref="fLoading" v-show="testdd" style="width:100%; z-index: 999; height:100%; display: flex; background-color: #879dc9; justify-content: center; align-items: center; color: #FFF; font-weight: bold; font-size: 65px;">Hybric</div>
</template>

<script>
export default {
  props: {
    pLoadingYn: {}
  },
  data () {
    return {
      mLoadingYn: false
    }
  },
  mounted () {
    setTimeout(() => {
      /* this.$refs.fLoading.style.zIndex = '-1' */
    }, 10000)
  },
  watch: {
    pLoadingYn: {
      immediate: true,
      handler (val) {
        if (val) {
          console.log(val)
          this.mLoadingYn = val
          /* this.$refs.fLoading.style.zIndex = '-1' */
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
