<template>
  <popHeader :headerTitle="`File Box`" @closeXPop="closeXPop"/>
  <div @click="click" id="fileBoxWrap" style="width: 100%; height: 100%; overflow: auto; padding: 60px 10px; background-color: #f4f7ff;" :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px;'">
    <div style="width: 100%; background-color: #fff; height: 140px; padding: 10px 0 10px 10px; border-radius: 0.8rem; display: flex; flex-direction: column; justify-content: space-between;">
      <div v-if="this.mMainChanList" style="width: 100%; height: 30px; float: left;">
        <img src="../../../assets/images/main/main_followIcon2.png" style="float: left; margin-right: 8px;" class="img-w23 cursorP" alt="">
        <p class="font20 fontBold deepBorderColor textLeft CDeepColor" style="line-height: 26px;">{{ $t('COMMON_NAME_CHANNEL') }}</p>
      </div>
      <div v-if="this.mMainChanList.length > 0" id="fileChannelWrap" :class="!isMobile? 'thinScrollBar':''" style="width: 100%; height: 85px; float: left; overflow: scroll hidden;" @wheel="horizontalScroll">
        <div style="height: 100%; min-width: 100%; display:flex;">
          <div class="cursorP" :style="selectedChannelIdx === 0? 'border: 2px solid #5F61BD;':'border: 0.5px solid rgba(0, 0, 0, 0.1);'" style="flex-shrink: 0; box-sizing: border-box; width: 65px; height: 65px; border-radius: 100%; float: left; margin-right: 10px; text-align: center; line-height: 65px; background-color: #fff;" @click="selectTeam(null, 0)">
            {{ $t('COMMON_TAB_ALL') }}
          </div>
          <chanRoundIcon :chanElement="chan" v-for="(chan, index) in this.mMainChanList" :selectedYn="selectedChannelIdx === index + 1? true:false" :key="index" @click="selectTeam(chan.teamKey, index+1)"/>
          <template v-if="this.mMainChanList.length === 0">
              <circleSkeleton v-for="(value) in 10" :key="value"/>
          </template>
        </div>
      </div>
    </div>

    <div id="fileFilterBox" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding-bottom: 8px; border-bottom: 1.8px solid #9598d8;">
      <div style="width: calc(100% - 40px); margin-left: 10px; height: 30px; margin-top: 10px; display: flex; gap: 10px; align-items: center;">
        <img src="../../../assets/images/common/common_filter.svg" style="width: 30px; height: auto;" alt="">
        <div class="filterIconWrap" @click="selectKind('ALIM')" :class="{'selectedIcon':(selectedKind==='ALIM')}">
          <img src="../../../assets/images/common/icon_alim.svg" style="width: 20px; height: auto;" alt="">
        </div>
        <div class="filterIconWrap" @click="selectKind('BOAR')" :class="{'selectedIcon':(selectedKind==='BOAR')}">
          <img src="../../../assets/images/common/icon_board_color.svg" style="width: 20px; height: auto;" alt="">
        </div>
        <div class="filterIconWrap" @click="selectKind('MEMO')" :class="{'selectedIcon':(selectedKind==='MEMO')}">
          <img src="../../../assets/images/common/icon_memo_filter.svg" style="width: 20px; height: auto;"  alt="">
        </div>
        <div style="height: 18px; border-right: 1.5px solid #AEB0FB; border-radius: 8px;"></div>
        <div class="filterIconWrap" @click="selectContType('F')" :class="{'selectedIcon':(selectedContType==='F')}">
          <img src="../../../assets/images/common/fileIcon.svg" style="width: 20px; height: auto;" alt="">
        </div>
        <div class="filterIconWrap" @click="selectContType('I')" :class="{'selectedIcon':(selectedContType==='I')}">
          <img src="../../../assets/images/common/fileType_img.svg" style="width: 20px; height: auto;" alt="">
        </div>
      </div>
      <div>
        <div class="filterIconWrap" style="margin-top: 10px; margin-right: 10px;" @click="openSearchPop">
          <img src="../../../../public/resource/menu/icon_search_color.svg" style="width: 20px; height: auto;" alt="">
        </div>
      </div>
    </div>
    <serachResult @changeSearchList="changeSearchList" :searchList="this.resultSearchKeyList" />

    <div style="width: 100%; height: auto; margin-top: 10px;" v-if="fileList.length > 0">
      <template v-for="(date, index) in dateList" :key="index">
        <div class="textLeft fontBold font14 attachFileBg" :style="index !== 0? 'margin-top: 30px;':'margin-top: 10px;'" style="clear: both; width: fit-content; padding: 0px 8px; border-radius: 5px; color: #fff;">{{ date }}</div>
        <div style="width: 98%; margin-left: 2%; margin-top: 8px;">
          <template v-for="(cont, index) in fileList" :key="index">
            <gFileBox @openImgPop="openImgPop" @openPop="openPop" listType="T" :contentsEle="cont" :key="index" v-if="$changeDateFormat(cont.creDate) === date"/>
          </template>
        </div>
        <myObserver v-if="index === this.dateList.length - 1" @triggerIntersected="loadMore" id="observer" class="fl w100P" style=""></myObserver>
      </template>
    </div>
    <gEmpty :contentName="contentName" v-else class="mtop-2"/>
  </div>
  <transition name="showModal">
    <findContentsList contentsListTargetType="fileBox" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
  </transition>
