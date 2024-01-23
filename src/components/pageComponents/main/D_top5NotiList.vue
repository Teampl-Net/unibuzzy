<template>
  <div style="width: 100%; float: left; margin-top: 10px;">
    <listTitle :propViewTab="mViewTab" :propMoreLink="mMoreLink" :propListTitle="pListTitle" :activeTabList="mActiveTabList" style=" float: left;" class="w-100P" @openPop="openPop"/>
    <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px;"></div>
    <div style=" float: left; width: 100%; ">
      <div style="width: 100%; min-height: 40px; float: left; padding: 0px 0; position: relative;">
        <gActiveBar ref="activeBarPushListTop5" :tabList="this.mActiveTabList" @changeTab="changeTab" />
        <!-- <gBtnSmall hidden btnTitle="이력보기"  style="position: absolute;right: 5px;top: -2px;height: 25px;line-height: 25px;"/> -->
      </div>
      <div class="pushListWrap fl">
      <contentsList :isAlim="true" :propContentsList="propAlimList" @goChanDetail="openPop" @openPop="openPop" />
      </div>
    </div>
  </div>
</template>

<script>
import listTitle from '../../unit/Tal_main_title.vue'
import contentsList from '../../list/D_commonListTable.vue'
export default {
  name: 'top5NotiList',
  data () {
    return {
      mMoreLink: 'push',
      mActiveTabList: [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_TAB_NOTI'), name: 'P' }, { display: this.$t('COMMON_TAB_POST'), name: 'B' }, { display: this.$t('COMMON_TAB_TODO'), name: 'D' }],
      mViewTab: 'A',
      mCurrentTabName: '알림',
      mContentsList: []
    }
  },
  props: {
    propAlimList: {},
    pListTitle: {}
  },
  components: {
    listTitle,
    contentsList
  },
  methods: {
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex((item) => item.contentsKey === current.contentsKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      uniqueArr.splice(5, 0)
      return uniqueArr
    },
    async getContentsList (loadingYn) {
      var param = {}
      var resultData = null
      param.offsetInt = 0
      param.pageSize = 5
      if (this.mViewTab === 'P') {
        param.jobkindId = 'ALIM'
        param.ownUserKey = this.GE_USER.userKey
      } else if (this.mViewTab === 'B') {
        param.boardYn = true
        param.ownUserKey = this.GE_USER.userKey
        param.jobkindId = 'BOAR'
      } else if (this.mViewTab === 'A') {
        param.allYn = true
      }
      var noneLoading = true
      if (loadingYn) {
        noneLoading = false
      }
      resultData = await this.$getContentsList(param, noneLoading)

      this.mContentsList = resultData.content
      return resultData
    },
    openPop (value) {
      value.alimTabType = this.mViewTab
      console.log('value', value)
      this.$emit('openPop', value)
    },
    async changeTab (tabName) {
      this.mViewTab = tabName
      await this.getContentsList(true)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CONT_LIST () {
      var idx1, idx2
      var contList = this.mContentsList
      var test = this.GE_MAIN_CHAN_LIST
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
      return this.$store.getters['D_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        if (this.pListTitle === 'noti') {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_TAB_NOTI'), name: 'P' }, { display: this.$t('COMMON_TAB_POST'), name: 'B' }, { display: this.$t('COMMON_TAB_TODO'), name: 'D' }]
        } else {
          this.mActiveTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_TAB_LIKED'), name: 'L' }, { display: this.$t('COMMON_TAB_SAVED'), name: 'S' }]
        }
      },
      deep: true
    },
    propAlimList: {
      immediate: true,
      handler (value, old) {
        // console.log(value)
        // eslint-disable-next-line no-debugger
        debugger
        this.mContentsList = value
      },
      deep: true
    },
    GE_NEW_CONT_LIST: {
      handler (value, old) {
        var newArr = []
        if (!value || value.length === 0) return
        if ((this.mViewTab === 'P' && value[0].jobkindId === 'BOAR') || (this.mViewTab === 'B' && value[0].jobkindId === 'ALIM')) return
        if (this.mContentsList.length === 0) return
        if (this.$dateCalc(this.mContentsList[0].creDate, value[0].creDate) === true) return
        newArr = [
          value[0],
          ...this.GE_DISP_CONT_LIST
        ]
        this.mContentsList = this.replaceArr(newArr)
      },
      deep: true
    }
  }
}

</script>

<style scoped>
.alimeListTr{border-bottom: 0.5px solid rgb(74 102 158)3D}
.alimeListTr :last-child{border-bottom: none}
.pushListWrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
</style>
