<template>
<div class="introBackground" style="background: rgb(220, 221, 235);">
  <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
    <div class="introWhiteCard" style=" min-height: 450px;     margin-top: 30px;">
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="fl mbottom-1 w-100P mtop-05">
            <img class="mbottom-05" src="../../assets/images/main/message_logo.png" style="width: 4rem" alt="">
        </div>
        <div class="fl w-100P introText">
            <p v-if="this.GE_USER" class="fl textLeft font18 grayBlack fontBold"> {{this.$changeText(this.GE_USER.userDispMtext)}}</p><p class="fl textLeft font16 commonColor fontBold" style="line-height: 30px;">님</p>
            <p class="fl textLeft w-100P font16 commonColor fontBold" v-html="mCertiMessage"></p>
        </div>
        <div style="width: 100%; height: 2px; background: #CCC; float: left;" class="mbottom-2 mtop-1"></div>
        <div class="fl w-100P  introText mbottom-2">
            <p class="fl textLeft font14 fontBold w-100P commonColor">실명인증을 하면</p>
            <p class="fl mleft-05 textLeft fontNormal font14 commonColor">
                - 내 채널을 만들고 관리할 수 있어요!<br>
                - 실명멤버에 참여할 수 있어요!<br>
                - 익명게시판에 참여하여 소통할 수 있어요!<br>
            </p>
        </div>
       <!--  <div class="textLeft">
          <select>
            <option>대한민국(+82)</option>
          </select>
        </div> -->
        <div class="inputWrap fl w-100P  mtop-1">
          <!-- <input type="tel" v-model="phoneNum" placeholder="휴대전화 번호입력" name="" id="" > -->
          <gBtnLarge @click="checkIdentity" btnTitle="인증하기" btnThema=""/>
          <a href="" @click="closeXPop" class="commonGray font14 mtop-05 textCenter w-100P fl">나중에하기</a>
          <!-- <gBtnSmall @click="savePhone" btnTitle="등록" class="inputBtn" /> -->
          <!-- <p :class="{noSavePhone: regPhoneNumber(phoneNum) == false}"  class="fr mright-05">{{regPhoneText}}</p> -->
        </div>
      <!--   <div class="inputWrap">
          <input type="number" placeholder="인증번호 입력" name="" id="" >
        </div> -->
      </div>
    </div>
  </div>
    <form name="form_chk" method="post">
      <input type="hidden" name="m" value="checkplusService">
      <input type="hidden" name="EncodeData" value="">
    </form>
    <WinPopup id="popupChk" ref="winPopup"  @onClose="evtCloseWinPopup"  @onRecvEvtFromWinPop="onRecvWinPop" />
</template>

<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import WinPopup from '../../components/popup/common/D_commonWindowPop.vue'
export default {
  data () {
    return {
      phoneNum: '',
      tempUser: [],
      failPopYn: false,
      errorText: '',
      mCertiMessage: '',
      winPopShowYn: false,
      routerYn: this.$route.path === '/savePhone',
      isMobile: /Mobi/i.test(window.navigator.userAgent)

      // regPhoneText:'휴대전화 형식이 아닙니다.'
    }
  },
  components: {
    WinPopup,
    commonConfirmPop
  },
  created () {
    // this.tempUser = JSON.parse(this.user)
    if (this.GE_USER) {
      this.tempUser = this.GE_USER
      if (this.routerYn) {
        this.mCertiMessage += '더알림에 함께하게 된 것을 환영합니다!<br>ㅎ'
      } else {
        this.mCertiMessage += '실명인증을 통해 더 활발하게 활동해봐요!'
      }
      /* if (this.GE_USER.certiYn) {
        this.mCertiMessage = '현재 등록된 휴대폰 번호: ' + this.GE_USER.phoneEnc
      } */
    }
    console.log(this.mCertiMessage)
  },
  props: {
    user: {},
    popYn: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    async checkIdentity () {
      // const wl = window.location
      // 인증 후 callback URLhttps://mo.d-alim.com/service/tp.checkplus_success
      // 패치해라
      const returnSuccessUrl = 'service/tp.successUserCertification'
      const returnErrorUrl = 'service/tp.successUserCertification'
      // callback 후 WAS에서 최종적으로 redirect 시킬 URL(결과 화면)
      // const redirectUrl = 'https://222.233.118.96:8080'
      var res = await this.$commonAxiosFunction({
        url: 'service/tp.getNiceToken',
        param: { returnSuccessUrl: returnSuccessUrl, returnErrorUrl: returnErrorUrl }
      })
      this.winPopShowYn = true
      const encodeData = res.data
      this.$refs.winPopup.openWinPop('', 1560, 700)
      // this.openWinPop()
      // window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
      document.form_chk.action = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'
      document.form_chk.EncodeData.value = encodeData
      // eslint-disable-next-line no-debugger
      debugger
      document.form_chk.target = 'popupChk'
      // submit! (본인인증 화면으로 전환)
      document.form_chk.submit()
    },
    openWinPop () {
      /* this.windowRef = window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
      // alert(this.windowRef)
      if (this.windowRef != null) {
        this.windowRef.addEventListener('beforeunload', this.evtClose)
      } else {
        alert('window.open fail!!!!')
      } */

      // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리
      window.addEventListener('message', this.recvEvtFromChild, false)
      document.addEventListener('message', this.recvEvtFromChild, false)
      // vue의 라우터에 등록한 팝업창 주소를 uri로 설정하도록 한다
      // const uri = '/test'
      // this.$refs.winPopup.openWinPop(uri, 1560, 700)
    },
    onRecvWinPop (recvObj) {
      console.log('onRecvWinPop  ---------')
      console.log(recvObj)
      if (recvObj.evt != null) { // 저장이 정상적으로 완료된 경우
        switch (recvObj.evt) {
          case 'message' :
            if (recvObj.message) {
              var userCertiInfo = recvObj.message
              var user = {}
              user.userKey = this.GE_USER.userKey
              user.phoneEnc = userCertiInfo.sMobileNo
              user.userNameMtext = userCertiInfo.sName
              user.certiYn = true
              this.savePhone(user)
            }
            console.log('윈 팝업으로 부터 수신 메세지 : ')
            console.log(recvObj.message)
            break
        }
      }
    },
    sendToChild () {
      this.$refs.winPopup.sendEvtToChild({ msg: 'abcde' })
    },
    async savePhone (user) {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}

      param.user = user
      param.updateYn = true

      var result = await this.$changeDispName(param)
      // console.log(result)
      if (result.data) {
        this.$store.commit('D_USER/MU_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        /* this.$router.replace({ path: '/' })
        this.$emit('closeXPop') */
        this.$showToastPop('인증에 성공하였습니다!')
        this.closeXPop()
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {

      }
    },
    closeXPop () {
      if (this.popYn) {
        this.$emit('closeXPop')
      } else {
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; min-height: 4rem;}
.introText p{text-align: left; color: #6768A7;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}

  .savePhoneHeader {margin-top: 14px; line-height: 27px}
  .savePhoneHeader p{ color: #6768A7; font-weight: bold;}
  .savePhoneHeader .headerFont{line-height: 32px}

.noSavePhone{color: #b60707;}

</style>
