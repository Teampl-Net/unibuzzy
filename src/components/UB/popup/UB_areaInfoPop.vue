<template>
  <div v-if="pAreaInfo && pAreaDetail" class="commonPopWrap" style="padding: 10px 20px; min-width: 300px; position: absolute;" @click.stop>
    <img src="@/assets/images/button/Icon_CreChanBtn.png" @click="pOpenCreChanPop" alt="채널 만들기 버튼" style="position: absolute; cursor: pointer; right: 10%; bottom: 20px; width: 50px; height: 50px;" >
    <div style="position: absolute; top: -45px; right: 10px; width: 40px; height: 45px; background-color: rgba(255, 255, 255, 0.5); border-radius: 10px 10px 0 0; padding: 5px;">
      <img v-if="pBdClickedYn" src="../../../assets/images/main/icon_bd.png" class="h100P" />
      <img v-else src="../../../assets/images/main/icon_area.png" class="h100P" />
    </div>
    <div class="font16 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; width: calc(100% - 25px);">
        <img style="width: 45px; margin-right: 5px;" src="/resource/logo/gtLogo.png" alt="">
        <p class="textOverdot textLeft font25" style="width: calc(100% - 40px);">{{ pAreaInfo.bdAreaNameMtext }}</p>
        <!-- <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ bdAreaNameMtext }}</p> -->
      </div>
      <div class="cursorP" @click="closeXPop" style="width: 25px;">
        <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
      </div>
    </div>
    <div class="w100P" style="height: calc(100% - 50px); overflow: auto; padding-top: 15px;">
      <div class="w100P" style="display: flex; align-items: center;">
        <img style="width: 25px; margin-right: 5px;" src="@/assets/images/common/icon_pencil.svg" alt="">
        <!-- Description -->
        <p class="fontBold font16">Description</p>
      </div>
      <p class="textLeft font16" style="margin-left: 30px; width: calc(100% - 30px);">{{ pAreaInfo.bdAreaDesc }}</p>
      <div class="w100P" style="background: rgba(255, 255, 255, 0.5); border-radius: 10px; padding: 10px; display: flex; margin-top: 10px;">
        <p style="width: 50%; border-right: 2px solid #000;">
          <span class="fontBold">{{ pAreaInfo.bdList && pAreaInfo.bdList.length? pAreaInfo.bdList.length:'0' }}</span> channels
        </p>
        <p style="width: 50%;">
          <span class="fontBold">{{ pAreaDetail.followerCount? pAreaDetail.followerCount:0 }}</span> followers
        </p>
      </div>
      <div class="w100P" style="margin-top: 35px;">
        <div class="w100P textLeft" style="display: flex; align-items: center;">
          <img style="width: 25px; margin-right: 5px;" src="@/assets/images/contents/icon_heart_on.png" alt="">
          <!--Favorites -->
          <p class="fontBold font16">Favorites</p>
        </div>
        <div v-if="pAreaDetail.fList&& pAreaDetail.fList.length > 0" style=" margin-top: 10px; width: 100%;">
          <div class="w100P" id="fileChannelWrap" style="height: 85px; overflow: auto;" @wheel="horizontalScroll">
            <div class="w100P" style="height: 100%; min-width: 100%; display:flex;">
              <chanRoundIcon @click="goChannelMain(chan)" :pAreaInfo="pAreaInfo" :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="chan" v-for="chan in pAreaDetail.fList" :key="chan.teamKey" />
            </div>
          </div>
        </div>
        <gEmpty v-else tabName="전체" contentName="채널" style="margin-top: 10px; float:none;" />
      </div>
      <div class="w100P" style="margin-top: 35px;">
        <div class="w100P" style="display: flex; align-items: center;">
          <img style="width: 25px; margin-right: 5px;" src="@/assets/images/common/icon_popular.svg" alt="">
          <!--Popular -->
          <p class="fontBold font16">Popular</p>
        </div>
        <div v-if="pAreaDetail.popTeamList && pAreaDetail.popTeamList.length > 0" class="w100P" style="height: 200px; display: flex;">
          <div class="h100P" style="width: 33%;">
            <div style="height: 70%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[1]"  :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[1]" />
            </div>
            <div class="fontBold font16" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 30%; background-color:slateblue; border-top-left-radius: 10px;">2</div>
          </div>
          <div style="width: 33%;">
            <div style="height: 50%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[0]" :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[0]" :pBestYn="true" />
            </div>
            <div class="fontBold font16" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 50%; background-color:slateblue; border-top-left-radius: 10px; border-top-right-radius: 10px;">1</div>
          </div>
          <div style="width: 33%;">
            <div style="height: 70%; display: flex; justify-content: center; align-items: flex-end;">
              <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[2]"  :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[2]"/>
            </div>
            <div class="fontBold font16" style="padding-top: 10px; color: #fff; border-top: 10px solid rgb(65, 58, 109); height: 30%; background-color:slateblue; border-top-right-radius: 10px;">3</div>
          </div>
        </div>
        <gEmpty v-else tabName="전체" contentName="채널" style="margin-top: 10px; float:none;" />
        <div class="w100P" style="margin-top: 35px;">
          <div class="w100P" style="display: flex; align-items: center;">
            <img style="width: 25px; margin-right: 5px;" src="@/assets/images/bottom/icon_search.svg" alt="">
            <!--All List -->
            <p class="fontBold font16">All List</p>
          </div>
          <div class="w100P" style="padding-bottom: 30px; height:auto; max-height:325px; overflow-y:auto;">
            <gEmpty tabName="전체" contentName="채널" v-if="pAreaInfo.bdList && pAreaInfo.bdList.length === 0" style="margin-top:50px;" />
            <template v-for="(chanEle, index) in pAreaInfo.bdList" :key="index">
              <channelCard v-if="chanEle.targetKind === 'T'" style="margin-top: 10px;" class="moveBox chanRow" :chanElement="chanEle" @openPop="goChannelMain" @scrollMove="scrollMove" />
              <boardCard v-else class="moveBox chanRow" :boardElement="chanEle" @click="goBoardMain(chanEle)" @scrollMove="scrollMove" />
            </template>
          </div>
          <!-- <div class="w100P" style="padding-bottom: 30px;">
            <gEmpty tabName="전체" contentName="채널" v-if="pAreaDetail.popTeamList && pAreaDetail.popTeamList.length === 0" style="margin-top:50px;" />
            <template v-for="(chanEle, index) in pAreaDetail.popTeamList" :key="index">
              <channelCard :pAreaDetail="pAreaDetail" class="moveBox chanRow" :chanElement="chanEle" @click="goChannelMain(chanEle)" @scrollMove="scrollMove" />
            </template>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="pUniBInfo" class="commonPopWrap" style="padding: 10px 20px; min-width: 300px; position: absolute;" @click.stop>
    <div class="font16 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; width: calc(100% - 25px);" class="">
        <img style="width: 45px; margin-right: 10px;" src="/resource/logo/UB_uniBLogo.png" alt="">
        <p class="textOverdot textLeft font25" style="width: calc(100% - 40px);">{{ pUniBInfo.description }}</p>
        <!-- <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ bdAreaNameMtext }}</p> -->
      </div>
      <div class="cursorP" @click="closeXPop" style="width: 25px;">
        <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import chanRoundIcon from '../infoBox/UB_chanRoundIcon.vue'
