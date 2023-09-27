<i18n>
{
  "ko": {
    "ERROR_MSG_WRONG": "잘못된 접근입니다."
  },
  "en": {
    "ERROR_MSG_WRONG": "Wrong approach."
  }
}
</i18n>
<template>
  <div class="errorPageWrap">
    <div class="errorPageTop">
      <img src="@/assets/images/common/errorPageIcon.svg" alt="">
    </div>
    <p class="textCenter fontBold font20 commonColor">잘못된 접근입니다</p>
    <p class="textCenter fontBold font18 grayBlack">({{ GE_LOCALE === 'ko'? `${mTimeOutCnt}초 뒤에 자동으로 창이 닫힙니다.` : `It closes automatically in ${mTimeOutCnt} seconds` }})</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mTimeOutCnt: 5
    }
  },
  mounted () {
    this.startTimmer()
  },
  watch: {
    mTimeOutCnt (val) {
      if (val === 0) {
        self.close()
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    startTimmer () {
      setInterval(() => {
        this.mTimeOutCnt -= 1
      }, 1000)
    }
  }
}
</script>
<style scoped>
.errorPageWrap {
  width: 100%;
  height: 100%;
  padding-top: 50px;
  float: left;
  background: #FFF;
  display: flex;
  flex-direction: column;
}
.errorPageTop {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.errorPageTop > img {
  width: 50px;
}
</style>
