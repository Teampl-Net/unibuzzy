<i18n>
{
  "ko": {
    "DETAIL_MSG_FEATURE": "해당 모드에서는 지원하지 않는 기능입니다.",
  },
  "en": {
    "DETAIL_MSG_FEATURE": "This feature is not supported in this mode.",
  }
}
</i18n>
<template>
    <div ref="contScrollWrap" id="contsScrollWrap" @dragenter="onDragenter" :style="'padding-top: ' + (Number(this.$STATUS_HEIGHT) + 50)  + 'px'" v-if="this.CHANNEL_DETAIL && this.CONT_DETAIL && (CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL)" class="boardDetailWrap" >
        <gUBContentsBox :pFadeNotShowYn="true" @openImgPop="openImgPop" @scrollToMemoTop="scrollToMemoTop" @fileDownload="filePopShowYn = !filePopShowYn" :imgClickYn="true" ref="myContentsBox" :propDetailYn="true" :contentsEle="this.cDetail" :childShowYn="true" @openPop="openPop" @openPage="goChannelMain" @writeMemoScrollMove='writeMemoScrollMove' @memoLoadMore='memoLoadMore'/>
    </div>
</template>
<script>
export default {
  data () {
    return {
      mCanLoadYn: true,
      mCheckMemoEndListYn: false,
      memoShowYn: false,
      filePopShowYn: false,
      previewPopShowYn: false,
      mememoValue: null,
      clickEndYn: false,
      alertPopId: null,
      systemName: localStorage.getItem('systemName'),
      loadingYn: false,
      cabinetDetail: null,
      resetMemoYn: false,
      cDetail: null,
      currentMemoKey: 0,
      tempMemoData: {},
      mContentsKey: -1,
      mCabinetKey: -1,
      mCreTeamKey: -1
    }
  },
  props: {
    propParams: undefined,
    pPopId: {}
  },
  created () {
    this.mContentsKey = this.$route.params.contentsKey
    this.mCreTeamKey = this.$route.params.creTeamKey
    this.mCabinetKey = this.$route.params.cabinetKey
    this.readyFunction()
  },
  updated () {
    this.settingAtag()
    var contsScrollWrap = document.getElementById('contsScrollWrap')
    if (!contsScrollWrap) return
    contsScrollWrap.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    this.filePopShowYn = false
  },
  unmounted () {
    this.filePopShowYn = false
  },

  async mounted () {
    var contsScrollWrap = document.getElementById('contsScrollWrap')
    if (!contsScrollWrap) return
    contsScrollWrap.addEventListener('scroll', this.handleScroll)

    if (this.propParams.memoScrollYn) {
      var memoTop
      memoTop = await this.$refs.myContentsBox.getMemoTop()

      this.scrollMove(memoTop - 100)
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    CHANNEL_DETAIL () {
      let chan = {}
      if (this.propParams) {
        chan = this.$getDetail('TEAM', this.propParams.teamKey)
      } else {
        if (this.mCreTeamKey !== -1) {
          chan = this.$getDetail('TEAM', this.mCreTeamKey)
        } else {
          return
        }
      }
      if (chan) {
        return chan[0]
      } else {
        this.$addChanList(this.mCreTeamKey)
        return null
      }
    },
    CAB_DETAIL () {
      if (this.CONT_DETAIL.jobkindId === 'BOAR') {
        if (!this.cabinetDetail) return null
        if (!this.cabinetDetail.mCabinet) return this.cabinetDetail

        return this.cabinetDetail.mCabinet
      } else {
        this.getCabinetDetail(this.mCreTeamKey)
        return null
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    CONT_DETAIL () {
      if (!this.cDetail || !this.CHANNEL_DETAIL) return
      return this.cDetail
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['UB_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    getWindowSize () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['UB_CHANNEL/GE_NEW_MEMO_LIST']
    }
  },
  watch: {
    CONT_DETAIL: {
      handler (value, old) {
        if (value) {
          this.onLoadFunction()
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        content = this.CONT_DETAIL
        if (value[0].targetKey !== content.contentsKey) return
        var count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
        this.CONT_DETAIL.memoCount = count
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
        var memoAleadyIdx = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
        if (memoAleadyIdx !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [
            value[0],
            ...content.D_MEMO_LIST
          ]
        }
        this.CONT_DETAIL.D_MEMO_LIST = this.replaceArr(newArr)
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.CONT_DETAIL])
      },
      deep: true
    }
  },
  methods: {
    onDragenter () {
      const contRef = this.$refs.myContentsBox
      if (contRef) {
        contRef.onDragenter()
      }
    },
    onDragleave () {
      // class 삭제
      this.mIsDraggedYn = false
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      pageParam.cabinetKeyListStr = this.mCabKeyListStr
      this.$emit('openPage', pageParam)
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    async scrollToMemoTop () {
      if (this.propParams.memoScrollYn) {
        var memoTop = await this.$refs.myContentsBox.getMemoTop()
        // eslint-disable-next-line no-unused-vars
        var test = this.$refs.contScrollWrap
        if (this.$refs.contScrollWrap.scrollTop < memoTop) {
          this.scrollMove(memoTop - 100)
        }
      }
    },
    scrollMove (wich) {
      if (!wich) return
      this.$refs.contScrollWrap.scrollTo({ top: wich, behavior: 'smooth' })
    },
    handleScroll () {
      if (!this.$refs.myContentsBox) return
      this.$refs.myContentsBox.handleScroll()
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    clearMemo () {
      this.tempMemoData = undefined
    },
    async readyFunction () {
      try {
        this.$showAxiosLoading(true)
        this.loadingYn = true
        if (!this.propParams || Object.keys(this.propParams).length < 1 || this.propParams.targetType !== 'contentsDetail') {
          await this.getCabinetDetail(this.mCreTeamKey)
          await this.$addChanList(this.mCreTeamKey)
          await this.getContentsDetail()
        } else {
          if (!this.propParams.channelYn) {
            await this.getCabinetDetail(this.mCreTeamKey)
            await this.$addChanList(this.mCreTeamKey)
          }
          var pInitData = JSON.parse(JSON.stringify(this.propParams.initData))
          this.cDetail = pInitData.content
          this.cabinetDetail = pInitData.contentCabinet
        }
        if (this.CONT_DETAIL && this.CONT_DETAIL.attachMfilekey && (!this.CONT_DETAIL.D_ATTACH_FILE_LIST || this.CONT_DETAIL.D_ATTACH_FILE_LIST.length === 0)) {
          this.settingFileList()
        }
      } catch (e) {
        console.log(e)
      }
      this.$showAxiosLoading(false)
      this.loadingYn = false
    },
    async getCabinetDetail (teamKey) {
      var param = {}
      param.currentTeamKey = teamKey
      param.cabinetKey = this.mCabinetKey
      var resultList = await this.$getCabinetDetail(param)
      resultList.mCabinet.shareAuth = this.$checkUserAuth(resultList.mCabinet.mShareItemList)
      this.cabinetDetail = resultList
    },
    async getContentsDetail () {
      var param = {}
      param.contentsKey = Number(this.mContentsKey)
      param.targetKey = Number(this.mContentsKey)
      param.jobkindId = 'BOAR'
      param.userKey = this.GE_USER.userKey
      const resultList = await this.$getContentsList(param)
      var detailData = resultList.content[0]
      detailData.D_CONT_USER_DO = await this.$settingUserDo(detailData.userDoList)
      if (!detailData.D_MEMO_LIST && (!detailData.memoList || detailData.memoList.length === 0)) detailData.D_MEMO_LIST = []
      this.cDetail = detailData
      this.mCreTeamKey = this.cDetail.creTeamKey
      this.mCabinetKey = this.cDetail.cabinetKey
      if (this.cDetail.cabinetNameMtext) {
        this.$emit('changePageHeader', this.$changeText(this.cDetail.cabinetNameMtext)) /* 여기  */
      } else {
        this.$emit('changePageHeader', this.$changeText(this.cDetail.nameMtext))
      }
      const openPageParam = {}
      openPageParam.targetKey = detailData.contentsKey
      openPageParam.contentsKey = detailData.contentsKey
      openPageParam.memoScrollYn = true
      openPageParam.teamKey = detailData.creTeamKey
      openPageParam.creTeamKey = detailData.creTeamKey
      openPageParam.jobkindId = detailData.jobkindId
      if (openPageParam.jobkindId === 'BOAR') {
        openPageParam.cabinetKey = detailData.cabinetKey
      }
      this.$emit('clearInfo', { detail: openPageParam, targetType: 'contDetail' })
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [detailData])
    },
    onLoadFunction () {
      var thisthis = this
      if (this.CONT_DETAIL) {
        this.settingAtag()
        this.loadingYn = false
      } else {
        setTimeout(() => {
          thisthis.loadingYn = false
        }, 1000)
      }
      var pushListWrap = this.$refs.memoarea
      if (pushListWrap) {
        pushListWrap.addEventListener('scroll', () => {
          this.clickEndYn = true
        })
      } else {
        setTimeout(() => {
          if (pushListWrap) {
            pushListWrap.addEventListener('scroll', () => {
              this.clickEndYn = true
            })
          }
        }, 300)
      }
    },
    settingAtag () {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        return
      }
      var contentsATagList = document.querySelectorAll('#contentsBodyArea a')
      if (contentsATagList && contentsATagList.length > 0) {
        for (var i = 0; i < contentsATagList.length; i++) {
          contentsATagList[i].target = '_blank'
        }
      }
    },
    backClick () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
      } else {
        this.previewPopShowYn = false
      }
    },
    writeMemoScrollMove () {
      this.$refs.contScrollWrap.scrollTo()
    },
    writeMemo () {
      if ((this.CONT_DETAIL.jobkindId === 'ALIM' && this.CONT_DETAIL.canReplyYn === 1) || (this.CONT_DETAIL.jobkindId === 'BOAR' && this.CAB_DETAIL.shareAuth.R === true)) {
        if (this.currentMemoKey !== this.CONT_DETAIL.contentsKey) {
          this.clearMemo()
        }
        this.currentMemoKey = this.CONT_DETAIL.contentsKey
        if (this.mememoValue) {
          this.resetMemoYn = true
        }
        this.mememoValue = null
        this.memoShowYn = true
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_COMM_NOPERM'))
      }
    },
    async memoLoadMore () {
      if (this.mCanLoadYn && this.mCheckMemoEndListYn === false) {
        this.mCanLoadYn = false
        try {
          await this.getMemoList(undefined, true)
        } catch (error) {
          console.log(error)
        } finally {
          this.mCanLoadYn = true
        }
      }
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
        })
        return data
      }, [])
      return uniqueArr
    },
    endListCheckFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      var dispTotalMemoCount = this.$countingTotalMemo(this.CONT_DETAIL.D_MEMO_LIST)
      if (resultList.totalElements === dispTotalMemoCount) {
        this.mCheckMemoEndListYn = true
      } else {
        this.mCheckMemoEndListYn = false
      }
    },
    async getMemoList (refreshYn, loadingYn) {
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = this.CONT_DETAIL.contentsKey
      memo.pageSize = this.$countingTotalMemo(this.CONT_DETAIL.D_MEMO_LIST) + 5
      memo.offsetInt = 0
      memo.ownUserKey = this.GE_USER.userKey
      var nonLoadingYn = false
      if (loadingYn) {
        nonLoadingYn = true
      }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemoList',
        param: memo
      }, nonLoadingYn)
      console.log(result)
      if (result.data.memoList) {
        var tempList = []
        // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
        if (this.CONT_DETAIL.D_MEMO_LIST && !refreshYn) {
          tempList = this.CONT_DETAIL.D_MEMO_LIST
        }
        const newArr = [
          ...tempList,
          ...result.data.memoList
        ]
        this.endListCheckFunc(result.data)

        var cont = this.CONT_DETAIL
        cont.D_MEMO_LIST = this.replaceArr(newArr)
        this.CONT_DETAIL.memoCount = result.data.totalElements
        this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
    },
    async settingFileList () {
      // eslint-disable-next-line no-unused-vars
      var test = this.CONT_DETAIL
      if (this.CONT_DETAIL && this.CONT_DETAIL.attachFileList !== undefined && this.CONT_DETAIL.attachFileList.length > 0) {
        var attachFileList = []
        var bodyImgFileList = []
        for (var a = 0; a < this.CONT_DETAIL.attachFileList.length; a++) {
          if (this.CONT_DETAIL.attachFileList[a].attachYn === true) {
            attachFileList.push(this.CONT_DETAIL.attachFileList[a])
          } else if (this.CONT_DETAIL.attachFileList[a].attachYn === false) {
            bodyImgFileList.push(this.CONT_DETAIL.attachFileList[a])
          }
        }
        var cont = this.CONT_DETAIL
        cont.D_ATTACH_FILE_LIST = attachFileList
        cont.D_BODY_IMG_FILE_LIST = bodyImgFileList
        this.$store.dispatch('UB_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      }
    }
  }
}
</script>
<style scoped>
.pagePaddingWrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0;
  padding-bottom: 50px;
}
.boardBorder {
  width: 100%;
  height: 20px;
  padding-bottom: 10px;
  border-bottom: 1.5px dashed #ccc;
  float: left;
}
.boardDetailWrap {
  height: fit-content;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  padding-bottom: 60px;
  overflow: scroll;
  width: 100%;
  background: #FFF;
  height: 100vh;
}
.pushDetailTopArea {
  min-height: 3.5rem;
  margin-bottom: 1rem;
  border-bottom: 0.5px solid #CFCFCF
}
.pushDetailChanLogo {
  width: 50px;
  height: 50px;
}
.pushDetailHeaderTextArea {
  width: calc(100% - 48px);
  cursor: pointer;
  float: left;
  margin-top: 0.2rem;
}

