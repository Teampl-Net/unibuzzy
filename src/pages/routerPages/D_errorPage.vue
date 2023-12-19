<template>
  <div style="width: 100%; height: 100%; padding-top: 50px;float: left; background: #FFF; display: flex; flex-direction: column; ">
    <div style="width: 100%; diplay: flex; justify-content: center; align-items: center;">
      <img style="width: 50px;" src="@/assets/images/common/errorPageIcon.svg" alt="">
    </div>
    <p class="textCenter fontBold font20 commonColor">잘못된 접근입니다</p>
    <p class="textCenter fontBold font18 grayBlack">({{ mTimeOutCnt }}초 뒤에 자동으로 창이 닫힙니다)</p>
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
  methods: {
    startTimmer () {
      setInterval(() => {
        this.mTimeOutCnt -= 1
      }, 1000)
    }
  }
}
</script>
<style scoped></style>
