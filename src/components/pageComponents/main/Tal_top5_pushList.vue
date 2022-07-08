<template>
  <listTitle :alimTabType="this.viewTab" style="margin-bottom: 1rem" listTitle= "알림" :activeTabList="this.activeTabList" :moreLink="this.moreLink" @openPop= "openPop"/>
    <gActiveBar ref="activeBarPushListTop5" :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div class="pushListWrap">
      <commonListTable :commonListData="this.pushList" v-if="listLeloadYn"  @goDetail="openPop" :mainYnProp="this.mainYn" />
    </div>
</template>

<script>
/* eslint-disable */
import listTitle from '../../unit/Tal_main_title.vue'
import commonListTable from '../../list/Tal_commonListTable.vue'
// import router from '../../../router'
export default {
  name: 'top5PushList',
  created () {
    this.pushList = this.alimList
    this.checkSenderYn()
    // // eslint-disable-next-line no-debugger
    // debugger
  },
  data () {
    return {
      mainYn: true,
      moreLink: 'push',
      // activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지 않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      activeTabList: [{ display: '최신', name: 'N' }, { display: '내가 보낸', name: 'M' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'N',
      listLeloadYn: true
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
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'M') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'L') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'S') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    checkSenderYn () {
      for (var i = 0; i < this.pushList.length; i++) {
        if (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.pushList[i].creUserKey) {
          this.pushList[i].ownerYn = true
        }
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
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        if (value.targetType === 'chanDetail') {
          params.targetType = value.targetType
          params.teamKey = value.teamKey
          params.chanName = value.nameMtext
          params.nameMtext = value.nameMtext
          params.targetKey = value.targetKey
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
      this.$emit('openPop', params)
    },
    async changeTab (tabName) {
      // this.pushList = [] ///######
      this.viewTab = tabName
      var resultList = await this.getContentsList()
      this.listLeloadYn = false
      this.pushList = resultList.content
      // this.userDoList = resultList.userDo
      this.listLeloadYn = true
      this.checkSenderYn()
    },
    async reLoad () {
      this.$refs.activeBarPushListTop5.switchtab(0)
      this.$refs.activeBarPushListTop5.selectTab('N')
      // var resultList = await this.getContentsList()
      // this.listLeloadYn = false
      // this.pushList = resultList.content
      // this.listLeloadYn = true
      console.log(this.pushList);
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
        console.log(param)
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
      this.$axios.post('/tp.getContentsList', Object.fromEntries(paramMap)
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
