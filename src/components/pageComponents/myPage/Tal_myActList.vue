<template>
  <!-- 내가 쓴 / 내가 댓글 단 / 내 like / 내 star -->
  <div class="w-100P h-100P" style="overflow: hidden; position: relative; border-radius: 0.8rem 0.8rem 0 0;">
    <div id="myActHeader" class="myActHeader" :class="this.scrolledYn? 'myActHeader--unpinned': 'myActHeader--pinned'" v-on="handleScroll">
    <!-- <div id="myActHeader" class="myActHeader"> -->
      <!-- <div class="font16 textLeft commonBlack fontBold" style="padding-left: 5px;height: 30px; line-height: 30px; width: 100%; float: left; ">내가 </div> -->
      <div class="w-100P fl" style="height: 40px; line-height: 40px;">
        <roundTab @tabChange="changeTab" :tabType="this.myActTabType" :tabList="this.myActTabList" id="myActTabId"  />
      </div>
    </div>
    <div class="fl myActContentsWrap" id="myActContentsWrap" ref="myActContentsWrap" style="overflow: hidden scroll; height: calc(100% - 5px); padding-top: 50px;">
      <!-- <div v-if="listShowYn" style="width: 100%; height: 30px; line-height: 30px; margin-top: 10px;" class="fl fontBold font18 commonColor textLeft">{{myActTitle}}</div> -->
      <gSearchBox style="margin-bottom: 0 !important; cursor: pointer;" :targetType="'myActList'" @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      <findContentsList contentsListTargetType="myActList" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
      <myActContentList v-if="listShowYn" :endListYn="this.endListYn" ref="myActContentRef" @myActMoreList="loadMore" @goDetail="myActOpenPop" :myActTabType="this.myActTabType" :myActContentsList="this.myActContentsList" />
    </div>
  </div>
</template>
<script>
import myActContentList from './Tal_myActContentsList.vue'
import findContentsList from '../../popup/common/Tal_findContentsList.vue'
import roundTab from '../../unit/selectBox/Tal_roundTab.vue'
export default {
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
      myActTabType: 'mw',
      offsetInt: 0,
      myActContentsList: [],
      mCabContentsList: [],
      endListYn: false,
      myActTabList: [
        // { myActTabType: 'mi', name: '관심있는' },
        { tabType: 'mw', name: '작성한' }, { tabType: 'mc', name: '댓글 단' }, { tabType: 'ml', name: '좋아한' }, { tabType: 'ms', name: '스크랩한' }]
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
  },
  watch: {
    routerReloadKey () {
      this.refreshList()
    }
  },
  methods: {
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
      console.log('resultList')
      console.log(resultList)
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
      param.jobkindId = 'BOAR'
      if (this.myActTabType === 'mw') {
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      } else if (this.myActTabType === 'mc') {
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        param.findActMemoYn = true
      } else if (this.myActTabType === 'ml') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.myActTabType === 'ms') {
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
      var a = this.resultSearchKeyList
      console.log(a)
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
  }
}
</script>
<style>
.myActHeader {z-index: 9; will-change: transform; transition: transform 0.3s linear; width: 100%; height: 50px; background-color: #fff; float: left; position: absolute; top: 0; left: 0;}
.myActHeader--pinned {transform: translateY(0%);}
.myActHeader--unpinned {transform: translateY(-100%);}
.myActContentsWrap {float: left; width: 100%; padding: 10px; padding-top: 0; background-color: #f8f8ff; border-radius: 0.8rem;}
/* .myActTab {width: 50px; height: 40px; line-height: 40px; border-radius: 0.8rem; margin-right: 3px; float: left; background-color: #f8f8ff; color: #303030;} */
</style>
