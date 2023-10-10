<i18n>
{
  "ko": {
    "CHAN_POST_NONE_CONT": "버튼을 눌러 첫 컨텐츠를 작성해보세요.",
    "CHAN_POST_MSG_SET_ERROR": "작성 setting 중 오류",
    "CHAN_POST_NO_PERMI": "권한이 없습니다.",
    "CHAN_POST_TITLE": "제목",
    "CHAN_POST_CRE_USER": "작성자",
    "CHAN_POST_SENT": "보낸",
    "CHAN_POST_DATE": "날짜",
    "CHAN_POST_FILTER": "필터",
    "CHAN_POST_STAT": "분류"
  },
  "en": {
    "CHAN_POST_NONE_CONT": "Create the first content for your channel's bulletin board.",
    "CHAN_POST_MSG_SET_ERROR": "Error during creation setting",
    "CHAN_POST_NO_PERMI": "You don't have permission.",
    "CHAN_POST_TITLE": "Title",
    "CHAN_POST_CRE_USER": "Writer",
    "CHAN_POST_SENT": "Sent",
    "CHAN_POST_DATE": "Date",
    "CHAN_POST_FILTER": "Filter",
    "CHAN_POST_STAT": "Status"
  }
}
</i18n>
<template>
<div class="w100P h100P">
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" class="popBg"></div>
    <unknownLoginPop :pClosePop="closeUnknownLoginPop" class="fixed" v-if="GE_USER.unknownYn && mUnknownLoginPopYn" />
    <div class="pushListArea" >
      <gConfirmPop v-if="failPopYn" @no="failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <div id="pageHeader" ref="pushListHeader" class="pushListHeader"  :class="scrolledYn? 'pushListHeader--unpinned': 'pushListHeader--pinned'" v-on="handleScroll" >
        <gSelectFilter :searchYn='true' @changeSearchList="changeSearchList" :subTabList="mBoardFilterList" @openFindPop="findPopShowYn = true " :resultSearchKeyList="resultSearchKeyList" ref="activeBar" :tabList="mCommonFilterList" class="fl selectFilter" @changeTab="changeTab" @changeBoardTab="changeBoard"/>
        <div v-on="handleScroll" class="reloadImgWrap" @click="refreshAll">
            <img src="../../../assets/images/common/commonReload.png" class="cursorP" @click="refreshAll"/>
        </div>
      </div>
      <transition name="showModal">
        <findContentsList :tpGroupCode="viewMainTab === 'A'? 'C_STAT' : ''" :contentsListTargetType="viewMainiTab === 'F'? 'fileBox':chanAlimTargetType" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" :pClosePop="closeSearchPop" :teamKey='pChannelDetail.teamKey'/>
      </transition>

        <div id="pushListWrap" class="scrollHidden" ref="pushListWrapWrapCompo" :style="'padding: 0 1rem ; padding-top: calc(' + paddingTop + 'px + 1rem);'">
          <!-- 스크롤 시 첫번째 로우의 위치를 확인하기 위해 넣은 태그입니다. ( 스크롤 시 헤더 숨기게 ) -->
          <div class="w100P fl commonListContentBox" style="height:1px;" />
          <template v-for="(cont, index) in GE_DISP_ALL_LIST" :key="cont.contentsKey">
            <gUBContentsBox :pOpenUnknownLoginPop="openUnknownLoginPop" @contMove="refreshAll" @contDelete="refreshAll" :index="index" :contentsIndex="index" @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" @fileDownload="fileDownload"/>
            <myObserver v-if="index === GE_DISP_ALL_LIST.length - 5" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
          </template>

          <template v-if="viewMainTab === 'A'">
            <template v-if="skeletonShow">
              <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
            </template>
            <gEmpty v-else-if="GE_DISP_ALL_LIST && viewMainTab === 'A' && GE_DISP_ALL_LIST.length === 0 && !skeletonShow" :tabName="currentTabName" contentName="전체" :key="mEmptyReloadKey" class="mtop-2"/>
          </template>

          <template  v-for="(cont, index) in GE_FILE_LIST" :key="index">
              <gFileBox @openImgPop="openImgPop" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-if="viewMainTab === 'F'"/>
              <myObserver v-if="index === GE_FILE_LIST.length - 1" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
          </template>
          <gEmpty :tabName="currentTabName" contentName="파일함" v-if="viewMainTab === 'F' && GE_FILE_LIST.length === 0" :key="mEmptyReloadKey" class="mtop-2"/>
        </div>
    </div>
