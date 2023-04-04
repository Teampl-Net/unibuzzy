<template>
  <div style="width: 100%; min-height: 100px; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-bottom: 40px; " :key="mReloadKey" >
        <template v-for="(cont, index) in this.GE_DISP_CONTS_LIST" :key="index" >
            <gContentsBox :pOpenUnknownLoginPop="pOpenUnknownLoginPop" :pUnknownYn="pUnknownYn" ref="myContentsBox" @requestSearchSticker="requestSearchSticker" @openImgPop="openImgPop" :imgClickYn="true" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" :propContIndex='index' @contDelete='contDelete' />
            <myObserver v-if="this.GE_DISP_CONTS_LIST && this.GE_DISP_CONTS_LIST.length > 9 ?  index === this.GE_DISP_CONTS_LIST.length - 9 : index === this.GE_DISP_CONTS_LIST.length" @triggerIntersected="loadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver>
        </template>
        <div class="fl" style="width: 40px; height: 40px;border-radius: 100%; position: absolute; bottom: 6rem; right: 50px; z-index:1;">
            <img id='writeBtn' src="../../../assets/images/button/Icon_WriteAlimBtn.png" @click="openSelectWriteTypePop()" alt="알림 작성 버튼" style="height: auto; cursor: pointer;" class="img-w66 fl">
        </div>
        <div v-if="mSeleteWriteTypePopShowYn" @click="mSeleteWriteTypePopShowYn = false" style="width: 100%; height: 100%; position: absolute; z-index: 10; left: 0; top: 0; background: #00000030;"></div>
        <transition name="showUp">
            <writeBottSheet transition="showUp" v-if="mSeleteWriteTypePopShowYn" @openPop='openPop' @closePop='mSeleteWriteTypePopShowYn = false' :propChanList='mSelectChanList' />
        </transition>
        <transition name="showModal">
            <findContentsList transition="showModal" @searchList="requestSearchList" v-if="mFindPopShowYn" @closePop="this.mFindPopShowYn = false" />
        </transition>
    </div>
  <!-- <attachFileListPop :propFileData="this.mFilePopData" v-if="mFilePopYn === true" @closePop="mFilePopYn = false"/> -->
</template>

