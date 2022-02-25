<template>
<div class="leftMenuWrap textLeft">
    <img src="../resource/images/channerList_close.png" style="position:absolute; top: 1rem; right: 0" v-on:click="closeLeftMenu" alt="">
    <p style="color: #3A3A3A; font-size: 16px; font-weight: bold; ">채널리스트</p>
    <gSearchBox style="margin-top: 1rem; margin-bottom: 1rem;"/>
    <div style="height: 2.5rem; width: 100%; padding: 0.5rem;" v-for="(value, index) in chanList" :key="index">
        <span style="font-size: 15px; color: #3A3A3A;">{{value.chanName}}</span>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      chanList: [
        { chanName: '더알림대학교', chanKey: '1' },
        { chanName: '삼천리', chanKey: '2' },
        { chanName: '티몬', chanKey: '3' },
        { chanName: '쿠팡', chanKey: '4' }
      ]
    }
  },
  methods: {
    closeLeftMenu () {
      this.$emit('closeLeft')
    }
  }
}
</script>
<style scoped>
.leftMenuWrap{background-color: #FFFFFF; z-index: 1 ; position: relative; min-width: 220px;height: 100%;float: left; box-sizing: border-box;padding: 1rem 1rem;}
</style>
