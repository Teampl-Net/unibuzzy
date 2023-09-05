<template>
    <div style="border-radius: 20px; width: 80%; height: 80%; position: absolute; top: 10%; left: 10%;  z-index: 99999; padding: 20px; padding-bottom: 0;float: left; background-color: #fff;">
        <div class="font20 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
          <div style="display: flex; align-items: center; width: calc(100% - 25px);">
            <div class="fl" :style="pChanInfo.logoDomainPath? `background-image: url(${pChanInfo.logoDomainPath + pChanInfo.logoPathMtext });`:`background-image: url(${pChanInfo.logoPathMtext });`" style="border-radius: 100%; border: 1px solid #aaa; width: 50px; height: 50px; margin-right: 10px; background-position: center; background-size: cover; background-color: white;"></div>
            <!-- <img style="width: 20px; margin-right: 5px;" :src="pChanInfo.logoDomainPath? pChanInfo.logoDomainPath + pChanInfo.logoPathMtext:pChanInfo.logoPathMtext" alt=""> -->
            <p class="textOverdot textLeft mleft-05" style="width: calc(100% - 60px); padding: none!important;">{{ $changeText(pChanInfo.bdAreaNameMtext) }}</p>
          </div>
          <div class="cursorP" @click="pClosePop" style="width: 25px;">
            <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="w100P flexCenter" style="position: relative; flex-direction: column; justify-content: flex-start; height: calc(100% - 110px); padding: 0px 0px 20px 0px; background: #bbb8ff; border-radius: 20px; border: 2px solid #000;">
          <div class="fontBold font18" style="left: -10px; top: 10px; transform: rotate(-10deg); min-width: 60%; padding: 0 5px; height: 35px; border: 1px solid black; background: #fff; box-shadow: 3px 3px #36496b; line-height: 35px; position: absolute;">{{ $changeText(pChanInfo.nameMtext) }}</div>
          <div class="fontBold font18" style="right: 10px; top: 50px; width: 60%; height: 35px; border: 1px solid black; background: #fff; box-shadow: 3px 3px #36496b; line-height: 35px; position: absolute;">{{ pChanInfo.fCount }} followers</div>
          <div class="fontBold w100P" style="margin-top: 100px; text-align:left; padding-left: 10px;">Popular Post</div>
          <div class="w100P" style="height: calc(100% - 110px); margin-top: 10px; overflow: auto; padding: 0 10px;">
            <template v-if="GE_DISP_CONTS_LIST && GE_DISP_CONTS_LIST.length > 0">
              <div @click="goContentsDetail(cont)" v-for="cont, index in GE_DISP_CONTS_LIST" :key="index" style="width: 100%; border-radius: 5px; padding: 5px; background: #FFFFFF98; margin-bottom: 10px; position: relative; overflow: hidden;">
                  <div>
                    <div>
                      <p class="font12 commonColor fontBold textLeft">{{ `${$changeText(cont.cabinetNameMtext)} Board > ${cont.showCreNameYn? $changeText(cont.creUserName) : 'Anonymous'}` }}</p>
                      <p class="font12 lightGray textLeft">{{ `${$changeDateFormat(cont.creDate)}` }}</p>
                    </div>
                  </div>
                  <div ref="contentsBoxRef" style="width: 100%; margin-left: 3px; margin-bottom: 5px; margin-top: 5px; padding-left: 5px; border-left: 2px solid #CCC; position: relative;">
                      <p class="font14 textLeft fontBold" style="width: 99%; overflow: hidden;" >{{ cont.title }}</p>
                      <pre class="font14 textLeft textOverdot" style="width: calc(100% - 10px); height: 100px; overflow: hidden; word-break: break-all;" v-html="$setBodyLength(cont.bodyFullStr)"></pre>
                  </div>
                  <div class="w100P" style="position: absolute; bottom: 0; left: 0; height: 100px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9));"></div>
              </div>
            </template>
            <gEmpty v-else-if="GE_DISP_CONTS_LIST && GE_DISP_CONTS_LIST.length === 0" :tabName="currentTabName" contentName="전체" :key="mEmptyReloadKey" class="mtop-2"/>
          </div>
        </div>
        <div style="height: 40px; display: flex; align-items: center; justify-content: flex-end;">
          <gBtnSmall @click="goToLink" class="mleft-05" btnTitle="Let's go!"/>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    pChanInfo: {},
    pAreaInfo: {},
    pAreaDetail: {},
    pClosePop: Function
  },
  data () {
    return {
      frameLink: '',
      mContsList: []
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
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
      console.log(returnContsList)
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
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
        console.log('!!!!!!!!!!!!!!!!!')
      }
      var goBoardMainParam = {}
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = paramObj.teamKey
      goBoardMainParam.targetKey = paramObj.cabinetKey
      goBoardMainParam.cabinetNameMtext = paramObj.cabinetNameMtext
      console.log('goBoardMainParam', goBoardMainParam)
      this.$emit('openPage', goBoardMainParam)
    },
    goContentsDetail (param) {
      this.$router.push(`/contents/${param.contentsKey}/${param.creTeamKey}/${param.cabinetKey}`)
    }
    // moveToDetail () {
    //   if (this.pMoveToDetail) {
    //     this.pMoveToDetail(this.pChan)
    //   }
    // }
  },
  created () {
    if (this.pChanInfo && this.pChanInfo.popCList) {
      this.mContsList = this.pChanInfo.popCList
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.pChanInfo.popCList)
    }
  }
}
</script>
<style scoped></style>
