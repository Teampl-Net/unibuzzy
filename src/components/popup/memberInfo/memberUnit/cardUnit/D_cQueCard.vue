<i18n>
{
  "ko": {
    "MEM_DETAIL_NAME_SHORT": "주관식",
    "MEM_DETAIL_NAME_CHOICE": "객관식",
    "MEM_DETAIL_BNT_NUMONLY": "숫자만",
    "MEM_DETAIL_NAME_DROP": "드롭다운",
    "MEM_DETAIL_NAME_LIST": "리스트"
  },
  "en": {
    "MEM_DETAIL_TITLE_ADDINFO": "Additional information",
    "MEM_DETAIL_NAME_SHORT": "Short Answer",
    "MEM_DETAIL_NAME_CHOICE": "Multiple choice",
    "MEM_DETAIL_BNT_NUMONLY": "Number Only",
    "MEM_DETAIL_NAME_DROP": "Drop Down",
    "MEM_DETAIL_NAME_LIST": "List"
  }
}
</i18n>
<template>
<div class="fl w100P flexAlignCenter" :style="this.propData.itemType === 'siList' ? 'align-items: flex-start;' : ''">
  <!-- <div style="width: 30px; display: flex; align-items: center;" >
    <p class="textLeft fontBold font16 commonDarkGray" style="line-height: 30px;">{{(compoIdx + 1) + '.'}}</p>
  </div> -->
  <div class="movePoint">
    <div @click="modiItemDetail('editQue')" class="w100P cursorP queItemTitle">
    <!-- <p class="lightGray fl textLeft font16">텍스트</p> -->
      <p class=" textLeft font14 lightGray textOverdot lineHeight30">{{this.mTypeItemDetailMessage}}</p>
    </div>

    <!-- <template v-if="propData.InfoQueType === 'F' && options">
      <div class="fr textLeft w100P">
        <p class="fl textLeft fontBold font16 lightGray" style="">{{this.$changeText(propData.itemNameMtext)}}</p>
        <select class="fr commonDarkGray" v-model="selectOption" style="border: 1px solid #ccc; width:100%; min-height:30px" >
            <option hidden selected>선택하세요</option>
            <option class="fl w100P" style="display: flex; align-items: center; padding-bottom:0.5rem" :value="sub" v-for="(sub, subIndex) in convertSelectListStr(typeItem.optListStr)" :key="subIndex">{{sub}}</option>{{ answer.answerName }}
        </select>
      </div>
    </template>

    <template v-if="propData.InfoQueType === 'L' && options">
      <div class="fr textLeft w100P" >
        <p class="fl textLeft fontBold font16 lightGray" style="">{{this.$changeText(propData.itemNameMtext)}}</p>
        <div class="fr w100P mbottom-05 commonDarkGray" v-for="(value, aIndex) in convertSelectListStr(typeItem.optListStr)" :key="aIndex">
          <gCheckBtn class="fr commonDarkGray" :title="value" :selectedYn="selectOption === value" @click="selectOption = value"/>
        </div>
      </div>
    </template> -->

  </div>

  <div class="fr queItemWrap">
    <!-- <img class="fl img-w20" src="../../../../../assets/images/board/icon_edit.svg" @click="emit('editQue')" alt=""> -->
    <!-- <img class="fl img-w20 cursorP" style="height: 20px; margin-right: 8px;" src="../../../../../assets/images/push/noticebox_edit.png"  alt=""> -->
    <!-- <div style="width: 20px; margin-left: 10px; height: 18px; border: 1.5px solid #DC143C; border-radius: 100%; display: flex; justify-content: center; align-items: center;">
        <p class="fl img-w20 cursorP commonRed" style="height: 20px; margin-bottom: 12px;"  @click="modiItemDetail('deleteQue')">-</p>
    </div> -->
    <div class="queItemAddBtn">
        <p class="fl img-w20 commonColor cursorP"  @click="modiItemDetail('add')">+</p>
    </div>
    <div class="queItemDeleteBtn">
        <p class="fl img-w20 commonColor cursorP"  @click="modiItemDetail('delete')">-</p>
    </div>
    <div class="f itemMovePoint cursorP">
      <img src="../../../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" alt="">
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
    this.setMemberItemDetailText()
    if (this.propData.InfoQueType === 'si' || this.propData.InfoQueType === 'siList') {
      this.options = this.propData.answerList
      this.selectOption = this.propData.answerList[0].answerName
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
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
      if (this.propData.itemType === 'T') {
        this.mTypeItemDetailMessage += this.$t('MEM_DETAIL_NAME_SHORT')
        if (this.propData.maxLen) {
          if (this.GE_LOCALE === 'ko') {
            this.mTypeItemDetailMessage += '/최대' + this.propData.maxLen + '글자'
          } else {
            this.mTypeItemDetailMessage += '/Max' + this.propData.maxLen
          }
        }
        if (this.propData.numberYn) {
          this.mTypeItemDetailMessage += `/${this.$t('MEM_DETAIL_BNT_NUMONLY')}`
        }
      } else if (this.propData.itemType === 'L') {
        this.mTypeItemDetailMessage += `${this.$t('MEM_DETAIL_NAME_CHOICE')}/${this.$t('MEM_DETAIL_NAME_LIST')}`
      } else if (this.propData.itemType === 'F') {
        this.mTypeItemDetailMessage += `${this.$t('MEM_DETAIL_NAME_CHOICE')}/${this.$t('MEM_DETAIL_NAME_DROP')}`
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
<style scoped>
.movePoint {
  width: calc(100% - 90px);
  margin-right: 10px;
}
.queItemTitle {
  border-bottom: 1px solid #ccc;
  height: 30px;
  padding: 0 5px;
}
.queItemWrap {
  width:70px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.queItemAddBtn {
  margin-right: 5px;
  width: 20px;
  margin-left: 5px;
  height: 20px;
  border: 1px solid #5F61BD;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.queItemDeleteBtn {
  margin-right: 10px;
  width: 20px;
  margin-left: 5px;
  height: 20px;
  border: 1px solid #5F61BD;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.queItemAddBtn > p, .queItemDeleteBtn > p {
  height: 20px;
  margin-bottom: 12px;
}
.itemMovePoint {
  width: 30px;
  margin-left: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);
}
.itemMovePoint > img {
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
