<template>
<div :key="componentKey" v-if="renderOk" style="padding-bottom: 60px;">
  <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
  <!-- <initModal v-if="initYn === true" :userEmail="this.userEmail" :userMobile="this.userMobile"/> -->
  <!-- <gConfirmPop :confirmText='"안녕하세요"' @ok='popYn= false' @no="popYn= false " v-if="popYn" /> -->
  <div class="userProfileWrap">
    <!-- <img src="../../assets/images/main/main_profile.png" style="width: 5em; margin-right: 1rem"/> -->
    <div style="width: 80px; height: 80px; border-radius: 80px; overflow: hidden; display: flex; margin-right: 1rem">
      <img v-if="userInfo.soPicUrl !== undefined && userInfo.soPicUrl !== null && userInfo.soPicUrl !== ''" :src="userInfo.soPicUrl"  style="width: 85px; height: 85px;"/>
      <img v-else src="../../assets/images/main/main_profile.png"  style="width: 85px; height: 85px;"/>
    </div>
    <div class="userProfileTextWrap">
      <p ref="userName" class="font18 fontBold grayBlack">{{changeText(userInfo.userDispMtext)}}</p>
      <img src="../../assets/images/common/ico_refresh.png" @click="reloadPage" style="position: absolute; right: 0; top: 0; width: 25px;" alt="">
      <div>
        <img src="../../assets/images/main/main_email.png" style= 'width: 1rem' />
        <span class="profileTitle" ref="userEmail">이메일</span>
        <span class="grayBlack font14" ref="userEmail">{{userInfo.userEmail}}</span>
      </div>
      <div>
        <img src="../../assets/images/main/main_phone.png" style= 'width: 1rem' />
        <span @click="test" class="profileTitle" ref="userEmail">휴대폰</span>
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
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import top5Channel from '../../components/pageComponents/main/Tal_top5_channelList.vue'
import top5Alim from '../../components/pageComponents/main/Tal_top5_pushList.vue'
import { onMessage } from '../../assets/js/webviewInterface'

// import { onMessage } from '../../assets/js/webviewInterface'
// import initModal from '../../components/popup/Tal_mainInitModal'

export default {
  name: '',
  props: {
    testYn: {}
  },
  async created () {
    // alert(true)
    this.$userLoginCheck()
    this.$emit('openLoading')
    /* localStorage.setItem('popHistoryStack', '') */
    this.$emit('changePageHeader', '더알림')
    // onMessage('REQ', 'getUserInfo')
    // await this.saveUserPhone()
    localStorage.setItem('loginYn', false)
    if (this.testYn !== undefined && this.testYn !== null && this.testYn !== '' && (this.testYn === true || this.testYn === 'true')) {
      ;
    } else {
      localStorage.setItem('loginYn', false)
      await this.$userLoginCheck()
    }
    await this.getUserInform()
    // <%= ${sessionName} != null %>
  },
  mounted () {
  },
  data () {
    return {
      appCloseYn: false,
      componentKey: 0,
      initYn: false,
      alimList: [],
      chanList: [],
      userInfo: [],
      renderOk: false,

      popYn: true
    }
  },
  components: {
    // initModal,
    commonConfirmPop,
    top5Channel,
    top5Alim
    // top5
    // top5Title
  },
  methods: {
    reloadPage () {
      this.$emit('openLoading')
      this.$router.go(0)
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 2000)
      // this.$emit('closeLoading')
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
    },
    BackPopClose (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'refresh') {
          /* if (localStorage.getItem('popHistoryStack') === '') {
            this.$router.go(0)
          } */
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
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
      this.getMainBoard(userKey)
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
      var paramMap = new Map()
      paramMap.set('userKey', userKey)
      await this.$axios.post('/tp.getMainBoard', Object.fromEntries(paramMap)
      ).then(response => {
        if (response.status === 200 || response.status === '200') {
          this.alimList = response.data.alimList
          this.chanList = response.data.teamList
          // return response.data
          this.renderOk = true
          this.$emit('closeLoading')
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

/* main */
.userProfileWrap{ display:flex; align-items: flex-start; margin-top: 1rem;}
  .userProfileTextWrap{width: calc(100% - 85px); text-align: left; position: relative;}
  .userProfileTextWrap >p{margin-bottom: 0.2rem;}
  .userProfileTextWrap img{ width:1rem; margin-right: 0.2rem;}
  .userProfileTextWrap .profileTitle{font-size: 14px; font-weight: bold; color: #6768A7; margin-right: 0.4rem;}

</style>
