<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div style="padding-right: 0; padding-left: 0; height: 100%;">

    <!-- {{scrollPosition}} -->
    <div class= "pageHeader pushListCover" >
      <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      <transition name="showModal">
        <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>
      <!-- <img v-on:click="openPushBoxPop()" class="fr" style="width: 1.5rem; margin-top: 1.5rem" src="../../assets/images/push/icon_noticebox.png" alt="검색버튼"> -->
    </div>
  <gActiveBar :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab" />
  <div class="stickerWrap">
    <div :style="setStickerWidth" class="mbottom-05 stickerFrame">
      <div class="stickerDiv" :style="'border: 1.5px solid' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" style="min-width: 60px; margin-right: 5px;height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
        <p class="font12">{{value.stickerName}}</p>
      </div>

    </div>
  </div>
  <commonList :commonListData="commonListData" @goDetail="openPop" />
  <myObserver @triggerIntersected="loadMore" />
  <!-- <infinite-loading @infinite="infiniteHandler" ></infinite-loading> -->


</div>
</template>

<script>
// import myObserver from '../../components/Tal_ScrollObserver.vue'
import findContentsList from '../../components/popup/Tal_findContentsList.vue'
// import searchResult from '../../components/unit/Tal_searchResult.vue'
export default {
  name: 'test',
  components: {
    findContentsList,
    // searchResult

  },
  props: {
    popYn: Boolean,
    routerReloadKey: {},
    readySearhList: {},
    chanDetailKey: {},
    notiTargetKey: {}
  },
  created () {
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
      document.addEventListener('message', e => this.BackPopClose(e))
      window.addEventListener('message', e => this.BackPopClose(e))
      var history = localStorage.getItem('popHistoryStack').split('$#$')
      this.pageHistoryName = 'page' + (history.length - 1)
    }
    this.$emit('changePageHeader', '알림')
    this.getPushContentsList()
    if (this.readySearhList) {
      this.requestSearchList(this.readySearhList)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
    if (this.notiTargetKey) {
      this.openPop({ contentsKey: this.notiTargetKey })
    }
  },
  watch: {
    routerReloadKey () {
      this.reload()
    }
  },
  computed: {
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
  methods: {
    async loadMore(){
      // console.log('옵저버 실행'+(this.offsetInt++))
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@여기에 추가아아~~~~~~~~~@@@@@@@@@@@@@@@@@
      var param = new Object()
      if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
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
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'R') {
        param.findLogReadYn = false
      }

      param.offsetInt = this.offsetInt++
      param.pageSize = 10

      var resultList = await this.$getContentsList(param)

      const newArr = [
        ...this.commonListData,
        ...resultList.content
      ]
      this.commonListData = newArr
      this.findPopShowYn = false
    },
    // infiniteHandler($state) {

    //   var param = new Object()
    //   var resultData = null
    //   param.offsetInt = this.limit
    //   param.pageSize = 10

    //   this.$axios.post('/tp.getContentsList', Object.fromEntries(paramMap)
    //   ).then(response => {
    //     if(response.hits.length){
    //       this.commonListData.push(response.data)
    //       $state.loaded();
    //       this.limit += 1
    //     }else{
    //       $state.complete();
    //     }
    //   }).catch((error) => {
    //     console.warn('ERROR!!!!! : ', error)
    //   })

    // },
    addSubHistory (pageName) {
      // eslint-disable-next-line no-array-constructor
      var sHistory = new Array()
      if (this.subHistoryList) {
        sHistory = this.subHistoryList
      }
      sHistory.push(pageName)
      this.subHistoryList = sHistory
    },
    closeSearchPop () {
      this.findPopShowYn = false
      this.subHistoryList.splice(-1, 1)
    },
    BackPopClose (e) {
      if (this.subHistoryList.length === 0) {
        if (this.popYn === false) {
          if (JSON.parse(e.data).type === 'goback') {
            if (localStorage.getItem('pageDeleteYn') === true || localStorage.getItem('pageDeleteYn') === 'true') {
              if (localStorage.getItem('curentPage') === this.pageHistoryName) {
                this.$removeHistoryStackForPage(this.pageHistoryName)
              }
            }
          }
        }
      }
    },
    reload () {
      this.getPushContentsList()
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        params.targetType = value.targetType
      } else {
        params.targetType = 'pushDetail'
      }
      params.value = value
      if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      // if (value.nameMtext !== undefined && value.teamName !== null && value.teamName !== '') { params.chanName = value.teamName }
      this.$emit('openPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    changeTab (tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.getPushContentsList()
    },
    async getPushContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
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
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'R') {
        param.findLogReadYn = false
      }
      var resultList = await this.$getContentsList(param)
      this.commonListData = resultList.content
      this.findPopShowYn = false
      // this.userDoList = resultList.userDo
      this.$emit('closeLoading')
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
      await this.getPushContentsList()
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
      await this.getPushContentsList()
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  },
  data () {
    return {
      offsetInt:1,

      scrollPosition: null,
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
      resultSearchKeyList: []
    }
  }
}
</script>

<style scoped>

.pushListCover{min-height: 3.6rem; margin-bottom: 1rem}

.stickerWrap{width: 100%; box-sizing: border-box; height: 40px; overflow-x: scroll; overflow-y: hidden;}
.stickerFrame{min-width: 100%;  width: var(--stickerDivWidth); height: 40px;}
.stickerDiv p {line-height: 20px;}
</style>
