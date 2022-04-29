
<template>
  <div class="top5TitleWrap textLeft">
    <img style="width: 1.2rem; " v-if="listTitle === '알림'" class="mright-03 mtop-03 fl" src="../../assets/images/main/icon_notice.png"/>
    <img style="width: 1.2rem; " v-else-if="listTitle === '채널'" class="mright-03 mtop-02 fl" src="../../assets/images/main/icon_channel.png"/>
    <p class="commonColor mtop-03 fl fontBold font16">{{listTitle}} TOP5</p>
    <gBtnSmall :btnThema="'deep'" class="mtop-03" :btnTitle="this.moreBtnTitle" v-on:click="openPop(moreLink)" />
  </div>
</template>
<script>
export default {
  mounted () {
  },
  data: function () {
    return { // 데이터 정의
      moreBtnTitle: '더보기'
    }
  },
  props: {
    listTitle: String,
    moreLink: {}
  },
  emits: ['openPop'],
  methods: {
    openPop (moreLink) {
      // alert(true)
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (moreLink === 'push') {
        params.targetType = 'pushList'
      } else if (moreLink === 'subs') {
        params.targetType = 'chanList'
      }
      this.$emit('openPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    }
  }
}
</script>
