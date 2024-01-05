<template>
    <portalView01 v-slot="{Component}" >
        <component :is="{Component}"  @changeRouterPath="changeRouterPath" @openImgPop="openImgPop" :mRouterHeaderText="mRouterHeaderText" @openNotiHistoryPop="historyList" ref="routerViewCompo" :initData="sendInitData" @goSearchDirect="goSearchDirect" @openSelectChannelPop="openSelectChannelPop" @scrollEvnt="scrollEvnt" :popYn="false" style="margin-bottom: 100px" @openPop="openPop" @changePageHeader="changePageHeader" @goDetail="goDetail" @openUserProfile="openPop" :pChangeNightYn="changeNightYn" :pSetRouterData="getRouterData"/>
    </portalView01>
</template>

<script>
export default {
  props: {
    mRouterHeaderText: {}
  },
  components: {
    portalView01: require('./D_main.vue')
  },
  methods: {
    changeRouterPath (data) {
      this.$emit('changeRouterPath', data)
    },
    openImgPop (data) {
      this.$emit('openImgPop', data)
    }
  }
}
</script>

<style scoped>

</style>
