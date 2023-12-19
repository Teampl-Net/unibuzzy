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
  <div class="fl w-100P" style="border-bottom: 1px solid; border-color: #BDBDBD50" :class="{ CWhiteGrayBgColor: (option === 'SELE' && propData.selectedYn === true) }" >
    <div class="fl w-100P rowBaseCss"  style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;" >
      <img v-if="searchYn === true" class="img-w15 fl" src="../../../../assets/images/common/icon_searchGray.svg" alt="">

      <!-- -->
      <div class="fl" >
        <img v-if="!propData.picBgPath" class="img-w20 mright-05" src="../../../../assets/images/board/icon_lock_gray.svg" alt="">
        <div v-else style="width: 25px; height: 25px; margin-right: 10px; border-radius: 100%; float: left; flex-shrink: 0; flex-grow: 0;"  :style="{ background: propData.picBgPath || '#ffffff' }"></div>
      </div>
      <div class="fl w-100P textOverdot" style="display: flex; align-items: center; width: calc(100% - 100px);" @click="emit('open')">
        <div class="textLeft fl w-100P textOverdot" style="">
          <p class="fl font16 commonDarkGray fontBold w-100P">{{this.$changeText(propData.cabinetNameMtext)}}</p>
          <!-- <div class="fl w-100P textLeft" style="overflow: hidden; white-space: nowrap; display: flex; align-items: center">
            <p class="fl font14 commonDarkGray mleft-05" :class="index === 0 ? 'mleft-0' : '' " v-for="(value, index) in propData.mUserList" :key="index">{{this.$changeText(value.userDispMtext)}}</p>
          </div> -->
          <!-- white-space: nowrap; text-overflow: ellipsis; overflow: hidden; -->
          <p class="fl font14 commonDarkGray w-100P textOverdot" style="" >{{subTitle}}</p>
          <!-- <p class="fl font14 commonDarkGray mleft-05" >{{this.propData.mUserList.length}}</p> -->
        </div>
      </div>

      <!-- 공통 -->
      <div v-if="option === 'EDIT'" class="fr cursorP" style="display: flex; align-items: center;">
        <img src="../../../../assets/images/board/icon_edit.svg" class="img-w20 fl" style="margin: 0 10px;" @click="emit('edit')" >
        <img src="../../../../assets/images/board/icon_trash.svg" class="img-w20 fl" style="width: 20px; margin: 0 10px;" @click="emit('delete')" >
      </div>

      <div v-if="option === 'SELE'" class="fr cursorP" style="display: flex; align-items: center;" @click="emit('add')">
        <div class="fl mright-03" style="width:20px; height:20px; border-radius:100%; border:1px solid #5F61BD; display: flex; justify-content: center; align-items: center;" :class="{ 'CDeepBgColor' : propData.selectedYn === true }">
          <!-- <img v-if="propData.selectedYn === true" class="fl img-w13" src="../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘"> -->
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
  watch: {
    propData: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.setSubTitle()
      },
      deep: true
    }
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
      this.subTitle = ''
      if (this.propData.replyYn === 1) { this.subTitle += this.$t('BCARD_NAME_COMMENTO') } else { this.subTitle += '' }
      if (this.propData.replyYn === 1) this.subTitle += ', '
      if (this.propData.fileYn === 1) { this.subTitle += this.$t('BCARD_NAME_FILEO') } else { this.subTitle += '' }
      if (this.propData.fileYn === 1) this.subTitle += ', '
      if (this.propData.blindYn === 1) { this.subTitle += this.$t('BCARD_NAME_ANONY') } else { this.subTitle += this.$t('BCARD_NAME_ID') }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}

</script>

<style>

/* .imgCircle{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ECEDF5;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.rowBaseCss{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;

width: 100%;
min-height: 70px;
left: 0px;
}

.selectedSpan{
/* position: absolute; */
width: 20px;
height: 20px;
left: 330px;
top: 25px;

/* 더알림1 */

background: #5F61BD;
/* 더알림1 */

border: 1.5px solid #5F61BD;

border-radius: 50%;
}
</style>
