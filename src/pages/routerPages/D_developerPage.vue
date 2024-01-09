<template>
  <div class="w100P h100P textCenter developerWrap">
    <!-- <img class="MZDevelopImg" src="../assets/img/example/KakaoTalk_20210713_114637815.jpg" /> -->
    <div class="w100P fl mTop-10">이모삼촌 안녕 (아루랑 보리도)</div>
    <div class="border2Bottom mTop-20 mBottom-20"></div>
    <div class="w100P fl p-20 patchArea">
        <p class="textLeft mRight-10 fl commonTitleText">패치등록!</p>
        <p class="textLeft mRight-30 fl commonNormalText">마지막 패치 {{ mPatchTime }}</p>
        <input class="fl patchInput" type="text" v-model="mPassword" placeholder="비밀번호 입력" />
        <gBtnSmall class="mtop-1" :btnTitle="mBtnList[1].btnText" @click="mBtnList[1].onClickFn" />
    </div>
  </div>
</template>
<script>
export default {
  async created () {
    if (localStorage.getItem('patchTime')) this.mPatchTime = localStorage.getItem('patchTime')
  },
  data () {
    return {
      mPatchTime: '',
      mPassword: '',
      mGojiEndDate: '',
      mGojiString: '',
      mBtnList: [
        { btnType: 'noBorder', btnText: '등록하기', pointYn: true, onClickFn: this.saveGoji },
        { btnType: 'noBorder', btnText: '실행', pointYn: true, onClickFn: this.savePatchTime }
      ]
    }
  },
  methods: {
    async savePatchTime () {
      const param = {
        patchTime: '',
        password: ''
      }
      const getCurrentDate = this.getCurrentDate(new Date())
      param.patchTime = getCurrentDate
      param.password = this.mPassword
      const result = await this.$commonAxiosFunction({
        url: 'https://www.hybric.net:9443/service/tp.saveSystemSettingTime',
        param: param
      })
      if (result.data.result) this.mPatchTime = getCurrentDate
    },
    getCurrentDate (date) {
      if (!date) {
        date = new Date()
      } else {
        date = new Date(date)
      }
      const year = date.getFullYear().toString()

      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month.toString() : month.toString()

      let day = date.getDate()
      day = day < 10 ? '0' + day.toString() : day.toString()

      let hour = date.getHours()
      hour = hour < 10 ? '0' + hour.toString() : hour.toString()

      let minites = date.getMinutes()
      minites = minites < 10 ? '0' + minites.toString() : minites.toString()

      return year + month + day + hour + minites
    }
  }
}
</script>

<style scoped>
.developerWrap {
  display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.developImg {
  width: 20%; max-width: 300px;margin-top: 50px;
}
.border2Bottom {
  width: 100%; height: 2px; background: #ccc;
}
.patchInput {
  padding-left: 5px; width: 200px; height: 30px; border: 1px solid #aaa;
}
.patchArea {
  display: flex ;
  align-items: center;
}
</style>
