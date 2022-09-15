<template>
<div :key="componentKey" class="pagePaddingWrap" v-if="renderOk" style="padding-bottom: 10px; padding-top: 10px; background: #FFF; height: 100%; overflow: hidden scroll;">
  <loadingCompo v-show="loadingYn === true"/>
  <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
  <!-- <initModal v-if="initYn === true" :userEmail="this.userEmail" :userMobile="this.userMobile"/> -->
  <!-- <gConfirmPop :confirmText='"안녕하세요"' @ok='popYn= false' @no="popYn= false " v-if="popYn" /> -->
  <div class="userProfileWrap"  v-if="userInfoChangeYn">
    <!-- <img src="../../assets/images/main/main_profile.png" style="width: 5em; margin-right: 1rem"/> -->
    <div @click="goProfile" v-if="userInfo.userProfileImg !== undefined && userInfo.userProfileImg !== null && userInfo.userProfileImg !== ''" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + userInfo.userProfileImg : userInfo.userProfileImg) +')'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;">
    </div>
    <div v-else class="picImgWrap"  style="background-image: url('../../assets/images/main/main_profile.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">

    </div>
    <div class="userProfileTextWrap" >
      <p ref="userName" class="mainUserName font18 fontBold grayBlack">{{changeText(userInfo.userDispMtext || userInfo.userNameMtext)}}</p>
      <img src="../../assets/images/common/ico_refresh.png" @click="reloadPage" class="mainRefreshBtn" style="position: absolute; right: 0; top: 0; width: 25px;" alt="">
      <div>
        <img class="mainIcon" src="../../assets/images/main/main_email.png" style= 'width: 1rem' />
        <span class="profileTitle font14" ref="userEmail" @click="this.$showToastPop('해당 게시물의 알림을 활성화 했습니다.')">이메일</span>
        <span class="grayBlack font14" ref="userEmail">{{userInfo.userEmail}}</span>
      </div>
      <div>
        <img class="mainIcon" src="../../assets/images/main/main_phone.png" style= 'width: 1rem' />
        <span @click="test" class="profileTitle font14" ref="userMobile">휴대폰</span>
        <span class="grayBlack font14" ref="userMobile">{{this.$setPhone(userInfo.phoneEnc)}}</span>
      </div>
    </div>
  </div>
  <!--<div style="width: 200px; height: 200px; background: #ccc" v-on:click="goPush()">푸쉬 테스트!!!!</div> -->
  <top5Alim :alimList="alimList"  @openPop="openPop" ref="topAlim" />
  <top5Channel :top5ChanList="chanList" @openPop="openPop" ref="topChan" />

</div>

</template>

<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import top5Channel from '../../components/pageComponents/main/Tal_top5_channelList.vue'
import top5Alim from '../../components/pageComponents/main/Tal_top5_pushList.vue'
import { onMessage } from '../../assets/js/webviewInterface'
import loadingCompo from '../../components/layout/Tal_loading.vue'
// import { onMessage } from '../../assets/js/webviewInterface'
// import initModal from '../../components/popup/Tal_mainInitModal'

