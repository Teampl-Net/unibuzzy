<template>
<!--  -->
  <template v-if="this.mFindText === ''">
    <div class="w-100P h-100P" style=" overflow:auto; margin-bottom: 1rem;">
      <div class="searchBodyTop pSide-1" style="background: white">
        <div class="fl w-100P" style="height: 30px; float: left;">
          <img src="../../assets/images/main/icon_3d_search.png" style="float: left; margin-right: 8px;" class="img-w27" alt="">
          <p class="font20 fontBold commonColor textLeft" style="line-height: 26px;">무엇을 찾고 계신가요?</p>
        </div>
        <!-- input Box -->
        <div class="fl w-100P" style="position: relative; margin: 1rem 0; min-height: 50px;">
          <img @click="findData()" class="searchPageIconWich cursorP img-w20" src="../../assets/images/common/iocn_search_gray.png" alt="검색버튼">
          <input @focus="this.mInputFocusYn = true" @blur="inputBlur()" class="searchPageInputAera font14 fontBold" @click="searchClear()" ref="channelSearchKey" @keyup.enter="findData()" v-model="mInputText" placeholder="채널명을 검색해주세요" />
          <img src="../../assets/images/common/grayXIcon.svg" v-if="mFindText !== ''" @click="searchClear()" class="fr img-w10 mtop-03" style="position: absolute; top:0.6rem; right: 10px;" alt="">
        </div>

        <!-- input 박스에 포커스가 되면 최근 검색이 등장 -->
        <template v-if="mInputFocusYn === true">
          <div class="fl w-100P pSide-05" style="max-height:200px;">
            <div v-for="(data, index) in mSearchHistoryList" :key="index" class="fl w-100P" style=" padding: 10px 0; border-bottom:1px solid #CCCCCC90; ">
              <p class="fl font14 grayBlack textLeft" style="width: calc(100% - 20px)" @click="mInputText = data, findData()">{{data}}</p>
              <img src="../../assets/images/common/grayXIcon.svg" @click="searchHistoryDelete(index)" class="fr img-w10 mtop-03" alt="">
            </div>
            <p v-if="mSearchHistoryList.length > 0" class="fr font12 lightGray mtop-05" @click="searchHistoryClear()">전체삭제</p>
          </div>
        </template>

        <!-- 산업군 -->
        <div v-if="mBusinessItemList.length > 0 && false" class="fl w-100P" style="min-height: 50px; float: left; display: flex; flex-wrap: wrap; gap: 10px;">
          <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft">산업군별 찾기</p>
          <div v-for="(business, index) in mBusinessItemList" :key="index" class="fl " style="padding:5px; border-radius:8px; border: 1px solid #7678E2; min-width:32px;">
            <p class="font12 CLDeepGrayColor">{{$changeText(business.itemNameMtext)}}</p>
          </div>
        </div>
      </div>

      <!-- 채널 추천 영역 -->
      <div class="wh-100P fl mtop-1 ptop-1" style="background: white; ">
        <div class="fl w-100P pSide-1" style="height: 30px; float: left;">
          <img src="../../assets/images/main/icon_3d_star.png" style="float: left; margin-right: 8px;" class="img-w27" alt="">
          <p class="font20 fontBold commonColor textLeft" style="line-height: 26px;">채널을 추천해드릴게요!</p>
        </div>
        <div class="w-100P fl pSide-1" >
          <gActiveBar :testYn='true' ref="activeBar" :tabList="this.mActiveTabRecommendList" class="fl" @changeTab="changeRecommendTab" />
        </div>
        <div class="w-100P fl" style="overflow: auto; height: calc(100% - 90px);">
          <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index" >
            <channelCard class=" moveBox chanRow" :chanElement="chanEle" @openPop="openPop" />
            <myObserver v-if="index === GE_DISP_TEAM_LIST.length - 1" @triggerIntersected="recommendLoadMore" class="fl wich" />
          </template>
        </div>
      </div>
    </div>
    </template>

    <!-- 검색 키워드가 있다면 -->
    <template v-else>
      <div class="w-100P h-100P" style="position: absolute; overflow:auto; margin-bottom: 1rem; top:0; left:0; background: white; z-index:10">
        <div class="fl w-100P mtop-05" style="padding: 10px; display: flex; align-items: center; justify-content: space-around;">
          <img @click="searchClear()" src="../../assets/images/common/icon_back.png" class="fl img-w12" alt="">
          <div class="fl w-100P" style="width:calc(100% - 50px); position: relative;">
            <img @click="findData()" class="searchPageIconWich cursorP img-w20" src="../../assets/images/common/iocn_search_gray.png" alt="검색버튼">
            <input @focus="this.mInputFocusYn = true" @blur="inputBlur()" class="searchPageInputAera font14 fontBold" @click="searchClear()" ref="channelSearchKey" @keyup.enter="findData()" v-model="mInputText" placeholder="채널명을 검색해주세요" />
            <img src="../../assets/images/common/grayXIcon.svg" v-if="mFindText !== ''" @click="searchClear()" class="fr img-w10 mtop-03" style="position: absolute; top:0.6rem; right: 10px;" alt="">
          </div>
        </div>

        <gActiveBar :testYn='true' ref="activeBar" :tabList="this.mActiveSearchTabList" class="fl" @changeTab="changeSearchTab" />

      </div>
    </template>
</template>

