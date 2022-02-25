<template>
  <previewPop v-if="this.previewChanYn"  @closePop="closePreviewPop" />
  <contentsPop v-if="this.contentsPopShowYn"  @closePop="closeContentsPop" />
  <adHeader style=""/>
  <div style="height: 100%; height:100%; margin-top: 90px;">
    <adLeftMenu v-if="leftMenuShowYn" @closeLeft="closeLeft" />
    <div id= "contentsWrap" class= "contentsWrap" >
      <img src="../resource/images/channerList_open.png" v-if="leftMenuShowYn === false" v-on:click= "openLeft"  style="position: absolute; top: 1rem; left: 0;" alt="">
      <router-view style="border-left: 1px solid #E1E1E1;" @openPop="openPop"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import adHeader from '../components/cAd_header.vue'
import adLeftMenu from '../components/cAd_leftMenu.vue'
export default {
  name: 'Home',
  data () {
    return {
      leftMenuShowYn: false,
      previewChanYn: false,
      contentsPopShowYn: false
    }
  },
  components: {
    adHeader,
    adLeftMenu
  },
  methods: {
    openPop (type) {
      if (type === 'previewPop') { this.previewChanYn = true } else if (type === 'readPop') { this.contentsPopShowYn = true }
    },
    closeLeft () {
      this.leftMenuShowYn = false
    },
    openLeft () {
      this.leftMenuShowYn = true
    },
    closePreviewPop () {
      this.previewChanYn = false
    },
    closeContentsPop () {
      this.contentsPopShowYn = false
    }
  }
}
</script>

<style scoped>
.contentsWrap{overflow-x: hidden; overflow-y: hidden; position: relative; height: 100%;box-sizing: border-box;padding: 1rem 0; padding-bottom: 0;}
</style>
