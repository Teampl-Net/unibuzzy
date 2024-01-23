<template>
  <div class="w-100P h-100P" style="overflow: hidden; position: relative; border-radius: 0.8rem 0.8rem 0 0;">
    <div class="mMyPageTabList">
      <div class="myPageTab font14" :class="{activeMyPageTabList: this.mMyPageTabType === tab.mMyPageTabType}" @click="myPageTabClick(tab, index)" v-for="(tab, index) in mMyPageTabList" :key="index">{{tab.name}}</div>
      <div class="font14 fontBold commonBigBtn" @click="goMyChanList" style="">내 채널 ></div>
    </div>
    <div class="myPageContentsWrap">
      <div id="myActHeader" class="myActHeader" >
        <div class="w-100P fl" style="height: 40px; line-height: 40px;">
          <roundTab @tabChange="changeTab" :tabType="this.mMyActTabType" :tabList="this.mMyActTabList" id="myActTabId"  />
        </div>
      </div>
      <div class="fl myActContentsWrap" id="myActContentsWrap" ref="myActContentsWrap" style="overflow: hidden scroll; height: calc(100% - 5px); padding-top: 0;">
        <gSearchBox style="margin-bottom: 0 !important; cursor: pointer;" :targetType="'myActList'" @changeSearchList="changeSearchList" @openFindPop="this.mFindPopShowYn = true " :resultSearchKeyList="this.mResultSearchKeyList" />
        <findContentsList contentsListTargetType="myActList" @searchList="requestSearchList" v-if="mFindPopShowYn" @closePop="this.mFindPopShowYn = false"/>
        <myActContentList v-if="mListShowYn" :mEndListYn="this.mEndListYn" ref="myActContentRef" @myActMoreList="loadMore" @openContentsDetailPop="myActOpenPop" :myActTabType="this.mMyActTabType" :myActContentsList="this.mMyActContentsList" />
      </div>
    </div>
  </div>
</template>

