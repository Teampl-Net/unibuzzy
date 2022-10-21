<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
<div class="" style="width: 100%; height: 100%; position: relative; padding: 0 1rem; padding-top: 10px; overflow: hidden; float: left;">
  <loadingCompo v-if="loadingYn === true"/>
  <div id="chanListPageHeader" ref="chanListHeader" class="chanListHeader" :class="this.scrolledYn? 'chanListHeader--unpinned': 'chanListHeader--pinned'" v-on="handleScroll">
    <!-- <gSearchBox @changeSearchList="changeSearchList" :tab="this.viewTab" @openFindPop="this.chanFindPopShowYn = true" :resultSearchKeyList="this.resultSearchKeyList"/> -->
    <gActiveBar :searchYn='true' @changeSearchList="changeSearchList" @openFindPop="this.chanFindPopShowYn = true" :resultSearchKeyList="this.resultSearchKeyList" ref="activeBar" :tabList="this.activeTabList" class="fl" style="" @changeTab="changeTab"></gActiveBar>
  </div>
    <findChannelList @searchList="requestSearchList" v-if="chanFindPopShowYn" @closePop='chanFindPopShowYn = false' />
  <!-- <div style="height: calc(100% - 60px); padding: 0.2rem 0;"> -->
  <div id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style="padding-top: calc(25px + var(--paddingTopLength)); overflow: hidden scroll; height: calc(100%); width: 100%; " @mousedown="testTwo" @mouseup="testTr">
  <!-- <div id="chanListWrap" ref="chanListWrap" style="padding-top: 140px; overflow: hidden scroll; height: 100%; width: 100%; " @mousedown="testTwo" @mouseup="testTr"> -->
    <gEmty :tabName="currentTabName" contentName="채널" v-if="emptyYn && this.GE_DISP_TEAM_LIST.length === 0" style="margin-top:50px;" />
    <gChannelList v-show="listShowYn" ref="gChannelListCompo" :imgUrl="this.imgUrl" @moreList="loadMore"  class="moveBox" :chanList="this.GE_DISP_TEAM_LIST"  @goDetail="goDetail" id='chanlist' @scrollMove="scrollMove"/>
    <!-- <searchChannel class="moveBox" v-if="viewTab === 'search'"/> -->
    <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
  </div>
  <!-- <div class="btnPlus" @click="clickCreateChannel" ><p style="font-size:40px;">+</p></div> -->
  <img src="../../assets/images/button/Icon_CreChanBtn.svg" @click="clickCreateChannel" alt="채널 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78">
  <div style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 7rem; right: calc(10% + 7px);" @click="refreshAll">
    <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;">
  </div>
</div>
</template>

