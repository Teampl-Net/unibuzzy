<template>
<div id="alimWrap" ref="testBox" style="overflow: scroll;" :style="'background-image: url(' + chanItem.bgPathMtext + ')'" class="chanDetailWrap">
  <!-- <div>{{pushKey}}</div> -->

  <div id="summaryWrap" v-if="this.detailShowYn === false" class="summaryWrap" >
    <div id="chanInfoSummary" ref="chanImg"  class="mt-header chanWhiteBox">
      <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'">
        <p id="chanCnt" class="font16">구독자 {{chanItem.followerCount}}명 | 누적 알림발송 {{chanItem.totalContentsCount}}건 | 받은 알림 {{myContentsCount}}건</p>
        <p class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</p>
      </div>
      <div style="width: 110px; height: 110px; background: rgb(255 255 255 / 50%); display: flex; align-items: center; justify-content: center; position: relative; border-radius: 110px; border: 4px solid #ccc; ">
        <img id="chanImg" :src="chanItem.logoPathMtext" style="width: 80px;" alt="채널사진">
        <!-- <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="chanItem.officialYn" style="position: absolute; width:30px; top:-1rem" alt=""> -->
        <div style="padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">

          <p class="fl fontBold font16 commonBlack">{{followTypeText}}</p>
          <p class="fl commonBlack" style="line-height: 24px;" v-if="memberYn">(멤버)</p>
          <!-- <p class="fl" v-if="chanItem.userTeamInfo.managerKey">(매니저)</p> -->
          <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="chanItem.officialYn" style="position: absolute; width:30px; bottom:-1rem; left: 50%; transform: translateX(-50%);" alt="">
        </div>

      </div>
      <!-- <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" class="mtop-15">
        <p class="font13 ">#라이프스타일</p>
      </div> -->

    </div>
    <div id="chanInfoSummary2" ref="chanImg2" style="">
      <span class="font20 fontBold mtop-05">{{changeText(chanItem.nameMtext)}}</span>
      <!-- <span class="font13 mbottom-05 fl">#라이프스타일</span> -->
    </div>
    <!-- <div style="width: 100%; height: 320px;float: left;">
      <div id="summaryWrap2" class="summaryWrap2">
        <div id="chanInfoSummary2" ref="chanImg"  class="mt-header ">
          <span class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</span>
          <span class="font13 mbottom-05 fl">#라이프스타일</span>
        </div>
      </div>
    </div> -->
    <div id="chanInfoArea" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float: right; position: absolute; bottom: 1rem; right: 1rem;">
      <p class="font14 fontBold" @click="openPop" style="">채널정보 ></p>
    </div>
  </div>
  <div v-if="this.detailShowYn === false" class="channelItemBox " id="channelItemBox"  style="padding: 0px 1.5rem; margin-top: 350px; ">
    <pushList :chanAlimTargetType="this.chanDetail.targetType" :reloadShowYn="this.reloadShowYn" ref="ChanAlimListPushListCompo" :alimListYn="true" @openPop="openPushDetailPop" style="" :chanDetailKey="this.chanDetail.targetKey" @numberOfElements='numberOfElements' />
  </div>
  <div class="btnPlus" v-show="adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div>
  <!-- <div class="btnPlus" v-if="adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div> -->
  <div v-if="detailShowYn" >
    <!-- <popHeader  :bgblack="true" v-if="detailHeaderShowYn" style="background: transparent;" :headerTitle="changeText(chanItem.nameMtext)" @closeXPop="this.closeDetailPop" :thisPopN="this.thisPopN" class="commonPopHeader chanDetailPopHeader"/> -->
    <chanDetailComp @closeXPop="this.closeDetailPop" @changeMemberYn='changeMemberYn' :parentMemberYn="memberYn" :adminYn="adminYn" :alimSubPopYn="alimListToDetail" @pageReload="this.$emit('pageReload', true)" @openPop="openPushDetailPop" @closeDetailPop="this.closeDetailPop" @changeFollowYn="changeFollowYn" :chanDetail="this.chanItem" style="background-color: #fff;"></chanDetailComp>
  </div>
  <gConfirmPop :confirmText='errorBoxText' :confirmType='errorBoxType' @no='errorBoxYn = false' @ok='saveMember' v-if="errorBoxYn"/>
  <div class="zoomInOutPop" style="position: fixed; width:100%; height:100%; z-index:9; left:0; top:0;" v-if="greetingInfoYn">
    <greetingInfo  v-if="greetingInfoYn" @closePop="greetingInfoYn = false" :chanInfo='chanItem' :type='greetingType' />
  </div>
