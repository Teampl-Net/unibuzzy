<template>
  <div v-if="$route.path !== '/chanList'" class="commonPopHeaderWrap" style="background:transparent !important;">
    <div @click="goMain" class="fl cursorP " style="min-width: 70px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img v-if="mBlackYn === true && targetType !== 'boardMain'" src="../../../assets/images/common/icon_back_white.png" class=" commonPopBackBtn" >
      <img v-else-if="pNoAuthYn === true " src="../../../assets/images/footer/icon_home_fillin.svg">
      <img v-else src="../../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <span @click="test" class="popHeaderTitleSpan font20" :style="bgblack === true ? 'color:white;':'' ">
      {{this.$changeText(headerTitle)}}
    </span>
    <div v-if="targetType === 'chanDetail' && chanAlimListTeamKey" class="chanMenubar cursorP" @click="openMenu">
      <img v-if="mBlackYn === true " src="../../../assets/images/common/icon_menu_white.png" style="width:1.8rem;"/>
      <img v-else src="../../../assets/images/common/icon_menu.png" style="width:1.8rem;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UBChanHeader',
  props: {
    chanAlimListTeamKey: {},
    bgblack: { type: Boolean, default: false },
    targetType: {},
    pChanInfo: Object
  },
  data () {
    return {
      mBlackYn: false,
      blackYn: this.pChanInfo.initData.team.content['0'].blackYn
    }
  },
  mounted () {
    this.$addHistoryStack('chanMain')
    console.log('pChanInfo', this.pChanInfo)
  },
  beforeUnmount () {
    this.$checkDeleteHistory('chanMain')
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'chanMain') {
        this.goMain()
      }
    },
    pChanInfo: {
      immediate: true,
      handler (newVal, oldVal) {
        if (!newVal) return
        if (newVal.initData && newVal.initData.team) {
          console.log('val.initData', newVal.initData)
          if (newVal.initData.team.content['0'].blackYn === 1) {
            this.mBlackYn = true
          } else {
            this.mBlackYn = false
          }
          if (newVal !== oldVal) {
            // location.reload()
            this.refreshContent()
          }
        }
      },
      deep: true
    }
  },
  methods: {
    hasHistory () {
      return window.history.length > 1
    },
    refreshContent () {
      this.$forceUpdate()
    },
    async goMain () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      if (this.hasHistory()) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
      // this.$router.go(-1)
      // this.$router.replace({ path: '/' })
    },
    openMenu () {
      this.$emit('openMenu')
    },
    // closeXPop () {
    //   this.$emit('closeXPop', 'main')
    // },
    sendBtnClick () {
      this.$emit('sendOk')
    }
  }
}
</script>
<style scoped>
.commonPopHeaderWrap{
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 0;
  box-sizing: border-box; display: flex;
  padding: 0.7rem 0.5rem;
  width: 100%; height: 50px;
  list-style: none;
  text-align: center;
  z-index: 10;
  background: #FFF;
}

.popHeaderTitleSpan{position: absolute; color: #6768A7; font-weight: bold; width:70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
.commonPopBackBtn{width: 0.8rem;}

.chanMenubar{
  position: absolute;
  right: 1rem;
}
</style>
