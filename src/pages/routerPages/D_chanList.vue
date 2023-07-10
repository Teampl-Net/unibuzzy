<i18n>
{
  "ko": {
    "LIST_TITLE_CRE_CHAN": "채널 생성",
    "CHAN_LIST_MSG_ID": "실명인증을 하면 채널을 생성할 수 있어요",
    "CHAN_LIST_NAME_TYPE": "유형",
    "CHAN_LIST_NAME_SORT": "정렬"
  },
  "en": {
    "LIST_TITLE_CRE_CHAN": "Create a Channel",
    "CHAN_LIST_MSG_ID": "You can create a channel if you authenticate your real name",
    "CHAN_LIST_NAME_TYPE": "Type",
    "CHAN_LIST_NAME_SORT": "Sort"
  }
}
</i18n>
<template>
    <div style="float: left; width: 100%; height: 100%; overflow: hidden;" :style="this.$route.path === '/chanList'? 'margin-top:' + (this.$STATUS_HEIGHT + 50)+ 'px; padding-bottom: 80px;':''">
        <div style="width: 100%; height: 100%;  float: left; background: #fff; position: relative;">
            <!-- <loadingCompo v-if="mLoadingYn === true"/> -->
            <!-- <div class="chanListHeaderBase " > -->
            <div class="chanListHeader " v-on="handleScroll" ref="chanListHeader" id="chanListPageHeader" :class="this.mScrolledYn? 'chanListHeader--unpinned': 'chanListHeader--pinned'">
                <gActiveBar :channelYn="true" :searchYn='true' @changeSearchList="changeSearchList" @openFindPop="this.mChanFindPopShowYn = true" :resultSearchKeyList="this.mResultSearchKeyList" ref="activeBar" :tabList="this.mActiveTabList" class="fl" style="" @changeTab="changeTab" :propSearchList='mSearchList' @searchBoxClick='searchBoxClick'></gActiveBar>
            </div>
            <!-- </div> -->

            <findChannelList @searchList="requestSearchList" v-if="mChanFindPopShowYn" @closePop='mChanFindPopShowYn = false' @goChannelMain='searchCloseNopenPop' />
            <div v-if="GE_DISP_TEAM_LIST.length === 0 && mEndListYn === false" style="margin-top: 80px; width: 100%; min-height: 100%;">
                <chanSkeleton  v-for="(value) in 10" :key="value"/>
            </div>
            <div id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style="padding-top: calc(25px + var(--paddingTopLength)); overflow: hidden scroll; height: 100%; width: 100%; " @mousedown="testTwo" @mouseup="testTr">
                <gEmpty :tabName="mCurrentTabName" contentName="채널" v-if="mEmptyYn && this.GE_DISP_TEAM_LIST.length === 0" style="margin-top:50px;" />
                <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index">
                  <channelCard class="moveBox chanRow" :chanElement="chanEle" @openPop="openPop" @scrollMove="scrollMove" />
                  <myObserver v-if="this.GE_DISP_TEAM_LIST.length > 0 && index === GE_DISP_TEAM_LIST.length - 5" @triggerIntersected="loadMore" class="fl wich" />
                </template>
            </div>
            <img src="../../assets/images/button/Icon_CreChanBtn.png" @click="clickCreateChannel" alt="채널 만들기 버튼" style="position: absolute; cursor: pointer; right: 10%;" :style="'bottom:' + (this.$STATUS_HEIGHT + 60)+ 'px'" class="img-78 img-w66">
            <div style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px;  right: calc(10% + 7px);" :style="'bottom:' + (this.$STATUS_HEIGHT + 150)+ 'px'"  @click="refreshList">
                <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;">
            </div>
        </div>
        <gCertiPop :pPopText="$t('CHAN_LIST_MSG_ID')" @goSavePhonePop="goSavePhonePop" v-if="gCertiPopShowYn" @no='gCertiPopShowYn = false'  />
        <div v-if="mBottomSheetOpenYn"  @click="mBottomSheetOpenYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
        <transition name="showUp" >
            <bottomSheets v-if="mBottomSheetOpenYn" :propSelectSearchObj='mSelectSearchObj' @closePop='mBottomSheetOpenYn = false' @bottSheetEmit='bottSheetEmit' />
        </transition>
    </div>
</template>

<script>
import channelCard from '../../components/list/D_channelCard.vue'
import findChannelList from '../../components/popup/common/Tal_findChannelList.vue'
/* import loadingCompo from '../../components/layout/Tal_loading.vue' */

