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
    <div style="padding: 10px 20px; background: rgb(255 255 255 / 89%); position: absolute; z-index: 9999; bottom: 10%; box-shadow: rgb(0 0 0 / 26%) 0px -6px 13px 4px; left: 10%; height: 80%; width: 80%; border-radius: 0.8rem 0.8rem 0.8rem 0.8rem; ">
        <!-- <div style="display: flex; align-items: center; padding: 0 20px; margin-top: 20px; width: 100%; height: 40px; position: relative; float: left;">
            <img style="width: 45px; margin-right: 5px;" src="/resource/logo/gtLogo.png" alt="">
            <p class="textOverdot textLeft font25" style="width: calc(100% - 40px);">{{ pAreaInfo.bdAreaNameMtext }} Area</p>
            <img class="cursorP" @click="closeXPop" style="position: absolute; right: 25px; top: 0px;" src="../../../assets/images/common/smallPopXIcon.svg" alt="">
        </div> -->
        <div class="font16 fontBold w100P" style="height: 50px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; width: calc(100% - 25px);">
            <img style="width: 45px; margin-right: 5px;" src="/resource/logo/gtLogo.png" alt="">
            <p class="textOverdot textLeft font25" style="width: calc(100% - 40px);">{{ pAreaInfo.bdAreaNameMtext }} Area</p>
            <!-- <p class="textOverdot textLeft" style="width: calc(100% - 40px);">{{ bdAreaNameMtext }}</p> -->
          </div>
          <div class="cursorP" @click="closeXPop" style="width: 25px;">
            <img style="width: 25px;" src="../../../assets/images/common/popup_close.png" alt="">
          </div>
        </div>
        <!-- <div id="pageHeader" ref="pushListHeader" style="" class="pushListHeader" >
            <div style="position: absolute; right: 50px;width: 30px; height: 30px; border-radius: 100%; display: flex; align-items: center; justify-content: center; " @click="refreshAll">
                <img src="../../../assets/images/common/commonReload.png" class="cursorP" width="30" height="30" @click="refreshAll"/>
            </div>
            <gSelectFilter :searchYn='true' @changeSearchList="requestSearchList"  @openFindPop="findPopShowYn = true " :resultSearchKeyList="resultSearchKeyList" ref="activeBar" class="fl" style="width: 100%; padding-top: 0; margin-top: 0;" />
        </div> -->
        <div style="float: left; width: 100%; padding: 20px 0px;">
            <select class="fl" style="height: 35px; width: 95px; margin-right: 5px" name="contListFilter" v-model="viewTab" id="contListFilter" @change="changeTab()">
                <option v-for="(opt, index) in mCommonFilterList" :key="index" :value="opt.name">{{opt.display}}</option>
            </select>
            <div @click="openFindPop" class="cursorP font14 lightGray" :style="resultSearchKeyList && resultSearchKeyList.length > 0? '':'margin-bottom: 10px;'" style="width: calc(100% - 100px); float: left; height: 35px; border-radius: 5px; border: 1px solid #ccc; background: #FFFFFF; text-align: left; padding: 5px 10px; ">Click to Search</div>
            <div v-if="resultSearchKeyList && resultSearchKeyList.length > 0" class="pagePaddingWrap fl" style="padding-top: 0; padding-left: 0px; max-height: 50px; width: 100%; float: left">
                <searchResult @changeSearchList="requestSearchList" :searchList="resultSearchKeyList" />
            </div>
        </div>
        <div ref="pushListWrapWrapCompo" style="width: 100%; height: calc(100% - 190px); overflow: hidden auto;">
            <template v-for="(cont, index) in this.GE_DISP_CONTS_LIST" :key="index" >
                <gBtnSmall style="margin-bottom: 10px;" @click="confirmOk(cont)" :btnTitle="cont.followerKey? 'Followed':'Follow'" :btnThema="cont.followerKey? '':'light'" class="fr" />
                <gContentsBox  :pUnknownYn="false" ref="myContentsBox"  @openImgPop="openImgPop" :imgClickYn="true" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" :propContIndex='index' @contDelete='contDelete' />
                <myObserver v-if="this.GE_DISP_CONTS_LIST && this.GE_DISP_CONTS_LIST.length > 13 ?  index === this.GE_DISP_CONTS_LIST.length - 13 : index === this.GE_DISP_CONTS_LIST.length" @triggerIntersected="loadMore" id="observer" class="fl w100P" style="float: left;"></myObserver>
            </template>
        </div>
        <div style="height: 50px; padding: 10px 0; display: flex; justify-content: flex-end;">
          <gBtnSmall @click="goChannelMain(this.pAreaInfo)" btnTitle="Go Channel" class="fr" />
        </div>
        <transition name="showModal">
            <findContentsList ref="findContentRef" transition="showModal" @searchList="requestSearchList" v-if="mFindPopShowYn" @closePop="this.mFindPopShowYn = false" />
        </transition>
    </div>
