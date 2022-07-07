<template>
<div class="chanDetailWrap" :style="'background-image: url(' + chanDetail.bgPathMtext + ')'" :class="{zindex1000:alimSubPopYn === true }">
  <gConfirmPop :confirmText='errorMsg' :confirmType='errorBoxType ? "two" : "timeout" ' v-if="errorPopYn" @no='errorPopYn = false'  />
  <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
  <!-- <div>{{pushKey}}</div> -->
  <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
  <div class="channelItemBox">
    <div style="width: 100%; height: 100%; position: relative;">
      <!-- <popHeader v-if="alimSubPopYn === true" :bgblack="true" style="background: white;" :headerTitle="changeText(chanDetail.nameMtext)" @closeXPop="this.closeDetailPop" :thisPopN="this.thisPopN" class="commonPopHeader chanDetailPopHeader"/> -->
      <popHeader v-if="alimSubPopYn === true" :chanAlimListTeamKey='null' :bgblack="true" style="background: transparent; " :headerTitle="this.$changeText(chanDetail.nameMtext)" @closeXPop="this.$emit('closeXPop')" class="commonPopHeader chanDetailPopHeader"/>
      <div ref="chanImg"  class="mt-header chanWhiteBox">
        <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'">
          <p class="font16">구독자 {{chanDetail.followerCount}}명| 알림발송 {{chanDetail.totalContentsCount}}건</p>
          <p class="font22 fontBold">{{this.$changeText(chanDetail.nameMtext)}}</p>
        </div>
        <div v-if="adminYn" style="width: 100%; position: absolute; top: 70px;padding: 0 20px; margin-top: 0.8rem; ">
          <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float: right; margin-bottom: 0px;">
            <p class="font14 fontBold" @click="editChan" style="">채널 편집 ></p>
          </div>
        </div>
        <!-- <div @click="sendkakao" style="width: 100%;  position: absolute; top: 70px;padding: 0 20px; margin-top: 0.8rem; ">
          <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float: right; margin-bottom: 0px;">
            <p class="font14 fontBold" style="">공유하기 ></p>
          </div>
        </div> -->

        <!-- <gBtnSmall  @click="sendkakao" class="plusMarginBtn" style="float: right;" btnTitle="공유하기" />
        --><!-- <div style="position: absolute; top:90px; right:50px"><gBtnSmall  :btnTitle='editBtnTitle' @click="editChannelClick"/></div> -->

        <div style="width: 185px; height: 185px; min-width: 180px; min-height: 180px; position: relative; border-radius: 185px; display: flex; align-items: center; justify-content: center; border: 5px solid #ccc; background: rgb(255 255 255 / 50%);">
          <img :src="chanDetail.logoPathMtext" style="width: 155px;  margin-right: 5px;" alt="채널사진">
          <!-- <div style="padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">{{followTypeText}}</div> -->
        </div>
        <div v-if="followYn === true && admYn === false" class="mtop-05">
          <gBtnSmall @click="saveMember" class="fl" :btnTitle="memberYn? '멤버취소': '멤버신청'"/>
          <gBtnSmall @click="changeRecvAlimYn" class="fl mright-03" :btnTitle="recvAlimYn === true? '알림취소': '알림받기'" />
          <gBtnSmall @click="changeFollowYn" class="fl mright-03" btnTitle="구독취소" />
        </div>
        <div v-else-if="followYn === false" class="mtop-05"><gBtnSmall @click="changeFollowYn" class="fl mright-03" btnTitle="구독하기" /></div>

        <!-- <gBtnSmall @click="openPop" btnThema="light" class="fl mtop-05" style="border: 1px solid #A9AACD;" btnTitle="알림목록 바로가기" /> -->
        <table class="mtop-3" >
          <colgroup><col width="10%"><col width="90%"></colgroup>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"></td>
            <td v-html="this.$changeText(chanDetail.memoMtext)"></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_2.png" alt="발행일 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 발행일 </div><div class="w-80P fl textLeft"> {{this.$changeDateFormat(chanDetail.creDate)}}</div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 산업군 </div><div class="w-80P fl textLeft"> {{teamTypeText}}<!-- <span class="fl mr-04">{{chanDetail.followerCount}}명</span><gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="공유하기" /> --></div></td>
          </tr>
          <!-- <tr style="border: none;">
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 발행자 </div><div class="w-80P fl textLeft"> {{this.$changeText(chanDetail.nameMtext)}} </div></td>
          </tr> -->
          <tr style="border: none;">
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
            <td>
              <div class="w-20P fl textLeft commonColor fontBold" @click="kakaoLink" > 공유 </div>
              <div class="w-80P fl textLeft">
                <!-- <input type="text" style="width: 0px; height: 0px; border: none;" id="copyTextBody" name="" :value="'https://thealim.page.link/?link=http://mo.d-alim.com:18080?chanDetail=' + this.chanDetail.teamKey + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"> -->
                <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="float: right; margin-right: 5px; width: 27px;" alt="카카오톡 공유하기">
                <!-- <gBtnSmall data-clipboard-action="copy" data-clipboard-target="#copyTextBody" @click="copyText" class="copyTextBtn" style="float: right;" btnTitle="클립보드" /> -->
              </div>
              </td>
          </tr>
          <!-- <tr>
            <td colspan="2"><div v-for="(value,index) in chanKeywordList" :key="index" style="padding: 0 10px; float: left; background:#6768A7; color: #FFF; border-radius: 10px;" class="fl mr-04" >#{{value}}</div>
            </td>
          </tr> -->
        </table>
      </div>
    </div>
  </div>
  <!-- <div style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #fff; z-index: 99999999;">
    <followerList/>
  </div> -->
