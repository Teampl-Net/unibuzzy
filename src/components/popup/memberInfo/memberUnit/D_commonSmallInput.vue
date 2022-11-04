<template>

<div class="zoomInOutPop smallInput" style="background: rgb(250 250 250);">
  <div class="inputPopHeader newHeaderLine w-100P fl" style="min-height:30px;" >
    <p class="font16 fontBold commonColor fl" style="position: absolute; left:50%; transform: translateX(-50%); line-height: 30px;">{{title}}</p>
    <img style="" @click="closeXPop" class="fr img-w15 mtop-05 mright-05"  src="../../../../assets/images/common/popup_close.png"/>
  </div>

  <div class="fl wh-100P" style="display: flex; flex-direction: column; align-items: center;">
    <input type="text" placeholder="입력해주세요." v-model="inputText" style="width:90%; background:#ffffff !important" class="mtop-05">
    <div class="mbottom-05" style="position: absolute; bottom:0;">
      <template  v-if="btnType === 'two'">
        <gBtnSmall  @click="closeXPop" btnTitle="확인"/>
        <gBtnSmall  @click="closeXPop" btnTitle="닫기"/>
      </template>

      <template v-if="btnType === 'one'">
        <gBtnSmall  @click="emit('save')" btnTitle="저장"  />
      </template>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '멤버추가' },
    btnType: { type: String, default: 'one' }
  },
  data () {
    return {
      inputText: ''
    }
  },
  created () {
    // 추후 back 추가
  },
  methods: {
    closeXPop () {
      // 추후 back 추가
      this.emit('goNo')
    },
    emit (type) {
      // var param = {}
      if (type === 'save') {
        this.$emit('save', this.inputText)
      } else if (type === 'goNo') {
        this.$emit('goNo')
      }
    }
  }
}
</script>
<style>
.inputPopHeader{
  position: relative;
}
.smallInput{
/* box-shadow: 0 0 9px 2px #b8b8b8; */
border: 1px solid #ccc;
position: absolute;
width: 100%;
max-width: 200px;

min-height: 130px;
max-height: 250px;

border-radius: 10px;
background: #FFFFFF;

}
</style>
