<template>
<div id="alimWrap" ref="scrollBox" style="overflow: scroll;" :style="'background-image: url(' + chanItem.bgPathMtext + ')'" class="chanDetailWrap">
  <p class="font20 fontBold" :style="titleLongYn ? 'font-size: 14px !important;': '' " style="color:white; line-height: 50px; position:absolute; left: 50%; transform: translateX(-50%); display:flex;" :class="{officialTitle: chanItem.officialYn}" > <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="chanItem.officialYn" style="width:30px;" alt="" /> {{changeText(chanItem.nameMtext)}}</p>
  <!-- <div>{{pushKey}}</div> -->
  <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
  <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
  <welcomePopUp type="follow" v-if="openWelcomePopYn" :chanInfo="chanItem" @copyText="copyText" @goChanMain="openWelcomePopYn = false" @closePop="okMember" @applyMember="okMember" />
  <!-- <div id="summaryWrap" v-if="this.detailShowYn === false" class="summaryWrap mtop-05" style="padding: 0 1rem;" :style="followYn === false ? 'top: 50%; transform: translateY(-60%);' : '' " > -->
    <div id="summaryWrap" v-if="this.detailShowYn === false" class="summaryWrap mtop-05" style="padding: 0 1rem;" >
    <div id="chanInfoSummary" ref="chanImg"  class="mt-header chanWhiteBox ">
      <div class="chanImgRound"  > <!-- 채널 로고 부분 -->
        <img id="chanImg" :src="chanItem.logoPathMtext" style="width: 90%" alt="채널사진" />
        <!-- <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="chanItem.officialYn" style="position: absolute; width:30px; top:-1rem" alt=""> -->
      </div>
      <div class="chanTextBox fl mleft-05;" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; width:100%; margin-left: 0.5rem;">
        <div class="fl font16  w-100P">
          <!-- <div style="width:20px;" class="fl">
            <img class="fl" style="width:20px; margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘">
          </div> -->
          <p class="font15 textLeft fl">
            <img class="fl" style="width:20px; margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘">
            {{teamTypeText}}
          </p>
          </div>

        <div class="fl font15  w-100P " style="box-sizing:boborder-box; word-break:break-all; " >
          <!-- <div style="width:20px;" class="fl"> -->
            <!-- <img class="fl" style="width:20px; margin-top:2px; src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"> -->
          <!-- </div> -->
          <p class="font14 textLeft fl " style="word-break:break-all" >
            <img class="fl" style="width:20px; margin-top:2px; margin-right:1rem" src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘">
            {{this.$changeText(chanItem.memoMtext)}}
          </p>
        </div>

        <div class="fl font15  w-100P " style="box-sizing:boborder-box; word-break:break-all; " >

            <p class="font13 commonColor textLeft fl fontBold " style="color:#6768a7; white-space: nowrap;"> 개설일 </p>
            <!-- <img class="fl" style="width:20px; margin-top:2px;" src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"> -->
            <!-- <p class="font16 commonColor textLeft fl mleft-05" style="color:#6768a7"> 설명  </p> -->

          <p class="font14 textLeft fl mleft-1" style="word-break:break-all" >{{this.$changeDateFormat(chanItem.creDate)}}</p>
          </div>

      </div>
    </div>
    <div id="ownerChannelEditArea" class="w-100P cursorP fl" v-if="ownerYn">
      <div class="fr " @click="editChan" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float:right !important; margin:0 !important;">
        <p class="font16 textLeft lightGray fr "  >편집 > </p>
      </div>
    </div>

    <div id="channelCardWrap" class="fl w-100P " :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; flex-direction: row; justify-content:space-around">
      <p class="font16 fl w-100P">구독자 {{chanItem.followerCount}}명</p>

      <p class="font16 fl w-100P" style="border-left: 2px solid #00000050">누적 알림 {{chanItem.totalContentsCount}}건</p>
      <!-- <p class="font16 fl w-100P" style="border-left: 2px solid #00000050">개설일 {{this.$changeDateFormat(chanItem.creDate)}}</p> -->
    </div>

    <div id="userCardWrap" class="fl w-100P" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="padding:0.5rem 1rem; flex-direction: row; justify-content: space-between;">

        <div v-if="followYn" class="fl" style="display: flex; align-items: center;">
          <div style="width:30px; height:30px; border-radius: 100%; border:1.5px solid #6768a7; background: #6768a745; overflow: hidden;">
            <img :src="currentUserInfo.userProfileImg" style="width: 30px;" class="fl "/>
          </div>
          <div class="mleft-05" style="display:flex; flex-direction: column;">
            <p class="font16">{{this.$changeText(currentUserInfo.userDispMtext)}}</p>
            <div>
              <p class="fl font14 commonBlack">{{followTypeText}}</p>
              <p class="fl commonBlack font14 cursorP" v-if="memberYn">(공개)</p>
            </div>
          </div>
          <!-- <p class="fl commonBlack font16">{{userGrade}}</p> -->
        </div>
        <div v-if="followYn" class="fl" style="display: flex; width: 40%; justify-content: space-around; align-items: center;">
          <div style="padding: 3px 10px; border-radius: 10px; border: 1px solid #ccc;" :style="memberYn ? 'background-color:#6768a7' : 'background-color:#eee' " >
            <p class="fl font14 cursorP fontBold"  @click="saveMemberButton" :style="memberYn ? 'color:white' : '' " >공개</p>
            <!-- <p class="fl font14 fontBold"  @click="saveMemberButton" :style="memberYn ? 'color:white' : '' " >내정보공개</p> -->
          </div>
          <img style="width:20px;" class="cursorP" @click="changeRecvAlimYn" v-if="recvAlimYn" src="../../../assets/images/common/icon_bell_fillin.svg" alt="">
          <img style="width:20px;" class="cursorP" @click="changeRecvAlimYn" v-else src="../../../assets/images/common/icon_bell.svg" alt="">

          <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
              :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com:9443?chanDetail=' + this.chanItem.teamKey
                + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                class="copyTextIcon cursorP">
            <img style="width:20px;" src="../../../assets/images/common/icon_share_square.svg" alt="">
          </div>
        </div>

        <div v-if="followYn === false" @click="changeFollowYn" class="w-100P fl" style="min-height:100px;display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <!-- <p class="font20 fontBold">구독하기</p> -->
          <p class="fl w-100P font16 fontBold textLeft"> [ {{changeText(chanItem.nameMtext)}} ] 채널을 구독하고 알림을 받아보세요!</p>
          <gBtnSmall @click="changeFollowYn" class="fl w-100P mtop-1 fontBold" btnTitle="구독하기" />
        </div>

    </div>

    <div id="followerCancelArea" v-if="followYn && !adminYn" class="fr" style="padding: 5px 10px; border-radius: 10px; border: 1px solid #ccc;" :style="followYn ? 'background-color:#DC143C' : 'background-color:#eee' " >
      <p v-if="chanItem.teamKey !== 377" @click="changeFollowYn" class="fl font14 fontBold" :style="followYn ? 'color:white' : '' " >구독취소</p>
    </div>
    <!-- <div style="width: fit-content; height: 24px; padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">
        <p class="fl fontBold font16 commonBlack">{{followTypeText}}</p>
        <p class="fl commonBlack font16" v-if="memberYn">(멤버)</p>
      </div> -->

    <!-- <div id="memberInfoArea" class="chanTextBox" :class="chanBgBlackYn === true ? 'blackTextBox': 'whiteTextBox'" style="height: 30px; float: right; position: absolute; bottom: 3rem; right: 1rem;" >
      <p class="fl font14 fontBold" @click="saveMemberButton" style="">멤버 신청하기 ></p>
    </div>
    <div id="chanInfoArea" class="chanTextBox" :class="chanBgBlackYn === true ? 'blackTextBox': 'whiteTextBox'" style="height: 30px; float: right; position: absolute; top: 19rem; right: 1rem;">
      <p class="fl font14 fontBold" @click="openPop" style="">채널 정보 ></p>
    </div> -->

    <!-- <p class="fl font14 fontBold" @click="openPop" style="">채널 정보 ></p> -->
  </div>
  <!-- <div v-if="this.detailShowYn === false " class="channelItemBox " id="channelItemBox"  style="padding: 1.5rem 1.5rem 0 1.5rem; margin-top: 350px; overflow: hidden;"> -->
  <div v-if="followYn" class="channelItemBox" ref="channelItemBoxPushListDivCompo" id="channelItemBox"  style="padding: 1.5rem 1.5rem 0 1.5rem; margin-top: 350px; overflow: hidden;">
    <pushList :targetContentsKey="chanDetail.targetContentsKey" :chanAlimTargetType="this.chanDetail.targetType" :reloadShowYn="this.reloadShowYn" ref="ChanAlimListPushListCompo" :alimListYn="true" @openPop="openPushDetailPop" style="" :chanDetailKey="this.chanDetail.targetKey" @numberOfElements='numberOfElements' @targetContentScrollMove='targetContentScrollMove' />
    <!-- <div v-else style="">
      <p>구독하고 알림을 받아보세요!</p>
    </div> -->
  </div>
  <div class="btnPlus" v-show="adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div>
  <!-- <div class="btnPlus" v-if="adminYn" @click="openWritePushPop" ><p style="font-size:40px;">+</p></div> -->
  <div v-if="detailShowYn" >
    <chanDetailComp ref="chanDetailRef" @openLoading="this.$emit('openLoading')" @closeLoading="this.$emit('closeLoading')" @closeXPop="this.closeDetailPop" @changeMemberYn='changeMemberYn' :parentMemberYn="memberYn" :adminYn="adminYn" :alimSubPopYn="alimListToDetail" @pageReload="this.$emit('pageReload', true)" @openPop="openPushDetailPop" @closeDetailPop="this.closeDetailPop" @changeFollowYn="changeFollowYn" :chanDetail="this.chanItem" style="background-color: #fff;"></chanDetailComp>
  </div>
  <gConfirmPop :confirmText='errorBoxText' :confirmType='errorBoxType' @no='errorBoxYn = false'  v-if="errorBoxYn"/>
  <div v-if="writePushYn" style="position: absolute; width:100%; height:100%; top:0; left:0;z-index:999">
    <writePush  ref="chanAlimListWritePushRefs" @closeXPop='closeWritePushPop' :params="writePushData" style="position: absolute; width:100%; height:100%; top:0; left:0;"  @openPop='openItem' />
  </div>

  <!-- <writePush ref="writePushCompo" v-if="this.targetType === 'writePush'" :params="this.params" @closeXPop="closeXPop" @openPop='openPop' @changePop='changePop' /> -->
  <!-- <gConfirmPop :confirmText='errorMsg' :confirmType='errorBoxType ? "two" : "timeout" ' v-if="errorPopYn" @no='errorPopYn = false'  /> -->
