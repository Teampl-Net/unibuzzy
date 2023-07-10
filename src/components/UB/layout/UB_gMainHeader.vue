<template>
  <!-- <div class="w100P " style="position: fixed; top: 0; left: 0; height: 60px; background: none; z-index: 9; display: flex; align-items: center; justify-content: center;"> -->
  <div class="mainHeaderWrap" v-if="pRouterHeaderInfo">
    <img class="mainMenuIcon" height="20" style="position: absolute; left: 20px;" @click="showMenu()" src="../../../assets/images/common/icon_menu.png"/>
    <!-- <img v-if="pRouterHeaderInfo.logoImg" :src="pRouterHeaderInfo.logoImg" height="30" style="margin-right: 5px; border: 2px solid white; background: white; border-radius: 100%; -webkit-user-drag: none;" /> -->
    <p v-if="pRouterHeaderInfo" class="headerFont fontBold fl" style="color: #062bb5;" v-html="pRouterHeaderInfo"></p>
    <img @click="goLogList" height=20 style="right: 55px; position: absolute;" src="../../../assets/images/common/icon_bell.svg"/>
    <img height="20" style="position: absolute; right: 20px;" src="../../../assets/images/common/likeIcon.svg" />
  </div>
</template>
<script>
export default {
  props: {
    pRouterHeaderInfo: String
  },
  methods: {
    goLogList () {
      const param = {}
      param.targetType = 'logList'
      param.popHeaderText = '알림이력'
      this.$emit('goLogList', param)
    },
    showMenu () {
      this.$emit('showMenu')
    }
  }
}
</script>

<style>
.mainHeaderWrap {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  padding-right: 1rem;
  text-align: left;
  width: calc(100% + 1px);
}
/* .mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;} */
.mainHeaderLogo{width: 1.7rem; margin: 0 0.4rem; -webkit-user-drag: none;}
.menuBtn { height: 20px; position: absolute; left: 20px; -webkit-user-drag: none; }
</style>
