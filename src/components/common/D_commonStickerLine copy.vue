<template>
    <div style="position: relative; width: 100%; float:left;" :class="pSmallYn === true? 'thinHeight' : 'normalHeight'" >
        <p class="fontBold textRight" :class="pSmallYn === true? 'font14' : 'font16'" style="position: absolute; top: 0; right: 10px; z-index:2;">{{this.$changeText(pSticker.nameMtext)}}</p>
        <div :class="pSmallYn === true? 'thinLineStyle' : 'normalLineStyle'" :style="'background:' + pSticker.picBgPath + ';'"></div>
    </div>
</template>
<script>
export default {
  props: {
    pSticker: {},
    pSmallYn: {}
    // pTextShowYn: {}
  },
  created () {
  }
}
</script>

<style scoped>
.normalLineStyle {
    width: 100%; height: 10px; position: absolute; bottom: 0;
}
.thinLineStyle {
    width: 100%; height: 5px; position: absolute; bottom: 0;
}
.normalHeight {
    height: 25px;
}
.thinHeight {
    height: 15px;
}
</style>
