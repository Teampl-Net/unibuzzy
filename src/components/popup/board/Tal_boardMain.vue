<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <!-- <div :class="{popHeight :popYn == true}" style="position: absolute; top:0;left:0; z-index:9999; height: calc(100vh - 120px); position: absolute; top:0;left:0;background-color:white;"> -->
  <div class="" style=" height: 100vh; background-color: #ece6cc; width:100vw; position: relative;">
    <div class= "pageHeader pushListCover" style="margin:0 1rem" ></div>
    <div class="pagePaddingWrap summaryWrap">
          <!-- 전체/지정(공유사람수) / 게시글(개수) / 권한(관리자/일반-아이콘) -->
          <div class="summaryTop" >
            <p class="cBlack fl font16" style="width: 100%; height: 30px; border-right: 1px solid white">공유 {{mCabinetContentsDetail.shareCnt}}명</p>
            <p class="cBlack fl" style="width: 100%; height: 30px; font-size: 16px; border-right: 1px solid white">게시글 {{mCabContentsList.length}}개</p>
            <!-- 관리자 여부 확인 -->
            <!-- <div v-if="this.propData.value.adminYn" class="fl" style="width: 100%; height: 30px; display: flex; align-items: center; justify-content: center;"> -->
            <div class="fl" style="width: 100%; height: 30px; display: flex; align-items: center; justify-content: center;">
              <p class="cBlack fl font16" style="width: 60px; height: 100%;">관리자</p>
              <div class="fl" style="background-color: #fff; width: 20px; height: 20px; border-radius: 100%;"></div>
            </div>
          </div>
          <!-- 게시판 이름 , 소속 채널 -->
          <div style="padding: 0 10px; width: 100%; height: 80px; background-color: rgba(255, 255, 255, 0.7); font-size: 22px; font-weight: bold; display: flex; align-items: center; border-radius: 10px;">
            <p class="cBlack fl font20" style="width: 100%; height: 50px; line-height: 50px;">{{ this.$changeText(mCabinetContentsDetail.cabinetNameMtext)}}</p>
            <p class="fl font14 cBlack" style="width: 100%; height: 50px; line-height: 50px; color: gray">{{ this.$changeText(this.propData.nameMtext) }}</p>
          </div>
          <!-- 익명게시판 여부 -->
          <div v-if="mCabinetContentsDetail.blindYn" style="width: 100%; font-size: 16px; margin-top: 10px;">익명게시판</div>
      </div>

    <div class="pagePaddingWrap" style="padding-top: 10px; width: 100%; float: left; background: #FFF;">
      <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      <transition name="showModal">
        <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>
      <gActiveBar :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100% - 2rem); margin-left:1rem"/>
      <boardList :commonBoardListData="this.mCabContentsList" />
    </div>
  <div class="btnPlus" @click="btnWriteBoard" ><p style="font-size:40px;">+</p></div>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import findContentsList from '../Tal_findContentsList.vue'
