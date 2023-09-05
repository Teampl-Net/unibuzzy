<template>
  <div v-if="$route.path !== '/chanList'" class="commonPopHeaderWrap chanMainHeader">
    <div @click="goMain" class="fl cursorP mainBackBtn">
      <!-- <img v-if="mBlackYn === false && targetType !== 'boardMain'" src="../../../assets/images/common/icon_back_white.png" class=" commonPopBackBtn" > -->
      <img v-if="targetType !== 'boardMain'" :src="dynamicSrc()" class=" commonPopBackBtn" >
      <img class=" commonPopBackBtn" v-else src="@/assets/images/common/icon_back.png">
      <!-- <img v-else-if="mBlackYn === true" src="../../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" > -->
    </div>
    <span class="popHeaderTitleSpan font20" :style="bgblack === true ? 'color:white;':'' ">
      {{this.$changeText(headerTitle)}}
    </span>
    <div v-if="targetType === 'chanDetail' && chanAlimListTeamKey" class="chanMenubar cursorP" @click="openMenu">
      <img :src="dynamicSrcMenu()" style="width:1.8rem;"/>
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
      blackYn: false,
      imageSrc: '',
      mChanInfo: this.pChanInfo
    }
  },
  created () {
    if (this.pChanInfo && this.pChanInfo.initData && this.pChanInfo.initData.content && this.pChanInfo.initData.team.content[0].blackYn) {
      this.blackYn = this.pChanInfo.initData.team.content[0].blackYn
    }
    this.$addHistoryStack('chanMain')
  },
  beforeUnmount () {
    // this.$checkDeleteHistory('chanMain')
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
    },
    CHANNEL_DETAIL () {
      if (!this.pChanInfo && !this.mDirectTeamKey) return {}
      let teamKey
      if (this.pChanInfo) {
        teamKey = this.pChanInfo.targetKey || this.pChanInfo.teamKey
      } else if (this.mDirectTeamKey) {
        teamKey = this.mDirectTeamKey.teamKey
      }
      var detail = this.$getDetail('TEAM', teamKey)

      if (detail && detail.length > 0) {
        if (detail[0].blackYn) this.$emit('bgcolor', detail[0].blackYn)

        if (
          detail[0] &&
          detail[0].blackYn !== undefined &&
          detail[0].blackYn !== null &&
          detail[0].blackYn !== ''
        ) {
          this.$emit('bgcolor', detail[0].blackYn)
        } else {
          this.$emit('bgcolor', false)
        }
        if (
          !detail[0].D_CHAN_AUTH ||
          detail[0].D_CHAN_AUTH === true ||
          (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          if (
            this.CHANNEL_DETAIL &&
            this.CHANNEL_DETAIL.blackYn !== undefined &&
            this.CHANNEL_DETAIL.blackYn !== null &&
            this.CHANNEL_DETAIL.blackYn !== ''
          ) {
            this.$emit('bgcolor', this.CHANNEL_DETAIL.blackYn)
          } else {
            this.$emit('bgcolor', false)
          }
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'router$#$chanList') {
        this.goMain()
      }
    },
    CHANNEL_DETAIL: {
      immediate: true,
      handler (value, old) {
        if (value && value.D_CHAN_AUTH && value.D_CHAN_AUTH.followYn) {
          this.$emit('followYn')
        } else if (value && value.D_CHAN_AUTH && !value.D_CHAN_AUTH.followYn) {
          this.mUnknownYn = true
        }
        var blackYn = false
        if (
          value &&
          value.blackYn !== undefined &&
          value.blackYn !== null &&
          value.blackYn !== ''
        ) {
          if (value.blackYn === 1) {
            blackYn = true
          }
        }
        this.$emit('bgcolor', blackYn)
      },
      deep: true
    },
    pChanInfo: {
      immediate: true,
      handler (val) {
        var blackYn = false
        if (!val) return
        setTimeout(() => {
          if (val.initData && val.initData.team) {
            if (val.initData.team.content['0']) {
              if (val.initData.team.content['0'].blackYn === 1) { // white
                blackYn = false
              } else if (val.initData.team.content['0'].blackYn === 0) { // default
                blackYn = true
              }
            }
          }
          // console.log('val.initData', val.initData)
        }, 0)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', blackYn)
        this.dynamicSrc()
      },
      deep: true
    }
  },
  methods: {
    dynamicSrc () {
      if (this.CHANNEL_DETAIL) {
        if (this.CHANNEL_DETAIL.blackYn === 1) {
          return require('@/assets/images/common/icon_back_white.png')
        } else if (this.CHANNEL_DETAIL.blackYn === 0) {
          return require('@/assets/images/common/icon_back.png')
        }
      }
    },
    dynamicSrcMenu () {
      if (this.CHANNEL_DETAIL) {
        if (this.CHANNEL_DETAIL.blackYn === 1) {
          return require('@/assets/images/common/icon_menu_white.png')
        } else if (this.CHANNEL_DETAIL.blackYn === 0) {
          return require('@/assets/images/common/icon_menu.png')
        }
      }
    },
    hasHistory () {
      return window.history.length > 1
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
.chanMainHeader {
  background-color: transparent !important;
}
.mainBackBtn {
  min-width: 70px;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 1rem;
}
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
