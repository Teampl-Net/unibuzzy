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
  <top5Alim style="background: #FFF; padding: 10px; border-radius: 0.8rem; padding-top: 5px; margin-top: 15px;  box-shadow: 0 0 7px 3px #b7b4b440;" :allContList="GE_DISP_ALL_CONTENTS" :boardList="GE_DISP_BOARD_LIST" :alimList="this.GE_DISP_ALIM_LIST"  @openPop="openPop" ref="topAlim" />
  <top5Channel style="background: #FFF; padding: 10px; border-radius: 0.8rem; margin-top: 15px;  padding-top: 5px;  box-shadow: 0 0 7px 3px #b7b4b440;"  :chanList="GE_DISP_CHAN_LIST" @openPop="openPop" ref="topChan" />

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
      systemName: {},
      mainBoardList: [],
      mainAlimList: [],
      mainChanList: []
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
    async getMainBoard () {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      await this.$axios.post('service/tp.getMainBoard', Object.fromEntries(paramMap)
      ).then(async (response) => {
        if (response.status === 200 || response.status === '200') {
          var teamList = response.data.teamList

          this.mainAlimList = response.data.alimList
          var index = null
          var poolList = null
          var index1 = null
          for (var i = 0; i < this.mainAlimList.length; i++) {
            index = teamList.findIndex((item) => item.teamKey === this.mainAlimList[i].creTeamKey)
            poolList = teamList[index].ELEMENTS.alimList
            index1 = poolList.findIndex((item) => item.mccKey === this.mainAlimList[i].mccKey)
            if (index1 === -1) {
              teamList[index].ELEMENTS.alimList.push(this.mainAlimList[i])
            }
          }

          for (var s = 0; s < this.mainBoardList.length; s++) {
            index = teamList.findIndex((item) => item.teamKey === this.mainBoardList[s].creTeamKey)
            poolList = teamList[index].ELEMENTS.boardList
            index1 = poolList.findIndex((item) => item.mccKey === this.mainBoardList[s].mccKey)
            if (index1 === -1) {
              teamList[index].ELEMENTS.boardList.push(this.mainBoardList[s])
            }
          }
          this.$store.dispatch('D_CHANNEL/AC_MAIN_CHAN_LIST', teamList)

          this.mainBoardList = response.data.boardList
          /* for (var i = 0; i < teamList.length; i++) {
          var team = teamList[i]
          team.teamTypeText = commonMethods.teamTypeString(team.teamType)
          var title = '[더알림]' + commonMethods.changeText(team.nameMtext)
          var message = commonMethods.changeText(team.memoMtext)
          // team.copyTextStr = await commonMethods.makeShareLink(team.teamKey, 'chanDetail', message, title)

          // eslint-disable-next-line no-new-object
          var D_CHAN_AUTH
          D_CHAN_AUTH.recvAlimYn = true
          if (team.userTeamInfo) {
            if (team.userTeamInfo.notiYn === false || Number(team.userTeamInfo.notiYn) === 0) {
              D_CHAN_AUTH.recvAlimYn = team.userTeamInfo.notiYn
            }
            if (team.userTeamInfo.showProfileYn === 1) {
              D_CHAN_AUTH.showProfileYn = true
              D_CHAN_AUTH.userGrade = '(공개)'
            }
            D_CHAN_AUTH.followYn = true
            team.detailShowYn = false
            D_CHAN_AUTH.followTypeText = '구독자'
            if (team.userTeamInfo.managerKey !== undefined && team.userTeamInfo.managerKey !== null && team.userTeamInfo.managerKey !== '') {
              if (team.userTeamInfo.ownerYn === true || team.userTeamInfo.ownerYn === 'true') {
                D_CHAN_AUTH.followTypeText = '소유자'
                D_CHAN_AUTH.userGrade = '(관리자)'
                D_CHAN_AUTH.ownerYn = true
                D_CHAN_AUTH.admYn = true
              } else {
                D_CHAN_AUTH.followTypeText = '관리자'
                D_CHAN_AUTH.userGrade = '(매니저)'
              }
              D_CHAN_AUTH.adminYn = true
            }
          }

          team.D_CHAN_AUTH = D_CHAN_AUTH
        } */
          this.mainChanList = teamList
          this.$store.dispatch('D_CHANNEL/AC_MAIN_CHAN_LIST', teamList)
          this.$store.dispatch('D_CONTENTS/AC_MAIN_TEAM_LIST', teamList)
        /* functions.AC_MAIN_CHAN_LIST(teamList)
        functions.AC_MAIN_ALIM_LIST(response.data.boardList)
        functions.AC_MAIN_BOARD_LIST(response.data.boardList) */
        // store.commit('updateD_chanList', teamList)
        // store.commit('updateD_alimList', response.data.alimList)
        // this.chanList = response.data.teamList
        }
      // response.data.userMap
      }).catch((error) => {
        console.warn('ERROR!!!!! : ', error)
      // return 'error'
      })
    },
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
    GE_DISP_BOARD_LIST () {
      var idx1, idx2
      if (this.mainBoardList) {
        var test = []
        for (var i = 0; i < this.mainBoardList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainBoardList[i].creTeamKey)
          var chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          var dataList = chanDetail.ELEMENTS.boarList
          idx2 = dataList.findIndex((item) => item.mccKey === this.mainBoardList[i].mccKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          test.push(dataList[idx2])
        // this.mainBoardList[i] = chanDetail.ELEMENTS.boarList
        }
        return test
      } else {
        return null
      }
    },
    GE_DISP_ALIM_LIST () {
      var idx1, idx2
      if (this.mainAlimList) {
        var test = []
        for (var i = 0; i < this.mainAlimList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainAlimList[i].creTeamKey)
          var chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
          var dataList = chanDetail.ELEMENTS.alimList
          idx2 = dataList.findIndex((item) => item.mccKey === this.mainAlimList[i].mccKey)
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          test.push(dataList[idx2])
        // this.mainBoardList[i] = chanDetail.ELEMENTS.boarList
        }
        return test
      } else {
        return null
      }
    },
    GE_DISP_CHAN_LIST () {
      var idx1
      if (this.mainChanList) {
        var test = []
        for (var i = 0; i < this.mainChanList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainChanList[i].creTeamKey)
          if (idx1 !== -1) {
            test.push(this.GE_MAIN_CHAN_LIST[idx1])
          }
        // this.mainBoardList[i] = chanDetail.ELEMENTS.boarList
        }
        return test
      } else {
        return null
      }
    },
    GE_DISP_ALL_CONTENTS () {
      var idx1, idx2
      if (this.mainBoardList && this.mainAlimList) {
        var test = []
        var newArr = [
          ...this.mainBoardList,
          ...this.mainAlimList
        ]
        for (var i = 0; i < newArr.length; i++) {
          if (this.mainChanList[i].jobkindId === 'BOAR') {
            idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainBoardList[i].creTeamKey)
            idx2 = this.GE_MAIN_CHAN_LIST[idx1].ELEMENTS.boarList.findIndex((item) => item.mccKey === this.mainBoardList[i].mccKey)
            if (idx2 !== -1) {
              test.push(this.GE_MAIN_CHAN_LIST[idx1].ELEMENTS.boarList[idx2])
            } else {
              test.push(this.mainBoardList[i])
            }
          } else {
            idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainAlimList[i].creTeamKey)
            idx2 = this.GE_MAIN_CHAN_LIST[idx1].ELEMENTS.alimList.findIndex((item) => item.mccKey === this.mainAlimList[i].mccKey)
            if (idx2 !== -1) {
              test.push(this.GE_MAIN_CHAN_LIST[idx1].ELEMENTS.alimList[idx2])
            } else {
              test.push(this.mainBoardList[i])
            }
          }
        // this.mainBoardList[i] = chanDetail.ELEMENTS.boarList
        }
        test = test.sort(function (a, b) { // num으로 오름차순 정렬
          return b.mccKey - a.mccKey
        // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return test
      } else {
        return null
      }
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    }
  },

  watch: {
    GE_RECENT_CHANGE_TEAM (value, old) {
      alert(value)
    },
    GE_USER (value, old) {
      // console.log(this.userInfo)
    },
    GE_MAIN_CHAN_LIST (value, old) {
      this.chanList = value
    },
    /* GE_MAIN_ALIM_LIST (value, old) {
      this.setAllContents()
    },
    GE_MAIN_BOARD_LIST (value, old) {
      this.setAllContents()
    }, */
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
