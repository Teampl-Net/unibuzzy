<template>
  <div  class="w-100P h-100P pagePaddingWrap"  :style="'padding-top:' + (this.$STATUS_HEIGHT + 50)+ 'px'" style=" overflow:auto; padding-bottom: 40px; position: relative;">
    <loadingCompo v-if="mLoadingYn === true" />
    <div class="myProfileWrap" @click="goSetMyPage">
      <div class="myProfileLeft">
        <gProfileImg style="width: 50px; height: 50px;" :selfYn="true" />
      </div>
      <div class="myProfileRight">
        <div class="myProfileRightContents">
          <p class="font18 fontBold fl textLeft w-100P h-100P commonBlack" >{{$changeText(GE_USER.userDispMtext)}}</p>
          <span class="font14 myProfileRightInfo commonBlack textOverdot">{{GE_USER.userEmail}}</span>
        </div>
      </div>
      <div class="h-100P fl font20 grayBlack" style="width: 20px; line-height: 50px;">></div>
    </div>

      <!-- <div style="display: flex; align-items: center; width: calc(100% - 30px); width: calc(50% - 15px);">
        <img class="mright-03" src="../../assets/images/push/userIcon.svg" style="width: 19.2px; height: auto;" alt="">
        <p class="commonColor font18 fontBold" style="margin-top: 2px;">팔로워 {{ mFollowerCount }}</p>
      </div>
      <div style="display: flex; align-items: center; width: calc(100% - 30px); width: calc(50% - 15px);">
        <img class="mright-03" src="../../assets/images/push/userIcon.svg" style="width: 19.2px; height: auto;" alt="">
        <p class="commonColor font18 fontBold" style="margin-top: 2px;">팔로잉 {{ mFollowingCount }}</p>
      </div> -->
    <div @click="goFollowList" class="w-100P fl" style=" padding: 10px; background-color: #fff; border-radius: 0.6rem; margin-top: 10px; height: 50px; display: flex; align-items: center; cursor: pointer;">
      <div style="display: flex; align-items: center; width: calc(100% - 30px);">
        <img class="" src="../../assets/images/common/D_addressBookIcon.svg" style="width: 25px; margin-left: -3px;  height: auto;" alt="">
      <p class="commonColor font18 fontBold" style="margin-top: 2px;">{{$t('COMMON_NAME_MY_ADDERSS')}}</p>
      </div>
      <div class="h-100P font20 grayBlack" style="width: 20px;">></div>
    </div>
    <div @click="goTotalFileList" class="w-100P fl" style=" padding: 10px; background-color: #fff; border-radius: 0.6rem; margin-top: 10px; height: 50px; display: flex; align-items: center; cursor: pointer;">
      <div style="display: flex; align-items: center; width: calc(100% - 30px);">
        <img class="mright-03" src="../../assets/images/common/icon_fileBox.svg" style="width: 19.2px; height: auto;" alt="">
        <p class="commonColor fontBold font18" style="margin-top: 2px;">{{$t('COMMON_TAB_FILE_DRIVE')}}</p>
      </div>
      <div class="h-100P font20 grayBlack" style="width: 20px;">></div>
    </div>
    <top5Noti class="mainContentsBoxArea" :pListTitle="'noti'" :propAlimList="this.GE_DISP_NOTI_LIST" @openPop="openPop" ref="topNoti" />
    <top5Alim class="mainContentsBoxArea" :pListTitle="'contents'" :propAlimList="this.GE_DISP_CONTS_LIST" @openPop="openPop" ref="topAlim" />
    <!-- <top5Channel class="mainContentsBoxArea" :propChanList="this.mMainChanList" @openPop="openPop" ref="topChan" style="margin-bottom: 1rem;" /> -->

    <div v-if="false" class="commonBlack " style="width: 100%; float: left; height: 100%;">
      <myActList @closeLoading="mLoadingYn = false" ref="commonActList" :viewTab="myPageTabType" @openContentsDetailPop="openContentsDetailPop" @openPop="openPop" style="border-radius: 0.8rem;" @goMyChanList="goMyChanList" />
      <logList v-if="myPageTabType === 'ml'" />
    </div>
  </div>
<gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
</template>
<script>
/* import top5Channel from '../../components/pageComponents/main/D_top5ChanList.vue' */
import top5Alim from '../../components/pageComponents/main/D_top5ContentsList.vue'
import top5Noti from '../../components/pageComponents/main/D_top5NotiList.vue'

