<template>
<div class="chanDetailWrap" :style="'background-image: url(' + chanDetail.bgPathMtext + ')'" :class="{zindex1000:alimSubPopYn === true }">
<!-- <div class="chanDetailWrap zindex1000" :style="'background-image: url(' + chanDetail.bgPathMtext + ')'" > -->
  <gConfirmPop :confirmText='errorMsg' :confirmType='errorBoxType ? "two" : "timeout" ' v-if="errorPopYn" @no='errorPopYn = false'  />
  <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
  <div v-if="sendLoadingYn" id="loading" style="display: block;"><div class="spinner"></div></div>
  <div class="channelItemBox">
    <div style="width: 100%; height: 100%; position: relative;">
      <!-- <popHeader v-if="alimSubPopYn === true" :chanAlimListTeamKey='null' :bgblack="true" style="background: transparent; " :headerTitle="this.$changeText(chanDetail.nameMtext)" @closeXPop="this.$emit('closeXPop')" class="commonPopHeader chanDetailPopHeader"/> -->
      <popHeader v-if="alimSubPopYn === true" :chanAlimListTeamKey='null' :bgblack="true" style="background: transparent; " headerTitle="채널 상세" @closeXPop="this.$emit('closeXPop')" class="commonPopHeader chanDetailPopHeader"/>
      <welcomePopUp type="follow" v-if="openWelcomePopYn" :chanInfo="chanDetail" @copyText="copyText" @goChanMain="changeFollowTrue" @closePop="okMember" @applyMember="okMember" />
      <div ref="chanImg"  class="mt-header chanWhiteBox">
        <div class="chanTextBox" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'">
          <p class="font16">구독자 {{chanDetail.followerCount}}명| 알림발송 {{chanDetail.totalContentsCount}}건</p>
          <p class="font22 fontBold">{{this.$changeText(chanDetail.nameMtext)}}</p>
        </div>
        <div v-if="admYn" class="editChanBtnWrap">
          <div class="chanTextBox" :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float: right; position: absolute; right: 1rem; bottom: -30px; height: 30px; line-height: 30px;">
            <p class="font14 fontBold" @click="editChan" style="">채널 편집 ></p>
          </div>
        </div>
        <div class="chanLogoWrap">
          <img :src="chanDetail.logoPathMtext" style="width: 155px;  margin-right: 5px;" alt="채널사진">
          <img class="fl" src="../../../assets/images/channel/icon_official.svg" v-if="chanDetail.officialYn" style="position: absolute; width:50px; bottom:-1.6rem; left: 50%; transform: translateX(-50%);" alt="">
          <!-- <div style="padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">{{followTypeText}}</div> -->
        </div>
        <div v-if="followYn === true && this.followTypeText !== '소유자'" class="mtop-05">
          <gBtnSmall @click="saveMember" class="fl" :btnTitle="this.memberYn === 1 || this.memberYn? '멤버취소': '멤버신청'"/>
          <gBtnSmall @click="changeRecvAlimYn" class="fl mright-03" :btnTitle="recvAlimYn === true? '알림취소': '알림받기'" />
          <gBtnSmall v-if="chanDetail.teamKey !== 377" @click="changeFollowYn" class="fl mright-03" btnTitle="구독취소" />
        </div>
        <div v-else-if="followYn === false" class="mtop-05"><gBtnSmall @click="changeFollowYn" class="fl mright-03" btnTitle="구독하기" /></div>
        <table class="mtop-2" >
          <colgroup><col width="10%"><col width="90%"></colgroup>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_3.png" alt="채널 메세지 아이콘"></td>
            <td v-html="this.$changeText(chanDetail.memoMtext)"></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_2.png" alt="발행일 아이콘"></td>
            <td><div class="w-30P fl textLeft commonColor font16 fontBold " > 발행일 </div><div class="w-70P fl textLeft"> {{this.$changeDateFormat(chanDetail.creDate)}}</div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘"></td>
            <td><div class="w-30P fl textLeft commonColor font16 fontBold " > 산업군 </div><div class="w-70P fl textLeft"> {{teamTypeText}}<!-- <span class="fl mr-04">{{chanDetail.followerCount}}명</span><gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="공유하기" /> --></div></td>
          </tr>
          <tr style="border: none;">
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
            <td>
              <div class="w-30P fl textLeft commonColor font16 fontBold " @click="kakaoLink" > 링크공유 </div>
              <div class="w-70P fl textLeft">
                <!-- <input type="text" style="width: 0px; height: 0px; border: none;" id="copyTextBody" name="" :value="'https://thealim.page.link/?link=https://mo.d-alim.com:9443?chanDetail=' + this.chanDetail.teamKey + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"> -->
                <!-- <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="float: right; margin-right: 5px; width: 35px;" alt="카카오톡 공유하기"> -->
                <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
                    :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com:9443?chanDetail=' + this.chanDetail.teamKey
                      + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                      class="copyTextIcon">
                  <img src="../../../assets/images/common/copyLink.svg" style="width: 100%" alt="">
                </div>
              </div>
              </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>

</template>

