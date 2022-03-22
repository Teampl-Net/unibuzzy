
<template>
  <div class="top5TitleWrap textLeft">
    <img style="width: 1.4rem; " v-if="listTitle === '알림'" class="mr-04 fl" src=""/>
    <img style="width: 1.4rem; " v-else-if="listTitle === '채널'" class="mr-04 fl" src=""/>
    <img style="width: 1.4rem; " class="mr-04" src="../../assets/images/main/icon_notice.png"/>
    <span class="commonColor fontBold font20">{{listTitle}} TOP5</span>
    <gBtnSmall :btnThema="'deep'" :btnTitle="this.moreBtnTitle" v-on:click="openPop(moreLink)" />
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
      // this.$router.push({ name: 'pushDetail', params: { pushKey: idx } })
    }
  }
}
</script>