import loadingCompo from '../../components/layout/Tal_loading.vue'
import myActList from '../../components/pageComponents/myPage/D_myActList.vue'
import logList from '../../pages/routerPages/Tal_logList.vue'
export default {
  data () {
    return {
      mLoadingYn: false,
      mContsList: [],
      mNotiList: [],
      mAxiosQueue: [],
      mFollowerCount: 10,
      mFollowingCount: 10,
      mChangedNoti: []
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
    /* top5Channel, */
    top5Alim,
    top5Noti,
    myActList,
    logList,
    loadingCompo
  },
  async created () {
    this.mLoadingYn = true
    console.log('this.initData', this.initData)
    if (this.initData && this.initData.contents && this.initData.contents.content && this.initData.noti && this.initData.noti.content) {
      this.mContsList = this.initData.contents.content
      this.mNotiList = this.initData.noti.content
      // this.mContsList = this.initData.alimList.content
    }
    if (this.initData === null) {
      var result = await this.$getMyPageBoard()
      if (result) {
        this.mContsList = result.contents.content
        this.mNotiList = result.noti.content
      }
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
    this.removePrefix()
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
      if (!this.mContsList || !this.mContsList.length === 0) return []
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
    },
    GE_DISP_NOTI_LIST () {
      // console.log(this.ALIM_LIST_RELOAD_CONT)
      // var idx1, idx2
      // var returnContsList = []
      // var chanDetail = null
      // var dataList = null
      // var i = 0
      if (!this.mNotiList || !this.mNotiList.length === 0) return []
      // for (i = 0; i < this.mNotiList.length; i++) {
      //   idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mContsList[i].creTeamKey)
      //   if (idx1 === -1) {
      //     returnContsList.push(this.mContsList[i])
      //     // eslint-disable-next-line vue/no-async-in-computed-properties
      //   } else {
      //     chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
      //     if (this.mContsList[i].jobkindId === 'ALIM') {
      //       dataList = chanDetail.ELEMENTS.alimList
      //     } else {
      //       dataList = chanDetail.ELEMENTS.boardList
      //     }
      //     idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
      //     if (idx2 !== -1) {
      //       returnContsList.push(dataList[idx2])
      //       // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      //       // this.mContsList[i] = dataList[idx2]
      //     } else {
      //       returnContsList.push(this.mContsList[i])
      //     }
      //   }
      // }
      // var returnList = this.replaceArr(returnContsList)
      // console.log(returnList)
      return this.mNotiList
    }
  },
  methods: {
    removePrefix () {
      this.mChangedNoti = this.mNotiList
      console.log('this.mChangedNoti', this.mChangedNoti)

      for (let i = 0; i < this.mChangedNoti.length; i++) {
        if (this.mChangedNoti[i].logItemListStr) {
          // this.mChangedNoti[i].logItemListStr = this.mChangedNoti[i].logItemListStr.slice(10)

          this.mChangedNoti[i].logItemListStr = this.mChangedNoti[i].logItemListStr.replaceAll('$^$', '').replaceAll('$#$', '')
          const logItemStr = this.mChangedNoti[i].logItemListStr
          var names
          var bodys
          var comments

          // 작성자 교체
          if (logItemStr.includes('U__SEND') && logItemStr.includes('C__BODY')) {
            names = logItemStr.replace(/U__SEND([\s\S]*)/, this.mChangedNoti[i].fUserText)
          } else if (logItemStr.includes('U__SEND') && logItemStr.includes('M__BODY')) {
            names = logItemStr.replace(/U__SEND\s*(.*?)M__BODY/, this.mChangedNoti[i].fUserText)
          } else if (logItemStr.includes('U__SEND') && !logItemStr.includes('C__BODY') && !logItemStr.includes('M__BODY')) {
            names = logItemStr.replace('U__SEND', '')
          }

          // 내용 교체
          var matches
          if (logItemStr.includes('C__BODY') && logItemStr.includes('M__BODY')) {
            matches = logItemStr.match(/C__BODY([\s\S]*?)M__BODY/)
            bodys = matches ? matches[1] : null
            matches = logItemStr.match(/M__BODY([\s\S]*)/)
            comments = matches ? matches[1] : null
          } else if (logItemStr.includes('C__BODY') && !logItemStr.includes('M__BODY')) {
            matches = logItemStr.match(/C__BODY([\s\S]*)/)
            bodys = matches ? matches[1] : null
          }
          // 교체한 내용 넣어주기
          if (this.mChangedNoti[i].dispText.includes('${' + 'U__SEND' + '}')) {
            this.mChangedNoti[i].dispText = this.mChangedNoti[i].dispText.replace('${' + 'U__SEND' + '}', names)
          }
          if (this.mChangedNoti[i].dispText.includes('${' + 'C__BODY' + '}')) {
            this.mChangedNoti[i].dispText = this.mChangedNoti[i].dispText.replace('${' + 'C__BODY' + '}', bodys)
          }
          if (this.mChangedNoti[i].dispText.includes('${' + 'M__BODY' + '}')) {
            this.mChangedNoti[i].dispText = this.mChangedNoti[i].dispText.replace('${' + 'M__BODY' + '}', comments)
          }
          if (this.mChangedNoti[i].dispText.includes('${' + 'B__NAME' + '}')) {
            this.mChangedNoti[i].dispText = this.mChangedNoti[i].dispText.replace('${' + 'B__NAME' + '}', '새 쪽지')
          }
        }
      }
      return this.mChangedNoti
    },
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
    goFollowList () {
      var param = {}
      param.targetType = 'followList'
      param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
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
.myPagePicImgWrap {width: 50px; height: 50px; position: relative; border-radius: 80px; border:2.5px solid rgb(74 102 158); background-color: #879dc945;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem}
.myPagePicImgWrap img {width: 100%; position: absolute; top: 0; left: 0;}

.myProfileRight {width: calc(100% - 100px); height: 100%; float: left;}
.myProfileRightContents {width: 100%; height: 30px; line-height: 30px; float: left; text-align: left;}
.myProfileRightIcon {width: 15px;height: 15px;margin-right: 5px;float: left;margin-top: 2.5px;}
.myProfileRightName {margin-right: 5px;width: 40px;height: 20px;line-height: 20px;float: left; font-weight: bold;}
.myProfileRightInfo {width: calc(100% - 25px); height: 20px; cursor: pointer; line-height: 20px; float: left;}
.profileSetting {font-weight: bold; box-shadow: 0 0 7px 3px #b7b4b440; border-radius: 15px; background-color: #879dc9; color: #fff; float: left}

.commonBigBtn{cursor: pointer; width: 90px;height: 30px;line-height: 30px;margin-top: 5px;float: right;background-color: #879dc9;border-radius: 0.8rem;color: #fff;}

.mainContentsBoxArea {
  background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px; box-shadow: 0 0 7px 3px #b7b4b440;
}
</style>
