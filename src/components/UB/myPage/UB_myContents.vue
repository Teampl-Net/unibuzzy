<template>
  <div style="width: 100%; float: left; margin-top: 10px;">
    <listTitle :propViewTab="mViewTab" :propMoreLink="mMoreLink" propListTitle="내 컨텐츠" :activeTabList="mActiveTabList" style=" float: left;" class="w100P" @openPop="openPop"/>
    <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px;"></div>
    <div style=" float: left; width: 100%; ">
      <div style="width: 100%; min-height: 40px; float: left; padding: 0px 0; position: relative;">
        <gActiveBar ref="activeBarPushListTop5" :tabList="this.mActiveTabList" @changeTab="changeTab" />
        <!-- <gBtnSmall hidden btnTitle="이력보기"  style="position: absolute;right: 5px;top: -2px;height: 25px;line-height: 25px;"/> -->
      </div>
      <div class="pushListWrap fl">
      <contentsList v-if="mContentsList && mContentsList.length > 0" :propContentsList="mContentsList" @goChanDetail="openPop" />
      <gEmpty v-else :tabName="currentTabName" contentName="전체" class="mtop-2"/>
      </div>
    </div>
  </div>
</template>

<script>
import listTitle from '@/components/unit/Tal_main_title.vue'
import contentsList from '@/components/list/D_commonListTable.vue'
export default {
  name: 'top5PushList',
  data () {
    return {
      mMoreLink: 'push',
      mActiveTabList: [{ display: 'My', name: 'M' }, { display: 'Liked', name: 'L' }],
      mViewTab: 'M',
      mCurrentTabName: this.$t('COMMON_TAB_ALL'),
      mContentsList: []
    }
  },
  props: {
    propAlimList: {}
  },
  components: {
    listTitle,
    contentsList
  },
  created () {
    console.log('확인합니당')
    console.log(this.propAlimList)
  },
  methods: {
    async getPushContentsList () {
      // eslint-disable-next-line no-debugger
      debugger
      // @point
      // eslint-disable-next-line no-new-object
      var param = new Object()

      param.pageSize = 5
      param.offsetInt = 0

      param.jobkindId = 'BOAR'
      // param.allYn = true
      if (this.mViewTab === 'L') {
        param.DESCYn = true
        param.findActLikeYn = false
        param.findActStarYn = true
        param.findActYn = true
        param.findLogReadYn = null
        param.subsUserKey = this.GE_USER.userKey
      } else {
        param.creUserKey = this.GE_USER.userKey
      }

      param.ownUserKey = this.GE_USER.userKey

      var result = await this.$getContentsList(param, false)
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', result.content)

      var resultList = result.content

      this.mContentsList = resultList
    },
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
      // console.log(value)
      this.$emit('openPop', value)
    },
    async changeTab (tabName) {
      this.mViewTab = tabName
      await this.getPushContentsList()
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
      console.log('contList', contList)
      var test = this.GE_MAIN_CHAN_LIST
      if (!this.contList) {
        return []
      }
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
    // mViewTab: {
    //   handler (val) {

    //   }
    // },
    propAlimList: {
      immediate: true,
      handler (value, old) {
        // eslint-disable-next-line no-debugger
        debugger
        if (!value) {
          this.mContentsList = []
        } else {
          this.mContentsList = value
        }
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
.alimeListTr{border-bottom: 0.5px solid #6768A73D}
.alimeListTr :last-child{border-bottom: none}
.pushListWrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
</style>
