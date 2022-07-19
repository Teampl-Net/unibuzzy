<template>
  <div class="pagePaddingWrap nonMemBoardWrap">
    <popHeader @closeXPop="this.$router.replace({path: '/login'})" class="commonPopHeader" headerTitle="비회원 문의 게시판" />
    <div id="boardListWrap" class="boardListWrap" style="width: 100%; margin-top: 60px; padding: 0 10px; overflow: hidden; position: relative; height: 100%; background: #fff; border-radius: 10px 10px 0 0;">
      <transition name="showModal">
        <findContentsList :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
      </transition>
      <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
        <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      </div>
      <div :style="calcBoardPaddingTop" style="padding-top: calc(100px + var(--paddingTopLength)) ; width: 100%; height: calc(100% + var(--paddingTopLength)); overflow: hidden scroll;" class="commonBoardListWrap" ref="commonBoardListWrapCompo">
        <boardList :nonMemYn="true" ref="boardListCompo" @moreList="loadMore" @goDetail="goDetail" :commonBoardListData="this.mCabContentsList"  style=" margin-top: 5px; float: left;"  @refresh='refresh' />
      </div>
    </div>
    <div class="btnPlus" @click="openWriteBoard" ><p style="font-size:40px;">+</p></div>
  </div>
</template>

<script>

import findContentsList from '../../components/popup/common/Tal_findContentsList.vue'
import boardList from '../../components/boardList/Tal_commonBoardList.vue'
export default {
  name: '',
  data () {
    return {
      offsetInt: 0,
      findKeyList: {},
      resultSearchKeyList: [],
      totalElements: 0,
      mCabContentsList: [],
      scrolledYn: false,
      findPopShowYn: false,
      listBox: null,
      firstContOffsetY: 0,
      scrollDirection: 'down',
      endListYn: false,
      paddingTop: 0,
      scrollCheckSec: 0
    }
  },
  components: {
    boardList,
    findContentsList
  },
  async created () {
    var resultList = await this.getContentsList()
    this.mCabContentsList = resultList.content
    if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      this.endListYn = true
    } else {
      this.offsetInt += 1
      this.endListYn = false
    }
  },
  mounted () {
    this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
    this.listBox.addEventListener('scroll', this.handleScroll)
  },
  updated () {
    this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
    if (this.findPopShowYn) {
      this.findPaddingTopBoard()
    }
  },
  methods: {
    async getContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      } */
      param.cabinetKey = 11188
      param.offsetInt = this.offsetInt
      if (offsetInput !== undefined) {
        param.offsetInt = offsetInput
      }
      if (pageSize) {
        param.pageSize = pageSize
      } else {
        pageSize = 10
      }
      console.log(this.findKeyList)
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
      // param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey

      var resultList = await this.$getContentsList(param)
      this.totalElements = resultList.totalElements
      return resultList
    },
    fuc () {
      /* this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.offsetInt += 1
        this.endListYn = false
      } */
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('commonBoardListContentBox')[0]
      var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      if (this.firstContOffsetY > 0) {
        this.scrollDirection = 'up'
        this.scrolledYn = false
      }
      if (time / 1000 > 1 && this.$diffInt(this.listBox.scrollTop, this.scrollPosition) > 50) {
        this.scrollCheckSec = currentTime
        if (this.firstContOffsetY < 0) {
          if (this.listBox.scrollTop > this.scrollPosition) {
            this.scrollDirection = 'down'
            this.scrolledYn = true
          } else if (this.listBox.scrollTop <= this.scrollPosition) {
            this.scrollDirection = 'up'
            this.scrolledYn = false
          }
        }
      }
      // var test = document.getElementById('boardPageHeader')
      // parentElement = element.parentElement
      // this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
      // var test = this.firstContOffsetY

      this.scrollPosition = this.listBox.scrollTop
    },
    async requestSearchList (param) {
      console.log(param)
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
      var resultList = await this.getContentsList(10, 0)
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.offsetInt += 1
        this.endListYn = false
      }
      this.findPopShowYn = false
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
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
    openWriteBoard () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeBoard'
      params.targetNameMtext = 'KO$^$더알림'
      params.currentTeamKey = 377
      params.cabinetNameMtext = '비회원 문의게시판'
      params.cabinetKey = 11188
      params.nonMemYn = true
      this.$emit('openPop', params)
    },
    findPaddingTopBoard () {
      var element = document.getElementById('searchResultWrapLength')
      this.paddingTop = element.clientHeight
    },
    async changeSearchList (type) {
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // await this.getCabinetDetail()
      var resultList = await this.getContentsList(10, 0)
      this.mCabContentsList = resultList.content
      this.findPaddingTopBoard()
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.offsetInt += 1
        this.endListYn = false
      }
      // await this.getCabinetDetail()

      this.findPopShowYn = false
    },
    async loadMore (pageSize) {
      if (this.endListYn === false) {
        var resultList = await this.getContentsList()
        const newArr = [
          ...this.mCabContentsList,
          ...resultList.content
        ]
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.offsetInt += 1
          this.endListYn = false
        }
        this.mCabContentsList = newArr
      } else {
        this.$refs.boardListCompo.loadingRefHide()
      }
      this.findPopShowYn = false
    },
    goDetail (value) {
      value.replyYn = 0
      value.fileYn = 1
      value.blindYn = 0
      value.shareAuth = 1
      value.nonMemYn = true
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetNameMtext = 'KO$^$더알림'
      params.currentTeamKey = 377
      params.cabinetNameMtext = '비회원 문의게시판'
      params.cabinetKey = 11188
      params.targetKey = 11188
      value.value = params
      value.targetType = 'boardDetail'
      this.$emit('openPop', value)
    }
  },
  computed: {
    calcBoardPaddingTop () {
      return {
        '--paddingTopLength': (this.paddingTop) + 'px'
      }
    },
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    }
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }

}
</script>

<style scoped>
.nonMemBoardWrap{height: 100vh;background-color: #6768A7; display: flex; flex-direction: column; padding-top: 10%; }
.btnPlus {
    bottom: 30px;
}
.boardListHeader {
  width: calc(100% - 20px);
  min-height: 90px;
  position: absolute;
  background-color: #FFF;
  top: 0;
  /* left: 0; */
  z-index: 9;
  will-change: transform;
  transition: transform 0.3s linear;
}
.boardListHeader--pinned {
    transform: translateY(0%);
}
.boardListHeader--unpinned {
    transform: translateY(-100%);
}
</style>