<!-- <gConfirmPop confirmText='' confirmType='' @no='' /> -->
</div>
</template>

<script>
import chanDetailComp from './Tal_chanDetail.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import greetingInfo from '../channel/Tal_chanFollowInfo.vue'
export default {
  data () {
    return {
      greetingInfoYn: false,
      reloadShowYn: false,
      alimListToDetail: false,
      box: null,
      scrollDirection: null,
      scrollPosition: null,
      wrapKey: 0,
      followTypeText: '',
      followYn: false,
      detailHeaderShowYn: false,
      chanItem: {},
      memberText: '멤버 신청하기 >',
      errorBoxYn: false,
      errorBoxText: '',
      errorBoxType: 'two',
      adminYn: false,
      detailShowYn: true,
      memberYn: false,
      myContentsCount: null,
      greetingType: 'follow'

    }
  },
  watch: {
    wrapKey () {
      this.refreshList()
    }
  },
  props: {
    chanDetail: {}

  },
  components: {
    pushList,
    chanDetailComp,
    greetingInfo
  },
  async created () {
    console.log('this.chanDetail')
    console.log(this.chanDetail)

    this.$emit('openZLoading')
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    await this.getChanDetail(false)
    console.log('this.chanItem')
    console.log(this.chanItem)
    if (this.chanDetail.newChan === true) {
      this.greetingType = 'admin'
      this.greetingInfoYn = true
      /* // eslint-disable-next-line no-debugger
      debugger
      setTimeout(() => {
        this.greetingInfoYn = false
      }, 4000) */
    }
  },
  updated () {
    // eslint-disable-next-line no-unused-vars
    // var test = this.$refs.testBox
    this.box = document.getElementById('alimWrap') // 이 dom scroll 이벤트를 모니터링합니다
    // this.box = this.$refs.testBox
    this.box.addEventListener('scroll', this.updateScroll)
    this.box.addEventListener('mousewheel', e => {
      this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
    })
    localStorage.setItem('notiReloadPage', this.chanItem.teamKey)
  },
  mounted () {
    localStorage.setItem('notiReloadPage', this.chanItem.teamKey)
  },
  methods: {
    numberOfElements (num) {
      this.myContentsCount = num
    },
    changeMemberYn (data) {
      this.memberYn = data
    },
    closeDetailPop () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.detailShowYn = false
    },
    async refreshList () {
      // await this.$nextTick();
      await this.getChanDetail()
      await this.$refs.ChanAlimListPushListCompo.refreshList()
    },
    openWritePushPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetKey = this.chanItem.teamKey
      params.targetType = 'writePush'
      params.targetNameMtext = this.chanItem.nameMtext
      this.$emit('openPop', params)
    },
    async getChanDetail (addContentsListYn) {
      // this.memberYn = false
      // this.adminYn = false
      var paramMap = new Map()
      if (this.chanDetail.targetKey !== undefined && this.chanDetail.targetKey !== null && this.chanDetail.targetKey !== '') {
        paramMap.set('teamKey', this.chanDetail.targetKey)
      } else if (this.chanDetail.teamKey !== undefined && this.chanDetail.teamKey !== null && this.chanDetail.teamKey !== '') {
        paramMap.set('teamKey', this.chanDetail.teamKey)
      }
      if (addContentsListYn === true) {
        paramMap.set('addContentsListYn', true)
      }
      var resultList = await this.$getTeamList(paramMap)
      this.chanItem = resultList.data.content[0]

      if (this.chanItem) {
        this.chanItem.totalElements = resultList.data.totalElements
      }

      if (addContentsListYn !== undefined && addContentsListYn !== null && addContentsListYn !== true) {
        if (this.chanItem.userTeamInfo !== undefined && this.chanItem.userTeamInfo !== null && this.chanItem.userTeamInfo !== '') {
          if (this.chanItem.userTeamInfo.memberYn === 1) {
            this.memberYn = true
          }
          this.followYn = true
          this.detailShowYn = false
          this.followTypeText = '구독자'

          if (this.chanItem.userTeamInfo.managerKey !== undefined && this.chanItem.userTeamInfo.managerKey !== null && this.chanItem.userTeamInfo.managerKey !== '') {
            if (this.chanItem.userTeamInfo.ownerYn === true || this.chanItem.userTeamInfo.ownerYn === 'true') {
              this.followTypeText = '소유자'
            } else {
              this.followTypeText = '관리자'
            }
            this.adminYn = true
          }
        }
        var bgblackYn = true // chanItem.blackYn
        this.$emit('bgcolor', bgblackYn)
      }

      // if (resultList.content[0].creUserKey === JSON.parse(localStorage.getItem('sessionUser')).userKey) {
      //   this.adminYn = true
      // }
      this.$emit('closeZLoading')
    },
    openPushDetailPop (param) {
      if (param.targetType === 'pushDetail' || param.targetType === 'createChannel') {
        //  && param.targetKey !== this.chanDetail.teamKey
        param.openActivity = 'chanAlimList'
        this.$emit('openPop', param)
      }
    },
    async changeFollowYn (fYn) {
      this.$emit('openZLoading')
      this.detailShowYn = false
      this.detailHeaderShowYn = false
      await this.getChanDetail(false)
      this.$emit('closeZLoading')
      // this.detailShowYn = false

      this.greetingType = 'follow'
      this.greetingInfoYn = true
      /* setTimeout(() => {
        this.greetingInfoYn = false
      }, 4000) */
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) { return changeTxt }
      // if (changeTxt !== undefined) { return changeTxt }
    },
    openPop () {
      this.alimListToDetail = true
      this.detailShowYn = true
      this.detailHeaderShowYn = true
    },
    updateScroll () {
      var blockBox = document.getElementById('summaryWrap')
      if (this.box.scrollTop > this.scrollPosition) {
        this.scrollDirection = 'down'
      } else if (this.box.scrollTop < this.scrollPosition) {
        this.scrollDirection = 'up'
      }

      this.scrollPosition = this.box.scrollTop

      if (this.scrollDirection === 'down' && this.scrollPosition > 250) {
        blockBox.style.height = 50 + 'px'
        // blockBox.scrollHeight = 100
        document.getElementById('chanInfoSummary').classList.add('displayNIm')
        document.getElementById('chanInfoSummary2').classList.add('displayBIm')
        document.getElementById('chanInfoArea').classList.add('displayNIm')
        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 300) {
        document.getElementById('chanInfoSummary').classList.remove('displayNIm')
        document.getElementById('chanInfoArea').classList.remove('displayNIm')
        blockBox.style.height = '350px'
        this.box.style.height = ''
        document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
        document.getElementById('channelItemBox').classList.remove('channelItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          var msgDetail = JSON.parse(message.pushMessage)
          if (msgDetail.noti.data.targetKind === 'TEAM') {
            if (Number(msgDetail.noti.data.targetKey) === this.chanItem.teamKey) {
              this.getChanDetail(true)
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    }
  },
  computed: {
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    }
  }
}
</script>

<style scoped>

.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}

.chanDetailWrap{
  height: 100vh;
  background-size: cover;
}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanWhiteBox{ display: flex; flex-direction: column;align-items: center; position: relative; width: 100%;}
.channelItemBoxHeight{height: calc(100% - 50px)!important;}
/* .channelItemBox{background-color: #fff; min-height: calc(100% - 250px); position: relative; width: 100%;float: left; box-sizing: border-box;} */
.channelItemBox{background-color: #fff;  height: 700px; position: relative; width: 100%;float: left; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}

.summaryWrap{height: 350px; width: 100%; float: left; position: fixed;}
.summaryWrap2 {height: 50px;  width: 100%; float: left;}

.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
#chanInfoSummary2{width: 100%; padding-top: 0; height: 100%; display: none; flex-direction: column; float: left}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */

.btnPlus{
  width:4rem; height:4rem;
  color:#6768a7; border:0.2rem solid #6768a7; background-color:white ;
  z-index: 9;
  border-radius:50%; position:absolute; bottom: 5%; right: 10%;
  box-shadow: 2px 2px 7px 3px #ccc;
  }

  span {color: white;}
</style>
