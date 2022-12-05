<template>
<div class="fl w-100P" style="display: flex; align-items: center;" :style="this.propData.itemType === 'siList' ? 'align-items: flex-start;' : ''">
  <!-- <div style="width: 30px; display: flex; align-items: center;" >
    <p class="textLeft fontBold font16 commonDarkGray" style="line-height: 30px;">{{(compoIdx + 1) + '.'}}</p>
  </div> -->
  <div  style="width: calc(100% - 90px); margin-right: 10px;" class="movePoint">
    <div @click="modiItemDetail('editQue')" class=" w-100P cursorP" style="border-bottom: 1px solid #ccc; height: 30px; padding: 0 5px;" >
    <!-- <p class="lightGray fl textLeft font16">텍스트</p> -->
        <p class=" textLeft font14 lightGray textOverdot" style="line-height: 30px;">{{this.mTypeItemDetailMessage}}</p>
    </div>

    <!-- <template v-if="propData.InfoQueType === 'F' && options">
      <div class="fr textLeft w-100P">
        <p class="fl textLeft fontBold font16 lightGray" style="">{{this.$changeText(propData.itemNameMtext)}}</p>
        <select class="fr commonDarkGray" v-model="selectOption" style="border: 1px solid #ccc; width:100%; min-height:30px" >
            <option hidden selected>선택하세요</option>
            <option class="fl w-100P" style="display: flex; align-items: center; padding-bottom:0.5rem" :value="sub" v-for="(sub, subIndex) in convertSelectListStr(typeItem.optListStr)" :key="subIndex">{{sub}}</option>{{ answer.answerName }}
        </select>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'L' && options">
      <div class="fr textLeft w-100P" >
        <p class="fl textLeft fontBold font16 lightGray" style="">{{this.$changeText(propData.itemNameMtext)}}</p>
        <div class="fr w-100P mbottom-05 commonDarkGray" v-for="(value, aIndex) in convertSelectListStr(typeItem.optListStr)" :key="aIndex">
          <gCheckBtn class="fr commonDarkGray" :title="value" :selectedYn="selectOption === value" @click="selectOption = value"/>
        </div>
      </div>
    </template> -->

  </div>

  <div class="fr " style="width:70px; margin-left: 5px; display:flex;  align-items: center; justify-content: flex-end; ">
    <!-- <img class="fl img-w20" src="../../../../../assets/images/board/icon_edit.svg" @click="emit('editQue')" alt=""> -->
    <!-- <img class="fl img-w20 cursorP" style="height: 20px; margin-right: 8px;" src="../../../../../assets/images/push/noticebox_edit.png"  alt=""> -->
    <!-- <div style="width: 20px; margin-left: 10px; height: 18px; border: 1.5px solid #DC143C; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
        <p class="fl img-w20 cursorP commonRed" style="height: 20px; margin-bottom: 12px;"  @click="modiItemDetail('deleteQue')">-</p>
    </div> -->
    <div style="margin-right: 5px; width: 20px; margin-left: 5px; height: 20px; border: 1px solid #5F61BD; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
        <p class="fl img-w20 commonColor cursorP" style="height: 20px; margin-bottom: 12px;"  @click="modiItemDetail('add')">+</p>
    </div>
    <div style="margin-right: 10px; width: 20px; margin-left: 5px; height: 20px; border: 1px solid #5F61BD; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
        <p class="fl img-w20 commonColor cursorP" style="height: 20px; margin-bottom: 12px;"  @click="modiItemDetail('delete')">-</p>
    </div>
    <div class="f itemMovePoint cursorP" style="width: 30px; margin-left: 5px; height: 100%; display: flex; align-items: center; background: rgba(255, 255, 255, 0.75); ">
        <img src="../../../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt="">
    </div>
    <!-- <img class="fl img-w20" src="../../../../../assets/images/board/icon_trash.svg" @click="modiItemDetail('deleteQue')" alt=""> -->
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
      selectOption: {},
      mTypeItemDetailMessage: ''
    }
  },
  created () {
    console.log(this.propData)
    this.setMemberItemDetailText()
    if (this.propData.InfoQueType === 'si' || this.propData.InfoQueType === 'siList') {
      this.options = this.propData.answerList
      this.selectOption = this.propData.answerList[0].answerName
    }
  },
  watch: {
    propData: {
      handler (value, index) {
        if (!value) return
        this.setMemberItemDetailText()
      },
      deep: true
    }
  },
  methods: {
    setMemberItemDetailText () {
      this.mTypeItemDetailMessage = this.$changeText(this.propData.itemNameMtext) + '('
      console.log(this.propData)
      if (this.propData.itemType === 'T') {
        this.mTypeItemDetailMessage += '주관식'
        if (this.propData.maxLen) {
          this.mTypeItemDetailMessage += '/최대' + this.propData.maxLen + '글자'
        }
        if (this.propData.numberYn) {
          this.mTypeItemDetailMessage += '/숫자만'
        }
      } else if (this.propData.itemType === 'L') {
        this.mTypeItemDetailMessage += '객관식/리스트'
      } else if (this.propData.itemType === 'F') {
        this.mTypeItemDetailMessage += '객관식/드롭다운'
      }
      this.mTypeItemDetailMessage += ')'
    },
    modiItemDetail (type) {
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
