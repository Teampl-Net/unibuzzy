<template>
    <admHeader class="mobileNone"/>
    <popHeader @closeXPop="closeXPop" style="box-shadow: none;   background: transparent;"/>
    <div class="admRouterMainWrap">
        <div style="height: 100%; width: 100%; overflow: hidden;">
          <router-view @openPop="openPushDetailPop"/>
        </div>
    </div>
    <div @click="openWritePushPage" style="position: absolute; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 60px; background: #6768a7; box-shadow: rgb(183 183 183) 2px 2px 7px 1px">
      <img src="../../../assets/images/common/plusoutline.svg" alt="">
    </div>
</template>

<script>
import admHeader from '../../../components/layout/admLayout/TalAdm_gHeader.vue'

export default {
  components: {
    admHeader
  },
  data () {
    return {
      chanDetail: []
    }
  },
  props: {
    teamKey: {}
  },
  created () {
    // localStorage.setItem('teamKey')
    // this.getChannelList()
  },
  methods: {
    openPushDetailPop (param) {
      param.targetType = 'contentsDetail'
      this.$emit('openPop', param)
    },
    closeXPop () {
      this.$router.replace({ name: 'main' })
    },
    openWritePushPage () {
      this.$router.push({ name: 'admWritePush' })
    }
  }
}
</script>
<style scoped>
.admRouterMainWrap{width: 1290px; height: calc(100vh - 3.7rem); margin: 0 auto; position: relative; padding-top: 90px; overflow: hidden;}
@media screen and (max-width:1290px) {
    .admRouterMainWrap {width: 100%;}
}
@media screen and (max-width:730px) {
  .admRouterMainWrap { padding-top: 0}
}
</style>
