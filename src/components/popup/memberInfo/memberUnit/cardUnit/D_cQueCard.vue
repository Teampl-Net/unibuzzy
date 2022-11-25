<template>
<div class="fl w-100P" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;" :style="this.propData.itemType === 'siList' ? 'align-items: flex-start;' : ''">
  <div class="fl " style="flex:1">
    <p class="fl textLeft fontBold font16 commonDarkGray" style="">{{this.$changeText(propData.itemNameMtext)}}</p>
  </div>
  <div class="fl" style="width: calc(100% - 200px); flex:2" @click="emit('editQue')">
    <template v-if="propData.itemType === 'T'">
      <div class="fr w-100P" style="background:white; border: 1px dashed #ccc; padding-left:0.5rem;" >
        <p class="lightGray fl textLeft font16">텍스트</p>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'F' && options">
      <div class="fr textLeft w-100P">
        <select class="fr commonDarkGray" v-model="selectOption" style="border: 1px solid #ccc; width:100%; min-height:30px" >
            <option hidden selected>선택하세요</option>
            <option class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem" :value="sub" v-for="(sub, subIndex) in convertSelectListStr(typeItem.optListStr)" :key="subIndex">{{sub}}</option>{{ answer.answerName }}
        </select>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'L' && options">
      <div class="fr textLeft w-100P" >
        <div class="fr w-100P mbottom-05 commonDarkGray" v-for="(value, aIndex) in convertSelectListStr(typeItem.optListStr)" :key="aIndex">
          <gCheckBtn class="fr commonDarkGray" :title="value" :selectedYn="selectOption === value" @click="selectOption = value"/>
        </div>
      </div>
    </template>

  </div>

  <div class="fr mleft-05" style="width:50px; display:flex; justify-content: space-between; gap:10px: flex:1">
    <!-- <img class="fl img-w20" src="../../../../../assets/images/board/icon_edit.svg" @click="emit('editQue')" alt=""> -->
    <img class="fl img-w20" src="../../../../../assets/images/board/icon_trash.svg" @click="emit('deleteQue')" alt="">
    <!-- <div class="fl movePoint" style="width: 30px; height: 100%; flex-shrink: 0; flex-grow: 0;background: rgba(255, 255, 255, 0.75); "><img src="../../../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt=""></div> -->
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
    },
    convertSelectListStr (str) {
      var returnList = null
      returnList = str.split('$#$')
      return returnList
    }
  }
}
</script>
<style>
.leftTabBase{
}
</style>