#alimCheckArea {
  min-height: 35px;
}
.alimCheckContents {
  width: 100%;
  float: right;
  min-height: 30px;
}
.pushMbox {
  margin-bottom: 20px;
}
.content {
  position: relative;
  width: 100%;
  margin: auto;
  border-radius: 0.8rem 0.8rem 0 0;
  background-color: #ffffff;
  color: #363c5f;
  padding: 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 22rem;
  padding-bottom: 3rem;
  float: left;
  margin-bottom: -10px;

}
.paperEffect {
  width: 100%;
  float: left;
  min-height: 50px;
  background: #FFF;
  position: relative;
  border-radius: 0 0 0 0.8rem;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);
}
.showMemoPop-enter {
  bottom: 0;
  animation: showMemoPop-dialog-fade-in 0.2s ease;
}
.showMemoPop-leave{
  bottom: 100px;
}
.showMemoPop-enter {
  animation: showMemoPop-dialog-fade-in 0.2s ease;
}
.showMemoPop-leave {
  animation: showMemoPop-dialog-fade-out 0.2s ease forwards;
}
.showMemoPop-enter-active {
  animation: showMemoPop-dialog-fade-in 0.2s ease;
}
.showMemoPop-leave-active {
  animation: showMemoPop-dialog-fade-out 0.2s ease forwards;
}
@keyframes showMemoPop-dialog-fade-in {
    0% {bottom: -100px;}
    100% {bottom: 0;}
}
@keyframes showMemoPop-dialog-fade-out {
    0% {bottom: 0;}
    100% {bottom: -100px;}
}
.memoBoxBackground {
  width: 100%;
  height: 100vh;
  background: #00000036;
  position: absolute;
  top: 0;
  left: 0;
}
.boardDetailChanLogoImgWrap {
  width: 40px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 40px;
  margin-right: 0.5rem;
  border: 2px solid #ccc;
  position: relative;
}
</style>
