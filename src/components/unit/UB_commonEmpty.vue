<i18n>
  {
    "ko": {
      "EMPT_MSG_NORECENT_NOTI": "최근 받은 알림이 없습니다.",
      "EMPT_MSG_NOLIKE_NOTI": "좋아요를 누른 알림이 없습니다.",
      "EMPT_MSG_NOLIKE_POST": "좋아요를 누른 게시글이 없습니다.",
      "EMPT_MSG_NOLIKE_CONT": "좋아요를 누른 컨텐츠가 없습니다.",
      "EMPT_MSG_NOSAVE_NOTI": "스크랩을 한 알림이 없습니다.",
      "EMPT_MSG_NOSAVE_POST": "스크랩을 한 게시글이 없습니다.",
      "EMPT_MSG_NOSAVE_CONT": "스크랩을 한 컨텐츠가 없습니다.",
      "EMPT_MSG_NOWRITE_NOTI": "내가 보낸 알림이 없습니다.",
      "EMPT_MSG_NOWRITE_POST": "내가 쓴 게시글이 없습니다.",
      "EMPT_MSG_NOWRITE_CONT": "내가 쓴 컨텐츠가 없습니다.",
      "EMPT_MSG_NONE_SUB": "구독중인 채널이 없습니다",
      "EMPT_MSG_NONE_MYCHANN": "내가 관리하는 채널이 없습니다.",
      "EMPT_MSG_LOOK_CHANN": "조회된 채널이 없습니다.",
      "ERROR_MSG_SERVICE_PROB": "현재 서비스에 문제가 있습니다. 잠시후 다시 시도해보세요.",
      "EMPT_MSG_NO_POST": "작성된 게시글이 없습니다.",
      "EMPT_MSG_NO_FILE": "업로드한 파일이 없습니다.",
      "EMPT_MSG_NO_FAV": "즐겨찾기한 채널이 없습니다"
    },
    "en": {
      "EMPT_MSG_NORECENT_NOTI": "No new notifications",
      "EMPT_MSG_NOLIKE_NOTI": "There are no notifications for likes.",
      "EMPT_MSG_NOLIKE_POST": "There are no posts with likes.",
      "EMPT_MSG_NOLIKE_CONT": "There are no content with likes.",
      "EMPT_MSG_NOSAVE_NOTI": "No bookmarked notifications.",
      "EMPT_MSG_NOSAVE_POST": "No bookmarked posts.",
      "EMPT_MSG_NOSAVE_CONT": "No bookmarked content.",
      "EMPT_MSG_NOWRITE_NOTI": "There are no noti sent by you.",
      "EMPT_MSG_NOWRITE_CONT": "You haven't written any content.",
      "EMPT_MSG_NOWRITE_POST": "You haven't written any posts.",
      "EMPT_MSG_NONE_SUB": "You haven't subscribed to any channels.",
      "EMPT_MSG_NONE_MYCHANN": "You are not currently managing any channels.",
      "EMPT_MSG_LOOK_CHANN": "No channels were found in the search.",
      "ERROR_MSG_SERVICE_PROB": "Apologies! We're currently facing some technical difficulties. Please try again later.",
      "EMPT_MSG_NO_POST": "You have not written any content.",
      "EMPT_MSG_NO_FILE": "No uploaded files found.",
      "EMPT_MSG_NO_SAVED": "No saved contents found.",
      "EMPT_MSG_NO_FAV": "There is no channel"
    }
  }
</i18n>
<template>
<div class="w100P fl">
  <img class="emptyImg" src="../../assets/images/common/icon_box_empty.svg" alt="">
  <p class="mtop-05 font14 fontBold commonColor">{{midleText}}</p>
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
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  wathch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
      },
      deep: true
    }
  },
  created () {
    if (this.contentName === '알림') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('EMPT_MSG_NORECENT_NOTI')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('EMPT_MSG_NOLIKE_NOTI')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('EMPT_MSG_NOSAVE_NOTI')
      } else if (this.tabName === '내가 보낸') {
        this.midleText = this.$t('EMPT_MSG_NOWRITE_NOTI')
      }
    } else if (this.contentName === '채널') {
      if (this.tabName === '구독중') {
        this.midleText = this.$t('EMPT_MSG_NONE_SUB')
      } else if (this.tabName === '내 채널') {
        this.midleText = this.$t('EMPT_MSG_NONE_MYCHANN')
      } else if (this.tabName === '전체') {
        this.midleText = this.$t('EMPT_MSG_LOOK_CHANN')
      } else if (this.tabName === '즐겨찾기') {
        this.midleText = this.$t('EMPT_MSG_NO_FAV')
      } else {
        this.midleText = this.$t('ERROR_MSG_SERVICE_PROB')
      }
    } else if (this.contentName === '게시판') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('EMPT_MSG_NO_POST')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('EMPT_MSG_NOLIKE_POST')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('EMPT_MSG_NOSAVE_POST')
      } else if (this.tabName === '내가 쓴') {
        this.midleText = this.$t('EMPT_MSG_NOWRITE_POST')
      }
    } else if (this.contentName === '전체') {
      if (this.tabName === '최신') {
        this.midleText = this.$t('COMM_CONT_NO_FOUND')
      } else if (this.tabName === '좋아요') {
        this.midleText = this.$t('EMPT_MSG_NOLIKE_CONT')
      } else if (this.tabName === '스크랩') {
        this.midleText = this.$t('EMPT_MSG_NOSAVE_CONT')
      } else if (this.tabName === '내가 보낸') {
        this.midleText = this.$t('EMPT_MSG_NOWRITE_CONT')
      }
    } else if (this.contentName === '파일함') {
      this.midleText = this.$t('EMPT_MSG_NO_FILE')
    }
  }
}
</script>
<style>
.emptyImg {
  width: 50px;
}
</style>
