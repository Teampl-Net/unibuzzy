
<template>
  <div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: 'WinPopup',
  model: {

  },
  props: {
  },
  watch: {

  },
  mounted () {
    // this.openWinPop()
    window.addEventListener('message', this.recvEvtFromChild, false)
    document.addEventListener('message', this.recvEvtFromChild, false)
  },

  methods: {
    openWinPop (uri, width, height) {
      if (this.windowRef != null) {
        this.closeWinPop()
      }

      // const left = (screen.width) ? (screen.width - width) / 2 : 0
      // const top = (screen.height) ? (screen.height - height) / 2 : 0

      // const attr = 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height + ', resizable=no,status=no'
      // 1. 윈도우 팝업 띄우기
      try {
        this.windowRef = window.open(uri, 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
        if (this.windowRef != null) {
          this.windowRef.addEventListener('beforeunload', this.evtClose)
        } else {
          alert('window.open fail!!!!')
        }
      } catch (error) {
        alert(error)
      }

      // 2.  새로 띄운 윈도우 팝업창으로 부터 수신 메세지 이벤트 처리
      window.addEventListener('message', console.log(e), false)
      document.addEventListener('message', console.log(e), false)
    },
    successLogin (res) {
      console.log(res)
    },
    // 윈도우 팝업 닫기
    closeWinPop () {
      if (this.windowRef) {
        this.windowRef.close()
        this.windowRef = null
      }
    },

    evtClose () {
      if (this.windowRef) {
        this.windowRef.close()
        this.windowRef = null
        this.$emit('onClose')
      }
    },

    // 3. 부모창에서 팝업창에 메세지 보내기
    sendEvtToChild (evt) {
      if (!common.isValidObj(this.windowRef)) {
        return
      }
      // eslint-disable-next-line camelcase
      if (g_winPopup == null) {
        return
      }

      // 4. 윈도팝업창(g_winPopup)에 함수 실행
      //  g_winPopup 변수는 본 소스에서 선언하지 않고 아래 ChildWinPop.vue 소스인 윈도우 팝업창 측에서 선언하고 설정함
      g_winPopup.calledFromOpener(evt)
    },

    // 5. 팝업창으로 부터 수신된 이벤트
    recvEvtFromChild (evt) {
      if (evt.data.type && evt.data.type === 'webpackInvalid') return
      // alert(true)
      console.log('recvEvtFromChild......')
      // console.log(JSON.parse(evt.data).message)
      console.log(evt.data)
      if (evt.data == null) {
        // return
      }
      // 5. 본 소스 WinPop.vue를 콤포넌트로 사용하는 부모 vue 측에 이벤트 전달
      // this.$emit('onRecvEvtFromWinPop', recvObj)
    }

  },
  data () {
    return {
      // 6. 윈도우 팝업 변수
      windowRef: null
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>

</style>
