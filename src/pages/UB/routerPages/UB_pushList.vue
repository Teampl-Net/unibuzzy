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
    <div v-if="GE_USER.unknownYn && mUnknownLoginPopYn" style="width:100%; height: 100%; position: fixed;top: 0; left: 0; z-index: 100; background: #00000050;"></div>
    <unknownLoginPop :pClosePop="closeUnknownLoginPop" style="position: fixed;" v-if="GE_USER.unknownYn && mUnknownLoginPopYn" />
    <statCodeComponent @closeXPop="this.workStateCodePopShowYn = false" :currentWorker="{workUserKey: workStateCodePopProps.workUserKey, workUserName: workStateCodePopProps.workUserName}" :teamKey="workStateCodePopProps.creTeamKey" :alimDetail="workStateCodePopProps" :contentsKey="workStateCodePopProps.contentsKey" v-if="workStateCodePopShowYn" :codeList="workStateCodePopProps.workStatCodeList" :currentCodeKey="workStateCodePopProps.workStatCodeKey" class="fr "></statCodeComponent>
    <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:999999"><div class="spinner"></div></div>

    <div style="width: 100%; height: calc(100vh - 50px); padding-top: 0; position: relative; overflow: hidden scroll; float: left; z-index: 2;" >
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <div id="pageHeader" ref="pushListHeader" style="min-height:50px; display:flex; align-items:start; " class="pushListHeader"  :class="this.scrolledYn? 'pushListHeader--unpinned': 'pushListHeader--pinned'" v-on="handleScroll" >
        <gSelectFilter :searchYn='true' @changeSearchList="changeSearchList" :subTabList="mBoardFilterList" @openFindPop="findPopShowYn = true " :resultSearchKeyList="resultSearchKeyList" ref="activeBar" :tabList="mCommonFilterList" class="fl" @changeTab="changeTab" @changeBoardTab="changeBoard" style="width:calc(100% - 30px); padding-top: 0; margin-top: 0;" />
        <div v-on="handleScroll" style="background-color:#fff; height:50px; display:flex; align-items:center; padding-right:10px; width: 30px; display: flex; align-items: center; justify-content: center; " @click="refreshAll">
            <img src="../../../assets/images/common/commonReload.png" class="cursorP" width="30" height="30" @click="refreshAll"/>
        </div>
      </div>
      <transition name="showModal">
        <findContentsList :tpGroupCode="this.viewMainTab === 'B' || this.viewMainTab === 'A'? 'C_STAT' : ''" :contentsListTargetType="viewMainiTab === 'F'? 'fileBox':this.chanAlimTargetType" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" :pClosePop="closeSearchPop" :teamKey='this.pChannelDetail.teamKey'/>
      </transition>

        <div id="pushListWrap" class="scrollHidden " ref="pushListWrapWrapCompo" :style="'padding: 0 1rem ; padding-top: calc(' + paddingTop + 'px + 1rem);'" style="position: relative; float: left; width: 100%; height: calc(100%); padding-bottom: 60px;  -webkit-overflow-scrolling: touch">
          <!-- 스크롤 시 첫번째 로우의 위치를 확인하기 위해 넣은 태그입니다. ( 스크롤 시 헤더 숨기게 ) -->
          <div class="w100P fl commonListContentBox" style="height:1px;" />
          <template  v-for="(cont, index) in this.GE_DISP_BOAR_LIST" :key="index">
            <gContentsBox @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-if="this.viewMainTab === 'B'" @fileDownload="fileDownload"/>
          </template>
          <template v-if="!GE_DISP_BOAR_LIST && viewMainTab === 'B'">
            <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
          </template>
          <gEmpty :tabName="currentTabName" contentName="게시판" v-else-if="GE_DISP_BOAR_LIST && this.viewMainTab === 'B' && GE_DISP_BOAR_LIST.length === 0 && this.emptyYn" :key="mEmptyReloadKey" class="mtop-2"/>

          <template  v-for="(cont, index) in this.GE_DISP_ALIM_LIST" :key="index">
            <gContentsBox @openImgPop="openImgPop" :here="here" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-if="this.viewMainTab === 'P'" @fileDownload="fileDownload"/>
          </template>
          <template v-if="!GE_DISP_ALIM_LIST && viewMainTab === 'P'">
            <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
          </template>
          <gEmpty :tabName="currentTabName" contentName="알림" v-else-if="GE_DISP_ALIM_LIST && this.viewMainTab === 'P' && GE_DISP_ALIM_LIST.length === 0 && this.emptyYn" :key="mEmptyReloadKey" class="mtop-2"/>

          <template v-for="(cont, index) in this.GE_DISP_ALL_LIST" :key="index">
            <gContentsBox :pOpenUnknownLoginPop="openUnknownLoginPop" @contDelete="refreshAll" :index="index" :contentsIndex="index" @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-if="this.viewMainTab === 'A'" @fileDownload="fileDownload"/>
            <myObserver v-if="index === this.GE_DISP_ALL_LIST.length - 5" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
          </template>

          <template v-if="viewMainTab === 'A'">
            <template v-if="skeletonShow">
              <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
            </template>
            <gEmpty v-else-if="GE_DISP_ALL_LIST && this.viewMainTab === 'A' && GE_DISP_ALL_LIST.length === 0 && !skeletonShow" :tabName="currentTabName" contentName="전체" :key="mEmptyReloadKey" class="mtop-2"/>
          </template>

          <template  v-for="(cont, index) in this.GE_FILE_LIST" :key="index">
              <gFileBox @openImgPop="openImgPop" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-if="this.viewMainTab === 'F'"/>
              <myObserver v-if="index === this.GE_FILE_LIST.length - 1" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
          </template>
          <gEmpty :tabName="currentTabName" contentName="파일함" v-if="this.viewMainTab === 'F' && GE_FILE_LIST.length === 0" :key="mEmptyReloadKey" class="mtop-2"/>
        </div>
        <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="selectBoardPopShowYn" :boardDetail="boardDetailValue" />
        <div v-if="memoShowYn === true" class="pushListMemoBoxBackground" @click="memoPopNo()"></div>
        <transition name="showMemoPop">
          <gMemoPop ref="gMemoRef" :resetMemoYn="resetMemoYn" transition="showMemoPop" :style="getWindowSizeBottom" v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' style="z-index:999999; height: fit-content;" :writeMemoTempData='tempMemoData'/>
        </transition>
    </div>

    <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false' />
