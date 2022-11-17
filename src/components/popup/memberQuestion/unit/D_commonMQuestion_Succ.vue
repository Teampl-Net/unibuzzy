<template>
<div style="width: 100%; float: left;">
  <div style="width:100%; height:100%; background:#00000090; position: absolute; top:0; left:0; z-index:999;" @click="emit('closePop')"/>
  <div style="width:90%; height:200px; background:white; position: absolute; top:30%; left:5%; z-index:999; border-radius:10px;" class="fl">
    <div style="width:100%; height:50px; border-bottom:1px solid #6768a7;">
      <p class="font20 fontBold " style="line-height:50px" >공개신청서 저장 완료</p>
    </div>
    <div style="padding:1rem; width:100%; height: calc(100% - 3rem - 1px); position: relative;" class="fl">
      <p class="w-100P fl commonColor font16">공개신청서가 성공적으로 저장되었습니다.</p>
      <div class="fl w-100P" style="display: flex; flex-direction: row; justify-content: center; align-items: center; position: absolute; bottom:10px; left:0; gap: 1rem;">
        <gBtnSmall class="fl" @click="emit('preview')" btnTitle="미리보기"/>
        <gBtnSmall class="fl" @click="emit('editClick')" btnTitle="수정"/>
        <gBtnSmall class="fl" @click="emit('closePop')" btnTitle="닫기"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  props: {
    propData: {}
  },
  methods: {
    emit (type) {
      this.$emit(type)
    }
  }
}
</script>
<style>

</style>
