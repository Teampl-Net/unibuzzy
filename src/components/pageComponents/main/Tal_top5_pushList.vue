<template>
    <div style="width: 100%; float: left; margin-top: 10px;">
        <listTitle :viewTab="this.viewTab" :alimTabType="this.viewTab" style=" float: left;" :listTitle="$t('COMMON_TAB_NOTI')" :activeTabList="this.activeTabList" class="w-100P" :moreLink="this.moreLink" @openPop= "openPop"/>
        <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px; margin-bottom: 10px;"></div>
        <div style=" float: left; width: 100%; ">
            <div style="width: 100%; min-height: 40px; float: left; padding: 0px 0; position: relative;">
                <gActiveBar ref="activeBarPushListTop5" :tabList="this.activeTabList" @changeTab= "changeTab" />
                <gBtnSmall hidden btnTitle="이력보기"  style="position: absolute;right: 5px;top: -2px;height: 25px;line-height: 25px;"/>
            </div>
            <div id="top5ListWrap" class="pushListWrap fl">
            <gEmpty :tabName="currentTabName" :contentName="$t('COMMON_TAB_NOTI')" v-if="emptyYn && this.pushList.length === 0" style="margin-top:50px;" />
            <commonListTable :commonListData="this.pushList" v-if="listShowYn"  @goDetail="openPop" />
            </div>
        </div>

    </div>
</template>

<script>
import listTitle from '../../unit/Tal_main_title.vue'
import commonListTable from '../../list/Tal_commonListTable.vue'
// import router from '../../../router'
export default {
  name: 'top5PushList',
  async created () {
    if (this.propAlimList) {
      this.pushList = this.propAlimList
    } else {
      var resultList = await this.getContentsList()
      this.pushList = resultList.content
    }
  },
  data () {
    return {
      mainYn: true,
      moreLink: 'push',
      // activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지 않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      activeTabList: [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_TAB_NOTI'), name: 'P' }, { display: this.$t('COMMON_TAB_POST'), name: 'B' }],
      viewTab: 'A',
      listShowYn: true,
      currentTabName: this.$t('COMMON_TAB_NOTI'),
      emptyYn: true,
      notiDetail: null,
      pushList: [],
      systemName: localStorage.getItem('systemName')
    }
  },
  props: {
    propAlimList: {}
  },
  mounted () {
    this.settingAtag()
  },
  updated () {
    this.settingAtag()
  },
  components: {
    listTitle,
    commonListTable
  },
  methods: {
    settingAtag () {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        return
      }
      var contentsATagList = document.querySelectorAll('#top5ListWrap a')
      if (contentsATagList && contentsATagList.length > 0) {
        for (var i = 0; i < contentsATagList.length; i++) {
          contentsATagList[i].target = '_blank'
        }
      }
    },
    introTop5PushPageTab () {
      if (this.viewTab === 'A') {
        this.currentTabName = this.$t('COMMON_TAB_ALL')
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'P') {
        this.currentTabName = this.$t('COMMON_TAB_NOTI')
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'B') {
        this.currentTabName = this.$t('COMMON_TAB_POST')
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },

    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        if (value.targetType === 'chanDetail') {
          params = value
          // params.targetType = value.targetType
          // params.teamKey = value.teamKey
          // params.nameMtext = value.nameMtext
          // params.targetKey = value.targetKey
          // params.page = value.page
          // params.cIdx = value.index
          // params.targetContentsKey = value.contentsKey
          params.chanName = value.nameMtext
        } /* else if (value.targetType === 'contentsDetail') {
          params = value
        } else {
          params.targetType = value.targetType
          params.alimTabType = this.viewTab
        } */
      } else {
        /* params.targetType = 'contentsDetail'
        params.value = value */
      }
      if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.nameMtext }
      this.$emit('openPop', params)
    },
    async refreshList () {
      this.listShowYn = false
      this.emptyYn = false
      var resultList = await this.getContentsList()
      this.pushList = resultList.content
      if (this.pushList.length === 0) {
        this.emptyYn = true
      }
      this.listShowYn = true
    },
    async changeTab (tabName) {
      // this.pushList = [] ///######
      this.viewTab = tabName
      this.introTop5PushPageTab()
      this.refreshList()
      // this.listShowYn = false
      // this.emptyYn = false
      // var resultList = await this.getContentsList()
      // this.pushList = resultList.content
      // if (this.pushList.length === 0) {
      //   this.emptyYn = true
      // }

      // this.listShowYn = true
    },
    async reLoad () {
      // this.$refs.activeBarPushListTop5.switchtab(0)
      this.changeTab('A')
      await this.$refs.activeBarPushListTop5.switchtab(0)
      // await this.$refs.activeBarPushListTop5.selectTab('N')
      // var resultList = await this.getContentsList()
      // this.listShowYn = false
      // this.pushList = resultList.content
      // this.listShowYn = true
      // // console.log(this.pushList)
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var resultData = null
      param.offsetInt = 0
      param.pageSize = 5
      if (this.viewTab === 'P') {
        param.jobkindId = 'ALIM'
        param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        /* if (this.viewTab === 'L') {
          param.findActYn = true
          param.findActLikeYn = true
        }
        if (this.viewTab === 'S') {
          param.findActYn = true
          param.findActStarYn = true
        }
        // if (this.viewTab === 'R') {
        //   param.findLogReadYn = false
        // }
        if (this.viewTab === 'M') {
          param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        // // console.log(param)
        } */
      } else if (this.viewTab === 'B') {
        // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        param.boardYn = true
        param.jobkindId = 'BOAR'
      } else if (this.viewTab === 'A') {
        param.allYn = true
      }
      resultData = await this.$getContentsList(param)
      return resultData
    },
    getContentsList2 (viewTab) {
      // var response = false
      var paramMap = new Map(
        [
          ['userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey]
          /* ['soAccessToken', 'a1234'] */
        ]
      )
      this.$axios.post('https://mo.d-alim.com:9443/service/tp.getMyContentsList', Object.fromEntries(paramMap)
      ).then(response => {
        this.pushList = response.data
      }).catch((error) => {
        console.warn('ERROR!!!!! : ', error)
      })
    }
  }
}

</script>

<style scoped>
.alimeListTr{border-bottom: 0.5px solid #6768A73D}
.alimeListTr :last-child{border-bottom: none}
.pushListWrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
</style>
