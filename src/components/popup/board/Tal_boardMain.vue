<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <!-- <div :class="{popHeight :popYn == true}" style="position: absolute; top:0;left:0; z-index:9999; height: calc(100vh - 120px); position: absolute; top:0;left:0;background-color:white;"> -->
  <div id="boardWrap" :style="mCabinetContentsDetail.picBgPath? 'background: ' + mCabinetContentsDetail.picBgPath + ';' : 'background: #ece6cc;'" style="overflow: scroll;" class="boardListWrap">
    <div id="summaryHeader" class="summaryHeader" style="height: 350px; width: 100%; position: fixed; float: left;" >
      <div id="boardInfoSummary" class="mt-header boardWhiteBox">
        <div class="summaryTop">
          <!-- 전체/지정(공유사람수) / 게시글(개수) / 권한(관리자/일반-아이콘) -->
          <p class="cBlack fl font16" style="width: 100%; height: 30px;">공유 {{mCabinetContentsDetail.mShareItemCnt}}명</p>
          <p class="cBlack fl" style="width: 100%; height: 30px; font-size: 16px; border-left: 1px solid white">게시글 {{totalElements}}개</p>
          <!-- 관리자 여부 확인 -->
          <!-- <div v-if="this.propData.value.adminYn" class="fl" style="width: 100%; height: 30px; display: flex; align-items: center; justify-content: center;  border-left: 1px solid white"> -->
          <div class="fl boardMainAdminArea"  v-if="this.propData.value.adminYn" style="">
            <p class="fl font16 fontBold cBlack" style="text-align: left;width: 50px; height: 100%;" >관리자</p>
            <img src="../../../assets/images/common/icon_manager_tie.svg" class="fl" style="width: 15px; height: 15px;" />
            <!-- <div class="fl" style="background-color: #fff; width: 20px; height: 20px; border-radius: 100%;"></div> -->
          </div>
        </div>
        <!-- 게시판 이름 , 소속 채널 -->
        <div style="padding: 0 10px; width: 90%; min-height: 80px; background-color: rgba(255, 255, 255, 0.7); font-size: 22px; font-weight: bold; display: flex; align-items: center; border-radius: 10px;">
          <p class="cBlack fl font20" style="width: 100%; ">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</p>
          <p class="fl font16 cBlack" style="width: 100%;  color: gray">{{ this.$changeText(this.propData.nameMtext) }}</p>
        </div>
        <!-- 익명게시판 여부 -->
        <div v-if="mCabinetContentsDetail.blindYn === 1" style="width: 100%; font-size: 16px; margin-top: 10px; margin-bottom: 20px; ">익명게시판</div>
      </div>
      <div id="boardInfoSummary2" class="summaryHeader2" style="">
        <span class="font20 fontBold">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</span>
        <span class="font13 mbottom-05 fl">{{ this.$changeText(this.propData.nameMtext) }}</span>
      </div>
    </div>

    <div class="boardItemBox" id="boardItemBox" style="overflow: hidden; padding: 0px 1.5rem; position: relative; min-height: calc(100% - 250px); width: 100%;  margin-top: 350px; float: left; background: #FFF;">
      <!-- <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll"> -->
      <div class="" id="boardListWrap" ref="boardListWrapCompo" style="position: relative; float: left; width: 100%; overflow: hidden scroll; height: 100%; ">
        <transition name="showModal">
          <findContentsList :contentsListTargetType="'boardMain'" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
        </transition>
        <div id="commonBoardListHeader" ref="boardListHeader" class="boardListHeader" :class="this.scrolledYn? 'boardListHeader--unpinned': 'boardListHeader--pinned'" v-on="handleScroll" >
          <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
          <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100%);"/>
        </div>
        <div class="commonBoardListWrap" ref="commonBoardListWrapCompo">
          <boardList ref="boardListCompo" @moreList="loadMore" @goDetail="goDetail" :commonBoardListData="this.mCabContentsList"  style=" margin-top: 5px; float: left;"  @refresh='refresh' />
        </div>
        <!-- <div style="width: 100%; height: 200px; background: #ccc; position: fixed; bottom: 0;">{{this.firstContOffsetY}}, {{scrollDirection}}, {{this.newScrollPosition}}</div> -->
      </div>
    </div>
    <div :class="this.scrolledYn || !this.reloadShowYn ? 'reload--unpinned': 'reload--pinned'" v-on="handleScroll" style="position: fixed; width: 50px; height: 50px; border-radius: 100%; background: rgba(103, 104, 167, 0.5); padding: 10px; bottom: 2rem; right: calc(50% - 25px);" @click="refreshAll">
      <img src="../../../assets/images/common/reload_button.svg" style="width: 30px; height: 30px;">
    </div>
  <div class="btnPlus" @click="openWriteBoard" v-if="this.shareAuth.W === true" ><p style="font-size:40px;">+</p></div>
