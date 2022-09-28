<template>
  <!-- <div id="pushListWrap" style="height: 100vh; width: 100%; overflow: scroll; background-color: white; background-size: cover;"> -->
    <!-- <div class="pageHeader pushListCover"> -->
    <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>

    <div style="width: 100%; height: 100%; padding-top: 0; position: relative; overflow: hidden; float: left;" >
      <!-- <pushLoadingCompo  :style="isOpen === 'chanAlim' ? 'width: 100%; height: 100%; position: ; top: 0; left: 0' : ''" v-if="loadingYn === true "/> -->
      <pushLoadingCompo  :style="isOpen === 'chanAlim' ? 'width: 100%; height: 100%; position: ; top: 0; left: 0' : ''" v-if="loadingYn === true && isOpen !== 'chanAlim'"/>
      <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
      <div id="pageHeader" ref="pushListHeader" style="" class="pushListHeader"  :class="this.scrolledYn? 'pushListHeader--unpinned': 'pushListHeader--pinned'" v-on="handleScroll" >
        <div :style="!popYn ? 'padding: 0 1rem ; padding-top: 20px;' : ''" style=" width: 100%; min-height: 40px; float: left; border-bottom: 1px solid #6768A7; margin-bottom: 1px; display: flex; align-items: flex-end;">
            <div @click="changeMainTab('P')" :class="viewMainTab === 'P'? 'mainTabActive' : ''" class="mainTabStyle commonColor fontBold">알림</div>
            <div @click="changeMainTab('B')" :class="viewMainTab === 'B'? 'mainTabActive' : ''" class="mainTabStyle commonColor fontBold">게시글</div>
        </div>
        <gActiveBar :searchYn='true' @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" ref="activeBar" :tabList="this.activeTabList" class="fl pagePaddingWrap" @changeTab= "changeTab" style="width: 100%; padding-top: 0; margin-top: 10px;" />
      </div>
      <transition name="showModal">
        <findContentsList :contentsListTargetType="this.chanAlimTargetType" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>

      <!-- <div id="pushListWrap" class="pushListWrapWrap" ref="pushListWrapWrapCompo" :style="calcPaddingTop" style="position: relative; float: left; width: 100%; padding-top: calc(125px + var(--paddingTopLength)); overflow: hidden scroll; height: calc(100%); "> -->
        <div id="pushListWrap" class="pushListWrapWrap " ref="pushListWrapWrapCompo" :style="!popYn ? 'padding: 0 1rem ; padding-top:' + this.paddingTop + 'px;' : 'padding-top:' + (this.paddingTop) + 'px;' " style="position: relative; margin-top: 1rem; float: left; width: 100%; overflow: hidden scroll; height: calc(100%); ">
        <!-- 읽음처리 hold //20220819 수민 -->
        <!-- <div class="fr pushReadCheckAlimArea" :class="this.scrolledYn? 'pushReadCheckAlimArea--unpinned': 'pushReadCheckAlimArea--pinned'" style="border-radius: 5px; height: 20px; padding: 3px 10px; background: rgb(255 255 255 / 70%); position: sticky; top: 10px; z-index: 1; display: flex; align-items: center;" > <input type="checkbox" v-model="readCheckBoxYn" id="alimReadYn" style="" > <label for="alimReadYn" class="mleft-05 cursorP font15">안읽은 알림 보기</label></div> -->
        <!-- <div class="stickerWrap">
        <div :style="setStickerWidth" class="mbottom-05 stickerFrame">
          <div class="stickerDiv" :style="'border: 1.5px solid' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" style="min-width: 60px; margin-right: 5px;height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
            <p class="font12">{{value.stickerName}}</p>
          </div>
        </div>
      </div> -->
          <!-- <div style="width:100%; height:100%; top:0; left: 0;position: absolute; z-index: 99999; opacity: 0.1; background-color:#000"> -->
          <!-- </div> -->
          <commonList id="commonPush" :chanAlimYn="chanAlimYn" v-if=" viewMainTab === 'P'" @makeNewContents="makeNewContents" @moveOrCopyContent="moveOrCopyContent" @goDetail="openPop" @imgLongClick="imgLongClick" @clickImg="openImgPreviewPop" :targetContentsKey="targetCKey" ref='pushListChangeTabLoadingComp' :imgUrl="this.imgUrl" @openLoading="this.loadingYn = true" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 0px;" :alimListYn="this.alimListYn" :commonListData="this.GE_DISP_CONT_LIST" @moreList="loadMore" @topLoadMore="loadMore" @scrollMove="scrollMove" @targetContentScrollMove="targetContentScrollMove" @showToastPop="showToastPop" @openPop="openUserProfile" @memoOpenClick="memoOpenClick" @writeMememo="writeMememo" @writeMemo="writeMemo" @deleteMemo='deleteConfirm' @yesLoadMore='yesLoadMore' />
          <commonList id="commonBoard" :chanAlimYn="chanAlimYn" v-if="viewMainTab === 'B'" @makeNewContents="makeNewContents" @moveOrCopyContent="moveOrCopyContent" @goDetail="openPop" @imgLongClick="imgLongClick" @clickImg="openImgPreviewPop" :targetContentsKey="targetCKey" ref='pushListChangeTabLoadingComp' :imgUrl="this.imgUrl" @openLoading="this.loadingYn = true" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 0px;" :alimListYn="this.alimListYn" :commonListData="this.GE_DISP_CONT_LIST" @moreList="loadMore" @topLoadMore="loadMore" @scrollMove="scrollMove" @targetContentScrollMove="targetContentScrollMove" @showToastPop="showToastPop" @openPop="openUserProfile" @memoOpenClick="memoOpenClick" @writeMememo="writeMememo" @writeMemo="writeMemo" @deleteMemo='deleteConfirm' @yesLoadMore='yesLoadMore' />
          <!-- <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && CHANNEL_DETAIL && CHANNEL_DETAIL.ELEMENTS.alimList.length === 0 "/> -->
        </div>
        <!-- <div v-on="handleScroll" :style="alimListYn ? 'bottom: 7rem;' : 'bottom: 2rem;' " style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; right: calc(10% + 7px);" @click="refreshAll"> -->
        <div v-on="handleScroll" style="position: absolute; top:5px; right:1rem; z-index:99; width: 30px; height: 30px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); display: flex; align-items: center; justify-content: center; " @click="refreshAll">
          <img src="../../assets/images/common/reload_button.svg" class="cursorP img-w20" />
        </div>
        <div v-if="memoShowYn === true" class="pushListMemoBoxBackground" @click="this.memoShowYn = false"></div>
        <transition name="showMemoPop">
          <gMemoPop ref="gMemoRef" transition="showMemoPop"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' style="position: fixed; bottom:0;left:0; z-index:999999;"/>
        </transition>
        <imgPreviewPop :mFileKey="this.selectImgParam.mfileKey" :startIndex="selectImgParam.imgIndex" @closePop="this.backClick()" v-if="previewPopShowYn" style="width: 100%; height: calc(100%); position: fixed; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="selectImgParam.title" :creUserName="selectImgParam.creUserName" :creDate="selectImgParam.creDate"  />
        <imgLongClickPop @closePop="backClick" @clickBtn="longClickAlertClick" v-if="imgDetailAlertShowYn" />
        <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="selectBoardPopShowYn" :boardDetail="boardDetailValue" />
        <!-- <cancelPop/> -->
    </div>
    <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false' />
  <!-- </div> -->
