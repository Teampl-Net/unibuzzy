<template>
<div class="pagePaddingWrap" >
  <gBtnSmall @click="testClick1" btnTitle="test"/>
  <childCompo1 :propInitData="propInitData" />
  <childCompo2 :propInitData="propInitData" />
  <childCompo3 :propInitData="propInitData" />
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
      propInitData: null
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
    this.checkMyInfo()
  },
  props: {
    kind: {}
  },
  methods: {
    async getListData () {
      var param = {}
      param.testKey = 1
      var result = await this.$axios('/service/tp.get~~~~~', param)
      /* var result.content = [

      ] */
      // result.content = [{실제 데이터1}, {실제 데이터2}]
      return result.content // : array
    },
    async openPop () {
      this.propInitData = await this.$getListData() // 1
      if (!this.propInitData || this.propInitData.length === 0) {
        alert('컨텐츠를 찾을 수 없습니다')
        return
      }
      this.$store.dispatch('D_CONTENTS/AC_SET_USERDATA', this.propInitData) // array // 2
      this.childrenPopShowYn = true // 3 자식 열어주기
    },
    async testClick () {
      var t = '0314294216'
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.smsNo = t
      param.smsKind = 'SMS'
      param.bodyString = '인증번호는 1234입니다.'
      param.mmsTitle = '더알림 인증번호'
      param.trId = '1663545628988'
      param.recvListStr = '01084860734'
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.sendSms',
        param: param
      })
      console.log(result)
      // eslint-disable-next-line no-debugger
      debugger
    },
    async testClick1 () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var result = await this.$axios.post('eduPl/edu.getCourseList', param)
      console.log(result)
      // eslint-disable-next-line no-debugger
      debugger
    },
    checkMyInfo () {
      if (this.kind === 'changeMobile') {
        this.kindText = '휴대전화 번호'
        var userMobile = JSON.parse(localStorage.getItem('sessionUser')).phoneEnc
        if (userMobile !== undefined && userMobile !== 'undefined' && userMobile !== null && userMobile !== 'null' && userMobile !== '' && localStorage.getItem('userMobile').length > 7) {
          this.targetKind = 'change'
          this.introText = '기존 휴대폰 번호는 ' + localStorage.getItem('userMobile') + ' 입니다.<br>변경할 휴대폰 번호로 인증 번호 받기'
        } else {
          this.targetKind = 'new'
          this.introText = '현재 등록되어 있는 휴대폰 번호가 없습니다. <br>추가할 휴대폰 번호로 인증번호 받기'
        }
      } else if (this.kind === 'changeEmail') {
        this.kindText = '이메일 주소'
        var userEmail = JSON.parse(localStorage.getItem('sessionUser')).userEmail
        if (userEmail !== undefined && userEmail !== 'undefined' && userEmail !== null && userEmail !== 'null' && userEmail !== '' && localStorage.getItem('userEmail').length > 7) {
          this.targetKind = 'change'
          this.introText = '기존 이메일은 ' + localStorage.getItem('userEmail') + ' 입니다.<br>변경할 이메일로 인증 메일 받기'
        } else {
          this.targetKind = 'new'
          this.introText = '현재 등록되어 있는 이메일이 없습니다.<br>추가할 이메일로 인증 메일 받기'
        }
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: #6768A7; font-size: 15px;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}
</style>
