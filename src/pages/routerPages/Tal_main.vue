<template>
<div :key="componentKey" class="pagePaddingWrap" v-if="renderOk" style="padding-bottom: 10px; padding-top: 10px;height: 100%; overflow: hidden scroll;">
  <loadingCompo v-show="loadingYn === true"/>
  <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
  <!-- <initModal v-if="initYn === true" :userEmail="this.userEmail" :userMobile="this.userMobile"/> -->
  <!-- <gConfirmPop :confirmText='"안녕하세요"' @ok='popYn= false' @no="popYn= false " v-if="popYn" /> -->
  <div class="userProfileWrap" style="background: #fff; padding: 10px; border-radius: 0.8rem;     box-shadow: 0 0 7px 3px #b7b4b440;"  v-if="userInfoChangeYn">
    <!-- <img src="../../../public/resource/userCommonIcon/userImg01.png" style="width: 5em; margin-right: 1rem"/> -->
    <!-- <div @click="goProfile" v-if="userInfo.userProfileImg" class="picImgWrap" style="background-position: center; background-size: cover; background-repeat: no-repeat;" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + changeImgUrl(userInfo.userProfileImg) : userInfo.userProfileImg) +') !;'"  ></div> -->
    <div @click="goProfile" v-if="userInfo.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + this.$changeUrlBackslash(userInfo.userProfileImg) : userInfo.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
    <!-- <div @click="goProfile" v-if="userInfo.userProfileImg" class="picImgWrap" style="background-position: center; background-size: cover; background-repeat: no-repeat;" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + userInfo.userProfileImg : userInfo.userProfileImg) +') !;'"  ></div> -->
    <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
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
  <top5Alim style="background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px;  box-shadow: 0 0 7px 3px #b7b4b440;" :alimList="alimList"  @openPop="openPop" ref="topAlim" />
  <top5Channel style="background: #FFF; padding: 10px; border-radius: 0.8rem; margin-top: 15px;  padding-top: 5px;  box-shadow: 0 0 7px 3px #b7b4b440;"  :top5ChanList="chanList" @openPop="openPop" ref="topChan" />

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
  created () {
    // onMessage('REQ', 'removeAllNoti')
    this.$emit('openLoading')
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    this.loadingYn = true
    this.getMainBoard()

    /* localStorage.setItem('popHistoryStack', '') */
    this.$emit('changePageHeader', '더알림')
    localStorage.setItem('loginYn', false)
    this.$userLoginCheck(true)
    this.getUserInform()
    this.$store.commit('setRemovePage', 0)
    this.$store.commit('updateStack', [0])
    // <%= ${sessionName} != null %>
  },
  mounted () {
    this.loadingYn = false
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
      loadingYn: false,
      notiDetail: {},
      systemName: {}
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
    refresh () {
      this.$refs.topAlim.refreshList()
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
            this.systemName = localStorage.getItem('systemName')
          }
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }

          var currentPage = this.$store.getters.hCPage

          if ((currentPage === 0 || currentPage === undefined)) {
            this.getMainBoard()
            this.refresh()
          } else {
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'TEAM') {
              if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
                return
              }
              await this.getChanDetail()
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    },
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.targetType = 'bookMemberDetail'
      param.targetType = 'setMypage'
      param.readOnlyYn = true
      param.selfYn = true
      this.$emit('openPop', param)
    },
    async reloadPage () {
      this.loadingYn = true
      this.$refs.topAlim.refreshList()
      this.$refs.topChan.reLoad()
      await this.getMainBoard()
      /* await this.$refs.topAlim.reLoad()
      await this.$refs.topChan.reLoad() */
      this.loadingYn = false
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
      return userInfo
    },

    async getMainBoard () {
      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      var paramMap = new Map()
      paramMap.set('userKey', userKey)
      paramMap.set('jobkindId', 'ALIM')

      return await this.$axios.post('service/tp.getMainBoard', Object.fromEntries(paramMap)
      ).then(response => {
        if (response.status === 200 || response.status === '200') {
          this.alimList = []
          this.alimList = response.data.alimList
          this.chanList = response.data.teamList
          this.renderOk = true
          console.log(response)
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
.picImgWrap {width: 80px; height: 80px; position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem;
}
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
