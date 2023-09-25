<i18n>
{
  "ko": {
    "FIND_TITLE_CHANNEL": "채널 검색",
    "SEAR_BTN_CLEAR": "전체삭제",
    "SEAR_MSG_ENTER_CHANNAME": "채널명을 입력해주세요",
    "SEAR_MSG_NOT_SEARCH": "최근 검색한 결과가 없어요"
  },
  "en": {
    "FIND_TITLE_CHANNEL": "Search Channel",
    "SEAR_MSG_RECE_KEYWORD": "Recent Keywords",
    "SEAR_BTN_CLEAR": "Clear",
    "SEAR_MSG_ENTER_CHANNAME": "Please enter a channel's name.",
    "SEAR_MSG_NOT_SEARCH": "Oops! You haven't searched anything yet."
  }
}
</i18n>
<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="w100P h100P ptop-50" :style="'padding-top:' + (this.$STATUS_HEIGHT + 50 )+ 'px'" >
    <!-- <gPopHeader :headerTitle="$t('SEAR_TITLE_CHAN')" @closeXPop="closeXPop" style="position: fixed; top: 0;box-shadow: 0px 7px 9px -9px #00000036;"/> -->
    <div class="findPopBody mtop-05">
      <div class="searchInputArea">
        <img @click="findChannel" class="searchIcon cursorP img-w20" src="../../../assets/images/common/iocn_search_gray.png" alt="검색버튼">
        <input class="searchInput font14 fontBold" id="chanSearchInput"  @click="searchPopClear()" ref="channelSearchKey" @keyup.enter="findChannel" v-model="nameMtext" :placeholder="$t('SEAR_MSG_ENTER_CHANNAME')" />
        <img src="../../../assets/images/common/grayXIcon.svg" v-if="mFindKeyWord !== ''" @click="searchPopClear()" class="fr img-w10 mtop-03 xIcon" alt="">
      </div>

      <template v-if="mFindKeyWord === ''">
        <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft">{{ $t('SEAR_MSG_RECE_KEYWORD') }}</p>
        <template v-if="mSearchHistoryList.length > 0">
          <div v-for="(data, index) in mSearchHistoryList" :key="index" class="fl w100P searchItem">
            <p class="fl font14 grayBlack textLeft" @click="nameMtext = data, findChannel()">{{data}}</p>
            <img src="../../../assets/images/common/grayXIcon.svg" @click="searchHistoryDelete(index)" class="fr img-w10 mtop-03" alt="">
          </div>

          <p v-if="mSearchHistoryList.length > 0" class="fr font12 lightGray mtop-05" @click="searchHistoryClear()">{{ $t('SEAR_BTN_CLEAR') }}</p>
        </template>
        <div v-else>
          <p class="fl w100P font16 lightGray textCenter mtop-1">{{ $t('SEAR_MSG_NOT_SEARCH') }}</p>
        </div>
      </template>
    </div>

    <template v-if="mFindKeyWord !== '' && this.GE_DISP_TEAM_LIST.length > 0">
      <div class="w100P fl chanCardWrap">
        <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index">
          <gChannelCard class="moveBox chanRow" :chanElement="chanEle" @openPop="goChannelMain" />
          <myObserver v-if="index === GE_DISP_TEAM_LIST.length - 1" @triggerIntersected="loadMore" class="fl wich" />
        </template>
      </div>
    </template>
    <template v-if="mFindKeyWord !== '' && this.GE_DISP_TEAM_LIST.length === 0">
      <div class="w100P fl chanEmptyWrap">
        <gListEmpty title="There's no search result." subTitle='Would you like to search again?' option='SELE' :subTitleYn='true' />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newestSearchKeyWordList: {},
      newestSearchYn: false,
      nameMtext: '',
      popId: null,

      mSearchHistoryList: [],
      mFindKeyWord: '',
      mChannelList: [],
      mAxiosQueue: [],
      mEndListYn: false,
      mOffsetInt: 0
    }
  },
  props: {
    tab: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_TEAM_LIST () {
      var index = null
      var teamList = this.GE_MAIN_CHAN_LIST
      for (var i = 0; i < this.mChannelList.length; i++) {
        index = teamList.findIndex((item) => item.teamKey === this.mChannelList[i].teamKey)
        if (index !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.mChannelList[i] = teamList[index]
        }
      }
      var returnData = this.mChannelList
      return returnData
    },
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        var history = this.$store.getters['UB_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', history)
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  created () {
    this.$emit('changePageHeader', this.$t('FIND_TITLE_CHANNEL'))
  },
  mounted () {
    document.getElementById('chanSearchInput').focus()
    var localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordHistoryList'))
    if (localKeyWordOBJ === undefined || localKeyWordOBJ === null || localKeyWordOBJ === '') {
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify([]))
      localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordHistoryList'))
    }
    console.log(localKeyWordOBJ)
    this.mSearchHistoryList = localKeyWordOBJ
    console.log(this.mSearchHistoryList)
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
      this.$emit('openPage', pageParam)
    },
    openPop (openPopParam) {
      this.$emit('goChannelMain', openPopParam)
    },
    async getChannelList (mLoadingYn) {
      if (this.mAxiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
      this.mAxiosQueue.push('getChannelList')
      var paramMap = new Map()

      paramMap.set('fUserKey', this.GE_USER.userKey)
      // paramMap.set('cateItemKey', 3)
      paramMap.set('nameMtext', this.nameMtext)
      paramMap.set('offsetInt', this.mOffsetInt)
      paramMap.set('pageSize', 10)

      // if (this.mViewTab === 'user') {
      //   paramMap.set('userKey', userKey)
      // } else if (this.mViewTab === 'all') {
      //   paramMap.set('fUserKey', userKey)
      // } else if (this.mViewTab === 'mychannel') {
      //   paramMap.set('userKey', userKey)
      //   paramMap.set('managerYn', true)
      // }
      // if (this.mResultSearchKeyList.length > 0) {
      //   paramMap.set('nameMtext', this.mResultSearchKeyList[0].keyword)
      // }
      // if (offsetInput !== undefined) {
      //   paramMap.set('offsetInt', offsetInput)
      // } else {
      //   paramMap.set('offsetInt', this.mOffsetInt)
      // }
      // if (pageSize) {
      //   paramMap.set('pageSize', pageSize)
      // } else {
      //   paramMap.set('pageSize', 10)
      // }
      var noneLoadingYn = true
      if (mLoadingYn) {
        noneLoadingYn = false
      }
      var result = await this.$getTeamList(paramMap, noneLoadingYn)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getChannelList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result.data
      this.endListSetFunc(resultList)
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
    searchHistoryDelete (idx) {
      this.mSearchHistoryList.splice(idx, 1)
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify(this.mSearchHistoryList))
    },
    searchHistoryClear () {
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify([]))
      this.mSearchHistoryList = []
    },
    searchPopClear () {
      this.mFindKeyWord = ''
      this.nameMtext = ''
      this.mChannelList = []
    },
    closeXPop () {
      this.$emit('closePop')
    },
    async findChannel () {
      this.mChannelList = []
      var find = this.mSearchHistoryList.findIndex(item => item === this.nameMtext)
      if (find !== -1) { this.mSearchHistoryList.splice(find, 1) }
      this.mSearchHistoryList.unshift(this.nameMtext)
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify(this.mSearchHistoryList))
      this.mFindKeyWord = this.nameMtext
      // var paramMap = new Map()
      // if (this.nameMtext !== undefined && this.nameMtext !== null && this.nameMtext !== '') {
      //   paramMap.set('nameMtext', this.nameMtext)
      // }
      // this.$emit('searchList', paramMap)
      var result = await this.getChannelList(true)
      this.mChannelList = result.content
      console.log(this.mChannelList)
    }
  }
}
</script>

