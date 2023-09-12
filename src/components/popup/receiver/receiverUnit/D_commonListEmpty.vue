<template>
<div class="emptyListWrap">
  <div class="w100P fl emptyListBox">
    <div class="w100P fl">
      <img src="../../../../assets/images/editChan/icon_emptyBox.svg" alt="">
    </div>
    <p class="w100P fl CDeepColor font22 fontBold mtop-05">{{title}}</p>
    <p v-if="option === 'EDIT' || subTitleYn === true" class="w100P fl commonDarkGray font14">{{subTitle}}</p>
    <div class="w100P fl" v-if="option === 'EDIT'">
      <img class="mtop-05" style="transform: translateX(25%)" src="../../../../assets/images/editChan/icon_arrowTurnBottom.svg" alt="">
    </div>
  </div>
</div>
</template>
<script>
// import a from '../../../../assets/images/editChan'
export default {
  props: {
    title: { type: String, defalut: '비어있어요.' },
    subTitle: { type: String, defalut: '버튼을 눌러 생성해보세요.' },
    subTitleYn: { type: Boolean, defalut: false },
    option: { type: String, defalut: 'SELE' }

  }
}
</script>
<style scoped>
.emptyListWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
}
.emptyListBox {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