</template>
<script>
import pushLoadingCompo from '../../components/layout/Tal_loading.vue'
import imgPreviewPop from '../../components/popup/file/Tal_imgPreviewPop.vue'
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import findContentsList from '../../components/popup/common/Tal_findContentsList.vue'
import imgLongClickPop from '../../components/popup/Tal_imgLongClickPop.vue'
/* import cancelPop from '../../components/popup/common/Tal_commonCancelReasonPop.vue' */
import { onMessage } from '../../assets/js/webviewInterface'
export default {
  name: 'pushList',
  components: {
    findContentsList,
    commonConfirmPop,
    imgPreviewPop,
    pushLoadingCompo,
    imgLongClickPop

    /* cancelPop */
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
    propData: {},
    targetContents: {},
    // 라우터메인에서 여는 푸시화면과 gPop에서 여는 푸시화면 구분에 필요함 // gPop에서 열었으면 gpop이 들어옴
    isOpen: {},

    chanAlimYn: {},
    chanDetail: {}
  },
  created () {
    if (this.chanAlimYn) { this.currentTeamKey = this.chanDetail.teamKey } else {
      this.currentTeamKey = 0
    }

    this.$emit('changePageHeader', '알림')
    this.loadingYn = true
    this.$emit('changePageHeader', '알림')
    if (this.propData) {
      if (this.propData.alimTabType !== undefined && this.propData.alimTabType !== null && this.propData.alimTabType !== '') {
        this.viewMainTab = this.propData.alimTabType
      }
    }
    if (this.targetContents !== undefined && this.targetContents !== null && this.targetContents !== '') {
      this.targetCKey = this.targetContents.targetContentsKey
      if (this.targetContents.jobkindId === 'BOAR') {
        this.viewMainTab = 'B'
        this.$emit('changeMainTab', this.viewMainTab)
      }
    }
    var this_ = this
    this_.getPushContentsList().then(response => {
      this_.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', response.content)
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail

      if (this_.viewMainTab === 'P') {
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
          // console.log('!!!!!!!!!!!!!!!!!!!!!')
          // console.log(contentDetail)

          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          }
        }
      } else {
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
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            // eslint-disable-next-line no-redeclare
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
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
    })
    /*  } */
  },

  updated () {
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
    if (this.box) {
      this.box.addEventListener('scroll', this.handleScroll)
    }
  },
  mounted () {
    // console.log('%%%%%%%%%%%%%')
    // console.log(this.chanDetail)
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
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

    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
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
    GE_DISP_CONT_LIST: {
      /* handler (value, old) {
        for (var i = 0; i < this.alimContentsList.length; i++) {
          var userDo = this.alimContentsList[i].userDoList
          var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
          if (userDo) {
            var index = userDo.findIndex((item) => item.doType === 'ST')
            if (index >= 0) {
              userDoList[0].doKey = userDo[index].doKey
            }
            index = userDo.findIndex((item) => item.doType === 'LI')
            if (index >= 0) {
              userDoList[1].doKey = userDo[index].doKey
            }
            index = userDo.findIndex((item) => item.doType === 'RE')
            if (index >= 0) {
              userDoList[2].doKey = userDo[index].doKey
            }
          }
          this.alimContentsList[i].D_CONT_USER_DO = userDoList
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CAHNNEL', this.alimContentsList)
      },
      deep: true */
    },
    GE_CHANNEL_DETAIL: {
      /* handler (value, old) {
        // console.log(JSON.stringify(value))
        alert(JSON.stringify(value))
      },
      deep: true */
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (this.chanAlimYn) {
          // eslint-disable-next-line no-debugger
          debugger
          if (value[0].creTeamKey === this.chanDetail.teamKey) {
            if (value[0].jobkindId === 'ALIM') {
              newArr = [
                value[0],
                ...this.alimContentsList
              ]
              this.alimContentsList = this.replaceArr(newArr)
            } else {
              newArr = [
                value[0],
                ...this.boardContentsList
              ]
              this.boardContentsList = this.replaceArr(newArr)
            }
          }
        } else {
          if (value[0].jobkindId === 'ALIM') {
            newArr = [
              value[0],
              ...this.alimContentsList
            ]
            this.alimContentsList = this.replaceArr(newArr)
          } else {
            newArr = [
              value[0],
              ...this.boardContentsList
            ]
            this.boardContentsList = this.replaceArr(newArr)
          }
        }
      },
      deep: true
    },
    /* GE_NEW_NOTI_LIST: {
      handler  (value, old) {
        // console.log('noti도착----------------------------------------------------')
        alert(JSON.stringify(value[0]))
        var newArr = null
        if (this.chanAlimYn) {
          // eslint-disable-next-line no-debugger
          debugger
          if (value[0].creTeamKey === this.chanDetail.teamKey) {
            newArr = [
              value[0],
              ...this.alimContentsList
            ]
            this.alimContentsList = this.replaceArr(newArr)
          }
        } else {
          alert('왔어요!!!')
          newArr = [
            value[0],
            ...this.alimContentsList
          ]
          this.alimContentsList = this.replaceArr(newArr)
        }
      },
      deep: true
    }, */
    /* GE_CHANNEL_DETAIL: {p
      handler () {
        // console.log(this.GE_CHANNEL_DETAIL.ELEMENTS.commonList)
      },
      deep: true
    }, */
    routerReloadKey () {
      this.refreshList()
    },
    reloadShowYn () {
      this.checkShowReload()
    },
    /* readCheckBoxYn () {
      this.changeTab(this.viewTab)
    }, */
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    },
    GE_RECENT_CHANGE_TEAM (value, old) {
    },
    GE_MAIN_CHAN_LIST: {
      handler (value, old) {
        /* alert(true) */
      },
      deep: true
    }
    /* MU_RECENT_CHANGE_TEAM (value, old) {
      // console.log(value)
      if (value === this.chanDetail.teamKey) {
        alert(value)
        this.GE_CHANNEL_DETAIL = this.$getDetail('TEAM', this.GE_CHANNEL_DETAIL.teamKey).data
        // console.log('new!!!')
        // console.log(this.GE_CHANNEL_DETAIL)
      }
    },
    GE_MAIN_CHAN_LIST (value, old) {
      // console.log('왔다!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // console.log(value)
      this.GE_CHANNEL_DETAIL = this.$getDetail('TEAM', this.GE_CHANNEL_DETAIL.teamKey).data
      // console.log('new!!!')
      // console.log(this.GE_CHANNEL_DETAIL)
    },
    MAIN_ALIM_LIST (value, old) {
      this.alimList = value
      // console.log('alimList!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // console.log(this.alimList)
      this.setAllContents()
    } */
  },
  computed: {
    GE_CHANNEL_DETAIL () {
      if (this.chanAlimYn) {
        var team = this.$getDetail('TEAM', this.chanDetail.teamKey)
        return team[0]
      } else return null
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_NEW_NOTI_LIST () {
      return this.$store.getters['D_UPDATE/GE_NEW_NOTI_LIST']
    },
    GE_DISP_CONT_LIST () {
      var idx1, idx2
      var test = []
      var chanDetail = null
      var dataList = null
      var i = 0
      if (this.viewMainTab === 'P') {
        for (i = 0; i < this.alimContentsList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.alimContentsList[i].creTeamKey)
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.mccKey === this.alimContentsList[i].mccKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
          if (idx2 !== -1) {
            test.push(dataList[idx2])
          } else {
            test.push(this.alimContentsList[i])
          }
        }
      } else {
        for (i = 0; i < this.boardContentsList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.boardContentsList[i].creTeamKey)
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.mccKey === this.boardContentsList[i].mccKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
          if (idx2 !== -1) {
            test.push(dataList[idx2])
          } else {
            test.push(this.boardContentsList[i])
          }
        }
      }

      return test
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
    /* setStickerWidth () {
      var stickerCnt = this.stickerList.length
      var textWidth = 16
      var stickerDivWidth = 0
      for (var i = 0; i < stickerCnt; i++) {
        stickerDivWidth += this.stickerList[i].stickerName.length * textWidth + 10
      }
      return {
        '--stickerDivWidth': stickerDivWidth + 'px'
      }
    } */
  },
  methods: {
    async yesLoadMore (contentKey) {
      var cont, idx
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.contentsKey === contentKey)
        if (idx !== -1) cont = this.alimContentsList[idx]
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.contentsKey === contentKey)
        if (idx !== -1) cont = this.boardContentsList[idx]
      }
      // console.log('#######yesLoadMore#####')
      // console.log('index : ' + idx)
      // console.log(cont)
      // console.log('############')
      // eslint-disable-next-line no-debugger
      debugger
      /* debugger */
      var response = await this.getContentsMemoList(contentKey, cont.D_MEMO_LIST.length + 5, 0)
      // console.log('// console.log(response)')
      // console.log(response)
      // console.log(cont.D_MEMO_LIST)

      var newArr = [
        ...cont.D_MEMO_LIST,
        ...response
      ]
      var newList = await this.replaceMemoArr(newArr)

      // console.log(newList)
      cont.D_MEMO_LIST = newList
      // console.log(cont)

      this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
      // eslint-disable-next-line no-debugger
      debugger
      // this.currentMemoObj = cont
      // if (this.offsetInt === response.totalElements) { this.showMoreMemoTextYn = false }
      // this.memoSetCount(response.totalElements)
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        /* data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        }) */
        return data
      }, [])
      return uniqueArr
    },
    writeMememo (memo) {
      // console.log('###########write#######')
      // console.log(memo)
      this.mememoValue = {}
      this.currentContentsKey = memo.memo.targetKey
      this.mememoValue = memo
      this.memoShowYn = true
    },
    async deleteMemo (param) {
      // console.log(param)
      var memo = {}
      memo.memoKey = param.memoKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.deleteMemo',
        param: memo
      })
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
        }
        // this.memoList = []
        // await this.getBoardMemoList(true)
        // var response = await this.getContentsMemoList(this.currentContentsKey)
        // console.log('$$$$$$$$$$$$cont#############')
        // console.log(cont)
        // console.log(idx)
        // console.log('$$$$$$$$$$$$@@@@#############')
        index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === param.memoKey)
        // console.log(cont.D_MEMO_LIST)
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
          // console.log('cMemoList 중 해당 인덱스는 : ' + index)
          // console.log('해당 메모가 있는 인덱스는 : ' + cmemoListIdx)
          // console.log('cont.D_MEMO_LIST[cmemoListIdx] : ' + cont.D_MEMO_LIST[cmemoListIdx])
          cont.D_MEMO_LIST[cmemoListIdx].cmemoList.splice(index, 1)
        } else {
          cont.D_MEMO_LIST.splice(index, 1)
        }
        cont.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)

        // this.currentMemoList = cont.D_MEMO_LIST
        // this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        // this.currentMemoObj = cont
        // this.memoSetCount(response.totalElements)
      }
      this.$showToastPop('댓글을 삭제하였습니다.')
    },
    confirmOk () {
      this.confirmType = 'timeout'
      if (this.currentConfirmType === 'memoDEL') {
        // console.log(this.tempData)
        this.deleteMemo({ memoKey: this.tempData.memoKey, contentsKey: this.tempData.targetKey, parentMemoKey: this.tempData.parentMemoKey })
      }
      this.currentConfirmType = ''
      this.confirmPopShowYn = false
    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        // console.log(data)
        this.tempData = data
      }

      if (data === 'memo' || this.tempData.memoKey) {
        this.confirmText = '댓글을 삭제하시겠습니까?'
        if (this.tempData.parentMemoKey) {
          this.confirmText = '대댓글을 삭제하시겠습니까?'
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.tempData.jobkindId === 'ALIM') {
        this.confirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.tempData.jobkindId === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'boardDEL'
      }
      // console.log(this.tempData)
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    memoSetCount (size, key) {
      // var contentsKey = this.currentContentsKey
      // if (key !== undefined && key !== null && key !== '' ) contentsKey = key
      // // var indexOf = this.commonListData.findIndex(i => i.contentsKey === contentsKey); // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)
      // // if (indexOf !== -1 ){
      // //   this.commonListData[indexOf].memoCount = size
      // // }
    },
    mememoCancel () {
      this.mememoValue = null
    },
    writeMemo (param) {
      // console.log('tal_pushList writeMemo' + JSON.stringify(param))
      this.mememoValue = null
      this.memoShowYn = true
      // this.writeMemoTempmcckey = param.mccKey
      // var currentContentsKey
      var idx
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.mccKey === param.mccKey)
        if (idx !== -1) {
          this.currentContentsKey = this.alimContentsList[idx].contentsKey
        } else {
          this.$showToastPop('작성 setting 중 오류')
        }
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.mccKey === param.mccKey)
        if (idx !== -1) {
          this.currentContentsKey = this.boardContentsList[idx].contentsKey
        } else {
          this.$showToastPop('작성 setting 중 오류')
        }
      }
      // console.log('##############')
      // console.log('작성 할 contents index 는 : ' + idx)
      // console.log('작성 할 contents key 는 : ' + this.currentContentsKey)
      // console.log('##############')

      this.writeMemoTempTeamKey = param.teamKey
    },
    async saveMemo (text) {
      this.saveMemoLoadingYn = true
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }

      memo.bodyFullStr = text
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.currentContentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // console.log(memo)

      // try {
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveMemo',
        param: { memo: memo }
      })
      // console.log('!!!!!! SAVE MEMO result !!!!!!!')
      // console.log(result)

      if (result.data.result === true || result.data.result === 'true') {
        /* this.confirmText = '댓글 저장 성공'
        this.confirmPopShowYn = true */
        this.memoShowYn = false
        // await this.getContentsList()
        // await this.getBoardMemoList(true)

        // this.currentMemoList = []
        // var cont = this.currentMemoObj
        var idx, memoLength, cont
        if (this.viewMainTab === 'P') {
          idx = this.alimContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
          if (idx !== -1) {
            memoLength = this.alimContentsList[idx].memoList.length
            cont = this.alimContentsList[idx]
          }
        } else if (this.viewMainTab === 'B') {
          idx = this.boardContentsList.findIndex(i => i.contentsKey === this.currentContentsKey)
          if (idx !== -1) {
            memoLength = this.boardContentsList[idx].memoList.length
            cont = this.boardContentsList[idx]
          }
        }
        // console.log('memoLength : ' + memoLength)
        // console.log('memoLength : ' + memoLength)

        if (memoLength !== undefined && memoLength !== null && memoLength !== '') {
          var response = await this.getContentsMemoList(this.currentContentsKey, memoLength + 1, 0)
          // console.log('!!!response!!!!')
          // console.log(response)
          // console.log('!!!!!!!!!!!!!!!')
          if (!cont.D_MEMO_LIST) cont.D_MEMO_LIST = []
          var newArr = [
            ...response,
            ...cont.D_MEMO_LIST
          ]
          var newList = this.replaceMemoArr(newArr)
          cont.D_MEMO_LIST = newList
          // cont.memoCount = newList.length
          cont.memoCount = this.$countingTotalMemo(cont.D_MEMO_LIST)
          // this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
          this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          // this.currentMemoObj = cont
          // this.currentMemoList = cont.D_MEMO_LIST
          // this.memoSetCount(response.totalElements)
          // this.pointAni()
        }
        /* this.scrollMove(-1) */
      }
      // } catch (e) {
      //   // console.log(e)
      // } finally {
      //   this.saveMemoLoadingYn = false
      // }
      this.saveMemoLoadingYn = false
    },
    memoOpenClick (params) {
      // console.log(params)
    },
    async getContentsMemoList (key, pageSize, offsetInt) {
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = key
      var idx, cont
      if (this.viewMainTab === 'P') {
        idx = this.alimContentsList.findIndex(i => i.contentsKey === key)
        if (idx !== -1) cont = this.alimContentsList[idx]
      } else if (this.viewMainTab === 'B') {
        idx = this.boardContentsList.findIndex(i => i.mccKey === key)
        if (idx !== -1) cont = this.boardContentsList[idx]
      }

      // console.log('getContentsMemoList idx :' + idx)
      // console.log('#########################')
      // console.log('param key : ' + key + ' param pageSize : ' + pageSize + ' param offsetInt : ' + offsetInt)
      if (pageSize) memo.pageSize = pageSize
      else memo.pageSize = this.pagesize
      if (offsetInt !== undefined && offsetInt !== null && offsetInt !== '') memo.offsetInt = offsetInt
      else memo.offsetInt = this.offsetInt
      // if (allYn) {
      //   memo.pageSize = this.totalElements + 1
      //   memo.offsetInt = 0
      // }

      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMemoList',
        param: memo
      })
      // console.log(result)

      console.log(cont)
      if (result.data.memoList) {
        // cont.totalMemoCount = result.data.totalElements
        // var tempList = []
        // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
        // if (cont.D_MEMO_LIST) {
        //   tempList = cont.D_MEMO_LIST
        // }
        // const newArr = [
        //   ...tempList,
        //   ...result.data.memoList
        // ]
        // var tempMemo = this.replaceArr(newArr)

        // if (tempMemo && tempMemo.length > 0) {
        //   for (let i = 0; i < tempMemo.length; i++) {
        //     if (tempMemo.parentMemoKey) {
        //       for (let j = 0; j < tempMemo.length; j++) {
        //         if (tempMemo[j].memoKey === tempMemo[i].parentMemoKey) {
        //           tempMemo[i].meMemoUserDispMtext = this.$changeText(tempMemo[j].userDispMtext)
        //           tempMemo[i].meMemoBodyMinStr = tempMemo[j].bodyFullStr
        //         }
        //       }
        //     }
        //   }
        // }
        // // console.log('sssssssssssssssssssssssssssss')
        // // console.log(tempMemo)
        // // console.log('sssssssssssssssssssssssssssss')
        // cont.D_MEMO_LIST = tempMemo
        // this.offsetInt = tempMemo.length
        // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', cont)
      }

      // // console.log(result.data.content)
      // var list = []
      // list = tempMemo
      // // console.log(list)
      // // console.log(tempMemo)?
      /* // console.log('this.$refs.gMemoRef')
      // console.log(this.$refs.gMemoRef)
      this.$refs.gMemoRef.memoLoadingHide() */
      // this.currentMemoObj = cont
      // this.currentMemoTotal = this.currentMemoObj.totalElements

      return result.data.memoList
      // if (allYn) {
      //   this.alimMemoList = result.data.content
      //   this.endListYn = true
      // } else {
      //   const newArr = [
      //     ...this.alimMemoList,
      //     ...result.data.content
      //   ]
      //   this.alimMemoList = newArr
      // }
    },
    updateStoreData (uniqueArr) {
      var this_ = this
      if (this.chanAlimYn) {
        // console.log(this.CHANNEL_DETAIL)
        // eslint-disable-next-line no-debugger
        debugger
        this.CHANNEL_DETAIL.ELEMENTS.commonList.list = uniqueArr
        if (this.viewMainTab === 'P') {
          this.CHANNEL_DETAIL.ELEMENTS.commonList.type = 'ALIM'
        } else if (this.viewMainTab === 'B') {
          this.CHANNEL_DETAIL.ELEMENTS.commonList.type = 'BOAR'
        }
        this_.$actionVuex('COMMONCONT', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true)
      } else {
        if (uniqueArr.length > 0) {
          this_.canLoadYn = true
        }
        if (this.viewMainTab === 'P') {
          this_.$actionVuex('ALIM', uniqueArr, null, true, false)
        } else if (this.viewMainTab === 'B') {
          // eslint-disable-next-line no-debugger
          debugger
          this_.$actionVuex('BOAR', uniqueArr, null, true, false)
        }
      }
    },

    async getPushContentsList (pageSize, offsetInput) {
    // @point
    // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      }
      if (offsetInput !== undefined) { param.offsetInt = offsetInput } else { param.offsetInt = this.offsetInt }

      if (pageSize) { param.pageSize = pageSize } else { pageSize = 10 }

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
      param.findActLikeYn = false
      param.findActStarYn = false
      param.DESCYn = true

      if (this.targetCKey !== undefined && this.targetCKey !== null && this.targetCKey !== '') {
        param.targetContentsKey = this.targetCKey
        param.DESCYn = this.loadMoreDESCYn
      }

      /* if (this.readCheckBoxYn) { //읽지않음 읽음
      param.findLogReadYn = false
    } */
      if (this.viewTab === 'N') {
        param.creTeamKey = this.chanDetailKey
      } else if (this.viewTab === 'L') {
        param.creTeamKey = this.chanDetailKey
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.creTeamKey = this.chanDetailKey
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'M') {
        param.creTeamKey = this.chanDetailKey
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
          param.ownUserKey = this.GE_USER.userKey
        }
      }
      // console.log('param')
      // console.log(param)
      var result = await this.$getContentsList(param)
      // // console.log(result)
      /* if (result.empty) {
        this.$refs.pushListChangeTabLoadingComp.loadingRefHide()
      } */
      var resultList = result
      return resultList
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
      // param.parentAttachTrueFileList = this.attachTrueFileList
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
    changeMainTab (tab) {
      this.viewMainTab = tab
      this.offsetInt = 0
      /* var jobkindId = 'ALIM'
      if (this.chanAlimYn) {
        this.GE_CHANNEL_DETAIL.ELEMENTS.commonList.list = []
        if (tab === 'B') jobkindId = 'BOAR'
        this.GE_CHANNEL_DETAIL.ELEMENTS.commonList.type = jobkindId
      } */
      this.refreshList()
      this.$emit('changeMainTab', tab)
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
      var paramMap = new Map()
      paramMap.set('targetKey', contentsKey)
      paramMap.set('ownUserKey', this.GE_USER.userKey)
      paramMap.set('jobkindId', 'ALIM')
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMCabContentsList',
        param: Object.fromEntries(paramMap)
      })
      if (result.data.length > 0) {
        return true
      } else {
        return false
      }
      //
    },
    targetContentScrollMove (wich) {
      this.$emit('targetContentScrollMove', wich)
    },
    async chanAlimScrollMove (wich) {
      await this.$nextTick(() => {
        // this.scrollMove(wich)
        var ScrollWrap = this.$refs.pushListWrapWrapCompo
        if (wich === undefined || wich === null || wich === '') { wich = 0 }
        ScrollWrap.scrollTo({ top: wich, behavior: 'smooth' })
      })
    },
    findPaddingTopPush () {
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.paddingTop = element.clientHeight + 55
      }
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
      this.targetCKey = null
      this.loadMoreDESCYn = true
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.changeMainTab('P')
      this.changeTab('N')
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.$refs.activeBar.switchtab(0)
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 800)
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
      // // console.log(this.getAbsoluteTop(element))
      // this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      if (element) {
        this.firstContOffsetY = this.getAbsoluteTop(element)
        // // console.log(this.firstContOffsetY)
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
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pSize = Number(this.offsetInt) * 10
      }
      this.targetCKey = null
      this.loadMoreDESCYn = true
      var resultList = await this.getPushContentsList(pSize, 0)
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      this.endListSetFunc(resultList)
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail
      if (this.viewMainTab === 'P') {
        newArr = [
          ...this.alimContentsList,
          ...resultList.content
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
          // console.log('!!!!!!!!!!!!!!!!!!!!!')
          // console.log(contentDetail)

          if (!cont.D_MEMO_LIST) {
            cont.D_MEMO_LIST = cont.memoList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          }
        }
      } else {
        newArr = [
          ...this.boardContentsList,
          ...resultList.content
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
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          } else {
            // eslint-disable-next-line no-redeclare
            var newArr = [
              ...contentDetail.D_MEMO_LIST,
              ...cont.memoList
            ]
            // eslint-disable-next-line no-redeclare
            var newList = this.replaceMemoArr(newArr)
            cont.D_MEMO_LIST = newList
            this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
          }
        }
      }
    },
    endListSetFunc (resultList) {
      // console.log('result')
      // console.log(resultList)
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
      // console.log(this.endListYn, '', this.offsetInt)
    },
    async loadMore (descYn) {
      // console.log('this.canLoadYn' + this.canLoadYn + 'this.endListYn' + this.endListYn)
      if (this.canLoadYn && this.endListYn === false) {
        this.loadMoreDESCYn = descYn
        this.canLoadYn = false
        var resultList = await this.getPushContentsList()
        // console.log(resultList.contnet)
        var newArr = []
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        if (descYn) {
          if (this.viewMainTab === 'P') {
            newArr = [
              ...this.alimContentsList,
              ...resultList.content
            ]
            this.alimContentsList = this.replaceArr(newArr)
          } else {
            newArr = [
              ...this.boardContentsList,
              ...resultList.content
            ]
            this.boardContentsList = this.replaceArr(newArr)
          }
        } else {
          if (this.viewMainTab === 'P') {
            newArr = [
              ...resultList.content,
              ...this.alimContentsList
            ]
            this.alimContentsList = this.replaceArr(newArr)
          } else {
            newArr = [
              ...resultList.content,
              ...this.boardContentsList
            ]
            this.boardContentsList = this.replaceArr(newArr)
          }
        }
        await this.endListSetFunc(resultList)
        this.contentsList = this.replaceArr(newArr)
        this.canLoadYn = true
        // console.log('this.offsetInt' + this.offsetInt)
        this.$emit('numberOfElements', resultList.totalElements)
        // if (this.targetContentsKey !== undefined && this.targetContentsKey !== null && this.targetContentsKey !== '') {
        //   var a = this.$refs.pushListChangeTabLoadingComp.contentsWich(this.targetContentsKey)
        //   // console.log(a)
        //   // console.log(a)
        //   // console.log(a)

        //   this.scrollMove(a + 1000)
        // }
      } else {
        this.$refs.pushListChangeTabLoadingComp.loadingRefHide()
      }
    },
    closeSearchPop () {
      this.findPopShowYn = false
    },
    openPop (value) {
      this.$emit('openPop', value)
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    // showToastPop (msg) {
    //   this.$emit('showToastPop', msg)
    // },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    async changeTab (tabName) {
      this.targetCKey = null
      /* if (this.viewTab !== tabName) {
        this.readCheckBoxYn = false
      } */
      this.viewTab = tabName

      this.offsetInt = 0
      this.emptyYn = false
      var resultList = await this.getPushContentsList()
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      var newArr = []
      if (this.viewMainTab === 'P') {
        newArr = [
          // ...this.alimContentsList,
          ...resultList.content
        ]
        this.alimContentsList = this.replaceArr(newArr)
      } else {
        newArr = [
          // ...this.boardContentsList,
          ...resultList.content
        ]
        this.boardContentsList = this.replaceArr(newArr)
      }
      this.findPopShowYn = false
      this.introPushPageTab()
      this.scrollMove()
    },
    scrollMove (wich) {
      // console.log('scrollMove : ' + wich)
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      if (wich === undefined || wich === null || wich === '') { wich = 0 }
      ScrollWrap.scrollTo({ top: wich - 90, behavior: 'smooth' })
    },

    /* 검색 */
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
      this.targetCKey = null
      var resultList = await this.getPushContentsList(10, 0)
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      var newArr = []
      if (this.viewMainTab === 'P') {
        newArr = [
          ...this.alimContentsList,
          ...resultList.content
        ]
        this.alimContentsList = this.replaceArr(newArr)
      } else {
        newArr = [
          ...this.boardContentsList,
          ...resultList.content
        ]
        this.boardContentsList = this.replaceArr(newArr)
      }

      this.endListSetFunc(resultList)
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
      this.targetCKey = null
      var resultList = await this.getPushContentsList(pageSize, this.offsetInt)
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      var newArr = []
      if (this.viewMainTab === 'P') {
        newArr = [
          ...this.alimContentsList,
          ...resultList.content
        ]
        this.alimContentsList = this.replaceArr(newArr)
      } else {
        newArr = [
          ...this.boardContentsList,
          ...resultList.content
        ]
        this.boardContentsList = this.replaceArr(newArr)
      }
      this.endListSetFunc(resultList)
    },
    /* 이미지 다운로드 */
    imgLongClick (param) {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.alertPopId = 'imgDetailAlertPop' + history.length
      history.push(this.alertPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      // console.log(this.$store.getters['D_HISTORY/hStack'])
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
          var result = await this.$downloadFile(this.selectImgObject.fileKey, this.selectImgObject.path)
          console.log(result)
        }
        this.errorText = '저장되었습니다!'
        this.backClick()
        this.failPopYn = true
      } catch (error) {
        // console.log(error)
      }
    }
  },
  data () {
    return {
      alimContentsList: [],
      boardContentsList: [],
      paddingTop: 0,
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
      /* stickerList: [], */
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 만든', name: 'M' }],
      viewTab: 'N',
      viewMainTab: 'P',
      commonListData: [],
      findKeyList: {},
      resultSearchKeyList: [],
      scrollCheckSec: 0,
      axiosResultTempList: [],
      /* readCheckBoxYn: false, */
      currentTabName: '최신',
      emptyYn: true,
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
      confirmType: 'timeout'
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
.mainTabStyle {border-radius: 10px 10px 0 0; min-width: 80px; margin-bottom: -1px; float: left; border: 1px solid #6768A7;  border-bottom: none; background: rgba(186, 187, 215, 0.5); padding: 5px 10px; margin-left: 10px;}
.mainTabActive {background: #FFF!important; border-bottom: none;}
.pushListHeader {
    width: 100%;
    /* min-height: 132px; */
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

</style>
