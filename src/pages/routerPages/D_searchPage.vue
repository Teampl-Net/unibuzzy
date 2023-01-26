<template>
<!--  -->
  <template v-if="mSearchModeYn === false">
    <div class="w-100P h-100P" :style="'padding-top:' + (this.$STATUS_HEIGHT + 50)+ 'px;'" style=" overflow:auto; padding-bottom: 40px;">
      <div class="searchBodyTop pSide-1" style="background: white">
        <div class="fl w-100P" style="height: 30px; float: left;">
          <img src="../../assets/images/main/icon_3d_search.png" style="float: left; margin: 0 8px 8px 8px;" class="img-w23" alt="">
          <p class="font20 fontBold commonColor textLeft" style="line-height: 26px;">무엇을 찾고 계신가요?</p>
        </div>
        <!-- input Box -->
        <div class="fl w-100P" style="position: relative; margin-top: 1rem; min-height: 50px;">
          <img @click="setSearchList()" class="searchPageIconWich cursorP img-w20" src="../../assets/images/common/iocn_search_gray.png" alt="검색버튼">
          <input @focus="this.mInputFocusYn = true" @blur="inputBlur()" class="searchPageInputAera font14 fontBold" @click="searchClear()" ref="channelSearchKey" @keyup.enter="setSearchList()" v-model="mInputText" placeholder="검색키워드를 입력해주세요" />
          <img src="../../assets/images/common/grayXIcon.svg" v-if="mFindText !== ''" @click="searchClear()" class="fr img-w10 mtop-03" style="position: absolute; top:0.6rem; right: 10px;" alt="">
        </div>

        <!-- input 박스에 포커스가 되면 최근 검색이 등장 -->
        <template v-if="mInputFocusYn === true">
          <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft mtop-05">최근 검색어</p>
          <div class="fl w-100P pSide-05 thinScrollBar" style="max-height:200px; overflow: auto">
            <div v-for="(data, index) in mSearchHistoryList" :key="index" class="fl w-100P" style=" padding: 10px 0; border-bottom:1px solid #CCCCCC90; ">
              <p class="fl font14 grayBlack textLeft" style="width: calc(100% - 20px)" @click="mInputText = data, findData()">{{data}}</p>
              <img src="../../assets/images/common/grayXIcon.svg" @click="searchHistoryDelete(index)" class="fr img-w10 mtop-03" alt="">
            </div>
          </div>
          <p v-if="mSearchHistoryList.length === 0" class="w-100P fl mtop-2 mbottom-2 font16 lightGray textCenter">최근 검색한 결과가 없어요</p>
          <p v-if="mSearchHistoryList.length > 0" class="fr font12 lightGray mtop-05 pSide-05" @click="searchHistoryClear()">전체삭제</p>
        </template>

        <!-- 산업군 -->
        <div v-if="mBusinessItemList.length > 0" class="fl w-100P" style="min-height: 50px; float: left; display: flex; flex-wrap: wrap; gap: 10px;">
          <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft">산업군별 채널 찾기</p>
          <div v-for="(business, index) in mBusinessItemList" @click="setCataItem(business)" :key="index" class="fl font14 cursorP fontBold" style="padding: 0 8px; border-radius:30px; line-height: 24px;  min-width:30px;" :class=" this.mCateItem === business.cateKey ? 'commonLightBGColor fontBold CWhiteColor' : 'commonGrayBorderColor lightGray'">
            {{$changeText(business.itemNameMtext)}}
          </div>
        </div>
        <div v-if="mMyStickerList.length > 0" class="fl w-100P mtop-1" style="min-height: 50px;  float: left; display: flex; flex-wrap: wrap; gap: 10px;">
          <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft">분류별 컨텐츠 찾기</p>
          <template v-for="(sticker, index) in mMyStickerList" :key="index" >
            <gStickerLine @click="searchSticker(sticker)"  v-if="sticker" style="float: left; min-width: 30px;" :pSticker="sticker" />
          </template><!--
          <div v-for="(sticker, index) in mMyStickerList" :key="index" class="fl font12" :style="'background: ' + sticker.picBgPath + ';'" style="padding:5px; border-radius:8px; min-width:32px; border: 100%;" >
            {{$changeText(sticker.nameMtext)}}
          </div> -->
        </div>
      </div>

      <!-- 채널 추천 영역 -->
      <div class="wh-100P fl mtop-1 ptop-1" style="background: white; ">
        <div class="fl w-100P pSide-1" style="height: 30px; float: left;">
          <img src="../../assets/images/main/icon_3d_star.png" style="float: left; margin-right: 8px;" class="img-w23" alt="">
          <p class="font20 fontBold commonColor textLeft" style="line-height: 26px;">채널을 추천해드릴게요!</p>
        </div>
        <div class="w-100P fl pSide-1" >
          <gActiveBar :testYn='true' ref="activeBar" :tabList="this.mActiveTabRecommendList" class="fl" @changeTab="changeRecommendTab" />
        </div>
        <div class="w-100P fl" style="overflow: auto; height: calc(100% - 90px);">
          <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index" >
            <channelCard class=" moveBox" :chanElement="chanEle" @openPop="openPop" />
            <myObserver v-if="index === GE_DISP_TEAM_LIST.length - 1" @triggerIntersected="recommendLoadMore" class="fl wich" />
          </template>
        </div>
      </div>
    </div>
    </template>

    <!-- 검색 키워드가 있다면 -->
    <template v-if="mSearchModeYn === true">
      <div v-if="mSearchModeYn === true" class="w-100P h-100P"  style="position: absolute; margin-bottom: 1rem; top:0; left:0; background: white; z-index:10; overflow:hidden;">
        <div class="fl w-100P" :style="`height: ${this.mobileYn? (this.$STATUS_HEIGHT + 60):60}px;`" style="padding: 10px; padding-top:15px; display: flex; align-items: center; justify-content: flex-start; position: fixed; z-index: 3; background: white;">
          <img @click="searchClear()" src="../../assets/images/common/icon_back.png" class="fl img-w12 cursorP mright-1 mleft-05" alt="">
          <div class="fl w-100P mright-1" style="width:calc(100% - 90px); position: relative;">
            <input @focus="this.mInputFocusYn = true" @blur="inputBlur()" class="searchPageInputAera font14 fontBold" ref="channelSearchKey" @keyup.enter="setSearchList()" v-model="mInputText" placeholder="키워드를 검색해주세요" />
            <img  @click="setSearchList()" class="searchPageIconWich cursorP img-w20" src="../../assets/images/common/iocn_search_gray.png" alt="검색버튼">
            <!-- <img src="../../assets/images/common/grayXIcon.svg" v-if="mFindText !== ''" @click="searchClear()" class="fr img-w10 mtop-03" style="position: absolute; top:0.6rem; right: 10px;" alt=""> -->
          </div>
          <img class="fr cursorP" v-if="mActiveSearch === 'CONT'" @click="mActiveSearch === 'CHAN' ? this.mChanFindPopShowYn = true : this.mFindPopShowYn = true"  style="width: 30px;" src="../../assets/images/common/common_filter.svg" alt="">
        </div>
        <!-- 공통 검색 탭 영역 -->
        // 60
        <div  class="w-100P fl pSide-1 chanListHeader " :style="`margin-top: ${this.mobileYn? (this.$STATUS_HEIGHT + 60):60}px;`" v-on="handleScroll" ref="chanListHeader" id="chanListPageHeader" :class="this.mScrolledYn? 'chanListHeader--unpinned': 'chanListHeader--pinned'">
          <gActiveBar :testYn='true' ref="mainActiveBar" :tabList="this.mActiveSearchTabList" class="fl" @changeTab="changeSearchTab" />
            <template v-if="mActiveSearch === 'CHAN'">
              <cSearchBox class="mright-03 mtop-03" :propChanSearchYn='true' :propSearchBox='value' v-for="(value, index) in mSearchList" :key="index" @searchBoxClick='searchBoxClick' />
            </template>
            <div v-if="mActiveSearch === 'CONT'" class="fl w-100P mtop-05" style="display: flex;">
                <p v-for="(tab, index) in mSearchContentTabList" :key="index" @click="changeContentsTab(tab.name)" class="fl font16 " :class=" this.mSearchContentTab === tab.name ? 'commonLightColorBorder2 fontBold commonLightColor' : 'commonGrayBorderColor lightGray'" style="line-height: 30px; width: calc(100% / 3); height: 30px;"> {{tab.display}}</p>
            </div>
            <template v-if="mActiveSearch === 'CONT'">
              <searchBox class="mright-03 mtop-03 mbottom-1" :propSearchBox='value' v-for="(value, index) in mSearchList" :key="index" @delSearchBox="deleteSearchKey(value)" />
            </template>
        </div>

        <div class="fl wh-100P chanListWrap"  id="chanListWrap" ref="chanListWrap" :style="calcPaddingTop" style=" overflow:auto;padding: 0 10px; padding-top: calc(var(--paddingTopLength));  "  >
          <!-- 채널 리스트 -->
          <div v-if="mActiveSearch === 'CHAN'" class="w-100P fl" style="overflow: auto; ">
            <template v-for="(chanEle, index) in this.GE_DISP_TEAM_LIST" :key="index" >
              <channelCard class=" moveBox chanRow" :chanElement="chanEle" @openPop="openPop" />
              <myObserver v-if="index === GE_DISP_TEAM_LIST.length - 5" @triggerIntersected="recommendLoadMore" class="fl wich" />
            </template>
            <div v-if="mActiveSearch === 'CHAN' && mEmptyYn === true && this.GE_DISP_TEAM_LIST.length === 0" class="w-100P fl" style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%);">
              <gListEmpty title='검색결과가 없어요' subTitle='다시 한번 검색해볼까요?' option='SELE' :subTitleYn='true' />
            </div>
          </div>

          <!-- 컨텐츠 리스트 -->
          <div v-if="mActiveSearch === 'CONT'" :key="mContentReloadKey" style="margin-top: 1rem; float: left; width: 100%; overflow: hidden scroll;  padding-bottom: 40px;">
            <div class="w-100P fl chanRow" style="height:1px;" />
            <template v-if="this.mSearchContentTab === 'ALL'" >
              <gContentsBox @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-for="(cont, index) in this.GE_DISP_ALL_LIST" :key="index" />
              <template v-if="mGetAxiosYn && GE_DISP_ALL_LIST.length === 0">
                <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
              </template>
              <gListEmpty v-else-if="this.GE_DISP_ALL_LIST.length === 0 && mEmptyYn === true" title='콘텐츠 전체 검색결과가 없어요' subTitle='다시 한번 검색해볼까요?' option='SELE' :subTitleYn='true' style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); height: 100px;" />
            </template>
            <template v-if="this.mSearchContentTab === 'ALIM'" >
              <gContentsBox @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-for="(cont, index) in this.GE_DISP_ALIM_LIST" :key="index" />
              <template v-if="mGetAxiosYn && GE_DISP_ALIM_LIST.length === 0">
                <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
              </template>
              <gListEmpty v-else-if="this.GE_DISP_ALIM_LIST.length === 0 && mEmptyYn === true" title='알림 콘텐츠 검색결과가 없어요' subTitle='다시 한번 검색해볼까요?' option='SELE' :subTitleYn='true' style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); height: 100px;" />
            </template>
            <template v-if="this.mSearchContentTab === 'BOAR'" >
              <gContentsBox @openImgPop="openImgPop" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" v-for="(cont, index) in this.GE_DISP_BOAR_LIST" :key="index" />
              <template v-if="mGetAxiosYn &&  this.GE_DISP_BOAR_LIST.length === 0">
                <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
              </template>
              <gListEmpty v-else-if="this.GE_DISP_BOAR_LIST.length === 0 && mEmptyYn === true" title='게시판 콘텐츠 검색결과가 없어요' subTitle='다시 한번 검색해볼까요?' option='SELE' :subTitleYn='true' style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); height: 100px;" />
            </template>
            <myObserver @triggerIntersected="contentsLoadMore" id="observer" class="fl w-100P" style=""></myObserver>
          </div>
        </div>
      </div>
    </template>
    <div v-if="mBottomSheetOpenYn"  @click="mBottomSheetOpenYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
    <transition name="showModal">
        <findContentsList :pTitleShowYn="false" transition="showModal" @searchList="requestSearchList" v-if="mActiveSearch === 'CONT' && mFindPopShowYn" @closePop="this.mFindPopShowYn = false" />
    </transition>
    <transition name="showModal">
        <findChannelList @searchList="requestSearchList" transition="showModal" v-if="mActiveSearch === 'CHAN' && mChanFindPopShowYn" @closePop='mChanFindPopShowYn = false' />
    </transition>
    <transition name="showUp" >
      <bottomSheets v-if="mBottomSheetOpenYn" :propSelectSearchObj='mSelectSearchObj' @closePop='mBottomSheetOpenYn = false' @bottSheetEmit='bottSheetEmit' :propBusinessItemList='mBusinessItemList' />
    </transition>