<style scoped>
.findPopBody {
  padding: 0 1.5rem;
}
.findPopupWrap {
  position: fixed;
  width: 100%;
  left: 0;
  height: 100vh;
  top: 0;
  z-index: 999999;
  background: #FFFFFF;
}
.findPopMainSearchArea {
  position: relative;
  margin-top: 0.5rem;
  height: 40px;
}
.searchIcon {
  position: absolute;
  top: 0.6rem;
  left: 8px;
}
.searchInput {
  background: #e4e4e463;
  width: 100%;
  height: 40px;
  margin-bottom: 5px!important;
  border-radius: 12px !important;
  padding: 0.4rem;
  padding-left: 2rem !important;
  box-sizing: border-box;
  float: left;
  border: 1px solid #cccccc;
}
.searchInputArea {
  position: relative;
  margin: 1rem 0;
  min-height: 50px;
}
.xIcon {
  position: absolute;
  top:0.6rem;
  right: 10px;
}
.searchItem {
  padding: 10px 0;
  border-bottom:1px solid #CCCCCC90;
}
.searchItem > p {
  width: calc(100% - 20px);
}
.chanCardWrap {
  overflow: auto;
  height: calc(100% - 90px);
}
.chanEmptyWrap {
  overflow: auto;
  height: calc(100% - 200px);
  position: relative;
}
.newestSearchWrap {
  border-radius: 10px;
  background-color: #F5F5F9;
  height: 150px;
  width: 100%;
  padding: 0.4rem 1rem;
  box-sizing: border-box;
}

@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
}

</style>
