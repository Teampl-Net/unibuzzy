<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->

<div style="width: 100%; height: 100%; position: relative; overflow: hidden; float: left;">
  <div id="chanListPageHeader" ref="chanListHeader" class="chanListHeader" :class="this.scrolledYn? 'chanListHeader--unpinned': 'chanListHeader--pinned'" v-on="handleScroll">
    <gSearchBox @changeSearchList="changeSearchList" :tab="this.viewTab" @openFindPop="this.chanFindPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList"/>
    <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"></gActiveBar>
  </div>
    <findChannelList @searchList="requestSearchList" v-if="chanFindPopShowYn" @closePop='chanFindPopShowYn = false' />
  <!-- <div style="height: calc(100% - 60px); padding: 0.2rem 0;"> -->
  <!-- <div id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style="padding-top: calc(140px + var(--paddingTopLength)); overflow: hidden scroll; height: 100%; width: 100%; " @mousedown="testTwo" @mouseup="testTr"> -->
  <div id="chanListWrap" ref="chanListWrap" style="padding-top: 140px; overflow: hidden scroll; height: 100%; width: 100%; " @mousedown="testTwo" @mouseup="testTr">
    <div v-show="zzz" style="width: 100%; height: 200px; background: #ccc; position: fixed; bottom: 0;">{{this.firstContOffsetY}}, {{scrollDirection}}, {{this.scrollPosition}}</div>
    <gChannelList ref="gChannelListCompo" :imgUrl="this.imgUrl" @moreList="loadMore"  class="moveBox" :chanList="this.chanList"  @goDetail="goDetail" id='chanlist' @scrollMove="scrollMove"/>
    <!-- <searchChannel class="moveBox" v-if="viewTab === 'search'"/> -->
    <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
  </div>
  <div class="btnPlus" @click="clickCreateChannel" ><p style="font-size:40px;">+</p></div>
  <div :class="this.scrolledYn? 'reload--unpinned': 'reload--pinned'" v-on="handleScroll" style="position: fixed; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 4.5rem; right: calc(50% - 25px);" @click="refreshAll">
    <img src="../../assets/images/common/reload_button.svg" style="width: 30px; height: 30px;">
  </div>
</div>
</template>

<script>
/* eslint-disable */
import findChannelList from '../../components/popup/common/Tal_findChannelList.vue'

