<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->

  <gSearchBox @changeSearchList="changeSearchList" :tab="this.viewTab" @openFindPop="this.chanFindPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList"/>

  <findChannelList @searchList="requestSearchList" v-if="chanFindPopShowYn" @closePop='chanFindPopShowYn = false' />
  <gActiveBar :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"></gActiveBar>

  <!-- <div style="height: calc(100% - 60px); padding: 0.2rem 0;"> -->
  <div style="height: calc(100% - 60px); padding: 0.2rem 0; padding-bottom:50px">

    <gChannelList  class="moveBox" :chanList="this.chanList"  @goDetail="goDetail"/>
    <!-- <searchChannel class="moveBox" v-if="viewTab === 'search'"/> -->

    <!-- <myChanList @openManagerChanDetail="openManagerChanDetail" v-if="myChanListPopYn" @closePop="this.myChanListPopYn = false" /> -->
  </div>
  <div class="btnPlus" @click="clickCreateChannel" ><p style="font-size:40px;">+</p></div>

</template>

<script>
import findChannelList from '../../components/popup/Tal_findChannelList.vue'

export default {
  name: 'user',
  components: {
    findChannelList
    // searchChannel
    // myChanList
  },
  async created () {
    if (this.popYn === false) {
      document.addEventListener('message', e => this.BackPopClose(e))
      window.addEventListener('message', e => this.BackPopClose(e))
      var history = localStorage.getItem('popHistoryStack').split('$#$')
      this.pageHistoryName = 'page' + (history.length - 1)
    }
    this.$emit('changePageHeader', '채널')
    await this.getChannelList('user')
  },
  methods: {
    BackPopClose (e) {
      if (this.popYn === false) {
        if (JSON.parse(e.data).type === 'goback') {
          if (localStorage.getItem('pageDeleteYn') === true || localStorage.getItem('pageDeleteYn') === 'true') {
            if (localStorage.getItem('curentPage') === this.pageHistoryName) {
              this.$removeHistoryStackForPage(this.pageHistoryName)
            }
          }
        }
      }
    },
    clickCreateChannel () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'createChannel'
      this.$emit('openPop', params)
    },
    openManagerChanDetail (param) {
      this.$emit('openPop', param)
    },
    async changeTab (tab) {
      // this.chanList = {}
      // this.$emit('openLoading')

      this.viewTab = tab
      await this.getChannelList()

      if (this.viewTab === 'mychannel') {
        this.myChanListPopYn = true
      } else {
        this.myChanListPopYn = false
      }
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = value.teamKey
      params.chanName = value.teamNameMtext
      if (this.viewTab === 'user') {
        value.followYn = true
      }
      params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },

    async getChannelList () {
      var paramMap = new Map()
      if (this.viewTab === 'user') {
        var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        paramMap.set('userKey', userKey)
      } else if (this.viewTab === 'mychannel') {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        paramMap.set('followerType', 'A')
      }
      if (this.resultSearchKeyList.length > 0) {
        paramMap.set('nameMtext', this.resultSearchKeyList[0].keyword)
      }
      var resultList = await this.$getTeamList(paramMap)

      this.chanList = resultList.content
      this.$emit('closeLoading')
    },

    async requestSearchList (paramMap) {
      this.chanFindPopShowYn = false
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      await this.getChannelList()
    },
    async castingSearchMap (sMap) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (sMap.get('nameMtext') !== undefined && sMap.get('nameMtext') !== null && sMap.get('nameMtext') !== '') {
        searchObj.typeName = '채널'
        // searchObj.type = '채널명'
        searchObj.keyword = sMap.get('nameMtext')
        resultArray.push(searchObj)
      }
      return resultArray
    },
    changeSearchList (idx) {
      this.resultSearchKeyList.splice(idx, 1)
      this.getChannelList()
    }
  },
  data () {
    return {
      pageHistoryName: '',
      viewTab: 'user',
      // activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      subTitlebtnList: [],
      chanList: [
        { chanName: '우체국', chanImg: 'http://placehold.it/30', chanMsg: '우체국 앱(포스트톡)을 설치하시면 배송조회, 착불결제 등 다양한 서비스를 이용하실 수 있습니다.' },
        { chanName: '삼천리', chanImg: 'http://placehold.it/30', chanMsg: '사랑받는 기업, 삼천리' },
        { chanName: '이디야 커피', chanImg: 'http://placehold.it/30', chanMsg: 'ALWAYS BESIDE YOU, EDIYA COFFEE. <br>늘 당신 곁에, 이디야 커피의 다양한 메뉴를 맛보세요.' },
        { chanName: '아이디어스', chanImg: 'http://placehold.it/30', chanMsg: '일상에 특별함을 잇다!<br>핸드메이드 라이프 스타일 플랫폼, 아이디어스' }
      ],
      chanFindPopShowYn: false,
      resultSearchKeyList: '',

      myChanListPopYn: false
    }
  },
  props: {
    params: {},
    popYn: Boolean
  }
}
</script>

<style scoped>

.moveBox{transition: 0.5s ease;}
.btnPlus{
  width:4rem; height:4rem; line-height:4rem;
  color:#6768a7; border:0.2rem solid #6768a7; background-color:white ;

   border-radius:50%; position:fixed; bottom: 80px; right: 10%;
  box-shadow: 2px 2px 7px 3px #ccc;

}
</style>