import bottomSheets from '../../components/pageComponents/main/unit/D_commonBottomSheets.vue'
import chanSkeleton from '../../components/pageComponents/channel/D_channelSkeleton.vue'
export default {
  name: 'user',
  components: {
    bottomSheets,
    channelCard,
    findChannelList,
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
      mViewTab: 'user',
      mActiveTabList: [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }],
      mChanFindPopShowYn: false,
      mResultSearchKeyList: '',
      myChanListPopYn: false,
      mScrollCheckSec: 0,
      mListShowYn: true,
      mCurrentTabName: this.$t('COMMON_TAB_FOLLOWING'),
      mEmptyYn: true,
      mLoadingYn: false,
      mAxiosQueue: [],
      mSearchCateKey: 0,
      gCertiPopShowYn: false
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
    if (document.getElementsByClassName('chanRow')) this.mChanListScrollBox.addEventListener('scroll', this.handleScroll)
    if (this.mChanFindPopShowYn) {
      this.findPaddingTopChan()
    }
  },
  mounted () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    // this.mChanListScrollBox.addEventListener('scroll', this.handleScroll)
    var this_ = this
    this.$nextTick(() => {
      var tab = {}
      if (this_.mViewTab === 'user') {
        tab = this.mActiveTabList[0]
        this_.$refs.activeBar.switchtab(0, tab)
      } else if (this_.mViewTab === 'all') {
        tab = this.mActiveTabList[1]
        this_.$refs.activeBar.switchtab(1, tab)
      } else if (this_.mViewTab === 'mychannel') {
        tab = this.mActiveTabList[2]
        this_.$refs.activeBar.switchtab(2, tab)
      }
    })
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
  },
  methods: {
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.openPop(param)
    },
    searchCloseNopenPop (openPopParam) {
      this.mChanFindPopShowYn = false
      this.openPop(openPopParam)
    },
    bottSheetEmit (pramData) {
      var targetType = pramData.targetType
      var dispName = pramData.dispName
      var idx
      if (targetType === 'changeOrderBy') {
        idx = this.mSearchList.findIndex(item => item.searchType === this.$t('CHAN_LIST_NAME_SORT'))
      } else if (targetType === 'changeBusiness') {
        idx = this.mSearchList.findIndex(item => item.searchType === this.$t('COMMON_NAME_CATEGORY'))
        this.mSearchCateKey = pramData.cateKey
        this.changeTab(this.mViewTab)
      } else if (targetType === 'changeAdmin') {
        idx = this.mSearchList.findIndex(item => item.searchType === this.$t('CHAN_LIST_NAME_TYPE'))
      }
      if (idx !== -1) this.mSearchList[idx].dispName = dispName
      this.mBottomSheetOpenYn = false
    },
    searchBoxClick (searchData) {
      this.mSelectSearchObj = searchData
      this.mBottomSheetOpenYn = true
      // alert(JSON.stringify(searchData))
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
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.mScrollCheckSec
      var element = document.getElementsByClassName('chanRow')[0]
      if (!element) return
      var parentElement = element.parentElement
      // this.mFirstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      this.mFirstContOffsetY = this.getAbsoluteTop(element)
      if (this.mFirstContOffsetY > 0) {
        this.mScrollDirection = 'up'
        this.mScrolledYn = false
      }
      if (time / 1000 > 1 && this.$diffInt(this.mChanListScrollBox.scrollTop, this.mScrollPosition) > 150) {
        var test = document.getElementById('chanListPageHeader')
        this.mHeaderTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
        this.mScrollCheckSec = currentTime

        if (this.mFirstContOffsetY < 0) {
          if (this.mChanListScrollBox.scrollTop > this.mScrollPosition) {
            this.mScrollDirection = 'down'
            this.mScrolledYn = true
          } else if (this.mChanListScrollBox.scrollTop <= this.mScrollPosition) {
            this.mScrollDirection = 'up'
            this.mScrolledYn = false
          }
        }
        this.mScrollPosition = this.mChanListScrollBox.scrollTop
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
    clickCreateChannel () {
      if (this.GE_USER.unknownYn) {
        // this.$showToastPop( '로그인 후 이용해주세요' )
        var unknownParam = {}
        unknownParam.targetType = 'openUnknownLoginPop'
        this.$emit('openPop', unknownParam)
        // this.pOpenUnknownLoginPop()
        return
      }
      /* var tempParam = {}
      tempParam.targetType = 'createChannel'
      tempParam.popHeaderText = '채널 생성'
      this.$emit('openPop', tempParam) */
      /* this.gCertiPopShowYn = true */
      if (this.GE_USER.certiDate) {
        var tempParam = {}
        tempParam.targetType = 'createChannel'
        tempParam.popHeaderText = this.$t('LIST_TITLE_CRE_CHAN')
        this.$emit('openPop', tempParam)
      } else {
        this.gCertiPopShowYn = true
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
    goChannelMain (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = value.teamKey
      params.chanName = value.teamNameMtext
      if (this.mViewTab === 'user') {
        value.followYn = true
      }
      params.value = value

      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      // alert(offsetInput)
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
      if (this.mSearchCateKey !== 0) {
        paramMap.set('cateItemKey', this.mSearchCateKey)
      }
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
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(15rem);
    transition: .5s;
}
/* .chanListHeaderBase {
  width: 100%;
  min-height: 100px;
  position: relative;
  background-color: #FFF !important;

} */
.chanListHeader {
    width: 100%;
    /* min-height: 132px; */
    min-height: 50px;
    padding-top: 10px;
    position: absolute;
    background-color: #FFF;
    top: 0;
    left: 0;
    z-index: 2;
    will-change: transform;
    transition: transform 0.3s linear;
    padding: 0 1.5rem;
}

.chanListHeader--pinned {
    transform: translateY(0%);
}
.chanListHeader--unpinned {
    transform: translateY(-100%);
}
.moveBox{transition: 0.5s ease;}
/* btnPlus common.css로 옮김 */
</style>
