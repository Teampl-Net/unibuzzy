<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="pagePaddingWrap">
    <div class= "pageHeader" style="min-height: 3.6rem; margin-bottom: 1rem">
      <div style="position: relative; margin: 1rem 0; min-height: 2.5rem; width: 100%; float: left;">
          <img class="searchIcon" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
          <div class="searchInput" style="height: 35px;" @click="this.findPopShowYn = true"  ref="channelSearchKey"/>
      </div>
      <findList v-if="findPopShowYn" @closePop="this.findPopShowYn = false"/>
      <div style="display: none; width: 100%;min-height: 200px;position: absolute;z-index: 999;top: 120px; border-bottom: 2px solid #ccc; padding: 0.5rem; left: 0px;background: rgb(255, 255, 255);">
        <input class="searchInput" ref="channelSearchKey" v-model="message" placeholder="채널명을 입력해주세요" />
        <input class="searchInput" ref="channelSearchKey" v-model="message" placeholder="파일 이름을 입력해주세요" />
        <input class="searchInput" ref="channelSearchKey" v-model="message" placeholder="본문 및 내용을 입력해주세요" />
        <input class="searchInput" ref="channelSearchKey" v-model="message" placeholder="본문 및 내용을 입력해주세요" />
      </div>
      <!-- <img v-on:click="openPushBoxPop()" class="fr" style="width: 1.5rem; margin-top: 1.5rem" src="../../assets/images/push/icon_noticebox.png" alt="검색버튼"> -->
    </div>
  <div style="width: 100%; height: 50px; overflow-x: scroll;">
    <div :style="setStickerWidth" style="min-width: 100%;  width: var(--stickerDivWidth); height: 50px; ">
      <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in stickerList " :key="index" style="min-width: 60px; margin-right: 5px; height: 25px; border-radius: 20px; float: left; padding: 0 10px;">
        <span class="font15">{{value.stickerName}}</span>
      </div>
    </div>
  </div>
  <gActiveBar :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div style="padding: 1.5rem 0">
        <commonList v-if="viewTab === 'newest'" :commonListData="this.nAlimList"  @goDetail="openPop" />
        <commonList v-else-if="viewTab === 'notRead'" :commonListData="this.rAlimList"  @goDetail="openPop" />
        <commonList v-else-if="viewTab === 'like'" :commonListData="this.lAlimList"  @goDetail="openPop" />
    </div>
  </div>
</template>

<script>
import findList from '../../components/popup/Tal_findList.vue'
export default {
  name: 'test',
  components: {
    findList
  },

  created () {
    this.$emit('changePageHeader', '알림')
  },
  computed: {
    setStickerWidth () {
      var stickerCnt = this.stickerList.length
      // eslint-disable-next-line no-debugger
      var textWidth = 16
      var stickerDivWidth = 0
      for (var i = 0; i < stickerCnt; i++) {
        stickerDivWidth += this.stickerList[i].stickerName.length * textWidth
      }
      // var stickerDivList = document.getElementsByClassName('stickerDiv')
      return {
        '--stickerDivWidth': stickerDivWidth + 'px'
      }
    }
  },
  methods: {
    openPushBoxPop () {
      // eslint-disable-next-line no-new-object
      var value = new Object()
      value.targetType = 'pushBox'
      this.openPop(value)
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        params.targetType = value.targetType
      } else {
        params.targetType = 'pushDetail'
      }
      if (value.pushKey !== undefined && value.pushKey !== null && value.pushKey !== '') { params.targetKey = value.pushKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.chanName }
      this.$emit('openPop', params)
      // this.$router.push({ name: 'pushDetail', params: { pushKey: idx } })
    },
    subHeaderEvent (request) {
      if (request === 'pushBox') { this.goPushBox() } else if (request === 'search') { this.goSearch() }
    },
    goPushBox () {
      this.$router.push({ name: 'pushBox' })
    },
    goSearch () {
      // this.$router.push({ name: 'pushBox' })
    },
    changeTab (tabName) {
      this.viewTab = tabName
    }
  },
  data () {
    return {
      headerTitle: '알림',
      findPopShowYn: false,
      stickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0dcaf05e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#0d61f05e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#dc35455e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#b035dc5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#35dcc55e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#4adc355e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d6efd5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#af0dfd5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#0d8bfd5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#fd0d5e5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#fd0d0d5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#6c7d185e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' },
        { stickerName: '택배', stickerKey: '0', stickerColor: '#73879c' }
      ],
      subTitlebtnList: [
        { btnName: 'pushBox', icon: 'http://placehold.it/30', function: 'goPushBox' },
        { btnName: 'search', icon: 'http://placehold.it/30', function: 'goSearchPush' }
      ],
      nAlimList: [
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        },
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }
      ],
      rAlimList: [
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }
      ],
      lAlimList: [
        {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }, {
          readYn: false,
          title: '(주)삼천리 도시가스 2022년 01월 ',
          chanName: '삼천리',
          recvDate: '2022',
          chanImg: 'http://placehold.it/50',
          stickerList: [
            { stickerName: '택배', stickerKey: '0', stickerColor: '#6c7d185e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#ad6cdb5e' },
            { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#dbb76c5e' },
            { stickerName: '온라인 쇼핑몰', stickerKey: '0', stickerColor: '#cfdb6c5e' }]
        }
      ],
      activeTabList: [{ display: '최신 알림', name: 'newest' }, { display: '안읽은 알림', name: 'notRead' }, { display: '좋아요 알림', name: 'like' }],
      viewTab: 'newest'
    }
  }
}
</script>

<style scoped>
.searchIcon{width: 1.5rem; float: right;}
.searchInput{border: 2px solid #E4E4E4; float: left; width: calc(100% - 2rem); float: left; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}

</style>
