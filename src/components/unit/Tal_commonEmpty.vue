<template>
<div class="w-100P fl">
  <img src="../../assets/images/common/icon_box_empty.svg" style="width:50px;" alt="">
  <p class="mtop-05 font18 fontBold commonColor">{{midleText}}</p>
</div>

</template>
<script>
export default {
  data () {
    return {
      midleText: ''
    }
  },
  props: {
    tabName: { type: String, default: '최신' },
    contentName: { type: String, default: '알림' }
  },
  created () {
    if (this.contentName === '알림') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('COMM_EMPTY_ALIM')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('COMM_EMPTY_LIKED_ALIM')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('COMM_EMPTY_SCRAP_ALIM')
      } else if (this.tabName === '내가 보낸') {
        this.midleText = this.$t('COMM_EMPTY_ALIM_SEND')
      }
    } else if (this.contentName === '채널') {
      if (this.tabName === '구독중') {
        this.midleText = this.$t('COMM_EMPTY_NO_CHANNEL')
      } else if (this.tabName === '내 채널') {
        this.midleText = this.$t('COMM_EMPTY_NO_MANAGE_CHANNEL')
      } else if (this.tabName === '전체') {
        this.midleText = this.$t('COMM_EMPTY_NO_CHANNEL_FOUND')
      } else {
        this.midleText = this.$t('COMM_EMPTY_NO_DATA')
        // this.midleText = '현재 서비스에 문제가 있습니다. 잠시후 다시 시도해보세요.'
      }
    } else if (this.contentName === '게시판') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('COMM_EMPTY_NO_POST')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('COMM_EMPTY_NO_LIKED_POST')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('COMM_EMPTY_NO_SCRAP')
      } else if (this.tabName === '내가 쓴') {
        this.midleText = this.$t('COMM_EMPTY_NO_IPSOT')
      }
    } else if (this.contentName === '전체') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('COMM_EMPTY_NO_CONTENT')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('COMM_EMPTY_NO_LIKED_CONTENT')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('COMM_EMPTY_NO_SCRAP_CONTENT')
      } else if (this.tabName === '내가 보낸') {
        this.midleText = this.$t('COMM_EMPTY_NO_CONTENT_SEND')
      }
    } else if (this.contentName === '파일함') {
      this.midleText = this.$t('COMM_EMPTY_FILE')
    }
  }
}
</script>
<style>

</style>
