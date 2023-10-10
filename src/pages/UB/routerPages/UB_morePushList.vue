<template>
  <gPopHeader :headerTitle="`Saved`" @closeXPop="closeXPop"/>
  <div class="w100P h100P moreListWrap">
    <transition name="showModal">
      <findContentsList v-if="findPopShowYn" :tpGroupCode="false" contentsListTargetType="BOAR" transition="showModal" @searchList="requestSearchList" :pClosePop="closeSearch" />
    </transition>
    <searchResult class="pTop10" v-if="resultSearchKeyList.length > 0" :searchList="resultSearchKeyList" @changeSearchList="changeSearchList" />
    <div class="moreListBox">
      <div id="pushListWrap" class="pushListWrapWrap " ref="pushListWrapWrapCompo" :style="'padding: 0 1rem ; padding-top: calc(' + paddingTop + 'px + 1rem);'">
        <template  v-for="(cont, index) in GE_DISP_CONT_LIST" :key="cont.contentsKey">
          <gUBContentsBox @openImgPop="openImgPop" @openPage="goChannelMain" :imgClickYn="false" ref="myContentsBox" :propDetailYn="false" :contentsEle="cont" @openPop="openPop" @fileDownload="fileDownload"/>
          <myObserver v-if="index === GE_DISP_CONT_LIST.length - 5" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
        </template>
        <template v-if="mSkeletonShowYn">
          <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
        </template>
        <gEmpty :tabName="`스크랩`" contentName="게시판" v-else-if="GE_DISP_CONT_LIST.length === 0" :key="mEmptyReloadKey" class="mtop-2"/>
      </div>
    </div>
    <div @click="openSearch" class="cursorP searchBtnWrap" :style="'bottom:' + ($STATUS_HEIGHT + 80)+ 'px'">
      <img src="@/assets/images/button/icon_search_color.svg" alt="search btn">
    </div>
  </div>
</template>

