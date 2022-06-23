<template>
  <!-- <div id="pushListWrap" style="height: 100vh; width: 100vw; overflow: scroll; background-color: white; background-size: cover;"> -->
    <!-- <div class="pageHeader pushListCover"> -->
    <div style="width: 100%; height: 100%; position: relative; float: left; overflow: hidden scroll;">
      <div id="pageHeader" ref="pushListHeader" class="pushListHeader"  :class="{'pushListHeader--unpinned': this.scrolledYn, 'pushListHeader--pinned': !this.scrolledYn }" v-on="handleScroll" >
        <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
        <transition name="showModal">
          <findContentsList transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
        </transition>
        <!-- <img v-on:click="openPushBoxPop()" class="fr" style="width: 1.5rem; margin-top: 1.5rem" src="../../assets/images/push/icon_noticebox.png" alt="검색버튼"> -->
        <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab" />
      </div>
      <div id="wrapwrap" :style="calcHeaderHeight" class="testt" style="padding-right: 0; float: left; padding-left: 0; height: calc(100% - var(--headerHeight)); margin-top: var(--headerHeight);">
      <!-- <div class="stickerWrap">
        <div :style="setStickerWidth" class="mbottom-05 stickerFrame">
          <div class="stickerDiv" :style="'border: 1.5px solid' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" style="min-width: 60px; margin-right: 5px;height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
            <p class="font12">{{value.stickerName}}</p>
          </div>

        </div>
      </div> -->
        <commonList id="pushListWrap" @currentScroll="currentScroll" v-if="refreshYn" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 150px;" :alimListYn="this.alimListYn" :commonListData="this.commonListData" @moreList="loadMore" @goDetail="openPop"/>
      <!-- <commonList  :commonListData="commonListData" @goDetail="openPop" style="" @listMore='loadMore' id='test'/> -->

      <!-- <infinite-loading @infinite="infiniteHandler" ></infinite-loading> -->
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
// import myObserver from '../../components/Tal_ScrollObserver.vue'
import findContentsList from '../../components/popup/Tal_findContentsList.vue'
// import searchResult from '../../components/unit/Tal_searchResult.vue'
export default {
  name: 'pushList',
  components: {
    findContentsList
    // searchResult

  },
  props: {
    popYn: Boolean,
    alimListYn: Boolean,
    routerReloadKey: {},
    readySearhList: {},
    chanDetailKey: {},
    pushListAndDetailYn: {},
    propData: {}
  },
  updated() {
    // eslint-disable-next-line no-unused-vars
    this.box = document.getElementById('pushListWrap') // 이 dom scroll 이벤트를 모니터링합니다
    this.box.addEventListener('scroll', this.handleScroll)
    this.box.addEventListener('mousewheel', e => {
      this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
    })
  },
  async created() {
    if (this.propData) {
      if (this.propData.alimTabType !== undefined && this.propData.alimTabType !== null && this.propData.alimTabType !== '') {
        this.viewTab = this.propData.alimTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
      /* var history = localStorage.getItem('popHistoryStack').split('$#$')
      this.pageHistoryName = 'page' + (history.length - 1) */
    }
    this.$emit('changePageHeader', '알림')
    var resultList = await this.getPushContentsList()
    this.commonListData = resultList.content
    this.$emit('closeLoading')
    this.findPopShowYn = false
    if (this.readySearhList) {
      this.requestSearchList(this.readySearhList)
    }
  },

  mounted() {
  if (this.viewTab === 'N') {
      this.$refs.activeBar.switchtab(0)
    } else if (this.viewTab === 'R') {
      this.$refs.activeBar.switchtab(1)
    } else if (this.viewTab === 'L') {
      this.$refs.activeBar.switchtab(2)
    } else if (this.viewTab === 'S') {
      this.$refs.activeBar.switchtab(3)
    }

    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    if (this.pushListAndDetailYn) {
      var propObj = this.propData
      propObj.targetType = 'pushDetail'
      this.openPop(propObj)
    }
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  watch: {

    currentPage () {
    },
    commonListData () {
      this.refreshYn = false
      this.refreshYn = true
    },
    routerReloadKey () {
      this.refreshList()
    }
  },
  computed: {
    calcHeaderHeight () {
      // var pageHeader = document.querySelector('#pageHeader')
      // var pageHeader = this.$refs.pushListHeader
      return {
        '--headerHeight' : '-' + (this.headerTop - 20)  + 'px'
      }
    },
    historyStack () {
      return this.$store.state.historyStack
    },
    currentPage () {
      return this.$store.getters.hCPage
    },
    setStickerWidth () {
      var stickerCnt = this.stickerList.length
      var textWidth = 16
      var stickerDivWidth = 0
      for (var i = 0; i < stickerCnt; i++) {
        stickerDivWidth += this.stickerList[i].stickerName.length * textWidth + 10
      }
      // var stickerDivList = document.getElementsByClassName('stickerDiv')
      return {
        '--stickerDivWidth': stickerDivWidth + 'px'
      }
    }
  },
  data () {
    return {
      headerTop: 0,
      scrollDirection: null,
      box: null,
      scrolledYn: false,
      scrollPosition: 0,
      offsetInt: 0,
      endListYn: false,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      subHistoryList: [],
      stickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }
      ],
      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      commonListData: [],
      findKeyList: {},
      resultSearchKeyList: [],
      refreshYn: true
    }
  },
  methods: {
    handleScroll() {
      var blockBox = document.getElementById('pageHeader')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }
      this.scrollPosition = this.box.scrollTop
      this.headerTop = this.scrollPosition
      if (this.scrollDirection === 'down' && this.scrollPosition > 0) {
        // alert(true)
        this.scrolledYn = true;
        // move up!
      } else if (this.scrollDirection === 'up' && this.scrollPosition <= 145) {
        this.scrolledYn = false;
      }
    },
    onRefresh () {
      if (this.scrollPosition < 1) {
        this.$router.go(0)
      }
    },
    currentScroll(value) {
      this.scrollPosition = value
    },
    async refreshList () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getPushContentsList(pSize, 0)
      this.commonListData = resultList.content
      this.endList = false
    },
    async refreshPage () {
      this.endList = true
      var resultList = await this.getPushContentsList(10, 0)
      this.commonListData = resultList.content
      this.endList = false
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (JSON.parse(message.pushMessage).noti.data.targetKind === 'CONT') {
            this.refreshList()
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    async loadMore (pageSize) {
      if (this.endListYn === false || this.commonListData.length > pageSize) {
        this.offsetInt += 1
        var resultList = await this.getPushContentsList(pageSize)
        const newArr = [
          ...this.commonListData,
          ...resultList.content
        ]
        if (resultList.content.length < pageSize) {
          this.endListYn = true
        }
        this.commonListData = newArr
      }
    },
    /* addSubHistory (pageName) {
      // eslint-disable-next-line no-array-constructor
      var sHistory = new Array()
      if (this.subHistoryList) {
        sHistory = this.subHistoryList
      }
      sHistory.push(pageName)
      this.subHistoryList = sHistory
    }, */
    closeSearchPop () {
      this.findPopShowYn = false
      /* this.subHistoryList.splice(-1, 1) */
    },
    reload () {
      this.getPushContentsList()
    },
    openPop (value) {
      this.$emit('openPop', value)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    async changeTab (tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.offsetInt = 0
      var resultList = await this.getPushContentsList()
      this.commonListData = resultList.content
      this.findPopShowYn = false
    },
    async getPushContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      }
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
      param.findLogReadYn = null
      param.findActYn = false
      param.findActLikeYn = false
      param.findActStarYn = false
      param.jobkindId = 'ALIM'
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      // } else if (this.viewTab === 'R') {
      //   param.findLogReadYn = false
      // }
      } else if (this.viewTab === 'M') {
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      }

      var result = await this.$getContentsList(param)
      // console.log(result)
      var resultList =result
      return resultList
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
      this.offsetInt = 0
      var resultList = await this.getPushContentsList(10, 0)
      this.commonListData = resultList.content
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
      var resultList = await this.getPushContentsList(pageSize, this.offsetInt)
      this.commonListData = resultList.content
      this.findPopShowYn = false
    }
  },
  data () {
    return {
      offsetInt: 0,
      endListYn: false,
      scrollPosition: 0,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      subHistoryList: [],
      stickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }
      ],
      // activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      activeTabList: [{ display: '최신', name: 'N' }, { display: '내가 보낸', name: 'M' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      commonListData: [],
      findKeyList: {},
      resultSearchKeyList: [],
      refreshYn: true
    }
  }
}
</script>

<style scoped>

.stickerWrap{width: 100%; box-sizing: border-box; height: 40px; overflow-x: scroll; overflow-y: hidden;}
.stickerFrame{min-width: 100%;  width: var(--stickerDivWidth); height: 40px;}
.stickerDiv p {line-height: 20px;}
.popHeight{
  margin-top: 150px;
  height: calc(100% - 150px);
}
/* .popHeight{
  padding-right: 0; padding-left: 0;
  height: calc(100vh - 35px) !important;
} */

.pushListHeader {
    position: absolute;
    /* padding: 0px 1.5rem; */
    top: 0;
    left: 0;
    will-change: transform;
    transition: transform 1s linear;
}
.pushListHeader--pinned {
    transform: translateY(0%);
}
.pushListHeader--unpinned {
    transform: translateY(-100%);
}

</style>
