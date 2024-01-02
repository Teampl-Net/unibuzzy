<i18n>
{
  "ko": {
    "INFO_TITLE_EMAIL": "변경할 이메일 주소 인증",
    "INFO_MSG_EMAIL": "이메일 주소 입력",
    "INFO_MSG_VERINUM": "인증번호 입력",
    "INFO_BTN_SEND": "인증번호 발송",
    "INFO_BTN_NOWEMAIL": "현재 등록된 이메일",
    "INFO_MSG_SAME": "현재 이메일과 변경 이메일이 동일합니다.",
    "INFO_MSG_FORMAT": "이메일 형식이 올바르지 않습니다.",
    "INFO_MSG_AFTER_SEND": "인증번호가 발송되었습니다.",
    "INFO_MSG_NOEMAIL": "현재 등록되어 있는 이메일이 없습니다.",
    "INFO_MSG_NONUM": "인증번호를 입력해주세요.",
    "INFO_BTN_VERI": "인증하기"
  },
  "en": {
    "INFO_TITLE_EMAIL": "Email Verification to change",
    "INFO_MSG_EMAIL": "Enter your email address",
    "INFO_MSG_VERINUM": "Enter verification number",
    "INFO_BTN_SEND": "Send",
    "INFO_BTN_NOWEMAIL": "Email currently registered",
    "INFO_MSG_SAME": "The current email and the email you want to change are the same.",
    "INFO_MSG_FORMAT": "Email format is not valid.",
    "INFO_MSG_AFTER_SEND": "The verification number has been sent.",
    "INFO_MSG_NOEMAIL": "No emails are currently registered.",
    "INFO_MSG_NONUM": "Please enter the verification number.",
    "INFO_BTN_VERI": "Verification"
  }
}
</i18n>
<template>
<div class="pagePaddingWrap" style="background: rgb(220, 221, 235);">
  <div style="border-radius: 0.8rem; background: #FFF; box-shadow: 0 0 7px 3px hsl(0deg 2% 71% / 25%); width: 100%; float: left; margin-top: 15px; padding: 10px 10px; padding-top: 5px;">
    <div class=" introText" style="border-bottom: 1.5px solid hsl(0deg 2% 71% / 25%); padding-bottom: 10px; margin-bottom: 10px;" >
        <p class="font18" v-html="this.introText"></p>
    </div>
    <div class="textLeft" v-if="this.kind === 'changeMobile'">
        <select>
        <option>대한민국(+82)</option>
        </select>
    </div>
    <div class="inputWrap ">
        <p class="font18 textLeft fontBold">{{ $t('INFO_TITLE_EMAIL') }}</p>
        <div style="width: 100%; min-height: 30px; position: relative; float:left;">
            <input v-model="infoValue" type="" ref="valueBox" :placeholder="$t('INFO_MSG_EMAIL')" name="" id=""  :style="sendOk === true ? 'background : #CCCCCC50 !important' : ''">
            <gBtnSmall @click="sendMsg" :btnTitle="$t('INFO_BTN_SEND')" class="inputBtn mright-03" />
        </div>
    </div>
    <div class="inputWrap">
        <div style="width: 100%; min-height: 30px; position: relative; float:left;">
            <input type="" v-model="token" ref="numberInputCompo" :readonly='true' :placeholder="TimerStr" name="" id="" :style="!sendOk === true ? 'background : #CCCCCC50 !important' : ''">
            <gBtnSmall @click="checkValidation" v-if="sendOk" :btnTitle="$t('INFO_BTN_VERI')" class="inputBtn"  />
        </div>
    </div>
  </div>
  <gConfirmPop :confirmText='errorBoxText' confirmType="timeout" @no="errorBoxYn = false" v-if="errorBoxYn"/>
