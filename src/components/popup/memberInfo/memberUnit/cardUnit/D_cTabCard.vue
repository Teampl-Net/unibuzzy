<template>

<div class="fl w-100P" @click="emit('click')" style="min-height:30px; display: flex;">
  <div @click="emit('add')" :class="{ 'CLightBgColor' : propData.selectedYn === true }" class="fl"  style="width: calc(100%);">
    <div class="fl " style="border-radius:100%; padding:3px; display: flex; justify-content: center; align-items: center; width: 25px; height: 25px; margin-right: 1px; margin-top: 1px; ">
      <img class="w-80P" src="../../../../../assets/images/editChan/icon_user_Gray.svg" alt="">
    </div>

<p class="fl textLeft fontBold font16 commonDarkGray textOverdot" style='line-height:30px; width: calc(100% - 30px)'>{{this.$changeText(propData.nameMtext)}}</p>
  </div>

  <!-- <div class="fr cursorP" style="display: flex; align-items: center;" @click="emit('add')">
    <div class="fl mright-03" style="width:20px; height:20px; border-radius:100%; border:1px solid #5F61BD; display: flex; justify-content: center; align-items: center;" :class="{ 'CDeepBgColor' : propData.selectedYn === true }">
      <img class="fl img-w13" src="../../../../../assets/images/common/icon_check_white.svg" alt="선택 아이콘">
    </div>
  </div> -->
</div>

</template>
<script>
export default {
  props: {
    propData: {},
    compoIdx: {}
  },
  methods: {
    emit (type) {
      var param = {}
      param.targetType = type
      param.data = this.propData
      param.index = this.compoIdx
      this.$emit('cardEmit', param)
    }
  }
}
</script>
<style>
.leftTabBase{
}
</style>