<script>
import myActContentList from './Tal_myActContentsList.vue'
import findContentsList from '../../popup/common/D_findContentsList.vue'
import roundTab from '../../unit/selectBox/Tal_roundTab.vue'
export default {
  props: {
    viewTab: {}
  },
  data () {
    return {
      mListShowYn: true,
      mScrolledYn: false,
      mScrollCheckSec: 0,
      mScrollPosition: 0,
      myActScrollBox: null,
      mResultSearchKeyList: [],
      mFindKeyList: {},
      mFindPopShowYn: false,
      mMyActTitle: '내가 작성한 게시글',
      mMyActTabType: 'mwb',
      mOffsetInt: 0,
      mMyActContentsList: [],
      mCabContentsList: [],
      mEndListYn: false,
      mMyActTabList: [
        { tabType: 'mwb', name: this.$t('COMM_TAB_MY_MADE') }, { tabType: 'mcb', name: this.$t('COMMON_TAB_ICOMMENT') }, { tabType: 'mlb', name: this.$t('COMMON_TAB_ILIKE') }, { tabType: 'msb', name: this.$t('COMMON_TAB_ISAVED') }],
      mMyPageTabType: 'ALIM',
      mMyPageTabList: [{ mMyPageTabType: 'ALIM', name: this.$t('COMMON_TAB_NOTI') }, { mMyPageTabType: 'BOAR', name: this.$t('COMMON_TAB_POST') }
      ]
    }
  },
  async created () {
    this.getMyActContentsList()
  },
  updated () {
    this.myActScrollBox = document.getElementById('myActContentsWrap')
  },
  mounted () {
    this.myActScrollBox = document.getElementById('myActContentsWrap')
    this.myActScrollBox.addEventListener('scroll', this.handleScroll)
  },
  watch: {
    routerReloadKey () {
      this.refreshList()
    }
  },
  methods: {
    goMyChanList () {
      this.$emit('goMyChanList')
    },
    async myPageTabClick (tab, index) {
      this.mMyPageTabType = tab.mMyPageTabType
      this.refreshList()
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.mScrollCheckSec
      var element = document.getElementsByClassName('myActContentsBox')[0]
      // var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element)
      if (this.firstContOffsetY > 0) {
        this.mScrolledYn = false
      }
      if (time / 500 > 1 && this.$diffInt(this.myActScrollBox.scrollTop, this.mScrollPosition) > 150) {
        this.mScrollCheckSec = currentTime

        if (this.firstContOffsetY < 0) {
          if (this.myActScrollBox.scrollTop > this.mScrollPosition) {
            // 'down'
            this.mScrolledYn = true
          } else if (this.myActScrollBox.scrollTop <= this.mScrollPosition) {
            // 'up'
            this.mScrolledYn = false
          }
        }
        this.mScrollPosition = this.myActScrollBox.scrollTop
      }
    },
    async changeTab (tab) {
      this.mListShowYn = false
      this.mOffsetInt = 0
      this.mMyActTitle = '내가 ' + tab.name + ' 게시글'
      this.mMyActTabType = tab.tabType
      var resultList = await this.getMyActContentsList()
      this.mMyActContentsList = resultList.content
      this.mListShowYn = true
      this.checkEndListFunc(resultList)
      this.mFindPopShowYn = false
    },
    async refreshList () {
      var pageSize = 10
      if (this.mOffsetInt !== 0 && this.mOffsetInt !== '0') {
        pageSize = Number(this.mOffsetInt) * 10
      }
      var resultList = await this.getMyActContentsList(pageSize, 0)
      this.mMyActContentsList = resultList.content
      this.checkEndListFunc(resultList)
    },
    async loadMore () {
      if (this.mEndListYn === false) {
        var resultList = await this.getMyActContentsList()
        var axiosResultTempList = resultList.content
        const newArr = [
          ...this.mMyActContentsList,
          ...axiosResultTempList
        ]
        this.checkEndListFunc(resultList)
        this.mMyActContentsList = newArr
      } else {
        if (this.$refs.myActContentRef) {
          this.$refs.myActContentRef.myPageLoadingRefHide()
        }
      }
    },
    checkEndListFunc (resultList) {
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
        if (this.mOffsetInt > 0) this.mOffsetInt -= 1
      } else {
        this.mEndListYn = false
        this.mOffsetInt += 1
      }
    },
    myActOpenPop (value) {
      console.log(value)
      this.$emit('openContentsDetailPop', value)
    },
    async getMyActContentsList (pageSize, offsetInput) {
      var param = {}

      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      } else {
        param.offsetInt = this.mOffsetInt
      }
      if (pageSize) {
        param.pageSize = pageSize
      } else {
        pageSize = 10
      }
      if (this.mFindKeyList) {
        if (this.mFindKeyList.searchKey !== undefined && this.mFindKeyList.searchKey !== null && this.mFindKeyList.searchKey !== '') {
          param.title = this.mFindKeyList.searchKey
        } if (this.mFindKeyList.creTeamNameMtext !== undefined && this.mFindKeyList.creTeamNameMtext !== null && this.mFindKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.mFindKeyList.creTeamNameMtext
        } if (this.mFindKeyList.toCreDateStr !== undefined && this.mFindKeyList.toCreDateStr !== null && this.mFindKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.mFindKeyList.toCreDateStr
        } if (this.mFindKeyList.fromCreDateStr !== undefined && this.mFindKeyList.fromCreDateStr !== null && this.mFindKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.mFindKeyList.fromCreDateStr
        }
      }
      if (this.mMyPageTabType === 'ALIM') {
        if (this.mMyActTabType === 'mwb') {
          param.ownUserKey = this.GE_USER.userKey
        }
        param.ownUserKey = this.GE_USER.userKey
      }
      param.jobkindId = this.mMyPageTabType

      if (this.mMyActTabType === 'mwb') {
        param.creUserKey = this.GE_USER.userKey
      } else if (this.mMyActTabType === 'mcb') {
        param.creUserKey = this.GE_USER.userKey
        param.ownUserKey = this.GE_USER.userKey
        param.findActMemoYn = true
      } else if (this.mMyActTabType === 'mlb') {
        param.findActYn = true
        param.ownUserKey = this.GE_USER.userKey
        param.findActLikeYn = true
      } else if (this.mMyActTabType === 'msb') {
        param.ownUserKey = this.GE_USER.userKey
        param.findActYn = true
        param.findActStarYn = true
      }
      var result = await this.$getContentsList(param)
      if (result.empty) {
        this.mEndListYn = true
        if (this.$refs.myActContentRef) {
          this.$refs.myActContentRef.myPageLoadingRefHide()
        }
      }
      var resultList = result
      this.$emit('closeLoading')
      return resultList
    },
    async castingSearchMap (param) {
      var searchObj = {}
      var resultArray = []
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_TITLE')
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = this.$t('COMM_TAB_MY_SEND')
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = this.$t('COMMON_TITLE_DATE')
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (type) {
      if (type === 'searchKey') {
        delete this.mFindKeyList.searchKey
      } else if (type === 'creTeamNameMtext') { delete this.mFindKeyList.creTeamNameMtext } else if (type === 'creDate') {
        delete this.mFindKeyList.toCreDateStr
        delete this.mFindKeyList.fromCreDateStr
      }
      this.mResultSearchKeyList = await this.castingSearchMap(this.mFindKeyList)
      // getPushContentsList (pageSize, offsetInput)
      var pageSize = 10
      this.mOffsetInt = 0
      var resultList = await this.getMyActContentsList(pageSize, this.mOffsetInt)
      this.mMyActContentsList = resultList.content
      this.checkEndListFunc(resultList)
    },
    async requestSearchList (param) {
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.mFindKeyList.searchKey = param.searchKey
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.mFindKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.mFindKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.mFindKeyList.fromCreDateStr = param.fromCreDateStr
        }
      }
      this.mResultSearchKeyList = await this.castingSearchMap(this.mFindKeyList)
      this.mOffsetInt = 0
      var resultList = await this.getMyActContentsList(10, 0)
      this.mMyActContentsList = resultList.content
      this.mFindPopShowYn = false
    },
    findPaddingTopPush () {
      var element = document.getElementById('searchResultWrapLength')
      this.paddingTop = element.clientHeight
    }
  },
  components: {
    myActContentList,
    findContentsList,
    roundTab
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>
<style>
.myActHeader {min-width: 100%; overflow: scroll hidden; float: left; min-height: 40px;}
.myActHeader--pinned {transform: translateY(0%);}
.myActHeader--unpinned {transform: translateY(-100%);}
.myActContentsWrap {float: left; width: 100%; padding: 10px; padding-top: 0; background-color: #f8f8ff; border-radius: 0.8rem;}
.mMyPageTabList {width: 100%; height: 40px; line-height: 45px; float: left;}
.myPageTab {border-radius: 0.8rem 0.8rem 0 0; border-bottom: 0 !important; min-width: 70px; padding: 0 15px; height: 100%; float: left; color: #303030; background-color: rgba(186, 187, 215); margin-right: 5px;}
.activeMyPageTabList {background-color: #fff !important; min-width: 90px !important; font-weight: bold; color: rgb(74 102 158);}
.myPageContentsWrap {border-radius: 0 0.8rem 0 0; padding: 5px 10px 0 10px; width: 100%; height: calc(100% - 133px); background-color: #fff; display: inline-block; }

/* .myActTab {width: 50px; height: 40px; line-height: 40px; border-radius: 0.8rem; margin-right: 3px; float: left; background-color: #f8f8ff; color: #303030;} */
</style>