<script>
/* import followerList from './Tal_chanFollowerList.vue' */
import welcomePopUp from '../channel/Tal_chanFollowInfo.vue'
export default {
  mounted () {
    // console.log('this.chanDetail')
    // console.log(this.chanDetail)
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
      memberYn: false,
      followParam: null
    }
  },
  props: {
    chanDetail: {},
    parentMemberYn: {},
    alimSubPopYn: {} // 구독자일 경우, 채널메인을통해 open되는 풀팝업,
  },
  components: {
    welcomePopUp
    /* followerList */
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
    this.$emit('openLoading')
    if (this.parentMemberYn) {
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
        this.admYn = true
        if (this.chanDetail.userTeamInfo.ownerYn !== undefined && this.chanDetail.userTeamInfo.ownerYn !== null && this.chanDetail.userTeamInfo.ownerYn !== '') {
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
    this.$emit('closeLoading')
  },
  methods: {
    async saveMember () {
      this.smallPopYn = true
      if (this.memberYn || this.memberYn === 1) {
        this.confirmMsg = '멤버 취소가 완료되었습니다.'
        this.addSmallMsg = '(언제든 다시 ' + this.$changeText(this.chanDetail.nameMtext) + '의 멤버가 될 수 있습니다.)'
      } else {
        this.confirmMsg = '멤버 신청이 완료되었습니다.'
        this.addSmallMsg = '(관리자는 멤버의 프로필 정보를 조회할 수 있습니다.)'
      }
      var params = null
      var param = {}
      param.followerKey = this.chanDetail.userTeamInfo.followerKey
      param.teamKey = this.chanDetail.teamKey
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext) || this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.memberYn = true
      param.teamName = this.$changeText(this.chanDetail.nameMtext)
      if (this.memberYn || this.memberYn === 1) {
        param.memberYn = false
        params = { follower: param }
      } else {
        params = { follower: param, doType: 'ME' }
      }
      // console.log(param)
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:10443/tp.saveFollower',
        param: params
      })
      if (result.data.result === true) {
        if (this.memberYn || this.memberYn === 1) {
          this.memberYn = false
        } else {
          this.memberYn = true
        }
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
      if (teamType === 'C') { this.teamTypeText = '기업' } else if (teamType === 'G') { this.teamTypeText = '정부' } else if (teamType === 'S') { this.teamTypeText = '학교' } else if (teamType === 'H') { this.teamTypeText = '종교' } else if (teamType === 'D') { this.teamTypeText = '동호회' } else if (teamType === 'Q') { this.teamTypeText = '병원' } else if (teamType === 'V') { this.teamTypeText = '약국' } else if (teamType === 'P') { this.teamTypeText = '식당' } else if (teamType === 'A') { this.teamTypeText = '매장' } else if (teamType === 'E') { this.teamTypeText = '기타' } else { this.teamTypeText = '기타' }
    },
    changeFollowTrue () {
      this.openWelcomePopYn = false
      this.$emit('changeFollowYn', this.followYn)
    },
    async changeFollowYn () {
      if (this.admYn === true) {
        this.errorMsg = '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
        this.errorPopYn = true
      } else {
        var fStatus = this.followYn

        // eslint-disable-next-line no-new-object
        this.followParam = new Object()
        this.followParam.teamKey = this.chanDetail.teamKey
        this.followParam.teamName = this.$changeText(this.chanDetail.nameMtext)
        this.followParam.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        this.followParam.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
        var result = false
        this.sendLoadingYn = true
        if (fStatus) {
          result = await this.$changeFollower({ follower: this.followParam, doType: 'FL' }, 'del')
          this.followYn = false

          if (result.result || result) {
            this.sendLoadingYn = false
            this.$emit('pageReload')
          } else {
            this.sendLoadingYn = false
            this.errorMsg = '실패했습니다. 관리자에게 문의해주세요'
            this.errorPopYn = true
          }
        } else {
          this.sendLoadingYn = false
          this.openWelcomePopYn = true
        }
      }
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
    changeRecvAlimYn () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.chanDetail.userTeamInfo.followerKey
      if (this.recvAlimYn === true) {
        param.notiYn = false
        this.recvAlimYn = false
      } else {
        param.notiYn = true
        this.recvAlimYn = true
      }
      this.$changeRecvAlimYn(param)
    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#copyTextBody')
      var _this = this
      clip.on('success', function (e) {
        _this.errorMsg = '채널링크가 복사되었습니다!'
        _this.errorPopYn = true
      })
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
      /* var kakaoLinkUrl = 'https://thealim.page.link/' +

      '?link=' + 'http// mo.d-alim.com:18080?chanDetail=' + this.chanDetail.teamKey +
            '&apn=' + 'com.tal_project' +
            '&ibn=' + 'name' +
            '&st=' + '더알림' +
            '&sd=' + '더편한구독알림' +
            '&si=' + 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png' */
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
            mobileWebUrl: kakaoLinkUrl
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
        dynamicLinkInfo: {
          dynamicLinkDomain: 'thealim.page.link',
          link: 'https://mo.d-alim.com?chanDetail=' + this.chanDetail.teamKey +
                        '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
        },
        suffix: { option: 'SHORT' }
      }
      await this.$axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCW-L18zOf2g5yR-iAey1U9AAE0uxxcQaE', params, { withCredentials: true })
        .then(function (response) {
          result = response.data.shortLink
          // eslint-disable-next-line no-debugger
          debugger
        })
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
.editChanBtnWrap{width: 100%; position: absolute; top: 70px;padding: 0 20px; margin-top: 0.8rem;}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanDetailWrap tr {
  border-bottom: 1px solid #ccc;
}
.chanLogoWrap{width: 185px; height: 185px; min-width: 180px; min-height: 180px; position: relative; border-radius: 185px; display: flex; align-items: center; justify-content: center; border: 5px solid #ccc; background: rgb(255 255 255 / 50%);}
.chanWhiteBox{position: absolute; top: -170px; bottom: 50vh; height: 100%; display: flex; flex-direction: column;align-items: center;width: 100%;z-index: 999;}
.channelItemBox{background-color: #fff; width: 100%; height: calc(100% - 250px); position: absolute; bottom: 0; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}
.copyTextIcon{background: #6768a7; width: 30px; height: 30px; float: right; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
