
<template>
  <div class="home">
    <h2 class="text-center p-3">본인인증</h2>
    <button @click="checkIdentity" class="btn btn-sm btn-primary mt-5">
      본인인증
    </button>
    <!-- nice 서버에 submit할 form -->
    <form name="form_chk" method="post">
      <input type="hidden" name="m" value="checkplusService">
      <input type="hidden" name="EncodeData" value="">
    </form>
    <WinPopup id="popupChk" ref="winPopup"  @onClose="evtCloseWinPopup(val)"  @onRecvEvtFromWinPop="onRecvWinPop(val)" />
  </div>
</template>

<script>
import WinPopup from '../../popup/common/D_commonWindowPop.vue'
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
export default {
  name: 'Home',
  components: {
    WinPopup
  },
  methods: {
    getReturnValue (returnValue) {
      // alert(returnValue)
      console.log(returnValue)
    },
    onCertification () {
      /* 1. 가맹점 식별하기 */
      const { IMP } = window
      IMP.init('imp44771042')

      /* 2. 본인인증 데이터 정의하기 */
      const data = {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        m_redirect_url: '{http://localhost:8080/#/certiPhone_return}',
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
