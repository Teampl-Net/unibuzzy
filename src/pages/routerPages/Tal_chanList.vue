<template>
  <!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="pagePaddingWrap">
    <gActiveBar :tabList="this.activeTabList" @changeTab= "changeTab"></gActiveBar>
    <div style="padding: 0.2rem 0">
      <gChannelList  class="moveBox" v-if="viewTab === 'chanList'" :chanList="this.chanList"  @goDetail="goDetail"/>
      <searchChannel class="moveBox" v-if="viewTab === 'search'"/>
    </div>
  </div>
  <TalFooter class="header_footer" style="position: fixed; bottom:0; z-index: 9999"/>
</template>

<script>
import searchChannel from '../../components/pageComponents/channel/Tal_searchChan.vue'
export default {
  name: 'chanList',
  components: {
    searchChannel
  },
  created () {
    this.$emit('changePageHeader', '채널')
  },
  methods: {
    changeTab (tab) {
      this.viewTab = tab
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = value.chanKey
      params.chanName = value.chanName
      this.$emit('openPop', params)

      // this.$router.push({ name: 'subsDetail', params: { chanKey: idx } })
    }
  },
  data () {
    return {
      viewTab: 'chanList',
      headerTitle: '구독',
      activeTabList: [{ display: '구독중', name: 'chanList' }, { display: '검색', name: 'search' }],
      subTitlebtnList: [],
      chanList: [
        { chanName: '우체국', chanImg: 'http://placehold.it/30', chanMsg: '우체국 앱(포스트톡)을 설치하시면 배송조회, 착불결제 등 다양한 서비스를 이용하실 수 있습니다.' },
        { chanName: '삼천리', chanImg: 'http://placehold.it/30', chanMsg: '사랑받는 기업, 삼천리' },
        { chanName: '이디야 커피', chanImg: 'http://placehold.it/30', chanMsg: 'ALWAYS BESIDE YOU, EDIYA COFFEE. <br>늘 당신 곁에, 이디야 커피의 다양한 메뉴를 맛보세요.' },
        { chanName: '아이디어스', chanImg: 'http://placehold.it/30', chanMsg: '일상에 특별함을 잇다!<br>핸드메이드 라이프 스타일 플랫폼, 아이디어스' }
      ]
    }
  }
}
</script>

<style scoped>

.moveBox{transition: 0.5s ease;}
</style>