</div>
<gConfirmPop :confirmText='errorBoxText' confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
</template>
<script>
// import findContentsList from '../Tal_findContentsList.vue'
import boardList from '../../boardList/Tal_commonBoardList.vue'
import findContentsList from '../common/Tal_findContentsList.vue'
export default {
  components: {
    findContentsList,
    boardList
  },
  props: {
    propData: {}
  },
  async created () {
    this.$emit('openLoading')
    await this.getCabinetDetail()
    var resultList = await this.getContentsList()
    this.mCabContentsList = resultList.content
    if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
      this.endListYn = true
    } else {
      this.endListYn = false
    }
    // console.log(this.mCabContentsList)
    //
    // cothis.mCabContentsList
  },
  mounted () {
    this.boardListWrap = document.getElementById('boardListWrap')
    this.boardListWrap.addEventListener('scroll', this.saveScroll)
    this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]
    this.listBox.addEventListener('scroll', this.handleScroll)
  },
  updated () {
    this.boardListWrap.scrollTop = this.currentScroll
    this.listBox = document.getElementsByClassName('commonBoardListWrap')[0]

    // eslint-disable-next-line no-unused-vars
    this.box = document.getElementById('boardWrap') // 이 dom scroll 이벤트를 모니터링합니다
    this.box.addEventListener('scroll', this.updateScroll)
    this.box.addEventListener('mousewheel', e => {
      this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
    })
  },
  data () {
    return {
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }, { display: '내가 쓴', name: 'M' }],
      listBox: null,
      firstContOffsetY: null,
      scrolledYn: false,
      reloadShowYn: false,
      errorBoxYn: false,
      errorBoxText: '',
      box: null,
      totalElements: 0,
      scrollDirection: null,
      scrollPosition: null,
      shareAuth: { R: true, W: true, V: true },
      mCabinetContentsDetail: {
        blindYn: true,
        fileYn: false,
        replyYn: false,
        shareCnt: 0,
        cabinetNameMtext: 'KO$^$'
      },
      mCabContentsList: [],
      offsetInt: 0,
      endListYn: false,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      actorList: [],
      /* subHistoryList: [], */
      viewTab: 'N',
      findKeyList: {},
      resultSearchKeyList: []
    }
  },
  methods: {
    async refreshAll () {
      // 새로고침
      this.$emit('openLoading')
      this.findKeyList.searchKey = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
      this.changeTab('N')
      var ScrollWrap = this.$refs.commonBoardListWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
      this.$refs.activeBar.switchtab(0)
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var element = document.getElementsByClassName('commonBoardListContentBox')[0]
      var parentElement = element.parentElement
      this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)

      // var test = document.getElementById('boardPageHeader')
      // parentElement = element.parentElement
      // this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
      // var test = this.firstContOffsetY
      if (this.firstContOffsetY < 0) {
        if (this.listBox.scrollTop > this.scrollPosition) {
          this.scrollDirection = 'down'
          this.scrolledYn = true
        } else if (this.listBox.scrollTop <= this.scrollPosition) {
          this.scrollDirection = 'up'
          this.scrolledYn = false
        }
      }
      this.scrollPosition = this.listBox.scrollTop
    },
    // handleScroll () {
    //   var element = document.getElementsByClassName('boardRow')[0]
    //   var parentElement = element.parentElement
    //   this.firstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)

    //   var test = document.getElementById('commonBoardListHeader')
    //   parentElement = element.parentElement
    //   this.headerTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
    //   if (this.firstContOffsetY < 0) {
    //     if (this.newBox.scrollTop > this.newScrollPosition) {
    //       this.scrolledYn = true
    //     } else if (this.box.scrollTop <= this.newScrollPosition) {
    //       this.scrolledYn = false
    //     }
    //   }
    //   this.newScrollPosition = this.newBox.scrollTop
    // },
    async refresh () {
      var pSize = 10
      if (this.offsetInt !== 0 && this.offsetInt !== '0' && Number(this.offsetInt) > 0) {
        pSize = Number(this.offsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getContentsList(pSize, 0)
      this.mCabContentsList = resultList.content
      this.endList = false
      this.$refs.boardListCompo.loadingRefHide()
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryHeader')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }

      this.scrollPosition = this.box.scrollTop

      if (this.scrollDirection === 'down' && this.scrollPosition > 250) {
        blockBox.style.height = 50 + 'px'
        // blockBox.scrollHeight = 100
        document.getElementById('boardInfoSummary').classList.add('displayNIm')
        document.getElementById('boardInfoSummary2').classList.add('displayBIm')
        document.getElementById('boardItemBox').classList.add('boardItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 300) {
        blockBox.style.height = '350px'
        this.box.style.height = ''
        document.getElementById('boardInfoSummary').classList.remove('displayNIm')
        document.getElementById('boardInfoSummary2').classList.remove('displayBIm')
        document.getElementById('boardItemBox').classList.remove('boardItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    openWriteBoard () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeBoard'
      params.actorList = this.actorList
      params.targetNameMtext = this.propData.nameMtext
      params.currentTeamKey = this.propData.currentTeamKey
      params.cabinetNameMtext = this.$changeText(this.mCabinetContentsDetail.cabinetNameMtext)
      params.cabinetKey = this.mCabinetContentsDetail.cabinetKey
      params.value = this.mCabinetContentsDetail
      this.$emit('openPop', params)
    },
    async getCabinetDetail () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // var tt = this.propData
      param.currentTeamKey = this.propData.currentTeamKey
      param.cabinetKey = this.propData.targetKey
      var resultList = await this.$getCabinetDetail(param)
      // mShareItemList가 잘 들어오면 save잘 된것

      this.mCabinetContentsDetail = resultList.mCabinet
      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-unused-vars
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!his.mCabinetContentsDetail')
      console.log(this.mCabinetContentsDetail)
      if (this.propData.ownerYn === 1) {
        this.shareAuth.R = true
        this.shareAuth.W = true
        this.shareAuth.V = true
      } else {
        this.shareAuth = this.$checkUserAuth(this.mCabinetContentsDetail.mShareItemList)
      }
      console.log('this.mCabinetContentsDetail.mShareItemList')
      console.log(this.mCabinetContentsDetail.mShareItemList)

      console.log('this.shareAuth')
      console.log(this.shareAuth)
      /* if (this.shareAuth.V === false) {
        this.$emit('closeXPop')
      } */
      // this.actorList = this.mCabinetContentsDetail.mShareItemList
      this.findPopShowYn = false
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    async getContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      } */
      param.cabinetKey = this.propData.targetKey
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
      console.log(this.findKeyList)
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
      param.jobkindId = 'BOAR'
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey

      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      // } else if (this.viewTab === 'R') {
      //   param.findLogReadYn = false
      // }
      } else if (this.viewTab === 'M') {
        param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      }
      var resultList = await this.$getContentsList(param)

      this.totalElements = resultList.totalElements
      return resultList
    },
    closeSearchPop () {
      this.findPopShowYn = false
      /* this.subHistoryList.splice(-1, 1) */
    },
    goDetail (value) {
      if (this.shareAuth.V === false) {
        this.errorBoxText = '권한이 없습니다.'
        this.errorBoxYn = true
      } else {
        // value.functions = [{replyYn:this.propData.value.replyYn},{fileYn:this.propData.value.fileYn},{blindYn:this.propData.value.blindYn}]
        value.replyYn = this.mCabinetContentsDetail.replyYn
        value.fileYn = this.mCabinetContentsDetail.fileYn
        value.blindYn = this.mCabinetContentsDetail.blindYn
        value.shareAuth = this.shareAuth
        value.value = this.mCabinetContentsDetail
        this.openPop(value)
      }
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      // var params = new Object()
      // if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
      //   params.targetType = value.targetType
      // } else {
      //   params.targetType = 'pushDetail'
      // }
      // params = value
      // if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      // if (value.nameMtext !== undefined && value.teamName !== null && value.teamName !== '') { params.chanName = value.teamName }
      this.$emit('openPop', value)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },

    async changeTab (tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.$refs.boardListCompo.loadingRefShow()
      this.offsetInt = 0
      // this.mCabContentsList = []
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      // this.$refs.boardListCompo.loadingRefHide()
      this.scrollMove()
    },
    scrollMove () {
      var ScrollWrap = this.$refs.commonBoardListWrapCompo
      ScrollWrap.scrollTo({ top: 0, behavior: 'smooth' })
    },
    async requestSearchList (param) {
      console.log(param)
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
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      this.findPopShowYn = false
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
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
      } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      // await this.getCabinetDetail()
      var resultList = await this.getContentsList()
      this.mCabContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
      // await this.getCabinetDetail()

      this.findPopShowYn = false
    },
    async loadMore (pageSize) {
      if (this.endListYn === false || this.totalElements > pageSize) {
        var resultList = await this.getContentsList()
        const newArr = [
          ...this.mCabContentsList,
          ...resultList.content
        ]
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.endListYn = true
        } else {
          this.endListYn = false
        }
        this.mCabContentsList = newArr
      } else {
        this.$refs.boardListCompo.loadingRefHide()
      }
      this.findPopShowYn = false
    }
  },
  computed: {
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    }
  }
}
</script>

