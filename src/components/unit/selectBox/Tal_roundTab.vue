<template>
  <div style="width: 100%; height: 100%; overflow: scroll hidden; float: left; white-space: nowrap; text-align: left;">
    <div v-for="(tab, index) in tabList" :key="index" :class="{activeTab: this.changeTabType === tab.tabType}" @click="tabClick(tab)" class="roundTab font14">{{tab.name}}</div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {},
    tabType: {}
  },
  data () {
    return {
      // tabIndex: 0
      changeTabType: ''
    }
  },
  created () {
    this.changeTabType = this.tabList[0].tabType
  },
  methods: {
    tabClick (tab) {
      this.changeTabType = tab.tabType
      this.$emit('tabChange', tab)
    }
  }
}
// <roundTab :tab="tab" :tabType="this.myActTabType" id="myActTabId" @click="myActTabClick(tab, index)" :key="index"  />
// <div style="display: inline-block; text-align: center; border-radius: 0.8rem;" :class="{activeMyActBox: this.myActTabType === tab.myActTabType}" @click="myActTabClick(tab, index)" id="myActTabId" v-for="(tab, index) in myActTabList" :key="index" class="myActTab font14">{{tab.name}}</div>

</script>
<style>
.roundTab {display: inline-block; text-align: center; width: 70px; height: 30px; line-height: 30px; border: 1px solid #ccc; border-radius: 0.8rem; margin-right: 3px; background-color: #fff; color: #303030;}
.activeTab {background-color: #6768A7; color: #fff; border: none; font-weight: bold;}
</style>
