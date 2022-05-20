<template>
    <div class="gTitleWrap" >
      <!-- <img src="" style="float: left; margin-top: 0.3rem;width: 1rem; margin-right: 0.5rem" alt=""> -->
      <span style=" margin-left:10px;">{{titleText}}</span>
      <span style="background: #6768A7; width: 2px; margin-top: 0.3rem; height: 15px; margin-right: 0.3rem"></span>
      <span style="line-height: 30px;"> {{this.selectedChan}}</span>
      <div v-if="this.pageType === 'writePush'" style="width: 100%; height: 4rem; float: none;">
          <gBtnSmall class="mright-05" btnTitle='발송하기' @click="clickE('sendPushMsg')" />
          <gBtnSmall class="mright-05" btnTitle='임시저장' @click="clickE('requestTS')" />
          <!-- <gWhiteButton btnName="발송하기" v-on:click="clickE('sendPushMsg')" class="mright-05"/>
          <gWhiteButton btnName="임시저장" v-on:click="clickE('requestTS')" /> -->
      </div>
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
    // this.selectedChan = this.$changeText(JSON.parse(localStorage.getItem('sessionTeam')).nameMtext)
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

<style >
.gTitleWrap{width: 100%; height: 2.7rem; float: left; border-top: 1px solid #E1E1E1; border-bottom: 1px solid #E1E1E1; background: #FFF; padding: 9px 0; padding-bottom: 1rem;}
.gTitleWrap >span{color: #6768A7; font-size: 17px; font-weight: bold; float: left; margin-right: 1rem;}

</style>
