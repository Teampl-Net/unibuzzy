<template>
  <div class="guidePopWrap" @click.stop="preventDefault">
    <gConfirmPop :confirmText="mConfirmPopText" confirmType="one" @no="mConfirmPopShowYn = false" v-if="mConfirmPopShowYn"/>
    <div class="transWhite guidePopBox">
      <div class="font25 fontBold w100P guidePopHeader">
        <div class="guidePopTitle">
          <p class="textOverdot textLeft">Guide</p>
        </div>
        <div class="cursorP closeBox" @click="pClosePop">
          <img class="w100P" src="@/assets/images/common/popup_close.png" alt="">
        </div>
      </div>
      <div @wheel="horizontalScroll" id="chanListWrap" ref="chanListWrap" class="okScrollBar contentsWrap" :style="calcPaddingTop" @mousedown="testTwo" @mouseup="testTr">
        <img v-for="img, index in mImgList" class="w100P" :key="index" :src="img" alt="guideImg">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mImgList: [
        '/resource/main/guide1.png',
        '/resource/main/guide2.png',
        '/resource/main/guide3.png',
        '/resource/main/guide4.png',
        '/resource/main/guide5.png',
        '/resource/main/guide6.png',
        '/resource/main/guide7.png'
      ]
    }
  },
  props: {
    pClosePop: Function
  },
  methods: {
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var scrollWrap = document.querySelector(`#${e.currentTarget.id}`)
      scrollWrap.scrollTo({
        left: scrollWrap.scrollLeft + e.deltaY / 5
      })
    },
    closeXPop () {
      if (this.pClosePop) this.pClosePop()
    }
  },
  created () {
    this.$addHistoryStack('guidePop')
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    calcPaddingTop () {
      return {
        '--paddingTopLength': this.mPaddingTop + 'px'
      }
    }
  },
  watch: {
    pageUpdate () {
      if (this.pClosePop && this.history[this.history.length - 1] === 'selectSchoolPop') {
        this.pClosePop()
      }
    }
  }
}
</script>
<style scoped>
.guidePopWrap {
  width: 90%;
  height: 60%;
  border-radius: 10px;
  z-index: 99999;
  position: absolute;
  left: 5%;
  top:20%;
}
.guidePopBox {
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
  border-radius: 10px;
  padding: 10px 20px;
  overflow: hidden;
}
.guidePopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.guidePopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.guidePopTitle > p {
  width: calc(100% - 40px);
}
.closeBox {
  width: 25px;
}
.contentsWrap {
  padding-bottom: 10px;
  overflow: auto;
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  gap: 10px;
}
.contentsWrap > img {
  border-radius: 10px;
}
</style>
