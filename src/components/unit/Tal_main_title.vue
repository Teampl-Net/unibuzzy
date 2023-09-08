<i18n>
{
  "ko": {
    "MY_TITLE_RECE_ALIM": "최근 알림",
    "MY_TITLE_TOP5_CHAN": "채널 TOP5"
  },
  "en": {
    "MY_TITLE_RECE_ALIM": "Recent Contents",
    "MY_TITLE_TOP5_CHAN": "Top 5 Channels"
  }
}
</i18n>
<template>
  <div class="top5TitleWrap textLeft">
    <img v-if="propListTitle === '알림' || propListTitle === '내 컨텐츠'" class="mright-03 fl pushImg"  src="../../assets/images/main/pushIcon.svg"/>
    <img v-else-if="propListTitle === '채널'" class="mright-03 mtop-05 fl chanImg" src="../../assets/images/main/chanIcon.svg"/>
    <p class="commonColor mtop-03 fl fontBold font18" v-if="propListTitle === '알림'"> {{ $t('MY_TITLE_RECE_ALIM') }}</p>
    <p class="commonColor mtop-03 fl fontBold font18" v-else-if="propListTitle === '내 컨텐츠'">My Contents</p>
    <p class="commonColor mtop-03 fl fontBold font18" v-else>{{ $t('MY_TITLE_TOP5_CHAN') }}</p>
    <gBtnSmall v-if="propListTitle !== '내 컨텐츠'" :btnThema="'light'" class="mtop-05 moreBtn" :btnTitle="$t('COMMON_NAME_MORE')" v-on:click="openPop(propMoreLink)" />
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
