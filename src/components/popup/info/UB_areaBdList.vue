<template>
  <div class="w100P h100P areaBdListWrap">
    <div v-for="(chan, idx) in GE_MAIN_CHAN_LIST" :key="idx">{{ this.$changeText(chan.nameMtext) }}</div>
  </div>
</template>
<script>
export default {
  computed: {
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    }
  }
}
</script>
<style scoped>
.areaBdListWrap {
  background: white;
  padding-top: 50px;
  z-index: 99999;
  position: absolute;
}
</style>