</template>

<script>
import searchResult from '@/components/unit/Tal_searchResult.vue'
import findContentsList from '@/components/popup/common/D_findContentsList.vue'
export default {
  components: {
    findContentsList,
    searchResult
  },
  props: {
    pClosePop: Function,
    pTownTeamKey: Number,
    pAreaInfo: Object
  },
  data () {
    return {
      mCommonFilterList: [{ display: 'Popular', name: 'P' }, { display: 'Recent', name: 'N' }],
      viewTab: 'P',
      popId: 'mainBoardListPop',
      mCabKeyListStr: null,
      mAxiosQueue: [],
      findKeyList: {},
      resultSearchKeyList: [],
      mCanLoadYn: true,
      mEndListYn: false,
      mContsList: [],
      mPageSize: 20,
      mOffsetInt: 0,
      mFindPopShowYn: false,
      mMemberTypeList: [],
      selectMemberObj: {},
      mSaveFollowerParam: {}
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    var this_ = this
    this.getTownCabinetList().then((res) => {
      this.getMyContentsList().then((result) => {
        this_.setContsList(result)
      })
    })
  },
  methods: {
    async confirmOk (cont) {
      console.log('cont', cont)
      this.mErrorPopShowYn = false
      // eslint-disable-next-line no-new-object
      this.mSaveFollowerParam = new Object()
      this.mSaveFollowerParam.teamKey = cont.creTeamKey
      this.mSaveFollowerParam.userKey = this.GE_USER.userKey
      this.mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
      var result = false
      if (cont.followerKey) {
        result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'CR' }, 'del')
        // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
        // this.CHANNEL_DETAIL.D_CHAN_AUTH = null
        // this.CHANNEL_DETAIL.followerKey = null
        // this.CHANNEL_DETAIL.userTeamInfo = null
        // this.CHANNEL_DETAIL.followerCount -= 1
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])

        this.$emit('showToastPop', '구독 취소가 완료되었습니다.')

        if (result.result || result) {
          cont.followerKey = null
        } else {
          this.mErrorPopBodyStr = '실패했습니다. 관리자에게 문의해주세요'
          this.mErrorPopBtnType = 'timeover'
          this.mErrorPopShowYn = true
        }
      } else {
        await this.okMember(cont)
        // this.mChanPopMessage = '[' + this.$changeText(this.CHANNEL_DETAIL.nameMtext) + '] 채널의 구독자가 되었습니다.<br>멤버가 되면<br>우리채널에 알림을 보낼 수 있어요!<br>멤버들끼리 자유롭게 소통할 수 있어요!'
        // this.openChannelMsgPop()
      }
    },
    async getMemberTypeList (teamKey) {
      var param = {}
      param.teamKey = teamKey
      // param.cateItemKey = this.propCateItemKey
      var memberTypeList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemberTypeList',
        param: param
      })
      if (memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
        if (this.mMemberTypeList.length > 0) {
          this.selectMemberObj = this.mMemberTypeList[0]
        }
      }
    },
    async okMember (cont) {
      await this.getMemberTypeList(cont.creTeamKey)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.selectMemberObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemberTypeItemList',
        param: param
      })
      console.log('--------------------------')
      console.log(memberTypeItemList)
      if (memberTypeItemList.data.result) {
        // if (memberTypeItemList.data.memberTypeItemList.length === 0) {
        // eslint-disable-next-line no-new-object
        var typeParam = new Object()
        if (cont.followerKey) {
          typeParam.followerKey = cont.followerKey
        }
        if (this.selectMemberObj.memberTypeItemKey) {
          typeParam.memberTypeItemKey = this.selectMemberObj.memberTypeItemKey
        }
        typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
        typeParam.userKey = this.GE_USER.userKey
        typeParam.teamKey = cont.creTeamKey
        // eslint-disable-next-line no-debugger
        debugger
        await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveFollower',
          param: { follower: typeParam, appType: 'UB', doType: 'CR' }
        })
        // } else {
        //   this.selectMemberObj.initData = memberTypeItemList.data.memberTypeItemList
        //   return true
        // }
        // this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
        // this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn = true
        // this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext = 'member'
        // this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        // await this.$addChanList(this.mChanInfo.teamKey)
        cont.followerKey = true
      } else {
        this.$showToastPop(this.$t('ERROR_MSG_INQUIRY_MANAG'))
        return false
      }
      this.$emit('closeLoading')
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.areaInfo = this.pAreaInfo
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    async changeTab () {
      this.requestSearchList()
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    openPop (openPopParam) {
      // 컨텐츠 작성을 누를 시 바텀시트를 닫아주는 중!
      if (this.mSeleteWriteTypePopShowYn === true) this.mSeleteWriteTypePopShowYn = false
      console.log(openPopParam)
      this.$emit('openPop', openPopParam)
    },
    contDelete (contentIndex) {
      // console.log(contentIndex)
      // console.log(this.GE_DISP_CONTS_LIST[contentIndex])
      this.GE_DISP_CONTS_LIST.splice(contentIndex, 1)

      // 삭제 후 리로드가 되지 않아 상위 div에 reload키를 넣어 다시 그려주었습니다. -- 다시 그려도 스크롤 이동하지 않았음
      this.mReloadKey += 1
    },
    openFindPop () {
      this.mFindPopShowYn = true
    },
    closeFindPop () {
      if (this.$refs.findContentRef) {
        this.$refs.findContentRef.closeXPop()
      }
    },
    async refreshAll () {
      // 새로고침
      this.mSearchList = []
      this.offsetInt = 0
      this.mOffsetInt = 0
      this.mPageSize = 20
      this.mCanLoadYn = true
      var ScrollWrap = this.$refs.pushListWrapWrapCompo
      ScrollWrap.scrollTo({ top: 0 })
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
    async requestSearchList (param) {
      this.offsetInt = 0
      this.mContsList = []
      this.findKeyList.searchKey = null
      this.findKeyList.creTeamNameMtext = null
      this.findKeyList.toCreDateStr = null
      this.findKeyList.fromCreDateStr = null
      this.resultSearchKeyList = []
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
      /* console.log(data)
      var searchObj = {}
      var index = null
      var mSearchList = []
      if (data.searchKey) {
        searchObj = { accessKind: 'title', accessKey: data.searchKey, dispName: data.searchKey, searchType: '제목' }
        index = mSearchList.findIndex(item => item.searchType === '제목')
        if (index !== -1) {
          mSearchList.splice(index, 1)
        }
        mSearchList.push(searchObj)
      }
      if (data.creTeamNameMtext) {
        searchObj = { accessKind: 'nameMtext', accessKey: data.creTeamNameMtext, dispName: data.creTeamNameMtext, searchType: '채널명' }
        index = mSearchList.findIndex(item => item.searchType === '채널명')
        if (index !== -1) {
          mSearchList.splice(index, 1)
        }
        mSearchList.push(searchObj)
      }
      if (data.creUserName) {
        searchObj = { accessKind: 'creUserName', accessKey: data.creUserName, dispName: data.creUserName, searchType: '작성자' }
        index = mSearchList.findIndex(item => item.searchType === '작성자')
        if (index !== -1) {
          mSearchList.splice(index, 1)
        }
        mSearchList.push(searchObj)
      }
      if (data.fromCreDateStr && data.toCreDateStr) {
        searchObj = { accessKind: 'creDateStr', accessKey: data.fromCreDateStr + '~' + data.toCreDateStr, dispName: data.fromCreDateStr + '~' + data.toCreDateStr, searchType: '날짜' }
        index = mSearchList.findIndex(item => item.searchType === '날짜')
        if (index !== -1) {
          mSearchList.splice(index, 1)
        }
        mSearchList.push(searchObj)
      }
      if (data.selectedSticker) {
        searchObj = { accessKind: 'SK', accessKey: data.selectedSticker.stickerKey, dispName: this.$changeText(data.selectedSticker.nameMtext), searchType: '분류' }
        index = mSearchList.findIndex(item => item.searchType === '분류')
        if (index !== -1) {
          mSearchList.splice(index, 1)
        }
        mSearchList.push(searchObj)
      }
      console.log(mSearchList) */
      this.closeFindPop()
      var resultList = await this.getMyContentsList(null, null, false)
      this.setContsList(resultList)
    },
    setSearchParam (searchList) {
      if (searchList) {
        var param = {}
        for (var i = 0; i < searchList.length; i++) {
          const searchObj = searchList[i]
          if (searchObj.accessKind !== 'SK' && searchObj.accessKind !== 'creDate') {
            param[searchObj.accessKind] = searchObj.accessKey
          } else if (searchObj.accessKind === 'creDateStr') {
            const creDateStr = searchObj.accessKey
            const fromDateStr = creDateStr.split('~')[0]
            const toDateStr = creDateStr.split('~')[1]
            param.fromCreDateStr = fromDateStr
            param.toCreDateStr = toDateStr
          } else if (searchObj.accessKind === 'SK') {
            param.findActStickerYn = true
            param.stickerKey = searchObj.searchKey
          }
          var this_ = this
          this.mContsList = []
          this.getMyContentsList(null, null, null, param).then((result) => {
            this_.setContsList(result)
          })
        }
      }
    },
    async getTownCabinetList () {
      if (this.pTownTeamKey) {
        var param = {}
        param.parentTeamKey = this.pTownTeamKey
        var result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getTownCabinetList',
          param: param
        })
        if (result.data.result) {
          this.mCabKeyListStr = result.data.cabinetKeyListStr
        }
        console.log(result)
      }
    },
    async setContsList (resultList) {
      if (!resultList || resultList === '') return
      var newArr = []
      this.endListSetFunc(resultList)
      /* var cont
      var tempContentDetail
      var contentDetail */
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      // this.endListSetFunc(resultList)
      if (this.mContsList.length > 0) {
        newArr = [
          ...this.mContsList,
          ...resultList.content
        ]
      } else {
        newArr = resultList.content
      }
      this.mContsList = this.replaceArr(newArr)
    },
    async loadMore (descYn) {
      console.log(' Main Contents List LoadMore ')
      if (this.mCanLoadYn && this.mEndListYn === false) {
        this.mCanLoadYn = false
        try {
          var resultList = await this.getMyContentsList(null, null, false)
          this.setContsList(resultList)
        } catch (e) {
          console.log(e)
        } finally {
          this.mCanLoadYn = true
          var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
          if (queueIndex !== -1) this.mAxiosQueue.splice(queueIndex, 1)
        }
      } else {
      }
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn, searchParam) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}
      if (searchParam) {
        param = searchParam
      }
      if (this.viewTab === 'P') {
        param.orderbyStr = 'a.popPoint DESC'
      } else if (this.viewTab === 'N') {
        param.orderbyStr = 'a.creDate DESC'
      }
      param.myUserKey = this.GE_USER.userKey
      param.cabinetKeyListStr = this.mCabKeyListStr
      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }

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
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
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
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.contentsKey) === Number(current.contentsKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    closeXPop () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        if (this.pClosePop) {
          this.pClosePop()
        }
      } else {
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CONTS_LIST () {
      try {
        var idx1, idx2
        var returnContsList = []
        var chanDetail = null
        var dataList = null
        var i = 0
        if (!this.mContsList.length === 0) return []
        for (i = 0; i < this.mContsList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mContsList[i].creTeamKey)
          if (idx1 === -1) {
            var this_ = this
            returnContsList.push(this_.mContsList[i])
          } else {
            chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
            dataList = chanDetail.ELEMENTS.boardList
            idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
            if (idx2 !== -1) {
              returnContsList.push(dataList[idx2])
            } else {
              returnContsList.push(this.mContsList[i])
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log(returnContsList)
      return this.replaceArr(returnContsList)
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.closeXPop()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  }
}
</script>

<style scoped>

</style>
