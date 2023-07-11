<template>
  <div class="mainHeaderWrap" v-if="pRouterHeaderInfo">
    <img class="mainMenuIcon" height="20" style="position: absolute; left: 20px;" @click="showMenu()" src="../../../assets/images/common/icon_menu.png"/>
    <img class="cursorP" @click="goLogList" height=20 style="right: 55px; position: absolute;" src="../../../assets/images/common/icon_bell.svg"/>
    <img class="cursorP" @click="goFavList" height="20" style="position: absolute; right: 20px;" src="../../../assets/images/common/likeIcon.svg" />
  </div>
  <div class="w100P h100P">
    <div></div>
  </div>
</template>
<script>
export default {
  methods: {
    goLogList () {
      const param = {}
      param.targetType = 'logList'
      param.popHeaderText = '알림이력'
      this.$emit('goLogList', param)
    },
    goFavList () {
      const param = {}
      param.targetType = 'favList'
      param.popHeaderText = '즐겨찾기'
      this.$emit('goFavList', param)
    },
    showMenu () {
      this.$emit('showMenu')
    },
    async openPage (params) {
      if (params.targetType === 'chanDetail') {
        this.goChanDetail(params)
        return
      } else if (params.targetType === 'favList') {
        this.goFavList(params)
        return
      } else if (params.targetType === 'logList') {
        this.goLogList(params)
      }
      this.hideMenu()
    }
  },
  created () {
    alert('ddddd')
  },
  components: {
  }
}
</script>
<style scoped>
</style>
