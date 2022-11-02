<template>
  <div class="wh-100P pSide-15 ptop-50 fl" style="position: relative;">

    <div class="queInfoRow fl ">
      <p class="fontBold  textLeft font16 fr" style="width: 100px;">명칭</p>
      <input class="fl" style="width: calc(100%);" v-model="InfoQueTitle" type="text" placeholder="멤버 정보 명을 입력해주세요." id="channelName">
    </div>

    <div class="queInfoRow fl ">
      <p class="fontBold  textLeft font16 fr" style="width: 100px;">유형</p>
      <select class="fr commonBlack" v-model="selectOption" @change="changeOption" style="border: 1px solid #ccc; width: calc(100%); min-height:30px;" >
        <option v-for="(answer, index) in options" :key="index" @click="selectOption = answer.InfoQueType" :value="answer.InfoQueType" class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem"> {{ answer.title }} </option>
      </select>
    </div>

    <tempDotline class="fl" style="border: 1px dashed #cccccc90; width:100%; height:1px;" />

    <div class="fl w-100P mtop-1" style="padding:0 1rem !important">

      <template v-if="selectOption === 'su'">
          <div class="fl w-100P" style="display: flex; justify-content: space-between;">
            <p class="fl font16 commonColr textLeft fontBold">제시글</p>
            <input class="fl" style="min-height:30px; background: #CCCCCC50 !important" type="text" disabled :placeholder="InfoQueTitle">
          </div>
          <div class="fr w-100P mtop-05">
            <gCheckBtn class="mleft-05 fr" title='글자수 최대' :selectedYn='maxLengthYn === true' @click="maxLengthYn = !maxLengthYn" />
            <input type="number" max="255" class="fr mleft-05" v-show="maxLengthYn === true" style="width:50px; min-height:30px;" v-model="maxLength">
          </div>
          <gCheckBtn class="mleft-05 fr mtop-05" title='숫자만 허용' :selectedYn='onlyNumYn === true' @click="onlyNumYn = !onlyNumYn" />
      </template>

      <template v-if="selectOption === 'si' || selectOption === 'siList'">
        <p class="w-100P fl font16 commonColr textLeft fontBold mbottom-05">선택항</p>

        <div class="fr mbottom-05" v-for="(list, index) in answerList" :key='index' >
          <input class="fl" type="text" v-model="list.answerName">

          <div class="fl mleft-05" style="width:50px; display:flex; gap:10px ">
            <img class="fl img-w20" src="../../../assets/images/board/icon_trash.svg" @click="deleteInfoQue(index)" alt="">
            <div class="fl movePoint" style="width: 30px; height: 100%; flex-shrink: 0; flex-grow: 0;background: rgba(255, 255, 255, 0.75); "><img src="../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt=""></div>
          </div>
        </div>
        <div class="fl w-100P mtop-1">
          <gBtnSmall :btnTitle="'추가'" @click="addInfo" class="mright-05" style="float:right !important;"/>
        </div>
      </template>

    </div>
    <div class="w-100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
      <gBtnSmall :btnTitle="'저장'" @click="save" class="mright-05" style=""/>
      <gBtnSmall :btnTitle="'닫기'" @click="closeXPop" class="mleft-05" style=""/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      selectOption: 'su',
      options: [{ title: '주관식', InfoQueType: 'su' }, { title: '객관식(드롭다운)', InfoQueType: 'si' }, { title: '객관식(리스트)', InfoQueType: 'siList' }],
      answerList: [{ answerName: '' }],
      answerTitle: '',
      InfoQueTitle: '',
      maxLengthYn: '',
      maxLength: 0,
      onlyNumYn: ''
    }
  },
  created () {
    console.log(' %%%%%%%%%%%%%%%%%%%%%% ')
    console.log(this.propData)
    if (this.propData && this.propData.data) {
      this.setting(this.propData.data)
    }
  },
  methods: {
    setting (data) {
      this.selectOption = data.InfoQueType
      this.InfoQueTitle = data.InfoQueTitle
      this.answerList = data.answerList
    },
    addInfo () {
      var temp = {}
      temp.answerName = ''
      this.answerList.push(temp)
    },
    deleteInfoQue (idx) {
      this.answerList.splice(idx, 1)
    },
    save () {
      var param = {}
      param.InfoQueTitle = this.InfoQueTitle
      param.InfoQueType = this.selectOption
      if (this.selectOption === 'su') {
        param.maxLengthYn = this.maxLengthYn
        if (this.maxLengthYn === true) param.maxLength = this.maxLength
        param.onlyNumYn = this.onlyNumYn
      } else {
        param.answerList = this.answerList
      }
      console.log(param)
      // this.$emit('saveMemInfoQuestion', param)

      this.$emit('closeXPop')
    },
    closeXPop () {
      this.$emit('closeXPop')
    }
  }

}
</script>

<style>
.queInfoRow {
  width: 100%;
  min-height: 30px;
  display: flex;
  padding: 0.8rem 0;
  align-items: flex-start;
}

.queInfoRow input {
  background: #fff !important;
  min-height: 30px !important;
  height: 100% !important;
  border: 1px solid #BEBBD4 !important;
  border-radius: 8px !important;
  padding-left : 10px;
  color: #505050;
}
.queInfoRow input::placeholder {
  color: #BDBDBD;
}
</style>
