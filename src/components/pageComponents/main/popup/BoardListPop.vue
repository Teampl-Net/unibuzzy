<i18n>
{
  "ko": {
    "CHAN_POST_NONE_CONT": "버튼을 눌러 첫 컨텐츠를 작성해보세요.",
    "CHAN_POST_MSG_SET_ERROR": "작성 setting 중 오류",
    "CHAN_POST_NO_PERMI": "권한이 없습니다.",
    "CHAN_POST_TITLE": "제목",
    "CHAN_POST_CRE_USER": "작성자",
    "CHAN_POST_SENT": "보낸",
    "CHAN_POST_DATE": "날짜",
    "CHAN_POST_FILTER": "필터",
    "CHAN_POST_STAT": "분류"
  },
  "en": {
    "CHAN_POST_NONE_CONT": "Create the first content for your channel's bulletin board.",
    "CHAN_POST_MSG_SET_ERROR": "Error during creation setting",
    "CHAN_POST_NO_PERMI": "You don't have permission.",
    "CHAN_POST_TITLE": "Title",
    "CHAN_POST_CRE_USER": "Writer",
    "CHAN_POST_SENT": "Sent",
    "CHAN_POST_DATE": "Date",
    "CHAN_POST_FILTER": "Filter",
    "CHAN_POST_STAT": "Status"
  }
}
</i18n>
<template>
    <div class="boardListWrap">
        <div class="font16 fontBold w100P boardListTitle">
          <div class="boardListTitleText">
            <img src="/resource/logo/gtLogo.png" alt="">
            <p class="textOverdot textLeft font25">{{ pAreaInfo.bdAreaNameMtext }} Area</p>
          </div>
          <div class="cursorP closeBox" @click="closeXPop">
            <img src="@/assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <div class="searchBox">
            <select class="fl" v-model="viewTab" id="contListFilter" @change="changeTab()">
                <option v-for="(opt, index) in mCommonFilterList" :key="index" :value="opt.name">{{opt.display}}</option>
            </select>
            <div @click="openFindPop" class="cursorP font14 lightGray searchBtn" :style="resultSearchKeyList && resultSearchKeyList.length > 0? '':'margin-bottom: 10px;'">Click to Search</div>
            <div v-if="resultSearchKeyList && resultSearchKeyList.length > 0" class="pagePaddingWrap fl searchItemBox">
                <searchResult @changeSearchList="requestSearchList" :searchList="resultSearchKeyList" />
            </div>
        </div>
        <div ref="pushListWrapWrapCompo" class="contentsListWrap" :style="resultSearchKeyList.length? 'height: calc(100% - 230px);':''">
            <template v-for="(cont, index) in GE_DISP_CONTS_LIST" :key="cont.contentsKey" >
                <gUBContentsBox  :pUnknownYn="false" ref="myContentsBox"  @openImgPop="openImgPop" :imgClickYn="true" :propDetailYn="false" :contentsEle="cont" @openPage="goChannelMain" @openPop="openPop" :propContIndex='index' @contDelete='contDelete' />
                <myObserver v-if="GE_DISP_CONTS_LIST && GE_DISP_CONTS_LIST.length > 13 ?  index === GE_DISP_CONTS_LIST.length - 13 : index === GE_DISP_CONTS_LIST.length" @triggerIntersected="loadMore" id="observer" class="fl w100P" style="float: left;"></myObserver>
            </template>
            <template v-if="(!GE_DISP_CONTS_LIST || GE_DISP_CONTS_LIST.length === 0) && mShowSkeletonYn">
                <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
            </template>
            <gListEmpty  v-else-if="!GE_DISP_CONTS_LIST || GE_DISP_CONTS_LIST.length === 0" title='Nothing Found.' subTitle='Try again.' option='SELE' :subTitleYn='true' />
        </div>
        <div class="goBtnWrap">
          <gBtnSmall @click="goChannelMain(pAreaInfo)" btnTitle="Go Channel" class="fr" />
        </div>
        <transition name="showModal">
            <findContentsList style="height: 100% !important;" ref="findContentRef" transition="showModal" @searchList="requestSearchList" v-if="mFindPopShowYn" @closePop="mFindPopShowYn = false" />
        </transition>
    </div>