<script>
import findContentsList from '@/components/popup/FindContentsList.vue'
import SkeletonBox from '@/components/unit/contents/ContentsSkeleton'
import searchResult from '@/components/unit/SearchResult.vue'
export default {
  components: {
    findContentsList,
    searchResult,
    SkeletonBox
  },
  props: {
    propParams: Object
  },
  created () {
    if (this.propParams && this.propParams.targetType === 'totalSaveList') {
      this.mContentsList = this.propParams.saveList
    } else {
      this.mSkeletonShowYn = true
      this.offsetInt = 0
      this.loadMore()
    }
  },
  data () {
    return {
      mContentsList: [],
      endListYn: false,
      offsetInt: 0,
      findKeyList: {},
      findPopShowYn: false,
      resultSearchKeyList: [],
      mSkeletonShowYn: false
    }
  },
  methods: {
    openImgPop (params) {
      this.$emit('openImgPop', params)
    },
    openPop (params) {
      this.$emit('openPop', params)
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      pageParam.cabinetKeyListStr = this.mCabKeyListStr
      this.$emit('openPage', pageParam)
    },
    closeXPop () {
      this.$router.push('/mypage')
    },
    async changeSearchList (value) {
      this.resultSearchKeyList = this.resultSearchKeyList.filter(item => {
        return item.type !== value
      })
      if (value === 'searchKey') {
        this.findKeyList.searchKey = ''
      }
      if (value === 'creUserName') {
        this.findKeyList.creUserName = ''
      }
      if (value === 'creTeamNameMtext') {
        this.findKeyList.creTeamNameMtext = ''
      }
      if (value === 'creDate') {
        this.findKeyList.toCreDateStr = ''
        this.findKeyList.fromCreDateStr = ''
      }
      this.mOffsetInt = 0
      var resultList = await this.getContentsList()
      var newArr = []
      if (newArr.length > 0) {
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', newArr)
      }
      this.mContentsList = resultList.content
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
      } else {
        this.endListYn = false
      }
    },
    openSearch () {
      this.findPopShowYn = true
    },
    closeSearch () {
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
      if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
        searchObj.typeName = '작성자'
        searchObj.type = 'creUserName'
        searchObj.keyword = param.creUserName
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
      this.findPopShowYn = false
      return resultArray
    },
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
        }
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      var resultList = await this.getContentsList()
      if (resultList === '') {
        this.mContentsList = []
      } else {
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', resultList.content)
        var newArr = []
        newArr = [
          ...resultList.content
        ]
        this.mContentsList = this.replaceArr(newArr)
        this.endListSetFunc(resultList)
      }
      this.findPopShowYn = false
    },
    replaceArr (arr) {
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
    endListSetFunc (resultList) {
      if (resultList === undefined || resultList === null || resultList === '') return
      if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
        this.endListYn = true
        if (this.offsetInt > 0) this.offsetInt -= 1
        console.log('end')
      } else {
        this.endListYn = false
        this.offsetInt += 1
      }
    },
    async getContentsList () {
      var param = {}

      param.DESCYn = true
      param.findActLikeYn = false
      param.findActStarYn = true
      param.findActYn = true
      param.findLogReadYn = null
      param.jobkindId = 'BOAR'
      param.offsetInt = this.offsetInt
      param.ownUserKey = this.GE_USER.userKey
      param.pageSize = 20
      param.subsUserKey = this.GE_USER.userKey
      if (this.findKeyList.searchKey) {
        param.title = this.findKeyList.searchKey
      }
      if (this.findKeyList.creUserName) {
        param.creUserName = this.findKeyList.creUserName
      }
      if (this.findKeyList.creTeamNameMtext) {
        param.creTeamNameMtext = this.findKeyList.creTeamNameMtext
      }
      if (this.findKeyList.toCreDateStr) {
        param.toCreDateStr = this.findKeyList.toCreDateStr
      }
      if (this.findKeyList.fromCreDateStr) {
        param.fromCreDateStr = this.findKeyList.fromCreDateStr
      }

      var result = await this.$getContentsList(param, false)
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', result.content)

      return result
    },
    async loadMore () {
      if (this.endListYn === false) {
        var newArr = []
        try {
          var result = await this.getContentsList(true)
          if (result === undefined || result === '') {
            return
          }
          newArr = result.content
          newArr = [
            ...newArr,
            ...this.GE_DISP_CONT_LIST
          ]
          this.mContentsList = await this.replaceArr(newArr)
          this.mSkeletonShowYn = false
          await this.endListSetFunc(result)
        } catch (e) {
          console.log(e)
        } finally {
          this.canLoadYn = true
        }
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CONT_LIST () {
      var idx1, idx2
      var contList = this.mContentsList
      var test = this.GE_MAIN_CHAN_LIST
      console.log('여기입니다')
      console.log(test)
      for (var i = 0; i < contList.length; i++) {
        idx1 = test.findIndex((item) => item.teamKey === contList[i].creTeamKey)
        if (idx1 === -1) {
        } else {
          var detailData = test[idx1]
          if (detailData.ELEMENTS) {
            idx2 = detailData.ELEMENTS.alimList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
            if (idx2 !== -1) {
              contList[i] = detailData.ELEMENTS.alimList[idx2]
            } else {
              idx2 = detailData.ELEMENTS.alimList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
              if (idx2 !== -1) {
                contList[i] = detailData.ELEMENTS.boardList[idx2]
              }
            }
          }
        }
      }
      if (contList.length > 5) {
        contList.splice(5, 0)
      }
      return contList
    },
    GE_NEW_CONT_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_NEW_CONT_LIST']
    }
  }
}
</script>

<style scoped>
.moreListWrap {
  padding-top: 50px;
  padding-bottom: 60px;
}
.pTop10 {
  padding-top: 10px !important;
}
.moreListBox {
  width: 100%;
  height: 100%;
  float: left;
  background: rgb(220, 221, 235);
  position: relative;
  padding-top: 30px;
}
.pushListWrapWrap {
  position: relative;
  float: left;
  width: 100%;
  overflow: hidden scroll;
  height: 100%;
  padding-bottom: 60px;
}
.searchBtnWrap {
  position: absolute;
  cursor: pointer;
  right: 10%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #8B8AD1;
  width: 50px;
  height: 50px;
  background-color: #fff;
}
.searchBtnWrap > img {
  width: 50%;
}
</style>