</div>
</template>
<script>
import SkeletonBox from '../../../components/pageComponents/push/UB_contentsSkeleton'
import findContentsList from '../../../components/popup/common/UB_findContentsList.vue'
import unknownLoginPop from '@/components/pageComponents/channel/UB_unknownLoginPop.vue'
export default {
  name: 'pushList',
  components: {
    SkeletonBox,
    findContentsList,
    unknownLoginPop
  },
  props: {
    pCabinetKeyListStr: {},
    initData: {},
    chanAlimTargetType: {},
    popYn: Boolean,
    alimListYn: Boolean,
    routerReloadKey: {},
    readySearchList: {},
    pushListAndDetailYn: {},
    propParams: {},
    chanAlimYn: {},
    pChannelDetail: {},
    notiScrollTarget: {},
    pUnknownYn: {
      default: false
    },
    pBoardList: Array
  },
  beforeUnmount () {
    this.GE_CHANNEL_DETAIL.boardList = this.pBoardList
    this.$store.dispatch('UB_PRE_DATA/AC_PRE_DETAIL_DATA', this.GE_CHANNEL_DETAIL)
    this.$store.dispatch('UB_PRE_DATA/AC_PRE_LIST_DATA', this.GE_DISP_ALL_LIST)
    this.$store.dispatch('UB_PRE_DATA/AC_PRE_SCROLL_POSITION', { position: this.box.scrollTop, targetKind: 'chanMain', targetKey: this.GE_CHANNEL_DETAIL.teamKey })
  },
  created () {
    this.loadingYn = true
    this.$emit('changePageHeader', '알림')
    if (this.propParams && this.propParams.alimTabType) {
      this.viewMainTab = this.propParams.alimTabType
    }
    if (this.pCabinetKeyListStr) {
      this.mCabinetKeyListStr = this.pCabinetKeyListStr
    }
    this.readyFunction()
  },

  updated () {
    this.box = document.getElementById('pushListWrap')
    if (this.box) {
      this.box.addEventListener('scroll', this.handleScroll)
    }
    this.findPaddingTopPush()
  },
  mounted () {
    this.box = document.getElementById('pushListWrap')
    if (this.box) {
      this.box.addEventListener('scroll', this.handleScroll)
    }
    if (this.viewTab === 'N') {
      this.$refs.activeBar.switchtab(0)
    } else if (this.viewTab === 'R') {
      this.$refs.activeBar.switchtab(1)
    } else if (this.viewTab === 'L') {
      this.$refs.activeBar.switchtab(2)
    } else if (this.viewTab === 'S') {
      this.$refs.activeBar.switchtab(3)
    }
    this.findPaddingTopPush()
    this.settingScrollUpEventListener()
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  watch: {
    pBoardList: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (this.pBoardList && this.pBoardList.length > 0) {
          this.mBoardFilterList = []
          this.mBoardFilterList.push({ display: 'All', name: -1 })
          this.pBoardList.forEach(item => {
            this.mBoardFilterList.push({ display: this.$changeText(item.cabinetNameMtext), name: item.cabinetKey })
          })
        }
      },
      deep: true
    },
    GE_DEL_CONT_LIST: {
      handler (value, old) {
        if (value) {
          this.delContents(value[0])
        }
      },
      deep: true
    },
    pUnknownYn: {
      immediate: true,
      handler (value, old) {
        if (value === true) {
          this.activeTabList = [{ display: '최신', name: 'N' }]
        } else {
          this.activeTabList = [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 만든', name: 'M' }]
        }
      }
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        var content = null
        var index
        var count
        if ((this.viewMainTab === 'P' && value[0].jobkindId === 'BOAR') || (this.viewMainTab === 'B' && value[0].jobkindId === 'ALIM')) return
        index = this.GE_DISP_ALL_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
        if (index !== -1) {
          content = this.GE_DISP_ALL_LIST[index]
          count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
          this.GE_DISP_ALL_LIST[index].memoCount = count
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_ALL_LIST[index])
        }
        if (!content) return

        var memoAleadyIdx1 = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
        if (memoAleadyIdx1 !== -1) {
          content.D_MEMO_LIST[memoAleadyIdx1] = value[0]
          newArr = content.D_MEMO_LIST
        } else {
          newArr = [
            value[0],
            ...content.D_MEMO_LIST
          ]
        }
        var idx1 = this.allContentsList.findIndex((item) => item.contentsKey === content.contentsKey)
        this.allContentsList[idx1].D_MEMO_LIST = this.replaceMemoArr(newArr)
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [this.allContentsList[idx1]])
      },
      deep: true
    },

    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (!value[0] || !value) return
        if (this.chanAlimYn) {
          if (value[0].creTeamKey !== this.pChannelDetail.teamKey) return
        }
        newArr = [
          value[0],
          ...this.GE_DISP_ALL_LIST
        ]
        this.allContentsList = this.replaceArr(newArr)
      },
      deep: true
    },
    GE_RECENT_NOTI_LIST: {
      handler  (value, old) {
        if (this.chanAlimYn) {
          if (Number(value[0].creTeamKey) !== Number(this.pChannelDetail.teamKey)) return
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.myContentsBox[0].addAnimation()
          }, 1500)
        })
      },
      deep: true
    },
    routerReloadKey () {
      this.refreshList()
    },
    pageUpdate (value, old) {
      this.backClick()
    },
    GE_RECENT_CHANGE_TEAM (value, old) {
    },
    GE_MAIN_CHAN_LIST: {
      handler (value, old) {
      },
      deep: true
    }
  },
  computed: {
    GE_FILE_LIST () {
      return this.fileList
    },
    getWindowSizeBottom () {
      return {
        '--widndowHeight': window.innerHeight + 'px'
      }
    },
    GE_DEL_CONT_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_DEL_CONT_LIST']
    },
    GE_PRE_DATA () {
      return this.$store.getters['UB_PRE_DATA/GE_PRE_DATA']
    },
    GE_CHANNEL_DETAIL () {
      if (this.chanAlimYn) {
        var team = this.$getDetail('TEAM', this.pChannelDetail.teamKey)
        return team[0]
      } else return null
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['UB_NOTI/GE_RECENT_NOTI_LIST']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['UB_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_DISP_ALL_LIST () {
      var idx1, idx2
      var returnAllList = []
      var chanDetail = null
      var dataList = null
      if (!this.allContentsList) return []
      var i = 0
      for (i = 0; i < this.allContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.allContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var jobkindId = this.allContentsList[i].jobkindId
          var teamKey = this.allContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then(() => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnAllList.push(this_.allContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              if (jobkindId === 'BOAR' && chanDetail && chanDetail.ELEMENTS && chanDetail.ELEMENTS.boardList) {
                dataList = chanDetail.ELEMENTS.boardList
              } else {
                dataList = []
              }
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.allContentsList[i].contentsKey)
              if (idx2 !== -1) {
                this_.allContentsList[i] = dataList[idx2]
                returnAllList.push(dataList[idx2])
              } else {
                returnAllList.push(this_.allContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          if (chanDetail && chanDetail.ELEMENTS && chanDetail.ELEMENTS.boardList) {
            dataList = chanDetail.ELEMENTS.boardList
          } else {
            dataList = []
          }
          idx2 = dataList.findIndex((item) => item.contentsKey === this.allContentsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.allContentsList[i] = dataList[idx2]
            returnAllList.push(dataList[idx2])
          } else {
            returnAllList.push(this.allContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.allContentsList.length === 0) this.emptyYn = true
      return this.replaceArr(returnAllList)
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['UB_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    currentPage () {
      return this.$store.getters['UB_HISTORY/hCPage']
    }
  },
  methods: {
    hideSkeleton (noWaitYn) {
      if (noWaitYn) {
        this.skeletonShow = false
      } else {
        setTimeout(() => {
          this.skeletonShow = false
        }, 2000)
      }
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    },
    openUnknownLoginPop (contDetail) { // 이 컨텐츠의 정보
      this.mUnknownLoginPopYn = true
    },
    addAnimation () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.myContentsBox[0].addAnimation()
        }, 1500)
      })
    },
    async getFileList (pageSize, offsetInput, nonLoadingYn) {
      const paramMap = new Map()
      if (JSON.stringify(this.findKeyList) !== '{}') {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          paramMap.set('fileName', this.findKeyList.searchKey)
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          paramMap.set('toCreDateStr', this.findKeyList.toCreDateStr)
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          paramMap.set('fromCreDateStr', this.findKeyList.fromCreDateStr)
        } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
          paramMap.set('creUserName', this.findKeyList.creUserName)
        }
      }
      paramMap.set('ownUserKey', this.GE_USER.userKey)
      paramMap.set('creTeamKey', this.GE_CHANNEL_DETAIL.teamKey)
      if (offsetInput) {
        paramMap.set('offsetInt', offsetInput)
      } else {
        paramMap.set('offsetInt', this.offsetInt)
      }
      paramMap.set('pageSize', 10)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMyFileList',
        param: Object.fromEntries(paramMap)
      }, nonLoadingYn)

      return result
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    settingScrollUpEventListener () {
      // contentsList가 빈값이거나 별로 없을 경우 스크롤이 되지 않아 추가하였습니다.
      window.document.addEventListener('touchstart', (e) => {
        this.mScrollStartPoint = e.touches[0].pageY
      })
      window.document.addEventListener('touchend', (e) => {
        this.mScrollEndPoint = e.changedTouches[0].pageY
        if (this.mScrollStartPoint - this.mScrollEndPoint < -100) {
          if (this.box.scrollTop < 10) {
            this.$emit('goScroll')
          }
        } else if (this.mScrollStartPoint > this.mScrollEndPoint) {
        }
      })
      window.document.addEventListener('wheel', (e) => {
        var scrollType = e.deltaY < 0 ? 'down' : 'up'
        if (scrollType === 'down') {
          if (this.box.scrollTop < 10) {
            this.$emit('goScroll')
          }
        }
      })
    },
    async initGetContentsList () {
      var newArr = []
      var result = await this.getPushContentsList(null, null, false)
      if (!result || result === '' || !result.content) {
        this.hideSkeleton(true)
        return
      }
      await this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', result.content)
      if (!this.allContentsList) this.allContentsList = []
      newArr = [
        ...this.allContentsList,
        ...result.content
      ]
      this.allContentsList = this.replaceArr(newArr)
      if (this.targetCKey) {
        this.canLoadYn = true
        this.loadMore(true)
      } else {
        this.loadMoreDESCYn = true
        this.endListSetFunc(result)
      }

      if (result.content.length > 0) {
        this.canLoadYn = true
      }
      this.hideSkeleton(true)
    },
    async readyFunction () {
      this.scrolledYn = false
      if (this.initData) {
        this.allContentsList = this.initData.content
        this.endListYn = false
        this.offsetInt += 1
        this.canLoadYn = true
        this.hideSkeleton(true)
      } else {
        this.hideSkeleton(true)
        this.findPopShowYn = false
        if (this.readySearchList) {
          this.requestSearchList(this.readySearchList)
        }
      }
      this.introPushPageTab()
      this.loadingYn = false
      this.$emit('closeLoading')
    },
    delContents (cont) {
      var idx = null
      if (cont.jobkindId === 'BOAR') {
        idx = this.boardContentsList.findIndex((item) => item.mccKey === cont.mccKey)
        if (idx !== -1) {
          this.boardContentsList.splice(idx, 1)
        }
      } else {
        idx = this.alimContentsList.findIndex((item) => item.mccKey === cont.mccKey)
        if (idx !== -1) {
          this.alimContentsList.splice(idx, 1)
        }
      }
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
        })
        return data
      }, [])
      return uniqueArr
    },
    async getPushContentsList (pageSize, offsetInput, loadingYn) {
      if (this.axiosQueue.findIndex((item) => item === 'getPushContentsList') === -1) {
        this.axiosQueue.push('getPushContentsList')
        var param = {}
        if (this.pChannelDetail !== undefined && this.pChannelDetail !== null && this.pChannelDetail !== '') {
          param.creTeamKey = this.pChannelDetail.teamKey
        }
        if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') {
          param.offsetInt = offsetInput
        } else {
          if (this.initData && this.offsetInt === 0) this.offsetInt = 1
          param.offsetInt = this.offsetInt
        }

        if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = 20 }

        if (this.findKeyList) {
          if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
            param.title = this.findKeyList.searchKey
          } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
            param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
          } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
            param.toCreDateStr = this.findKeyList.toCreDateStr
          } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
            param.fromCreDateStr = this.findKeyList.fromCreDateStr
          } if (this.findKeyList.workStatCodeKey !== undefined && this.findKeyList.workStatCodeKey !== null && this.findKeyList.workStatCodeKey !== '') {
            param.workStatCodeKey = this.findKeyList.workStatCodeKey
          } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
            param.creUserName = this.findKeyList.creUserName
          } if (this.findKeyList.selectedSticker) {
            param.findActStickerYn = true
            param.findActYn = true
            param.stickerKey = this.findKeyList.selectedSticker.stickerKey
          }
        }
        param.findLogReadYn = null
        param.findActLikeYn = false
        param.findActStarYn = false
        param.DESCYn = true

        if (this.viewTab === 'N') {
        } else if (this.viewTab === 'P') {
          param.orderbyStr = 'a.popPoint DESC, a.creDate DESC'
        } else if (this.viewTab === 'S') {
          param.findActYn = true
          param.findActStarYn = true
        } else if (this.viewTab === 'M') {
          param.creUserKey = this.GE_USER.userKey
        }
        if (this.mSelectedCabinetKey !== -1) {
          param.joskindId = 'BOAR'
          param.cabinetKey = this.mSelectedCabinetKey
        }

        var nonLoading = true
        if (loadingYn) {
          nonLoading = false
        }
        const parentYn = this.GE_USER.myTeamKey === parseInt(this.$route.params.encodedTeamKey) ? 1 : 0
        if (parentYn === 1) {
          param.creTeamKey = null
        }
        param.myUserKey = this.GE_USER.userKey
        var resultList = null
        if (this.mCabinetKeyListStr) {
          param.cabinetKeyListStr = this.mCabinetKeyListStr
          var response = this.$getContentsList(param, nonLoading)
          resultList = response
        } else {
          var result = await this.$getContentsList(param, nonLoading)
          resultList = result
        }
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'getPushContentsList')
        this.axiosQueue.splice(queueIndex, 1)
        this.loadingYn = false
        return resultList
      }
    },
    backClick () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
      } else {
        this.previewPopShowYn = false
      }
    },
    findPaddingTopPush () {
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.paddingTop = element.clientHeight + 45
      }
    },
    async refreshAll (propIndex) {
      if (!propIndex) {
        this.$emit('updateContentsCount', 'minus')
      }
      // 새로고침
      this.targetCKey = null
      this.offsetInt = 0
      this.loadMoreDESCYn = true
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.changeTab('A')
    },
    async changeMainTab (tab) {
      this.paddingTop = 45
      this.$showAxiosLoading(true)
      this.$emit('changeMainTab', tab)
      this.canLoadYn = true
      this.viewMainTab = tab
      this.offsetInt = 0
      this.emptyYn = null
      this.targetCKey = null
      this.loadMoreDESCYn = true
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.justChangeTabPosition('N')
      this.$refs.activeBar.switchtab(0)
      if (tab === 'F') {
        this.activeTabList = [{ display: '최신', name: 'N' }]
      } else {
        this.activeTabList = [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 만든', name: 'M' }]
      }
      this.refreshList()
      this.canLoadYn = true
      if (tab === 'F') {
        var result = await this.getFileList(10, 0)
        var resultFileList = result.data.content.filter((item) => {
          return item.contents
        })
        resultFileList = resultFileList.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
        })
        this.fileList = resultFileList
      }
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
      this.mEmptyReloadKey += 1
    },
    getAbsoluteTop (element) {
      return window.scrollY + element.getBoundingClientRect().top
    },
    handleScroll () {
      this.scrollIngYn = true
      var currentTime = new Date()
      var time = currentTime - this.scrollCheckSec
      var element = document.getElementsByClassName('commonListContentBox')[0]
      if (this.box.scrollTop < 10) {
        this.$emit('goScroll')
      }
      if (element) {
        this.firstContOffsetY = this.getAbsoluteTop(element)
        if (this.firstContOffsetY > 0) {
          this.scrollDirection = 'up'
          this.scrolledYn = false
        }
        if (time / 1000 > 1 && this.box.scrollTop !== undefined && this.$diffInt(this.box.scrollTop, this.scrollPosition) > 150) {
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
      }
    },
    async refreshList () {
      var pSize = 20
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pSize = Number(this.offsetInt) * 20
      }
      this.targetCKey = null
      this.loadMoreDESCYn = true
      var resultList = await this.getPushContentsList(pSize, 0, true)
      if (!resultList || resultList === '') return
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      newArr = [
        ...resultList.content
      ]
      this.allContentsList = this.replaceArr(newArr)
      for (let i = 0; i < this.allContentsList.length; i++) {
        cont = this.allContentsList[i]

        tempContentDetail = await this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)

        if (tempContentDetail) {
          contentDetail = tempContentDetail[0]
        } else {
          contentDetail = null
        }
        if (!cont.D_MEMO_LIST) {
          cont.D_MEMO_LIST = cont.memoList
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [cont])
        } else {
          // eslint-disable-next-line no-redeclare
          var newArr = [
            ...contentDetail.D_MEMO_LIST,
            ...cont.memoList
          ]
          var newList2 = this.replaceMemoArr(newArr)
          cont.D_MEMO_LIST = newList2
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [cont])
        }
      }
    },
    endListSetFunc (resultList) {
      if (!this.loadMoreDESCYn) {
        return
      }
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
    },
    async loadMore (descYn) {
      if (!descYn && !this.canUpLoadYn) return
      if (this.canLoadYn && this.endListYn === false) {
        this.loadMoreDESCYn = descYn
        this.canLoadYn = false
        var resultList = []
        var newArr = []
        try {
          if (this.viewMainTab === 'F') {
            resultList = await this.getFileList(null, null, true)
            if (resultList === undefined || resultList === '') {
              return
            }
            var resultFileList = resultList.data.content.filter((item) => {
              return item.contents
            })
            newArr = [
              ...this.GE_FILE_LIST,
              ...resultFileList
            ]
            this.fileList = this.replaceFileArr(newArr)
            await this.endListSetFunc(resultList.data)
          } else {
            resultList = await this.getPushContentsList(null, null, false)
            if (resultList === undefined || resultList === '') {
              return
            }
            this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
            if (descYn) {
              if (!this.GE_DISP_ALL_LIST) this.GE_DISP_ALL_LIST = []
              newArr = [
                ...this.GE_DISP_ALL_LIST,
                ...resultList.content
              ]
              this.allContentsList = this.replaceArr(newArr)
              await this.endListSetFunc(resultList)
            } else {
              if (resultList.content.length < 0) { this.canUpLoadYn = false } else { this.upOffSetInt += 1 }

              if (!this.GE_DISP_ALL_LIST) this.GE_DISP_ALL_LIST = []
              newArr = [
                ...this.GE_DISP_ALL_LIST,
                ...resultList.content
              ]
              this.allContentsList = this.replaceArr(newArr)
            }
            this.contentsList = this.replaceArr(newArr)
            this.$emit('numberOfElements', resultList.totalElements)
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.canLoadYn = true
        }
      }
    },
    closeSearchPop () {
      this.findPopShowYn = false
    },
    openPop (value) {
      if (value.targetType === 'contentsDetail') {
        const param = {}
        param.targetKey = value.targetKey
        param.contentsKey = value.targetKey
        param.memoScrollYn = true
        param.teamKey = value.creTeamKey
        param.creTeamKey = value.creTeamKey
        param.jobkindId = value.jobkindId
        if (param.jobkindId === 'BOAR') {
          param.cabinetKey = value.cabinetKey
        }
        param.targetType = 'contDetail'
        this.$emit('openPage', param)
      } else if (value.targetType === 'chanDetail') {
        this.$emit('openPage', value)
      } else if (value.targetType === 'writeContents') {
        this.$emit('openPop', value)
      }
    },
    replaceArr (arr) {
      var this_ = this
      if (!arr || arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
          data.push(current)
        }
        if (this_.viewTab === 'P') {
          data = data.sort(function (a, b) { // num으로 오름차순 정렬
            return b.popPoint - a.popPoint
          })
        } else {
          data = data.sort(function (a, b) { // num으로 오름차순 정렬
            return b.contentsKey - a.contentsKey
          })
        }
        return data
      }, [])
      return uniqueArr
    },
    replaceFileArr (arr) {
      if (!arr || arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.fileKey) === Number(current.fileKey)) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
        })
        return data
      }, [])
      return uniqueArr
    },
    justChangeTabPosition (tabName) {
      this.targetCKey = null
      this.offsetInt = 0
      this.viewTab = tabName
    },
    changeBoard (cabinetKey) {
      this.mSelectedCabinetKey = cabinetKey
      this.changeTab(this.viewTab)
    },
    async changeTab (tabName) {
      this.emptyYn = null
      this.targetCKey = null
      this.offsetInt = 0
      this.viewTab = tabName
      var resultList = await this.getPushContentsList(null, 0, true)
      var contentList = []
      if (resultList && resultList.content) {
        contentList = resultList.content
      }
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail

      newArr = [
        ...contentList
      ]
      this.allContentsList = this.replaceArr(newArr)
      for (let i = 0; i < this.allContentsList.length; i++) {
        cont = this.allContentsList[i]
        tempContentDetail = []
        tempContentDetail = this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)
        if (tempContentDetail) {
          contentDetail = tempContentDetail[0]
        } else {
          contentDetail = null
        }

        if (!cont.D_MEMO_LIST) {
          cont.D_MEMO_LIST = cont.memoList
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [cont])
        } else {
          // eslint-disable-next-line no-redeclare
          var test = contentDetail.D_MEMO_LIST
          if (!test) {
            if (!contentDetail) {
              test = []
            } else {
              test = contentDetail.memoList
            }
          }
          // eslint-disable-next-line no-redeclare
          var newArr = [
            ...test,
            ...cont.memoList
          ]
          // eslint-disable-next-line no-redeclare
          var newList = this.replaceMemoArr(newArr)
          cont.D_MEMO_LIST = newList
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [cont])
        }
      }
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', contentList)
      this.endListSetFunc(resultList)
      this.findPopShowYn = false
      this.introPushPageTab()
      this.scrollMove()
    },
    scrollMove (wich) {
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      if (wich === undefined || wich === null || wich === '') { wich = 0 }
      ScrollWrap.scrollTo({ top: wich - 90, behavior: 'smooth' })
    },

    /* 검색 */
    async requestSearchList (param) {
      this.offsetInt = 0
      this.targetCKey = null
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
          this.findKeyList.creUserName = param.creUserName
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        } if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
          this.findKeyList.workStatCodeKey = param.workStatCodeKey
          this.findKeyList.codeNameMtext = param.codeNameMtext
        } if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
          this.findKeyList.selectedSticker = param.selectedSticker
        }
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      this.findPaddingTopPush()
      if (this.viewMainTab === 'F') {
        var result = await this.getFileList(null, null)
        var resultFileList = result.data.content.filter((item) => {
          return item.contents
        })
        resultFileList = resultFileList.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        this.fileList = resultFileList
        this.endListSetFunc(result.data)
      } else {
        var resultList = await this.getPushContentsList(20, 0, true)
      }
      if (resultList === '') {
        this.allContentsList = []
      } else {
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        var newArr = []
        newArr = [
          // ...this.boardContentsList,
          ...resultList.content
        ]
        this.allContentsList = this.replaceArr(newArr)
        this.endListSetFunc(resultList)
      }
      this.scrollMove()
      this.findPopShowYn = false
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = this.$t('CHAN_POST_TITLE')
        searchObj.type = 'searchKey'
        searchObj.keyword = param.searchKey
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
        searchObj.typeName = this.$t('CHAN_POST_CRE_USER')
        searchObj.type = 'creUserName'
        searchObj.keyword = param.creUserName
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
        searchObj.typeName = this.$t('CHAN_POST_SENT')
        searchObj.type = 'creTeamNameMtext'
        searchObj.keyword = param.creTeamNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = this.$t('CHAN_POST_DATE')
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.workStatCodeKey !== undefined && param.workStatCodeKey !== null && param.workStatCodeKey !== '') {
        searchObj.typeName = this.$t('CHAN_POST_FILTER')
        searchObj.type = 'workStatCodeKey'
        searchObj.keyword = param.codeNameMtext
        resultArray.push(searchObj)
      }
      searchObj = {}
      if (param.selectedSticker !== undefined && param.selectedSticker !== null && param.selectedSticker !== '') {
        searchObj.typeName = this.$t('CHAN_POST_STAT')
        searchObj.type = 'stickerKey'
        searchObj.keyword = this.$changeText(param.selectedSticker.nameMtext)
        resultArray.push(searchObj)
      }
      this.findPopShowYn = false
      return resultArray
    },
    async changeSearchList (type) {
      this.offsetInt = 0
      this.targetCKey = null
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      } else if (type === 'workStatCodeKey') {
        delete this.findKeyList.workStatCodeKey
      } else if (type === 'creUserName') {
        delete this.findKeyList.creUserName
      } else if (type === 'stickerKey') {
        delete this.findKeyList.selectedSticker
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      var pageSize = 20
      if (this.resultSearchKeyList.length === 0) {
        this.paddingTop = 45
      }
      if (this.viewMainTab === 'F') {
        var result = await this.getFileList(null, null)
        var resultFileList = result.data.content.filter((item) => {
          return item.contents
        })
        resultFileList = resultFileList.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
        })
        this.fileList = resultFileList
        this.endListSetFunc(result.data)
      } else {
        var resultList = await this.getPushContentsList(pageSize, this.offsetInt, true)
      }
      if (resultList === '') {
        this.allContentsList = []
      } else {
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        var newArr = []

        newArr = [
          ...resultList.content
        ]
        this.allContentsList = this.replaceArr(newArr)
        this.endListSetFunc(resultList)
      }
      this.scrollMove()
    }
  },
  data () {
    return {
      mSelectedTab: 'P', // P: Popular 인기, R : Recent 최근, S: Saved 저장된, M: My 내가 쓴
      mChannelFilterList: { // 채널이 바뀜에 따라 매번 달라지는 필터
        valiYn: true,
        inputType: this.$JOConst.VALUE_TAG_TYPE_SELECT,
        targetName: 'chanFilter',
        val: 'P',
        valiBase: [{ type: this.$JOConst.VALI_CHECK_TYPE_NOT_NULL, baseVal: null }],
        selectValueList: [{ title: 'Popular', value: 'P', onclickCallBack: this.changeTab }, { title: 'Recent', value: 'R', onclickCallBack: this.changeTab }, { title: 'Saved', value: 'S', onclickCallBack: this.changeTab }, { title: 'My', value: 'M', onclickCallBack: this.changeTab }]
      },
      mCommonFilterList: [{ display: 'Recent', name: 'N' }, { display: 'Popular', name: 'P' }, { display: 'Saved', name: 'S' }, { display: 'My', name: 'M' }],
      mUnknownLoginPopYn: false,
      mEmptyReloadKey: 0,
      allContentsList: null,
      alimContentsList: null,
      boardContentsList: null,
      paddingTop: 45,
      imgUrl: '',
      firstContOffsetY: null,
      scrollDirection: null,
      box: null,
      scrolledYn: false,
      offsetInt: 0,
      endListYn: false,
      scrollPosition: 0,
      findPopShowYn: false,
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 만든', name: 'M' }],
      viewTab: 'N',
      viewMainTab: 'A',
      findKeyList: {},
      resultSearchKeyList: [],
      scrollCheckSec: 0,
      currentTabName: '최신',
      emptyYn: null,
      loadMoreDESCYn: null,
      targetCKey: null,
      failPopYn: false,
      errorText: '',
      previewPopShowYn: false,
      alertPopId: null,
      loadingYn: false,
      canLoadYn: false,
      confirmText: '',
      axiosQueue: [],
      canUpLoadYn: false,
      upOffSetInt: 0,
      mScrollStartPoint: 0,
      mScrollEndPoint: 0,
      mSelectedCabinetKey: -1,
      fileList: [],
      mCabinetKeyListStr: '',
      skeletonShow: true
    }
  }
}
</script>
<style scoped>
.pushListArea {
  width: 100%;
  height: calc(100vh - 50px);
  padding-top: 0;
  position: relative;
  overflow: hidden scroll;
  float: left;
  padding-bottom: 60px;
}
#loading {
  display: block;
  z-index: 999999;
}
.popBg {
  width:100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #00000050;
}
.popHeight{
  margin-top: 150px;
  height: calc(100% - 150px);
}
.mainTabStyle {
  border-radius: 10px;
  min-width: 80px;
  float: left;
  border-bottom: none;
  background: #FFF;
  padding: 5px 10px;
  margin-left: 10px;
}
.mainTabActive {
  border-bottom: none;
  background: #F1F1FF !important;
}
.pushListHeader {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 50px;
    position: absolute;
    /* background-color: #FFF; */
    top: 0;
    left: 0;
    will-change: transform;
    transition: transform 0.3s linear;
    z-index: 2;
    min-height: 50px;
    display: flex;
    align-items: start;
}
.pushListHeader--pinned {
    transform: translateY(0%);
}
.pushListHeader--unpinned {
    transform: translateY(calc(-100% - 2px));
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
.fixed {
  position: fixed !important;
}
.selectFilter {
  width:calc(100% - 30px) !important;
  padding-top: 0 !important;
  margin-top: 0 !important;
}
.reloadImgWrap {
  background-color: #fff;
  height: 50px;
  display: flex;
  align-items: center;
  padding-right: 10px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reloadImgWrap > img {
  width: 30px;
  height: 30px;
}
#pushListWrap {
  position: relative;
  float: left;
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
  /* -webkit-overflow-scrolling: touch; */
}
.memoPop {
  z-index: 999999 !important;
  height: fit-content !important;
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
.back{
  background: #dcddeb !important;
}
.pushListMemoBoxBackground{
  width: 100% !important;
  height: 100% !important;
  background: #00000036 !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 999999 !important;
}
.pushListWrapWrap {
  overflow: hidden;
}
</style>
