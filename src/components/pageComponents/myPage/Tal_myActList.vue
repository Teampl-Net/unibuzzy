<template>
  <!-- 내가 쓴 / 내가 댓글 단 / 내 like / 내 star -->
  <div class="w-100P h-100P" style="overflow: hidden; position: relative; border-radius: 0.8rem 0.8rem 0 0;">
    <div class="myPageTabList">
      <div class="myPageTab font14" :class="{activeMyPageTabList: this.myPageTabType === tab.myPageTabType}" @click="myPageTabClick(tab, index)" v-for="(tab, index) in myPageTabList" :key="index">{{tab.name}}</div>
      <div class="font14 fontBold commonBigBtn" @click="goMyChanList" style="">내 채널 ></div>
    </div>
    <div class="myPageContentsWrap">
        <div id="myActHeader" class="myActHeader" >
            <!-- <div id="myActHeader" class="myActHeader"> -->
            <!-- <div class="font16 textLeft commonBlack fontBold" style="padding-left: 5px;height: 30px; line-height: 30px; width: 100%; float: left; ">내가 </div> -->
            <div class="w-100P fl" style="height: 40px; line-height: 40px;">
                <roundTab @tabChange="changeTab" :tabType="this.myActTabType" :tabList="this.myActTabList" id="myActTabId"  />
            </div>
        </div>
        <div class="fl myActContentsWrap" id="myActContentsWrap" ref="myActContentsWrap" style="overflow: hidden scroll; height: calc(100% - 5px); padding-top: 0;">
        <!-- <div v-if="listShowYn" style="width: 100%; height: 30px; line-height: 30px; margin-top: 10px;" class="fl fontBold font18 commonColor textLeft">{{myActTitle}}</div> -->
        <gSearchBox style="margin-bottom: 0 !important; cursor: pointer;" :targetType="'myActList'" @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
        <findContentsList contentsListTargetType="myActList" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
        <myActContentList v-if="listShowYn" :endListYn="this.endListYn" ref="myActContentRef" @myActMoreList="loadMore" @goDetail="myActOpenPop" :myActTabType="this.myActTabType" :myActContentsList="this.myActContentsList" />
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
      listShowYn: true,
      headerTop: 0,
      scrolledYn: false,
      scrollCheckSec: 0,
      scrollPosition: 0,
      box: null,
      resultSearchKeyList: [],
      findKeyList: {},
      findPopShowYn: false,
      clickStatus: '',
      myActTitle: '내가 작성한 게시글',
      myActTabType: 'mwb',
      offsetInt: 0,
      myActContentsList: [],
      mCabContentsList: [],
      endListYn: false,
      myActTabList: [
        // { myActTabType: 'mi', name: '관심있는' },
        { tabType: 'mwb', name: '작성한' }, { tabType: 'mcb', name: '댓글 단' }, { tabType: 'mlb', name: '좋아한' }, { tabType: 'msb', name: '스크랩한' }],
      myPageTabType: 'ALIM',
      myPageTabList: [{ myPageTabType: 'ALIM', name: '알림' }, { myPageTabType: 'BOAR', name: '게시글' }
        // { myPageTabType: 'mi', name: '내 정보' }
      ],
      axiosQueue: []
    }
  },
  async created () {
    this.getMyActContentsList()
  },
  updated () {
    this.box = document.getElementById('myActContentsWrap')
  },
  mounted () {
    this.box = document.getElementById('myActContentsWrap')
    this.box.addEventListener('scroll', this.handleScroll)
    // this.$emit('closeLoading')
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
      this.myPageTabType = tab.myPageTabType
      this.refreshList()
      // await this.getMyActContentsList()
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('myActContentsBox')[0]
      // var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element)
      if (this.firstContOffsetY > 0) {
        this.scrolledYn = false
      }
      if (time / 500 > 1 && this.$diffInt(this.box.scrollTop, this.scrollPosition) > 150) {
        // var test = document.getElementById('myActHeader')
        // this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
        this.scrollCheckSec = currentTime

        if (this.firstContOffsetY < 0) {
          if (this.box.scrollTop > this.scrollPosition) {
            // 'down'
            this.scrolledYn = true
          } else if (this.box.scrollTop <= this.scrollPosition) {
            // 'up'
            this.scrolledYn = false
          }
        }
        this.scrollPosition = this.box.scrollTop
      }
    },
    async changeTab (tab) {
      this.listShowYn = false
      this.offsetInt = 0
      this.myActTitle = '내가 ' + tab.name + ' 게시글'
      this.myActTabType = tab.tabType
      var resultList = await this.getMyActContentsList()
      this.myActContentsList = resultList.content
      this.listShowYn = true
      this.endListSetFunc(resultList)
      this.findPopShowYn = false
    },
    async refreshList () {
      var pageSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pageSize = Number(this.offsetInt) * 10
      }
      var resultList = await this.getMyActContentsList(pageSize, 0)
      this.myActContentsList = resultList.content
      this.endListSetFunc(resultList)
    },
    async loadMore (pageSize) {
      if (this.endListYn === false) {
        var resultList = await this.getMyActContentsList()
        var axiosResultTempList = resultList.content
        const newArr = [
          ...this.myActContentsList,
          ...axiosResultTempList
        ]
        this.endListSetFunc(resultList)
        this.myActContentsList = newArr
      } else {
        if (this.$refs.myActContentRef) {
          this.$refs.myActContentRef.myPageLoadingRefHide()
        }
      }
    },
    endListSetFunc (resultList) {
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
    },
    myActOpenPop (value) {
      this.$emit('openPop', value)
    },
    async getMyActContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      } else {
        param.offsetInt = this.offsetInt
      }
      if (pageSize) {
        param.pageSize = pageSize
      } else {
        pageSize = 10
      }
      if (this.findKeyList) {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          param.title = this.findKeyList.searchKey
        } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.findKeyList.toCreDateStr
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.findKeyList.fromCreDateStr
        }
      }
      if (this.myPageTabType === 'ALIM') {
        if (this.myActTabType === 'mwb') {
          param.ownUserKey = this.GE_USER.userKey
        }
        param.ownUserKey = this.GE_USER.userKey
      }
      param.jobkindId = this.myPageTabType

      if (this.myActTabType === 'mwb') {
        param.creUserKey = this.GE_USER.userKey
      } else if (this.myActTabType === 'mcb') {
        param.creUserKey = this.GE_USER.userKey
        param.ownUserKey = this.GE_USER.userKey
        param.findActMemoYn = true
      } else if (this.myActTabType === 'mlb') {
        param.findActYn = true
        param.ownUserKey = this.GE_USER.userKey
        param.findActLikeYn = true
      } else if (this.myActTabType === 'msb') {
        param.ownUserKey = this.GE_USER.userKey
        param.findActYn = true
        param.findActStarYn = true
      }
      var result = await this.$getContentsList(param)
      if (result.empty) {
        this.endListYn = true
        if (this.$refs.myActContentRef) {
          this.$refs.myActContentRef.myPageLoadingRefHide()
        }
      }
      var resultList = result
      this.$emit('closeLoading')
      return resultList
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = '제목'
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = '보낸'
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = '날짜'
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (type) {
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // getPushContentsList (pageSize, offsetInput)
      var pageSize = 10
      this.offsetInt = 0
      var resultList = await this.getMyActContentsList(pageSize, this.offsetInt)
      this.myActContentsList = resultList.content
      this.endListSetFunc(resultList)
    },
    async requestSearchList (param) {
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        }
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // var a = this.resultSearchKeyList
      // console.log(a)
      this.offsetInt = 0
      var resultList = await this.getMyActContentsList(10, 0)
      this.myActContentsList = resultList.content
      this.findPopShowYn = false
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
.myPageTabList {width: 100%; height: 40px; line-height: 45px; float: left;}
.myPageTab {border-radius: 0.8rem 0.8rem 0 0; border-bottom: 0 !important; min-width: 70px; padding: 0 15px; height: 100%; float: left; color: #303030; background-color: rgba(186, 187, 215); margin-right: 5px;}
.activeMyPageTabList {background-color: #fff !important; min-width: 90px !important; font-weight: bold; color: #6768A7;}
.myPageContentsWrap {border-radius: 0 0.8rem 0 0; padding: 5px 10px 0 10px; width: 100%; height: calc(100% - 133px); background-color: #fff; display: inline-block; }

/* .myActTab {width: 50px; height: 40px; line-height: 40px; border-radius: 0.8rem; margin-right: 3px; float: left; background-color: #f8f8ff; color: #303030;} */
</style>