export default {
  /* metaInfo: {
    // title 입력하기
    title: '페이지 타이틀',
    // link tag 입력하기
    link: [{ rel: 'canonical', href: 'http://192.168.0.22:8080?chanDetail=1001245' }],
    // meta tag 입력하기
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { vmid: 'description', name: 'description', content: 'description' },
      { vmid: 'description', name: 'description', content: 'description' }
      // vmid ↑ 메타 태그를 고유하게 만들어준다.
    ]
  }, */
  name: 'user',
  components: {
    findChannelList
    // searchChannel
    // myChanList
  },
  updated () {
    this.box = document.getElementById('chanListWrap')
  },
  computed: {
    // calcPaddingTop () {
    //   var element = document.getElementById('searchResultWrapLength')
    //   debugger
    //   this.paddingTop = element.clientHeight
    //   return {
    //     '--paddingTopLength' : (this.paddingTop)  + 'px'
    //   }
    // },
    // calcHeaderHeight () {
    //   if (this.headerTop) {
    //   } else {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     this.headerTop = 140
    //   }
    //   //
    //   return {
    //     '--headerHeight': this.headerTop + 'px'
    //   }
    // },
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
    this.box = document.getElementById('chanListWrap')
    this.box.addEventListener('scroll', this.handleScroll)

    if (this.viewTab === 'user') {
      this.$refs.activeBar.switchtab(0)
    } else if (this.viewTab === 'all') {
      this.$refs.activeBar.switchtab(1)
    } else if (this.viewTab === 'mychannel') {
      this.$refs.activeBar.switchtab(2)
    }
  },
  async created () {
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.viewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
      /* var history = localStorage.getItem('popHistoryStack').split('$#$')
      this.pageHistoryName = 'page' + (history.length - 1) */
    }
    this.$emit('changePageHeader', '채널')
    var resultList = await this.getChannelList()
    this.chanList = resultList.content
    if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      this.endListYn = true
    } else {
      this.endListYn = false
    }
    this.$emit('closeLoading')
    this.introChanPageTab()
  },
  methods: {
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.resultSearchKeyList = []
      this.changeTab('user')
      this.$refs.activeBar.switchtab(0)
      var chanListWrap = this.$refs.chanListWrap
      chanListWrap.scrollTo({ top: 0 })
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    scrollMove () {
      var chanListWrap = this.$refs.chanListWrap
      chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
    },
    introChanPageTab () {
      if (this.viewTab === 'user') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'all') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'mychannel') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var element = document.getElementsByClassName('chanRow')[0]
      // eslint-disable-next-line no-
      //
      var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)

      var test = document.getElementById('chanListPageHeader')
      parentElement = element.parentElement
      this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)

      if (this.firstContOffsetY < 0) {
        if (this.box.scrollTop > this.scrollPosition) {
          this.scrollDirection = 'down'
          this.scrolledYn = true
        } else if (this.box.scrollTop <= this.scrollPosition) {
          this.scrollDirection = 'up'
          this.scrolledYn = false
        }
      }
      this.scrollPosition = this.box.scrollTop
    },
    async refreshList () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getChannelList(pSize, 0)
      this.chanList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      this.endList = false
    },

    async loadMore (pageSize) {
      if (this.endListYn === false || this.totalElements > this.chanList.length) {
        this.offsetInt += 1
        var resultList = await this.getChannelList()
        const newArr = [
          ...this.chanList,
          ...resultList.content
        ]
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.endListYn = false
        }
        this.chanList = newArr
      } else {
        this.$refs.gChannelListCompo.loadingRefHide()
      }
    },

    // testRefresh () {
    //   var top = document.getElementById('refresh').getBoundingClientRect().top
    //   console.log(top)
    //   // if(top>80){
    //   // location.href = location.href
    //   // console.log(location.href)
    //   // }
    // },
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
      // this.chanList = []
      this.viewTab = tab
      this.offsetInt = 0
      document.getElementById('chanListWrap').className = 'fadeOutAnimation'
      var resultList = await this.getChannelList()
      this.chanList = resultList.content
      document.getElementById('chanListWrap').className = 'fadeInAnimation'
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      if (this.viewTab === 'mychannel') {
        this.myChanListPopYn = true
      } else {
        this.myChanListPopYn = false
      }
      this.scrollMove()
      this.introChanPageTab()
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
      console.log('!!!!!!!!!!!!!!!!!!!')
      console.log(params)
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
        paramMap.set('managerYn', true)
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
      var result = await this.$getTeamList(paramMap)
      // var pageable = resultList.pageable
      // eslint-disable-next-line no-
      // this.totalPages = resultList.totalPages
      // this.totalElements = resultList.totalElements
      if(result.empty){
        this.$refs.gChannelListCompo.loadingRefHide()
      }
      var resultList = result.data
      return resultList
    },

    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      var resultList = await this.getChannelList()
      this.chanList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
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
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
    }

  },
  data () {
    return {
      paddingTop: 0,
      imgUrl: '',
      box: null,
      scrollPosition: 0,
      scrollDirection: null,
      firstContOffsetY: null,
      scrolledYn: false,
      headerTop: 0,
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
    popYn: Boolean,
    propData: {}
  }
}
</script>

<style scoped>
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(10rem);
    transition: .5s;
}
.chanListHeader {
    width: 100%;
    min-height: 132px;
    position: absolute;
    background-color: #FFF;
    top: 0;
    left: 0;
    z-index: 9;
    will-change: transform;
    transition: transform 0.3s linear;
}

.chanListHeader--pinned {
    transform: translateY(0%);
}
.chanListHeader--unpinned {
    transform: translateY(-100%);
}
.moveBox{transition: 0.5s ease;}
/* btnPlus common.css로 옮김 */
</style>
