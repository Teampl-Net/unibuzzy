<template>
  <div class="commonPageWrap">
    <jojikDetailWrap v-if="pageType === 'jojikDetail'" @openPop="openPop" @changeBranch="changeBranch" :pClosePage="pClosePage" :pPageData="pPageData" :pPropParams="pPropParams"/>
  </div>
</template>

<script>
import jojikDetailWrap from '@/components/admPages/adm_components/Adm_jojikDetailWrap.vue'

export default {
  components: {
    jojikDetailWrap
  },
  props: {
    pPageData: {},
    pPropParams: {},
    pClosePage: Function
  },
  created () {
    this.pageType = this.pPropParams.pageType
  },
  data () {
    return {
      pageType: {}
    }
  },
  mounted () {
  },
  methods: {
    openPop () {
      this.$emit('openPop')
    },
    changeBranch () {
      this.$emit('changeBranch')
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.commonPageWrap{
  width:100%;
  height:100%;
  z-index:3;
}
</style>
