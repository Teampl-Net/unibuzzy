<template>
  <div class="top5TitleWrap textLeft">
    <img class="mright-03 fl pushImg"  src="@/assets/images/main/pushIcon.svg"/>
    <p class="commonColor mtop-03 fl fontBold font18" v-if="propListTitle === '내 컨텐츠'">My Contents</p>
    <gBtnSmall v-if="propListTitle !== '내 컨텐츠'" :btnThema="'light'" class="mtop-05 moreBtn" :btnTitle="$t('COMMON_NAME_MORE')" v-on:click="openPop(propMoreLink)" />
  </div>
</template>
<script>
export default {
  props: {
    propListTitle: String,
    propMoreLink: {}
  },
  emits: ['openPop'],
  methods: {
    openPop (moreLink) {
      var params = {}
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
.top5TitleWrap {
  margin-top: 0rem;
  /* border-bottom: 1px solid #6768A7; */
  min-height: 20px;
  margin-bottom: 10px
}
.pushImg {
  width: 1.2rem;
  margin-top: 0.4rem;
}
.chanImg {
  width: 1.2rem;
}
.moreBtn {
  height: 25px !important;
  line-height: 25px !important;
}
</style>
