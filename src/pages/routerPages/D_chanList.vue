<template>
<div class="" style="width: 100%; height: 100%; position: relative; padding: 0 1rem; padding-top: 10px; overflow: hidden; float: left;">
  <loadingCompo v-if="mLoadingYn === true"/>
  <div id="chanListPageHeader" ref="chanListHeader" class="chanListHeader" :class="this.mScrolledYn? 'chanListHeader--unpinned': 'chanListHeader--pinned'" v-on="handleScroll">
    <gActiveBar :searchYn='true' @changeSearchList="changeSearchList" @openFindPop="this.mChanFindPopShowYn = true" :mResultSearchKeyList="this.mResultSearchKeyList" ref="activeBar" :tabList="this.mActiveTabList" class="fl" style="" @changeTab="changeTab"></gActiveBar>
  </div>
    <findChannelList @searchList="requestSearchList" v-if="mChanFindPopShowYn" @closePop='mChanFindPopShowYn = false' />
  <div id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style="padding-top: calc(25px + var(--paddingTopLength)); overflow: hidden scroll; height: calc(100%); width: 100%; " @mousedown="testTwo" @mouseup="testTr">
    <gEmty :tabName="mCurrentTabName" contentName="채널" v-if="mEmptyYn && this.GE_DISP_TEAM_LIST.length === 0" style="margin-top:50px;" />
    <gChannelList v-show="mListShowYn" ref="gChannelListCompo" @moreList="loadMore"  class="moveBox" :chanList="this.GE_DISP_TEAM_LIST"  @goDetail="goDetail" id='chanlist' @scrollMove="scrollMove"/>
  </div>
  <img src="../../assets/images/button/Icon_CreChanBtn.png" @click="clickCreateChannel" alt="채널 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78 img-w66">
  <div style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 7rem; right: calc(10% + 7px);" @click="refreshAll">
    <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;">
  </div>
</div>
</template>

<script>
import findChannelList from '../../components/popup/common/Tal_findChannelList.vue'
import loadingCompo from '../../components/layout/Tal_loading.vue'

export default {
  name: 'user',
  components: {
    findChannelList,
    loadingCompo
  },
  updated () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    if (this.mChanFindPopShowYn) {
      this.findPaddingTopChan()
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
    }
  },
  mounted () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    this.mChanListScrollBox.addEventListener('scroll', this.handleScroll)
    if (this.mViewTab === 'user') {
      this.$refs.activeBar.switchtab(0)
    } else if (this.mViewTab === 'all') {
      this.$refs.activeBar.switchtab(1)
    } else if (this.mViewTab === 'mychannel') {
      this.$refs.activeBar.switchtab(2)
    }
    this.$emit('closeLoading')
  },
  async created () {
    this.$emit('changePageHeader', '채널')
    this.mLoadingYn = true
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.mViewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    if (!this.GE_DISP_TEAM_LIST || this.GE_DISP_TEAM_LIST.length === 0) {
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
    }

    this.introChanPageTab()
    this.mScrolledYn = false
    this.findPaddingTopChan()
    this.mLoadingYn = false
  },
  methods: {
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
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.mPaddingTop = element.clientHeight + 20
      }
    },
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.mLoadingYn = true
      this.mResultSearchKeyList = []
      this.changeTab('user')
      await this.$refs.activeBar.switchtab(0)
      var chanListWrap = await this.$refs.chanListWrap
      await chanListWrap.scrollTo({ top: 0 })
      setTimeout(() => {
        this.$emit('closeLoading')
        this.mLoadingYn = false
      }, 500)
    },
    scrollMove () {
      var chanListWrap = this.$refs.chanListWrap
      chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
    },
    introChanPageTab () {
      if (this.mViewTab === 'user') {
        this.mCurrentTabName = '구독중'
      } else if (this.mViewTab === 'all') {
        this.mCurrentTabName = '전체'
      } else if (this.mViewTab === 'mychannel') {
        this.mCurrentTabName = '내 채널'
      }
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.mScrollCheckSec
      var element = document.getElementsByClassName('chanRow')[0]
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
      } else {
        this.$refs.gChannelListCompo.loadingRefHide()
      }
    },
    clickCreateChannel () {
      var tempParam = {}
      tempParam.targetType = 'createChannel'
      tempParam.popHeaderText = '채널 생성'
      this.$emit('openPop', tempParam)
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
      var resultList = await this.getChannelList(undefined, undefined, true)
      var addList = []
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
    goDetail (value) {
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
      if (this.mResultSearchKeyList.length > 0) {
        paramMap.set('nameMtext', this.mResultSearchKeyList[0].keyword)
      }
      if (offsetInput !== undefined) {
        paramMap.set('offsetInt', offsetInput)
      } else {
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
      if (result.empty) {
        this.$refs.gChannelListCompo.loadingRefHide()
      }
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
        searchObj.typeName = '채널'
        searchObj.keyword = sMap.get('nameMtext')
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (idx) {
      this.mResultSearchKeyList.splice(idx, 1)
      if (this.mResultSearchKeyList.length === 0) {
        this.mPaddingTop = 20
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
  data () {
    return {
      mChannelList: [],
      mPaddingTop: 20,
      mChanListScrollBox: null,
      mScrollPosition: 0,
      mScrollDirection: null,
      mFirstContOffsetY: null,
      mScrolledYn: false,
      mHeaderTop: 0,
      mOffsetInt: 0,
      mEndListYn: false,
      mViewTab: 'user',
      mActiveTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      mChanFindPopShowYn: false,
      mResultSearchKeyList: '',
      myChanListPopYn: false,
      mScrollCheckSec: 0,
      mListShowYn: true,
      mCurrentTabName: '구독중',
      mEmptyYn: true,
      mLoadingYn: false,
      mAxiosQueue: []
    }
  },
  props: {
    params: {},
    popYn: Boolean,
    propData: {}
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
