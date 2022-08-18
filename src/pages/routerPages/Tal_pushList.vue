<template>
  <!-- <div id="pushListWrap" style="height: 100vh; width: 100%; overflow: scroll; background-color: white; background-size: cover;"> -->
    <!-- <div class="pageHeader pushListCover"> -->
    <div style="width: 100%; height: 100%; position: relative; overflow: hidden; float: left;">
      <div id="pageHeader" ref="pushListHeader" class="pushListHeader "  :class="this.scrolledYn? 'pushListHeader--unpinned': 'pushListHeader--pinned'" v-on="handleScroll" >
        <!-- <gSearchBox  @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" /> -->
        <!-- <img v-on:click="openPushBoxPop()" class="fr" style="width: 1.5rem; margin-top: 1.5rem" src="../../assets/images/push/icon_noticebox.png" alt="검색버튼"> -->
        <!-- <gActiveBar  ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab" style="width: 100%;" /> -->
        <gActiveBar :searchYn='true' @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab" style="width: 100%;" />
      </div>
      <transition name="showModal">
        <findContentsList :contentsListTargetType="this.chanAlimTargetType" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>

      <!-- <div id="pushListWrap" class="pushListWrapWrap" ref="pushListWrapWrapCompo" :style="calcPaddingTop" style="position: relative; float: left; width: 100%; padding-top: calc(125px + var(--paddingTopLength)); overflow: hidden scroll; height: calc(100%); "> -->
        <div id="pushListWrap" class="pushListWrapWrap" ref="pushListWrapWrapCompo" :style="calcPaddingTop" style="position: relative; float: left; width: 100%; padding-top: calc(25px + var(--paddingTopLength)); overflow: hidden scroll; height: calc(100%); ">
        <div class="fr pushReadCheckAlimArea" :class="this.scrolledYn? 'pushReadCheckAlimArea--unpinned': 'pushReadCheckAlimArea--pinned'" style="border-radius: 5px; height: 20px; padding: 3px 10px; background: rgb(255 255 255 / 70%); position: sticky; top: 10px; z-index: 1; display: flex; align-items: center;" > <input type="checkbox" v-model="readCheckBoxYn" id="alimReadYn" style="" > <label for="alimReadYn" class="mleft-05 cursorP font15">안읽은 알림 보기</label></div>
        <!-- <div class="stickerWrap">
        <div :style="setStickerWidth" class="mbottom-05 stickerFrame">
          <div class="stickerDiv" :style="'border: 1.5px solid' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" style="min-width: 60px; margin-right: 5px;height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
            <p class="font12">{{value.stickerName}}</p>
          </div>
        </div>
      </div> -->
          <!-- <div style="width:100%; height:100%; top:0; left: 0;position: absolute; z-index: 99999; opacity: 0.1; background-color:#000"> -->
      <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && commonListData.length === 0 " style="margin-top:50px;" />
          <!-- </div> -->
        <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && commonListData.length === 0 " style="margin-top:50px;" />
        <commonList ref='pushListChangeTabLoadingComp' v-show="listShowYn" :imgUrl="this.imgUrl" @openLoading="this.loadingYn = true" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 0px;" :alimListYn="this.alimListYn" :commonListData="this.commonListData" @moreList="loadMore" @goDetail="openPop" @scrollMove="scrollMove" />

      </div>
      <div :class="this.scrolledYn || !this.pushListReloadShowYn ? 'reload--unpinned': 'reload--pinned'" v-on="handleScroll" :style="alimListYn ? 'bottom: 10rem;' : 'bottom: 5rem;' " style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; right: calc(10% + 7px);" @click="refreshAll">
        <img src="../../assets/images/common/reload_button.svg" class="cursorP" style="width: 30px; height: 30px;" />
      </div>
    </div>
  <!-- </div> -->
