<template>
    <div class="chanInfoBoxWrap">
        <div class="font20 fontBold w100P chanInfoBoxHeader">
          <div class="chanInfoBoxTitle">
            <div class="fl chanInfoBoxLogo" :style="pChanInfo.logoDomainPath? `background-image: url(${pChanInfo.logoDomainPath + $changeUrlBackslash(pChanInfo.logoPathMtext) });`:`background-image: url(${pChanInfo.logoPathMtext });`"></div>
            <p class="textOverdot textLeft mleft-05 chanInfoBoxTitle">{{ $changeText(pChanInfo.bdAreaNameMtext) }}</p>
          </div>
          <div class="cursorP chanInfoCloseImg" @click="pClosePop">
            <img class="w100P" src="@/assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P flexCenter chanInfoBoxBody">
          <div class="fontBold font18 chanInfoBoxName">{{ $changeText(pChanInfo.nameMtext) }}</div>
          <div class="fontBold font18 chanInfoBoxCount">{{ pChanInfo.fCount }} followers</div>
          <div class="fontBold w100P chanInfoBoxPopTitle">Popular Post</div>
          <div class="w100P chanInfoBoxContWrap">
            <template v-if="GE_DISP_CONTS_LIST && GE_DISP_CONTS_LIST.length > 0">
              <div class="chanInfoBoxCont" @click="goContentsDetail(cont)" v-for="cont, index in GE_DISP_CONTS_LIST" :key="index">
                  <div>
                    <div>
                      <p class="font12 commonColor fontBold textLeft">{{ `${$changeText(cont.cabinetNameMtext)} Board > ${cont.showCreNameYn? $changeText(cont.creUserName) : 'Anonymous'}` }}</p>
                      <p class="font12 lightGray textLeft">{{ `${$changeDateFormat(cont.creDate)}` }}</p>
                    </div>
                  </div>
                  <div class="chanInfoBoxContPre" ref="contentsBoxRef">
                      <p class="font14 textLeft fontBold">{{ cont.title }}</p>
                      <pre class="font14 textLeft textOverdot" v-html="$setBodyLength(cont.bodyFullStr)"></pre>
                  </div>
                  <div class="w100P chanInfoBoxFade"></div>
              </div>
            </template>
            <gEmpty v-else-if="GE_DISP_CONTS_LIST && GE_DISP_CONTS_LIST.length === 0" :tabName="currentTabName" contentName="전체" :key="mEmptyReloadKey" class="mtop-2"/>
          </div>
        </div>
        <div class="chanInfoBoxFooter">
          <gBtnSmall @click="goToLink" class="mleft-05" btnTitle="Let's go!"/>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    pChanInfo: {},
    pAreaInfo: {},
    pClosePop: Function
  },
  data () {
    return {
      mContsList: []
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CONTS_LIST () {
      try {
        var idx1, idx2
        var returnContsList = []
        var chanDetail = null
        var dataList = null
        var i = 0
        if (!this.mContsList) return null
        if (!this.mContsList.length === 0) return []
        for (i = 0; i < this.mContsList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mContsList[i].creTeamKey)
          if (idx1 === -1) {
            var this_ = this
            returnContsList.push(this_.mContsList[i])
          } else {
            chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
            dataList = chanDetail.ELEMENTS.boardList
            idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
            if (idx2 !== -1) {
              returnContsList.push(dataList[idx2])
            } else {
              returnContsList.push(this.mContsList[i])
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      if (this.returnContsList) {
        return this.replaceArr(returnContsList)
      } else {
        return returnContsList
      }
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
    this.$addHistoryStack('chanInfoPop')
  },
  methods: {
    goToLink () {
      if (this.pChanInfo.targetKind === 'T') {
        this.goChannelMain()
      } else if (this.pChanInfo.targetKind === 'C') {
        this.goBoardMain()
      }
    },
    goChannelMain () {
      const pageParam = {}
      pageParam.areaInfo = this.pAreaInfo
      pageParam.targetKey = this.pChanInfo.teamKey
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = this.pChanInfo.nameMtext
      this.$emit('openPage', pageParam)
    },
    async goBoardMain () {
      const paramObj = {
        cabinetKey: this.pChanInfo.targetKey,
        cabinetNameMtext: this.pChanInfo.cabinetNameMtext,
        creDate: this.pChanInfo.cabCreDate,
        creTeamKey: this.pAreaInfo.teamKey,
        sysCabinetCode: 'BOAR',
        teamKey: this.pAreaInfo.teamKey
      }
      var resultMainData = await this.$getBoardMainData(paramObj, true)

      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', contentList)
      }
      var goBoardMainParam = {}
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = paramObj.teamKey
      goBoardMainParam.targetKey = paramObj.cabinetKey
      goBoardMainParam.cabinetNameMtext = paramObj.cabinetNameMtext
      this.$emit('openPage', goBoardMainParam)
    },
    goContentsDetail (param) {
      this.$router.push(`/contents/${param.contentsKey}/${param.creTeamKey}/${param.cabinetKey}`)
    }
  },
  created () {
    if (this.pChanInfo && this.pChanInfo.popCList) {
      this.mContsList = this.pChanInfo.popCList
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', this.pChanInfo.popCList)
    }
  }
}
</script>
<style scoped>
.chanInfoBoxWrap {
  border-radius: 20px;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 10%;
  z-index: 99999;
  padding: 20px;
  padding-bottom: 0;
  float: left;
  background-color: #fff;
}
.chanInfoBoxHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.chanInfoBoxTitleBox {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.chanInfoBoxLogo {
  border-radius: 100%;
  border: 1px solid #aaa;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-position: center;
  background-size: cover;
  background-color: white;
}
.chanInfoBoxTitle {
  width: calc(100% - 60px);
  padding: none !important;
}
.chanInfoCloseImg {
  width: 25px;
}
.chanInfoBoxBody {
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100% - 110px);
  padding: 0px 0px 20px 0px;
  background: #bbb8ff;
  border-radius: 20px; border:
  2px solid #000;
}
.chanInfoBoxName {
  left: -10px;
  top: 10px;
  transform: rotate(-10deg);
  min-width: 60%;
  padding: 0 5px;
  height: 35px;
  border: 1px solid black;
  background: #fff;
  box-shadow: 3px 3px #36496b;
  line-height: 35px;
  position: absolute;
}
.chanInfoBoxCount {
  right: 10px;
  top: 50px;
  width: 60%;
  height: 35px;
  border: 1px solid black;
  background: #fff;
  box-shadow: 3px 3px #36496b;
  line-height: 35px;
  position: absolute;
}
.chanInfoBoxPopTitle {
  margin-top: 100px;
  text-align: left;
  padding-left: 10px;
}
.chanInfoBoxContWrap {
  height: calc(100% - 110px);
  margin-top: 10px;
  overflow: auto;
  padding: 0 10px;
}
.chanInfoBoxCont {
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  background: #FFFFFF98;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}
.chanInfoBoxContPre {
  width: 100%;
  margin-left: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 5px;
  border-left: 2px solid #CCC;
  position: relative;
}
.chanInfoBoxContPre > p {
  width: 99%;
  overflow: hidden;
}
.chanInfoBoxContPre > pre {
  width: calc(100% - 10px);
  height: 100px;
  overflow: hidden;
  word-break: break-all;
}
.chanInfoBoxFade {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));
}
.chanInfoBoxFooter {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