<script>
/* eslint-disable */
import findChannelList from '../../components/popup/common/Tal_findChannelList.vue'
import loadingCompo from '../../components/layout/Tal_loading.vue'

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
    findChannelList,
    loadingCompo
    // searchChannel
    // myChanList
  },
  updated () {
    this.box = document.getElementById('chanListWrap')
    if (this.chanFindPopShowYn) {
      this.findPaddingTopChan()
    }
  },
  computed: {
    calcPaddingTop () {
      return {
        '--paddingTopLength' : this.paddingTop + 'px'
      }
    },
    GE_NEW_CHAN_LIST () {
        return this.$store.getters['D_CHANNEL/GE_NEW_CHAN_LIST']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_USER () {
        return this.$store.getters['D_USER/GE_USER']
    },
    GE_DISP_TEAM_LIST () {
        var index = null
        var teamList = this.GE_MAIN_CHAN_LIST
        for (var i = 0; i < this.channelList.length; i++) {
            index = teamList.findIndex((item) => item.teamKey === this.channelList[i].teamKey)
            if (index !== -1) {
                this.channelList[i] = teamList[index]
            }
        }
        var returnData = this.channelList

      return returnData
    },
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
    GE_NEW_CHAN_LIST: {
        /* handler (value, old) {
            var newArr = [
                value[0],
                ...this.channelList
            ]
            this.channelList = this.replaceArr(newArr)
        },
        deep: true */
    },
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
    this.$emit('closeLoading')
  },
  async created () {
    this.$emit('changePageHeader', '채널')
    this.loadingYn = true
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.viewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    if (!this.GE_DISP_TEAM_LIST || this.GE_DISP_TEAM_LIST.length === 0) {
        var resultList = await this.getChannelList(null, null, true)
        var newArr = []
        for (var i = 0; i < resultList.content.length; i++) {
            if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            newArr.push(resultList.content[i])
            }
        }
        if (newArr.length > 0) {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
        }
        this.channelList = resultList.content
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        } else {
        this.endListYn = false
        }
    }

    this.introChanPageTab()
    this.scrolledYn = false
    this.findPaddingTopChan()
    this.loadingYn = false
  },
  methods: {
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ teamKey }) => teamKey === current.teamKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    findPaddingTopChan () {
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.paddingTop = element.clientHeight + 20
      }
    },
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.loadingYn = true
      this.resultSearchKeyList = []
      this.changeTab('user')
      await this.$refs.activeBar.switchtab(0)
      var chanListWrap = await this.$refs.chanListWrap
      await chanListWrap.scrollTo({ top: 0 })
      setTimeout(() => {
        this.$emit('closeLoading')
        this.loadingYn = false
      }, 500)
    },
    scrollMove () {
      var chanListWrap = this.$refs.chanListWrap
      chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
    },
    introChanPageTab () {
      if (this.viewTab === 'user') {
        this.currentTabName = '구독중'
        // this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'all') {
        this.currentTabName = '전체'
        // this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'mychannel') {
        this.currentTabName = '내 채널'
        // this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('chanRow')[0]
      var parentElement = element.parentElement
      // this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      this.firstContOffsetY = this.getAbsoluteTop(element)
      if (this.firstContOffsetY > 0) {
        this.scrollDirection = 'up'
        this.scrolledYn = false
      }
      if (time / 1000 > 1 && this.$diffInt(this.box.scrollTop, this.scrollPosition) > 150) {
        var test = document.getElementById('chanListPageHeader')
        this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
        this.scrollCheckSec = currentTime

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
      }

    },
    async refreshList () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getChannelList(pSize, 0, null)
      this.channelList = resultList.content
      var newArr = []
        for (var i = 0; i < resultList.content.length; i++) {
            if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            newArr.push(resultList.content[i])
            }
        }
        if (newArr.length > 0) {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
        }
        this.channelList = resultList.content
      // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      //   this.endListYn = true
      // } else {
      //   this.endListYn = false
      // }
      // this.endList = false
      // this.endListSetFunc(resultList)
    },
    endListSetFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
    },
    async loadMore (pageSize) {
      if (this.endListYn === false ) {
        var resultList = await this.getChannelList()

        console.log(resultList)
        if (resultList === undefined) return
        var addList = []
        for (var i = 0; i < resultList.content.length; i++) {
            if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            addList.push(resultList.content[i])
            }
        }
        if (addList.length > 0) {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', addList)
        }
        const newArr = [
          ...this.channelList,
          ...resultList.content
        ]
        this.channelList = newArr
        // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        //   this.endListYn = true
        // } else {
        //   this.endListYn = false
        // }

      } else {
        this.$refs.gChannelListCompo.loadingRefHide()
      }
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
    allChannelInfo() {
      for (var i = 0; i < this.GE_DISP_TEAM_LIST.length; i++) {
        if (this.GE_DISP_TEAM_LIST[i].userTeamInfo) {
          this.GE_DISP_TEAM_LIST[i].ownerYn = this.GE_DISP_TEAM_LIST[i].userTeamInfo.ownerYn
          if (this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey) {
            this.GE_DISP_TEAM_LIST[i].managerKey = this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey
          }
        }
      }
    },
    async changeTab (tab) {
      this.viewTab = tab
      this.offsetInt = 0
      this.listShowYn = false
      this.emptyYn = false
      var resultList = await this.getChannelList(null, null, true)
      var addList = []
        for (var i = 0; i < resultList.content.length; i++) {
            if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            addList.push(resultList.content[i])
            }
        }
        if (addList.length > 0) {
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', addList)
        }
      this.channelList = resultList.content
      if (this.channelList.length === 0) this.emptyYn = true

      this.listShowYn = true
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      if (this.viewTab === 'all') {
        this.allChannelInfo()
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

      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },

    async getChannelList (pageSize, offsetInput, loadingYn) {
      if (this.axiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
	  this.axiosQueue.push('getChannelList')
      var paramMap = new Map()
      if (loadingYn) {
        this.$showAxiosLoading(true)
      }
      var userKey = this.GE_USER.userKey
      if (this.viewTab === 'user') {
        paramMap.set('userKey', userKey)
      } else if (this.viewTab === 'all') {
        paramMap.set('fUserKey', userKey)
      } else if (this.viewTab === 'mychannel') {
        paramMap.set('userKey', userKey)
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
      this.$showAxiosLoading(false)
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'getChannelList')
      this.axiosQueue.splice(queueIndex, 1)
      // var pageable = resultList.pageable
      // eslint-disable-next-line no-
      // this.totalPages = resultList.totalPages
      // this.totalElements = resultList.totalElements
      if(result.empty){
        this.$refs.gChannelListCompo.loadingRefHide()
      }
      var resultList = result.data
      // console.log('#######################')
      // console.log(resultList)
      this.endListSetFunc(resultList)
      return resultList
    },

    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      var resultList = await this.getChannelList(null, null, true)
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      // this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', resultList.content)
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      this.channelList = resultList.content
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
    async changeSearchList(idx) {
      this.resultSearchKeyList.splice(idx, 1)
      if (this.resultSearchKeyList.length === 0) {
        this.paddingTop = 20
      }
      this.offsetInt = 0
      var resultList = await this.getChannelList(null, null, true)
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      this.channelList = resultList.content
      this.findPaddingTopChan()
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
    }
  },
  data () {
    return {
      channelList: [],
      paddingTop: 20,
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
      chanFindPopShowYn: false,
      resultSearchKeyList: '',

      myChanListPopYn: false,
      totalElements: 0,
      totalPages: 0,
      scrollCheckSec: 0,
      listShowYn: true,
      currentTabName: '구독중',
      emptyYn: true,
      loadingYn: false,
      axiosQueue: []
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
    transform: translateY(15rem);
    transition: .5s;
}
.chanListHeader {
    width: 100%;
    /* min-height: 132px; */
    min-height: 50px;
    padding-top: 10px;
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
