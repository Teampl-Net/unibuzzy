<template>
<div class="introBackground" style="background: rgb(220, 221, 235);">
  <commonConfirmPop v-if="failPopYn" @no="closeXPop" confirmType="one" :confirmText="errorText" />
    <div class="introWhiteCard" style=" min-height: 500px;     margin-top: 30px;">
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="fl mbottom-1 w100P mtop-05">
            <img class="mbottom-05" src="../../assets/images/main/message_logo.png" style="width: 4rem" alt="">
        </div>
        <div class="fl w100P introText">
            <p v-if="this.GE_USER" class="fl textLeft font18 grayBlack fontBold"> {{this.$changeText(this.GE_USER.userDispMtext)}}</p><p class="fl textLeft font16 commonColor fontBold" style="line-height: 30px;">님</p>
            <p class="fl textLeft w100P font16 commonColor fontBold" v-html="mCertiMessage"></p>
        </div>
        <div style="width: 100%; height: 40px; float: left;">
            <input v-model="inName" style="width: 30%; float: left; height: 35px; padding: 0 10px;" placeholder="이름을 입력해주세요" class="font16 textLeft" type="text">
            <input v-model="inPhone" style="width: calc(70% - 5px); float: left; height: 35px; padding: 0 10px; margin-left: 5px;" placeholder="휴대폰번호를 입력해주세요" class="font16 textLeft" type="number">
        </div>
        <div style="width: 100%; height: 2px; background: #CCC; float: left;" class="mbottom-2 mtop-1"></div>
        <div class="fl w100P  introText mbottom-2">
            <p class="fl textLeft font14 fontBold w100P commonColor">실명인증을 하면</p>
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
        <div class="inputWrap fl w100P  mtop-1">
          <!-- <input type="tel" v-model="phoneNum" placeholder="휴대전화 번호입력" name="" id="" > -->
          <gBtnLarge @click="onClickCertification" btnTitle="인증하기" btnThema=""/>
          <a href="" @click="closeXPop" class="commonGray font14 mtop-05 textCenter w100P fl">나중에하기</a>
          <!-- <gBtnSmall @click="savePhone" btnTitle="등록" class="inputBtn" /> -->
          <!-- <p :class="{noSavePhone: regPhoneNumber(phoneNum) == false}"  class="fr mright-05">{{regPhoneText}}</p> -->
        </div>
      <!--   <div class="inputWrap">
          <input type="number" placeholder="인증번호 입력" name="" id="" >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import commonConfirmPop from '../../components/popup/confirmPop/Tal_commonConfirmPop.vue'
