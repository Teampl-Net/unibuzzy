<template>
<div class="introBackground">
  <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
    <div class="introWhiteCard" style=" min-height: 450px;">
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="mbottom-3 mtop-1">
          <img class="mbottom-05" src="../../assets/images/main/message_logo.png" style="width: 5rem" alt="">
          <p class="font20 mbottom-1 fontBold">환영합니다!</p>
        </div>
        <div class="mtop-1 introText mbottom-3">
            <p v-html="'현재 등록되어 있는 휴대폰 번호가 없습니다. <br>휴대폰 번호를 등록해주세요'"></p>
        </div>
       <!--  <div class="textLeft">
          <select>
            <option>대한민국(+82)</option>
          </select>
        </div> -->
        <div class="inputWrap mtop-1">
          <input type="tel" v-model="phoneNum" placeholder="휴대전화 번호입력" name="" id="" >
          <gBtnSmall @click="savePhone" btnTitle="등록" class="inputBtn" />
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
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction'
export default {
  data () {
    return {
      phoneNum: '',
      tempUser: [],
      failPopYn: false,
      errorText: ''

      // regPhoneText:'휴대전화 형식이 아닙니다.'
    }
  },

  created () {
    this.tempUser = JSON.parse(this.user)
  },
  props: {
    user: {}
  },
  components: {
    commonConfirmPop
  },
  methods: {
    regPhoneNumber (text) {
      var regPhone = /^(?:(010-\d{4})|(01[0|1|6|7|8|9]-\d{3,4}))-(\d{4})$/
      var regPhone1 = /^(?:(010\d{4})|(01[0|1|6|7|8|9]\d{3,4}))(\d{4})$/
      if (regPhone.test(text) === true || regPhone1.test(text) === true) {
        return true
      } else {
        return false
      }
    },
    async savePhone () {
      var mobileN = this.phoneNum
      if ((mobileN !== undefined && mobileN !== null && mobileN !== '') && this.regPhoneNumber(this.phoneNum) === true) {
        if (this.tempUser) {
          this.tempUser.phoneEnc = mobileN
        }
        /* if (this.tempUser.name !== undefined && this.tempUser.name !== null && this.tempUser.name !== '' && this.tempUser.name !== '0' && this.tempUser.name !== 0) { */
        await saveUser(this.tempUser) // 서버에 save요청
        this.$router.replace({ path: '/' })
        /* } else {
          this.$router.replace({ name: 'saveName', params: { user: JSON.stringify(this.tempUser) } }
          )
        } */
        // this.$router.replace({ path: '/' })
      } else {
        this.failPopYn = true
        this.errorText = '휴대폰 번호를 확인해주세요.'
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: #6768A7; font-size: 18px;}
.changeInfoWrap{height: 100vh; width: 100vw;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid #6768A7;}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}

  .savePhoneHeader {margin-top: 14px; line-height: 27px}
  .savePhoneHeader p{ color: #6768A7; font-weight: bold;}
  .savePhoneHeader .headerFont{line-height: 32px}

.noSavePhone{color: #b60707;}

</style>
