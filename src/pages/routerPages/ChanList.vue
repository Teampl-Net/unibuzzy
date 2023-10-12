<template>
  <div class="w100P h100P chanListArea" :style="'padding-top: ' + (Number($STATUS_HEIGHT) + 50 )+ 'px'">
    <div class="w100P filterWrap">
      <select v-model="showArray" class="mright-05">
        <option value="recent" class="font16 orderOption">Recent</option>
        <option value="popular" class="font16 orderOption">Popular</option>
        <option value="name" class="font16 orderOption">Name</option>
      </select>
      <div class="mright-05 reloadWrap" :style="'bottom:' + ($STATUS_HEIGHT + 150)+ 'px'"  @click="refreshList">
          <img src="@/assets/images/common/commonReload.png" class="cursorP">
      </div>
      <div @click="$router.push('/findChan')" class="cursorP createChanBtnWrap" :style="'bottom:' + ($STATUS_HEIGHT + 60)+ 'px'">
        <img src="@/assets/images/button/icon_search_color.svg" alt="채널 만들기 버튼">
      </div>
    </div>
    <div class="chanListWrap">
      <div class="skeletonWrap" v-if="GE_DISP_TEAM_LIST.length === 0 && mEndListYn === false">
          <chanSkeleton  v-for="(value) in 10" :key="value"/>
      </div>
      <div id="chanListWrap" ref="chanListWrap" class="chanItemBox" :style="calcPaddingTop" @mousedown="testTwo" @mouseup="testTr">
          <gEmpty class="mTop50" :tabName="mCurrentTabName" contentName="채널" v-if="mEmptyYn && GE_DISP_TEAM_LIST.length === 0" />
          <template v-for="(chanEle, index) in GE_DISP_TEAM_LIST" :key="index">
            <gChannelCard class="moveBox chanRow cursorP" :chanElement="chanEle" @click="goChannelMain(chanEle)" @scrollMove="scrollMove" />
            <!-- <channelCard class="moveBox chanRow cursorP" :chanElement="chanEle" @scrollMove="scrollMove" /> -->
            <myObserver v-if="GE_DISP_TEAM_LIST.length > 0 && index === GE_DISP_TEAM_LIST.length - 3" @triggerIntersected="loadMore" class="fl wich" />
          </template>
      </div>
    </div>
  </div>
</template>

<script>

