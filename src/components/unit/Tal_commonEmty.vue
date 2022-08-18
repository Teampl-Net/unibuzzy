<template>
<div class="w-100P fl">
  <img src="../../assets/images/common/icon_box_empty.svg" style="width:50px;" alt="">
  <p class="mtop-05 font18 fontBold">{{midleText}}</p>
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
        this.midleText = '최근 받은 알림이 없습니다.'
      } else if (this.tabName === '좋아요') {
        this.midleText = '좋아요를 누른 알림이 없습니다.'
      } else if (this.tabName === '스크랩') {
        this.midleText = '스크랩을 한 알림이 없습니다.'
      } else if (this.tabName === '내가 보낸') {
        this.midleText = '내가 보낸 알림이 없습니다.'
      }
    } else if (this.contentName === '채널') {
      if (this.tabName === '구독중') {
        this.midleText = '구독중인 채널이 없습니다.'
      } else if (this.tabName === '내 채널') {
        this.midleText = '내가 관리하는 채널이 없습니다.'
      } else {
        this.midleText = '현재 서비스에 문제가 있습니다. 잠시후 다시 시도해보세요.'
      }
    } else if (this.contentName === '게시판') {
      if (this.tabName === '최신') {
        this.midleText = '작성된 게시글이 없습니다.'
      } else if (this.tabName === '좋아요') {
        this.midleText = '좋아요를 누른 게시글이 없습니다.'
      } else if (this.tabName === '스크랩') {
        this.midleText = '스크랩을 한 게시글이 없습니다.'
      } else if (this.tabName === '내가 쓴') {
        this.midleText = '내가 쓴 게시글이 없습니다.'
      }
    }
  }
}
</script>
<style>

</style>
