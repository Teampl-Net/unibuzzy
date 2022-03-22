<template>
<div :key="componentKey">
  <initModal v-if="initYn === true" :userEmail="this.userEmail" :userMobile="this.userMobile"/>
  <div class="pagePaddingWrap">
    <div class="userProfileWrap">
      <img src="../../assets/images/main/main_profile.png" style="width: 5em; margin-right: 1rem"/>
      <div class="userProfileTextWrap">
        <p ref="userName" class="font20 fontBold grayBlack">{{userName}}</p>
        <div><img src="../../assets/images/main/main_email.png" style= 'width: 1rem' /><span class="profileTitle" ref="userEmail">이메일</span>
        <p class="grayBlack font15" ref="userEmail">{{getUserEmail}}</p></div>
        <div><img src="../../assets/images/main/main_phone.png" style= 'width: 1rem' /><span class="profileTitle" ref="userEmail">휴대폰</span>
        <p class="grayBlack font15" ref="userMobile">{{getUserMobile}}</p></div>
      </div>
    </div>
    <!--<div style="width: 200px; height: 200px; background: #ccc" v-on:click="goPush()">푸쉬 테스트!!!!</div> -->
    <top5Alim :alimList="this.nAlimList"  @openPop="openPop" />
    <top5Channel :chanList="chanList" @openPop="openPop" />
  </div>
</div>

</template>

<script>
import top5Channel from '../../components/pageComponents/main/Tal_top5_channelList.vue'
import top5Alim from '../../components/pageComponents/main/Tal_top5_pushList.vue'

import { onMessage } from '../../assets/js/webviewInterface'
import initModal from '../../components/popup/Tal_mainInitModal'
export default {
  name: '',
  created () {
    this.$emit('changePageHeader', '더알림')
    onMessage('REQ', 'getUserInfo')
    this.userName = localStorage.getItem('userName')
    this.userEmail = localStorage.getItem('userEmail')
    this.userMobile = localStorage.getItem('userMobile')
    this.userImg = localStorage.getItem('userImg')
  },
  data () {
    return {
      componentKey: 0,
      initYn: false,
      alimListTitle: '알림',
      chanListTitle: '채널',
      userName: '',
      userEmail: '',
      userMobile: '',
      userImg: '',
      nAlimList: [
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010841', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' },
        { readYn: false, title: '(주)삼천리 도시가스 2022년 01월 ', chanName: '삼천리', recvDate: '1620010849', chanImg: 'http://placehold.it/100' }
      ],
      chanList: [
        { chanKey: '0', chanName: '황수민', followerCnt: '35400', chanMessage: '사랑받는 기업<br> 삼천리' },
        { chanKey: '1', chanName: '우체국', followerCnt: '35400', chanMessage: '우체국 앱(포스트 톡)을 설치하시면 배송조회, 착불결제 등 다양한 서비스를 이용하실 수 있습니다.' },
        { chanKey: '2', chanName: '삼천리', followerCnt: '35400', chanMessage: '사랑받는 기업, 삼천리' },
        { chanKey: '3', chanName: '삼천리', followerCnt: '35400', chanMessage: '사랑받는 기업, 삼천리' },
        { chanKey: '4', chanName: '삼천리', followerCnt: '35400', chanMessage: '사랑받는 기업, 삼천리' }
      ]

    }
  },
  components: {
    initModal,
    top5Channel,
    top5Alim

    // top5
    // top5Title
  },
  methods: {
    forceRerender () {
      this.componentKey += 1
    },
    openPop (params) {
      // eslint-disable-next-line no-new-object
      this.$emit('openPop', params)
      // this.$router.push({ name: 'pushDetail', params: { pushKey: idx } })
    },
    goPush () {
      // eslint-disable-next-line no-new-object
      var message = new Object()
      // alert(channel.masterTel)
      // eslint-disable-next-line no-new-object
      this.$axios.post('/send', { message }
      // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
      ).then(response => {
        // alert(response)
        console.warn(response)
      }).catch((ex) => {
        // alert(ex)
        console.warn('ERROR!!!!! : ', ex)
      })
    }
  },
  computed: {
    getUserEmail () {
      var resultEmail = '등록된 이메일 주소가 없습니다.'
      var userEmail = localStorage.getItem('userEmail')
      if (userEmail !== undefined && userEmail !== 'undefined' && userEmail !== null && userEmail !== 'null' && userEmail !== '') {
        resultEmail = userEmail
      }
      return resultEmail
    },
    getUserMobile () {
      var resultMobile = '등록된 번호가 없습니다.'
      var userMobile = localStorage.getItem('userMobile')
      if (userMobile !== undefined && userMobile !== 'undefined' && userMobile !== null && userMobile !== 'null' && userMobile !== '') {
        resultMobile = userMobile
      }
      return resultMobile
    }
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }

}
</script>

<style scoped>

</style>
