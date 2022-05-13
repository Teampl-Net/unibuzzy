<template>
    <div class="gTitleWrap" :class="this.pageType === 'manageChan' ? 'mbottomNoneIm': ''">
      <img src="../../../assets/images/main/icon_channer.png" style="float: left; margin-top: 0.3rem;width: 1rem; margin-right: 0.5rem" alt="">
      <span style="line-height: 30px;">{{titleText}}</span><span style="background: #6768A7; width: 2px; margin-top: 0.45rem; height: 15px; margin-right: 0.3rem"></span><span style="line-height: 30px;"> {{this.selectedChan}}</span>
      <div v-if="this.pageType === 'writePush'" style="width: 100%; height: 4rem; float: none;">
          <gWhiteButton btnName="발송하기" v-on:click="clickE('sendPushMsg')" class="mright-05"/>
          <gWhiteButton btnName="임시저장" v-on:click="clickE('requestTS')" />
      </div>
      <div v-if="this.pageType === 'manageChan'" style="width: 100%; height: 2rem; float: none;">
          <gBtnSmall style="float: left; margin-top: 3px;" btnTitle="생성하기" v-on:click="clickE('createChan')" class=""/>
          <!-- <gSearchBox class="fr mbottom-05" @searchKey = "getSearchKey"/> -->
          <select style="float: right; width: 100px; height: 27px; border-radius: 5px; border: 1px solid #ccc;" name="" id="">
            <option value="01">신청</option>
            <option value="02">진행중</option>
            <option value="09">진행거절</option>
            <option value="10">생성완료</option>
            <option value="18">진행중지</option>
            <option value="19">채널탈퇴</option>
          </select>
      </div>
      <div v-if="this.pageType === 'chanMain'" style="width: 100%; height: 2rem; float: none;">
      </div>
      <!-- <gWhiteButton v-if="this.btnYn === true" v-on:click="clickE(this.clickEvnt)" :btnName="this.btnTitle" class="mainBigTitleBtn" /> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectedChan: ''
    }
  },
  created () {
    this.selectedChan = this.$changeText(JSON.parse(localStorage.getItem('sessionTeam')).nameMtext)
  },
  props: {
    titleText: {},
    pageType: {},
    btnTitle: {},
    clickEvnt: {}
  },
  methods: {
    clickE (evnt) {
      this.$emit('clickEvnt', evnt)
    },
    getSearchKey (searchKey) {
      this.$emit('getSearchKey', searchKey)
    }
  }
}
</script>
<style scoped>
.gTitleWrap{width: 100%; height: 2.7rem; float: left; border-bottom: 1px solid #E1E1E1; background: #FFF; padding: 9px 0; padding-bottom: 1rem;}
.gTitleWrap >span{color: #6768A7; font-size: 17px; font-weight: bold; float: left; margin-right: 1rem;}
.mainBigTitleBtn{margin-top: -0.3rem;}
.mbottomNoneIm{margin-bottom: 0!important;}
</style>