</div>

</template>

<script>
/* eslint-disable */
/* import followerList from './Tal_chanFollowerList.vue' */
export default {
  /* metaInfo: {
    // title 입력하기
    title: '페이지 타이틀',
    // link tag 입력하기
    link: [{ rel: 'canonical', href: 'http://192.168.0.22:8080?chanDetail=1001245' }],
    // meta tag 입력하기
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { vmid: 'description', name: 'description', content: 'description' }
      // vmid ↑ 메타 태그를 고유하게 만들어준다.
    ]
  }, */
  mounted () {
    console.log('this.chanDetail');
    console.log(this.chanDetail);
    // this.$refs.chanImg.style.setProperty('--halfWidth', (window.innerWidth - 185) / 2 + 'px')
  },
  data () {
    return {
      smallPopYn: false,
      addSmallMsg: '',
      confirmMsg: '',
      errorPopYn: false,
      chanBgBlackYn: false,
      admYn: false,
      recvAlimYn: true,
      chanKeywordList: ['소셜미디어', '구독형 알림'],
      followYn: false,
      errorMsg: '',
      followTypeText: '',
      teamTypeText: '',
      sendLoadingYn: false,
      errorBoxType: false,
      memberYn: false
    }
  },
  props: {
    chanDetail: {},
    parentMemberYn: {},
    alimSubPopYn: {} // 구독자일 경우, 채널메인을통해 open되는 풀팝업,
  },
  components: {
    /* followerList */
  },
  computed: {
    historyStack () {
      return this.$store.getters.hStack
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
    /*
    historyStack () {
      return this.$store.getters.hRPage
    } */
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters.hStack
      if (this.alimSubPopYn) {
        if ('channelAlimToDetail' + this.chanDetail.teamKey === hStack[hStack.length - 1]) {
          this.$emit('closeDetailPop')
        }
      }
    },
    historyStack (value, old) {
    }
  },
  async created () {
    if(this.parentMemberYn) {
      this.memberYn = this.parentMemberYn
    }
    if (this.alimSubPopYn) {
      var history = this.$store.getters.hStack
      history.push('channelAlimToDetail' + this.chanDetail.teamKey)
      this.$store.commit('updateStack', history)
    }

    if (this.chanDetail.userTeamInfo !== undefined && this.chanDetail.userTeamInfo != null && this.chanDetail.userTeamInfo !== '') {
      this.followYn = true
      this.followTypeText = '구독자'

      if (this.chanDetail.userTeamInfo.managerKey !== undefined && this.chanDetail.userTeamInfo.managerKey !== null && this.chanDetail.userTeamInfo.managerKey !== '') {
        this.adminYn = true
        if (this.chanDetail.userTeamInfo.ownerYn === true || this.chanDetail.userTeamInfo.ownerYn === 'true') {
          this.followTypeText = '소유자'
        } else {
          this.followTypeText = '관리자'
        }
      }
      if (this.chanDetail.userTeamInfo.notiYn === false || this.chanDetail.userTeamInfo.notiYn === 0) {
        this.recvAlimYn = false
      }
    }
    this.settingTeamType(this.chanDetail.teamType)
  },
  methods: {
    copyText () {
      var clipboard = new Clipboard('.copyTextBtn')
      clipboard.on('success', function(e) {
        alert('성공!')
      })
    },
    // memberClick() {
    //   if (this.memberYn) {
    //     this.saveMember()
    //   } else {
    //     this.errorMsg = '멤버의 경우, 관리자에 한해<br>프로필 정보를 조회할 수 있습니다.'
    //     this.errorBoxType = false
    //     this.errorPopYn = true
    //   }
    // },
    // memberClick () {
    //   console.log(this.chanDetail)
    //   this.errorMsg = '[' + this.$changeText(this.chanDetail.nameMtext) + '] 채널의 멤버로 신청하시겠습니까?'
    //   this.errorBoxType = true
    //   this.errorPopYn = true
    // },
    async saveMember() {
      this.smallPopYn = true
      this.confirmMsg = '멤버 신청이 완료되었습니다.'
      this.addSmallMsg = '(관리자는 멤버의 프로필 정보를 조회할 수 있습니다.)'
      var param = {}
      param.followerKey = this.chanDetail.userTeamInfo.followerKey
      param.teamKey = this.chanDetail.teamKey
      param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.memberYn = true

      if (this.memberYn) {
        param.memberYn = false
      }
      console.log(param)
      var result = await this.$commonAxiosFunction({
        url: '/api/api/tp.saveFollower',
        param: param
      })
      console.log(result)
      if (result.data.result === true) {
      this.memberYn = param.memberYn
      // param = {}
      this.$emit('changeMemberYn', this.memberYn)
      }

    },
    editChan () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'createChannel'
      param.targetKey = this.chanDetail.teamKey
      param.modiYn = true
      param.ownerYn = (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.chanDetail.creUserKey)
      this.$emit('openPop', param)
    },
    settingTeamType (teamType) {
      if (teamType === 'C') {
        this.teamTypeText = '기업'
      } else if (teamType === 'G') {
        this.teamTypeText = '정부'
      } else if (teamType === 'S') {
        this.teamTypeText = '학교'
      } else if (teamType === 'H') {
        this.teamTypeText = '종교'
      } else if (teamType === 'D') {
        this.teamTypeText = '동호회'
      } else if (teamType === 'Q') {
        this.teamTypeText = '병원'
      } else if (teamType === 'V') {
        this.teamTypeText = '약국'
      } else if (teamType === 'P') {
        this.teamTypeText = '식당'
      } else if (teamType === 'A') {
        this.teamTypeText = '매장'
      } else if (teamType === 'E') {
        this.teamTypeText = '기타'
      }else {
        this.teamTypeText = '기타'
      }
    },
    async changeFollowYn () {
      if (this.admYn === true) {
        this.errorMsg = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
        this.errorPopYn = true
      }
      var fStatus = this.followYn
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.teamKey = this.chanDetail.teamKey
      param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      var result = false
      this.sendLoadingYn = true
      if (fStatus) {
        result = await this.$changeFollower(param, 'del')
        this.followYn = false
        // this.$emit('changeFollowYn', this.followYn)
      } else {
        result = await this.$changeFollower(param, 'save')

        this.followYn = true
      }
      if (result.result || result) {
        this.sendLoadingYn = false
        if (fStatus) {
          this.$emit('pageReload')
        } else {
          if (result.message === 'OK') {
            this.$emit('changeFollowYn', this.followYn)
          } else {
            this.errorMsg = result.message
            this.errorPopYn = true
          }
        }
        //         this.getChanDetail()
      } else {
        this.sendLoadingYn = false
        this.errorMsg = '실패했습니다. 관리자에게 문의해주세요'
        this.errorPopYn = true
      }
    },
    changeRecvAlimYn () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.chanDetail.userTeamInfo.followerKey
      /* if (this.admYn === true) {
        this.errorMsg = '소유자/관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
        this.errorPopYn = true
        return
      } */
      if (this.recvAlimYn === true) {
        param.notiYn = false
        this.recvAlimYn = false
      } else {
        param.notiYn = true
        this.recvAlimYn = true
      }
      this.$changeRecvAlimYn(param)
    },
    shareMessage() {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘의 디저트',
          description: '아메리카노, 빵, 케익',
          imageUrl:
            'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            // androidExecutionParams: 'test',
          },
        },
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
            },
          },
          {
            title: '앱으로 이동',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
            },
          },
        ]
      });
    },
    async sendkakao () {
      try {
        // eslint-disable-next-line no-undef
        if (Kakao) {
          // eslint-disable-next-line no-undef
          Kakao.init('ad73ad189dfce70f1a9c3b77c9924c45')
        };
      } catch (e) {};
      var kakaoLinkUrl = await this.kakaoLink()
      
      // eslint-disable-next-line no-undef
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '"' + this.$changeText(this.chanDetail.nameMtext) + '" 채널에 함께해요~!',
          description: '지금 구독신청하고, 다양한 정보를 공유해봐요!',
          imageUrl: 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png',
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            mobileWebUrl:  kakaoLinkUrl
          }
        },
        buttons: [
          {
            title: '구독하러 가기',
            link: {
              mobileWebUrl: kakaoLinkUrl
            }
          }
        ]
      })
    },
    async kakaoLink () {
      var result = null
      var params = {
        "dynamicLinkInfo" : {
            "dynamicLinkDomain" : 'thealim.page.link',
              "link" : 'http://mo.d-alim.com:18080?chanDetail=' + this.chanDetail.teamKey 
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
          },
          "suffix" : {"option" : "SHORT"}
      }
      await this.$axios.post("/firebase/v1/shortLinks?key=AIzaSyCW-L18zOf2g5yR-iAey1U9AAE0uxxcQaE", params, { withCredentials : true })
        .then(function (response) {
          result = response.data.shortLink
          // alert(result)
        });
      return result
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
.zindex1000{
  z-index: 1000;
}
.chanDetailWrap{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;

}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanDetailWrap tr {
  border-bottom: 1px solid #ccc;
}
.chanWhiteBox{position: absolute; top: -170px; bottom: 50vh; height: 100%; display: flex; flex-direction: column;align-items: center;width: 100%;z-index: 999;}
.channelItemBox{background-color: #fff; width: 100%; height: 65%; position: absolute; bottom: 0; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
