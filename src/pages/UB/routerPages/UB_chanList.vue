<template>
  <div class="w100P h100P" style="padding-bottom: 60px;" :style="'padding-top: ' + (Number(this.$STATUS_HEIGHT) + 50 )+ 'px'">
    <div style="width: 100%; height: 100%;  float: left; background: #fff; position: relative;">

      <!-- <findChannelList @searchList="requestSearchList" v-if="mChanFindPopShowYn" @closePop='mChanFindPopShowYn = false' @goChannelMain='searchCloseNopenPop' /> -->
      <div v-if="GE_DISP_TEAM_LIST.length === 0 && mEndListYn === false" style="width: 100%; min-height: 100%;">
          <chanSkeleton  v-for="(value) in 10" :key="value"/>
      </div>
      <div id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style="overflow: hidden scroll; height: 100%; width: 100%; " @mousedown="testTwo" @mouseup="testTr">
          <gEmpty :tabName="mCurrentTabName" contentName="채널" v-if="mEmptyYn && this.GE_DISP_TEAM_LIST.length === 0" style="margin-top:50px;" />
          <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index">
            <!-- <channelCard class="moveBox chanRow cursorP" :chanElement="chanEle" @click="goChannelMain(chanEle)" @scrollMove="scrollMove" /> -->
            <channelCard class="moveBox chanRow cursorP" :chanElement="chanEle" @scrollMove="scrollMove" />
            <myObserver v-if="this.GE_DISP_TEAM_LIST.length > 0 && index === GE_DISP_TEAM_LIST.length - 5" @triggerIntersected="loadMore" class="fl wich" />
          </template>
      </div>
      <div @click="$router.push('/findChan')" class="cursorP" style="position: absolute; cursor: pointer; right: 10%; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #8B8AD1; width: 50px; height: 50px; background-color: #fff;" :style="'bottom:' + (this.$STATUS_HEIGHT + 60)+ 'px'">
        <img style="width: 50%;" src="@/assets/images/button/icon_search_color.svg" alt="채널 만들기 버튼">
      </div>
      <div style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px;  right: 10%;" :style="'bottom:' + (this.$STATUS_HEIGHT + 150)+ 'px'"  @click="refreshList">
          <img src="@/assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;">
      </div>
    </div>
  </div>
</template>

<script>
import channelCard from '@/components/list/D_channelCard.vue'
/* import loadingCompo from '../../components/layout/Tal_loading.vue' */

