<template>
  <!-- <createBoardChannel v-if="createNewPage" :pClosePop="closeNewPage"  :chanDetail="{ modiYn: false }" @openPage="openPage" :pSelectedAreaInfo="mAreaInfo" :pBdAreaList="mBdAreaList" /> -->
  <div v-if="pAreaInfo && pAreaDetail" class="commonPopWrap areaInfoWrap" @click.stop>
    <img v-if="pAreaInfo.priority !== 1" class="createBtn" src="@/assets/images/button/Icon_CreChanBtn.png" @click="pOpenCreChanPop" alt="채널 만들기 버튼" />
    <div class="bdBox">
      <img v-if="pBdClickedYn" src="../../../assets/images/main/icon_bd.png" class="h100P" />
      <img v-else src="../../../assets/images/main/icon_area.png" class="h100P" />
    </div>
    <div class="font16 fontBold w100P infoPopHeaderBox">
      <div class="headerBox">
        <img src="/resource/logo/gtLogo.png" alt=""> <!--여기-->
        <p class="textOverdot textLeft font25">{{ pAreaInfo.bdAreaNameMtext }} Area</p>
        <!-- <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ bdAreaNameMtext }}</p> -->
      </div>
      <div class="cursorP closeIconBox" @click="closeXPop">
        <img src="../../../assets/images/common/popup_close.png" alt="">
      </div>
    </div>
    <div class="w100P infoPopContentsWrap">
      <div class="w100P infoDescription">
        <img src="@/assets/images/common/icon_pencil.svg" alt="">
        <!-- <p class="fontBold font16">Description</p> -->
        <p class="textLeft font16">{{ pAreaInfo.bdAreaDesc }}</p>
      </div>
      <div class="w100P infoAmount">
        <div :class="{width100 :  mShowBdOrChan==='C'}">
          <p v-if="pAreaInfo.priority === 1"><span class="fontBold">{{ pBoardList && pBoardList.length > 0? pBoardList.length : '0' }}</span>{{ pBoardList.length === 1 ? ' board' : ' boards' }}</p>
          <p v-else-if="mShowBdOrChan==='T'"><span class="fontBold">{{ pAreaDetail.bdList && pAreaDetail.bdList.length > 0? pAreaDetail.bdList.length : '0' }}</span>{{ pAreaDetail.bdList.length === 1 ? ' channel' : ' channels' }}</p>
          <p v-else-if="mShowBdOrChan==='C'"><span class="fontBold">{{ pAreaDetail.bdList && pAreaDetail.bdList.length > 0? pAreaDetail.bdList.length: '0' }}</span> {{ pAreaDetail.bdList.length === 1 ? 'board' : 'boards'}}</p>
          <!-- default는 channels로-->
          <p v-else><span class="fontBold">{{ pAreaDetail.bdList && pAreaDetail.bdList.length? pAreaDetail.bdList.length:'0' }}</span> channels</p>
        </div>
        <p v-if="mShowBdOrChan !== 'C'"> <!-- T거나 값이 없을 때 (Channel, Board가 모두 0일때)-->
          <span class="fontBold">{{ pAreaDetail.followerCount? pAreaDetail.followerCount:0 }}</span> followers
        </p>
      </div>
      <div v-if="pAreaDetail.fList&& pAreaDetail.fList.length > 0" class="w100P mTop20">
        <div class="w100P textLeft flexAlignCenter">
          <img class="heartIcon" src="@/assets/images/contents/icon_heart_on.png" alt="">
          <!--Favorites -->
          <p class="fontBold font16">Favorites</p>
        </div>
        <div class="w100P mTop10" v-if="pAreaDetail.fList&& pAreaDetail.fList.length > 0">
          <div class="w100P" id="fileChannelWrap" @wheel="horizontalScroll">
            <div class="w100P">
              <chanRoundIcon @click="goChannelMain(chan)" :pAreaInfo="pAreaInfo" :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="chan" v-for="chan in pAreaDetail.fList" :key="chan.teamKey" />
            </div>
          </div>
        </div>
      </div>
      <div  class="w100P mTop20">
      <template v-if="pAreaInfo.bdAreaNameMtext!=='Campus'">
        <div v-if="pAreaDetail.popTeamList && pAreaDetail.popTeamList.length > 0" class="w100P flexAlignCenter">
          <img class="heartIcon" src="@/assets/images/common/icon_popular.svg" alt="">
          <!--Popular -->
          <p class="fontBold font16">Popular</p>
        </div>
      </template>
        <template v-if="pAreaInfo.bdAreaNameMtext!=='Campus'">
          <div v-if="pAreaDetail.popTeamList && pAreaDetail.popTeamList.length > 0" class="w100P popularWrap">
            <div class="h100P w33P">
              <div class="number2">
                <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[1]"  :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[1]" />
              </div>
              <div class="fontBold font16 number2Bottom">
                <p class="margin5">2</p>
                <p v-if="pAreaDetail.popTeamList[1]">{{ pAreaDetail.popTeamList[1].fCount ? pAreaDetail.popTeamList[1].fCount : '0' }} followers</p>
              </div>
            </div>
            <div class="w33P">
              <div class="number1">
                <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[0]" :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[0]" :pBestYn="true" />
              </div>
              <div class="fontBold font16 number1Bottom">
                <p class="margin5">1</p>
                <p v-if="pAreaDetail.popTeamList[0]">{{ pAreaDetail.popTeamList[0].fCount ? pAreaDetail.popTeamList[0].fCount : '0' }} followers</p>
              </div>
            </div>
            <div class="w33P">
              <div class="number3">
                <chanRoundIcon :pAreaInfo="pAreaInfo" v-if="pAreaDetail.popTeamList[2]"  :pGoChannelMain="goChannelMain" :selectedYn="false" :chanElement="pAreaDetail.popTeamList[2]"/>
              </div>
              <div class="fontBold font16 number3Bottom">
                <p class="margin5">3</p>
                <p v-if="pAreaDetail.popTeamList[2]">{{ pAreaDetail.popTeamList[2].fCount ? pAreaDetail.popTeamList[2].fCount : '0' }} followers</p>
              </div>
            </div>
          </div>
        </template>
        <!-- <gEmpty v-else tabName="전체" contentName="채널" style="margin-top: 10px; float:none;" /> -->
        <div class="w100P allListWrap">
          <div class="w100P allListTitle">
            <div class="flexAlignCenter">
              <img class="heartIcon" src="@/assets/images/bottom/icon_search.svg" alt="">
            <!--All List -->
              <p class="fontBold font16" style="">All List</p>
            </div>
            <img :src="`/resource/footer/icon_search_fillin.svg`" @click="gotoSearchPage" class="cursorP" />
          </div>
          <div v-if="pAreaInfo.priority !== 1" class="w100P allListContents">
            <gEmpty class="mt-header" tabName="전체" contentName="채널" v-if="pAreaDetail.bdList && pAreaDetail.bdList.length === 0" />
            <template v-for="(chanEle, index) in pAreaDetail.bdList" :key="index">
              <channelCard v-if="chanEle.targetKind === 'T'" class="moveBox cursorP chanRow mTop10" :pTeamList="GE_DISP_TEAM_LIST" @openImgPop="openImgPop" :chanElement="chanEle" @openPop="goChannelMain" @scrollMove="scrollMove" />
              <boardCard v-else class="moveBox chanRow cursorP" :boardElement="chanEle" @click="goBoardMain(chanEle)" @scrollMove="scrollMove" />
            </template>
          </div>
          <div v-else class="w100P allListContents">
            <gEmpty class="mt-header" tabName="전체" contentName="채널" v-if="pBoardList.length === 0" />
            <template v-for="(chanEle, index) in pBoardList" :key="index">
              <boardCard class="moveBox chanRow cursorP" :boardElement="chanEle" @click="goBoardMain(chanEle)" @scrollMove="scrollMove" />
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
  <!-- <div v-else-if="pUniBInfo" class="commonPopWrap" style="padding: 10px 20px; min-width: 300px; position: absolute;" @click.stop>
    <div class="font16 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; width: calc(100% - 25px);" class="">
        <img style="width: 45px; margin-right: 10px;" src="/resource/logo/UB_uniBLogo.png" alt="">
        <p class="textOverdot textLeft font25" style="width: calc(100% - 40px);">{{ pUniBInfo.description }}</p>
        <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ bdAreaNameMtext }}</p>
      </div>
      <div class="cursorP" @click="closeXPop" style="width: 25px;">
        <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
      </div>
    </div>
  </div> -->
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
    pOpenCreChanPop: Function,
    pBoardList: {}
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
    this.showBoardOrChannel()
  },
  data () {
    return {
      mLoadingYn: false,
      mPopId: null,
      mOpenChanMenuYn: false,
      mPopParams: '',
      mPopShowYn: false,
      createNewPage: false,
      mShowBdOrChan: ''
    }
  },
  methods: {
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      if (this.pClosePop) this.pClosePop()
    },
    gotoSearchPage () {
      this.$router.replace('/search')
    },
    showBoardOrChannel () {
      const bdCLength = []
      const bdTLength = []

      if (this.pAreaInfo) {
        for (let i = 0; i < this.pAreaInfo.bdList.length; i++) {
          // T가 채널, C가 Board
          if (this.pAreaInfo.bdList[i].targetKind === 'C') {
            bdCLength.push(this.pAreaInfo.bdList[i])
          } else if (this.pAreaInfo.bdList[i].targetKind === 'T') {
            bdTLength.push(this.pAreaInfo.bdList[i])
            this.$addChanVuex([this.pAreaInfo.bdList[i]])
          }
        }
        if (this.pAreaInfo.priority === 1 || bdCLength > bdTLength) {
          this.mShowBdOrChan = 'C'
        } else if (bdTLength > bdCLength) {
          this.mShowBdOrChan = 'T'
        }
      }
      return this.mShowBdOrChan
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
      if (!paramObj.cabinetKey && boardListData.cabinetKey) {
        paramObj.cabinetKey = boardListData.cabinetKey
      }
      var resultMainData = await this.$getBoardMainData(paramObj, true)

      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
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
  position: absolute; width: 80%; height: 80%; z-index: 99999;
  bottom: 10%;
  left: 10%;
  background: rgba(256, 256, 256, 0.65);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 9px );
  -webkit-backdrop-filter: blur( 9px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.areaInfoWrap {
  padding: 10px 20px;
  min-width: 300px;
  position: absolute;
}
.createBtn {
  position: absolute;
  cursor: pointer;
  right: 10%;
  bottom: 20px;
  width: 50px;
  height: 50px;
  z-index: 100;
}
.bdBox {
  position: absolute;
  top: -45px;
  right: 10px;
  width: 40px;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px 10px 0 0;
  padding: 5px;
}
.infoPopHeaderBox {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.headerBox {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.headerBox img {
  width: 45px;
  margin-right: 5px;
}
.headerBox p {
  width: calc(100% - 40px);
}
.closeIconBox, .closeIconBox img {
  width: 25px;
}
.infoPopContentsWrap {
  height: calc(100% - 50px);
  overflow: auto;
  padding-top: 15px;
}
.infoDescription {
  padding-bottom:10px;
  display: flex;
  align-items: center;
}
.infoDescription img {
  width: 25px;
  margin-right: 5px;
}
.infoDescription p {
  width: calc(100% - 30px);
}
.infoAmount {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  margin-top: 0px;
}
.infoAmount > div {
  width: 50%;
  border-right: 2px solid #aaa;
}
.infoAmount > p {
  width: 50%;
}
.heartIcon {
  width: 25px;
  margin-right: 5px;
}
.fileChannelWrap {
  height: 85px;
  overflow: auto;
}
.fileChannelWrap > div {
  height: 100%;
  min-width: 100%;
  display:flex;
}
.popularWrap {
  height: 200px;
  display: flex;
}
.number1, .number2, .number3 {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.number1 {
  height: 55%;
}
.number2 {
  height: 65%;
}
.number3 {
  height: 69%;
}
.number1Bottom, .number2Bottom, .number3Bottom {
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding-top: 10px;
  color: #fff;
  border-top: 10px solid rgb(65, 58, 109);
  background-color:slateblue;
}
.number1Bottom {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 45%;
}
.number2Bottom {
  border-top-left-radius: 10px;
  height: 35%;
}
.number3Bottom {
  border-top-right-radius: 10px;
  height: 31%;
}
.margin5 {
  margin-top: -5px;
}
.allListWrap {
  margin-top: 35px;
}
.allListTitle {
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.allListTitle > img {
  width: 20px;
}
.allListContents {
  padding-bottom: 30px;
  height:auto;
  max-height:325px;
}
.width100{
  width:100% !important;
  border-right:none !important;
}
.chanDetailPopHeader {
  background: transparent!important;
  box-shadow: none!important;
}
</style>