</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
export default {
  data () {
    return {
      sendNumberBtn: '인증번호발송',
      introText: '',
      targetKind: '',
      kindText: '',
      beforeEmail: '',
      beforePhone: '',
      infoValue: '',
      token: '',
      sendOk: false,
      timeText: '',
      holdingEmail: '',
      Timer: null,
      TimeCounter: 300,
      TimerStr: this.$t('Enter verification number'),
      errorBoxText: '',
      errorBoxYn: false
    }
  },
  created () {
    this.checkMyInfo()
  },
  props: {
    kind: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    validTimeCheck (alim) {
      var result = false
      if (alim.jobkindId === 'ALIM' && alim.creUserKey === this.commonListCreUserKey){
        var time = this.$checkValidTime(alim.creDate)
        if (time !== false) {
          result = true
        }
      }
      return result
    },
    regEmail (text) {
      // var regemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      var regemail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

      if (regemail.test(text) === true) {
        return true
      } else {
        return false
      }
    },
    sendMsg () {
        if (this.regEmail(this.infoValue.trim())) {
            if (this.GE_USER.userEmail === this.infoValue) {
                this.errorBoxText = this.$t('INFO_MSG_SAME')
                this.errorBoxYn = true
                return
            }
            this.sendEmail()
        }else {
            this.errorBoxText = this.$t('INFO_MSG_FORMAT')
            this.errorBoxYn = true
        }
    },
    async sendEmail () {
      // var t = 'suman9o@susoft.co.kr'
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.address = this.infoValue
      this.holdingEmail = this.infoValue
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.sendMail',
        param: param
      })
      debugger
      if (result.data.result) {
        this.$showToastPop(this.$t('INFO_MSG_AFTER_SEND'))
        // console.log(result.data.result)
        if(this.Timer != null){
            this.timerStop(this.Timer)
            this.Timer = null;
        }
        this.Timer = this.timerStart()
        this.sendOk = true

        this.$refs.valueBox.readOnly = true
        this.$refs.numberInputCompo.readOnly = false
      } else {
            if (result.data.message && result.data.message != '') {
                this.errorBoxText = result.data.message
                this.errorBoxYn = true
            }
            this.token = ''
            this.holdingEmail = ''
            this.sendOk = false
            this.infoValue = ''
            this.timerStop(this.Timer)
            this.Timer = null
            this.TimerStr= this.$t('INFO_MSG_VERINUM')

      }
    },
    timerStart () {
      // 1초에 한번씩 start 호출
      this.TimeCounter = 300;
      var this_ = this
      var interval = setInterval(() => {
        this_.TimeCounter-- //1초씩 감소
        this_.TimerStr = this_.prettyTime()
        if (this_.TimeCounter <= 0) this_.timerStop(interval)
      }, 1000)
      return interval
    },
    timerStop (Timer) {
      clearInterval(Timer)
      this.TimeCounter = 0
    },
    prettyTime () {
      // 시간 형식으로 변환 리턴
      let time = this.TimeCounter / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return (
        minutes.toString().padStart(2, "0") +
        ":" +
        secondes.toString().padStart(2, "0")
      )
    },
    checkMyInfo () {
      if (this.kind === 'changeMobile') {
        this.kindText = '휴대전화 번호'
        var userMobile = this.GE_USER.phoneEnc
        if (userMobile !== undefined && userMobile !== 'undefined' && userMobile !== null && userMobile !== 'null' && userMobile !== '' && localStorage.getItem('userMobile').length > 7) {
          this.targetKind = 'change'
          this.introText = '기존 휴대폰 번호는 ' + localStorage.getItem('userMobile') + ' 입니다.<br>변경할 휴대폰 번호로 인증 번호 받기'
        } else {
          this.targetKind = 'new'
          this.introText = '현재 등록되어 있는 휴대폰 번호가 없습니다. <br>추가할 휴대폰 번호로 인증번호 받기'
        }
      } else if (this.kind === 'changeEmail') {
        this.kindText = '이메일 주소'
        var userEmail = this.GE_USER.userEmail
        if (userEmail !== undefined && userEmail !== 'undefined' && userEmail !== null && userEmail !== 'null' && userEmail !== '') {
          this.targetKind = 'change'
          this.introText = this.$t('INFO_BTN_NOWEMAIL') + '<br> <span class="commonBlack font16 mleft-05" style="font-weight: normal;"> ' + userEmail + '</span>'
        } else {
          this.targetKind = 'new'
          this.introText = this.$t('INFO_MSG_NOEMAIL')
        }
      }
    },
    async checkValidation () {
        var param = new Object()
        param.userKey = this.GE_USER.userKey
        if (this.token === undefined || this.token === null || this.token === '') {
            this.errorBoxText = this.$t('INFO_MSG_NONUM')
            this.errorBoxYn = true
            return
        }
        param.token = this.token
        param.address = this.holdingEmail
        var result = await this.$commonAxiosFunction({
            url: '/sUniB/tp.checkValidation',
            param: param
        })

        // console.log(result)
        if (result.data.userInfo) {
            this.$store.commit('D_USER/MU_USER', result.data.userInfo)
            localStorage.setItem('sessionUser', JSON.stringify(result.data.userInfo))
            this.$router.replace({ path: '/' })
            this.$emit('successUpdate')
        } else {
            this.token = ''
            this.holdingEmail = ''
            this.sendOk = false
            this.infoValue = ''
            this.timerStop(this.Timer)
            this.Timer = null
            TimerStr= this.$t('INFO_MSG_VERINUM')
        }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; min-height: 50px; margin-top: 10px;}
.introText p{text-align: left; font-weight: bold; color: #6768A7;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; float: left; min-height: 50px; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}
</style>
