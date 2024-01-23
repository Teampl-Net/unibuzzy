<template>
  <div id="routerRef" class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden"  >
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  created () {
    this.$emit('changePageHeader', 'admin')
  }
}
</script>

<style scoped>

</style>
