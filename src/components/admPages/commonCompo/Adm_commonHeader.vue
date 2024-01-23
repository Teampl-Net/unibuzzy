<template>
  <div class="commonHeader">
    <div>
      <img src="@/assets/images/common/thealim_header_logo.png" class="fl mainHeaderLogo" >
      <p class="font25 headerFont commonColor fl" v-html="mDispTitle? mDispTitle : $t('COMMON_NAME_APP')"></p>
    </div>
    <div>
      <p class="font13">안녕하세요, <span class="font15 fontBold"> {{ GE_USER }}님</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // mRouterHeaderText: {}
  },
  created () {

  },
  data () {
    return {
      mDispTitle: '하이브릭 관리'
    }
  },
  methods: {
  },
  computed: {
    GE_USER () {
      return '황수민'
      // return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    // mRouterHeaderText: {
    //   immediate: true,
    //   handler (val) {
    //     if (!val) return
    //     if (val) {
    //       this.mDispTitle = '하이브릭_Admin'
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
  .commonHeader{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:60px;
    box-shadow:0 0 5px rgba(0,0,0,0.1);
    background-color:#fff;
    padding:0 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
</style>
