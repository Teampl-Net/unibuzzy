<template>
<div class="chanDetailWrap" :style="'background-image: url(' + chanDetail.bgPathMtext + ')'">
  <gConfirmPop :confirmText='errorMsg' confirmType='timeout' v-if="errorPopYn" @no='errorPopYn=false' />
  <!-- <div>{{pushKey}}</div> -->
  <div class="channelItemBox">
    <div style="width: 100%; height: 100%; position: relative;">
      <div ref="chanImg"  class="mt-header chanWhiteBox">
        <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'">
          <p class="font16">구독자 {{chanDetail.followerCount}}명| 알림발송 {{chanDetail.totalContentsCount}}건</p>
          <p class="font22 fontBold">{{this.$changeText(chanDetail.nameMtext)}}</p>
        </div>
        <div v-if="admYn === false" style="width: 100%; position: absolute; top: 70px;padding: 0 20px; margin-top: 0.8rem; ">
          <div :class="chanBgBlackYn===true ? 'blackTextBox': 'whiteTextBox'" style="float: right; margin-bottom: 0px;">
            <p class="font14 fontBold" @click="editChan" style="">채널 편집 ></p>
          </div>
        </div>
        <!-- <div style="position: absolute; top:90px; right:50px"><gBtnSmall  :btnTitle='editBtnTitle' @click="editChannelClick"/></div> -->

        <div style="width: 185px; height: 185px; position: relative; border-radius: 185px; display: flex; align-items: center; justify-content: center; border: 5px solid #ccc; background: rgb(255 255 255 / 50%);">
          <img :src="chanDetail.logoPathMtext" style="width: 155px;  margin-right: 5px;" alt="채널사진">
          <!-- <div style="padding: 0 10px; background: #ccc; position: absolute; bottom: -20px; border-radius: 5px; margin-bottom: 5px;">{{followTypeText}}</div> -->
        </div>
        <div v-if="followYn === true && admYn === false" class="mtop-05"><gBtnSmall @click="changeRecvAlimYn" class="fl" :btnTitle="recvAlimYn === true? '알림취소': '알림받기'" /><gBtnSmall @click="changeFollowYn" class="fl mright-03" btnTitle="구독취소" /></div>
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
            <td><div class="w-20P fl textLeft commonColor fontBold" > 발행일 </div><div class="w-80P fl textLeft"> {{this.$dayjs(chanDetail.creDate).format('YYYY-MM-DD')}}</div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_1.png" alt="발행자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 발행자 </div><div class="w-80P fl textLeft"> {{this.$changeText(chanDetail.nameMtext)}}</div></td>
          </tr>
          <tr>
            <td class="iconTd"><img  src="../../../assets/images/channel/channer_4.png" alt="구독자 아이콘"></td>
            <td><div class="w-20P fl textLeft commonColor fontBold" > 산업군 </div><div class="w-80P fl textLeft"> {{teamTypeText}}<!-- <span class="fl mr-04">{{chanDetail.followerCount}}명</span><gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="공유하기" /> --></div></td>
          </tr>
          <tr>
            <td colspan="2"><div v-for="(value,index) in chanKeywordList" :key="index" style="padding: 0 10px; float: left; background:#6768A7; color: #FFF; border-radius: 10px;" class="fl mr-04" >#{{value}}</div><!-- <gBtnSmall class="plusMarginBtn" style="float: left;" btnTitle="링크열기" />  --></td>
          </tr>
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
/* import followerList from './Tal_chanFollowerList.vue' */
export default {
  mounted () {
    // this.$refs.chanImg.style.setProperty('--halfWidth', (window.innerWidth - 185) / 2 + 'px')
  },
  data () {
    return {
      errorPopYn: false,
      chanBgBlackYn: false,
      admYn: false,
      recvAlimYn: true,
      chanKeywordList: ['소셜미디어', '구독형 알림'],
      followYn: false,
      errorMsg: '',
      followTypeText: '',
      teamTypeText: ''
    }
  },
  props: {
    chanDetail: {},
    alimSubPopYn: {} // 구독자일 경우, 채널메인을통해 open되는 풀팝업
  },
  components: {
    /* followerList */
  },
  computed: {
    historyStack () {
      return this.$store.getters.hRPage
    }
  },
  watch: {
    historyStack (value, old) {
      if (this.alimSubPopYn) {
        if ('channelAlimToDetail' + this.chanDetail.teamKey === value) {
          this.$emit('closeDetailPop')
        }
      }
    }
  },
  async created () {
    if (this.alimSubPopYn) {
      var history = this.$store.getters.hStack
      history.push('channelAlimToDetail' + this.chanDetail.teamKey)
      this.$store.commit('updateStack', history)
    }

    if (this.chanDetail.userTeamInfo !== undefined && this.chanDetail.userTeamInfo != null && this.chanDetail.userTeamInfo !== '') {
      this.followYn = true
      this.followTypeText = '구독자'
      if (this.chanDetail.userTeamInfo.followerType === 'A' || this.chanDetail.userTeamInfo.followerType === 'M') {
        this.admYn = true
        if (this.chanDetail.userTeamInfo.followerType === 'A') {
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
    editChan () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'createChannel'
      param.targetKey = this.chanDetail.teamKey
      param.modiYn = true
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
      }
    },
    async changeFollowYn () {
      var fStatus = this.followYn
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.teamKey = this.chanDetail.teamKey
      var result = false
      if (fStatus) {
        result = await this.$changeFollower(param, 'del')
        this.followYn = false
        // this.$emit('changeFollowYn', this.followYn)
      } else {
        result = await this.$changeFollower(param, 'save')
        this.followYn = true
      }
      if (result) {
        this.$emit('changeFollowYn', this.followYn)
        //         this.getChanDetail()
      } else {
        this.errorPopYn = true
      }
    },
    changeRecvAlimYn () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.followerKey = this.chanDetail.userTeamInfo.followerKey
      if (this.admYn === true) {
        this.errorMsg = '소유자/관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
        this.errorPopYn = true
      }
      if (this.recvAlimYn === true) {
        param.notiYn = false
        this.recvAlimYn = false
      } else {
        param.notiYn = true
        this.recvAlimYn = true
      }
      this.$changeRecvAlimYn(param)
    }
    /* editChannelClick () {
      this.setEditValue()
      if (this.editYn === true) {
        this.editYn = false
        this.editBtnTitle = '채널수정'
      } else {
        this.editYn = true
        this.editBtnTitle = '수정완료'
      }
    } */
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
.chanWhiteBox{position: absolute; top: -170px; bottom: 50vh; height: 100%; display: flex; flex-direction: column;align-items: center;width: 100%;z-index: 999;}
.channelItemBox{background-color: #fff; width: 100%; height: 65%; position: absolute; bottom: 0; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