</template>

<script>
import bottomSheets from '../../components/pageComponents/main/unit/D_commonBottomSheets.vue'
import cSearchBox from '../../components/unit/D_cSearchBox.vue'
import findContentsList from '@/components/popup/common/D_findContentsList.vue'
import findChannelList from '@/components/popup/common/Tal_findChannelList.vue'
import SkeletonBox from '@/components/pageComponents/push/D_contentsSkeleton'
import searchBox from '../../components/unit/D_SearchBox.vue'
export default {
  components: { cSearchBox, bottomSheets, searchBox, findContentsList, findChannelList, SkeletonBox },
  data () {
    return {
      mobileYn: this.$getMobileYn(),
      mSearchModeYn: false,
      mBusinessItemList: [],
      mMyStickerList: [],
      mInputText: '',
      mFindText: '',
      mStikcerKey: '',
      // mActiveTabRecommendList: [{ display: '인기', name: 'P' }, { display: '맞춤', name: 'CUST' }],
      mActiveTabRecommendList: [{ display: '인기', name: 'P' }, { display: '최신', name: 'N' }],
      mActiveRecommend: 'P',
      mCateItem: '',
      mTempCateItem: '',

      mChannelList: [],
      mOffsetInt: 0,
      mEndListYn: false,
      mAxiosQueue: [],
      mInputFocusYn: false,
      mSearchHistoryList: [],
      mActiveSearchTabList: [{ display: '채널', name: 'CHAN' }, { display: '콘텐츠', name: 'CONT' }],
      mActiveSearch: 'CHAN',

      mTempRecommendList: [],

      mContentReloadKey: 0,
      mSearchContentTabList: [{ display: '전체', name: 'ALL' }, { display: '알림', name: 'ALIM' }, { display: '게시글', name: 'BOAR' }],
      mSearchContentTab: 'ALL',
      mContentsOffsetInt: 0,
      mFindKeyList: {},

      mAlimContentsList: [],
      mBoardContentsList: [],
      mAllContentsList: [],

      mComputedYn: true,
      mEmptyYn: false,
      mCanLoadYn: true,
      mChanListScrollBox: null,
      mScrollPosition: 0,
      mScrollDirection: null,
      mFirstContOffsetY: null,
      mScrolledYn: false,
      mHeaderTop: 0,
      mScrollCheckSec: 0,

      // mSearchList: [{ searchType: '정렬', dispName: '전체' }, { searchType: '산업군', dispName: '전체' }, { searchType: '유형', dispName: '전체' }],
      mSearchList: [{ searchType: '산업군', dispName: '전체' }],
      mSelectSearchObj: {},
      mBottomSheetOpenYn: false,
      mFindPopShowYn: false,
      mChanFindPopShowYn: false,
      mGetAxiosYn: false
    }
  },
  props: {
    initData: {}
  },
  mounted () {
  },
  updated () {
    if (this.mSearchModeYn === true) {
      this.mChanListScrollBox = window.document.getElementById('chanListWrap')
      this.mChanListScrollBox.addEventListener('scroll', this.handleScroll)
    }
  },
  created () {
    // gMainHearder에서 changePageHeader === '검색' ? 'white' 를 하고 있음
    this.$emit('changePageHeader', '검색')
    this.readyFunc()
  },
  methods: {
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    searchBoxClick (searchData) {
      this.mSelectSearchObj = searchData
      this.mBottomSheetOpenYn = true
    },
    bottSheetEmit (pramData) {
      console.log(pramData)
      var targetType = pramData.targetType
      var dispName = pramData.dispName
      var idx
      if (targetType === 'changeOrderBy') {
        idx = this.mSearchList.findIndex(item => item.searchType === '정렬')
      } else if (targetType === 'changeBusiness') {
        idx = this.mSearchList.findIndex(item => item.searchType === '산업군')
        this.setCataItem(pramData)
      } else if (targetType === 'changeAdmin') {
        idx = this.mSearchList.findIndex(item => item.searchType === '유형')
      }
      if (idx !== -1) this.mSearchList[idx].dispName = dispName
      this.mBottomSheetOpenYn = false
    },
    requestSearchList (data) {
      console.log(data)
      var searchObj = {}
      var index = null
      if (data.searchKey) {
        searchObj = { accessKind: 'title', accessKey: data.searchKey, dispName: data.searchKey, searchType: '제목' }
        index = this.mSearchList.findIndex(item => item.searchType === '제목')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push(searchObj)
      }
      if (data.creTeamNameMtext) {
        searchObj = { accessKind: 'nameMtext', accessKey: data.creTeamNameMtext, dispName: data.creTeamNameMtext, searchType: '채널명' }
        index = this.mSearchList.findIndex(item => item.searchType === '채널명')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push(searchObj)
      }
      if (data.creUserName) {
        searchObj = { accessKind: 'creUserName', accessKey: data.creUserName, dispName: data.creUserName, searchType: '작성자' }
        index = this.mSearchList.findIndex(item => item.searchType === '작성자')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push(searchObj)
      }
      if (data.fromCreDateStr && data.toCreDateStr) {
        searchObj = { accessKind: 'creUserName', accessKey: data.fromCreDateStr + '~' + data.toCreDateStr, dispName: data.fromCreDateStr + '~' + data.toCreDateStr, searchType: '날짜' }
        index = this.mSearchList.findIndex(item => item.searchType === '날짜')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push(searchObj)
      }
      if (data.selectedSticker) {
        searchObj = { accessKind: 'SK', accessKey: data.selectedSticker.stickerKey, dispName: this.$changeText(data.selectedSticker.nameMtext), searchType: '분류' }
        index = this.mSearchList.findIndex(item => item.searchType === '분류')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push(searchObj)
      }
      this.changeContentsTab(this.mSearchContentTab)
      this.mFindPopShowYn = false
    },
    setSearchList () {
      // eslint-disable-next-line no-debugger
      debugger
      if (this.mActiveSearch === 'CHAN') {
        this.findData()
      } else {
        this.mAlimContentsList = []
        this.mAllContentsList = []
        this.mBoardContentsList = []
        var index = this.mSearchList.findIndex(item => item.searchType === '제목')
        if (index !== -1) {
          this.mSearchList.splice(index, 1)
        }
        this.mSearchList.push({ accessKind: 'title', accessKey: this.mInputText, dispName: this.mInputText, searchType: '제목' })
        this.changeContentsTab(this.mSearchContentTab)
      }
    },
    async setCataItem (business) {
      if (this.GE_DISP_TEAM_LIST.length === 0) return
      if (this.mCateItem === business.cateKey) {
        this.mCateItem = ''
      } else {
        this.mCateItem = business.cateKey
      }
      this.mSearchModeYn = true
      this.mSearchList = [{ searchType: '산업군', dispName: this.$changeText(business.itemNameMtext) }]
      this.findData()
      this.mCateItem = ''
      // 20230109수민삭제
      // this.changeRecommendTab(this.mActiveRecommend)
    },
    async searchSticker (sticker) {
      this.mStikcerKey = sticker.stickerKey
      this.mSearchModeYn = true
      this.mSearchList = [{ searchType: '분류', accessKind: 'SK', accessKey: sticker.stickerKey, dispName: this.$changeText(sticker.nameMtext) }]
      this.mActiveSearch = 'CONT'
      await this.changeSearchTab('CONT')
      /* this.changeSearchTab('CONT') */
      this.mStikcerKey = ''
      this.$nextTick(() => {
        this.$refs.mainActiveBar.switchtab(1)
        // alert(true)
      })
      // 20230109수민삭제
      // this.changeRecommendTab(this.mActiveRecommend)
    },
    getAbsoluteTop (element) {
      return window.pageYOffset + element.getBoundingClientRect().top
    },
    handleScroll () {
      var currentTime = new Date()
      var time = currentTime - this.mScrollCheckSec
      var element = document.getElementsByClassName('chanRow')[0]
      // var parentElement = element.parentElement
      // this.mFirstContOffsetY = this.getAbsoluteTop(element) - this.getAbsoluteTop(parentElement)
      this.mFirstContOffsetY = this.getAbsoluteTop(element)
      if (this.mFirstContOffsetY > 0) {
        this.mScrollDirection = 'up'
        this.mScrolledYn = false
      }
      if (time / 1000 > 1 && this.$diffInt(this.mChanListScrollBox.scrollTop, this.mScrollPosition) > 150) {
        // var test = document.getElementById('chanListPageHeader')
        // this.mHeaderTop = this.getAbsoluteTop(test) - this.getAbsoluteTop(parentElement)
        this.mScrollCheckSec = currentTime

        if (this.mFirstContOffsetY < 0) {
          if (this.mChanListScrollBox.scrollTop > this.mScrollPosition) {
            this.mScrollDirection = 'down'
            this.mScrolledYn = true
          } else if (this.mChanListScrollBox.scrollTop <= this.mScrollPosition) {
            this.mScrollDirection = 'up'
            this.mScrolledYn = false
          }
        }
        console.log(this.mScrollDirection)
        this.mScrollPosition = this.mChanListScrollBox.scrollTop
      }
    },
    inputBlur () {
      // setTimeout(() => {
      //   this.mInputFocusYn = false
      // }, 1)
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    async contentsLoadMore () {
      if (this.mCanLoadYn) {
        this.mCanLoadYn = false
        try {
          var resultList = await this.getPushContentsList(null, null, false)
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
          var newArr = []
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)

          if (this.mSearchContentTab === 'ALIM') {
            newArr = [
              ...resultList.content,
              ...this.GE_DISP_ALIM_LIST
            ]
            this.mAlimContentsList = this.replaceContentListArr(newArr)
          } else if (this.mSearchContentTab === 'BORE') {
            newArr = [
              ...resultList.content,
              ...this.GE_DISP_BOAR_LIST
            ]
            this.mBoardContentsList = this.replaceContentListArr(newArr)
          } else if (this.mSearchContentTab === 'ALL') {
            newArr = [
              ...resultList.content,
              ...this.GE_DISP_ALL_LIST
            ]
            this.mAllContentsList = this.replaceContentListArr(newArr)
          }

          this.$emit('numberOfElements', resultList.totalElements)
        } catch (e) {
          console.log(e)
        } finally {
          this.mCanLoadYn = true
        }
      }
    },
    async changeContentsTab (name) {
      this.mOffsetInt = 0
      this.mEmptyYn = false
      this.mSearchContentTab = name
      var resultList = await this.getPushContentsList(null, null, true)
      var contentList = []
      if (resultList && resultList.content) {
        contentList = resultList.content
      }
      // if (!resultList || resultList === '') return
      // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // this.mAlimContentsList = resultList.content
      var newArr = []
      var cont
      var tempContentDetail
      var contentDetail

      this.mAlimContentsList = []
      this.mBoardContentsList = []
      this.mAllContentsList = []

      if (this.mSearchContentTab === 'ALIM') {
        newArr = [
          ...contentList
        ]
        this.mAlimContentsList = this.replaceContentListArr(newArr)
        for (let i = 0; i < this.mAlimContentsList.length; i++) {
          cont = this.mAlimContentsList[i]
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
            var test = contentDetail?.D_MEMO_LIST
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
      } else if (this.mSearchContentTab === 'BOAR') {
        newArr = [
          ...contentList
        ]
        this.mBoardContentsList = this.replaceContentListArr(newArr)
        for (let i = 0; i < this.mBoardContentsList.length; i++) {
          cont = this.mBoardContentsList[i]
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
            var test = contentDetail?.D_MEMO_LIST
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
      } else if (this.mSearchContentTab === 'ALL') {
        newArr = [
          ...contentList
        ]
        this.mAllContentsList = this.replaceContentListArr(newArr)
        for (let i = 0; i < this.mAllContentsList.length; i++) {
          cont = this.mAllContentsList[i]
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
            var test = contentDetail?.D_MEMO_LIST
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
      this.mContentReloadKey += 1
      // this.endListSetFunc(resultList)
      // this.mFindPopShowYn = false
      // this.introPushPageTab()
      // this.scrollMove()
    },
    async changeSearchTab (name) {
      this.mEmptyYn = false
      this.mActiveSearch = name
      this.mOffsetInt = 0
      if (this.mInputText && name === 'CONT') {
        this.mSearchList = [{ accessKey: this.mInputText, accessKind: 'title', dispName: this.mInputText, searchType: '제목' }]
      } else if (this.mInputText && name === 'CHAN') {
        this.mSearchList = [{ accessKey: this.mInputText, accessKind: 'nameMtext', dispName: this.mInputText, searchType: '채널명' }]
      }
      this.findData()
    },
    async changeRecommendTab (name) {
      // eslint-disable-next-line no-debugger
      debugger
      console.log(name)
      this.mEmptyYn = false
      this.mActiveRecommend = name
      this.mOffsetInt = 0
      this.mChannelList = []

      var result = await this.getChannelList(true)
      this.mChannelList = result.content
    },
    readyFunc () {
      console.log(this.initData)
      if (this.initData) {
        if (this.initData.pSearchList) {
          this.mSearchList = this.initData.pSearchList
          this.findData('CONT')
          /* this.changeSearchTab('CONT') */
          this.mStikcerKey = ''
          this.$nextTick(() => {
            this.$refs.mainActiveBar.switchtab(1)
          })
        }
        this.mBusinessItemList = this.initData.cateItemList
        this.mMyStickerList = this.initData.stickerList
        this.mEmptyYn = false
        this.mOffsetInt = 0
        this.mChannelList = this.initData.teamList.content
        this.endListSetFunc(this.initData.teamList)
      }
      // this.getCateItemList()
      // this.changeRecommendTab(this.mActiveRecommend)
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
      console.log(this.mBusinessItemList)
    },
    async findData (searchKind) {
      this.mInputFocusYn = false
      if (this.mSearchModeYn === false) {
        this.mTempRecommendList = this.mChannelList
        this.mTempCateItem = this.mCateItem
        this.mCateItem = ''
        this.searchPopOpen(searchKind)
      }
      this.mEmptyYn = false
      this.mOffsetInt = 0
      var find = this.mSearchHistoryList.findIndex(item => item === this.mInputText)
      if (find !== -1) { this.mSearchHistoryList.splice(find, 1) }
      this.mSearchHistoryList.unshift(this.mInputText)
      localStorage.setItem('searchKeyWordHistoryList', JSON.stringify(this.mSearchHistoryList))
      this.mFindText = this.mInputText

      if (this.mSearchModeYn === true && this.mActiveSearch === 'CONT') {
        this.changeContentsTab('ALL')
      } else {
        this.mChannelList = []
        var resultList = await this.getChannelList()
        console.log(' ==== find Content or Channel ==== ')
        console.log(resultList)
        if (resultList === undefined || resultList.content === undefined) { this.mEmptyYn = true; return }
        if (resultList.content.length === 0) this.mEmptyYn = true
        this.mChannelList = resultList.content
      }
    },
    searchClear () {
      this.mSearchModeYn = false
      this.mInputText = ''
      this.mFindText = ''
      this.mActiveSearch = 'CHAN'

      if (this.mTempCateItem) this.mCateItem = this.mTempCateItem
      if (this.mTempRecommendList.length > 0) this.mChannelList = this.mTempRecommendList
    },
    replaceContentListArr (arr) {
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
        })
        return data
      }, [])
      return uniqueArr
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
      if (this.mActiveRecommend === 'P') {
        paramMap.set('orderbyStr', 'followerCount DESC')
      } else if (this.mActiveRecommend === 'N') {

      }
      paramMap.set('fUserKey', this.GE_USER.userKey)
      paramMap.set('offsetInt', this.mOffsetInt)
      paramMap.set('pageSize', 10)
      if (this.mCateItem) paramMap.set('cateItemKey', this.mCateItem)

      // if (this.mViewTab === 'user') {
      //   paramMap.set('userKey', userKey)
      // } else if (this.mViewTab === 'all') {
      //   paramMap.set('fUserKey', userKey)
      // } else if (this.mViewTab === 'mychannel') {
      //   paramMap.set('userKey', userKey)
      //   paramMap.set('managerYn', true)
      // }

      if (this.mFindText !== '') {
        paramMap.set('nameMtext', this.mFindText)
      }

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
    },
    async deleteSearchKey (search) {
      var index = this.mSearchList.findIndex((item) => item.searchType === search.searchType)
      if (index !== -1) {
        this.mSearchList.splice(index, 1)
      }
      this.findData('CONT')
    },
    async getPushContentsList (pageSize, offsetInput, loadingYn) {
      if (this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') === -1) {
        this.mAxiosQueue.push('getPushContentsList')
        // @point
        // eslint-disable-next-line no-new-object
        var param = new Object()

        // param.offsetInt = this.mContentsOffsetInt
        param.offsetInt = this.mOffsetInt

        if (this.mSearchList) {
          console.log(this.mSearchList)
          for (var i = 0; i < this.mSearchList.length; i++) {
            if (this.mSearchList[i].accessKind && this.mSearchList[i].accessKey) {
              if (this.mSearchList[i].accessKind === 'title') {
                param.title = this.mSearchList[i].accessKey
              } else if (this.mSearchList[i].accessKind === 'nameMtext') {
                param.nameMtext = this.mSearchList[i].accessKey
              } else if (this.mSearchList[i].accessKind === 'fromCreDateStr') {
                var fromToDateList = (this.mSearchList[i].accessKey).split('~')
                param.fromCreDateStr = fromToDateList[0]
                param.toCreDateStr = fromToDateList[0]
              } else if (this.mSearchList[i].accessKind === 'workStatCodeKey') {
                param.workStatCodeKey = this.mSearchList[i].accessKey
              } else if (this.mSearchList[i].accessKind === 'creUserName') {
                param.creUserName = this.mSearchList[i].accessKey
              } else if (this.mSearchList[i].accessKind === 'SK') {
                param.findActStickerYn = true
                param.findActYn = true
                param.stickerKey = this.mSearchList[i].accessKey
              }
            }
          }
        }
        param.findLogReadYn = null
        param.findActLikeYn = false
        param.findActStarYn = false
        param.DESCYn = true

        // if (this.viewTab === 'N') {
        // } else if (this.viewTab === 'L') {
        //   param.findActYn = true
        //   param.findActLikeYn = true
        // } else if (this.viewTab === 'S') {
        //   param.findActYn = true
        //   param.findActStarYn = true
        // } else if (this.viewTab === 'M') {
        //   param.creUserKey = this.GE_USER.userKey
        // }
        if (this.mSearchContentTab === 'ALIM') {
          param.jobkindId = 'ALIM'
          param.ownUserKey = this.GE_USER.userKey
        } else if (this.mSearchContentTab === 'BOAR') {
          param.jobkindId = 'BOAR'
          // if (this.viewTab === 'N') {
          param.boardYn = true
          // } else {
          //   param.ownUserKey = this.GE_USER.userKey
          // }
        } else if (this.mSearchContentTab === 'ALL') {
          param.allYn = true
          param.ownUserKey = this.GE_USER.userKey
        }
        var nonLoading = true
        if (loadingYn) {
          nonLoading = false
        }
        this.mGetAxiosYn = true
        var result = await this.$getContentsList(param, nonLoading)
        this.mGetAxiosYn = false
        await this.endListSetFunc(result)
        var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
        this.mAxiosQueue.splice(queueIndex, 1)
        var resultList = result
        return resultList
      }
    },
    closeXPop () {
      try {
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.$store.dispatch('D_HISTORY/AC_REMOVE_POP_HISTORY_STACK')
      } catch (e) {
        console.log(e)
      } finally {
        this.mSearchModeYn = false
      }
    },
    searchPopOpen (searchKind) {
      this.mSearchModeYn = true
      this.mScrolledYn = false // 다시 들어왔을 때 공통 탭 영역이 접혀있는 경우가 있음
      this.mEmptyYn = false
      if (searchKind) {
        this.changeSearchTab(searchKind)
      } else {
        this.changeSearchTab('CHAN')
        this.mSearchList = [{ searchType: '산업군', dispName: '전체' }]
      }
      try {
        this.$store.dispatch('D_HISTORY/AC_ADD_POP_HISTORY_STACK', 'searchPop')
        this.$store.dispatch('D_HISTORY/AC_ADD_ALL_HISTORY_STACK', 'searchPop')
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    pageUpdate (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      if (removePage === 'searchPop') {
        this.closeXPop()
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    calcPaddingTop () {
      return {
        '--paddingTopLength': (this.mActiveSearch === 'CHAN' ? 100 : 120) + (this.mSearchList.length > 0 ? 50 : 0) + 'px'
      }
    },
    GE_DISP_ALIM_LIST () {
      console.log(this.ALIM_LIST_RELOAD_CONT)
      var idx1, idx2
      var returnAlimList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      if (!this.mComputedYn) return
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mComputedYn = false
      for (i = 0; i < this.mAlimContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mAlimContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var teamKey = this.mAlimContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then((res) => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnAlimList.push(this_.mAlimContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              dataList = chanDetail.ELEMENTS.alimList
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.mAlimContentsList[i].contentsKey)
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
              if (idx2 !== -1) {
                this.mAlimContentsList[i] = dataList[idx2]
                returnAlimList.push(dataList[idx2])
              } else {
                returnAlimList.push(this_.mAlimContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mAlimContentsList[i].contentsKey)
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mAlimContentsList[i] = dataList[idx2]
            returnAlimList.push(dataList[idx2])
          } else {
            returnAlimList.push(this.mAlimContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (returnAlimList.length === 0) this.mEmptyYn = true
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.mComputedYn = true
      return this.replaceContentListArr(returnAlimList)
    },
    GE_DISP_BOAR_LIST () {
      var idx1, idx2
      var returnBoardList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      for (i = 0; i < this.mBoardContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mBoardContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var teamKey = this.mBoardContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then(() => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnBoardList.push(this_.mBoardContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              dataList = chanDetail.ELEMENTS.boardList
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.mBoardContentsList[i].contentsKey)
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
              if (idx2 !== -1) {
                this.mBoardContentsList[i] = dataList[idx2]
                returnBoardList.push(dataList[idx2])
              } else {
                returnBoardList.push(this_.mBoardContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          dataList = chanDetail.ELEMENTS.boardList
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mBoardContentsList[i].contentsKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mBoardContentsList[i] = dataList[idx2]
            returnBoardList.push(dataList[idx2])
          } else {
            returnBoardList.push(this.mBoardContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (returnBoardList.length === 0) this.mEmptyYn = true

      return this.replaceContentListArr(returnBoardList)
    },
    GE_DISP_ALL_LIST () {
      var idx1, idx2
      var returnAllList = []
      var chanDetail = null
      var dataList = null
      var i = 0
      for (i = 0; i < this.mAllContentsList.length; i++) {
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mAllContentsList[i].creTeamKey)
        if (idx1 === -1) {
          var this_ = this
          var jobkindId = this.mAllContentsList[i].jobkindId
          var teamKey = this.mAllContentsList[i].creTeamKey
          // eslint-disable-next-line vue/no-async-in-computed-properties
          this.$addChanList(teamKey).then(() => {
            idx1 = this_.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === teamKey)
            if (idx1 === -1) {
              returnAllList.push(this_.mAllContentsList[i])
            } else {
              chanDetail = this_.GE_MAIN_CHAN_LIST[idx1]
              if (jobkindId === 'ALIM') {
                dataList = chanDetail.ELEMENTS.alimList
              } else if (jobkindId === 'BOAR') {
                dataList = chanDetail.ELEMENTS.boardList
              }
              idx2 = dataList.findIndex((item) => item.contentsKey === this_.mAllContentsList[i].contentsKey)
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
              if (idx2 !== -1) {
                this.mAllContentsList[i] = dataList[idx2]
                returnAllList.push(dataList[idx2])
              } else {
                returnAllList.push(this_.mAllContentsList[i])
              }
            }
          })
        } else {
          chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          if (this.mAllContentsList[i].jobkindId === 'ALIM') {
            dataList = chanDetail.ELEMENTS.alimList
          } else if (this.mAllContentsList[i].jobkindId === 'BOAR') {
            dataList = chanDetail.ELEMENTS.boardList
          }
          idx2 = dataList.findIndex((item) => item.contentsKey === this.mAllContentsList[i].contentsKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
          if (idx2 !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mAllContentsList[i] = dataList[idx2]
            returnAllList.push(dataList[idx2])
          } else {
            returnAllList.push(this.mAllContentsList[i])
          }
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (returnAllList.length === 0) this.mEmptyYn = true

      return this.replaceContentListArr(returnAllList)
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_TEAM_LIST () {
      var index = null
      var teamList = this.GE_MAIN_CHAN_LIST
      if (this.mChannelList.length > 0) {
        for (var i = 0; i < this.mChannelList.length; i++) {
          index = teamList.findIndex((item) => item.teamKey === this.mChannelList[i].teamKey)
          if (index !== -1) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.mChannelList[i] = teamList[index]
          }
        }
      } else {
        teamList.forEach((item, index) => {
          this.mChannelList[index] = item
        })
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
  height: 35px;
  border-radius: 8px !important;
  padding: 0 0.4rem;
  padding-left: 2rem !important;
  box-sizing: border-box;
  float: left;
  border: 1px solid #cccccc;
}
.searchPageIconWich{ position: absolute; top:0.4rem; left: 8px;}
.chanListHeader {
  width: 100%;
  will-change: transform;
  transition: transform 0.3s linear;
  padding: 0 1.5rem;
  background-color: #FFF;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
}
.chanListHeader--pinned {
    transform: translateY(0%);
}
.chanListHeader--unpinned {
    transform: translateY(-100%);
}
</style>
