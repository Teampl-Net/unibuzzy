<template>
<div style="width: 100%; height: 100%; position: absolute; top:0; left:0;">
  <div class="w-100P fl" style="position: absolute; top: 50%; transform: translateY(-50%)">
    <div class="w-100P fl">
      <img src="../../../../assets/images/editChan/icon_emptyBox.svg" alt="">
    </div>
    <p class="w-100P fl CDeepColor font22 fontBold mtop-05">{{title}}</p>
    <p class="w-100P fl commonDarkGray font14">{{subTitle}}</p>
    <div class="w-100P fl" v-if="option === 'EDIT'">
      <img class="mtop-1" style="transform: translateX(10%)" src="../../../../assets/images/editChan/icon_arrowTurnBottom.svg" alt="">
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
    option: { type: String, defalut: 'SELE' }

  }
}
</script>
<style>

</style>
