<template>
  <div style="width: 80%; height: 80%; border-radius: 10px; z-index: 99999; position: absolute; left: 10%; top: 10%;" @click.stop="preventDefault">
    <gConfirmPop :confirmText="mConfirmPopText" confirmType="one" @no="mConfirmPopShowYn = false" v-if="mConfirmPopShowYn"/>
    <div class="transWhite" style="width: 100%; height: 100%;  float: left; position: relative; border-radius: 10px; padding: 10px 20px; overflow: hidden;">
      <!-- <findChannelList @searchList="requestSearchList" v-if="mChanFindPopShowYn" @closePop='mChanFindPopShowYn = false' @goChannelMain='searchCloseNopenPop' /> -->
      <div class="font25 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; width: calc(100% - 25px);">
          <p class="textOverdot textLeft" style="width: calc(100% - 40px);">Guide</p>
        </div>
        <div class="cursorP" @click="pClosePop" style="width: 25px;">
          <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
      </div>
      <div @wheel="horizontalScroll" id="chanListWrap" ref="chanListWrap" class="okScrollBar" :style="calcPaddingTop" style="padding-bottom: 10px; overflow: auto; height: calc(100% - 50px); width: 100%; display: flex; gap: 10px;" @mousedown="testTwo" @mouseup="testTr">
        <img v-for="img, index in mImgList" class="h100P" :key="index" :src="img" alt="" style="border-radius: 10px;">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      mImgList: [
        '/resource/main/app1.png',
        '/resource/main/app2.png',
        '/resource/main/app3.png',
        '/resource/main/app4.png',
        '/resource/main/app5.png',
        '/resource/main/app6.png'
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
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    calcPaddingTop () {
      return {
        '--paddingTopLength': this.mPaddingTop + 'px'
      }
    },
    GE_NEW_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CHAN_LIST']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_DISP_TEAM_LIST () {
      var index = null
      var teamList = this.GE_MAIN_CHAN_LIST
      for (var i = 0; i < this.mChannelList.length; i++) {
        index = teamList.findIndex((item) => item.teamKey === this.mChannelList[i].teamKey)
        if (index !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.mChannelList[i] = teamList[index]
        }
      }
      var returnData = this.mChannelList
      return returnData
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
</style>
