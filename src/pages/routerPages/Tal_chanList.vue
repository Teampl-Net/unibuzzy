<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->

  <gSearchBox @changeSearchList="changeSearchList" :tab="this.viewTab" @openFindPop="this.findPopShowYn = true " :resultSearchKeyList="this.resultSearchKeyList" />
  <findChannelList @searchList="requestSearchList" v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
  <gActiveBar :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"></gActiveBar>
  <div style="padding: 0.2rem 0">
    <gChannelList  class="moveBox" :chanList="this.chanList"  @goDetail="goDetail"/>
    <!-- <searchChannel class="moveBox" v-if="viewTab === 'search'"/> -->
  </div>
</template>

<script>
// import searchChannel from '../../components/pageComponents/channel/Tal_searchChan.vue'
import findChannelList from '../../components/popup/Tal_findChannelList.vue'
export default {
  name: 'user',
  components: {
    findChannelList
    // searchChannel
  },
  async created () {
    this.$emit('changePageHeader', '채널')
    await this.getChannelList('user')
  },
  methods: {
    async changeTab (tab) {
      // this.chanList = {}
      // this.$emit('openLoading')
      this.viewTab = tab
      await this.getChannelList()
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
      }
      if (this.resultSearchKeyList.length > 0) {
        paramMap.set('nameMtext', this.resultSearchKeyList[0].keyword)
      }
      var resultList = await this.$getTeamList(paramMap)

      this.chanList = resultList.content
      this.$emit('closeLoading')
    },
    async requestSearchList (paramMap) {
      this.resultSearchKeyList = await this.castingSearchMap(paramMap)
      // alert(JSON.stringify(this.resultSearchKeyList))
      await this.getChannelList()
      this.findPopShowYn = false
    },
    async castingSearchMap (sMap) {
      // eslint-disable-next-line no-new-object
      var searchObj = new Object()
      var resultArray = []
      // if (this.resultSearchKeyList.length > 0) resultArray = this.resultSearchKeyList
      if (sMap.get('nameMtext') !== undefined && sMap.get('nameMtext') !== null && sMap.get('nameMtext') !== '') {
        searchObj.type = '채널'
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
      viewTab: 'user',
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      subTitlebtnList: [],
      chanList: [
        { chanName: '우체국', chanImg: 'http://placehold.it/30', chanMsg: '우체국 앱(포스트톡)을 설치하시면 배송조회, 착불결제 등 다양한 서비스를 이용하실 수 있습니다.' },
        { chanName: '삼천리', chanImg: 'http://placehold.it/30', chanMsg: '사랑받는 기업, 삼천리' },
        { chanName: '이디야 커피', chanImg: 'http://placehold.it/30', chanMsg: 'ALWAYS BESIDE YOU, EDIYA COFFEE. <br>늘 당신 곁에, 이디야 커피의 다양한 메뉴를 맛보세요.' },
        { chanName: '아이디어스', chanImg: 'http://placehold.it/30', chanMsg: '일상에 특별함을 잇다!<br>핸드메이드 라이프 스타일 플랫폼, 아이디어스' }
      ],
      findPopShowYn: false,
      resultSearchKeyList: ''
    }
  },
  props: {
    params: {}
  }
}
</script>

<style scoped>

.moveBox{transition: 0.5s ease;}
</style>
