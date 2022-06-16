<template>

<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <!-- <div :class="{popHeight :popYn == true}" style="position: absolute; top:0;left:0; z-index:9999; height: calc(100vh - 120px); position: absolute; top:0;left:0;background-color:white;"> -->
  <div class="pagePaddingWrap" style=" height: 100vh; background-color:white; width:100vw; position: relative;">
    <div class= "pageHeader pushListCover" style="margin:0 1rem" >

      <!-- 유민 -->
      <div id="summaryWrap" class="summaryWrap">
          <div class="summaryTop">
            <!-- <p class="cBlack" style="font-size: 16px;">공유 {{commonListData.mCabinet.len}} | 게시글 21개 </p> -->
            <p class="cBlack" style="font-size: 22px; font-weight: bold;">{{this.$changeText(commonListData.mCabinet.cabinetNameMtext)}}</p>
          </div>
          <div class="centerSpace"></div>
          <div style="display: flex; flex-direction: column; width: 100%; height: 30%;">
            <div class="summaryBottom" style="width: 70%;">
              <p style="margin-right: 10px; float: left">열람</p>
              <p style="margin-right: 10px; float: left">작성</p>
              <p style="float: left">댓글</p>
            </div>
            <p class="summaryBottom" style="margin-top: 15px; width: 60%;">공지게시판</p>
          </div>
            <div style="width: 100%; height: 10%; display: flex; justify-content: flex-start; align-items: center;">
              <!-- <div class="summaryIcon" :class="{summaryIconChange: commonListData.mCabinet.mShareItemList.blindYn }"></div>
              <div class="summaryIcon" :class="{summaryIconChange: commonListData.mCabinet.mShareItemList.replyYn }"></div>
              <div class="summaryIcon" :class="{summaryIconChange: commonListData.mCabinet.mShareItemList.fileYn }" style="margin-right: none !important;"></div> -->
          </div>
      </div>

      <gSearchBox @changeSearchList="changeSearchList" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
      <transition name="showModal">
        <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
      </transition>
    </div>
    <gActiveBar :tabList="this.activeTabList" class="fl mbottom-1" @changeTab= "changeTab"  style=" width:calc(100% - 2rem); margin-left:1rem"/>
  <div class="btnPlus" @click="btnWriteBoard" ><p style="font-size:40px;">+</p></div>
</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import findContentsList from '../Tal_findContentsList.vue'
import findContentsList from '../Tal_findContentsList.vue'
export default {
  components: {
    findContentsList
    // searchResult
  },
  props: {
    propData: {}
  },
  created () {
    this.$emit('openLoading')
    this.getCabinetDetail()
  },
  mounted () {
    // alert(true)
    // alert(JSON.stringify(this.propData))
  },
  methods: {
    btnWriteBoard () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'writeBoard'
      params.targetNameMtext = this.propData.nameMtext
      params.currentTeamKey = this.propData.currentTeamKey
      params.cabinetKey = this.propData.targetKey
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
      // alert(JSON.stringify(resultList))
      this.commonListData = resultList
      // alert(JSON.stringify(this.commonListData))
      console.log(this.commonListData)
      this.findPopShowYn = false
      // debugger
      // this.userDoList = resultList.userDo
      this.$emit('closeLoading')
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
    },

    closeSearchPop () {
      this.findPopShowYn = false
      this.subHistoryList.splice(-1, 1)
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      // alert(value)
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
    async updateScroll () {
      this.ay = this.a.scrollTop
    }
  },
  data () {
    return {
      summaryIconYn: false,
      offsetInt: 1,
      a: '',
      ay: '',

      scrollPosition: null,
      loadVal: true,
      pageHistoryName: '',
      findPopShowYn: false,
      subHistoryList: [],

      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      commonListData: {
        mCabinet: [
          {
            cabShareKey: 24,
            cabinetKey: 10527,
            cabinetNameMtext: 'KO$^$게시판안녕',
            creDate: '2022-06-13T05:55:11.000+00:00',
            deleteYn: 0,
            mShareItemList: [
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: true,
                replyYn: false,
                fileYn: true
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              }
            ]
          },
          {
            cabShareKey: 24,
            cabinetKey: 10527,
            cabinetNameMtext: 'KO$^$게시판안녕',
            creDate: '2022-06-13T05:55:11.000+00:00',
            deleteYn: 0,
            mShareItemList: [
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              }
            ]
          },
          {
            cabShareKey: 24,
            cabinetKey: 10527,
            cabinetNameMtext: 'KO$^$게시판안녕',
            creDate: '2022-06-13T05:55:11.000+00:00',
            deleteYn: 0,
            mShareItemList: [
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              },
              {
                accessKey: 200,
                accessKind: 'T',
                cabItemKey: 62,
                cabShareKey: 24,
                cabinetKey: 10257,
                creDate: '2022-06-13T05:55:11.000+00:00',
                shareType: 'R',
                blindYn: false,
                replyYn: false,
                fileYn: false
              }
            ]
          }
        ]
      },
      findKeyList: {},
      resultSearchKeyList: []
    }
  }
}
</script>

<style scoped>
.summaryWrap{height: calc(35vh); width: 100%; float: left; background-color: #eee;}
.summaryTop{width: 100%; height: 30%; background-color: #ccc; padding: 10px; display: flex; flex-direction: column; justify-content: space-around;}
.centerSpace{width: 100%; height: 30%;}
.summaryBottom{align-self: center; height: 30%; background-color: rgba(186, 187, 215, 0.5); color: black;}
.summaryIcon{margin-right: 10px; border-radius: 100%; background-color: #fff; width: 25px; height: 25px;}

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
  background-color: #aaa;
}

</style>
