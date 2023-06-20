<template>
  <div>
    <span>
      부모로 부터 수신 메세지 : {{message}}
    </span>
    <button type="button" @click="sendMsgToParent">부모로 이벤트 보내기</button>
  </div>
</template>

<script>

export default {
  name: 'ChildWinPop',
  mounted () {
    if (opener) {
      console.log('opener is valid!!!')
      // opener에 g_winPopup 변수로 this를 넣어줌에 따라 WinPop.vue에서 이 소스의 객체를 직접 접근할 수 있게 된다
      // WinPop.vue에서 g_winPopup 변수 활용을 확인할것
      opener.g_winPopup = this
    }

    const query = window.location.search
    if (query == null || query === '') {
      let nativeUrl = window.location.href
      nativeUrl = nativeUrl.replace('/#', '')

      const url = new URL(nativeUrl)
      const urlParams = url.searchParams

      this.param1 = urlParams.get('param1')
      this.param2 = urlParams.get('param2')
    } else {
      const param = new URLSearchParams(query)
      if (param != null) {
        this.param1 = param.get('param1')
        this.param2 = param.get('param2')
      } else {
        alert('cannot get query!!')
      }
    }
  },
  methods: {
    sendMsgToParent () {
      this.sendToOpener(
        {
          evt: 'message',
          message: 'hello'
        })
    },

    // 부모로 이벤트 보내기
    sendToOpener (sendObj) {
      if (opener == null) {
        return
      }

      const sendStr = JSON.stringify(sendObj)

      // 부모 창에 Message를 보냄
      window.opener.postMessage(sendStr, '*')
    },

    // 부모로 부터 이벤트 받기
    // 이 함수는 WinPop.vue 의 calledFromOpener를 통해서 받게 된다
    calledFromOpener (evt) {
      console.log('receiveFromOpener  ------')
      this.message = evt.msg
    }

  },
  data () {
    return {
      // 부모로 부터 수신되는 메세지
      message: '',

      // URI를 통해 get 방식으로 받은 파라미터1과 파라미터2
      param1: null,
      param2: null
    }
  }

}
</script>

<style scoped>

</style>
[출처] Vue.js 에서 Window.open 팝업 띄우기|작성자 데이비뜨
