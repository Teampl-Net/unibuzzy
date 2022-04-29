<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="pagePaddingWrap">
    <div class= "pageHeader pushListCover" >
      <div class="pushListSearchArea">
          <div style="position: relative; margin-top: 0.5rem; height: 40px;">
              <img class="searchIcon mtop-03" @click="this.findPopShowYn = true" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
              <div class="searchInput" @click="this.findPopShowYn = true" ref="alimSearchKey" />
          </div>
          <div style="width: 100%;">
            <searchResult :searchList="this.resultSearchKeyList" />
          </div>
      </div>
      <findContentsList @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
      <!-- <img v-on:click="openPushBoxPop()" class="fr" style="width: 1.5rem; margin-top: 1.5rem" src="../../assets/images/push/icon_noticebox.png" alt="검색버튼"> -->
    </div>
  <!-- <div class="stickerWrap" >
    <p class="textLeft mbottom-05">내 스티커</p>
    <div :style="setStickerWidth" class="mbottom-05 stickerFrame">
      <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" >
        <span class="font12">{{value.stickerName}}</span>
      </div>
    </div>
  </div> -->
  <gActiveBar class="fl" :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div style="padding: 1.5rem 0">
        <commonList :commonListData="commonListData" @goDetail="openPop" />
    </div>
  </div>
</template>

<script>
import findContentsList from '../../components/popup/Tal_findContentsList.vue'
import searchResult from '../../components/unit/Tal_searchResult.vue'
export default {
  name: 'test',
  components: {
    findContentsList,
    searchResult
  },

  created () {
    this.$emit('changePageHeader', '알림')
    this.getPushContentsList()
  },
  computed: {
    setStickerWidth () {
      var stickerCnt = this.stickerList.length
      // var textWidth = 16
      var stickerDivHeight = 0
      for (var i = 0; i < stickerCnt; i++) {
        stickerDivHeight += this.stickerList[i].stickerName.length * 30 + 10
      }
      // var stickerDivList = document.getElementsByClassName('stickerDiv')
      return {
        '--stickerDivHeight': stickerDivHeight + 'px'
      }
    }
  },
  methods: {
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
      if (value.pushKey !== undefined && value.pushKey !== null && value.pushKey !== '') { params.targetKey = value.pushKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.chanName }
      this.$emit('openPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    goPushBox () {
      this.$router.replace({ name: 'pushBox' })
    },
    goSearch () {
      // this.$router.replace({ name: 'pushBox' })
    },
    changeTab (tabName) {
      this.viewTab = tabName
      this.getContentsList(tabName)
    },
    async getPushContentsList (type) {
      var paramMap = new Map()
      if (type !== null && type !== '' && type !== 'N' && type !== 'I') {
        paramMap.set('targetType', type)
      }
      // var response = false
      var resultList = await this.$getContentsList(paramMap)
      this.commonListData = resultList
    },
    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
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
      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'I' }],
      viewTab: 'N',
      commonListData: [],
      resultSearchKeyList: []
    }
  }
}
</script>

<style scoped>

.pushListCover{min-height: 3.6rem; margin-bottom: 1rem}
.pushListSearchArea{position: relative; margin: 1rem 0; margin-top: 0; min-height: 2.5rem; width: 100%; float: left;}
.searchIcon{width: 1.5rem; float: right;}
.searchInput{border: 2px solid #E4E4E4; float: left; width: calc(100% - 2rem); float: left; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}

.searchIcon{width: 1.5rem; position: absolute; top:0.3rem; right: 0.9rem}
.searchInput{border: none; background: #e4e4e463; height: 100%; float: left; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}

.stickerWrap{width: 100px; overflow-x: scroll; overflow-y: hidden; position: absolute; right: 30px;}
.stickerFrame{width: 100%;  height: var(--stickerDivHeight); display: flex; flex-direction: column; align-items: flex-end;}
.stickerDiv{min-width: 60px; margin-bottom: 5px;height: 25px; float: right; border-radius: 20px; float: left; padding: 0 10px;}
</style>
