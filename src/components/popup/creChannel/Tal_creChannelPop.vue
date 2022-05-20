<template>
  <div style="width: 100%; height: 100%; padding: 0 20px;">
      <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;display: flex; justify-content: space-between;">
        <p class="fl" @click='clickPrevBtn' >뒤로</p>
        <p class="fontBold">{{selectedBType}} 채널 생성</p>
        <p class="fr" @click="clickExit">X</p>
      </div>
      <!-- <div  style=" float: left; width: 100%; height: calc(100% - 180px); margin-top: 50px; overflow:auto;"> -->
      <!-- <div  style=" float: left; width: 100%; height: calc(100% - 180px);  overflow:auto;"> -->
        <div  style=" float: left; width: 100%; height: calc(100% - 110px);  overflow:auto;">

        <selectChanType @makeParam="setParam" ref="step0" v-if="creStep === 0" />
        <!-- <creStep01 ref="step1" @makeParam="setParam" v-else-if="creStep === 1" />
        <creStep02 ref="step2" @makeParam="setParam" v-else-if="creStep === 2" />
        <creStep03 ref="step3" @makeParam="setParam" v-else-if="creStep === 3" /> -->
        <!-- <creStep04 ref="step4" @makeParam="setParam" v-else-if="creStep === 4" /> -->
      </div>
      <!-- <div v-if="creStep !== 0" style="width: 100%; height: 50px; float: left; display: flex; align-items: center; justify-content: center; "> -->
      <div v-if="creStep !== 0" style="width: 100%; height: 50px; float: left; display: flex; align-items: center; justify-content: center; width: 90%; position: fixed; bottom: 10px; left: 5%;">
        <gBtnSmall @click="clickPrevBtn" btnThema="light" class="fl" style="float: left!important; margin-right: 10px; width:100px; height:50px; line-height:50px;font-size:18px" btnTitle="이전" />
        <gBtnSmall btnThema="" @click="changePage" class="fl" style="float: left!important; width:100px; height:50px; line-height:50px; font-size:18px " btnTitle="다음" />
      </div>
  </div>
</template>

<script>
import selectChanType from './Tal_creChannelStep00.vue'
import creStep01 from './Tal_creChannelStep01'
import creStep02 from './Tal_creChannelStep02'
import creStep03 from './Tal_creChannelStep03'
// import creStep04 from './Tal_creChannelStep04'
export default {
  data () {
    return {
      creStep: 0,
      g_param: {}
    }
  },
  props: {
    selectedBType: {}
  },
  methods: {
    changePage () {
      // alert(true)
      if (this.creStep === 1) {
        this.$refs.step1.setParam()
      } else if (this.creStep === 2) {
        this.$refs.step2.setParam()
      } else if (this.creStep === 3) {
        this.$refs.step3.setParam()
      }
    },
    clickPrevBtn () {
      if (this.creStep === 0) { this.$emit('closePop') } else {
        this.creStep -= 1
      }
    },
    clickExit(){
      this.$emit('closePop')
    },
    async setParam (inputParam) {
      // alert(inputParam.teamType+'\n' + inputParam.teamIcon+'\n'+inputParam.teamBack+'\n'+inputParam.teamkeyword)



      this.g_param.teamType = inputParam.teamType
      this.g_param.nameMtext = inputParam.teamNmae
      this.g_param.teamMemo = inputParam.teamMemo
      this.g_param.teamIcon = inputParam.teamIcon
      this.g_param.teamBack = inputParam.teamBack
      this.g_param.teamkeyword = inputParam.teamkeyword

      // alert(this.g_param.teamType+'\n'+ this.g_param.nameMtext +'\n'+ this.g_param.teamMemo)



      // eslint-disable-next-line no-new-object
      // var param = new Object()
      /* // eslint-disable-next-line no-new-object
      var channel = new Object()
       */
      // alert(JSON.stringify(inputParam))
      if (inputParam.pageType === 0) {
        this.g_param.teamType = inputParam.teamType
        this.creStep += 1
      }
      if (inputParam.pageType === 1) {
        this.g_param.nameMtext = inputParam.nameMtext
        this.g_param.memoMtext = inputParam.memoMtext
        this.creStep += 1
      } else if (inputParam.pageType === 2) {
        this.g_param.masterNameMtext = inputParam.masterNameMtext
        this.g_param.masterTel = inputParam.masterTel
        this.g_param.teamAddress = inputParam.teamAddress
        this.g_param.legacyId = inputParam.legacyId
        this.creStep += 1
      } else if (inputParam.pageType === 3) {
        this.g_param.managerNameMtext = inputParam.managerNameMtext
        this.g_param.managerTel = inputParam.managerTel
        await this.$requestCreChan(this.g_param)
        this.$emit('successCreChan')
      }




      // this.$emit('createChannel', param)
    }
  },
  computed: {
  },
  components: {
    selectChanType,
    creStep01,
    creStep02,
    creStep03
    // creStep04
  }
}
</script>
<style scoped>
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanInput{width: calc(100% - 120px); height: 30px; border: none; border: 1px solid #ccc; border-radius: 5px; padding: 0 10px;}
.creChanInputLabel{width: 100px; margin-top: 3px; height: 30px; text-align: left; font-size: 14px; margin-right: 10px;}
.creChanInputWrap{width: 100%; height: 40px;}

.categoryBox{min-width: 100px; padding: 0 10px; margin-right: 5px; height: 25px;float: left; border-radius: 5px;}

.creChanBigBtn{width: 100%; height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;}
</style>
