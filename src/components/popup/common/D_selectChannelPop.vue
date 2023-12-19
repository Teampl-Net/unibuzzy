<i18n>
{
    "ko": {

    },
    "en": {

    }
}
</i18n>

<template>
    <div class="popBg"></div>
    <div class="selectSchoolPopWrap" @click.stop="preventDefault">
        <div class="font25 fontBold w100P notiPopHeader">
          <div class="notiPopTitle">
            <p class="textOverdot textLeft mleft-05">{{ $t('COMM_TITLE_CHANLIST') }}</p>
          </div>
          <div class="cursorP closeBox" @click="pClosePop">
            <img
              class="w100P"
              src="@/assets/images/common/popup_close.png"
              alt=""
            />
          </div>
        </div>
        <div class="skeletonBox" v-if="GE_DISP_TEAM_LIST.length === 0 && mEndListYn === false">
          <chanSkeleton  v-for="(value) in 10" :key="value"/>
      </div>

        <div id="chanListWrap" ref="chanListWrap"  class="schoolContentsBox" :style="calcPaddingTop" @mousedown="testTwo" @mouseup="testTr">
          <div class="w100P mBottom10">
            <gInput @enterEvent="searchChannel" class="searchInput" :pInputObj="mInputObj" pInputType="I" pPlaceHolder="Please enter your channel" />
            <img @click="searchChannel" class="cursorP searchImg" src="@/assets/images/button/icon_search_color.svg" >
          </div>
          <div class="textRight cursorP" @click="resetSearch" v-if="mSearchYn">
            Reset
          </div>
          <gEmpty tabName="전체" contentName="채널" v-if="mEmptyYn && GE_DISP_TEAM_LIST.length === 0" class="mt-header" />
          <template v-for="(chanEle, index) in GE_DISP_TEAM_LIST" :key="index">
            <channelCard class="moveBox chanRow cursorP margin15" :pSelectedYn="chanEle.teamKey === GE_USER.myTeamKey" :chanElement="chanEle" @click="goTown(chanEle)" @scrollMove="scrollMove" :pPopTitle="'townList'"/>
            <myObserver v-if="GE_DISP_TEAM_LIST.length > 0 && index === GE_DISP_TEAM_LIST.length - 5" @triggerIntersected="loadMore" class="fl wich" />
          </template>
        </div>
  </div>
</template>

<script>
import channelCard from '@/components/list/D_channelCard.vue'
import chanSkeleton from '@/components/pageComponents/channel/D_channelSkeleton.vue'

