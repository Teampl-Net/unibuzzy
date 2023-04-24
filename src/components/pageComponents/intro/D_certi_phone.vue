
<template>
  <div class="home">
    <h2 class="text-center p-3">본인인증</h2>
    <button @click="onClickCertification" class="btn btn-sm btn-primary mt-5">
      본인인증
    </button>
    <!-- nice 서버에 submit할 form -->
    <!-- <form name="form_chk" method="post">
      <input type="hidden" name="m" value="checkplusService">
      <input type="hidden" name="EncodeData" value="">
    </form>
    <WinPopup id="popupChk" ref="winPopup"  @onClose="evtCloseWinPopup(val)"  @onRecvEvtFromWinPop="onRecvWinPop(val)" /> -->
  </div>
</template>

<script>
import WinPopup from '../../popup/common/D_commonWindowPop.vue'
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { onMessage } from '../../../assets/js/webviewInterface'
export default {
  name: 'Home',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    WinPopup
  },
  watch: {
    GE_CERTI: {
      handler (value, old) {
        console.log(value)
      },
      deep: true
    }
  },
  computed: {
    GE_CERTI () {
      return this.$store.getters['D_USER/GE_CERTI']
    }
  },
  methods: {
    getReturnValue (returnValue) {
      // alert(returnValue)
      console.log(returnValue)
    },
    onClickCertification () {
      /* 가맹점 식별코드 */
      const userCode = 'imp44771042'

      /* 본인인증 데이터 정의하기 */
      const data = {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        name: '홍길동', // 이름
        phone: '01012341234' // 전화번호
      }
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile) {
        /* 리액트 네이티브 환경에 대응하기 */
        const params = {
          userCode, // 가맹점 식별코드
          data, // 본인인증 데이터
          callbackUrl: 'http://192.168.0.10:8080/#/certiPhoneReturn',
          type: 'certification' // 결제와 본인인증 구분을 위한 필드
        }
        const paramsToString = JSON.stringify(params)
        onMessage('REQ', 'certification', paramsToString)
      } else {
        /* 그 외 환경의 경우 */
        /* 가맹점 식별하기 */
        const { IMP } = window
        IMP.init(userCode)
        /* 본인인증 창 호출하기 */
        IMP.certification(data, this.callback)
      }
    },
    callback () {
    },
    onCertification () {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window
      IMP.init('imp44771042')

      /* 2. 본인인증 데이터 정의하기 */
      const data = {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        m_redirect_url: '{http://192.168.0.10:8080/#/certiPhone_return}',
        // PC환경에서는 popup 파라메터가 무시되고 항상 true 로 적용됨
        popup: false
      }

      /* 4. 본인인증 창 호출하기 */
      IMP.certification(data, this.callbackF)
    },
    callbackF (response) {
      /* 3. 콜백 함수 정의하기 */
      const {
        success,
        merchant_uid,
        error_msg
      } = response

      if (success) {
        alert('본인인증 성공')
      } else {
        alert(`본인인증 실패: ${error_msg}`)
      }
    },
    async checkIdentity () {
      // const wl = window.location
      // 인증 후 callback URLservice/tp.checkplus_success
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
      document.form_chk.target = '`popupChk`'
      // submit! (본인인증 화면으로 전환)
      document.form_chk.submit()
    },
    openWinPop () {
      // vue의 라우터에 등록한 팝업창 주소를 uri로 설정하도록 한다
      const uri = '/child/ChildWinPop?param1=abc' + '&param2=def'
      this.$refs.winPopup.openWinPop(uri, 1560, 700)
    },
    onRecvWinPop (recvObj) {
      console.log('onRecvWinPop  ---------')

      if (recvObj.evt != null) { // 저장이 정상적으로 완료된 경우
        switch (recvObj.evt) {
          case 'message' :
            console.log('윈 팝업으로 부터 수신 메세지 : ' + recvObj.message)
            break
        }
      }
    },
    sendToChild () {
      this.$refs.winPopup.sendEvtToChild({ msg: 'abcde' })
    }

  }
}
</script>