import boardCard from '../infoBox/UB_boardCard.vue'
export default {
  components: {
    chanRoundIcon,
    boardCard
  },
  props: {
    pUniBInfo: {},
    propParams: {},
    parentPopN: {},
    pAreaInfo: {},
    pClosePop: {},
    pMoveToChan: Function,
    pAreaDetail: {},
    pBdClickedYn: Boolean,
    pOpenCreChanPop: Function
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'areaInfoPop') {
        this.closeXPop()
      }
    }
  },
  mounted () {
    this.$addHistoryStack('areaInfoPop')
  },
  created () {
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
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      if (this.pClosePop) this.pClosePop()
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.areaInfo = this.pAreaInfo
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    async goBoardMain (boardListData) {
      const paramObj = {
        cabinetKey: boardListData.targetKey,
        cabinetNameMtext: boardListData.cabinetNameMtext,
        creDate: boardListData.cabCreDate,
        creTeamKey: this.pAreaInfo.teamKey,
        sysCabinetCode: 'BOAR',
        teamKey: this.pAreaInfo.teamKey
      }
      var resultMainData = await this.$getBoardMainData(paramObj)

      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
        console.log('!!!!!!!!!!!!!!!!!')
      }
      var goBoardMainParam = {}
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = paramObj.teamKey
      goBoardMainParam.targetKey = paramObj.cabinetKey
      goBoardMainParam.cabinetNameMtext = paramObj.cabinetNameMtext
      this.$emit('openPage', goBoardMainParam)
    },
    openChanMenu () {
      this.openChanMenuYn = true
    },
    openPop (params) {
      console.log(params)
      this.mPopParams = params
      this.mPopShowYn = true
    }
  }
}
</script>
<style scoped>
.commonPopWrap{
  position: absolute; width: 80%; height: 80%; z-index: 9999999; background: #FFFFFF;
  bottom: 10%;
  left: 10%;
  background: rgba(256, 256, 256, 0.65);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 9px );
  -webkit-backdrop-filter: blur( 9px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.chanDetailPopHeader{background: transparent!important; box-shadow: none!important;}
</style>
