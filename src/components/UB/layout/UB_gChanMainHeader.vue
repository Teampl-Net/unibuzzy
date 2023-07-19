<template>
  <div class="commonPopHeaderWrap" style="background:transparent !important;">
    <div v-on:click="goMain" class="fl cursorP " style="min-width: 70px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img v-if="mBlackYn === true && targetType !== 'boardMain'" src="../../../assets/images/common/icon_back_white.png" v-on:click="closeXPop" class=" commonPopBackBtn" >
      <img v-else-if="pNoAuthYn === true " src="../../../assets/images/footer/icon_home_fillin.svg"  v-on:click="goMain">
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
      mBlackYn: false
    }
  },
  watch: {
    pChanInfo: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val.initData && val.initData.team) {
          if (val.initData.team.blackYn === 1) {
            this.mBlackYn = true
          } else {
            this.mBlackYn = false
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
    async goMain () {
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
    closeXPop () {
      this.$emit('closeXPop', 'main')
    },
    sendBtnClick () {
      this.$emit('sendOk')
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>
<style scoped>
.commonPopHeaderWrap{ position: fixed; justify-content: center; align-items: center;  left: 0;
  box-sizing: border-box; display: flex;
  padding: 0.7rem 0.5rem;
  width: 100%; height: 50px; list-style: none; text-align: center; z-index: 10; background: #FFF; }

.popHeaderTitleSpan{position: absolute; color: #6768A7; font-weight: bold; width:70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
.commonPopBackBtn{width: 0.8rem;}

.chanMenubar{
  position: absolute;
  right: 1rem;
}
</style>
