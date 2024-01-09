<template>
  <div id="routerRef" class="w-100P h-100P mainBackgroundColor listRefresh" style="overflow:hidden"  >
  <commonHeader />
  <router-view style="padding:60px 20px 0;"></router-view>
  <commonFooter v-if="footer" />
  </div>
</template>

<script>
import commonHeader from '@/components/admPages/commonCompo/Adm_commonHeader.vue'
import commonFooter from '@/components/admPages/commonCompo/Adm_commonFooter.vue'
export default {
  components: {
    commonHeader,
    commonFooter
  },
  data () {
    return {}
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
