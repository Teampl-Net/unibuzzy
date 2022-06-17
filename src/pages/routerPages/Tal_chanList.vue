<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->

<div style="width: 100%; height: calc(100% - 60px);">

  <gSearchBox @changeSearchList="changeSearchList" :tab="this.viewTab" @openFindPop="this.chanFindPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList"/>
  <findChannelList @searchList="requestSearchList" v-if="chanFindPopShowYn" @closePop='chanFindPopShowYn = false' />
  <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"></gActiveBar>
  <!-- <div style="height: calc(100% - 60px); padding: 0.2rem 0;"> -->
  <div style="height: calc(100% - 60px); width: 100%; padding: 0.2rem 0; padding-bottom:70px; overflow:scroll;" @mousedown="testTwo" @mouseup="testTr">
    <gChannelList @moreList="loadMore"  class="moveBox" :chanList="this.chanList"  @goDetail="goDetail" id='chanlist'/>
    <!-- <searchChannel class="moveBox" v-if="viewTab === 'search'"/> -->
    <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
  </div>
  <div class="btnPlus" @click="clickCreateChannel" ><p style="font-size:40px;">+</p></div>
</div>
</template>

<script>
import findChannelList from '../../components/popup/Tal_findChannelList.vue'

export default {
  name: 'user',
  components: {
    findChannelList
    // searchChannel
    // myChanList
  },
  computed: {
    historyStack () {
      return this.$store.state.historyStack
    }
  },
  watch: {
    historyStack () {
    },
    routerReloadKey () {
      this.refreshList()
    }
  },
  mounted () {

    //   var scrolltop = window.scrollTop();
    //   console.log(scrolltop);
    // var height = window.height();
    // console.log(height);
    // var height_win = $(window).height();
    // console.log(height_win);
    // if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
    //   moreList();

    // }
    // })

  },

  async created () {
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
      /* var history = localStorage.getItem('popHistoryStack').split('$#$')
      this.pageHistoryName = 'page' + (history.length - 1) */
    }
    this.$emit('changePageHeader', '채널')
    var resultList = await this.getChannelList()
    this.chanList = resultList.content
    this.$emit('closeLoading')
  },
  methods: {
    async refreshList () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getChannelList(pSize, 0)
      this.chanList = resultList.content
      this.endList = false
    },

    async loadMore (pageSize) {
      if (this.endListYn === false || this.totalElements > this.chanList.length) {
        this.offsetInt += 1
        var resultList = await this.getChannelList(pageSize)
        const newArr = [
          ...this.chanList,
          ...resultList.content
        ]
        if (this.totalElements === this.chanList.length) { this.endListYn = true }
        this.chanList = newArr
      }
    },

    testRefresh () {
      var top = document.getElementById('refresh').getBoundingClientRect().top
      console.log(top)
      // if(top>80){
      // location.href = location.href
      // console.log(location.href)
      // }
    },
    clickCreateChannel () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'createChannel'
      this.$emit('openPop', params)
    },
    openManagerChanDetail (param) {
      this.$emit('openPop', param)
    },
    async changeTab (tab) {
      // this.chanList = {}
      // this.$emit('openLoading')

      this.viewTab = tab
      this.offsetInt = 0
      var resultList = await this.getChannelList()
      this.chanList = resultList.content
      this.$emit('closeLoading')

      if (this.viewTab === 'mychannel') {
        this.myChanListPopYn = true
      } else {
        this.myChanListPopYn = false
      }
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = value.teamKey
      params.chanName = value.teamNameMtext
      if (this.viewTab === 'user') {
        value.followYn = true
      }
      params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },

    async getChannelList (pageSize, offsetInput) {
      var paramMap = new Map()
      if (this.viewTab === 'user') {
        var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        paramMap.set('userKey', userKey)
      } else if (this.viewTab === 'mychannel') {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        paramMap.set('followerType', 'A')
      }
      if (this.resultSearchKeyList.length > 0) {
        paramMap.set('nameMtext', this.resultSearchKeyList[0].keyword)
      }
      if (offsetInput !== undefined) {
        paramMap.set('offsetInt', offsetInput)
      } else {
        paramMap.set('offsetInt', this.offsetInt)
      }
      if (pageSize) {
        paramMap.set('pageSize', pageSize)
      } else {
        paramMap.set('pageSize', 10)
      }
      var resultList = await this.$getTeamList(paramMap)
      // var pageable = resultList.pageable
      this.totalPages = resultList.totalPages
      this.totalElements = resultList.totalElements
      return resultList.data
    },

    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      var resultList = await this.getChannelList()
      this.chanList = resultList.content
      this.viewTab = 'all'
      this.$refs.activeBar.switchtab(1)// 전체
      this.$refs.activeBar.selectTab('all')// 전체
      this.chanFindPopShowYn = false
    },
    async castingSearchMap (sMap) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (sMap.get('nameMtext') !== undefined && sMap.get('nameMtext') !== null && sMap.get('nameMtext') !== '') {
        searchObj.typeName = '채널'
        // searchObj.type = '채널명'
        searchObj.keyword = sMap.get('nameMtext')
        resultArray.push(searchObj)
      }
      return resultArray
    },
    async changeSearchList (idx) {
      this.resultSearchKeyList.splice(idx, 1)
      var resultList = await this.getChannelList()
      this.chanList = resultList.content
    }

  },
  data () {
    return {
      offsetInt: 0,
      pageHistoryName: '',
      endListYn: false,
      viewTab: 'user',
      // activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      subTitlebtnList: [],
      chanList: [],
      chanFindPopShowYn: false,
      resultSearchKeyList: '',

      myChanListPopYn: false,
      totalElements: 0,
      totalPages: 0
    }
  },
  props: {
    routerReloadKey: {},
    params: {},
    popYn: Boolean
  }
}
</script>

<style scoped>

.moveBox{transition: 0.5s ease;}
.btnPlus{
  width:4rem; height:4rem; display: flex;
  padding-top: 5px;
  justify-content: center; align-items: center;
  color:#6768a7; border:3px solid #6768a7; background-color:white ;

  border-radius:4rem; position:fixed; bottom: 80px; right: 10%;
  box-shadow: 2px 2px 7px 3px #ccc;

}
</style>
