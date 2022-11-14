
<template>
  <div class="top5TitleWrap textLeft">
    <img style="width: 1.2rem; margin-top: 0.4rem;" v-if="propListTitle === '알림'" class="mright-03 fl"  src="../../assets/images/main/pushIcon.svg"/>
    <img style="width: 1.2rem; " v-else-if="propListTitle === '채널'" class="mright-03 mtop-05 fl" src="../../assets/images/main/chanIcon.svg"/>
    <p class="commonColor mtop-03 fl fontBold font18" v-if="propListTitle === '알림'"> 최근 {{propListTitle}}</p>
    <p class="commonColor mtop-03 fl fontBold font18" v-else>{{propListTitle}} TOP5</p>
    <gBtnSmall v-if="propViewTab !=='A'" :btnThema="'light'" class="mtop-05" style="height: 25px; line-height: 25px;" btnTitle="더보기" v-on:click="openPop(propMoreLink)" />
  </div>
</template>
<script>
export default {
  props: {
    propListTitle: String,
    propMoreLink: {},
    propViewTab: {}
  },
  emits: ['openPop'],
  methods: {
    openPop (moreLink) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (moreLink === 'push') {
        params.targetType = 'pushList'
        params.popHeaderText = '알림'
      } else if (moreLink === 'subs') {
        params.targetType = 'chanList'
        params.popHeaderText = '채널'
      }
      this.$emit('openPop', params)
    }
  }
}
</script>
<style scoped>

 .top5TitleWrap{margin-top: 0rem; /* border-bottom: 1px solid #6768A7; */ min-height: 20px; margin-bottom: 10px}
</style>