<script>
// import attachFileListPop from './unit/D_commonAttatchFileListPop.vue'
import writeBottSheet from './unit/D_contentsWriteBottSheet.vue'
import findContentsList from '@/components/popup/common/D_findContentsList.vue'
export default {
  components: {
    // attachFileListPop,
    writeBottSheet,
    findContentsList
  },
  data () {
    return {
      mOffsetInt: 1,
      mPageSize: 20,
      mAxiosQueue: [],
      mContsList: [],
      mCanLoadYn: true,
      mEndListYn: false,
      mSelectedWriteType: 'ALIM',
      mSelectChanList: [],
      mSeleteWriteTypePopShowYn: false,

      // 첫 진입과 삭제 후 리스트를 다시 못 그려주기에 watch 추가
      mReloadKey: 0,
      mCreateYn: true,
      mFindPopShowYn: false,
      mSelectedStickerKeY: null,
      mLoadMoreAxiosObj: {}
      // mFilePopYn: false,
      // mFilePopData: {}
      //
    }
  },
  props: {
    pOpenUnknownLoginPop: Function,
    propUserKey: {},
    propTab: {},
    pMainAlimList: {},
    pUnknownYn: {}
  },
  methods: {
    requestSearchSticker (data) {
      this.requestSearchList(data)
    },
    requestSearchList (data) {
      console.log(data)
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
        searchObj = { accessKind: 'creUserName', accessKey: data.fromCreDateStr + '~' + data.toCreDateStr, dispName: data.fromCreDateStr + '~' + data.toCreDateStr, searchType: '날짜' }
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
      this.$emit('goSearchDirect', mSearchList)
      this.mFindPopShowYn = false
    },
    openFindPop () {
      this.mFindPopShowYn = true
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    // fileDownload (fileData) {
    //   if (!fileData) return
    //   this.mFilePopData = fileData
    //   if (this.mFilePopData.attachFileList.length > 0) {
    //     this.mFilePopYn = true
    //   }
    // },
    contDelete (contentIndex) {
      // console.log(contentIndex)
      // console.log(this.GE_DISP_CONTS_LIST[contentIndex])
      this.GE_DISP_CONTS_LIST.splice(contentIndex, 1)

      // 삭제 후 리로드가 되지 않아 상위 div에 reload키를 넣어 다시 그려주었습니다. -- 다시 그려도 스크롤 이동하지 않았음
      this.mReloadKey += 1
    },
    openPop (openPopParam) {
      // 컨텐츠 작성을 누를 시 바텀시트를 닫아주는 중!
      if (this.mSeleteWriteTypePopShowYn === true) this.mSeleteWriteTypePopShowYn = false
      console.log(openPopParam)
      this.$emit('openPop', openPopParam)
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn) {
      if (this.mAxiosQueue.length > 0 && this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !== -1) return
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}

      if (this.GE_USER.unknownYn) {
        param.jobkindId = 'BOAR'
      }
      param.ownUserKey = this.propUserKey
      param.subsUserKey = this.propUserKey
      param.allYn = true
      param.shareAuthInfoYn = false
      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }

      if (this.mSelectedStickerKey != null) {
        param.findActStickerYn = true
        param.findActYn = true
        param.stickerKey = this.mSelectedStickerKey
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      this.loadingYn = false
      return resultList
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
    async setClearList (resultList) {
      if (!resultList || resultList === '') return
      this.endListSetFunc(resultList)
      /* var cont
      var tempContentDetail
      var contentDetail */
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)
      this.mContsList = this.replaceArr(resultList.content)
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
    async refreshMainContList () {
      try {
        this.mContsList = []
        var resultList = await this.getMyContentsList(20, 0, false)
        this.setClearList(resultList)
        return resultList
      } catch (e) {
        console.log(e)
      } finally {
      }
    },
    async getContentsListForSticker (stickerKey) {
      if (stickerKey === null) stickerKey = null
      this.mSelectedStickerKey = stickerKey
      try {
        var returnList = await this.refreshMainContList()
        console.log(returnList)
        if (!returnList || returnList === '') returnList = []
        return returnList
      } catch (e) {
        console.log(e)
      } finally {
        this.mCanLoadYn = true
      }
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
        }
      } else {
      }
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
    async getTeamList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 100)
      // if (this.mSelectedWriteType === 'ALIM') {
      // 기본 선택값이 ALIM이기에 ALIM에 관한 CHANNEL를 얻기 위함
      paramMap.set('canSendAlim', true)
      // }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      if (resultList.data) {
        this.mSelectChanList = resultList.data.content
      } else {
        this.mSelectChanList = []
      }
    },
    async openSelectWriteTypePop () {
      if (this.GE_USER.unknownYn) {
        this.pOpenUnknownLoginPop()
        return
      }
      await this.getTeamList(true)
      this.mSeleteWriteTypePopShowYn = true
    }
  },
  created () {
    var this_ = this
    if (this.pMainAlimList) {
      this.mContsList = this.pMainAlimList
    }
    if (this.mContsList.length === 0) {
      this.getMyContentsList().then((result) => {
        this_.setContsList(result)
      })
    }
  },
  mounted () {
    // this.$delayAfterFunc(6000, this.check)
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    // eslint-disable-next-line vue/return-in-computed-property
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
            if (this.mContsList[i].jobkindId === 'ALIM') {
              dataList = chanDetail.ELEMENTS.alimList
            } else {
              dataList = chanDetail.ELEMENTS.boardList
            }
            idx2 = dataList.findIndex((item) => item.contentsKey === this.mContsList[i].contentsKey)
            if (idx2 !== -1) {
              // eslint-disable-next-line vue/no-side-effects-in-computed-properties
              // this.mContsList[i] = dataList[idx2]
              returnContsList.push(dataList[idx2])
            } else {
              returnContsList.push(this.mContsList[i])
            }
          }
        }

        return this.replaceArr(returnContsList)
      } catch (error) {
        console.log(error)
      }
    },
    GE_NEW_MEMO_LIST (state) {
      return this.$store.getters['D_CHANNEL/GE_NEW_MEMO_LIST']
    },
    GE_RECENT_NOTI_LIST () {
      return this.$store.getters['D_NOTI/GE_RECENT_NOTI_LIST']
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    }
  },
  watch: {
    GE_RECENT_NOTI_LIST () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.myContentsBox[0].addAnimation()
        }, 1500)
      })
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (!value[0] || !value) return
        newArr = [
          value[0],
          ...this.GE_DISP_CONTS_LIST
        ]
        this.mContsList = this.replaceArr(newArr)
      },
      deep: true
    },
    GE_NEW_MEMO_LIST: {
      async handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        // var memoContents = value[0]
        var content = null
        var index
        index = this.GE_DISP_CONTS_LIST.findIndex((item) => Number(item.contentsKey) === Number(value[0].targetKey))
        if (index !== -1) {
          content = this.GE_DISP_CONTS_LIST[index]
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.GE_DISP_CONTS_LIST[index])
        }

        if (!content) return

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
        var idx = this.mContsList.findIndex((item) => item.contentsKey === content.contentsKey)
        this.mContsList[idx].D_MEMO_LIST = this.replaceMemoArr(newArr)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [this.mContsList[idx]])
      },
      deep: true
    }
  }
}
</script>

<style scoped>

option {
    min-height: 25px;
}
</style>
