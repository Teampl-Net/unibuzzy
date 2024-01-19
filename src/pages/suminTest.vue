<template>
<div class="pagePaddingWrap" >
  <gBtnSmall @click="testClick" class="mleft-05" btnTitle="testClick"/>
  <gBtnSmall @click="goLogin" class="mleft-05" btnTitle="로그인할래"/>
  <gBtnSmall @click="successLogin" class="mleft-05" btnTitle="로그인성공"/>
  <gBtnSmall @click="failLogin" btnTitle="로그인실패"/>
  <div style="width: 100%; min-height: 500px; float: left; margin-top: 20px;">
    <p class="font20 fontBold commonColor textLeft mbottom-05">로그인 처리 로그</p>
    <div style="width: 100%; height: 500px; overflow: hidden auto; border: 2px solid #ADADAD; padding: 10px;">
        <p class="textLeft font14 fontBold" v-for="(item, index) in logList" :key="index" v-html="item"></p>
    </div>
  </div>
  <!-- <div v-for="(value, index) in GE_SERV_DATA"></div> -->
</div>
</template>

<script>
export default {
  data () {
    return {
      sendNumberBtn: '인증하기',
      introText: '',
      targetKind: '',
      kindText: '',
      beforeEmail: '',
      beforePhone: '',
      test: '',
      realDataList: [],
      propInitData: null,
      logList: []
    }
  },
  computed: {
    GE_SERV_DISP_DATA () {
      var servData = null
      servData = this.realDataList[0]
      var index = null
      // var servKey = this.realDataList[0].servKey
      // 1
      /* for (var i = 0; i < GE_SERV_DATA_LIST.length; i++) {
        servData = GE_SERV_DATA_LIST[index]
      } */
      // 2
      index = this.GE_SERV_DATA_LIST.findIndex()
      if (index !== -1) {
        servData = this.GE_SERV_DATA_LIST[index]
      }
      return servData
    },
    GE_SERV_DATA_LIST () {
      return this.$store.getter['D_CONTENTS/GE_SERV_DATA_LIST']
    }
  },
  created () {
    // this.checkMyInfo()
  },
  props: {
    kind: {}
  },
  methods: {
    addLogList (log, page) {
      var nowTime = new Date().toLocaleString()
      var addLogText = '<span class="font16 fontBold commonColor textLeft">[' + nowTime + '] ' + page + '</span><br>' + log
      this.logList.unshift(addLogText)
    },
    async testClick () {
      var result = await this.$axios.post('http://192.168.0.100:9090/edu.getCourseList', {})
      console.log(result)
    },
    async goLogin () {
      // eslint-disable-next-line no-undef
      sso.login(window.location.protocol + '//' + window.location.host, this.addLogList)
    },
    async successLogin () {
      var param = {}
      var user = this.$store.getters['D_USER/GE_USER']
      param.userKey = user.userKey
      param.fcmKey = user.fcmKey
      // eslint-disable-next-line no-undef
      sso.loginCheck(param, this.testCallback, this.addLogList)
    },
    async failLogin () {
      var param = {}
      // var user = this.$store.getters['D_USER/GE_USER']
      param.userKey = 0
      param.fcmKey = 123
      // eslint-disable-next-line no-undef
      sso.loginCheck(param, this.testCallback, this.addLogList)
    },
    testCallback (data) {
      var logText = '<span class="font16 fontBold commonBlack textLeft">LoginPl로부터 받은 응답:</span>'
      if (data.result === true) {
        logText += '<br>유저 인증 성공!'
        if (data.userMap) {
          logText += '<br> - dcmKey(유저키값): ' + data.userMap.userKey
          logText += '<br> - fcmKey: ' + data.userMap.fcmKey
          logText += '<br> - 이름: ' + data.userMap.userNameMtext
          logText += '<br> - email: ' + data.userMap.userEmail
          logText += '<br> - phone: ' + data.userMap.phoneEnc
          logText += '<br>-----------------------------------------------------'
        }
      } else {
        setTimeout(() => {
          this.goLogin()
        }, 1000)
      }
      this.addLogList(logText, window.location.href)
      console.log(data)
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: rgb(74 102 158); font-size: 15px;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid rgb(74 102 158);}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}
</style>
