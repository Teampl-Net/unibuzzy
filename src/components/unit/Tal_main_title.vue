
<template>
  <div class="top5TitleWrap textLeft">
    <img style="width: 1.2rem; " v-if="listTitle === '알림'" class="mright-03 mtop-03 fl" src="../../assets/images/main/icon_notice.png"/>
    <img style="width: 1.2rem; " v-else-if="listTitle === '채널'" class="mright-03 mtop-02 fl" src="../../assets/images/main/icon_channel.png"/>
    <p class="commonColor mtop-03 fl fontBold font16">{{listTitle}} TOP5</p>
    <gBtnSmall :btnThema="'light'" class="mtop-03" style="height: 25px; line-height: 25px;" btnTitle="더보기" v-on:click="openPop(moreLink)" />
  </div>
</template>
<script>
export default {
  created () {
  },
  mounted () {
  },
  data: function () {
    return { // 데이터 정의
    }
  },
  props: {
    listTitle: String,
    moreLink: {}
  },
  emits: ['openPop'],
  methods: {
    openPop (moreLink) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (moreLink === 'push') {
        params.targetType = 'pushList'
      } else if (moreLink === 'subs') {
        params.targetType = 'chanList'
      }
      this.$emit('openPop', params)
      // alert(JSON.stringify(params))
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    }
  }
}
</script>
