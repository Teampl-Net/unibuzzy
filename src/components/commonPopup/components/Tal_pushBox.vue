<template>
<div class="pagePaddingWrap" >
  <div class="pushBoxWrap">
    <!-- <img src="../../../assets/images/push/noticebox_all.png" alt=""><p class="pushBoxTitle">전체</p> -->
    <img class="fl pushBoxTitleImg" src="../../../assets/images/push/noticebox_all.png" alt="">
    <p class="pushBoxTitle fl font15 fontBold textLeft">전체</p>
  </div>
  <div class="pushBoxArea">
    <!-- <img src="../../../assets/images/push/noticebox_all.png" alt=""><p class="pushBoxTitle">전체</p> -->
    <div class= "titleWrap">
      <img class="fl pushBoxTitleImg" src="../../../assets/images/push/noticebox_keep.png" alt="">
      <p class="pushBoxTitle  fl font15 fontBold textLeft">보관함</p>
    </div>
    <div class="boxElement" v-for="(value,index) in boxList" :key="index">
      <div :style="tagColor"  :class="value.tagColor ? 'color'+value.tagColor : ''" class="fl colorBox"></div>
      <span  class="fl textLeft">{{value.boxName}}</span>
      <img src="../../../assets/images/push/noticebox_edit.png" class="fr" alt="">
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      boxList: [
        { boxName: '책', tagColor: 'D1ECFF', boxKey: '0' },
        { boxName: '영화&드라마', tagColor: 'E5FFD1', boxKey: '0' },
        { boxName: '택배', tagColor: 'FFD1D1', boxKey: '0' },
        { boxName: '커피', tagColor: 'FFECD1', boxKey: '0' }
      ]
    }
  },
  computed: {
    tagColor () {
      return {
        // display: this.answerShowYn
      }
    }
  },
  mounted () {
  },
  props: {
    kind: {}
  },
  methods: {
  }
}
</script>
<style scoped>
.pushBoxWrap{width: 100%; min-height: 50px; border-bottom: 1px solid #E4E4E4; padding: 0.5rem;}
.pushBoxArea{width: 100%; min-height: 50px; padding: 0.5rem}
.pushBoxArea .titleWrap{width: 100%; min-height: 40px; margin-top: 1rem}
.pushBoxTitleImg{width: 1.2rem; margin-top: 0.2rem; margin-right: 1rem}
.boxElement{width: 100%; min-height: 40px;}
.colorBox{width:18px; height: 18px; border-radius: 18px; background-color: #ccc; margin-right: 1rem; margin-top: 0.12rem}

.colorD1ECFF{background-color: #D1ECFF;}
.colorE5FFD1{background-color: #E5FFD1;}
.colorFFD1D1{background-color: #FFD1D1;}
.colorFFECD1{background-color: #FFECD1;}
</style>
