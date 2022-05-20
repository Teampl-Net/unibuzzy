<template>
<div :key="componentKey" v-if="renderOk">
  <!-- <initModal v-if="initYn === true" :userEmail="this.userEmail" :userMobile="this.userMobile"/> -->
  <!-- <gConfirmPop :confirmText='"안녕하세요"' @ok='popYn= false' @no="popYn= false " v-if="popYn" /> -->
  <div class="userProfileWrap">
    <img src="../../assets/images/main/main_profile.png" style="width: 5em; margin-right: 1rem"/>
    <!-- <img v-if="userInfo.picMfilekey !== undefined && userInfo.userImg !== null && userInfo.userImg !== ''" src="../../assets/images/main/main_profile.png" style="width: 5em; margin-right: 1rem"/>
    <img :src="userInfo.picMfilekey" style="width: 5em; margin-right: 1rem"/> -->
    <div class="userProfileTextWrap">
      <p ref="userName" class="font18 fontBold grayBlack">{{changeText(userInfo.userDispMtext)}}</p>
      <div>
        <img src="../../assets/images/main/main_email.png" style= 'width: 1rem' />
        <span class="profileTitle" ref="userEmail">이메일</span>
        <span class="grayBlack font14" ref="userEmail">{{userInfo.userEmail}}</span>
      </div>
      <div>
        <img src="../../assets/images/main/main_phone.png" style= 'width: 1rem' />
        <span class="profileTitle" ref="userEmail">휴대폰</span>
        <span class="grayBlack font14" ref="userMobile">010-****-{{userInfo.phoneLast}}</span>
      </div>
    </div>
  </div>
  <!--<div style="width: 200px; height: 200px; background: #ccc" v-on:click="goPush()">푸쉬 테스트!!!!</div> -->
  <top5Alim :alimList="this.alimList"  @openPop="openPop" />
  <top5Channel :top5ChanList="chanList" @openPop="openPop" />

</div>

</template>

<script>
import top5Channel from '../../components/pageComponents/main/Tal_top5_channelList.vue'
import top5Alim from '../../components/pageComponents/main/Tal_top5_pushList.vue'
// import { onMessage } from '../../assets/js/webviewInterface'
// import initModal from '../../components/popup/Tal_mainInitModal'
export default {
  name: '',
  props: {
    testYn: {}
  },
  async created () {
    this.$emit('changePageHeader', '더알림')
    // onMessage('REQ', 'getUserInfo')
    // await this.saveUserPhone()
    localStorage.setItem('loginYn', false)
    if (this.testYn !== undefined && this.testYn !== null && this.testYn !== '' && (this.testYn === true || this.testYn === 'true')) {
      ;
    } else {
      await this.$userLoginCheck()
    }
    // alert(this.testYn)
    await this.getUserInform()
    // <%= ${sessionName} != null %>
    // alert(${sessionName}
  },
  mounted () {
    this.$emit('closeLoading')
  },
  data () {
    return {
      componentKey: 0,
      initYn: false,
      alimList: [],
      chanList: [],
      userInfo: [],
      renderOk: false,

      popYn:true
    }
  },
  components: {
    // initModal,
    top5Channel,
    top5Alim

    // top5
    // top5Title
  },
  methods: {

    forceRerender () {
      this.componentKey += 1
    },
    /*  async saveUserPhone () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'changeMobile'
      await this.openPop(params)
    }, */
    openPop (params) {
      // eslint-disable-next-line no-new-object
      this.$emit('openPop', params)
      // 아래라인 모달창에서 로딩화면보여주고싶으면 풀기
      // this.$emit('openLoading')
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    goPush () {
      // eslint-disable-next-line no-new-object
      var message = new Object()
      // eslint-disable-next-line no-new-object
      this.$axios.post('/send', { message }
      // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
      ).then(response => {
        console.warn(response)
      }).catch((ex) => {
        console.warn('ERROR!!!!! : ', ex)
      })
    },
    async getUserInform () {
      var userInfo = await this.$getUserInform()
      var userKey = userInfo.userKey
      await this.getMainBoard(userKey)
      if (userInfo !== undefined && userInfo !== null) {
        if (userInfo.userEmail !== undefined && userInfo.userEmail !== null); else userInfo.userEmail = '등록된 이메일이 없습니다.'
        if (userInfo.phoneLast !== undefined && userInfo.phoneLast !== null); else userInfo.phoneLast = '등록된 번호가 없습니다.'
        if (userInfo.userDispMtext !== undefined && userInfo.userDispMtext !== null); else {
          if (userInfo.userNameMtext !== undefined && userInfo.userNameMtext !== null) { userInfo.userDispMtext = userInfo.userNameMtext } else { userInfo.userDispMtext = '등록된 이름이 없습니다.' }
        }
      }
      this.userInfo = userInfo
      /* setTimeout(() => {
        this.$emit('closeLoading')
      }, 300) */
      this.$emit('closeLoading')
      return userInfo
    },
    async getMainBoard (userKey) {
      await this.$axios.post('/tp.getMainBoard', userKey
      ).then(response => {
        if (response.status === 200 || response.status === '200') {
          this.alimList = response.data.alimList
          this.chanList = response.data.teamList
          // return response.data
          this.renderOk = true
        }
        // response.data.userMap
      }).catch((error) => {
        console.warn('ERROR!!!!! : ', error)
        // return 'error'
      })
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    }
  },
  computed: {
  }
  // onMessage (data) {
  //   window.nsWebViewBridge.emit('onMessage', data)
  // }

}
</script>

<style scoped>

</style>
