<template>
  <listTitle style="margin-bottom: 1rem" listTitle= "알림" :moreLink="this.moreLink" @openPop= "openPop"/>
    <gActiveBar :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div class="pushListWrap">
      <commonListTable :commonListData="this.pushList" v-if="listLeloadYn"  @goDetail="openPop" :mainYnProp="this.mainYn"/>
    </div>
</template>

<script>

import listTitle from '../../unit/Tal_main_title.vue'
import commonListTable from '../../list/Tal_commonListTable.vue'
// import router from '../../../router'
export default {
  name: 'top5PushList',
  created () {
    this.pushList = this.alimList
    // alert(this.pushList)
  },
  data () {
    return {
      mainYn: true,
      moreLink: 'push',
      activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      viewTab: 'newest',
      listLeloadYn: true
    }
  },
  props: {
    alimList: {}
  },
  components: {
    listTitle,
    commonListTable
  },
  methods: {
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        params.targetType = value.targetType
      } else {
        params.targetType = 'pushDetail'
      }
      params.value = value
      if (value.contentsKey !== undefined && value.contentsKey !== null && value.contentsKey !== '') { params.targetKey = value.contentsKey }
      // if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.chanName }
      this.$emit('openPop', params)
    },
    async changeTab (tabName) {
      this.viewTab = tabName
      var resultList = await this.getContentsList(this.viewTab)
      this.listLeloadYn = false
      this.pushList = resultList.content
      // this.userDoList = resultList.userDo
      this.listLeloadYn = true
    },
    async getContentsList (viewTab) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var resultData = null
      param.offset = 0
      param.pageSize = 5
      param.ownUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (viewTab === 'L') {
        param.findActYn = true
        param.findActLikeYn = true
      }
      if (viewTab === 'S') {
        param.findActYn = true
        param.findActStarYn = true
      }
      if (viewTab === 'R') {
        param.findLogReadYn = false
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
        // alert(Object.fromEntries(response.data))
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

.pushListWrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem;}
</style>
