<template>
  <listTitle style="margin-bottom: 1rem" listTitle= "알림" :moreLink="this.moreLink" @openPop= "openPop"/>
    <gActiveBar :tabList="this.activeTabList" @changeTab= "changeTab" />
    <div style="width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem;">
      <commonList :commonListData="this.pushList" :key="this.viewTab"  @goDetail="openPop" :mainYnProp="this.mainYn"/>
        <!-- <commonList v-if="viewTab === 'newest'" :commonListData="this.nAlimList"  @goDetail="openPop" :mainYnProp="this.mainYn"/>
        <commonList v-else-if="viewTab === 'notRead'" :commonListData="this.rAlimList"  @goDetail="openPop" :mainYnProp="this.mainYn"/>
        <commonList v-else-if="viewTab === 'like'" :commonListData="this.lAlimList"  @goDetail="openPop" :mainYnProp="this.mainYn"/> -->
    </div>
</template>

<script>

import listTitle from '../../unit/Tal_main_title.vue'
// import router from '../../../router'
export default {
  name: 'top5Title',
  created () {
    this.pushList = this.alimList
  },
  data () {
    return {
      mainYn: true,
      moreLink: 'push',
      nAlimList: [
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010841', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' }
      ],
      rAlimList: [
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' }
      ],
      lAlimList: [
        { readYn: false, title: '주문이 완료되었습니다. 음료 완료까지 20...', chanName: '이디야 커피', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '주문이 완료되었습니다. 음료 완료까지 20... ', chanName: '이디야 커피', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '주문이 완료되었습니다. 음료 완료까지 20...', chanName: '이디야 커피', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '주문이 완료되었습니다. 음료 완료까지 20...', chanName: '이디야 커피', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '주문이 완료되었습니다. 음료 완료까지 20...', chanName: '이디야 커피', recvDate: '1620010849', chanImg: 'http://placehold.it/100' }
      ],
      activeTabList: [{ display: '최신 알림', name: 'newest' }, { display: '안읽은 알림', name: 'notRead' }, { display: '좋아요 알림', name: 'like' }],
      viewTab: 'newest'
    }
  },
  props: {
    alimList: {}
  },
  components: {
    listTitle
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
      if (value.pushKey !== undefined && value.pushKey !== null && value.pushKey !== '') { params.targetKey = value.pushKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.chanName }
      this.$emit('openPop', params)
    },
    changeTab (tabName) {
      this.viewTab = tabName
      this.getTop5PushList(this.viewTab)
    },
    getTop5PushList (viewTab) {
      // eslint-disable-next-line no-new-object
      /* var param = new Object()
      this.$axios.post('/send', { param }
      // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
      ).then(response => {
        alert(response)
        this.pushList = response.pushList
      }).catch((ex) => {
        // alert(ex)
        console.warn('ERROR!!!!! : ', ex)
      }) */
      this.pushList = [
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '우체국 배달 예정 "서로 존중, 함께 배려" ', chanName: '우체국', recvDate: '1620010849', chanImg: 'http://placehold.it/100' }
      ]
    }
  }

}
</script>

<style scoped>
.alimeListTr{border-bottom: 0.5px solid #6768A73D}
.alimeListTr :last-child{border-bottom: none}
</style>