</template>
<script>
import findContentsList from '../../components/popup/common/Tal_findContentsList.vue'
export default {
  name: 'pushList',
  components: {
    findContentsList
    // searchResult
  },
  props: {
    chanAlimTargetType: {},
    reloadShowYn: {},
    popYn: Boolean,
    alimListYn: Boolean,
    routerReloadKey: {},
    readySearchList: {},
    chanDetailKey: {},
    pushListAndDetailYn: {},
    propData: {}
  },
  async created () {
    if (this.propData) {
      if (this.propData.alimTabType !== undefined && this.propData.alimTabType !== null && this.propData.alimTabType !== '') {
        this.viewTab = this.propData.alimTabType
      }
    }
    if (this.reloadShowYn !== undefined && this.reloadShowYn !== null && this.reloadShowYn !== '') {
      this.pushListReloadShowYn = this.reloadShowYn
    } else {
      this.pushListReloadShowYn = true
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    this.$emit('changePageHeader', '알림')
    // var resultList = await this.getPushContentsList()
    // this.commonListData = resultList.content
    // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
    //   this.endListYn = true
    // } else {
    //   this.endListYn = false
    // }
    // this.$emit('numberOfElements', resultList.totalElements)
    this.findPopShowYn = false
    if (this.readySearchList) {
      this.requestSearchList(this.readySearchList)
    }
    this.introPushPageTab()
    this.scrolledYn = false
  },

  updated () {
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
    if (this.findPopShowYn) {
      this.findPaddingTopPush()
    }
  },
  mounted () {
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
    this.box.addEventListener('scroll', this.handleScroll)
    this.findPaddingTopPush()
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
    if (this.pushListAndDetailYn === true) {
      var propObj = this.propData
      propObj.targetType = 'pushDetail'
      this.openPop(propObj)
    }
    this.findPaddingTopPush()
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  watch: {
    routerReloadKey () {
      this.refreshList()
    },
    reloadShowYn () {
      this.checkShowReload()
    },
    readCheckBoxYn () {
      this.changeTab(this.viewTab)
    }
  },
  computed: {
    calcPaddingTop () {
      return {
        '--paddingTopLength': (this.paddingTop) + 'px'
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
      return {
        '--stickerDivWidth': stickerDivWidth + 'px'
      }
    }
  },
  methods: {
    findPaddingTopPush () {
      var element = document.getElementById('searchResultWrapLength')
      this.paddingTop = element.clientHeight
    },
    checkShowReload () {
      if (this.reloadShowYn !== undefined && this.reloadShowYn !== null && this.reloadShowYn !== '') {
        this.pushListReloadShowYn = this.reloadShowYn
      } else {
        this.pushListReloadShowYn = true
      }
    },
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.changeTab('N')
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.$refs.activeBar.switchtab(0)
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    introPushPageTab () {
      if (this.viewTab === 'N') {
        this.currentTabName = '최신'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'M') {
        this.currentTabName = '내가 보낸'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'L') {
        this.currentTabName = '좋아요'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'S') {
        this.currentTabName = '스크랩'
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('commonListContentBox')[0]
      var parentElement = element.parentElement
      // console.log(this.getAbsoluteTop(element))
      // this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      this.firstContOffsetY = this.getAbsoluteTop(element)
      // console.log(this.firstContOffsetY)
      if (this.firstContOffsetY > 0) {
        this.scrollDirection = 'up'
        this.scrolledYn = false
      }
      if (time / 1000 > 1 && this.box.scrollTop !== undefined && this.$diffInt(this.box.scrollTop, this.scrollPosition) > 150) {
        var test = document.getElementById('pageHeader')
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
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pSize = Number(this.offsetInt) * 10
      }

      var resultList = await this.getPushContentsList(pSize, 0)
      this.commonListData = resultList.content

      this.endListSetFunc(resultList)
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
    async refreshPage () {
      var resultList = await this.getPushContentsList(10, 0)
      this.commonListData = resultList.content
      this.endListSetFunc(resultList)
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
      if (this.endListYn === false) {
        var resultList = await this.getPushContentsList()
        this.axiosResultTempList = resultList.content
        const newArr = [
          ...this.commonListData,
          ...this.axiosResultTempList
        ]
        this.commonListData = newArr
        this.endListSetFunc(resultList)
        this.$emit('numberOfElements', resultList.totalElements)
      } else {
        this.$refs.pushListChangeTabLoadingComp.loadingRefHide()
      }
    },
    closeSearchPop () {
      this.findPopShowYn = false
    },
    reload () {
      this.getPushContentsList()
    },
    openPop (value) {
      this.$emit('openPop', value)
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    async changeTab (tabName) {
      if (this.viewTab !== tabName) {
        this.readCheckBoxYn = false
      }
      this.viewTab = tabName
      this.listShowYn = false
      this.offsetInt = 0
      // document.getElementById('pushListWrap').className += ' fadeOutAnimation'
      this.emptyYn = false
      var resultList = await this.getPushContentsList()
      this.commonListData = resultList.content
      if (this.commonListData.length === 0) this.emptyYn = true
      this.listShowYn = true

      this.endListSetFunc(resultList)

      // document.getElementById('pushListWrap').className += ' fadeInAnimation'
      this.findPopShowYn = false
      this.headerTop = 150 // 탭 변경시 해더의 크기를 못 가져와서 문제가 발생 함 --> 150으로 지정
      this.introPushPageTab()
      this.scrollMove()
    },
    scrollMove (wich) {
      var middle = (document.innerHeight || window.innerHeight) / 2 - 100
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      if (wich === undefined || wich === null || wich === '') { wich = 0 }
      ScrollWrap.scrollTo({ top: (wich - middle), behavior: 'smooth' })
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
      // param.findActYn = false
      param.findActLikeYn = false
      param.findActStarYn = false
      param.jobkindId = 'ALIM'
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey

      if (this.readCheckBoxYn) {
        param.findLogReadYn = false
      }
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'M') {
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      }
      var result = await this.$getContentsList(param)
      // console.log(result)
      if (result.empty) {
        this.$refs.pushListChangeTabLoadingComp.loadingRefHide()
      }
      var resultList = result
      this.$emit('closeLoading')
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
      this.endListSetFunc(resultList)
      // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      //   this.endListYn = true
      // } else {
      //   this.endListYn = false
      // }
      this.findPopShowYn = false
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
      var resultList = await this.getPushContentsList(pageSize, this.offsetInt)
      this.commonListData = resultList.content
      this.findPaddingTopPush()
      this.endListSetFunc(resultList)
      // if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      //   this.endListYn = true
      // } else {
      //   this.endListYn = false
      // }
      // this.findPopShowYn = false
    }
  },
  data () {
    return {
      paddingTop: 0,
      pushListReloadShowYn: false,
      imgUrl: '',
      firstContOffsetY: null,
      headerTop: 0,
      scrollDirection: null,
      box: null,
      scrolledYn: false,
      offsetInt: 0,
      endListYn: false,
      scrollPosition: 0,
      findPopShowYn: false,
      subHistoryList: [],
      stickerList: [],
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 보낸', name: 'M' }],
      viewTab: 'N',
      commonListData: [],
      findKeyList: {},
      resultSearchKeyList: [],
      transition: 'slide-next',
      tabIdx: 0,
      scrollCheckSec: 0,
      axiosResultTempList: [],
      listShowYn: true,
      readCheckBoxYn: false,
      currentTabName: '최신',
      emptyYn: true

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
.pushListHeader {
    width: 100%;
    /* min-height: 132px; */
    padding-top: 0.5rem;
    min-height: 50px;
    position: absolute;
    background-color: #FFF;
    top: 0;
    left: 0;
    z-index: 9;
    will-change: transform;
    transition: transform 0.3s linear;
}
.pushListHeader--pinned {
    transform: translateY(0%);
}
.pushListHeader--unpinned {
    transform: translateY(-100%);
}
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(15rem);
    transition: .5s;
}

.slide-next-leave-active, .slide-next-enter-active, .slide-prev-enter-active, .slide-prev-leave-active {
  transition: .3s;
}

.pushReadCheckAlimArea{
  will-change: transform;
  transition: transform 0.3s linear;
}
.pushReadCheckAlimArea--pinned {
    transform: translateY(0%);
}
.pushReadCheckAlimArea--unpinned {
    transform: translateY(-50px);
}
.newRight{
  animation-name: slideRight; animation-duration: 1s;
  animation-fill-mode: forwards;
}
.newLeft{
  animation-name: slideRight; animation-duration: 1s;
  animation-fill-mode: forwards;
}
.newCenter{
  animation-name: none;
}
@keyframes slideRight {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
@keyframes slideLeft {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, 0);
  }
}

#alimReadYn[type="checkbox"] {
  -webkit-appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  cursor: pointer;
  outline: none !important;
  border: 1px solid #eeeeee;
  border-radius: 2px;
background: #fbfbfb;
}
#alimReadYn[type="checkbox"]::before {
  content: "\2713";
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: scale(0) translate(-50%, -50%);
  line-height: 1;
}
#alimReadYn[type="checkbox"]:checked {
  border-color: rgba(255, 255, 255, 0.3);
  color: #6768a7 !important;
}
#alimReadYn[type="checkbox"]:checked::before {
  border-radius: 2px;
  transform: scale(1) translate(-50%, -50%)
}
</style>
