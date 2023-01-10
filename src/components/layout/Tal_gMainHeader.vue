<template>
    <div class="mainHeaderWrap" :style="mRouterHeaderText === '검색' ? 'background: white;':''">
        <img src="../../assets/images/common/thealim_header_logo.png" class="fl mainHeaderLogo" >
        <p class="font25 headerFont commonColor fl" v-html="mRouterHeaderText"></p>
        <div class="menuBtn">
            <img class="mainMenuIcon" v-on:click="showMenu()" src="../../assets/images/common/icon_menu.png"/>
        </div>
        <!-- <div class=" policyHeader fl ms-2 text-start " style="margin-top: 5px; line-height: 20px">
            <p class="font25 headerFont commonColor fl">더알림</p>
        </div> -->
    </div>
</template>

<script>

export default {
  name: 'talHeader',
  methods: {
    showMenu () {
      this.$emit('showMenu')
    }
  },
  props: {
    mRouterHeaderText: {}
  }
}

</script>

<style>
.mainHeaderWrap{box-sizing: border-box; display: list-item; background: #E7EDFF!important; padding: 0.5rem 0.7rem; padding-right: 1rem; text-align: left; width: calc(100% + 1px); }
.menuBtn{float: right;}
.mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;}
.mainHeaderLogo{width: 1.7rem; margin: 0 0.4rem; -webkit-user-drag: none;}
</style>
