<template>
    <div style="width: 100%; float: left; margin-top: 10px;">
        <listTitle :viewTab="this.viewTab" :alimTabType="this.viewTab" style=" float: left;" listTitle= "알림" :activeTabList="this.activeTabList" class="w-100P" :moreLink="this.moreLink" @openPop= "openPop"/>
        <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px; margin-bottom: 10px;"></div>
        <div style=" float: left; width: 100%; ">
            <div style="width: 100%; min-height: 40px; float: left; padding: 0px 0; position: relative;">
                <gActiveBar ref="activeBarPushListTop5" :tabList="this.activeTabList" @changeTab= "changeTab" />
                <gBtnSmall hidden btnTitle="이력보기"  style="position: absolute;right: 5px;top: -2px;height: 25px;line-height: 25px;"/>
            </div>
            <div id="top5ListWrap" class="pushListWrap fl">
            <!-- <gEmty :tabName="currentTabName" contentName="알림" v-if="emptyYn && this.contentsList && this.contentsList.length === 0" style="margin-top:50px;" /> -->
            <commonListTable :commonListData="contentsList" v-if="listShowYn"  @goDetail="openPop" />
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
  created () {
    // this.contentsList = this.alimList
    this.contentsList = this.allContList
  },
  data () {
    return {
      mainYn: true,
      moreLink: 'push',
      // activeTabList: [{ display: '최신', name: 'N' }, { display: '읽지 않은', name: 'R' }, { display: '좋아요', name: 'L' }, { display: '중요한', name: 'S' }],
      activeTabList: [{ display: '전체', name: 'A' }, { display: '알림', name: 'P' }, { display: '게시글', name: 'B' }],
      viewTab: 'A',
      listShowYn: true,
      currentTabName: '알림',
      emptyYn: true,
      notiDetail: null,
      pushList: [],
      systemName: localStorage.getItem('systemName'),
      contentsList: []
    }
  },
  props: {
    alimList: {},
    boardList: {},
    allContList: {}
  },
  mounted () {
    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
    this.settingAtag()
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
  },
  updated () {
    // this.settingAtag()
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
        this.currentTabName = '전체'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'P') {
        this.currentTabName = '알림'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'B') {
        this.currentTabName = '게시글'
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    async recvNoti (e) {
      /* var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          var currentPage = this.$store.getters['D_HISTORY/hCPage']
          if ((currentPage === 0 || currentPage === undefined)) {
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'CONT') {
              this.getContentsList()
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      } */
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        if (value.targetType === 'chanDetail') {
          params = value
          // params.targetType = value.targetType
          params.teamKey = value.teamKey
          // params.nameMtext = value.nameMtext
          // params.targetKey = value.targetKey
          // params.page = value.page
          // params.cIdx = value.index
          // params.targetContentsKey = value.contentsKey
          params.chanName = value.nameMtext
        } else if (value.targetType === 'boardDetail') {
          params = value
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
    /* async refreshList () {
      this.listShowYn = false
      this.emptyYn = false
      var resultList = await this.getContentsList()
      this.pushList = resultList.content
      if (this.pushList.length === 0) {
        this.emptyYn = true
      }
      this.listShowYn = true
    }, */
    async changeTab (tabName) {
      // alert(tabName)
      // this.pushList = [] ///######
      this.viewTab = tabName
      if (tabName === 'A') { this.contentsList = this.allContList } else if (tabName === 'P') { this.contentsList = this.alimList } else if (tabName === 'B') { this.contentsList = this.boardList }
    },
    async reLoad () {
      this.changeTab('A')
      await this.$refs.activeBarPushListTop5.switchtab(0)
      // await this.$refs.activeBarPushListTop5.selectTab('N')
      // var resultList = await this.getContentsList()
      // this.listShowYn = false
      // this.pushList = resultList.content
      // this.listShowYn = true
      // console.log(this.pushList)
    }
  }
}

</script>

<style scoped>
.alimeListTr{border-bottom: 0.5px solid #6768A73D}
.alimeListTr :last-child{border-bottom: none}
.pushListWrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
</style>
