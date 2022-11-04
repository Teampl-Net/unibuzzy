<template>
<div class="fl w-100P" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;" :style="this.propData.InfoQueType === 'siList' ? 'align-items: flex-start;' : ''">
  <div class="fl " style="width:100px">
    <p class="fl textLeft fontBold font16 commonDarkGray" style="">{{propData.InfoQueTitle}}</p>
  </div>

  <div class="fl" style="width: calc(100% - 200px);">

    <template v-if="propData.InfoQueType === 'su'">
      <div class="fr w-100P" style="background:white; border: 1px dashed #ccc; padding-left:0.5rem;">
        <p class="lightGray fl textLeft font16">텍스트 </p>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'si' && options">
      <div class="fr textLeft w-100P">
        <select class="fr commonDarkGray" v-model="selectOption" style="border: 1px solid #ccc; width:100%; min-height:30px" >
          <option v-for="(answer, index) in options" :key="index" class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem">
            {{ answer.answerName }}
          </option>
        </select>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'siList' && options">
      <div class="fr textLeft w-100P" >
        <div class="fr w-100P mbottom-05 commonDarkGray" v-for="(value, aIndex) in options" :key="aIndex">
          <gCheckBtn class="fr commonDarkGray" :title="value.answerName" :selectedYn="selectOption === value.answerName" @click="selectOption = value.answerName"/>
        </div>
      </div>
    </template>

  </div>

  <div class="fr mleft-05" style="width:80px; display:flex; justify-content: space-between; gap:10px ">
    <img class="fl img-w20" src="../../../../../assets/images/board/icon_edit.svg" @click="emit('editQue')" alt="">
    <img class="fl img-w20" src="../../../../../assets/images/board/icon_trash.svg" @click="emit('deleteQue')" alt="">
    <div class="fl movePoint" style="width: 30px; height: 100%; flex-shrink: 0; flex-grow: 0;background: rgba(255, 255, 255, 0.75); "><img src="../../../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt=""></div>
  </div>

</div>

</template>
<script>
export default {
  props: {
    propData: {},
    compoIdx: {}
  },
  data () {
    return {
      options: {},
      selectOption: {}
    }
  },
  created () {
    if (this.propData.InfoQueType === 'si' || this.propData.InfoQueType === 'siList') {
      this.options = this.propData.answerList
      this.selectOption = this.propData.answerList[0].answerName
    }
  },
  methods: {
    emit (type) {
      var param = {}
      param.targetType = type
      param.data = this.propData
      param.index = this.compoIdx
      this.$emit('cardEmit', param)
    }
  }
}
</script>
<style>
.leftTabBase{
}
</style>
