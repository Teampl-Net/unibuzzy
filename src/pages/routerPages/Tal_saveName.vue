<template>
<div class="introBackground">
  <commonConfirmPop v-if="failPopYn" @no="this.failPopYn=false" confirmType="timeout" :confirmText="errorText" />
    <div class="introWhiteCard" >
      <div class="pagePaddingWrap" style="padding-top: 20px;">
        <div class="mbottom-3 mtop-1">
          <img class="mbottom-05" src="../../assets/images/main/message_logo.png" style="width: 5rem" alt="">
          <p class="font20 mbottom-1 fontBold">반갑습니다!</p>
        </div>
        <div class="mt-header introText">
            <p v-html="'현재 등록되어 있는 이름이 없습니다. <br>이름을 입력해주세요.'"></p>
        </div>
        <div class="inputWrap">
          <input type="text" v-model="userName" placeholder="이름 입력" name="" id="" >
          <gBtnSmall @click="savePhone" btnTitle="등록" class="inputBtn" />
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
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
export default {
  data () {
    return {
      userName: '',
      tempUser: [],
      failPopYn: false,
      errorText: ''
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
    async savePhone () {
      var name = this.userName
      if (name !== undefined && name !== null && name !== '') {
        if (this.tempUser) {
          this.tempUser.name = name
        }
        // #@@@@@@@@@@@@@@@@@@@@ 이름 저장이 안된다면 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 에러가 난다면 @@@@@@@@@@@@@@@@@@@@@@@@@
        // if (this.tempUser.phoneEnc !== undefined && this.tempUser.phoneEnc !== null && this.tempUser.phoneEnc !== '') {
        await saveUser(this.tempUser) // 서버에 save요청
        this.$router.replace({ path: '/' })
        // } else { this.$router.replace({ name: 'savePhone', params: { user: JSON.stringify(this.tempUser) } }) }
      } else {
        this.errorText = '이름을 입력해주세요'
        this.failPopYn = true
      }
    }
  }
}
</script>
<style scoped>
.introText{width: 100%; height: 4rem;}
.introText p{text-align: left; font-weight: bold; color: rgb(74 102 158); font-size: 18px;}
.changeInfoWrap{height: 100vh; width: 100%;}
input{width: 100%; box-sizing: border-box; border:none; padding-right: 80px; height: 40px; line-height: 40px; font-size: 15px; border-bottom: 1px solid rgb(74 102 158);}
.inputWrap{margin-top: 0.5rem; width: 100%; position: relative;}
select{height: 40px; width: 160px; border: none;}
.inputBtn{position: absolute; right: 0.1rem; top: 0.3rem;}
</style>
