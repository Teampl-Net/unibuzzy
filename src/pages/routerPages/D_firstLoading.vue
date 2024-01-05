<template>
  <div style="width:100%; height:100%;">Hi, it's a test loading page.</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    this.$route.push('/')
  }
}
</script>

<style scoped>

</style>
