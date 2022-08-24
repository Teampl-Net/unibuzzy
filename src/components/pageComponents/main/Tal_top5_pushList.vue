<template>
  <listTitle :alimTabType="this.viewTab" style="margin-bottom: 1rem" listTitle= "알림" :activeTabList="this.activeTabList" :moreLink="this.moreLink" @openPop= "openPop"/>
    <gActiveBar ref="activeBarPushListTop5" :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div class="pushListWrap">
      <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && this.pushList.length === 0" style="margin-top:50px;" />
      <commonListTable :commonListData="this.pushList" v-if="listShowYn"  @goDetail="openPop" />
    </div>
</template>

<script>
import listTitle from '../../unit/Tal_main_title.vue'
import commonListTable from '../../list/Tal_commonListTable.vue'
// import router from '../../../router'
export default {
  name: 'top5PushList',
  async created () {
    if (this.alimList) {
      this.pushList = this.alimList
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
      activeTabList: [{ display: '최신', name: 'N' }, { display: '좋아요', name: 'L' }, { display: '스크랩', name: 'S' }, { display: '내가 보낸', name: 'M' }],
      viewTab: 'N',
      listShowYn: true,
      currentTabName: '최신',
      emptyYn: true
    }
  },
  props: {
    alimList: {}
  },
  mounted () {
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  components: {
    listTitle,
    commonListTable
  },
  methods: {
    introTop5PushPageTab () {
      if (this.viewTab === 'N') {
        this.currentTabName = '최신'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'M') {
        this.currentTabName = '내가 보낸'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'L') {
        this.currentTabName = '좋아요'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'S') {
        this.currentTabName = '스크랩'
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          this.$refs.activeBarPushListTop5.switchtab(0)
          this.$refs.activeBarPushListTop5.selectTab('N')
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    openPop (value) {
      // alert(JSON.stringify(value))
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
        } else {
          params.targetType = value.targetType
          params.alimTabType = this.viewTab
        }
      } else {
        params.targetType = 'pushDetail'
        params.value = value
      }
      if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.nameMtext }
      // alert(JSON.stringify(params))
      this.$emit('openPop', params)
    },
    async changeTab (tabName) {
      // this.pushList = [] ///######
      this.viewTab = tabName
      this.introTop5PushPageTab()
      this.listShowYn = false
      this.emptyYn = false
      var resultList = await this.getContentsList()
      this.pushList = resultList.content
      if (this.pushList.length === 0) {
        this.emptyYn = true
      }

      // this.userDoList = resultList.userDo
      this.listShowYn = true
    },
    async reLoad () {
      this.$refs.activeBarPushListTop5.switchtab(0)
      this.$refs.activeBarPushListTop5.selectTab('N')
      // var resultList = await this.getContentsList()
      // this.listShowYn = false
      // this.pushList = resultList.content
      // this.listShowYn = true
      // console.log(this.pushList)
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var resultData = null
      param.offsetInt = 0
      param.pageSize = 5
      param.jobkindId = 'ALIM'
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (this.viewTab === 'L') {
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
        // console.log(param)
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
      this.$axios.post('https://mo.d-alim.com:10443/tp.getContentsList', Object.fromEntries(paramMap)
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
