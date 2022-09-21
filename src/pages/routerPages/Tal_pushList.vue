<template>
  <!-- <div id="pushListWrap" style="height: 100vh; width: 100%; overflow: scroll; background-color: white; background-size: cover;"> -->
    <!-- <div class="pageHeader pushListCover"> -->
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
          <commonList @makeNewContents="makeNewContents" @moveOrCopyContent="moveOrCopyContent" @goDetail="openPop" @imgLongClick="imgLongClick" @clickImg="openImgPreviewPop" :targetContentsKey="targetCKey" ref='pushListChangeTabLoadingComp' :imgUrl="this.imgUrl" @openLoading="this.loadingYn = true" @refresh="refreshList" style="padding-bottom: 20px; margin-top: 0px;" :alimListYn="this.alimListYn" :commonListData="this.commonListData" @moreList="loadMore" @topLoadMore="loadMore" @scrollMove="scrollMove" @targetContentScrollMove="targetContentScrollMove" @showToastPop="showToastPop" @openPop="openUserProfile" />
          <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && commonListData.length === 0 "/>
        </div>
        <!-- <div v-on="handleScroll" :style="alimListYn ? 'bottom: 7rem;' : 'bottom: 2rem;' " style="position: absolute; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; right: calc(10% + 7px);" @click="refreshAll"> -->
        <div v-on="handleScroll" style="position: absolute; top:5px; right:1rem; z-index:99; width: 30px; height: 30px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); display: flex; align-items: center; justify-content: center; " @click="refreshAll">
          <img src="../../assets/images/common/reload_button.svg" class="cursorP img-w20" />
        </div>
        <imgPreviewPop :mFileKey="this.selectImgParam.mfileKey" :startIndex="selectImgParam.imgIndex" @closePop="this.backClick()" v-if="previewPopShowYn" style="width: 100%; height: calc(100%); position: fixed; top: 0px; left: 0%; z-index: 999999; padding: 20px 0; background: #000000;" :contentsTitle="selectImgParam.title" :creUserName="selectImgParam.creUserName" :creDate="selectImgParam.creDate"  />
        <imgLongClickPop @closePop="backClick" @clickBtn="longClickAlertClick" v-if="imgDetailAlertShowYn" />
        <gSelectBoardPop :type="this.selectBoardType" @closeXPop="closeSelectBoardPop" v-if="selectBoardPopShowYn" :boardDetail="boardDetailValue" />
        <!-- <cancelPop/> -->
    </div>
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
    isOpen: {}
  },
  created () {
    this.$emit('changePageHeader', '알림')
    this.loadingYn = true
    this.$emit('changePageHeader', '알림')
    if (this.propData) {
      if (this.propData.alimTabType !== undefined && this.propData.alimTabType !== null && this.propData.alimTabType !== '') {
        this.viewMainTab = this.propData.alimTabType
      }
    }
    console.log(this.targetContents)
    if (this.targetContents !== undefined && this.targetContents !== null && this.targetContents !== '') {
      this.targetCKey = this.targetContents.targetContentsKey
      if (this.targetContents.jobkindId === 'BOAR') {
        this.viewMainTab = 'B'
      }
    }
    this.getPushContentsList().then(response => {
      this.commonListData = response.content
      if (this.reloadShowYn !== undefined && this.reloadShowYn !== null && this.reloadShowYn !== '') {
        this.pushListReloadShowYn = this.reloadShowYn
      } else {
        this.pushListReloadShowYn = true
      }
      if (this.popYn === false) {
        localStorage.setItem('notiReloadPage', 'none')
      }
      this.findPopShowYn = false
      if (this.readySearchList) {
        this.requestSearchList(this.readySearchList)
      }
      this.introPushPageTab()
      if (this.targetCKey) {
        this.getMCabContYn(this.targetCKey).then(Response => { // 수정해야함꼭!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!20220908수민
        /* if (Response !== true) {
          this.errorText = '해당 컨텐츠를 열람할 수 있는 권한이 없습니다'
          this.failPopYn = true
          this.targetCKey = null
        } */
        })
        this.canLoadYn = true
        this.loadMore(true)
      }
      this.scrolledYn = false
      if (this.commonListData.length > 0) {
        this.canLoadYn = true
      }
    })
  },

  updated () {
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
  },
  mounted () {
    this.box = document.getElementsByClassName('pushListWrapWrap')[0]
    this.box.addEventListener('scroll', this.handleScroll)
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
    /* readCheckBoxYn () {
      this.changeTab(this.viewTab)
    }, */
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  computed: {
    /* calcPaddingTop () {
      var paddingStr = '1px'
      if (!this.popYn) {
        paddingStr = '1rem;'
      }
      return 'padding-top: ' { padding: paddingStr, '--paddingTopLength': (this.paddingTop) + 'px' }
    }, */
    pageUpdate () {
      return this.$store.getters.hUpdate
    },
    historyStack () {
      return this.$store.getters.hRPage
    },
    currentPage () {
      return this.$store.getters.hCPage
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
    makeNewContents (data) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = data.contentsKey
      param.targetType = 'writeBoard'
      param.creTeamKey = data.creTeamKey
      if (data.attachMfilekey) { param.attachMfilekey = data.attachMfilekey }
      // eslint-disable-next-line no-undef
      param.bodyFullStr = Base64.decode(data.bodyFullStr)
      param.UseAnOtherYn = true
      param.selectBoardYn = true
      // eslint-disable-next-line no-debugger
      debugger
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
      console.log('############')
      console.log(params)
      this.$emit('openUserProfile', params)
    },
    changeMainTab (tab) {
      this.viewMainTab = tab
      this.refreshList()
      this.$emit('changeMainTab', tab)
    },
    backClick () {
      var hStack = this.$store.getters.hStack
      var removePage = hStack[hStack.length - 1]
      if (this.alertPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('setRemovePage', removePage)
        this.$store.commit('updateStack', hStack)
        this.imgDetailAlertShowYn = false
      } else {
        this.previewPopShowYn = false
      }
    },
    async getMCabContYn (contentsKey) {
      var paramMap = new Map()
      paramMap.set('targetKey', contentsKey)
      paramMap.set('ownUserKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      paramMap.set('jobkindId', 'ALIM')
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMCabContentsList',
        param: Object.fromEntries(paramMap)
      })
      console.log(result)
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
      this.paddingTop = element.clientHeight + 55
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
      // console.log(this.getAbsoluteTop(element))
      // this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      this.firstContOffsetY = this.getAbsoluteTop(element)
      // console.log(this.firstContOffsetY)
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
    },
    async refreshList () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0') {
        pSize = Number(this.offsetInt) * 10
      }
      this.targetCKey = null
      this.loadMoreDESCYn = true
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
      console.log(this.endListYn, '', this.offsetInt)
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
          if (JSON.parse(JSON.parse(message.pushMessage).noti.data.userDo).targetKind === 'CONT') {
            if (JSON.parse(message.pushMessage).noti.data.actYn === true || JSON.parse(message.pushMessage).noti.data.actYn === 'true') return
            else this.refreshList()
          }
        } else if (message.type === 'pushBar') {
          if (JSON.parse(JSON.parse(message.pushMessage).noti.data.userDo).targetKind === 'CONT') {
            if (JSON.parse(message.pushMessage).noti.data.actYn === true || JSON.parse(message.pushMessage).noti.data.actYn === 'true') return
            else this.refreshList()
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    async loadMore (descYn) {
      console.log('this.canLoadYn' + this.canLoadYn + 'this.endListYn' + this.endListYn)
      if (this.canLoadYn && this.endListYn === false) {
        this.loadMoreDESCYn = descYn
        this.canLoadYn = false
        var resultList = await this.getPushContentsList()
        var newArr = []
        if (descYn) {
          this.axiosResultTempList = resultList.content
          newArr = [
            ...this.commonListData,
            ...this.axiosResultTempList
          ]
        } else {
          console.log('!!!!!!!!!!!!!!!!')
          console.log(resultList.content)
          // eslint-disable-next-line no-array-constructor
          var tempArr = new Array()
          for (var i = 0; i < resultList.content.length; i++) {
            tempArr.unshift(resultList.content[i])
          }
          console.log(tempArr)
          this.axiosResultTempList = tempArr
          newArr = [
            ...this.axiosResultTempList,
            ...this.commonListData
          ]
        }
        this.commonListData = await newArr
        await this.endListSetFunc(resultList)
        this.canLoadYn = true
        console.log('this.offsetInt' + this.offsetInt)
        this.$emit('numberOfElements', resultList.totalElements)
        // if (this.targetContentsKey !== undefined && this.targetContentsKey !== null && this.targetContentsKey !== '') {
        //   var a = this.$refs.pushListChangeTabLoadingComp.contentsWich(this.targetContentsKey)
        //   console.log(a)
        //   console.log(a)
        //   console.log(a)

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
      this.commonListData = resultList.content
      if (this.commonListData.length === 0) this.emptyYn = true
      this.findPopShowYn = false
      this.introPushPageTab()
      this.scrollMove()
    },
    scrollMove (wich) {
      console.log('scrollMove : ' + wich)
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      if (wich === undefined || wich === null || wich === '') { wich = 0 }
      ScrollWrap.scrollTo({ top: wich - 90, behavior: 'smooth' })
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
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      }
      if (this.viewMainTab === 'P') {
        param.jobkindId = 'ALIM'
        param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      } else if (this.viewMainTab === 'B') {
        param.jobkindId = 'BOAR'
        if (this.viewTab === 'N') {
          param.boardYn = true
        } else {
          param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        }
      }

      var result = await this.$getContentsList(param)
      // console.log(result)
      if (result.empty) {
        this.$refs.pushListChangeTabLoadingComp.loadingRefHide()
      }
      var resultList = result
      this.loadingYn = false
      return resultList
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
      this.commonListData = resultList.content
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
      this.commonListData = resultList.content
      this.endListSetFunc(resultList)
    },
    /* 이미지 다운로드 */
    imgLongClick (param) {
      var history = this.$store.getters.hStack
      this.alertPopId = 'imgDetailAlertPop' + history.length
      history.push(this.alertPopId)
      this.$store.commit('updateStack', history)
      console.log(this.$store.getters.hStack)
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
        console.log(error)
      }
    }
  },
  data () {
    return {
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
      canLoadYn: false
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
</style>