</div>
</template>
<script>
import SkeletonBox from '../../../components/pageComponents/push/D_contentsSkeleton'
import commonConfirmPop from '../../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import findContentsList from '../../../components/popup/common/D_findContentsList.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import statCodeComponent from '../../../components/board/D_manageStateCodePop.vue'
import unknownLoginPop from '@/components/pageComponents/channel/D_unknownLoginPop.vue'
export default {
  name: 'pushList',
  components: {
    SkeletonBox,
    findContentsList,
    commonConfirmPop,
    statCodeComponent,
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
    targetContents: {},
    chanAlimYn: {},
    pChannelDetail: {},
    notiScrollTarget: {},
    pUnknownYn: {
      default: false
    },
    pBoardList: Array
    // reloadKey: 0
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
    /*  } */
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
    // mCommonFilterList: {
    //   immediate: true,
    //   handler (val) {
    //     if (!val) return
    //     if (val.val !== 'P') {
    //       this.mSearchCondition.step = val.val
    //     }
    //   },
    //   deep: true
    // },
    GE_DISP_ALIM_LIST: {
      handler (value, old) {
        console.log('===================== watch ======================')
        console.log(value)
      }
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
        if (this.viewMainTab === 'P') {
          index = this.GE_DISP_ALIM_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
          if (index !== -1) {
            content = this.GE_DISP_ALIM_LIST[index]
            count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
            this.GE_DISP_ALIM_LIST[index].memoCount = count
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_ALIM_LIST[index])
          }
        } else if (this.viewMainTab === 'B') {
          index = this.GE_DISP_BOAR_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
          if (index !== -1) {
            content = this.GE_DISP_BOAR_LIST[index]
            count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
            this.GE_DISP_BOAR_LIST[index].memoCount = count
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_BOAR_LIST[index])
          }
        } else if (this.viewMainTab === 'A') {
          index = this.GE_DISP_BOAR_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
          if (index !== -1) {
            content = this.GE_DISP_BOAR_LIST[index]
            count = await this.$getMemoCount({ targetKey: content.contentsKey, allMemoYn: true })
            this.GE_DISP_BOAR_LIST[index].memoCount = count
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_BOAR_LIST[index])
          }
        }
        if (!content) return

        if (content.jobkindId === 'ALIM') {
          var memoAleadyIdx = content.D_MEMO_LIST.findIndex((item) => Number(item.memoKey) === Number(value[0].memoKey))
          if (memoAleadyIdx !== -1) {
            content.D_MEMO_LIST[memoAleadyIdx] = value[0]
            newArr = content.D_MEMO_LIST
          } else {
            newArr = [
              value[0],
              ...content.D_MEMO_LIST
            ]
          }
          var idx = this.alimContentsList.findIndex((item) => item.contentsKey === content.contentsKey)
          this.alimContentsList[idx].D_MEMO_LIST = this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.alimContentsList[idx]])
        } else {
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
          var idx1 = this.boardContentsList.findIndex((item) => item.contentsKey === content.contentsKey)
          this.boardContentsList[idx1].D_MEMO_LIST = this.replaceMemoArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.boardContentsList[idx]])
          // this.yesLoadMore(this.boardContentsList[idx].contentsKey)
        }
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
        // 채널 메인이 아닌 팝업으로 띄웠을 때 pChannelDetail에 teamKey가 없습니다. 없는게 맞구요!!
        // if (value[0].creTeamKey === this.pChannelDetail.teamKey) {
        if (this.viewMainTab === 'P') {
          if (value[0].jobkindId !== 'ALIM') return
          newArr = [
            value[0],
            ...this.GE_DISP_ALIM_LIST
          ]
          this.alimContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'B') {
          if (value[0].jobkindId !== 'BOAR') return
          newArr = [
            value[0],
            ...this.GE_DISP_BOAR_LIST
          ]
          this.boardContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'A') {
          newArr = [
            value[0],
            ...this.GE_DISP_ALL_LIST
          ]
          this.allContentsList = this.replaceArr(newArr)
        }
        // }
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
      return this.$store.getters['D_CHANNEL/GE_DEL_CONT_LIST']
    },
    GE_CHANNEL_DETAIL () {
      if (this.chanAlimYn) {
        var team = this.$getDetail('TEAM', this.pChannelDetail.teamKey)
        return team[0]
      } else return null
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['D_NOTI/GE_RECENT_NOTI_LIST']
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_DISP_ALIM_LIST () {
      var idx1, idx2
      var returnAlimList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      if (!this.alimContentsList) return null
      if (!this.computedYn) return
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.computedYn = false
      for (i = 0; i < this.alimContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.alimContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var teamKey = this.alimContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then((res) => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnAlimList.push(this_.alimContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              dataList = chanDetail.ELEMENTS.alimList
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.alimContentsList[i].contentsKey)
              if (idx2 !== -1) {
                this.alimContentsList[i] = dataList[idx2]
                returnAlimList.push(dataList[idx2])
              } else {
                returnAlimList.push(this_.alimContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.contentsKey === this.alimContentsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.alimContentsList[i] = dataList[idx2]
            returnAlimList.push(dataList[idx2])
          } else {
            returnAlimList.push(this.alimContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.computedYn = true
      return this.replaceArr(returnAlimList)
    },
    GE_DISP_BOAR_LIST () {
      var idx1, idx2
      var returnBoardList = []
      var chanDetail = null
      var dataList = null
      if (!this.boardContentsList) return null
      var i = 0
      for (i = 0; i < this.boardContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.boardContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var teamKey = this.boardContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then(() => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnBoardList.push(this_.boardContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              dataList = chanDetail.ELEMENTS.boardList
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.boardContentsList[i].contentsKey)
              if (idx2 !== -1) {
                this.boardContentsList[i] = dataList[idx2]
                returnBoardList.push(dataList[idx2])
              } else {
                returnBoardList.push(this_.boardContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.boardList
          idx2 = dataList.findIndex((item) => item.contentsKey === this.boardContentsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.boardContentsList[i] = dataList[idx2]
            returnBoardList.push(dataList[idx2])
          } else {
            returnBoardList.push(this.boardContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.boardContentsList.length === 0) this.emptyYn = true

      return this.replaceArr(returnBoardList)
    },
    GE_DISP_ALL_LIST () {
      // const parentYn = this.GE_USER.myTeamKey === parseInt(this.$route.params.encodedTeamKey) ? 1 : 0
      // if (parentYn === 1) {
      //   return this.replaceArr(this.allContentsList)
      // }
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
              if (jobkindId === 'BOAR') {
                dataList = chanDetail.ELEMENTS.boardList
              }
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.allContentsList[i].contentsKey)
              if (idx2 !== -1) {
                this.allContentsList[i] = dataList[idx2]
                returnAllList.push(dataList[idx2])
              } else {
                returnAllList.push(this_.allContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          if (this.allContentsList[i].jobkindId === 'BOAR') {
            dataList = chanDetail.ELEMENTS.boardList
          }
          idx2 = dataList.findIndex((item) => item.contentsKey === this.allContentsList[i].contentsKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
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
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    currentPage () {
      return this.$store.getters['D_HISTORY/hCPage']
    }
  },
  methods: {
    hideSkeleton () {
      setTimeout(() => {
        this.skeletonShow = false
      }, 2000)
    },
    closeUnknownLoginPop () {
      this.mUnknownLoginPopYn = false
    },
    openUnknownLoginPop (contDetail) { // 이 컨텐츠의 정보
      this.mUnknownLoginPopYn = true
      // this.mUnknownContDetail = contDetail
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
          // console.log(this.box.scrollTop)
          if (this.box.scrollTop < 10) {
            this.$emit('goScroll')
          }
        }
      })
    },
    async initGetContentsList () {
      var newArr = []
      // var contListEle
      // var tempContentDetail
      // var vuexContentsDetail

      // var this_ = this
      var result = await this.getPushContentsList(null, null, false)
      if (!result || result === '' || !result.content) {
        this.hideSkeleton()
        return
      }
      await this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.content)
      if (this.viewMainTab === 'P') {
        if (!this.alimContentsList) this.alimContentsList = []
        newArr = [
          ...this.alimContentsList,
          ...result.content
        ]
        this.alimContentsList = this.replaceArr(newArr)
      } else if (this.viewMainTab === 'B') {
        if (!this.boardContentsList) this.boardContentsList = []
        newArr = [
          ...this.boardContentsList,
          ...result.content
        ]
        this.boardContentsList = this.replaceArr(newArr)
      } else if (this.viewMainTab === 'A') {
        if (!this.allContentsList) this.allContentsList = []
        newArr = [
          ...this.allContentsList,
          ...result.content
        ]
        // eslint-disable-next-line no-debugger
        debugger
        this.allContentsList = this.replaceArr(newArr)
      }
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
      this.hideSkeleton()
      // this.updateStoreData(uniqueArr)
    },
    async readyFunction () {
      this.scrolledYn = false
      // this.$showAxiosLoading(true)
      console.log('뭐지?')
      console.log(this.initData)
      if (this.initData) {
        this.allContentsList = this.initData.content
        this.endListYn = false
        this.offsetInt += 1
        this.canLoadYn = true
        this.hideSkeleton()
      } else {
        if (this.targetContents !== undefined && this.targetContents !== null && this.targetContents !== '') {
          if (this.targetContents.jobkindId === 'BOAR') {
            this.viewMainTab = 'B'
            this.$emit('changeMainTab', this.viewMainTab)
          }
          this.targetCKey = this.targetContents.targetContentsKey
          if (this.targetCKey) {
            var contentsAlreadyYn = await this.$addContents(this.targetCKey, this.targetContents.jobkindId)
            if (contentsAlreadyYn === false) {
              this.errorText = 'This content has been deleted or you do not have permission to\nread it\nPlease try again later.'
              this.failPopYn = true
              return
            }
          }
        }

        await this.initGetContentsList()
        this.findPopShowYn = false
        if (this.readySearchList) {
          this.requestSearchList(this.readySearchList)
        }
      }
      this.introPushPageTab()
      this.loadingYn = false
      this.$emit('closeLoading')
    },
    memoPopNo () {
      this.memoShowYn = false
      this.tempMemoData = this.$refs.gMemoRef.getMemoData()
      // document.body.focus()
    },
    clearMemo () {
      this.tempMemoData = undefined
    },
    memoEdit (editYn) {
      this.$emit('memoEdit', editYn)
    },
    cMemoEditYn (editYn) {
      this.$emit('cMemoEditYn', editYn)
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
    async targetKeyYn (targetKey, jobkindId) {
      var detail = await this.$getContentsOnly({ contentsKey: targetKey, jobkindId: jobkindId })
      // eslint-disable-next-line no-debugger
      debugger
      if (detail.contentsList.length === 0) {
        this.errorText = 'This content has been deleted or you do not have permission to\nread it\nPlease try again later.'
        this.targetCKey = null
        this.failPopYn = true
        this.canLoadYn = true
        this.loadMore()
        var index = null
        if (jobkindId === 'ALIM') {
          index = this.alimContentsList.findIndex((item) => item.contentsKey === targetKey)
          if (index !== -1) {
            this.alimContentsList.splice(index, 1)
          }
        } else {
          index = this.boardContentsList.findIndex((item) => item.contentsKey === targetKey)
          if (index !== -1) {
            this.boardContentsList.splice(index, 1)
          }
        }
        return false
      }
      var this_ = this
      this.loadMoreDESCYn = false
      await this_.getPushContentsList(null, null, false).then(response => {
        if (!response || !response.content) return
        this_.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', response.content)
        var newArr = []
        var cont
        var tempContentDetail
        var contentDetail

        if (this_.viewMainTab === 'P') {
          if (!this_.allContentsList) this_.allContentsList = []
          newArr = [
            ...this_.alimContentsList,
            ...response.content
          ]
          this_.alimContentsList = this.replaceArr(newArr)
          for (let i = 0; i < this_.alimContentsList.length; i++) {
            cont = this_.alimContentsList[i]
            tempContentDetail = this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)
            if (tempContentDetail) {
              contentDetail = tempContentDetail[0]
            } else {
              contentDetail = null
            }
            if (!cont.D_MEMO_LIST) {
              cont.D_MEMO_LIST = cont.memoList
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
            } else {
              // eslint-disable-next-line no-redeclare
              var newArr = [
                ...contentDetail.D_MEMO_LIST,
                ...cont.memoList
              ]
              var newList = this.replaceMemoArr(newArr)
              cont.D_MEMO_LIST = newList
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
            }
          }
        } else {
          if (!this_.boardContentsList) this_.boardContentsList = []
          newArr = [
            ...this_.boardContentsList,
            ...response.content
          ]
          this_.boardContentsList = this.replaceArr(newArr)
          for (let i = 0; i < this_.boardContentsList.length; i++) {
            cont = this_.boardContentsList[i]
            tempContentDetail = []
            tempContentDetail = this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)
            if (tempContentDetail) {
              contentDetail = tempContentDetail[0]
            } else {
              contentDetail = null
            }

            if (!cont.D_MEMO_LIST) {
              cont.D_MEMO_LIST = cont.memoList
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
            } else {
              // eslint-disable-next-line no-redeclare
              var newArr = [
                ...contentDetail.D_MEMO_LIST,
                ...cont.memoList
              ]
              // eslint-disable-next-line no-redeclare
              var newList = this.replaceMemoArr(newArr)
              cont.D_MEMO_LIST = newList
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
            }
          }
        }
        // this.updateStoreData(uniqueArr)
        this_.findPopShowYn = false
        if (this_.readySearchList) {
          this_.requestSearchList(this_.readySearchList)
        }
        this_.introPushPageTab()
        if (this_.targetCKey) {
          this_.getMCabContYn(this_.targetCKey).then(Response => { // 수정해야함꼭!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!20220908수민
            /* if (Response !== true) {
          this.errorText = '해당 컨텐츠를 열람할 수 있는 권한이 없습니다'
          this.failPopYn = true
          this.targetCKey = null
        } */
          })
          this_.canLoadYn = true
          this_.loadMore(true)
        } else {
          this_.endListSetFunc(response)
        }
        this_.scrolledYn = false
        if (newArr.length > 0) {
          this_.canLoadYn = true
        }
        this_.loadingYn = false

        var queueIndex = this_.axiosQueue.findIndex((item) => item === 'saveMemberButton')
        this_.axiosQueue = this_.axiosQueue.splice(queueIndex, 1)
        /* this_.$refs.pushListChangeTabLoadingComp.contentsWich(targetKey) */
      })
      return true
    },
    async yesLoadMore (contentKey) {
      var cont, idx
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.contentsKey === contentKey)
        if (idx !== -1) cont = this.alimContentsList[idx]
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.contentsKey === contentKey)
        if (idx !== -1) cont = this.boardContentsList[idx]
      } else if (this.viewMainTab === 'A') {
        idx = this.allContentsList.findIndex(i => i.contentsKey === contentKey)
        if (idx !== -1) cont = this.allContentsList[idx]
      }
      var response = await this.getContentsMemoList(contentKey, cont.D_MEMO_LIST.length + 5, 0)
      var newArr = [
        ...cont.D_MEMO_LIST,
        ...response
      ]
      var newList = await this.replaceMemoArr(newArr)

      cont.D_MEMO_LIST = newList

      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    writeMememo (memo) {
      // eslint-disable-next-line no-debugger
      debugger
      if (!this.mememoValue) {
        this.resetMemoYn = true
      } else {
        if (this.mememoValue.memo.memoKey !== memo.memo.memoKey) {
          this.resetMemoYn = true
        } else {
          this.resetMemoYn = false
        }
      }
      this.mememoValue = {}
      this.currentContentsKey = memo.memo.targetKey
      this.mememoValue = memo
      this.memoShowYn = true
    },
    async deleteMemo (param) {
      if (this.axiosQueue.findIndex((item) => item === 'deleteMemo') !== -1) return
      var memo = {}
      memo.memoKey = param.memoKey
      this.axiosQueue.push('deleteMemo')

      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.deleteMemo',
          param: memo
        })
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'deleteMemo')
        this.axiosQueue.splice(queueIndex, 1)
        var index
        if (result.data.result === true) {
          // var cont = this.currentMemoObj
          var idx, cont
          if (this.viewMainTab === 'P') {
            idx = this.alimContentsList.findIndex(i => i.contentsKey === this.tempData.targetKey)
            if (idx !== -1) cont = this.alimContentsList[idx]
          } else if (this.viewMainTab === 'B') {
            idx = this.boardContentsList.findIndex(i => i.contentsKey === this.tempData.targetKey)
            if (idx !== -1) cont = this.boardContentsList[idx]
          } else if (this.viewMainTab === 'A') {
            idx = this.allContentsList.findIndex(i => i.contentsKey === this.tempData.targetKey)
            if (idx !== -1) cont = this.allContentsList[idx]
          }
          index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === param.memoKey)
          var cmemoListIdx
          if (param.parentMemoKey) {
            for (let i = 0; i < cont.D_MEMO_LIST.length; i++) {
              if (cont.D_MEMO_LIST[i].cmemoList.length > 0) {
                index = cont.D_MEMO_LIST[i].cmemoList.findIndex(i => i.memoKey === param.memoKey)
                if (index !== -1) {
                  cmemoListIdx = i
                  break
                }
              }
            }
            // cont.D_MEMO_LIST[cmemoListIdx].cmemoList.splice(index, 1)
            // if (cmemoListIdx !== -1) cont.D_MEMO_LIST[cmemoListIdx].cmemoList.splice(index, 1)
            if (this.viewMainTab === 'P') {
              if (cmemoListIdx !== -1) this.alimContentsList[idx].D_MEMO_LIST.cmemoList.splice(index, 1)
            } else if (this.viewMainTab === 'B') {
              if (cmemoListIdx !== -1) this.boardContentsList[idx].D_MEMO_LIST.cmemoList.splice(index, 1)
            } else if (this.viewMainTab === 'A') {
              if (cmemoListIdx !== -1) this.allContentsList[idx].D_MEMO_LIST.cmemoList.splice(index, 1)
            }
          } else {
            // cont.D_MEMO_LIST.splice(index, 1)
            if (this.viewMainTab === 'P') {
              this.alimContentsList[idx].D_MEMO_LIST.splice(index, 1)
              cont.D_MEMO_LIST = this.alimContentsList[idx].D_MEMO_LIST
            } else if (this.viewMainTab === 'B') {
              this.boardContentsList[idx].D_MEMO_LIST.splice(index, 1)
              cont.D_MEMO_LIST = this.boardContentsList[idx].D_MEMO_LIST
            } else if (this.viewMainTab === 'A') {
              this.allContentsList[idx].D_MEMO_LIST.splice(index, 1)
              cont.D_MEMO_LIST = this.allContentsList[idx].D_MEMO_LIST
            }
          }
          cont.memoCount -= 1
          this.$store.dispatch('D_CHANNEL/AC_DEL_MEMO_REPLACE_CONTENT', [cont])
          // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        }
        this.$showToastPop(this.$t('COMMON_MSG_DELETED_COMMENT'))
      } catch (error) {
        this.$showToastPop(this.$t('COMMON_MSG_FAILED'))
      }
    },
    confirmOk () {
      this.confirmType = 'timeout'
      if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey, contentsKey: this.tempData.targetKey, parentMemoKey: this.tempData.parentMemoKey })
      }
      this.currentConfirmType = ''
      this.confirmPopShowYn = false
    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        this.tempData = data
      }

      if (data === 'memo' || this.tempData.memoKey) {
        this.confirmText = this.$t('COMMON_MSG_DELETE_COMMENT')
        if (this.tempData.parentMemoKey) {
          this.confirmText = this.$t('COMMON_MSG_DELETE_REPLY')
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.tempData.jobkindId === 'ALIM') {
        this.confirmText = this.$t('COMMON_MSG_DELETE_NOTI')
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.tempData.jobkindId === 'BOAR') {
        this.confirmText = this.$t('COMMON_MSG_DELETE_POST')
        this.currentConfirmType = 'boardDEL'
      }
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    memoSetCount (size, key) {
    },
    mememoCancel () {
      this.mememoValue = null
    },
    writeMemo (param) {
      // eslint-disable-next-line no-debugger
      debugger
      this.resetMemoYn = false
      if (this.mememoValue) {
        this.resetMemoYn = true
        this.mememoValue = null
      } else {
        // eslint-disable-next-line no-debugger
        debugger
        if (this.currentContentsKey !== param.contentsKey) {
          this.resetMemoYn = true
        }
      }
      this.mememoValue = null
      this.memoShowYn = true
      var idx
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.contentsKey === param.contentsKey)
        if (idx !== -1) {
          this.currentContentsKey = this.alimContentsList[idx].contentsKey
        } else {
          this.memoShowYn = false
          this.$showToastPop(this.$t('CHAN_POST_MSG_SET_ERROR'))
          return
        }
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.contentsKey === param.contentsKey)
        if (idx !== -1) {
          this.currentContentsKey = this.boardContentsList[idx].contentsKey
        } else {
          this.memoShowYn = false
          this.$showToastPop(this.$t('CHAN_POST_MSG_SET_ERROR'))
          return
        }
      } else if (this.viewMainTab === 'A') {
        idx = this.allContentsList.findIndex(i => i.contentsKey === param.contentsKey)
        if (idx !== -1) {
          this.currentContentsKey = this.allContentsList[idx].contentsKey
        } else {
          this.memoShowYn = false
          this.$showToastPop(this.$t('CHAN_POST_MSG_SET_ERROR'))
          return
        }
      }
      // var testIdx = this.alimContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
      // var testCont = this.alimContentsList[testIdx]
      // console.log(testIdx)
      // console.log(testCont)

      this.writeMemoTempTeamKey = param.teamKey
    },
    /* async saveMemo (text) {
      // var testIdx = this.alimContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
      // var testCont = this.alimContentsList[testIdx]
      // console.log(testIdx)
      // console.log(testCont)
      // #책
      if (this.axiosQueue.findIndex((item) => item === 'saveMemo') !== -1) return
      this.axiosQueue.push('saveMemo')
      this.saveMemoLoadingYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }
      memo.bodyFullStr = text
      memo.targetKind = 'C'
      memo.targetKey = this.currentContentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      try {
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveMemo',
          param: { memo: memo }
        })
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'saveMemo')
        this.axiosQueue.splice(queueIndex, 1)
        console.log(' ############################### ')
        console.log(result)

        if (result.data.result === true || result.data.result === 'true') {
          this.memoShowYn = false

          var idx, memoLength
          // var idx, memoLength, cont
          console.log(' @#@#@#@##@##@#@#@#@#@#@#@#@@#@#@#@##@##@#@#@#@#@#@#@#@@#@#@#@##@##@#@#@#@#@#@#@#@@#@#@#@##@##@#@#@#@#@#@#@#@ ')
          if (this.viewMainTab === 'P') {
            idx = this.alimContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
            if (idx !== -1) {
              memoLength = this.alimContentsList[idx].memoList.length
              // cont = this.alimContentsList[idx]
            } else {
              this.$showToastPop('에러코드 -M/S/P-A-idxErro')
            }
          } else if (this.viewMainTab === 'B') {
            idx = this.boardContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
            if (idx !== -1) {
              memoLength = this.boardContentsList[idx].memoList.length
              // cont = this.boardContentsList[idx]
            } else {
              this.$showToastPop('에러코드 -M/S/P-idxErro')
            }
          } else if (this.viewMainTab === 'A') {
            idx = this.allContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
            if (idx !== -1) {
              memoLength = this.allContentsList[idx].memoList.length
              // cont = this.boardContentsList[idx]
            } else {
              this.$showToastPop('에러코드 -M/S/P-idxErro')
            }
          }

          if (memoLength !== undefined && memoLength !== null && memoLength !== '') {
            // await this.getContentsMemoList(this.currentContentsKey, memoLength - 1, 0).then(response => {
            await this.getContentsMemoList(this.currentContentsKey, 0, 0).then(response => {
              console.log('###########################################')
              console.log(response)
              var newArr
              var newList
              if (this.viewMainTab === 'P') {
                if (!this.alimContentsList[idx].D_MEMO_LIST) this.alimContentsList[idx].D_MEMO_LIST = []
                newArr = [
                  ...response,
                  ...this.alimContentsList[idx].D_MEMO_LIST
                ]
                newList = this.replaceMemoArr(newArr)
                this.alimContentsList[idx].D_MEMO_LIST = newList
                this.alimContentsList[idx].memoCount += 1
                // this.GE_DISP_ALIM_LIST[idx].D_MEMO_LIST = newList
                // this.GE_DISP_ALIM_LIST[idx].memoCount += 1

                // this.ALIM_LIST_RELOAD_CONT += 1
                console.log(this.alimContentsList[idx])
                // eslint-disable-next-line no-debugger
                debugger
                // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', this.alimContentsList[idx])
                this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.alimContentsList[idx])
              } else if (this.viewMainTab === 'B') {
                if (!this.boardContentsList[idx].D_MEMO_LIST) this.boardContentsList[idx].D_MEMO_LIST = []
                newArr = [
                  ...response,
                  ...this.boardContentsList[idx].D_MEMO_LIST
                ]
                newList = this.replaceMemoArr(newArr)
                this.boardContentsList[idx].D_MEMO_LIST = newList
                this.boardContentsList[idx].memoCount += 1
                // this.ALIM_LIST_RELOAD_CONT += 1
                // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', this.boardContentsList[idx])
                this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.boardContentsList[idx])
              } else if (this.viewMainTab === 'A') {
                if (!this.allContentsList[idx].D_MEMO_LIST) this.allContentsList[idx].D_MEMO_LIST = []
                newArr = [
                  ...response,
                  ...this.allContentsList[idx].D_MEMO_LIST
                ]
                newList = this.replaceMemoArr(newArr)
                this.allContentsList[idx].D_MEMO_LIST = newList
                this.allContentsList[idx].memoCount += 1
                // this.ALIM_LIST_RELOAD_CONT += 1
                // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', this.boardContentsList[idx])
                this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.allContentsList[idx])
              }
              // this.$forceUpdate()
              // this.$refs.pushListChangeTabLoadingComp.memoReload()
              console.log('newList : ')
              console.log(newList)
              // console.log(cont)
            })
          }
        }
      } catch (e) {
        console.error('Tal_pushList 오류')
        console.error(e)
      } finally {
        this.saveMemoLoadingYn = false
      }
    }, */
    memoOpenClick (params) {
    },
    async getContentsMemoList (key, pageSize, offsetInt) {
      if (this.axiosQueue.findIndex((item) => item === 'getContentsMemoList') !== -1) return
      this.axiosQueue.push('getContentsMemoList')
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = key
      // eslint-disable-next-line no-unused-vars
      var idx, cont
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.contentsKey === key)
        if (idx !== -1) cont = this.alimContentsList[idx]
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.contentsKey === key)
        if (idx !== -1) cont = this.boardContentsList[idx]
      } else if (this.viewMainTab === 'A') {
        idx = this.allContentsList.findIndex(i => i.contentsKey === key)
        if (idx !== -1) cont = this.allContentsList[idx]
      }
      if (pageSize) memo.pageSize = pageSize
      else memo.pageSize = this.pagesize
      if (offsetInt !== undefined && offsetInt !== null && offsetInt !== '') memo.offsetInt = offsetInt
      else memo.offsetInt = this.offsetInt

      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemoList',
        param: memo
      })
      var queueIndex = this.axiosQueue.findIndex((item) => item === 'getContentsMemoList')
      this.axiosQueue.splice(queueIndex, 1)

      return result.data.memoList
    },
    async getPushContentsList (pageSize, offsetInput, loadingYn) {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.axiosQueue.findIndex((item) => item === 'getPushContentsList') === -1) {
        this.axiosQueue.push('getPushContentsList')
        // @point
        // eslint-disable-next-line no-new-object
        var param = new Object()
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

        if (this.targetCKey !== undefined && this.targetCKey !== null && this.targetCKey !== '') {
          param.targetContentsKey = this.targetCKey
          param.DESCYn = this.loadMoreDESCYn
          if (this.loadMoreDESCYn === false) {
            param.offsetInt = this.upOffSetInt
          }
        }
        if (this.viewTab === 'N') {
        } else if (this.viewTab === 'P') {
          param.orderbyStr = 'a.popPoint DESC, a.creDate DESC'
        } else if (this.viewTab === 'S') {
          param.findActYn = true
          param.findActStarYn = true
        } else if (this.viewTab === 'M') {
          param.creUserKey = this.GE_USER.userKey
        }
        if (this.viewMainTab === 'P') {
          param.jobkindId = 'ALIM'
          param.ownUserKey = this.GE_USER.userKey
        } else if (this.viewMainTab === 'B') {
          param.jobkindId = 'BOAR'
          if (this.viewTab === 'N') {
            param.boardYn = true
          } else {
            //  param.ownUserKey = this.GE_USER.userKey
          }
        } else if (this.viewMainTab === 'A') {
          // param.allYn = true
          // param.ownUserKey = this.GE_USER.userKey
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
        var resultList = null
        if (this.mCabinetKeyListStr) {
          param.cabinetKeyListStr = this.mCabinetKeyListStr
          // var result1 = await this.$commonAxiosFunction('/sUniB/tp.getContentsListPage', param)
          var response = this.$getContentsList(param, nonLoading)
          // var response = await this.$commonAxiosFunction({
          //   url: '/sUniB/tp.getContentsList',
          //   param: param
          // }, nonLoading)
          // console.log('야야야야야')
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
    makeNewContents (data) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = data.contentsKey
      param.targetType = data.writeType === 'BOAR' ? 'writeBoard' : data.writeType === 'ALIM' ? 'writePush' : undefined
      param.writeType = data.writeType
      param.creTeamKey = data.creTeamKey
      param.currentTeamKey = data.creTeamKey
      if (data.attachMfilekey) { param.attachMfilekey = data.attachMfilekey }
      // eslint-disable-next-line no-undef
      param.bodyFullStr = Base64.decode(data.bodyFullStr)
      param.UseAnOtherYn = true
      param.selectBoardYn = true
      param.modiContentsKey = data.contentsKey
      param.titleStr = data.title
      console.log('makeNewContents')
      this.$emit('openPop', param)
    },
    moveOrCopyContent (data) {
      this.selectBoardType = data.type
      this.boardDetailValue = data
      this.selectBoardPopShowYn = true
    },
    closeSelectBoardPop () {
      this.refreshList()
      this.selectBoardPopShowYn = false
    },
    openUserProfile (params) {
      this.$emit('openUserProfile', params)
    },

    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.imgDetailAlertShowYn = false
      } else {
        this.previewPopShowYn = false
      }
    },
    async getMCabContYn (contentsKey) {
      try {
        if (this.axiosQueue.findIndex((item) => item === 'getMCabContYn') !== -1) return
        this.axiosQueue.push('getMCabContYn')
        var paramMap = new Map()
        paramMap.set('targetKey', contentsKey)
        paramMap.set('ownUserKey', this.GE_USER.userKey)
        paramMap.set('jobkindId', 'ALIM')
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getMCabContentsList',
          param: Object.fromEntries(paramMap)
        })
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'getMCabContYn')
        this.axiosQueue.splice(queueIndex, 1)
        if (result.data.length > 0) {
          return true
        } else {
          return false
        }
      } catch (error) {
      }
      //
    },
    targetContentScrollMove (wich) {
      this.$emit('targetContentScrollMove', wich)
    },
    async chanAlimScrollMove (wich) {
      /* await this.$nextTick(() => {
        // this.scrollMove(wich)
        var ScrollWrap = this.$refs.pushListWrapWrapCompo
        if (wich === undefined || wich === null || wich === '') { wich = 0 }
        ScrollWrap.scrollTo({ top: wich, behavior: 'smooth' })
      }) */
    },
    findPaddingTopPush () {
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.paddingTop = element.clientHeight + 45
      }
    },
    async refreshAll () {
      // 새로고침
      this.targetCKey = null
      this.offsetInt = 0
      this.loadMoreDESCYn = true
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      // this.changeMainTab('A')
      // this.changeTab('N')
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.changeTab('A')
      // this.$refs.activeBar.switchtab(0)
    },
    async changeMainTab (tab) {
      this.paddingTop = 45
      this.$showAxiosLoading(true)
      // this.targetCKey = null
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
      // this.changeTab('N')
      this.$refs.activeBar.switchtab(0)
      if (tab === 'F') {
        this.activeTabList = [{ display: '최신', name: 'N' }]
      } else {
        this.activeTabList = [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 만든', name: 'M' }]
      }
      // this.$refs.activeBar.switchtab(0)
      this.refreshList()
      this.canLoadYn = true
      if (tab === 'F') {
        var result = await this.getFileList(10, 0)
        var resultFileList = result.data.content.filter((item) => {
          return item.contents
        })
        resultFileList = resultFileList.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
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
      // return element.getBoundingClientRect().top
      return window.scrollY + element.getBoundingClientRect().top
    },
    handleScroll () {
      this.imgDetailAlertShowYn = false
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
          console.log('going up')
          this.scrollDirection = 'up'
          this.scrolledYn = false
        }
        if (time / 1000 > 1 && this.box.scrollTop !== undefined && this.$diffInt(this.box.scrollTop, this.scrollPosition) > 150) {
          this.scrollCheckSec = currentTime

          if (this.firstContOffsetY < 0) {
            if (this.box.scrollTop > this.scrollPosition) {
              console.log('going down')
              this.scrollDirection = 'down'
              this.scrolledYn = true
            } else if (this.box.scrollTop <= this.scrollPosition) {
              console.log('going up')
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
      console.log(resultList.content)
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // this.endListSetFunc(resultList)
      if (this.viewMainTab === 'P') {
        newArr = [
          // 리프레쉬인데 기존 리스트를 받아 중복처리를 하는게 이상하고 실제 삭제한 데이터가 사라지지 않음
          // ...this.alimContentsList,
          ...resultList.content
        ]
        this.alimContentsList = this.replaceArr(newArr)
        for (let i = 0; i < this.alimContentsList.length; i++) {
          cont = this.alimContentsList[i]

          tempContentDetail = await this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)

          if (tempContentDetail) {
            contentDetail = tempContentDetail[0]
          } else {
            contentDetail = null
          }
          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      } else if (this.viewMainTab === 'B') {
        newArr = [
          // 리프레쉬인데 기존 리스트를 받아 중복처리를 하는게 이상하고 실제 삭제한 데이터가 사라지지 않음
          // ...this.alimContentsList,
          ...resultList.content
        ]
        this.boardContentsList = this.replaceArr(newArr)
        for (let i = 0; i < this.boardContentsList.length; i++) {
          cont = this.boardContentsList[i]

          tempContentDetail = await this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)

          if (tempContentDetail) {
            contentDetail = tempContentDetail[0]
          } else {
            contentDetail = null
          }
          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            var newList1 = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList1
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      } else if (this.viewMainTab === 'A') {
        newArr = [
          // 리프레쉬인데 기존 리스트를 받아 중복처리를 하는게 이상하고 실제 삭제한 데이터가 사라지지 않음
          // ...this.alimContentsList,
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
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            var newList2 = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList2
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      }
    },
    endListSetFunc (resultList) {
      // eslint-disable-next-line no-debugger
      debugger
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
            // 더 불러온 컨텐츠에 D_MEMO_LIST가 없어 넣어주고 있음
            /* if (resultList.content) {
              if (resultList.content.length > 0) {
                for (let i = 0; i < resultList.content.length; i++) {
                  if (resultList.content[i].D_MEMO_LIST === undefined || resultList.content[i].D_MEMO_LIST === null || resultList.content[i].D_MEMO_LIST === '') {
                    resultList.content[i].D_MEMO_LIST = resultList.content[i].memoList
                  }
                }
              }
            } */
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
            if (descYn) {
              if (this.viewMainTab === 'P') {
                if (!this.GE_DISP_ALIM_LIST) this.GE_DISP_ALIM_LIST = []
                newArr = [
                  ...resultList.content,
                  ...this.GE_DISP_ALIM_LIST
                ]
                this.alimContentsList = this.replaceArr(newArr)
              } else if (this.viewMainTab === 'B') {
                if (!this.GE_DISP_BOAR_LIST) this.GE_DISP_BOAR_LIST = []
                newArr = [
                  ...resultList.content,
                  ...this.GE_DISP_BOAR_LIST
                ]
                this.boardContentsList = this.replaceArr(newArr)
              } else if (this.viewMainTab === 'A') {
                if (!this.GE_DISP_ALL_LIST) this.GE_DISP_ALL_LIST = []
                newArr = [
                  ...this.GE_DISP_ALL_LIST,
                  ...resultList.content
                ]
                this.allContentsList = this.replaceArr(newArr)
              }
              await this.endListSetFunc(resultList)
            } else {
              if (resultList.content.length < 0) { this.canUpLoadYn = false } else { this.upOffSetInt += 1 }
              if (this.viewMainTab === 'P') {
                if (!this.GE_DISP_ALIM_LIST) this.GE_DISP_ALIM_LIST = []
                newArr = [
                  ...resultList.content,
                  ...this.GE_DISP_ALIM_LIST
                ]
                this.alimContentsList = this.replaceArr(newArr)
              } else if (this.viewMainTab === 'B') {
                if (!this.GE_DISP_BOAR_LIST) this.GE_DISP_BOAR_LIST = []
                newArr = [
                  ...resultList.content,
                  ...this.GE_DISP_BOAR_LIST
                ]
                this.boardContentsList = this.replaceArr(newArr)
              } else if (this.viewMainTab === 'A') {
                if (!this.GE_DISP_ALL_LIST) this.GE_DISP_ALL_LIST = []
                newArr = [
                  ...this.GE_DISP_ALL_LIST,
                  ...resultList.content
                ]
                this.allContentsList = this.replaceArr(newArr)
              }
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
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        if (this_.viewTab === 'P') {
          data = data.sort(function (a, b) { // num으로 오름차순 정렬
            return b.popPoint - a.popPoint
            // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
          })
        } else {
          data = data.sort(function (a, b) { // num으로 오름차순 정렬
            return b.contentsKey - a.contentsKey
            // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
          })
        }
        return data
      }, [])
      return uniqueArr
    },
    replaceFileArr (arr) {
      // var this_ = this
      if (!arr || arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.fileKey) === Number(current.fileKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    // showToastPop (msg) {
    //   this.$emit('showToastPop', msg)
    // },
    justChangeTabPosition (tabName) {
      this.targetCKey = null
      this.offsetInt = 0
      /* if (this.viewTab !== tabName) {
        this.readCheckBoxYn = false
      } */
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
      // if (!resultList || resultList === '') return
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail

      if (this.viewMainTab === 'P') {
        newArr = [
          // ...this.alimContentsList,
          ...contentList
        ]
        this.alimContentsList = this.replaceArr(newArr)
        for (let i = 0; i < this.alimContentsList.length; i++) {
          cont = this.alimContentsList[i]
          tempContentDetail = this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)
          if (tempContentDetail) {
            contentDetail = tempContentDetail[0]
          } else {
            contentDetail = null
          }
          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
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
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      } else if (this.viewMainTab === 'B') {
        newArr = [
          // ...this.boardContentsList,
          ...contentList
        ]
        this.boardContentsList = this.replaceArr(newArr)
        for (let i = 0; i < this.boardContentsList.length; i++) {
          cont = this.boardContentsList[i]
          tempContentDetail = []
          tempContentDetail = this.$getContentsDetail(null, cont.contentsKey, cont.creTeamKey)
          if (tempContentDetail) {
            contentDetail = tempContentDetail[0]
          } else {
            contentDetail = null
          }

          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
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
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      } else if (this.viewMainTab === 'A') {
        newArr = [
          // ...this.boardContentsList,
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
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
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
            this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [cont])
          }
        }
      }
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
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
        if (this.viewMainTab === 'P') {
          this.alimContentsList = []
        } else if (this.viewMainTab === 'B') {
          this.boardContentsList = []
        } else if (this.viewMainTab === 'A') {
          this.allContentsList = []
        }
      } else {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        var newArr = []
        if (this.viewMainTab === 'P') {
          newArr = [
          // ...this.alimContentsList,
            ...resultList.content
          ]
          this.alimContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'B') {
          newArr = [
            // ...this.boardContentsList,
            ...resultList.content
          ]
          this.boardContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'A') {
          newArr = [
            // ...this.boardContentsList,
            ...resultList.content
          ]
          this.allContentsList = this.replaceArr(newArr)
        }
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
      // getPushContentsList (pageSize, offsetInput)
      var pageSize = 20
      if (this.resultSearchKeyList.length === 0) {
        this.paddingTop = 45
      }
      // this.findPaddingTopPush()
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
        var resultList = await this.getPushContentsList(pageSize, this.offsetInt, true)
      }
      if (resultList === '') {
        // eslint-disable-next-line no-debugger
        debugger
        if (this.viewMainTab === 'P') {
          this.alimContentsList = []
        } else if (this.viewMainTab === 'B') {
          this.boardContentsList = []
        } else if (this.viewMainTab === 'A') {
          this.allContentsList = []
        }
      } else {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        var newArr = []
        if (this.viewMainTab === 'P') {
          newArr = [
          // ...this.alimContentsList,
            ...resultList.content
          ]
          this.alimContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'B') {
          newArr = [
            // ...this.boardContentsList,
            ...resultList.content
          ]
          this.boardContentsList = this.replaceArr(newArr)
        } else if (this.viewMainTab === 'A') {
          newArr = [
            // ...this.boardContentsList,
            ...resultList.content
          ]
          this.allContentsList = this.replaceArr(newArr)
        }
        this.endListSetFunc(resultList)
      }
      this.scrollMove()
    },
    /* 이미지 다운로드 */
    imgLongClick (param) {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.selectImgObject = param.selectObj
      this.selectImgParam = param.previewParam
      this.imgDetailAlertShowYn = true
    },
    longClickAlertClick (btnType) {
      if (btnType === 'download') this.imgDownload()
      else if (btnType === 'share');
      else if (btnType === 'preview') {
        this.backClick()
        this.previewPopShowYn = true
      }
    },
    async imgDownload () {
      try {
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', this.selectImgObject.path)
        } else {
          await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
        }
        this.errorText = '저장되었습니다!'
        this.backClick()
        this.failPopYn = true
      } catch (error) {
      }
    },
    openWorkStatePop (data) {
      this.workStateCodePopProps = data
      this.workStateCodePopShowYn = true
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
      // mBoardFilterList: { // 채널 > 게시판이 바뀜에 따라 매번 달라지는 필터
      //   valiyn: true,
      //   inputType: this.$JOConst.VALUE_TAG_TYPE_SELECT,
      //   targetName: 'boardFilter',
      //   val: 'S',
      //   valiBase: [{ type: this.$JOConst.VALI_CHECK_TYPE_NOT_NULL, baseVal: null }],
      //   selectValueList: [{ title: 'Saved', value: 'S', onclickCallBack: this.changeTab }]
      // },
      // mCommonFilterList: [
      //   // valiYn: true,
      //   // inputType: this.$JOConst.VALUE_TAG_TYPE_SELECT,
      //   // targetName: 'gFilter',
      //   // val: 'P',
      //   // valiBase: [{ type: this.$JOConst.VALI_CHECK_TYPE_NOT_NULL, baseVal: null }],
      //   // selectValueList:
      //   { title: 'Popular', value: 'P' }, { title: 'Recent', value: 'R' }, { title: 'Saved', value: 'S' }, { title: 'My', value: 'M' }
      // ],
      mCommonFilterList: [{ display: 'Recent', name: 'N' }, { display: 'Popular', name: 'P' }, { display: 'Saved', name: 'S' }, { display: 'My', name: 'M' }],
      mUnknownLoginPopYn: false,
      mEmptyReloadKey: 0,
      allContentsList: null,
      alimContentsList: null,
      boardContentsList: null,
      paddingTop: 45,
      pushListReloadShowYn: false,
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
      commonListData: [],
      findKeyList: {},
      resultSearchKeyList: [],
      scrollCheckSec: 0,
      axiosResultTempList: [],
      /* readCheckBoxYn: false, */
      currentTabName: '최신',
      emptyYn: null,
      loadMoreDESCYn: null,
      targetCKey: null,
      failPopYn: false,
      errorText: '',
      previewPopShowYn: false,
      selectImgObject: {},
      imgDetailAlertShowYn: false,
      mobileYn: this.$getMobileYn(),
      alertPopId: null,
      selectImgParam: {},
      loadingYn: false,
      selectBoardType: null,
      selectBoardPopShowYn: false,
      boardDetailValue: null,
      canLoadYn: false,
      memoShowYn: false,
      mememoValue: undefined,
      writeMemoTempmcckey: null,
      writeMemoTempTeamKey: null,
      currentContentsKey: null,
      saveMemoLoadingYn: false,
      tempData: {},
      confirmText: '',
      currentConfirmType: '',
      confirmPopShowYn: false,
      confirmType: 'timeout',
      axiosQueue: [],
      canUpLoadYn: false,
      upOffSetInt: 0,
      computedYn: true,
      resetMemoYn: false,
      tempMemoData: {},
      ALIM_LIST_RELOAD_CONT: 0,
      workStateCodePopShowYn: false,
      workStateCodePopProps: {},
      mFilePopYn: false,
      mFilePopData: {},
      mScrollStartPoint: 0,
      mScrollEndPoint: 0,
      mSelectedCabinetKey: -1,
      // scrollIngYn: false
      fileList: [],
      mCabinetKeyListStr: '',
      skeletonShow: true
    }
  }
}
</script>
<style scoped>
.popHeight{
  margin-top: 150px;
  height: calc(100% - 150px);
}

.mainTabStyle {border-radius: 10px; min-width: 80px; float: left; border-bottom: none; background: #FFF;; padding: 5px 10px; margin-left: 10px;}
.mainTabActive { border-bottom: none; background: #F1F1FF !important;}
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
width: 100% !important; height: 100% !important; background: #00000036 !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;
}
.pushListWrapWrap {
  overflow: hidden;
}

</style>
