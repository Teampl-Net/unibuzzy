<template>
  <div class="myContentsWrap">
    <listTitle :propViewTab="mViewTab" :propMoreLink="mMoreLink" propListTitle="내 컨텐츠" :activeTabList="mActiveTabList" class="w100P fl" @openPop="openPop"/>
    <div class="boxLine"></div>
    <div class="fl w100P">
      <div class="tabWrap">
        <gActiveBar ref="activeBarPushListTop5" :tabList="mActiveTabList" @changeTab="changeTab" />
      </div>
      <div class="pushListWrap fl scrollHidden">
        <template v-if="mSkeletonShowYn">
          <SkeletonBox v-for="(value) in [0, 1, 2]" :key="value" />
        </template>
        <contentsList v-else-if="mContentsList && mContentsList.length > 0" :propContentsList="mContentsList" @goContentsDetail="openPop" />
        <gEmpty v-else :tabName="currentTabName" contentName="전체" class="mtop-2"/>
      </div>
    </div>
  </div>
</template>

<script>
import listTitle from '@/components/unit/UB_mainTitle.vue'
import contentsList from '@/components/list/UB_commonListTable.vue'
import SkeletonBox from '@/components/pageComponents/push/UB_contentsSkeleton'
export default {
  name: 'top5PushList',
  data () {
    return {
      mMoreLink: 'push',
      mActiveTabList: [{ display: 'My', name: 'M' }, { display: 'Liked', name: 'L' }],
      mViewTab: 'M',
      mContentsList: [],
      mSkeletonShowYn: true
    }
  },
  props: {
    propAlimList: {}
  },
  components: {
    listTitle,
    contentsList,
    SkeletonBox
  },
  created () {
    setTimeout(() => {
      this.mSkeletonShowYn = false
    }, 2000)
  },
  methods: {
    async getPushContentsList () {
      var param = {}

      param.pageSize = 5
      param.offsetInt = 0

      param.jobkindId = 'BOAR'
      if (this.mViewTab === 'L') {
        param.DESCYn = true
        param.findActLikeYn = true
        param.findActStarYn = false
        param.findActYn = true
        param.findLogReadYn = null
        param.subsUserKey = this.GE_USER.userKey
      } else {
        param.creUserKey = this.GE_USER.userKey
      }

      param.ownUserKey = this.GE_USER.userKey

      var result = await this.$getContentsList(param, false)
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', result.content)

      var resultList = result.content

      this.mContentsList = await resultList
      this.mSkeletonShowYn = false
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
    openPop (value) {
      value.alimTabType = this.mViewTab
      this.$emit('openPop', value)
    },
    async changeTab (tabName) {
      this.mSkeletonShowYn = true
      this.mViewTab = tabName
      await this.getPushContentsList()
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
      return this.$store.getters['UB_CHANNEL/GE_NEW_CONT_LIST']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    propAlimList: {
      immediate: true,
      handler (value, old) {
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
.myContentsWrap {
  width: 100%;
  float: left;
  margin-top: 10px;
}
.boxLine {
  width: calc(100% + 20px);
  height:1.5px;
  background: rgb(220, 221, 235);
  margin-left: -10px;
  float: left;
  margin-top:0px;
}
.tabWrap {
  width: 100%;
  min-height: 40px;
  float: left;
  padding: 0px 0;
  position: relative;
}
.alimeListTr {
  border-bottom: 0.5px solid #6768A73D
}
.alimeListTr :last-child {
  border-bottom: none
}
.pushListWrap {
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  min-height: 200px;
}
</style>
