<template>
  <div  class="w100P h100P pagePaddingWrap myPageWrap"  :style="'padding-top:' + ($STATUS_HEIGHT + 50)+ 'px'">
    <loadingCompo v-if="mLoadingYn === true" />
    <div class="myProfileWrap" @click="goSetMyPage">
      <div class="myProfileLeft">
        <gProfileImg class="myProfileImg" :selfYn="true" />
      </div>
      <div class="myProfileRight">
        <div class="myProfileRightContents">
          <p class="font18 fontBold fl textLeft w100P h100P commonBlack textOverdot" >{{$changeText(GE_USER.userDispMtext)}}</p>
          <span class="font14 myProfileRightInfo commonBlack textOverdot">{{GE_USER.userEmail}}</span>
        </div>
      </div>
      <div class="h100P fl font20 grayBlack goBtn">&gt;</div>
    </div>

    <!--파일함-->
    <div @click="goTotalFileList" class="w100P fl fileBoxArea">
      <div class="fileBoxTitle">
        <img class="mright-03" src="../../assets/images/common/icon_fileBox.svg" alt="">
        <p class="commonColor fontBold font18">{{$t('COMMON_TAB_FILE_DRIVE')}}</p>
      </div>
      <div class="h100P font20 grayBlack goFileBtn">></div>
    </div>
    <!--스크랩-->
    <div @click="goTotalSaveList" class="w100P fl scrapArea">
      <div class="scrapTitle">
        <img class="mright-03" src="../../assets/images/contents/cont_star_no.svg" alt="">
        <p class="commonColor fontBold font18">{{$t('COMMON_TAB_SAVED')}}</p>
      </div>
      <div class="h100P font20 grayBlack goFileBtn">></div>
    </div>
    <myContents class="mainContentsBoxArea" :propAlimList="GE_DISP_CONTS_LIST" @openPop="openPage"/>
  </div>
<gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
</template>
<script>
import myContents from '../../components/pageComponents/myPage/container/MyContents.vue'
import loadingCompo from '../../components/layout/CommonLoading.vue'
export default {
  data () {
    return {
      mLoadingYn: false,
      mContsList: [],
      mMainMChanList: [],
      mMainChanList: []
    }
  },
  props: {
    initData: {
      type: Object,
      // eslint-disable-next-line no-new-object
      default: new Object()
    },
    propParams: {}
  },
  components: {
    loadingCompo,
    myContents
  },
  created () {
    this.mLoadingYn = true
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      this.$emit('showCloudLoading', false)
    }, 1000)
    if (this.propParams && this.propParams.targetType === 'myPage') {
      if (this.propParams && this.propParams.mContentsList && this.propParams.mContentsList.content) {
        this.mContsList = this.replaceArr(this.propParams.mContentsList.content)
      } else {
        if (this.initData.alimList && this.initData.alimList.content) {
          this.mContsList = this.replaceArr(this.initData.alimList.content)
        } else {
          this.mContsList = []
        }
        this.mMainChanList = this.initData.chanList
        this.mMainMChanList = this.initData.mChanList
      }
    } else {
      this.$emit('changeRouterPath', 'myPage')
    }

    this.$emit('changePageHeader', this.$t('COMMON_NAME_MY_PAGE'))
    this.mLoadingYn = false
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },

    historyStack () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['UB_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    GE_DISP_CONTS_LIST () {
      var idx1, idx2
      var returnContsList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      if (!this.mContsList.length === 0) return []
      for (i = 0; i < this.mContsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mContsList[i].creTeamKey)
        if (idx1 === -1) {
          returnContsList.push(this.mContsList[i])
          // eslint-disable-next-line vue/no-async-in-computed-properties
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          if (this.mContsList[i].jobkindId === 'ALIM') {
            dataList = chanDetail.ELEMENTS.alimList
          } else {
            dataList = chanDetail.ELEMENTS.boardList
          }
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
          if (idx2 !== -1) {
            returnContsList.push(dataList[idx2])
          } else {
            returnContsList.push(this.mContsList[i])
          }
        }
      }
      var returnList = this.replaceArr(returnContsList)
      return returnList
    }
  },
  watch: {
    propParams: {
      handler (val) {
        if (!val || !val.mContentsList) return
        this.mContsList = this.replaceArr(this.propParams.mContentsList.content)
      },
      deep: true
    }
  },
  methods: {
    openPage (value) {
      this.$emit('openPage', value)
    },
    replaceArr (arr) {
      if (!arr || (arr && arr.length === 0)) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
        })
        return data
      }, [])
      return uniqueArr
    },
    goSetMyPage () {
      var param = {}
      param.targetType = 'setMypage'
      param.popHeaderText = '프로필 설정'
      this.$emit('openPop', param)
    },
    goTotalFileList () {
      var param = {}
      param.targetType = 'totalFileList'
      param.popHeaderText = '파일함'
      this.$emit('openPop', param)
    },
    goTotalSaveList () {
      var param = {}
      param.targetType = 'totalSaveList'
      param.popHeaderText = '저장 목록'
      this.$emit('openPop', param)
    },
    openPop (openPopData) {
      this.$emit('openPop', openPopData)
    }
  }
}
</script>
<style scoped>
.myPageWrap {
  overflow:auto;
  padding-bottom: 100px;
  position: relative;
  background: #9FDDEE;
}
.myProfileWrap {
  width: 100%;
  height: 70px;
  float: left;
  cursor: pointer;
  margin-top: 0.5rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 10px;
}
.myProfileLeft {
  width: 70px;
  height: 100%;
  float: left;
}
.myPagePicImgWrap {
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 80px;
  border:2.5px solid #6768a7;
  background: #6768a745;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 0;
  overflow: hidden;
  display: flex;
  margin-right: 1rem
}
.myPagePicImgWrap img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.myProfileRight {
  width: calc(100% - 100px);
  height: 100%;
  float: left;
}
.myProfileRightContents {
  width: 100%;
  height: 30px;
  line-height: 30px;
  float: left;
  text-align: left;
}
.myProfileRightIcon {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  float: left;
  margin-top: 2.5px;
}
.myProfileRightName {
  margin-right: 5px;
  width: 40px;
  height: 20px;
  line-height: 20px;
  float: left;
  font-weight: bold;
}
.myProfileRightInfo {
  width: calc(100% - 25px);
  height: 20px;
  cursor: pointer;
  line-height: 20px;
  float: left;
}
.profileSetting {
  font-weight: bold;
  box-shadow: 0 0 7px 3px #b7b4b440;
  border-radius: 15px;
  background-color: #6768A7;
  color: #fff;
  float: left;
}
.commonBigBtn {
  cursor: pointer;
  width: 90px;
  height: 30px;
  line-height: 30px;
  margin-top: 5px;
  float: right;
  background-color: #6768A7;
  border-radius: 0.8rem;
  color: #fff;
}
.mainContentsBoxArea {
  background: #FFF;
  padding: 10px;
  border-radius: 0.8rem;
  padding-top: 5px;
  margin-top: 15px;
  box-shadow: 0 0 7px 3px #b7b4b440;
}
.myProfileImg {
  width: 50px !important;
  height: 50px !important;
}
.goBtn {
  width: 20px;
  line-height: 50px;
}
.fileBoxArea {
  padding: 10px;
  background-color: #fff;
  border-radius: 0.6rem;
  margin-top: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.fileBoxTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
}
.fileBoxTitle > img {
  width: 19.2px;
  height: auto;
}
.fileBoxTitle > p {
  margin-top: 2px;
}
.goFileBtn {
  width: 20px;
}
.scrapArea {
  padding: 10px;
  background-color: #fff;
  border-radius: 0.6rem;
  margin-top: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.scrapTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 30px);
}
.scrapTitle > img {
  width: 19.2px;
  height: auto;
}
.scrapTitle > p {
  margin-top: 2px;
}
.top5Chan {
  margin-bottom: 1rem !important;
}
</style>
