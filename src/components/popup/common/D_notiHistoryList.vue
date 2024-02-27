<i18n>
{
  "ko": {
    "RECE_TITLE_NOTI": "최근 받은 알림",
    "RECE_MSG_NOTIDESC": "최근 이력은 앱 설치 후 받은 알림 이력이며, 앱 삭제 혹은 데이터 삭제 시 사라지게 됩니다.",
    "RECE_BTN_DELETE": "전체 삭제",
    "RECE_MSG_DELETE": "삭제 후 되돌릴 수 없습니다. 받은 이력을 삭제하시겠습니까?"
  },
  "en": {
    "RECE_TITLE_NOTI": "Recent Notifications",
    "RECE_MSG_NOTIDESC": "Recent Activities shows notifications you received after you install uniBuzzy app, so if you delete an app or data, it disappears.",
    "RECE_BTN_DELETE": "Delete All",
    "RECE_MSG_DELETE": "It cannot be restored after deletion. Are you sure you want to delete all received history?"
  }
}
</i18n>
<template>
  <div class="popBg"></div>
  <div class="transWhite notiPopWrap">
    <div class="font25 fontBold w100P notiPopHeader">
      <div class="notiPopTitle">
        <img src="@/assets/images/footer/icon_alim_fillin.svg" alt="" />
        <p class="textOverdot textLeft mleft-05">{{ $t('RECE_TITLE_NOTI') }}</p>
      </div>
      <div class="cursorP closeBox" @click="pClosePop">
        <img
          class="w100P"
          src="@/assets/images/common/popup_close.png"
          alt=""
        />
      </div>
    </div>
    <div class="w100P flexCenter notiContentsWrap">
      <template v-for="(noti, index) in mNotiList" :key="index">
        <notiCompo
          @clickNoti="goNotiDetail"
          :notiClear="putData"
          :mNotiEle="noti" :pClosePop="pClosePop"
          v-if="mNotiList && mNotiList.length"
        />
        <div style="width: 100%; height: 10px;"></div>
        <myObserver v-if="mNotiList && mNotiList.length > 9 ?  index === mNotiList.length - 15 : index === mNotiList.length - 5" @triggerIntersected="loadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver>
          <!-- <myObserver  Observer @triggerIntersected="loadMore" id="observer" class="fl w-100P" style="float: left;"></myObserver> -->
        <!-- <gEmpty v-else tabName="최신" contentName="전체" /> -->
      </template>
    </div>
    <div class="notiPopBottom">
      <p
        class="font16 mbottom-05 textLeft fr fontBold"
        @click="mConfirmPopShowYn = true"
      >
        {{ $t('RECE_BTN_DELETE') }}
      </p>
    </div>
    <gConfirmPop
      :confirmText="$t('RECE_MSG_DELETE')"
      confirmType="two"
      @no="mConfirmPopShowYn = false"
      v-if="mConfirmPopShowYn"
      @ok="notiClear"
    />
  </div>
</template>

