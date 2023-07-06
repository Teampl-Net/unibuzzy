<template>
  <div class="w100P h100P" style="background: white; padding-top: 50px; z-index: 99999; position: absolute;">
    <div v-for="(chan, idx) in GE_MAIN_CHAN_LIST" :key="idx">{{ this.$changeText(chan.nameMtext) }}</div>
  </div>
</template>
<script>
export default {
  computed: {
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    }
  }
}
</script>
<style scoped>
</style>
