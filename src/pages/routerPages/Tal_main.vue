<template>
<div v-if="this.GE_USER" :key="componentKey" class="pagePaddingWrap" style="padding-bottom: 10px; padding-top: 10px;height: 100%; overflow: hidden scroll;">
  <loadingCompo v-show="loadingYn === true"/>
  <commonConfirmPop v-if="appCloseYn" @ok="closeApp" @no="this.appCloseYn=false" confirmType="two" confirmText="더알림을 종료하시겠습니까?" />
  <div class="userProfileWrap" style="background: #fff; padding: 10px; border-radius: 0.8rem;     box-shadow: 0 0 7px 3px #b7b4b440;"  v-if="userInfoChangeYn">
    <!-- <img src="../../../public/resource/userCommonIcon/userImg01.png" style="width: 5em; margin-right: 1rem"/> -->
    <!-- <div @click="goProfile" v-if="userInfo.userProfileImg" class="picImgWrap" style="background-position: center; background-size: cover; background-repeat: no-repeat;" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + changeImgUrl(userInfo.userProfileImg) : userInfo.userProfileImg) +') !;'"  ></div> -->
    <div @click="goProfile" v-if="this.GE_USER.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (this.GE_USER.domainPath ? this.GE_USER.domainPath + this.$changeUrlBackslash(this.GE_USER.userProfileImg) : this.GE_USER.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;"></div>
    <!-- <div @click="goProfile" v-if="userInfo.userProfileImg" class="picImgWrap" style="background-position: center; background-size: cover; background-repeat: no-repeat;" ref="mainImgAreaRef" :style="'background-image: url('+ (userInfo.domainPath ? userInfo.domainPath + userInfo.userProfileImg : userInfo.userProfileImg) +') !;'"  ></div> -->
    <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
    <div class="userProfileTextWrap" >
      <p ref="userName" class="mainUserName font18 fontBold grayBlack">{{changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)}}</p>
      <img src="../../assets/images/common/ico_refresh.png" @click="reloadPage" class="mainRefreshBtn" style="position: absolute; right: 0; top: 0; width: 25px;" alt="">
      <div>
        <img class="mainIcon" src="../../assets/images/main/main_email.png" style= 'width: 1rem' />
        <span class="profileTitle font14" ref="userEmail" @click="this.$showToastPop('해당 게시물의 알림을 활성화 했습니다.')">이메일</span>
        <span class="grayBlack font14" ref="userEmail">{{this.GE_USER.userEmail}}</span>
      </div>
      <div>
        <img class="mainIcon" src="../../assets/images/main/main_phone.png" style= 'width: 1rem' />
        <span @click="test" class="profileTitle font14" ref="userMobile">휴대폰</span>
        <span class="grayBlack font14" ref="userMobile">{{this.$setPhone(this.GE_USER.phoneEnc)}}</span>
      </div>
    </div>
  </div>
  <!--<div style="width: 200px; height: 200px; background: #ccc" v-on:click="goPush()">푸쉬 테스트!!!!</div> -->
  <top5Alim style="background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px;  box-shadow: 0 0 7px 3px #b7b4b440;" :allContList="allContList" :boardList="GE_MAIN_BOARD_LIST" :alimList="this.GE_MAIN_ALIM_LIST"  @openPop="openPop" ref="topAlim" />
  <top5Channel style="background: #FFF; padding: 10px; border-radius: 0.8rem; margin-top: 15px;  padding-top: 5px;  box-shadow: 0 0 7px 3px #b7b4b440;"  :chanList="GE_MAIN_CHAN_LIST" @openPop="openPop" ref="topChan" />

</div>

</template>

<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import top5Channel from '../../components/pageComponents/main/D_top5ChanList.vue'
import top5Alim from '../../components/pageComponents/main/D_top5ContentsList.vue'
import { onMessage } from '../../assets/js/webviewInterface'
import loadingCompo from '../../components/layout/Tal_loading.vue'
// import { onMessage } from '../../assets/js/webviewInterface'
// import initModal from '../../components/popup/Tal_mainInitModal'
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
export default {
  name: '',
  props: {
    testYn: {},
    routerReloadKey: {}
  },
  created () {
    // onMessage('REQ', 'removeAllNoti')
    this.$emit('openLoading')
    this.loadingYn = true
    this.setAllContents()
    console.log(this.GE_MAIN_CHAN_LIST)
    console.log(this.chanList)
    // document.addEventListener('message', e => this.recvNoti(e))
    // // window.addEventListener('message', e => this.recvNoti(e))
    this.$emit('changePageHeader', '더알림')
    /* this.$store.commit('setRemovePage', 0)
    this.$store.commit('D_HISTORY/updateStack', [0]) */
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
      boardList: [],
      allContList: [],
      userInfo: null,
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
    /* ...mapActions('D_USER', [
      'AC_USER'
    ]),
    ...mapActions('D_CHANNEL', [
      'AC_MAIN_CHAN_LIST'
    ]),
    ...mapActions('D_CONTENTS', [
      'AC_MAIN_ALIM_LIST'
    ]),
    ...mapActions('D_CONTENTS', [
      'AC_MAIN_BOARD_LIST'
    ]), */
    setAllContents () {
      if (this.GE_MAIN_ALIM_LIST && this.GE_MAIN_BOARD_LIST) {
        if (this.GE_MAIN_ALIM_LIST.length > 4 && this.GE_MAIN_BOARD_LIST.length > 4) {
          this.allContList = [
            ...this.GE_MAIN_ALIM_LIST.slice(0, 5),
            ...this.GE_MAIN_BOARD_LIST.slice(0, 5)
          ]
        } else {
          if (this.GE_MAIN_ALIM_LIST.length > 4) {
            this.allContList = [
              ...this.GE_MAIN_ALIM_LIST.slice(0, 5),
              ...this.GE_MAIN_BOARD_LIST
            ]
          } else if (this.GE_MAIN_ALIM_LIST.length > 4) {
            this.allContList = [
              ...this.GE_MAIN_ALIM_LIST,
              ...this.GE_MAIN_BOARD_LIST.slice(0, 5)
            ]
          } else {
            this.allContList = [
              ...this.GE_MAIN_ALIM_LIST,
              ...this.GE_MAIN_BOARD_LIST
            ]
          }
        }
        this.allContList = this.allContList.sort(function (a, b) { // num으로 오름차순 정렬
          return b.contentsKey - a.contentsKey
        // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
      }
    },
    refresh () {
      /* this.$refs.topAlim.refreshList() */
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
      /* await this.getMainBoard() */
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
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_MAIN_ALIM_LIST () {
      return this.$store.getters['D_CONTENTS/GE_MAIN_ALIM_LIST']
    },
    GE_MAIN_BOARD_LIST () {
      return this.$store.getters['D_CONTENTS/GE_MAIN_BOARD_LIST']
    }
  },

  watch: {
    GE_USER (value, old) {
      // console.log(this.userInfo)
    },
    GE_MAIN_CHAN_LIST (value, old) {
      this.chanList = value
    },
    GE_MAIN_ALIM_LIST (value, old) {
      this.setAllContents()
    },
    GE_MAIN_BOARD_LIST (value, old) {
      this.setAllContents()
    },
    pageUpdate (value, old) {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history.length < 2 && (history[0] === 0 || history[0] === undefined)) {
        if (this.$route.path === '/') {
          this.openCloseAppPop()
        }
      }
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
