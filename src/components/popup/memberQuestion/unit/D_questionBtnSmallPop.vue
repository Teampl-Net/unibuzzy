<template>
<div style="width: 100%; float: left;">
  <div @click="closePop" style="background:#00000050; z-index:999; position:absolute; top:0; left:0; width:100%; height:100%;" ></div>

  <div class="formMenuList" style="">
    <div @click="buttonEvent(data.buttonEvent)" v-for="(data, index) in mButtonList" :key="index" class="fl w-100P" style="min-height: 40px; padding: 0.5rem 1rem;" :style="index !== (mButtonList.length-1) ? 'border-bottom: 1px solid #ccc;' : '' " >
      <p class="commonBlack fl textLeft font18 fontBold" v-if="index !== (mButtonList.length-1)">-</p>
      <p class="commonBlack fr textRight font18 fontBold" style=""> {{data.buttonTitle}}</p>
    </div>
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
      mButtonList: [{ buttonTitle: '문제 템플릿 가져오기', buttonEvent: 'getTemplate' }, { buttonTitle: '새로만들기', buttonEvent: 'newForm' }, { buttonTitle: '닫기', buttonEvent: 'closePop' }]
    }
  },
  methods: {
    buttonEvent (buttonType) {
      var openPopParam = {}
      openPopParam.teamKey = this.propData.teamKey

      switch (buttonType) {
        case 'getTemplate':
          openPopParam.templateYn = true
          openPopParam.targetType = 'templateList'
          openPopParam.popHeaderText = '공개신청서 템플릿 목록'
          this.openPop(openPopParam)
          this.closePop()
          break
        case 'newForm':
          openPopParam.newFormYn = true
          openPopParam.targetType = 'memberForm'
          openPopParam.popHeaderText = '공개신청서 만들기'
          this.openPop(openPopParam)
          this.closePop()
          break
        case 'closePop':
          this.closePop()
          break
      }
    },
    openPop (openPopParam) {
      this.$emit('openPop', openPopParam)
    },
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style>
.formMenuList{
  z-index:999;
  position:absolute;
  /* bottom: 10rem;
  right:3rem; */
  bottom: 6rem;
  right: 3rem;

  width:40%;
  min-width:220px;
  background:white;
  border-radius:1rem;
  padding:0.5rem;
}

</style>