import chanSkeleton from '@/components/unit/channel/ChannelSkeleton.vue'
export default {
  name: 'user',
  components: {
    chanSkeleton
  },
  data () {
    return {
      mChannelList: [],
      mPaddingTop: 50,
      mChanListScrollBox: null,
      mScrolledYn: false,
      mOffsetInt: 0,
      mEndListYn: false,
      mViewTab: 'all',
      mActiveTabList: [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }],
      mChanFindPopShowYn: false,
      mCurrentTabName: this.$t('COMMON_TAB_ALL'),
      mEmptyYn: true,
      mLoadingYn: false,
      showArray: 'recent'
    }
  },
  props: {
    popYn: Boolean,
    propData: {},
    initData: {}
  },
  updated () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    if (this.mChanFindPopShowYn) {
      this.findPaddingTopChan()
    }
  },
  mounted () {
    this.mChanListScrollBox = document.getElementById('chanListWrap')
    this.$emit('closeLoading')
    this.mLoadingYn = false
  },
  created () {
    this.$emit('changePageHeader', this.$t('COMMON_NAME_CHANNELS'))
    if (this.propData) {
      if (this.propData.channelTabType !== undefined && this.propData.channelTabType !== null && this.propData.channelTabType !== '') {
        this.mViewTab = this.propData.channelTabType
      }
    }
    if (this.popYn === false) {
      localStorage.setItem('notiReloadPage', 'none')
    }
    if (this.initData && this.initData.targetType === 'chanList') {
      this.mChannelList = this.initData.content
      if (this.initData.totalElements < (this.initData.pageable.offset + this.initData.pageable.pageSize)) {
        this.mEndListYn = true
      } else {
        this.mEndListYn = false
      }
    } else {
      this.getChannelList(10, 0, true).then((res) => {
        var resultList = res
        var newArr = []
        for (var i = 0; i < resultList.content.length; i++) {
          if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
            newArr.push(resultList.content[i])
          }
        }
        if (newArr.length > 0) {
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', newArr)
        }
        this.mChannelList = resultList.content
        if (resultList.totalElements < (resultList.pageable.offset + resultList.pageable.pageSize)) {
          this.mEndListYn = true
        } else {
          this.mEndListYn = false
        }
      })
    }
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      this.$emit('showCloudLoading', false)
    }, 1000)
    this.introChanPageTab()
    this.mScrolledYn = false
    this.findPaddingTopChan()
  },
  methods: {
    goChannelMain (param) {
      const pageParam = {}
      pageParam.targetKey = param.teamKey
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      pageParam.areaInfo = this.pAreaInfo
      this.$emit('openPage', pageParam)
    },
    findPaddingTopChan () {
      // 검색 시 리스트와 검색팝업 패딩 설정
      var element = document.getElementById('searchResultWrapLength')
      if (element) {
        this.mPaddingTop = element.clientHeight + 50
      }
    },
    scrollMove () {
      if (this.GE_DISP_TEAM_LIST.length > 0) {
        var chanListWrap = this.$refs.chanListWrap
        chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    introChanPageTab () {
      if (this.mViewTab === 'user') {
        this.mCurrentTabName = this.$t('COMMON_TAB_FOLLOWING')
      } else if (this.mViewTab === 'all') {
        this.mCurrentTabName = this.$t('COMMON_TAB_ALL')
      } else if (this.mViewTab === 'mychannel') {
        this.mCurrentTabName = this.$t('COMMON_TAB_MANAGING')
      }
    },
    async refreshList () {
      this.mEndListYn = false
      this.mChannelList = []
      this.mScrolledYn = false
      var pSize = 10
      if (this.mOffsetInt !== 0 && this.mOffsetInt !== '0' && Number(this.mOffsetInt) > 0) {
        pSize = Number(this.mOffsetInt) * 10
      }
      this.endList = true
      var resultList = await this.getChannelList(pSize, 0, null)
      this.mChannelList = resultList.content
      var newArr = []
      for (var i = 0; i < resultList.content.length; i++) {
        if (!this.$getDetail('TEAM', resultList.content[i].teamKey) || this.$getDetail('TEAM', resultList.content[i].teamKey).length === 0) {
          newArr.push(resultList.content[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
      this.mChannelList = resultList.content
      var chanListWrap = await this.$refs.chanListWrap
      await chanListWrap.scrollTo({ top: 0, behavior: 'smooth' })
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
    async loadMore (pageSize) {
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
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', addList)
        }
        const newArr = [
          ...this.mChannelList,
          ...resultList.content
        ]
        this.mChannelList = newArr
      }
    },
    allChannelInfo () {
      for (var i = 0; i < this.GE_DISP_TEAM_LIST.length; i++) {
        if (this.GE_DISP_TEAM_LIST[i].userTeamInfo) {
          this.GE_DISP_TEAM_LIST[i].ownerYn = this.GE_DISP_TEAM_LIST[i].userTeamInfo.ownerYn
          if (this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey) {
            this.GE_DISP_TEAM_LIST[i].managerKey = this.GE_DISP_TEAM_LIST[i].userTeamInfo.managerKey
          }
        }
      }
    },
    async getChannelList (pageSize, offsetInput, mLoadingYn) {
      var paramMap = new Map()
      var userKey = this.GE_USER.userKey
      paramMap.set('fUserKey', userKey)
      if (this.showArray === 'popular') {
        paramMap.set('orderbyStr', 'followerCount DESC')
      } else if (this.showArray === 'recent') {
        paramMap.set('orderbyStr', null)
      } else if (this.showArray === 'name') {
        paramMap.set('orderbyStr', 'nameMtext')
      }
      if (offsetInput !== undefined) {
        paramMap.set('offsetInt', offsetInput)
      } else {
        if (this.mOffsetInt === 0 && this.mChannelList.length === 10) this.mOffsetInt = 1
        paramMap.set('offsetInt', this.mOffsetInt)
      }
      if (pageSize) {
        paramMap.set('pageSize', pageSize)
      } else {
        paramMap.set('pageSize', 10)
      }

      var result = await this.$getTeamList(paramMap, mLoadingYn)
      var resultList = result.data
      this.endListSetFunc(resultList)
      return resultList
    }
  },
  computed: {
    filteredData () {
      // 화면에 그려질 데이터를 계산하는 computed 속성
      const filteredList = this.mDataList.filter(item => {
        // 여기에 필터링 조건을 적용
        return item.someCondition // 예시 조건, 실제 조건으로 변경해야 함
      })
      return filteredList
    },
    calcPaddingTop () {
      return {
        '--paddingTopLength': this.mPaddingTop + 'px'
      }
    },
    GE_NEW_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_NEW_CHAN_LIST']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
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
      console.log('filter ------ GE_DISP_TEAM_LIST', this.mChannelList)
      return returnData
    },
    historyStack () {
      return this.$store.state.historyStack
    },
    GE_CREATE_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_CREATE_CHAN_LIST']
    },
    GE_REMOVE_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_REMOVE_CHAN_LIST']
    },
    GE_UPDATE_CHAN_LIST () {
      return this.$store.getters['UB_CHANNEL/GE_UPDATE_CHAN_LIST']
    }
  },
  watch: {
    showArray: {
      handler (value, old) {
        this.refreshList()
      }
    },
    GE_CREATE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        this.mChannelList.unshift(value[0])

        this.$store.dispatch('UB_CHANNEL/AC_CREATE_CHANNEL_DEL', value[0])
      },
      deep: true
    },
    GE_REMOVE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        var findDelIdx = this.mChannelList.findIndex(item => item.teamKey === value[0].teamKey)
        if (findDelIdx !== -1) {
          this.mChannelList.splice(findDelIdx, 1)
          this.$store.dispatch('UB_CHANNEL/AC_REMOVE_CHANNEL_DEL', value[0])
        } else {
          return false
        }
      },
      deep: true
    },
    GE_USER: {
      immediate: true,
      handler (val, old) {
        if (val.unknownYn) {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'all' }]
        } else {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
        }
      }
    },
    GE_UPDATE_CHAN_LIST: {
      handler (value, old) {
        if (!value || value.length === 0) return
        this.$addChanList(value[0].teamKey)
        this.$store.dispatch('UB_CHANNEL/AC_DEL_UPDATE_CHAN_LIST', value[0])
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.chanListArea {
  padding-bottom: 120px;
}
.filterWrap {
  padding-top: 20px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
}
.orderOption {
  width: 100%;
  height: 30px;
}
.reloadWrap {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
}
.reloadWrap > img {
  width: 90%;
}
.createChanBtnWrap {
  cursor: pointer;
  float: right;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: #fff;
}
.createChanBtnWrap > img {
  width: 90%;
}
.chanListWrap {
  width: 100%;
  height: 100%;
  float: left;
  background: #fff;
  position: relative;
}
.skeletonWrap {
  width: 100%;
  min-height: 100%;
}
.chanItemBox {
  overflow: hidden scroll;
  height: 100%;
  width: 100%;
}
.mTop50 {
  margin-top: 50px !important;
}
</style>