import chanSkeleton from '@/components/pageComponents/channel/D_channelSkeleton.vue'
export default {
  name: 'user',
  components: {
    channelCard,
    /* loadingCompo, */
    chanSkeleton
  },
  data () {
    return {
      // mSearchList: [{ searchType: '정렬', dispName: '전체' }, { searchType: '산업군', dispName: '전체' }, { searchType: '유형', dispName: '전체' }],
      mSearchList: [{ searchType: this.$t('COMMON_NAME_CATEGORY'), dispName: this.$t('COMMON_TAB_ALL') }],
      mSelectSearchObj: {},
      mBottomSheetOpenYn: false,
      mChannelList: [],
      mPaddingTop: 50,
      mChanListScrollBox: null,
      mScrollPosition: 0,
      mScrollDirection: null,
      mFirstContOffsetY: null,
      mScrolledYn: false,
      mHeaderTop: 0,
      mOffsetInt: 0,
      mEndListYn: false,
      mViewTab: 'all',
      mActiveTabList: [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }],
      mChanFindPopShowYn: false,
      mResultSearchKeyList: '',
      myChanListPopYn: false,
      mScrollCheckSec: 0,
      mListShowYn: true,
      mCurrentTabName: this.$t('COMMON_TAB_ALL'),
      mEmptyYn: true,
      mLoadingYn: false,
      mAxiosQueue: [],
      mSearchCateKey: 3
    }
  },
  props: {
    pOpenUnknownLoginPop: Function,
    params: {},
    popYn: Boolean,
    propData: {},
    initData: {}
  },
  updated () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    if (this.mChanFindPopShowYn) {
      this.findPaddingTopChan()
    }
  },
  mounted () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')

    if (!this.initData) this.changeTab(this.mViewTab)

    this.$emit('closeLoading')
    this.mLoadingYn = false
  },
  async created () {
    this.$emit('changePageHeader', this.$t('COMMON_NAME_CHANNEL'))
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.mViewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    if (this.initData) {
      this.mChannelList = this.initData.content
      if (this.initData.totalElements < (this.initData.pageable.offset + this.initData.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
    }
    /* if (!this.GE_DISP_TEAM_LIST || this.GE_DISP_TEAM_LIST.length === 0) {
      var resultList = await this.getChannelList(null, null, false)
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      this.mChannelList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
    } */

    this.introChanPageTab()
    this.mScrolledYn = false
    this.findPaddingTopChan()

    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      this.$emit('showCloudLoading', false)
    }, 1500)
  },
  methods: {
    goChannelMain (param) {
      const pageParam = {}
      pageParam.targetKey = param.teamKey
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    searchCloseNopenPop (openPopParam) {
      this.mChanFindPopShowYn = false
      this.openPop(openPopParam)
    },
    searchBoxClick (searchData) {
      this.mSelectSearchObj = searchData
      this.mBottomSheetOpenYn = true
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ teamKey }) => teamKey === current.teamKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    findPaddingTopChan () {
      // 검색 시 리스트와 검색팝업 패딩 설정
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.mPaddingTop = element.clientHeight + 50
      }
    },
    async refreshAll () {
      // 새로고침
      this.mResultSearchKeyList = []
      this.changeTab('user')
      await this.$refs.activeBar.switchtab(0)
      var chanListWrap = await this.$refs.chanListWrap
      await chanListWrap.scrollTo({ top: 0 })
    },
    scrollMove () {
      if (this.GE_DISP_TEAM_LIST.length > 0) {
        var chanListWrap = this.$refs.chanListWrap
        chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    introChanPageTab () {
      if (this.mViewTab === 'user') {
        this.mCurrentTabName = this.$t('COMMON_TAB_FOLLOWING')
      } else if (this.mViewTab === 'all') {
        this.mCurrentTabName = this.$t('COMMON_TAB_ALL')
      } else if (this.mViewTab === 'mychannel') {
        this.mCurrentTabName = this.$t('COMMON_TAB_MANAGING')
      }
    },
    async refreshList () {
      this.mEndListYn = false
      this.mChannelList = []
      this.mScrolledYn = false
      var pSize = 10
      if (this.mOffsetInt !== 0 && this.mOffsetInt !== '0' && Number(this.mOffsetInt) > 0) {
        pSize = Number(this.mOffsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getChannelList(pSize, 0, null)
      this.mChannelList = resultList.content
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      this.mChannelList = resultList.content
      var chanListWrap = await this.$refs.chanListWrap
      // eslint-disable-next-line no-debugger
      debugger
      await chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
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
    async loadMore (pageSize) {
      if (this.mEndListYn === false) {
        var resultList = await this.getChannelList()
        if (resultList === undefined) return
        var addList = []
        for (var i = 0; i < resultList.content.length; i++) {
          if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            addList.push(resultList.content[i])
          }
        }
        if (addList.length > 0) {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', addList)
        }
        const newArr = [
          ...this.mChannelList,
          ...resultList.content
        ]
        this.mChannelList = newArr
      }
    },
    openManagerChanDetail (openParam) {
      this.$emit('openPop', openParam)
    },
    allChannelInfo () {
      for (var i = 0; i < this.GE_DISP_TEAM_LIST.length; i++) {
        if (this.GE_DISP_TEAM_LIST[i].userTeamInfo) {
          this.GE_DISP_TEAM_LIST[i].ownerYn = this.GE_DISP_TEAM_LIST[i].userTeamInfo.ownerYn
          if (this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey) {
            this.GE_DISP_TEAM_LIST[i].managerKey = this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey
          }
        }
      }
    },
    async changeTab (tab) {
      this.mViewTab = tab
      this.mOffsetInt = 0
      this.mListShowYn = false
      this.mEmptyYn = false
      this.mChannelList = []
      this.mEndListYn = false
      // this.GE_DISP_TEAM_LIST = []
      var resultList = await this.getChannelList(undefined, 0, true)

      var addList = []
      if (!resultList) return
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          addList.push(resultList.content[i])
        }
      }
      if (addList.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', addList)
      }
      this.mChannelList = resultList.content
      if (this.mChannelList.length === 0) this.mEmptyYn = true

      this.mListShowYn = true
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
      if (this.mViewTab === 'all') {
        this.allChannelInfo()
      }
      if (this.mViewTab === 'mychannel') {
        this.myChanListPopYn = true
      } else {
        this.myChanListPopYn = false
      }
      this.scrollMove()
      this.introChanPageTab()
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      if (this.mAxiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
      this.mAxiosQueue.push('getChannelList')
      var paramMap = new Map()
      var userKey = this.GE_USER.userKey
      if (this.mViewTab === 'user') {
        paramMap.set('userKey', userKey)
      } else if (this.mViewTab === 'all') {
        paramMap.set('fUserKey', userKey)
      } else if (this.mViewTab === 'mychannel') {
        paramMap.set('userKey', userKey)
        paramMap.set('managerYn', true)
      }
      // paramMap.set('cateItemKey', 3)
      if (this.mResultSearchKeyList.length > 0) {
        paramMap.set('nameMtext', this.mResultSearchKeyList[0].keyword)
      }
      if (offsetInput !== undefined) {
        paramMap.set('offsetInt', offsetInput)
      } else {
        if (this.mOffsetInt === 0 && this.mChannelList.length === 10) this.mOffsetInt = 1
        paramMap.set('offsetInt', this.mOffsetInt)
      }
      if (pageSize) {
        paramMap.set('pageSize', pageSize)
      } else {
        paramMap.set('pageSize', 10)
      }
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
    async requestSearchList (paramMap) {
      this.mResultSearchKeyList = await this.castingSearchMap(paramMap)
      var resultList = await this.getChannelList(null, null, true)
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
      this.mChannelList = resultList.content
      this.mViewTab = 'all'
      this.$refs.activeBar.switchtab(1)// 전체
      this.$refs.activeBar.selectTab('all')// 전체
      this.mChanFindPopShowYn = false
    },
    async castingSearchMap (sMap) {
      var searchObj = {}
      var resultArray = []
      if (sMap.get('nameMtext') !== undefined && sMap.get('nameMtext') !== null && sMap.get('nameMtext') !== '') {
        searchObj.typeName = this.$t('COMMON_NAME_CHANNEL')
        searchObj.keyword = sMap.get('nameMtext')
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (idx) {
      this.mResultSearchKeyList.splice(idx, 1)
      if (this.mResultSearchKeyList.length === 0) {
        this.mPaddingTop = 50
      }
      this.mOffsetInt = 0
      var resultList = await this.getChannelList(null, null, true)
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      this.mChannelList = resultList.content
      this.findPaddingTopChan()
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
    }
  },
  computed: {
    calcPaddingTop () {
      return {
        '--paddingTopLength': this.mPaddingTop + 'px'
      }
    },
    GE_NEW_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CHAN_LIST']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
      return this.$store.state.historyStack
    },
    GE_CREATE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_CREATE_CHAN_LIST']
    },
    GE_REMOVE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_REMOVE_CHAN_LIST']
    },
    GE_UPDATE_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_UPDATE_CHAN_LIST']
    }
  },
  watch: {
    GE_CREATE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        this.mChannelList.unshift(value[0])

        this.$store.dispatch('D_CHANNEL/AC_CREATE_CHANNEL_DEL', value[0])
      },
      deep: true
    },
    GE_REMOVE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        var findDelIdx = this.mChannelList.findIndex(item => item.teamKey === value[0].teamKey)
        if (findDelIdx !== -1) {
          this.mChannelList.splice(findDelIdx, 1)
          this.$store.dispatch('D_CHANNEL/AC_REMOVE_CHANNEL_DEL', value[0])
        } else {
          return false
        }
      },
      deep: true
    },
    GE_USER: {
      immediate: true,
      handler (val, old) {
        if (val.unknownYn) {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'all' }]
        } else {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
        }
      }
    },
    GE_UPDATE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        this.$addChanList(value[0].teamKey)
        this.$store.dispatch('D_CHANNEL/AC_DEL_UPDATE_CHAN_LIST', value[0])
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