</template>

<script>
import searchResult from '@/components/unit/UB_searchResult.vue'
import findContentsList from '@/components/popup/common/UB_findContentsList.vue'
import SkeletonBox from '@/components/pageComponents/push/UB_contentsSkeleton'
export default {
  components: {
    findContentsList,
    searchResult,
    SkeletonBox
  },
  props: {
    pClosePop: Function,
    pTownTeamKey: Number,
    pAreaInfo: Object
  },
  data () {
    return {
      mCommonFilterList: [{ display: 'Popular', name: 'P' }, { display: 'Recent', name: 'N' }],
      viewTab: 'P',
      popId: 'mainBoardListPop',
      mCabKeyListStr: null,
      mAxiosQueue: [],
      findKeyList: {},
      resultSearchKeyList: [],
      mCanLoadYn: true,
      mEndListYn: false,
      mContsList: null,
      mPageSize: 20,
      mOffsetInt: 0,
      mFindPopShowYn: false,
      mShowSkeletonYn: true
    }
  },
  created () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
    var this_ = this
    this.getTownCabinetList().then((res) => {
      this.getMyContentsList(null, null, true).then((result) => {
        this_.setContsList(result)
      })
    })
  },
  methods: {
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
      pageParam.cabinetKeyListStr = this.mCabKeyListStr
      this.$emit('openPage', pageParam)
    },
    async changeTab () {
      this.requestSearchList()
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    openPop (openPopParam) {
      // 컨텐츠 작성을 누를 시 바텀시트를 닫아주는 중!
      if (this.mSeleteWriteTypePopShowYn === true) this.mSeleteWriteTypePopShowYn = false
      this.$emit('openPop', openPopParam)
    },
    contDelete (contentIndex) {
      this.GE_DISP_CONTS_LIST.splice(contentIndex, 1)

      // 삭제 후 리로드가 되지 않아 상위 div에 reload키를 넣어 다시 그려주었습니다. -- 다시 그려도 스크롤 이동하지 않았음
      this.mReloadKey += 1

      this.changeTab()
    },
    openFindPop () {
      this.mFindPopShowYn = true
    },
    closeFindPop () {
      if (this.$refs.findContentRef) {
        this.$refs.findContentRef.closeXPop()
      }
    },
    async castingSearchMap (param) {
      var searchObj = {}
      var resultArray = []
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = this.$t('CHAN_POST_TITLE')
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
        searchObj.typeName = this.$t('CHAN_POST_CRE_USER')
        searchObj.type = 'creUserName'
        searchObj.keyword = param.creUserName
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = this.$t('CHAN_POST_SENT')
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = this.$t('CHAN_POST_DATE')
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
        searchObj.typeName = this.$t('CHAN_POST_FILTER')
        searchObj.type = 'workStatCodeKey'
        searchObj.keyword = param.codeNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
        searchObj.typeName = this.$t('CHAN_POST_STAT')
        searchObj.type = 'stickerKey'
        searchObj.keyword = this.$changeText(param.selectedSticker.nameMtext)
        resultArray.push(searchObj)
      }
      this.findPopShowYn = false
      return resultArray
    },
    async requestSearchList (param) {
      this.mOffsetInt = 0
      this.mContsList = []
      this.mShowSkeletonYn = true
      if (param === 'searchKey') {
        this.findKeyList.searchKey = null
      } else if (param === 'creUserName') {
        this.findKeyList.creUserName = null
      } else if (param === 'creTeamNameMtext') {
        this.findKeyList.creTeamNameMtext = null
      } else if (param === 'creDate') {
        this.findKeyList.toCreDateStr = null
        this.findKeyList.fromCreDateStr = null
      }
      this.resultSearchKeyList = []
      this.targetCKey = null
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
          this.findKeyList.creUserName = param.creUserName
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        } if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
          this.findKeyList.workStatCodeKey = param.workStatCodeKey
          this.findKeyList.codeNameMtext = param.codeNameMtext
        } if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
          this.findKeyList.selectedSticker = param.selectedSticker
        }
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      this.closeFindPop()
      var resultList = await this.getMyContentsList(null, null, false)
      this.setContsList(resultList)
    },
    async getTownCabinetList () {
      if (this.pTownTeamKey) {
        var param = {}
        param.parentTeamKey = this.pTownTeamKey
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getTownCabinetList',
          param: param
        })
        if (result && result.data && result.data.result) {
          this.mCabKeyListStr = result.data.cabinetKeyListStr
        }
      }
    },
    async setContsList (resultList) {
      if (!resultList) {
        this.mShowSkeletonYn = false
        return
      }
      var newArr = []
      this.endListSetFunc(resultList)
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      if (!this.mContsList) this.mContsList = []
      if (this.mContsList.length > 0) {
        newArr = [
          ...this.mContsList,
          ...resultList.content
        ]
      } else {
        newArr = resultList.content
      }
      this.mContsList = this.replaceArr(newArr)
      this.mShowSkeletonYn = false
    },
    async loadMore (descYn) {
      if (this.mCanLoadYn && this.mEndListYn === false) {
        this.mCanLoadYn = false
        try {
          var resultList = await this.getMyContentsList(null, null, false)
          this.setContsList(resultList)
        } catch (e) {
          console.log(e)
        } finally {
          this.mCanLoadYn = true
          var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
          if (queueIndex !== -1) this.mAxiosQueue.splice(queueIndex, 1)
        }
      } else {
      }
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn, searchParam) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}
      if (searchParam) {
        param = searchParam
      }
      if (this.viewTab === 'P') {
        param.orderbyStr = 'a.popPoint DESC, a.creDate DESC'
      } else if (this.viewTab === 'N') {
        param.orderbyStr = 'a.creDate DESC'
      }
      param.myUserKey = this.GE_USER.userKey
      param.cabinetKeyListStr = this.mCabKeyListStr
      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }

      if (this.findKeyList) {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          param.title = this.findKeyList.searchKey
        } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.findKeyList.toCreDateStr
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.findKeyList.fromCreDateStr
        } if (this.findKeyList.workStatCodeKey !== undefined && this.findKeyList.workStatCodeKey !== null && this.findKeyList.workStatCodeKey !== '') {
          param.workStatCodeKey = this.findKeyList.workStatCodeKey
        } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
          param.creUserName = this.findKeyList.creUserName
        } if (this.findKeyList.selectedSticker) {
          param.findActStickerYn = true
          param.findActYn = true
          param.stickerKey = this.findKeyList.selectedSticker.stickerKey
        }
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      return resultList
    },
    endListSetFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
        if (this.mOffsetInt > 0) this.mOffsetInt -= 1
      } else {
        this.mEndListYn = false
        this.mOffsetInt += 1
      }
    },
    replaceArr (arr) {
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    closeXPop () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        if (this.pClosePop) {
          this.pClosePop()
        }
      } else {
        this.pClosePop()
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
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
    pageUpdate (value, old) {
      this.closeXPop()
    }
  }
}
</script>