<script>
export default {
  data () {
    return {
      mBusinessItemList: [],
      mInputText: '',
      mFindText: '',
      mActiveTabRecommendList: [{ display: '인기', name: 'POPU' }, { display: '맞춤', name: 'CUST' }],
      mActiveRecommend: 'POPU',

      mChannelList: [],
      mOffsetInt: 0,
      mEndListYn: false,
      mAxiosQueue: [],
      mInputFocusYn: false,
      mSearchHistoryList: [],
      mActiveSearchTabList: [{ display: '채널', name: 'CHAN' }, { display: '콘텐츠', name: 'CONT' }]
    }
  },
  props: {

  },
  created () {
    // gMainHearder에서 changePageHeader === '검색' ? 'white' 를 하고 있음
    this.$emit('changePageHeader', '검색')
    this.readyFunc()
  },
  methods: {
    inputBlur () {
      setTimeout(() => {
        this.mInputFocusYn = false
      }, 1)
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    changeSearchTab (name) {
      // this.
    },
    async changeRecommendTab (name) {
      this.mActiveRecommend = name
      this.mOffsetInt = 0
      this.mChannelList = []

      var result = await this.getChannelList(true)
      console.log(result)
      this.mChannelList = result.content
    },
    readyFunc () {
      this.getCateItemList()
      this.changeRecommendTab(this.mActiveRecommend)
      this.getSearchHistory()
    },
    getSearchHistory () {
      var localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordHistoryList'))
      if (localKeyWordOBJ === undefined || localKeyWordOBJ === null || localKeyWordOBJ === '') {
        localStorage.setItem('searchKeyWordHistoryList', JSON.stringify([]))
        localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordHistoryList'))
      }
      console.log(localKeyWordOBJ)
      this.mSearchHistoryList = localKeyWordOBJ
      console.log(this.mSearchHistoryList)
    },
    searchHistoryDelete (idx) {
      this.mSearchHistoryList.splice(idx, 1)
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify(this.mSearchHistoryList))
    },
    searchHistoryClear () {
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify([]))
      this.mSearchHistoryList = []
    },
    async getCateItemList () {
      var cateItemList = await this.$commonAxiosFunction({
        url: 'service/tp.getCateItemList',
        param: { cateGroupKey: 2 }
      })
      this.mBusinessItemList = cateItemList.data.cateItemList
      // this.mBusinessItemList.unshift({ cateKey: 0, itemNameMtext: 'KO$^$전체' })
    },
    findData () {
      var find = this.mSearchHistoryList.findIndex(item => item === this.mInputText)
      if (find !== -1) { this.mSearchHistoryList.splice(find, 1) }
      this.mSearchHistoryList.unshift(this.mInputText)
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify(this.mSearchHistoryList))

      this.mFindText = this.mInputText
    },
    searchClear () {
      this.mInputText = ''
      this.mFindText = ''
    },
    async recommendLoadMore () {
      if (this.mEndListYn === false) {
        var resultList = await this.getChannelList()
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
          ...this.mChannelList,
          ...resultList.content
        ]
        this.mChannelList = newArr
      }
    },
    async getChannelList (mLoadingYn) {
      if (this.mAxiosQueue.findIndex((item) => item === 'getChannelList') !== -1) return
      this.mAxiosQueue.push('getChannelList')
      var paramMap = new Map()

      paramMap.set('fUserKey', this.GE_USER.userKey)
      paramMap.set('offsetInt', this.mOffsetInt)
      paramMap.set('pageSize', 10)

      // if (this.mViewTab === 'user') {
      //   paramMap.set('userKey', userKey)
      // } else if (this.mViewTab === 'all') {
      //   paramMap.set('fUserKey', userKey)
      // } else if (this.mViewTab === 'mychannel') {
      //   paramMap.set('userKey', userKey)
      //   paramMap.set('managerYn', true)
      // }
      // if (this.mResultSearchKeyList.length > 0) {
      //   paramMap.set('nameMtext', this.mResultSearchKeyList[0].keyword)
      // }
      // if (offsetInput !== undefined) {
      //   paramMap.set('offsetInt', offsetInput)
      // } else {
      //   paramMap.set('offsetInt', this.mOffsetInt)
      // }
      // if (pageSize) {
      //   paramMap.set('pageSize', pageSize)
      // } else {
      //   paramMap.set('pageSize', 10)
      // }
      var noneLoadingYn = true
      if (mLoadingYn) {
        noneLoadingYn = false
      }
      var result = await this.$getTeamList(paramMap, noneLoadingYn)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getChannelList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result.data
      this.endListSetFunc(resultList)
      return resultList
    },
    endListSetFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.mEndListYn = true
        if (this.mOffsetInt > 0) this.mOffsetInt -= 1
      } else {
        this.mEndListYn = false
        this.mOffsetInt += 1
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_TEAM_LIST () {
      var index = null
      var teamList = this.GE_MAIN_CHAN_LIST
      for (var i = 0; i < this.mChannelList.length; i++) {
        index = teamList.findIndex((item) => item.teamKey === this.mChannelList[i].teamKey)
        if (index !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.mChannelList[i] = teamList[index]
        }
      }
      var returnData = this.mChannelList
      return returnData
    }
  }
}
</script>
<style>
.searchBodyTop {
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  float: left;
  width:100%;
}
.searchPageInputAera{
  background: #e4e4e463;
  width: 100%;
  height: 40px;
  margin-bottom: 5px!important;
  border-radius: 12px !important;
  padding: 0.4rem;
  padding-left: 2rem !important;
  box-sizing: border-box;
  float: left;
  border: 1px solid #cccccc;
}
.searchPageIconWich{ position: absolute; top:0.6rem; left: 8px;}
</style>