<script>
import notiCompo from '@/components/pageComponents/main/D_notiCompo.vue'
export default {
  props: {
    pClosePop: Function
  },
  data () {
    return {
      mNotiList: [],
      mConfirmPopShowYn: false,
      mgetLogKey: '',
      mCanLoadYn: true,
      mEndListYn: false,
      makeNewArray: [],
      mOffsetInt: 1,
      mPageSize: 20,
      mAxiosQueue: []
    }
  },
  created () {
    // this.getNotiHistoryList(20, 0, false)
    if (this.mNotiList.length === 0) {
      this.getNotiHistoryList().then((result) => {
        this.setContsList(result)
      })
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'notiHistoryPop') {
        this.closeXPop()
      }
    }
  },
  mounted () {
    this.$addHistoryStack('notiHistoryPop')
  },
  beforeUnmount () {
    this.$checkDeleteHistory('notiHistoryPop')
  },
  methods: {
    getConsole () {
      console.log('엥.')
    },
    endListSetFunc (resultList) {
      console.log('endListSetFunc resultList', resultList)
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
    async setContsList (resultList) {
      console.log('setContsList resultList', resultList)

      if (!resultList || resultList === '') return
      var newArr = []
      this.endListSetFunc(resultList)
      // this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', resultList.content)

      if (this.mNotiList.length > 0) {
        newArr = [
          ...this.mNotiList,
          ...resultList.content
        ]
      } else {
        newArr = resultList.content
      }
      console.log('setContsList newArrnewArrnewArr', newArr)
      this.mNotiList = this.replaceArr(newArr)
    },
    async loadMore (descYn) {
      console.log(' noti History List LoadMore ')
      if (this.mCanLoadYn && this.mEndListYn === false) {
        this.mCanLoadYn = false
        try {
          var resultList = await this.getNotiHistoryList(null, null, false)
          console.log('loadMoreloadMore resultList????', resultList)
          this.setContsList(resultList)
        } catch (e) {
          console.log(e)
        } finally {
          this.mCanLoadYn = true
          // console.log('notiHistory === ', this.mAxiosQueue)
          // var queueIndex = this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList')
          // if (queueIndex !== -1) this.mAxiosQueue.splice(queueIndex, 1)
        }
      } else {
      }
    },
    putData (logKey) {
      this.mgetLogKey = logKey
      this.mConfirmPopShowYn = true
    },
    closeXPop (reloadYn) {
      this.$emit('closeXPop')
    },
    async getNotiHistoryList (pageSize, offsetInput, loadingYn) {
      var param = {}
      param.userKey = this.GE_USER.userKey
      param.codeLang = this.GE_LOCALE
      param.allYn = true

      if (offsetInput !== undefined && offsetInput !== null && offsetInput !== '') { param.offsetInt = offsetInput } else { param.offsetInt = this.mOffsetInt * this.mPageSize + this.mPageSize }
      if (pageSize !== undefined && pageSize !== null && pageSize !== '') { param.pageSize = pageSize } else { param.pageSize = this.mPageSize }

      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      const result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getLogList',
        param: param,
        nonLoading
      })
      this.makeNewArray = result.data.log
      // this.mNotiList = result.data.log.content
      console.log('makeNewArray', this.makeNewArray)
      // console.log('mNotiList', this.mNotiList)
      return result.data.log
    },
    async notiClear () {
      var param = {}
      param.userKey = this.GE_USER.userKey

      if (this.mgetLogKey !== '') {
        param.mlogKey = this.mgetLogKey
      }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.deleteLogUser',
        param: param
      })
      console.log('result', result)
      this.$store.dispatch('D_NOTI/AC_CLEAR_NOTI_LIST')
      this.mConfirmPopShowYn = false
      this.getNotiHistoryList(20, 0, false)
    },
    async goNotiDetail (data) {
      console.log('message???', data)
      data.clickListYn = true
      var param = {}
      if (data && data.bundleCode && data.bundleCode === 'ADD_FOLL' && data.targetKind === 'U') {
        console.log('????')
        param.targetType = 'followList'
        param.popHeaderText = this.$t('COMMON_NAME_MY_ADDERSS')
      } else if (data && data.bundleCode && data.bundleCode === 'ADD_FOLL' && data.targetKind === 'T') {
        param.targetType = 'chanDetail'
        param.teamKey = data.targetKey
        param.chanName = data.title
      } else if (data && data.targetKind === 'C') {
        param.targetType = 'contentsDetail'
        param.targetKey = data.contentsKey | data.targetKey
        param.nameMtext = data.nameMtext
        param.teamKey = data.creTeamKey
        param.chanName = data.nameMtext
        // param.targetContentsKey = data.contentsKey
        param.jobkindId = data.jobkindId
      }
      this.$emit('goChanDetail', param)
      // var addVueResult = await this.$recvNotiFromBridge(message, false)
      // console.log('addVueResult, addVueResult', addVueResult)
      // if (addVueResult === false) {
      //   this.$showToastPop(this.$t('COMMON_MSG_NOTFOUND'))
      //   return
      // }
      // var popHistory = this.$store.getters['D_HISTORY/GE_GPOP_STACK']
      // var currentPage = 0
      // if (popHistory && popHistory.length > 0) {
      //   currentPage = popHistory[popHistory.length - 1]
      // }
      // this.$store.dispatch('D_NOTI/AC_ADD_NEW_NOTI', { notiDetailObj: message, currentPage: currentPage, addVueResult: addVueResult })
    }
  },
  components: {
    notiCompo
  }
}
</script>

<style scoped>

.popBg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background: #00000050;
}
.notiPopWrap {
  border-radius: 10px;
  width: 90%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 10000;
  padding: 10px 10px;
  padding-bottom: 0;
  background-color:rgba(256, 256, 256, 0.65);
  box-shadow:0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter:blur( 9px );
}
.notiPopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;
}
.notiPopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.notiPopTitle > img {
  width: 20px;
  margin-right: 5px;
}
.notiPopTitle > p {
  width: calc(100% - 40px);
  padding: none !important;
}
.closeBox {
  width: 25px;
}
.notiContentsWrap {
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100% - 95px);
  overflow: auto;
  padding: 0px;
}
.notiPopBottom {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
