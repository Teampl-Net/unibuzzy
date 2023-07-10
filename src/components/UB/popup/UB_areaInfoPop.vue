<template>
  <div v-if="pAreaInfo" ref="gPopUp" class="commonPopWrap" style="padding: 10px 20px;">
    <div class="font25 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; width: calc(100% - 25px);">
        <img style="width: 40px; margin-right: 5px;" src="/resource/logo/gtLogo.png" alt="">
        <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ pAreaInfo.name }}</p>
      </div>
      <div class="cursorP" @click="pClosePop" style="width: 25px;">
        <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
      </div>
    </div>
    <div class="w100P" style="height: calc(100% - 50px); overflow: auto; padding-top: 35px;">
      <div class="w100P" style="display: flex; align-items: center;">
        <img style="width: 25px; margin-right: 5px;" src="@/assets/images/common/icon_pencil.svg" alt="">
        <p class="fontBold font20">Description</p>
      </div>
      <p class="textLeft font20" style="margin-left: 30px; width: calc(100% - 30px);">{{ pAreaInfo.description }}</p>
      <div class="w100P" style="background: rgba(255, 255, 255, 0.5); border-radius: 10px; padding: 10px; display: flex; margin-top: 10px;">
        <p style="width: 50%; border-right: 2px solid #000;">
          <span class="fontBold">{{ pAreaInfo.buildingList.length }}</span> channels
        </p>
        <p style="width: 50%;">
          <span class="fontBold">0</span> followers
        </p>
      </div>
      <div class="w100P" style="margin-top: 35px;">
        <div class="w100P textLeft" style="display: flex; align-items: center;">
          <img style="width: 25px; margin-right: 5px;" src="@/assets/images/contents/icon_heart_on.png" alt="">
          <p class="fontBold font20">Favorites</p>
        </div>
        <div style=" margin-left: 30px; margin-top: 10px; width: calc(100% - 30px);">
          <div class="w100P" v-if="pAreaInfo.buildingList.length > 0" id="fileChannelWrap" style="height: 85px; overflow: auto;" @wheel="horizontalScroll">
            <div class="w100P" style="height: 100%; min-width: 100%; display:flex;">
              <chanRoundIcon :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="chan" v-for="chan in pAreaInfo.buildingList" :key="chan.teamKey" />
              <template v-if="pAreaInfo.buildingList.length === 0">
                  <circleSkeleton v-for="(value) in 10" :key="value"/>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="w100P" style="margin-top: 35px;">
        <div class="w100P" style="display: flex; align-items: center;">
          <img style="width: 25px; margin-right: 5px;" src="@/assets/images/common/icon_popular.svg" alt="">
          <p class="fontBold font20">Popular</p>
        </div>
        <div class="w100P" style="height: 200px; display: flex;">
          <div class="h100P" style="width: 33%;">
            <div style="height: 70%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaInfo.buildingList[0]" />
            </div>
            <div class="fontBold font20" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 30%; background-color:slateblue; border-top-left-radius: 10px;">2</div>
          </div>
          <div style="width: 33%;">
            <div style="height: 50%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaInfo.buildingList[0]" :pBestYn="true" />
            </div>
            <div class="fontBold font20" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 50%; background-color:slateblue; border-top-left-radius: 10px; border-top-right-radius: 10px;">1</div>
          </div>
          <div style="width: 33%;">
            <div style="height: 70%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaInfo.buildingList[0]"/>
            </div>
            <div class="fontBold font20" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 30%; background-color:slateblue; border-top-right-radius: 10px;">3</div>
          </div>
        </div>
        <div class="w100P" style="margin-top: 35px;">
          <div class="w100P" style="display: flex; align-items: center;">
            <img style="width: 25px; margin-right: 5px;" src="@/assets/images/bottom/icon_search.svg" alt="">
            <p class="fontBold font20">All List</p>
          </div>
          <div class="w100P" style="padding-bottom: 30px;">
            <gEmpty :tabName="mCurrentTabName" contentName="채널" v-if="pAreaInfo.buildingList.length === 0" style="margin-top:50px;" />
            <template v-for="(chanEle, index) in pAreaInfo.buildingList" :key="index">
              <channelCard class="moveBox chanRow" :chanElement="chanEle" @openPop="openPop" @scrollMove="scrollMove" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import chanRoundIcon from '../infoBox/UB_chanRoundIcon.vue'
export default {
  components: {
    chanRoundIcon
  },
  created () {
    console.log('----------------****************pAreaInfo')
    console.log(this.pAreaInfo)
    this.settingPop()
    localStorage.setItem('notiReloadPage', 'none')
  },
  data () {
    return {
      mLoadingYn: false,
      mPopId: null,
      mOpenChanMenuYn: false,
      mPopParams: '',
      mPopShowYn: false
    }
  },
  methods: {
    goChannelMain (param) {
      const pageParam = {}
      pageParam.targetKey = param.teamKey
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    openChanMenu () {
      this.openChanMenuYn = true
    },
    openPop (params) {
      console.log(params)
      this.mPopParams = params
      this.mPopShowYn = true
    },
    async settingPop () {
      if (this.parentPopN !== undefined && this.parentPopN !== null && this.parentPopN !== '') {
        this.mPopN = Number(this.parentPopN) + 1
      } else {
        this.mPopN = 100
      }
      if (!this.mPopId) {
        this.mPopId = 'gPopup' + this.mPopN
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', this.mPopId)
      } catch (error) {
        console.log(error)
      }
    },
    async closePop () {
      console.log('**** closePop ****')
      console.log(this.mTargetType)
      if (this.mTargetType === 'editMemberTypePop') {
        this.$refs.editMemberTypePop.refreshList()
      }
      this.mPopShowYn = false
      var gPopHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      gPopHistory = gPopHistory.filter((element, index) => index < gPopHistory.length - 1)
      this.$store.dispatch('D_HISTORY/AC_UPDATE_GPOP_STACK', gPopHistory)
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
    }
  },
  props: {
    propParams: {},
    parentPopN: {},
    pAreaInfo: {},
    pClosePop: {},
    pMoveToChan: Function
  }
}
</script>
<style scoped>
.commonPopWrap{
  position: absolute;width: 90%;height: 90%; ;z-index: 9999999; background: #FFFFFF; overflow: hidden;
  bottom: 0;
  left: 5%;
  background: rgba(232, 240, 250, 0.65);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 9px );
  -webkit-backdrop-filter: blur( 9px );
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
</style>