<style scoped>
.boardListWrap {
  padding: 10px 20px;
  background: rgb(255 255 255 / 65%);backdrop-filter: blur( 9px );
  position: absolute;
  z-index: 9999;
  bottom: 10%;
  box-shadow: rgb(0 0 0 / 26%) 0px -6px 13px 4px;
  left: 10%;
  height: 80%;
  width: 80%;
  border-radius: 0.8rem 0.8rem 0.8rem 0.8rem;
}
.boardListTitle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.boardListTitleText {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.boardListTitleText > img {
  width: 45px;
  margin-right: 5px;
}
.boardListTitleText > p {
  width: calc(100% - 40px);
}
.closeBox, .closeBox > img {
  width: 25px;
}
.searchBox {
  float: left;
  width: 100%;
  padding: 20px 0px;
}
.searchBox > select {
  height: 35px;
  width: 95px;
  margin-right: 5px
}
.searchBtn {
  width: calc(100% - 100px);
  float: left;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #FFFFFF;
  text-align: left;
  padding: 5px 10px;
}
.searchItemBox {
  padding-top: 0;
  padding-left: 0px;
  max-height: 50px;
  width: 100%;
  float: left
}
.contentsListWrap {
  width: 100%;
  height: calc(100% - 190px);
  overflow: hidden auto;
}
.goBtnWrap {
  height: 50px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