import { onMessage } from '../../assets/js/webviewInterface'
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
      isMobile: /Mobi/i.test(window.navigator.userAgent),
      inPhone: '',
      request_id: null,
      success: null,
      imp_uid: null,
      certiInfo: {}

      // regPhoneText:'휴대전화 형식이 아닙니다.'
    }
  },
  components: {
    commonConfirmPop
  },
  created () {
    // this.tempUser = JSON.parse(this.user)
    if (this.GE_USER) {
      this.tempUser = this.GE_USER
      if (this.routerYn) {
        this.mCertiMessage += '더알림에 함께하게 된 것을 환영합니다!<br>'
      } else {
        this.mCertiMessage += '실명인증을 통해 더 활발하게 활동해봐요!'
      }
      /* if (this.GE_USER.certiYn) {
        this.mCertiMessage = '현재 등록된 휴대폰 번호: ' + this.GE_USER.phoneEnc
      } */
    }
    const query = window.location.search
    if (query == null || query === '') {
      const nativeUrl = window.location.href
      /* nativeUrl = nativeUrl.replace('/#', '') */

      const url = new URL(nativeUrl)
      const urlParams = url.searchParams
      // eslint-disable-next-line no-debugger
      debugger
      if (!urlParams) return
      /*  alert(urlParams.get('imp_uid'))
      alert(urlParams.get('success'))
      alert(urlParams.get('request_id')) */
      this.imp_uid = urlParams.get('imp_uid')
      this.success = urlParams.get('success')
      this.request_id = urlParams.get('request_id')
      this.inName = urlParams.get('name')
      this.inPhone = urlParams.get('phone')
    } else {
      const param = new URLSearchParams(query)
      if (param != null) {
        this.imp_uid = param.get('imp_uid')
        this.success = param.get('success')
        this.request_id = param.get('request_id')
        this.inName = param.get('name')
        this.inPhone = param.get('phone')
      } else {
        alert('cannot get query!!')
      }
    }

    this.getCertiInfo()
    console.log(this.mCertiMessage)
  },
  props: {
    user: {},
    popYn: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_CERTI () {
      return this.$store.getters['D_USER/GE_CERTI']
    }
  },
  watch: {
    GE_CERTI: {
      handler (value, old) {
        this.imp_uid = value.certi.imp_uid
        this.success = value.certiYn
        this.request_id = value.certi.request_id
        this.inName = value.certi.inName
        this.inPhone = value.certi.inPhone
        this.getCertiInfo()
        // store.dispatch('D_USER/AC_SET_CERTI', message.certiInfo)
      },
      deep: true
    }
  },
  methods: {
    async getCertiInfo () {
      this.$showAxiosLoading(true)
      try {
      // 인증 토큰 발급 받기
        var paramMap = new Map()
        paramMap.set('imp_key', '6177573148818220')
        paramMap.set('imp_uid', this.imp_uid)
        paramMap.set('inPhone', this.inPhone)
        paramMap.set('inName', this.inName)
        paramMap.set('imp_secret', 'wTNFKJQlzH6slVXAQbbUQ92zEtEojkbbeJ9yqznuSDfcz3jzSJZE2ImNO6tZeS1AqclulDxikkYNaAq9')
        const getToken = await this.$commonAxiosFunction({
          url: '/sUniB/tpgetUserCertiInfo',
          param: Object.fromEntries(paramMap)
        })
        console.log(getToken)
        // eslint-disable-next-line camelcase

        // console.log(JSON.parse(access_token))
        if (getToken.data.result) {
          this.certiInfo = JSON.parse(getToken.data.certiInfo) // 인증 토큰
          await this.savePhone()
          // this.$showAxiosLoading(false)
          this.errorText = '인증되었습니다.'
          this.failPopYn = true
        }
      } catch (e) {
        console.error(e)
      }
    },
    async savePhone () {
      /* if (this.certiInfo.inName !== this.certiInfo.name) {
        this.$showToastPop('휴대폰명의자가 일치하지 않습니다.')
      } */
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      user.userKey = this.GE_USER.userKey
      user.phoneEnc = this.inPhone
      user.userNameMtext = this.inName
      user.certiYn = true
      param.user = user
      param.updateYn = true
      // var testYn = true
      // console.log(param)
      // if (testYn) return
      var result = await this.$changeDispName(param)
      // console.log(result)
      if (result.data) {
        this.$store.commit('D_USER/MU_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        /* this.$router.replace({ path: '/' })
        this.$emit('closeXPop') */
        this.$showToastPop('인증에 성공하였습니다!')
        // this.closeXPop()
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {

      }
    },
    telValidator (args) {
      const msg = '유효하지 않는 전화번호입니다.'
      // IE 브라우저에서는 당연히 var msg로 변경

      if (/^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/.test(args)) {
        return true
      }
      alert(msg)
      return false
    },
    onClickCertification () {
      if (this.inName === '') {
        this.$showToastPop('이름을 입력해주세요')
        return
      }
      var telValidYn = this.telValidator(this.inPhone)
      if (!telValidYn) return
      /* 가맹점 식별코드 */
      const userCode = 'imp44771042'

      /* 본인인증 데이터 정의하기 */
      this.inPhone = '0' + this.inPhone
      const data = {
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        name: this.inName, // 이름
        phone: this.inPhone // 전화번호
      }
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (isMobile) {
        /* 리액트 네이티브 환경에 대응하기 */
        const params = {
          userCode, // 가맹점 식별코드
          data, // 본인인증 데이터
          callbackUrl: '/#/savePhone',
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
    callback (data) {
      console.log(data)
      if (data.success === true) {
        this.imp_uid = data.imp_uid
        this.success = data.success
        this.request_id = data.request_id
        this.getCertiInfo()
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