import boardList from '../../boardList/Tal_commonBoardList.vue'
import findContentsList from '../Tal_findContentsList.vue'
export default {
  components: {
    findContentsList,
    boardList
    // searchResult
  },
  props: {
    propData: {}
  },
  async created () {
    alert(JSON.stringify(this.propData))
    this.$emit('openLoading')
    // await this.getCabinetDetail()
  },
  mounted () {
    // alert(true)
    // alert(JSON.stringify(this.propData))
  },
  data () {
    return {
      shareAuth: { R: false, W: false, V: false },
      mCabinetContentsDetail: {
        blindYn: true,
        fileYn: false,
        replyYn: false,
        shareCnt: 0,
        cabinetNameMtext: 'KO$^$안녕게시판'
      },
      offsetInt: 0,
      mCabContentsList: [
        // { title: 'test', bodyMinStr: 'testtesttesttest' },
        // { title: 'test', bodyMinStr: 'testtesttesttest' },
        // { title: 'test', bodyMinStr: 'testtesttesttest' }
      ],
      scrollPosition: null,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      subHistoryList: [],

      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      findKeyList: {},
      resultSearchKeyList: []
    }
  },
  methods: {
    btnWriteBoard () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeBoard'
      params.targetNameMtext = this.propData.nameMtext
      params.currentTeamKey = this.propData.currentTeamKey
      params.cabinetKey = this.propData.targetKey
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
      alert(JSON.stringify(resultList))
      // mShareItemList가 잘 들어오면 save잘 된것
      this.mCabinetContentsDetail = resultList.mCabinet
      // eslint-disable-next-line no-unused-vars
      this.shareAuth = this.$checkUserAuth(this.mCabinetContentsDetail.mShareItemList)
      // eslint-disable-next-line no-debugger
      debugger
      // alert(JSON.stringify(this.mCabinetContentsDetail)
      this.findPopShowYn = false
      var result = await this.getContentsList()
      this.mCabContentsList = result.content
      // eslint-disable-next-line no-debugger
      this.$emit('closeLoading')
    },
    async getContentsList (pageSize, offsetInput) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      /* if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
      } */
      param.cabinetKey = this.propData.targetKey
      // alert(offsetInt)
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
      /* if (this.findKeyList) {
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          param.title = this.findKeyList.searchKey
        } if (this.findKeyList.creTeamNameMtext !== undefined && this.findKeyList.creTeamNameMtext !== null && this.findKeyList.creTeamNameMtext !== '') {
          param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          param.toCreDateStr = this.findKeyList.toCreDateStr
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          param.fromCreDateStr = this.findKeyList.fromCreDateStr
        }
      } */
      param.jobkindId = 'BOAR'
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      /* if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'R') {
        param.findLogReadYn = false
      } */
      // alert(JSON.stringify(param))
      var resultList = await this.$getContentsList(param)
      // eslint-disable-next-line no-debugger
      debugger
      return resultList
    },
    closeSearchPop () {
      this.findPopShowYn = false
      this.subHistoryList.splice(-1, 1)
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      // if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
      //   params.targetType = value.targetType
      // } else {
      //   params.targetType = 'pushDetail'
      // }
      params = value
      // if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      // if (value.nameMtext !== undefined && value.teamName !== null && value.teamName !== '') { params.chanName = value.teamName }
      this.$emit('openPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },

    changeTab (tabName) {
      // this.$emit('openLoading')
      this.viewTab = tabName
      this.getCabinetDetail()
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
      await this.getCabinetDetail()
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
      } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      await this.getCabinetDetail()
    },
    async loadMore () {
      // console.log('옵저버 실행'+(this.offsetInt++))
      // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@여기에 추가아아~~~~~~~~~@@@@@@@@@@@@@@@@@
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.chanDetailKey !== undefined && this.chanDetailKey !== null && this.chanDetailKey !== '') {
        param.creTeamKey = this.chanDetailKey
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
      param.findActYn = false
      param.findActLikeYn = false
      param.findActStarYn = false
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      } else if (this.viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      } else if (this.viewTab === 'R') {
        param.findLogReadYn = false
      }

      // param.offsetInt = this.offsetInt++
      param.offsetInt = (this.offsetInt + 1)
      param.pageSize = 10

      // var resultList = await this.$getContentsList(param)

      // const newArr = [
      //   ...this.commonListData,
      //   ...resultList.content
      // ]
      // this.commonListData = newArr
      this.findPopShowYn = false
    }
  }
}
</script>

<style scoped>
.summaryWrap{height: calc(35vh); width: 100%; float: left; }
.summaryTop{width: 100%; height: 30px; line-height: 30px; padding: 0 10px; margin-bottom: 5px; display: flex; justify-content: space-around;}
.centerSpace{width: 100%; height: 30%;}
.summaryBottom{align-self: center; height: 30%; background-color: rgba(0, 0, 0, 0.26); color: #FFF;}
.summaryBottom p {color: #fff;}

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