export default {
  components: {
    channelCard,
    chanSkeleton
  },
  data () {
    return {
      mChannelList: [],
      mPaddingTop: 50,
      mChanListScrollBox: null,
      mScrollPosition: 0,
      mScrollDirection: null,
      mFirstContOffsetY: null,
      mScrolledYn: false,
      mOffsetInt: 0,
      mEndListYn: true,
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
      mInputObj: { val: null },
      mSearchYn: false,
      mConfirmPopShowYn: false,
      mConfirmPopText: ''
    }
  },
  props: {
    popYn: Boolean,
    propData: {},
    initData: {},
    pClosePop: Function,
    pGoTown: Function
  },
  updated () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    if (document.getElementsByClassName('chanRow')) this.mChanListScrollBox.addEventListener('scroll', this.handleScroll)
    if (this.mChanFindPopShowYn) {
      this.findPaddingTopChan()
    }
  },
  mounted () {
    this.$addHistoryStack('selectSchoolPop')
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    this.$emit('closeLoading')
    this.mLoadingYn = false
  },
  created () {
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.mViewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    if (this.initData) {
      console.log(this.initData)
      this.mChannelList = this.initData.content
      if (this.initData.pageable && (this.initData.totalElements < (this.initData.pageable.offset + this.initData.pageable.pageSize))) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }

      this.introChanPageTab()
      this.mScrolledYn = false
      this.findPaddingTopChan()
    } else {
      this.changeTab(this.mViewTab)
    }
  },
  methods: {
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      if (this.mAxiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
      this.mAxiosQueue.push('getChannelList')
      var paramMap = new Map()
      var userKey = this.GE_USER.userKey
      paramMap.set('fUserKey', userKey)
      paramMap.set('cateItemKey', 3)
      console.log('this.mInputObj', this.mInputObj)
      if (this.mInputObj.val !== '' && this.mInputObj.val !== undefined && this.mInputObj.val !== null) {
        paramMap.set('nameMtext', this.mInputObj.val)
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
      paramMap.set('bdAreaNameMtext', 'Campus') // 수정필요..
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
      // if (this.mAxiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
      // this.mAxiosQueue.push('getChannelList')
      // var paramMap = new Map()
      // var userKey = this.GE_USER.userKey
      // if (this.GE_USER) {
      //   paramMap.set('userKey', userKey)
      // }

      // var noneLoadingYn = true
      // if (mLoadingYn) {
      //   noneLoadingYn = false
      // }
      // var result = await this.$getTeamList(paramMap, noneLoadingYn)
      // var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getChannelList')
      // this.mAxiosQueue.splice(queueIndex, 1)
      // var resultList = result.data
      // this.endListSetFunc(resultList)
      // return resultList
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
      this.pClosePop()
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },
    preventDefault () {
      return false
    },
    async searchChannel () {
      console.log('검색 실행됨')
      this.mOffsetInt = 0
      const result = await this.getChannelList(10, 0, true)
      console.log('검색 result', result)
      this.mChannelList = result.content
      this.mSearchYn = true
      if (this.mChannelList.length === 0) {
        this.mEmptyYn = true
      }
    },
    async resetSearch () {
      this.mInputObj.val = null
      this.mOffsetInt = 0
      const result = await this.getChannelList(10, 0, true)
      this.mChannelList = result.content
      this.mSearchYn = false
      if (this.mChannelList.length === 0) {
        this.mEmptyYn = true
      }
    },
    goTown (chanEle) {
      if (this.GE_USER.myTeamKey === chanEle.teamKey) {
        this.mConfirmPopText = 'Currently selected town.'
        this.mConfirmPopShowYn = true
        return
      }
      this.pGoTown(chanEle)
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
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.mScrollCheckSec
      var element = document.getElementsByClassName('chanRow')[0]
      if (!element) return
      if (this.mFirstContOffsetY > 0) {
        this.mScrollDirection = 'up'
        this.mScrolledYn = false
      }
      if (time / 1000 > 1 && this.$diffInt(this.mChanListScrollBox.scrollTop, this.mScrollPosition) > 150) {
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
      if (this.mAxiosQueue.findIndex((item) => item === 'loadMore') !== -1) return
      this.mAxiosQueue.push('loadMore')
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
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'loadMore')
      this.mAxiosQueue.splice(queueIndex, 1)
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
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
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
      console.log('this.mChannelList', this.mChannelList)
      if (!this.mChannelList) return []
      console.log('teamList', this.teamList)
      for (var i = 0; i < this.mChannelList.length; i++) {
        index = teamList.findIndex((item) => item.teamKey === this.mChannelList[i].teamKey)
        if (index !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.mChannelList[i] = teamList[index]
        }
      }
      var returnData = this.mChannelList
      return returnData
    }
  },
  watch: {
    pageUpdate () {
      if (this.pClosePop && this.history[this.history.length - 1] === 'selectSchoolPop') {
        this.pClosePop()
      }
    }
    // GE_USER: {
    //   immediate: true,
    //   handler (val, old) {
    //     if (val.unknownYn) {
    //       this.mActiveTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'all' }]
    //     } else {
    //       this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.popBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 14;
  top: 0;
  left: 0;
}
.moveBox{
    background-color:rgba(255, 255, 255, 0.5);
    border-radius:10px;
}
.selectSchoolPopWrap {
    overflow-y:hidden;
    border-radius: 10px;
  width: 90%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 10000;
  padding: 10px 10px;
  padding-bottom: 0;
  background-color:rgba(256, 256, 256, 0.65);
  box-shadow:0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter:blur( 9px );
}
.notiPopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;
}
.notiPopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.selectSchoolPopBox {
  width: 100%;
  height: 100%;
  float: left;
  position: relative;
  border-radius: 10px;
  padding: 10px 20px;
  overflow: hidden;
}
.selectSchoolPopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.selectSchoolPopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.selectSchoolPopTitle > p {
  width: calc(100% - 40px);
}
.closeBox {
  width: 25px;
}
.closeBox > img {
  width: 25px;
}
.skeletonBox {
  width: 100%;
  min-height: calc(100% - 50px);
}
.schoolContentsBox {
  overflow: hidden scroll;
  height: calc(100% - 50px);
  width: 100%;
  padding-bottom:80px;
}
.searchInput {
  width: calc(100% - 35px) !important;
}
.searchImg {
  width: 25px;
  margin-left: 10px;
}
.margin15 {
  margin-top: 15px !important;
}
</style>