<style scoped>
.boardMainAdminArea{
  width: 100%; height: 30px; display: flex; align-items: center; justify-content: center; border-left: 1px solid white; background: rgba(255, 255, 255, 0.5); border-radius: 10px; margin-right: calc(5% - 10px)
}
.commonBoardListWrap{width: 100%; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; height: 100%;}
.reload--pinned {
    transform: translateY(0%);
    transition: .3s;
}
.reload--unpinned {
    transform: translateY(10rem);
    transition: .5s;
}
.summaryHeader{height: 350px; width: 100%; float: left; position: fixed;}
.summaryHeader2 {height: 50px;  width: 100%; float: left;}
.boardListHeader {
  width: 100%;
  min-height: 132px;
  position: absolute;
  background-color: #FFF;
  top: 0;
  /* left: 0; */
  z-index: 9;
  will-change: transform;
  transition: transform 0.3s linear;
}
.boardListHeader--pinned {
    transform: translateY(0%);
}
.boardListHeader--unpinned {
    transform: translateY(-100%);
}

#boardInfoSummary2{width: 100%; padding-top: 0; height: 100%; display: none; flex-direction: column; float: left}
.boardListWrap{
  height: 100vh;
  background-size: cover;
}
.boardWhiteBox{ display: flex; flex-direction: column;align-items: center; position: relative; width: 100%; height: 350px; }
.boardItemBox{background-color: #fff; position: relative; width: 100%;float: left; box-sizing: border-box;}
.boardItemBoxHeight{height: calc(100% - 50px)!important;}
.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
.summaryWrap{height: calc(35vh); width: 100%; float: left; position: fixed;}
.summaryTop{width: 100%; height: 30px; line-height: 30px; padding: 0 10px; margin-top: 30px; margin-bottom: 10px; display: flex; justify-content: space-around;}
.centerSpace{width: 100%; height: 30%;}
.summaryBottom{align-self: center; height: 30%; background-color: rgba(0, 0, 0, 0.26); color: #FFF;}
.summaryBottom p {color: #fff;}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}

.pushListCover{min-height: 3.6rem; margin-bottom: 1rem}

/* .stickerWrap{width: 100%; overflow-x: scroll; overflow-y: hidden;} */
.stickerFrame{min-width: 100%;  width: var(--stickerDivWidth); height: 40px;}
.stickerDiv p {line-height: 20px;}

.popHeight{
  padding-right: 0; padding-left: 0;
  height: calc(100vh - 35px) !important;
}

.menuHeader {padding-top:0.5rem; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{font-size: 16px; text-align: center; line-height: 2.5rem;}
.menuHeader img{ width: 0.8rem; line-height: 50px;}

.summaryIconChange{
  background-color: rgba(0, 0, 0, 0.26); color: white;
}

</style>