<!-- <gConfirmPop confirmText='' confirmType='' @no='' /> -->

</div>
</template>

<script>
// import a from '../../../assets/images/'
import chanDetailComp from './Tal_chanDetail.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
import welcomePopUp from '../channel/Tal_chanFollowInfo.vue'
import writePush from '../../../pages/routerPages/admPages/TalAdm_writePush.vue'
export default {
  data () {
    return {
      smallPopYn: false,
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
      memberText: '공개 신청하기 >',
      errorBoxYn: false,
      errorBoxText: '',
      errorBoxType: 'two',
      adminYn: false,
      // detailShowYn: true,
      detailShowYn: false,
      memberYn: false,
      myContentsCount: null,
      greetingType: 'follow',
      teamTypeText: '기타',
      currentUserInfo: '',
      userGrade: '',
      recvAlimYn: true,
      admYn: false,
      sendLoadingYn: false,
      followParam: null,
      openWelcomePopYn: false,
      ownerYn: false,
      writePushData: {},
      writePushYn: false,
      writePopId: '',
      titleLongYn: false
      // errorPopYn: false
    }
  },
  props: {
    chanDetail: {}
  },
  components: {
    pushList,
    chanDetailComp,
    welcomePopUp,
    writePush
  },
  created () {
    this.currentUserInfo = JSON.parse(localStorage.getItem('sessionUser'))
    // console.log('this.chanDetail')
    this.$emit('openLoading')
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    this.readyFunction()
  },
  updated () {
    // eslint-disable-next-line no-unused-vars
    // var test = this.$refs.scrollBox
    this.box = document.getElementById('alimWrap') // 이 dom scroll 이벤트를 모니터링합니다
    // this.box = this.$refs.scrollBox
    this.box.addEventListener('scroll', this.updateScroll)
    this.box.addEventListener('mousewheel', e => {
      this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
    })
    localStorage.setItem('notiReloadPage', this.chanItem.teamKey)
    // window.resizeTo(this.screenInnerWidth, this.screenInnerHeight)
  },
  mounted () {
    localStorage.setItem('notiReloadPage', this.chanItem.teamKey)
    // var screenSize = document.querySelector('#textMsgBoxPush')
    // eslint-disable-next-line no-debugger
    // debugger
    // screenSize.addEventListener('click', () => {
    //   window.resizeTo(this.screenInnerWidth, this.screenInnerHeight)
    // })
  },
  methods: {
    async readyFunction () {
      await this.getChanDetail(false)
      // console.log(this.chanItem.userTeamInfo.followerKey)
      console.log('this.chanDetail')
      console.log(this.chanDetail)
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
      console.log(this.chanItem)
      this.settingTeamType(this.chanItem.teamType)

      if (this.chanItem) {
        await this.setGrade()
        if (this.chanItem.userTeamInfo) {
          if (this.chanItem.userTeamInfo.ownerYn) {
            this.admYn = true
          }
          if (this.chanItem.userTeamInfo.notiYn === false || Number(this.chanItem.userTeamInfo.notiYn) === 0) {
            this.recvAlimYn = false
            console.log('notiYn설정완료')
          }
          var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
          this.ownerYn = (userKey === this.chanItem.creUserKey)
        }
      }

      if (this.chanItem.userTeamInfo === null) {
        this.followYn = false
      }
      this.$emit('closeLoading')
    },
    targetContentScrollMove (wich) {
      if (this.chanDetail.targetContentsKey) {
        const unit = this.$refs.scrollBox
        unit.scrollTo({ top: 500, behavior: 'smooth' })
        var blockBox = document.getElementById('summaryWrap')
        blockBox.style.height = 50 + 'px'
        document.getElementById('chanInfoSummary').classList.add('displayNIm')
        if (this.followYn && !this.adminYn) document.getElementById('followerCancelArea').classList.add('displayNIm')
        if (this.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')
        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')
        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
        this.reloadShowYn = false
      }
    },
    setSelectedList (data) {
      this.$refs.chanAlimListWritePushRefs.setSelectedList(data)
    },
    openItem (param) {
      this.$emit('openPop', param)
    },
    editChan () {
      var param = {}
      param.targetType = 'createChannel'
      param.targetKey = this.chanItem.teamKey
      param.modiYn = true
      param.ownerYn = (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.chanItem.creUserKey)
      this.$emit('openPop', param)
    },
    async okMember (inMemberYn) {
      var result = null
      if (inMemberYn) {
        this.followParam.memberYn = inMemberYn
        this.$emit('openLoading')
        result = await this.$changeFollower({ follower: this.followParam, doType: 'FM' }, 'save')
        this.$emit('closeLoading')
      } else {
        this.$emit('openLoading')
        result = await this.$changeFollower({ follower: this.followParam, doType: 'FL' }, 'save')
        this.$emit('closeLoading')
      }
      // console.log(result)
      if (result.result || result) {
        this.sendLoadingYn = false
        if (result.message === 'OK') {
          this.openWelcomePopYn = false
          this.followYn = true
          this.$emit('changeFollowYn', this.followYn)
        } else {
          this.errorMsg = result.message
          this.errorPopYn = true
        }
      } else {
        this.sendLoadingYn = false
        this.errorMsg = '실패했습니다. 관리자에게 문의해주세요'
        this.errorPopYn = true
      }

      this.followYn = true
    },
    async changeFollowYn () {
      if (this.admYn === true) {
        this.errorBoxText = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
        this.errorBoxYn = true
      } else {
        var fStatus = this.followYn
        // eslint-disable-next-line no-new-object
        this.followParam = new Object()
        this.followParam.teamKey = this.chanItem.teamKey
        this.followParam.teamName = this.$changeText(this.chanItem.nameMtext)
        this.followParam.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        this.followParam.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
        console.log(this.followParam)
        var result = false
        this.sendLoadingYn = true
        if (fStatus) {
          console.log(this.followParam)
          result = await this.$changeFollower({ follower: this.followParam, doType: 'FL' }, 'del')
          this.followYn = false
          console.log(result)

          if (result.result || result) {
            this.sendLoadingYn = false
            this.$emit('pageReload')
          } else {
            this.sendLoadingYn = false
            this.errorBoxText = '실패했습니다. 관리자에게 문의해주세요'
            this.errorBoxType = 'timeover'
            this.errorBoxYn = true
          }
        } else {
          this.sendLoadingYn = false
          this.openWelcomePopYn = true
        }
      }
    },
    setGrade () {
      if (this.chanItem.userTeamInfo) {
        if (this.chanItem.userTeamInfo.memberYn) {
          this.userGrade = '(공개)'
        }
        if (this.chanItem.userTeamInfo.managerKey) {
          this.userGrade = '(매니저)'
        }
        if (this.chanItem.userTeamInfo.ownerYn) {
          this.userGrade = '(관리자)'
        }
      }
    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#copyTextBody')
      var _this = this
      clip.on('success', function (e) {
        _this.errorBoxText = '채널링크가 복사되었습니다!'
        _this.errorBoxType = 'timeout'
        _this.errorBoxYn = true
      })
    },
    changeRecvAlimYn () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.chanItem.userTeamInfo.followerKey
      if (this.recvAlimYn === true) {
        param.notiYn = false
        this.recvAlimYn = false
      } else {
        param.notiYn = true
        this.recvAlimYn = true
      }
      this.$changeRecvAlimYn({ follower: param })
    },
    settingTeamType (teamType) {
      if (teamType === 'C') { this.teamTypeText = '기업' } else if (teamType === 'G') { this.teamTypeText = '정부' } else if (teamType === 'S') { this.teamTypeText = '학교' } else if (teamType === 'H') { this.teamTypeText = '종교' } else if (teamType === 'D') { this.teamTypeText = '동호회' } else if (teamType === 'Q') { this.teamTypeText = '병원' } else if (teamType === 'V') { this.teamTypeText = '약국' } else if (teamType === 'P') { this.teamTypeText = '식당' } else if (teamType === 'A') { this.teamTypeText = '매장' } else if (teamType === 'E') { this.teamTypeText = '기타' } else { this.teamTypeText = '기타' }
    },
    async saveMemberButton () {
      this.smallPopYn = true
      if (this.memberYn || this.memberYn === 1) {
        this.confirmMsg = '내 정보 공개가 취소 완료되었습니다.'
        this.addSmallMsg = '(언제든 다시 ' + this.$changeText(this.chanItem.nameMtext) + ' 의 정보 공개를 할 수 있습니다.)'
      } else {
        this.confirmMsg = '내 정보 공개가 완료되었습니다.'
        this.addSmallMsg = '(관리자는 당신의 프로필 정보를 조회할 수 있습니다.)'
      }
      var params = null
      var param = {}
      param.followerKey = this.chanItem.userTeamInfo.followerKey
      param.teamKey = this.chanItem.teamKey
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext) || this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.memberYn = true
      param.teamName = this.$changeText(this.chanItem.nameMtext)
      if (this.memberYn || this.memberYn === 1) {
        param.memberYn = false
        params = { follower: param }
      } else {
        params = { follower: param, doType: 'ME' }
      }

      var result = await this.$commonAxiosFunction({
        url: '/tp.saveFollower',
        param: params
      })
      if (result.data.result === true) {
        if (this.memberYn || this.memberYn === 1) {
          this.memberYn = false
        } else {
          this.memberYn = true
        }
      }
      this.openWelcomePopYn = false
      this.setGrade()
    },
    // async saveMemberButton () {
    //   var followParam = {}
    //   var result = null
    //   followParam.teamKey = this.chanItem.teamKey
    //   followParam.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    //   followParam.followerKey = this.chanItem.userTeamInfo.followerKey
    //   followParam.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)

    //   if (this.memberYn) {
    //     // 멤버 취소
    //     followParam.memberYn = false
    //     result = await this.$changeFollower({ follower: followParam, doType: 'FL' }, 'save')
    //     this.memberYn = false
    //   } else {
    //     // 멤버 신청
    //     followParam.memberYn = true
    //     result = await this.$changeFollower({ follower: followParam, doType: 'FM' }, 'save')
    //     this.memberYn = true
    //   }
    // },
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
      setTimeout(() => {
        this.$emit('closeLoading')
      }, 500)
    },
    openWritePushPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetKey = this.chanItem.teamKey
      params.targetType = 'writePush'
      params.targetNameMtext = this.chanItem.nameMtext
      this.writePushData = {}
      this.writePushData = params

      var history = this.$store.getters.hStack
      this.writePopId = 'writePush' + history.length
      history.push(this.writePopId)
      this.$store.commit('updateStack', history)
      this.writePushYn = true
      // this.$emit('openPop', params)
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
      console.log(resultList)
      // if (resultList.data) { this.chanItem = resultList.data.content[0] }
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
              this.ownerYn = true
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
      // this.$emit('closeLoading')
    },
    openPushDetailPop (param) {
      if (param.targetType === 'pushDetail' || param.targetType === 'createChannel') {
        //  && param.targetKey !== this.chanDetail.teamKey
        param.openActivity = 'chanAlimList'
        this.$emit('openPop', param)
      }
    },
    // async changeFollowYn (fYn) {
    //   this.$emit('openLoading')
    //   this.detailShowYn = false
    //   this.detailHeaderShowYn = false
    //   await this.getChanDetail(false)
    //   this.$emit('closeLoading')
    // },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) {
        if (changeTxt.length > 12) { this.titleLongYn = true }
        return changeTxt
      }
    },
    backClick () {
      var hStack = this.$store.getters.hStack
      if (this.writePopId === hStack[hStack.length - 1]) {
        this.closeWritePushPop()
      }
    },
    async closeWritePushPop () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      await this.refreshList()
      this.writePushYn = false
    },
    openPop () {
      this.alimListToDetail = true
      // thiopenPop.detailShowYn = true
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
        // document.getElementById('chanInfoSummary2').classList.add('displayBIm')
        // document.getElementById('chanInfoArea').classList.add('displayNIm')
        // document.getElementById('memberInfoArea').classList.add('displayNIm')
        if (this.followYn && !this.adminYn) document.getElementById('followerCancelArea').classList.add('displayNIm')

        if (this.ownerYn) document.getElementById('ownerChannelEditArea').classList.add('displayNIm')

        document.getElementById('channelCardWrap').classList.add('displayNIm')
        document.getElementById('userCardWrap').classList.add('displayNIm')

        document.getElementById('channelItemBox').classList.add('channelItemBoxHeight')
        this.reloadShowYn = true
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 300) {
        document.getElementById('chanInfoSummary').classList.remove('displayNIm')
        // document.getElementById('chanInfoArea').classList.remove('displayNIm')
        // document.getElementById('memberInfoArea').classList.remove('displayNIm')
        if (this.followYn && !this.adminYn) document.getElementById('followerCancelArea').classList.remove('displayNIm')

        if (this.ownerYn) document.getElementById('ownerChannelEditArea').classList.remove('displayNIm')

        document.getElementById('channelCardWrap').classList.remove('displayNIm')
        document.getElementById('userCardWrap').classList.remove('displayNIm')

        blockBox.style.height = '350px'
        this.box.style.height = ''
        // document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
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
          if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
            this.systemName = localStorage.getItem('systemName')
          }
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          if (this.notiDetail.targetKind === 'TEAM') {
            if (Number(this.notiDetail.targetKey) === this.chanItem.teamKey) {
              this.getChanDetail(true)
            }
          }
        } else if (message.type === 'pushBar') {
          if (this.notiDetail.targetKind === 'TEAM') {
            if (Number(this.notiDetail.targetKey) === this.chanItem.teamKey) {
              this.getChanDetail(true)
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    }
    /*
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
    } */
  },
  computed: {
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
    },
    historyStack () {
      return this.$store.getters.hRPage
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
            this.closeSubPop()
        } */
    },
    historyStack (value, old) {
    },
    wrapKey () {
      this.refreshList()
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
.officialTitle{
  padding-right: 30px;
}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
/* .chanWhiteBox{ display: flex; flex-direction: column;align-items: center; position: relative; width: 100%; height: calc(100% - 50px); } */
.chanWhiteBox{ display: flex; flex-direction: row;align-items: flex-start; justify-content: center; position: relative; width: 100%; align-items: center; align-content: center; }
.channelItemBoxHeight{height: calc(100% - 50px)!important; position: relative; float: left; width: 100%; padding-top: 140px; overflow: hidden scroll; }
/* .channelItemBox{background-color: #fff; min-height: calc(100% - 250px); position: relative; width: 100%;float: left; box-sizing: border-box;} */
.channelItemBox{background-color: #fff; min-height: calc(100% - 50px); position: relative; width: 100%;float: left; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}

.summaryWrap{height: 350px; width: 100%; float: left; position: absolute;}
.summaryWrap2 {height: 50px;  width: 100%; float: left;}

.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
.chanImgRound{ width: 80px; height: 80px;
  background: rgb(255 255 255 / 50%); display: flex; align-items: center; justify-content: center; position: relative;
  border-radius: 110px;
  border-radius: 100%;
  border: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;  }
#chanInfoSummary2{width: 100%; padding-top: 0; height: 100%;
/* display: none;  */
flex-direction: column; float: left}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */

/* btnPlus common.css로 옮김 */

  span {color: white;}
</style>
