<template>
<div class="fl btnBaseCss font14" :class="selectedYn === true ? 'CDeepColor CWhiteBgColor selectPadding selectBorder' : 'commonGray commonGrayBorderColor commonGrayBG noneSelectPadding' ">
  <img class="img-w15" v-if="selectedYn === true" src="@/assets/images/common/icon_check_commonColor.svg" />
  <span v-html="title"></span>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    title: {},
    selectedYn: Boolean
  }
}
</script>

<style>
  .selectBorder {
    border-width: 2px !important;
  }
  .btnBaseCss{
    word-wrap: break-word;
    align-items: center;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;

    background: #F1F1FF;

    border: 1.5px solid #5F61BD;
    border-radius: 8px;

/* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    min-height: 30px;
  }
</style>
