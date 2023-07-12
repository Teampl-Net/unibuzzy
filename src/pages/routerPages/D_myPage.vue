<template>
  <div  class="w100P h100P pagePaddingWrap"  :style="'padding-top:' + (this.$STATUS_HEIGHT + 50)+ 'px'" style=" overflow:auto; padding-bottom: 40px; position: relative; background: #9FDDEE;">
    <loadingCompo v-if="mLoadingYn === true" />
    <div class="myProfileWrap" @click="goSetMyPage">
      <div class="myProfileLeft">
        <gProfileImg style="width: 50px; height: 50px;" :selfYn="true" />
      </div>
      <div class="myProfileRight">
        <div class="myProfileRightContents">
          <p class="font18 fontBold fl textLeft w100P h100P commonBlack" >{{$changeText(GE_USER.userDispMtext)}}</p>
          <span class="font14 myProfileRightInfo commonBlack textOverdot">{{GE_USER.userEmail}}</span>
        </div>
      </div>
      <div class="h100P fl font20 grayBlack" style="width: 20px; line-height: 50px;">></div>
    </div>

    <div @click="goTotalFileList" class="w100P fl" style=" padding: 10px; background-color: #fff; border-radius: 0.6rem; margin-top: 10px; height: 50px; display: flex; align-items: center; cursor: pointer;">
      <div style="display: flex; align-items: center; width: calc(100% - 30px);">
        <img class="mright-03" src="../../assets/images/common/icon_fileBox.svg" style="width: 19.2px; height: auto;" alt="">
        <p class="commonColor fontBold font18" style="margin-top: 2px;">{{$t('COMMON_TAB_FILE_DRIVE')}}</p>
      </div>
      <div class="h100P font20 grayBlack" style="width: 20px;">></div>
    </div>
    <top5Alim v-if="$appType !== 'UB'" class="mainContentsBoxArea" :propAlimList="this.GE_DISP_CONTS_LIST" @openPop="openPop" ref="topAlim" />
    <top5Channel v-if="$appType !== 'UB'" class="mainContentsBoxArea" :propChanList="this.mMainChanList" @openPop="openPop" ref="topChan" style="margin-bottom: 1rem;" />

    <div v-if="false" class="commonBlack " style="width: 100%; float: left; height: 100%;">
      <myActList @closeLoading="mLoadingYn = false" ref="commonActList" :viewTab="myPageTabType" @openContentsDetailPop="openContentsDetailPop" @openPop="openPop" style="border-radius: 0.8rem;" @goMyChanList="goMyChanList" />
      <logList v-if="myPageTabType === 'ml'" />
    </div>
  </div>
<gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
</template>
<script>
import top5Channel from '../../components/pageComponents/main/D_top5ChanList.vue'
import top5Alim from '../../components/pageComponents/main/D_top5ContentsList.vue'

import loadingCompo from '../../components/layout/Tal_loading.vue'
import myActList from '../../components/pageComponents/myPage/D_myActList.vue'
import logList from '../../pages/routerPages/Tal_logList.vue'
export default {
  data () {
    return {
      mLoadingYn: false,
      mContsList: [],
      mMainMChanList: [],
      mMainChanList: [],
      mAxiosQueue: []
    }
  },
  props: {
    initData: {
      type: Object,
      // eslint-disable-next-line no-new-object
      default: new Object()
    }
  },
  components: {
    top5Channel,
    top5Alim,
    myActList,
    logList,
    loadingCompo
  },
  async created () {
    this.mLoadingYn = true
    if (this.initData) {
      // this.mInitData = this.initData
      this.mContsList = this.replaceArr(this.initData.alimList.content)
      this.mMainChanList = this.initData.chanList
      this.mMainMChanList = this.initData.mChanList
      // this.mContsList = this.initData.alimList.content
    } else {
      this.$getRouterViewData('myPage').then((data) => {
        this.mContsList = this.replaceArr(data.alimList.content)
        this.mMainChanList = data.chanList
        this.mMainMChanList = data.mChanList
      })
    }
    // var this_ = this
    /* this.getMainBoard().then(res => {
      this_.mLoadingYn = false
    }) */
    /* this.getMyContentsList().then((result) => {
      this_.setContsList(result)
    }) */

    this.$emit('changePageHeader', '마이페이지')
    this.mLoadingYn = false
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },

    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    GE_DISP_CONTS_LIST () {
      // console.log(this.ALIM_LIST_RELOAD_CONT)
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
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            // this.mContsList[i] = dataList[idx2]
          } else {
            returnContsList.push(this.mContsList[i])
          }
        }
      }
      var returnList = this.replaceArr(returnContsList)
      console.log(returnList)
      return returnList
    }
  },
  methods: {
    /* async getMyContentsList (pageSize, offsetInput, loadingYn) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.ownUserKey = this.propUserKey
      param.subsUserKey = this.propUserKey
      param.allYn = true

      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      this.loadingYn = false
      return resultList
    }, */
    async setContsList (resultList) {
      if (!resultList || resultList === '') return
      var newArr = []
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // this.endListSetFunc(resultList)
      if (this.mContsList.length > 0) {
        newArr = [
          ...this.mContsList,
          ...resultList.content
        ]
      } else {
        newArr = resultList.content
      }
      this.mContsList = this.replaceArr(newArr)
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    goMyChanList () {
      var param = {}
      param.targetType = 'chanList'
      param.popHeaderText = '채널'
      param.channelTabType = 'mychannel'
      this.$emit('openPop', param)
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
    openContentsDetailPop (detailValue) {
      console.log(' == Open Contents Detail == ')
      console.log(detailValue)
      this.$emit('goDetail', detailValue)
    },
    openPop (openPopData) {
      this.$emit('openPop', openPopData)
    }
  }
}
</script>
<style>
.myProfileWrap {width: 100%; height: 70px;float: left; cursor: pointer; margin-top: 0.5rem; background-color: #fff; border-radius: 0.8rem; padding: 10px;}
.myProfileLeft {width: 70px; height: 100%; float: left;}
.myPagePicImgWrap {width: 50px; height: 50px; position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem}
.myPagePicImgWrap img {width: 100%; position: absolute; top: 0; left: 0;}

.myProfileRight {width: calc(100% - 100px); height: 100%; float: left;}
.myProfileRightContents {width: 100%; height: 30px; line-height: 30px; float: left; text-align: left;}
.myProfileRightIcon {width: 15px;height: 15px;margin-right: 5px;float: left;margin-top: 2.5px;}
.myProfileRightName {margin-right: 5px;width: 40px;height: 20px;line-height: 20px;float: left; font-weight: bold;}
.myProfileRightInfo {width: calc(100% - 25px); height: 20px; cursor: pointer; line-height: 20px; float: left;}
.profileSetting {font-weight: bold; box-shadow: 0 0 7px 3px #b7b4b440; border-radius: 15px; background-color: #6768A7; color: #fff; float: left}

.commonBigBtn{cursor: pointer; width: 90px;height: 30px;line-height: 30px;margin-top: 5px;float: right;background-color: #6768A7;border-radius: 0.8rem;color: #fff;}

.mainContentsBoxArea {
  background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
}
</style>
