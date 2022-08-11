<template>
    <draggable @end="changePosTeamMenu" handle=".draggablePointer" class="ghostClass" v-model="questionList" ghost-class="ghost" style="padding-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"  >
      <transition-group>
        <div v-for="(data, index) in questionList" :key="index" class="fl w-100P mtop-05 mbottom-05 mQuestionCard" >
          <div class="draggablePointer fl" style="position: absolute; left:0; top:0; width:25px; height:100%; background-color:#eeeeee; border-radius:10px 0 0 10px; display:flex; " >
            <img style="width:100%;" src="../../../assets/images/formEditor/scroll.svg" alt="">
          </div>
          <div style="width:calc(100% - 30px);" class="fr">
            <div class="questionTopArea fl w-100P" style="line-height:20px">
              <input class="fl" type="text" v-model="data.questionTitle">
              <select class="fr commonBlack" v-model="data.questionType" style="border: 1px solid #ccc; padding:0 5px" > <option v-for="(option, index) in options" :key="index" class="commonBlack" v-bind:value="option.value"> {{ option.text }} </option> </select>
            </div>
            <div class="questionMiddleArea">
              <div v-if="data.questionType === 'su' || data.questionType === 'at'" class="w-100P fl mtop-05" style="width:100%; background:white; border: 1px dashed #ccc; padding-left:0.5rem;" :style="data.questionType === 'at' ? 'padding: 1rem 0;' : 'background-color:#eeeeeeee'">
                <p v-if="data.questionType === 'su'" class="lightGray fl textLeft font16">텍스트 </p>
                <img v-if="data.questionType === 'at'" style="width:20px;" src="../../../assets/images/channel/Image_icon.svg" >
              </div>
              <div v-if="data.questionType === 'si' || data.questionType === 'mu'" class="w-100P fl mtop-05 textLeft" >
                <div v-for="(answer, answerindex) in data.answerList" :key="answerindex" class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem">
                  <div class="fl " style="width:15px; height:15px; border:1px solid #ccc;" :style="data.questionType === 'si' ? 'border-radius:100%;' : '' " />
                  <div class="w-100P" style="position: relative;">
                    <input class="fl mleft-05 questionAnswerInput" type="text" style="" :value="answer.answerName">
                    <div class="fl mleft-05 under-bar" />
                  </div>
                </div>
                <p @click="emit(data, index, 'addAnswerClick')" class="fl commonColor font14 fontBold mtop-05 mleft-12">+ 추가</p>
              </div>

            </div>
            <div class="questionBottomArea fl w-100P mtop-1" >
              <img style="width:15px;" @click="emit(data, index, 'mQCopy')" class="fl" src="../../../assets/images/channel/Copy_icon.svg" alt="">
              <img style="width:20px;" @click="emit(data, index, 'mQDelete')" class="fr" src="../../../assets/images/channel/Trash_icon.svg" alt="">
              <div class="fl mleft-1">
                <label :for="data.questionKey" class="font14 fl">필수</label>
                <gToggle :toggleId='data.questionKey' class="fl mleft-05" @changeToggle='setManager' :isChecked="data.essentialYn" />
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
  <div style="width:100%; height:50px;" class="fl">
  </div>
</template>
<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: { draggable: VueDraggableNext },
  props: {
    list: {}
  },
  // computed(){
  //   inputWidth(){
  //     return '--inputWidth'
  //   }
  // }
  created () {
    console.log(this.list)
    if (this.list) {
      this.questionList = this.list
    }
  },
  data () {
    return {
      questionList: [],
      options: [{ value: 'su', text: '주관식' }, { value: 'si', text: '단일선택' }, { value: 'mu', text: '복수선택' }, { value: 'at', text: '첨부파일' }]

    }
  },
  methods: {
    emit (data, index, type) {
      var param = {}
      param.data = data
      param.index = index
      this.$emit(type, param)
      // if (type === 'mQCopy') {
      //   this.$emit('mQCopy', param)
      // } else {
      //   this.$emit('mQDelete', param)
      // }
    }
  }
}
</script>
<style>
.mQuestionCard{
  border-radius:10px; background:white; padding:1rem 1rem 1rem 0; box-shadow: 0px 4px 9px 0px #00000040; position: relative;
}
.questionMiddleArea{
  width: 70%;
}
.questionAnswerInput{
  background: white !important;
  border: none !important;
  border-bottom: 1px dashed #ccc !important;
  position: relative;
  width:100%;
  /* width:var(--inputWidth); */

}
.questionAnswerInput:focus + .under-bar{
  position: absolute;
  bottom:0;
  right: 0;
  background-color: #6768a7;
  animation: progres 0.3s linear forwards;
}
.under-bar{
  position: relative;
  height: 2px;
  width: 100%;
  background-color:none;

}

@keyframes progres{
    0%{
      width: 0%;
      left: 50%;
    }
    /* 25%{
        width: 50%;
        left: 25%;
    } */
    50%{
        width: 75%;
        left: 12.5%;
    }
    /* 75%{
        width: 85%;
        left: 7.5%;
    } */
    100%{
        width: 100%;
        left: 0%;
    }
}
</style>
