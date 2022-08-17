<template>
<div class="pagePaddingWrap questionListWrap " >
  <div style="width: 100%; height: calc(30% - 60px); position: absolute; left: 0; padding: 1rem;">
    <div class="fl w-100P" style="">
      <p class="fl font18" style="min-width:32px">제목</p>
      <input class="fr" style="width:calc(90% - 32px);" type="text" >
    </div>
    <div class="fl w-100P mtop-05" style="">
      <p class="fl font18" style="min-width:32px">설명</p>
      <!-- <input class="fr" style="width:calc(90% - 32px); height:50px;" type="text"  > -->
      <div id="memberFormExplan" class="fr editableContent"  style="width:calc(90% - 32px); background:ghostwhite; min-height:3rem; text-align:left; border: 1px solid #ccc; resize: none;"  contenteditable=true >

      </div>
    </div>
  </div>

  <div style="background-color:#f0ebf8; width:100%; height:70%; margin-top:1rem; position: absolute; bottom:0; left:0;padding-top:1rem; box-shadow: inset 0px 1px 5px 0px #ccc;" class="fl" >
    <draggable @end="changePosTeamMenu" class="ghostClass" v-model="questionList" ghost-class="ghost" style="padding-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"  >
    <transition-group>
      <div v-for="(list, index) in questionList" :key="index" @click="editCardSet(list, index)" class="fl w-100P questionListCard" style="min-height:50px; margin-bottom:1rem" :style="index === (questionList.length-1) ? 'border-bottom: none;' : '' ">
        <div class="fl movePointerArea" style="width: 20px; background: rgb(242 242 242); display: flex; align-items: center; justify-content: center; height: 100%; position: absolute; left: 0; top: 0;" >
          <img src="../../../assets/images/formEditor/scroll.svg" style="width: 100%;" alt="" >
        </div>

        <p class="fl font16" style="margin-left:1rem;">{{list.questionTitle}}</p>
        <gToggle :toggleId='list.questionKey' @changeToggle='setManager' :isChecked="list.questionYn" class="fr" />

        <div v-show="editIndex === index" class="fl w-100P" style="padding :0 1rem 1rem 1rem;">
          <input type="text" v-model="inputQuestionTitle" placeholder="질문 제목" class="fl" style="width:calc(100% - 6.5rem); height:50px;">
          <select style="min-width: 6rem; min-height:50px; border: 1px solid #ccc; border-radius: 5px; " class="fl mleft-05 commonBlack" name="" id="questionOption" v-model="questionOption">
            <option value="Multiple">객관식</option>
            <option value="Descriptive">주관식</option>
          </select>
          <div v-if="questionOption === 'Multiple'" class="fl w-100P" style="">
            <div class="fl "> <input type="checkbox" id="MultipleCheck"> <label for="MultipleCheck">옵션1</label></div>
            <p @click="addOption()" class="fl font14 w-100P textLeft">추가..</p>
          </div>

          <div v-if="questionOption === 'Descriptive'" class="fl w-100P" style="">
            <div class="w-100P fl mtop-05" style=" max-width:50%; min-width:50px; min-height:30px; background-color:ghostwhite; border-bottom:1px dotted #ccc">
              <p class="fl font14 mleft-05" style="min-height:30px;">텍스트</p>
            </div>
          </div>

        </div>

      </div>
    </transition-group>
    </draggable>
  </div>

</div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: { draggable: VueDraggableNext },
  props: {
    propData: {}
  },
  data () {
    return {
      questionList: [
        { questionKey: 1, questionTitle: '나이', questionYn: true },
        { questionKey: 2, questionTitle: '성별', questionYn: true }
      ],
      editIndex: 0,
      questionOption: 'Multiple',
      inputQuestionTitle: ''
    }
  },
  created () {
    console.log(this.propData)
  },
  methods: {
    editCardSet (data, index) {
      this.inputQuestionTitle = data.questionTitle
      this.editIndex = index
    },
    addDirect () {

    },
    addOption () {

    }

  }
}
</script>

<style >
.questionListWrap { box-sizing: border-box; width: 100%; position: relative;}
.questionListCard {
  /* padding-top: 1rem; */
  line-height: 50px;
  border-bottom : 1px solid #ccc;
  padding: 0 1rem;
  background: white;
  position: relative;
}

</style>
