<i18n>
{
  "ko": {
    "BCARD_NAME_COMMENTO": "댓글 지원O",
    "BCARD_NAME_FILEO": "파일 업로드O",
    "BCARD_NAME_ANONY": "익명",
    "BCARD_NAME_ID": "실명"
  },
  "en": {
    "BCARD_NAME_COMMENTO": "Comments O",
    "BCARD_NAME_FILEO": "Files O",
    "BCARD_NAME_ANONY": "Identified",
    "BCARD_NAME_ID": "Anonymous"
  }
}
</i18n>
<template>
  <div class="fl w100P boardCardWrap" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w100P rowBaseCss">
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">

      <!-- -->
      <div class="fl" >
        <img v-if="!propData.picBgPath" class="img-w20 mright-05" src="../../../../assets/images/board/icon_lock_gray.svg" alt="">
        <div class="boardColorCircle" v-else :style="{ background: propData.picBgPath || '#ffffff' }"></div>
      </div>
      <div class="fl w100P textOverdot boardTitleArea" @click="emit('open')">
        <div class="textLeft fl w100P textOverdot">
          <p class="fl font16 commonDarkGray fontBold w100P">{{$changeText(propData.cabinetNameMtext)}}</p>
          <p class="fl font14 commonDarkGray w100P textOverdot">{{subTitle}}</p>
        </div>
      </div>
      <!-- 공통 -->
      <div v-if="option === 'EDIT'" class="fr cursorP flexAlignCenter">
        <img src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl editImg" @click="emit('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl deleteImg" @click="emit('delete')" >
      </div>
      <div v-if="option === 'SELE'" class="fr cursorP flexAlignCenter" @click="emit('add')">
        <div class="fl mright-03 boardSelectBox" :class="{ 'CDeepBgColor' : propData.selectedYn === true }">
          <img class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      subTitle: ''
    }
  },
  props: {
    propData: {},
    option: { type: String, default: 'EDIT' },
    selectedYn: { type: Boolean, default: false },
    compoIdx: {}
  },
  methods: {
    emit (type) {
      var param = {}
      param.targetType = type
      param.data = this.propData
      if (this.compoIdx) param.index = this.compoIdx
      this.$emit('cardEmit', param)
    },
    setSubTitle () {
      if (this.propData.replyYn === 1) { this.subTitle += this.$t('BCARD_NAME_COMMENTO') } else { this.subTitle += '' }
      if (this.propData.replyYn === 1) this.subTitle += ', '
      if (this.propData.fileYn === 1) { this.subTitle += this.$t('BCARD_NAME_FILEO') } else { this.subTitle += '' }
      if (this.propData.fileYn === 1) this.subTitle += ', '
      if (this.propData.blindYn === 1) { this.subTitle += this.$t('BCARD_NAME_ANONY') } else { this.subTitle += this.$t('BCARD_NAME_ID') }
    }
  },
  created () {
    this.setSubTitle()
  }
}

</script>

<style scoped>
.rowBaseCss {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;
  width: 100%;
  min-height: 70px;
  left: 0px;
}
.selectedSpan {
  width: 20px;
  height: 20px;
  left: 330px;
  top: 25px;
  background: #5F61BD;
  border: 1.5px solid #5F61BD;
  border-radius: 50%;
}
.boardCardWrap {
  border-bottom: 1px solid #BDBDBD50;
}
.boardColorCircle {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 100%;
  float: left;
  flex-shrink: 0;
  flex-grow: 0;
}
.boardTitleArea {
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
}
.editImg {
  margin: 0 10px;
}
.deleteImg {
  width: 20px;
  margin: 0 10px;
}
.boardSelectBox {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #5F61BD;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
