<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="pagePaddingWrap">
    <div class= "pageHeader pushListCover" >
      <gSearchBox @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      <transition name="showModal">
        <findContentsList transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
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

  <div >
      <commonList :commonListData="commonListData" @goDetail="openPop" />
  </div>
</div>
</template>

<script>
import findContentsList from '../../components/popup/Tal_findContentsList.vue'
// import searchResult from '../../components/unit/Tal_searchResult.vue'
export default {
  name: 'test',
  components: {
    findContentsList
    // searchResult
  },
  props: {
    routerReloadKey: {}
  },
  created () {
    this.$emit('changePageHeader', '알림')
    this.getPushContentsList()
  },
  watch: {
    routerReloadKey () {
      // alert(this.routerReloadKey)
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
    reload () {
      this.getPushContentsList(this.viewTab)
    },
    openPushBoxPop () {
      // eslint-disable-next-line no-new-object
      var value = new Object()
      value.targetType = 'pushBox'
      this.openPop(value)
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
      if (value.teamName !== undefined && value.teamName !== null && value.teamName !== '') { params.chanName = value.teamName }
      this.$emit('openPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    /* goPushBox () {
      this.$router.replace({ name: 'pushBox' })
    }, */
    goSearch () {
      // this.$router.replace({ name: 'pushBox' })
    },
    changeTab (tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.getPushContentsList(tabName)
    },
    async getPushContentsList (viewTab) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.offset = 0
      param.pageSize = 5
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      }
      if (viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      }
      if (viewTab === 'R') {
        param.findLogReadYn = false
      }
      var resultList = await this.$getContentsList(param)
      this.commonListData = resultList.contentsList
      // this.userDoList = resultList.userDo
      this.$emit('closeLoading')
    },
    async getPushContentsList2 (type) {
      var paramMap = new Map()
      if (type !== null && type !== '' && type !== 'N' && type !== 'I') {
        paramMap.set('targetType', type)
      }
      // var response = false
      var resultList = await this.$getContentsList(paramMap)
      this.commonListData = resultList
      /* setTimeout(() => {
        this.$emit('closeLoading')
      }, 500) */
      this.$emit('closeLoading')
    },
    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      // alert(JSON.stringify(this.resultSearchKeyList))
      var resultList = await this.$getContentsList(paramMap)
      this.commonListData = resultList
      this.findPopShowYn = false
    },
    async castingSearchMap (sMap) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (sMap.get('searchKey') !== undefined && sMap.get('searchKey') !== null && sMap.get('searchKey') !== '') {
        searchObj.type = '내용'
        searchObj.keyword = sMap.get('searchKey')
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (sMap.get('creTeam') !== undefined && sMap.get('creTeam') !== null && sMap.get('creTeam') !== '') {
        searchObj.type = '보낸'
        searchObj.keyword = sMap.get('creTeam')
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (sMap.get('creDate') !== undefined && sMap.get('creDate') !== null && sMap.get('creDate') !== '') {
        searchObj.type = '날짜'
        var tempCreDate = sMap.get('creDate')
        if (sMap.get('creDate').length > 1) { tempCreDate = sMap.get('creDate')[0] + ' ~ ' + sMap.get('creDate')[1] }
        searchObj.keyword = tempCreDate
        resultArray.push(searchObj)
      }
      return resultArray
    }
  },
  data () {
    return {
      loadVal: true,
      headerTitle: '알림',
      findPopShowYn: false,
      stickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }
      ],
      subTitlebtnList: [
        { btnName: 'pushBox', icon: 'http://placehold.it/30', function: 'goPushBox' },
        { btnName: 'search', icon: 'http://placehold.it/30', function: 'goSearchPush' }
      ],
      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      commonListData: [],
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