</template>

<script>
import findContentsList from '../../popup/common/D_findContentsList.vue'
import serachResult from '../../unit/Tal_searchResult.vue'
import chanRoundIcon from '../../pageComponents/main/D_chanRoundIcon.vue'
import circleSkeleton from '../../pageComponents/main/D_mainChanCircleSkeleton.vue'
export default {
  name: 'App',
  components: {
    chanRoundIcon,
    circleSkeleton,
    findContentsList,
    serachResult
  },
  async created () {
    // this.$emit('changePageHeader', 'File Box')
    this.getContentsList()
    var result = await this.getFileList(0)
    this.returnResultList(result)
    this.offsetInt = 1
  },
  data () {
    return {
      mMainChanList: [],
      fileList: [],
      dateList: [],
      selectedChannelIdx: 0,
      selectedTeamKey: null,
      selectedKind: null,
      selectedContType: null,
      findPopShowYn: false,
      findKeyList: {},
      resultSearchKeyList: [],
      offsetInt: 0,
      endListYn: false,
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      contentName: '파일함'
    }
  },
  watch: {
    fileList: {
      immediate: true,
      handler (value, old) {
        this.setDateList()
      },
      deep: true
    }
  },
  methods: {
    closeXPop () {
      this.$router.push('/mypage')
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY
      })
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    async requestSearchList (param) {
      this.selectedChannelIdx = 0
      this.selectedKind = null
      this.selectedContType = null
      this.offsetInt = 0
      if (param) {
        if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
          this.findKeyList.searchKey = param.searchKey
        } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
          this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
        } if (param.creUserName !== undefined && param.creUserName !== null && param.creUserName !== '') {
          this.findKeyList.creUserName = param.creUserName
        } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
          this.findKeyList.toCreDateStr = param.toCreDateStr
        } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
          this.findKeyList.fromCreDateStr = param.fromCreDateStr
        }
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
      this.findPopShowYn = false
      var result = await this.getFileList()
      this.returnResultList(result)
      await this.endListSetFunc(result.data)
    },
    async changeSearchList (type) {
      this.offsetInt = 0
      if (type === 'searchKey') {
        delete this.findKeyList.searchKey
      } else if (type === 'creDate') {
        delete this.findKeyList.toCreDateStr
        delete this.findKeyList.fromCreDateStr
      } else if (type === 'creUserName') {
        delete this.findKeyList.creUserName
      }
      this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)

      this.findPopShowYn = false
      var result = await this.getFileList()
      this.returnResultList(result)
      await this.endListSetFunc(result.data)
    },
    openSearchPop () {
      this.findPopShowYn = true
    },
    closeSearchPop () {
      this.findPopShowYn = false
    },
    openPop (value) {
      this.$emit('openPop', value)
    },
    async selectKind (kind) {
      this.offsetInt = 0
      if (kind === this.selectedKind) {
        this.selectedKind = null
      } else {
        this.selectedKind = kind
      }
      var result = await this.getFileList()
      this.returnResultList(result)
      await this.endListSetFunc(result.data)
    },
    async selectTeam (teamKey, index) {
      this.selectedChannelIdx = index
      this.selectedContType = null
      this.selectedKind = null
      this.offsetInt = 0
      if (teamKey) {
        this.selectedTeamKey = teamKey
      } else {
        this.selectedTeamKey = null
      }
      var result = await this.getFileList()
      this.returnResultList(result)
      await this.endListSetFunc(result.data)
    },
    async selectContType (contType) {
      this.offsetInt = 0
      if (contType === this.selectedContType) {
        this.selectedContType = null
      } else {
        this.selectedContType = contType
      }
      var result = await this.getFileList()
      this.returnResultList(result)
      await this.endListSetFunc(result.data)
    },
    returnResultList (result) {
      if (result.data === '') return
      var resultFileList = result.data.content.filter((item) => {
        return item.contents
      })
      resultFileList = resultFileList.sort(function (a, b) { // num으로 오름차순 정렬
        return b.creDate - a.creDate
      })
      if (this.selectedKind === 'ALIM') {
        resultFileList = resultFileList.filter(item => {
          return item.contents.jobkindId === 'ALIM'
        })
      } else if (this.selectedKind === 'BOAR') {
        resultFileList = resultFileList.filter(item => {
          return item.contents.jobkindId === 'BOAR'
        })
      }
      if (this.selectedContType === 'F') {
        resultFileList = resultFileList.filter(item => {
          return item.fileType === 'F'
        })
      } else if (this.selectedContType === 'I') {
        resultFileList = resultFileList.filter(item => {
          return item.fileType === 'I'
        })
      }
      this.fileList = resultFileList
    },
    async getFileList (nonLoadingYn) {
      var paramMap = new Map()
      if (JSON.stringify(this.findKeyList) !== '{}') {
        // eslint-disable-next-line no-new-object
        if (this.findKeyList.searchKey !== undefined && this.findKeyList.searchKey !== null && this.findKeyList.searchKey !== '') {
          paramMap.set('fileName', this.findKeyList.searchKey)
        } if (this.findKeyList.toCreDateStr !== undefined && this.findKeyList.toCreDateStr !== null && this.findKeyList.toCreDateStr !== '') {
          paramMap.set('toCreDateStr', this.findKeyList.toCreDateStr)
        } if (this.findKeyList.fromCreDateStr !== undefined && this.findKeyList.fromCreDateStr !== null && this.findKeyList.fromCreDateStr !== '') {
          paramMap.set('fromCreDateStr', this.findKeyList.fromCreDateStr)
        } if (this.findKeyList.creUserName !== undefined && this.findKeyList.creUserName !== null && this.findKeyList.creUserName !== '') {
          paramMap.set('creUserName', this.findKeyList.creUserName)
        }
      }
      if (this.selectedKind) {
        if (this.selectedKind === 'ALIM' || this.selectedKind === 'BOAR') {
          paramMap.set('accessKind', 'C')
        } else if (this.selectedKind === 'MEMO') {
          paramMap.set('accessKind', 'R')
        }
      }
      if (this.selectedTeamKey) {
        paramMap.set('creTeamKey', this.selectedTeamKey)
      }
      paramMap.set('ownUserKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 10)
      paramMap.set('offsetInt', this.offsetInt)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMyFileList',
        param: Object.fromEntries(paramMap)
      }, nonLoadingYn)
      console.log(result)
      return result
    },
    async getContentsList () {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      var nonLoading = true

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      this.mMainChanList = resultList.data.content
      var newArr = []
      for (var i = 0; i < this.mMainChanList.length; i++) {
        if (!this.$getDetail('TEAM', this.mMainChanList[i].teamKey) || this.$getDetail('TEAM', this.mMainChanList[i].teamKey).length === 0) {
          newArr.push(this.mMainChanList[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
    },
    setDateList () {
      var newArr = []
      var idx
      for (var i = 0; i < this.fileList.length; i++) {
        idx = newArr.indexOf(this.$changeDateFormat(this.fileList[i].creDate))
        if (idx === -1) {
          newArr.push(this.$changeDateFormat(this.fileList[i].creDate))
        }
      }
      this.dateList = newArr
    },
    async castingSearchMap (param) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
        searchObj.typeName = '파일명'
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
      if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '' &&
        param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
        searchObj.typeName = '날짜'
        searchObj.type = 'creDate'
        searchObj.keyword = param.fromCreDateStr + '~' + param.toCreDateStr
        resultArray.push(searchObj)
      }
      return resultArray
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
    replaceFileArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => Number(item.fileKey) === Number(current.fileKey)) === -1) {
        /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.creDate - a.creDate
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    async loadMore () {
      if (this.endListYn === false) {
        var newArr = []
        var result = await this.getFileList(true)
        if (result === undefined || result === '') {
          return
        }
        newArr = [
          ...this.fileList
        ]
        this.returnResultList(result)
        newArr = [
          ...newArr,
          ...this.fileList
        ]
        this.fileList = this.replaceFileArr(newArr)
        await this.endListSetFunc(result.data)
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style lang="scss">
  .filterIconWrap {
    width: 35px;
    height: 35px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    box-shadow: rgba(103, 104, 167, 0.4) 0px 1px 3px;
  }
  .selectedIcon {
    border: 1.5px solid #5F61BD;
  }
</style>