export default {
  name: '',
  props: {
    testYn: {},
    routerReloadKey: {}
  },
  async created () {
    // onMessage('REQ', 'removeAllNoti')
    this.$emit('openLoading')
    this.loadingYn = true
    /* localStorage.setItem('popHistoryStack', '') */
    this.$emit('changePageHeader', '더알림')
    // onMessage('REQ', 'getUserInfo')
    // await this.saveUserPhone()
    localStorage.setItem('loginYn', false)
    if (this.testYn !== undefined && this.testYn !== null && this.testYn !== '' && (this.testYn === true || this.testYn === 'true')) {
      ;
    } else {
      localStorage.setItem('loginYn', false)
    }
    await this.getUserInform()
    this.$store.commit('setRemovePage', 0)
    this.$store.commit('updateStack', [0])
    // <%= ${sessionName} != null %>
    this.loadingYn = false
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

      popYn: true,
      userKey: null,
      userInfoChangeYn: true,
      loadingYn: false
    }
  },
  components: {
    // initModal,
    commonConfirmPop,
    top5Channel,
    top5Alim,
    loadingCompo
    // top5
    // top5Title
  },
  methods: {
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    /* checkSession () {
      var iframe
      iframe = document.getElementById('sessionHidden')
      if (iframe == null) {
        iframe = document.createElement('iframe')
        iframe.id = 'sessionHidden'
        iframe.style.visibility = 'none'
        document.body.appendChild(iframe)
      }
      iframe.src = '/Tal_checkSession.jsp'
      // iframe.download = name
      this.filePopShowYn = false
      return false
    }, */
    async reloadPage () {
      // this.$forceUpdate()
      // window.location.replace(window.opener.documｅnt.location.href);
      // this.$router.push({ name: "main" })
      // this.$router.push('/')

      // this.$emit('openLoading')
      // this.$router.go(0)
      // setTimeout(() => {
      //   this.$emit('closeLoading')
      // }, 2000)

      // await this.$axios.post('service/tp.getMainBoard', Object.fromEntries(paramMap)
      // ).then(response => {
      //   if (response.status === 200 || response.status === '200') {
      //     console.log(response);
      //     this.alimList = response.data.alimList
      //     this.chanList = response.data.teamList
      //     this.renderOk = true
      //     this.$emit('closeLoading')
      //   }
      //   // response.data.userMap
      // }).catch((error) => {
      //   console.warn('ERROR!!!!! : ', error)
      //   // return 'error'
      // })

      this.$emit('openLoading')
      this.loadingYn = true
      await this.$refs.topChan.reLoad()
      await this.$refs.topAlim.reLoad()
      setTimeout(() => {
        this.loadingYn = false
        this.$emit('closeLoading')
      }, 500)

      // this.$refs.topChan.reLoad()
    },
    closeApp () {
      onMessage('closeApp', 'requestUserPermission')
      this.appCloseYn = false
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
      // alert(JSON.stringify(params))
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
      this.userKey = userInfo.userKey
      this.getMainBoard(this.userKey)
      if (userInfo !== undefined && userInfo !== null) {
        if (userInfo.userEmail !== undefined && userInfo.userEmail !== null); else userInfo.userEmail = '등록된 이메일이 없습니다.'
        if (userInfo.phoneLast !== undefined && userInfo.phoneLast !== null) {
          userInfo.phoneLast = '010-****-' + userInfo.phoneLast
        } else {
          userInfo.phoneLast = '등록된 번호 없음'
        }

        if (userInfo.userDispMtext !== undefined && userInfo.userDispMtext !== null); else {
          if (userInfo.userNameMtext !== undefined && userInfo.userNameMtext !== null) { userInfo.userDispMtext = userInfo.userNameMtext } else { userInfo.userDispMtext = '등록된 이름이 없습니다.' }
        }
      }
      this.userInfo = userInfo
      console.log(this.userInfo)
      // // eslint-disable-next-line no-debugger
      // debugger
      /* setTimeout(() => {
        this.$emit('closeLoading')
      }, 300) */
      this.$emit('closeLoading')
      return userInfo
    },

    async getMainBoard (userKey) {
      var paramMap = new Map()
      paramMap.set('userKey', userKey)
      paramMap.set('jobkindId', 'ALIM')

      await this.$axios.post('service/tp.getMainBoard', Object.fromEntries(paramMap)
      ).then(response => {
        if (response.status === 200 || response.status === '200') {
          this.alimList = []
          this.alimList = response.data.alimList
          this.chanList = response.data.teamList
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
    },
    openCloseAppPop () {
      this.appCloseYn = true
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters.hStack
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
  },

  watch: {
    pageUpdate (value, old) {
      var history = this.$store.getters.hStack
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (this.$route.path === '/') {
          this.openCloseAppPop()
        }
      }
    },
    historyStack (value, old) {
    },
    routerReloadKey () {
      this.$nextTick(() => {
        this.$userLoginCheck(true)
        this.userInfo = this.$getUserInform()
        console.log(JSON.parse(localStorage.getItem('sessionUser')).userProfileImg)
        this.$refs.mainImgAreaRef.style.backgroundImage = 'url(' + JSON.parse(localStorage.getItem('sessionUser')).userProfileImg + ')'
      })
    }
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
  .userProfileTextWrap .profileTitle{font-weight: bold; color: #6768A7; margin-right: 0.4rem;}
.picImgWrap {width: 80px; height: 80px; position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem}
.picImgWrap img {width: 100%; position: absolute; top: 0; left: 0;}
@media screen and (max-width: 300px) {
  .picImgWrap{
    width: 60px!important;
    height: 60px!important;
  }
  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
}

</style>
